import test from 'node:test'
import assert from 'node:assert/strict'
import worker from './worker.mjs'

const body = {
  clientHash: 'a'.repeat(64),
  messages: [
    { role: 'system', content: 'JSON text and actionIds only.' },
    { role: 'user', content: 'Sales Lab?' },
  ],
}
const req = (payload = body, token = 'test-secret') =>
  new Request('https://example.com/chat', {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

test('unauthorized traffic never reaches database or inference', async () => {
  assert.equal(
    (await worker.fetch(req(body, 'wrong'), { CHAT_SERVICE_TOKEN: 'test-secret' })).status,
    401,
  )
})
test('exhausted durable quota prevents inference', async () => {
  let called = false
  const env = {
    CHAT_SERVICE_TOKEN: 'test-secret',
    DB: { prepare: () => ({ bind: () => ({ first: async () => null }) }) },
    AI: {
      run: async () => {
        called = true
      },
    },
  }
  assert.equal((await worker.fetch(req(), env)).status, 429)
  assert.equal(called, false)
})
test('unavailable budget storage fails closed before inference', async () => {
  let called = false
  const env = {
    CHAT_SERVICE_TOKEN: 'test-secret',
    DB: {
      prepare: () => {
        throw new Error('offline')
      },
    },
    AI: {
      run: async () => {
        called = true
      },
    },
  }
  assert.equal((await worker.fetch(req(), env)).status, 503)
  assert.equal(called, false)
})
test('provider cannot receive unbounded or caller-selected generation parameters', async () => {
  let input
  const env = {
    CHAT_SERVICE_TOKEN: 'test-secret',
    DB: { prepare: () => ({ bind: () => ({ first: async () => ({ id: 'reserved' }) }) }) },
    AI: {
      run: async (_model, options) => {
        input = options
        return { response: { text: 'Salut', actionIds: ['contact'] } }
      },
    },
  }
  const response = await worker.fetch(req({ ...body, max_tokens: 100000, model: 'expensive' }), env)
  assert.equal(response.status, 200)
  assert.equal(input.max_tokens, 400)
  assert.deepEqual(await response.json(), {
    text: 'Salut',
    actionIds: ['contact'],
    suggestions: [],
  })
})
test('oversized chunked body is rejected without inference', async () => {
  assert.equal(
    (
      await worker.fetch(req({ ...body, extra: 'x'.repeat(20000) }), {
        CHAT_SERVICE_TOKEN: 'test-secret',
      })
    ).status,
    400,
  )
})

test('a conversational reply without a navigation action keeps its generated suggestions', async () => {
  const env = {
    CHAT_SERVICE_TOKEN: 'test-secret',
    DB: { prepare: () => ({ bind: () => ({ first: async () => ({ id: 'reserved' }) }) }) },
    AI: {
      run: async () => ({
        response: { text: 'Ce vrei să îmbunătățești?', suggestions: ['Vânzări', 'Leadership'] },
      }),
    },
  }
  const response = await worker.fetch(req(), env)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), {
    text: 'Ce vrei să îmbunătățești?',
    actionIds: [],
    suggestions: ['Vânzări', 'Leadership'],
  })
})

test('analytics rejects arbitrary free-text categories before touching storage', async () => {
  const request = new Request('https://example.com/monitor/event',{method:'POST',headers:{authorization:'Bearer test-secret','Content-Type':'application/json'},body:JSON.stringify({eventKey:'a'.repeat(64),conversationKey:'b'.repeat(64),kind:'message',source:'typed',mode:'ai',outcome:'answered',topics:['person@example.com'],intents:['price']})})
  assert.equal((await worker.fetch(request,{CHAT_SERVICE_TOKEN:'test-secret'})).status,400)
})
test('analytics is transactional, bounded, independent of inference quota', async () => {
  const {DatabaseSync} = await import('node:sqlite')
  const {readFileSync} = await import('node:fs')
  const db = new DatabaseSync(':memory:')
  db.exec(readFileSync(new URL('./schema.sql', import.meta.url),'utf8'))
  const env={CHAT_SERVICE_TOKEN:'test-secret',DB:{prepare:sql=>({bind:(...args)=>({sql,args})}),batch:async statements=>{
    db.exec('BEGIN');try{for(const s of statements)db.prepare(s.sql).run(...s.args);db.exec('COMMIT')}catch(e){db.exec('ROLLBACK');throw e}
  }}}
  const payload={eventKey:'a'.repeat(64),conversationKey:'b'.repeat(64),kind:'message',source:'typed',mode:'ai',outcome:'answered',topics:['sales'],intents:['price'],isTest:true}
  const request=()=>new Request('https://example.com/monitor/event',{method:'POST',headers:{authorization:'Bearer test-secret','Content-Type':'application/json'},body:JSON.stringify(payload)})
  assert.equal((await worker.fetch(request(),env)).status,200)
  assert.equal((await worker.fetch(request(),env)).status,200)
  assert.equal(db.prepare("SELECT value FROM chat_metrics WHERE kind='message'").get().value,1)
  assert.equal(db.prepare("SELECT value FROM chat_metrics WHERE kind='conversation'").get().value,1)
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM chat_reservations').get().n,0)
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM chat_metrics WHERE is_test=0').get().n,0)
  payload.eventKey='c'.repeat(64)
  await worker.fetch(request(),env)
  assert.equal(db.prepare("SELECT value FROM chat_metrics WHERE kind='message'").get().value,2)
  assert.equal(db.prepare("SELECT value FROM chat_metrics WHERE kind='conversation'").get().value,1)
  db.close()
})

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
  assert.deepEqual(await response.json(), { text: 'Salut', actionIds: ['contact'] })
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

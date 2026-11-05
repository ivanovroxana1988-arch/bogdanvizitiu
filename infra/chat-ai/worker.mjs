// Dedicated inference service. Never store or log conversation text.
export const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
export const MONTHLY_CALL_LIMIT = 1000
export const DAILY_CALL_LIMIT = 100
export const MAX_BODY_BYTES = 18000
export const RESERVATION_SQL = `INSERT INTO chat_reservations(id,month,day,client_window)
  SELECT ?,?,?,?
  WHERE (SELECT COUNT(*) FROM chat_reservations WHERE month=?) < ?
    AND (SELECT COUNT(*) FROM chat_reservations WHERE day=?) < ?
    AND (SELECT COUNT(*) FROM chat_reservations WHERE client_window=?) < 20
  RETURNING id`

const reply = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  })

async function readBoundedJson(request) {
  const reader = request.body?.getReader()
  if (!reader) throw new Error('empty')
  let size = 0
  const chunks = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BODY_BYTES) {
      await reader.cancel()
      throw new Error('oversize')
    }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return JSON.parse(new TextDecoder().decode(bytes))
}


export const MONITOR_INSERT = `INSERT OR IGNORE INTO chat_metric_events(event_key,day,is_test)
 SELECT ?,?,? WHERE (SELECT COUNT(*) FROM chat_metric_events WHERE day=?) < 2000`
export const MONITOR_INCREMENT = `INSERT INTO chat_metrics(day,kind,dimension,is_test,value)
 SELECT ?,?,?,?,1 WHERE changes()>0
 ON CONFLICT(day,kind,dimension,is_test) DO UPDATE SET value=value+1`
const topicIds = ['sales','coaching','leadership','corporate','networking','ai','courses','other']
const intentIds = ['price','signup','date','venue','duration','availability','online','payment','discount','certificate','cancellation','contact','content','other']
const actionIds = ['courses','sales','signup','corporate','coaching','contact','about','insights']
export function monitorDimensions(body) {
  if (!body || !/^[a-f0-9]{64}$/.test(body.eventKey) || !/^[a-f0-9]{64}$/.test(body.conversationKey)) return null
  if (body.kind === 'open') return [['open','all']]
  if (body.kind === 'cta' && actionIds.includes(body.action)) return [['cta',body.action]]
  if (body.kind !== 'message' || !['typed','suggestion'].includes(body.source) || !['ai','guided'].includes(body.mode) || !['answered','uncertain','guided','fallback'].includes(body.outcome)) return null
  if (!Array.isArray(body.topics) || body.topics.length > 8 || !body.topics.length || body.topics.some(t=>!topicIds.includes(t)) || !Array.isArray(body.intents) || !body.intents.length || body.intents.length>14 || body.intents.some(t=>!intentIds.includes(t))) return null
  return [['message',body.source],['mode',body.mode],['outcome',body.outcome],...new Set(body.topics).values()].map(item=>typeof item==='string'?['topic',item]:item).concat([...new Set(body.intents)].map(id=>['intent_'+body.source,id]))
}
async function monitorEvent(body, env) {
  const dimensions = monitorDimensions(body)
  if (!dimensions) return reply({error:'invalid_event'},400)
  const day = new Date().toISOString().slice(0,10)
  const test = body.isTest === true ? 1 : 0
  try {
    const statements = [env.DB.prepare(MONITOR_INSERT).bind(body.eventKey,day,test,day), ...dimensions.map(([kind,dimension])=>env.DB.prepare(MONITOR_INCREMENT).bind(day,kind,dimension,test))]
    // batch is transactional. changes() propagates the insert result: duplicate events increment nothing.
    await env.DB.batch(statements)
    if (body.kind === 'message') {
      await env.DB.batch([
        env.DB.prepare(MONITOR_INSERT).bind('conversation:'+body.conversationKey,day,test,day),
        env.DB.prepare(MONITOR_INCREMENT).bind(day,'conversation','all',test),
      ])
    }
    return reply({ok:true})
  } catch { return reply({error:'monitor_unavailable'},503) }
}

export async function cleanup(env, now = Date.now()) {
  const oldest = new Date(now - 89 * 86400000).toISOString().slice(0, 10)
  await env.DB.prepare('DELETE FROM chat_reservations WHERE day < ?').bind(oldest).run()
  await env.DB.prepare('DELETE FROM chat_metrics WHERE day < ?').bind(oldest).run()
  await env.DB.prepare('DELETE FROM chat_metric_events WHERE day < ?').bind(oldest).run()
}

export default {
  async fetch(request, env) {
    if (
      !env.CHAT_SERVICE_TOKEN ||
      request.headers.get('authorization') !== `Bearer ${env.CHAT_SERVICE_TOKEN}`
    )
      return reply({ error: 'unauthorized' }, 401)
    if (request.method !== 'POST' || !['/chat','/monitor/event'].includes(new URL(request.url).pathname))
      return reply({ error: 'not_found' }, 404)
    if (!request.headers.get('content-type')?.startsWith('application/json'))
      return reply({ error: 'invalid_content_type' }, 415)
    if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES)
      return reply({ error: 'payload_too_large' }, 413)
    let body
    try {
      body = await readBoundedJson(request)
    } catch {
      return reply({ error: 'invalid_body' }, 400)
    }
    if (new URL(request.url).pathname === '/monitor/event') return monitorEvent(body,env)
    if (
      !body ||
      !/^[a-f0-9]{64}$/.test(body.clientHash) ||
      !Array.isArray(body.messages) ||
      body.messages.length < 2 ||
      body.messages.length > 13 ||
      body.messages[0]?.role !== 'system' ||
      body.messages.at(-1)?.role !== 'user' ||
      !body.messages.every(
        (m, i) =>
          m &&
          typeof m.content === 'string' &&
          m.content.length > 0 &&
          (i === 0 ? m.role === 'system' : ['user', 'assistant'].includes(m.role)),
      )
    )
      return reply({ error: 'invalid_messages' }, 400)
    try {
      const date = new Date()
      const month = date.toISOString().slice(0, 7)
      const day = date.toISOString().slice(0, 10)
      const clientWindow = `${Math.floor(date.getTime() / 600000)}:${body.clientHash}`
      // One conditional INSERT is atomic: concurrent requests cannot overshoot.
      // Reserve the full conservative allowance before inference, including failures.
      const reserved = await env.DB.prepare(RESERVATION_SQL)
        .bind(
          crypto.randomUUID(),
          month,
          day,
          clientWindow,
          month,
          MONTHLY_CALL_LIMIT,
          day,
          DAILY_CALL_LIMIT,
          clientWindow,
        )
        .first()
      if (!reserved) return reply({ error: 'quota_exceeded' }, 429)
      const result = await env.AI.run(MODEL, {
        messages: body.messages,
        max_tokens: 400,
        response_format: { type: 'json_object' },
      })
      let answer = result.response ?? result.choices?.[0]?.message?.content
      if (typeof answer === 'string') answer = JSON.parse(answer)
      if (
        !answer ||
        typeof answer.text !== 'string' ||
        !answer.text.trim() ||
        answer.text.length > 600
      )
        return reply({ error: 'invalid_ai_output' }, 502)
      const suggestions = Array.isArray(answer.suggestions)
        ? answer.suggestions
            .filter((s) => typeof s === 'string' && s.trim() && s.length <= 80)
            .slice(0, 3)
        : []
      const actionIds = Array.isArray(answer.actionIds)
        ? answer.actionIds.filter((id) => typeof id === 'string').slice(0, 1)
        : []
      return reply({ text: answer.text, actionIds, suggestions })
    } catch {
      return reply({ error: 'ai_unavailable' }, 503)
    }
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(cleanup(env))
  },
}

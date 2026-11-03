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

export async function cleanup(env, now = Date.now()) {
  const oldest = new Date(now - 89 * 86400000).toISOString().slice(0, 10)
  await env.DB.prepare('DELETE FROM chat_reservations WHERE day < ?').bind(oldest).run()
}

export default {
  async fetch(request, env) {
    if (
      !env.CHAT_SERVICE_TOKEN ||
      request.headers.get('authorization') !== `Bearer ${env.CHAT_SERVICE_TOKEN}`
    )
      return reply({ error: 'unauthorized' }, 401)
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/chat')
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
        answer.text.length > 600 ||
        !Array.isArray(answer.actionIds)
      )
        return reply({ error: 'invalid_ai_output' }, 502)
      return reply({ text: answer.text, actionIds: answer.actionIds })
    } catch {
      return reply({ error: 'ai_unavailable' }, 503)
    }
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(cleanup(env))
  },
}

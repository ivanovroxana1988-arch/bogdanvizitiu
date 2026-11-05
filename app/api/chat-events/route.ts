import { recordChatObservation } from '@/lib/chat-monitoring-server'
import { measurementAllowed, monitorActions, validMeasurementId } from '@/lib/chat-monitoring'
import { checkChatRateLimit, getClientIdentifier } from '@/lib/rate-limit'
export const runtime = 'nodejs'
export async function POST(request: Request) {
  const json = (status: number) =>
    Response.json({ ok: status === 200 }, { status, headers: { 'Cache-Control': 'no-store' } })
  if (request.headers.get('origin') !== new URL(request.url).origin) return json(403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json(415)
  const reader = request.body?.getReader()
  if (!reader) return json(400)
  let size = 0
  const chunks: Uint8Array[] = []
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 1024) {
        await reader.cancel()
        return json(413)
      }
      chunks.push(value)
    }
    const raw = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (
      !raw ||
      !measurementAllowed(raw) ||
      !validMeasurementId(raw.eventId) ||
      !validMeasurementId(raw.conversationId)
    )
      return json(400)
    if (raw.kind !== 'open' && !(raw.kind === 'cta' && monitorActions.includes(raw.action)))
      return json(400)
    if (!(await checkChatRateLimit('monitor:' + getClientIdentifier(request))).allowed)
      return json(429)
    await recordChatObservation(
      raw,
      raw.kind === 'open' ? { kind: 'open' } : { kind: 'cta', action: raw.action },
    )
    return json(200)
  } catch {
    return json(400)
  }
}

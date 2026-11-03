import { NextResponse } from 'next/server'
import { guidedChatReply, validateChatMessages } from '@/lib/chatbot'
import { generateChatReply, isChatAiConfigured } from '@/lib/chatbot-ai'
import { checkChatRateLimit, getClientIdentifier } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 20
const MAX_BODY_BYTES = 12000
const json = (body: unknown, status = 200, headers = {}) =>
  NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin)
    return json({ error: 'invalid_origin' }, 403)
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return json({ error: 'invalid_content_type' }, 415)
  const limit = await checkChatRateLimit(getClientIdentifier(request))
  if (!limit.allowed)
    return json({ error: 'rate_limited' }, 429, {
      'Retry-After': String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))),
    })
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES)
    return json({ error: 'payload_too_large' }, 413)
  // Read a bounded stream, including chunked requests with no content-length.
  const reader = request.body?.getReader()
  if (!reader) return json({ error: 'invalid_request' }, 400)
  const chunks: Uint8Array[] = []
  let size = 0
  let raw
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        return json({ error: 'payload_too_large' }, 413)
      }
      chunks.push(value)
    }
    raw = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }
  if (!raw || typeof raw !== 'object' || !validateChatMessages(raw.messages))
    return json({ error: 'invalid_messages' }, 400)
  const locale = raw.locale === 'en' ? 'en' : 'ro'
  const pathname =
    typeof raw.pathname === 'string' && /^\/[a-zA-Z0-9/_-]{0,160}$/.test(raw.pathname)
      ? raw.pathname
      : '/'
  const fallback = guidedChatReply(raw.messages, pathname, locale)
  if (raw.aiConsent === true && isChatAiConfigured()) {
    try {
      return json(
        await generateChatReply(raw.messages, pathname, locale, getClientIdentifier(request)),
      )
    } catch {
      /* Never log conversation text, personal data or provider errors. */
    }
  }
  return json(fallback)
}

import { NextResponse } from 'next/server'
import { getClientIdentifier, checkContactRateLimit } from '@/lib/rate-limit'

const topics = ['general', 'sales', 'leadership', 'coaching', 'corporate'] as const
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BODY_BYTES = 3_000

function positiveId(raw: string | undefined) {
  const id = Number(raw)
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

export async function POST(request: Request) {
  const expectedOrigin = new URL(request.url).origin
  const origin = request.headers.get('origin')
  if (origin && origin !== expectedOrigin) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
  }

  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'payload_too_large' }, { status: 413 })
  }

  let raw: Record<string, unknown>
  try {
    const body = await request.text()
    if (body.length > MAX_BODY_BYTES) throw new Error('too_long')
    const parsed: unknown = JSON.parse(body)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid')
    raw = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  if (typeof raw.website === 'string' && raw.website.trim()) {
    return NextResponse.json({ ok: true, pending: true }, { status: 202 })
  }

  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : ''
  const topic = typeof raw.topic === 'string' && topics.some((value) => value === raw.topic)
    ? raw.topic
    : 'general'
  const locale = raw.locale === 'en' ? 'en' : 'ro'
  if (email.length > 254 || !emailPattern.test(email) || raw.consent !== true) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = positiveId(process.env.BREVO_LIST_ID)
  const templateId = positiveId(process.env.BREVO_DOI_TEMPLATE_ID)
  const redirectBase = process.env.BREVO_DOI_REDIRECT_BASE_URL
  if (!apiKey || !listId || !templateId || !redirectBase) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  let redirectUrl: string
  try {
    const url = new URL(locale === 'ro' ? '/newsletter-confirmat' : '/en/newsletter-confirmed', redirectBase)
    if (url.protocol !== 'https:') throw new Error('invalid_scheme')
    redirectUrl = url.href
  } catch {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const extraId = positiveId(
    topic === 'sales' ? process.env.BREVO_LIST_ID_SALES
      : topic === 'leadership' ? process.env.BREVO_LIST_ID_LEADERSHIP
        : topic === 'coaching' ? process.env.BREVO_LIST_ID_COACHING
          : topic === 'corporate' ? process.env.BREVO_LIST_ID_CORPORATE
            : undefined,
  )
  const includeListIds = [...new Set([listId, extraId].filter((id): id is number => id !== null))]
  const rate = await checkContactRateLimit('newsletter:' + getClientIdentifier(request))
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000))) } },
    )
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        includeListIds,
        templateId,
        redirectionUrl: redirectUrl,
        contactPixelTrackingConsent: false,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Newsletter DOI provider error:', response.status)
      return NextResponse.json({ ok: false, error: 'provider_unavailable' }, { status: 502 })
    }

    // DOI is not complete until the person clicks the confirmation link in Brevo's email.
    return NextResponse.json(
      { ok: true, pending: true },
      { status: 202, headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return NextResponse.json({ ok: false, error: 'provider_unavailable' }, { status: 502 })
  }
}

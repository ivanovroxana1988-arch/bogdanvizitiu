import { NextResponse } from 'next/server'
import business from '@/content/business.json'
import { clean, getInvalidContactFields, type ContactPayload } from '@/lib/contact-validation'
import { checkContactRateLimit, getClientIdentifier } from '@/lib/rate-limit'

const MAX_BODY_BYTES = 20_000

function buildMessage(
  payload: Required<
    Pick<
      ContactPayload,
      'name' | 'email' | 'requestType' | 'scope' | 'interest' | 'message' | 'desiredChange'
    >
  >,
) {
  return [
    `Nume / Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Tip solicitare / Request type: ${payload.requestType}`,
    `Pentru / Scope: ${payload.scope}`,
    payload.interest ? `Context: ${payload.interest}` : '',
    '',
    'Context / Context',
    payload.message,
    '',
    payload.desiredChange ? 'Ce ar trebui să fie diferit? / What should be different?' : '',
    payload.desiredChange,
  ]
    .filter(Boolean)
    .join('\n')
}

function mailtoFallback(subject: string, body: string) {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'payload_too_large' }, { status: 413 })
  }

  let raw: ContactPayload
  try {
    raw = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  if (clean(raw.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const rateLimit = await checkContactRateLimit(getClientIdentifier(request))
  if (!rateLimit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetAt / 1000)),
        },
      },
    )
  }

  const locale = raw.locale === 'en' ? 'en' : 'ro'
  const name = clean(raw.name, 160)
  const email = clean(raw.email, 254)
  const requestType = clean(raw.requestType, 160)
  const scope = clean(raw.scope, 160)
  const interest = clean(raw.interest, 500)
  const message = clean(raw.message, 4000)
  const desiredChange = clean(raw.desiredChange, 2500)
  const invalidFields = getInvalidContactFields(raw)

  if (invalidFields.length) {
    return NextResponse.json({ ok: false, error: 'invalid_fields', invalidFields }, { status: 400 })
  }

  const subject =
    locale === 'ro'
      ? `Solicitare site Bogdan Vizitiu — ${requestType}`
      : `Bogdan Vizitiu website enquiry — ${requestType}`
  const body = buildMessage({ name, email, requestType, scope, interest, message, desiredChange })
  const fallback = mailtoFallback(subject, body)
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, delivery: 'mailto', fallback })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'bogdanvizitiu.com/contact-form',
      },
      body: JSON.stringify({
        from,
        to: [business.email],
        reply_to: email,
        subject,
        text: body,
      }),
    })

    if (!response.ok) {
      console.error('Contact email delivery failed', response.status)
      return NextResponse.json({ ok: false, delivery: 'mailto', fallback })
    }

    return NextResponse.json({ ok: true, delivery: 'email' })
  } catch (error) {
    console.error('Contact email delivery error', error)
    return NextResponse.json({ ok: false, delivery: 'mailto', fallback })
  }
}

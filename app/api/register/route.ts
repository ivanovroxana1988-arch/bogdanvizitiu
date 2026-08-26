import { NextResponse } from 'next/server'
import business from '@/content/business.json'
import { clean, isEmail } from '@/lib/contact-validation'
import { getPrograms } from '@/lib/data'
import { checkContactRateLimit, getClientIdentifier } from '@/lib/rate-limit'

const MAX_BODY_BYTES = 10_000

type RegistrationPayload = {
  locale?: 'ro' | 'en'
  course?: string
  name?: string
  email?: string
  phone?: string
  website?: string
  source?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

type InvalidField = 'name' | 'email' | 'phone'

function mailtoFallback(subject: string, body: string) {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function hasValidPhone(value: string) {
  return value.replace(/\D/g, '').length >= 7
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'payload_too_large' }, { status: 413 })
  }

  let raw: RegistrationPayload
  try {
    raw = (await request.json()) as RegistrationPayload
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
        },
      },
    )
  }

  const locale = raw.locale === 'en' ? 'en' : 'ro'
  const courseSlug = clean(raw.course, 200)
  const name = clean(raw.name, 160)
  const email = clean(raw.email, 254)
  const phone = clean(raw.phone, 80)
  const source = clean(raw.source, 200)
  const referrer = clean(raw.referrer, 1000)
  const utmSource = clean(raw.utm_source, 200)
  const utmMedium = clean(raw.utm_medium, 200)
  const utmCampaign = clean(raw.utm_campaign, 200)
  const course = getPrograms(locale).find((item) => item.slug === courseSlug)

  if (!course) {
    return NextResponse.json({ ok: false, error: 'invalid_course' }, { status: 400 })
  }

  const invalidFields: InvalidField[] = []
  if (!name) invalidFields.push('name')
  if (!isEmail(email)) invalidFields.push('email')
  if (!hasValidPhone(phone)) invalidFields.push('phone')

  if (invalidFields.length) {
    return NextResponse.json({ ok: false, error: 'invalid_fields', invalidFields }, { status: 400 })
  }

  const subject =
    locale === 'ro'
      ? `Înscriere curs — ${course.title}`
      : `Course registration — ${course.title}`
  const body = [
    `Curs / Course: ${course.title}`,
    `Slug: ${course.slug}`,
    `Nume / Name: ${name}`,
    `Email: ${email}`,
    `Telefon / Phone: ${phone}`,
    '',
    source ? `Source: ${source}` : '',
    referrer ? `Referrer: ${referrer}` : '',
    utmSource ? `UTM source: ${utmSource}` : '',
    utmMedium ? `UTM medium: ${utmMedium}` : '',
    utmCampaign ? `UTM campaign: ${utmCampaign}` : '',
  ]
    .filter(Boolean)
    .join('\n')
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
        'User-Agent': 'bogdanvizitiu.com/course-registration',
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
      console.error('Course registration email delivery failed', response.status)
      return NextResponse.json({ ok: false, delivery: 'mailto', fallback })
    }

    return NextResponse.json({ ok: true, delivery: 'email' })
  } catch (error) {
    console.error('Course registration email delivery error', error)
    return NextResponse.json({ ok: false, delivery: 'mailto', fallback })
  }
}

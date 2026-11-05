import { NextResponse } from 'next/server'
import business from '@/content/business.json'
import { clean, isEmail } from '@/lib/contact-validation'
import { getPrograms } from '@/lib/data'
import { checkContactRateLimit, getClientIdentifier } from '@/lib/rate-limit'
import { sendSalesLabConfirmation } from '@/lib/sales-lab-confirmation'
import { syncSalesLabToSheets } from '@/lib/sales-lab-sheets'
import { classifySalesLabRegistration, isSalesLabRequestId } from '@/lib/sales-lab-outcome'

const MAX_BODY_BYTES = 10_000

type RegistrationPayload = {
  locale?: 'ro' | 'en'
  course?: string
  name?: string
  email?: string
  phone?: string
  company?: string
  seats?: number
  website?: string
  request_id?: string
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
    // Never acknowledge a honeypot submission as a genuine registration.
    return NextResponse.json({ ok: false, status: 'ignored' }, { status: 202 })
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
  const requestId = clean(raw.request_id, 80)
  const name = clean(raw.name, 160)
  const email = clean(raw.email, 254)
  const phone = clean(raw.phone, 80)
  const company = clean(raw.company, 160)
  const seats = raw.seats === undefined ? 1 : Number(raw.seats)
  const source = clean(raw.source, 200)
  const referrer = clean(raw.referrer, 1000)
  const utmSource = clean(raw.utm_source, 200)
  const utmMedium = clean(raw.utm_medium, 200)
  const utmCampaign = clean(raw.utm_campaign, 200)
  const course = courseSlug === 'sales-lab' && locale === 'ro'
    ? { slug: 'sales-lab', title: 'Sales Lab – 21–22 ianuarie 2027, București', dates: ['2027-01-21', '2027-01-22'] }
    : getPrograms(locale).find((item) => item.slug === courseSlug)

  if (!course) {
    return NextResponse.json({ ok: false, error: 'invalid_course' }, { status: 400 })
  }

  if (courseSlug === 'sales-lab' && !isSalesLabRequestId(requestId)) {
    return NextResponse.json({ ok: false, error: 'invalid_request_id' }, { status: 400 })
  }

  if (courseSlug === 'sales-lab' && (!Number.isInteger(seats) || seats < 1 || seats > 15)) {
    return NextResponse.json({ ok: false, error: 'invalid_seats' }, { status: 400 })
  }

  const invalidFields: InvalidField[] = []
  if (!name) invalidFields.push('name')
  if (!isEmail(email)) invalidFields.push('email')
  if (!hasValidPhone(phone)) invalidFields.push('phone')

  if (invalidFields.length) {
    return NextResponse.json({ ok: false, error: 'invalid_fields', invalidFields }, { status: 400 })
  }

  const subject =
    course.dates.length === 0
      ? locale === 'ro'
        ? `Notificare ediție curs — ${course.title}`
        : `Next course edition notification — ${course.title}`
      : locale === 'ro'
        ? `Înscriere curs — ${course.title}`
        : `Course registration — ${course.title}`
  const body = [
    `Curs / Course: ${course.title}`,
    `Slug: ${course.slug}`,
    ...(courseSlug === 'sales-lab' ? [`ID cerere: ${requestId}`] : []),
    `Nume / Name: ${name}`,
    `Email: ${email}`,
    `Telefon / Phone: ${phone}`,
    courseSlug === 'sales-lab' ? `Locuri solicitate: ${seats}` : '',
    company ? `Companie: ${company}` : '',
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
        ...(courseSlug === 'sales-lab' ? { 'Idempotency-Key': requestId + '-organizer' } : {}),
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

    if (courseSlug === 'sales-lab') {
      const sheetSync = await syncSalesLabToSheets({
        name,
        email,
        phone,
        company,
        seats,
        source,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
      }, requestId)
      if (sheetSync !== 'stored' && sheetSync !== 'already_stored') {
        console.error('Sales Lab request emailed but not yet recorded in Google Sheets', sheetSync)
      }

      const acknowledgement = sheetSync === 'already_stored' ? 'previously_processed' : await sendSalesLabConfirmation({
        name,
        seats,
        email,
        replyTo: business.email,
        brevoKey: process.env.BREVO_API_KEY,
        brevoSenderEmail: process.env.BREVO_SENDER_EMAIL,
        resendKey: apiKey,
        resendFrom: from,
      })

      if (acknowledgement === 'failed') {
        console.error('Sales Lab applicant acknowledgement failed after internal notification')
      }

      return NextResponse.json({
        ok: true,
        status: classifySalesLabRegistration(sheetSync),
        request_id: requestId,
        delivery: 'email',
        acknowledgement: acknowledgement === 'failed' ? 'not_sent' : acknowledgement === 'previously_processed' ? 'previously_processed' : 'sent',
        record: sheetSync === 'stored' || sheetSync === 'already_stored' ? 'saved' : 'email_only',
      })
    }

    return NextResponse.json({ ok: true, delivery: 'email' })
  } catch (error) {
    console.error('Course registration email delivery error', error)
    return NextResponse.json({ ok: false, delivery: 'mailto', fallback })
  }
}

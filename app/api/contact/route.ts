import { NextResponse } from 'next/server'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const data = await request.formData()
  const locale = data.get('locale') === 'en' ? 'en' : 'ro'
  const returnPath = locale === 'en' ? '/en/contact' : '/contact'
  if (data.get('website')) return NextResponse.redirect(new URL(returnPath, request.url), 303)

  const name = String(data.get('name') ?? '').trim()
  const email = String(data.get('email') ?? '').trim()
  const interest = String(data.get('interest') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()
  const consent = data.get('consent') === 'on'
  if (!name || !emailPattern.test(email) || !message || !consent) {
    return NextResponse.redirect(new URL(`${returnPath}?status=invalid`, request.url), 303)
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) return NextResponse.redirect(new URL(`${returnPath}?status=unavailable`, request.url), 303)

  let delivered = false
  try {
    const response = await fetch(webhook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, email, interest, message, locale }) })
    delivered = response.ok
  } catch {
    delivered = false
  }
  if (!delivered) return NextResponse.redirect(new URL(`${returnPath}?status=error`, request.url), 303)
  return NextResponse.redirect(new URL(locale === 'en' ? '/en/thank-you' : '/multumim', request.url), 303)
}

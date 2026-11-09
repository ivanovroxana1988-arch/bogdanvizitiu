import { NextResponse } from 'next/server'
import { quoteCourseVoucher } from '@/lib/course-vouchers'
import { checkContactRateLimit, getClientIdentifier } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const headers = { 'Cache-Control': 'no-store' }
  const limit = await checkContactRateLimit(getClientIdentifier(request))
  if (!limit.allowed) return NextResponse.json({ ok: false }, { status: 429, headers })
  try {
    const body = await request.text()
    if (body.length > 1000) return NextResponse.json({ ok: false }, { status: 413, headers })
    const raw = JSON.parse(body)
    const quote = quoteCourseVoucher(raw?.code, raw?.course, raw?.seats ?? 1)
    return NextResponse.json({ ok: Boolean(quote), quote }, { status: quote ? 200 : 400, headers })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers })
  }
}

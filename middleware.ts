import { NextRequest, NextResponse } from 'next/server'
import { resolveCanonicalRedirect } from '@/lib/redirects'

function protectSalesLab(request: NextRequest): NextResponse | null {
  if (request.nextUrl.pathname !== '/sales-lab' && !request.nextUrl.pathname.startsWith('/sales-lab/')) return null

  const password = process.env.SALES_LAB_PREVIEW_PASSWORD
  // Fail closed when no preview password is configured.
  if (!password) return new NextResponse('Private preview is not configured.', { status: 503, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } })

  const auth = request.headers.get('authorization')
  let provided = ''
  if (auth?.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6))
      provided = decoded.slice(decoded.indexOf(':') + 1)
    } catch { /* invalid credentials */ }
  }
  if (provided !== password) {
    return new NextResponse('Sales Lab — acces privat', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Sales Lab Private Preview", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export function middleware(request: NextRequest) {
  const preview = protectSalesLab(request)
  if (preview) return preview

  const url = request.nextUrl.clone()
  const target = resolveCanonicalRedirect({
    hostname: url.hostname,
    pathname: url.pathname,
    search: url.search,
  })

  if (!target) return NextResponse.next()

  url.hostname = target.hostname
  url.pathname = target.pathname
  url.search = target.search
  return NextResponse.redirect(url, 308)
}

export const config = { matcher: '/((?!_next/static|_next/image|favicon.ico).*)' }

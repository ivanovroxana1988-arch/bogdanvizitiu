import { NextRequest, NextResponse } from 'next/server'
import { resolveCanonicalRedirect } from '@/lib/redirects'

export function middleware(request: NextRequest) {
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

import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const isRomanian = request.nextUrl.pathname === '/ro' || request.nextUrl.pathname.startsWith('/ro/')
  requestHeaders.set('x-site-locale', isRomanian ? 'ro' : 'en')
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }

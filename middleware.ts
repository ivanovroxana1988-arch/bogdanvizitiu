import { NextResponse, type NextRequest } from 'next/server'

const legacyRoutes: Record<string, string> = {
  '/ro': '/',
  '/ro/despre': '/despre',
  '/ro/cursuri': '/cursuri',
  '/ro/coaching': '/coaching',
  '/ro/corporate': '/corporate',
  '/ro/media': '/media',
  '/ro/resurse': '/resurse',
  '/ro/contact': '/contact',
  '/about': '/en/about',
  '/programs': '/en/courses',
  '/insights': '/en/resources',
  '/speaking': '/en/media',
  '/privacy': '/en/privacy',
  '/terms': '/en/terms',
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const exactRedirect = legacyRoutes[pathname]
  const prefix = Object.keys(legacyRoutes).find((route) => pathname.startsWith(`${route}/`))
  const destination = exactRedirect ?? (prefix ? pathname.replace(prefix, legacyRoutes[prefix]) : null)
  if (destination) return NextResponse.redirect(new URL(destination, request.url), 308)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-locale', pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ro')
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }

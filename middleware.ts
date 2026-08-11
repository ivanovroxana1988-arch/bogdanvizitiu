import {NextRequest,NextResponse} from 'next/server'

const legacyRedirects:Record<string,string>={
  '/about':'/despre',
  '/programs':'/cursuri',
  '/programs/networking':'/cursuri/networking',
  '/programs/arta-negocierii':'/cursuri/arta-negocierii',
  '/speaking':'/media',
  '/privacy':'/confidentialitate',
  '/terms':'/termeni',
}

export function middleware(request:NextRequest){
  const url=request.nextUrl.clone()

  if(url.hostname==='www.bogdanvizitiu.com'){
    url.hostname='bogdanvizitiu.com'
    return NextResponse.redirect(url,308)
  }

  const redirectPath=legacyRedirects[url.pathname]
  if(redirectPath){
    url.pathname=redirectPath
    return NextResponse.redirect(url,308)
  }

  return NextResponse.next()
}

export const config={
  matcher:'/((?!_next/static|_next/image|favicon.ico).*)',
}

import {NextRequest,NextResponse} from 'next/server'
import {localizePath,type Locale} from '@/lib/routes'

const legacyEnglishExact:Record<string,string>={
  '/about':'/despre',
  '/programs':'/cursuri',
  '/speaking':'/media',
  '/privacy':'/confidentialitate',
  '/terms':'/termeni',
}

function legacyToRomanian(pathname:string){
  if(legacyEnglishExact[pathname])return legacyEnglishExact[pathname]
  if(pathname.startsWith('/programs/'))return `/cursuri/${pathname.slice('/programs/'.length)}`
  return pathname
}

function isLegacyEnglishPath(pathname:string){
  return Boolean(legacyEnglishExact[pathname])||pathname.startsWith('/programs/')
}

export function middleware(request:NextRequest){
  const url=request.nextUrl.clone()
  let shouldRedirect=false

  if(url.hostname==='www.bogdanvizitiu.com'){
    url.hostname='bogdanvizitiu.com'
    shouldRedirect=true
  }

  const requestedLocale=url.searchParams.get('lang')
  if(requestedLocale==='ro'||requestedLocale==='en'){
    const canonicalPath=legacyToRomanian(url.pathname)
    url.pathname=localizePath(canonicalPath,requestedLocale as Locale)
    url.searchParams.delete('lang')
    shouldRedirect=true
  }else if(isLegacyEnglishPath(url.pathname)){
    url.pathname=localizePath(legacyToRomanian(url.pathname),'en')
    shouldRedirect=true
  }

  return shouldRedirect?NextResponse.redirect(url,308):NextResponse.next()
}

export const config={matcher:'/((?!_next/static|_next/image|favicon.ico).*)'}

import {NextRequest,NextResponse} from 'next/server'

type Locale='ro'|'en'

const legacyRedirects:Record<string,string>={
  '/about':'/despre',
  '/programs':'/cursuri',
  '/programs/networking':'/cursuri/networking',
  '/programs/arta-negocierii':'/cursuri/arta-negocierii',
  '/speaking':'/media',
  '/privacy':'/confidentialitate',
  '/terms':'/termeni',
}

const staticPagePaths=new Set([
  '/',
  '/despre',
  '/cursuri',
  '/coaching',
  '/corporate',
  '/media',
  '/insights',
  '/resurse',
  '/contact',
  '/confidentialitate',
  '/termeni',
])

function stripEnglishPrefix(pathname:string){
  if(pathname==='/en')return '/'
  if(pathname.startsWith('/en/'))return pathname.slice(3)||'/'
  return pathname
}

function localizedPath(pathname:string,locale:Locale){
  return locale==='en'
    ? pathname==='/'?'/en':`/en${pathname}`
    : pathname
}

function canonicalLegacyPath(pathname:string){
  const direct=legacyRedirects[pathname]
  if(direct)return direct
  if(pathname.startsWith('/programs/'))return pathname.replace(/^\/programs\//,'/cursuri/')
  return pathname
}

function isPagePath(pathname:string){
  return staticPagePaths.has(pathname)
    || /^\/cursuri\/[^/]+$/.test(pathname)
    || /^\/insights\/[^/]+$/.test(pathname)
}

export function middleware(request:NextRequest){
  const url=request.nextUrl.clone()

  if(url.hostname==='www.bogdanvizitiu.com'){
    url.hostname='bogdanvizitiu.com'
    return NextResponse.redirect(url,308)
  }

  if(url.pathname==='/localized/ro'||url.pathname.startsWith('/localized/ro/')||url.pathname==='/localized/en'||url.pathname.startsWith('/localized/en/')){
    const parts=url.pathname.split('/').filter(Boolean)
    const locale=parts[1] as Locale
    const rest=parts.slice(2)
    const publicPath=rest.length?`/${rest.join('/')}`:'/'
    url.pathname=localizedPath(publicPath,locale)
    return NextResponse.redirect(url,308)
  }

  const pathLocale:Locale=url.pathname==='/en'||url.pathname.startsWith('/en/')?'en':'ro'
  const requestedLang=url.searchParams.get('lang')
  const locale:Locale=requestedLang==='en'?'en':requestedLang==='ro'?'ro':pathLocale
  const sourcePath=stripEnglishPrefix(url.pathname)
  const canonicalPath=canonicalLegacyPath(sourcePath)
  const publicPath=localizedPath(canonicalPath,locale)

  if(requestedLang!==null||publicPath!==url.pathname){
    url.searchParams.delete('lang')
    url.pathname=publicPath
    return NextResponse.redirect(url,308)
  }

  if(isPagePath(canonicalPath)){
    url.pathname=canonicalPath==='/'?`/localized/${locale}`:`/localized/${locale}${canonicalPath}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config={
  matcher:'/((?!_next/static|_next/image|favicon.ico).*)',
}

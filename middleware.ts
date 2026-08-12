import {NextRequest,NextResponse} from 'next/server'
import {localizePath,type Locale} from '@/lib/routes'

const legacyEnglishExact:Record<string,string>={
  '/about':'/despre',
  '/programs':'/cursuri',
  '/speaking':'/media',
  '/privacy':'/confidentialitate',
  '/terms':'/termeni',
}

const legacyEnglishPublic:Record<string,string>={
  '/en/programs/arta-negocierii':'/en/programs/negotiation-influence',
  '/en/insights/networkingul-nu-incepe-cu-schimbul-de-contacte':'/en/insights/networking-does-not-start-with-exchanging-contacts',
  '/en/insights/de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':'/en/insights/from-where-i-am-to-what-i-do-next-lives-model',
  '/en/insights/nu-invatam-doar-cu-mintea':'/en/insights/we-do-not-learn-with-the-mind-alone',
  '/en/insights/cat-din-viata-traim-pe-pilot-automat':'/en/insights/how-much-of-life-do-we-live-on-autopilot',
  '/en/insights/negocierea-nu-este-doar-despre-argumente':'/en/insights/negotiation-is-not-just-about-arguments',
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

  if(legacyEnglishPublic[url.pathname]){
    url.pathname=legacyEnglishPublic[url.pathname]
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

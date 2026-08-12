import { localizePath, type Locale } from './routes'

const legacyEnglishExact: Record<string, string> = {
  '/about': '/despre',
  '/programs': '/cursuri',
  '/speaking': '/media',
  '/privacy': '/confidentialitate',
  '/terms': '/termeni',
}

const legacyEnglishPublic: Record<string, string> = {
  '/en/programs/arta-negocierii': '/en/programs/negotiation-influence',
  '/en/insights/networkingul-nu-incepe-cu-schimbul-de-contacte':
    '/en/insights/networking-does-not-start-with-exchanging-contacts',
  '/en/insights/de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':
    '/en/insights/from-where-i-am-to-what-i-do-next-lives-model',
  '/en/insights/nu-invatam-doar-cu-mintea': '/en/insights/we-do-not-learn-with-the-mind-alone',
  '/en/insights/cat-din-viata-traim-pe-pilot-automat':
    '/en/insights/how-much-of-life-do-we-live-on-autopilot',
  '/en/insights/negocierea-nu-este-doar-despre-argumente':
    '/en/insights/negotiation-is-not-just-about-arguments',
}

function legacyToRomanian(pathname: string) {
  if (legacyEnglishExact[pathname]) return legacyEnglishExact[pathname]
  if (pathname.startsWith('/programs/')) return `/cursuri/${pathname.slice('/programs/'.length)}`
  return pathname
}

function isLegacyEnglishPath(pathname: string) {
  return Boolean(legacyEnglishExact[pathname]) || pathname.startsWith('/programs/')
}

export type RedirectInput = {
  hostname: string
  pathname: string
  search?: string
}

export type RedirectTarget = {
  hostname: string
  pathname: string
  search: string
}

export function resolveCanonicalRedirect({
  hostname,
  pathname,
  search = '',
}: RedirectInput): RedirectTarget | null {
  const searchParams = new URLSearchParams(search)
  let nextHostname = hostname
  let nextPathname = pathname
  let shouldRedirect = false

  if (nextHostname === 'www.bogdanvizitiu.com') {
    nextHostname = 'bogdanvizitiu.com'
    shouldRedirect = true
  }

  if (legacyEnglishPublic[nextPathname]) {
    nextPathname = legacyEnglishPublic[nextPathname]
    shouldRedirect = true
  }

  const requestedLocale = searchParams.get('lang')
  if (requestedLocale === 'ro' || requestedLocale === 'en') {
    const canonicalPath = legacyToRomanian(nextPathname)
    nextPathname = localizePath(canonicalPath, requestedLocale as Locale)
    searchParams.delete('lang')
    shouldRedirect = true
  } else if (isLegacyEnglishPath(nextPathname)) {
    nextPathname = localizePath(legacyToRomanian(nextPathname), 'en')
    shouldRedirect = true
  }

  if (!shouldRedirect) return null

  const nextSearch = searchParams.toString()
  return {
    hostname: nextHostname,
    pathname: nextPathname,
    search: nextSearch ? `?${nextSearch}` : '',
  }
}

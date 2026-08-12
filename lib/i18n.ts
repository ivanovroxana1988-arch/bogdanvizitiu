import siteCopy from '@/content/site-copy.json'
import homeCopy from '@/content/home-copy.json'
import commercialCopy from '@/content/commercial-copy.json'

export type Locale = 'ro' | 'en'

export function getLocale(value?: string | null): Locale {
  return value === 'en' ? 'en' : 'ro'
}

export function getCopy(locale: Locale) {
  return {
    ...siteCopy[locale],
    home: homeCopy[locale],
    programs: commercialCopy[locale].programs,
    programDetail: commercialCopy[locale].programDetail,
    corporate: commercialCopy[locale].corporate,
    speaking: commercialCopy[locale].speaking,
    contact: commercialCopy[locale].contact,
  }
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/'
  return pathname || '/'
}

export function withLocale(href: string, locale: Locale) {
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }

  const [base, hash] = href.split('#')
  const url = new URL(base, 'https://bogdanvizitiu.com')
  url.searchParams.delete('lang')

  const pathname = stripLocalePrefix(url.pathname)
  const localizedPath = locale === 'en'
    ? pathname === '/' ? '/en' : `/en${pathname}`
    : pathname
  const localized = `${localizedPath}${url.search}`

  return hash ? `${localized}#${hash}` : localized
}

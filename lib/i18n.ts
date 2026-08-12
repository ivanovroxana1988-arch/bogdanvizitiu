import siteCopy from '@/content/site-copy.json'
import homeCopy from '@/content/home-copy.json'
import commercialCopy from '@/content/commercial-copy.json'
import { localizePath, localeFromPathname, type Locale } from '@/lib/routes'

export type { Locale } from '@/lib/routes'

export function getLocale(value?: string | null): Locale {
  return value === 'en' ? 'en' : 'ro'
}

export const getLocaleFromPathname = localeFromPathname

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

export function withLocale(href: string, locale: Locale) {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  )
    return href

  const [base, hash] = href.split('#')
  const url = new URL(base || '/', 'https://bogdanvizitiu.com')
  url.searchParams.delete('lang')
  const localized = `${localizePath(url.pathname, locale)}${url.search}`
  return hash ? `${localized}#${hash}` : localized
}

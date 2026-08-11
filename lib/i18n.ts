import siteCopy from '@/content/site-copy.json'
import homeCopy from '@/content/home-copy.json'

export type Locale = 'ro' | 'en'

export function getLocale(value?: string | null): Locale {
  return value === 'en' ? 'en' : 'ro'
}

export function getCopy(locale: Locale) {
  return {
    ...siteCopy[locale],
    home: homeCopy[locale],
  }
}

export function withLocale(href: string, locale: Locale) {
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }

  const [base, hash] = href.split('#')
  const url = new URL(base, 'https://bogdanvizitiu.com')
  url.searchParams.set('lang', locale)
  const localized = `${url.pathname}${url.search}`
  return hash ? `${localized}#${hash}` : localized
}

import type { Metadata } from 'next'
import { localizePath, type Locale } from '@/lib/routes'

export const SITE_URL = 'https://bogdanvizitiu.com'

export function localizedUrl(path: string, locale: Locale) {
  return `${SITE_URL}${localizePath(path, locale)}`
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string
  description: string
  path: string
  locale: Locale
}): Metadata {
  const canonical = localizedUrl(path, locale)
  const socialImage = `${SITE_URL}/opengraph-image`
  const imageAlt = `${title} — Bogdan Vizitiu`
  // Sales Lab is currently Romanian-only; do not advertise a nonexistent English translation.
  const languageAlternates =
    path === '/sales-lab'
      ? { 'ro-RO': localizedUrl(path, 'ro'), 'x-default': localizedUrl(path, 'ro') }
      : {
          'ro-RO': localizedUrl(path, 'ro'),
          en: localizedUrl(path, 'en'),
          'x-default': localizedUrl(path, 'ro'),
        }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: 'Bogdan Vizitiu',
      locale: locale === 'ro' ? 'ro_RO' : 'en_GB',
      images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: socialImage, alt: imageAlt }],
    },
  }
}

export function siteIdentityJsonLd(locale: Locale = 'ro') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Bogdan Vizitiu',
        inLanguage: ['ro-RO', 'en'],
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Bogdan Vizitiu',
        url: localizedUrl('/despre', locale),
        image: `${SITE_URL}/images/bogdan/bogdan-hero.avif`,
        jobTitle: locale === 'ro' ? 'Coach, trainer, antreprenor' : 'Coach, trainer, entrepreneur',
        sameAs: [
          'https://www.linkedin.com/in/bogdan-vizitiu-pcc-1796a73/',
          'https://www.facebook.com/bogdan.o.vizitiu',
        ],
      },
    ],
  }
}

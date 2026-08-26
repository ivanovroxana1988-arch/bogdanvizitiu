import type { Metadata } from 'next'
import { ArrowLink, PageHero } from '@/components/ui'
import { getPublishedInsights } from '@/lib/data'
import servicePages from '@/content/service-pages.json'
import { getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata } from '@/lib/seo'

const resourceDefinitions = [
  {
    slug: 'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives',
    type: { ro: 'Model de coaching · 2020', en: 'Coaching model · 2020' },
  },
  {
    slug: 'nu-invatam-doar-cu-mintea',
    type: { ro: 'Research paper · 2020', en: 'Research paper · 2020' },
  },
  {
    slug: 'cat-din-viata-traim-pe-pilot-automat',
    type: { ro: 'Power Tool · 2020', en: 'Power Tool · 2020' },
  },
] as const

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  const copy = servicePages[locale].resources
  return buildPageMetadata({
    title: locale === 'ro' ? 'Resurse' : 'Resources',
    description: copy.intro,
    path: '/resurse',
    locale,
  })
}

export default function Resources({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = servicePages[locale].resources
  const insights = getPublishedInsights(locale)
  const resources = resourceDefinitions.flatMap((definition) => {
    const insight = insights.find((item) => item.slug === definition.slug)
    return insight ? [{ ...insight, type: definition.type[locale] }] : []
  })
  const nextTitle =
    locale === 'ro'
      ? 'Vrei să folosești ideile într-o situație reală?'
      : 'Want to use these ideas in a real situation?'

  return (
    <div className="conversion-page resources-conversion-page">
      <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      {resources.length > 0 && (
        <section className="programs shell conversion-content-section">
          {resources.map((item) => (
            <article className="program-row" key={item.slug}>
              <h3>{item.title}</h3>
              <p>
                {item.type}
                <br />
                {item.excerpt}
              </p>
              <ArrowLink href={localizePath(`/insights/${item.slug}`, locale)}>
                {locale === 'ro' ? 'Citește sinteza' : 'Read the summary'}
              </ArrowLink>
            </article>
          ))}
        </section>
      )}
      <section className="final-loop">
        <div className="shell final-grid">
          <h2>{nextTitle}</h2>
          <div className="conversion-action-list">
            <ArrowLink href={localizePath('/cursuri', locale)}>
              {locale === 'ro' ? 'Cursuri' : 'Programs'}
            </ArrowLink>
            <ArrowLink href={localizePath('/coaching', locale)}>Coaching</ArrowLink>
            <ArrowLink href={localizePath('/corporate', locale)}>
              {locale === 'ro' ? 'Pentru organizații' : 'For organizations'}
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  )
}

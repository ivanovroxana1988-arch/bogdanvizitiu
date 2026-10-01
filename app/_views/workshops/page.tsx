import type { Metadata } from 'next'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { JsonLd } from '@/components/json-ld'
import workshops from '@/content/workshops.json'
import { getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata, localizedUrl, SITE_URL } from '@/lib/seo'
import styles from './workshops.module.css'

type WorkshopCopy = (typeof workshops)['ro']

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  return buildPageMetadata({
    title:
      locale === 'ro'
        ? 'Workshopuri corporate pentru echipe, leadership și schimbare'
        : 'Corporate workshops for teams, leadership and change',
    description:
      locale === 'ro'
        ? 'Workshopuri aplicate pentru reziliență, decizii în incertitudine, comunicare, flow, feedback, schimbare, colaborare și gândire sistemică.'
        : 'Applied workshops for resilience, decision-making under uncertainty, communication, flow, feedback, change, collaboration and systems thinking.',
    path: '/workshopuri',
    locale,
  })
}

export default function Workshops({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = workshops[locale] as WorkshopCopy
  const canonical = localizedUrl('/workshopuri', locale)
  const contactHref = `${localizePath('/contact', locale)}?source=workshops`

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name:
      locale === 'ro'
        ? 'Workshopuri corporate Bogdan Vizitiu'
        : 'Bogdan Vizitiu corporate workshops',
    description: copy.intro,
    url: canonical,
    provider: { '@id': `${SITE_URL}/#person` },
    serviceType:
      locale === 'ro'
        ? 'Workshopuri corporate și experiențe de învățare'
        : 'Corporate workshops and learning experiences',
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en',
  }

  return (
    <div className={styles.page}>
      <JsonLd data={serviceJsonLd} />

      <section className={styles.hero}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={styles.heroGrid}>
          <h1>{copy.title}</h1>
          <div>
            <p className={styles.heroLead}>{copy.intro}</p>
            <div className={styles.meta}>
              <strong>{copy.formatLabel}</strong>
              <span>{copy.formatValue}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.approachInner}>
          <Eyebrow>{copy.approachEyebrow}</Eyebrow>
          <div>
            <h2>{copy.approachTitle}</h2>
            <p>{copy.approachText}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{locale === 'ro' ? 'Portofoliu' : 'Portfolio'}</Eyebrow>
          <h2>
            {locale === 'ro'
              ? 'Zece teme. Un singur criteriu: să poată fi folosite în munca reală.'
              : 'Ten themes. One criterion: they must work in real work.'}
          </h2>
        </div>

        <div className={styles.workshopList}>
          {copy.items.map((item) => (
            <details className={styles.workshop} key={item.number}>
              <summary className={styles.summary}>
                <span className={styles.number}>{item.number}</span>
                <div className={styles.titleWrap}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <p className={styles.promise}>{item.promise}</p>
                <span className={styles.plus} aria-hidden>
                  +
                </span>
              </summary>
              <div className={styles.detail}>
                <span aria-hidden />
                <div className={styles.detailColumn}>
                  <span className={styles.detailLabel}>
                    {locale === 'ro' ? 'Experiența' : 'Experience'}
                  </span>
                  <ul>
                    {item.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.detailColumn}>
                  <span className={styles.detailLabel}>
                    {locale === 'ro' ? 'Rezultate urmărite' : 'Intended outcomes'}
                  </span>
                  <ul>
                    {item.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={styles.cta}>
          <h2>{copy.tailoredTitle}</h2>
          <div>
            <p>{copy.tailoredText}</p>
            <ArrowLink href={contactHref}>{copy.cta}</ArrowLink>
          </div>
        </div>
      </section>
    </div>
  )
}

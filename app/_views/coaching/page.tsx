import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { JsonLd } from '@/components/json-ld'
import media from '@/content/media.json'
import servicePages from '@/content/service-pages.json'
import { getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata, localizedUrl, SITE_URL } from '@/lib/seo'
import styles from './coaching.module.css'

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  return buildPageMetadata({
    title:
      locale === 'ro'
        ? 'Coaching pentru decizii, carieră și performanță'
        : 'Coaching for decisions, career and performance',
    description:
      locale === 'ro'
        ? 'Coaching individual pentru manageri și profesioniști care vor să clarifice decizii, roluri, schimbări de carieră și situații profesionale dificile.'
        : 'Individual coaching for managers and professionals who want to clarify decisions, roles, career transitions and difficult professional situations.',
    path: '/coaching',
    locale,
  })
}

export default function Coaching({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = servicePages[locale].coaching
  const coachingImage = media.images.coaching
  const contactHref = `${localizePath('/contact', locale)}?source=coaching`
  const canonical = localizedUrl('/coaching', locale)
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: locale === 'ro' ? 'Coaching individual pentru manageri și profesioniști' : 'Individual coaching for managers and professionals',
    description: copy.intro,
    url: canonical,
    serviceType: 'Coaching',
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en',
    provider: { '@id': `${SITE_URL}/#person` },
  }

  return (
    <div className="conversion-page coaching-conversion-page">
      <JsonLd data={serviceJsonLd} />
      <section className={`page-hero shell ${styles.hero}`}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.intro}>{copy.intro}</p>
            <div className="conversion-inline-action">
              <ArrowLink href={contactHref}>
                {locale === 'ro'
                  ? 'Descrie situația pe care vrei să o lucrezi'
                  : 'Describe the situation you want to work on'}
              </ArrowLink>
            </div>
          </div>
          <figure className={styles.portrait}>
            <Image
              src={coachingImage.src}
              alt={locale === 'ro' ? coachingImage.alt : coachingImage.alt_en}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 38vw"
            />
          </figure>
        </div>
      </section>

      <section className="shell conversion-content-section">
        <div className="prose" style={{ maxWidth: '900px' }}>
          <Eyebrow>{locale === 'ro' ? 'Direcții de lucru' : 'Working directions'}</Eyebrow>
          {copy.areas.map((area) => (
            <article key={area.title}>
              <h2>{area.title}</h2>
              <p>{area.text}</p>
              {'href' in area && area.href && 'linkLabel' in area && area.linkLabel ? (
                <ArrowLink href={localizePath(area.href, locale)}>{area.linkLabel}</ArrowLink>
              ) : (
                <ArrowLink href={contactHref}>
                  {locale === 'ro' ? 'Programează o discuție' : 'Schedule a conversation'}
                </ArrowLink>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="shell conversion-content-section" aria-labelledby="coaching-next-step">
        <div className="prose" style={{ maxWidth: '900px' }}>
          <Eyebrow>{locale === 'ro' ? 'Alege intervenția potrivită' : 'Find the right support'}</Eyebrow>
          <h2 id="coaching-next-step">
            {locale === 'ro'
              ? 'Coaching individual sau executive coaching?'
              : 'Individual or executive coaching?'}
          </h2>
          <p>
            {locale === 'ro'
              ? 'Dacă lucrezi cu decizii de leadership, responsabilități manageriale sau conversații dificile, explorează și formatul de executive coaching.'
              : 'If you work through leadership decisions, management responsibilities or difficult conversations, explore executive coaching.'}
          </p>
          <ArrowLink href={localizePath('/coaching/executive-coaching', locale)}>
            {locale === 'ro' ? 'Executive coaching pentru manageri și lideri' : 'Executive coaching for managers and leaders'}
          </ArrowLink>
          <p>
            {locale === 'ro'
              ? 'Nu ești sigur dacă ai nevoie de coaching sau consultanță? Citește comparația înainte să alegi.'
              : 'Not sure whether you need coaching or consulting? Read the comparison before deciding.'}
          </p>
          <ArrowLink href={localizePath('/insights/coaching-sau-consultanta-de-ce-ai-nevoie-de-fapt', locale)}>
            {locale === 'ro' ? 'Coaching sau consultanță: de ce ai nevoie?' : 'Coaching or consulting: what do you need?'}
          </ArrowLink>
        </div>
      </section>

      <section className="final-loop">
        <div className="shell final-grid">
          <h2>{copy.ctaTitle}</h2>
          <div>
            <ArrowLink href={contactHref}>{copy.cta}</ArrowLink>
          </div>
        </div>
      </section>
    </div>
  )
}

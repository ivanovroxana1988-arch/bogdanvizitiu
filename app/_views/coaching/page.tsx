import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLink, Eyebrow } from '@/components/ui'
import media from '@/content/media.json'
import servicePages from '@/content/service-pages.json'
import { getLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
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

  return (
    <>
      <section className={`page-hero shell ${styles.hero}`}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.intro}>{copy.intro}</p>
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
      <section className="shell">
        <div className="prose" style={{ maxWidth: '900px' }}>
          <Eyebrow>{locale === 'ro' ? 'Direcții de lucru' : 'Working directions'}</Eyebrow>
          {copy.areas.map((area) => (
            <article key={area.title}>
              <h2>{area.title}</h2>
              <p>{area.text}</p>
              {'href' in area && area.href && 'linkLabel' in area && area.linkLabel ? (
                <ArrowLink href={area.href}>{area.linkLabel}</ArrowLink>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <section className="final-loop">
        <div className="shell final-grid">
          <h2>{copy.ctaTitle}</h2>
          <div>
            <ArrowLink href={locale === 'ro' ? '/contact' : '/en/contact'}>{copy.cta}</ArrowLink>
          </div>
        </div>
      </section>
    </>
  )
}

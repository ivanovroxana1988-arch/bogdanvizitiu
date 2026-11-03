import type { Metadata } from 'next'
import Image from 'next/image'
import { CourseCatalog } from '@/components/course-catalog'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { getPrograms } from '@/lib/data'
import { getCopy, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata } from '@/lib/seo'
import styles from '../commercial.module.css'
import featureStyles from './featured-sales-lab.module.css'

type SearchParams = {
  lang?: string
  categorie?: string
  category?: string
}

export function generateMetadata({ searchParams }: { searchParams?: SearchParams }): Metadata {
  const locale = getLocale(searchParams?.lang)
  return buildPageMetadata({
    title:
      locale === 'ro'
        ? 'Cursuri open: vânzări, negociere și leadership | Bogdan Vizitiu'
        : 'Open courses for professionals: leadership, negotiation and networking',
    description:
      locale === 'ro'
        ? 'Cursuri și programe pentru profesioniști și organizații care vor să lucreze practic pe leadership, AI, dezvoltare, potențial, echipe, negociere, influență, networking și relații profesionale.'
        : 'Open courses for professionals who want practical work on leadership, teams, negotiation, influence, networking and professional relationships.',
    path: '/cursuri',
    locale,
  })
}

export default function Programs({ searchParams }: { searchParams?: SearchParams }) {
  const locale = getLocale(searchParams?.lang)
  const copy = getCopy(locale).programs
  const openPrograms = getPrograms(locale)
  const programs =
    locale === 'ro'
      ? [
          ...openPrograms,
          {
            slug: 'leadership-ai',
            title: 'Leadership in the AI Era',
            description:
              'Pentru manageri și organizații care vor reguli mai clare pentru delegare, verificare, autonomie și responsabilitate atunci când AI intră în munca reală.',
            href: '/cursuri/leadership-ai',
            canRegister: false,
            availabilityLabel: 'Program corporate',
            actionLabel: 'Vezi programul',
          },
          {
            slug: 'act-adapt-execute',
            title: 'ACT · ADAPT · EXECUTE',
            description:
              'Pentru manageri, profesioniști și echipe care vor să transforme dezvoltarea din intenție în comportamente, experimente și transfer observabil în munca reală.',
            href: '/cursuri/act-adapt-execute',
            canRegister: false,
            availabilityLabel: 'Program corporate · 6 zile',
            actionLabel: 'Vezi programul',
          },
        ]
      : openPrograms
  const initialCategory = locale === 'ro' ? searchParams?.categorie : searchParams?.category

  return (
    <div className={`${styles.page} balanced-commercial-page conversion-page`}>
      <section className={styles.hero}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={styles.heroGrid}>
          <h1>{copy.title}</h1>
          <p className={styles.heroIntro}>{copy.intro}</p>
        </div>
      </section>

      {locale === 'ro' && (
        <section className={featureStyles.featured} aria-labelledby="featured-sales-lab-title">
          <div className={featureStyles.copy}>
            <p className={featureStyles.eyebrow}>Înscrieri deschise · Curs recomandat</p>
            <h2 id="featured-sales-lab-title">Sales <em>Lab.</em></h2>
            <p className={featureStyles.lead}>Curs practic de vânzări și negociere.</p>
            <p className={featureStyles.description}>Două zile de exerciții, simulări și feedback pe conversații comerciale reale.</p>
            <p className={featureStyles.details}>21–22 ianuarie 2027 · București · 16 ore · Maximum 15 participanți</p>
            <p className={featureStyles.price}>600 EUR <span>/ participant</span></p>
            <a className={featureStyles.action} href="/sales-lab">Vezi programul și solicită înscrierea <span aria-hidden="true">↗</span></a>
          </div>
          <div className={featureStyles.visual}>
            <Image src="/images/sales-lab/761c3d0c-2526-43a0-9779-31c2d4fbda90.png" alt="Imagine de prezentare Sales Lab" fill sizes="(max-width: 760px) 100vw, 46vw" className={featureStyles.image} />
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="courses-catalog-title">
        {locale === 'ro' && (
          <div className={featureStyles.catalogHeading}>
            <Eyebrow>Explorează programele</Eyebrow>
            <h2 id="courses-catalog-title" className={styles.sectionTitle}>Cursuri viitoare</h2>
          </div>
        )}
        <CourseCatalog
          locale={locale}
          programs={programs}
          initialCategory={initialCategory}
          viewProgramLabel={copy.viewProgram}
        />
      </section>

      <section className={styles.cta}>
        <Eyebrow>{locale === 'ro' ? 'Pentru organizații' : 'For organizations'}</Eyebrow>
        <h2 className={styles.ctaTitle}>{copy.tailoredTitle}</h2>
        <p className={styles.sectionIntro} style={{ maxWidth: '640px', marginBottom: '28px' }}>
          {copy.tailoredText}
        </p>
        <ArrowLink href={localizePath('/corporate', locale)}>{copy.tailoredCta}</ArrowLink>
      </section>
    </div>
  )
}

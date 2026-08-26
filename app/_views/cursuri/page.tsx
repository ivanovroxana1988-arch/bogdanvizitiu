import type { Metadata } from 'next'
import { CourseCatalog } from '@/components/course-catalog'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { getPrograms } from '@/lib/data'
import { getCopy, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata } from '@/lib/seo'
import styles from '../commercial.module.css'

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
        ? 'Cursuri pentru profesioniști: leadership, AI, negociere și networking'
        : 'Open courses for professionals: leadership, negotiation and networking',
    description:
      locale === 'ro'
        ? 'Cursuri și programe pentru profesioniști și organizații care vor să lucreze practic pe leadership, AI, echipe, negociere, influență, networking și relații profesionale.'
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
            slug: 'leadership-ai-draft',
            title: 'Leadership in the AI Era',
            description:
              'Pentru manageri și organizații care vor reguli mai clare pentru delegare, verificare, autonomie și responsabilitate atunci când AI intră în munca reală.',
            href: '/cursuri/leadership-ai-draft',
            canRegister: false,
            availabilityLabel: 'Program corporate',
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

      <section className={styles.section}>
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

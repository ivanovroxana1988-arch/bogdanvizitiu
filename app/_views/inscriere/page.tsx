import type { Metadata } from 'next'
import { Eyebrow } from '@/components/ui'
import { RegistrationForm } from '@/components/registration-form'
import { getPrograms } from '@/lib/data'
import { getLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import styles from '../commercial.module.css'

type SearchParams = {
  lang?: string
  course?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export function generateMetadata({ searchParams }: { searchParams?: SearchParams }): Metadata {
  const locale = getLocale(searchParams?.lang)
  const metadata = buildPageMetadata({
    title: locale === 'ro' ? 'Înscriere curs' : 'Course registration',
    description:
      locale === 'ro'
        ? 'Formular de înscriere pentru cursurile Bogdan Vizitiu.'
        : 'Registration form for Bogdan Vizitiu courses.',
    path: '/inscriere',
    locale,
  })

  return {
    ...metadata,
    robots: { index: false, follow: false },
  }
}

export default function Registration({ searchParams }: { searchParams?: SearchParams }) {
  const locale = getLocale(searchParams?.lang)
  const programs = getPrograms(locale)
  const selected = programs.find((program) => program.slug === searchParams?.course) ?? programs[0]

  if (!selected) return null

  const copy =
    locale === 'ro'
      ? {
          eyebrow: 'Înscriere',
          title: 'Lasă-ne datele și revenim cu detaliile.',
          intro:
            'Nume, email și telefon. Cursul este deja selectat, iar noi revenim cu informațiile practice.',
          selected: 'Curs selectat',
        }
      : {
          eyebrow: 'Registration',
          title: 'Leave your details and we will follow up with the next steps.',
          intro: 'Name, email and phone. The course is already selected and we will follow up with the practical details.',
          selected: 'Selected course',
        }

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
        <div className={styles.contactLayout}>
          <div className={styles.contactLead}>
            <Eyebrow>{copy.selected}</Eyebrow>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
          </div>

          <RegistrationForm
            locale={locale}
            courseSlug={selected.slug}
            courseTitle={selected.title}
            tracking={{
              source: searchParams?.source,
              utm_source: searchParams?.utm_source,
              utm_medium: searchParams?.utm_medium,
              utm_campaign: searchParams?.utm_campaign,
            }}
          />
        </div>
      </section>
    </div>
  )
}

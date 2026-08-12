import type { Metadata } from 'next'
import { Eyebrow } from '@/components/ui'
import { ContactForm } from '@/components/contact-form'
import business from '@/content/business.json'
import contactCopy from '@/content/contact-copy.json'
import { getLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import styles from '../commercial.module.css'

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  const copy = contactCopy[locale]
  return buildPageMetadata({
    title: 'Contact',
    description: copy.intro,
    path: '/contact',
    locale,
  })
}

export default function Contact({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = contactCopy[locale]

  return (
    <div className={`${styles.page} balanced-commercial-page`}>
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
            <Eyebrow>{copy.formEyebrow}</Eyebrow>
            <h2>{copy.formTitle}</h2>
            <p>{copy.formText}</p>
            <p style={{ marginTop: 28, lineHeight: 1.8 }}>
              <a href={`mailto:${business.email}`}>
                <strong>{business.email}</strong>
              </a>
              <br />
              <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--commercial-muted)' }}>
              {business.legalName} · CUI {business.taxId}
            </p>
          </div>

          <ContactForm locale={locale} />
        </div>
      </section>
    </div>
  )
}

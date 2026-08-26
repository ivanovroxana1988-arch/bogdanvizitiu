import type { Metadata } from 'next'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { JsonLd } from '@/components/json-ld'
import { getCopy, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata, localizedUrl, SITE_URL } from '@/lib/seo'
import styles from '../commercial.module.css'

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  return buildPageMetadata({
    title:
      locale === 'ro'
        ? 'Programe corporate pentru leadership, negociere și echipe'
        : 'Corporate programs for leadership, negotiation and teams',
    description:
      locale === 'ro'
        ? 'Programe corporate pentru manageri și echipe, construite în jurul contextului real al organizației: leadership, negociere, colaborare și conversații dificile.'
        : 'Corporate programs for managers and teams built around the organization’s real context: leadership, negotiation, collaboration and difficult conversations.',
    path: '/corporate',
    locale,
  })
}

export default function Corporate({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = getCopy(locale).corporate
  const canonical = localizedUrl('/corporate', locale)
  const contactHref = `${localizePath('/contact', locale)}?source=corporate`

  const heroTitle =
    locale === 'ro'
      ? 'Nu pornim de la curs. Pornim de la problema reală.'
      : 'We do not start with the course. We start with the real problem.'
  const diagnosticItems =
    locale === 'ro'
      ? copy.diagnosticItems.map((item) =>
          item.replace('ce trebuie să facă oamenii diferit', 'ce vrem să facă oamenii diferit'),
        )
      : copy.diagnosticItems
  const processItems =
    locale === 'ro'
      ? copy.processItems.map((item) =>
          item.title === 'Definim ce trebuie să fie diferit'
            ? { ...item, title: 'Definim ce vrem să fie diferit' }
            : item,
        )
      : copy.processItems
  const ctaTitle =
    locale === 'ro' ? 'Ce vrei să funcționeze mai bine după intervenție?' : copy.ctaTitle

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name:
      locale === 'ro'
        ? 'Programe corporate pentru leadership, negociere și echipe'
        : 'Corporate programs for leadership, negotiation and teams',
    description: copy.intro,
    url: canonical,
    provider: { '@id': `${SITE_URL}/#person` },
    serviceType:
      locale === 'ro'
        ? 'Training, workshop, facilitare și coaching pentru organizații'
        : 'Training, workshops, facilitation and coaching for organizations',
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en',
  }

  return (
    <div className={`${styles.page} balanced-commercial-page conversion-page`}>
      <JsonLd data={serviceJsonLd} />

      <section className={styles.hero}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={styles.heroGrid}>
          <h1>{heroTitle}</h1>
          <div className="conversion-hero-copy">
            <p className={styles.heroIntro}>{copy.intro}</p>
            <ArrowLink href={contactHref}>
              {locale === 'ro' ? 'Descrie problema organizației' : 'Describe the organization’s challenge'}
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className={styles.diagnostic}>
        <div className={styles.diagnosticInner}>
          <div>
            <Eyebrow>{copy.diagnosticEyebrow}</Eyebrow>
            <h2 className={styles.statementSmall}>{copy.diagnosticTitle}</h2>
          </div>
          <div>
            <ul className={`${styles.diagnosticList} clean-diagnostic-list`}>
              {diagnosticItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="conversion-inline-action">
              <ArrowLink href={contactHref}>
                {locale === 'ro' ? 'Spune-ne ce se întâmplă acum' : 'Tell us what is happening now'}
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.processEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.processTitle}</h2>
          </div>
        </div>
        <div className={styles.processList}>
          {processItems.map((item) => (
            <article className={`${styles.processRow} clean-process-row`} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.domainsEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.domainsTitle}</h2>
          </div>
        </div>
        <div className={styles.twoGrid}>
          {copy.blocks.map((block) => (
            <article className={styles.editorialCard} key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.practice}>
        <div className={styles.practiceInner}>
          <div>
            <Eyebrow>{copy.formatsEyebrow}</Eyebrow>
          </div>
          <div>
            <h2 className={styles.statementSmall}>{copy.formatsTitle}</h2>
            <div
              className={styles.themeList}
              style={{ marginTop: '30px', borderTopColor: '#55554f' }}
            >
              {copy.formats.map((format) => (
                <div className={styles.themeItem} key={format}>
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proof}>
        <div className={styles.proofInner}>
          <div>
            <Eyebrow>{copy.proofEyebrow}</Eyebrow>
          </div>
          <article className={styles.proofCard}>
            <h3>{copy.proofTitle}</h3>
            <p>{copy.proofText}</p>
            <ArrowLink href={localizePath('/despre', locale)}>
              {locale === 'ro' ? 'Vezi parcursul lui Bogdan' : 'See Bogdan’s background'}
            </ArrowLink>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
        <ArrowLink href={contactHref}>{copy.cta}</ArrowLink>
      </section>
    </div>
  )
}

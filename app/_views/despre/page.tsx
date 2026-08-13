import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { EditorialImage } from '@/components/portrait'
import { getCopy, getLocale } from '@/lib/i18n'
import aboutCopy from '@/content/about-copy.json'
import { buildPageMetadata } from '@/lib/seo'
import styles from '../commercial.module.css'
import heroStyles from './about-hero.module.css'

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  const copy = aboutCopy[locale]
  return buildPageMetadata({
    title: locale === 'ro' ? 'Despre Bogdan' : 'About Bogdan',
    description: copy.intro,
    path: '/despre',
    locale,
  })
}

export default function About({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = aboutCopy[locale]
  const contactCopy = getCopy(locale).contact
  const contactLabel = locale === 'ro' ? 'Începe o conversație' : 'Start a conversation'
  const careerIntro =
    locale === 'ro'
      ? 'Două repere care au format baza comercială și de consultanță a modului în care lucrez astăzi.'
      : 'Two milestones that shaped the commercial and consulting foundation of how I work today.'

  return (
    <div className={`${styles.page} balanced-commercial-page`}>
      <section className={styles.hero}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={heroStyles.grid}>
          <h1 className={heroStyles.title}>{copy.titleLines.join(' ')}</h1>
          <div className={heroStyles.aside}>
            <p className={heroStyles.intro}>{copy.intro}</p>
            <div className={heroStyles.proof} aria-label={`${copy.proofValue} ${copy.proofLabel}`}>
              <strong className={heroStyles.proofValue}>{copy.proofValue}</strong>
              <span className={heroStyles.proofLabel}>{copy.proofLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.aboutNarrative}>
          <EditorialImage asset="portraitDark" kind="portrait" locale={locale} />
          <div className={styles.prose}>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className={styles.roleLine}>{copy.roleLine}</p>
            <p>{copy.closing}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} id="how-i-work">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.methodEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.methodTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.methodIntro}</p>
        </div>
        <div className={styles.processList}>
          {copy.methodItems.map((item) => (
            <article className={`${styles.processRow} clean-process-row`} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.proof} id="professional-journey">
        <div className={styles.proofInner}>
          <div>
            <Eyebrow>{copy.careerEyebrow}</Eyebrow>
            <h2 className={styles.statementSmall}>{copy.careerTitle}</h2>
            <p style={{ color: 'rgba(250,249,246,.9)', lineHeight: 1.75, marginTop: '28px' }}>
              {careerIntro}
            </p>
          </div>
          <div className={styles.processList}>
            {copy.careerItems.slice(0, 2).map((item) => (
              <article className={`${styles.processRow} clean-process-row`} key={item.title}>
                <h3 style={{ color: '#faf9f6' }}>{item.title}</h3>
                <p style={{ color: 'rgba(250,249,246,.9)' }}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="credentials">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.credentialsEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.credentialsTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.credentialsIntro}</p>
        </div>
        <div className={styles.twoGrid}>
          {copy.credentialItems.map((item) => (
            <article className={styles.editorialCard} key={item.title}>
              <div
                style={{
                  minHeight: '58px',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '18px',
                }}
              >
                <Image
                  src={item.logo}
                  alt={item.issuer}
                  width={170}
                  height={58}
                  style={{ width: 'auto', height: 'auto', maxWidth: '170px', maxHeight: '58px' }}
                />
              </div>
              <h3>{item.title}</h3>
              <p style={{ fontWeight: 600 }}>{item.issuer}</p>
              <p>{item.description}</p>
              <a
                className="arrow-link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '18px', display: 'inline-flex' }}
              >
                {item.cta} <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="roles">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.rolesEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.rolesTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.rolesIntro}</p>
        </div>
        <div
          className={styles.twoGrid}
          style={{
            borderLeft: '1px solid var(--line, #b7c0c0)',
            borderRight: '1px solid var(--line, #b7c0c0)',
          }}
        >
          {copy.rolesItems.map((item, index) => (
            <article
              className={styles.editorialCard}
              key={item.title}
              style={index % 2 === 0 ? { borderLeft: 0, paddingLeft: 0 } : undefined}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="entrepreneurship">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.entrepreneurEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.entrepreneurTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.entrepreneurIntro}</p>
        </div>
        <div className={styles.twoGrid}>
          {copy.entrepreneurItems.map((item) => (
            <article className={styles.editorialCard} key={item.title}>
              <div
                style={{
                  minHeight: '72px',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '18px',
                }}
              >
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={180}
                  height={72}
                  style={{ width: 'auto', height: 'auto', maxWidth: '180px', maxHeight: '72px' }}
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="projects-and-partnerships">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.partnershipsEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.partnershipsTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.partnershipsIntro}</p>
        </div>
        <div className={styles.twoGrid}>
          {copy.partnershipItems.map((item) => (
            <article className={styles.editorialCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a
                className="arrow-link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '18px', display: 'inline-flex' }}
              >
                {item.cta} <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="online-publications">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.resourcesEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.resourcesTitle}</h2>
          </div>
          <div className={styles.sectionIntro}>
            <p style={{ marginTop: 0 }}>{copy.resourcesIntro}</p>
            <ArrowLink href="/resurse">{copy.resourcesCta}</ArrowLink>
          </div>
        </div>
      </section>

      <section className={styles.section} id="beyond-roles">
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.personalEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.personalTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.personalText}</p>
        </div>
      </section>

      <section className={styles.cta}>
        <Eyebrow>{contactCopy.eyebrow}</Eyebrow>
        <h2 className={styles.ctaTitle}>{contactCopy.title}</h2>
        <ArrowLink href="/contact">{contactLabel}</ArrowLink>
      </section>
    </div>
  )
}

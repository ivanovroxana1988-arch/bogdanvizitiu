import Image from 'next/image'
import { Eyebrow } from '@/components/ui'
import journeyCopy from '@/content/professional-journey.json'
import styles from './professional-journey.module.css'

type Locale = 'ro' | 'en'

const corporateLogos: Record<string, string> = {
  'Orange România': '/images/logos/orange.svg',
  'Orange Romania': '/images/logos/orange.svg',
  'Trend Consult Group': '/images/logos/trend-consult.svg',
}

const entrepreneurLogoOverrides: Record<string, string> = {
  YoungMinds: '/images/logos/youngminds-brand.svg',
}

export default function ProfessionalJourney({
  locale,
  eyebrow,
  title,
}: {
  locale: Locale
  eyebrow: string
  title: string
}) {
  const copy = journeyCopy[locale]

  return (
    <section className={styles.section} id="professional-journey">
      <div className={styles.grid}>
        <div className={styles.intro}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.accent} aria-hidden />
          <p className={styles.introText}>{copy.intro}</p>
        </div>

        <div className={styles.column}>
          <p className={styles.columnLabel}>{copy.corporateLabel}</p>
          <div className={styles.entries}>
            {copy.corporate.map((item) => {
              const logo = corporateLogos[item.title]

              return (
                <article className={styles.entry} key={item.title}>
                  <div className={styles.entryHeader}>
                    {logo ? (
                      <div className={styles.logoWrap}>
                        <Image
                          className={styles.logo}
                          src={logo}
                          alt={`${item.title} logo`}
                          width={180}
                          height={90}
                        />
                      </div>
                    ) : null}
                    <div className={styles.entryHeading}>
                      <h3 className={styles.entryTitle}>{item.title}</h3>
                      {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                    </div>
                  </div>
                  <div className={styles.paragraphs}>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.columnLabel}>{copy.entrepreneurLabel}</p>
          <div className={styles.entries}>
            {copy.entrepreneur.map((item) => {
              const logo = entrepreneurLogoOverrides[item.title] ?? item.logo

              return (
                <article className={styles.entry} key={item.title}>
                  <div className={styles.entryHeader}>
                    <div className={styles.logoWrap}>
                      <Image
                        className={styles.logo}
                        src={logo}
                        alt={`${item.title} logo`}
                        width={180}
                        height={90}
                      />
                    </div>
                    <div className={styles.entryHeading}>
                      <h3 className={styles.entryTitle}>{item.title}</h3>
                      {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                    </div>
                  </div>
                  <div className={styles.paragraphs}>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
      <p className={styles.footer}>{copy.footer}</p>
    </section>
  )
}

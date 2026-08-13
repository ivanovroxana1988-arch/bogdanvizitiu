import Link from 'next/link'
import portfolio from '@/content/portfolio.json'
import styles from './portfolio-marquee.module.css'

type Locale = 'ro' | 'en'

const organizations = Array.from(new Set(portfolio.groups.flatMap((group) => group.organizations)))

const logoAssets = portfolio.logoAssets as Record<string, string>

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.track} aria-hidden={hidden || undefined}>
      {organizations.map((name) => {
        const logo = logoAssets[name]
        return (
          <div className={styles.logoSlot} key={`${hidden ? 'copy-' : ''}${name}`}>
            {logo ? (
              <img
                src={logo}
                alt={hidden ? '' : name}
                className={styles.logoImage}
                loading="lazy"
              />
            ) : (
              <span className={styles.wordmark}>{name}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function PortfolioMarquee({ locale }: { locale: Locale }) {
  const href = locale === 'ro' ? '/portofoliu' : '/en/portfolio'
  return (
    <section className={styles.section} aria-labelledby="portfolio-marquee-title">
      <div className={`shell ${styles.header}`}>
        <div>
          <p className={styles.eyebrow}>
            {locale === 'ro' ? 'Experiență aplicată' : 'Applied experience'}
          </p>
          <h2 id="portfolio-marquee-title" className={styles.title}>
            {locale === 'ro' ? 'Organizații cu care am lucrat' : 'Organizations I have worked with'}
          </h2>
        </div>
        <Link href={href} className={styles.link}>
          {locale === 'ro' ? 'Vezi portofoliul complet' : 'View the full portfolio'} →
        </Link>
      </div>
      <div className={styles.viewport}>
        <div className={styles.runner}>
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ui'
import { getLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import portfolio from '@/content/portfolio.json'
import styles from './portfolio.module.css'

const logoAssets = portfolio.logoAssets as Record<string, string>

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  return buildPageMetadata({
    title: locale === 'ro' ? 'Portofoliu de experiență' : 'Experience portfolio',
    description:
      locale === 'ro'
        ? 'Organizații și contexte în care Bogdan Vizitiu a livrat training, coaching, facilitare și programe de dezvoltare.'
        : 'Organizations and contexts in which Bogdan Vizitiu has delivered training, coaching, facilitation and development programs.',
    path: '/portofoliu',
    locale,
  })
}

export default function Portfolio({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)

  return (
    <main className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <p className={styles.eyebrow}>{locale === 'ro' ? 'Experiență aplicată' : 'Applied experience'}</p>
        <h1 className={styles.title}>
          {locale === 'ro' ? 'Portofoliu de experiență' : 'Experience portfolio'}
        </h1>
        <p className={styles.intro}>
          {locale === 'ro'
            ? 'De-a lungul parcursului profesional am lucrat cu oameni și echipe din organizații foarte diferite, în proiecte de training, coaching, facilitare și dezvoltare. O parte dintre proiecte au fost livrate direct, iar altele în cadrul colaborărilor cu parteneri de training și consultanță. Contextul este păstrat explicit mai jos.'
            : 'Throughout my professional career I have worked with people and teams across very different organizations, in training, coaching, facilitation and development projects. Some projects were delivered directly and others through training and consulting partnerships. The delivery context is kept explicit below.'}
        </p>
      </section>

      <div className="shell">
        {portfolio.groups.map((group, index) => (
          <section className={styles.group} key={group.id} aria-labelledby={`portfolio-${group.id}`}>
            <div className={styles.groupHead}>
              <span className={styles.number}>0{index + 1}</span>
              <h2 id={`portfolio-${group.id}`} className={styles.groupTitle}>
                {locale === 'ro' ? group.titleRo : group.titleEn}
              </h2>
            </div>

            <div className={styles.grid}>
              {group.organizations.map((name) => {
                const logo = logoAssets[name]
                return (
                  <article className={styles.item} key={`${group.id}-${name}`}>
                    <div className={styles.logoWrap}>
                      {logo ? (
                        <img src={logo} alt={`${name} logo`} className={styles.logo} loading="lazy" />
                      ) : (
                        <strong className={styles.wordmark}>{name}</strong>
                      )}
                    </div>
                    <span className={styles.name}>{name}</span>
                  </article>
                )
              })}
            </div>
          </section>
        ))}

        <p className={styles.note}>
          {locale === 'ro'
            ? 'Denumirile și mărcile aparțin proprietarilor lor. Prezența unei organizații în acest portofoliu descrie un context profesional în care Bogdan a lucrat sau a livrat și nu implică o afiliere ori un parteneriat comercial curent.'
            : 'Names and trademarks belong to their respective owners. An organization appearing in this portfolio describes a professional context in which Bogdan worked or delivered and does not imply a current affiliation or commercial partnership.'}
        </p>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            {locale === 'ro'
              ? 'Ai un context în care experiența asta poate fi utilă?'
              : 'Have a context where this experience could be useful?'}
          </h2>
          <div>
            <p className={styles.ctaCopy}>
              {locale === 'ro'
                ? 'Training, coaching sau o intervenție construită pentru situația organizației tale.'
                : 'Training, coaching or an intervention built around your organization’s situation.'}
            </p>
            <ArrowLink href={locale === 'ro' ? '/contact' : '/en/contact'}>
              {locale === 'ro' ? 'Începe o conversație' : 'Start a conversation'}
            </ArrowLink>
          </div>
        </section>
      </div>
    </main>
  )
}

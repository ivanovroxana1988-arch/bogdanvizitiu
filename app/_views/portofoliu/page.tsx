import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ui'
import { getLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import portfolio from '@/content/portfolio.json'
import styles from './portfolio.module.css'

const logoAssets = portfolio.logoAssets as Record<string, string>

type Locale = 'ro' | 'en'

function LogoMark({ name }: { name: string }) {
  const logo = logoAssets[name]

  return (
    <div className={styles.logoWrap}>
      {logo ? (
        <img src={logo} alt={`${name} logo`} className={styles.logo} loading="lazy" />
      ) : (
        <strong className={styles.wordmark}>{name}</strong>
      )}
    </div>
  )
}

function OrganizationTile({ name }: { name: string }) {
  return (
    <article className={styles.item}>
      <LogoMark name={name} />
      <span className={styles.name}>{name}</span>
    </article>
  )
}

function EvidenceRow({
  organization,
  detail,
}: {
  organization: string
  detail: string
}) {
  return (
    <article className={styles.evidenceRow}>
      <div className={styles.evidenceBrand}>
        <LogoMark name={organization} />
        <strong>{organization}</strong>
      </div>
      <p>{detail}</p>
    </article>
  )
}

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  return buildPageMetadata({
    title: locale === 'ro' ? 'Portofoliu de experiență' : 'Experience portfolio',
    description:
      locale === 'ro'
        ? 'Programe, colaborări și contexte organizaționale în care Bogdan Vizitiu a livrat training, coaching, facilitare și intervenții de dezvoltare.'
        : 'Programs, collaborations and organizational contexts in which Bogdan Vizitiu has delivered training, coaching, facilitation and development interventions.',
    path: '/portofoliu',
    locale,
  })
}

export default function Portfolio({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang) as Locale
  const isRo = locale === 'ro'

  return (
    <main className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <p className={styles.eyebrow}>{isRo ? 'Experiență aplicată' : 'Applied experience'}</p>
        <h1 className={styles.title}>{isRo ? 'Portofoliu de experiență' : 'Experience portfolio'}</h1>
        <p className={styles.intro}>
          {isRo
            ? 'De-a lungul parcursului profesional am lucrat cu oameni și echipe din organizații foarte diferite. Unele proiecte au fost livrate direct, altele în colaborare cu parteneri de training și consultanță. Aici separ aceste contexte, ca experiența din spatele logo-urilor să fie cât mai clară.'
            : 'Throughout my professional career I have worked with people and teams across very different organizations. Some projects were delivered directly, others in collaboration with training and consulting partners. These contexts are separated here so the experience behind the logos is as clear as possible.'}
        </p>
      </section>

      <div className="shell">
        <section className={`${styles.group} ${styles.stupSection}`} aria-labelledby="portfolio-stup">
          <div className={styles.sectionIntroGrid}>
            <div>
              <p className={styles.sectionKicker}>{portfolio.stup.period}</p>
              <h2 id="portfolio-stup" className={styles.groupTitle}>
                {isRo ? portfolio.stup.titleRo : portfolio.stup.titleEn}
              </h2>
            </div>
            <p className={styles.groupIntro}>{isRo ? portfolio.stup.introRo : portfolio.stup.introEn}</p>
          </div>

          <div className={styles.stats}>
            {portfolio.stup.stats.map((stat) => (
              <div className={styles.stat} key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{isRo ? stat.labelRo : stat.labelEn}</span>
              </div>
            ))}
          </div>

          <div className={styles.programList}>
            {portfolio.stup.programs.map((program) => (
              <div className={styles.programRow} key={program.nameRo}>
                <span>{isRo ? program.nameRo : program.nameEn}</span>
                <strong>
                  {program.editions} {isRo ? (program.editions === '1' ? 'ediție' : 'ediții') : program.editions === '1' ? 'edition' : 'editions'}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.group} aria-labelledby="portfolio-humanistic">
          <div className={styles.sectionIntroGrid}>
            <h2 id="portfolio-humanistic" className={styles.groupTitle}>
              {isRo ? portfolio.humanisticValere.titleRo : portfolio.humanisticValere.titleEn}
            </h2>
            <p className={styles.groupIntro}>
              {isRo ? portfolio.humanisticValere.introRo : portfolio.humanisticValere.introEn}
            </p>
          </div>

          <div className={styles.evidenceList}>
            {portfolio.humanisticValere.items.map((item) => (
              <EvidenceRow
                key={item.organization}
                organization={item.organization}
                detail={isRo ? item.interventionRo : item.interventionEn}
              />
            ))}
          </div>

          <p className={styles.additionalLine}>
            <span>{isRo ? 'Alte organizații din această colaborare:' : 'Other organizations in this collaboration:'}</span>{' '}
            {portfolio.humanisticValere.additionalOrganizations.join(' · ')}
          </p>
        </section>

        <section className={styles.group} aria-labelledby="portfolio-hpdi">
          <div className={styles.sectionIntroGrid}>
            <h2 id="portfolio-hpdi" className={styles.groupTitle}>
              {isRo ? portfolio.hpdi.titleRo : portfolio.hpdi.titleEn}
            </h2>
            <p className={styles.groupIntro}>{isRo ? portfolio.hpdi.introRo : portfolio.hpdi.introEn}</p>
          </div>

          <div className={styles.hpdiGrid}>
            <article className={styles.btBlock}>
              <p className={styles.sectionKicker}>{isRo ? portfolio.hpdi.btTitleRo : portfolio.hpdi.btTitleEn}</p>
              <div className={styles.miniLogoGrid}>
                {portfolio.hpdi.btOrganizations.map((name) => (
                  <div className={styles.miniLogo} key={name}>
                    <LogoMark name={name} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <div className={styles.topicList}>
                {(isRo ? portfolio.hpdi.btTopicsRo : portfolio.hpdi.btTopicsEn).map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <p className={styles.microNote}>{isRo ? portfolio.hpdi.btNoteRo : portfolio.hpdi.btNoteEn}</p>
            </article>

            <div className={styles.hpdiSide}>
              {portfolio.hpdi.spotlights.map((item) => (
                <EvidenceRow
                  key={item.organization}
                  organization={item.organization}
                  detail={isRo ? item.interventionRo : item.interventionEn}
                />
              ))}
              <p className={styles.additionalLine}>
                <span>{isRo ? 'Alte proiecte prin HPDI:' : 'Other projects through HPDI:'}</span>{' '}
                {portfolio.hpdi.additionalOrganizations.join(' · ')}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.group} aria-labelledby="portfolio-other">
          <div className={styles.groupHead}>
            <h2 id="portfolio-other" className={styles.groupTitle}>
              {isRo ? portfolio.otherCollaborations.titleRo : portfolio.otherCollaborations.titleEn}
            </h2>
          </div>
          <div className={styles.evidenceList}>
            {portfolio.otherCollaborations.items.map((item) => (
              <EvidenceRow
                key={item.organization}
                organization={item.organization}
                detail={isRo ? item.detailRo : item.detailEn}
              />
            ))}
          </div>
        </section>

        <section className={styles.group} aria-labelledby="portfolio-organizations">
          <div className={styles.sectionIntroGrid}>
            <h2 id="portfolio-organizations" className={styles.groupTitle}>
              {isRo ? portfolio.corporateHistory.titleRo : portfolio.corporateHistory.titleEn}
            </h2>
            <p className={styles.groupIntro}>
              {isRo ? portfolio.corporateHistory.introRo : portfolio.corporateHistory.introEn}
            </p>
          </div>

          <div className={styles.grid}>
            {portfolio.corporateHistory.organizations.map((name) => (
              <OrganizationTile key={name} name={name} />
            ))}
          </div>
        </section>

        <section className={styles.group} aria-labelledby="portfolio-entrepreneurship">
          <div className={styles.sectionIntroGrid}>
            <h2 id="portfolio-entrepreneurship" className={styles.groupTitle}>
              {isRo ? portfolio.entrepreneurshipAdvisory.titleRo : portfolio.entrepreneurshipAdvisory.titleEn}
            </h2>
            <p className={styles.groupIntro}>
              {isRo ? portfolio.entrepreneurshipAdvisory.introRo : portfolio.entrepreneurshipAdvisory.introEn}
            </p>
          </div>
          <div className={styles.evidenceList}>
            {portfolio.entrepreneurshipAdvisory.items.map((item) => (
              <EvidenceRow
                key={item.organization}
                organization={item.organization}
                detail={isRo ? item.detailRo : item.detailEn}
              />
            ))}
          </div>
        </section>

        <p className={styles.note}>
          {isRo
            ? 'Denumirile și mărcile aparțin proprietarilor lor. Prezența unei organizații în acest portofoliu descrie un context profesional în care am lucrat sau am livrat și nu implică o afiliere ori un parteneriat comercial curent. Acolo unde un proiect a fost livrat printr-un partener, relația este indicată explicit.'
            : 'Names and trademarks belong to their respective owners. An organization appearing in this portfolio describes a professional context in which I worked or delivered and does not imply a current affiliation or commercial partnership. Where a project was delivered through a partner, that relationship is stated explicitly.'}
        </p>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            {isRo
              ? 'Ai un context în care experiența asta poate fi utilă?'
              : 'Have a context where this experience could be useful?'}
          </h2>
          <div>
            <p className={styles.ctaCopy}>
              {isRo
                ? 'Training, coaching sau o intervenție construită pentru situația organizației tale.'
                : 'Training, coaching or an intervention built around your organization’s situation.'}
            </p>
            <ArrowLink href={isRo ? '/contact' : '/en/contact'}>
              {isRo ? 'Începe o conversație' : 'Start a conversation'}
            </ArrowLink>
          </div>
        </section>
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPrograms, programSlugs } from '@/lib/data'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { JsonLd } from '@/components/json-ld'
import { getCopy, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata, localizedUrl, SITE_URL } from '@/lib/seo'
import styles from '../../commercial.module.css'

const relatedInsightByProgram: Record<string, { slug: string; ro: string; en: string }> = {
  'arta-negocierii': {
    slug: 'negocierea-nu-este-doar-despre-argumente',
    ro: 'Negocierea nu este doar despre argumente. Este și despre emoții.',
    en: 'Negotiation is not only about arguments. It is also about emotions.',
  },
  networking: {
    slug: 'networkingul-nu-incepe-cu-schimbul-de-contacte',
    ro: 'Networkingul nu începe cu schimbul de contacte',
    en: 'Networking does not start with exchanging contacts',
  },
}

type SearchParams = {
  lang?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

function seoTitle(slug: string, locale: 'ro' | 'en', fallback: string) {
  if (locale === 'ro') {
    if (slug === 'arta-negocierii') return 'Curs de negociere pentru profesioniști'
    if (slug === 'networking') return 'Curs de networking profesional'
    if (slug === 'leading-high-performance-teams')
      return 'Curs de leadership pentru echipe performante'
  }
  if (slug === 'arta-negocierii') return 'Negotiation course for professionals'
  if (slug === 'networking') return 'Professional networking course'
  if (slug === 'leading-high-performance-teams') return 'High-performance teams leadership course'
  return fallback
}

function pageHeading(slug: string, locale: 'ro' | 'en', fallback: string) {
  if (locale === 'ro') {
    if (slug === 'arta-negocierii') return 'Curs de negociere: Negotiation & Influence'
    if (slug === 'networking') return 'Curs de networking profesional'
    if (slug === 'leading-high-performance-teams')
      return 'Curs de leadership: Leading High Performance Teams'
  }
  if (slug === 'arta-negocierii') return 'Negotiation course: Negotiation & Influence'
  if (slug === 'networking') return 'Professional networking course'
  if (slug === 'leading-high-performance-teams')
    return 'Leadership course: Leading High Performance Teams'
  return fallback
}

function seoDescription(slug: string, locale: 'ro' | 'en', fallback: string) {
  if (locale === 'ro') {
    if (slug === 'arta-negocierii')
      return 'Curs de negociere pentru manageri, antreprenori, oameni de vânzări și profesioniști care vor să pregătească mai clar interesele, alternativele și concesiile.'
    if (slug === 'networking')
      return 'Curs de networking profesional pentru manageri, antreprenori, specialiști și oameni de vânzări care vor să construiască relații relevante și follow-up cu context.'
    if (slug === 'leading-high-performance-teams')
      return 'Curs de leadership pentru manageri și team leads care vor mai multă claritate, autonomie, feedback și responsabilitate în echipă.'
  }
  if (slug === 'arta-negocierii')
    return 'Negotiation course for managers, entrepreneurs, salespeople and professionals who want clearer interests, alternatives and choices under pressure.'
  if (slug === 'networking')
    return 'Professional networking course for managers, entrepreneurs, specialists and salespeople who want relevant relationships and better follow-up.'
  if (slug === 'leading-high-performance-teams')
    return 'Leadership course for managers and team leads who want more clarity, autonomy, feedback and ownership across their teams.'
  return fallback
}

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: SearchParams
}): Metadata {
  const locale = getLocale(searchParams?.lang)
  const program = getPrograms(locale).find((item) => item.slug === params.slug)
  const fallbackTitle = program?.title ?? (locale === 'ro' ? 'Curs' : 'Program')
  const fallbackDescription = program?.description ?? ''
  return buildPageMetadata({
    title: seoTitle(params.slug, locale, fallbackTitle),
    description: seoDescription(params.slug, locale, fallbackDescription),
    path: `/cursuri/${params.slug}`,
    locale,
  })
}

export default function Program({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: SearchParams
}) {
  const locale = getLocale(searchParams?.lang)
  const copy = getCopy(locale).programDetail
  const program = getPrograms(locale).find((item) => item.slug === params.slug)
  if (!program) notFound()

  const relatedInsight = relatedInsightByProgram[program.slug]
  const canonical = localizedUrl(`/cursuri/${program.slug}`, locale)
  const heading = pageHeading(program.slug, locale, program.title)
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${canonical}#course`,
    name: heading,
    description: program.description,
    url: canonical,
    provider: { '@id': `${SITE_URL}/#person` },
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en',
  }

  const registrationParams = new URLSearchParams({
    course: program.slug,
    source: 'program-detail',
  })
  if (searchParams?.utm_source) registrationParams.set('utm_source', searchParams.utm_source)
  if (searchParams?.utm_medium) registrationParams.set('utm_medium', searchParams.utm_medium)
  if (searchParams?.utm_campaign) registrationParams.set('utm_campaign', searchParams.utm_campaign)
  const registrationHref = `${localizePath('/inscriere', locale)}?${registrationParams.toString()}`

  const practicalTitle =
    locale === 'ro'
      ? 'Ediții deschise: date, locație și format'
      : 'Open editions: dates, location and format'
  const organizationTitle =
    locale === 'ro'
      ? 'Tema este relevantă pentru o echipă sau pentru organizație?'
      : 'Is the topic relevant to a team or organization?'
  const organizationText =
    locale === 'ro'
      ? 'Programul poate fi adaptat unui context organizațional, pornind de la situațiile reale ale echipei și de la rezultatul pe care vrei să îl vezi diferit în practică.'
      : 'The program can be adapted to an organizational context, starting from the team’s real situations and the result you want to see change in practice.'
  const supportGrid = relatedInsight ? styles.threeGrid : styles.twoGrid

  return (
    <div className={`${styles.page} balanced-commercial-page conversion-page`}>
      <JsonLd data={courseJsonLd} />

      <section className={styles.hero}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className={styles.heroGrid}>
          <h1>{heading}</h1>
          <div className="conversion-hero-copy">
            <p className={styles.heroIntro}>{program.detail}</p>
            <ArrowLink href={registrationHref}>
              {locale === 'ro' ? 'Înscrie-te la program' : 'Register for the program'}
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className={styles.diagnostic}>
        <div className={styles.diagnosticInner}>
          <div>
            <Eyebrow>{copy.recognitionEyebrow}</Eyebrow>
            <h2 className={styles.statementSmall}>{program.recognitionTitle}</h2>
          </div>
          <div>
            <ul className={`${styles.diagnosticList} clean-diagnostic-list`}>
              {program.recognitionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="conversion-inline-action">
              <ArrowLink href={registrationHref}>
                {locale === 'ro' ? 'Vezi detaliile de înscriere' : 'See registration details'}
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.fitGrid}>
          <article className={styles.fitBlock}>
            <Eyebrow>{copy.forWhomEyebrow}</Eyebrow>
            <h3>{program.forWhomTitle}</h3>
            <p>{program.forWhomText}</p>
          </article>
          <article className={styles.fitBlock}>
            <Eyebrow>{copy.notForEyebrow}</Eyebrow>
            <h3>{program.notForTitle}</h3>
            <p>{program.notForText}</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.outcomesEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{program.outcomesTitle}</h2>
          </div>
        </div>
        <ul className={styles.outcomeList}>
          {program.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.practice}>
        <div className={styles.practiceInner}>
          <div>
            <Eyebrow>{copy.formatEyebrow}</Eyebrow>
          </div>
          <div>
            <h2 className={styles.statementSmall}>{program.formatTitle}</h2>
            <p>{program.formatText}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>{copy.learnEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{program.learnTitle}</h2>
          </div>
        </div>
        <div className={styles.themeList}>
          {program.topics.map((topic) => (
            <div className={styles.themeItem} key={topic}>
              {topic}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.proof}>
        <div className={styles.proofInner}>
          <div>
            <Eyebrow>{copy.instructorEyebrow}</Eyebrow>
          </div>
          <article className={styles.proofCard}>
            <h3>{copy.instructorTitle}</h3>
            <p>{copy.instructorText}</p>
            <ArrowLink href={localizePath('/despre', locale)}>
              {locale === 'ro' ? 'Vezi parcursul lui Bogdan' : 'See Bogdan’s background'}
            </ArrowLink>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={supportGrid}>
          <article className={styles.editorialCard}>
            <Eyebrow>{copy.faqEyebrow}</Eyebrow>
            <h3>{practicalTitle}</h3>
            <p>{copy.faqText}</p>
          </article>

          <article className={styles.editorialCard}>
            <Eyebrow>{locale === 'ro' ? 'Pentru organizații' : 'For organizations'}</Eyebrow>
            <h3>{organizationTitle}</h3>
            <p>{organizationText}</p>
            <ArrowLink href={localizePath('/corporate', locale)}>
              {locale === 'ro'
                ? 'Vezi abordarea pentru organizații'
                : 'Explore the approach for organizations'}
            </ArrowLink>
          </article>

          {relatedInsight && (
            <article className={styles.editorialCard}>
              <Eyebrow>{locale === 'ro' ? 'Din Insights' : 'From Insights'}</Eyebrow>
              <h3>
                {locale === 'ro'
                  ? 'Aprofundează tema înainte de curs.'
                  : 'Explore the topic before the course.'}
              </h3>
              <ArrowLink href={localizePath(`/insights/${relatedInsight.slug}`, locale)}>
                {locale === 'ro' ? relatedInsight.ro : relatedInsight.en}
              </ArrowLink>
            </article>
          )}
        </div>
      </section>

      <section className={styles.cta}>
        <Eyebrow>{copy.ctaEyebrow}</Eyebrow>
        <h2 className={styles.ctaTitle}>{program.ctaTitle}</h2>
        <ArrowLink href={registrationHref}>
          {locale === 'ro' ? 'Înscrie-te' : 'Register'}
        </ArrowLink>
      </section>
    </div>
  )
}

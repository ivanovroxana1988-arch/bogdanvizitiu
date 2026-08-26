import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import media from '@/content/media.json'
import { getPublishedInsights, publishedInsightSlugs } from '@/lib/data'
import { PageHero, Eyebrow, ArrowLink } from '@/components/ui'
import { ConceptImage, EditorialImage } from '@/components/portrait'
import { JsonLd } from '@/components/json-ld'
import { getCopy, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { localizedUrl, SITE_URL } from '@/lib/seo'
import styles from '../insights.module.css'

const insightConcepts: Record<
  string,
  | 'livesEditorial'
  | 'emotionsLearningEditorial'
  | 'mindfulnessAutopilotEditorial'
  | 'negotiationEditorial'
> = {
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives': 'livesEditorial',
  'nu-invatam-doar-cu-mintea': 'emotionsLearningEditorial',
  'cat-din-viata-traim-pe-pilot-automat': 'mindfulnessAutopilotEditorial',
  'negocierea-nu-este-doar-despre-argumente': 'negotiationEditorial',
}

const coachingConsultingSlug = 'coaching-sau-consultanta-de-ce-ai-nevoie-de-fapt'
const coachingConsultingImage = '/images/bogdan/bogdan-coaching-consultanta.webp'
const aiAdoptionSlug = 'ai-adoption-is-a-change-problem'
const aiAdoptionImage = '/api/ai-adoption-image'

const commercialInsightSlugs = new Set([
  'networkingul-nu-incepe-cu-schimbul-de-contacte',
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives',
  'nu-invatam-doar-cu-mintea',
  'cat-din-viata-traim-pe-pilot-automat',
  'negocierea-nu-este-doar-despre-argumente',
  'de-ce-unele-conversatii-manageriale-schimba-lucrurile',
  'stii-ce-ai-de-facut-de-ce-nu-faci',
  'o-decizie-buna-incepe-inainte-sa-alegi',
  coachingConsultingSlug,
  aiAdoptionSlug,
])

const editorialCommercialLinks: Record<string, { href: string; ro: string; en: string }> = {
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives': {
    href: '/coaching/executive-coaching',
    ro: 'Executive coaching pentru manageri și lideri',
    en: 'Executive coaching for managers and leaders',
  },
  'negocierea-nu-este-doar-despre-argumente': {
    href: '/cursuri/arta-negocierii',
    ro: 'Curs de negociere: Negotiation & Influence',
    en: 'Negotiation course: Negotiation & Influence',
  },
  'networkingul-nu-incepe-cu-schimbul-de-contacte': {
    href: '/cursuri/networking',
    ro: 'Curs de networking profesional',
    en: 'Professional networking course',
  },
  'de-ce-unele-conversatii-manageriale-schimba-lucrurile': {
    href: '/coaching/executive-coaching',
    ro: 'Lucrează conversațiile dificile în executive coaching',
    en: 'Work on difficult conversations in executive coaching',
  },
  'o-decizie-buna-incepe-inainte-sa-alegi': {
    href: '/coaching/executive-coaching',
    ro: 'Lucrează decizia într-un proces de executive coaching',
    en: 'Work through the decision in executive coaching',
  },
  'stii-ce-ai-de-facut-de-ce-nu-faci': {
    href: '/coaching',
    ro: 'Explorează coachingul individual',
    en: 'Explore individual coaching',
  },
  'cat-din-viata-traim-pe-pilot-automat': {
    href: '/coaching',
    ro: 'Explorează coachingul individual',
    en: 'Explore individual coaching',
  },
  'nu-invatam-doar-cu-mintea': {
    href: '/corporate',
    ro: 'Vezi cum construim programele pentru organizații',
    en: 'See how we build programs for organizations',
  },
  [coachingConsultingSlug]: {
    href: '/coaching',
    ro: 'Vezi opțiunile de coaching',
    en: 'Explore coaching options',
  },
  [aiAdoptionSlug]: {
    href: '/corporate',
    ro: 'Discută o intervenție de AI adoption pentru organizație',
    en: 'Discuss an AI adoption intervention for your organization',
  },
}

function renderInlineLinks(text: string, locale: 'ro' | 'en') {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!match) return part
    const [, label, href] = match
    if (href.startsWith('/')) {
      return (
        <Link key={`${href}-${index}`} href={localizePath(href, locale)}>
          {label}
        </Link>
      )
    }
    return (
      <a key={`${href}-${index}`} href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    )
  })
}

export function generateStaticParams() {
  return publishedInsightSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { lang?: string }
}): Metadata {
  const locale = getLocale(searchParams?.lang)
  const insight = getPublishedInsights(locale).find((item) => item.slug === params.slug)
  if (!insight) return {}

  const path = `/insights/${insight.slug}`
  const canonical = localizedUrl(path, locale)

  return {
    title: insight.title,
    description: insight.excerpt,
    authors: [{ name: 'Bogdan Vizitiu', url: localizedUrl('/despre', locale) }],
    alternates: {
      canonical,
      languages: {
        'ro-RO': localizedUrl(path, 'ro'),
        en: localizedUrl(path, 'en'),
        'x-default': localizedUrl(path, 'ro'),
      },
    },
    openGraph: {
      type: 'article',
      title: insight.title,
      description: insight.excerpt,
      url: canonical,
      siteName: 'Bogdan Vizitiu',
      publishedTime: insight.publishedAt,
      authors: ['Bogdan Vizitiu'],
      locale: locale === 'ro' ? 'ro_RO' : 'en_GB',
    },
    twitter: { card: 'summary_large_image', title: insight.title, description: insight.excerpt },
  }
}

export default function Insight({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { lang?: string }
}) {
  const locale = getLocale(searchParams?.lang)
  const copy = getCopy(locale).insights
  const insights = getPublishedInsights(locale)
  const insight = insights.find((item) => item.slug === params.slug)
  if (!insight) notFound()

  const related = insights.filter((item) => item.slug !== insight.slug).slice(0, 2)
  const editorialCommercialLink = editorialCommercialLinks[insight.slug]
  const hasCommercialCta = commercialInsightSlugs.has(insight.slug)
  const hasCoachingConsultingPortrait = insight.slug === coachingConsultingSlug
  const hasAiAdoptionImage = insight.slug === aiAdoptionSlug
  const commercialCta =
    locale === 'ro'
      ? { title: 'Lucrezi cu o situație asemănătoare?', label: 'Începe o conversație' }
      : { title: 'Working with a similar situation?', label: 'Start a conversation' }
  const midCta = editorialCommercialLink
    ? {
        href: localizePath(editorialCommercialLink.href, locale),
        title: locale === 'ro' ? 'Vrei să duci ideea în practică?' : 'Want to put the idea into practice?',
        label: locale === 'ro' ? editorialCommercialLink.ro : editorialCommercialLink.en,
      }
    : {
        href: `${localizePath('/contact', locale)}?source=insight-${encodeURIComponent(insight.slug)}`,
        title: locale === 'ro' ? 'Vrei să duci ideea în practică?' : 'Want to put the idea into practice?',
        label: locale === 'ro' ? 'Discută contextul tău' : 'Discuss your context',
      }
  const midpointAfter = Math.max(1, Math.ceil(insight.sections.length / 2))
  const date = new Intl.DateTimeFormat(locale === 'ro' ? 'ro-RO' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${insight.publishedAt}T12:00:00Z`))

  const path = `/insights/${insight.slug}`
  const canonical = localizedUrl(path, locale)
  const conceptAsset =
    insight.slug === 'networkingul-nu-incepe-cu-schimbul-de-contacte'
      ? ('networkingEditorial' as const)
      : insightConcepts[insight.slug]
  const structuredImageSource = hasAiAdoptionImage
    ? aiAdoptionImage
    : hasCoachingConsultingPortrait
      ? coachingConsultingImage
      : conceptAsset
        ? media.concepts[conceptAsset].src
        : media.images.candid.src
  const structuredImage = structuredImageSource.startsWith('http')
    ? structuredImageSource
    : `${SITE_URL}${structuredImageSource}`
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: insight.title,
    description: insight.excerpt,
    image: structuredImage,
    datePublished: `${insight.publishedAt}T12:00:00+03:00`,
    inLanguage: locale === 'ro' ? 'ro-RO' : 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Bogdan Vizitiu',
      url: localizedUrl('/despre', locale),
    },
  }

  return (
    <div className="conversion-page article-conversion-page">
      <JsonLd data={articleJsonLd} />
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        intro={insight.subtitle || insight.excerpt}
      />
      <section className={`shell ${styles.articleGrid}`}>
        <aside className={styles.articleMeta}>
          <Eyebrow>{locale === 'ro' ? 'Articol' : 'Article'}</Eyebrow>
          <p>
            <strong>Bogdan Vizitiu</strong>
            <br />
            {date}
            <br />
            {insight.readTime}
          </p>
        </aside>
        <article className={styles.body}>
          {hasAiAdoptionImage ? (
            <figure className={`${styles.heroImage} ${styles.directImage}`}>
              <img
                src={aiAdoptionImage}
                alt={
                  locale === 'ro'
                    ? 'Ilustrație editorială despre trecerea de la adopția AI la redesenarea modului de lucru'
                    : 'Editorial illustration about moving from AI adoption to redesigning how work gets done'
                }
                loading="eager"
                decoding="async"
              />
            </figure>
          ) : hasCoachingConsultingPortrait ? (
            <figure
              className={`${styles.heroImage} ${styles.directImage}`}
              style={{ aspectRatio: '4 / 5', maxWidth: 680, margin: '0 auto 42px' }}
            >
              <img
                src={coachingConsultingImage}
                alt={
                  locale === 'ro'
                    ? 'Bogdan Vizitiu într-un cadru de conversație'
                    : 'Bogdan Vizitiu in a conversational setting'
                }
                loading="eager"
                decoding="async"
              />
            </figure>
          ) : conceptAsset ? (
            <ConceptImage
              asset={conceptAsset}
              kind="wide"
              className={styles.heroImage}
              locale={locale}
            />
          ) : (
            <EditorialImage
              asset="candid"
              kind="event"
              className={styles.heroImage}
              locale={locale}
            />
          )}

          {insight.intro.map((paragraph) => (
            <p key={paragraph}>{renderInlineLinks(paragraph, locale)}</p>
          ))}

          {insight.sections.map((section, index) => (
            <Fragment key={section.heading}>
              <section>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{renderInlineLinks(paragraph, locale)}</p>
                ))}
              </section>
              {hasCommercialCta && index === midpointAfter - 1 && (
                <section className="article-conversion-nudge">
                  <Eyebrow>{locale === 'ro' ? 'Din idee în practică' : 'From idea to practice'}</Eyebrow>
                  <h2>{midCta.title}</h2>
                  <ArrowLink href={midCta.href}>{midCta.label}</ArrowLink>
                </section>
              )}
            </Fragment>
          ))}

          {insight.closing.map((paragraph) => (
            <p key={paragraph}>{renderInlineLinks(paragraph, locale)}</p>
          ))}

          {insight.cta.href && !(hasCommercialCta && insight.cta.href === '/contact') && (
            <section>
              <h2>{insight.cta.title}</h2>
              <ArrowLink href={localizePath(insight.cta.href, locale)}>
                {insight.cta.label}
              </ArrowLink>
            </section>
          )}

          {insight.sourceNote && (
            <section>
              <h2>{locale === 'ro' ? 'Surse și context' : 'Sources and context'}</h2>
              <p>{insight.sourceNote}</p>
              <ul>
                {insight.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasCommercialCta && (
            <section style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}>
              <p style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px' }}>
                {commercialCta.title}
              </p>
              <ArrowLink href={`${localizePath('/contact', locale)}?source=insight-${encodeURIComponent(insight.slug)}`}>
                {commercialCta.label}
              </ArrowLink>
            </section>
          )}

          <section className={styles.related}>
            <h2>{locale === 'ro' ? 'Mai departe' : 'Continue reading'}</h2>
            {related.map((item) => (
              <p key={item.slug}>
                <ArrowLink href={localizePath(`/insights/${item.slug}`, locale)}>
                  {item.title}
                </ArrowLink>
              </p>
            ))}
          </section>

          <ArrowLink href={localizePath('/insights', locale)} className={styles.back}>
            {copy.back}
          </ArrowLink>
        </article>
      </section>
    </div>
  )
}

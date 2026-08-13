import type { Metadata } from 'next'
import { PageHero, ArrowLink } from '@/components/ui'
import { ConceptImage, EditorialImage } from '@/components/portrait'
import { getPublishedInsights } from '@/lib/data'
import { getCopy, getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata } from '@/lib/seo'
import styles from './insights.module.css'

const insightConcepts: Record<
  string,
  | 'networkingEditorial'
  | 'livesEditorial'
  | 'emotionsLearningEditorial'
  | 'mindfulnessAutopilotEditorial'
  | 'negotiationEditorial'
  | 'insightsWorkspace'
> = {
  'networkingul-nu-incepe-cu-schimbul-de-contacte': 'networkingEditorial',
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives': 'livesEditorial',
  'nu-invatam-doar-cu-mintea': 'emotionsLearningEditorial',
  'cat-din-viata-traim-pe-pilot-automat': 'mindfulnessAutopilotEditorial',
  'negocierea-nu-este-doar-despre-argumente': 'negotiationEditorial',
  'stii-ce-ai-de-facut-de-ce-nu-faci': 'insightsWorkspace',
}

const decisionSlug = 'o-decizie-buna-incepe-inainte-sa-alegi'

type InsightItem = ReturnType<typeof getPublishedInsights>[number]

function InsightImage({
  insight,
  className,
  locale,
}: {
  insight: InsightItem
  className: string
  locale: 'ro' | 'en'
}) {
  const concept = insightConcepts[insight.slug]

  if (insight.slug === decisionSlug) {
    return (
      <figure className={`${styles.directImage} ${className}`}>
        <img
          src="/images/editorial/decision-bogdan-stairs.svg"
          alt={
            locale === 'ro'
              ? 'Bogdan Vizitiu într-un spațiu modern, într-un cadru editorial despre claritatea deciziilor'
              : 'Bogdan Vizitiu in a modern space, in an editorial portrait about decision clarity'
          }
          loading="lazy"
          decoding="async"
        />
      </figure>
    )
  }

  if (concept) {
    return <ConceptImage asset={concept} kind="wide" className={className} locale={locale} />
  }

  return <EditorialImage asset="candid" kind="event" className={className} locale={locale} />
}

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  const isRo = locale === 'ro'
  return buildPageMetadata({
    title: 'Insights',
    description: isRo
      ? 'Idei pe care Bogdan Vizitiu le folosește în coaching, training și conversațiile de lucru despre leadership, negociere, relații și performanță.'
      : 'Ideas Bogdan Vizitiu uses in coaching, training and working conversations about leadership, negotiation, relationships and performance.',
    path: '/insights',
    locale,
  })
}

export default function Insights({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = getCopy(locale).insights
  const insights = getPublishedInsights(locale)
  const feature = insights[0]
  const secondary = insights.slice(1)
  const title = 'Insights'
  const intro =
    locale === 'ro'
      ? 'Idei pe care le folosesc în coaching, training și în conversațiile cu oamenii cu care lucrez.'
      : 'Ideas I use in coaching, training and in the conversations I have with the people I work with.'

  if (!feature) {
    return <PageHero eyebrow={copy.eyebrow} title={title} intro={intro} />
  }

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={title} intro={intro} />
      <section className={`shell ${styles.indexSection}`}>
        <article className={styles.feature}>
          <InsightImage insight={feature} className={styles.featureImage} locale={locale} />
          <div className={styles.featureContent}>
            <div className={styles.meta}>
              <span className={styles.category}>{feature.category}</span>
              <span>{feature.readTime}</span>
            </div>
            <h2>{feature.title}</h2>
            <p>{feature.excerpt}</p>
            <ArrowLink href={localizePath(`/insights/${feature.slug}`, locale)}>
              {copy.readArticle}
            </ArrowLink>
          </div>
        </article>

        <div className={styles.secondaryGrid}>
          {secondary.map((insight) => (
            <article className={styles.card} key={insight.slug}>
              <InsightImage insight={insight} className={styles.cardImage} locale={locale} />
              <div className={styles.cardMeta}>
                <span className={styles.category}>{insight.category}</span>
                <span>{insight.readTime}</span>
              </div>
              <h2>{insight.title}</h2>
              <p>{insight.excerpt}</p>
              <ArrowLink href={localizePath(`/insights/${insight.slug}`, locale)}>
                {copy.readArticle}
              </ArrowLink>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

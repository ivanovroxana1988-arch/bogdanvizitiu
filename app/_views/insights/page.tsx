import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero, ArrowLink, Eyebrow } from '@/components/ui'
import { ConceptImage, EditorialImage } from '@/components/portrait'
import { AiApprenticeshipImage, aiApprenticeshipSlug } from '@/components/ai-apprenticeship-image'
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
const aiAdoptionSlug = 'ai-adoption-is-a-change-problem'
const aiAdoptionImage = '/api/ai-adoption-image'

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

  if (insight.slug === aiApprenticeshipSlug) {
    return <AiApprenticeshipImage className={className} locale={locale} />
  }

  if (insight.slug === aiAdoptionSlug) {
    return (
      <figure className={`${styles.directImage} ${className}`}>
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
    )
  }

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
  const secondary = insights.slice(1, 7)
  const recommended = insights.slice(7)
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(locale === 'ro' ? 'ro-RO' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`))
  const title = 'Insights'
  const intro =
    locale === 'ro'
      ? 'Idei pe care le folosesc în coaching, training și în conversațiile cu oamenii cu care lucrez.'
      : 'Ideas I use in coaching, training and in the conversations I have with the people I work with.'

  if (!feature) {
    return <PageHero eyebrow={copy.eyebrow} title={title} intro={intro} />
  }

  return (
    <div className="conversion-page editorial-conversion-page">
      <PageHero eyebrow={copy.eyebrow} title={title} intro={intro} />
      <section className={`shell ${styles.indexSection}`}>
        <div className={styles.blogLayout}>
          <div className={styles.feed}>
            <article className={styles.feature}>
              <p className={styles.sectionLabel}>
                {locale === 'ro' ? 'Cel mai recent articol' : 'Latest article'}
              </p>
              <div className={styles.meta}>
                <span className={styles.category}>{feature.category}</span>
                <time dateTime={feature.publishedAt}>{formatDate(feature.publishedAt)}</time>
                <span>{feature.readTime}</span>
              </div>
              <h2>
                <Link href={localizePath(`/insights/${feature.slug}`, locale)}>
                  {feature.title}
                </Link>
              </h2>
              <p className={styles.featureExcerpt}>{feature.excerpt}</p>
              <Link
                href={localizePath(`/insights/${feature.slug}`, locale)}
                aria-label={feature.title}
                className={styles.imageLink}
                tabIndex={-1}
              >
                <InsightImage insight={feature} className={styles.featureImage} locale={locale} />
              </Link>
            </article>

            {secondary.length > 0 && (
              <section className={styles.recentArticles} aria-labelledby="recent-articles">
                <h2 id="recent-articles" className={styles.sectionLabel}>
                  {locale === 'ro' ? 'Mai multe idei' : 'More ideas'}
                </h2>
                {secondary.map((insight) => (
                  <article className={styles.compactArticle} key={insight.slug}>
                    <div className={styles.cardMeta}>
                      <span className={styles.category}>{insight.category}</span>
                      <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
                      <span>{insight.readTime}</span>
                    </div>
                    <h3>
                      <Link href={localizePath(`/insights/${insight.slug}`, locale)}>
                        {insight.title}
                      </Link>
                    </h3>
                    <p>{insight.excerpt}</p>
                  </article>
                ))}
              </section>
            )}
          </div>

          {recommended.length > 0 && (
            <aside className={styles.sidebar} aria-labelledby="recommended-articles">
              <h2 id="recommended-articles" className={styles.sectionLabel}>
                {locale === 'ro' ? 'De explorat' : 'Explore more'}
              </h2>
              <ul className={styles.articleList}>
                {recommended.map((insight) => (
                  <li key={insight.slug}>
                    <span className={styles.category}>{insight.category}</span>
                    <Link href={localizePath(`/insights/${insight.slug}`, locale)}>
                      {insight.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="conversion-editorial-strip">
          <div>
            <Eyebrow>{locale === 'ro' ? 'Din idee în practică' : 'From idea to practice'}</Eyebrow>
            <h2>
              {locale === 'ro'
                ? 'Vrei să lucrezi practic cu una dintre temele astea?'
                : 'Want to work practically with one of these themes?'}
            </h2>
          </div>
          <div className="conversion-action-list">
            <ArrowLink href={localizePath('/cursuri', locale)}>
              {locale === 'ro' ? 'Vezi cursurile' : 'Explore programs'}
            </ArrowLink>
            <ArrowLink href={localizePath('/coaching', locale)}>
              {locale === 'ro' ? 'Vezi opțiunile de coaching' : 'Explore coaching'}
            </ArrowLink>
            {locale === 'ro' && (
              <ArrowLink href="/sales-lab">Sales Lab: curs de vânzări și negociere</ArrowLink>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { PageHero, ArrowLink } from '@/components/ui'
import { ConceptImage, EditorialImage } from '@/components/portrait'
import { getPublishedInsights } from '@/lib/data'
import { getCopy, getLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import styles from './insights.module.css'

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
        <div className={styles.grid}>
          <article className={styles.feature}>
            <ConceptImage
              asset="networkingEditorial"
              kind="wide"
              className={styles.featureImage}
              locale={locale}
            />
            <div className={styles.meta}>
              <span className={styles.category}>{feature.category}</span>
              <span>{feature.readTime}</span>
            </div>
            <h2>{feature.title}</h2>
            <p>{feature.excerpt}</p>
            <ArrowLink href={`/insights/${feature.slug}`}>{copy.readArticle}</ArrowLink>
          </article>
          <div className={styles.secondary}>
            {secondary.map((insight) => (
              <article className={styles.card} key={insight.slug}>
                {insightConcepts[insight.slug] ? (
                  <ConceptImage
                    asset={insightConcepts[insight.slug]}
                    kind="wide"
                    className={styles.cardImage}
                    locale={locale}
                  />
                ) : (
                  <EditorialImage
                    asset="candid"
                    kind="event"
                    className={styles.cardImage}
                    locale={locale}
                  />
                )}
                <span className={styles.category}>{insight.category}</span>
                <h2>{insight.title}</h2>
                <p>{insight.excerpt}</p>
                <ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

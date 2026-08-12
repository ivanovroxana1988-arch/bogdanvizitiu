import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getPublishedInsights,publishedInsightSlugs} from '@/lib/data'
import {PageHero,Eyebrow,ArrowLink} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {JsonLd} from '@/components/json-ld'
import {getCopy,getLocale} from '@/lib/i18n'
import {localizedUrl,SITE_URL} from '@/lib/seo'
import styles from '../insights.module.css'

const insightConcepts:Record<string,'livesEditorial'|'emotionsLearningEditorial'|'mindfulnessAutopilotEditorial'|'negotiationEditorial'>={
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':'livesEditorial',
  'nu-invatam-doar-cu-mintea':'emotionsLearningEditorial',
  'cat-din-viata-traim-pe-pilot-automat':'mindfulnessAutopilotEditorial',
  'negocierea-nu-este-doar-despre-argumente':'negotiationEditorial',
}

export function generateStaticParams(){
  return publishedInsightSlugs.map(slug=>({slug}))
}

export function generateMetadata({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const insight=getPublishedInsights(locale).find(item=>item.slug===params.slug)
  if(!insight)return {}

  const path=`/insights/${insight.slug}`
  const canonical=localizedUrl(path,locale)

  return {
    title:insight.title,
    description:insight.excerpt,
    authors:[{name:'Bogdan Vizitiu',url:localizedUrl('/despre',locale)}],
    alternates:{
      canonical,
      languages:{
        'ro-RO':localizedUrl(path,'ro'),
        'en':localizedUrl(path,'en'),
        'x-default':localizedUrl(path,'ro'),
      },
    },
    openGraph:{
      type:'article',
      title:insight.title,
      description:insight.excerpt,
      url:canonical,
      siteName:'Bogdan Vizitiu',
      publishedTime:insight.publishedAt,
      authors:['Bogdan Vizitiu'],
      locale:locale==='ro'?'ro_RO':'en_GB',
    },
    twitter:{card:'summary_large_image',title:insight.title,description:insight.excerpt},
  }
}

export default function Insight({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).insights
  const insights=getPublishedInsights(locale)
  const insight=insights.find(item=>item.slug===params.slug)
  if(!insight)notFound()

  const related=insights.filter(item=>item.slug!==insight.slug).slice(0,2)
  const date=new Intl.DateTimeFormat(locale==='ro'?'ro-RO':'en-GB',{
    day:'numeric',month:'long',year:'numeric'
  }).format(new Date(`${insight.publishedAt}T12:00:00Z`))

  const path=`/insights/${insight.slug}`
  const canonical=localizedUrl(path,locale)
  const conceptAsset=insight.slug==='networkingul-nu-incepe-cu-schimbul-de-contacte'
    ? 'networkingEditorial' as const
    : insightConcepts[insight.slug]
  const articleJsonLd={
    '@context':'https://schema.org',
    '@type':'BlogPosting',
    '@id':`${canonical}#article`,
    headline:insight.title,
    description:insight.excerpt,
    image:`${canonical}/opengraph-image`,
    datePublished:`${insight.publishedAt}T12:00:00+03:00`,
    inLanguage:locale==='ro'?'ro-RO':'en',
    mainEntityOfPage:{'@type':'WebPage','@id':canonical},
    author:{
      '@type':'Person',
      '@id':`${SITE_URL}/#person`,
      name:'Bogdan Vizitiu',
      url:localizedUrl('/despre',locale),
    },
  }

  return <>
    <JsonLd data={articleJsonLd}/>
    <PageHero eyebrow={insight.category} title={insight.title} intro={insight.subtitle || insight.excerpt}/>
    <section className={`shell ${styles.articleGrid}`}>
      <aside className={styles.articleMeta}>
        <Eyebrow>{locale==='ro'?'Articol':'Article'}</Eyebrow>
        <p><strong>Bogdan Vizitiu</strong><br/>{date}<br/>{insight.readTime}</p>
      </aside>
      <article className={styles.body}>
        {conceptAsset
          ? <ConceptImage asset={conceptAsset} kind="wide" className={styles.heroImage}/>
          : <EditorialImage asset="candid" kind="event" className={styles.heroImage}/>
        }

        {insight.intro.map(paragraph=><p key={paragraph}>{paragraph}</p>)}

        {insight.sections.map(section=><section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
        </section>)}

        {insight.closing.map(paragraph=><p key={paragraph}>{paragraph}</p>)}

        {insight.cta.href && <section>
          <h2>{insight.cta.title}</h2>
          <ArrowLink href={insight.cta.href}>{insight.cta.label}</ArrowLink>
        </section>}

        {insight.sourceNote && <section>
          <h2>{locale==='ro' ? 'Surse și context' : 'Sources and context'}</h2>
          <p>{insight.sourceNote}</p>
          <ul>
            {insight.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}
          </ul>
        </section>}

        <section className={styles.related}>
          <h2>{locale==='ro'?'Mai departe':'Continue reading'}</h2>
          {related.map(item=><p key={item.slug}><ArrowLink href={`/insights/${item.slug}`}>{item.title}</ArrowLink></p>)}
        </section>

        <ArrowLink href="/insights" className={styles.back}>{copy.back}</ArrowLink>
      </article>
    </section>
  </>
}

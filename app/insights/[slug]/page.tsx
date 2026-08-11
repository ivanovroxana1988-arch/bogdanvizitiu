import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getPublishedInsights,publishedInsightSlugs} from '@/lib/data'
import {PageHero,Eyebrow,ArrowLink} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'
import styles from '../insights.module.css'

const insightImages:Record<string,'speaking'|'coaching'|'workshop'|'candid'>={
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':'coaching',
  'nu-invatam-doar-cu-mintea':'workshop',
  'cat-din-viata-traim-pe-pilot-automat':'candid',
  'negocierea-nu-este-doar-despre-argumente':'workshop',
}

export function generateStaticParams(){
  return publishedInsightSlugs.map(slug=>({slug}))
}

export function generateMetadata({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const insight=getPublishedInsights(locale).find(item=>item.slug===params.slug)
  if(!insight)return {}

  const path=`/insights/${insight.slug}`
  const canonical=`https://bogdanvizitiu.com${path}${locale==='en'?'?lang=en':''}`

  return {
    title:`${insight.title} | Bogdan Vizitiu`,
    description:insight.excerpt,
    authors:[{name:'Bogdan Vizitiu'}],
    alternates:{
      canonical,
      languages:{
        'ro-RO':`https://bogdanvizitiu.com${path}`,
        'en':`https://bogdanvizitiu.com${path}?lang=en`,
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

  const isNetworking=insight.slug==='networkingul-nu-incepe-cu-schimbul-de-contacte'

  return <>
    <PageHero eyebrow={insight.category} title={insight.title} intro={insight.subtitle || insight.excerpt}/>
    <section className={`shell ${styles.articleGrid}`}>
      <aside className={styles.articleMeta}>
        <Eyebrow>{locale==='ro'?'Articol':'Article'}</Eyebrow>
        <p><strong>Bogdan Vizitiu</strong><br/>{date}<br/>{insight.readTime}</p>
      </aside>
      <article className={styles.body}>
        {isNetworking
          ? <ConceptImage asset="networkingEditorial" kind="wide" className={styles.heroImage}/>
          : <EditorialImage asset={insightImages[insight.slug]||'candid'} kind="event" className={styles.heroImage}/>
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

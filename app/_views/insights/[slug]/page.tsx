import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import media from '@/content/media.json'
import {getPublishedInsights,publishedInsightSlugs} from '@/lib/data'
import {PageHero,Eyebrow,ArrowLink} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {JsonLd} from '@/components/json-ld'
import {getCopy,getLocale} from '@/lib/i18n'
import {localizePath} from '@/lib/routes'
import {localizedUrl,SITE_URL} from '@/lib/seo'
import styles from '../insights.module.css'

const insightConcepts:Record<string,'livesEditorial'|'emotionsLearningEditorial'|'mindfulnessAutopilotEditorial'|'negotiationEditorial'>={
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':'livesEditorial',
  'nu-invatam-doar-cu-mintea':'emotionsLearningEditorial',
  'cat-din-viata-traim-pe-pilot-automat':'mindfulnessAutopilotEditorial',
  'negocierea-nu-este-doar-despre-argumente':'negotiationEditorial',
}

const commercialInsightSlugs=new Set([
  'networkingul-nu-incepe-cu-schimbul-de-contacte',
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives',
  'nu-invatam-doar-cu-mintea',
  'cat-din-viata-traim-pe-pilot-automat',
  'negocierea-nu-este-doar-despre-argumente',
  'de-ce-unele-conversatii-manageriale-schimba-lucrurile',
  'stii-ce-ai-de-facut-de-ce-nu-faci',
  'o-decizie-buna-incepe-inainte-sa-alegi',
  'coaching-sau-consultanta-de-ce-ai-nevoie-de-fapt',
])

const editorialCommercialLinks:Record<string,{href:string;ro:string;en:string}>={
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':{
    href:'/coaching/executive-coaching',
    ro:'Executive coaching pentru manageri și lideri',
    en:'Executive coaching for managers and leaders',
  },
  'negocierea-nu-este-doar-despre-argumente':{
    href:'/cursuri/arta-negocierii',
    ro:'Curs de negociere: Negotiation & Influence',
    en:'Negotiation course: Negotiation & Influence',
  },
  'networkingul-nu-incepe-cu-schimbul-de-contacte':{
    href:'/cursuri/networking',
    ro:'Curs de networking profesional',
    en:'Professional networking course',
  },
}

function renderInlineLinks(text:string,locale:'ro'|'en'){
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part,index)=>{
    const match=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if(!match)return part
    const [,label,href]=match
    if(href.startsWith('/')){
      return <Link key={`${href}-${index}`} href={localizePath(href,locale)}>{label}</Link>
    }
    return <a key={`${href}-${index}`} href={href} target="_blank" rel="noreferrer">{label}</a>
  })
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
  const editorialCommercialLink=editorialCommercialLinks[insight.slug]
  const hasCommercialCta=commercialInsightSlugs.has(insight.slug)
  const commercialCta=locale==='ro'
    ?{title:'Lucrezi cu o situație asemănătoare?',label:'Începe o conversație'}
    :{title:'Working with a similar situation?',label:'Start a conversation'}
  const date=new Intl.DateTimeFormat(locale==='ro'?'ro-RO':'en-GB',{
    day:'numeric',month:'long',year:'numeric'
  }).format(new Date(`${insight.publishedAt}T12:00:00Z`))

  const path=`/insights/${insight.slug}`
  const canonical=localizedUrl(path,locale)
  const conceptAsset=insight.slug==='networkingul-nu-incepe-cu-schimbul-de-contacte'
    ? 'networkingEditorial' as const
    : insightConcepts[insight.slug]
  const structuredImageSource=conceptAsset?media.concepts[conceptAsset].src:media.images.candid.src
  const structuredImage=structuredImageSource.startsWith('http')?structuredImageSource:`${SITE_URL}${structuredImageSource}`
  const articleJsonLd={
    '@context':'https://schema.org',
    '@type':'BlogPosting',
    '@id':`${canonical}#article`,
    headline:insight.title,
    description:insight.excerpt,
    image:structuredImage,
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
          ? <ConceptImage asset={conceptAsset} kind="wide" className={styles.heroImage} locale={locale}/>
          : <EditorialImage asset="candid" kind="event" className={styles.heroImage} locale={locale}/>
        }

        {insight.intro.map(paragraph=><p key={paragraph}>{renderInlineLinks(paragraph,locale)}</p>)}

        {insight.sections.map(section=><section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map(paragraph=><p key={paragraph}>{renderInlineLinks(paragraph,locale)}</p>)}
        </section>)}

        {insight.closing.map(paragraph=><p key={paragraph}>{renderInlineLinks(paragraph,locale)}</p>)}

        {editorialCommercialLink&&<section style={{borderTop:'1px solid var(--line)',paddingTop:28}}>
          <Eyebrow>{locale==='ro'?'Legat de subiect':'Related to this topic'}</Eyebrow>
          <ArrowLink href={localizePath(editorialCommercialLink.href,locale)}>
            {locale==='ro'?editorialCommercialLink.ro:editorialCommercialLink.en}
          </ArrowLink>
        </section>}

        {insight.cta.href&&!(hasCommercialCta&&insight.cta.href==='/contact')&&<section>
          <h2>{insight.cta.title}</h2>
          <ArrowLink href={localizePath(insight.cta.href,locale)}>{insight.cta.label}</ArrowLink>
        </section>}

        {insight.sourceNote && <section>
          <h2>{locale==='ro' ? 'Surse și context' : 'Sources and context'}</h2>
          <p>{insight.sourceNote}</p>
          <ul>
            {insight.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}
          </ul>
        </section>}

        {hasCommercialCta&&<section style={{borderTop:'1px solid var(--line)',paddingTop:28}}>
          <p style={{fontSize:18,fontWeight:600,margin:'0 0 18px'}}>{commercialCta.title}</p>
          <ArrowLink href={localizePath('/contact',locale)}>{commercialCta.label}</ArrowLink>
        </section>}

        <section className={styles.related}>
          <h2>{locale==='ro'?'Mai departe':'Continue reading'}</h2>
          {related.map(item=><p key={item.slug}><ArrowLink href={localizePath(`/insights/${item.slug}`,locale)}>{item.title}</ArrowLink></p>)}
        </section>

        <ArrowLink href={localizePath('/insights',locale)} className={styles.back}>{copy.back}</ArrowLink>
      </article>
    </section>
  </>
}

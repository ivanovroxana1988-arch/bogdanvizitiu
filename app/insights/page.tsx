import type {Metadata} from 'next'
import {PageHero,ArrowLink} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import {getPublishedInsights} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'

const insightImages:Record<string,'speaking'|'coaching'|'workshop'|'candid'>={
  'networkingul-nu-incepe-cu-schimbul-de-contacte':'speaking',
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':'coaching',
  'nu-invatam-doar-cu-mintea-invatam-si-cu-emotiile':'workshop',
  'cat-din-viata-traim-pe-pilot-automat':'candid',
}

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const isRo=locale==='ro'
  return {
    title:isRo?'Resurse | Bogdan Vizitiu':'Insights | Bogdan Vizitiu',
    description:isRo
      ?'Idei pe care Bogdan Vizitiu le folosește în coaching, training și conversațiile de lucru despre leadership, negociere, relații și performanță.'
      :'Ideas Bogdan Vizitiu uses in coaching, training and working conversations about leadership, negotiation, relationships and performance.',
    alternates:{canonical:'https://bogdanvizitiu.com/insights'},
  }
}

export default function Insights({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).insights
  const insights=getPublishedInsights(locale)
  const feature=insights[0]
  const secondary=insights.slice(1)

  return <>
    <PageHero
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={locale==='ro'
        ?'Idei pe care le folosesc în coaching, training și în conversațiile cu oamenii cu care lucrez.'
        :'Ideas I use in coaching, training and in the conversations I have with the people I work with.'}
    />
    <section className="shell insights"><div className="insight-grid">
      <article className="feature-insight">
        <EditorialImage asset={insightImages[feature.slug]||'speaking'} kind="event"/>
        <div className="story-meta"><span className="category">{feature.category}</span><span>{feature.readTime}</span></div>
        <h3>{feature.title}</h3><p>{feature.excerpt}</p>
        <ArrowLink href={`/insights/${feature.slug}`}>{copy.readArticle}</ArrowLink>
      </article>
      <div className="secondary-stories">{secondary.map((insight,i)=><article className="insight-card" key={insight.slug}>
        <EditorialImage asset={insightImages[insight.slug]||'candid'} kind="event"/>
        <span className="story-number">0{i+2}</span><span className="category">{insight.category}</span>
        <h3>{insight.title}</h3><p>{insight.excerpt}</p>
        <ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink>
      </article>)}</div>
    </div></section>
  </>
}

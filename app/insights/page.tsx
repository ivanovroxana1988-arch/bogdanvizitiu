import {PageHero,ArrowLink} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import {getInsights} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'

export const metadata={title:'Insights'}

export default function Insights({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).insights
  const insights=getInsights(locale)

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell insights"><div className="insight-grid">
      <article className="feature-insight"><EditorialImage kind="insight"/><div className="story-meta"><span className="category">{insights[0].category}</span><span>{copy.readTime}</span></div><h3>{insights[0].title}</h3><p>{insights[0].excerpt}</p><ArrowLink href={`/insights/${insights[0].slug}`}>{copy.readArticle}</ArrowLink></article>
      <div className="secondary-stories">{insights.slice(1).map((insight,i)=><article className="insight-card" key={insight.slug}><span className="story-number">0{i+2}</span><span className="category">{insight.category}</span><h3>{insight.title}</h3><p>{insight.excerpt}</p><ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink></article>)}</div>
    </div></section>
  </>
}

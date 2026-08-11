import {notFound} from 'next/navigation'
import {getInsights,insightSlugs} from '@/lib/data'
import {PageHero,Eyebrow,ArrowLink} from '@/components/ui'
import {getCopy,getLocale} from '@/lib/i18n'

export function generateStaticParams(){
  return insightSlugs.map(slug=>({slug}))
}

export default function Insight({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).insights
  const insight=getInsights(locale).find(item=>item.slug===params.slug)
  if(!insight)notFound()

  return <>
    <PageHero eyebrow={insight.category} title={insight.title} intro={insight.excerpt}/>
    <section className="shell content-grid"><div><Eyebrow>{copy.fieldNote}</Eyebrow><p className="placeholder-warning">{copy.draftLabel}</p></div><article className="prose">{copy.articleParagraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<h2>{copy.questionTitle}</h2><p>{copy.questionText}</p><ArrowLink href="/insights">{copy.back}</ArrowLink></article></section>
  </>
}

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

  const isPublished=insight.status==='published' && insight.sections.length>0

  return <>
    <PageHero eyebrow={insight.category} title={insight.title} intro={insight.subtitle || insight.excerpt}/>
    <section className="shell content-grid">
      <div>
        <Eyebrow>{isPublished ? insight.readTime : copy.fieldNote}</Eyebrow>
        {!isPublished && <p className="placeholder-warning">{copy.draftLabel}</p>}
      </div>
      <article className="prose">
        {isPublished ? <>
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
        </> : <>
          {copy.articleParagraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
          <h2>{copy.questionTitle}</h2>
          <p>{copy.questionText}</p>
        </>}

        <ArrowLink href="/insights">{copy.back}</ArrowLink>
      </article>
    </section>
  </>
}

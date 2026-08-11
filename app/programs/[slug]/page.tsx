import {notFound} from 'next/navigation'
import {getPrograms,programSlugs} from '@/lib/data'
import {PageHero,ArrowLink,Eyebrow} from '@/components/ui'
import {getCopy,getLocale} from '@/lib/i18n'

export function generateStaticParams(){
  return programSlugs.map(slug=>({slug}))
}

export default function Program({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programDetail
  const program=getPrograms(locale).find(item=>item.slug===params.slug)
  if(!program)notFound()

  return <>
    <PageHero eyebrow={copy.eyebrow} title={program.title} intro={program.detail}/>
    <section className="shell detail-list">
      <article><Eyebrow>{copy.forWhomEyebrow}</Eyebrow><h2>{copy.forWhomTitle}</h2><p>{copy.forWhomText}</p></article>
      <article><Eyebrow>{copy.problemEyebrow}</Eyebrow><h2>{copy.problemTitle}</h2><p>{copy.problemText}</p></article>
      <article><Eyebrow>{copy.learnEyebrow}</Eyebrow><h2>{copy.learnTitle}</h2><ul>{program.topics.map(topic=><li key={topic}>{topic}</li>)}</ul></article>
      <article><Eyebrow>{copy.formatEyebrow}</Eyebrow><h2>{copy.formatTitle}</h2><p>{copy.formatText}</p></article>
      <article><Eyebrow>{copy.instructorEyebrow}</Eyebrow><h2>{copy.instructorTitle}</h2><p>{copy.instructorText}</p></article>
      <article><Eyebrow>{copy.faqEyebrow}</Eyebrow><h2>{copy.faqTitle}</h2><p>{copy.faqText}</p></article>
    </section>
    <section className="shell cta-panel"><h2>{copy.ctaTitle}</h2><ArrowLink href="/contact">{copy.cta}</ArrowLink></section>
  </>
}

import {PageHero,ArrowLink} from '@/components/ui'
import {getPrograms} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'

export const metadata={title:'Programs'}

export default function Programs({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programs
  const programs=getPrograms(locale)

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell index-list">{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/programs/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>
    <section className="shell cta-panel"><h2>{copy.tailoredTitle}</h2><ArrowLink href="/corporate">{copy.tailoredCta}</ArrowLink></section>
  </>
}

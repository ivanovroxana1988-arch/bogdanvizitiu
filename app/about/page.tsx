import {PageHero,ArrowLink,Eyebrow} from '@/components/ui'
import {Portrait} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'

export const metadata={title:'About'}

export default function About({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).about

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell content-grid"><Portrait/><div className="prose"><Eyebrow>{copy.sectionEyebrow}</Eyebrow><h2>{copy.sectionTitle}</h2>{copy.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></section>
    <section className="shell blocks">{copy.blocks.map(block=><article className="block" key={block.title}><h3>{block.title}</h3><p>{block.description}</p></article>)}</section>
    <section className="shell cta-panel"><h2>{copy.ctaTitle}</h2><ArrowLink href="/programs">{copy.cta}</ArrowLink></section>
  </>
}

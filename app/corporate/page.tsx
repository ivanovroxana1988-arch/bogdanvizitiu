import {PageHero,ArrowLink} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'

export const metadata={title:'Corporate'}

export default function Corporate({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).corporate

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell content-grid"><EditorialImage kind="workshop"/><div className="prose"><h2>{copy.sectionTitle}</h2><p>{copy.sectionText}</p></div></section>
    <section className="shell blocks">{copy.blocks.map(block=><article className="block" key={block.title}><h3>{block.title}</h3><p>{block.description}</p></article>)}</section>
    <section className="shell cta-panel"><h2>{copy.ctaTitle}</h2><ArrowLink href="/contact">{copy.cta}</ArrowLink></section>
  </>
}

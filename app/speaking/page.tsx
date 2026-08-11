import {PageHero,ArrowLink} from '@/components/ui'
import {Portrait} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'

export const metadata={title:'Speaking'}

export default function Speaking({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).speaking

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell speaking"><Portrait event/><div className="prose"><h2>{copy.sectionTitle}</h2>{copy.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<ArrowLink href="/contact">{copy.cta}</ArrowLink></div></section>
  </>
}

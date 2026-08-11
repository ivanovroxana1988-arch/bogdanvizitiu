import type {Metadata} from 'next'
import {ArrowLink,PageHero} from '@/components/ui'
import {getPublishedInsights} from '@/lib/data'
import servicePages from '@/content/service-pages.json'
import {getLocale} from '@/lib/i18n'

export const metadata:Metadata={
  title:'Resurse',
  description:'Modele, materiale și articole dezvoltate din munca publicată a lui Bogdan Vizitiu.',
  alternates:{canonical:'/resurse'},
}

export default function Resources({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=servicePages[locale].resources
  const insights=getPublishedInsights(locale)

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="programs shell">{insights.map((item,i)=><article className="program-row" key={item.slug}><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.excerpt}</p><ArrowLink href={`/insights/${item.slug}`}>{locale==='ro'?'Citește':'Read'}</ArrowLink></article>)}</section>
    <section className="final-loop"><div className="shell final-grid"><h2>{copy.ctaTitle}</h2><div><ArrowLink href="/insights">{copy.cta}</ArrowLink></div></div></section>
  </>
}

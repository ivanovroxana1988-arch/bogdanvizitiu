import type {Metadata} from 'next'
import {ArrowLink,Eyebrow,PageHero} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import servicePages from '@/content/service-pages.json'
import {getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=servicePages[locale].coaching
  return buildPageMetadata({
    title:locale==='ro'?'Coaching 1:1':'1:1 Coaching',
    description:copy.intro,
    path:'/coaching',
    locale,
  })
}

export default function Coaching({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=servicePages[locale].coaching

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell content-grid">
      <EditorialImage asset="coaching" kind="portrait"/>
      <div className="prose"><Eyebrow>{locale==='ro'?'Direcții de lucru':'Working directions'}</Eyebrow>{copy.areas.map(area=><article key={area.title}><h2>{area.title}</h2><p>{area.text}</p></article>)}</div>
    </section>
    <section className="shell"><div className="cta-panel"><div><Eyebrow>{locale==='ro'?'Context verificat':'Verified background'}</Eyebrow><p style={{maxWidth:'760px',lineHeight:1.8}}>{copy.proof}</p></div></div></section>
    <section className="final-loop"><div className="shell final-grid"><h2>{copy.ctaTitle}</h2><div><ArrowLink href="/contact">{copy.cta}</ArrowLink></div></div></section>
  </>
}

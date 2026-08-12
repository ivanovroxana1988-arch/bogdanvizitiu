import type {Metadata} from 'next'
import {ArrowLink,Eyebrow,PageHero} from '@/components/ui'
import servicePages from '@/content/service-pages.json'
import {getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  return buildPageMetadata({
    title:locale==='ro'?'Coaching pentru decizii, carieră și performanță':'Coaching for decisions, career and performance',
    description:locale==='ro'
      ?'Coaching individual pentru manageri și profesioniști care vor să clarifice decizii, roluri, schimbări de carieră și situații profesionale dificile.'
      :'Individual coaching for managers and professionals who want to clarify decisions, roles, career transitions and difficult professional situations.',
    path:'/coaching',
    locale,
  })
}

export default function Coaching({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=servicePages[locale].coaching

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell">
      <div className="prose" style={{maxWidth:'900px'}}>
        <Eyebrow>{locale==='ro'?'Direcții de lucru':'Working directions'}</Eyebrow>
        {copy.areas.map(area=><article key={area.title}>
          <h2>{area.title}</h2>
          <p>{area.text}</p>
          {'href' in area&&area.href&&'linkLabel' in area&&area.linkLabel?<ArrowLink href={area.href}>{area.linkLabel}</ArrowLink>:null}
        </article>)}
      </div>
    </section>
    <section className="final-loop"><div className="shell final-grid"><h2>{copy.ctaTitle}</h2><div><ArrowLink href={locale==='ro'?'/contact':'/en/contact'}>{copy.cta}</ArrowLink></div></div></section>
  </>
}

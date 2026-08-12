import type {Metadata} from 'next'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {getPrograms,getPublishedInsights} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'
import servicePages from '@/content/service-pages.json'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).home
  return buildPageMetadata({
    title:locale==='ro'?'Leadership, negociere și relații profesionale':'Leadership, negotiation and professional relationships',
    description:copy.heroIntro,
    path:'/',
    locale,
  })
}

export default function Home({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).home
  const services=servicePages[locale]
  const programs=getPrograms(locale)
  const insights=getPublishedInsights(locale).slice(0,3)

  return <>
    <section className="hero" aria-labelledby="hero-title"><div className="shell hero-grid">
      <div className="hero-copy"><Eyebrow>{copy.eyebrow}</Eyebrow><h1 id="hero-title">{copy.heroHeadline.map((line)=><span key={line}>{line}</span>)}</h1><p className="lead">{copy.heroIntro}</p><div className="actions"><ArrowLink href="/cursuri">{copy.primaryCta}</ArrowLink></div></div>
      <EditorialImage asset="hero" kind="portrait" className="hero-image" locale={locale}/>
    </div></section>

    <section id="recognition" className="recognition"><div className="shell recognition-grid"><div><h2>{copy.recognitionTitle}</h2></div><ol className="recognition-list">{copy.recognitionItems.map((item,i)=><li key={item}><span>0{i+1}</span><p>{item}</p></li>)}</ol></div></section>

    <section className="programs shell"><div className="program-intro"><Eyebrow>{copy.programsEyebrow}</Eyebrow><h2>{copy.programsStatement}</h2><p>{copy.programsIntro}</p></div>{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/cursuri/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{copy.corporateEyebrow}</Eyebrow><h2>{copy.corporateTitle}</h2></div><div className="corporate-copy"><p>{copy.corporateText}</p><ArrowLink href="/corporate">{copy.corporateCta}</ArrowLink></div><div className="domain-list">{copy.corporateDomains.map((domain,i)=><div key={domain}><span>0{i+1}</span>{domain}</div>)}</div><ConceptImage asset="workshopNotes" kind="wide" locale={locale}/></div></section>

    <section className="point-of-view clean-coaching-preview" style={{paddingBlock:'clamp(6rem,10vw,9rem)'}}><div className="shell"><div style={{maxWidth:'900px'}}><Eyebrow>{services.coaching.eyebrow}</Eyebrow><h2 style={{fontSize:'clamp(4rem,7.5vw,8rem)',margin:'0 0 42px'}}>{services.coaching.title}</h2><p style={{fontSize:'18px',lineHeight:1.75,color:'var(--muted)',maxWidth:'570px',margin:'0 0 34px'}}>{services.coaching.intro}</p><ArrowLink href="/coaching">{services.coaching.cta}</ArrowLink></div></div></section>

    <section className="programs shell"><div className="section-head"><div><Eyebrow>{copy.insightsEyebrow}</Eyebrow><h2 className="section-title">{copy.insightsTitle}</h2></div><ArrowLink href="/insights">{copy.viewInsights}</ArrowLink></div>{insights.map((insight,i)=><article className="program-row" key={insight.slug}><span>0{i+1}</span><h3>{insight.title}</h3><p>{insight.excerpt}</p><ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink></article>)}</section>

    <section className="final-loop"><div className="shell final-grid"><h2>{locale==='ro'?'De aici poate începe conversația.':'This is where the conversation can begin.'}</h2><div><p>{copy.finalText}</p><ArrowLink href="/contact">{copy.finalCta}</ArrowLink></div></div></section>
  </>
}

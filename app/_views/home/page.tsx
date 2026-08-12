import type {Metadata} from 'next'
import Link from 'next/link'
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
  const proof=[
    {value:'20+',label:locale==='ro'?'ani de experiență profesională':'years of professional experience'},
    {value:'16+',label:locale==='ro'?'ani de experiență comercială':'years of commercial experience'},
    {value:'CPC',label:locale==='ro'?'Certificare de coach profesionist · International Coach Academy · 2020':'Professional coach certification · International Coach Academy · 2020'},
    {value:locale==='ro'?'Psihologie':'Psychology',label:locale==='ro'?'Universitatea Titu Maiorescu · 2026':'Titu Maiorescu University · 2026'},
  ]
  const situations=locale==='ro'?[ 
    {text:'Vreau să construiesc relații profesionale mai bune.',label:'Networking',href:'/cursuri/networking'},
    {text:'Am o negociere importantă.',label:'Negociere',href:'/cursuri/arta-negocierii'},
    {text:'Vreau să conduc mai bine o echipă.',label:'Leadership',href:'/corporate'},
    {text:'Echipa nu funcționează cum ar trebui.',label:'Corporate',href:'/corporate'},
    {text:'Am nevoie de claritate într-o decizie profesională.',label:'Coaching',href:'/coaching'},
  ]:[
    {text:'I want to build stronger professional relationships.',label:'Networking',href:'/en/cursuri/networking'},
    {text:'I have an important negotiation ahead.',label:'Negotiation',href:'/en/cursuri/arta-negocierii'},
    {text:'I want to lead a team better.',label:'Leadership',href:'/en/corporate'},
    {text:'My team is not working as it should.',label:'Corporate',href:'/en/corporate'},
    {text:'I need clarity on a professional decision.',label:'Coaching',href:'/en/coaching'},
  ]

  return <>
    <section className="hero" aria-labelledby="hero-title"><div className="shell hero-grid">
      <div className="hero-copy"><Eyebrow>{copy.eyebrow}</Eyebrow><h1 id="hero-title">{copy.heroHeadline.map((line)=><span key={line}>{line}</span>)}</h1><p className="lead">{copy.heroIntro}</p><div className="actions"><ArrowLink href="/cursuri">{copy.primaryCta}</ArrowLink></div></div>
      <EditorialImage asset="hero" kind="portrait" className="hero-image" locale={locale}/>
    </div></section>

    <section id="recognition" className="recognition"><div className="shell recognition-grid"><div><h2>{copy.recognitionTitle}</h2></div><ol className="recognition-list">{copy.recognitionItems.map((item,i)=><li key={item}><span>0{i+1}</span><p>{item}</p></li>)}</ol></div></section>

    <section aria-label={locale==='ro'?'Repere profesionale verificate':'Verified professional credentials'} style={{paddingBlock:0}}><div className="shell" style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',columnGap:'clamp(24px,4vw,64px)'}}>{proof.map((item)=><div key={item.value} style={{padding:'30px 0 28px'}}><strong style={{display:'block',fontFamily:'var(--font-serif)',fontSize:'clamp(2rem,3vw,3.1rem)',fontWeight:400,letterSpacing:'-.04em',lineHeight:1,marginBottom:'10px'}}>{item.value}</strong><span style={{display:'block',maxWidth:'230px',fontSize:'11px',lineHeight:1.55,color:'var(--muted)',letterSpacing:'.035em'}}>{item.label}</span></div>)}</div></section>

    <section aria-labelledby="situation-title" style={{paddingBlock:'clamp(5.5rem,8vw,8rem)'}}><div className="shell" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))',gap:'clamp(56px,8vw,120px)',alignItems:'start'}}><div><Eyebrow>{locale==='ro'?'Punctul de plecare':'Starting point'}</Eyebrow><h2 id="situation-title" style={{fontFamily:'var(--font-serif)',fontSize:'clamp(3.4rem,6vw,6rem)',fontWeight:400,letterSpacing:'-.045em',lineHeight:.98,margin:0,maxWidth:'560px'}}>{locale==='ro'?'Cu ce situație vii?':'What situation are you bringing?'}</h2></div><div style={{borderTop:'1px solid var(--ink)'}}>{situations.map((item,i)=><Link key={item.text} href={item.href} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:'24px',padding:'25px 0',borderBottom:'1px solid var(--line)'}}><span style={{fontFamily:'var(--font-serif)',fontSize:'clamp(1.35rem,2vw,1.9rem)',lineHeight:1.2}}>{item.text}</span><span style={{flex:'0 0 auto',fontSize:'10px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--link)'}}>{item.label} →</span></Link>)}</div></div></section>

    <section className="programs shell"><div className="program-intro"><Eyebrow>{copy.programsEyebrow}</Eyebrow><h2>{copy.programsStatement}</h2><p>{copy.programsIntro}</p></div>{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/cursuri/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{copy.corporateEyebrow}</Eyebrow><h2>{copy.corporateTitle}</h2></div><div className="corporate-copy"><p>{copy.corporateText}</p><ArrowLink href="/corporate">{copy.corporateCta}</ArrowLink></div><div className="domain-list">{copy.corporateDomains.map((domain,i)=><div key={domain}><span>0{i+1}</span>{domain}</div>)}</div><ConceptImage asset="workshopNotes" kind="wide" locale={locale}/></div></section>

    <section className="point-of-view clean-coaching-preview" style={{paddingBlock:'clamp(6rem,10vw,9rem)'}}><div className="shell"><div style={{maxWidth:'900px'}}><Eyebrow>{services.coaching.eyebrow}</Eyebrow><h2 style={{fontSize:'clamp(4rem,7.5vw,8rem)',margin:'0 0 42px'}}>{services.coaching.title}</h2><p style={{fontSize:'18px',lineHeight:1.75,color:'var(--muted)',maxWidth:'570px',margin:'0 0 34px'}}>{services.coaching.intro}</p><ArrowLink href="/coaching">{services.coaching.cta}</ArrowLink></div></div></section>

    <section className="programs shell"><div className="section-head"><div><Eyebrow>{copy.insightsEyebrow}</Eyebrow><h2 className="section-title">{copy.insightsTitle}</h2></div><ArrowLink href="/insights">{copy.viewInsights}</ArrowLink></div>{insights.map((insight,i)=><article className="program-row" key={insight.slug}><span>0{i+1}</span><h3>{insight.title}</h3><p>{insight.excerpt}</p><ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink></article>)}</section>

    <section className="final-loop"><div className="shell final-grid"><h2>{locale==='ro'?'De aici poate începe conversația.':'This is where the conversation can begin.'}</h2><div><p>{copy.finalText}</p><ArrowLink href="/contact">{copy.finalCta}</ArrowLink></div></div></section>
  </>
}

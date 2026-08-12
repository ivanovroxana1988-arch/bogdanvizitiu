import type {Metadata} from 'next'
import Link from 'next/link'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {getPrograms,getPublishedInsights} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'
import servicePages from '@/content/service-pages.json'
import homeStyles from './home.module.css'

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
    {text:'I want to build stronger professional relationships.',label:'Networking',href:'/en/programs/networking'},
    {text:'I have an important negotiation ahead.',label:'Negotiation',href:'/en/programs/negotiation-influence'},
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

    <section aria-label={locale==='ro'?'Repere profesionale verificate':'Verified professional credentials'} className={homeStyles.proofSection}><div className={`shell ${homeStyles.proofGrid}`}>{proof.map((item)=><div key={item.value} className={homeStyles.proofItem}><strong className={homeStyles.proofValue}>{item.value}</strong><span className={homeStyles.proofLabel}>{item.label}</span></div>)}</div></section>

    <section aria-labelledby="situation-title" className={homeStyles.situationSection}><div className={`shell ${homeStyles.situationGrid}`}><div><Eyebrow>{locale==='ro'?'Punctul de plecare':'Starting point'}</Eyebrow><h2 id="situation-title" className={homeStyles.situationTitle}>{locale==='ro'?'Cu ce situație vii?':'What situation are you bringing?'}</h2></div><div className={homeStyles.situationList}>{situations.map((item)=><Link key={item.text} href={item.href} className={homeStyles.situationLink}><span className={homeStyles.situationText}>{item.text}</span><span className={homeStyles.situationLabel}>{item.label} →</span></Link>)}</div></div></section>

    <section className="programs shell"><div className="program-intro"><Eyebrow>{copy.programsEyebrow}</Eyebrow><h2>{copy.programsStatement}</h2><p>{copy.programsIntro}</p></div>{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/cursuri/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{copy.corporateEyebrow}</Eyebrow><h2>{copy.corporateTitle}</h2></div><div className="corporate-copy"><p>{copy.corporateText}</p><ArrowLink href="/corporate">{copy.corporateCta}</ArrowLink></div><div className="domain-list">{copy.corporateDomains.map((domain,i)=><div key={domain}><span>0{i+1}</span>{domain}</div>)}</div><ConceptImage asset="workshopNotes" kind="wide" locale={locale}/></div></section>

    <section className={`point-of-view clean-coaching-preview ${homeStyles.coachingPreview}`}><div className="shell"><div className={homeStyles.coachingInner}><Eyebrow>{services.coaching.eyebrow}</Eyebrow><h2 className={homeStyles.coachingTitle}>{services.coaching.title}</h2><p className={homeStyles.coachingText}>{services.coaching.intro}</p><ArrowLink href="/coaching">{services.coaching.cta}</ArrowLink></div></div></section>

    <section className="programs shell"><div className="section-head"><div><Eyebrow>{copy.insightsEyebrow}</Eyebrow><h2 className="section-title">{copy.insightsTitle}</h2></div><ArrowLink href="/insights">{copy.viewInsights}</ArrowLink></div>{insights.map((insight,i)=><article className="program-row" key={insight.slug}><span>0{i+1}</span><h3>{insight.title}</h3><p>{insight.excerpt}</p><ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink></article>)}</section>

    <section className="final-loop"><div className="shell final-grid"><h2>{locale==='ro'?'De aici poate începe conversația.':'This is where the conversation can begin.'}</h2><div><p>{copy.finalText}</p><ArrowLink href="/contact">{copy.finalCta}</ArrowLink></div></div></section>
  </>
}

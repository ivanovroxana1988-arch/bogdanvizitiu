import {ArrowLink,Eyebrow} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {getMediaAppearances,getPrograms,getPublishedInsights} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'
import servicePages from '@/content/service-pages.json'

export default function Home({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).home
  const services=servicePages[locale]
  const programs=getPrograms(locale)
  const insights=getPublishedInsights(locale).slice(0,3)
  const appearances=getMediaAppearances().slice(0,2)

  return <>
    <section className="hero" aria-labelledby="hero-title"><div className="shell hero-grid">
      <div className="hero-copy"><Eyebrow>{copy.eyebrow}</Eyebrow><h1 id="hero-title">{copy.heroHeadline.map((line)=><span key={line}>{line}</span>)}</h1><p className="lead">{copy.heroIntro}</p><div className="actions"><ArrowLink href="/cursuri">{copy.primaryCta}</ArrowLink><ArrowLink href="/despre" className="text-link">{copy.secondaryCta}</ArrowLink></div><a className="scroll-cue" href="#recognition">{locale==='ro'?'Continuă':'Continue'} <span aria-hidden>↓</span></a></div>
      <EditorialImage asset="hero" kind="portrait" className="hero-image"/>
    </div></section>

    <section id="recognition" className="recognition"><div className="shell recognition-grid"><div><h2>{copy.recognitionTitle}</h2></div><ol className="recognition-list">{copy.recognitionItems.map((item,i)=><li key={item}><span>0{i+1}</span><p>{item}</p></li>)}</ol></div></section>

    <section className="programs shell"><div className="program-intro"><Eyebrow>{copy.programsEyebrow}</Eyebrow><h2>{copy.programsStatement}</h2><p>{copy.programsIntro}</p></div>{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/cursuri/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{copy.corporateEyebrow}</Eyebrow><h2>{copy.corporateTitle}</h2></div><div className="corporate-copy"><p>{copy.corporateText}</p><ArrowLink href="/corporate">{copy.corporateCta}</ArrowLink></div><div className="domain-list">{copy.corporateDomains.map((domain,i)=><div key={domain}><span>0{i+1}</span>{domain}</div>)}</div><ConceptImage asset="workshopNotes" kind="wide"/></div></section>

    <section className="point-of-view"><div className="shell point-grid"><EditorialImage asset="coaching" kind="portrait"/><div><Eyebrow>{services.coaching.eyebrow}</Eyebrow><h2>{services.coaching.title}</h2><p>{services.coaching.intro}</p><ArrowLink href="/coaching">{services.coaching.cta}</ArrowLink></div></div></section>

    {appearances.length>0&&<section className="programs shell"><div className="section-head"><div><Eyebrow>{services.media.eyebrow}</Eyebrow><h2 className="section-title">{services.media.title}</h2></div><ArrowLink href="/media">{locale==='ro'?'Vezi aparițiile':'See appearances'}</ArrowLink></div>{appearances.map((item,i)=><article className="program-row" key={item.id}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.type}{item.published_at?` · ${item.published_at}`:''}</p><ArrowLink href={item.external_url!}>{locale==='ro'?'Deschide sursa':'Open source'}</ArrowLink></article>)}</section>}

    <section className="point-of-view"><div className="shell point-grid"><EditorialImage asset="candid" kind="portrait"/><div><h2>{copy.pointTitle}</h2><p>{copy.pointText}</p><ArrowLink href="/despre">{copy.secondaryCta}</ArrowLink></div></div></section>

    <section className="programs shell"><div className="section-head"><div><Eyebrow>{copy.insightsEyebrow}</Eyebrow><h2 className="section-title">{copy.insightsTitle}</h2></div><ArrowLink href="/insights">{copy.viewInsights}</ArrowLink></div>{insights.map((insight,i)=><article className="program-row" key={insight.slug}><span>0{i+1}</span><h3>{insight.title}</h3><p>{insight.excerpt}</p><ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink></article>)}</section>

    <section className="final-loop"><div className="shell final-grid"><h2>{copy.finalTitle}</h2><div><p>{copy.finalText}</p><ArrowLink href="/contact">{copy.finalCta}</ArrowLink></div></div></section>
  </>
}

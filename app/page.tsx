import {ArrowLink,Eyebrow} from '@/components/ui'
import {ConceptImage,EditorialImage} from '@/components/portrait'
import {getPrograms} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'

export default function Home({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).home
  const programs=getPrograms(locale)
  const areas=[...copy.areas,{title:copy.performanceTitle,description:copy.performanceDescription}]

  return <>
    <section className="hero" aria-labelledby="hero-title"><div className="shell hero-grid">
      <div className="hero-copy"><Eyebrow>BGV / 01 · {copy.eyebrow}</Eyebrow><h1 id="hero-title">{copy.heroHeadline.map((line)=><span key={line}>{line}</span>)}</h1><p className="lead">{copy.heroIntro}</p><div className="actions"><ArrowLink href="/programs">{copy.primaryCta}</ArrowLink><ArrowLink href="/about" className="text-link">{copy.secondaryCta}</ArrowLink></div><a className="scroll-cue" href="#recognition">{locale==='ro'?'Continuă':'Continue'} <span aria-hidden>↓</span></a></div>
      <EditorialImage asset="hero" kind="portrait" className="hero-image"/>
    </div></section>

    <section id="recognition" className="recognition"><div className="shell recognition-grid"><div><Eyebrow>{copy.recognitionEyebrow}</Eyebrow><h2>{copy.recognitionTitle}</h2></div><ol className="recognition-list">{copy.recognitionItems.map((item,i)=><li key={item}><span>0{i+1}</span><p>{item}</p></li>)}</ol></div></section>

    <section className="point-of-view"><div className="shell point-grid"><EditorialImage asset="candid" kind="portrait"/><div><Eyebrow>{copy.pointEyebrow}</Eyebrow><h2>{copy.pointTitle}</h2><p>{copy.pointText}</p><ArrowLink href="/about">{copy.secondaryCta}</ArrowLink></div></div></section>

    <section className="areas shell"><div className="section-head"><div><Eyebrow>{copy.areasEyebrow} / 04</Eyebrow><h2 className="section-title">{copy.areasTitle}</h2></div></div><div className="area-list">{areas.map((area,i)=><article className="area-row" key={area.title}><span>0{i+1}</span><h3>{area.title}</h3><p>{area.description}</p></article>)}</div></section>

    <section className="programs shell"><div className="program-intro"><Eyebrow>{copy.programsEyebrow} / 05</Eyebrow><h2>{copy.programsStatement}</h2><p>{copy.programsIntro}</p></div>{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/programs/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{copy.corporateEyebrow} / 06</Eyebrow><h2>{copy.corporateTitle}</h2></div><div className="corporate-copy"><p>{copy.corporateText}</p><ArrowLink href="/corporate">{copy.corporateCta}</ArrowLink></div><div className="domain-list">{copy.corporateDomains.map((domain,i)=><div key={domain}><span>0{i+1}</span>{domain}</div>)}</div><ConceptImage asset="workshopNotes" kind="wide"/></div></section>

    <section className="final-loop"><div className="shell final-grid"><Eyebrow>{copy.finalEyebrow}</Eyebrow><h2>{copy.finalTitle}</h2><div><p>{copy.finalText}</p><ArrowLink href="/contact">{copy.finalCta}</ArrowLink></div></div></section>
  </>
}

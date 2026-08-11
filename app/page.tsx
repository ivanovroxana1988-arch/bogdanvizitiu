import {ArrowLink,Eyebrow} from '@/components/ui'
import {EditorialImage,Portrait} from '@/components/portrait'
import {getInsights,getPrograms} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'

export default function Home({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).home
  const programs=getPrograms(locale)
  const insights=getInsights(locale)

  return <>
    <section className="hero shell"><div className="hero-grid"><div className="hero-copy">
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h1>{copy.headline[0]}<br/>{copy.headline[1]}<br/>{copy.headline[2]}</h1>
      <p className="lead">{copy.introduction}</p>
      <div className="actions"><ArrowLink href="/programs">{copy.primaryCta}</ArrowLink><ArrowLink href="/about" className="text-link">{copy.secondaryCta}</ArrowLink></div>
    </div><Portrait/></div></section>

    <section className="areas shell"><Eyebrow>{copy.areasEyebrow}</Eyebrow><div className="area-grid">{copy.areas.map((area,i)=><article className="area" key={area.title}><span className="num">0{i+1}</span><h3>{area.title}</h3><p>{area.description}</p></article>)}</div></section>

    <section className="position shell"><div className="position-copy"><p className="quote">“{copy.positionQuote}”</p><p>{copy.positionText}</p><ArrowLink href="/about">{copy.secondaryCta}</ArrowLink></div><Portrait/></section>

    <section className="programs shell"><div className="section-head"><div><Eyebrow>{copy.programsEyebrow}</Eyebrow><h2 className="section-title">{copy.programsTitle}</h2></div><p>{copy.programsIntro}</p></div>{programs.map((program,i)=><article className="program-row" key={program.slug}><span>0{i+1}</span><h3>{program.title}</h3><p>{program.description}</p><ArrowLink href={`/programs/${program.slug}`}>{copy.viewProgram}</ArrowLink></article>)}</section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{copy.corporateEyebrow}</Eyebrow><h2>{copy.corporateTitle}</h2></div><div className="corporate-copy"><p>{copy.corporateText}</p><ArrowLink href="/corporate">{copy.corporateCta}</ArrowLink></div><div className="domain-list">{copy.corporateDomains.map((domain,i)=><div key={domain}><span>0{i+1}</span>{domain}</div>)}</div><EditorialImage kind="workshop"/></div></section>

    <section className="areas shell"><Eyebrow>{copy.methodEyebrow}</Eyebrow><h2 className="section-title">{copy.methodTitle}</h2><div className="area-grid">{copy.methodItems.map((item,i)=><article className="area" key={item.title}><span className="num">0{i+1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>

    <section className="insights shell"><div className="section-head"><div><Eyebrow>{copy.insightsEyebrow}</Eyebrow><h2 className="section-title">{copy.insightsTitle}</h2></div><ArrowLink href="/insights">{copy.viewInsights}</ArrowLink></div><div className="insight-grid"><article className="feature-insight"><EditorialImage kind="insight"/><div className="story-meta"><span className="category">{insights[0].category}</span><span>6 min</span></div><h3>{insights[0].title}</h3><p>{insights[0].excerpt}</p><ArrowLink href={`/insights/${insights[0].slug}`}>{copy.readArticle}</ArrowLink></article><div className="secondary-stories">{insights.slice(1).map((insight,i)=><article className="insight-card" key={insight.slug}><span className="story-number">0{i+2}</span><span className="category">{insight.category}</span><h3>{insight.title}</h3><p>{insight.excerpt}</p><ArrowLink href={`/insights/${insight.slug}`}>{copy.readArticle}</ArrowLink></article>)}</div></div></section>

    <section className="speaking shell"><Portrait event/><div><Eyebrow>{copy.speakingEyebrow}</Eyebrow><h2>{copy.speakingTitle}</h2><p>{copy.speakingText}</p><ArrowLink href="/speaking">{copy.speakingCta}</ArrowLink></div></section>

    <section className="newsletter shell"><h2>{copy.newsletterTitle}</h2><div className="newsletter-side"><p>{copy.newsletterText}</p><ArrowLink href="#">{copy.followLinkedIn}</ArrowLink><form className="newsletter-form"><label className="sr-only" htmlFor="email">Email</label><input id="email" type="email" placeholder={copy.emailPlaceholder}/><button type="submit">{copy.subscribe} →</button></form></div></section>

    <section className="contact-band shell"><h2>{copy.contactTitle}</h2><div className="contact-bottom"><div className="contact-options">{copy.contactOptions.split('\n').map((line,i)=><span key={line}>{i>0&&<br/>}{line}</span>)}</div><ArrowLink href="/contact">{copy.contactCta}</ArrowLink></div></section>
  </>
}

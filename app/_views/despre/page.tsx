import type {Metadata} from 'next'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'
import aboutCopy from '@/content/about-copy.json'
import {buildPageMetadata} from '@/lib/seo'
import styles from '../commercial.module.css'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=aboutCopy[locale]
  return buildPageMetadata({
    title:locale==='ro'?'Despre Bogdan':'About Bogdan',
    description:copy.intro,
    path:'/despre',
    locale,
  })
}

export default function About({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=aboutCopy[locale]
  const contactCopy=getCopy(locale).contact
  const ideas=locale==='ro'
    ?{
      eyebrow:'Idei & metodologie',
      title:'Cum se leagă practica de ideile din spate.',
      intro:'Modele de coaching, lucrări și instrumente dezvoltate de Bogdan oferă context pentru felul în care abordează conversațiile, învățarea și schimbarea.',
      cta:'Explorează resursele',
      contact:'Începe o conversație',
    }
    :{
      eyebrow:'Ideas & methodology',
      title:'How the practice connects to the ideas behind it.',
      intro:'Coaching models, papers and tools developed by Bogdan provide context for the way he approaches conversations, learning and change.',
      cta:'Explore resources',
      contact:'Start a conversation',
    }

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{copy.titleLines.map(line=><span key={line} style={{display:'block'}}>{line}</span>)}</h1>
        <p className={styles.heroIntro}>{copy.intro}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.aboutNarrative}>
        <EditorialImage asset="portraitDark" kind="portrait" locale={locale}/>
        <div className={styles.prose}>
          {copy.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
          <p className={styles.roleLine}>{copy.roleLine}</p>
          <p>{copy.closing}</p>
          <div style={{marginTop:'36px'}}><ArrowLink href="#how-i-work">{copy.cta}</ArrowLink></div>
        </div>
      </div>
    </section>

    <section className={styles.section} id="experience">
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.experienceEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.experienceTitle}</h2>
        </div>
        <p className={styles.sectionIntro}>{copy.experienceIntro}</p>
      </div>
      <div className={styles.twoGrid}>
        {copy.experienceItems.map((item,i)=><article className={styles.editorialCard} key={item.title}>
          <span className={styles.cardIndex}>0{i+1}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.section} id="how-i-work">
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.methodEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.methodTitle}</h2>
        </div>
        <p className={styles.sectionIntro}>{copy.methodIntro}</p>
      </div>
      <div className={styles.processList}>
        {copy.methodItems.map((item,i)=><article className={styles.processRow} key={item.title}>
          <span className={styles.listIndex}>0{i+1}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.section} id="ideas-and-methodology">
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{ideas.eyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{ideas.title}</h2>
        </div>
        <div className={styles.sectionIntro}>
          <p style={{marginTop:0}}>{ideas.intro}</p>
          <ArrowLink href="/resurse">{ideas.cta}</ArrowLink>
        </div>
      </div>
    </section>

    <section className={styles.proof} id="professional-milestones">
      <div className={styles.proofInner}>
        <div>
          <Eyebrow>{copy.proofEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{copy.proofTitle}</h2>
          <p style={{color:'rgba(250,249,246,.9)',lineHeight:1.75,marginTop:'28px'}}>{copy.proofIntro}</p>
        </div>
        <div className={styles.processList}>
          {copy.proofItems.map((item,i)=><article className={styles.processRow} key={item.title}>
            <span className={styles.listIndex} style={{color:'rgba(250,249,246,.68)'}}>0{i+1}</span>
            <h3 style={{color:'#faf9f6'}}>{item.title}</h3>
            <p style={{color:'rgba(250,249,246,.9)'}}>{item.description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.cta}>
      <Eyebrow>{contactCopy.eyebrow}</Eyebrow>
      <h2 className={styles.ctaTitle}>{contactCopy.title}</h2>
      <ArrowLink href="/contact">{ideas.contact}</ArrowLink>
    </section>
  </div>
}

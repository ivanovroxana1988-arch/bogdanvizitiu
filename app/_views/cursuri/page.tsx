import type {Metadata} from 'next'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import {getPrograms} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'
import styles from '../commercial.module.css'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programs
  return buildPageMetadata({
    title:locale==='ro'?'Cursuri':'Open programs',
    description:copy.intro,
    path:'/cursuri',
    locale,
  })
}

export default function Programs({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programs
  const programs=getPrograms(locale)

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{copy.title}</h1>
        <p className={styles.heroIntro}>{copy.intro}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.approachEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.approachTitle}</h2>
        </div>
      </div>
      <div className={styles.threeGrid}>
        {copy.approachItems.map((item,i)=><article className={styles.editorialCard} key={item.title}>
          <span className={styles.cardIndex}>0{i+1}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
      <div style={{marginTop:'clamp(42px,5vw,68px)',maxWidth:'760px'}}>
        <EditorialImage asset="workshop" kind="portrait" locale={locale}/>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.choiceEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.choiceTitle}</h2>
        </div>
      </div>
      <div className={styles.programList}>
        {programs.map((program,i)=><article className={styles.programChoice} key={program.slug}>
          <span>0{i+1}</span>
          <h2>{program.title}</h2>
          <p>{program.description}</p>
          <ArrowLink href={`/cursuri/${program.slug}`}>{copy.viewProgram}</ArrowLink>
        </article>)}
      </div>
    </section>

    <section className={styles.cta}>
      <Eyebrow>{locale==='ro'?'Pentru organizații':'For organizations'}</Eyebrow>
      <h2 className={styles.ctaTitle}>{copy.tailoredTitle}</h2>
      <p className={styles.sectionIntro} style={{maxWidth:'640px',marginBottom:'34px'}}>{copy.tailoredText}</p>
      <ArrowLink href="/corporate">{copy.tailoredCta}</ArrowLink>
    </section>
  </div>
}

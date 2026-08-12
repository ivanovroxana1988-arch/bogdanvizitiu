import type {Metadata} from 'next'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {EditorialImage} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'
import styles from '../commercial.module.css'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).corporate
  return buildPageMetadata({
    title:locale==='ro'?'Programe corporate':'Corporate programs',
    description:copy.intro,
    path:'/corporate',
    locale,
  })
}

export default function Corporate({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).corporate

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{copy.title}</h1>
        <p className={styles.heroIntro}>{copy.intro}</p>
      </div>
    </section>

    <section className={styles.diagnostic}>
      <div className={styles.diagnosticInner}>
        <div>
          <Eyebrow>{copy.diagnosticEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{copy.diagnosticTitle}</h2>
        </div>
        <ul className={styles.diagnosticList}>
          {copy.diagnosticItems.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div><h2 className={styles.statement}>{copy.sectionTitle}</h2></div>
        <p className={styles.sectionIntro}>{copy.sectionText}</p>
      </div>
      <div style={{maxWidth:'760px'}}>
        <EditorialImage asset="coaching" kind="portrait"/>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.processEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.processTitle}</h2>
        </div>
      </div>
      <div className={styles.processList}>
        {copy.processItems.map((item,i)=><article className={styles.processRow} key={item.title}>
          <span className={styles.listIndex}>0{i+1}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.domainsEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.domainsTitle}</h2>
        </div>
      </div>
      <div className={styles.twoGrid}>
        {copy.blocks.map((block,i)=><article className={styles.editorialCard} key={block.title}>
          <span className={styles.cardIndex}>0{i+1}</span>
          <h3>{block.title}</h3>
          <p>{block.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.practice}>
      <div className={styles.practiceInner}>
        <div><Eyebrow>{copy.formatsEyebrow}</Eyebrow></div>
        <div>
          <h2 className={styles.statementSmall}>{copy.formatsTitle}</h2>
          <div className={styles.themeList} style={{marginTop:'42px',borderTopColor:'#55554f'}}>
            {copy.formats.map(format=><div className={styles.themeItem} key={format}>{format}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.proof}>
      <div className={styles.proofInner}>
        <div><Eyebrow>{copy.proofEyebrow}</Eyebrow></div>
        <article className={styles.proofCard}>
          <h3>{copy.proofTitle}</h3>
          <p>{copy.proofText}</p>
        </article>
      </div>
    </section>

    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
      <ArrowLink href="/contact">{copy.cta}</ArrowLink>
    </section>
  </div>
}

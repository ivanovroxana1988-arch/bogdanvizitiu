import type {Metadata} from 'next'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {JsonLd} from '@/components/json-ld'
import executiveCoaching from '@/content/executive-coaching.json'
import {getLocale} from '@/lib/i18n'
import {buildPageMetadata,localizedUrl,SITE_URL} from '@/lib/seo'
import styles from '@/app/commercial.module.css'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=executiveCoaching[locale]
  return buildPageMetadata({
    title:locale==='ro'?'Executive coaching pentru manageri și lideri':'Executive coaching for managers and leaders',
    description:locale==='ro'
      ?'Executive coaching 1:1 pentru manageri, lideri și antreprenori care vor mai multă claritate în decizii, rol, relații profesionale și schimbare.'
      :'One-to-one executive coaching for managers, leaders and entrepreneurs seeking greater clarity in decisions, role, professional relationships and change.',
    path:'/coaching/executive-coaching',
    locale,
  })
}

export default function ExecutiveCoaching({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=executiveCoaching[locale]
  const canonical=localizedUrl('/coaching/executive-coaching',locale)
  const serviceJsonLd={
    '@context':'https://schema.org',
    '@type':'Service',
    '@id':`${canonical}#service`,
    name:locale==='ro'?'Executive Coaching pentru manageri și lideri':'Executive Coaching for managers and leaders',
    description:copy.intro,
    url:canonical,
    provider:{'@id':`${SITE_URL}/#person`},
    serviceType:'Executive Coaching',
    inLanguage:locale==='ro'?'ro-RO':'en',
  }

  return <div className={`${styles.page} balanced-commercial-page`}>
    <JsonLd data={serviceJsonLd}/>

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
          <Eyebrow>{copy.recognitionEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{copy.recognitionTitle}</h2>
        </div>
        <ul className={`${styles.diagnosticList} clean-diagnostic-list`}>
          {copy.recognitionItems.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.fitGrid}>
        <article className={styles.fitBlock}>
          <Eyebrow>{copy.fitEyebrow}</Eyebrow>
          <h3>{copy.fitTitle}</h3>
          <p>{copy.fitText}</p>
        </article>
        <article className={styles.fitBlock}>
          <Eyebrow>{copy.notEyebrow}</Eyebrow>
          <h3>{copy.notTitle}</h3>
          <p>{copy.notText}</p>
        </article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.problemEyebrow}</Eyebrow>
          <h2 className={styles.statement}>{copy.problemTitle}</h2>
        </div>
        <p className={styles.sectionIntro}>{copy.problemText}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.outcomesEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.outcomesTitle}</h2>
        </div>
      </div>
      <ul className={styles.outcomeList}>
        {copy.outcomes.map(item=><li key={item}>{item}</li>)}
      </ul>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.processEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.processTitle}</h2>
        </div>
      </div>
      <div className={styles.processList}>
        {copy.processItems.map(item=><article className={`${styles.processRow} clean-process-row`} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.proof}>
      <div className={styles.proofInner}>
        <div><Eyebrow>{copy.proofEyebrow}</Eyebrow></div>
        <article className={styles.proofCard}>
          <h3>{copy.proofTitle}</h3>
          <p>{copy.proofText}</p>
          <ArrowLink href={locale==='ro'?'/despre':'/en/about'}>{locale==='ro'?'Vezi parcursul lui Bogdan':'See Bogdan’s background'}</ArrowLink>
        </article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.faqEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.faqTitle}</h2>
        </div>
      </div>
      <div className={styles.twoGrid}>
        {copy.faq.map(item=><article className={styles.editorialCard} key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.cta}>
      <Eyebrow>{copy.ctaEyebrow}</Eyebrow>
      <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
      <ArrowLink href={locale==='ro'?'/contact':'/en/contact'}>{copy.cta}</ArrowLink>
    </section>
  </div>
}

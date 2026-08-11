import {notFound} from 'next/navigation'
import {getPrograms,programSlugs} from '@/lib/data'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {getCopy,getLocale} from '@/lib/i18n'
import styles from '../../commercial.module.css'

export function generateStaticParams(){
  return programSlugs.map(slug=>({slug}))
}

export default function Program({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programDetail
  const program=getPrograms(locale).find(item=>item.slug===params.slug)
  if(!program)notFound()

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{program.title}</h1>
        <p className={styles.heroIntro}>{program.detail}</p>
      </div>
    </section>

    <section className={styles.diagnostic}>
      <div className={styles.diagnosticInner}>
        <div>
          <Eyebrow>{copy.recognitionEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{program.recognitionTitle}</h2>
        </div>
        <ul className={styles.diagnosticList}>
          {program.recognitionItems.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.fitGrid}>
        <article className={styles.fitBlock}>
          <Eyebrow>{copy.forWhomEyebrow}</Eyebrow>
          <h3>{program.forWhomTitle}</h3>
          <p>{program.forWhomText}</p>
        </article>
        <article className={styles.fitBlock}>
          <Eyebrow>{copy.notForEyebrow}</Eyebrow>
          <h3>{program.notForTitle}</h3>
          <p>{program.notForText}</p>
        </article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.problemEyebrow}</Eyebrow>
          <h2 className={styles.statement}>{program.problemTitle}</h2>
        </div>
        <p className={styles.sectionIntro}>{program.problemText}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.outcomesEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{program.outcomesTitle}</h2>
        </div>
      </div>
      <ul className={styles.outcomeList}>
        {program.outcomes.map(item=><li key={item}>{item}</li>)}
      </ul>
    </section>

    <section className={styles.practice}>
      <div className={styles.practiceInner}>
        <div><Eyebrow>{copy.formatEyebrow}</Eyebrow></div>
        <div>
          <h2 className={styles.statementSmall}>{program.formatTitle}</h2>
          <p>{program.formatText}</p>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.learnEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{program.learnTitle}</h2>
        </div>
      </div>
      <div className={styles.themeList}>
        {program.topics.map(topic=><div className={styles.themeItem} key={topic}>{topic}</div>)}
      </div>
    </section>

    <section className={styles.proof}>
      <div className={styles.proofInner}>
        <div><Eyebrow>{copy.instructorEyebrow}</Eyebrow></div>
        <article className={styles.proofCard}>
          <h3>{copy.instructorTitle}</h3>
          <p>{copy.instructorText}</p>
        </article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.practical}>
        <div><Eyebrow>{copy.faqEyebrow}</Eyebrow></div>
        <div>
          <h2 className={styles.statementSmall}>{copy.faqTitle}</h2>
          <p className={styles.sectionIntro} style={{marginTop:'28px'}}>{copy.faqText}</p>
        </div>
      </div>
    </section>

    <section className={styles.cta}>
      <Eyebrow>{copy.ctaEyebrow}</Eyebrow>
      <h2 className={styles.ctaTitle}>{program.ctaTitle}</h2>
      <ArrowLink href="/contact">{copy.cta}</ArrowLink>
    </section>
  </div>
}

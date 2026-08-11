import {ArrowLink,Eyebrow} from '@/components/ui'
import {Portrait} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'
import styles from '../commercial.module.css'

export const metadata={title:'Speaking'}

export default function Speaking({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).speaking

  return <main className={styles.page}>
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
          <Eyebrow>{copy.questionEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{copy.questionTitle}</h2>
        </div>
        <ul className={styles.diagnosticList}>
          {copy.questions.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.aboutNarrative}>
        <Portrait event/>
        <div className={styles.prose}>
          <h2 className={styles.statementSmall}>{copy.sectionTitle}</h2>
          <div style={{marginTop:'42px'}}>
            {copy.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.themesEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.themesTitle}</h2>
        </div>
      </div>
      <div className={styles.themeList}>
        {copy.themes.map(theme=><div className={styles.themeItem} key={theme}>{theme}</div>)}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.formatsEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.formatsTitle}</h2>
        </div>
      </div>
      <div className={styles.twoGrid}>
        {copy.formats.map((format,i)=><article className={styles.editorialCard} key={format.title}>
          <span className={styles.cardIndex}>0{i+1}</span>
          <h3>{format.title}</h3>
          <p>{format.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
      <ArrowLink href="/contact">{copy.cta}</ArrowLink>
    </section>
  </main>
}

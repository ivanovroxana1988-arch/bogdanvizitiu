import {Eyebrow} from '@/components/ui'
import {getCopy,getLocale} from '@/lib/i18n'
import styles from '../commercial.module.css'

export const metadata={title:'Contact'}

export default function Contact({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).contact

  return <main className={styles.page}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{copy.title}</h1>
        <p className={styles.heroIntro}>{copy.intro}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.contactLayout}>
        <div className={styles.contactLead}>
          <Eyebrow>{copy.formEyebrow}</Eyebrow>
          <h2>{copy.formTitle}</h2>
          <p>{copy.formText}</p>
        </div>

        <form className={styles.form}>
          <label>{copy.name}<input name="name" autoComplete="name" required/></label>
          <label>{copy.email}<input name="email" type="email" autoComplete="email" required/></label>
          <label className={styles.full}>{copy.scope}
            <select name="scope" defaultValue={copy.scopeOptions[0]}>
              {copy.scopeOptions.map(option=><option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className={styles.full}>{copy.interest}
            <input name="interest" placeholder={copy.interestPlaceholder}/>
          </label>
          <label className={styles.full}>{copy.message}
            <textarea name="message" placeholder={copy.messagePlaceholder} required/>
          </label>
          <label className={styles.full}>{copy.desiredChange}
            <textarea name="desiredChange" placeholder={copy.desiredChangePlaceholder}/>
          </label>
          <button type="submit">{copy.submit} →</button>
        </form>
      </div>
    </section>
  </main>
}

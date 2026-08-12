import type {Metadata} from 'next'
import Link from 'next/link'
import {Eyebrow} from '@/components/ui'
import business from '@/content/business.json'
import contactCopy from '@/content/contact-copy.json'
import {getLocale,withLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'
import styles from '../commercial.module.css'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=contactCopy[locale]
  return buildPageMetadata({
    title:'Contact',
    description:copy.intro,
    path:'/contact',
    locale,
  })
}

export default function Contact({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=contactCopy[locale]

  return <div className={styles.page}>
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
          <p style={{marginTop:28,lineHeight:1.8}}>
            <a href={`mailto:${business.email}`}><strong>{business.email}</strong></a><br/>
            <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
          </p>
          <p style={{fontSize:13,lineHeight:1.7,color:'var(--commercial-muted)'}}>{business.legalName} · CUI {business.taxId}</p>
        </div>

        <form className={styles.form} aria-describedby="contact-pending">
          <label>{copy.name}<input name="name" autoComplete="name" required/></label>
          <label>{copy.email}<input name="email" type="email" autoComplete="email" required/></label>
          <label className={styles.full}>{copy.requestType}
            <select name="requestType" defaultValue="" required>
              <option value="" disabled>{copy.requestTypePlaceholder}</option>
              {copy.requestTypeOptions.map(option=><option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className={styles.full}>{copy.scope}
            <select name="scope" defaultValue={copy.scopeOptions[0]}>
              {copy.scopeOptions.map(option=><option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className={styles.full}>{copy.interest}<input name="interest" placeholder={copy.interestPlaceholder}/></label>
          <label className={styles.full}>{copy.message}<textarea name="message" placeholder={copy.messagePlaceholder} required/></label>
          <label className={styles.full}>{copy.desiredChange}<textarea name="desiredChange" placeholder={copy.desiredChangePlaceholder}/></label>
          <div className={styles.full}>
            <label style={{display:'flex',gridTemplateColumns:'none',alignItems:'flex-start',gap:12,textTransform:'none',letterSpacing:0,fontSize:14,fontWeight:400,lineHeight:1.5}}>
              <input name="consent" type="checkbox" required style={{width:'auto',marginTop:3}}/>
              <span>{copy.consent} <Link href={withLocale('/confidentialitate',locale)}>{copy.privacy}</Link></span>
            </label>
          </div>
          <p id="contact-pending" className={styles.full} style={{margin:0,color:'var(--commercial-muted)',lineHeight:1.6}}>{copy.pending}</p>
          <button type="button" disabled aria-disabled="true" style={{cursor:'not-allowed',opacity:.55}}>{copy.submit} →</button>
        </form>
      </div>
    </section>
  </div>
}

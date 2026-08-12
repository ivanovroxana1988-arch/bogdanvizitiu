'use client'

import Link from 'next/link'
import {FormEvent,useState} from 'react'
import business from '@/content/business.json'
import contactCopy from '@/content/contact-copy.json'
import {withLocale,type Locale} from '@/lib/i18n'
import styles from '@/app/_views/commercial.module.css'

type SubmitState='idle'|'sending'|'success'|'fallback'|'error'

function buildClientFallback(form:HTMLFormElement,locale:Locale){
  const data=new FormData(form)
  const requestType=String(data.get('requestType')||'')
  const subject=locale==='ro'
    ? `Solicitare site Bogdan Vizitiu — ${requestType}`
    : `Bogdan Vizitiu website enquiry — ${requestType}`
  const body=[
    `Nume / Name: ${String(data.get('name')||'')}`,
    `Email: ${String(data.get('email')||'')}`,
    `Tip solicitare / Request type: ${requestType}`,
    `Pentru / Scope: ${String(data.get('scope')||'')}`,
    `Context: ${String(data.get('interest')||'')}`,
    '',
    'Ce se întâmplă acum? / What is happening now?',
    String(data.get('message')||''),
    '',
    'Ce ar trebui să fie diferit? / What should be different?',
    String(data.get('desiredChange')||''),
  ].join('\n')

  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm({locale}:{locale:Locale}){
  const copy=contactCopy[locale]
  const [state,setState]=useState<SubmitState>('idle')

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    const form=event.currentTarget
    const data=new FormData(form)
    const payload={
      locale,
      name:String(data.get('name')||''),
      email:String(data.get('email')||''),
      requestType:String(data.get('requestType')||''),
      scope:String(data.get('scope')||''),
      interest:String(data.get('interest')||''),
      message:String(data.get('message')||''),
      desiredChange:String(data.get('desiredChange')||''),
      consent:data.get('consent')==='on',
      website:String(data.get('website')||''),
    }

    setState('sending')

    try{
      const response=await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload),
      })
      const result=await response.json() as {ok?:boolean;fallback?:string}

      if(response.ok&&result.ok){
        form.reset()
        setState('success')
        return
      }

      if(result.fallback){
        setState('fallback')
        window.location.href=result.fallback
        return
      }

      setState('error')
    }catch{
      setState('fallback')
      window.location.href=buildClientFallback(form,locale)
    }
  }

  const statusText=state==='success'
    ?copy.success
    :state==='fallback'
      ?copy.fallback
      :state==='error'
        ?copy.error
        :copy.pending

  return <form className={styles.form} onSubmit={handleSubmit} aria-describedby="contact-status">
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

    <div aria-hidden="true" style={{position:'absolute',left:'-10000px',width:1,height:1,overflow:'hidden'}}>
      <label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    </div>

    <div className={styles.full}>
      <label style={{display:'flex',gridTemplateColumns:'none',alignItems:'flex-start',gap:12,textTransform:'none',letterSpacing:0,fontSize:14,fontWeight:400,lineHeight:1.5}}>
        <input name="consent" type="checkbox" required style={{width:'auto',marginTop:3}}/>
        <span>{copy.consent} <Link href={withLocale('/confidentialitate',locale)}>{copy.privacy}</Link></span>
      </label>
    </div>

    <p id="contact-status" className={styles.full} aria-live="polite" style={{margin:0,color:'var(--commercial-muted)',lineHeight:1.6}}>{statusText}</p>
    <button type="submit" disabled={state==='sending'} aria-disabled={state==='sending'}>{state==='sending'?copy.sending:copy.submit} →</button>
  </form>
}

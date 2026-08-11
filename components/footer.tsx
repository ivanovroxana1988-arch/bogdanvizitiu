'use client'

import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {Suspense} from 'react'
import navigation from '@/content/navigation.json'
import {getLocale,withLocale,type Locale} from '@/lib/i18n'

function FooterView({locale}:{locale:Locale}){
  const copy=navigation[locale]

  return <footer><div className="shell footer-grid">
    <div><b className="logo">BGV.</b><p>Bogdan Vizitiu<br/>{locale==='ro'?'Leadership, negociere și relații profesionale.':'Leadership, negotiation and professional relationships.'}</p></div>
    <div><p className="footer-label">{copy.information}</p>
      <Link href={withLocale('/resurse',locale)}>{copy.resources}</Link>
      <Link href={withLocale('/contact',locale)}>{copy.contact}</Link>
      <Link href={withLocale('/confidentialitate',locale)}>{copy.privacy}</Link>
      <Link href={withLocale('/termeni',locale)}>{copy.terms}</Link>
    </div>
  </div><div className="shell copyright">© {new Date().getFullYear()} Bogdan Vizitiu <span>{locale==='ro'?'Claritate înainte de soluții.':'Clarity before solutions.'}</span></div></footer>
}

function LocalizedFooter(){
  const searchParams=useSearchParams()
  const locale=getLocale(searchParams.get('lang'))
  return <FooterView locale={locale}/>
}

export function Footer(){
  return <Suspense fallback={<FooterView locale="ro"/>}><LocalizedFooter/></Suspense>
}

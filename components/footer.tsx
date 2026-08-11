'use client'

import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {Suspense} from 'react'
import {getCopy,getLocale,withLocale,type Locale} from '@/lib/i18n'

function FooterView({locale}:{locale:Locale}){
  const copy=getCopy(locale)

  return <footer><div className="shell footer-grid">
    <div><b className="logo">BGV.</b><p>Bogdan Vizitiu<br/>{copy.footer.tagline}</p></div>
    <div><p className="footer-label">{copy.footer.information}</p><Link href={withLocale('/privacy',locale)}>{copy.footer.privacy}</Link><Link href={withLocale('/terms',locale)}>{copy.footer.terms}</Link></div>
  </div><div className="shell copyright">© {new Date().getFullYear()} Bogdan Vizitiu <span>{copy.footer.closing}</span></div></footer>
}

function LocalizedFooter(){
  const searchParams=useSearchParams()
  const locale=getLocale(searchParams.get('lang'))
  return <FooterView locale={locale}/>
}

export function Footer(){
  return <Suspense fallback={<FooterView locale="ro"/>}><LocalizedFooter/></Suspense>
}

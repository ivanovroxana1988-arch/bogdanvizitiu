import Link from 'next/link'
import navigation from '@/content/navigation.json'
import business from '@/content/business.json'
import {withLocale,type Locale} from '@/lib/i18n'

const socialLinks=[
  {label:'LinkedIn',href:'https://www.linkedin.com/in/bogdan-vizitiu-pcc-1796a73/'},
  {label:'Facebook',href:'https://www.facebook.com/bogdan.o.vizitiu'},
]

export function Footer({locale}:{locale:Locale}){
  const copy=navigation[locale]

  return <footer><div className="shell footer-grid">
    <div><b className="logo">BGV.</b><p>Bogdan Vizitiu<br/>{locale==='ro'?'Leadership, negociere și relații profesionale.':'Leadership, negotiation and professional relationships.'}</p>
      <p style={{fontSize:11,lineHeight:1.7,maxWidth:520}}>
        {locale==='ro'?'Furnizor servicii':'Service provider'}: <strong>{business.legalName}</strong><br/>
        CUI / Tax ID {business.taxId} · {locale==='ro'?'Registrul Comerțului':'Trade Register'} {business.tradeRegister}<br/>
        {business.registeredOffice}<br/>
        <a href={`mailto:${business.email}`}>{business.email}</a> · <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
      </p>
    </div>
    <div><p className="footer-label">{copy.information}</p>
      <Link href={withLocale('/resurse',locale)}>{copy.resources}</Link>
      <Link href={withLocale('/contact',locale)}>{copy.contact}</Link>
      <Link href={withLocale('/confidentialitate',locale)}>{copy.privacy}</Link>
      <Link href={withLocale('/termeni',locale)}>{copy.terms}</Link>
      <div style={{marginTop:'28px'}}><p className="footer-label">Social</p>
        {socialLinks.map(link=><a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
      </div>
    </div>
  </div><div className="shell copyright">© {new Date().getFullYear()} Bogdan Vizitiu <span>{locale==='ro'?'Claritate înainte de soluții.':'Clarity before solutions.'}</span></div></footer>
}

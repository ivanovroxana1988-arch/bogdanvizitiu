import Link from 'next/link'
import navigation from '@/content/navigation.json'
import business from '@/content/business.json'
import {withLocale,type Locale} from '@/lib/i18n'
import styles from './footer.module.css'

const socialLinks=[
  {label:'LinkedIn',href:'https://www.linkedin.com/in/bogdan-vizitiu-pcc-1796a73/'},
  {label:'Facebook',href:'https://www.facebook.com/bogdan.o.vizitiu'},
]

export function Footer({locale}:{locale:Locale}){
  const copy=navigation[locale]

  return <footer><div className={`shell ${styles.grid}`}>
    <div className={styles.brand}>
      <Link href={withLocale('/',locale)} className="logo" aria-label={locale==='ro'?'Bogdan Vizitiu — pagina principală':'Bogdan Vizitiu — home'}>BGV<span aria-hidden>.</span></Link>
      <p>Bogdan Vizitiu<br/>{locale==='ro'?'Leadership, negociere și relații profesionale.':'Leadership, negotiation and professional relationships.'}</p>
      <p className={styles.legal}>
        {locale==='ro'?'Furnizor servicii':'Service provider'}: <strong>{business.legalName}</strong><br/>
        CUI / Tax ID {business.taxId} · {locale==='ro'?'Registrul Comerțului':'Trade Register'} {business.tradeRegister}<br/>
        {business.registeredOffice}<br/>
        <a href={`mailto:${business.email}`}>{business.email}</a> · <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
      </p>
    </div>

    <div className={styles.group}>
      <p className="footer-label">{locale==='ro'?'Lucrează cu Bogdan':'Work with Bogdan'}</p>
      <Link href={withLocale('/cursuri',locale)}>{copy.courses}</Link>
      <Link href={withLocale('/coaching',locale)}>{copy.coaching}</Link>
      <Link href={withLocale('/corporate',locale)}>{copy.corporate}</Link>
      <Link href={withLocale('/contact',locale)}>{copy.contact}</Link>
    </div>

    <div className={styles.group}>
      <p className="footer-label">{locale==='ro'?'Explorează':'Explore'}</p>
      <Link href={withLocale('/despre',locale)}>{copy.about}</Link>
      <Link href={withLocale('/insights',locale)}>{copy.insights}</Link>
      <Link href={withLocale('/resurse',locale)}>{copy.resources}</Link>
    </div>

    <div className={styles.group}>
      <p className="footer-label">{copy.information}</p>
      <Link href={withLocale('/confidentialitate',locale)}>{copy.privacy}</Link>
      <Link href={withLocale('/termeni',locale)}>{copy.terms}</Link>
      <div className={styles.social}>
        <p className="footer-label">Social</p>
        {socialLinks.map(link=><a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
      </div>
    </div>
  </div><div className="shell copyright">© {new Date().getFullYear()} Bogdan Vizitiu <span>{locale==='ro'?'Claritate înainte de soluții.':'Clarity before solutions.'}</span></div></footer>
}

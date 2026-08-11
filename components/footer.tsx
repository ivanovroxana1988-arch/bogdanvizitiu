'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const romanian = usePathname() === '/ro' || usePathname().startsWith('/ro/')
  return <footer><div className="shell footer-grid">
    <div><b className="logo">BGV.</b><p>Bogdan Vizitiu<br/>{romanian ? 'Leadership · Negociere · Networking · Performanță' : 'Leadership · Strategy · Growth'}</p></div>
    <div><p className="footer-label">{romanian ? 'Navigație' : 'Navigate'}</p>
      <Link href={romanian ? '/ro/despre' : '/about'}>{romanian ? 'Despre' : 'About'}</Link>
      <Link href={romanian ? '/ro/cursuri' : '/programs'}>{romanian ? 'Cursuri' : 'Programs'}</Link>
      <Link href={romanian ? '/ro/contact' : '/contact'}>Contact</Link>
    </div>
    <div><p className="footer-label">{romanian ? 'Informații' : 'Information'}</p><Link href="/privacy">{romanian ? 'Confidențialitate' : 'Privacy'}</Link><Link href="/terms">{romanian ? 'Termeni' : 'Terms'}</Link></div>
  </div><div className="shell copyright">© {new Date().getFullYear()} Bogdan Vizitiu <span>{romanian ? 'RO' : 'EN'}</span></div></footer>
}

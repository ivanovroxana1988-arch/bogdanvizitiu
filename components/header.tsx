'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const routePairs: Array<[string, string]> = [
  ['/', '/en'], ['/despre', '/en/about'], ['/cursuri', '/en/courses'],
  ['/coaching', '/en/coaching'], ['/corporate', '/en/corporate'],
  ['/media', '/en/media'], ['/resurse', '/en/resources'], ['/contact', '/en/contact'],
]

function alternatePath(pathname: string, target: 'ro' | 'en') {
  const [romanian, english] = routePairs
    .filter(([ro, en]) => pathname === ro || pathname.startsWith(`${ro}/`) || pathname === en || pathname.startsWith(`${en}/`))
    .sort((a, b) => Math.max(b[0].length, b[1].length) - Math.max(a[0].length, a[1].length))[0] ?? ['/', '/en']
  return target === 'en' ? pathname.replace(romanian, english) : pathname.replace(english, romanian)
}

const navigation = {
  ro: [['Despre','/despre'],['Cursuri','/cursuri'],['Coaching','/coaching'],['Corporate','/corporate'],['Media','/media'],['Resurse','/resurse'],['Contact','/contact']],
  en: [['About','/en/about'],['Courses','/en/courses'],['Coaching','/en/coaching'],['Corporate','/en/corporate'],['Media','/en/media'],['Resources','/en/resources'],['Contact','/en/contact']],
} as const

export function Header() {
  const pathname = usePathname()
  const locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ro'
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape) }
  }, [open])
  return <header className="header"><div className="shell nav">
    <Link href={locale === 'ro' ? '/' : '/en'} className="logo" aria-label="Bogdan Vizitiu — home">BGV.</Link>
    <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation">{open ? (locale === 'ro' ? 'Închide' : 'Close') : (locale === 'ro' ? 'Meniu' : 'Menu')}</button>
    <nav id="navigation" className={open ? 'open' : ''} aria-label={locale === 'ro' ? 'Navigație principală' : 'Main navigation'}>
      {navigation[locale].map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} href={href}>{label}</Link>)}
      <span className="language-switcher" aria-label={locale === 'ro' ? 'Alege limba' : 'Choose language'}>
        <Link href={alternatePath(pathname,'ro')} hrefLang="ro" lang="ro" aria-current={locale==='ro'?'page':undefined}>RO</Link><span aria-hidden="true">/</span>
        <Link href={alternatePath(pathname,'en')} hrefLang="en" lang="en" aria-current={locale==='en'?'page':undefined}>EN</Link>
      </span>
    </nav>
  </div></header>
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const romanianRoots = ['/ro']

const routePairs: Array<[string, string]> = [
  ['/about', '/ro/despre'],
  ['/programs', '/ro/cursuri'],
  ['/coaching', '/ro/coaching'],
  ['/speaking', '/ro/media'],
  ['/insights', '/ro/resurse'],
  ['/corporate', '/ro/corporate'],
  ['/contact', '/ro/contact'],
]

function isRomanianPath(pathname: string) {
  return romanianRoots.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

function languagePath(pathname: string, target: 'en' | 'ro') {
  if (target === 'ro') {
    if (pathname === '/') return '/ro'
    const pair = routePairs.find(([english]) => pathname === english || pathname.startsWith(`${english}/`))
    return pair ? pathname.replace(pair[0], pair[1]) : '/ro'
  }

  if (pathname === '/ro') return '/'
  const pair = routePairs.find(([, romanian]) => pathname === romanian || pathname.startsWith(`${romanian}/`))
  return pair ? pathname.replace(pair[1], pair[0]) : '/'
}

const navigation = {
  en: [
    ['About', '/about'], ['Programs', '/programs'], ['Coaching', '/coaching'], ['Corporate', '/corporate'],
    ['Insights', '/insights'], ['Speaking', '/speaking'], ['Contact', '/contact'],
  ],
  ro: [
    ['Despre', '/ro/despre'], ['Cursuri', '/ro/cursuri'], ['Coaching', '/ro/coaching'],
    ['Corporate', '/ro/corporate'], ['Media', '/ro/media'], ['Resurse', '/ro/resurse'], ['Contact', '/ro/contact'],
  ],
} as const

export function Header() {
  const pathname = usePathname()
  const locale = isRomanianPath(pathname) ? 'ro' : 'en'
  const [open, setOpen] = useState(false)

  return <header className="header">
    <div className="shell nav">
      <Link href={locale === 'ro' ? '/ro' : '/'} className="logo" aria-label="Bogdan Vizitiu — pagina principală">BGV.</Link>
      <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation">
        {locale === 'ro' ? 'Meniu' : 'Menu'}
      </button>
      <nav id="navigation" className={open ? 'open' : ''} aria-label={locale === 'ro' ? 'Navigație principală' : 'Main navigation'}>
        {navigation[locale].map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{label}</Link>)}
        <span className="language-switcher" aria-label={locale === 'ro' ? 'Alege limba' : 'Choose language'}>
          <Link href={languagePath(pathname, 'ro')} hrefLang="ro" lang="ro" aria-current={locale === 'ro' ? 'page' : undefined}>RO</Link>
          <span aria-hidden="true">/</span>
          <Link href={languagePath(pathname, 'en')} hrefLang="en" lang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link>
        </span>
      </nav>
    </div>
  </header>
}

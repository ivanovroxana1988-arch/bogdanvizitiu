'use client'

import Link from 'next/link'
import {usePathname,useSearchParams} from 'next/navigation'
import {useEffect,useState} from 'react'
import {getCopy,getLocale,withLocale} from '@/lib/i18n'

const links = [
  ['about','/about'],
  ['programs','/programs'],
  ['corporate','/corporate'],
  ['insights','/insights'],
  ['speaking','/speaking'],
  ['contact','/contact'],
] as const

export function Header(){
  const [open,setOpen]=useState(false)
  const pathname=usePathname()
  const searchParams=useSearchParams()
  const locale=getLocale(searchParams.get('lang'))
  const copy=getCopy(locale)

  useEffect(()=>{
    document.documentElement.lang=locale
  },[locale])

  return <header className="header"><div className="shell nav">
    <Link href={withLocale('/',locale)} className="logo" aria-label="Bogdan Vizitiu home">BGV.</Link>
    <button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="navigation">{copy.navigation.menu}</button>
    <nav id="navigation" className={open?'open':''} aria-label="Main navigation">
      {links.map(([key,href])=><Link onClick={()=>setOpen(false)} key={href} href={withLocale(href,locale)}>{copy.navigation[key]}</Link>)}
      <span className="language-switch" aria-label="Language">
        <Link href={withLocale(pathname,'ro')} aria-current={locale==='ro'?'page':undefined}>RO</Link>
        <span aria-hidden> / </span>
        <Link href={withLocale(pathname,'en')} aria-current={locale==='en'?'page':undefined}>EN</Link>
      </span>
      <Link className="nav-cta" href={withLocale('/programs',locale)}>{copy.navigation.programsCta}</Link>
    </nav>
  </div></header>
}

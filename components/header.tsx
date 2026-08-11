'use client'

import Link from 'next/link'
import {usePathname,useSearchParams} from 'next/navigation'
import {Suspense,useEffect,useState} from 'react'
import {getCopy,getLocale,withLocale,type Locale} from '@/lib/i18n'

const links = [
  ['about','/about'],
  ['programs','/programs'],
  ['corporate','/corporate'],
  ['insights','/insights'],
  ['speaking','/speaking'],
  ['contact','/contact'],
] as const

function HeaderView({locale,pathname}:{locale:Locale;pathname:string}){
  const [open,setOpen]=useState(false)
  const copy=getCopy(locale)

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

function LocalizedHeader(){
  const pathname=usePathname()
  const searchParams=useSearchParams()
  const locale=getLocale(searchParams.get('lang'))

  useEffect(()=>{
    document.documentElement.lang=locale
  },[locale])

  return <HeaderView locale={locale} pathname={pathname}/>
}

export function Header(){
  return <Suspense fallback={<HeaderView locale="ro" pathname="/"/>}><LocalizedHeader/></Suspense>
}

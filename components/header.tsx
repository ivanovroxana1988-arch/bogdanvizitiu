'use client'

import Link from 'next/link'
import {usePathname,useSearchParams} from 'next/navigation'
import {Suspense,useEffect,useState} from 'react'
import navigation from '@/content/navigation.json'
import {getLocale,withLocale,type Locale} from '@/lib/i18n'

const hrefs=[
  ['about','/despre'],
  ['courses','/cursuri'],
  ['coaching','/coaching'],
  ['corporate','/corporate'],
  ['media','/media'],
  ['insights','/insights'],
  ['contact','/contact'],
] as const

function HeaderView({locale,pathname}:{locale:Locale;pathname:string}){
  const [open,setOpen]=useState(false)
  const copy=navigation[locale]
  const isActive=(href:string)=>pathname===href||(href!=='/'&&pathname.startsWith(`${href}/`))

  return <header className="header"><div className="shell nav">
    <Link href={withLocale('/',locale)} className="logo" aria-label="Bogdan Vizitiu home">BGV<span aria-hidden>.</span></Link>
    <button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="navigation">{copy.menu}</button>
    <nav id="navigation" className={open?'open':''} aria-label="Main navigation">
      {hrefs.map(([key,href])=><Link onClick={()=>setOpen(false)} key={href} href={withLocale(href,locale)} aria-current={isActive(href)?'page':undefined}>{copy[key]}</Link>)}
      <span className="language-switch" aria-label="Language">
        <Link href={withLocale(pathname,'ro')} aria-current={locale==='ro'?'page':undefined}>RO</Link>
        <span aria-hidden> / </span>
        <Link href={withLocale(pathname,'en')} aria-current={locale==='en'?'page':undefined}>EN</Link>
      </span>
      <Link className="nav-cta" href={withLocale('/cursuri',locale)}>{copy.coursesCta}</Link>
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

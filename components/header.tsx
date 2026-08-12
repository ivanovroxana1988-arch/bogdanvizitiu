'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect,useRef,useState} from 'react'
import navigation from '@/content/navigation.json'
import {withLocale,type Locale} from '@/lib/i18n'

const hrefs=[
  ['about','/despre'],
  ['courses','/cursuri'],
  ['coaching','/coaching'],
  ['corporate','/corporate'],
  ['insights','/insights'],
] as const

export function Header({locale}:{locale:Locale}){
  const pathname=usePathname()
  const [open,setOpen]=useState(false)
  const menuButtonRef=useRef<HTMLButtonElement>(null)
  const copy=navigation[locale]
  const isActive=(href:string)=>{
    const target=withLocale(href,locale).split(/[?#]/)[0]
    return pathname===target||(target!=='/'&&pathname.startsWith(`${target}/`))
  }

  useEffect(()=>setOpen(false),[pathname])

  useEffect(()=>{
    if(!open)return
    const previousOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    const handleKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown',handleKeyDown)
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown)
      document.body.style.overflow=previousOverflow
    }
  },[open])

  return <header className="header"><div className="shell nav">
    <Link href={withLocale('/',locale)} className="logo" aria-label="Bogdan Vizitiu home">BGV<span aria-hidden>.</span></Link>
    <button ref={menuButtonRef} className="menu" onClick={()=>setOpen(value=>!value)} aria-expanded={open} aria-controls="navigation">{copy.menu}</button>
    <nav id="navigation" className={open?'open':''} aria-label="Main navigation">
      {hrefs.map(([key,href])=><Link onClick={()=>setOpen(false)} key={href} href={withLocale(href,locale)} aria-current={isActive(href)?'page':undefined}>{copy[key]}</Link>)}
      <span className="language-switch" aria-label="Language">
        <Link href={withLocale(pathname,'ro')} aria-current={locale==='ro'?'page':undefined}>RO</Link>
        <span aria-hidden> / </span>
        <Link href={withLocale(pathname,'en')} aria-current={locale==='en'?'page':undefined}>EN</Link>
      </span>
      <Link className="nav-cta" href={withLocale('/contact',locale)}>{copy.coursesCta}</Link>
    </nav>
  </div></header>
}

'use client'

import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {Suspense} from 'react'
import type {ReactNode} from 'react'
import {getLocale,withLocale} from '@/lib/i18n'

export function Eyebrow({children}:{children:ReactNode}){
  return <p className="eyebrow">{children}</p>
}

function LocalizedArrowLink({href,children,className=''}:{href:string;children:ReactNode;className?:string}){
  const searchParams=useSearchParams()
  const locale=getLocale(searchParams.get('lang'))
  return <Link className={`arrow-link ${className}`} href={withLocale(href,locale)}>{children} <span aria-hidden>→</span></Link>
}

export function ArrowLink(props:{href:string;children:ReactNode;className?:string}){
  const fallback=<Link className={`arrow-link ${props.className??''}`} href={props.href}>{props.children} <span aria-hidden>→</span></Link>
  return <Suspense fallback={fallback}><LocalizedArrowLink {...props}/></Suspense>
}

export function PageHero({eyebrow,title,intro}:{eyebrow:string;title:string;intro:string}){
  return <section className="page-hero shell"><Eyebrow>{eyebrow}</Eyebrow><div className="page-hero-grid"><h1>{title}</h1><p>{intro}</p></div></section>
}

'use client'

import Link from 'next/link'
import type {ReactNode} from 'react'
import {withLocale} from '@/lib/i18n'
import {useLocale} from '@/components/locale-context'

export function Eyebrow({children}:{children:ReactNode}){
  return <p className="eyebrow">{children}</p>
}

export function ArrowLink({href,children,className=''}:{href:string;children:ReactNode;className?:string}){
  const locale=useLocale()
  return <Link className={`arrow-link ${className}`} href={withLocale(href,locale)}>{children} <span aria-hidden>→</span></Link>
}

export function PageHero({eyebrow,title,intro}:{eyebrow:string;title:string;intro:string}){
  return <section className="page-hero shell"><Eyebrow>{eyebrow}</Eyebrow><div className="page-hero-grid"><h1>{title}</h1><p>{intro}</p></div></section>
}

import type {Metadata} from 'next'
import {PageHero} from '@/components/ui'
import legalCopy from '@/content/legal-copy.json'
import {getLocale} from '@/lib/i18n'

export const metadata:Metadata={
  title:'Confidențialitate',
  robots:{index:false,follow:false},
}

export default function Privacy({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=legalCopy[locale].privacy

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell prose"><p className="placeholder-warning">{copy.warning}</p><p>{copy.body}</p></section>
  </>
}

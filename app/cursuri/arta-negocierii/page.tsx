import type {Metadata} from 'next'
import Program from '../../programs/[slug]/page'
import {getPrograms} from '@/lib/data'
import {getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const program=getPrograms(locale).find(item=>item.slug==='arta-negocierii')
  return buildPageMetadata({
    title:program?.title??(locale==='ro'?'Arta Negocierii în Business':'The Art of Business Negotiation'),
    description:program?.description??'',
    path:'/cursuri/arta-negocierii',
    locale,
  })
}

export default function Negotiation({searchParams}:{searchParams?:{lang?:string}}){
  return <Program params={{slug:'arta-negocierii'}} searchParams={searchParams}/>
}

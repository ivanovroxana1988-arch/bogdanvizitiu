import type {Metadata} from 'next'
import Program from '../../programs/[slug]/page'
import {getPrograms} from '@/lib/data'
import {getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const program=getPrograms(locale).find(item=>item.slug==='networking')
  return buildPageMetadata({
    title:program?.title??(locale==='ro'?'Totul despre Networking':'Networking'),
    description:program?.description??'',
    path:'/cursuri/networking',
    locale,
  })
}

export default function Networking({searchParams}:{searchParams?:{lang?:string}}){
  return <Program params={{slug:'networking'}} searchParams={searchParams}/>
}

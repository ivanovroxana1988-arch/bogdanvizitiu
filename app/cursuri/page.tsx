import type {Metadata} from 'next'
import Programs from '../programs/page'
import {getCopy,getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programs
  return buildPageMetadata({
    title:locale==='ro'?'Cursuri':'Open programs',
    description:copy.intro,
    path:'/cursuri',
    locale,
  })
}

export default Programs

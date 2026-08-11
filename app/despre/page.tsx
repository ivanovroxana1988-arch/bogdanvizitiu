import type {Metadata} from 'next'
import About from '../about/page'
import aboutCopy from '@/content/about-copy.json'
import {getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=aboutCopy[locale]
  return buildPageMetadata({
    title:locale==='ro'?'Despre Bogdan':'About Bogdan',
    description:copy.intro,
    path:'/despre',
    locale,
  })
}

export default About

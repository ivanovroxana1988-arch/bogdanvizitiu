import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Home,{generateMetadata as homeMetadata} from '@/app/page'
import About,{generateMetadata as aboutMetadata} from '@/app/despre/page'
import Programs,{generateMetadata as programsMetadata} from '@/app/cursuri/page'
import Program,{generateMetadata as programMetadata} from '@/app/cursuri/[slug]/page'
import LeadershipDraft from '@/app/cursuri/leadership-teams/page'
import Coaching,{generateMetadata as coachingMetadata} from '@/app/coaching/page'
import Corporate,{generateMetadata as corporateMetadata} from '@/app/corporate/page'
import Media,{generateMetadata as mediaMetadata} from '@/app/media/page'
import Insights,{generateMetadata as insightsMetadata} from '@/app/insights/page'
import Insight,{generateMetadata as insightMetadata} from '@/app/insights/[slug]/page'
import Resources,{generateMetadata as resourcesMetadata} from '@/app/resurse/page'
import Contact,{generateMetadata as contactMetadata} from '@/app/contact/page'
import Privacy from '@/app/confidentialitate/page'
import Terms from '@/app/termeni/page'
import {programSlugs,publishedInsightSlugs} from '@/lib/data'
import {localizedUrl} from '@/lib/seo'
import type {Locale} from '@/lib/i18n'

const fixedRoutes=[
  [],
  ['despre'],
  ['cursuri'],
  ['cursuri','leadership-teams'],
  ['coaching'],
  ['corporate'],
  ['media'],
  ['insights'],
  ['resurse'],
  ['contact'],
  ['confidentialitate'],
  ['termeni'],
] as string[][]

const localizedRoutes=[
  ...fixedRoutes,
  ...programSlugs.map(slug=>['cursuri',slug]),
  ...publishedInsightSlugs.map(slug=>['insights',slug]),
]

const uniqueRoutes=Array.from(new Map(localizedRoutes.map(parts=>[parts.join('/'),parts])).values())

export const dynamicParams=false

export function generateStaticParams(){
  return (['ro','en'] as const).flatMap(locale=>uniqueRoutes.map(slug=>({locale,slug})))
}

function resolveLocale(value:string):Locale{
  if(value==='ro'||value==='en')return value
  notFound()
}

function routePath(slug?:string[]){
  return slug?.length?`/${slug.join('/')}`:'/'
}

function languageSearchParams(locale:Locale):{lang?:string}|undefined{
  return locale==='en'?{lang:'en'}:undefined
}

function finalizeMetadata(metadata:Metadata,path:string,locale:Locale):Metadata{
  const canonical=localizedUrl(path,locale)
  return {
    ...metadata,
    alternates:{
      canonical,
      languages:{
        'ro-RO':localizedUrl(path,'ro'),
        'en':localizedUrl(path,'en'),
        'x-default':localizedUrl(path,'ro'),
      },
    },
    openGraph:metadata.openGraph?{...metadata.openGraph,url:canonical}:metadata.openGraph,
  }
}

export function generateMetadata({params}:{params:{locale:string;slug?:string[]}}):Metadata{
  const locale=resolveLocale(params.locale)
  const path=routePath(params.slug)
  const searchParams=languageSearchParams(locale)

  let metadata:Metadata

  if(path==='/')metadata=homeMetadata({searchParams})
  else if(path==='/despre')metadata=aboutMetadata({searchParams})
  else if(path==='/cursuri')metadata=programsMetadata({searchParams})
  else if(path==='/cursuri/leadership-teams')metadata={title:'Leadership & Teams',robots:{index:false,follow:false}}
  else if(path.startsWith('/cursuri/')&&params.slug?.length===2)metadata=programMetadata({params:{slug:params.slug[1]},searchParams})
  else if(path==='/coaching')metadata=coachingMetadata({searchParams})
  else if(path==='/corporate')metadata=corporateMetadata({searchParams})
  else if(path==='/media')metadata=mediaMetadata({searchParams})
  else if(path==='/insights')metadata=insightsMetadata({searchParams})
  else if(path.startsWith('/insights/')&&params.slug?.length===2)metadata=insightMetadata({params:{slug:params.slug[1]},searchParams})
  else if(path==='/resurse')metadata=resourcesMetadata({searchParams})
  else if(path==='/contact')metadata=contactMetadata({searchParams})
  else if(path==='/confidentialitate')metadata={title:locale==='ro'?'Confidențialitate':'Privacy',robots:{index:false,follow:false}}
  else if(path==='/termeni')metadata={title:locale==='ro'?'Termeni':'Terms',robots:{index:false,follow:false}}
  else metadata={robots:{index:false,follow:false}}

  return finalizeMetadata(metadata,path,locale)
}

export default function LocalizedPage({params}:{params:{locale:string;slug?:string[]}}){
  const locale=resolveLocale(params.locale)
  const path=routePath(params.slug)
  const searchParams=languageSearchParams(locale)

  if(path==='/')return <Home searchParams={searchParams}/>
  if(path==='/despre')return <About searchParams={searchParams}/>
  if(path==='/cursuri')return <Programs searchParams={searchParams}/>
  if(path==='/cursuri/leadership-teams')return <LeadershipDraft searchParams={searchParams}/>
  if(path.startsWith('/cursuri/')&&params.slug?.length===2)return <Program params={{slug:params.slug[1]}} searchParams={searchParams}/>
  if(path==='/coaching')return <Coaching searchParams={searchParams}/>
  if(path==='/corporate')return <Corporate searchParams={searchParams}/>
  if(path==='/media')return <Media searchParams={searchParams}/>
  if(path==='/insights')return <Insights searchParams={searchParams}/>
  if(path.startsWith('/insights/')&&params.slug?.length===2)return <Insight params={{slug:params.slug[1]}} searchParams={searchParams}/>
  if(path==='/resurse')return <Resources searchParams={searchParams}/>
  if(path==='/contact')return <Contact searchParams={searchParams}/>
  if(path==='/confidentialitate')return <Privacy searchParams={searchParams}/>
  if(path==='/termeni')return <Terms searchParams={searchParams}/>

  notFound()
}

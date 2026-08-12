import View,{generateMetadata as createMetadata,generateStaticParams as createParams} from '@/app/_views/insights/[slug]/page'
import {toEnglishInsightSlug,toRomanianInsightSlug} from '@/lib/routes'

export const dynamicParams=false
export function generateStaticParams(){return createParams().map(({slug})=>({slug:toEnglishInsightSlug(slug)}))}
function internalParams(params:{slug:string}){return {slug:toRomanianInsightSlug(params.slug)}}
export function generateMetadata({params}:{params:{slug:string}}){return createMetadata({params:internalParams(params),searchParams:{lang:'en'}})}
export default function Page({params}:{params:{slug:string}}){return <View params={internalParams(params)} searchParams={{lang:'en'}}/>}

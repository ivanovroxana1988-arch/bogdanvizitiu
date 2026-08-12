import View,{generateMetadata as createMetadata,generateStaticParams as createParams} from '@/app/_views/insights/[slug]/page'
export const generateStaticParams=createParams
export function generateMetadata({params}:{params:{slug:string}}){return createMetadata({params,searchParams:{lang:'ro'}})}
export default function Page({params}:{params:{slug:string}}){return <View params={params} searchParams={{lang:'ro'}}/>}

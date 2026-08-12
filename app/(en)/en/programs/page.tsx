import View,{generateMetadata as createMetadata} from '@/app/_views/cursuri/page'

type PageProps={searchParams?:{category?:string}}

export function generateMetadata(){
  return createMetadata({searchParams:{lang:'en'}})
}

export default function Page({searchParams}:PageProps){
  return <View searchParams={{lang:'en',category:searchParams?.category}}/>
}

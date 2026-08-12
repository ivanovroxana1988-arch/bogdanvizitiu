import View from '@/app/_views/confidentialitate/page'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata(){
  return buildPageMetadata({
    title:'Confidențialitate',
    description:'Cum sunt gestionate datele personale și informațiile despre analytics pe bogdanvizitiu.com.',
    path:'/confidentialitate',
    locale:'ro',
  })
}

export default function Page(){return <View searchParams={{lang:'ro'}}/>}

import View from '@/app/_views/confidentialitate/page'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata(){
  return buildPageMetadata({
    title:'Privacy',
    description:'How personal data and website analytics are handled on bogdanvizitiu.com.',
    path:'/confidentialitate',
    locale:'en',
  })
}

export default function Page(){return <View searchParams={{lang:'en'}}/>}

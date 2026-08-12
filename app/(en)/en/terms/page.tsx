import View from '@/app/_views/termeni/page'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata(){
  return buildPageMetadata({
    title:'Terms of use',
    description:'Terms of use for bogdanvizitiu.com and provider details for TECH AND PLAY ILECA S.R.L.',
    path:'/termeni',
    locale:'en',
  })
}

export default function Page(){return <View searchParams={{lang:'en'}}/>}

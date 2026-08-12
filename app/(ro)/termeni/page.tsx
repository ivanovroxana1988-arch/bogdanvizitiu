import View from '@/app/_views/termeni/page'
import {buildPageMetadata} from '@/lib/seo'

export function generateMetadata(){
  return buildPageMetadata({
    title:'Termeni de utilizare',
    description:'Termenii de utilizare ai bogdanvizitiu.com și datele furnizorului TECH AND PLAY ILECA S.R.L.',
    path:'/termeni',
    locale:'ro',
  })
}

export default function Page(){return <View searchParams={{lang:'ro'}}/>}

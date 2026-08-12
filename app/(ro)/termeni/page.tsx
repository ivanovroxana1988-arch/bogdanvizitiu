import type {Metadata} from 'next'
import View from '@/app/_views/termeni/page'
export const metadata:Metadata={title:'Termeni',robots:{index:false,follow:false}}
export default function Page(){return <View searchParams={{lang:'ro'}}/>}

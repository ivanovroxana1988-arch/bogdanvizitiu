import type {Metadata} from 'next'
import View from '@/app/_views/confidentialitate/page'
export const metadata:Metadata={title:'Confidențialitate',robots:{index:false,follow:false}}
export default function Page(){return <View searchParams={{lang:'ro'}}/>}

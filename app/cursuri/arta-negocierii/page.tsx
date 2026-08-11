import type {Metadata} from 'next'
import Program from '../../programs/[slug]/page'

export const metadata:Metadata={
  title:'Arta Negocierii în Business',
  description:'Program practic despre pregătire, interese, opțiuni și conversațiile cu miză din business.',
  alternates:{canonical:'/cursuri/arta-negocierii'},
}

export default function Negotiation({searchParams}:{searchParams?:{lang?:string}}){
  return <Program params={{slug:'arta-negocierii'}} searchParams={searchParams}/>
}

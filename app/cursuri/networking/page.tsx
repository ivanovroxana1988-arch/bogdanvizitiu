import type {Metadata} from 'next'
import Program from '../../programs/[slug]/page'

export const metadata:Metadata={
  title:'Totul despre Networking',
  description:'Networking pentru profesioniști care vor să transforme întâlnirile în relații profesionale care continuă.',
  alternates:{canonical:'/cursuri/networking'},
}

export default function Networking({searchParams}:{searchParams?:{lang?:string}}){
  return <Program params={{slug:'networking'}} searchParams={searchParams}/>
}

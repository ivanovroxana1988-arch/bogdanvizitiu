import { notFound } from 'next/navigation'
import { PageHero, ArrowLink } from '@/components/ui'
import { getPublicProduct, getPublicProducts } from '@/lib/content/load-content'
export function generateStaticParams(){return getPublicProducts('en').map(({slug})=>({slug}))}
export default function Course({params}:{params:{slug:string}}){const product=getPublicProduct(params.slug,'en');if(!product)notFound();return <><PageHero eyebrow="Course" title={product.title} intro={product.description??'Details will be published after approval.'}/><section className="shell cta-panel"><h2>Request information.</h2><ArrowLink href="/en/contact">Contact</ArrowLink></section></>}

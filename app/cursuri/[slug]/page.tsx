import { notFound } from 'next/navigation'
import { PageHero, ArrowLink } from '@/components/ui'
import { getPublicProduct, getPublicProducts } from '@/lib/content/load-content'
export function generateStaticParams(){return getPublicProducts('ro').map(({slug})=>({slug}))}
export default function Course({params}:{params:{slug:string}}){const product=getPublicProduct(params.slug,'ro');if(!product)notFound();return <><PageHero eyebrow="Curs" title={product.title} intro={product.description??'Detaliile vor fi publicate după aprobare.'}/><section className="shell cta-panel"><h2>Solicită informații.</h2><ArrowLink href="/contact">Contact</ArrowLink></section></>}

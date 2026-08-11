import { notFound } from 'next/navigation'
import { PageHero, Eyebrow, ArrowLink } from '@/components/ui'
import products from '@/content/products.json'
export function generateStaticParams(){return products.map(({slug})=>({slug}))}
export function generateMetadata({params}:{params:{slug:string}}){const p=products.find(x=>x.slug===params.slug);return {title:p?.title ?? 'Curs',alternates:{languages:{en:`/programs/${params.slug}`,ro:`/ro/cursuri/${params.slug}`}}}}
export default function Curs({params}:{params:{slug:string}}){const p=products.find(x=>x.slug===params.slug);if(!p)notFound();return <><PageHero eyebrow="Curs deschis" title={p.title} intro={p.pillars.join(' · ')}/><section className="shell content-grid"><div><Eyebrow>Informații</Eyebrow></div><div className="prose"><h2>Detalii în curs de confirmare.</h2><p>Descrierea, formatul, datele și prețul vor fi publicate numai după verificare.</p><ArrowLink href="/ro/contact">Solicită informații</ArrowLink></div></section></>}

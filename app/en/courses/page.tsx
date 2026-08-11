import { PageHero, ArrowLink } from '@/components/ui'
import { getPublicProducts } from '@/lib/content/load-content'
export const metadata={title:'Courses'}
export default function Courses(){const products=getPublicProducts('en');return <><PageHero eyebrow="Courses" title="Courses" intro="Approved courses will be published here."/><section className="shell index-list">{products.map((p,i)=><article className="program-row" key={p.slug}><span>0{i+1}</span><h3>{p.title}</h3><p>{p.description}</p><ArrowLink href={`/en/courses/${p.slug}`}>{p.cta}</ArrowLink></article>)}</section></>}

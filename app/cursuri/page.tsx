import { PageHero, ArrowLink } from '@/components/ui'
import { getPublicProducts } from '@/lib/content/load-content'
export const metadata={title:'Cursuri'}
export default function Courses(){const products=getPublicProducts('ro');return <><PageHero eyebrow="Cursuri" title="Cursuri" intro="Aici vor apărea cursurile aprobate pentru publicare."/><section className="shell index-list">{products.map((p,i)=><article className="program-row" key={p.slug}><span>0{i+1}</span><h3>{p.title}</h3><p>{p.description}</p><ArrowLink href={`/cursuri/${p.slug}`}>{p.cta}</ArrowLink></article>)}</section></>}

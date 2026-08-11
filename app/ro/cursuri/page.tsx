import type { Metadata } from 'next'
import { PageHero, ArrowLink } from '@/components/ui'
import products from '@/content/products.json'
export const metadata: Metadata = { title: 'Cursuri', alternates: { languages: { en: '/programs', ro: '/ro/cursuri' } } }
export default function Cursuri() { return <><PageHero eyebrow="Cursuri deschise" title="Cursuri" intro="Experiențe de învățare pentru profesioniști, manageri și antreprenori."/><section className="shell index-list">{products.map((p,i)=><article className="program-row" key={p.slug}><span>0{i+1}</span><h3>{p.title}</h3><p>{p.pillars.join(' · ')}</p><ArrowLink href={`/ro/cursuri/${p.slug}`}>{p.cta}</ArrowLink></article>)}</section></> }

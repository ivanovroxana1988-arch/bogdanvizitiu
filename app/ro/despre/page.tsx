import type { Metadata } from 'next'
import { PageHero, Eyebrow, ArrowLink } from '@/components/ui'
import { Portrait } from '@/components/portrait'
import profile from '@/content/profile.json'

export const metadata: Metadata = { title: 'Despre', alternates: { languages: { en: '/about', ro: '/ro/despre' } } }
export default function Despre() { return <><PageHero eyebrow="Despre" title={profile.name} intro="Coach, trainer, antreprenor și facilitator."/><section className="shell content-grid"><Portrait/><div className="prose"><Eyebrow>Profil</Eyebrow><h2>Experiență pusă în slujba conversațiilor utile.</h2><p>Biografia și experiența profesională detaliată vor fi publicate după confirmare.</p><p>{profile.expertise.join(' · ')}</p></div></section><section className="shell cta-panel"><h2>Descoperă cursurile.</h2><ArrowLink href="/ro/cursuri">Vezi cursurile</ArrowLink></section></> }

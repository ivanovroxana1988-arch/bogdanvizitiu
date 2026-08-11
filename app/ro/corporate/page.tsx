import type { Metadata } from 'next'
import { PageHero, ArrowLink } from '@/components/ui'

export const metadata: Metadata = { title: 'Corporate', alternates: { languages: { en: '/corporate', ro: '/ro/corporate' } } }
export default function Corporate(){return <><PageHero eyebrow="Pentru organizații" title="Învățare construită în jurul realității." intro="Formatele și informațiile despre programele corporate vor fi publicate după confirmare."/><section className="shell cta-panel"><h2>Începe cu o conversație.</h2><ArrowLink href="/ro/contact">Contact</ArrowLink></section></>}

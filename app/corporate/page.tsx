import type { Metadata } from 'next'
import { PageHero, ArrowLink } from '@/components/ui'

export const metadata: Metadata = { title: 'Corporate' }
export default function Corporate(){return <><PageHero eyebrow="Pentru organizații" title="Corporate" intro="Formatele și informațiile despre programele corporate vor fi publicate după confirmare."/><section className="shell cta-panel"><h2>Solicită informații.</h2><ArrowLink href="/contact">Contact</ArrowLink></section></>}

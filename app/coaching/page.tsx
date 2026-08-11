import type { Metadata } from 'next'
import { PageHero, ArrowLink } from '@/components/ui'

export const metadata: Metadata = { title: 'Coaching', alternates: { languages: { en: '/coaching', ro: '/ro/coaching' } } }
export default function Coaching(){return <><PageHero eyebrow="Coaching" title="Coaching" intro="Format and availability will be published after confirmation."/><section className="shell cta-panel"><h2>Request information.</h2><ArrowLink href="/contact">Contact</ArrowLink></section></>}

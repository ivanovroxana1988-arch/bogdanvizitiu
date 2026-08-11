import { PageHero, ArrowLink } from '@/components/ui'
export const metadata={title:'Mulțumim',robots:{index:false,follow:false}}
export default function ThankYou(){return <><PageHero eyebrow="Confirmare" title="Mulțumim." intro="Solicitarea a fost transmisă."/><section className="shell cta-panel"><h2>Continuă explorarea.</h2><ArrowLink href="/cursuri">Vezi cursurile</ArrowLink></section></>}

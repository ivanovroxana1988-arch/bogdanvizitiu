import { PageHero, ArrowLink } from '@/components/ui'
export const metadata={title:'Thank you',robots:{index:false,follow:false}}
export default function ThankYou(){return <><PageHero eyebrow="Confirmation" title="Thank you." intro="Your request has been sent."/><section className="shell cta-panel"><h2>Continue exploring.</h2><ArrowLink href="/en/courses">View courses</ArrowLink></section></>}

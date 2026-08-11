import { PageHero, ArrowLink } from '@/components/ui'
export const metadata={title:'About'}
export default function About(){return <><PageHero eyebrow="About" title="Bogdan Vizitiu" intro="Biography and experience will be published after approval."/><section className="shell cta-panel"><h2>Explore the courses.</h2><ArrowLink href="/en/courses">View courses</ArrowLink></section></>}

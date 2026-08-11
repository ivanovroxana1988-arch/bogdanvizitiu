import type { Metadata } from 'next'
import { PageHero } from '@/components/ui'

export const metadata: Metadata = { title: 'Contact', alternates: { languages: { en: '/contact', ro: '/ro/contact' } } }
export default function Contact(){return <><PageHero eyebrow="Contact" title="Hai să discutăm." intro="Pentru cursuri, coaching, programe corporate sau alte colaborări."/><section className="shell"><form className="contact-form"><label>Nume<input name="name" autoComplete="name" required/></label><label>Email<input name="email" type="email" autoComplete="email" required/></label><label>Subiect<input name="interest" placeholder="Cursuri, coaching sau corporate"/></label><label>Ce ar fi util să discutăm?<textarea name="message" required/></label><button type="submit">Trimite mesajul →</button></form></section></>}

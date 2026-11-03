import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter confirmed — Bogdan Vizitiu',
  robots: { index: false, follow: false },
}

export default function NewsletterConfirmed() {
  return (
    <section className="shell" style={{ maxWidth: 760 }}>
      <p className="eyebrow">Newsletter</p>
      <h1>Subscription confirmed.</h1>
      <p style={{ lineHeight: 1.75, marginBlock: 30 }}>
        Thank you! You will occasionally hear from us with practical ideas about leadership,
        negotiation and professional development. Unsubscribe at any time using the link in our email.
      </p>
      <Link className="arrow-link" href="/en">Back to the website</Link>
    </section>
  )
}

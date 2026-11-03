import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter confirmat — Bogdan Vizitiu',
  robots: { index: false, follow: false },
}

export default function NewsletterConfirmed() {
  return (
    <section className="shell" style={{ maxWidth: 760 }}>
      <p className="eyebrow">Newsletter</p>
      <h1>Abonare confirmată.</h1>
      <p style={{ lineHeight: 1.75, marginBlock: 30 }}>
        Mulțumim! Vei primi din când în când idei practice despre leadership, negociere și dezvoltare profesională.
        Poți să te dezabonezi oricând folosind linkul din email.
      </p>
      <Link className="arrow-link" href="/">Înapoi pe site</Link>
    </section>
  )
}

'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import styles from './newsletter-signup.module.css'

type State = 'idle' | 'sending' | 'pending' | 'error' | 'unavailable'

export function NewsletterSignup({ locale }: { locale: Locale }) {
  const [state, setState] = useState<State>('idle')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('general')
  const [consent, setConsent] = useState(false)
  const isRo = locale === 'ro'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!consent || state === 'sending') return
    setState('sending')
    const form = event.currentTarget
    const website = String(new FormData(form).get('website') || '')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, topic, consent, locale, website }),
      })
      if (response.ok) {
        setState('pending')
        setEmail('')
        setConsent(false)
      } else {
        setState(response.status === 503 ? 'unavailable' : 'error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section id="newsletter" className={styles.section} aria-labelledby="newsletter-heading">
      <div className={'shell ' + styles.inner}>
        <div className={styles.copy}>
          <p className="eyebrow">{isRo ? 'Din când în când, ceva care contează' : 'Occasional ideas worth keeping'}</p>
          <h2 id="newsletter-heading">
            {isRo ? 'Idei bune. Direct în inbox.' : 'Good ideas. Straight to your inbox.'}
          </h2>
          <p>
            {isRo
              ? 'Perspective practice despre leadership, negociere, vânzări și relații profesionale. Fără zgomot inutil.'
              : 'Practical thinking about leadership, negotiation, sales and professional relationships. No unnecessary noise.'}
          </p>
        </div>
        <form onSubmit={submit} className={styles.form}>
          <label htmlFor="newsletter-email">{isRo ? 'Adresa ta de email' : 'Your email address'}</label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@example.com"
            disabled={state === 'sending'}
          />
          <label htmlFor="newsletter-topic">{isRo ? 'Ce te interesează?' : 'Your main interest'}</label>
          <select
            id="newsletter-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            disabled={state === 'sending'}
          >
            <option value="general">{isRo ? 'Toate subiectele' : 'All topics'}</option>
            <option value="sales">{isRo ? 'Vânzări și negociere' : 'Sales & negotiation'}</option>
            <option value="leadership">{isRo ? 'Leadership și echipe' : 'Leadership & teams'}</option>
            <option value="coaching">Executive coaching</option>
            <option value="corporate">Corporate training</option>
          </select>
          <label className={styles.consent}>
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
            <span>
              {isRo
                ? 'Sunt de acord să primesc newsletterul Bogdan Vizitiu. Mă pot dezabona oricând.'
                : 'I agree to receive the Bogdan Vizitiu newsletter. I can unsubscribe at any time.'}{' '}
              <Link href={isRo ? '/confidentialitate' : '/en/privacy'}>
                {isRo ? 'Confidențialitate' : 'Privacy'}
              </Link>
            </span>
          </label>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="newsletter-website">Website</label>
            <input id="newsletter-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button type="submit" disabled={!consent || state === 'sending'}>
            {state === 'sending'
              ? (isRo ? 'Se trimite…' : 'Sending…')
              : (isRo ? 'Vreau să primesc ideile' : 'Subscribe')}
          </button>
          <p className={styles.hint} role="status" aria-live="polite">
            {state === 'pending'
              ? (isRo ? 'Verifică-ți emailul pentru a confirma abonarea.' : 'Check your inbox to confirm your subscription.')
              : state === 'unavailable'
                ? (isRo ? 'Înscrierea nu este încă disponibilă. Încearcă mai târziu.' : 'Subscription is not available yet. Please try again later.')
                : state === 'error'
                  ? (isRo ? 'Nu am putut procesa cererea. Te rugăm să încerci din nou.' : 'We could not process your request. Please try again.')
                  : (isRo ? 'Abonarea devine activă numai după confirmarea prin email.' : 'Your subscription starts only after email confirmation.')}
          </p>
        </form>
      </div>
    </section>
  )
}

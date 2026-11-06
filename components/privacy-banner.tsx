'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { withLocale, type Locale } from '@/lib/i18n'
import { updateGoogleAdsConsent } from '@/lib/google-ads'
import {
  PRIVACY_CHANGE_EVENT,
  PRIVACY_OPEN_EVENT,
  PRIVACY_STORAGE_KEY,
  readPrivacyChoice,
  savePrivacyChoice,
} from '@/lib/privacy-consent'
import styles from './privacy-banner.module.css'

export function PrivacyPreferencesButton({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      className={styles.footerButton}
      onClick={() => window.dispatchEvent(new Event(PRIVACY_OPEN_EVENT))}
    >
      {locale === 'ro' ? 'Preferințe confidențialitate' : 'Privacy preferences'}
    </button>
  )
}

export function PrivacyBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false)
  const [preferences, setPreferences] = useState(false)
  const [measurement, setMeasurement] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const [openedByUser, setOpenedByUser] = useState(false)
  const ro = locale === 'ro'

  useEffect(() => {
    function refresh() {
      const choice = readPrivacyChoice()
      setMeasurement(choice?.adsMeasurement ?? false)
      setVisible(choice === null)
      updateGoogleAdsConsent()
    }
    function open() {
      returnFocus.current = document.activeElement as HTMLElement | null
      setMeasurement(readPrivacyChoice()?.adsMeasurement ?? false)
      setPreferences(true)
      setOpenedByUser(true)
      setVisible(true)
    }
    function storage(event: StorageEvent) {
      if (event.key === PRIVACY_STORAGE_KEY || event.key === null) refresh()
    }
    refresh()
    window.addEventListener(PRIVACY_OPEN_EVENT, open)
    window.addEventListener(PRIVACY_CHANGE_EVENT, refresh)
    window.addEventListener('storage', storage)
    return () => {
      window.removeEventListener(PRIVACY_OPEN_EVENT, open)
      window.removeEventListener(PRIVACY_CHANGE_EVENT, refresh)
      window.removeEventListener('storage', storage)
    }
  }, [])

  useEffect(() => {
    if (visible && openedByUser) heading.current?.focus()
  }, [visible, openedByUser])

  function choose(value: boolean) {
    savePrivacyChoice(value)
    setVisible(false)
    setPreferences(false)
    setOpenedByUser(false)
    returnFocus.current?.focus()
    returnFocus.current = null
  }

  if (!visible) return null
  return (
    <section className={styles.banner} role="region" aria-labelledby="privacy-banner-heading">
      <div className={styles.copy}>
        <h2 id="privacy-banner-heading" ref={heading} tabIndex={-1}>
          {ro ? 'Tu alegi ce măsurăm.' : 'You choose what we measure.'}
        </h2>
        <p>
          {ro
            ? 'Cu acordul tău, folosim Google Ads pentru a înțelege ce reclame aduc înscrieri. Poți folosi site-ul și trimite formularul și dacă refuzi.'
            : 'With your permission, we use Google Ads to understand which ads lead to registrations. You can use the site and submit forms if you decline.'}{' '}
          <Link href={withLocale('/confidentialitate', locale)}>
            {ro ? 'Confidențialitate' : 'Privacy policy'}
          </Link>
        </p>
      </div>
      {preferences && (
        <div className={styles.preferences}>
          <p>
            {ro
              ? 'Funcționarea site-ului și memorarea acestei alegeri rămân disponibile.'
              : 'Site functionality and saving this choice remain available.'}
          </p>
          <label>
            <input
              type="checkbox"
              checked={measurement}
              onChange={(event) => setMeasurement(event.target.checked)}
            />
            <span>
              {ro
                ? 'Măsurarea reclamelor prin Google Ads'
                : 'Advertising measurement with Google Ads'}
            </span>
          </label>
          <p>
            {ro
              ? 'Fără cookie-uri publicitare sau reclame personalizate. Evenimentul nu include numele, emailul sau telefonul din formular. Google primește și date tehnice ale conexiunii. Alegerea se păstrează până la 180 de zile și poate fi schimbată din footer.'
              : 'No advertising cookies or personalized ads. The event does not include your name, email or phone from the form. Google also receives technical connection data. The choice is saved for up to 180 days and can be changed in the footer.'}{' '}
            <a
              href="https://business.safety.google/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ro ? 'Cum folosește Google datele' : 'How Google uses data'}
            </a>
          </p>
        </div>
      )}
      <div className={styles.actions}>
        <button type="button" onClick={() => choose(true)}>
          {ro ? 'Acceptă' : 'Accept'}
        </button>
        <button type="button" onClick={() => choose(false)}>
          {ro ? 'Respinge' : 'Reject'}
        </button>
        {preferences ? (
          <button type="button" onClick={() => choose(measurement)}>
            {ro ? 'Salvează preferințele' : 'Save preferences'}
          </button>
        ) : (
          <button type="button" onClick={() => setPreferences(true)} aria-expanded={false}>
            {ro ? 'Preferințe' : 'Preferences'}
          </button>
        )}
      </div>
    </section>
  )
}

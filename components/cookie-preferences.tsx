'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n'
import styles from './cookie-preferences.module.css'

const STORAGE_KEY = 'bgv-cookie-preferences-v1'
type Choices = { analytics: boolean; personalization: boolean; marketing: boolean }
type StoredChoices = Choices & { version: 1; timestamp: string }
const EMPTY: Choices = { analytics: false, personalization: false, marketing: false }

function parsePreferences(raw: string | null): StoredChoices | null {
  if (!raw) return null
  try {
    const choice: unknown = JSON.parse(raw)
    if (!choice || typeof choice !== 'object') return null
    const value = choice as Record<string, unknown>
    if (
      value.version !== 1 ||
      typeof value.analytics !== 'boolean' ||
      typeof value.personalization !== 'boolean' ||
      typeof value.marketing !== 'boolean' ||
      typeof value.timestamp !== 'string'
    ) return null
    return value as StoredChoices
  } catch {
    return null
  }
}

export function CookiePreferences({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [choices, setChoices] = useState<Choices>(EMPTY)
  const isRo = locale === 'ro'

  useEffect(() => {
    try {
      const stored = parsePreferences(window.localStorage.getItem(STORAGE_KEY))
      if (stored) {
        setChoices({ analytics: stored.analytics, personalization: stored.personalization, marketing: stored.marketing })
      } else setOpen(true)
    } catch {
      // Private browsing or blocked storage: do not enable nonessential technologies.
      setOpen(true)
    }

    function onOpen() {
      setShowDetails(true)
      setOpen(true)
    }
    window.addEventListener('bgv-open-cookie-preferences', onOpen)
    return () => window.removeEventListener('bgv-open-cookie-preferences', onOpen)
  }, [])

  function save(next: Choices) {
    setChoices(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...next,
        version: 1,
        timestamp: new Date().toISOString(),
      } satisfies StoredChoices))
    } catch {
      // Preferences are not persisted if storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent('bgv-cookie-preferences-changed', { detail: next }))
    setOpen(false)
    setShowDetails(false)
  }

  if (!open) return null

  return (
    <aside className={styles.panel} aria-label={isRo ? 'Preferințe de confidențialitate' : 'Privacy preferences'}>
      <div className={styles.heading}>
        <h2>{isRo ? 'Alegerea ta contează.' : 'Your choice matters.'}</h2>
        <p>
          {isRo
            ? 'Folosim stocarea necesară pentru funcționarea site-ului. Cu acordul tău putem activa personalizarea sau instrumente opționale în viitor. Poți refuza fără să pierzi accesul la site.'
            : 'We use essential storage to operate the website. With your permission, we may enable optional personalization or tools in the future. Declining does not limit site access.'}
        </p>
      </div>
      {showDetails && (
        <div className={styles.details}>
          <div className={styles.necessary}>
            <strong>{isRo ? 'Necesare' : 'Essential'}</strong>
            <span>{isRo ? 'Active permanent' : 'Always active'}</span>
          </div>
          {([
            ['analytics', isRo ? 'Analiză suplimentară' : 'Additional analytics'],
            ['personalization', isRo ? 'Personalizare' : 'Personalization'],
            ['marketing', isRo ? 'Marketing și remarketing' : 'Marketing and remarketing'],
          ] as const).map(([key, title]) => (
            <label key={key} className={styles.toggle}>
              <span>{title}</span>
              <input type="checkbox" checked={choices[key]} onChange={(event) => setChoices((current) => ({ ...current, [key]: event.target.checked }))} />
            </label>
          ))}
          <p className={styles.small}>
            {isRo
              ? 'În prezent, nu încărcăm pixeli de publicitate. Alegerea nu activează automat un furnizor care nu este instalat.'
              : 'No advertising pixels are currently loaded. Selecting a preference does not enable a provider that is not installed.'}
          </p>
        </div>
      )}
      <div className={styles.actions}>
        <button type="button" onClick={() => save(EMPTY)}>{isRo ? 'Refuz opționale' : 'Reject optional'}</button>
        {showDetails ? (
          <button type="button" onClick={() => save(choices)}>{isRo ? 'Salvează preferințele' : 'Save preferences'}</button>
        ) : (
          <button type="button" onClick={() => setShowDetails(true)}>{isRo ? 'Personalizează' : 'Customize'}</button>
        )}
        <button type="button" onClick={() => save({ analytics: true, personalization: true, marketing: true })}>
          {isRo ? 'Accept toate' : 'Accept all'}
        </button>
      </div>
      <p className={styles.small}>
        {isRo
          ? 'Preferințele pot fi schimbate oricând din subsolul site-ului. Newsletterul are un acord separat.'
          : 'Change these preferences at any time from the footer. Newsletter signup requires separate consent.'}
      </p>
    </aside>
  )
}

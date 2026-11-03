'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { conversionEvent } from '@/lib/conversion-tracking'
import { isSalesLabEarlyBirdActive } from '@/lib/sales-lab-offer'
import styles from './sales-lab-promotion.module.css'

const sevenDays = 7 * 24 * 60 * 60 * 1000
const dismissedKey = 'sales-lab-early-bird-dismissed-until'
const submittedKey = 'sales-lab-registration-submitted'
const entryKey = 'sales-lab-early-bird-entry'
const eligiblePaths = new Set([
  '/',
  '/cursuri',
  '/cursuri/networking',
  '/cursuri/arta-negocierii',
  '/workshopuri',
])


function suppressed() {
  try {
    return (
      localStorage.getItem(submittedKey) === 'true' ||
      Number(localStorage.getItem(dismissedKey) || 0) > Date.now()
    )
  } catch {
    return false
  }
}

function trackEntry(entry: 'popup' | 'banner') {
  try {
    sessionStorage.setItem(entryKey, entry)
  } catch {
    // Storage is optional: navigation must always work.
  }
  conversionEvent('early_bird_click', entry, 'sales-lab', 'ro')
}

export function SalesLabPopup() {
  const path = usePathname()
  const [visible, setVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setVisible(false)
    if (!eligiblePaths.has(path) || !isSalesLabEarlyBirdActive() || suppressed()) return

    let fired = false
    let timeout: ReturnType<typeof setTimeout> | undefined
    function show() {
      if (fired || !isSalesLabEarlyBirdActive() || suppressed()) return
      fired = true
      setVisible(true)
      conversionEvent('early_bird_view', 'popup', 'sales-lab', 'ro')
      window.removeEventListener('scroll', onScroll)
      if (timeout !== undefined) clearTimeout(timeout)
    }
    function onScroll() {
      const scrollable = Math.max(0, document.documentElement.scrollHeight - innerHeight)
      if (scrollable > 0 && scrollY >= Math.max(300, scrollable * 0.35)) show()
    }
    timeout = setTimeout(show, 25000)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (timeout !== undefined) clearTimeout(timeout)
      window.removeEventListener('scroll', onScroll)
    }
  }, [path])

  useEffect(() => {
    function onSuccess() {
      setVisible(false)
    }
    window.addEventListener('sales-lab-registration-success', onSuccess)
    return () => window.removeEventListener('sales-lab-registration-success', onSuccess)
  }, [])

  function dismiss(reason: 'close' | 'navigate') {
    try {
      localStorage.setItem(dismissedKey, String(Date.now() + sevenDays))
    } catch {
      // Functional dismissal preference is best-effort.
    }
    if (reason === 'close') {
      conversionEvent('early_bird_close', 'popup', 'sales-lab', 'ro')
    }
    setVisible(false)
  }

  useEffect(() => {
    if (!visible) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        dismiss('close')
        return
      }
      if (event.key !== 'Tab') return
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]',
      )
      if (!controls?.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [visible])

  if (!eligiblePaths.has(path) || !visible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.scrim} aria-hidden="true" onClick={() => dismiss('close')} />
      <div
        ref={dialogRef}
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="early-bird-title"
        aria-describedby="early-bird-description"
      >
        <button
          ref={closeRef}
          className={styles.close}
          type="button"
          onClick={() => dismiss('close')}
          aria-label="Închide oferta Early Bird"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className={styles.popupContent}>
          <p className={styles.brand}>SALES <span>LAB</span> <small>by Bogdan Vizitiu</small></p>
          <p className={styles.kicker}>Ofertă de lansare · 21–22 ianuarie 2027</p>
          <h2 id="early-bird-title">Early Bird pentru <em>primele 5 locuri.</em></h2>
          <p id="early-bird-description" className={styles.description}>
            Două zile de exerciții, simulări și feedback pentru conversații comerciale mai bune.
          </p>
          <div className={styles.prices}>
            <strong>500 €</strong>
            <span><s>600 €</s> / participant</span>
          </div>
          <p className={styles.saving}>Economisești 100 € până la 30 noiembrie.</p>
          <p className={styles.meta}>București · 16 ore · Maximum 15 participanți</p>
          <div className={styles.actions}>
            <Link
              href="/sales-lab#inscriere"
              className={styles.primary}
              onClick={() => { trackEntry('popup'); dismiss('navigate') }}
            >
              Solicită înscrierea <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/sales-lab"
              className={styles.secondary}
              onClick={() => { trackEntry('popup'); dismiss('navigate') }}
            >
              Vezi programul
            </Link>
          </div>
          <p className={styles.finePrint}>
            Oferta se aplică primelor 5 locuri confirmate până la termenul indicat, în limita
            disponibilității. Completarea formularului nu rezervă automat un loc.
          </p>
          <button type="button" className={styles.later} onClick={() => dismiss('close')}>
            Poate mai târziu
          </button>
        </div>
        <div className={styles.photoPane}>
          <Image
            src="/images/bogdan/bogdan-hero.avif"
            alt="Bogdan Vizitiu, fotografie oficială"
            fill
            sizes="(max-width: 760px) 1px, 40vw"
            className={styles.photo}
          />
          <div className={styles.photoTint} aria-hidden="true" />
          <p className={styles.photoLabel}>PRACTIC. DIRECT. UMAN.</p>
        </div>
      </div>
    </div>
  )
}

export function SalesLabBanner() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const check = () => setActive(isSalesLabEarlyBirdActive())
    check()
    const interval = window.setInterval(check, 60000)
    return () => window.clearInterval(interval)
  }, [])

  if (!active) return null

  return (
    <section className={styles.banner} aria-labelledby="early-bird-banner-title">
      <div className={styles.bannerMain}>
        <p className={styles.kicker}>Sales Lab · Early Bird</p>
        <h2 id="early-bird-banner-title">Primele 5 locuri. Preț special de lansare.</h2>
        <p>21–22 ianuarie 2027, București. Oferta expiră pe 30 noiembrie 2026.</p>
      </div>
      <div className={styles.bannerOffer}>
        <div className={styles.bannerPrices}><strong>500 €</strong><s>600 €</s></div>
        <span>Economisești 100 € / participant</span>
      </div>
      <div className={styles.bannerAction}>
        <a href="#inscriere" onClick={() => trackEntry('banner')}>
          Solicită înscrierea <span aria-hidden="true">↗</span>
        </a>
        <small>Tariful se confirmă doar pentru primele 5 locuri eligibile și disponibile.</small>
      </div>
    </section>
  )
}

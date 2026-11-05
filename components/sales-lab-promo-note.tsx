'use client'

import { useEffect, useState } from 'react'
import { isSalesLabEarlyBirdActive } from '@/lib/sales-lab-offer'

/** Remains hidden on the server and expires on the client without a redeploy. */
export function SalesLabPromoNote({ className }: { className?: string }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    function update() {
      setActive(isSalesLabEarlyBirdActive())
    }
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  if (!active) return null
  return (
    <p className={className}>
      Early Bird: <strong>500 € / participant</strong> pentru primele 5 locuri confirmate până la 30
      noiembrie 2026, în limita disponibilității. Tariful final se confirmă individual, înainte de
      rezervare.
    </p>
  )
}

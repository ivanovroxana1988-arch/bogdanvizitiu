'use client'
import { track } from '@vercel/analytics'
const key = 'bgv-attribution'
export type Attribution = {
  source?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const saved: Attribution = JSON.parse(sessionStorage.getItem(key) || '{}')
    if (Object.keys(saved).length) return saved
    const params = new URLSearchParams(location.search)
    const entry: Attribution = { source: location.pathname, referrer: document.referrer }
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign'] as const)
      entry[name] = params.get(name) || ''
    sessionStorage.setItem(key, JSON.stringify(entry))
    return entry
  } catch {
    return {}
  }
}
export function attribution(explicit: Attribution): Attribution {
  const first = captureAttribution()
  return {
    ...explicit,
    source: [first.source, explicit.source].filter(Boolean).join(' -> '),
    referrer: first.referrer || '',
    utm_source: first.utm_source || explicit.utm_source,
    utm_medium: first.utm_medium || explicit.utm_medium,
    utm_campaign: first.utm_campaign || explicit.utm_campaign,
  }
}
export function conversionEvent(event: string, form: string, offer: string, locale: string) {
  try {
    track(event, { form, offer, locale, page: location.pathname })
  } catch {
    /* Analytics must never block a lead. */
  }
}

'use client'
import { useEffect } from 'react'
import { track } from '@vercel/analytics'
import { captureAttribution } from '@/lib/conversion-tracking'

export function ConversionTracking() {
  useEffect(() => {
    captureAttribution()
    function click(event: MouseEvent) {
      const link = (event.target as Element).closest?.('a')
      if (!link) return
      const url = new URL(link.href, location.href)
      if (url.origin !== location.origin || !/\/(contact|inscriere|register)$/.test(url.pathname))
        return
      try {
        track('cta_click', {
          page: location.pathname,
          destination: url.pathname,
          offer: url.searchParams.get('workshop') || url.searchParams.get('course') || '',
          locale: document.documentElement.lang,
        })
      } catch {
        /* Analytics must not interrupt navigation. */
      }
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [])
  return null
}

'use client'

import { canReportSalesLabConversion } from './sales-lab-outcome'

/**
 * Sales Lab conversion: only called after the API confirms a saved record.
 * The ad tag is not requested until a visitor explicitly opts into ad measurement.
 * Public Google Ads destination values are supplied by Vercel at build time.
 */
export function reportSalesLabGoogleAdsConversion(reference: string, consent: boolean): boolean {
  if (!canReportSalesLabConversion('saved', reference, consent)) return false
  if (typeof window === 'undefined') return false

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
  if (!conversionId || !conversionLabel || !/^(AW-)?\d+$/.test(conversionId) ||
      !/^[A-Za-z0-9_-]+$/.test(conversionLabel)) return false

  const normalizedId = conversionId.startsWith('AW-') ? conversionId : 'AW-' + conversionId
  const sentKey = 'sales-lab-google-ads-sent:' + reference
  try {
    if (sessionStorage.getItem(sentKey) === '1') return false
  } catch {
    // Browser storage is optional; Google Ads transaction_id provides server-side deduplication.
  }

  type Gtag = (...args: unknown[]) => void
  const adsWindow = window as Window & { dataLayer?: unknown[]; gtag?: Gtag }
  adsWindow.dataLayer = adsWindow.dataLayer || []
  adsWindow.gtag = adsWindow.gtag || ((...args: unknown[]) => {
    adsWindow.dataLayer!.push(args)
  })

  // Consent is opt-in and used only for this submitted registration.
  adsWindow.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', analytics_storage: 'denied',
  })
  adsWindow.gtag('consent', 'update', {
    ad_storage: 'granted', ad_user_data: 'granted',
    ad_personalization: 'denied', analytics_storage: 'denied',
  })
  adsWindow.gtag('js', new Date())
  adsWindow.gtag('config', normalizedId)
  adsWindow.gtag('event', 'conversion', {
    send_to: normalizedId + '/' + conversionLabel,
    transaction_id: reference,
  })

  if (!document.querySelector('script[data-sales-lab-google-ads]')) {
    const script = document.createElement('script')
    script.async = true
    script.dataset.salesLabGoogleAds = 'true'
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(normalizedId)
    document.head.appendChild(script)
  }

  try {
    sessionStorage.setItem(sentKey, '1')
  } catch {
    // Storage is optional.
  }
  return true
}

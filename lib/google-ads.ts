import { hasAdsMeasurementConsent } from './privacy-consent'

export const GOOGLE_ADS_ID = 'AW-18556060620'
export const SALES_LAB_SEND_TO = GOOGLE_ADS_ID + '/aCgXCJXPgLIdEMyHnJBF'

type AdsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }

export function updateGoogleAdsConsent() {
  if (typeof window === 'undefined') return
  const target = window as AdsWindow
  target.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: hasAdsMeasurementConsent() ? 'granted' : 'denied',
    ad_personalization: 'denied',
  })
}

type RegistrationResult = { ok?: boolean; record?: string; registrationId?: string }

export function salesLabConversion(result: RegistrationResult, consent: boolean, course: string) {
  if (
    !consent ||
    course !== 'sales-lab' ||
    !result.ok ||
    result.record !== 'saved' ||
    !result.registrationId ||
    !/^SL-[a-f0-9-]{36}$/.test(result.registrationId)
  )
    return null
  return {
    send_to: SALES_LAB_SEND_TO,
    value: 1,
    currency: 'RON',
    transaction_id: result.registrationId,
  }
}

/** Load advertising measurement only for an explicitly consented, saved request. */
export function trackSalesLabRegistration(result: RegistrationResult, course: string) {
  const parameters = salesLabConversion(result, hasAdsMeasurementConsent(), course)
  if (!parameters || typeof window === 'undefined') return
  try {
    const target = window as AdsWindow
    target.dataLayer ??= []
    target.gtag ??= function () {
      target.dataLayer!.push(arguments)
    }
    target.gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    target.gtag('consent', 'update', { ad_user_data: 'granted' })
    target.gtag('js', new Date())
    target.gtag('config', GOOGLE_ADS_ID, { send_page_view: false })
    target.gtag('event', 'conversion', parameters)
    if (!document.getElementById('sales-lab-google-ads')) {
      const script = document.createElement('script')
      script.id = 'sales-lab-google-ads'
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID
      document.head.appendChild(script)
    }
  } catch {
    // Measurement must never change the registration outcome.
  }
}

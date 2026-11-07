import { hasAdsMeasurementConsent } from './privacy-consent'

export const GOOGLE_ADS_ID = 'AW-18556060620'
export const SALES_LAB_SEND_TO = GOOGLE_ADS_ID + '/aCgXCJXPgLIdEMyHnJBF'

type AdsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }

/** Initialize on consent so Tag Assistant can connect before form submission. */
export function updateGoogleAdsConsent() {
  if (typeof window === 'undefined') return
  try {
    const target = window as AdsWindow
    const consent = hasAdsMeasurementConsent()
    const initialize = consent && !document.getElementById('sales-lab-google-ads')
    if (initialize) {
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
    }
    target.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: consent ? 'granted' : 'denied',
      ad_personalization: 'denied',
    })
    if (initialize) {
      target.gtag!('js', new Date())
      target.gtag!('config', GOOGLE_ADS_ID, { send_page_view: false })
      const script = document.createElement('script')
      script.id = 'sales-lab-google-ads'
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID
      document.head.appendChild(script)
    }
  } catch {
    // Measurement must never affect the site or registration outcome.
  }
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

/** Send a conversion only for an explicitly consented, saved request. */
export function trackSalesLabRegistration(result: RegistrationResult, course: string) {
  const parameters = salesLabConversion(result, hasAdsMeasurementConsent(), course)
  if (!parameters || typeof window === 'undefined') return
  try {
    updateGoogleAdsConsent()
    ;(window as AdsWindow).gtag?.('event', 'conversion', parameters)
  } catch {
    // Measurement must never change the registration outcome.
  }
}

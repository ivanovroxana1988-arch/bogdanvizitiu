import { equal, deepStrictEqual } from 'node:assert/strict'
import { test } from 'node:test'
import { savePrivacyChoice } from '../lib/privacy-consent'
import { salesLabConversion, SALES_LAB_SEND_TO } from '../lib/google-ads'

const saved = {
  ok: true,
  record: 'saved',
  registrationId: 'SL-11111111-1111-4111-8111-111111111111',
}
test('only a saved, consented Sales Lab registration produces an Ads conversion', () => {
  deepStrictEqual(salesLabConversion(saved, true, 'sales-lab'), {
    send_to: SALES_LAB_SEND_TO,
    value: 1,
    currency: 'RON',
    transaction_id: saved.registrationId,
  })
  equal(salesLabConversion(saved, false, 'sales-lab'), null)
  equal(salesLabConversion(saved, true, 'networking'), null)
  equal(salesLabConversion({ ...saved, record: 'email_only' }, true, 'sales-lab'), null)
  equal(salesLabConversion({ ok: true }, true, 'sales-lab'), null)
  equal(salesLabConversion({ ...saved, ok: false }, true, 'sales-lab'), null)
  equal(salesLabConversion({ ...saved, registrationId: '' }, true, 'sales-lab'), null)
})

test('the browser initializes on consent without a conversion and reuses the tag for saved leads', async () => {
  const { trackSalesLabRegistration, updateGoogleAdsConsent } = await import('../lib/google-ads')
  const storage = new Map<string, string>()
  const browser: { dataLayer?: unknown[]; localStorage: unknown; dispatchEvent: () => boolean } = {
    localStorage: {
      getItem: (key: string) => storage.get(key) || null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
    dispatchEvent: () => true,
  }
  const scripts: Array<{ id?: string; src?: string }> = []
  Object.defineProperty(globalThis, 'window', { value: browser, configurable: true })
  Object.defineProperty(globalThis, 'document', {
    value: {
      getElementById: (id: string) => scripts.find((script) => script.id === id) || null,
      createElement: () => ({}),
      head: { appendChild: (script: { id?: string; src?: string }) => scripts.push(script) },
    },
    configurable: true,
  })
  try {
    updateGoogleAdsConsent()
    trackSalesLabRegistration(saved, 'sales-lab')
    savePrivacyChoice(false)
    updateGoogleAdsConsent()
    equal(scripts.length, 0)
    equal(browser.dataLayer, undefined)
    savePrivacyChoice(true)
    updateGoogleAdsConsent()
    updateGoogleAdsConsent() // React effects and preferences must not duplicate config.
    trackSalesLabRegistration({ ok: true }, 'sales-lab')
    trackSalesLabRegistration({ ...saved, record: 'email_only' }, 'sales-lab')
    trackSalesLabRegistration(saved, 'other-course')
    equal(scripts.length, 1)
    equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=AW-18556060620')
    const commands = browser.dataLayer!.map((entry) => Array.from(entry as IArguments))
    deepStrictEqual(commands[0], [
      'consent',
      'default',
      {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ])
    equal((commands[1][2] as { ad_user_data: string }).ad_user_data, 'granted')
    deepStrictEqual(commands[3], ['config', 'AW-18556060620', { send_page_view: false }])
    equal(commands.filter((command) => command[0] === 'event').length, 0)
    trackSalesLabRegistration(saved, 'sales-lab')
    const afterSaved = browser.dataLayer!.map((entry) => Array.from(entry as IArguments))
    const events = afterSaved.filter((command) => command[0] === 'event')
    deepStrictEqual(events, [['event', 'conversion', salesLabConversion(saved, true, 'sales-lab')]])
    equal(afterSaved.filter((command) => command[0] === 'config').length, 1)
    equal(scripts.length, 1)
    savePrivacyChoice(false)
    updateGoogleAdsConsent()
    const count = browser.dataLayer!.length
    trackSalesLabRegistration(saved, 'sales-lab')
    equal(browser.dataLayer!.length, count)
    const revoked = Array.from(browser.dataLayer![count - 1] as IArguments)
    equal((revoked[2] as { ad_user_data: string }).ad_user_data, 'denied')
  } finally {
    Reflect.deleteProperty(globalThis, 'window')
    Reflect.deleteProperty(globalThis, 'document')
  }
})

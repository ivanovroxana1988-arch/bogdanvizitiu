import { equal } from 'node:assert/strict'
import { test } from 'node:test'
import {
  parsePrivacyChoice,
  readPrivacyChoice,
  savePrivacyChoice,
  hasAdsMeasurementConsent,
  PRIVACY_STORAGE_KEY,
} from '../lib/privacy-consent'

test('only explicit, current, versioned privacy choices are accepted', () => {
  const now = 1800000000000
  const valid = { version: 1, adsMeasurement: true, savedAt: now - 1000 }
  equal(parsePrivacyChoice(JSON.stringify(valid), now)?.adsMeasurement, true)
  equal(
    parsePrivacyChoice(JSON.stringify({ ...valid, adsMeasurement: false }), now)?.adsMeasurement,
    false,
  )
  for (const invalid of [
    null,
    '',
    'broken',
    '{}',
    JSON.stringify({ ...valid, version: 0 }),
    JSON.stringify({ ...valid, adsMeasurement: 'true' }),
    JSON.stringify({ ...valid, savedAt: now + 1 }),
    JSON.stringify({ ...valid, savedAt: now - 180 * 86400000 }),
  ]) {
    equal(parsePrivacyChoice(invalid, now), null)
  }
})

test('privacy defaults to denied; saved choices can be revoked and changes across tabs are read', () => {
  const storage = new Map<string, string>()
  let events = 0
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: (k: string) => storage.get(k) || null,
        setItem: (k: string, v: string) => storage.set(k, v),
      },
      dispatchEvent: () => {
        events++
        return true
      },
    },
  })
  try {
    equal(readPrivacyChoice(), null)
    equal(hasAdsMeasurementConsent(), false)
    savePrivacyChoice(true)
    equal(hasAdsMeasurementConsent(), true)
    savePrivacyChoice(false)
    equal(hasAdsMeasurementConsent(), false)
    equal(events, 2)
    storage.set(
      PRIVACY_STORAGE_KEY,
      JSON.stringify({ version: 1, adsMeasurement: true, savedAt: Date.now() }),
    )
    equal(hasAdsMeasurementConsent(), true)
    storage.delete(PRIVACY_STORAGE_KEY)
    equal(hasAdsMeasurementConsent(), false)
  } finally {
    Reflect.deleteProperty(globalThis, 'window')
  }
})

test('blocked browser storage preserves the current page choice without breaking the form', () => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: () => null,
        setItem: () => {
          throw new Error('storage blocked')
        },
      },
      dispatchEvent: () => true,
    },
  })
  try {
    savePrivacyChoice(true)
    equal(hasAdsMeasurementConsent(), true)
    savePrivacyChoice(false)
    equal(hasAdsMeasurementConsent(), false)
  } finally {
    Reflect.deleteProperty(globalThis, 'window')
  }
})

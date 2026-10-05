import assert from 'node:assert/strict'
import test from 'node:test'
import { attribution, captureAttribution } from '../lib/conversion-tracking'

test('first entry and campaign survive navigation to the lead form', () => {
  const values = new Map<string, string>()
  Object.assign(globalThis, {
    window: {},
    location: { pathname: '/workshopuri', search: '?utm_source=linkedin&utm_campaign=teams' },
    document: { referrer: 'https://www.google.com/' },
    sessionStorage: {
      getItem: (k: string) => values.get(k),
      setItem: (k: string, v: string) => values.set(k, v),
    },
  })
  captureAttribution()
  Object.assign(globalThis, { location: { pathname: '/contact', search: '?source=workshops' } })
  const result = attribution({ source: 'workshops' })
  assert.equal(result.source, '/workshopuri -> workshops')
  assert.equal(result.utm_source, 'linkedin')
  assert.equal(result.utm_campaign, 'teams')
  assert.equal(result.referrer, 'https://www.google.com/')
})

test('blocked browser storage preserves explicit attribution without throwing', () => {
  Object.assign(globalThis, {
    sessionStorage: {
      getItem: () => {
        throw new Error('storage disabled')
      },
    },
  })
  assert.deepEqual(attribution({ source: 'program-detail', utm_source: 'newsletter' }), {
    source: 'program-detail',
    referrer: '',
    utm_source: 'newsletter',
    utm_medium: undefined,
    utm_campaign: undefined,
  })
})

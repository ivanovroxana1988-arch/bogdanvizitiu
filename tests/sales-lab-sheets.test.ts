import { deepStrictEqual, equal, match } from 'node:assert/strict'
import { test } from 'node:test'
import { makeRegistrationRow } from '../lib/sales-lab-sheets'

test('Sales Lab registration row matches the 15-column Google Sheet layout', () => {
  const row = makeRegistrationRow(
    {
      name: 'Ana Popescu',
      email: 'ana@example.test',
      phone: '+40700000000',
      company: 'Example',
      seats: 2,
      source: 'sales-lab-landing',
      referrer: 'https://example.test/',
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'sales-lab',
    },
    '2026-11-03T16:00:00.000Z',
    'SL-test',
  )
  equal(row.length, 15)
  deepStrictEqual(row.slice(0, 2), ['SL-test', '2026-11-03T16:00:00.000Z'])
  equal(row[3], 'Ana Popescu')
  equal(row[4], 'ana@example.test')
  equal(row[5], 2)
  equal(row[8], 'Cerere primita')
  equal(row[14], 'SL-test')
  match(String(row[2]), /linkedin/)
})

test('Waitlisted applicant stays pending and user input remains raw text', () => {
  const row = makeRegistrationRow(
    {
      name: '=HYPERLINK("https://example.test","click")',
      email: 'test@example.test',
      phone: '+40700000000',
      company: '',
      seats: 1,
      source: '',
      referrer: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
    },
    '2026-11-03T16:00:00.000Z',
    'SL-waitlist',
    'In asteptare',
  )
  equal(row[8], 'In asteptare')
  equal(row[3], '=HYPERLINK("https://example.test","click")')
})

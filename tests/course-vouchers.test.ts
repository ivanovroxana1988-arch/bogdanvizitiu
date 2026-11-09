import { equal, match, doesNotMatch } from 'node:assert/strict'
import { test } from 'node:test'
import { quoteCourseVoucher, describeCourseVoucher } from '../lib/course-vouchers'
import { buildSalesLabConfirmation } from '../lib/sales-lab-confirmation'
import { makeRegistrationRow } from '../lib/sales-lab-sheets'

const november = Date.parse('2026-11-09T12:00:00Z')
const december = Date.parse('2026-12-01T12:00:00Z')

test('voucher applies 10% and retains conditional stacking with Early Bird', () => {
  const quote = quoteCourseVoucher(' stupbt ', 'sales-lab', 2, november)!
  equal(quote.code, 'STUPBT')
  equal(quote.pricePerSeatEur, 540)
  equal(quote.totalEur, 1080)
  equal(quote.conditionalEarlyBirdPriceEur, 450)
  match(describeCourseVoucher(quote), /total 900 EUR/)
  match(describeCourseVoucher(quote), /se confirmă personal/)
  const message = buildSalesLabConfirmation({ name: 'Ana', seats: 2, voucher: quote }, november)
  match(message.text, /450 EUR/)
  match(message.html, /450 EUR/)
  doesNotMatch(message.text + message.html, /nu se cumulează/i)
})

test('expired Early Bird does not remove the standard voucher reduction', () => {
  const quote = quoteCourseVoucher('STUPBT', 'sales-lab', 1, december)!
  equal(quote.pricePerSeatEur, 540)
  equal(quote.conditionalEarlyBirdPriceEur, null)
  doesNotMatch(describeCourseVoucher(quote), /Early Bird/)
})

test('invalid codes, courses and quantities cannot receive a quote', () => {
  for (const code of ['', 'OTHER10', null, 10, 'a'.repeat(65)]) {
    equal(quoteCourseVoucher(code, 'sales-lab', 1, november), null)
  }
  equal(quoteCourseVoucher('STUPBT', 'other-course', 1, november), null)
  for (const seats of [0, -1, 16, 1.5, '2', NaN]) {
    equal(quoteCourseVoucher('STUPBT', 'sales-lab', seats, november), null)
  }
})

test('voucher details append after the existing registration columns', () => {
  const voucher = quoteCourseVoucher('STUPBT', 'sales-lab', 2, november)!
  const row = makeRegistrationRow(
    {
      name: 'Ana',
      email: 'ana@example.test',
      phone: '0700000000',
      company: '',
      seats: 2,
      source: '',
      referrer: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      voucher,
    },
    '2026-11-09',
    'SL-voucher',
  )
  equal(row[14], 'SL-voucher')
  equal(row[15], 'STUPBT')
  equal(row[18], 540)
  equal(row[20], 450)
})

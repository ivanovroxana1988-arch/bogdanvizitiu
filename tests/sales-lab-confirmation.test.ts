import { equal, match, doesNotMatch } from 'node:assert/strict'
import { test } from 'node:test'
import { buildSalesLabConfirmation } from '../lib/sales-lab-confirmation'

test('Sales Lab acknowledgement describes dates, location, price and pending status', () => {
  const { subject, text, html } = buildSalesLabConfirmation({ name: 'Ana Popescu', seats: 2 })
  match(subject, /21–22 ianuarie 2027/)
  match(text, /Bună, Ana!/)
  match(text, /București/)
  match(text, /600 EUR \/ participant/)
  match(text, /Early Bird: 500 EUR \/ participant/)
  match(text, /Tariful final va fi confirmat individual/)
  match(html, /Preț standard:/)
  match(text, /2 participanți/)
  match(text, /Locul nu este încă rezervat/)
  match(html, /Am primit solicitarea ta/)
  doesNotMatch(text, /locul tău este confirmat/i)
})

test('Sales Lab acknowledgement expires conditional promotion in the email', () => {
  const before = buildSalesLabConfirmation({ name: 'Ana Popescu', seats: 1 }, Date.parse('2026-11-03T20:00:00Z'))
  const after = buildSalesLabConfirmation({ name: 'Ana Popescu', seats: 1 }, Date.parse('2026-12-01T00:00:00Z'))
  match(before.text, /Early Bird/)
  doesNotMatch(after.text, /Early Bird/)
  doesNotMatch(after.html, /Early Bird/)
  match(after.text, /Preț standard: 600 EUR/)
})

test('Sales Lab acknowledgement escapes applicant input in email HTML', () => {
  const { html, text } = buildSalesLabConfirmation({ name: '<script>alert(1)</script>', seats: 1 })
  match(html, /&lt;script&gt;/)
  doesNotMatch(html, /<script>alert/)
  match(text, /1 participant/)
  equal((html.match(/600 EUR/g) || []).length, 1)
})

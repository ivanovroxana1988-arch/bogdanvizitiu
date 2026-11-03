import { equal, match, doesNotMatch } from 'node:assert/strict'
import { test } from 'node:test'
import { buildSalesLabConfirmation } from '../lib/sales-lab-confirmation'

test('Sales Lab acknowledgement describes dates, location, price and pending status', () => {
  const { subject, text, html } = buildSalesLabConfirmation({ name: 'Ana Popescu', seats: 2 })
  match(subject, /21–22 ianuarie 2027/)
  match(text, /Bună, Ana!/)
  match(text, /București/)
  match(text, /600 EUR \/ participant/)
  match(text, /2 participanți/)
  match(text, /Locul nu este încă rezervat/)
  match(html, /Am primit solicitarea ta/)
  doesNotMatch(text, /locul tău este confirmat/i)
})

test('Sales Lab acknowledgement escapes applicant input in email HTML', () => {
  const { html, text } = buildSalesLabConfirmation({ name: '<script>alert(1)</script>', seats: 1 })
  match(html, /&lt;script&gt;/)
  doesNotMatch(html, /<script>alert/)
  match(text, /1 participant/)
  equal((html.match(/600 EUR/g) || []).length, 1)
})

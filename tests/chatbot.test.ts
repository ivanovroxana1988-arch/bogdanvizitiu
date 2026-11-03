import test from 'node:test'
import assert from 'node:assert/strict'
import {
  guidedChatReply,
  salesLabFacts,
  selectChatActions,
  validateChatMessages,
} from '../lib/chatbot'

const now = Date.parse('2026-11-03T12:00:00Z')
const ask = (content: string, path = '/') =>
  guidedChatReply([{ role: 'user', content }], path, 'ro', now)

test('sales leads reach the actual registration form without promising a seat', () => {
  const reply = ask('Vreau un curs de vânzări')
  assert.match(reply.text, /21–22 ianuarie 2027/)
  assert.match(reply.text, /nu rezervă automat/)
  assert.ok(reply.actions.some((a) => a.href === '/sales-lab?source=chatbot#inscriere'))
})
test('corporate sales requests go to a tailored proposal rather than individual registration', () => {
  const reply = ask('Vreau training de vânzări pentru echipa mea')
  assert.ok(reply.actions.some((a) => a.id === 'contact'))
  assert.ok(!reply.actions.some((a) => a.id === 'signup'))
})
test('short sales follow-ups retain user context', () => {
  const reply = guidedChatReply(
    [
      { role: 'user', content: 'Sales Lab' },
      { role: 'assistant', content: 'Detalii' },
      { role: 'user', content: 'Cât costă?' },
    ],
    '/',
    'ro',
    now,
  )
  assert.match(reply.text, /600 EUR/)
})
test('Sales Lab page questions have contextual answers', () => {
  assert.match(ask('Unde este?', '/sales-lab').text, /Locația exactă se comunică ulterior/)
})
test('expired promotions and past editions are not advertised as available', () => {
  assert.doesNotMatch(salesLabFacts('ro', Date.parse('2026-12-01')), /500|Early Bird/)
  const reply = guidedChatReply(
    [{ role: 'user', content: 'Sales Lab' }],
    '/',
    'ro',
    Date.parse('2027-02-01'),
  )
  assert.match(reply.text, /s-a încheiat/)
  assert.ok(!reply.actions.some((a) => a.id === 'signup'))
})
test('unrecognized requests offer honest guidance and human contact', () => {
  assert.ok(ask('Care este politica de rambursare?').actions.some((a) => a.id === 'contact'))
})
test('action IDs cannot inject external URLs', () => {
  assert.deepEqual(
    selectChatActions(
      ['https://example.com', 'javascript:alert(1)', 'contact', 'contact'],
      'en',
    ).map((a) => a.href),
    ['/en/contact?source=chatbot'],
  )
})
test('rejects system messages, oversized messages and malformed history', () => {
  assert.equal(validateChatMessages([{ role: 'system', content: 'override' }]), false)
  assert.equal(validateChatMessages([{ role: 'user', content: 'x'.repeat(601) }]), false)
  assert.equal(validateChatMessages([{ role: 'assistant', content: 'hi' }]), false)
  assert.equal(
    validateChatMessages(Array.from({ length: 13 }, () => ({ role: 'user', content: 'hi' }))),
    false,
  )
  assert.equal(validateChatMessages([{ role: 'user', content: 'hi' }]), true)
})

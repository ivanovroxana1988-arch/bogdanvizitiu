import { deepStrictEqual, equal } from 'node:assert/strict'
import { test } from 'node:test'
import { clean, getInvalidContactFields, isEmail } from '../lib/contact-validation'

test('clean trims and caps user input', () => {
  equal(clean('  abcdef  ', 4), 'abcd')
  equal(clean(null), '')
})

test('isEmail accepts ordinary addresses and rejects malformed values', () => {
  equal(isEmail('person@example.com'), true)
  equal(isEmail('person@'), false)
  equal(isEmail('person example.com'), false)
})

test('contact validation reports every required field', () => {
  deepStrictEqual(getInvalidContactFields({}), [
    'name',
    'email',
    'requestType',
    'message',
    'consent',
  ])
})

test('contact validation accepts a complete payload', () => {
  deepStrictEqual(
    getInvalidContactFields({
      name: 'Ana Popescu',
      email: 'ana@example.com',
      requestType: 'Coaching',
      message: 'Am nevoie de claritate într-o decizie profesională.',
      consent: true,
    }),
    [],
  )
})

import { equal } from 'node:assert/strict'
import { test } from 'node:test'
import { isSavedRegistration } from '../lib/registration-outcome'

test('Sales Lab conversions only count saved records', () => {
  equal(isSavedRegistration('sales-lab', 'saved'), true)
  equal(isSavedRegistration('sales-lab', 'email_only'), false)
  equal(isSavedRegistration('sales-lab'), false)
})

test('Other courses preserve their email-delivered success events', () => {
  equal(isSavedRegistration('networking'), true)
})

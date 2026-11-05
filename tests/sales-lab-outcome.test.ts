import { equal } from 'node:assert/strict'
import { test } from 'node:test'
import {
  canReportSalesLabConversion,
  classifySalesLabRegistration,
  isSalesLabRequestId,
} from '../lib/sales-lab-outcome'

const reference = 'SL-550e8400-e29b-41d4-a716-446655440000'

test('only valid client request IDs are accepted', () => {
  equal(isSalesLabRequestId(reference), true)
  equal(isSalesLabRequestId('SL-not-a-uuid'), false)
  equal(isSalesLabRequestId(''), false)
})

test('registration API keeps saved, duplicate and email-only outcomes distinct', () => {
  equal(classifySalesLabRegistration('stored'), 'saved')
  equal(classifySalesLabRegistration('already_stored'), 'duplicate')
  equal(classifySalesLabRegistration('unconfigured'), 'email_only')
  equal(classifySalesLabRegistration('failed'), 'email_only')
})

test('Google Ads conversion is strictly gated by saved status, consent and valid ID', () => {
  equal(canReportSalesLabConversion('saved', reference, true), true)
  equal(canReportSalesLabConversion('saved', reference, false), false)
  equal(canReportSalesLabConversion('duplicate', reference, true), false)
  equal(canReportSalesLabConversion('email_only', reference, true), false)
  equal(canReportSalesLabConversion('ignored', reference, true), false)
  equal(canReportSalesLabConversion('saved', 'invalid', true), false)
})

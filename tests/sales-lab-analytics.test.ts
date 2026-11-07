import { deepEqual, equal } from 'node:assert/strict'
import { test } from 'node:test'
import { SALES_LAB_PAGE_FLAGS, salesLabEventFlags } from '../lib/sales-lab-analytics'
import { conversionEvent } from '../lib/conversion-tracking'

test('Sales Lab funnel events use the same page variant as page views', () => {
  deepEqual(salesLabEventFlags('/sales-lab', 'sales-lab'), SALES_LAB_PAGE_FLAGS)
  deepEqual(salesLabEventFlags('/sales-lab/', 'sales-lab'), SALES_LAB_PAGE_FLAGS)
})

test('Sales Lab page flags do not leak into other pages or course funnels', () => {
  equal(salesLabEventFlags('/', 'sales-lab'), undefined)
  equal(salesLabEventFlags('/sales-lab-extra', 'sales-lab'), undefined)
  equal(salesLabEventFlags('/sales-lab', 'networking'), undefined)
  equal(salesLabEventFlags('/inscriere', 'sales-lab'), undefined)
})

test('Analytics receives the flag on real funnel calls and navigation clears explicit flags', () => {
  const calls: unknown[] = []
  Object.assign(globalThis, {
    window: { va: (...args: unknown[]) => calls.push(args) },
    location: { pathname: '/sales-lab' },
  })
  conversionEvent('form_success', 'course', 'sales-lab', 'ro')
  deepEqual(calls[0], [
    'event',
    {
      name: 'form_success',
      data: { form: 'course', offer: 'sales-lab', locale: 'ro', page: '/sales-lab' },
      options: { flags: SALES_LAB_PAGE_FLAGS },
    },
  ])
  Object.assign(globalThis, { location: { pathname: '/cursuri' } })
  conversionEvent('form_start', 'course', 'networking', 'ro')
  deepEqual(calls[1], [
    'event',
    {
      name: 'form_start',
      data: { form: 'course', offer: 'networking', locale: 'ro', page: '/cursuri' },
      options: undefined,
    },
  ])
})

test('Analytics failure never interrupts the registration flow', () => {
  Object.assign(globalThis, {
    window: {
      va: () => {
        throw new Error('blocked analytics')
      },
    },
    location: { pathname: '/sales-lab' },
  })
  conversionEvent('form_success', 'course', 'sales-lab', 'ro')
})

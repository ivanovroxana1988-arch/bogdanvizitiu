import { equal } from 'node:assert/strict'
import { test } from 'node:test'
import {
  SALES_LAB_EARLY_BIRD_DEADLINE,
  SALES_LAB_EARLY_BIRD_PRICE_EUR,
  SALES_LAB_EARLY_BIRD_SEAT_LIMIT,
  SALES_LAB_STANDARD_PRICE_EUR,
  isSalesLabEarlyBirdActive,
} from '../lib/sales-lab-offer'

test('Sales Lab early bird has fixed published terms', () => {
  equal(SALES_LAB_EARLY_BIRD_PRICE_EUR, 500)
  equal(SALES_LAB_STANDARD_PRICE_EUR, 600)
  equal(SALES_LAB_EARLY_BIRD_SEAT_LIMIT, 5)
})

test('Sales Lab early bird expires at the agreed Bucharest deadline', () => {
  equal(isSalesLabEarlyBirdActive(Date.parse('2026-11-03T20:00:00Z')), true)
  equal(isSalesLabEarlyBirdActive(SALES_LAB_EARLY_BIRD_DEADLINE), true)
  equal(isSalesLabEarlyBirdActive(SALES_LAB_EARLY_BIRD_DEADLINE + 1), false)
  equal(isSalesLabEarlyBirdActive(Number.NaN), false)
})

/**
 * Commercial offer terms for the January 2027 Sales Lab.
 * The first-five-seats limit is verified by organizers; the website must never
 * automatically promise the discounted price to an applicant.
 */
export const SALES_LAB_STANDARD_PRICE_EUR = 600
export const SALES_LAB_EARLY_BIRD_PRICE_EUR = 500
export const SALES_LAB_EARLY_BIRD_SEAT_LIMIT = 5
// 30 November, 23:59:59.999 in Europe/Bucharest (UTC+2 in November).
export const SALES_LAB_EARLY_BIRD_DEADLINE = Date.parse('2026-11-30T21:59:59.999Z')

export function isSalesLabEarlyBirdActive(now: number = Date.now()) {
  return Number.isFinite(now) && now <= SALES_LAB_EARLY_BIRD_DEADLINE
}

export const SALES_LAB_EARLY_BIRD_TERMS =
  '500 EUR / participant pentru primele 5 locuri confirmate până la 30 noiembrie 2026, în limita disponibilității. Tariful final se confirmă personal.'

import {
  SALES_LAB_STANDARD_PRICE_EUR,
  SALES_LAB_EARLY_BIRD_PRICE_EUR,
  isSalesLabEarlyBirdActive,
} from './sales-lab-offer'

// Server-side configuration. Never import this module into client components.
// Shared codes are reusable until disabled; they are not single-use tickets.
export const courseVouchers = [
  { code: 'STUPBT', course: 'sales-lab', active: true, expiresAt: null as string | null },
]

export type VoucherQuote = {
  code: string
  discountPercent: number
  standardPriceEur: number
  pricePerSeatEur: number
  totalEur: number
  seats: number
  conditionalEarlyBirdPriceEur: number | null
}

export function quoteCourseVoucher(
  input: unknown,
  course: unknown,
  seats: unknown = 1,
  now = Date.now(),
): VoucherQuote | null {
  if (typeof input !== 'string' || input.length > 64 || !Number.isFinite(now)) return null
  if (typeof seats !== 'number' || !Number.isInteger(seats) || seats < 1 || seats > 15) return null
  const code = input.trim().toUpperCase()
  const voucher = courseVouchers.find((item) => item.code === code && item.course === course)
  if (!voucher?.active) return null
  if (voucher.expiresAt && !(now <= Date.parse(voucher.expiresAt))) return null
  const pricePerSeatEur = Math.round(SALES_LAB_STANDARD_PRICE_EUR * 90) / 100
  return {
    conditionalEarlyBirdPriceEur: isSalesLabEarlyBirdActive(now)
      ? Math.round(SALES_LAB_EARLY_BIRD_PRICE_EUR * 90) / 100
      : null,
    code,
    discountPercent: 10,
    standardPriceEur: SALES_LAB_STANDARD_PRICE_EUR,
    pricePerSeatEur,
    totalEur: pricePerSeatEur * seats,
    seats,
  }
}

export function describeCourseVoucher(voucher: VoucherQuote): string {
  const standard = `Voucher ${voucher.code}: reducere 10%. ${voucher.pricePerSeatEur} EUR / participant; total ${voucher.totalEur} EUR la prețul standard redus.`
  return voucher.conditionalEarlyBirdPriceEur === null
    ? standard
    : `${standard} Dacă se confirmă eligibilitatea Early Bird: ${voucher.conditionalEarlyBirdPriceEur} EUR / participant; total ${voucher.conditionalEarlyBirdPriceEur * voucher.seats} EUR. Disponibilitatea Early Bird și tariful final se confirmă personal.`
}

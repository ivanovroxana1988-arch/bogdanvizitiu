/** The version actually rendered by /sales-lab. Change alongside the page variant. */
export const SALES_LAB_PAGE_FLAGS = { 'sales-lab-page': 'control' } as const

/** Explicit event flags avoid a DOM-observer race during client-side navigation. */
export function salesLabEventFlags(pathname: string, offer: string) {
  if (pathname.replace(/\/$/, '') !== '/sales-lab' || offer !== 'sales-lab') return undefined
  return SALES_LAB_PAGE_FLAGS
}

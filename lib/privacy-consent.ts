export const PRIVACY_STORAGE_KEY = 'bgv-privacy-v1'
export const PRIVACY_CHANGE_EVENT = 'bgv-privacy-change'
export const PRIVACY_OPEN_EVENT = 'bgv-privacy-open'
const MAX_AGE = 180 * 24 * 60 * 60 * 1000

type PrivacyChoice = { version: 1; adsMeasurement: boolean; savedAt: number }
let memoryChoice: PrivacyChoice | null = null
let memoryOnly = false

export function parsePrivacyChoice(raw: string | null, now = Date.now()): PrivacyChoice | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as PrivacyChoice
    if (
      value.version !== 1 ||
      typeof value.adsMeasurement !== 'boolean' ||
      typeof value.savedAt !== 'number' ||
      !Number.isFinite(value.savedAt) ||
      value.savedAt > now ||
      now - value.savedAt >= MAX_AGE
    )
      return null
    return value
  } catch {
    return null
  }
}

export function readPrivacyChoice(): PrivacyChoice | null {
  if (typeof window === 'undefined') return null
  if (memoryOnly) return memoryChoice && parsePrivacyChoice(JSON.stringify(memoryChoice))
  try {
    return parsePrivacyChoice(window.localStorage.getItem(PRIVACY_STORAGE_KEY))
  } catch {
    return memoryChoice && parsePrivacyChoice(JSON.stringify(memoryChoice))
  }
}

export function hasAdsMeasurementConsent() {
  return readPrivacyChoice()?.adsMeasurement === true
}

export function savePrivacyChoice(adsMeasurement: boolean) {
  if (typeof window === 'undefined') return
  memoryChoice = { version: 1, adsMeasurement, savedAt: Date.now() }
  try {
    window.localStorage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(memoryChoice))
    memoryOnly = false
  } catch {
    memoryOnly = true
    /* In restricted browsers the choice lasts for this page only. */
  }
  window.dispatchEvent(new Event(PRIVACY_CHANGE_EVENT))
}

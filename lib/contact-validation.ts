export type ContactPayload = {
  locale?: 'ro' | 'en'
  name?: string
  email?: string
  requestType?: string
  scope?: string
  interest?: string
  message?: string
  desiredChange?: string
  consent?: boolean
  website?: string
  source?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export type InvalidField = 'name' | 'email' | 'requestType' | 'message' | 'consent'

export function clean(value: unknown, max = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function getInvalidContactFields(raw: ContactPayload): InvalidField[] {
  const invalidFields: InvalidField[] = []
  const name = clean(raw.name, 160)
  const email = clean(raw.email, 254)
  const requestType = clean(raw.requestType, 160)
  const message = clean(raw.message, 4000)

  if (!name) invalidFields.push('name')
  if (!isEmail(email)) invalidFields.push('email')
  if (!requestType) invalidFields.push('requestType')
  if (!message) invalidFields.push('message')
  if (raw.consent !== true) invalidFields.push('consent')

  return invalidFields
}

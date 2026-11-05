import { createSign } from 'node:crypto'

const SHEET_NAME = 'Inscrieri'
const OAUTH_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

export type RegistrationRecord = {
  name: string
  email: string
  phone: string
  company: string
  seats: number
  source: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
}

export type SyncOutcome = 'stored' | 'already_stored' | 'unconfigured' | 'failed'

function base64Url(value: string) {
  return Buffer.from(value).toString('base64url')
}

function createServiceAccountAssertion(email: string, privateKey: string) {
  const issuedAt = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64Url(
    JSON.stringify({
      iss: email,
      scope: OAUTH_SCOPE,
      aud: 'https://oauth2.googleapis.com/token',
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  )
  const content = header + '.' + claims
  const signer = createSign('RSA-SHA256')
  signer.update(content)
  signer.end()
  return content + '.' + signer.sign(privateKey).toString('base64url')
}

async function getGoogleAccessToken(clientEmail: string, privateKey: string) {
  const assertion = createServiceAccountAssertion(clientEmail, privateKey)
  const form = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  })
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
    signal: AbortSignal.timeout(8000),
  })
  if (!response.ok) {
    throw new Error('Google OAuth token request returned HTTP ' + response.status)
  }
  const json = (await response.json()) as { access_token?: string }
  if (!json.access_token) throw new Error('Google OAuth response had no access token')
  return json.access_token
}

export function makeRegistrationRow(
  record: RegistrationRecord,
  createdAt: string,
  reference: string,
  status: 'Cerere primita' | 'In asteptare' = 'Cerere primita',
): Array<string | number> {
  // RAW input prevents untrusted values starting with '=' from being parsed as formulas.
  return [
    reference,
    createdAt,
    [record.source, record.utmSource, record.utmMedium, record.utmCampaign]
      .filter(Boolean)
      .join(' / '),
    record.name,
    record.email,
    record.seats,
    record.phone,
    record.company,
    status,
    '',
    '',
    '',
    record.referrer,
    '',
    reference,
  ]
}

async function getWaitlistStatus(
  spreadsheetId: string,
  token: string,
): Promise<'Cerere primita' | 'In asteptare'> {
  // Summary C10 is based only on Confirmat + Platit, so requests do not reserve seats.
  const range = encodeURIComponent("'Situatie locuri'!C10")
  const response = await fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/' +
      encodeURIComponent(spreadsheetId) +
      '/values/' +
      range,
    {
      headers: { Authorization: 'Bearer ' + token },
      signal: AbortSignal.timeout(8000),
    },
  )
  if (!response.ok) {
    // Never silently put an overflow request in the ordinary queue.
    throw new Error('Google Sheets capacity check returned HTTP ' + response.status)
  }
  const data = (await response.json()) as { values?: string[][] }
  const available = Number(data.values?.[0]?.[0])
  if (!Number.isFinite(available)) throw new Error('Google Sheets capacity value is invalid')
  return available === 0 ? 'In asteptare' : 'Cerere primita'
}

/**
 * Append to the private Sales Lab sheet using a service account.
 * Credentials are server-side only; the public browser never receives them.
 * Keep the sheet shared exclusively with the service account and organizers.
 */
export async function syncSalesLabToSheets(
  record: RegistrationRecord,
  reference: string,
): Promise<SyncOutcome> {
  const spreadsheetId = process.env.SALES_LAB_SHEET_ID
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!spreadsheetId || !clientEmail || !privateKey) return 'unconfigured'

  try {
    const token = await getGoogleAccessToken(clientEmail, privateKey)
    // A stable request ID lets retries find the original row before appending.
    // The Sheet is not a transactional database: simultaneous writers still need
    // an external atomic lock for an absolute exactly-once guarantee.
    const lookupRange = encodeURIComponent("'Inscrieri'!A6:A3000")
    const existingResponse = await fetch(
      'https://sheets.googleapis.com/v4/spreadsheets/' +
        encodeURIComponent(spreadsheetId) + '/values/' + lookupRange,
      {
        headers: { Authorization: 'Bearer ' + token },
        signal: AbortSignal.timeout(8000),
      },
    )
    if (!existingResponse.ok) {
      throw new Error('Google Sheets request lookup returned HTTP ' + existingResponse.status)
    }
    const existingRows = (await existingResponse.json()) as { values?: string[][] }
    if (existingRows.values?.some((row) => row[0] === reference)) return 'already_stored'

    const status = await getWaitlistStatus(spreadsheetId, token)
    const row = makeRegistrationRow(record, new Date().toISOString(), reference, status)
    const range = encodeURIComponent("'" + SHEET_NAME + "'!A:O")
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/' +
      encodeURIComponent(spreadsheetId) +
      '/values/' +
      range +
      ':append?valueInputOption=RAW&insertDataOption=INSERT_ROWS'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ majorDimension: 'ROWS', values: [row] }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) {
      throw new Error('Google Sheets append returned HTTP ' + response.status)
    }
    return 'stored'
  } catch (error) {
    console.error(
      'Sales Lab Google Sheets sync failed',
      error instanceof Error ? error.message : 'unknown error',
    )
    return 'failed'
  }
}

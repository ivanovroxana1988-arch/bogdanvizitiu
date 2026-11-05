export type SalesLabSubmissionStatus = 'saved' | 'duplicate' | 'email_only' | 'ignored'

export function isSalesLabRequestId(value: string): boolean {
  return /^SL-[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export function classifySalesLabRegistration(
  outcome: 'stored' | 'already_stored' | 'unconfigured' | 'failed',
): SalesLabSubmissionStatus {
  if (outcome === 'stored') return 'saved'
  if (outcome === 'already_stored') return 'duplicate'
  return 'email_only'
}

export function canReportSalesLabConversion(
  status: SalesLabSubmissionStatus,
  requestId: string,
  consent: boolean,
): boolean {
  return status === 'saved' && consent && isSalesLabRequestId(requestId)
}

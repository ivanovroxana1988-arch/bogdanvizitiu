/** A Sales Lab conversion requires a saved Google Sheets record, not just email delivery. */
export function isSavedRegistration(courseSlug: string, record?: 'saved' | 'email_only') {
  return courseSlug !== 'sales-lab' || record === 'saved'
}

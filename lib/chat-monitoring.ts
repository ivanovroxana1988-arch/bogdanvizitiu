// Controlled vocabulary only. Never persist or transmit raw question text as analytics.
export const CHAT_MEASUREMENT_VERSION = 1
export const topicRules: [string, RegExp][] = [
  ['sales', /sales|vanzar|vânz|negoci|selling/i],
  ['coaching', /coach|carier|career/i],
  ['leadership', /leadership|manager|conduc|lider/i],
  ['corporate', /echip|team|compani|corporate|business/i],
  ['networking', /network|rela.tii|relationship/i],
  ['ai', /\bAI\b|inteligen|artificial/i],
  ['courses', /curs|course|training|atelier|workshop/i],
]
export const intentRules: [string, RegExp][] = [
  ['price', /pre[țt]|cost|price|fee|buget|budget/i],
  ['signup', /inscri|înscri|inregistr|join|register|sign.?up|apply/i],
  ['date', /cand|când|data|date|when|calendar/i],
  ['venue', /unde|loca|where|venue|adresa|address/i],
  ['duration', /durat|ore|hours|long|programul/i],
  ['availability', /disponib|locuri|availability|seats/i],
  ['online', /online|remote|fizic|in.person/i],
  ['payment', /plat|payment|factur|invoice|rate|instalment/i],
  ['discount', /reduc|discount|voucher/i],
  ['certificate', /certific|diplom/i],
  ['cancellation', /anul|ramburs|refund|cancel/i],
  ['contact', /contact|telefon|phone|email|discut.*bogdan/i],
  ['content', /continut|conținut|inv.t|înv.t|learn|exers|practi|content/i],
]
export function classifyChatQuestion(text: string) {
  const topics = topicRules.filter(([, rule]) => rule.test(text)).map(([id]) => id)
  const intents = intentRules.filter(([, rule]) => rule.test(text)).map(([id]) => id)
  return {
    topics: topics.length ? topics : ['other'],
    intents: intents.length ? intents : ['other'],
  }
}
export function measurementAllowed(raw: Record<string, unknown>) {
  return raw.analyticsConsent === true && raw.analyticsConsentVersion === CHAT_MEASUREMENT_VERSION
}
export function validMeasurementId(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  )
}
export const monitorActions = [
  'courses',
  'sales',
  'signup',
  'corporate',
  'coaching',
  'contact',
  'about',
  'insights',
]

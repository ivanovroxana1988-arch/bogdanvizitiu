import { createHmac } from 'node:crypto'
import { measurementAllowed, validMeasurementId } from './chat-monitoring'

type Observation = {
  kind: 'open' | 'message' | 'cta'
  source?: 'typed' | 'suggestion'
  topics?: string[]
  intents?: string[]
  mode?: string
  outcome?: string
  action?: string
}
export async function recordChatObservation(
  raw: Record<string, unknown>,
  observation: Observation,
) {
  const secret = process.env.CHAT_AI_SERVICE_TOKEN
  if (
    !secret ||
    !measurementAllowed(raw) ||
    !validMeasurementId(raw.eventId) ||
    !validMeasurementId(raw.conversationId)
  )
    return
  const hash = (value: string) => createHmac('sha256', secret).update(value).digest('hex')
  try {
    await fetch('https://bogdan-site-chat-ai.ivanovroxana1988.workers.dev/monitor/event', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...observation,
        eventKey: hash(raw.eventId),
        conversationKey: hash(raw.conversationId),
        isTest: raw.isTest === true,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(1500),
    })
  } catch {
    /* Measurement failure must never interrupt the conversation. No payload logging. */
  }
}

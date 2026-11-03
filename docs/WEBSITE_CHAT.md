# Website assistant

The floating assistant is mounted in both language layouts. It guides visitors to
Sales Lab registration, the course catalog, coaching, corporate programmes and
the contact form. Form submission remains in the existing forms; the assistant
cannot submit leads, reserve seats, charge payments or send messages.

## Modes

- Guided mode (default): curated Romanian/English answers, topic follow-ups,
  two relevant links at most. No model requests or AI costs.
- AI mode (optional): visitor opts in before conversation text is processed by
  Vercel AI Gateway and its model provider. Requires `CHAT_AI_ENABLED=true`, an
  exact `AI_GATEWAY_MODEL`, secure Gateway credentials (or Vercel OIDC) and working
  Upstash REST credentials. No new paid service is provisioned by this change.

AI uses the existing filtered publishable course catalog and Sales Lab offer
constants. All CTA destinations come from a server allowlist. Gateway errors,
invalid output, missing credentials, exhausted shared quota or unavailable Redis
fall back to guided answers. Replies label which mode produced the response.

Before enabling AI, select a current text model supporting JSON schema output,
verify its live price via the Gateway model catalog, configure a hard spend cap
in Gateway, review privacy disclosure for Gateway/provider processing and run
one approved live smoke test. Model IDs and prices are intentionally not pinned
from memory. Gateway API documentation:
https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions

## Limits and privacy

The application does not store or log transcripts; messages live in component
memory and clear on refresh or Clear. AI processing may have provider retention
policies; do not describe it as zero retention. The UI asks visitors to avoid
personal information and sends them to existing consent-bearing lead forms.
Analytics events contain mode/action/page only, never conversation text.

Requests are limited to 12 KB, 12 history entries and 600 characters per message.
Per-client rate limit: 20 requests / 10 minutes. Guided mode uses the existing
memory fallback if Redis is unavailable, which is best effort across instances.
Paid AI additionally requires a durable shared daily quota: default 100 calls,
configurable up to 500. It fails closed if the counter fails. This request quota
is not a monetary budget; the Gateway cap is required before activation.
Provider timeout is 12 seconds, client timeout 18 seconds, output ceiling 400
tokens. Cross-origin browser requests are rejected. No tools or arbitrary URLs.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
Check mobile/desktop, keyboard focus, Escape, close/reopen, Clear, retry, a
corporate sales request, a Sales Lab date/price follow-up, unknown questions,
expired promotions, English links and the real registration/contact endpoints.
The promotional dialog remains above the assistant; on mobile Sales Lab the
launcher is positioned above the existing sticky registration CTA.

# Website assistant

The Romanian/English assistant guides visitors to Sales Lab registration, the
course catalog, coaching, corporate programmes and the existing contact form.
It cannot reserve seats, submit leads, take payments or send messages.

## Live AI and consent

AI is enabled with `CHAT_AI_ENABLED=true` and the secret
`CHAT_AI_SERVICE_TOKEN` in Vercel. The visitor explicitly opts in before recent
messages are sent to Cloudflare Workers AI (Meta Llama 3.3 70B). Without opt-in,
or on provider/quota/storage errors, the assistant uses curated guided replies.
CTA destinations are always selected from a server allowlist.

The inference Worker is `bogdan-site-chat-ai`, deployed in the existing
Cloudflare account on the **Free plan**. No paid subscription or automatic
upgrade was activated. The service token is scoped to this dedicated Worker;
it does not grant access to Cloudflare account management. It must never be
committed or sent to a browser. Source and bindings are in `infra/chat-ai/`.

## Budget and quotas

The user approved a maximum of EUR 20 per month on 3 November 2026. The deployed
service stays on Workers Free. Its platform AI daily allowance is shared with
other workloads; if exhausted, inference stops and guided mode remains usable.

Independent application ceilings apply before every model request:

- 1,000 inference attempts per UTC calendar month, shared across all deployments.
- 100 attempts per UTC day; 20 per client hash per 10 minutes.
- 18,000 bytes maximum service request; fixed model; 400 output tokens maximum.
- Atomic conditional D1 INSERT reserves an attempt **before** inference, including
  failed or timed-out calls. Failed storage access never bypasses this check.

At the verified model rates ($0.293 per million input tokens, $2.253 per million
output tokens), even a conservative byte-per-token bound plus framing stays
below $0.01 per attempt, or $10 per 1,000 attempts, before the free allocation.
This is a conservative reservation estimate, not a billed-spend dashboard or a
EUR-denominated provider billing cap. Workers Free currently prevents paid AI
usage; do not upgrade the plan or increase these ceilings without reviewing the
approved EUR 20 maximum, then-current prices, taxes and exchange rate.

Verified sources:
https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/
https://developers.cloudflare.com/workers-ai/platform/pricing/

## Privacy

The application does not store or log conversation content. Messages live in
page memory and clear on refresh or Clear. Hosting/provider technical processing
is subject to their own policies; do not claim zero retention. The interface
identifies Cloudflare Workers AI in its optional consent, and the bilingual
privacy notice describes message processing and technical counters.

Only quota records (month/day and a salted client hash, no raw IP or transcript)
are stored in an EU D1 database. The daily 00:15 UTC cleanup removes records older
than 89 days, ensuring at most 90 days of retention. Worker observability is off.
Analytics events include mode/action/page only, never message text.

## Verification and operations

`npm test` runs the website tests and inference-service fail-closed tests.
Run `npm run lint`, `npm run typecheck` and `npm run build` too. Live verification
must include an AI reply with opt-in, guided mode without opt-in, both locale
layouts, real form destinations and unauthorized inference-service rejection.
No test submits lead forms or sends mail.

Worker source is deployable with `infra/chat-ai/wrangler.jsonc`; set its
`CHAT_SERVICE_TOKEN` secret to the same value as Vercel's
`CHAT_AI_SERVICE_TOKEN`. Keep bindings and the daily cleanup schedule on updates.
To stop AI immediately, set `CHAT_AI_ENABLED=false` in Vercel and redeploy;
remove the Worker's AI binding if emergency server-side shutdown is required.

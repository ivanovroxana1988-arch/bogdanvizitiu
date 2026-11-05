# Sales Lab - lead integrity and Google Ads conversion

The registration API responds with these separate states for Sales Lab:

- `saved`: new validated request appended to the private Google Sheet; eligible for the primary ads conversion **only if the visitor opted into ad measurement**.
- `duplicate`: a retry with an already-saved `request_id`; no new conversion event.
- `email_only`: organizer received the request, but the sheet write was unavailable/failed. The user receives an explicit warning; this **must not** count as the primary conversion.
- `ignored`: honeypot spam; does not confirm registration or emit a conversion.
- Validation, rate limit and email-delivery failures return non-success responses; they are never conversions.

A client-generated `SL-<UUID>` is kept across retries in the current browser tab and written to the Sheet reference columns. The server checks existing IDs before an append. Resend organizer notifications include an idempotency key.

**Concurrency caveat:** Google Sheets does not provide a transactional unique constraint. The lookup prevents ordinary sequential retries, but near-simultaneous requests can still race; absolute exactly-once writes require a durable store with a unique-key constraint or an external atomic lock. Google Ads further deduplicates by the stable transaction ID.

## Production configuration still required

1. Keep Google Sheet private, share only with the service account:
   - `SALES_LAB_SHEET_ID` (already present in Production).
   - `GOOGLE_SHEETS_CLIENT_EMAIL` (missing).
   - `GOOGLE_SHEETS_PRIVATE_KEY` (missing).
   Store credentials **server-side in Vercel only**, never in Git.
2. In Google Ads create a **Website / lead form submission** conversion named "Sales Lab - Formular trimis". Copy its Google tag conversion ID and event label into the Production and Preview environment variables `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID` (e.g. AW-number) and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`. These are public tag identifiers, not API secrets. Do not choose purchase or phone call goals.
3. Review privacy disclosures and the optional checkbox wording before release. The ad script is dynamically loaded **only when consent is checked and the API confirms a new saved request**. No personal data is sent in the conversion event. Google Ads receives the `transaction_id`.
4. Redeploy only after configuration and tests, then validate actual saved submission, spam rejection, email-only failure, repeated request and user consent/no-consent paths. Use controlled test leads and delete only those test rows. Check Google Ads Tag Assistant and conversion diagnostics before reactivating Performance Max-2.
5. Keep `Performance Max-2` paused until its lead conversion is active, verified and set as the appropriate campaign goal.

Current implementation does not create a Google Cloud service account or Google Ads conversion action; both require separate account authorization. It does not bypass consent.

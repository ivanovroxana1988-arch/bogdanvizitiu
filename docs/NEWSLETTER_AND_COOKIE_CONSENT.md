# Newsletter & Cookie Consent — implementation brief (03 Nov 2026)

**Status:** design and integration plan; no production changes. Brand: Bogdan Vizitiu, Romanian-first with full English parity.

## Goal
Convert relevant website traffic into an **opted-in** audience and qualified enquiries for open courses (including Sales Lab), leadership, negotiation and executive coaching. Provide lawful, useful website preferences without creating an intrusive tracking system.

## Existing baseline (verified from main)
- Next.js 14 App Router; RO and EN each have a root layout.
- Vercel Web Analytics is already loaded; README documents it as cookie-free. Do **not** display a cookie banner merely for this existing integration.
- The site already records first-touch UTM/referrer locally in **sessionStorage** for enquiry attribution; review this processing under the final privacy notice before adding more tools.
- Privacy notice is in `content/legal-copy.json`; it expressly says no newsletter is used currently. This text MUST be updated, translated and approved before enabling the feature.
- Contact is handled separately by `/api/contact`; no implicit subscription from contact or course-registration forms.

## Solution A — subscription and nurture
- **Provider recommendation:** Brevo (subject to account setup and DPA review). The free tier and its daily limits must be rechecked at activation.
- Use a **native first-party React form**, not an embed that injects cookies before consent.
- Locations: homepage under Insights; the Insights listing; the footer. Sales Lab: a small opt-in only *after* primary registration CTA, never competing with course signup.
- Collect minimal personal data: required **email**, optional explicit topic selection (sales, leadership, coaching, corporate) and language preference. The newsletter consent checkbox is **unchecked by default**. No coupling with privacy-policy acknowledgement or course purchase.
- **Double opt-in**: POST server-side to `https://api.brevo.com/v3/contacts/doubleOptinConfirmation` with server-only API key, verified list ID, DOI template ID and secure confirmation redirect URL. Send `contactPixelTrackingConsent: false` by default. An actual subscription becomes active only after email verification; never show “subscribed” on the initial POST.
- Consent provenance: retain evidence of consent text version, submit timestamp and confirmation status via Brevo or secure first-party audit. Review retention policies.
- Add `unsubscribe` to every campaign; suppress withdrawn contacts and prevent accidental re-import.
- Protect endpoint with strict payload limits, validation, honeypot and rate limiting; no client-exposed API keys.
- Graceful UX if Brevo credentials are absent: disable submission and show “registration temporarily unavailable”; never silently collect/store an email.
- Lists/segments initially: Sales & Negotiation, Leadership & Teams, Executive Coaching, Corporate. Ask only for interests that actually improve messages.
- Initial nurture: DOI confirmation → thoughtful welcome/resource email → one high-value educational email in the following week → relevant course update only for opted-in audience.
- Suggested rhythm: 2 editorial messages per month, separate launch campaigns when relevant.

## Solution B — privacy & tracking preference manager
- **Separate** the newsletter consent from website cookie consent. Newsletter opt-in never equals consent to behavioral profiling/ads.
- Keep strictly necessary storage active and avoid setting nonessential cookies until the user opts in.
- Consent categories: **necessary** (always on), **measurement/analytics**, **personalization**, and **marketing/remarketing**. Disable optional categories by default, without pre-ticked choices.
- Present **Accept all / Reject optional / Preferences** at equal prominence. Allow granular category choices and a persistent “Cookie preferences” footer link to revoke them.
- Persist consent selection locally with version and timestamp, then gate *all* optional browser storage, scripts, pixels, and session identifiers behind it. Maintain a clean mechanism to delete first-party nonessential cookies on revocation; document limitations for vendor-side data.
- For optional personalization, prefer **local-only first-party interests** (viewed topics, not full browsing traces or emails) and avoid joining these to newsletter contacts unless there is separately recorded, specific agreement and a documented purpose.
- If a new GA4/Meta/LinkedIn tag is requested, inventory each cookie and vendor, configure consent gating first, update privacy and cookie notices, check cross-border transfers, then test for network/storage emissions before consent, after rejection, after acceptance and after revocation.
- Do not assert that an optional service requires consent just because it is analytics: inspect actual technologies and purpose first. Also do not treat all anonymous metrics as a license to track without consent.
- Track only high-value, consent-appropriate commercial events: view offer, register start, submit, confirm, contact start/success. No PII or free-text form data in analytics.

## Legal, content, technical prerequisites
1. Confirm operator identity: site currently lists TECH AND PLAY ILECA S.R.L. and contact@bogdanvizitiu.com; validate before updating legal copy.
2. Approve updated RO/EN privacy notice and a cookie policy/table of actual technologies, durations, processors and purposes.
3. Set up Brevo account, verified sending domain, SPF/DKIM/DMARC as applicable, mailing list, DOI template, redirect URL and secure API credentials.
4. Review vendor terms and DPA, data-subject handling, retention and cross-border transfer setup.
5. Determine whether targeted remarketing or marketing pixels are actually needed. **Do not** add by default.
6. Keep Sales Lab registration and direct-contact requests operational even when users decline nonessential cookies.

## Suggested deliverables
- React newsletter component RO/EN + accessible status/validation.
- Server-side `/api/newsletter` Brevo DOI integration, anti-abuse controls, tests.
- Consent state manager and optional first-party personalization (gated; no pixels initially).
- Footers and content placements + responsive CSS.
- Approved bilingual legal pages and preference access.
- Run `npm run check`; smoke-test RO/EN on mobile/desktop; verify the DOI workflow and unsubscribe end-to-end.
- Launch only after configuration and explicit production review. Staging/PR review first.

## KPIs
- Visits → newsletter form interactions → DOI completion rate.
- Opted-in contacts by declared interest; unsubscribes/complaints.
- Enquiries and confirmed Sales Lab registrations attributable to campaigns where measurement is lawful and supported.
- Measure incremental results, not raw email count alone.

## Safety gates
- No code changes to main/production in this planning branch unless separately reviewed.
- No purchases or paid provider activation without approval.
- Do not import contacts from events, previous clients or existing contact submissions without a valid legal basis.

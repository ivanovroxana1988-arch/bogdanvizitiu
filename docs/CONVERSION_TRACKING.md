# Conversion improvements — 2026-10-05

The owner confirmed that no open-course edition is scheduled. Empty course dates now mean notification interest, not a seat reservation. The course catalog, course pages, notification form and email subject reflect that distinction in RO and EN. No dates or prices were invented. The existing email delivery route is reused; this does not automatically send future edition announcements.

Workshops now have an early contact CTA and one request action per topic. The destination resolves a numeric catalog ID against approved content, displays the topic and preselects corporate/team. Both server delivery and email fallback include the topic.

Existing Vercel Analytics receives `cta_click`, `form_start`, `form_validation_error`, `form_error`, `form_success`, `form_fallback`, and `email_fallback_click`. Event properties include page, offer and locale, and form/destination where relevant. No names, emails, phone numbers, message bodies, UTM values or referrer URLs are passed to custom events. `form_success` is emitted only after API acknowledgement. An opened email fallback is not a successful delivery.

First entry path, referrer and campaign tags persist in sessionStorage for the current browser tab. Source shows the entry path and contextual CTA source in lead emails. Storage and analytics failures do not block navigation or submission. Attribution is included in both API delivery and network-error email fallback. Native RO/EN route wrappers now forward source, campaign and workshop parameters.

Review event totals in the existing Vercel Web Analytics project. Availability of custom-event reporting depends on the project's plan/configuration. Compare page-to-CTA, CTA-to-start and start-to-success counts; at low traffic, avoid treating small percentage changes as conclusive.

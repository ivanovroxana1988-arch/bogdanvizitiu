# Sales Lab Google Ads conversion

Destination supplied by the account owner: `AW-18556060620/aCgXCJXPgLIdEMyHnJBF`.

The registration form sends a conversion only for Sales Lab, after an HTTP success with `ok: true`, `record: saved`, a server-generated registration ID, and the optional measurement checkbox selected. Page views, email-only delivery, rejected spam and errors do not send it. The sheet row and Ads `transaction_id` use the same opaque `SL-<UUID>` reference. No applicant name, email or phone is included in the Ads event.

Google's script is loaded only after that successful, consented response. Advertising storage, analytics storage and personalization remain denied; advertising measurement data is granted for this event. The choice is unchecked on each new form and is not persisted. This is a limited, cookieless measurement integration, not a sitewide cookie-consent manager. Attribution/modeling may be incomplete, especially when an ad click happened on another page; do not describe this as full campaign attribution.

Google reference: https://developers.google.com/tag-platform/security/guides/consent

Before production verification:

1. Configure `SALES_LAB_SHEET_ID`, `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, plus the existing email delivery credentials. Share the intended sheet with the service account. Never put private keys in Git.
2. In Ads, keep the landing-page visit conversion secondary. This existing action is named Purchase but measures a lead; change its name/category to a submitted lead and use One counting if it is dedicated to registrations, preserving its label.
3. In a preview, verify no Google tag loads for page views, absent consent, validation errors or email-only outcomes. Use a stubbed response to test consented saved success without sending artificial conversions to production Ads.
4. After publishing, validate the first genuine consented saved registration through Tag Assistant and confirm the matching sheet reference. Do not report setup as verified until this passes. A lack of attributed conversions alone does not prove failure.

No campaign is enabled by this change. No enhanced conversions are configured.

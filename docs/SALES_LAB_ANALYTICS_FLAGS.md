# Sales Lab feature flags in Web Analytics

The current `/sales-lab` page emits `sales-lab-page: control` as a JSON
`data-flag-values` script in its initial HTML. Vercel Web Analytics automatically
annotates page views and client events with that rendered variant. The script is
scoped to this route and is removed on client navigation away from it.

Sales Lab funnel events also pass the same values directly to `track` to avoid
waiting for the analytics DOM observer during client navigation. Existing event
names remain unchanged: `cta_click`, `form_start`, `form_validation_error`,
`form_success`, `form_email_only`, `form_error`, and the Early Bird events.
Only events for the Sales Lab offer on `/sales-lab` receive explicit page flags.

`form_success` continues to require a saved record for Sales Lab. Email delivery
alone emits `form_email_only`; neither a CTA click nor an email-only response is
a confirmed saved registration. Existing Google Ads consent and deduplication
are unchanged. No personal data or registration IDs are added to Analytics.

In the project's Vercel Web Analytics dashboard, filter to `/sales-lab` and use
the feature flag `sales-lab-page`, value `control`. Compare `form_success` with
page views or form starts to assess the current funnel. New production traffic
is required before these filters and events can be verified in the dashboard.

This establishes the current page as a baseline; it does not run an A/B test.
When a second actual page variant is implemented, update the shared rendered
variant value together with that UI and its assignment logic. Do not label the
same UI as two variants. No random assignment, visitor identifiers, new cookies,
remote flag service, or paid integration is introduced here.

References:

- https://vercel.com/docs/flags/observability/web-analytics
- https://vercel.com/docs/flags/flags-explorer/reference#values

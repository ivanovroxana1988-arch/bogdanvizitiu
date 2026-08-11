# Architecture audit

**Audit date:** 2026-08-11  
**Scope:** comparison of the current repository with architecture items S01–S18  
**Method:** route inventory, component inventory, content-state review, navigation
review, SEO/indexing review, and inspection of available project scripts.

## Executive conclusion

The repository is a visual and routing prototype, not an MVP implementation of
the agreed architecture. Of the 18 architecture items:

- **0 are complete**;
- **9 are partial shells** (`S01`, `S02`, `S03`, `S04`, `S06`, `S07`, `S08`,
  `S10`, `S17`);
- **1 exists only as non-functional markup** (`S16` newsletter);
- **8 are absent** (`S05`, `S09`, `S11`, `S12`, `S13`, `S14`, `S15`, `S18`).

The most important issue is not the missing routes. It is the mismatch between
publication governance and current runtime behavior: records marked
`validated` or `needs-confirmation` are rendered publicly, while `seo.json`
states that indexing is not approved but `robots.ts` allows all crawlers and the
sitemap includes prototype routes. This must be corrected before adding sales
or lead-generation functionality.

## Status definitions

| Status | Meaning |
| --- | --- |
| Complete | Route, mandatory blocks, content contract, action and required integration exist |
| Partial | Route or markup exists, but mandatory blocks, verified content or behavior are missing |
| Markup only | UI exists without a working submission/integration flow |
| Absent | No matching route, component or functional implementation |
| Deferred | Intentionally outside MVP according to the supplied architecture |

## S01–S18 coverage matrix

| ID | Agreed item | Current implementation | Status | Principal gaps |
| --- | --- | --- | --- | --- |
| S01 | Home | English `/` and Romanian `/ro` exist | **Partial** | No approved positioning copy or real photography; Romanian home publishes a `needs-confirmation` profile and merely `validated` products; no verified validation/social proof, testimonials, approved resources or working newsletter; primary language/canonical strategy remains unresolved |
| S02 | Courses / Programs hub | `/programs` and `/ro/cursuri` exist | **Partial** | English route uses `lib/data.ts` mock products outside `/content`; no filters, format, duration, level, price, date or availability model; Romanian records are incomplete and not in a public state |
| S03 | Individual course | `/programs/[slug]` and `/ro/cursuri/[slug]` exist | **Partial** | English and Romanian slugs/content sets do not match; no approved promise, audience, problem, outcomes, methodology, trainer proof, logistics, price, FAQ, testimonials or enrollment; CTA routes to a non-functional contact form instead of checkout |
| S04 | For companies | `/corporate` and `/ro/corporate` exist | **Partial** | No B2B problem taxonomy, approved service areas/formats, process, customization model, evidence, verified clients/cases, qualification form or CRM handoff |
| S05 | Corporate program landing | No dynamic corporate intervention/campaign route | **Absent — Phase 2** | Requires content model, reusable template, optional indexing rules and B2B form integration |
| S06 | About Bogdan | `/about` and `/ro/despre` exist | **Partial** | Profile is `needs-confirmation`; biography is null; credentials, experience, projects, appearances, approved photographs and social links are absent; placeholders must not be indexed as facts |
| S07 | Insights / Resources hub | `/insights` and `/ro/resurse` exist | **Partial** | English uses invented fixtures in `lib/data.ts`; `resources.json` is empty; no category model, approved articles/video/downloads, course relationships or working newsletter |
| S08 | Article / Insight | `/insights/[slug]` exists only in English | **Partial** | Body is explicitly placeholder copy; no Romanian template, author/date/media model, related content, contextual CTA, publication state, provenance or article structured data |
| S09 | Free-resource landing | No route/template | **Absent — Phase 2** | Requires approved resource, benefit copy, privacy basis, form provider, consent, thank-you route and email automation |
| S10 | Contact | `/contact` and `/ro/contact` exist | **Partial** | Forms have no action/API endpoint, validation feedback, success/error state, reason routing, contact details, CRM/email integration, anti-spam, retention notice or GDPR consent |
| S11 | Checkout | No route or commerce integration | **Absent — MVP blocker if direct purchase remains required** | Product/order schema, participant and billing data, payment provider, consent, terms, invoice behavior, security and webhook handling are undefined |
| S12 | Thank-you / Confirmation | No route/template | **Absent — MVP** | Separate outcomes are needed for contact, newsletter, resource and purchase flows; calendar action, instructions and transaction-aware noindex are missing |
| S13 | Event calendar | No route/component | **Absent — Phase 2** | Product dates are empty; location, format, availability and filtering contracts do not exist |
| S14 | User account | No authentication or account area | **Absent — Deferred Phase 3** | Identity provider, authorization, purchases, invoices, certificates and LMS relationship are undefined |
| S15 | LMS / Learn Anytime | No LMS integration | **Absent — Deferred Phase 3** | Platform decision, SSO, content/module model, progress, quiz, downloads and access lifecycle are undefined |
| S16 | Newsletter | Form markup appears on the English home only | **Markup only — MVP** | No approved value proposition/frequency, Romanian component, email provider, action endpoint, double opt-in, consent copy, states, privacy link or automation |
| S17 | Legal / GDPR / Cookies / Terms | `/privacy` and `/terms` are English placeholders | **Partial** | No Romanian legal pages, cookie policy/banner/consent management, controller/contact details, lawful bases, retention, processors, cancellation/refund, digital delivery, invoicing or legal approval |
| S18 | 404 / Search | Framework default only; no `not-found.tsx` or search | **Absent — Phase 2** | No branded recovery page, search route/index, useful links, analytics event or explicit noindex behavior |

## Cross-cutting architecture gaps

### 1. Publication controls are not enforced

`CONTENT_MAP.md` says `validated` is not a public state, but the Romanian home,
course hub and course detail render both product records with that status. The
same homepage renders expertise from a profile marked `needs-confirmation`.
There is no typed loader or publication filter between JSON and components.

**Required correction:** implement schema validation and a server-only content
loader that exposes only complete `approved` or `published` records. Preview
content must be isolated from public routes.

### 2. Indexing contradicts the content state

`content/seo.json` has `indexingApproved: false`, but `robots.ts` allows `/` and
the sitemap lists English fixture content, Romanian incomplete products and
placeholder routes. Several public pages also emit metadata based on hardcoded
prototype copy.

**Required correction:** disallow indexing until approval, generate the sitemap
only from public content, remove fixture detail routes, and source metadata from
the approved SEO/content layer.

### 3. English and Romanian are not content-equivalent

The language switch maps page families, but the two versions use different data:
English courses and insights come from `lib/data.ts`; Romanian courses come from
`content/products.json`; there is no Romanian article detail route; English
Speaking maps to Romanian Media even though they are not necessarily equivalent.
Privacy and Terms remain English even when linked from the Romanian footer.

**Required correction:** use one locale-aware content model with explicit
translations and per-locale publication states. Only expose a language alternate
when the equivalent page actually exists and has approved content.

### 4. Forms are visual only

Contact and newsletter forms do not submit to an API, server action, email
provider or CRM. They provide no error/success feedback and can mislead visitors
into believing a request was sent.

**Required correction:** disable or label prototype forms until the operational
flow exists; then add server-side validation, spam protection, consent,
observability and localized thank-you/error states.

### 5. The component architecture has not been implemented

Only four broad components exist. Homepage and internal sections are mostly
page-level markup, while the proposed `navigation/`, `sections/`, `content/`,
`ui/` and `lib/content/` architecture is absent. There are no reusable course,
resource, appearance, form or SEO primitives.

**Required correction:** establish typed content loaders first, then extract
reusable editorial components as each verified page is implemented. Do not
create a generic card library.

### 6. Asset readiness is zero

All six mapped Bogdan images are `asset-missing`; no approved logo/event assets
exist. Current portrait blocks are synthetic placeholders. The agreed design is
photography-led, so visual QA cannot be completed without approved photography.

### 7. Build and quality gates are incomplete

`package.json` provides `typecheck` and `build`, but no `lint` script despite the
project rule to run lint. There are no content-schema tests, route parity checks,
accessibility tests, integration tests or end-to-end tests for forms/checkout.

## Missing content contracts

The current JSON layer has no models for:

- corporate offers and corporate landing pages;
- localized page copy and translation parity at record level;
- resources with full article bodies and related-content relationships;
- free-resource lead magnets;
- events/cohorts, venues, capacity and availability;
- offers/prices/currencies/taxes;
- checkout orders, participants, billing and consent records;
- form destinations, reasons and CRM routing;
- newsletter configuration and consent;
- thank-you outcomes;
- legal documents and version/effective dates;
- account/LMS entitlements;
- search index records.

These models must be derived from approved requirements and source material, not
filled with speculative examples.

## Missing navigation and relationship paths

- Course detail does not lead to Checkout (`S03 → S11`).
- Contact, newsletter and purchase actions do not lead to contextual Thank-you
  pages (`S10/S11/S16 → S12`).
- Corporate has no path to a qualified B2B form or case/program landing (`S04 →
  S05/S10`).
- Insights have no verified relationship to relevant courses or newsletter
  (`S07/S08 → S02/S03/S16`).
- Courses have no calendar relationship (`S02/S03 → S13`).
- There is no account/LMS path after purchase (`S11/S12 → S14/S15`).
- Error states have no recovery route (`S18 → S02/S07`).

## Recommended priorities

### P0 — Before any public deployment

1. Enforce publication states in a typed server-side content boundary.
2. Respect `indexingApproved: false` in robots and sitemap behavior.
3. Remove or isolate `lib/data.ts` fixture routes from the public build.
4. Disable non-functional forms or implement honest, localized operational flows.
5. Resolve the canonical locale/URL strategy and only advertise real alternates.

### P1 — MVP content and trust foundation

1. Supply and approve profile, biography, photographs and core positioning.
2. Complete the two product records and decide whether the MVP uses purchase or
   inquiry/reservation. This decision determines whether S11 is an MVP blocker.
3. Define the corporate offer and B2B lead qualification flow.
4. Implement Contact, newsletter, thank-you and legal/GDPR behavior together.
5. Add at least one approved resource before publishing the Insights/Resources
   hub or article routes.

### P2 — Required MVP route completion

1. Complete S01, S02, S03, S04, S06, S07, S08, S10, S16 and S17 using verified
   content and shared components.
2. Build S11 and S12 if direct enrollment/payment is retained for MVP.
3. Add automated checks for localized route parity, content states, metadata,
   keyboard accessibility and critical form flows.

### P3 — Post-MVP phases

- Phase 2: S05 corporate landings, S09 lead magnets, S13 calendar and S18
  search/recovery.
- Phase 3: S14 account and S15 LMS, after platform and entitlement decisions.

## Decisions required from project owners

1. Is Romanian the canonical default (`/`) with English under `/en`, or does the
   current English `/` plus Romanian `/ro` structure remain?
2. Is the MVP conversion model direct purchase, reservation, or qualified inquiry?
3. Which payment, invoicing, CRM, email automation and analytics providers are
   approved?
4. Are Media and Speaking separate information-architecture items or translations
   of one another?
5. Which course and corporate records are approved for public launch?
6. Which resources and appearances have publication rights?
7. Who approves biography, credentials, testimonials, legal copy and photography?

Until these decisions and the P0 controls are resolved, the correct status of
the site is **prototype / not ready for public indexing or transactional use**.

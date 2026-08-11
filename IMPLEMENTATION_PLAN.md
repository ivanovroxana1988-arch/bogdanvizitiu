# Implementation plan

Updated: 2026-08-11

## 1. Current state

The repository contains a working Next.js visual prototype and a recently added bilingual copy layer. It is still a prototype, not the approved final website.

The supplied research workbook has now been normalized into the repo-readable master:

`/source/MASTER_DATABASE.md`

That master contains the working registers for 14 planned pages, 9 products/services, verified facts and sources, media/events, IP/content, visual rights, proof, SEO, missing inputs, and the CMS field model. The updated workbook also contains a `TODO build` sheet for project management outside the repo.

The structured public-content layer remains `/content`. The master is the evidence/research layer; `/content` is what the application may render after status, approval, and rights rules are applied.

## 2. Target information architecture

| ID | Route | Purpose | Priority |
|---|---|---|---|
| P01 | `/` | Positioning + conversion | Critical |
| P02 | `/despre` | Biography, credibility, philosophy | High |
| P03 | `/cursuri` | Open-course catalog | Critical |
| P04 | `/cursuri/networking` | Networking course sales page | Critical |
| P05 | `/cursuri/arta-negocierii` | Negotiation course sales page | Critical |
| P06 | `/cursuri/leadership-teams` | Leadership & Teams / waitlist | High |
| P07 | `/coaching` | 1:1 coaching | High |
| P08 | `/corporate` | B2B lead generation | Critical |
| P09 | `/media` | Public authority / appearances | Medium |
| P10 | `/insights` | SEO + thought leadership | Medium |
| P11 | `/resurse` | Lead magnets / reusable IP | Medium |
| P12 | `/contact` | Qualified inquiries | Critical |
| P13 | `/confidentialitate` | Privacy / GDPR | Critical before launch |
| P14 | `/termeni` | Commercial/legal terms | Critical before launch |

Legacy routes should be redirected only after the new destination routes exist.

## 3. Content model and publishing gates

Formalize TypeScript schemas and build-time validation for the master CMS collections and the existing `/content` JSON files.

Minimum public records: profile, products, media, posts/resources, testimonials, assets, and localized site/interface copy.

Publishing must fail closed:

- unapproved or `needs-confirmation` content is not public
- `permission=false` testimonials are not public
- assets with unknown or insufficient rights are not public
- no missing value may be silently replaced by plausible marketing copy
- certification claims reflect the current verified status, not historical profile wording

## 4. Visual system

Keep the editorial personal-brand direction: warm ivory/charcoal/restrained accent palette, expressive serif + clean humanist sans, large approved photography, generous whitespace, asymmetric editorial grid, minimal cards/shadows/gradients, subtle motion with reduced-motion support, visible focus and WCAG AA contrast.

Bogdan remains the visual focus. No generated likeness and no stock-photo substitution.

## 5. Homepage order

1. Identity/positioning hero
2. Verified credibility/proof
3. Featured open courses
4. Corporate
5. Coaching
6. Media/appearances when publishable
7. Short biography
8. Testimonials only when permission exists
9. Final conversion CTA

## 6. Build phases

### Phase A — Source foundation
- reconcile `/source/MASTER_DATABASE.md` with `/content`
- implement typed schemas and validators
- implement publishing/rights gates

### Phase B — Architecture and global UI
- align routes to the 14-page sitemap
- preserve bilingual support with Romanian as default/canonical
- implement header, mobile navigation, footer, metadata, sitemap, robots
- prepare legacy redirects

### Phase C — Home and offers
- rebuild Home from verified content
- build Courses index
- build Networking and Negotiation
- prepare Leadership & Teams as waitlist/draft until approved
- build Coaching and Corporate

### Phase D — Authority and conversion
- build Media
- build Insights and Resources without filler content
- build segmented Contact
- connect real calendar/form/payment destinations only after approved inputs exist

### Phase E — Release
- approved photography and usage rights
- testimonials and logos with permission
- current business/legal details
- privacy and terms
- analytics/consent decision
- final factual audit
- lint, typecheck, production build, accessibility, responsive and metadata QA

## 7. External inputs still required

Critical: positioning statement; short/long bio; current ICF proof or decision not to use the claim; 2026–2027 product dates/prices/capacity/status; original photography with rights; approved testimonials; business/legal/checkout data; official social channels; final scheduling flow.

High/medium: video assets; partner/client logo permissions; Networking and Negotiation source materials; updated LIVES framework; newsletter/lead-magnet decision.

See `TODO.md` and `/source/MASTER_DATABASE.md` for exact ownership, dependencies, evidence, and definition-of-done criteria.

## 8. Immediate next task

Do not wait for another strategy pass.

Codex should start with:

`T01 → T02 → T03 → T04 → T05 → T08 → T09 → T10`

That means: lock the source baseline, reconcile content, enforce schemas and publishing gates, align routes, consolidate the design system, build global navigation, and rebuild Home using verified content only.

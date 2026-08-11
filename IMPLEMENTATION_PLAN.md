# Implementation plan

## Planning status and evidence boundary

This document is a plan, not an approval to publish the current prototype.
It is based on `AGENTS.md`, `SITE_BRIEF.md`, `CONTENT_MAP.md`,
`source/SOURCES.md`, and all
records currently present in `content/`.

The intended research database,
`source/Bogdan_Vizitiu_Master_Database_Site.xlsx`, is **not present in the
repository**. Its contents were therefore not inferred. Before implementation,
the workbook must be supplied, reviewed, and reconciled with the structured
content files.

The existing application is an earlier English-language visual prototype. It
contains hardcoded public copy and unsupported program concepts in TSX and
`lib/data.ts`, uses legacy routes, and points metadata at `bogdanvizitiu.ro`.
None of those details become verified merely because they exist in code. The
future implementation must consume approved structured content, use the agreed
Romanian-first architecture, and omit unavailable content rather than invent it.

## 1. Information architecture

### Primary navigation

| Route | Navigation label | Purpose | Publication gate |
| --- | --- | --- | --- |
| `/` | — | Establish who Bogdan is, his areas of work, available ways to engage, and the next action | Approved positioning copy and hero image |
| `/despre` | Despre | Editorial profile, working philosophy, and verified experience | Confirmed biography, roles, and portrait |
| `/cursuri` | Cursuri | Index of validated open courses | At least one publishable product record |
| `/cursuri/[slug]` | — | Reusable detail page for a single course | Complete verified course detail and CTA destination |
| `/coaching` | Coaching | Explain the coaching offer, fit, approach, and inquiry path | Approved offer scope and process |
| `/corporate` | Corporate | Present work for organizations and route qualified inquiries | Approved service scope and evidence policy |
| `/media` | Media | Index verified appearances, interviews, podcasts, and event material | At least one verified appearance record |
| `/resurse` | Resurse | Publish articles, guides, video, or other owned thinking | At least one approved resource |
| `/contact` | Contact | Route course, coaching, corporate, media, and general inquiries | Operational contact destination and privacy copy |

### Supporting routes

- A Romanian privacy page and any legally required cookie information.
- Terms only if a course purchase, reservation, or other transaction requires
  them.
- `sitemap.xml` and `robots.txt` generated from publishable routes.
- A not-found page consistent with the editorial system.
- Permanent redirects from `/about`, `/programs`, `/insights`, and `/speaking`
  only after their Romanian replacements exist and canonical-domain decisions
  are final.

### Navigation behavior

Keep the header compact and calm. Desktop navigation should expose the seven
primary destinations without a separate sales-style button unless user testing
shows a clear need. Mobile navigation should use a keyboard-accessible disclosure
and preserve the same information hierarchy.

## 2. Homepage structure

The homepage should answer, in order: who Bogdan is, where his expertise sits,
how someone can work with him, what can be verified, and how to make contact.

1. **Identity hero** — approved portrait, name, approved positioning statement,
   and one restrained primary route. Until `home.headline` and
   `home.introduction` are approved, do not substitute generic copy.
2. **Four expertise pillars** — a numbered editorial index using the four areas
   recorded in `profile.json`. Because the profile is `needs-confirmation`, this
   module remains gated until client confirmation.
3. **Featured open courses** — editorial rows for publishable products. Current
   candidates are “Networking” and “Arta Negocierii”; descriptions, dates, and
   prices remain absent and must not be improvised.
4. **Coaching introduction** — a concise route into the coaching offer, included
   only after its audience, boundaries, format, and CTA are approved.
5. **Corporate introduction** — a contrasting editorial composition for
   organizational work, included only after the offer is defined.
6. **Credibility / appearances** — verified records only. Omit the section while
   `media.appearances` is empty; do not display placeholder logos.
7. **Resources** — one dominant resource plus secondary items when approved
   content exists. Omit while the inventory is empty.
8. **Final contact invitation** — a warm, direct route to the operational contact
   flow; no urgency devices or conversion-funnel language.

The composition should vary by section: image and display type in the hero,
numbered columns for expertise, full-width rows for courses, a dark editorial
interlude for corporate work, and magazine-like hierarchy for resources. Avoid
the repeated “heading + three cards + button” pattern.

## 3. Reusable component architecture

```text
components/
├── navigation/
│   ├── site-header.tsx
│   ├── mobile-navigation.tsx
│   └── site-footer.tsx
├── sections/
│   ├── identity-hero.tsx
│   ├── expertise-index.tsx
│   ├── featured-courses.tsx
│   ├── coaching-introduction.tsx
│   ├── corporate-introduction.tsx
│   ├── appearances-index.tsx
│   ├── featured-resources.tsx
│   └── contact-invitation.tsx
├── content/
│   ├── course-list-item.tsx
│   ├── appearance-list-item.tsx
│   ├── resource-story.tsx
│   └── empty-editorial-state.tsx
└── ui/
    ├── container.tsx
    ├── editorial-image.tsx
    ├── eyebrow.tsx
    ├── arrow-link.tsx
    ├── section-heading.tsx
    ├── numbered-index.tsx
    └── rule.tsx

lib/content/
├── schemas.ts
├── load-content.ts
├── publication.ts
└── metadata.ts
```

Components should accept typed content records rather than import arbitrary copy
or duplicate page-specific markup. “Content item” does not imply a boxed card:
the default visual language is typography, rows, dividers, columns, photography,
and whitespace. Server Components remain the default; client components are
reserved for the mobile menu, forms, and genuinely interactive behavior.

## 4. Content model

### Existing sources

- `profile.json`: name, publication status, intended roles, four expertise
  pillars, biography, credentials, and social links.
- `products.json`: slug, title, product category, pillars, status, proof references, CTA,
  description, dates, and price.
- `media.json`: approved-image registry, usage, alt text, asset status, and
  appearance records.
- `testimonials.json`: approved testimonial records; currently intentionally empty.
- `site-copy.json`: locale, navigation labels, global CTA labels, and homepage copy.
- `resources.json`: approved owned articles, guides, video, and other resources.
- `seo.json`: approved canonical origin, metadata defaults, social image, and indexing state.
- `SOURCES.md`: human-readable provenance hierarchy and evidence register.

### Required schema behavior

- Define TypeScript types plus build-time validation for every JSON source.
- Use explicit states such as `draft`, `needs-confirmation`, `validated`,
  `approved`, `published`, and `asset-missing`; document which states are public.
- Do not equate a populated field with permission to publish it.
- Require a source reference for factual records and a consent/publication field
  for testimonials and third-party media.
- Exclude incomplete records at the loader boundary. Components should not decide
  whether a claim is safe to publish.
- Fail the production build for invalid public records; allow a clearly labelled
  editorial preview workflow for non-public records.
- Preserve Romanian diacritics and keep interface copy independent of components.
- Do not silently fall back from missing approved copy to text embedded in code.

### Models still required

After reviewing the workbook, extend the content layer with typed records for
coaching offers, corporate services, owned resources, contact channels, and legal
copy. Add these only from approved source material.

## 5. Visual design system

### Art direction

Editorial, intelligent, premium, warm, human, and quietly confident. The closest
reference is a sophisticated business publication or boutique advisory practice,
not a course marketplace, corporate template, coaching funnel, or SaaS product.

### Foundations

- **Palette:** warm ivory ground, charcoal foreground, warm muted gray, and one
  restrained dark olive/cognac/burgundy accent. No gradients.
- **Typography:** expressive editorial serif for display and a neutral humanist
  sans-serif for UI/body. Both must fully support Romanian characters.
- **Scale:** dramatic but controlled display headings; 16–19px body copy with
  generous leading; small uppercase eyebrows with increased tracking.
- **Grid:** approximately 1280–1400px maximum content width, based on a 12-column
  desktop grid but intentionally composed asymmetrically.
- **Spacing:** approximately 140–200px between major desktop blocks and 80–120px
  on mobile. Whitespace is structural, not leftover space.
- **Surfaces:** no shadows, no decorative glass effects, square corners or a
  maximum 2–6px radius, and subtle one-pixel rules where separation is needed.
- **Photography:** large approved crops with portrait and landscape ratios mapped
  to actual use cases. Never generate Bogdan’s likeness or substitute stock.
- **Interaction:** animated underlines, 4–6px arrow travel, and image scale no
  greater than about 1.02 over 250–500ms. Respect reduced-motion preferences.
- **Editorial numbers:** use `01–04` sparingly for expertise, course lists, or
  processes to establish a recognizable visual rhythm.

### Accessibility baseline

Meet WCAG 2.2 AA contrast, preserve visible keyboard focus, maintain one logical
heading hierarchy, use landmark elements, provide meaningful alternative text,
label all form controls, expose menu state, and never encode meaning by color or
motion alone.

## 6. Responsive strategy

### Fluid system

Use fluid type and spacing with `clamp()` inside intentional minimum and maximum
bounds. Favor content-driven breakpoints over device-specific layouts. Test at
320px, 375px, 768px, 1024px, 1280px, and a wide desktop size, including zoom to
200% and landscape orientation.

### Desktop and tablet

- Hero: asymmetric split with photography occupying roughly half the composition.
- Expertise: four editorial columns at wide sizes, then a balanced two-by-two
  index when line length or title wrapping becomes uncomfortable.
- Courses: full-width rows with number, title, optional verified description, and
  action; never independent UI cards.
- Corporate and coaching: alternate image/text proportions so sections do not
  repeat the same template.
- Resources: one dominant feature with a secondary editorial column.

### Mobile

- Preserve dramatic typography without overflow; avoid merely stacking desktop
  cards because the desktop design should not be card-based.
- Allow the hero image and headline to each occupy a substantial visual block.
- Convert expertise and courses into vertical indexed rows separated by rules.
- Place secondary story metadata after the title in a coherent reading order.
- Maintain 44px minimum interactive targets without turning links into pills.
- Keep navigation dismissible, focus-managed, keyboard-operable, and robust when
  JavaScript or reduced motion preferences affect enhancements.
- Reserve image aspect ratios to prevent layout shift and request appropriately
  sized responsive images through `next/image`.

## 7. SEO structure

### Technical foundation

- Set `metadataBase` to the confirmed production `.com` origin only after domain
  ownership and canonical preference are confirmed.
- Create unique Romanian titles and descriptions from approved page copy; never
  manufacture credentials or outcome claims for snippets.
- Add canonical URLs, Open Graph metadata, Twitter/X cards, favicons, and approved
  social-preview images.
- Generate sitemap entries only for published routes and validated dynamic course
  or resource records; exclude draft and `needs-confirmation` content.
- Keep robots rules environment-aware so previews/staging are not indexed.
- Use permanent redirects for superseded English routes after migration.
- Return a true 404 for missing or unpublished dynamic records.

### Structured data

- Use `Person` only for confirmed identity, role, same-as links, and imagery.
- Use `Course` only when a course has sufficient validated detail; connect offers,
  dates, providers, or ratings only when those facts exist and are approved.
- Use `Article` for published owned resources with verified author/date/image data.
- Use `BreadcrumbList` on nested detail pages.
- Do not emit `Review`, `AggregateRating`, `Organization`, or event claims without
  corresponding verified public evidence.

### Content semantics and quality

Use one descriptive `h1`, semantic section headings, meaningful internal-link
labels, stable slugs, descriptive image filenames/alt text, and Romanian language
metadata (`lang="ro"`, `ro-RO`). Add English alternates only if an actual translated
content set exists; do not create empty `hreflang` signals.

## 8. Missing assets

All mapped photography is currently marked `asset-missing`. Required approved
files and usage rights are:

- `/public/images/bogdan/bogdan-hero.jpg` — homepage identity hero.
- `/public/images/bogdan/bogdan-portrait-dark.jpg` — About portrait.
- `/public/images/bogdan/bogdan-speaking-01.jpg` — Media/speaking context.
- `/public/images/bogdan/bogdan-workshop-01.jpg` — Corporate/workshop context.
- `/public/images/bogdan/bogdan-coaching.jpg` — Coaching context.
- `/public/images/bogdan/bogdan-candid-01.jpg` — supporting editorial image.
- Approved Open Graph/social preview image crops.
- Favicon and any approved wordmark/monogram assets.
- Approved media/event/outlet marks with explicit reuse permission, if those marks
  are ultimately required.
- Resource thumbnails or editorial imagery only when real resources are supplied.

For every photograph, record photographer/owner, license or written permission,
crop constraints, focal point, final alt text, and whether monochrome treatment is
allowed. Do not create visual substitutes in the public application.

## 9. Missing information

- The original `Bogdan_Vizitiu_Master_Database_Site.xlsx` research database.
- Client approval for the roles and expertise currently marked
  `needs-confirmation`.
- Approved Romanian hero headline, introduction, short positioning, and biography.
- Verified credentials and experience, if they are to appear at all.
- Production domain decision, contact details, and approved social URLs.
- Complete information for “Networking” and “Arta Negocierii”: positioning,
  audience, problem, outcomes, topics, format, duration, dates, location, capacity,
  price, terms, CTA destination, and evidence behind the “Stup” proof reference.
- Defined coaching offer: audience, exclusions, method, format, duration, booking or
  inquiry process, and privacy boundaries.
- Defined corporate offer: organizational problems addressed, formats, delivery
  regions/languages, procurement/contact flow, and publishable evidence.
- Verified appearances with title, outlet/event, date, URL, source, and reuse rights.
- Approved owned-resource inventory with author, date, excerpt, body, and imagery.
- Approved testimonials with exact quote, attribution, role, organization, source,
  and explicit publication consent; there are currently none.
- Contact-form recipient, inquiry categories, required fields, spam protection,
  success/error behavior, retention period, and consent language.
- Privacy, cookies, analytics, course terms, and any other required legal review.
- Final navigation/footer copy and decisions about newsletter or social channels.

Until these are resolved, related sections must remain absent or clearly
non-public. Empty states are not permission to create plausible marketing copy.

## 10. Implementation phases

1. **Evidence intake and reconciliation**
   - Add and inspect the missing workbook.
   - Compare every potential public fact with `/content` and `SOURCES.md`.
   - Resolve conflicts and assign publication statuses with client approval.
2. **Content foundation**
   - Define schemas, typed loaders, evidence references, and publication filters.
   - Add models for coaching, corporate, resources, contact, and legal copy only
     where source material exists.
   - Make invalid public records fail the production build.
3. **Global editorial system**
   - Implement local design tokens, typography, layout primitives, navigation,
     footer, image handling, focus styles, and reduced-motion behavior.
   - Confirm `.com` metadata and route migration before exposing canonical URLs.
4. **Homepage**
   - Build only sections that pass their publication gates.
   - Validate hierarchy, desktop/mobile composition, keyboard behavior, and image
     performance before adding secondary pages.
5. **Core offer pages**
   - Implement `/despre`, `/cursuri`, course details, `/coaching`, and `/corporate`
     with reusable components and approved content.
6. **Authority and contact pages**
   - Implement `/media`, `/resurse`, and `/contact` when their records and flows are
     complete; omit empty authority modules rather than fabricate social proof.
7. **Migration and SEO**
   - Add canonical metadata, structured data, published-only sitemap entries,
     environment-aware robots rules, true 404 behavior, and legacy redirects.
8. **Quality and launch gate**
   - Run lint, typecheck, production build, content validation, accessibility checks,
     responsive visual review, metadata/structured-data validation, performance
     profiling, and a final line-by-line factual/provenance audit.
   - Launch only after missing legal, content, asset, and operational requirements
     are explicitly cleared.

No website code should be implemented until Phase 1 has reviewed the research
database or the project owner explicitly authorizes proceeding with the smaller,
currently verified content set.

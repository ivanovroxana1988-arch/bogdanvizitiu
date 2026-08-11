# Implementation plan

## 1. Current-state analysis

The repository contains a visual prototype, but it must not be treated as an
approved implementation. Its public copy is embedded directly in TSX and
`lib/data.ts`, several credentials and program concepts are unsupported, the UI
is English-first, routes use the former `/about`, `/programs`, `/insights`, and
`/speaking` model, and the canonical domain is configured as
`bogdanvizitiu.ro`. The intended architecture is Romanian-first and the supplied
domain is `bogdanvizitiu.com`.

The existing editorial styling is a useful visual exploration, but content and
image placeholders currently sit in presentation components. The next build
must consume the structured content layer and omit unverified modules instead
of publishing plausible placeholder claims.

## 2. Proposed information architecture

| Route | Purpose | Primary content |
| --- | --- | --- |
| `/` | Establish identity and routes into the offer | Profile, pillars, featured courses, coaching, corporate, appearances, resources, contact |
| `/despre` | Editorial biography and working philosophy | Approved biography, roles, portrait, selected verified experience |
| `/cursuri` | Discover open courses | Validated product index and filters only if scale requires them |
| `/cursuri/[slug]` | Understand and act on one course | Audience, outcomes, format, dates, proof, CTA—all verified |
| `/coaching` | Explain individual/team coaching | Scope, fit, approach, engagement CTA |
| `/corporate` | Present organizational work | Challenges, formats, pillars, verified case evidence, inquiry CTA |
| `/media` | Establish public credibility | Verified appearances, interviews, podcasts, event media |
| `/resurse` | Publish useful thinking | Articles, guides, video, newsletter when operational |
| `/contact` | Route qualified inquiries | Inquiry categories, privacy notice, contact method |

Legacy English routes should receive permanent redirects only after the new
pages exist and canonical URLs are confirmed.

## 3. Reusable component architecture

```text
components/
├── navigation/
│   ├── site-header.tsx
│   ├── mobile-navigation.tsx
│   └── site-footer.tsx
├── sections/
│   ├── hero.tsx
│   ├── expertise-index.tsx
│   ├── featured-courses.tsx
│   ├── coaching-intro.tsx
│   ├── corporate-intro.tsx
│   ├── appearances-index.tsx
│   ├── resource-feature.tsx
│   └── contact-band.tsx
├── cards/
│   ├── course-list-item.tsx
│   ├── appearance-item.tsx
│   └── resource-story.tsx
└── ui/
    ├── editorial-image.tsx
    ├── arrow-link.tsx
    ├── eyebrow.tsx
    ├── section-heading.tsx
    └── container.tsx
```

“Cards” here means reusable content records, not automatically boxed visual
surfaces. Default presentation should use rows, lines, columns, and whitespace.

## 4. Content model

- `profile.json`: identity, roles, expertise, biography, credentials, social links
- `products.json`: course identity, lifecycle status, evidence, detail, dates,
  price, and CTA
- `media.json`: approved image registry and verified appearance records
- `testimonials.json`: approved quotes with attribution, consent, and provenance
- `site-copy.json`: localized navigation and approved interface/section copy
- `SOURCES.md`: human-readable evidence register and conflict rules

Before implementation, formalize TypeScript schemas in `lib/content/` and load
JSON server-side. Validate required fields at build time. Publication logic must
exclude non-public statuses and must not silently substitute copy.

## 5. Visual design system

- **Art direction:** premium editorial personal brand; calm, warm, intellectual
- **Palette:** warm ivory, charcoal, muted warm gray; one restrained olive,
  cognac, or burgundy accent
- **Type:** expressive editorial serif for display; neutral humanist sans for UI
  and body; Romanian diacritics must be supported
- **Grid:** max-width 1280–1400px, 12-column desktop base, asymmetric compositions
- **Space:** 140–200px major desktop rhythm; 80–120px mobile rhythm
- **Surfaces:** no shadows or gradients; square/low-radius geometry; fine rules
- **Photography:** large approved crops, never small decorative thumbnails or
  generated likenesses
- **Motion:** underlines, 4–6px arrow movement, ~1.02 image scale; respect reduced
  motion
- **Accessibility:** visible focus, semantic landmarks/headings, keyboard menu,
  descriptive alt text, WCAG AA contrast

## 6. Homepage order

1. Asymmetric identity hero using approved Bogdan photography
2. Four expertise pillars as a numbered editorial index
3. Featured validated open courses
4. Coaching positioning and route
5. Corporate work and route
6. Verified credibility / appearances (omit while empty)
7. Resources / insights (omit while empty)
8. Restrained final contact CTA

The homepage should progressively answer: who Bogdan is, what areas he works in,
which relevant ways of working are available, why the visitor should trust the
material, and what to do next.

## 7. Missing information and assets before launch

- Original `Bogdan_Vizitiu_Master_Database_Site.xlsx`
- Client-confirmed roles, short positioning, biography, and credentials
- Confirmed `.com` canonical domain and production social/contact URLs
- Complete course detail, dates, price/payment or inquiry flow, and legal terms
- Coaching and corporate offer scope, format, qualification, and CTA destination
- Verified appearances and permission to use outlet/event marks
- Approved testimonial text, attribution, and publication consent
- Approved photographs for every path in `content/media.json`, plus usage rights
- Resource/article inventory and author-approved copy
- Contact form recipient, spam handling, retention policy, and consent copy
- Romanian privacy/cookie/legal review and analytics decision
- Open Graph images, favicon/brand assets, and final image alt text

## 8. Build phases

1. **Evidence audit:** ingest the workbook, reconcile statuses, and complete the
   source register. No public implementation claims before this gate.
2. **Content foundation:** add typed loaders, build-time validation, locale rules,
   publishing filters, and media helpers.
3. **Global system and homepage:** implement navigation, footer, tokens, typography,
   homepage sections, responsive behavior, and reduced motion.
4. **Core offer pages:** build About, Courses index/detail, Coaching, and Corporate.
5. **Authority and conversion:** build Media, Resources, and Contact using only
   available verified records.
6. **Migration:** add canonical metadata, `.com` sitemap/robots, and redirects from
   superseded routes.
7. **Quality gate:** lint, typecheck, production build, keyboard and screen-reader
   checks, responsive screenshots, metadata/structured-data validation, Core Web
   Vitals review, and final factual audit.

## 9. Immediate next task

Supply and review the missing master workbook and approved photography. Then
implement Phase 2 without rewriting or polishing unverified public copy.


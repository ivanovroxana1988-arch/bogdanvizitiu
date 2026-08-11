# BogdanVizitiu.com

## Goal

Build a premium personal-brand website for Bogdan Vizitiu.

The site must position Bogdan as an experienced coach, trainer, entrepreneur,
and facilitator. This is **not** a generic motivational-coach website.

## Brand positioning

Primary pillars:

1. Leadership & Teams
2. Negotiation & Sales
3. Networking & Influence
4. Career & Personal Performance

## Audience

- Managers
- Entrepreneurs
- Executives
- Professionals
- Companies looking for training or coaching
- Individuals interested in open courses

## Brand personality

Calm. Intelligent. Warm. Experienced. Human. Confident without being arrogant.
Premium without looking corporate or sterile.

Avoid:

- Generic coaching clichés (including “unlock your potential”)
- Excessive gradients
- Fake statistics, testimonials, or client logos
- Stock-photo aesthetics
- SaaS landing-page patterns and repeated card grids

## Source of truth

Use the structured content files in `/content` as the public-content source of
truth. Source provenance and verification rules live in `/source/SOURCES.md`.

The intended original research database is:

`/source/Bogdan_Vizitiu_Master_Database_Site.xlsx`

If that file is absent, do not infer its contents. Never invent credentials,
companies, certifications, testimonials, participant numbers, dates, or
professional experience. Anything marked `needs-confirmation`, `draft`, or
`placeholder` must not appear as a verified public fact. Empty content arrays
are intentional until evidence is supplied.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- Responsive design
- Accessible semantic HTML
- SEO metadata
- Reusable components
- Optimized local images

## Architecture

- Home (`/`)
- About (`/despre`)
- Courses (`/cursuri`)
- Course detail (`/cursuri/[slug]`)
- Coaching (`/coaching`)
- Corporate (`/corporate`)
- Media / appearances (`/media`)
- Resources / insights (`/resurse`)
- Contact (`/contact`)

## Design principle

Create an editorial personal-brand website rather than a SaaS landing page.
Use large approved photography, generous whitespace, strong typography, and
restrained interaction. Bogdan must remain the visual focus.

## Development rules

- Read this file, `/content`, `/source/SITE_BRIEF.md`, and
  `/source/SOURCES.md` before changing public UI or copy.
- Keep content separate from presentation.
- Create reusable sections and components; avoid page-specific duplication.
- Avoid unnecessary dependencies.
- Do not replace verified content with placeholder marketing copy.
- Do not present draft copy as a factual claim.
- Use only assets mapped in `content/media.json`; never generate a likeness of
  Bogdan or substitute stock photography.
- Run lint, typecheck, and production build after major changes. If a script is
  unavailable, add it deliberately or document the limitation.


# BogdanVizitiu.com

## Goal

Build a premium personal-brand website for Bogdan Vizitiu.

The site must position Bogdan as an experienced coach, trainer, entrepreneur, and facilitator. This is **not** a generic motivational-coach website.

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

Calm. Intelligent. Warm. Experienced. Human. Confident without being arrogant. Premium without looking corporate or sterile.

Avoid generic coaching clichés, excessive gradients, fake statistics/testimonials/client logos, stock-photo aesthetics, SaaS landing-page patterns, and repeated card grids.

## Source of truth

Read these before changing public UI or copy:

1. `/source/MASTER_DATABASE.md` — repo-readable research/evidence master derived from the supplied workbook
2. `/TODO.md` — execution order, dependencies, and definition of done
3. `/content` — structured records the application may render
4. `/source/SOURCES.md` — provenance and verification rules
5. `/source/SITE_BRIEF.md` — product/brand direction
6. `/IMPLEMENTATION_PLAN.md` — target architecture and release gates

Never invent credentials, companies, certifications, testimonials, participant numbers, dates, prices, professional experience, or usage rights. Anything marked `needs-confirmation`, `draft`, `placeholder`, unapproved, or lacking required rights must not appear as a verified public fact.

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
- Networking (`/cursuri/networking`)
- Negotiation (`/cursuri/arta-negocierii`)
- Leadership & Teams (`/cursuri/leadership-teams`)
- Coaching (`/coaching`)
- Corporate (`/corporate`)
- Media (`/media`)
- Insights (`/insights`)
- Resources (`/resurse`)
- Contact (`/contact`)
- Privacy (`/confidentialitate`)
- Terms (`/termeni`)

Preserve the bilingual capability already introduced in the codebase. Romanian is the default/canonical interface; English must obey the same source and approval rules.

## Design principle

Create an editorial personal-brand website rather than a SaaS landing page. Use large approved photography, generous whitespace, strong typography, and restrained interaction. Bogdan must remain the visual focus.

## Development rules

- Work through `TODO.md` in dependency order; do not wait on external inputs for tasks marked BUILD NOW.
- Keep content separate from presentation.
- Create reusable sections/components; avoid page-specific duplication.
- Avoid unnecessary dependencies.
- Do not replace verified content with placeholder marketing copy.
- Omit public sections that have no publishable content.
- Use only assets with sufficient recorded rights.
- Never generate a likeness of Bogdan or substitute stock photography.
- Run lint, typecheck, and production build after major changes.
- Before marking the site launch-ready, pass the release gate in `IMPLEMENTATION_PLAN.md`.

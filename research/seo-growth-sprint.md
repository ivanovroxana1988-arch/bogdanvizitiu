# SEO Growth Sprint

Updated: 2026-08-12
Market: Romania / Romanian-language search intent

## Principle

Each commercial search intent has one owner URL. Hub pages distribute context and authority but do not compete with specialist landing pages for the same primary query.

## Search intent ownership

| Priority | Primary intent | Secondary queries | Owner URL | Status |
|---|---|---|---|---|
| P1 | executive coaching Romania | executive coach Bucuresti; coaching pentru manageri | `/coaching/executive-coaching` | Planned |
| P1 | curs negociere | curs tehnici negociere; curs negociere Bucuresti | `/cursuri/arta-negocierii` | Live / SEO aligned |
| P1 | leadership training Romania | training leadership manageri | `/corporate/leadership-training` | Planned |
| P1 | team coaching Romania | coaching echipe management | `/corporate/team-coaching` | Planned |
| P2 | curs networking | networking profesional curs | `/cursuri/networking` | Live / SEO aligned |
| P2 | training negociere companii | training negociere corporate | `/corporate/training-negociere` | Planned |
| P2 | coaching cariera | coaching performanta profesionala | `/coaching/cariera-performanta` | Planned |

## Hub ownership

### `/`
Role: entity/brand hub.
Primary intent: Bogdan Vizitiu; Bogdan Vizitiu coach; Bogdan Vizitiu trainer.
Do not target generic commercial queries here.

### `/coaching`
Role: individual coaching hub.
Current SEO title: `Coaching pentru decizii, carieră și performanță`.
Do not make this page the permanent owner of `executive coaching Romania`; that belongs to the future specialist page.
Internal destinations when built: executive coaching; career/performance coaching.

### `/corporate`
Role: B2B hub for organizations.
Current SEO title: `Programe corporate pentru leadership, negociere și echipe`.
Do not make this page the permanent owner of leadership training, team coaching or negotiation training queries.
Internal destinations when built: leadership training; team coaching; negotiation training.

### `/cursuri`
Role: open-course catalog hub.
Current SEO title: `Cursuri pentru profesioniști: negociere și networking`.
Primary child pages own the specific course queries.

## Live page specifications

### `/cursuri/arta-negocierii`
Primary query: `curs negociere`.
Secondary: `curs tehnici negociere`, `curs negociere Bucuresti`.
Search intent: transactional / commercial investigation.
SEO title: `Curs de negociere pentru profesioniști`.
H1: `Curs de negociere: Negotiation & Influence`.
Meta description: emphasizes audience, preparation, interests, alternatives and concessions.

Competitor gap observed in Romanian SERPs:
- competing pages prominently expose duration, dates/location, price or enrollment details;
- many competitors enumerate curriculum and outcomes early;
- commercial information is often visible above or near the first CTA.

Current BGV strengths:
- clearer problem framing;
- differentiated position against domination/tactics-only negotiation;
- real-situation and practice orientation;
- audience already defined.

Current blockers:
- B04: dates empty;
- B04: price null;
- final duration/capacity/status need commercial confirmation.

Do not create another generic `curs-negociere` page. It would cannibalize this URL.

### `/cursuri/networking`
Primary query: `curs networking`.
Secondary: `networking profesional curs`, `training networking`.
Search intent: commercial investigation with weaker/fragmented specialist competition.
SEO title: `Curs de networking profesional`.
H1: `Curs de networking profesional`.
Meta description: emphasizes managers, entrepreneurs, specialists, sales professionals, relevant relationships and contextual follow-up.

Current strengths:
- differentiated against artificial networking and pitch-first behavior;
- concrete before/during/after structure;
- strong alignment with professional relationship intent.

Current blockers:
- B04: dates empty;
- B04: price null;
- final duration/capacity/status need commercial confirmation.

## Planned specialist landing pages

### `/coaching/executive-coaching`
Primary query: `executive coaching Romania`.
Secondary: `executive coach Bucuresti`, `coaching pentru manageri`.
Search intent: individual 1:1 coaching for leaders/managers, not a course teaching managers how to coach employees.
Suggested SEO title: `Executive Coaching pentru manageri și lideri`.
Suggested H1: `Executive coaching pentru decizii, rol și responsabilitate`.
Required sections:
1. what situations bring a manager to executive coaching;
2. what the work is / is not;
3. who it is for;
4. themes: decisions, role, relationships, performance, transitions;
5. how the process starts;
6. evidence/credentials that are verified and current;
7. FAQ;
8. contact CTA.

Competitor gap opportunity: Romanian results mix true executive coaching with manager-as-coach training. BGV page should disambiguate 1:1 service immediately.

### `/corporate/leadership-training`
Primary query: `leadership training Romania`.
Secondary: `training leadership manageri`.
Suggested SEO title: `Leadership Training pentru manageri și organizații`.
Suggested H1: `Leadership training construit pe situațiile reale ale managerilor`.
Required sections:
1. organizational diagnosis/context;
2. audience and manager level;
3. situations/problems addressed;
4. learning outcomes;
5. format and customization;
6. facilitator credibility;
7. client/logo/testimonial proof only with rights and approval;
8. FAQ;
9. organization contact CTA.

Competition level: high. Benchmark pages have long history, named programs, quantified proof, case studies, FAQs and clear commercial details. Do not publish a thin page.

### `/corporate/team-coaching`
Primary query: `team coaching Romania`.
Secondary: `coaching echipe management`.
Suggested SEO title: `Team Coaching pentru echipe de management`.
Suggested H1: `Team coaching pentru echipe care trebuie să decidă și să lucreze mai bine împreună`.
Required sections: use cases, team types, process, outcomes, facilitation approach, proof, FAQ, CTA.

### `/corporate/training-negociere`
Primary query: `training negociere companii`.
Secondary: `training negociere corporate`.
Role: B2B only. Never duplicate the open-course commercial intent owned by `/cursuri/arta-negocierii`.
Suggested SEO title: `Training de negociere pentru companii și echipe`.

## Competitor gap summary

1. Negotiation: strong transactional pages. B04 commercial completeness is the largest gap, not copy volume.
2. Leadership: strongest authority competition. Requires proof depth and a substantial specialist page.
3. Team coaching: strong specialist benchmark pages with quantified proof. BGV needs clear use cases and credible evidence, not generic team language.
4. Executive coaching: comparatively better opportunity because search intent is fragmented; clarity about 1:1 executive coaching is the main differentiation opportunity.
5. Networking: fragmented SERP suggests an opportunity, but search volume must be validated over time in Search Console rather than invented.

## Internal linking rule

Use descriptive anchors. Examples:
- `executive coaching pentru manageri` -> `/coaching/executive-coaching`
- `curs de negociere` -> `/cursuri/arta-negocierii`
- `curs de networking profesional` -> `/cursuri/networking`
- `leadership training pentru organizații` -> `/corporate/leadership-training`

Avoid generic anchors such as `vezi mai mult` when a descriptive anchor works naturally.

## Next sequence

1. Finish B04 commercial data for the two live open courses.
2. Build `/coaching/executive-coaching` first.
3. Build `/corporate/leadership-training` only when enough proof and offer detail are available.
4. Build `/corporate/team-coaching` and `/corporate/training-negociere` after product/format confirmation.
5. Create editorial clusters linking into the owner URLs.
6. Use Search Console query/impression data to refine this map after enough data accumulates.

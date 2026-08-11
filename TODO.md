# TODO — BogdanVizitiu.com

Updated: 2026-08-11

This is the execution backlog for Codex. The repo-readable research master is `/source/MASTER_DATABASE.md`, generated from the supplied `Bogdan_Vizitiu_Master_Database_Site.xlsx` workbook.

## Rules

1. **BUILD NOW** items are not blocked by missing client inputs. Work through them in order.
2. **BLOCKED BY BOGDAN** runs in parallel. Missing inputs must not freeze technical/content-foundation work.
3. **PRE-LAUNCH** is a release gate, not a reason to publish placeholders early.
4. Never invent copy, credentials, dates, prices, testimonials, client logos, rights, or legal text.
5. If a section has no publishable verified content, omit it or keep it in editorial preview. Do not fill it with generic marketing prose.
6. Preserve the bilingual capability already introduced in the repo, with Romanian as the default/canonical interface. English content must respect the same approval rules.

## BUILD NOW

| ID | Priority | Workstream | Task | Owner | Depends on | Definition of done |
|---|---|---|---|---|---|---|
| T01 | Critică | Foundation | Lock the source baseline using `/source/MASTER_DATABASE.md`. | Roxana / Codex | — | The repo contains the workbook-derived master and all build docs point to it. |
| T02 | Critică | Foundation | Reconciliere master → `/content/*.json`. | Codex | T01 | `profile/products/media/testimonials/site-copy` reflect only verified or approved data; no invented claims. |
| T03 | Critică | Foundation | Implementează schema TypeScript pentru colecțiile din „CMS schema”. | Codex | T02 | Există tipuri + validare la build pentru products, media, posts, testimonials, assets și profile/site copy. |
| T04 | Critică | Foundation | Adaugă publishing gates pentru status și drepturi. | Codex | T03 | Conținutul neaprobat, `needs-confirmation`, rights unknown sau `permission=false` nu poate apărea public. |
| T05 | Critică | Architecture | Aliniază rutele la sitemap-ul de 14 pagini din master. | Codex | T02 | Există rutele: `/`, `/despre`, `/cursuri`, 3 pagini curs, `/coaching`, `/corporate`, `/media`, `/insights`, `/resurse`, `/contact`, `/confidentialitate`, `/termeni`. |
| T06 | Mare | Architecture | Curăță rutele vechi și pregătește redirecturile permanente. | Codex | T05 | Rutele legacy nu mai sunt structura principală; redirecturile sunt activate doar după existența destinațiilor. |
| T07 | Critică | SEO | Setează canonical pe `bogdanvizitiu.com` + metadata, sitemap și robots. | Codex | T05 | Canonical `.com` este consecvent; sitemap/robots includ doar paginile publicabile. |
| T08 | Mare | Design system | Consolidează sistemul vizual editorial premium. | Codex | — | Tokenuri coerente pentru tipografie, spațiere, grid, suprafețe, focus și motion; fără gradient/card-grid generic. |
| T09 | Critică | Global UI | Construiește header, navigație mobilă și footer reutilizabile. | Codex | T05,T08 | Navigația reflectă sitemap-ul; accesibilă cu tastatura; CTA-urile fără destinație aprobată nu duc în gol. |
| T10 | Critică | Home | Refă Home în ordinea de conversie din master. | Codex | T02,T04,T08,T09 | Hero + proof verificat + cursuri + corporate + coaching + media + bio + testimoniale doar dacă există + CTA final; secțiunile goale sunt omise. |
| T11 | Critică | Courses | Construiește catalogul `/cursuri` din `products.json`. | Codex | T02,T03,T04,T05 | Catalogul afișează doar produse publicabile și CTA-ul corect pentru open/waitlist/closed. |
| T12 | Critică | Courses | Construiește pagina „Totul despre Networking”. | Codex | T11 | Folosește informația verificată Stup + materialele aprobate; audience, outcomes, format, proof, FAQ și CTA. |
| T13 | Critică | Courses | Construiește pagina „Arta Negocierii în Business”. | Codex | T11 | Folosește informația verificată Stup + materialele aprobate; tactici/empatie/influență, proof și CTA. |
| T14 | Mare | Courses | Pregătește „Leadership & Teams” ca waitlist, nu produs inventat. | Codex | T11 | Poate fi publicat numai cu poziționare și ofertă aprobate; până atunci draft/waitlist. |
| T15 | Mare | Services | Construiește `/coaching`. | Codex | T02,T04,T05 | Scope, fit, proces și CTA; nu publică certificare ICF istorică/neconfirmată ca fiind curentă. |
| T16 | Critică | Services | Construiește `/corporate`. | Codex | T02,T04,T05 | Training, facilitation, coaching, teme și proces B2B; logos/case studies doar cu drepturi. |
| T17 | Medie | Authority | Construiește `/media` din aparițiile verificate. | Codex | T02,T04,T05 | Podcastul Stup și evenimentele verificate sunt listate/embedded conform drepturilor; fără reutilizare neautorizată de imagini. |
| T18 | Medie | Authority | Construiește `/insights` și `/resurse` fără filler editorial. | Codex | T02,T04,T05 | Se publică doar LIVES/materiale/articole aprobate; paginile goale au stare controlată, nu text generic. |
| T19 | Critică | Conversion | Construiește `/contact` cu formular segmentat. | Codex | T05 | Tip solicitare curs/coaching/corporate/media + consimțământ + handling clar; trimiterea reală rămâne blocată până la recipient/date business. |

## BLOCKED BY BOGDAN

| ID | Priority | Input | Owner | Definition of done |
|---|---|---|---|---|
| B01 | Critică | Poziționare: „pentru cine vreau să fiu prima alegere și pentru ce problemă?” | Bogdan | Răspuns aprobat pentru hero, navigație și prioritizarea ofertelor. |
| B02 | Critică | Bio 150 cuvinte + bio 50 cuvinte + 5 momente de carieră. | Bogdan | Textele sunt aprobate pentru Home/About/Media. |
| B03 | Critică | Dovada certificării ICF valabile în 2026 + denumirea exactă. | Bogdan | PDF/badge/link verificabil; altfel site-ul nu o afirmă ca fiind curentă. |
| B04 | Critică | Produsele 2026–2027: preț, durată, capacitate, date, status comercial. | Bogdan | Tabel final pentru fiecare produs; CTA/checkout/waitlist devin deterministe. |
| B05 | Critică | 20–40 fotografii originale high-res + drepturi. | Bogdan | Portret/full body/speaking/training/lifestyle, min. 2500px, mapate cu `rights_status`. |
| B06 | Mare | 3–5 clipuri bune + ideal intro nou 45–60 sec. | Bogdan | Fișiere/linkuri + drepturi clare + utilizare mapată. |
| B07 | Critică | 10–15 testimoniale cu acord de publicare. | Bogdan | Nume, rol, companie, text, context și `permission=true`, separate pe servicii. |
| B08 | Mare | Logo-uri clienți/parteneri cu drept de afișare. | Bogdan | Lista + SVG/PNG + permisiune/brand guidelines. |
| B09 | Mare | Materialele cursului Networking. | Bogdan | Deck/workbook/exerciții/outcomes/feedback suficiente pentru produs și versiune digitală. |
| B10 | Mare | Materialele cursului Negociere. | Bogdan | Deck/workbook/exerciții/outcomes/feedback suficiente pentru produs și corporate. |
| B11 | Medie | Framework LIVES actualizat. | Bogdan | Definiția fiecărei litere + ce păstrează/ce schimbă în 2026; aprobat pentru publicare. |
| B12 | Critică | Entitate facturare, CUI, adresă, email suport, anulări/refund și politica de date. | Roxana / Bogdan | Date validate pentru checkout, contact, privacy și terms. |
| B13 | Critică | Canalele oficiale și accesurile/owner-ul. | Roxana / Bogdan | URL-uri finale LinkedIn/Facebook/Instagram/TikTok/YouTube + ownership clar. |
| B14 | Mare | Fluxul de programare: Calendly, Google Calendar sau formular. | Bogdan | Un singur flux aprobat pentru coaching/call-uri, cu link final. |
| B15 | Medie | Newsletter + lead magnet. | Bogdan | Decizie da/nu + promisiune + tool + lead magnet inițial. |

## PRE-LAUNCH

| ID | Priority | Task | Owner | Depends on | Definition of done |
|---|---|---|---|---|---|
| T20 | Critică | Pregătește `/confidentialitate` și `/termeni` ca pagini controlate editorial. | Roxana / Legal / Codex | B12 | Nu există text juridic inventat; conținutul este aprobat și legat din footer/checkout. |
| T21 | Critică | Conectează CTA-urile la calendar/formular/checkout real. | Roxana / Bogdan / Codex | B04,B12,B14 | Niciun CTA nu duce la placeholder sau `#`. |
| T22 | Mare | Configurează analytics + consent + evenimente de conversie. | Roxana / Codex | B12 | Consent/cookie logică decisă + events pentru cursuri, coaching, corporate, contact, newsletter. |
| T23 | Critică | Rulează quality gate complet. | Codex | taskurile relevante | lint + typecheck + production build + responsive + keyboard + metadata + structured data + factual audit fără erori critice. |

## Codex start sequence

Start with `T01 → T02 → T03 → T04 → T05 → T08 → T09 → T10`, then implement offer pages (`T11–T16`), authority pages (`T17–T18`), and conversion (`T19`). Keep B01–B15 visible as external dependencies and do not mark them done without actual approved inputs.

## Launch gate

Do not call the site launch-ready until `T23` passes and every Critical PRE-LAUNCH blocker is resolved.

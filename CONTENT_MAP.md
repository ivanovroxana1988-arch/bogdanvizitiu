# Content map

## Purpose

This file defines the boundary between the human-maintained research workbook
and the structured content consumed by the website.

```text
Bogdan_Vizitiu_Master_Database_Site.xlsx
                    ↓
          extraction and normalization
                    ↓
       review, provenance, and approval
                    ↓
     content/*.json + project documents
                    ↓
        typed loaders and validation
                    ↓
          Next.js production build
```

The production website must never read the Excel workbook. The workbook remains
an editorial source in `/source`; reviewed JSON files are the application source
of truth. Updating JSON must not require editing React presentation components.

## Current source status

`source/Bogdan_Vizitiu_Master_Database_Site.xlsx` is not currently present in
this repository. No workbook rows have been extracted. The records that do exist
come only from the project direction listed in `source/SOURCES.md`.

## Output files

| File | Responsibility | Current state |
| --- | --- | --- |
| `content/profile.json` | Identity, intended roles, expertise pillars, biography, credentials, social links | Identity present; roles and pillars require confirmation; biography and credentials empty |
| `content/products.json` | Courses and other offers, pillar mapping, status, proof references, CTA and delivery details | Two supplied course examples; most detail absent |
| `content/media.json` | Approved photography registry and verified appearances | Asset paths reserved; files and appearances absent |
| `content/resources.json` | Articles, guides, video and other owned resources | Empty |
| `content/testimonials.json` | Approved quotes, attribution, consent and provenance | Empty |
| `content/site-copy.json` | Romanian navigation, interface labels and approved page copy | Navigation labels present; positioning copy absent |
| `content/seo.json` | Canonical origin, site defaults, social metadata and indexing approval | Awaiting approval |

## Normalization rules

1. Preserve the original workbook value and row/sheet reference in the evidence
   register before normalizing it.
2. Normalize stable identifiers to lowercase kebab-case slugs.
3. Use ISO `YYYY-MM-DD` dates only when the complete date is known. Do not invent
   missing day or month values.
4. Map expertise only to these controlled values:
   - `Leadership & Teams`
   - `Negotiation & Sales`
   - `Networking & Influence`
   - `Career & Personal Performance`
5. Keep missing values as `null` or empty arrays according to the file schema;
   never replace them with plausible marketing language.
6. Keep proof references as references, not public claims. A label such as `Stup`
   still requires an evidence location and publication decision.
7. Record testimonial consent and exact attribution before approval.
8. Record image ownership, permission, crop, focal point and alt text before
   changing an asset status to `approved`.
9. Resolve conflicting sources with the project owner; do not choose the more
   promotional version automatically.
10. Preserve Romanian diacritics in public copy.

## Publication states

| State | Meaning | Publicly renderable |
| --- | --- | --- |
| `draft` | Working editorial record | No |
| `needs-confirmation` | Content exists but owner confirmation is missing | No |
| `validated` | The source record has been identified and normalized | Not by itself |
| `approved` | Content and publication permission have been confirmed | Yes, if complete |
| `published` | Approved record intentionally released | Yes |
| `asset-missing` | Referenced media file has not been supplied | No |

`validated` deliberately does not mean approved for publication. Production
loaders must require an explicitly public state and all mandatory fields.

## Product mapping

| JSON field | Workbook input | Rule |
| --- | --- | --- |
| `slug` | Product title or explicit slug | Stable kebab-case; never change after publication without a redirect |
| `title` | Approved product name | Preserve approved spelling and diacritics |
| `category` | Product format/type | Use a controlled value such as `open-course` only when supported |
| `pillars` | Topic/category mapping | One or more of the four controlled pillars |
| `status` | Editorial workflow | Normalize using the publication-state table |
| `proofSources` | Evidence/source columns | Store references; verify separately before public use |
| `cta` | Approved interface copy | Keep separate from the CTA destination |
| `description` | Approved short description | `null` until supplied; no generated substitute |
| `dates` | Confirmed schedule | ISO dates; empty when unknown |
| `price` | Confirmed commercial data | `null` when unknown; include currency once modeled |

Before course-detail implementation, extend the schema only from reviewed source
fields for audience, problem, outcomes, curriculum/topics, format, duration,
location, capacity, instructor, terms and CTA destination.

## Media and testimonial mapping

Photography is registered by semantic key in `content/media.json`; components
refer to that key rather than hardcoding file paths. Appearance records require a
stable ID, title, outlet/event, date when known, source, verification status and
reuse permission. Every testimonial requires the exact approved quote,
attribution, source location, consent status and approval date.

## Extraction workflow

1. Add the original workbook unchanged under `/source`.
2. Inventory sheets, columns, formulas and source links without editing outputs.
3. Create a field mapping proposal and flag ambiguous values.
4. Extract into a temporary review artifact, not directly into public JSON.
5. Normalize controlled fields and attach evidence references.
6. Review factual accuracy and publication permissions with the project owner.
7. Write approved changes to `/content` and update `source/SOURCES.md`.
8. Validate JSON schemas and referential integrity.
9. Review the content diff separately from any component/code diff.
10. Publish only records that satisfy the loader’s public-state requirements.

## Required implementation validation

The later content loader should reject unknown pillar values, duplicate slugs,
invalid dates, public records with mandatory fields missing, image references to
unapproved or missing assets, testimonials without consent, and canonical URLs
that do not match the approved origin. These rules belong at the content boundary,
not scattered through page components.

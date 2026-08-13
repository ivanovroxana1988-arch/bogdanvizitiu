# Build log

## 2026-08-13 — Portfolio proof architecture

- Added `content/portfolio.json` as the structured registry for factually confirmed organizations and delivery contexts.
- Added user-supplied KPMG and PwC logo assets to `public/images/logos/`; existing Teleskop and YoungMinds assets are reused.
- Added a reusable, accessible scrolling portfolio band to the homepage with pause-on-hover and reduced-motion fallback.
- Added `/portofoliu` and `/en/portfolio`, intentionally not added to primary navigation.
- Added portfolio routes to localization mapping and sitemap for crawlability/indexing.
- Portfolio page renders every confirmed organization as HTML text, grouped by delivery context. Where a local logo asset exists it is displayed; otherwise a typographic wordmark is used until the authentic visual asset is available.
- Added `docs/LOGO_RIGHTS_REVIEW.md` to keep trademark-asset clearance separate from factual portfolio evidence.

### Remaining dependency

Authentic graphical logo files are not yet locally available for every organization. The portfolio remains complete as searchable text, while visual assets can be replaced progressively without changing the content model. Third-party written permissions/licences remain separate from factual confirmation of work delivered.

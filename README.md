# BogdanVizitiu.com

Next.js project for Bogdan Vizitiu’s Romanian-first personal-brand website.

## Start here

1. Read [`AGENTS.md`](./AGENTS.md).
2. Review all structured records in [`content/`](./content).
3. Read the project brief in [`SITE_BRIEF.md`](./SITE_BRIEF.md).
4. Review the workbook-to-JSON contract in [`CONTENT_MAP.md`](./CONTENT_MAP.md).
5. Check source provenance in [`source/SOURCES.md`](./source/SOURCES.md).
6. Follow [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).
7. Review current architecture coverage in [`ARCHITECTURE_AUDIT.md`](./ARCHITECTURE_AUDIT.md).

The current application is an earlier visual prototype. Do not treat embedded
copy, placeholder imagery, or legacy routes as verified content.

## Local commands

```bash
npm install
npm run dev
npm run validate:content
npm run lint
npm run typecheck
npm run build
```

Contact submissions are delivered only when `CONTACT_WEBHOOK_URL` is configured.
Without it, the form returns an honest unavailable state and does not display a
false success confirmation. Copy `.env.example` to `.env.local` for local setup.

## Source assets

Place the original research workbook at:

`source/Bogdan_Vizitiu_Master_Database_Site.xlsx`

The workbook remains a human editorial source. The production application must
consume reviewed files under `/content`; it must not parse the workbook at
runtime.

Place client-approved photographs at the exact paths registered in
`content/media.json`. Missing files are intentional and must not be replaced by
stock or generated likeness imagery.

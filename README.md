# BogdanVizitiu.com

Next.js project for Bogdan Vizitiu’s Romanian-first personal-brand website.

## Start here

1. Read [`AGENTS.md`](./AGENTS.md).
2. Review all structured records in [`content/`](./content).
3. Check source provenance in [`source/SOURCES.md`](./source/SOURCES.md).
4. Follow [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).

The current application is an earlier visual prototype. Do not treat embedded
copy, placeholder imagery, or legacy routes as verified content.

## Local commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Search Console

Preferred production property: **Domain property `bogdanvizitiu.com`**.

- Domain-property ownership must be verified with the DNS TXT/CNAME value issued by Google Search Console.
- The public sitemap is `https://bogdanvizitiu.com/sitemap.xml`.
- The sitemap is also declared in `robots.txt`.
- After ownership verification, submit `sitemap.xml` in Search Console → Sitemaps and verify that its status becomes `Success`.
- The app also supports Google HTML/meta verification for a URL-prefix property through `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; use this only when a URL-prefix property is intentionally preferred.
- Never commit Google verification values or other secrets to the repository. Configure them as deployment environment variables when applicable.

## Analytics, privacy and consent

The production layout currently uses **Vercel Web Analytics** via `@vercel/analytics`.
Vercel Web Analytics is cookie-free and designed around anonymized/aggregated data.
Do not add a cookie banner solely for the existing Vercel Web Analytics integration.

Before adding any third-party analytics or advertising tag such as Google Analytics,
Google Ads, Meta Pixel or LinkedIn Insight Tag:

1. complete and approve the privacy/legal information required by B12/T20;
2. define the consent categories and retention/documentation rules;
3. block non-essential tags until the applicable consent state allows them;
4. avoid sending names, email addresses, message content or other personal data in analytics events;
5. define conversion events for course interest, coaching, corporate, media/contact and any later checkout/newsletter flow.

Vercel custom analytics events require an eligible Vercel plan. Do not make custom-event
tracking a launch dependency unless the project plan supports it.

## Launch quality gate

T23 is the final release gate. Run it only after the relevant legal, CTA and tracking
inputs are resolved. It must cover build/type validity, responsive and keyboard QA,
metadata/structured data, redirect/indexing behavior, runtime errors and a final factual audit.

## Source assets

Place the original research workbook at:

`source/Bogdan_Vizitiu_Master_Database_Site.xlsx`

Place client-approved photographs at the exact paths registered in
`content/media.json`. Missing files are intentional and must not be replaced by
stock or generated likeness imagery.

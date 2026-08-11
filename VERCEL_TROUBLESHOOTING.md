# Vercel deployment troubleshooting

## Repeated bilingual deployment failures

The deployment list supplied on 2026-08-11 shows repeated attempts titled
“Guard localized links/header/footer search params with Suspense”. The linked
Vercel deployment is private and cannot be read without project authentication,
and the referenced GitHub commits are not available in this local clone.

The titles nevertheless identify a consistent failure mode: a globally rendered
Client Component calls Next.js `useSearchParams()` during static generation.
Wrapping JSX *inside the same component* does not solve that condition because
the hook executes before the component returns its inner `Suspense` boundary.
Every route using that global header/footer can consequently fail prerendering.

## Resolution used by this repository

Locale is represented by the URL path, never by `?lang=` search parameters:

```text
/                 Romanian home
/despre           Romanian About
/cursuri          Romanian courses
/en               English home
/en/about         English About
/en/courses       English courses
```

`components/header.tsx` and `components/footer.tsx` use `usePathname()`, not
`useSearchParams()`. `middleware.ts` redirects legacy paths and supplies the
document locale. There is therefore no global search-parameter hook requiring a
Suspense boundary.

The build-time architecture check rejects `useSearchParams` if it is introduced
in either global navigation component. This is intentional: language choice is
routing state and must remain stable, shareable, indexable, and independent of a
query-string hydration bailout.

## Deployment checklist

1. Confirm Vercel is building the branch/commit containing this document and
   `scripts/check-architecture.mjs`.
2. Confirm the install command succeeds and the Build Command remains
   `npm run build`.
3. Do not override the command with `next build`, because that skips `prebuild`
   validation.
4. Redeploy without using an old source commit. Clearing build cache is optional;
   source-commit correctness is mandatory.
5. In the new log, verify both lines appear before Next compilation:

   ```text
   Validated … product records
   Architecture check passed: no legacy fixtures or global useSearchParams consumers.
   ```

6. If Vercel still reports `useSearchParams() should be wrapped in a suspense
   boundary`, search the exact deployed commit—not a different local branch—with:

   ```bash
   rg -n 'useSearchParams' app components lib
   ```

7. If query parameters are later needed for non-locale UI, isolate the smallest
   Client Component and place `Suspense` in its server-rendered parent. Do not put
   that hook back into the site-wide header or footer.

## Source mismatch warning

The referenced failing commits (`0b2ac23`, `36eebca`, `afbc9fd`, and the other
`agent/bilingual-copy` revisions) are not ancestors or objects in the current
local branch. A fix committed here will not affect those deployments until the
correct branch is pushed/merged and Vercel builds the resulting commit.

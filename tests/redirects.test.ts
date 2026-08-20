import { deepStrictEqual, equal } from 'node:assert/strict'
import { test } from 'node:test'
import { resolveCanonicalRedirect } from '../lib/redirects'

test('canonical requests do not redirect', () => {
  equal(resolveCanonicalRedirect({ hostname: 'bogdanvizitiu.com', pathname: '/despre' }), null)
})

test('www host is canonicalized while preserving query parameters', () => {
  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'www.bogdanvizitiu.com',
      pathname: '/contact',
      search: '?utm_source=test',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/contact',
      search: '?utm_source=test',
    },
  )
})

test('legacy English routes redirect to the English route family', () => {
  deepStrictEqual(resolveCanonicalRedirect({ hostname: 'bogdanvizitiu.com', pathname: '/about' }), {
    hostname: 'bogdanvizitiu.com',
    pathname: '/en/about',
    search: '',
  })

  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname: '/programs/arta-negocierii',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/programs/negotiation-influence',
      search: '',
    },
  )
})

test('lang query parameter becomes a canonical path and is removed', () => {
  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname: '/despre',
      search: '?lang=en&utm_campaign=test',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/about',
      search: '?utm_campaign=test',
    },
  )

  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/about',
      search: '?lang=ro',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/despre',
      search: '',
    },
  )
})

test('legacy public English slugs are normalized', () => {
  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/insights/nu-invatam-doar-cu-mintea',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/insights/we-do-not-learn-with-the-mind-alone',
      search: '',
    },
  )

  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/insights/stii-ce-ai-de-facut-de-ce-nu-faci',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/insights/you-know-what-to-do-why-are-you-not-doing-it',
      search: '',
    },
  )

  deepStrictEqual(
    resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/insights/o-decizie-buna-incepe-inainte-sa-alegi',
    }),
    {
      hostname: 'bogdanvizitiu.com',
      pathname: '/en/insights/a-good-decision-starts-before-you-choose',
      search: '',
    },
  )
})

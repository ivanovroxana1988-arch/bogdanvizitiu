import { deepStrictEqual, equal } from 'node:assert/strict'
import { test } from 'node:test'
import { resolveCanonicalRedirect } from '../lib/redirects'
import { englishNavigationTarget } from '../lib/routes'

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

test('Romanian-only Sales Lab and corporate courses never send EN visitors to nonexistent pages', () => {
  equal(englishNavigationTarget('/sales-lab'), '/en/programs')
  equal(englishNavigationTarget('/cursuri/leadership-ai'), '/en/programs')
  equal(englishNavigationTarget('/cursuri/act-adapt-execute'), '/en/programs')
  equal(englishNavigationTarget('/coaching'), '/en/coaching')
  equal(englishNavigationTarget('/cursuri/arta-negocierii'), '/en/programs/negotiation-influence')
})

test('legacy registration and translated article URLs resolve to existing canonical routes', () => {
  for (const [pathname, expected] of [
    ['/register', '/en/register'],
    [
      '/en/insights/coaching-sau-consultanta-de-ce-ai-nevoie-de-fapt',
      '/en/insights/coaching-or-consulting-what-do-you-actually-need',
    ],
    [
      '/en/insights/de-ce-unele-conversatii-manageriale-schimba-lucrurile',
      '/en/insights/why-some-management-conversations-change-things',
    ],
  ]) {
    const target = resolveCanonicalRedirect({
      hostname: 'bogdanvizitiu.com',
      pathname,
      search: '?utm_source=test',
    })
    equal(target?.pathname, expected)
    equal(target?.search, '?utm_source=test')
    equal(resolveCanonicalRedirect({ hostname: 'bogdanvizitiu.com', pathname: expected }), null)
  }
})

test('language query for Romanian-only pages uses the existing English catalogue', () => {
  for (const pathname of ['/sales-lab', '/cursuri/leadership-ai', '/cursuri/act-adapt-execute']) {
    deepStrictEqual(
      resolveCanonicalRedirect({
        hostname: 'bogdanvizitiu.com',
        pathname,
        search: '?lang=en&utm_source=test',
      }),
      {
        hostname: 'bogdanvizitiu.com',
        pathname: '/en/programs',
        search: '?utm_source=test',
      },
    )
  }
})

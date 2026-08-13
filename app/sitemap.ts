import type { MetadataRoute } from 'next'
import { programSlugs, publishedInsightSlugs } from '@/lib/data'
import { localizePath } from '@/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bogdanvizitiu.com'
  const roRoutes = [
    '',
    '/despre',
    '/cursuri',
    '/coaching',
    '/coaching/executive-coaching',
    '/corporate',
    '/portofoliu',
    '/insights',
    '/resurse',
    '/contact',
    '/confidentialitate',
    '/termeni',
    ...programSlugs.map((slug) => `/cursuri/${slug}`),
    ...publishedInsightSlugs.map((slug) => `/insights/${slug}`),
  ]
  const normalizedRoRoutes = roRoutes.map((path) => path || '/')
  const routes = [
    ...normalizedRoRoutes,
    ...normalizedRoRoutes.map((path) => localizePath(path, 'en')),
  ]
  return Array.from(new Set(routes)).map((path) => ({ url: base + (path === '/' ? '' : path) }))
}

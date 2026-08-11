import type { MetadataRoute } from 'next'
import { getPublicProducts } from '@/lib/content/load-content'
import { canonicalOrigin, indexingApproved } from '@/lib/content/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingApproved || !canonicalOrigin) return []
  const routes = ['/', '/despre', '/cursuri', '/coaching', '/corporate', '/media', '/resurse', '/contact',
    '/en', '/en/about', '/en/courses', '/en/coaching', '/en/corporate', '/en/media', '/en/resources', '/en/contact',
    ...getPublicProducts('ro').map(({slug})=>`/cursuri/${slug}`),
    ...getPublicProducts('en').map(({slug})=>`/en/courses/${slug}`)]
  return routes.map((route)=>({url:`${canonicalOrigin}${route}`}))
}

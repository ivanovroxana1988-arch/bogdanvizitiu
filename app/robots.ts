import type { MetadataRoute } from 'next'
import { canonicalOrigin, indexingApproved } from '@/lib/content/metadata'
export default function robots(): MetadataRoute.Robots {
  if (!indexingApproved || !canonicalOrigin) return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${canonicalOrigin}/sitemap.xml` }
}

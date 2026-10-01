import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cursuri/leadership-teams', '/b2b-portfolio-2026', '/en/b2b-portfolio-2026'],
    },
    sitemap: 'https://bogdanvizitiu.com/sitemap.xml',
    host: 'https://bogdanvizitiu.com',
  }
}

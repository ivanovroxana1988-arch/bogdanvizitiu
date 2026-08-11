import type { MetadataRoute } from 'next'
import products from '@/content/products.json'
import { programs, insights } from '@/lib/data'

const base = 'https://bogdanvizitiu.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const english = ['', '/about', '/programs', '/coaching', '/corporate', '/insights', '/speaking', '/contact',
    ...programs.map(({ slug }) => `/programs/${slug}`),
    ...insights.map(({ slug }) => `/insights/${slug}`)]
  const romanian = ['/ro', '/ro/despre', '/ro/cursuri', '/ro/coaching', '/ro/corporate', '/ro/media', '/ro/resurse', '/ro/contact',
    ...products.map(({ slug }) => `/ro/cursuri/${slug}`)]

  return [...english, ...romanian].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }))
}

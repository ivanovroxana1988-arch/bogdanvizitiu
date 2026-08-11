import type {MetadataRoute} from 'next'
import {programSlugs,insightSlugs} from '@/lib/data'

export default function sitemap():MetadataRoute.Sitemap{
  const base='https://bogdanvizitiu.com'
  const routes=[
    '',
    '/about',
    '/programs',
    '/corporate',
    '/insights',
    '/speaking',
    '/contact',
    '/privacy',
    '/terms',
    ...programSlugs.map(slug=>`/programs/${slug}`),
    ...insightSlugs.map(slug=>`/insights/${slug}`),
  ]

  return routes.map(url=>({url:base+url,lastModified:new Date()}))
}

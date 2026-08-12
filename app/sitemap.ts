import type {MetadataRoute} from 'next'
import {programSlugs,publishedInsightSlugs} from '@/lib/data'

export default function sitemap():MetadataRoute.Sitemap{
  const base='https://bogdanvizitiu.com'
  const routes=[
    '',
    '/despre',
    '/cursuri',
    '/coaching',
    '/corporate',
    '/insights',
    '/resurse',
    '/contact',
    ...programSlugs.map(slug=>`/cursuri/${slug}`),
    ...publishedInsightSlugs.map(slug=>`/insights/${slug}`),
  ]

  return Array.from(new Set(routes)).map(url=>({url:base+url}))
}

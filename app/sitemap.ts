import type {MetadataRoute} from 'next'
import {programSlugs,publishedInsightSlugs} from '@/lib/data'
import {localizedUrl} from '@/lib/seo'

export default function sitemap():MetadataRoute.Sitemap{
  const routes=[
    '/',
    '/despre',
    '/cursuri',
    '/coaching',
    '/corporate',
    '/media',
    '/insights',
    '/resurse',
    '/contact',
    ...programSlugs.map(slug=>`/cursuri/${slug}`),
    ...publishedInsightSlugs.map(slug=>`/insights/${slug}`),
  ]

  return Array.from(new Set(routes)).flatMap(path=>{
    const languages={
      'ro-RO':localizedUrl(path,'ro'),
      'en':localizedUrl(path,'en'),
      'x-default':localizedUrl(path,'ro'),
    }

    return (['ro','en'] as const).map(locale=>({
      url:localizedUrl(path,locale),
      alternates:{languages},
    }))
  })
}

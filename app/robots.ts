import type {MetadataRoute} from 'next'

export default function robots():MetadataRoute.Robots{
  return {
    rules:{
      userAgent:'*',
      allow:'/',
      disallow:['/about','/programs','/speaking','/privacy','/terms','/cursuri/leadership-teams'],
    },
    sitemap:'https://bogdanvizitiu.com/sitemap.xml',
    host:'https://bogdanvizitiu.com',
  }
}

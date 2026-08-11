import type {MetadataRoute} from 'next';import {programs,insights} from '@/lib/data'
export default function sitemap():MetadataRoute.Sitemap{const base='https://bogdanvizitiu.ro';return ['', '/about','/programs','/corporate','/insights','/speaking','/contact',...programs.map(x=>`/programs/${x.slug}`),...insights.map(x=>`/insights/${x.slug}`)].map(url=>({url:base+url,lastModified:new Date()}))}

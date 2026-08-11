import type {Metadata} from 'next'
import type {Locale} from '@/lib/i18n'

export const SITE_URL='https://bogdanvizitiu.com'

export function localizedUrl(path:string,locale:Locale){
  return `${SITE_URL}${path}${locale==='en'?'?lang=en':''}`
}

export function buildPageMetadata({title,description,path,locale}:{title:string;description:string;path:string;locale:Locale}):Metadata{
  const canonical=localizedUrl(path,locale)
  return {
    title,
    description,
    alternates:{
      canonical,
      languages:{
        'ro-RO':`${SITE_URL}${path}`,
        'en':`${SITE_URL}${path}?lang=en`,
        'x-default':`${SITE_URL}${path}`,
      },
    },
    openGraph:{
      type:'website',
      title,
      description,
      url:canonical,
      siteName:'Bogdan Vizitiu',
      locale:locale==='ro'?'ro_RO':'en_GB',
    },
    twitter:{card:'summary_large_image',title,description},
  }
}

export function siteIdentityJsonLd(){
  return {
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'WebSite',
        '@id':`${SITE_URL}/#website`,
        url:SITE_URL,
        name:'Bogdan Vizitiu',
        inLanguage:['ro-RO','en'],
        publisher:{'@id':`${SITE_URL}/#person`},
      },
      {
        '@type':'Person',
        '@id':`${SITE_URL}/#person`,
        name:'Bogdan Vizitiu',
        url:`${SITE_URL}/despre`,
        image:`${SITE_URL}/images/bogdan/bogdan-hero.avif`,
        jobTitle:'Coach, trainer, antreprenor',
      },
    ],
  }
}

import type {Metadata} from 'next'
import {Manrope,DM_Serif_Display} from 'next/font/google'
import {Analytics} from '@vercel/analytics/next'
import '../globals.css'
import '../spacing.css'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {JsonLd} from '@/components/json-ld'
import {siteIdentityJsonLd} from '@/lib/seo'

const sans=Manrope({subsets:['latin'],variable:'--font-sans',display:'swap'})
const serif=DM_Serif_Display({subsets:['latin'],weight:'400',variable:'--font-serif',display:'swap'})
const googleSiteVerification=process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

export const metadata:Metadata={
  metadataBase:new URL('https://bogdanvizitiu.com'),
  title:{default:'Bogdan Vizitiu — Leadership, Negotiation, Professional Relationships',template:'%s — Bogdan Vizitiu'},
  description:'Practical ideas and learning experiences about leadership, negotiation, networking and professional performance.',
  openGraph:{title:'Bogdan Vizitiu',description:'Leadership. Negotiation. Relationships that matter.',siteName:'Bogdan Vizitiu',locale:'en_GB',type:'website'},
  twitter:{card:'summary_large_image',title:'Bogdan Vizitiu',description:'Leadership. Negotiation. Relationships that matter.'},
  verification:googleSiteVerification?{google:googleSiteVerification}:undefined,
}

export default function EnglishLayout({children}:{children:React.ReactNode}){
  return <html lang="en" className={`${sans.variable} ${serif.variable}`}><body><JsonLd data={siteIdentityJsonLd()}/><Header locale="en"/><main>{children}</main><Footer locale="en"/><Analytics/></body></html>
}

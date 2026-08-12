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
  title:{default:'Bogdan Vizitiu — Leadership, Negociere, Relații profesionale',template:'%s — Bogdan Vizitiu'},
  description:'Idei și experiențe practice de învățare despre leadership, negociere, networking și performanță profesională.',
  openGraph:{title:'Bogdan Vizitiu',description:'Leadership. Negociere. Relații care contează.',siteName:'Bogdan Vizitiu',locale:'ro_RO',type:'website'},
  twitter:{card:'summary_large_image',title:'Bogdan Vizitiu',description:'Leadership. Negociere. Relații care contează.'},
  verification:googleSiteVerification?{google:googleSiteVerification}:undefined,
}

export default function RomanianLayout({children}:{children:React.ReactNode}){
  return <html lang="ro" className={`${sans.variable} ${serif.variable}`}><body><JsonLd data={siteIdentityJsonLd()}/><Header locale="ro"/><main>{children}</main><Footer locale="ro"/><Analytics/></body></html>
}

import type {Metadata} from 'next'
import {Manrope,DM_Serif_Display} from 'next/font/google'
import './globals.css'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'

const sans=Manrope({subsets:['latin'],variable:'--font-sans',display:'swap'})
const serif=DM_Serif_Display({subsets:['latin'],weight:'400',variable:'--font-serif',display:'swap'})

export const metadata:Metadata={
  metadataBase:new URL('https://bogdanvizitiu.com'),
  title:{default:'Bogdan Vizitiu — Leadership, Negociere, Relații profesionale',template:'%s — Bogdan Vizitiu'},
  description:'Idei și experiențe practice de învățare despre leadership, negociere, networking și performanță profesională.',
  openGraph:{title:'Bogdan Vizitiu',description:'Leadership. Negociere. Relații care contează.',type:'website'},
  twitter:{card:'summary_large_image'}
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ro" className={`${sans.variable} ${serif.variable}`}><body><Header/><main>{children}</main><Footer/></body></html>
}

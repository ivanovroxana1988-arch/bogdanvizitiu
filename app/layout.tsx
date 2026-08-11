import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Manrope, DM_Serif_Display } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { indexingApproved } from '@/lib/content/metadata'
import './globals.css'

const sans=Manrope({subsets:['latin'],variable:'--font-sans',display:'swap'})
const serif=DM_Serif_Display({subsets:['latin'],weight:'400',variable:'--font-serif',display:'swap'})

export const metadata:Metadata={
  title:{default:'Bogdan Vizitiu',template:'%s — Bogdan Vizitiu'},
  robots:{index:indexingApproved,follow:indexingApproved},
}

export default function RootLayout({children}:{children:React.ReactNode}){
  const locale=headers().get('x-site-locale')==='en'?'en':'ro'
  return <html lang={locale} className={`${sans.variable} ${serif.variable}`}><body><Header/><main>{children}</main><Footer/></body></html>
}

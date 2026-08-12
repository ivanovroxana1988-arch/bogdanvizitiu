import {notFound} from 'next/navigation'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import {LocaleProvider} from '@/components/locale-context'
import type {Locale} from '@/lib/i18n'

function resolveLocale(value:string):Locale{
  if(value==='ro'||value==='en')return value
  notFound()
}

export default function LocalizedLayout({children,params}:{children:React.ReactNode;params:{locale:string;slug?:string[]}}){
  const locale=resolveLocale(params.locale)
  const pathname=params.slug?.length?`/${params.slug.join('/')}`:'/'

  return <LocaleProvider locale={locale}>
    <div lang={locale}>
      <Header locale={locale} pathname={pathname}/>
      <main>{children}</main>
      <Footer locale={locale}/>
    </div>
  </LocaleProvider>
}

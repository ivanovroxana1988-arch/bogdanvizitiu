import View, { generateMetadata as createMetadata } from '@/app/_views/contact/page'
type PageProps = {
  searchParams?: {
    workshop?: string
    source?: string
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
  }
}
export function generateMetadata() {
  return createMetadata({ searchParams: { lang: 'en' } })
}
export default function Page({ searchParams }: PageProps) {
  return <View searchParams={{ ...searchParams, lang: 'en' }} />
}

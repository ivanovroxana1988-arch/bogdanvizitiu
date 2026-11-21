import View, { generateMetadata as createMetadata } from '@/app/_views/inscriere/page'

type PageProps = {
  searchParams?: {
    course?: string
    source?: string
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
  }
}

export function generateMetadata({ searchParams }: PageProps) {
  return createMetadata({ searchParams: { ...searchParams, lang: 'en' } })
}

export default function Page({ searchParams }: PageProps) {
  return <View searchParams={{ ...searchParams, lang: 'en' }} />
}

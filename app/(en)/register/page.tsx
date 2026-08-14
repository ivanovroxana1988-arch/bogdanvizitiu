import View, { generateMetadata as createMetadata } from '@/app/_views/inscriere/page'

type PageProps = { searchParams?: { course?: string } }

export function generateMetadata({ searchParams }: PageProps) {
  return createMetadata({ searchParams: { lang: 'en', course: searchParams?.course } })
}

export default function Page({ searchParams }: PageProps) {
  return <View searchParams={{ lang: 'en', course: searchParams?.course }} />
}

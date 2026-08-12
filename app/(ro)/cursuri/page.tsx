import View, { generateMetadata as createMetadata } from '@/app/_views/cursuri/page'

type PageProps = { searchParams?: { categorie?: string } }

export function generateMetadata() {
  return createMetadata({ searchParams: { lang: 'ro' } })
}

export default function Page({ searchParams }: PageProps) {
  return <View searchParams={{ lang: 'ro', categorie: searchParams?.categorie }} />
}

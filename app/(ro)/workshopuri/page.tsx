import View, { generateMetadata as createMetadata } from '@/app/_views/workshops/page'

export function generateMetadata() {
  return createMetadata({ searchParams: { lang: 'ro' } })
}

export default function Page() {
  return <View searchParams={{ lang: 'ro' }} />
}

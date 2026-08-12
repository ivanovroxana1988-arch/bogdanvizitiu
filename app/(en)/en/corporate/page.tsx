import View, { generateMetadata as createMetadata } from '@/app/_views/corporate/page'
export function generateMetadata() {
  return createMetadata({ searchParams: { lang: 'en' } })
}
export default function Page() {
  return <View searchParams={{ lang: 'en' }} />
}

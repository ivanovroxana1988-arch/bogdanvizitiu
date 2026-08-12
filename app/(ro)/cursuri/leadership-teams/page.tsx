import type { Metadata } from 'next'
import View from '@/app/_views/cursuri/leadership-teams/page'
export const metadata: Metadata = {
  title: 'Leadership & Teams',
  robots: { index: false, follow: false },
}
export default function Page() {
  return <View searchParams={{ lang: 'ro' }} />
}

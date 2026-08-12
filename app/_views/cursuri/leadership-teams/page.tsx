import type { Metadata } from 'next'
import { PageHero } from '@/components/ui'
import servicePages from '@/content/service-pages.json'
import { getLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Leadership & Teams',
  robots: { index: false, follow: false },
}

export default function LeadershipDraft({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = servicePages[locale].leadershipDraft
  return <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
}

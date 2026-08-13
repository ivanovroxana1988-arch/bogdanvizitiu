import type { Metadata } from 'next'
import View, { generateMetadata as createMetadata } from '@/app/_views/insights/[slug]/page'
import { SITE_URL } from '@/lib/seo'

const slug = 'coaching-sau-consultanta-de-ce-ai-nevoie-de-fapt'
const image = '/images/bogdan/bogdan-coaching-consultanta.webp'

export function generateMetadata(): Metadata {
  const metadata = createMetadata({ params: { slug }, searchParams: { lang: 'ro' } })
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: `${SITE_URL}${image}`, alt: 'Bogdan Vizitiu' }],
    },
    twitter: {
      ...metadata.twitter,
      images: [`${SITE_URL}${image}`],
    },
  }
}

export default function Page() {
  return (
    <div className="coaching-consulting-insight">
      <style>{`
        .coaching-consulting-insight article > .editorial-image--event {
          display: none;
        }
        .coaching-consulting-insight article::before {
          content: '';
          display: block;
          width: min(100%, 680px);
          aspect-ratio: 4 / 5;
          margin: 0 auto 54px;
          background: url('${image}') center center / cover no-repeat;
        }
      `}</style>
      <View params={{ slug }} searchParams={{ lang: 'ro' }} />
    </div>
  )
}

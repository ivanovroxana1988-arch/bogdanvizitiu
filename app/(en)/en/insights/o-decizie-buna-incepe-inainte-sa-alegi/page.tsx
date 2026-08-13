import View, { generateMetadata as createMetadata } from '@/app/_views/insights/[slug]/page'

const slug = 'o-decizie-buna-incepe-inainte-sa-alegi'

export function generateMetadata() {
  return createMetadata({ params: { slug }, searchParams: { lang: 'en' } })
}

export default function Page() {
  return (
    <>
      <style>{`
        article > figure.editorial-image:first-child {
          background-image: url('/images/editorial/decision-bogdan-stairs.svg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        article > figure.editorial-image:first-child > img {
          opacity: 0 !important;
        }
      `}</style>
      <View params={{ slug }} searchParams={{ lang: 'en' }} />
    </>
  )
}

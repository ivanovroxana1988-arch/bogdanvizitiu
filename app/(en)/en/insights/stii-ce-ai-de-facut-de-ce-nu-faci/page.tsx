import View, { generateMetadata as createMetadata } from '@/app/_views/insights/[slug]/page'

const slug = 'stii-ce-ai-de-facut-de-ce-nu-faci'

export function generateMetadata() {
  return createMetadata({ params: { slug }, searchParams: { lang: 'en' } })
}

export default function Page() {
  return (
    <>
      <style>{`
        article > figure.editorial-image:first-child {
          background: center / cover no-repeat url('https://images.unsplash.com/photo-1743385779534-f53c018c21f5?auto=format&fit=crop&fm=jpg&q=82&w=1800');
        }
        article > figure.editorial-image:first-child > img { opacity: 0 !important; }
      `}</style>
      <View params={{ slug }} searchParams={{ lang: 'en' }} />
    </>
  )
}

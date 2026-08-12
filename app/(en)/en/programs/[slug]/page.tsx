import View, {
  generateMetadata as createMetadata,
  generateStaticParams as createParams,
} from '@/app/_views/cursuri/[slug]/page'
import { toEnglishProgramSlug, toRomanianProgramSlug } from '@/lib/routes'

export const dynamicParams = false
export function generateStaticParams() {
  return createParams().map(({ slug }) => ({ slug: toEnglishProgramSlug(slug) }))
}
function internalParams(params: { slug: string }) {
  return { slug: toRomanianProgramSlug(params.slug) }
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  return createMetadata({ params: internalParams(params), searchParams: { lang: 'en' } })
}
export default function Page({ params }: { params: { slug: string } }) {
  return <View params={internalParams(params)} searchParams={{ lang: 'en' }} />
}

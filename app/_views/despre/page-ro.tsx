import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { getLocale } from '@/lib/i18n'
import OriginalAbout, { generateMetadata } from './page'
import CredentialsSection from './credentials-section'

export { generateMetadata }

export default function AboutRomanian({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const original = OriginalAbout({ searchParams }) as ReactElement<{ children?: ReactNode }>
  const children = Children.toArray(original.props.children).map((child) => {
    if (isValidElement(child) && (child.props as { id?: string }).id === 'credentials') {
      return <CredentialsSection key="credentials-redesign" locale={locale} />
    }
    return child
  })

  return cloneElement(original, original.props, children)
}

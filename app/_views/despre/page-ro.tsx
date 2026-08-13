import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { getLocale } from '@/lib/i18n'
import aboutCopy from '@/content/about-copy.json'
import OriginalAbout, { generateMetadata } from './page'
import CredentialsSection from './credentials-section'
import ProfessionalJourney from './professional-journey'

export { generateMetadata }

export default function AboutRomanian({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = aboutCopy[locale]
  const original = OriginalAbout({ searchParams }) as ReactElement<{ children?: ReactNode }>
  const children = Children.toArray(original.props.children).map((child) => {
    if (!isValidElement(child)) return child

    const id = (child.props as { id?: string }).id

    if (id === 'professional-journey') {
      return (
        <ProfessionalJourney
          key="professional-journey-redesign"
          locale={locale}
          eyebrow={copy.careerEyebrow}
          title={copy.careerTitle}
        />
      )
    }

    if (id === 'credentials') {
      return <CredentialsSection key="credentials-redesign" locale={locale} />
    }

    if (id === 'entrepreneurship') return null

    return child
  })

  return cloneElement(original, original.props, children)
}

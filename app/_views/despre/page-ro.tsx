import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Eyebrow } from '@/components/ui'
import { getLocale } from '@/lib/i18n'
import aboutCopy from '@/content/about-copy.json'
import styles from '../commercial.module.css'
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

    if (id === 'beyond-roles') {
      return (
        <section className={styles.section} id="beyond-roles" key="beyond-roles-redesign">
          <div className="beyondRolesHeader">
            <Eyebrow>{copy.personalEyebrow}</Eyebrow>
            <h2 className={`${styles.sectionTitle} beyondRolesTitle`}>{copy.personalTitle}</h2>
          </div>

          <div className="beyondRolesBody">
            <img
              className="beyondRolesPhoto"
              src="/media/bogdan-board-game.webp?v=20260814-5"
              alt={locale === 'ro' ? 'Bogdan Vizitiu jucând un board game acasă' : 'Bogdan Vizitiu playing a board game at home'}
              width="190"
              height="238"
              loading="lazy"
              decoding="async"
            />

            <p className="beyondRolesText">{copy.personalText}</p>

            <img
              className="beyondRolesPhoto"
              src="/media/bogdan-cooking-omurice.webp?v=20260814-3"
              alt={locale === 'ro' ? 'Bogdan Vizitiu gătind în bucătărie' : 'Bogdan Vizitiu cooking in the kitchen'}
              width="190"
              height="238"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
      )
    }

    if (id === 'entrepreneurship') return null

    return child
  })

  return cloneElement(original, original.props, children)
}

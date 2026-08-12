import { PageHero } from '@/components/ui'
import business from '@/content/business.json'
import legalCopy from '@/content/legal-copy.json'
import { getLocale } from '@/lib/i18n'

export default function Terms({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams?.lang)
  const copy = legalCopy[locale].terms

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <section className="shell prose">
        <p>
          <strong>{locale === 'ro' ? 'Ultima actualizare' : 'Last updated'}:</strong> {copy.updated}
        </p>

        <div style={{ margin: '48px 0' }}>
          <h2>{locale === 'ro' ? 'Datele furnizorului' : 'Provider details'}</h2>
          <p>
            <strong>{business.legalName}</strong>
            <br />
            CUI / Tax ID: {business.taxId}
            <br />
            {locale === 'ro' ? 'Registrul Comerțului' : 'Trade Register'}: {business.tradeRegister}
            <br />
            EUID: {business.euid}
            <br />
            {business.registeredOffice}
            <br />
            {locale === 'ro' ? 'Statut TVA' : 'VAT status'}: {business.vatStatus[locale]}
            <br />
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <br />
            <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
          </p>
        </div>

        {copy.sections.map((section) => (
          <div key={section.title} style={{ margin: '52px 0' }}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets.length > 0 && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div style={{ margin: '52px 0' }}>
          <h2>{locale === 'ro' ? 'Contact' : 'Contact'}</h2>
          <p>
            {locale === 'ro'
              ? 'Pentru întrebări privind serviciile sau acești termeni'
              : 'For questions about the services or these terms'}
            : <a href={`mailto:${business.email}`}>{business.email}</a> ·{' '}
            <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>.
          </p>
        </div>
      </section>
    </>
  )
}

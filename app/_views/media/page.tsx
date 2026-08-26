import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLink, PageHero } from '@/components/ui'
import { EditorialImage } from '@/components/portrait'
import { getMediaAppearances } from '@/lib/data'
import servicePages from '@/content/service-pages.json'
import { getLocale } from '@/lib/i18n'
import { localizePath } from '@/lib/routes'
import { buildPageMetadata } from '@/lib/seo'

const isProduction = process.env.VERCEL_ENV === 'production'

export function generateMetadata({ searchParams }: { searchParams?: { lang?: string } }): Metadata {
  const locale = getLocale(searchParams?.lang)
  const copy = servicePages[locale].media
  return {
    ...buildPageMetadata({
      title: locale === 'ro' ? 'Media & apariții' : 'Media & appearances',
      description: copy.intro,
      path: '/media',
      locale,
    }),
    robots: { index: false, follow: false },
  }
}

export default function Media({ searchParams }: { searchParams?: { lang?: string } }) {
  if (isProduction) notFound()

  const locale = getLocale(searchParams?.lang)
  const copy = servicePages[locale].media
  const appearances = getMediaAppearances()
  const contactHref = `${localizePath('/contact', locale)}?source=media`

  return (
    <div className="conversion-page media-conversion-page">
      <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <section className="shell content-grid conversion-content-section">
        <EditorialImage asset="speaking" kind="event" locale={locale} />
        <div className="prose">
          <p>
            {locale === 'ro'
              ? 'Sursele externe sunt folosite ca dovadă și destinație. Fotografiile sau artwork-urile terților nu sunt copiate pe site fără permisiune.'
              : 'External sources are used as evidence and destinations. Third-party photography or artwork is not copied onto the site without permission.'}
          </p>
          <ArrowLink href={contactHref}>
            {locale === 'ro' ? 'Invită-l pe Bogdan la un eveniment' : 'Invite Bogdan to an event'}
          </ArrowLink>
        </div>
      </section>
      <section className="programs shell conversion-content-section">
        {appearances.map((item) => (
          <article className="program-row" key={item.id}>
            <h3>{item.title}</h3>
            <p>
              {item.type}
              {item.published_at ? ` · ${item.published_at}` : ''}
            </p>
            <ArrowLink href={item.external_url!}>
              {locale === 'ro' ? 'Vezi sursa' : 'View source'}
            </ArrowLink>
          </article>
        ))}
      </section>
      <section className="final-loop">
        <div className="shell final-grid">
          <h2>{copy.ctaTitle}</h2>
          <div>
            <ArrowLink href={contactHref}>{copy.cta}</ArrowLink>
          </div>
        </div>
      </section>
    </div>
  )
}

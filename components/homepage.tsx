import Link from 'next/link'
import { HeroPortrait, EditorialPortrait, InsightImage, SpeakingImage, WorkshopImage } from './editorial-image'
import { ArrowLink, Eyebrow } from './ui'
import type { PublicProduct } from '@/lib/content/load-content'
import type { Locale } from '@/lib/content/schemas'

const copy = {
  ro: {
    role: 'Coach · Trainer · Antreprenor · Facilitator',
    courses: 'Vezi cursurile', about: 'Despre Bogdan', areas: 'Domenii de lucru',
    point: 'Punct de vedere / 01', quote: 'Deciziile bune cer o gândire mai bună.',
    pointBody: 'Leadership · Negociere · Networking · Performanță profesională',
    programs: 'Cursuri deschise', corporateLabel: 'BGV / Corporate', corporate: 'Învățare construită în jurul realității.',
    corporateBody: 'Training și facilitare pentru organizații.', corporateLink: 'Pentru companii',
    notesLabel: 'Field notes / 01', notes: 'Idei de pus la lucru.', notesBody: 'Resursele aprobate vor fi publicate aici.', notesLink: 'Vezi resursele',
    speakingLabel: 'În sală / 01', speaking: 'Conversații care merită purtate.', speakingLink: 'Media',
    contact: 'Hai să discutăm.', contactBody: 'Cursuri · Coaching · Corporate', contactLink: 'Contact',
  },
  en: {
    role: 'Coach · Trainer · Entrepreneur · Facilitator',
    courses: 'View courses', about: 'About Bogdan', areas: 'Areas of work',
    point: 'Point of view / 01', quote: 'Good decisions require better thinking.',
    pointBody: 'Leadership · Negotiation · Networking · Professional performance',
    programs: 'Open courses', corporateLabel: 'BGV / Corporate', corporate: 'Learning built around reality.',
    corporateBody: 'Training and facilitation for organizations.', corporateLink: 'For organizations',
    notesLabel: 'Field notes / 01', notes: 'Ideas to put to work.', notesBody: 'Approved resources will be published here.', notesLink: 'View resources',
    speakingLabel: 'In the room / 01', speaking: 'Conversations worth having.', speakingLink: 'Media',
    contact: 'Let’s talk.', contactBody: 'Courses · Coaching · Corporate', contactLink: 'Contact',
  },
} as const

const areas = ['Leadership & Teams','Negotiation & Sales','Networking & Influence','Career & Personal Performance']

export function Homepage({ locale, products }: { locale: Locale; products: PublicProduct[] }) {
  const c = copy[locale]
  const path = (ro: string, en: string) => locale === 'ro' ? ro : `/en${en}`

  return <>
    <section className="hero hero--cover">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-meta"><span>BGV / 01</span><span>Bucharest / Romania</span></div>
          <Eyebrow>Bogdan Vizitiu</Eyebrow>
          <h1>Bogdan<br/>Vizitiu.</h1>
          <p className="lead">{c.role}</p>
          <div className="actions"><ArrowLink href={path('/cursuri','/courses')}>{c.courses}</ArrowLink><Link className="text-link" href={path('/despre','/about')}>{c.about}</Link></div>
          <p className="hero-footnote">Leadership / Strategy / Organizations</p>
        </div>
        <HeroPortrait />
      </div>
    </section>

    <section className="areas shell section-standard">
      <div className="section-index"><Eyebrow>{c.areas}</Eyebrow><span>BGV / Index 01—04</span></div>
      <div className="area-grid">{areas.map((area,index)=><article className="area" key={area}><span className="num">0{index+1}</span><h3>{area}</h3></article>)}</div>
    </section>

    <section className="position shell section-major">
      <div className="position-copy"><Eyebrow>{c.point}</Eyebrow><p className="quote">“{c.quote}”</p><p>{c.pointBody}</p><ArrowLink href={path('/despre','/about')}>{c.about}</ArrowLink></div>
      <EditorialPortrait />
    </section>

    {products.length > 0 && <section className="programs shell section-standard">
      <div className="section-head"><div><Eyebrow>BGV / 02</Eyebrow><h2 className="section-title">{c.programs}</h2></div></div>
      {products.map((product,index)=><article className="program-row" key={product.slug}><span>0{index+1}</span><h3>{product.title}</h3><p>{product.description}</p><ArrowLink href={`${path('/cursuri','/courses')}/${product.slug}`}>{product.cta}</ArrowLink></article>)}
    </section>}

    <section className="dark corporate-home section-major">
      <div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>{c.corporateLabel}</Eyebrow><h2>{c.corporate}</h2></div><div className="corporate-copy"><p>{c.corporateBody}</p><ArrowLink href={path('/corporate','/corporate')}>{c.corporateLink}</ArrowLink></div><WorkshopImage /></div>
    </section>

    <section className="insight-home shell section-major">
      <div className="insight-home__visual"><InsightImage /><span className="vertical-label">BGV / FIELD NOTES</span></div>
      <div className="insight-home__copy"><Eyebrow>{c.notesLabel}</Eyebrow><h2>{c.notes}</h2><p>{c.notesBody}</p><ArrowLink href={path('/resurse','/resources')}>{c.notesLink}</ArrowLink></div>
    </section>

    <section className="speaking-home shell section-standard">
      <SpeakingImage />
      <div className="speaking-home__copy"><Eyebrow>{c.speakingLabel}</Eyebrow><h2>{c.speaking}</h2><ArrowLink href={path('/media','/media')}>{c.speakingLink}</ArrowLink></div>
    </section>

    <section className="contact-band shell section-tight"><div className="contact-kicker">BGV / Contact</div><h2>{c.contact}</h2><div className="contact-bottom"><p>{c.contactBody}</p><ArrowLink href={path('/contact','/contact')}>{c.contactLink}</ArrowLink></div></section>
  </>
}

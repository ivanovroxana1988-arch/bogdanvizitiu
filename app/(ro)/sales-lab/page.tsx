import type { Metadata } from 'next'
import Image from 'next/image'
import { JsonLd } from '@/components/json-ld'
import { RegistrationForm } from '@/components/registration-form'
import { SalesLabCta } from '@/components/sales-lab-cta'
import { SalesLabBanner } from '@/components/sales-lab-promotion'
import { SalesLabPromoNote } from '@/components/sales-lab-promo-note'
import { SALES_LAB_PAGE_FLAGS } from '@/lib/sales-lab-analytics'
import business from '@/content/business.json'
import styles from './sales-lab.module.css'

const pageUrl = 'https://bogdanvizitiu.com/sales-lab'
const imageUrl = '/images/sales-lab/761c3d0c-2526-43a0-9779-31c2d4fbda90.png'

export const metadata: Metadata = {
  title: { absolute: 'Curs de vânzări și negociere București | Sales Lab' },
  description:
    'Curs de vânzări și negociere în București, 21–22 ianuarie 2027. Sales Lab: 16 ore de exerciții, simulări și feedback cu Bogdan Vizitiu. 15 locuri.',
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Sales Lab – Curs de vânzări și negociere în București',
    description:
      'Curs open de vânzări și negociere în București, 21–22 ianuarie 2027. 16 ore de exerciții și simulări. Preț standard: 600 EUR.',
    url: pageUrl,
    siteName: 'Bogdan Vizitiu',
    locale: 'ro_RO',
    images: [{ url: imageUrl, alt: 'Imagine de prezentare Sales Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curs de vânzări și negociere București – Sales Lab',
    description: '21–22 ianuarie 2027 · 16 ore · 15 participanți · 600 EUR',
    images: [imageUrl],
  },
}

const structuredData: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': pageUrl + '#webpage',
      url: pageUrl,
      name: 'Curs de vânzări și negociere București – Sales Lab',
      description:
        'Curs open de vânzări și negociere în București, cu exerciții aplicate și feedback.',
      inLanguage: 'ro-RO',
      isPartOf: { '@id': 'https://bogdanvizitiu.com/#website' },
      mainEntity: { '@id': pageUrl + '#course' },
      breadcrumb: { '@id': pageUrl + '#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': pageUrl + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://bogdanvizitiu.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Cursuri',
          item: 'https://bogdanvizitiu.com/cursuri',
        },
        { '@type': 'ListItem', position: 3, name: 'Sales Lab', item: pageUrl },
      ],
    },
    {
      '@type': 'Course',
      '@id': pageUrl + '#course',
      name: 'Sales Lab – Curs practic de vânzări și negociere',
      description:
        'Curs de vânzări și negociere în București, 21–22 ianuarie 2027. Două zile de exerciții, simulări de conversații comerciale și feedback.',
      url: pageUrl,
      image: 'https://bogdanvizitiu.com' + imageUrl,
      inLanguage: 'ro-RO',
      provider: {
        '@type': 'Organization',
        name: business.legalName,
        url: 'https://bogdanvizitiu.com/',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        name: 'Sales Lab – ediția București, ianuarie 2027',
        courseMode: 'onsite',
        startDate: '2027-01-21',
        endDate: '2027-01-22',
        location: {
          '@type': 'Place',
          name: 'București, România',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'București',
            addressCountry: 'RO',
          },
        },
        instructor: { '@id': 'https://bogdanvizitiu.com/#person' },
        offers: {
          '@type': 'Offer',
          url: pageUrl + '#inscriere',
          price: '600',
          priceCurrency: 'EUR',
          category: 'Curs în sală',
          availability: 'https://schema.org/LimitedAvailability',
        },
      },
    },
  ],
}

const benefits = [
  {
    label: '01',
    title: 'Întrebări mai bune, înaintea ofertei',
    text: 'Exersezi conversația de descoperire: nevoi, criterii de decizie, întrebări și ascultare.',
  },
  {
    label: '02',
    title: 'Valoare explicată, nu doar preț apărat',
    text: 'Lucrezi la felul în care conectezi propunerea de ceea ce contează cu adevărat pentru client.',
  },
  {
    label: '03',
    title: 'Obiecții și negociere fără reflexe automate',
    text: 'Testezi răspunsuri la ezitări, discuții despre preț și alternative, în scenarii practice.',
  },
  {
    label: '04',
    title: 'Un pas următor mai clar',
    text: 'Primești feedback pe simulări și conturezi acțiuni pe care le poți testa în conversațiile tale.',
  },
]

const agenda = [
  {
    day: 'Joi, 21 ianuarie',
    name: 'Înțelege înainte să propui.',
    summary: 'Decizia clientului · descoperire · argumentarea valorii · simulări',
    items: [
      'Cum cumpără clienții: încredere, risc, valoare și criterii de decizie',
      'Conversația de descoperire: întrebări, ascultare și nevoile reale',
      'De la nevoie la soluție: cum prezinți o propunere relevantă',
      'Exerciții și feedback pe situații comerciale',
    ],
  },
  {
    day: 'Vineri, 22 ianuarie',
    name: 'Transformă conversația în decizie.',
    summary: 'Obiecții · negociere · următorul pas · simularea finală',
    items: [
      'Gestionarea obiecțiilor despre preț, timp, încredere și ezitare',
      'Negociere și influență: opțiuni, concesii și acorduri sustenabile',
      'Cum stabilești următorul pas fără presiune inutilă',
      'Simulare finală, feedback și plan personal de acțiune',
    ],
  },
]

const faqs = [
  {
    question: 'Cui i se adresează Sales Lab?',
    answer:
      'Profesioniștilor în vânzări, antreprenorilor, consultanților și account managerilor care au conversații comerciale cu clienții. Poate fi util și companiilor care înscriu membri ai echipei.',
  },
  {
    question: 'Când și unde are loc cursul?',
    answer:
      '21–22 ianuarie 2027, în București. Adresa exactă a locației și detaliile logistice vor fi comunicate participanților înainte de confirmarea înscrierii.',
  },
  {
    question: 'Ce include prețul de 600 EUR?',
    answer:
      'Participarea la programul de două zile, cu exerciții, simulări și feedback în timpul cursului. 600 EUR este tariful standard; în perioada promoțională Early Bird pot exista locuri la 500 EUR, în limita primelor 5 locuri confirmate până la 30 noiembrie 2026. Tariful și detaliile de plată se confirmă individual înainte de rezervare.',
  },
  {
    question: 'Se rezervă automat locul după completarea formularului?',
    answer:
      'Nu. Formularul trimite o cerere de înscriere. Revenim pentru a confirma disponibilitatea și pașii necesari. Nu se percepe nicio plată prin acest formular.',
  },
  {
    question: 'Pot înscrie mai multe persoane din aceeași companie?',
    answer:
      'Da, poți indica numărul de locuri dorite în formular. Vom verifica disponibilitatea în limita celor 15 locuri ale ediției.',
  },
]

export default function SalesLabPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/json"
        data-flag-values
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SALES_LAB_PAGE_FLAGS).replace(/</g, '\\u003c'),
        }}
      />
      <JsonLd data={structuredData} />
      <div className="shell" style={{ paddingTop: '1.1rem' }}>
        <SalesLabBanner />
      </div>
      <nav className={styles.breadcrumb} aria-label="Navigare în ierarhia paginii">
        <div className="shell">
          <a href="/">Acasă</a>
          <span aria-hidden="true"> / </span>
          <a href="/cursuri">Cursuri</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Sales Lab</span>
        </div>
      </nav>
      <section className={styles.hero} aria-labelledby="sales-lab-title">
        <div className="shell">
          <p className={styles.eyebrow}>Curs open de vânzări · București · 21–22 ianuarie 2027</p>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="sales-lab-title">
                Sales <em>Lab.</em>
                <span>Curs practic de vânzări și negociere în București.</span>
              </h1>
              <p className={styles.lead}>Conversații mai bune. Decizii comerciale mai clare.</p>
              <p className={styles.intro}>
                Pe 21–22 ianuarie 2027, acest training de vânzări în sală aduce două zile de
                exerciții, simulări și feedback. Lucrezi pe descoperirea nevoilor clienților,
                obiecții, negociere și următorii pași ai vânzării.
              </p>
              <ul className={styles.facts} aria-label="Detalii rapide despre curs">
                <li>21–22 ianuarie 2027</li>
                <li>București</li>
                <li>16 ore · 15 locuri</li>
              </ul>
              <div className={styles.actions}>
                <SalesLabCta className={styles.primaryCta}>
                  Solicită înscrierea <span aria-hidden="true">↗</span>
                </SalesLabCta>
                <a className={styles.secondaryCta} href="#program">
                  Explorează programul <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className={styles.priceLine}>
                <strong>600 €</strong>
                <span>/ participant</span>
                <small>
                  Preț standard. Cererea nu implică plată sau rezervarea automată a locului.
                </small>
              </div>
              <SalesLabPromoNote className={styles.promoNote} />
            </div>
            <div className={styles.visual}>
              <div className={styles.photo}>
                <Image
                  src={imageUrl}
                  alt="Imagine de prezentare pentru programul practic Sales Lab"
                  fill
                  priority
                  sizes="(max-width: 850px) 100vw, 44vw"
                  className={styles.photoImage}
                />
              </div>
              <p className={styles.photoCaption}>Mai puțină prezentare. Mai multă practică.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="situatii-title">
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Recunoști situațiile?</p>
            <h2 id="situatii-title">
              Nu fiecare conversație dificilă se rezolvă cu un pitch mai bun.
            </h2>
          </div>
          <div className={styles.problemGrid}>
            <p>Clientul spune „mai discutăm” și nu știi care este de fapt blocajul.</p>
            <p>Ajungeți prea repede la preț, înainte să fie clară valoarea.</p>
            <p>Întâlnirea merge bine, dar următorul pas rămâne ambiguu.</p>
          </div>
          <p className={styles.sectionClosing}>
            În Sales Lab lucrăm exact pe tipul acesta de situații: le desfacem, le exersăm și căutăm
            alternative mai utile decât răspunsurile automate.
          </p>
        </div>
      </section>

      <section className={styles.blueSection} aria-labelledby="beneficii-title">
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Ce vei exersa</p>
            <h2 id="beneficii-title">Nu pleci doar cu idei. Pleci cu conversații lucrate.</h2>
          </div>
          <div className={styles.benefits}>
            {benefits.map((benefit) => (
              <div className={styles.benefit} key={benefit.label}>
                <span>{benefit.label}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
          <SalesLabCta className={styles.textCta}>
            Vreau să particip <span aria-hidden="true">↗</span>
          </SalesLabCta>
        </div>
      </section>

      <section className={styles.section} id="program" aria-labelledby="program-title">
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Structura programului</p>
            <h2 id="program-title">Două zile. Un laborator de vânzări.</h2>
          </div>
          <div className={styles.agenda}>
            {agenda.map((day) => (
              <details className={styles.day} key={day.day}>
                <summary>
                  <span className={styles.dayDate}>{day.day}</span>
                  <span className={styles.dayTitle}>{day.name}</span>
                  <span className={styles.daySummary}>{day.summary}</span>
                  <span className={styles.expand} aria-hidden="true">
                    +
                  </span>
                </summary>
                <ul>
                  {day.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <p className={styles.note}>
            Agenda este orientativă și poate fi ajustată în funcție de dinamica grupului. Programul
            cuprinde două zile de câte 8 ore, inclusiv pauze.
          </p>
          <div className={styles.seoExplainer}>
            <h3>Ce faci concret în acest curs de vânzări?</h3>
            <p>
              Exersezi întrebări de descoperire, prezinți valoarea unei soluții, gestionezi obiecții
              despre preț și simulezi negocieri. Fiecare exercițiu pornește de la situații
              comerciale întâlnite în lucrul cu clienții, cu feedback și idei de aplicat după curs.
            </p>
            <p>
              Sales Lab se desfășoară față în față, în București, pentru un grup de maximum 15
              participanți. Dacă te interesează și alte teme, poți explora{' '}
              <a href="/cursuri">cursurile și programele viitoare</a>.
            </p>
            <p>
              Dacă vrei să aprofundezi tema, citește și articolul despre{' '}
              <a href="/insights/negocierea-nu-este-doar-despre-argumente">
                cum funcționează emoțiile în negociere
              </a>{' '}
              sau explorează{' '}
              <a href="/cursuri/arta-negocierii">programul Negotiation &amp; Influence</a>.
            </p>
            <p>
              Mai multe despre ascultarea în conversațiile comerciale în articolul{' '}
              <a href="/insights/cat-valoreaza-sa-te-simti-ascultat">
                Cât valorează să te simți ascultat?
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.trainerSection} aria-labelledby="trainer-title">
        <div className="shell">
          <div className={styles.trainerGrid}>
            <div>
              <p className={styles.eyebrow}>Cine facilitează</p>
              <h2 id="trainer-title">Bogdan Vizitiu.</h2>
              <p className={styles.trainerLead}>
                Trainer, consultant și coach, cu experiență în vânzări, management comercial și
                dezvoltarea oamenilor.
              </p>
              <p className={styles.credibilityNote}>
                Lucrezi cu un facilitator care aduce în sală experiența din roluri comerciale,
                management și proiecte de dezvoltare profesională. Accentul este pus pe exerciții
                aplicate și feedback în sală.
              </p>
            </div>
            <div>
              <p>
                Parcursul său include roluri comerciale și de management la Orange România, precum
                și proiecte de training și consultanță la Trend Consult. Lucrează cu situații reale,
                conversații și comportamente care pot fi testate în practică.
              </p>
              <a className={styles.textCta} href="/despre">
                Descoperă experiența lui Bogdan <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="detalii-title">
        <div className="shell">
          <div className={styles.detailsGrid}>
            <div>
              <p className={styles.eyebrow}>Informații utile</p>
              <h2 id="detalii-title">Detaliile care contează.</h2>
              <div className={styles.logistics}>
                <p>
                  <strong>Perioadă:</strong> 21–22 ianuarie 2027
                </p>
                <p>
                  <strong>Oraș:</strong> București; locația exactă va fi comunicată ulterior
                </p>
                <p>
                  <strong>Format:</strong> în sală, două zile · 16 ore
                </p>
                <p>
                  <strong>Grup:</strong> maximum 15 participanți
                </p>
                <p>
                  <strong>Investiție:</strong> 600 EUR / participant (preț standard)
                </p>
                <SalesLabPromoNote className={styles.promoNote} />
              </div>
            </div>
            <div>
              <p className={styles.eyebrow}>Întrebări frecvente</p>
              <div className={styles.faqs}>
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>
                      {faq.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.signup} id="inscriere" aria-labelledby="inscriere-title">
        <div className="shell">
          <div className={styles.signupGrid}>
            <div>
              <p className={styles.eyebrow}>Solicită înscrierea</p>
              <h2 id="inscriere-title">Locul tău la masă.</h2>
              <p className={styles.signupLead}>
                21–22 ianuarie 2027 · București · 600 EUR / participant (tarif standard).
              </p>
              <SalesLabPromoNote className={styles.promoNote} />
              <p>
                Completează formularul și revenim pentru confirmarea disponibilității, detaliile de
                plată și informațiile logistice. Nu se face plată pe această pagină.
              </p>
              <p className={styles.groupNote}>
                Înscrii colegi din aceeași organizație? Poți solicita mai multe locuri direct în
                formular.
              </p>
            </div>
            <div className={styles.formPanel}>
              <h3>Cerere de înscriere</h3>
              <RegistrationForm
                locale="ro"
                courseSlug="sales-lab"
                courseTitle="Sales Lab – 21–22 ianuarie 2027"
                tracking={{ source: 'sales-lab-landing' }}
                submitLabel="Trimite cererea de înscriere"
                successMessage="Cererea a fost trimisă. Revenim pentru confirmarea disponibilității și pașii de înscriere. Locul nu este încă rezervat."
              />
            </div>
          </div>
        </div>
      </section>
      <SalesLabCta className={styles.mobileCta}>
        Solicită înscrierea <span aria-hidden="true">↗</span>
      </SalesLabCta>
    </div>
  )
}

import type { Metadata } from 'next'
import styles from './sales-lab.module.css'

export const metadata: Metadata = {
  title: 'Sales Lab — previzualizare privată',
  robots: { index: false, follow: false, nocache: true },
}

const dayOne = [
  ['09:00–10:30', 'Cum ia clientul decizia', 'Procesul de cumpărare, încredere și valoare.'],
  ['10:45–12:30', 'Conversația de descoperire', 'Întrebări bune, ascultare și nevoi reale.'],
  ['13:30–15:00', 'De la nevoie la soluție', 'Argumentarea valorii, nu doar prezentarea produsului.'],
  ['15:15–17:00', 'Exerciții și feedback', 'Simulări de conversații și observații individuale.'],
]
const dayTwo = [
  ['09:00–10:30', 'Obiecțiile ca informație', 'Preț, timp, încredere și ezitare.'],
  ['10:45–12:30', 'Negociere și influență', 'Opțiuni, concesii și acorduri sustenabile.'],
  ['13:30–15:00', 'Decizia și următorul pas', 'Închiderea conversației fără presiune inutilă.'],
  ['15:15–17:00', 'Sales Lab: simularea finală', 'Scenarii practice, feedback și plan personal de acțiune.'],
]

export default function SalesLabPreview() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="shell">
          <p className="eyebrow">Program open · București · Decembrie 2026</p>
          <div className={styles.heroGrid}>
            <div>
              <h1>Sales<br /><em>Lab.</em></h1>
              <p className={styles.subtitle}>Conversații care construiesc încredere. Vânzări care au sens.</p>
            </div>
            <div className={styles.intro}>
              <p>Un program intensiv de două zile pentru oamenii care vând, negociază și construiesc relații cu clienții.</p>
              <a href="#program" className="arrow-link">Descoperă programul <span>↗</span></a>
              <div className={styles.facts}><span>02 zile</span><span>16 ore</span><span>15 participanți</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="shell">
          <p className="eyebrow">Despre experiență</p>
          <div className={styles.split}>
            <h2>Mai puțină teorie.<br />Mai multă practică.</h2>
            <div className={styles.prose}>
              <p>Vânzarea nu începe cu un pitch. Începe cu felul în care înțelegi omul din fața ta, întrebările pe care le pui și capacitatea de a construi o conversație relevantă.</p>
              <p>Sales Lab aduce împreună concepte aplicabile, exerciții, simulări și feedback. Lucrăm pe situații întâlnite în relația cu clienții, nu pe scenarii ideale.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="program">
        <div className="shell">
          <p className="eyebrow">Structura programului</p>
          <h2 className={styles.bigTitle}>Două zile.<br />Un alt mod de a vinde.</h2>
          {[{label:'01 / Ziua întâi',title:'Înțelege înainte să propui.',items:dayOne},{label:'02 / Ziua a doua',title:'Transformă conversația în decizie.',items:dayTwo}].map(day=>(
            <div className={styles.day} key={day.label}>
              <div><span className={styles.dayLabel}>{day.label}</span><h3>{day.title}</h3></div>
              <div>{day.items.map(([time,title,description])=>(
                <div className={styles.session} key={time}><span>{time}</span><div><strong>{title}</strong><p>{description}</p></div></div>
              ))}</div>
            </div>
          ))}
          <p className={styles.note}>Agendă orientativă, supusă validării cu trainerul. Intervalele includ pauze; durata totală este de 8 ore pe zi.</p>
        </div>
      </section>

      <section className={styles.blueSection}>
        <div className="shell">
          <p className="eyebrow">Pentru cine</p>
          <div className={styles.split}>
            <h2>Pentru cei care vor să vândă mai bine, nu doar mai mult.</h2>
            <div className={styles.prose}><p>Profesioniști în vânzări, antreprenori, consultanți, account manageri și oameni care au conversații comerciale importante.</p><p>Vei exersa descoperirea nevoilor, prezentarea valorii, gestionarea obiecțiilor, negocierea și pașii de după întâlnire.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="shell">
          <p className="eyebrow">Facilitator</p>
          <div className={styles.split}><h2>Bogdan<br />Vizitiu.</h2><div className={styles.prose}><p>Un cadru de învățare bazat pe dialog, practică și reflecție. În cele două zile, Bogdan facilitează exercițiile și oferă feedback pe situațiile aduse de participanți.</p><p>Detaliile biografice și experiența relevantă vor fi preluate din profilul aprobat de pe site.</p></div></div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className="shell">
          <p className="eyebrow">Ediție în pregătire</p>
          <div className={styles.split}><h2>Locul tău<br />la masă.</h2><div className={styles.prose}><p><strong>15 locuri · 600 € / participant</strong></p><p>București, mijlocul lunii decembrie 2026. Data exactă, locația și condițiile de înscriere vor fi confirmate înainte de lansarea publică.</p><p className={styles.note}>Aceasta este o previzualizare privată. Nu se fac înscrieri și nu se colectează plăți.</p></div></div>
        </div>
      </section>
    </div>
  )
}

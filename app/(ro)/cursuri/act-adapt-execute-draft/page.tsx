import type { Metadata } from 'next'
import styles from '@/app/commercial.module.css'
import { EditorialImage } from '@/components/portrait'
import { ArrowLink, Eyebrow } from '@/components/ui'
import visual from './page.module.css'

export const metadata: Metadata = {
  title: 'ACT · ADAPT · EXECUTE — program draft',
  description:
    'Program experiențial de dezvoltare inspirat de ideile lui Adam Grant: acțiune, adaptare, execuție și transfer în munca reală.',
  robots: { index: false, follow: false },
}

type Move = {
  index: string
  label: string
  glyph: string
  title: string
  text: string
}

const heroLead =
  'Performanța de azi este doar o fotografie. Programul lucrează cu ceea ce produce traiectoria de mâine: cum începi, cum îți schimbi strategia și cum transformi intenția în comportament.'
const heroTransfer =
  'Șase zile construite în jurul aceleiași probleme profesionale reale, cu experimente între sesiuni, feedback, rethinking și transfer urmărit la 30 și 90 de zile.'

const challenges = [
  'Confundăm ușor nivelul actual de performanță cu limita de dezvoltare a unei persoane.',
  'Așteptăm informație, certitudine sau permisiune chiar și atunci când există deja un prim pas util sub controlul nostru.',
  'Premiem perseverența fără să verificăm dacă strategia mai produce progres sau doar consumă resurse.',
  'Cerem mai multă disciplină acolo unde problema reală este un obiectiv vag, lipsa unui cue sau prea multă fricțiune.',
  'Judecăm potențialul individual fără să vedem cât de diferit sunt distribuite oportunitățile, feedback-ul și suportul.',
]

const moves: Move[] = [
  {
    index: '01',
    label: 'ACT',
    glyph: '→',
    title: 'De la așteptare la primul pas util',
    text: 'Observă problema sau oportunitatea, alege ce merită energia, inițiază cea mai mică acțiune aflată sub control și caută advice pentru următoarea încercare.',
  },
  {
    index: '02',
    label: 'ADAPT',
    glyph: '↻',
    title: 'De la perseverență automată la rethinking',
    text: 'Învață să separi obiectivul de metodă și să construiești criterii explicite pentru PERSIST, CHANGE sau STOP atunci când realitatea nu cooperează.',
  },
  {
    index: '03',
    label: 'EXECUTE',
    glyph: '✓',
    title: 'De la intenție la arhitectura comportamentului',
    text: 'Clarifică acțiunea, leag-o de un cue, proiectează fricțiunea, urmărește puține semnale utile și stabilește dinainte ce vei schimba dacă planul nu funcționează.',
  },
]

const journey = [
  {
    index: '01',
    title: 'Hidden Potential',
    text: 'Separăm fotografia performanței actuale de traiectoria de dezvoltare și formulăm un behavioral gap observabil, nu o etichetă despre persoană.',
  },
  {
    index: '02',
    title: 'ACT',
    text: 'Identificăm unde așteptăm inutil și construim un Field Experiment care poate fi inițiat imediat, cu value, control, timing și un cue clar.',
  },
  {
    index: '03',
    title: 'ADAPT',
    text: 'Lucrăm cu feedback mixt, sunk cost și rethinking pentru a construi o regulă explicită de PERSIST / CHANGE / STOP.',
  },
  {
    index: '04',
    title: 'EXECUTE',
    text: 'Transformăm intenția într-un Execution Plan cu comportament, cue, coping plan, friction design, indicatori și regulă de ajustare.',
  },
  {
    index: '05',
    title: 'Social Potential',
    text: 'Mutăm lupa de la individ la sistem: scaffolding, support network, challenge network și opportunity network. Potențialul nu se dezvoltă în vid.',
  },
  {
    index: '06',
    title: 'Integrate & Transfer',
    text: 'Stress-testăm întregul sistem și plecăm cu un Learning Operating System, un Personal Learning Contract și un experiment urmărit la 30/90 de zile.',
  },
]

const outcomes = [
  'Să formuleze o problemă de dezvoltare ca behavioral gap observabil, nu ca trăsătură de personalitate.',
  'Să identifice cel mai mic pas util aflat sub control și să îl transforme într-un experiment real.',
  'Să ceară advice orientat spre următoarea încercare, nu doar verdict asupra performanței trecute.',
  'Să decidă mai explicit când merită să persiste, când să schimbe strategia și când să oprească.',
  'Să transforme o intenție vagă într-un comportament cu cue, context, fallback și dovadă observabilă.',
  'Să proiecteze mediul și fricțiunea astfel încât execuția să depindă mai puțin de eroismul de moment.',
  'Să construiască relații și oportunități care susțin, provoacă și accelerează dezvoltarea.',
  'Să urmărească transferul prin comportament, feedback și reguli de rethinking la 30 și 90 de zile.',
]

const copy = {
  problemTitle: 'Dezvoltarea se blochează rar dintr-un singur motiv.',
  visualTitle: 'Nu vii cu o dorință de „a învăța ceva”. Vii cu o problemă reală.',
  visualText:
    'Aceeași situație profesională este purtată prin toate cele șase zile. Participantul o diagnostichează, o testează, îi schimbă strategia, îi proiectează execuția și revine cu evidence din realitate. Așa evităm colecția clasică de insight-uri excelente care dispar până luni dimineață.',
  movesTitle: 'Trei întrebări care organizează blocajul.',
  movesIntro:
    'ACT–ADAPT–EXECUTE nu este un test de personalitate și nici o împărțire a oamenilor în tipologii. Este o sinteză de design pentru program: unde se rupe comportamentul și ce tip de intervenție merită testată?',
  learningTitle: 'Experiența vine înaintea explicației.',
  learningText:
    'Fiecare buclă urmează aceeași disciplină: EXPERIENCE → DISCOVER → EXPLAIN → PRACTICE → CHALLENGE → EMBED. Participantul întâlnește problema înainte să primească vocabularul, apoi exersează, este scos din zona de confort și mută ideea într-un context real de muncă.',
  flowTitle: 'Un singur challenge. Șase reconstrucții succesive.',
  flowIntro:
    'Programul nu schimbă cazul la fiecare exercițiu doar pentru a produce noutate. Lucrează cumulativ. Fiecare zi modifică aceeași problemă și lasă un output care poate fi inspectat, contestat și îmbunătățit.',
  outcomesTitle: 'Ce ar trebui să poată face diferit participantul.',
  outcomesIntro:
    'Nu măsurăm satisfacția drept competență. Căutăm decizii, reguli, planuri și experimente suficient de concrete încât cineva să poată vedea dacă s-au întâmplat sau nu.',
  principleTitle: 'Scopul nu este să devii mai motivat. Este să devii mai bun la a deveni mai bun.',
  principleText:
    'Programul folosește ideile din Hidden Potential, Think Again, Originals și Give and Take drept backbone conceptual, împreună cu mecanisme de planning, monitoring, feedback și self-regulation. ACT–ADAPT–EXECUTE este sinteza programului, nu un model cauzal integrat atribuit sau validat de Adam Grant.',
  fitTitle: 'Pentru oameni care au deja muncă reală de schimbat.',
  fitText:
    'Manageri, profesioniști și echipe care vor să transforme dezvoltarea din intenție în comportament: să inițieze mai bine, să rethink-uiască la timp, să execute mai inteligent și să creeze condiții în care oamenii pot crește.',
  notTitle: 'Nu este motivational speaking și nici un rezumat de carte.',
  notText:
    'Nu promite schimbare permanentă de personalitate, „mai mult grit”, un mușchi al voinței sau formarea unui obicei în 21/30/90 de zile. Ideile sunt folosite ca punct de plecare pentru practică, decizie și transfer observabil.',
  ctaTitle: 'Un program de dezvoltare care continuă și după ultimul slide.',
}

export default function ActAdaptExecuteDraftPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Eyebrow>Program experiențial · inspirat de Adam Grant</Eyebrow>
        <div className={styles.heroGrid}>
          <h1 className={visual.aaeTitle}>ACT · ADAPT · EXECUTE</h1>
          <div className={visual.heroCopy}>
            <p className={styles.heroIntro}>{heroLead}</p>
            <p className={styles.heroIntro}>{heroTransfer}</p>
          </div>
        </div>
      </section>

      <section className={styles.diagnostic}>
        <div className={styles.diagnosticInner}>
          <div>
            <Eyebrow>De ce acum</Eyebrow>
            <h2 className={styles.statementSmall}>{copy.problemTitle}</h2>
          </div>
          <ul className={styles.diagnosticList}>
            {challenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={visual.visualSection}>
        <div className={visual.visualGrid}>
          <EditorialImage
            asset="workshop"
            kind="event"
            locale="ro"
            className={visual.visualImage}
          />
          <div className={visual.visualCopy}>
            <div>
              <Eyebrow>Real work challenge</Eyebrow>
              <h2>{copy.visualTitle}</h2>
            </div>
            <p>{copy.visualText}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>Modelul programului</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.movesTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.movesIntro}</p>
        </div>

        <div className={visual.iconGrid}>
          {moves.map((item) => (
            <article className={visual.iconCard} key={`${item.label}-icon`}>
              <div className={visual.iconWrap} aria-hidden="true">
                {item.glyph}
              </div>
              <span>{item.index}</span>
              <h3>{item.label}</h3>
            </article>
          ))}
        </div>

        <div className={styles.threeGrid}>
          {moves.map((item) => (
            <article className={styles.editorialCard} key={item.title}>
              <span className={styles.cardIndex}>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.practice}>
        <div className={styles.practiceInner}>
          <div>
            <Eyebrow>Experience first</Eyebrow>
          </div>
          <div>
            <h2 className={styles.statementSmall}>{copy.learningTitle}</h2>
            <p>{copy.learningText}</p>
            <div className={visual.learningLoop} aria-label="Secvența de învățare">
              <span>Experience</span>
              <span>Discover</span>
              <span>Explain</span>
              <span>Practice</span>
              <span>Challenge</span>
              <span>Embed</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>Learning journey</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.flowTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.flowIntro}</p>
        </div>

        <div className={styles.processList}>
          {journey.map((item) => (
            <article className={styles.processRow} key={item.title}>
              <span className={styles.listIndex}>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>La final</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.outcomesTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.outcomesIntro}</p>
        </div>

        <ul className={styles.outcomeList}>
          {outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={visual.transferBand}>
        <div className={visual.transferInner}>
          <div>
            <Eyebrow>Transfer</Eyebrow>
            <h2>Trainingul se termină. Experimentul continuă.</h2>
          </div>
          <div className={visual.transferSteps}>
            <article>
              <span>D+2</span>
              <strong>Retrieval</strong>
              <p>3 idei din memorie + primul experiment.</p>
            </article>
            <article>
              <span>D+14</span>
              <strong>Peer challenge</strong>
              <p>Ce ai testat, schimbat și ce te-a blocat?</p>
            </article>
            <article>
              <span>D+30</span>
              <strong>Behavior check</strong>
              <p>Compară semnalul cu baseline-ul: păstrează, schimbă sau oprește.</p>
            </article>
            <article>
              <span>D+90</span>
              <strong>Transfer review</strong>
              <p>Ce a devenit rutină și ce trebuie schimbat în sistem?</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.proof}>
        <div className={styles.proofInner}>
          <div>
            <Eyebrow>Principiul programului</Eyebrow>
          </div>
          <article className={styles.proofCard}>
            <h3>{copy.principleTitle}</h3>
            <p>{copy.principleText}</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.fitGrid}>
          <article className={styles.fitBlock}>
            <Eyebrow>Pentru cine</Eyebrow>
            <h3>{copy.fitTitle}</h3>
            <p>{copy.fitText}</p>
          </article>
          <article className={styles.fitBlock}>
            <Eyebrow>Ce nu este</Eyebrow>
            <h3>{copy.notTitle}</h3>
            <p>{copy.notText}</p>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <Eyebrow>Program corporate · 6 zile</Eyebrow>
        <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
        <ArrowLink href="/contact">Discută despre o versiune pentru echipa ta</ArrowLink>
      </section>
    </div>
  )
}

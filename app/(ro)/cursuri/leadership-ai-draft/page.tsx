import type { Metadata } from 'next'
import styles from '@/app/commercial.module.css'
import { ArrowLink, Eyebrow } from '@/components/ui'
import visual from './page.module.css'

export const metadata: Metadata = {
  title: 'Leadership in the AI Era — program pentru manageri',
  description:
    'Parcurs de învățare pentru manageri despre judecată managerială, delegare human–AI, autonomie, responsabilitate și dezvoltarea oamenilor în munca asistată de AI.',
  robots: { index: false, follow: false },
}

type IconType = 'decision' | 'handoff' | 'target' | 'learning'

const iconClasses: Record<IconType, string> = {
  decision: visual.iconDecision,
  handoff: visual.iconHandoff,
  target: visual.iconTarget,
  learning: visual.iconLearning,
}

const heroLead =
  'AI schimbă cine face munca. Leadership-ul trebuie să clarifice cine gândește, cine decide și cine răspunde.'
const heroTransfer =
  'Un parcurs de învățare întins pe mai multe săptămâni, construit în jurul muncii reale a managerilor: ce delegăm AI-ului, ce verificăm, unde păstrăm decizia umană și cum protejăm dezvoltarea oamenilor.'

const challenges = [
  'AI a intrat deja în munca echipei, dar regulile de utilizare sunt încă implicite.',
  'Oamenii produc mai repede, însă nu este întotdeauna clar cine verifică și cine răspunde pentru rezultat.',
  'Managerii oscilează între supraîncredere în AI și control excesiv.',
  'Organizația vrea adopție, dar nu vrea să cumpere productivitate cu prețul judecății profesionale și al dezvoltării oamenilor.',
]

const shifts: Array<{
  index: string
  icon: IconType
  label: string
  title: string
  text: string
}> = [
  {
    index: '01',
    icon: 'decision',
    label: 'Judecată managerială',
    title: 'De la „poate AI să facă asta?” la „ar trebui să o facă?”',
    text: 'Capabilitatea tehnică nu rezolvă întrebarea managerială. Participanții învață să decidă ce merită delegat, în ce condiții și cu ce nivel de verificare.',
  },
  {
    index: '02',
    icon: 'handoff',
    label: 'Delegare hibridă',
    title: 'De la delegare către oameni la designul muncii human–AI',
    text: 'Munca nu mai circulă doar între manager și angajat. Liderul trebuie să configureze inteligent contribuția oamenilor, AI-ului și automatizărilor.',
  },
  {
    index: '03',
    icon: 'target',
    label: 'Autonomie & responsabilitate',
    title: 'De la control la autonomie cu limite clare',
    text: 'Autonomia devine utilă doar atunci când este clar cine poate decide, ce trebuie verificat, când intervenim și cine răspunde pentru rezultat.',
  },
  {
    index: '04',
    icon: 'learning',
    label: 'Capacitate & învățare',
    title: 'De la rezultat mai rapid la oameni mai capabili',
    text: 'Productivitatea imediată contează, dar nu este suficientă. Programul păstrează în centru judecata, învățarea și capacitatea oamenilor de a explica și verifica rezultatele.',
  },
]

const journey = [
  {
    index: '01',
    title: 'Pornim din munca reală',
    text: 'Participanții aleg fluxuri de lucru, decizii și situații manageriale pe care le întâlnesc deja. Programul nu începe cu o demonstrație de instrument.',
  },
  {
    index: '02',
    title: 'Construim judecată și delegare hibridă',
    text: 'Prin cazuri, simulări și lucru aplicat, participanții exersează decizii despre ce rămâne uman, ce poate fi asistat de AI și unde este nevoie de verificare sau escaladare.',
  },
  {
    index: '03',
    title: 'Mutăm învățarea în rol',
    text: 'Fiecare participant testează o schimbare concretă în propriul context de lucru, cu un punct de plecare și semnale clare că abordarea trebuie ajustată.',
  },
  {
    index: '04',
    title: 'Revenim cu rezultate din practică, nu cu impresii',
    text: 'Experiența din muncă este analizată, comparată și recalibrată. Ce a funcționat se păstrează, ce nu a funcționat se modifică sau se oprește.',
  },
  {
    index: '05',
    title: 'Transformăm practica în norme de echipă',
    text: 'Învățarea individuală este tradusă în reguli simple de lucru: cine decide, ce verificăm, când intervenim și cum protejăm atât calitatea, cât și dezvoltarea oamenilor.',
  },
]

const outcomes = [
  'Să decidă ce merită delegat AI-ului, ce rămâne uman și unde este nevoie de verificare.',
  'Să distingă un răspuns fluent de unul suficient de bine susținut și să calibreze încrederea în rezultat.',
  'Să stabilească autonomia, cine decide, ce verificăm și când intervenim, proporțional cu riscul.',
  'Să păstreze responsabilitatea managerială când execuția este împărțită între oameni și AI.',
  'Să transforme practica individuală în reguli comune de lucru pentru echipă.',
]

const organizationOutcomes = [
  'O logică comună pentru ce delegăm oamenilor, AI-ului sau unei combinații între ele.',
  'Reguli clare pentru verificare, intervenție și escaladare.',
  'Principii comune de autonomie și responsabilitate.',
  'Experimente aplicate pe situații reale de muncă, nu doar exemple de training.',
  'Un mod de lucru pe care echipa îl poate continua și după program.',
]

const copy = {
  problemTitle: 'Adopția AI creează o nouă problemă de management.',
  shiftsTitle: 'Leadership-ul nu dispare. Devine mai explicit.',
  shiftsIntro:
    'Programul nu pornește de la ideea că liderii trebuie să devină experți tehnici. Pornește de la munca pe care o au deja de făcut și de la deciziile care devin mai dificile atunci când AI intră în modul de lucru.',
  journeyTitle: 'Nu este un eveniment. Este o buclă de învățare.',
  journeyText:
    'Sesiunile de învățare sunt legate de perioade de aplicare în rol. Participanții lucrează cu propriile situații, testează decizii, observă consecințele și revin cu rezultate din realitate. Învățarea se construiește în cicluri de practică, feedback și recalibrare.',
  flowTitle: 'De la decizie la experiment. De la experiment la mod de lucru.',
  flowIntro:
    'Arhitectura exactă se adaptează contextului organizației. Principiul rămâne însă același: fiecare etapă trebuie să lase ceva observabil în muncă, nu doar o idee interesantă pe un slide.',
  outcomesTitle: 'Ce ar trebui să poată face diferit un manager.',
  outcomesIntro:
    'Nu promitem competență AI în abstract. Promisiunea este mai concretă: decizii mai bune despre muncă, autonomie, verificare, responsabilitate și dezvoltarea oamenilor în echipă.',
  principleTitle:
    'Scopul nu este să folosim mai mult AI. Scopul este să conducem mai bine munca în care AI există deja.',
  principleText:
    'Succesul nu se măsoară în număr de prompturi, conturi sau minute economisite. Îl căutăm în claritatea deciziilor, calitatea verificării, responsabilitate și capacitatea oamenilor de a explica, contesta, învăța și îmbunătăți felul în care lucrează.',
  fitTitle: 'Pentru manageri care conduc deja într-un mediu hibrid.',
  fitText:
    'Team leaders, middle managers și senior managers ale căror echipe folosesc sau se pregătesc să folosească AI în activitatea de zi cu zi și care au nevoie de o logică comună pentru delegare, verificare, autonomie și dezvoltare.',
  notTitle: 'Nu este un curs de prompting și nici o demonstrație de instrumente.',
  notText:
    'Nu încearcă să transforme managerii în specialiști tehnici. Instrumentele se pot schimba repede. Programul lucrează cu deciziile manageriale care rămân importante indiferent ce model sau platformă este folosită luna viitoare.',
  ctaTitle: 'Un parcurs de învățare construit în jurul muncii reale a organizației.',
}

const contactHref = '/contact?source=leadership-ai-draft'

export default function LeadershipAiDraftPage() {
  return (
    <div className={`${styles.page} conversion-page`}>
      <section className={visual.hero}>
        <div className={visual.heroContent}>
          <Eyebrow>Program corporate · parcurs de învățare pentru manageri</Eyebrow>
          <h1>Leadership in the AI Era</h1>
          <div className={visual.heroCopy}>
            <p>{heroLead}</p>
            <p>{heroTransfer}</p>
            <div className="conversion-inline-action">
              <ArrowLink href={contactHref}>Discută un pilot pentru echipa ta</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.diagnostic}>
        <div className={styles.diagnosticInner}>
          <div>
            <Eyebrow>De ce acum</Eyebrow>
            <h2 className={styles.statementSmall}>{copy.problemTitle}</h2>
          </div>
          <div>
            <ul className={styles.diagnosticList}>
              {challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="conversion-inline-action">
              <ArrowLink href={contactHref}>Discută contextul organizației tale</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>Ce se schimbă</Eyebrow>
            <h2 className={styles.sectionTitle}>{copy.shiftsTitle}</h2>
          </div>
          <p className={styles.sectionIntro}>{copy.shiftsIntro}</p>
        </div>

        <div className={visual.shiftGrid}>
          {shifts.map((item) => (
            <article className={visual.shiftCard} key={item.title}>
              <div
                className={`${visual.shiftIcon} ${iconClasses[item.icon]}`}
                aria-hidden="true"
              />
              <div className={visual.shiftMeta}>
                <span>{item.index}</span>
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.practice}>
        <div className={styles.practiceInner}>
          <div>
            <Eyebrow>Parcurs de învățare</Eyebrow>
          </div>
          <div>
            <h2 className={styles.statementSmall}>{copy.journeyTitle}</h2>
            <p>{copy.journeyText}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>Cum curge programul</Eyebrow>
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

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow>Pentru organizație</Eyebrow>
            <h2 className={styles.sectionTitle}>
              Programul lasă în urmă mai mult decât participanți instruiți.
            </h2>
          </div>
          <p className={styles.sectionIntro}>
            Învățarea se transformă în reguli și experimente pe care echipa le poate folosi și
            după program.
          </p>
        </div>
        <ul className={styles.outcomeList}>
          {organizationOutcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.proof}>
        <div className={styles.proofInner}>
          <div>
            <Eyebrow>Principiul programului</Eyebrow>
          </div>
          <article className={styles.proofCard}>
            <h3>{copy.principleTitle}</h3>
            <p>{copy.principleText}</p>
            <div className="conversion-inline-action">
              <ArrowLink href="/portofoliu">Vezi experiența și proiectele lui Bogdan</ArrowLink>
            </div>
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
        <Eyebrow>Program corporate</Eyebrow>
        <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
        <ArrowLink href={contactHref}>Programează o discuție despre program</ArrowLink>
      </section>
    </div>
  )
}

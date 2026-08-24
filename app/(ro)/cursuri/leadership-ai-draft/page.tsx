import type { Metadata } from 'next'
import styles from '@/app/commercial.module.css'
import { EditorialImage } from '@/components/portrait'
import { ArrowLink, Eyebrow } from '@/components/ui'
import visual from './page.module.css'

export const metadata: Metadata = {
  title: 'Leadership in the AI Era — program draft',
  description:
    'Concept de learning journey pentru manageri: judgment, delegare hibridă, autonomie, accountability și dezvoltarea oamenilor în munca asistată de AI.',
  robots: { index: false, follow: false },
}

type IconType = 'judgment' | 'delegation' | 'accountability' | 'capability'

const iconGlyphs: Record<IconType, string> = {
  judgment: '◇',
  delegation: '↔',
  accountability: '✓',
  capability: '↗',
}

const heroLead =
  'AI poate prelua tot mai multă muncă. Întrebarea de leadership este ce delegăm, ce verificăm, cine decide și cum păstrăm oamenii capabili să gândească, să învețe și să răspundă pentru rezultat.'
const heroTransfer =
  'Un parcurs de învățare întins pe mai multe săptămâni, construit pentru transfer în munca reală, nu pentru două zile bune de notițe într-un workbook.'

const challenges = [
  'AI a intrat deja în munca echipei, dar regulile de utilizare sunt încă implicite.',
  'Oamenii produc mai repede, însă nu este întotdeauna clar cine verifică și cine răspunde pentru rezultat.',
  'Managerii oscilează între supraîncredere în AI și control excesiv.',
  'Organizația vrea adopție, dar nu vrea să cumpere productivitate cu prețul judgment-ului și al dezvoltării oamenilor.',
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
    icon: 'judgment',
    label: 'Judgment',
    title: 'De la „poate AI să facă asta?” la „ar trebui să o facă?”',
    text: 'Capabilitatea tehnică nu rezolvă întrebarea managerială. Participanții învață să decidă ce merită delegat, în ce condiții și cu ce nivel de verificare.',
  },
  {
    index: '02',
    icon: 'delegation',
    label: 'Delegare hibridă',
    title: 'De la delegare către oameni la designul muncii human–AI',
    text: 'Munca nu mai circulă doar între manager și angajat. Liderul trebuie să configureze inteligent contribuția oamenilor, AI-ului și automatizărilor.',
  },
  {
    index: '03',
    icon: 'accountability',
    label: 'Autonomie & accountability',
    title: 'De la control la autonomie cu limite clare',
    text: 'Autonomia devine utilă doar atunci când sunt explicite drepturile de decizie, responsabilitatea, punctele de verificare și condițiile de oprire.',
  },
  {
    index: '04',
    icon: 'capability',
    label: 'Capability & learning',
    title: 'De la output mai rapid la capability mai bun',
    text: 'Productivitatea imediată contează, dar nu este suficientă. Programul păstrează în centru judgment-ul, învățarea și capacitatea oamenilor de a explica și verifica rezultatele.',
  },
]

const journey = [
  {
    index: '01',
    title: 'Pornim din munca reală',
    text: 'Participanții aleg workflow-uri, decizii și situații manageriale pe care le întâlnesc deja. Programul nu începe cu o demonstrație de tool.',
  },
  {
    index: '02',
    title: 'Construim judgment și delegare hibridă',
    text: 'Prin cazuri, simulări și lucru aplicat, participanții exersează decizii despre ce rămâne uman, ce poate fi asistat de AI și unde este nevoie de verificare sau escaladare.',
  },
  {
    index: '03',
    title: 'Mutăm învățarea în rol',
    text: 'Fiecare participant testează o schimbare concretă în propriul context de lucru, cu un rezultat urmărit, un baseline și semnale clare că abordarea trebuie ajustată.',
  },
  {
    index: '04',
    title: 'Revenim cu evidence, nu cu impresii',
    text: 'Experiența din muncă este analizată, comparată și recalibrată. Ce a funcționat se păstrează, ce nu a funcționat se modifică sau se oprește.',
  },
  {
    index: '05',
    title: 'Transformăm practica în norme de echipă',
    text: 'Learning-ul individual este tradus în reguli simple de lucru: cine decide, ce verificăm, când escaladăm și cum protejăm atât calitatea, cât și dezvoltarea oamenilor.',
  },
]

const outcomes = [
  'Să descompună munca suficient de clar încât delegarea către om, AI sau o combinație între ele să fie o decizie explicită.',
  'Să distingă un răspuns fluent de un răspuns suficient de bine susținut și să calibreze nivelul de încredere în outputurile AI.',
  'Să stabilească autonomie, decision rights, checkpoints și escaladări proporțional cu riscul real al muncii.',
  'Să păstreze accountability-ul managerial chiar atunci când execuția este distribuită între oameni și sisteme AI.',
  'Să conducă conversații de dezvoltare care nu transformă AI-ul într-un substitut pentru gândire și învățare.',
  'Să măsoare performanța hibridă prin calitate, eficiență, judgment și capability, nu prin simpla utilizare a AI.',
  'Să construiască un mod de lucru comun al echipei pentru utilizarea responsabilă și productivă a AI.',
  'Să transforme programul într-un experiment observabil în muncă, nu într-o listă de intenții bune de după training.',
]

const copy = {
  problemTitle: 'AI adoption creează o nouă problemă de management.',
  visualTitle:
    'Instrumentele se schimbă. Rolul managerului rămâne să facă munca mai clară.',
  visualText:
    'Programul lucrează cu situații manageriale reale: decizii, delegare, conversații, verificare și dezvoltarea oamenilor. AI intră în ecuație ca parte din sistemul de lucru, nu ca protagonist.',
  shiftsTitle: 'Leadership-ul nu dispare. Devine mai explicit.',
  shiftsIntro:
    'Programul nu pornește de la ideea că liderii trebuie să devină experți tehnici. Pornește de la munca pe care o au deja de făcut și de la deciziile care devin mai dificile atunci când AI intră în workflow.',
  journeyTitle: 'Nu este un eveniment. Este o buclă de învățare.',
  journeyText:
    'Sesiunile de învățare sunt legate de perioade de aplicare în rol. Participanții lucrează cu propriile workflow-uri, testează decizii, observă consecințele și revin cu evidence din realitate. Învățarea se construiește în cicluri de practică, feedback și recalibrare.',
  flowTitle: 'De la decizie la experiment. De la experiment la mod de lucru.',
  flowIntro:
    'Arhitectura exactă se adaptează contextului organizației. Principiul rămâne însă același: fiecare etapă trebuie să lase ceva observabil în muncă, nu doar o idee interesantă pe un slide.',
  outcomesTitle: 'Ce ar trebui să poată face diferit un manager.',
  outcomesIntro:
    'Nu promitem „AI fluency” în abstract. Promisiunea este mai concretă: decizii mai bune despre muncă, autonomie, verificare, responsabilitate și dezvoltarea capability-ului în echipă.',
  principleTitle:
    'Scopul nu este să folosim mai mult AI. Scopul este să conducem mai bine munca în care AI există deja.',
  principleText:
    'Succesul nu se măsoară în număr de prompturi, conturi sau minute economisite. Îl căutăm în claritatea deciziilor, calitatea verificării, responsabilitate și capacitatea oamenilor de a explica, contesta, învăța și îmbunătăți felul în care lucrează.',
  fitTitle: 'Pentru manageri care conduc deja într-un mediu hibrid.',
  fitText:
    'Team leaders, middle managers și senior managers ale căror echipe folosesc sau se pregătesc să folosească AI în activitatea de zi cu zi și care au nevoie de o logică comună pentru delegare, verificare, autonomie și dezvoltare.',
  notTitle: 'Nu este un curs de prompting și nici o demonstrație de tool-uri.',
  notText:
    'Nu încearcă să transforme managerii în specialiști tehnici. Instrumentele se pot schimba repede. Programul lucrează cu deciziile manageriale care rămân importante indiferent ce model sau platformă este folosită luna viitoare.',
  ctaTitle: 'Un learning journey construit în jurul muncii reale a organizației.',
}

export default function LeadershipAiDraftPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Eyebrow>Concept program · learning journey pentru manageri</Eyebrow>
        <div className={styles.heroGrid}>
          <h1>Leadership in the AI Era</h1>
          <div>
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
          <EditorialImage asset="workshop" kind="event" locale="ro" className={visual.visualImage} />
          <div className={visual.visualCopy}>
            <div>
              <Eyebrow>Din sala de training în munca reală</Eyebrow>
              <h2>{copy.visualTitle}</h2>
            </div>
            <p>{copy.visualText}</p>
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

        <div className={visual.iconGrid}>
          {shifts.map((item) => (
            <article className={visual.iconCard} key={`${item.title}-icon`}>
              <div className={visual.iconWrap} aria-hidden="true">
                {iconGlyphs[item.icon]}
              </div>
              <span>{item.index}</span>
              <h3>{item.label}</h3>
            </article>
          ))}
        </div>

        <div className={styles.twoGrid}>
          {shifts.map((item) => (
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
            <Eyebrow>Learning journey</Eyebrow>
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
        <Eyebrow>Program corporate</Eyebrow>
        <h2 className={styles.ctaTitle}>{copy.ctaTitle}</h2>
        <ArrowLink href="/contact">Discută despre o versiune pentru echipa ta</ArrowLink>
      </section>
    </div>
  )
}

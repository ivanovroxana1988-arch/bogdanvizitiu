import type { Metadata } from 'next'
import styles from './client-portfolio.module.css'

export const metadata: Metadata = {
  title: 'B2B Portfolio 2026',
  description:
    'Private client overview of Bogdan Vizitiu’s training, coaching, learning technology and tender solutions.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

const businessLines = [
  {
    number: '01',
    title: 'Training & Learning Experiences',
    copy: 'Interactive workshops, facilitation and learning journeys built around practice, reflection and transfer.',
    proof: 'Designed for people to participate, not just attend.',
  },
  {
    number: '02',
    title: 'Executive & Leadership Coaching',
    copy: '1:1 and team work for decisions, leadership conversations, performance and change.',
    proof: 'A structured space for the problems that do not need another training programme.',
  },
  {
    number: '03',
    title: 'Learning Technology',
    copy: 'Simulations, business games, AI roleplay, assessments and digital practice environments.',
    proof: 'Technology used to create more opportunities to decide, practise, receive feedback and try again.',
  },
  {
    number: '04',
    title: 'Tender & Procurement Solutions',
    copy: 'Bid architecture, technical proposals, compliance, expert files and submission readiness.',
    proof: 'Structure, evidence and compliance for complex procurement.',
  },
]

const eventFormats = [
  ['Networking That Actually Works', 'Conference opener · community event · 60–120 min', 'Professional Networking'],
  ['The Negotiation Room', 'Interactive simulation · sales or leadership event', 'Negotiation & Influence'],
  ['Leadership in the AI Era', 'Conference session · leadership event · 80–160 min', 'Leadership in the New AI Landscape'],
  ['The Team Under Pressure', 'Team simulation · off-site · management event', 'Leading High Performance Teams'],
]

const workshops = [
  ['Resilience in a State of Alert', 'Emotional resilience & stress management'],
  ['Navigating Ambiguity and Complexity', 'Critical inquiry & decisions with incomplete data'],
  ['5x5 Communication', 'Clarity under pressure, structured messages & active listening'],
  ['Energy Management vs. Time Management', 'Flow at work & protecting cognitive resources'],
  ['Agile Feedback & Psychological Safety', 'Feedforward and process focus'],
  ['Personal Agility & Tolerance for Change', 'From resistance to rapid response'],
  ['Effective Cross-functional Collaboration', 'Breaking silos through functional empathy'],
  ['Systems Thinking', 'Understanding second-order effects and unintended consequences'],
  ['Explorer Mindset', 'Curiosity as an anti-fear tool'],
  ['Clarity of Vision in the Fog', 'From confusion to objective: a rapid alignment protocol'],
]

const learningTech = [
  ['AI Simulations', 'Dynamic scenarios that respond to participant choices.'],
  ['Business Games', 'Rules, trade-offs and consequences made visible through play.'],
  ['AI Roleplay', 'Practice difficult conversations safely and repeatedly.'],
  ['Assessments', 'Create a useful baseline before learning begins.'],
  ['AI Coaching', 'Reflection and guided practice between live interventions.'],
  ['Custom Learning Journeys', 'Combine live, digital and coached practice in one architecture.'],
]

const tenderServices = [
  ['Tender Readiness', 'Requirements, risks, evidence and submission logic.'],
  ['Bid Management', 'Owners, deadlines, dependencies and review cycles.'],
  ['Technical Proposals', 'Turn methodology and delivery into a clear evaluator-facing story.'],
  ['Compliance Matrix', 'Map every requirement to an explicit response and proof point.'],
  ['Expert Files', 'CVs, declarations and evidence packaged consistently.'],
  ['Submission Readiness', 'Final consistency, completeness and platform checks.'],
]

const coaching = [
  ['Executive Coaching', 'Decisions · role transitions · leadership presence'],
  ['Leadership Coaching', 'People leadership · difficult conversations · influence'],
  ['Team Coaching', 'Collaboration · decision-making · conflict · alignment'],
  ['Career & Performance Coaching', 'Direction · performance · choice · accountability'],
]

const organisations = [
  'Amazon',
  'Banca Transilvania',
  'Cargus',
  'Carrefour',
  'Cegeka',
  'Edenred',
  'KPMG',
  'PwC',
  'Accenture',
  'Orbico',
  'BMW MotoHub',
  'Concordia',
]

export default function ClientPortfolio2026() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="shell">
          <div className={styles.heroTop}>
            <span className={styles.privateLabel}>Private client material · B2B portfolio 2026</span>
            <span className={styles.brand}>Bogdan Vizitiu</span>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Learning · leadership · technology · delivery</p>
              <h1 className={styles.heroTitle}>
                Start with the problem.
                <br />
                Build only what helps.
              </h1>
            </div>
            <div className={styles.heroSide}>
              <p className={styles.lead}>
                Four connected capabilities for organizations that need people to think better, practise differently
                and deliver with more clarity.
              </p>
              <a className={styles.primaryCta} href="#portfolio">
                Explore the portfolio <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.principle}>
        <div className="shell">
          <p className={styles.eyebrow}>Our principle</p>
          <div className={styles.principleGrid}>
            <h2>The solution comes after we understand the problem. Not before.</h2>
            <div className={styles.questions}>
              {[
                'What must change?',
                'What is getting in the way?',
                'What does practice need to feel like?',
                'How will we know it transferred?',
              ].map((item, index) => (
                <div className={styles.question} key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className={styles.portfolio}>
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>The portfolio</p>
            <h2>Four lines of business. One logic.</h2>
            <p>Design the intervention around the real problem.</p>
          </div>

          <div className={styles.businessGrid}>
            {businessLines.map((line) => (
              <article className={styles.businessCard} key={line.title}>
                <span className={styles.number}>{line.number}</span>
                <h3>{line.title}</h3>
                <p>{line.copy}</p>
                <small>{line.proof}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className="shell">
          <div className={styles.sectionHeadLight}>
            <p className={styles.eyebrowLight}>01 · Training & Learning Experiences</p>
            <h2>Designed for people to participate, not just attend.</h2>
            <p>
              The strongest formats are experiential: participants enter a situation, make choices, receive feedback
              and connect the experience to their own work.
            </p>
          </div>

          <div className={styles.formatList}>
            {eventFormats.map(([title, format, theme], index) => (
              <article className={styles.formatRow} key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{format}</p>
                </div>
                <strong>{theme}</strong>
              </article>
            ))}
          </div>

          <div className={styles.workshopIntro}>
            <p className={styles.eyebrowLight}>Workshop catalogue</p>
            <h3>Short, focused interventions for the moments where performance usually breaks down.</h3>
          </div>

          <div className={styles.workshopGrid}>
            {workshops.map(([title, copy], index) => (
              <article className={styles.workshop} key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h4>{title}</h4>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.coachingSection}>
        <div className="shell">
          <div className={styles.splitHead}>
            <div>
              <p className={styles.eyebrow}>02 · Executive & Leadership Coaching</p>
              <h2>Some leadership problems do not need more content.</h2>
            </div>
            <p>
              They need a better conversation. Coaching creates a structured space for leaders and teams to think
              through decisions, behavior, relationships and performance.
            </p>
          </div>
          <div className={styles.serviceList}>
            {coaching.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blueSection}>
        <div className="shell">
          <div className={styles.splitHead}>
            <div>
              <p className={styles.eyebrow}>03 · Learning Technology</p>
              <h2>Practice can scale without turning learning into content consumption.</h2>
            </div>
            <p>
              Technology is useful when it creates more opportunities to decide, practise, receive feedback and try
              again.
            </p>
          </div>

          <div className={styles.techGrid}>
            {learningTech.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.tenderSection}>
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>04 · Tender & Procurement Solutions</p>
            <h2>A strong offer can lose before anyone reaches the good ideas.</h2>
            <p>
              Complex procurement requires more than good writing. It requires structure, evidence, compliance,
              ownership and a submission process that survives scrutiny.
            </p>
          </div>

          <div className={styles.tenderGrid}>
            {tenderServices.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Experience & proof</p>
            <h2>Built in real rooms, with real organisations and repeat delivery.</h2>
          </div>

          <div className={styles.stats}>
            <div><strong>18</strong><span>STUP editions</span></div>
            <div><strong>70+</strong><span>live hours</span></div>
            <div><strong>1,000+</strong><span>participants</span></div>
            <div><strong>3</strong><span>repeat themes</span></div>
          </div>

          <div className={styles.organisations}>
            {organisations.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <p className={styles.proofNote}>Specific client–programme associations are used only where documented.</p>
        </div>
      </section>

      <section className={styles.engagement}>
        <div className="shell">
          <div className={styles.splitHead}>
            <div>
              <p className={styles.eyebrow}>Engagement models</p>
              <h2>Start with one problem. Scale only when the problem deserves it.</h2>
            </div>
            <div className={styles.engagementList}>
              {[
                ['Event / Workshop', 'A focused intervention around one behavior, decision or conversation.'],
                ['Programme', 'A sequence of live sessions with practice between touchpoints.'],
                ['Learning Journey', 'Live + digital + simulation + coaching + measurement.'],
                ['Custom Partnership', 'A tailored solution spanning multiple business lines.'],
              ].map(([title, copy], index) => (
                <div key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="shell">
          <p className={styles.eyebrowLight}>Next conversation</p>
          <div className={styles.finalGrid}>
            <h2>Bring us one problem.</h2>
            <div>
              <p>
                We will frame it, identify what needs to change and propose the smallest useful intervention before
                we propose the biggest possible programme.
              </p>
              <div className={styles.nextSteps}>
                <span>45-minute diagnostic conversation</span>
                <span>Problem framing</span>
                <span>Intervention architecture</span>
                <span>Commercial proposal</span>
              </div>
              <a className={styles.lightCta} href="mailto:contact@bogdanvizitiu.com">
                contact@bogdanvizitiu.com <span aria-hidden="true">↗</span>
              </a>
              <p className={styles.contactLine}>+40 744 440 095 · Bogdan Vizitiu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

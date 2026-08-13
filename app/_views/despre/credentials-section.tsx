import Image from 'next/image'
import { Eyebrow } from '@/components/ui'
import credentialsCopy from '@/content/credentials-copy.json'
import styles from '../commercial.module.css'

type Locale = keyof typeof credentialsCopy

export default function CredentialsSection({ locale }: { locale: Locale }) {
  const copy = credentialsCopy[locale]

  return (
    <section className={styles.section} id="credentials" aria-labelledby="credentials-title">
      <div style={{ paddingBottom: 'clamp(2.25rem, 4vw, 3.25rem)' }}>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 className={styles.statement} id="credentials-title" style={{ marginTop: '22px' }}>
          {copy.titleLines.map((line) => (
            <span key={line} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className={styles.twoGrid}>
        {copy.items.map((item, index) => (
          <article
            className={styles.editorialCard}
            key={item.title}
            style={index % 2 === 0 ? { borderLeft: 0, paddingLeft: 0 } : undefined}
          >
            <div
              style={{
                minHeight: '58px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '18px',
              }}
            >
              <Image
                src={item.logo}
                alt=""
                width={220}
                height={72}
                style={{ width: 'auto', height: 'auto', maxWidth: '190px', maxHeight: '58px' }}
              />
            </div>
            <h3>{item.title}</h3>
            <p style={{ fontWeight: 600, marginBottom: 0 }}>{item.issuer}</p>
            <p style={{ marginTop: '2px' }}>{item.description}</p>
            <a
              className="arrow-link"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '16px', display: 'inline-flex' }}
            >
              {item.cta} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>

      <footer className={styles.fourGrid} aria-label={copy.educationLabel} style={{ marginTop: '18px' }}>
        <div
          style={{
            minHeight: '54px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingRight: '24px',
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: '18px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '40px',
              height: '40px',
              flex: '0 0 40px',
              display: 'grid',
              placeItems: 'center',
              border: '1px solid var(--muted, #53636b)',
              borderRadius: '999px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
              <path d="M6.5 11.3v4.1c1.5 1.5 3.3 2.2 5.5 2.2s4-.7 5.5-2.2v-4.1" />
            </svg>
          </span>
          <strong>{copy.educationLabel}</strong>
        </div>
        {copy.educationItems.map((item) => (
          <div
            key={item}
            style={{
              minHeight: '54px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              borderLeft: '1px solid var(--line, #b7c0c0)',
              color: 'var(--muted, #53636b)',
              fontSize: '12px',
              lineHeight: 1.45,
            }}
          >
            {item}
          </div>
        ))}
      </footer>
    </section>
  )
}

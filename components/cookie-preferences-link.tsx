'use client'

export function CookiePreferencesLink({ locale }: { locale: 'ro' | 'en' }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('bgv-open-cookie-preferences'))}
      style={{
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        color: 'inherit',
        font: 'inherit',
        fontSize: 12,
        textAlign: 'left',
        textDecoration: 'underline',
        textUnderlineOffset: 3,
      }}
    >
      {locale === 'ro' ? 'Preferințe cookie-uri' : 'Cookie preferences'}
    </button>
  )
}

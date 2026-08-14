'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import business from '@/content/business.json'
import { withLocale, type Locale } from '@/lib/i18n'
import commercialStyles from '@/app/_views/commercial.module.css'
import formStyles from './contact-form.module.css'

type SubmitState = 'idle' | 'sending' | 'success' | 'fallback' | 'error'
type FieldName = 'name' | 'email' | 'phone'
type FieldErrors = Partial<Record<FieldName, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validPhone(value: string) {
  return value.replace(/\D/g, '').length >= 7
}

function buildFallback(form: HTMLFormElement, locale: Locale, courseTitle: string) {
  const data = new FormData(form)
  const subject =
    locale === 'ro'
      ? `Înscriere curs — ${courseTitle}`
      : `Course registration — ${courseTitle}`
  const body = [
    `Curs / Course: ${courseTitle}`,
    `Nume / Name: ${String(data.get('name') || '')}`,
    `Email: ${String(data.get('email') || '')}`,
    `Telefon / Phone: ${String(data.get('phone') || '')}`,
  ].join('\n')

  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function RegistrationForm({
  locale,
  courseSlug,
  courseTitle,
}: {
  locale: Locale
  courseSlug: string
  courseTitle: string
}) {
  const [state, setState] = useState<SubmitState>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [fallbackHref, setFallbackHref] = useState('')

  const copy =
    locale === 'ro'
      ? {
          name: 'Nume și prenume',
          email: 'Adresa de email',
          phone: 'Telefon',
          nameRequired: 'Completează numele și prenumele.',
          emailRequired: 'Completează adresa de email.',
          emailInvalid: 'Adresa de email nu pare validă.',
          phoneRequired: 'Completează numărul de telefon.',
          phoneInvalid: 'Numărul de telefon pare incomplet.',
          submit: 'Trimite înscrierea',
          sending: 'Se trimite…',
          success: 'Înscrierea a fost trimisă. Revenim cu detaliile pe email sau telefon.',
          fallback: 'Formularul nu a putut trimite automat mesajul. Poți continua prin email.',
          fallbackAction: 'Trimite prin email',
          error: 'Nu am putut trimite formularul. Încearcă din nou.',
          privacyPrefix: 'Datele sunt folosite doar pentru a te contacta în legătură cu înscrierea.',
          privacy: 'Politica de confidențialitate',
        }
      : {
          name: 'Full name',
          email: 'Email address',
          phone: 'Phone',
          nameRequired: 'Enter your full name.',
          emailRequired: 'Enter your email address.',
          emailInvalid: 'The email address does not look valid.',
          phoneRequired: 'Enter your phone number.',
          phoneInvalid: 'The phone number looks incomplete.',
          submit: 'Send registration',
          sending: 'Sending…',
          success: 'Your registration has been sent. We will follow up by email or phone.',
          fallback: 'The form could not send automatically. You can continue by email.',
          fallbackAction: 'Send by email',
          error: 'We could not send the form. Please try again.',
          privacyPrefix: 'Your details are used only to contact you about this registration.',
          privacy: 'Privacy policy',
        }

  function getError(field: FieldName, form: HTMLFormElement) {
    const control = form.elements.namedItem(field) as HTMLInputElement | null
    const value = control?.value.trim() || ''
    if (field === 'name') return value ? '' : copy.nameRequired
    if (field === 'email') {
      if (!value) return copy.emailRequired
      return emailPattern.test(value) ? '' : copy.emailInvalid
    }
    if (!value) return copy.phoneRequired
    return validPhone(value) ? '' : copy.phoneInvalid
  }

  function validateField(field: FieldName, form: HTMLFormElement) {
    const message = getError(field, form)
    setErrors((current) => ({ ...current, [field]: message || undefined }))
    return !message
  }

  function validateForm(form: HTMLFormElement) {
    const fields: FieldName[] = ['name', 'email', 'phone']
    const nextErrors: FieldErrors = {}
    let firstInvalid: FieldName | undefined

    fields.forEach((field) => {
      const message = getError(field, form)
      if (message) {
        nextErrors[field] = message
        firstInvalid ??= field
      }
    })

    setErrors(nextErrors)
    if (firstInvalid) {
      ;(form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
      return false
    }
    return true
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!validateForm(form)) return

    const data = new FormData(form)
    const payload = {
      locale,
      course: courseSlug,
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      website: String(data.get('website') || ''),
    }

    setState('sending')
    setFallbackHref('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as {
        ok?: boolean
        fallback?: string
        error?: string
        invalidFields?: FieldName[]
      }

      if (response.ok && result.ok) {
        form.reset()
        setErrors({})
        setState('success')
        return
      }

      if (result.error === 'invalid_fields' && result.invalidFields?.length) {
        const nextErrors: FieldErrors = {}
        result.invalidFields.forEach((field) => {
          nextErrors[field] = getError(field, form)
        })
        setErrors(nextErrors)
        setState('idle')
        return
      }

      if (result.fallback) {
        setFallbackHref(result.fallback)
        setState('fallback')
        return
      }

      setState('error')
    } catch {
      setFallbackHref(buildFallback(form, locale, courseTitle))
      setState('fallback')
    }
  }

  return (
    <form className={commercialStyles.form} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="course" value={courseSlug} />

      <label>
        {copy.name}
        <input
          name="name"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          className={errors.name ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('name', event.currentTarget.form!)}
        />
        {errors.name && <span className={formStyles.fieldError}>{errors.name}</span>}
      </label>

      <label>
        {copy.email}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          className={errors.email ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('email', event.currentTarget.form!)}
        />
        {errors.email && <span className={formStyles.fieldError}>{errors.email}</span>}
      </label>

      <label className={commercialStyles.full}>
        {copy.phone}
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          aria-invalid={Boolean(errors.phone)}
          className={errors.phone ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('phone', event.currentTarget.form!)}
        />
        {errors.phone && <span className={formStyles.fieldError}>{errors.phone}</span>}
      </label>

      <div aria-hidden="true" className={formStyles.honeypot}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className={commercialStyles.full} style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>
        {copy.privacyPrefix}{' '}
        <Link href={withLocale('/confidentialitate', locale)}>{copy.privacy}</Link>.
      </p>

      <p className={`${commercialStyles.full} ${formStyles.status}`} aria-live="polite">
        {state === 'success'
          ? copy.success
          : state === 'fallback'
            ? copy.fallback
            : state === 'error'
              ? copy.error
              : ''}
      </p>

      {state === 'fallback' && fallbackHref && (
        <a className={formStyles.fallbackLink} href={fallbackHref}>
          {copy.fallbackAction} →
        </a>
      )}

      <button type="submit" disabled={state === 'sending'} aria-disabled={state === 'sending'}>
        {state === 'sending' ? copy.sending : copy.submit} →
      </button>
    </form>
  )
}

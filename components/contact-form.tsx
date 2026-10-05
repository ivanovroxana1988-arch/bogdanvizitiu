'use client'

import Link from 'next/link'
import { attribution, conversionEvent } from '@/lib/conversion-tracking'
import { FormEvent, useRef, useState } from 'react'
import business from '@/content/business.json'
import contactCopy from '@/content/contact-copy.json'
import { withLocale, type Locale } from '@/lib/i18n'
import commercialStyles from '@/app/_views/commercial.module.css'
import formStyles from './contact-form.module.css'

type SubmitState = 'idle' | 'sending' | 'success' | 'fallback' | 'error'
type FieldName = 'name' | 'email' | 'requestType' | 'message' | 'consent'
type FieldErrors = Partial<Record<FieldName, string>>
type Tracking = {
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildClientFallback(form: HTMLFormElement, locale: Locale, referrer: string) {
  const data = new FormData(form)
  const requestType = String(data.get('requestType') || '')
  const subject =
    locale === 'ro'
      ? `Solicitare site Bogdan Vizitiu — ${requestType}`
      : `Bogdan Vizitiu website enquiry — ${requestType}`
  const body = [
    `Nume / Name: ${String(data.get('name') || '')}`,
    `Email: ${String(data.get('email') || '')}`,
    `Tip solicitare / Request type: ${requestType}`,
    `Pentru / Scope: ${String(data.get('scope') || '')}`,
    String(data.get('interest') || '') ? `Workshop: ${String(data.get('interest') || '')}` : '',
    '',
    'Context / Context',
    String(data.get('message') || ''),
    '',
    String(data.get('source') || '') ? `Source: ${String(data.get('source') || '')}` : '',
    referrer ? `Referrer: ${referrer}` : '',
    String(data.get('utm_source') || '')
      ? `UTM: ${String(data.get('utm_source') || '')} / ${String(data.get('utm_medium') || '')} / ${String(data.get('utm_campaign') || '')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm({
  locale,
  tracking = {},
  workshop,
}: {
  locale: Locale
  workshop?: string
  tracking?: Tracking
}) {
  const copy = contactCopy[locale]
  const started = useRef(false)
  const emit = (event: string) =>
    conversionEvent(event, 'contact', workshop || tracking.source || 'contact', locale)
  const [state, setState] = useState<SubmitState>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [fallbackHref, setFallbackHref] = useState('')

  function getFieldError(field: FieldName, form: HTMLFormElement) {
    if (field === 'consent') {
      const input = form.elements.namedItem('consent') as HTMLInputElement | null
      return input?.checked ? '' : copy.validationConsent
    }

    const control = form.elements.namedItem(field) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | null
    const value = control?.value.trim() || ''

    if (field === 'name') return value ? '' : copy.validationName
    if (field === 'email') {
      if (!value) return copy.validationEmailRequired
      return emailPattern.test(value) ? '' : copy.validationEmailInvalid
    }
    if (field === 'requestType') return value ? '' : copy.validationRequestType
    return value ? '' : copy.validationMessage
  }

  function validateField(field: FieldName, form: HTMLFormElement) {
    const message = getFieldError(field, form)
    setErrors((current) => ({ ...current, [field]: message || undefined }))
    return !message
  }

  function validateForm(
    form: HTMLFormElement,
    fields: FieldName[] = ['name', 'email', 'requestType', 'message', 'consent'],
  ) {
    const nextErrors: FieldErrors = {}
    let firstInvalid: FieldName | undefined

    for (const field of fields) {
      const message = getFieldError(field, form)
      if (message) {
        nextErrors[field] = message
        firstInvalid ??= field
      }
    }

    setErrors((current) => (fields.length === 5 ? nextErrors : { ...current, ...nextErrors }))

    if (firstInvalid) {
      const control = form.elements.namedItem(firstInvalid) as HTMLElement | null
      control?.focus()
      return false
    }

    return true
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!validateForm(form)) {
      emit('form_validation_error')
      setState('idle')
      return
    }

    const data = new FormData(form)
    const referrer = typeof document !== 'undefined' ? document.referrer : ''
    const original = attribution(tracking)
    const payload = {
      locale,
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      requestType: String(data.get('requestType') || ''),
      scope: String(data.get('scope') || ''),
      interest: workshop || '',
      message: String(data.get('message') || ''),
      consent: data.get('consent') === 'on',
      website: String(data.get('website') || ''),
      source: original.source || String(data.get('source') || ''),
      referrer: original.referrer || referrer,
      utm_source: original.utm_source || String(data.get('utm_source') || ''),
      utm_medium: original.utm_medium || String(data.get('utm_medium') || ''),
      utm_campaign: original.utm_campaign || String(data.get('utm_campaign') || ''),
    }

    for (const field of ['source', 'utm_source', 'utm_medium', 'utm_campaign'] as const) {
      const input = form.elements.namedItem(field) as HTMLInputElement | null
      if (input) input.value = payload[field] || ''
    }

    setState('sending')
    setFallbackHref('')

    try {
      const response = await fetch('/api/contact', {
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
        emit('form_success')
        setState('success')
        return
      }

      if (result.error) emit('form_error')
      if (result.error === 'invalid_fields' && result.invalidFields?.length) {
        validateForm(form, result.invalidFields)
        setState('idle')
        return
      }

      if (result.fallback) {
        setFallbackHref(result.fallback)
        emit('form_fallback')
        setState('fallback')
        return
      }

      if (!result.error) emit('form_error')
      setState('error')
    } catch {
      emit('form_error')
      emit('form_fallback')
      setFallbackHref(buildClientFallback(form, locale, original.referrer || referrer))
      setState('fallback')
    }
  }

  const statusText =
    state === 'success'
      ? copy.success
      : state === 'fallback'
        ? copy.fallback
        : state === 'error'
          ? copy.error
          : copy.pending

  return (
    <form
      className={commercialStyles.form}
      onSubmit={handleSubmit}
      onFocus={() => {
        if (!started.current) {
          started.current = true
          emit('form_start')
        }
      }}
      aria-describedby="contact-status"
      noValidate
    >
      {workshop && (
        <p className={commercialStyles.full}>
          <strong>{locale === 'ro' ? 'Workshop ales: ' : 'Selected workshop: '}</strong>
          {workshop}
        </p>
      )}
      <input type="hidden" name="interest" value={workshop || ''} />
      <input type="hidden" name="source" value={tracking.source || ''} />
      <input type="hidden" name="utm_source" value={tracking.utm_source || ''} />
      <input type="hidden" name="utm_medium" value={tracking.utm_medium || ''} />
      <input type="hidden" name="utm_campaign" value={tracking.utm_campaign || ''} />

      <label>
        {copy.name}
        <input
          name="name"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={errors.name ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('name', event.currentTarget.form!)}
        />
        {errors.name && (
          <span id="name-error" className={formStyles.fieldError} role="alert">
            {errors.name}
          </span>
        )}
      </label>

      <label>
        {copy.email}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={errors.email ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('email', event.currentTarget.form!)}
        />
        {errors.email && (
          <span id="email-error" className={formStyles.fieldError} role="alert">
            {errors.email}
          </span>
        )}
      </label>

      <label className={commercialStyles.full}>
        {copy.requestType}
        <select
          name="requestType"
          defaultValue={workshop ? copy.requestTypeOptions[2] : ''}
          required
          aria-invalid={Boolean(errors.requestType)}
          aria-describedby={errors.requestType ? 'request-type-error' : undefined}
          className={errors.requestType ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('requestType', event.currentTarget.form!)}
          onChange={(event) =>
            errors.requestType && validateField('requestType', event.currentTarget.form!)
          }
        >
          <option value="" disabled>
            {copy.requestTypePlaceholder}
          </option>
          {copy.requestTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.requestType && (
          <span id="request-type-error" className={formStyles.fieldError} role="alert">
            {errors.requestType}
          </span>
        )}
      </label>

      <label className={commercialStyles.full}>
        {copy.scope}
        <select name="scope" defaultValue={copy.scopeOptions[workshop ? 1 : 0]}>
          {copy.scopeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={commercialStyles.full}>
        {copy.message}
        <textarea
          name="message"
          placeholder={copy.messagePlaceholder}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={errors.message ? formStyles.invalid : undefined}
          onBlur={(event) => validateField('message', event.currentTarget.form!)}
        />
        {errors.message && (
          <span id="message-error" className={formStyles.fieldError} role="alert">
            {errors.message}
          </span>
        )}
      </label>

      <div aria-hidden="true" className={formStyles.honeypot}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={commercialStyles.full}>
        <label className={formStyles.consentLabel}>
          <input
            name="consent"
            type="checkbox"
            required
            className={formStyles.checkbox}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            onBlur={(event) => validateField('consent', event.currentTarget.form!)}
            onChange={(event) =>
              errors.consent && validateField('consent', event.currentTarget.form!)
            }
          />
          <span>
            {copy.consent}{' '}
            <Link href={withLocale('/confidentialitate', locale)}>{copy.privacy}</Link>
          </span>
        </label>
        {errors.consent && (
          <span id="consent-error" className={formStyles.fieldError} role="alert">
            {errors.consent}
          </span>
        )}
      </div>

      <p
        id="contact-status"
        className={`${commercialStyles.full} ${formStyles.status}`}
        aria-live="polite"
      >
        {statusText}
      </p>
      {state === 'fallback' && fallbackHref && (
        <a
          className={formStyles.fallbackLink}
          href={fallbackHref}
          onClick={() => emit('email_fallback_click')}
        >
          {copy.fallbackAction} →
        </a>
      )}
      <button type="submit" disabled={state === 'sending'} aria-disabled={state === 'sending'}>
        {state === 'sending' ? copy.sending : copy.submit} →
      </button>
    </form>
  )
}

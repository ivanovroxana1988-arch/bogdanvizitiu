'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { conversionEvent } from '@/lib/conversion-tracking'
import {
  MAX_CHAT_MESSAGE_LENGTH,
  type ChatAction,
  type ChatMessage,
  type ChatReply,
} from '@/lib/chatbot'
import type { Locale } from '@/lib/routes'
import styles from './site-chat.module.css'

type Message = ChatMessage & { actions?: ChatAction[]; mode?: ChatReply['mode'] }

export function SiteChat({
  locale,
  aiAvailable = false,
}: {
  locale: Locale
  aiAvailable?: boolean
}) {
  const ro = locale === 'ro'
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [aiConsent, setAiConsent] = useState(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const end = useRef<HTMLDivElement>(null)
  const controller = useRef<AbortController | null>(null)
  const inFlight = useRef(false)

  useEffect(() => () => controller.current?.abort(), [])
  useEffect(() => {
    if (open) field.current?.focus()
  }, [open])
  useEffect(() => {
    if (open) end.current?.scrollIntoView({ block: 'nearest' })
  }, [messages, pending, open])
  useEffect(() => {
    if (!open) return
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape' && panel.current?.contains(document.activeElement)) {
        setOpen(false)
        launcher.current?.focus()
      }
    }
    document.addEventListener('keydown', dismiss)
    return () => document.removeEventListener('keydown', dismiss)
  }, [open])

  async function send(value: string) {
    const text = value.trim().slice(0, MAX_CHAT_MESSAGE_LENGTH)
    if (!text || inFlight.current) return
    const next: Message[] = [...messages, { role: 'user' as const, content: text }].slice(-40)
    setMessages(next)
    setInput('')
    setError('')
    setPending(true)
    inFlight.current = true
    const abort = new AbortController()
    controller.current = abort
    const timer = setTimeout(() => abort.abort(), 18000)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abort.signal,
        body: JSON.stringify({
          locale,
          pathname,
          aiConsent,
          messages: next.slice(-11).map(({ role, content }) => ({
            role,
            content: content.slice(0, MAX_CHAT_MESSAGE_LENGTH),
          })),
        }),
      })
      if (!response.ok) throw new Error(response.status === 429 ? 'rate_limited' : 'unavailable')
      const reply: ChatReply = await response.json()
      setMessages([
        ...next,
        { role: 'assistant', content: reply.text, actions: reply.actions, mode: reply.mode },
      ])
      conversionEvent('chat_response', 'chat', reply.mode, locale)
    } catch (failure) {
      setInput(text)
      setMessages(messages)
      setError(
        failure instanceof Error && failure.message === 'rate_limited'
          ? ro
            ? 'Ai trimis mai multe întrebări într-un timp scurt. Încearcă din nou peste câteva minute sau folosește formularul.'
            : 'Too many questions in a short time. Try again in a few minutes or use the form.'
          : ro
            ? 'Răspunsul nu a putut fi încărcat. Poți reîncerca sau poți folosi formularul.'
            : 'The reply could not be loaded. Retry or use the contact form.',
      )
    } finally {
      clearTimeout(timer)
      inFlight.current = false
      setPending(false)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void send(input)
  }
  function close() {
    setOpen(false)
    launcher.current?.focus()
  }
  const quick = ro
    ? [
        'Cursuri pentru mine',
        'Training pentru echipă',
        'Coaching',
        'Am o întrebare despre Sales Lab',
      ]
    : ['Courses for me', 'Team training', 'Coaching', 'I have a question about Sales Lab']
  const contact = `${ro ? '/contact' : '/en/contact'}?source=chatbot`

  return (
    <aside
      className={`${styles.widget} ${pathname === '/sales-lab' ? styles.salesPage : ''}`}
      aria-label={ro ? 'Asistentul site-ului' : 'Website assistant'}
    >
      {open && (
        <div
          className={styles.panel}
          ref={panel}
          id="site-chat-panel"
          role="region"
          aria-labelledby="site-chat-title"
        >
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>BOGDAN VIZITIU</span>
              <h2 id="site-chat-title">{ro ? 'Cu ce te pot ajuta?' : 'How can I help?'}</h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={ro ? 'Închide conversația' : 'Close conversation'}
            >
              ×
            </button>
          </header>
          <div
            className={styles.log}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-busy={pending}
          >
            <p className={styles.welcome}>
              {pathname === '/sales-lab'
                ? ro
                  ? 'Ai o întrebare despre Sales Lab? Te ajut cu programul, detaliile și cererea de înscriere.'
                  : 'Questions about Sales Lab? I can help with the programme, details and request form.'
                : ro
                  ? 'Te ajut să găsești cursul sau serviciul potrivit și următorul pas.'
                  : 'I can help you find the right course or service and your next step.'}
            </p>
            {messages.length === 0 && (
              <div className={styles.quick}>
                {quick.map((q) => (
                  <button type="button" key={q} onClick={() => void send(q)}>
                    {q} ↗
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, index) => (
              <div key={index} className={m.role === 'user' ? styles.user : styles.assistant}>
                <span className={styles.speaker}>
                  {m.role === 'user'
                    ? ro
                      ? 'Tu'
                      : 'You'
                    : m.mode === 'ai'
                      ? ro
                        ? 'Asistent AI'
                        : 'AI assistant'
                      : ro
                        ? 'Ghidul site-ului'
                        : 'Website guide'}
                </span>
                <p>{m.content}</p>
                {m.actions?.length ? (
                  <div className={styles.actions}>
                    {m.actions.map((action) => (
                      <a
                        key={action.id}
                        href={action.href}
                        onClick={() => {
                          conversionEvent('chat_cta_click', 'chat', action.id, locale)
                          close()
                        }}
                      >
                        {action.label} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {pending && (
              <p className={styles.waiting} role="status">
                {ro ? 'Pregătesc răspunsul…' : 'Preparing a reply…'}
              </p>
            )}
            {error && (
              <p className={styles.error} role="alert">
                {error} <a href={contact}>{ro ? 'Contact' : 'Contact'}</a>
              </p>
            )}
            <div ref={end} />
          </div>
          <div className={styles.controls}>
            {aiAvailable && (
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={aiConsent}
                  disabled={pending}
                  onChange={(e) => setAiConsent(e.target.checked)}
                />
                {ro
                  ? 'Sunt de acord ca mesajele să fie prelucrate de Cloudflare Workers AI.'
                  : 'I agree to have my messages processed by Cloudflare Workers AI.'}
              </label>
            )}
            <form className={styles.form} onSubmit={submit}>
              <label className={styles.srOnly} htmlFor="site-chat-input">
                {ro ? 'Întrebarea ta' : 'Your question'}
              </label>
              <input
                id="site-chat-input"
                ref={field}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_CHAT_MESSAGE_LENGTH}
                placeholder={ro ? 'Scrie întrebarea ta…' : 'Type your question…'}
                autoComplete="off"
                disabled={pending}
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label={ro ? 'Trimite întrebarea' : 'Send question'}
              >
                ↑
              </button>
            </form>
            <p className={styles.note}>
              {ro
                ? 'Asistent automat. Evită datele personale. '
                : 'Automated assistant. Avoid personal data. '}
              <a href={ro ? '/confidentialitate' : '/en/privacy'}>
                {ro ? 'Confidențialitate' : 'Privacy'}
              </a>
            </p>
            <div className={styles.footer}>
              <a
                href={contact}
                onClick={() => conversionEvent('chat_cta_click', 'chat', 'contact', locale)}
              >
                {ro ? 'Discută direct cu Bogdan ↗' : 'Contact Bogdan directly ↗'}
              </a>
              <button
                type="button"
                disabled={pending || !messages.length}
                onClick={() => {
                  setMessages([])
                  setError('')
                  setInput('')
                  setAiConsent(false)
                  field.current?.focus()
                }}
              >
                {ro ? 'Șterge' : 'Clear'}
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        ref={launcher}
        className={styles.launcher}
        type="button"
        aria-expanded={open}
        aria-controls={open ? 'site-chat-panel' : undefined}
        onClick={() => {
          setOpen(!open)
          if (!open)
            conversionEvent(
              'chat_open',
              'chat',
              pathname === '/sales-lab' ? 'sales-lab' : 'site',
              locale,
            )
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5Z" />
          <path d="M7 10h10M7 14h6" />
        </svg>
        <span>{open ? (ro ? 'Închide' : 'Close') : ro ? 'Întreabă-mă' : 'Ask me'}</span>
      </button>
    </aside>
  )
}

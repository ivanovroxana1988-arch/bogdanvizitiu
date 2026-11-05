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
import { CHAT_MEASUREMENT_VERSION } from '@/lib/chat-monitoring'
import type { Locale } from '@/lib/routes'
import styles from './site-chat.module.css'

type Message = ChatMessage & {
  eventId?: string
  source?: 'typed' | 'suggestion'
  actions?: ChatAction[]
  suggestions?: string[]
  mode?: ChatReply['mode']
}

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
  const [aiConsent, setAiConsent] = useState<boolean | null>(null)
  const [analyticsConsent, setAnalyticsConsent] = useState(false)
  const measurement = useRef(false)
  const conversationId = useRef('')
  const [consentRequested, setConsentRequested] = useState(false)
  const deferredMessages = useRef<Message[] | null>(null)
  const launcher = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const options = useRef<HTMLDetailsElement>(null)
  const end = useRef<HTMLDivElement>(null)
  const controller = useRef<AbortController | null>(null)
  const inFlight = useRef(false)

  useEffect(() => () => controller.current?.abort(), [])
  useEffect(() => {
    if (open && !consentRequested) field.current?.focus()
  }, [open, consentRequested])
  useEffect(() => {
    if (open) end.current?.scrollIntoView({ block: 'nearest' })
  }, [messages, pending, open, consentRequested])
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

  function observe(kind: 'open' | 'cta', action?: string) {
    if (!measurement.current) return
    if (!conversationId.current) conversationId.current = crypto.randomUUID()
    void fetch('/api/chat-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        kind,
        action,
        analyticsConsent: true,
        analyticsConsentVersion: CHAT_MEASUREMENT_VERSION,
        conversationId: conversationId.current,
        eventId: crypto.randomUUID(),
      }),
    }).catch(() => {})
  }
  async function requestReply(next: Message[], allowAi: boolean) {
    if (inFlight.current) return
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
          aiConsent: allowAi,
          analyticsConsent: measurement.current,
          analyticsConsentVersion: CHAT_MEASUREMENT_VERSION,
          conversationId: conversationId.current,
          eventId: next.at(-1)?.eventId,
          source: next.at(-1)?.source,
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
        {
          role: 'assistant',
          content: reply.text,
          actions: reply.actions,
          suggestions: reply.suggestions,
          mode: reply.mode,
        },
      ])
      if (measurement.current) conversionEvent('chat_response', 'chat', reply.mode, locale)
    } catch (failure) {
      setInput(next.at(-1)?.content || '')
      setMessages(next.slice(0, -1))
      setError(
        failure instanceof Error && failure.message === 'rate_limited'
          ? ro
            ? 'Luăm o scurtă pauză? Poți reveni în câteva minute sau poți discuta direct cu Bogdan.'
            : 'Let’s take a short break. Try again in a few minutes or contact Bogdan directly.'
          : ro
            ? 'Nu am reușit să răspund. Mai încearcă o dată sau discută direct cu Bogdan.'
            : 'I couldn’t reply. Try again or contact Bogdan directly.',
      )
    } finally {
      clearTimeout(timer)
      inFlight.current = false
      setPending(false)
    }
  }

  function send(value: string, source: 'typed' | 'suggestion' = 'typed') {
    const text = value.trim().slice(0, MAX_CHAT_MESSAGE_LENGTH)
    if (!text || inFlight.current || consentRequested) return
    if (!conversationId.current) conversationId.current = crypto.randomUUID()
    const next: Message[] = [
      ...messages,
      { role: 'user' as const, content: text, source, eventId: crypto.randomUUID() },
    ].slice(-40)
    setMessages(next)
    setInput('')
    setError('')
    if (aiAvailable && aiConsent === null) {
      deferredMessages.current = next
      setConsentRequested(true)
      return
    }
    void requestReply(next, aiConsent === true)
  }

  function chooseMode(allowAi: boolean, allowMeasurement = false) {
    measurement.current = allowMeasurement
    setAnalyticsConsent(allowMeasurement)
    if (allowMeasurement) observe('open')
    setAiConsent(allowAi)
    setConsentRequested(false)
    const next = deferredMessages.current
    deferredMessages.current = null
    if (next) void requestReply(next, allowAi)
  }
  function submit(event: FormEvent) {
    event.preventDefault()
    send(input)
  }
  function close() {
    setOpen(false)
    launcher.current?.focus()
  }
  function clear() {
    conversationId.current = crypto.randomUUID()
    setMessages([])
    setInput('')
    setError('')
    setConsentRequested(false)
    deferredMessages.current = null
    if (options.current) options.current.open = false
    field.current?.focus()
  }
  const initialSuggestions =
    pathname === '/sales-lab'
      ? ro
        ? ['Mi se potrivește?', 'Ce voi exersa?', 'Cum mă înscriu?']
        : ['Is it right for me?', 'What will I practise?', 'How do I join?']
      : ro
        ? ['Vreau un curs', 'Pentru echipa mea', 'Mă interesează coachingul']
        : ['I’m looking for a course', 'For my team', 'I’m interested in coaching']
  const contact = `${ro ? '/contact' : '/en/contact'}?source=chatbot`
  const privacy = ro ? '/confidentialitate' : '/en/privacy'
  const busy = pending || consentRequested

  function suggestions(items: string[]) {
    return (
      <div
        className={styles.suggestions}
        aria-label={ro ? 'Poți răspunde și așa' : 'You could reply'}
      >
        {items.map((text) => (
          <button type="button" key={text} disabled={busy} onClick={() => send(text, 'suggestion')}>
            {text}
          </button>
        ))}
      </div>
    )
  }

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
              <span className={styles.eyebrow}>
                BOGDAN VIZITIU · {ro ? 'ASISTENT' : 'ASSISTANT'}
              </span>
              <h2 id="site-chat-title">{ro ? 'Hai să vorbim.' : 'Let’s talk.'}</h2>
            </div>
            <div className={styles.headerActions}>
              <details className={styles.options} ref={options}>
                <summary aria-label={ro ? 'Opțiunile conversației' : 'Conversation options'}>
                  ···
                </summary>
                <div className={styles.menu}>
                  <button type="button" disabled={pending || !messages.length} onClick={clear}>
                    {ro ? 'Conversație nouă' : 'New conversation'}
                  </button>
                  {aiAvailable && (
                    <button
                      type="button"
                      disabled={pending || consentRequested}
                      onClick={() => {
                        if (options.current) options.current.open = false
                        if (aiConsent === true) setAiConsent(false)
                        else setConsentRequested(true)
                      }}
                    >
                      {aiConsent === true
                        ? ro
                          ? 'Oprește răspunsurile AI'
                          : 'Switch AI replies off'
                        : ro
                          ? 'Activează răspunsurile AI'
                          : 'Switch AI replies on'}
                    </button>
                  )}
                  {analyticsConsent && (
                    <button
                      type="button"
                      onClick={() => {
                        measurement.current = false
                        setAnalyticsConsent(false)
                        if (options.current) options.current.open = false
                      }}
                    >
                      {ro ? 'Oprește statisticile' : 'Switch statistics off'}
                    </button>
                  )}
                  {!analyticsConsent && aiAvailable && (
                    <button
                      type="button"
                      disabled={pending || consentRequested}
                      onClick={() => {
                        setConsentRequested(true)
                        if (options.current) options.current.open = false
                      }}
                    >
                      {ro ? 'Opțiuni AI și statistici' : 'AI and statistics options'}
                    </button>
                  )}
                  <a href={contact}>{ro ? 'Discută cu Bogdan' : 'Contact Bogdan'}</a>
                  <a href={privacy}>{ro ? 'Confidențialitate' : 'Privacy'}</a>
                </div>
              </details>
              <button
                type="button"
                onClick={close}
                aria-label={ro ? 'Închide conversația' : 'Close conversation'}
              >
                ×
              </button>
            </div>
          </header>
          <div
            className={styles.log}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-busy={pending}
          >
            <div className={styles.assistant}>
              <p>
                {pathname === '/sales-lab'
                  ? ro
                    ? 'Bună! Hai să vedem dacă Sales Lab e potrivit pentru tine. Ce ai vrea să afli?'
                    : 'Hi! Let’s see if Sales Lab is right for you. What would you like to know?'
                  : ro
                    ? 'Bună! Ce ai vrea să faci mai bine — pentru tine sau pentru echipa ta?'
                    : 'Hi! What would you like to do better — for yourself or your team?'}
              </p>
            </div>
            {messages.length === 0 && !consentRequested && suggestions(initialSuggestions)}
            {messages.map((m, index) => (
              <div key={index}>
                <div className={m.role === 'user' ? styles.user : styles.assistant}>
                  <span className={styles.srOnly}>
                    {m.role === 'user'
                      ? ro
                        ? 'Tu: '
                        : 'You: '
                      : m.mode === 'ai'
                        ? ro
                          ? 'Asistent AI: '
                          : 'AI assistant: '
                        : ro
                          ? 'Ghidul site-ului: '
                          : 'Website guide: '}
                  </span>
                  <p>{m.content}</p>
                  {m.role === 'assistant' &&
                  index === messages.length - 1 &&
                  !busy &&
                  m.actions?.length ? (
                    <div className={styles.actions}>
                      {m.actions.map((action) => (
                        <a
                          key={action.id}
                          href={action.href}
                          onClick={() => {
                            observe('cta', action.id)
                            if (measurement.current)
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
                {m.role === 'assistant' &&
                index === messages.length - 1 &&
                !busy &&
                m.suggestions?.length
                  ? suggestions(m.suggestions)
                  : null}
              </div>
            ))}
            {consentRequested && (
              <div className={styles.assistant}>
                <p>
                  {ro
                    ? 'Continuăm cu AI? Pot adapta răspunsurile și sugestiile la ce îmi spui.'
                    : 'Shall we continue with AI? I can adapt my replies and suggestions to what you tell me.'}
                </p>
                <p className={styles.consentNote}>
                  {ro
                    ? 'Cu acordul tău, mesajele sunt prelucrate de Cloudflare Workers AI. Evită datele personale. '
                    : 'With your permission, Cloudflare Workers AI processes your messages. Avoid personal data. '}
                  {ro
                    ? 'Statisticile opționale numără temele, intențiile și clickurile, fără salvarea textelor. Le poți opri din opțiuni. '
                    : 'Optional statistics count topics, intentions and clicks without saving message text. You can turn them off in options. '}
                  <a href={privacy}>{ro ? 'Detalii' : 'Details'}</a>
                </p>
                <div className={styles.suggestions}>
                  <button
                    className={styles.accept}
                    type="button"
                    onClick={() => chooseMode(true, true)}
                  >
                    {ro ? 'AI și statistici' : 'AI and statistics'}
                  </button>
                  <button type="button" onClick={() => chooseMode(true, false)}>
                    {ro ? 'Doar AI' : 'AI only'}
                  </button>
                  <button type="button" onClick={() => chooseMode(false)}>
                    {ro ? 'Prefer fără AI' : 'Continue without AI'}
                  </button>
                </div>
              </div>
            )}
            {pending && (
              <p className={styles.waiting} role="status">
                {ro ? 'Mă gândesc' : 'Thinking'}
                <span aria-hidden="true"> ···</span>
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
            <form className={styles.composer} onSubmit={submit}>
              <label className={styles.srOnly} htmlFor="site-chat-input">
                {ro ? 'Mesajul tău' : 'Your message'}
              </label>
              <input
                id="site-chat-input"
                ref={field}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_CHAT_MESSAGE_LENGTH}
                placeholder={
                  ro ? 'Sau spune-mi cu cuvintele tale…' : 'Or tell me in your own words…'
                }
                autoComplete="off"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={ro ? 'Trimite mesajul' : 'Send message'}
              >
                ↑
              </button>
            </form>
            <p className={styles.note}>
              {aiConsent === true
                ? ro
                  ? 'Conversație cu AI · '
                  : 'AI conversation · '
                : ro
                  ? 'Asistent automat · '
                  : 'Automated assistant · '}
              <a href={privacy}>{ro ? 'Confidențialitate' : 'Privacy'}</a>
            </p>
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
          if (!open) observe('open')
          if (!open && measurement.current)
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

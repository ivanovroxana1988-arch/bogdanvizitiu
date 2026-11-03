import type { Locale } from './routes'
import { localizePath } from './routes'
import {
  isSalesLabEarlyBirdActive,
  SALES_LAB_STANDARD_PRICE_EUR,
  SALES_LAB_EARLY_BIRD_PRICE_EUR,
} from './sales-lab-offer'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }
export type ChatAction = { id: string; label: string; href: string }
export type ChatReply = { text: string; actions: ChatAction[]; mode: 'guided' | 'ai' }
export const MAX_CHAT_MESSAGES = 12
export const MAX_CHAT_MESSAGE_LENGTH = 600

export function chatActions(locale: Locale): ChatAction[] {
  const ro = locale === 'ro'
  const contact = `${localizePath('/contact', locale)}?source=chatbot`
  return [
    {
      id: 'sales',
      label: ro ? 'Descoperă Sales Lab' : 'Explore Sales Lab (Romanian)',
      href: '/sales-lab',
    },
    {
      id: 'signup',
      label: ro ? 'Solicită înscrierea' : 'Request a place (Romanian form)',
      href: '/sales-lab?source=chatbot#inscriere',
    },
    {
      id: 'courses',
      label: ro ? 'Explorează cursurile' : 'Explore courses',
      href: localizePath('/cursuri', locale),
    },
    {
      id: 'corporate',
      label: ro ? 'Training pentru echipă' : 'Team training',
      href: localizePath('/corporate', locale),
    },
    {
      id: 'coaching',
      label: ro ? 'Descoperă coachingul' : 'Explore coaching',
      href: localizePath('/coaching', locale),
    },
    { id: 'contact', label: ro ? 'Discută cu Bogdan' : 'Contact Bogdan', href: contact },
    {
      id: 'about',
      label: ro ? 'Despre Bogdan' : 'About Bogdan',
      href: localizePath('/despre', locale),
    },
    {
      id: 'insights',
      label: ro ? 'Citește articolele' : 'Read the articles',
      href: localizePath('/insights', locale),
    },
  ]
}

export function selectChatActions(ids: string[], locale: Locale) {
  const allowed = chatActions(locale)
  return [...new Set(ids)].flatMap((id) => allowed.filter((a) => a.id === id)).slice(0, 2)
}

export function validateChatMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= MAX_CHAT_MESSAGES &&
    value.every(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_CHAT_MESSAGE_LENGTH,
    ) &&
    value[value.length - 1].role === 'user'
  )
}

export function salesLabFacts(locale: Locale, now = Date.now()) {
  const ro = locale === 'ro'
  if (now > Date.parse('2027-01-22T21:59:59Z'))
    return ro
      ? 'Ediția Sales Lab din 21–22 ianuarie 2027 s-a încheiat. Pentru o ediție viitoare, contactează organizatorii; nu există o dată nouă confirmată aici.'
      : 'The 21–22 January 2027 Sales Lab edition has ended. Contact the organizers about future editions; no new date is confirmed here.'
  const base = ro
    ? `Sales Lab: 21–22 ianuarie 2027, București, în sală. Două zile de câte 8 ore, inclusiv pauze; maximum 15 participanți. Exerciții, simulări și feedback pe vânzări și negociere. Tarif standard: ${SALES_LAB_STANDARD_PRICE_EUR} EUR / participant. Locația exactă se comunică ulterior.`
    : `Sales Lab: 21–22 January 2027, in person in Bucharest. Two days of 8 hours including breaks; maximum 15 participants. Sales and negotiation exercises, simulations and feedback. Standard fee: EUR ${SALES_LAB_STANDARD_PRICE_EUR} per participant. Exact venue to be communicated.`
  const promo = isSalesLabEarlyBirdActive(now)
    ? ro
      ? ` Early Bird: ${SALES_LAB_EARLY_BIRD_PRICE_EUR} EUR pentru primele 5 locuri confirmate până la 30 noiembrie 2026, în limita disponibilității; tariful final se confirmă personal.`
      : ` Early Bird: EUR ${SALES_LAB_EARLY_BIRD_PRICE_EUR} for the first 5 places confirmed by 30 November 2026, subject to availability; final fee is confirmed individually.`
    : ''
  return (
    base +
    promo +
    (ro
      ? ' Formularul trimite o cerere; nu rezervă automat un loc și nu implică plată. Disponibilitatea se confirmă de organizatori.'
      : 'The form submits a request; it does not reserve a place or take payment. Availability is confirmed by the organizers.')
  )
}

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function guidedChatReply(
  messages: ChatMessage[],
  pathname: string,
  locale: Locale,
  now = Date.now(),
): ChatReply {
  const ro = locale === 'ro'
  const latest = normalize(messages[messages.length - 1].content)
  const prior = normalize(
    messages
      .filter((m) => m.role === 'user')
      .slice(0, -1)
      .map((m) => m.content)
      .join(' '),
  )
  const answer = (text: string, ids: string[]): ChatReply => ({
    text,
    actions: selectChatActions(ids, locale),
    mode: 'guided',
  })
  const team = /echip|compani|corporate|team|company|organizati/.test(latest)
  const sales = /sales|vanzar|vanzari/.test(latest)
  const followup =
    /pret|cost|cand|unde|locuri|inscr|plata|price|when|where|register|seat|payment|data|durata|cat dureaza/.test(
      latest,
    )
  const contextSales = /sales|vanzar/.test(prior) || pathname === '/sales-lab'
  if (team)
    return answer(
      ro
        ? 'Pentru o echipă, programul se construiește în funcție de context. Câți participanți aveți în vedere și ce vreți să îmbunătățiți: vânzări, leadership sau colaborare? Poți descrie nevoia în formular pentru o propunere de la Bogdan.'
        : 'Team programmes are tailored to your context. How many participants are you considering, and what would you like to improve: sales, leadership or collaboration? Describe your needs in the contact form for a proposal from Bogdan.',
      ['corporate', 'contact'],
    )
  if (sales || (followup && contextSales && !/coach|network|leadership/.test(latest)))
    return answer(
      salesLabFacts(locale, now),
      now > Date.parse('2027-01-22T21:59:59Z') ? ['contact', 'courses'] : ['signup', 'sales'],
    )
  if (/coach|cariera|career|claritate|clarity/.test(latest) || (followup && /coach/.test(prior)))
    return answer(
      ro
        ? 'Coachingul individual este potrivit pentru decizii, roluri de management și schimbări profesionale. Ce situație ai vrea să clarifici? Poți trimite contextul prin formular; formatul, disponibilitatea și costul se discută cu Bogdan.'
        : 'Individual coaching supports decisions, management roles and career transitions. What situation would you like to clarify? Send the context through the form; format, availability and fees are discussed with Bogdan.',
      ['coaching', 'contact'],
    )
  if (/curs|course|training|negocier|negotiat|network|leadership/.test(latest))
    return answer(
      ro
        ? 'Poți explora cursurile de vânzări, negociere, networking și leadership. Sales Lab are o pagină dedicată cu programul și formularul. Pentru celelalte cursuri, edițiile și disponibilitatea se confirmă individual. Cauți un curs pentru tine sau pentru echipă?'
        : 'Explore sales, negotiation, networking and leadership courses. Sales Lab has a dedicated page and request form. Other editions and availability are confirmed individually. Are you looking for yourself or your team?',
      ['courses', 'sales'],
    )
  if (/bogdan|experient|certific|despre|about/.test(latest))
    return answer(
      ro
        ? 'Bogdan este coach, trainer, consultant și antreprenor. Lucrează cu manageri, antreprenori și echipe în leadership, vânzări, negociere și dezvoltare profesională. Găsești parcursul și acreditările pe pagina Despre.'
        : 'Bogdan is a coach, trainer, consultant and entrepreneur. He works with managers, entrepreneurs and teams on leadership, sales, negotiation and professional development. See his background and credentials on the About page.',
      ['about', 'contact'],
    )
  if (/articol|insight|resurs|article|resource/.test(latest))
    return answer(
      ro
        ? 'Găsești ideile și articolele lui Bogdan în Insights, despre leadership, decizii, coaching și învățare.'
        : 'Explore Bogdan’s Insights on leadership, decisions, coaching and learning.',
      ['insights', 'contact'],
    )
  if (/contact|formular|discut|uman|human|email|telefon|phone/.test(latest))
    return answer(
      ro
        ? 'Poți trimite solicitarea direct lui Bogdan prin formular. Include pe scurt nevoia ta și contextul, ca să poată reveni cu un răspuns relevant.'
        : 'Send your enquiry directly to Bogdan through the form. Briefly describe your needs and context so he can respond appropriately.',
      ['contact'],
    )
  return answer(
    ro
      ? 'Te pot ghida către cursuri, coaching sau un program pentru echipa ta. Ce ai vrea să obții? Pentru o întrebare la care nu găsești răspuns aici, poți folosi formularul de contact.'
      : 'I can guide you to courses, coaching or a programme for your team. What would you like to achieve? For a question not answered here, use the contact form.',
    ['courses', 'contact'],
  )
}

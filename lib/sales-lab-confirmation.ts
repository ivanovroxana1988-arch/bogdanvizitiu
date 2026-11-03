/**
 * Transactional acknowledgement only. Never add applicants to newsletter lists.
 */
export type SalesLabConfirmationContent = {
  subject: string
  text: string
  html: string
}

type SalesLabApplicant = {
  name: string
  seats: number
}

type SendSalesLabConfirmationInput = SalesLabApplicant & {
  email: string
  replyTo: string
  resendKey?: string
  resendFrom?: string
  brevoKey?: string
  brevoSenderEmail?: string
}

export type ConfirmationDelivery = 'brevo' | 'resend' | 'failed'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })
}

export function buildSalesLabConfirmation({
  name,
  seats,
}: SalesLabApplicant): SalesLabConfirmationContent {
  const firstName = name.trim().split(/\s+/)[0] || 'participant'
  const greeting = 'Bună, ' + firstName + '!'
  const seatLabel = seats === 1 ? '1 participant' : seats + ' participanți'
  const subject = 'Am primit solicitarea ta – Sales Lab, 21–22 ianuarie 2027'
  const text = [
    greeting,
    '',
    'Îți mulțumim pentru interesul față de Sales Lab. Am primit cererea ta de înscriere.',
    '',
    'Sales Lab – curs practic de vânzări și negociere',
    'Perioada: 21–22 ianuarie 2027',
    'Locul: București (adresa exactă va fi comunicată ulterior)',
    'Format: 2 zile, 16 ore, în sală',
    'Preț: 600 EUR / participant',
    'Locuri solicitate: ' + seatLabel,
    '',
    'IMPORTANT: Acest email confirmă doar primirea solicitării. Locul nu este încă rezervat și nu a fost efectuată nicio plată.',
    'Revenim personal cu disponibilitatea locurilor, condițiile și pașii de înscriere.',
    '',
    'Ai o întrebare? Răspunde direct acestui email sau scrie-ne la contact@bogdanvizitiu.com.',
    '',
    'Bogdan Vizitiu',
    'https://bogdanvizitiu.com/sales-lab',
  ].join('\n')

  const html = [
    '<!doctype html>',
    '<html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#faf9f6;color:#182126;font-family:Arial,Helvetica,sans-serif;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#faf9f6;">',
    '<tr><td align="center" style="padding:32px 16px;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#ffffff;">',
    '<tr><td style="background:#d7e6ee;padding:28px 32px;">',
    '<p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;font-weight:bold;color:#315f78;">BOGDAN VIZITIU · SALES LAB</p>',
    '<h1 style="margin:0;font-family:Georgia,serif;font-size:32px;line-height:1.2;font-weight:normal;">Am primit solicitarea ta.</h1>',
    '</td></tr><tr><td style="padding:28px 32px;">',
    '<p style="font-size:18px;margin:0 0 16px;">' + escapeHtml(greeting) + '</p>',
    '<p style="font-size:15px;line-height:1.7;margin:0 0 24px;color:#40535d;">Îți mulțumim pentru interesul față de Sales Lab. Cererea ta de înscriere a fost înregistrată pentru verificare.</p>',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#e8f1f5;"><tr><td style="padding:20px 22px;font-size:14px;line-height:1.9;">',
    '<strong style="font-size:18px;">Sales Lab</strong><br>',
    '<strong>Perioada:</strong> 21–22 ianuarie 2027<br>',
    '<strong>Locație:</strong> București (adresa exactă urmează)<br>',
    '<strong>Format:</strong> 2 zile · 16 ore · în sală<br>',
    '<strong>Preț:</strong> 600 EUR / participant<br>',
    '<strong>Locuri solicitate:</strong> ' + escapeHtml(seatLabel),
    '</td></tr></table>',
    '<p style="font-size:15px;line-height:1.7;margin:24px 0 12px;"><strong>Ce urmează?</strong> Revenim personal pentru a confirma disponibilitatea și a comunica detaliile de plată și înscriere.</p>',
    '<p style="font-size:14px;line-height:1.65;border-left:3px solid #315f78;padding:10px 16px;margin:16px 0 24px;background:#f4f8fa;"><strong>Important:</strong> acest mesaj confirmă doar primirea cererii. Locul nu este încă rezervat și nu a fost efectuată nicio plată.</p>',
    '<a href="https://bogdanvizitiu.com/sales-lab" style="display:inline-block;padding:13px 18px;background:#182126;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;">Vezi detaliile cursului</a>',
    '</td></tr><tr><td style="border-top:1px solid #d5dde0;padding:20px 32px;font-size:13px;line-height:1.65;color:#53636b;">',
    'Ai întrebări? Răspunde direct la acest mesaj sau scrie la <a href="mailto:contact@bogdanvizitiu.com" style="color:#315f78;">contact@bogdanvizitiu.com</a>.<br>Bogdan Vizitiu',
    '</td></tr></table></td></tr></table></body></html>',
  ].join('\n')

  return { subject, text, html }
}

async function sendBrevoConfirmation(
  input: SendSalesLabConfirmationInput,
  content: SalesLabConfirmationContent,
): Promise<boolean> {
  if (!input.brevoKey) return false

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': input.brevoKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Bogdan Vizitiu',
          email: input.brevoSenderEmail || input.replyTo,
        },
        to: [{ email: input.email, name: input.name }],
        replyTo: { email: input.replyTo, name: 'Bogdan Vizitiu' },
        subject: content.subject,
        htmlContent: content.html,
        tags: ['sales-lab', 'registration-request'],
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (response.ok) return true
    console.error('Sales Lab Brevo acknowledgement failed', response.status)
  } catch {
    console.error('Sales Lab Brevo acknowledgement could not be sent')
  }
  return false
}

async function sendResendConfirmation(
  input: SendSalesLabConfirmationInput,
  content: SalesLabConfirmationContent,
): Promise<boolean> {
  if (!input.resendKey || !input.resendFrom) return false

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + input.resendKey,
        'Content-Type': 'application/json',
        'User-Agent': 'bogdanvizitiu.com/sales-lab-confirmation',
      },
      body: JSON.stringify({
        from: input.resendFrom,
        to: [input.email],
        reply_to: input.replyTo,
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (response.ok) return true
    console.error('Sales Lab Resend acknowledgement failed', response.status)
  } catch {
    console.error('Sales Lab Resend acknowledgement could not be sent')
  }
  return false
}

/**
 * Prefer Brevo if its server-side API key is configured.
 * Resend is an existing verified fallback to avoid blocking transactional replies.
 */
export async function sendSalesLabConfirmation(
  input: SendSalesLabConfirmationInput,
): Promise<ConfirmationDelivery> {
  const content = buildSalesLabConfirmation(input)
  if (await sendBrevoConfirmation(input, content)) return 'brevo'
  if (await sendResendConfirmation(input, content)) return 'resend'
  return 'failed'
}

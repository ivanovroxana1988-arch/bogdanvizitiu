# Brevo account setup — Bogdan Vizitiu Newsletter

Status as of 2026-11-03: **Ready-to-configure draft, not yet created in Brevo**. Do not put secrets into Git, an issue or chat. This draft is stored in a PR branch that is not live.

## A. List in Brevo

- Navigate: Contacts → Lists → Create list
- Name: **Bogdan Vizitiu – Newsletter**
- Folder: use an existing `Bogdan Vizitiu` folder or create one; remember the folder ID if using the API
- Start with an **empty list**, without importing prior contacts
- Use the Brevo-generated **numeric list ID** for `BREVO_LIST_ID`
- For v1, use the single main list; topic metadata/segmentation will be refined after the launch

## B. Mandatory double-opt-in template (RO)

- Template name: **Bogdan Vizitiu – Confirmare abonare (RO)**
- Type: **Transactional email / double opt-in template**
- Sender name: **Bogdan Vizitiu**
- Sender address: **An approved address at bogdanvizitiu.com** (e.g. newsletter@bogdanvizitiu.com only if that mailbox/sender is available and verified)
- Subject: **Confirmă abonarea la ideile lui Bogdan**
- Preheader: **Un singur click și abonarea este activă.**
- Body:

  Buna,

  Ai solicitat să primești prin email idei practice despre leadership, negociere, vânzări și relații profesionale.

  Ca să fim siguri că această adresă îți aparține, te rugăm să confirmi abonarea.

  **[Confirmă abonarea]({{ params.DOIurl }})**

  După confirmare, vei primi ocazional articole, resurse și informații despre programele lui Bogdan. Te poți dezabona în orice moment.

  Dacă nu ai solicitat abonarea, ignoră acest mesaj. Nu vei fi adăugat(ă) în lista de newsletter.

  Bogdan Vizitiu

  Politica de confidențialitate: https://bogdanvizitiu.com/confidentialitate

  Textul de consimțământ afișat în formular: „Sunt de acord să primesc newsletterul Bogdan Vizitiu. Mă pot dezabona oricând.”

- **Important**: Link URL on button must be exactly `{{ params.DOIurl }}` for the **DOI contact API** used in `app/api/newsletter/route.ts`. Do **not** paste the confirmation page URL as the button URL.
- Include only confirmation content; no promotional offer in this confirmation email.
- Keep the DOI template active in Brevo and take its numeric ID for `BREVO_DOI_TEMPLATE_ID`.
- The subscription is not active until the recipient follows the Brevo confirmation link.

## English alternative (optional later)

- Name: **Bogdan Vizitiu – Subscription confirmation (EN)**
- Subject: **Confirm your subscription to Bogdan's newsletter**
- Preheader: **One click to complete your subscription.**
- Body:

  Hello,

  You asked to receive occasional insights about leadership, negotiation, sales, and professional relationships.

  Please confirm that this email address belongs to you.

  **[Confirm my subscription]({{ params.DOIurl }})**

  You can unsubscribe at any time. If you did not request this subscription, ignore this message and you will not be added.

  Bogdan Vizitiu

  Privacy policy: https://bogdanvizitiu.com/en/privacy

If English subscribers are served from a separate confirmation template, extend the API route to select the template ID by locale; currently it uses **one** `BREVO_DOI_TEMPLATE_ID` for both languages. Launch with the Romanian template unless English language parity is completed.

## C. Generate API key inside Brevo

- Brevo → Settings → SMTP & API → API Keys & MCP → Generate API key
- Suggested name: **bogdanvizitiu.com – website newsletter DOI**
- Prefer **Restricted** access to only the contact double-opt-in resource; test exact needed permissions. Avoid Full access.
- Key is only displayed once. **Do not paste it into ChatGPT, GitHub, email or screenshots.**
- Store it directly in Vercel → bogdanvizitiu → Settings → Environment Variables, key `BREVO_API_KEY`, Sensitive, server-side. Choose Preview first for end-to-end tests; Production only after approval.
- Store `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`, and `BREVO_DOI_REDIRECT_BASE_URL=https://bogdanvizitiu.com` in the same environment (IDs and base URL are not secret).
- **No SMTP key is needed** for the current API implementation.
- Keep the key off `NEXT_PUBLIC_` variables.

## D. Sending domain

Brevo → Settings → Senders, Domains, IPs → Domains → add and authenticate the sender domain. Use **only Brevo-generated DNS values** for the appropriate domain, and do not overwrite existing DMARC without reviewing it. Domain validation and sender approval are prerequisites for sending real DOI emails.

## E. Functional acceptance

1. Test with an email address under your control on **preview** (not public live).
2. Form returns a neutral “check your email” message, without revealing whether the address is already subscribed.
3. Confirmation email is received (sender/DKIM verified); button uses Brevo `{{ params.DOIurl }}` and redirects to `/newsletter-confirmat`.
4. Verify the confirmed contact appears in the correct list; unconfirmed addresses do not receive campaigns.
5. Verify unsubscribe works; no auto-join from contact and course forms.
6. Review the RO/EN legal draft and the separate cookie choices.
7. Pass code CI and approve any production release.

## Documentation references
- https://developers.brevo.com/reference/create-doi-contact
- https://developers.brevo.com/reference/create-list
- https://help.brevo.com/hc/en-us/articles/40159485019794-Create-and-manage-your-API-keys
- https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC

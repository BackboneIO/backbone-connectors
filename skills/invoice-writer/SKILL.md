---
name: invoice-writer
description: Writes invoice drafts for businesses in Germany and Austria. Use when the user says "write an invoice", "Rechnung schreiben" or "Rechnung erstellen", hands over notes, a timesheet or hours to bill, or asks to turn work into invoice lines. Groups the notes into clear line items and builds a complete draft with the mandatory details (Germany § 14 Abs. 4 UStG, Austria § 11 UStG 1994), including the small-business (Kleinunternehmer) and reverse-charge notes. On first use it asks once for the company details and saves them, so it never asks again. Never invents an invoice number, amount or tax detail. Drafts only, the user reviews and issues.
---

# Invoice writer DE/AT

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only what the user gives and the saved company details. Works with any AI chat. If Backbone's AI connector is connected, it reads and saves the company details in Backbone and can put the draft there.

Checked on 20/10/2026 against § 14 and § 14a UStG, § 19 UStG, §§ 31, 33 and 34a UStDV (Germany) and § 11 and § 6 Abs. 1 Z 27 UStG 1994 (Austria).

Answer in the user's language. Write the invoice in the language the client reads (German or English).

## Rules

- **Draft only.** Never issue, number, send or post an invoice. The user reviews it and issues it in their invoicing software.
- **Never invent** a number, date, amount, tax ID, address or bank detail. Leave a placeholder like `[Rechnungsnummer]` and list it at the end.
- **No invoice number.** Numbering is done by the user's software or by the user (one unique number per invoice; in Austria sequential). Always leave `[Rechnungsnummer]`.
- **Copy the facts exactly.** Client name, hours, rates and dates stay as given. Ask about anything unclear instead of guessing.
- **No tax or legal advice.** The draft follows the rules below; it is not a guarantee. For a special case (a client outside the EU, goods instead of services, a construction service under § 13b UStG), point to the user's tax adviser.

## 0. First run: your setup

Before the first invoice, the skill needs the user's company details. Look for them in this order and stop at the first place that has them:

1. **This file:** the section **Your setup** at the end of this SKILL.md. If it holds the details, use them and do not ask.
2. **Backbone connected:** call `get_settings`. If company name, address, a tax ID and bank details are there, use them and do not ask.
3. **Saved earlier:** the assistant's memory, the project's instructions or files, or a `company-profile.md` the user attached.
4. **Nothing found:** ask once, before the first invoice, in one short message:

   > To write your invoices I need your company details once. I'll save them so I won't ask again:
   > 1. Company name (as on the invoice)
   > 2. Address
   > 3. Country: Germany or Austria
   > 4. VAT ID (USt-IdNr. / UID) or tax number (Steuernummer)
   > 5. Small business (Kleinunternehmer)? yes / no
   > 6. Bank: IBAN and BIC
   > 7. Contact email
   > 8. Optional: logo, payment terms (e.g. "14 days, no deduction")
   > 9. Optional: the language of your invoices (German, English or per client) and anything that should be on every invoice

   If the user answers only in part, ask only for what is still missing. If they have no VAT ID and no tax number, say that one of them must be on a German invoice (Austria: the UID, unless a small business) and leave a placeholder.

**Confirm before saving.** Show the details back as a short list and ask "Save like this?". Save only after a yes.

**Where to save** (every place that applies):

- **In this file, if your AI tool can edit files** (for example Claude Code, Codex, Gemini CLI or Grok Build, with the skill in a folder on your computer): replace the text under **Your setup** at the end of this SKILL.md with the confirmed details, in the company-profile format below, and say that you did. The skill is then set up for this person and never asks again. Never write passwords or logins into it. A skill uploaded to a chat app usually cannot change itself; then use the next options.
- **Backbone connected:** `update_business_info` (name, address, postal code, city, country, VAT ID, tax number, IBAN, BIC, contact email) and `update_tax_scheme` for the small-business setting. On newer connections both are one tool, `update_company`. Only fields the user gave; set `no_tax_id` only if the user said they have neither and want none. The logo is uploaded in Backbone under Settings; payment terms are set per invoice (default 14 days).
- **Otherwise:** save them where the AI app keeps things across chats, and say where:
  - **ChatGPT:** in memory (if the user has it on), or in the instructions or files of a Project.
  - **Claude:** in memory (if the user has it on), or in a Project's instructions or knowledge.
  - **Always also** give the details as a small `company-profile.md` block to copy, so the user can keep it, add it to a Project or attach it next time. If the app cannot remember anything, say so honestly: the user pastes the block under **Your setup** in their own copy of this skill, or attaches `company-profile.md` to the next chat. Without either, the skill asks each time.

```markdown
# Company profile (invoice-writer)
Company: …
Address: …
Country: Germany | Austria
VAT ID / UID: …
Tax number: …
Small business: yes | no
IBAN: … · BIC: …
Contact email: …
Payment terms: …
Logo: yes (file) | no
```

**Never ask again** once the details are saved. Use them for every invoice. If the user says "change company details" ("Firmendaten ändern") or gives a new detail (new address, new IBAN), show the change, confirm it and save it the same way, in the same place (including **Your setup** in this file). If the user moves from small business to standard VAT (or back), update that setting and mention it on the next invoice.

## 1. Collect the facts for this invoice

From the user, their notes or Backbone (`list_unbilled_time` for open hours, `get_client` for the client): client name and address, business or private client, the client's country and VAT ID (needed for reverse charge, and in Austria above 10,000 euros gross for a business client), service period, what was done, hours or quantities, rate or price. Ask only for what is missing, in one message.

## 2. Find the case

- **Country:** the user's country decides the rules (from the company details).
- **Small business:** no VAT. Germany: "Steuerbefreit nach § 19 UStG (Kleinunternehmer)." Austria: "Umsatzsteuerfrei aufgrund der Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27 UStG."
- **Reverse charge:** a business client in another EU country, for a service. No VAT line and no "0 % VAT" line. Both VAT IDs on the invoice. Germany: "Steuerschuldnerschaft des Leistungsempfängers"; Austria: "Übergang der Steuerschuld auf den Leistungsempfänger (Reverse Charge)". Issue by the 15th of the month after the service. For details the eu-reverse-charge skill helps.
- **Small amount:** Germany up to 250 euros gross (§ 33 UStDV), Austria up to 400 euros gross (§ 11 Abs. 6 UStG): fewer details are enough, but a full invoice is never wrong. Write the full one unless the user asks.
- **Standard:** VAT at the rate the user names. Germany 19 % or 7 %, Austria 20 %, 13 % or 10 %. Do not choose the rate; if the user did not name one, ask, or if Backbone is connected leave it to the workspace default.

## 3. Write the line items

- Group the notes by project or kind of work. One line per group: a clear description of the service (what was done, not how long the notes were), quantity (hours or pieces), unit, unit price.
- Turn raw entries ("call", "call 2", "wireframes v2") into plain, factual text. No marketing words.
- Flag entries with no description or no hours instead of dropping them.
- Hours: keep the hours as given; if the user rounds, round the total, not each entry, and say so.

## 4. Build the draft

**Germany, standard invoice (§ 14 Abs. 4 UStG):** issuer's name and address; client's name and address; issuer's tax number or VAT ID; issue date; `[Rechnungsnummer]`; quantity and type of the service; service date or period (the calendar month is enough, § 31 Abs. 4 UStDV); net amount per VAT rate; VAT rate and VAT amount (or the exemption note). Should: payment terms, bank details, the payment reference. For a private client in Germany, suggest adding: "Sie kommen spätestens 30 Tage nach Fälligkeit und Zugang dieser Rechnung in Verzug." (§ 286 Abs. 3 BGB; without it the 30-day rule does not apply to private clients).

**Austria, standard invoice (§ 11 UStG 1994):** issuer's name and address; client's name and address; quantity and description of the service; date or period of the service; net amount; VAT rate (or the exemption note); VAT amount; issue date; `[Rechnungsnummer]` (sequential); issuer's UID; above 10,000 euros gross for a business client also the client's UID.

**Amounts:** quantity × unit price per line, net total, VAT and gross total. Show the calculation so the user can check it. If Backbone is connected, the software calculates; do not put your own totals into Backbone.

## 5. Output

1. The invoice draft as a clean block: header (issuer, client), `[Rechnungsnummer]`, dates, the line items in a table, totals, the tax note, payment terms and bank details.
2. A short list: placeholders still to fill and anything that looked unclear in the notes.
3. Optional on request: a short cover email in the user's tone.

**Backbone connected:** offer to create the draft there (`create_invoice`, on newer connections `create_document`, or `add_time_to_document` for open hours). It stays an unnumbered draft; Backbone gives it its number when the user issues it after checking. Never issue or send without the user's explicit OK.

**Without a connected invoicing tool:** the user copies the draft into their invoicing software, which gives the number. A text, Word file or plain PDF is not an e-invoice: in Germany, invoices between German businesses must be e-invoices (ZUGFeRD, XRechnung) from 2027 or 2028; point to the e-invoice-check skill if the user asks.

In German, call it "Rechnungsentwurf", the lines "Positionen" and the period "Leistungszeitraum".

## Your setup

Not set up yet. The first run fills this in (step 0), if the AI tool can edit this file.

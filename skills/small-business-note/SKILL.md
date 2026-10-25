---
name: small-business-note
description: Small-business exemption wording for invoices in Germany and Austria (Kleinunternehmerregelung). Use when the user says "Kleinunternehmer", "small-business note" or "§ 19 UStG", asks what to write on an invoice without VAT, or hands over an invoice or invoice template to check. Checks or writes the exemption note (Germany § 19 UStG with § 34a UStDV, Austria § 6 Abs. 1 Z 27 UStG), checks the 2025 thresholds against the turnover the user gives, and flags VAT shown by mistake. Never changes the user's file.
---

# Small-business exemption wording

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only what the user gives. Works with any AI chat.

Checked on 16/10/2026 against § 19 UStG and § 34a UStDV (Germany, thresholds read on 28/08/2026) and § 6 Abs. 1 Z 27 and § 11 UStG (Austria, thresholds from WKO, read on 28/08/2026).

Answer in the user's language. Write the invoice note in the invoice's language.

## Rules

- **Read, never edit.** Do not change the user's file; give corrected text to copy.
- **Never invent** turnover figures. Work only with the numbers the user gives.
- **No tax advice.** Whether the user may use the exemption, or should opt out of it, is for their tax adviser. You explain the rules and the wording. Say once in your answer that this is not tax advice. Figures, thresholds and deadlines are as of the check date; if today is later or a figure matters for a decision, tell the user to verify it (official source or tax adviser).

## 1. Find the country and the task

- Germany or Austria: the user's place of business decides.
- Task: check an existing note or invoice, write a new note, or check the thresholds. Do what the user asks; if unclear, do all three briefly.

## 2. The note

Neither country prescribes exact wording. It must say clearly that the small-business exemption applies.

**Germany.** Since 2025 small-business sales are tax-exempt; § 34a UStDV asks for a note that the § 19 UStG exemption applies.

- German, short: `Steuerbefreit nach § 19 UStG (Kleinunternehmer).`
- German, long: `Für diese Lieferung/sonstige Leistung gilt die Steuerbefreiung für Kleinunternehmer nach § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen.`
- English invoice: add `VAT-exempt small business under § 19 UStG.`
- The widely copied old sentence `Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.` comes from the rules before 2025. It is accepted in practice; suggest the exemption wording when the user edits the template anyway. Do not call it invalid.

**Austria.**

- German: `Umsatzsteuerfrei aufgrund der Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27 UStG.`
- English invoice: add `VAT-exempt under the small-business scheme, § 6 (1) no. 27 UStG.`

## 3. The rest of the invoice

**Germany (§ 34a UStDV):** names and addresses of both sides, tax number or VAT ID, issue date, quantity and type of the service, the amount as one sum, the exemption note. No VAT rate, no VAT amount, no "0 % VAT" line. An invoice number is not required, but recommend a sequential one for the books. Small businesses do not have to issue e-invoices, but must be able to receive them since 2025.

**Austria:** no VAT shown, the exemption note. Since 2025 a small business may use the simplified invoice at any amount (issue date, own name and address, quantity and type of service, date of the service, the total). Its own UID is not required.

**VAT shown by mistake** (a VAT line, a rate, "incl. 19 % VAT"): flag it first. On an invoice to a business the VAT shown is owed until the invoice is corrected (Germany § 14c UStG, Austria § 11 Abs. 12 UStG). Suggest a correction invoice.

## 4. Thresholds (from 2025)

| | Germany (§ 19 UStG) | Austria (§ 6 Abs. 1 Z 27 UStG) |
| --- | --- | --- |
| Previous year | at most 25,000 euros, net | at most 55,000 euros, gross |
| Current year | at most 100,000 euros, net | at most 55,000 euros, gross; up to 10 % over (60,500 euros) the exemption runs to year-end |
| Over the limit | the sale that crosses 100,000 euros is already taxable | above 60,500 euros: the sale that crosses it is already taxable |

- If the user gives turnover figures, say which side of each limit they are on, and how much room is left this year.
- Close to a limit (say within 10 %): suggest talking to the tax adviser before a large job.
- Do not decide about opting out of the exemption; name it as an option for the tax adviser.

## 5. Output

1. **Verdict** in one line: "Note fits", "Note missing" or "Note outdated, still accepted".
2. The note to copy, in the invoice's language (both lines for a bilingual invoice).
3. What else is missing or wrong on the invoice, if an invoice was given.
4. The threshold check, if figures were given.

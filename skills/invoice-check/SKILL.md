---
name: invoice-check
description: Invoice checker for Germany and Austria. Use when the user says "invoice check" or "Rechnung prüfen", asks whether an invoice is complete or correct, or hands over an invoice they wrote or received (PDF, photo or pasted text). Checks it against the German mandatory details (§ 14 Abs. 4 UStG, small-amount invoice up to 250 euros under § 33 UStDV, small business under § 34a UStDV, reverse charge under § 14a UStG) or the Austrian ones (§ 11 UStG, simplified invoice up to 400 euros, Kleinunternehmer, customer UID above 10,000 euros) and lists what is missing, what is wrong and what is fine. Never changes the file.
---

# Invoice checker DE/AT

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only the invoice the user gives. Works in any AI chat that can read a PDF or a photo; pasted text works everywhere.

Checked on 16/10/2026 against § 14, § 14a and § 19 UStG, §§ 31, 33 and 34a UStDV (Germany) and § 11 UStG (Austria).

Work through the steps on your own. Ask only when the case cannot be read from the invoice (step 2). Answer in the user's language.

## Rules

- **Read, never edit.** Do not change, re-save or delete the user's file. Suggest corrections as text.
- **Never invent** a detail. If something is unreadable, say "unreadable", not "missing".
- **Only what the law asks.** Separate "must" (mandatory) from "should" (good practice). Do not call a should a must.
- **No tax or legal advice.** You check against the rules below. For a specific case, point to the user's tax adviser. Say once in your answer that this is a check, not tax or legal advice. Figures, thresholds and deadlines are as of the check date; if today is later or a figure matters for a decision, tell the user to verify it (official source or tax adviser).

## 1. Read the invoice

Note every detail you find: issuer name and address, recipient name and address, tax number, VAT ID (USt-IdNr. / UID), issue date, invoice number, description of the goods or service, service date or period, net amounts per VAT rate, VAT rate and amount, total, notes (small business, reverse charge, Gutschrift), payment terms.

## 2. Find the case

Decide from the invoice, ask only if it really cannot be told:

- **Country:** the issuer's country decides the rules (Germany or Austria).
- **Kind:** normal invoice, small-amount invoice (DE: total up to 250 euros gross, AT: up to 400 euros gross), small-business invoice (Kleinunternehmer), reverse-charge invoice (no VAT, client in another EU country or a domestic § 13b case), correction or cancellation.
- **Client:** business or private person.

## 3. Check: Germany

**Normal invoice, § 14 Abs. 4 UStG.** Must have:

1. Full name and address of the issuer and of the client
2. Issuer's tax number or VAT ID (one is enough)
3. Issue date
4. A unique invoice number (in Germany it does not have to be gap-free)
5. Quantity and type of goods, or scope and type of the service
6. Date of the service, or the period (the calendar month is enough, § 31 Abs. 4 UStDV). The issue date does not replace it.
7. Net amount broken down by VAT rate, plus any reduction agreed in advance (e.g. early-payment discount)
8. VAT rate and VAT amount, or a note on the exemption
9. Only for property-related work for a private person: a note on the client's duty to keep the invoice (§ 14b Abs. 1 Satz 5 UStG)
10. Only for self-billing: the word "Gutschrift"

**Small-amount invoice up to 250 euros gross, § 33 UStDV.** Enough: issuer's name and address, issue date, quantity and type of the service, the total including VAT and the VAT rate (or the exemption note). Not for reverse charge.

**Small business, § 34a UStDV.** Must have: names and addresses of both sides, tax number or VAT ID (or the small-business ID), issue date, quantity and type of service, the amount as one sum, a note that the § 19 UStG exemption applies. Must **not** show VAT. An invoice number is not required, but recommend one.

**Reverse charge to an EU business, § 14a UStG.** Must have: the issuer's and the client's VAT ID, the wording "Steuerschuldnerschaft des Leistungsempfängers" (adding "Reverse charge" is fine), no VAT amount and no "0 % VAT" line. Issue by the 15th of the month after the service.

## 4. Check: Austria

**Normal invoice, § 11 UStG.** Must have:

1. Name and address of the issuer
2. Name and address of the client
3. Quantity and commercial description of the goods, or type and scope of the service
4. Date or period of the service
5. The net fee
6. VAT rate, or a note on the exemption
7. VAT amount
8. Issue date and a sequential invoice number
9. Issuer's UID number
10. Only if the total is **over** 10,000 euros gross and the client is a business: the client's UID number

**Simplified invoice up to 400 euros gross, § 11 Abs. 6 UStG.** Enough: issuer's name and address, quantity and description, date of the service, issue date, the gross total and the VAT rate. Not for supplies to businesses in other EU countries.

**Small business (Kleinunternehmer).** No VAT shown, a note that the exemption under § 6 Abs. 1 Z 27 UStG applies. Since 2025 a small business may use the simplified invoice at any amount. Its own UID is not required.

**Reverse charge to an EU business.** Must have: the issuer's and the client's UID number, a note that the tax liability passes to the client (common: "Übergang der Steuerschuld auf den Leistungsempfänger (Reverse Charge)"), no VAT amount. Issue by the 15th of the month after the service.

## 5. Common mistakes to flag

- Service date or period missing (most common).
- VAT shown by a small business, or on a reverse-charge invoice: it is owed anyway until corrected (DE § 14c UStG, AT § 11 Abs. 12 UStG).
- A wrong VAT rate (DE 19 % / 7 %, AT 20 % / 13 % / 10 %): flag it as "check the rate", do not decide the rate.
- The old small-business sentence "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet": accepted in practice, but since 2025 the exemption wording fits better ("Steuerbefreit nach § 19 UStG (Kleinunternehmer).").
- A correction called "Gutschrift": in German VAT law that word means self-billing. Use "Rechnungskorrektur" or "Stornorechnung".
- Germany, invoice between two German businesses: a PDF is an "other invoice", not an e-invoice. Point to the e-invoice deadlines only if asked; for the details the user can use the e-invoice-check skill.

## 6. Report

1. One line: country, kind of invoice, business or private client.
2. A table: detail, status (ok / missing / wrong / unreadable), what to fix.
3. "Must fix" first, then "Should fix".
4. One line at the end: "Complete" or "X of Y mandatory details missing".

Offer a corrected text block for the missing parts (e.g. the exemption note or the service period). The user corrects the invoice in their own tool; an issued invoice is corrected with a correction or cancellation invoice, not by editing the old one.

---
name: eu-reverse-charge
description: EU client and reverse-charge check for service businesses in Germany and Austria. Use when the user says "reverse charge" or "Steuerschuldnerschaft", invoices a client in another country, asks whether to charge VAT to a foreign client, or hands over a cross-border invoice to check. Sorts the case (EU business with VAT ID, EU private client, client outside the EU), says whether German or Austrian VAT applies, gives the invoice wording (§ 14a UStG, § 13b UStG; Austria § 11 Abs. 1a and § 19 Abs. 1 UStG), the VAT ID check in VIES, the invoice deadline and the recapitulative statement. Services only. Never changes the user's file.
---

# EU client and reverse-charge check

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only what the user gives. Works with any AI chat.

Checked on 16/10/2026 against § 3a, § 13b, § 14a and § 18a UStG (Germany) and § 3a, § 11 and § 19 UStG (Austria).

Answer in the user's language. Give invoice wording in the invoice's language.

## Rules

- **Services only.** Selling goods, construction, services tied to property, events and passenger transport, and VAT registration abroad are not covered: say so and point to the user's tax adviser.
- **Read, never edit.** Do not change the user's file; give corrected text to copy.
- **Never invent** a VAT ID or a check result. The user checks the VAT ID; you explain how.
- **No tax advice.** You sort the standard case. For anything unusual, point to the user's tax adviser. Say once in your answer that this is not tax advice. Figures, thresholds and deadlines are as of the check date; if today is later or a figure matters for a decision, tell the user to verify it (official source or tax adviser).

## 1. Sort the case

Find out, from the invoice or by asking in one message:

- Where the user is based: Germany or Austria. Small business (Kleinunternehmer) or not.
- Where the client is: another EU country, or outside the EU (e.g. Switzerland, the UK, the USA).
- Business or private client. An EU business shows it with a valid VAT ID.
- What the service is. Flag automated digital services (downloads, software as a service, streaming) to private clients.

## 2. EU business client with a VAT ID: reverse charge

A service to a business is taxed where the client is established (Germany § 3a Abs. 2 UStG, Austria § 3a Abs. 6 UStG). The client owes the VAT in their country. The user charges **no** German or Austrian VAT.

**The invoice:**

- Both VAT IDs: the user's and the client's.
- **Germany:** the wording `Steuerschuldnerschaft des Leistungsempfängers` (§ 14a Abs. 1 UStG). Add `Reverse charge` for a foreign client; write both.
- **Austria:** a note that the tax liability passes to the client (§ 11 Abs. 1a UStG). No fixed wording; common is `Übergang der Steuerschuld auf den Leistungsempfänger (Reverse Charge)`.
- No VAT amount and no "0 % VAT" line. The net amount is the total.
- All other details of a normal invoice (number, dates, service period, addresses).
- **Deadline:** by the 15th of the month after the service.

**Check the VAT ID** before the first invoice, in the EU's VIES service (ec.europa.eu, "VIES VAT number validation"); in Germany also with the Federal Central Tax Office's confirmation service, in Austria via FinanzOnline. Keep the result with its date. Invalid or no VAT ID: treat the client as a private client until it is fixed.

**Recapitulative statement (Zusammenfassende Meldung, ZM):** report the sale. Germany: by the 25th day after the end of the quarter (§ 18a UStG). Austria: by the end of the month after the reporting period.

**Small business:**
- Germany: reverse charge applies too, because the sale is taxed in the client's country. Small businesses do not have to file the ZM. Whether the client's VAT ID must be on the invoice is not clear for small businesses: ask the tax adviser.
- Austria: to invoice an EU business the user usually needs their own UID number, also as a small business. Check with the tax office.

**Section numbers, not mixed up:** in Germany § 13b UStG is reverse charge (and the case where the user buys a service from abroad and owes the VAT); § 19 UStG is the small-business exemption. In Austria § 19 UStG is reverse charge.

## 3. EU private client

- Most services: the user's own VAT applies (Germany 19 % / 7 %, Austria 20 % / 13 % / 10 %), as at home. A small business stays exempt.
- **Automated digital services:** taxed in the client's country once the user's cross-border sales of this kind (with distance sales of goods) exceed 10,000 euros a year EU-wide, usually through the One-Stop-Shop. Flag it and point to the tax adviser.

## 4. Client outside the EU

- **Business client:** no German or Austrian VAT; the service is taxed where the client is. No EU VAT ID needed; keep proof that the client is a business (e.g. its company registration). The client's country may tax it on its side; usually the client handles that. Invoice note, German: `Nicht im Inland steuerbare Leistung.` English: `Not subject to German VAT (place of supply outside the EU).` (Austria: `Austrian VAT`).
- **Private client:** for advice, IT, data processing, marketing, licences and similar services the place of supply is where the client lives, so no German or Austrian VAT. Other services: the user's own VAT. Some countries (e.g. the UK, Switzerland) expect foreign sellers of digital services to register: flag it, not covered here.

## 5. Output

1. **The case** in one line: e.g. "Service to an EU business with a VAT ID: reverse charge, no German VAT."
2. **VAT:** charge it or not, and why (one or two sentences).
3. **Invoice note** to copy, in the invoice's language.
4. **Checklist:** VAT IDs on the invoice, VIES check saved, invoice by the 15th, ZM, and anything missing on the invoice the user gave.
5. What is not covered, if the case touches it.

---
name: receipt-routine
description: Monthly receipt routine for small businesses in Germany and Austria. Use when the user says "receipt routine" or "Belegroutine", asks which receipts are missing, or hands over a month folder or ZIP with bank, card or PayPal statements (CSV or PDF) and receipts (PDF or photos). Renames copies of the receipts to YYYY-MM-DD_Supplier_Amount without asking, matches them to the statement lines, lists the payments without a receipt for each payment stream and writes a missing-receipts CSV. Never changes, moves or deletes an original.
---

# Monthly receipt routine

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only the files the user gives. Needs an AI app that can read and write files: for example Claude with code execution or a shared folder, Codex, Gemini CLI or Grok Build.

Work through every step on your own. Do not stop to ask between steps; ask only at the very end (step 9). Answer in the user's language. Show amounts the way the statements show them (38,90 € or €38.90).

## Folder structure

The user prepares one folder per month. German and English names both work:

```
Belege-2026-09/            or  Receipts-2026-09/
  Kontoauszuege/           or  Statements/    one file per payment stream, CSV or PDF
    Girokonto.csv                             the file name is the stream's name
    Kreditkarte.pdf
    PayPal.csv
  Belege/                  or  Receipts/      every receipt of the month, PDF or photo, any names
```

You create, next to the inputs:

```
  Belege-umbenannt/        or  Receipts-renamed/
    <payment stream>/                         renamed copies of the matched receipts
    Ohne-Zahlung/          or  No-payment/    renamed copies without a payment
  Fehlende-Belege.csv      or  Missing-receipts.csv
```

Use the German names if the user's folders are German, otherwise the English ones.

- **Month:** from the folder name (`Belege-YYYY-MM` / `Receipts-YYYY-MM`), else the month the user names, else last month.
- **A ZIP:** unpack it into a working folder first.
- **Loose files without the subfolders:** treat statement exports (CSV, or PDFs that list bookings) as statements and everything else as receipts; say so in one line.
- **No statement at all:** rename the receipts, then say that matching needs the statements and stop.

## Rules

- **Never change, move or delete an original.** Rename and sort copies only.
- **Never invent** a date, supplier or amount. If a receipt cannot be read, write "unreadable" and keep its file name.
- **One receipt, one payment.** Never match a receipt to two payments, or two receipts to one payment unless they add up to it exactly.
- **No tax advice.** For a specific case, point to the user's tax adviser.

## 1. Read the statements

Each statement file is one **payment stream**, named after the file (`Girokonto`, `Kreditkarte`, `PayPal`). Read every payment of the month: booking date, payee, reference, amount, currency.

## 2. Read the receipts

For every file: issue date, supplier, gross total, currency, kind of document. Flag order confirmations and delivery notes: they are usually not an invoice.

## 3. Rename (without asking)

Scheme: `YYYY-MM-DD_Supplier_Amount.ext`, e.g. `2026-09-14_Hetzner_38,90.pdf` (decimal comma for German, point for English).

- Date: the receipt's issue date.
- Supplier: short, no legal form, hyphens instead of spaces (`Deutsche-Bahn`, not `Deutsche Bahn AG`).
- Amount: gross, two decimals, no currency sign. A credit note gets a minus: `-12,00`.
- Photos keep their extension. Same name twice: add `_2`, `_3`.

## 4. Match

For each receipt, find the payment that fits:

1. **Amount** equal to the cent. In a foreign currency, up to 3 % off is fine (exchange rate and fees); say so.
2. **Date:** from 10 days before to 5 days after the booking (card payments often book a few days later).
3. **Name:** the supplier fits the payee or the reference.

All three fit: matched. Only amount and date fit: **unsure**, keep it for step 9.

**No receipt needed** (mark them, do not list them as missing): transfers between the user's own accounts, private withdrawals, tax payments, salaries, and the debit of the credit card or PayPal on the bank account when that stream has its own statement in the folder (its payments are matched there).

Put each renamed copy into `Belege-umbenannt/<payment stream>/`, receipts without a payment into `Ohne-Zahlung/` (English: `Receipts-renamed/…`, `No-payment/`).

## 5. Report in the chat

1. For **each payment stream**, a table **"Payments without a receipt"**: date, payee, amount.
2. A table **"Receipts without a payment"**: file, date, supplier, amount (paid in cash, from another account, or not paid yet).
3. A **summary per payment stream**: payments, with receipt, without receipt, unsure, no receipt needed.
4. Unreadable files, if any.

## 6. Missing-receipts CSV

Write `Fehlende-Belege.csv` / `Missing-receipts.csv` with the columns payment stream, date, payee, amount, reference, sorted by payment stream and date. Semicolon as separator, UTF-8 with BOM, so Excel opens it cleanly.

## 7. Requests for the missing receipts

Offer one short e-mail per supplier asking for the invoice; the user sends it. Nothing to get back, like a parking machine: point to a self-made receipt (Eigenbeleg). It can support the expense but gives no input VAT.

## 8. Month folder

Zip the statements, the renamed receipts and the CSV into one file for the bookkeeper, e.g. `Belege-2026-09_Buchhaltung.zip`, and offer it for download.

## 9. Only now: questions

Show the unsure matches (receipt, payment, why unsure) and ask which ones are right. Update the folders, the CSV and the ZIP with the answers. End with one line: payments matched, receipts missing, still unsure. The originals stay untouched.

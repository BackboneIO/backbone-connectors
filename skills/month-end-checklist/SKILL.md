---
name: month-end-checklist
description: Month-end checklist for small businesses in Germany and Austria. Use when the user says "month-end", "Monatsabschluss" or "month-end checklist", asks what is still open for last month, or wants to get a month ready for the bookkeeper. Walks through the 30-minute routine (collect, upload, match, chase what is missing, hand over) in the same month folder as the receipt routine, runs the receipt-routine skill for the matching, checks issued invoices and bank statements for gaps, and ends with one list of what is still open. Never changes, moves or deletes an original.
---

# Month-end checklist

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only what the user gives. Works in any AI chat as a guided checklist. The matching in step 3 is done by the receipt-routine skill from the same library, which needs an AI app that can read and write files (for example Claude with code execution or a shared folder, Codex, Gemini CLI or Grok Build).

Checked on 16/10/2026 against the monthly receipt routine (the receipt-routine skill and our guide) and the VAT return dates in § 18 UStG (Germany) and § 21 UStG (Austria).

Answer in the user's language. Keep it short: one step at a time, the user says "done" or hands over files.

## When and how long

Once a month, in the first week of the following month: last month's statements are available and the bookkeeper has time before the VAT return. Plan 30 minutes, about 20 with the receipt routine.

## Month folder

The same folder as the receipt routine. German and English names both work:

```
Belege-2026-09/            or  Receipts-2026-09/
  Kontoauszuege/           or  Statements/          one file per payment stream, CSV or PDF
  Belege/                  or  Receipts/            every receipt of the month, PDF or photo
  Ausgangsrechnungen/      or  Invoices-issued/     optional: the invoices you sent this month
```

The receipt routine adds `Belege-umbenannt/` / `Receipts-renamed/` and `Fehlende-Belege.csv` / `Missing-receipts.csv`. This skill adds `Offene-Punkte.csv` / `Open-items.csv`.

- **Month:** from the folder name, else the month the user names, else last month.

## Rules

- **Never change, move or delete an original.** Work on copies only. Never overwrite an existing file: if `Offene-Punkte.csv` / `Open-items.csv` exists, ask before replacing it or add a number.
- **Never invent** a receipt, amount or date.
- **Do not duplicate the receipt routine.** Renaming, matching and the missing-receipts list belong to the receipt-routine skill. If it is not installed, say so and point to the free download at back-bone.io/en/tools/skill-library; carry on with the other steps.
- **No tax advice.** For a specific case, point to the user's tax adviser. Say once in your answer that this is not tax advice.

## The five steps

### 1. Collect (8 minutes)

Give the user this list and wait for "done":

- Inbox: search last month for "Rechnung", "Invoice", "Beleg" and "receipt".
- Customer accounts of subscriptions and online shops: download the invoices.
- Paper receipts from the wallet: photograph them flat and fully legible.
- Statements of **every** payment stream: business accounts, credit card, PayPal, Stripe, a savings account if it holds business money. CSV if the bank offers it, else PDF.
- The invoices the user sent last month.

### 2. Upload (4 minutes)

Everything into the month folder: statements into `Kontoauszuege/`, receipts into `Belege/`, issued invoices into `Ausgangsrechnungen/`. One file per payment stream; the file name is the stream's name.

### 3. Match (10 minutes)

Run the **receipt-routine** skill on the month folder. It renames copies of the receipts, matches them to the statements, lists the payments without a receipt for each payment stream and writes the missing-receipts CSV. Take its summary over as is.

### 4. Chase what is missing (6 minutes)

From the receipt routine's list:

- Software, subscriptions, online orders: download from the customer account, or ask the supplier for the invoice (the receipt routine drafts the emails).
- Nothing to get back (e.g. a parking machine): a self-made receipt (Eigenbeleg) with date, amount, payee, business reason, why there is no original, date and signature. It can support the expense but gives no input VAT. Keep it the exception.

Then check what the receipt routine does not cover:

- **Statements complete:** every payment stream has a statement for the whole month, and each statement's opening balance equals last month's closing balance. Name any gap.
- **Issued invoices:** the invoice numbers of the month run on from last month without unexplained gaps; list every invoice still unpaid (match incoming payments in the statements by amount and invoice number, else ask the user).

### 5. Hand over (2 minutes)

One folder per month goes to the bookkeeper: issued invoices, receipts, statements, plus the list of what is still open. Use the receipt routine's ZIP (e.g. `Belege-2026-09_Buchhaltung.zip`) and add `Ausgangsrechnungen/` and `Offene-Punkte.csv` to it, or offer a new ZIP with the same content.

Remind the user of the VAT return date if they file monthly: Germany, the 10th of the following month (one month later with a permanent extension); Austria, the 15th of the second month after the period.

## Output

1. A checklist of the five steps: done, open, or skipped (with why).
2. **Open items** in one table: type (missing receipt, unpaid invoice, statement gap, unsure match), date, who, amount, next action.
3. `Offene-Punkte.csv` / `Open-items.csv` with the same columns, semicolon-separated, UTF-8 with BOM.
4. One closing line: receipts matched, receipts missing, invoices unpaid, statements complete yes or no.

---
name: reminder-writer
description: Writes payment reminders in the user's own tone, in German or English, for businesses in Germany and Austria. Use when the user says "payment reminder", "Zahlungserinnerung" or "Mahnung", asks how to chase an unpaid invoice, or hands over an overdue invoice or a list of open invoices. Writes three levels (a friendly reminder, a second reminder and a final notice) with default interest and the 40 euro flat fee where the law allows them (Germany § 288 BGB, Austria § 456 and § 458 UGB, § 1000 ABGB). Drafts only, never sends anything.
---

# Payment reminders in your tone

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only what the user gives. Works with any AI chat.

Checked on 16/10/2026 against § 286 and § 288 BGB (Germany), § 456 and § 458 UGB and § 1000 ABGB (Austria); § 907a ABGB and § 6a KSchG (Austria) added on 20/10/2026. Base rates as of that day: Germany 1.52 % (from 01/07/2026), Austria 1.53 % (for the half-year from 01/07/2026).

Answer in the user's language. Write the reminders in the language the client reads (German or English).

## Rules

- **Draft only.** Never send, schedule or post anything. The user sends.
- **Never invent** an amount, date, invoice number or bank detail. Leave a placeholder like `[IBAN]` instead.
- **Stay polite at every level.** Firm, never rude, no threats beyond what the law allows (interest, the flat fee, a collection agency or court).
- **No legal advice.** For a dispute, a disputed invoice or a client abroad with a contract under foreign law, point to the user's lawyer or tax adviser.

## 0. First run: your setup

Look at **Your setup** at the end of this SKILL.md first. If it is filled in, use it and do not ask these questions again.

If it says "Not set up yet", ask once, before the first reminder, in one short message:

> So your reminders sound like you, a few questions once:
> 1. Your country: Germany or Austria
> 2. Your name or company, and how you sign off
> 3. du, Sie or English? Or paste two or three emails you wrote to clients
> 4. Your clients: mostly businesses, mostly private, or both
> 5. The new deadline you usually give in a first reminder (for example 14 days)
> 6. Are your bank details in your email signature? yes / no

Show the answers back as a short list and ask "Save like this?". Then:

- **If your AI tool can edit files** (for example Claude Code, Codex, Gemini CLI or Grok Build, with the skill in a folder on your computer): replace the text under **Your setup** with the answers, as a short list, and say that you did. Later runs read it from there. Keep only the tone notes from the sample emails, never client names or amounts.
- **Otherwise:** save the answers in the app's memory or a Project's instructions, if the user has them, and give the list to copy into **Your setup** in their own copy of this skill. If the app cannot remember anything, say so honestly: the skill asks again next time.

If the user says "change my setup" or gives a new detail (new sign-off, new country), update it the same way.

## 1. Learn the tone

If **Your setup** holds the tone, use it. If the user gives earlier emails or texts they wrote (two or three are enough), copy their tone: du/Sie or first names, greeting, sentence length, sign-off. Otherwise ask once, in one message: "du or Sie (or English)? Formal or relaxed? How do you sign off? Or paste two emails you wrote to clients." Then keep that tone for all three levels. Unless the samples say otherwise: short, friendly, no legalese.

## 2. Collect the facts

From the invoice or the user: client name, business or private client, country of the user (Germany or Austria), invoice number and date, amount, due date, what was agreed on payment, earlier reminders and their dates, bank details. Ask only for what is missing, before writing; use placeholders only if the user wants the draft right away. Keep the facts exactly as given. If the user says the bank details are in their signature, do not repeat them in the text.

## 3. When is the client in default?

**Germany (§ 286 BGB):**
- With the first reminder after the due date, or without one if a calendar date for payment was agreed.
- At the latest 30 days after the due date and receipt of the invoice. For a **private client** only if the invoice pointed this out.

**Austria:** in default as soon as the money is not in the user's account on the due date (§ 907a Abs. 2 ABGB). A private client only has to order the transfer by then (§ 6a Abs. 2 KSchG). No reminder is needed for default.

## 4. Interest and the flat fee

| | Business client | Private client |
| --- | --- | --- |
| Germany | base rate + 9 points (10.52 % a year from 01/07/2026), plus a 40 euro flat fee (§ 288 BGB) | base rate + 5 points (6.52 % a year), no flat fee |
| Austria | base rate + 9.2 points (10.73 % a year for 01/07 to 31/12/2026, § 456 UGB), plus a 40 euro flat fee (§ 458 UGB) | 4 % a year (§ 1000 ABGB), no flat fee |

- Interest runs from the first day of default. Per day: amount × rate ÷ 100 ÷ 365 × days. Show the formula and the result; the user checks it.
- The base rates change on 1 January and 1 July. If today is after 31/12/2026, tell the user to check the current base rate (Deutsche Bundesbank, OeNB) before sending. Backbone's free late-payment interest calculator does it to the day (back-bone.io/en/tools/late-payment-interest-calculator).
- Client abroad: the German or Austrian rates only apply if the contract is under that law. In the EU, business to business, the Late Payment Directive sets a floor of the reference rate + 8 points and 40 euros. Name the law and currency, and suggest checking with an adviser.
- Never pick a rate or add a fee beyond this table. If the user's invoicing software calculates the interest (if Backbone is connected: `calculate_late_interest`, on newer connections part of `get_document`), take its figure.
- Interest and the flat fee are optional. Many users leave them out of the first reminder to keep the relationship; suggest that.

## 5. Before you write: what stays with the user

Ask, or point it out, before writing a level 2 or 3:

- **Disputed invoice:** do not chase. Suggest pausing the reminders and calling the client first.
- **Long-standing client:** suggest a call before the second reminder; a call often works better.
- **The last step** (collection agency or court) is the user's decision. Write level 3 only when the user asks for it.

## 6. Write the three levels

If the user asks for one reminder only (for example "a friendly payment reminder"), write that level only.

**Level 1: friendly reminder (Zahlungserinnerung).** Short and friendly, assumes an oversight. Invoice number and date, amount, original due date, bank details and payment reference, "if you have already paid, please ignore this". If the user gives a new deadline, add it as a friendly "please pay by [date]" (often 14 days). No interest, no fees, no legal steps.

**Level 2: second reminder (Mahnung).** Clear: still open after the reminder of [date], now [x] days overdue. A new deadline, 7 to 14 days. Mention default interest from the start of default (and for business clients the flat fee). Offer to talk if something about the invoice is unclear.

**Level 3: final notice (Letzte Mahnung).** Amount, interest for [x] days, flat fee (business clients only) and the new total in a small table. A last deadline. Say what happens next: handing the claim to a collection agency or taking legal steps, with further costs. No other threats.

Every level has: a subject line with the invoice number, the open amount, the due date, the new deadline (levels 2 and 3), bank details and payment reference, a contact for questions, the user's sign-off.

## 7. Output

1. The three texts (or the one level asked for), each ready to copy, in the client's language.
2. Under level 3: the interest calculation in one line.
3. A short list of what the user still has to fill in (placeholders).

In English, call the levels "payment reminder", "second reminder" and "final notice"; in German "Zahlungserinnerung", "Mahnung" and "Letzte Mahnung".

## Your setup

Not set up yet. The first run fills this in (step 0), if the AI tool can edit this file.

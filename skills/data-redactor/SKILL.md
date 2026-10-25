---
name: data-redactor
description: Removes or pseudonymises personal data in texts and documents before they are shared with any AI. Use when the user says "redact", "anonymise", "pseudonymise" or "Daten schwärzen", wants to share a client email, contract, invoice, PDF or CSV with an AI tool without personal data, or wants names put back into an AI's answer. Replaces names, addresses, emails, phone numbers, IBANs, tax and VAT IDs, dates of birth and similar with placeholders like [PERSON_1], writes a redacted copy plus a local mapping table so the names can be re-inserted later, and explains what it cannot catch. Never changes the original, never uploads or sends anything.
---

# Data redactor

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone. Pasted text works in any AI chat. For documents (PDF, Word, CSV, Excel) and the mapping table it needs an AI app that can read and write files: for example Claude with code execution or a shared folder, Codex, Gemini CLI or Grok Build.

Checked on 16/10/2026.

Answer in the user's language.

## Know the limit first

Tell the user once, at the start, in two sentences: **the app this skill runs in sees the original.** Run it where the original may go (a plan your business uses for client data, or a coding agent on the user's own computer with script mode, below), then share only the redacted copy with any other AI.

## Rules

- **Never change, move or delete an original.** Write a redacted copy next to it. Never overwrite an existing file: if the name is taken, add a number (`_2`).
- **Never upload, send or look anything up.** No web search, no other service, no sharing link. Everything stays in the files and the chat the user already uses.
- **The mapping table stays with the user.** Never include it in the redacted copy, never in a summary meant for sharing.
- **When in doubt, redact.** A name too many is cheaper than one too few.
- **No legal advice.** Whether data may be shared at all (GDPR, a processing agreement, professional secrecy) is for the user and their data protection or legal adviser. Say once in your answer that this is not legal advice.

## 1. What to replace

Use numbered placeholders that keep the meaning, the same placeholder for the same value everywhere:

| Data | Placeholder |
| --- | --- |
| People's names, also in email addresses and signatures | `[PERSON_1]` |
| Company and client names (if the user wants them out) | `[COMPANY_1]` |
| Street addresses (street, number, postcode, city) | `[ADDRESS_1]` |
| Email addresses | `[EMAIL_1]` |
| Phone numbers | `[PHONE_1]` |
| IBAN, BIC, account and card numbers | `[IBAN_1]`, `[CARD_1]` |
| Tax numbers, VAT IDs (USt-IdNr., UID), social security numbers, ID card and passport numbers | `[TAXNO_1]`, `[VATID_1]`, `[ID_1]` |
| Dates of birth | `[BIRTHDATE_1]` |
| Health, religion, union membership and other special data | `[SPECIAL_1]`, and tell the user |
| Customer numbers, contract numbers, URLs or user names that point to a person | `[REF_1]` |

Keep what the task needs and is not personal: amounts, invoice dates, due dates, item descriptions, the user's own business data if they say so. Ask once, in one message, what may stay (e.g. "keep company names and amounts?"); then work on your own.

## 2. Texts

1. Replace as above.
2. Show the redacted text, ready to copy.
3. Show the mapping table separately, marked "keep, do not share".

## 3. Documents

- **PDF:** extract the text (and the text of each page). A scan or photo without a text layer: say so; you can redact the extracted text, but do not promise a clean PDF. Write the redacted copy as a new text or Markdown file, or as a new PDF if the app can make one. Never overlay black boxes on the original: the text underneath stays readable.
- **Word, text, email files:** a redacted copy in the same format where possible, else as text.
- **CSV and Excel:** keep the columns. Redact whole columns that hold personal data (name, email, IBAN) and personal data inside free-text columns. Keep amounts and dates.
- **Also check:** headers and footers, email signatures, file metadata (author, title) and the file name itself. Name the copy without personal data, e.g. `Contract_redacted.pdf`.

**Script mode** (coding agents on the user's own computer): write a small local script that replaces the patterns (emails, IBANs, phone numbers, VAT IDs, postcodes) and a list of names the user gives, run it on the files, and only then read the redacted copies. That way the raw content is read as little as possible. Show the script so the user can see what it does.

## 4. Mapping table

Write `Mapping_<file>.csv` next to the redacted copy (in the same folder as the original, never inside the redacted copy): placeholder, original value, type. Semicolon-separated, UTF-8 with BOM. Tell the user to keep it local and delete it when no longer needed.

## 5. Put names back

When the user brings back an AI's answer with placeholders, replace each placeholder with its original from the mapping table. List any placeholder you could not find and any new one the other AI invented.

## 6. Check and limits

Before you hand over, scan the redacted copy once more for anything that still looks personal (capitalised names, @, digits that look like an IBAN or phone number) and fix it.

Then say plainly what redaction cannot do:

- Context can still identify a person ("the only dentist in town", a rare job title, a unique project).
- Images, logos, signatures and handwriting inside documents are not redacted.
- Scans without a text layer can hide text you could not read.
- Pseudonymised data is still personal data under the GDPR as long as the mapping table exists.

## Output

1. The redacted text or the path of the redacted copy.
2. The mapping table (or its path), marked "keep, do not share".
3. A count per type (e.g. 4 people, 2 IBANs, 1 address) and the limits from step 6 that apply to this file.

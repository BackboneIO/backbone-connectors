---
name: e-invoice-check
description: E-invoice check for Germany and Austria. Use when the user says "e-invoice check" or "E-Rechnung prüfen", asks whether a file they received is a real e-invoice, or hands over an invoice file (PDF, XML or a ZIP of them). Finds out whether it is a ZUGFeRD or Factur-X PDF with embedded XML, an XRechnung (UBL or CII) or just a PDF, names the profile, checks that the XML and the visible invoice agree, and says which German or Austrian rules apply (German receiving duty since 2025, sending duty for supplies from 2027 or 2028, Austria only for federal bodies). Never changes the file.
---

# E-invoice check

Free skill from the Backbone skill library (back-bone.io/en/tools/skill-library). Works without Backbone: it uses only the files the user gives. Needs an AI app that can read files and run code, to open the XML inside a PDF: for example Claude with code execution or a shared folder, Codex, Gemini CLI or Grok Build.

Checked on 16/10/2026 against § 14 and § 27 Abs. 38 UStG, §§ 33 and 34a UStDV, §§ 3 to 5 ERechV, the BMF letter of 15/10/2025 (Germany) and § 11 UStG, § 5 IKTKonG and the USP page on e-invoices to the federal government (Austria).

Work through the steps on your own and answer in the user's language.

## Rules

- **Read, never edit.** Never change, re-save, convert or delete the user's file. Extract the XML into a separate working copy.
- **Never invent** a value. If the XML cannot be read, say so.
- **No full validation claim.** You read the file and check the points below. A full EN 16931 / XRechnung validation needs a validator (for example the KoSIT validator); say so when the user needs a certain answer.
- **No tax or legal advice.** For a specific case, point to the user's tax adviser. Say once in your answer that this is a check, not tax or legal advice. Figures, thresholds and deadlines are as of the check date; if today is later or a figure matters for a decision, tell the user to verify it (official source or tax adviser).

## 1. What kind of file is it?

- **PDF:** list the embedded files. An embedded invoice XML (usually `factur-x.xml`; ZUGFeRD 2.0 used `zugferd-invoice.xml`, an embedded XRechnung `xrechnung.xml`; other tools may use another name) means a hybrid e-invoice. No embedded XML: it is a plain PDF, an "other invoice", not an e-invoice.
- **XML:** root element `Invoice` or `CreditNote` (namespace `urn:oasis:names:specification:ubl:schema:xsd:Invoice-2` or `...:CreditNote-2`): UBL. Root element `CrossIndustryInvoice`: CII.
- **Photo, scan, Word, Excel:** not an e-invoice.

## 2. Which profile?

Read the specification identifier:

- CII: `ExchangedDocumentContext / GuidelineSpecifiedDocumentContextParameter / ID`
- UBL: `cbc:CustomizationID`

Quote the identifier exactly as found, then name it. Typical patterns (check in this order, the list is not complete; if nothing fits, give the identifier and say the profile is unclear):

- contains `xrechnung` (e.g. `urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0`): XRechnung
- contains `minimum` or `basicwl`: MINIMUM or BASIC WL profile
- contains `extended`: EXTENDED profile
- ends in `:basic`: BASIC profile
- exactly `urn:cen.eu:en16931:2017`: EN 16931 (in ZUGFeRD: profile EN 16931)

**Germany:** ZUGFeRD from version 2.0.1 counts as an e-invoice, **except the MINIMUM and BASIC WL profiles**. Those are "other invoices", like a PDF.

## 3. Does the content add up?

- The XML has the mandatory details: seller and buyer name and address, seller VAT ID or tax number, invoice number, issue date, service date or period, line items, net amounts per VAT rate, VAT rate and amount, total.
- For a hybrid PDF: the XML and the visible PDF show the same number, date, totals and VAT. If they differ, say so clearly: in Germany the **XML counts** for tax purposes.
- XRechnung to a German federal body: a Leitweg-ID (buyer reference) is present.

## 4. Which rules apply?

**Germany** (both sides established in Germany, business to business):

- **Receiving:** every business must be able to receive e-invoices since 01/01/2025, small businesses included. An email inbox is enough.
- **Sending:**
  - Supplies made in 2025 and 2026: paper, or PDF with the client's consent, is still fine.
  - Supplies made in 2027: paper or PDF still allowed only if the issuer's total turnover in 2026 was at most 800,000 euros (EDI invoices agreed with the client stay allowed for everyone in 2027).
  - Supplies from 01/01/2028: e-invoice only.
  - These transition rules (§ 27 Abs. 38 UStG) can still change; tell the user to confirm the current dates with their tax adviser.
- **Exceptions:** small-amount invoices up to 250 euros (§ 33 UStDV), invoices from small businesses (§ 34a UStDV), invoices to private persons, invoices to clients abroad.
- **Keep** the XML (or the PDF with embedded XML) unchanged for eight years. A printout or a re-saved PDF without the XML is not enough.
- If a PDF arrives where an e-invoice was required, it is not a proper invoice; the client may lose the input VAT deduction. Suggest asking the supplier for an e-invoice.

**Austria:**

- No e-invoice duty between businesses (as of the check date). A PDF by email is an electronic invoice if the client agrees.
- Invoices to **federal government bodies** must be structured e-invoices since 01/01/2014: ebInterface or UBL, through the USP portal (e-rechnung.gv.at) or PEPPOL, with the order reference and supplier number.
- Austrian businesses selling to German businesses are not covered by the German duty; ZUGFeRD is still a good choice because German businesses can receive it.

## 5. Report

1. **Verdict in one line:** "E-invoice: yes (ZUGFeRD 2.x, profile EN 16931)", "No: plain PDF" or "Unclear: …".
2. A short table: format, syntax (CII / UBL), profile, XML and PDF agree (yes / no / no PDF), mandatory details found.
3. **What applies** to this invoice, from step 4, in two or three lines.
4. **What to do:** e.g. "Keep the original file with its XML", "Ask the supplier for an e-invoice", "Have a validator confirm it".

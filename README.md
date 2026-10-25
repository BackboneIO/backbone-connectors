# Backbone for ChatGPT, Claude and other AI apps

Backbone is the back office for small companies in Germany and Austria: invoices, payment reminders, receipts and time tracking. This repository holds everything AI apps need to use it:

- **The Backbone connector** (remote MCP server): `https://back-bone.io/api/mcp`, Streamable HTTP, sign-in with your Backbone account (OAuth 2.1, no API key).
- **Free back-office skills** in the open [Agent Skills](https://agentskills.io) format, in `skills/`. They work without Backbone; with the connector they work on your real data.

Anything that sends, issues, cancels or deletes is shown to you first and only runs after you confirm. Backbone never moves money.

## Install

**Claude Code**

```sh
claude plugin marketplace add OWNER/REPO
claude plugin install backbone@backbone
```

Then run `/mcp` and sign in to Backbone in the browser.

**ChatGPT, Claude (web, desktop, mobile), Grok and other apps:** add `https://back-bone.io/api/mcp` as a custom connector. Step by step: https://back-bone.io/docs/connect

**Skills only:** download a skill folder from `skills/` (or the ZIPs at https://back-bone.io/en/tools/skill-library) and upload it in your AI app.

## Skills

| Skill | What it does |
|---|---|
| `receipt-routine` | Matches a month of receipts to bank, card and PayPal statements and lists what is missing |
| `month-end-checklist` | Gets a month ready for the bookkeeper |
| `invoice-check` | Checks an invoice against the German or Austrian mandatory details |
| `e-invoice-check` | Tells whether a file is a real e-invoice (ZUGFeRD, Factur-X, XRechnung) |
| `invoice-writer` | Turns notes and hours into a complete invoice draft |
| `reminder-writer` | Writes payment reminders in your tone, in German or English |
| `small-business-note` | Small-business exemption wording (Kleinunternehmer) |
| `eu-reverse-charge` | EU client and reverse-charge check for services |
| `data-redactor` | Removes personal data before you share a text with any AI |

Skills draft and check; you decide. They are not tax or legal advice.

## Files

| Path | For |
|---|---|
| `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.mcp.json` | Claude Code plugin and marketplace, Claude directory |
| `plugin.json`, `mcp.json` | ChatGPT / Codex plugin (Agent Plugins format) |
| `.cursor-plugin/plugin.json` | Cursor Marketplace |
| `skills/<name>/SKILL.md` | the skills (source of truth: the Backbone app, synced with `scripts/sync-skills.sh`) |

## What this plugin runs, sends and fetches

- **Network:** the plugin talks to one place only, the Backbone connector at `https://back-bone.io/api/mcp` (declared in `.mcp.json`), after you sign in with your Backbone account. Nothing else is fetched or sent.
- **Code:** none. The skills are Markdown instructions; there are no hooks, no scripts the plugin runs and no packages to install. `scripts/` holds maintainer tools for this repository (syncing skills, building the ChatGPT package); the plugin never runs them.
- **Data:** the skills work on what you give them in the chat. The plugin stores nothing itself; your Backbone data stays in your Backbone workspace (privacy policy below).

## Support and privacy

Support: support@back-bone.io · Privacy: https://back-bone.io/en/legal#privacy · Terms: https://back-bone.io/en/legal#terms

## License

MIT, see `LICENSE`.

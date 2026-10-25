# Claude directory carousel: images and prompts

Five PNGs (1216 px wide, rendered at 2x, light theme), cropped to the card only. Each one is the real card template
the server serves (`ui://backbone/*`, `src/lib/mcp/cards/html.generated.ts`), filled with card data built by the
app's own builders (EN catalogue) from sample data of the demo workspace "Werkhaus Studio".

Upload in this order; paste the prompt next to each image.

| # | File | Prompt | Tool behind the card | Card |
|---|---|---|---|---|
| 1 | `01-invoice.png` | Show me invoice 2026-052. | `get_document` | document card (`ui://backbone/document-card@1.html`) |
| 2 | `02-confirm.png` | Send Nordlicht a payment reminder for invoice 2026-052. | `send_reminder_now` (proposal, runs only after "Send") | confirm card (`ui://backbone/confirm-card@2.html`) |
| 3 | `03-overdue.png` | Which of my invoices are overdue? | `list_documents` (status overdue) | list card (`ui://backbone/list-card@1.html`) |
| 4 | `04-receipt.png` | Show me the Fernbahn Tickets payment from 14 October. | `get_transaction` | receipt card (`ui://backbone/receipt-card@1.html`) |
| 5 | `05-wiki.png` | What does our wiki say about the month-end close? | `read_wiki` | wiki card (`ui://backbone/wiki-card@1.html`) |

Notes

- Sample data only (fictional clients Nordlicht, Brauhaus Ober, Atelier Mira, Café Camelle; `.example` address).
- Rendered by a script outside the repos (headless Chromium, MCP Apps host handshake, `ui/notifications/tool-result`).
  To redo after a card change: rebuild the cards (`npm run cards:build` in backbone-app) and render again.

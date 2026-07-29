# Kestrel Electric — Solo Operator OS

A fully built demonstration dashboard for a **one-person electrical business**, powered by the
LEGION OS concept (Command · Intelligence · Vault · Connect). The premise: the electrician is the
whole company, and a digital workforce runs the office so they can stay on the tools.

Part of the LEGION UNITED demo family. Sibling: **Voltiq** (the team / multi-electrician command centre).

## Design language — "Voltage"

- Light "workshop" theme by default, full dark theme included (toggle top-right).
- Palette: paper `#F4F3EE`, ink navy `#0E1330`, electric cobalt `#2F5BFF`, voltage lime `#D6FF3D`.
- Signature elements: wire connectors, current-flow animation, voltage-glow, pulsing status dots.
- No em-dashes in product copy, no generic "AI look".

## Views

| Route | Specialist | What it shows |
|-------|-----------|----------------|
| `/` | — | Landing / pitch |
| `/today` | The Analyst | Morning briefing, schedule, decisions, cash |
| `/pipeline` | The Coordinator | 8-stage project journey, kanban |
| `/inbox` | The Receptionist | Captured & qualified enquiries + transcripts |
| `/quotes` | The Estimator | Quote list, line builder, follow-ups |
| `/field` | The Field Companion | On-site history, site pack, voice notes |
| `/money` | The Collector | Cash flow, chase ladder, invoices |
| `/vault` | The Knowledge Expert | Searchable company knowledge |
| `/workforce` | — | The digital workforce roster |
| `/intelligence` | — | Private AI workspace |

## Run

```bash
npm run dev   # http://localhost:3500
```

Next.js 16 · React 19 · TypeScript · plain CSS. All data is mock data in `lib/data.ts`.

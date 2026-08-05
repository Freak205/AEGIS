# Aegis — Enterprise Support Intelligence

Aegis is an operational capstone selection build for evidence-grounded customer support. It combines a premium agent workspace with persistent conversations, governed actions, knowledge ingestion, evaluation, security testing, analytics and human handoff.

## What works now

- Persistent customer conversations and evidence-aware replies
- Global search across conversations and knowledge
- Replacement approval, escalation, takeover, activation retry, carrier escalation and closure
- Immutable support-action records and operator notifications
- TXT, Markdown, JSON and CSV ingestion with full text extraction
- PDF and DOCX object upload with indexed metadata
- Validated URL knowledge connectors
- Knowledge-source deletion and R2 object cleanup
- Evaluation runs with stored scores and downloadable JSON evidence
- Prompt-injection simulations with stored security events
- Analytics and CSV export
- Browser voice input where Web Speech Recognition is available
- Guided five-step presentation mode
- Private authenticated deployment with D1 database and R2 object storage

The included response engine is deterministic and policy-grounded so the demo works reliably without an external model credential. A provider-backed LLM and embeddings pipeline is the next capstone integration, not a capability being falsely claimed in this selection build.

## Run locally

Requirements: Node.js 22.13 or newer.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify production readiness

```powershell
npm test
npm run lint
```

The test command creates the production worker and verifies the storage, schema, API-action and UI contracts.

## Recommended live demo

1. Open **Overview** and select **Launch guided demo**.
2. Enter **Inbox**, open the Nova X1 safety case and send a new question.
3. Point out the grounded response and its source citations.
4. Approve the replacement; show that the conversation, audit entry and notification update.
5. Open **Knowledge**, upload `demo-data/Nova_Care_Priority_Policy.txt`, then search for “battery”.
6. Run a fresh suite in **Evaluations** and download its evidence.
7. Run the red-team simulation in **Security** and show the persisted blocked event.
8. Finish with **Analytics** and export the operational report.

## Runtime architecture

- Next.js-compatible React/TypeScript interface built with Vinext
- Cloudflare Worker server runtime
- Cloudflare D1 durable relational data
- Cloudflare R2 durable source-object storage
- Prepared, parameterized SQL and indexed operational tables
- Private ChatGPT Sites authentication with per-user audit identity
- SSRF-aware URL validation, file-size limits and prompt-injection controls
- Drizzle schema and versioned SQL migrations

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for the five-minute selection presentation.

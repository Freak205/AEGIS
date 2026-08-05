# Aegis — Enterprise Support Intelligence

Aegis is an operational capstone selection build for evidence-grounded customer support. It combines a premium agent workspace with governed actions, knowledge ingestion, evaluation, security testing, analytics and human handoff.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFreak205%2FAEGIS)

## What works

- Persistent conversations and evidence-aware replies
- Global search across conversations and knowledge
- Replacement approval, escalation, takeover, activation retry, carrier escalation and closure
- Support-action records and operator notifications
- TXT, Markdown, JSON and CSV ingestion with text extraction
- PDF and DOCX object uploads with indexed metadata
- Validated URL knowledge connectors and source deletion
- Evaluation runs with downloadable JSON evidence
- Prompt-injection simulations with stored security events
- Analytics and CSV export
- Browser voice input and a guided presentation mode

The response engine is deterministic and policy-grounded so the capstone demo works reliably without an external model credential. A provider-backed LLM and embeddings pipeline is the next research integration, not a capability falsely claimed in this build.

## Local development

Requirements: Node.js 22 and npm.

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`. Without environment variables, Aegis automatically uses a process-local demo workspace.

## Vercel deployment

1. Import [`Freak205/AEGIS`](https://github.com/Freak205/AEGIS) in Vercel.
2. Keep the detected framework as **Next.js** and deploy. The application works immediately in demo mode.
3. For durable state, open the Vercel Marketplace and connect an **Upstash Redis** integration.
4. For durable uploaded files, create and connect a **Vercel Blob** store.
5. Redeploy after the integrations inject their environment variables.

The application recognizes these server-only variables:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
BLOB_READ_WRITE_TOKEN
AEGIS_DEMO_MODE=true
```

Never expose the storage credentials with a `NEXT_PUBLIC_` prefix. A committed [`.env.example`](./.env.example) documents the configuration without containing secrets.

## Verification

```powershell
npm run lint
npm run typecheck
npm test
```

GitHub Actions runs the same checks on every push and pull request. The test command creates a Vercel-compatible Next.js production build and verifies the deployment, persistence and action contracts.

## Recommended live demo

1. Open **Overview** and launch the guided demo.
2. Enter **Inbox**, open the Nova X1 safety case and send a question.
3. Point out the evidence citations.
4. Approve the replacement and show the updated conversation and notification.
5. Open **Knowledge**, upload `demo-data/Nova_Care_Priority_Policy.txt`, then search for “battery”.
6. Run a fresh suite in **Evaluations** and download its evidence.
7. Run the red-team simulation in **Security**.
8. Finish in **Analytics** and export the operational report.

## Architecture

- Next.js App Router with React and TypeScript
- Vercel Node.js Route Handler for the operational API
- Upstash Redis for durable workspace state when connected
- Vercel Blob for durable source objects when connected
- Memory-backed zero-configuration fallback for previews and local demos
- SSRF-aware URL validation, upload limits and prompt-injection controls
- Security headers and server-only environment variables
- Automated GitHub Actions verification

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for the five-minute presentation.

# Aegis — Enterprise Support Intelligence

Aegis is a high-fidelity capstone prototype for evidence-grounded, action-capable customer support. It demonstrates how an enterprise AI system can retrieve trusted knowledge, explain its evidence, apply safety controls, complete approved support workflows, and hand difficult cases to a human agent.

## What the prototype demonstrates

- A premium command center with operational and customer-experience metrics
- Evidence-grounded customer conversation with page-level citations
- Order, warranty and safety-policy reasoning
- Human confirmation before consequential actions
- Priority replacement workflow with a generated RMA
- Multilingual response demonstration
- Human-agent inbox and AI-generated handoff brief
- Uploadable knowledge source with visible indexing state
- Quantitative advanced-RAG versus basic-RAG benchmark
- Prompt-injection detection, PII protection and action authorization
- Guided five-step presentation mode
- Responsive layouts for projector, laptop, tablet and phone screens

## Run locally

Requirements: Node.js 22.13 or newer.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production validation

```powershell
npm run build
```

## Recommended demo path

1. Open **Command center** and select **Launch guided demo**.
2. Explain the critical Nova X1 battery issue.
3. Point to the evidence citations, confidence score and reasoning trace.
4. Select **Approve action** to create replacement `RMA-2084`.
5. Ask **Explain this in Hindi** to demonstrate multilingual support.
6. Open **Live conversations** to show the human handoff brief.
7. Open **Knowledge base** and upload a sample PDF to show indexing.
8. Open **Trust & security** to demonstrate prompt-injection defense.
9. Finish in **AI evaluations** with the measured comparison against basic RAG.

## Product architecture

This overnight selection build is a polished, interactive product prototype. The full capstone architecture is designed around:

- Next.js/TypeScript customer, agent and admin experiences
- FastAPI application and action-service layer
- LangGraph orchestration for predictable, inspectable workflows
- Hybrid dense and keyword retrieval with reranking
- PostgreSQL plus pgvector or Qdrant for production data
- Llama-family model support through a provider-neutral adapter
- OCR and structured ingestion for PDF, DOCX, CSV and web content
- Offline and online evaluation for correctness, groundedness and retrieval quality
- Role-based authorization, tenant isolation, PII filtering and audit trails

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for the exact five-minute presentation.

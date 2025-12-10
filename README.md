# CareOps AI

Cloud-native AI agent platform for EHR + Revenue Cycle Management workflows. Built as a Next.js + Fastify monorepo with shared FHIR and agent packages, HIPAA-aligned guardrails, and human-in-the-loop defaults.

## Getting Started

```bash
npm install
docker compose up -d    # Postgres, Redis, MinIO
npm run dev:api         # API on :3000
npm run dev:web         # Web on :3001 (configure in .env)
```

## Monorepo Layout
- `apps/web`: Marketing site + console (Next.js, Tailwind)
- `apps/api`: Fastify API with agent run + document endpoints
- `packages/agents`: Base agent framework, policy engine, sample agents
- `packages/fhir`: FHIR resource shapes + validation helpers
- `packages/ui`: Shared UI components
- `packages/config`: Env loader
- `docs`: System overview, compliance checklist, test plan, deployment notes
- `infra/terraform`: Cloud skeleton

See `docs/system-overview.md` for architecture, schema, and roadmap.

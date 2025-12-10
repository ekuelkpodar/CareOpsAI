# CareOps AI Platform Overview

## Mission
AI agents that automate EHR + RCM workflows with human-in-the-loop controls, HIPAA-aligned safeguards, and SOC 2-ready operational patterns.

## Architecture (MVP)
```mermaid
flowchart LR
  subgraph Web[Web App]
    UI[Next.js App]
    Console[Admin Console]
  end
  subgraph API[Nest/Fastify API]
    Auth[Auth & RBAC]
    Policy[Policy Engine]
    FHIR[FHIR Module]
    Audit[Audit Logger]
  end
  subgraph Orchestrator[Agent Orchestrator]
    Queue[Queues (BullMQ)]
    Workers[Agent Workers]
  end
  subgraph Pipeline[Document Pipeline]
    Upload[Upload Service]
    OCR[OCR/Classifier Stub]
    Mapping[FHIR Mapping]
    Review[Human Review]
  end
  subgraph Data[Data Stores]
    PG[(Postgres + RLS)]
    S3[(S3/MinIO with tenant prefixes)]
    Redis[(Redis Cache)]
    AuditStream[(Append-only Audit Stream)]
  end
  ExternalFHIR[EHR FHIR Endpoints]

  UI -->|HTTPS| Auth
  Console -->|REST| API
  API -->|Events| Queue
  API -->|FHIR CRUD| PG
  API -->|Docs| S3
  Orchestrator -->|runs agents| Workers
  Workers -->|reads/writes| PG
  Workers -->|store docs| S3
  Upload --> OCR --> Mapping --> Review --> API
  API --> Audit
  Audit --> AuditStream
  API -->|fetch/push| ExternalFHIR
```

## Key Components
- **Frontend (apps/web)**: Next.js App Router, Tailwind UI, marketing site + console with role-based navigation.
- **API (apps/api)**: Fastify-based service exposing tenant, agent-run, and document endpoints. Hooks into policy engine and queues.
- **Agents Package (packages/agents)**: Base agent class, standardized output schema, policy evaluation, sample Eligibility and Coding agents.
- **FHIR Package (packages/fhir)**: Lightweight FHIR resource shapes + validation helpers.
- **UI Package (packages/ui)**: Shared React primitives (Card, Badge, Sidebar) for consistent console look.
- **Config Package (packages/config)**: Zod-based environment loader.
- **Queues/Workers**: BullMQ scaffolding for asynchronous agent runs and document processing.

## Database Schema (Postgres, RLS-ready)
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  feature_flags JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  object_key TEXT NOT NULL,
  status TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE work_items (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  agent_name TEXT NOT NULL,
  status TEXT NOT NULL,
  payload JSONB,
  result JSONB,
  requires_approval BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE audit_events (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  actor_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
Row Level Security can be enabled with tenant_id scoping for every table. Each S3 object uses `tenant/{tenant_id}/...` prefix.

## Data Flow (RCM MVP)
1. **Patient registration** → intake agent normalizes Patient/Coverage → human review → write-back to FHIR store/EHR.
2. **Eligibility** → eligibility agent verifies payer benefits → attaches structured notes → claim prep flag.
3. **Encounter summary** → coding agent suggestions → approval → claim draft assembled.
4. **Claim prep** → validation against payer rules → queue for submission handoff.
5. **Denials** → classifier tags reason → suggests appeal packet → track outcomes.

## Compliance & Security Controls
- Encryption in transit (TLS) and at rest (Postgres TDE option, S3 SSE).
- RBAC with least privilege; auditor read-only role.
- Tenant isolation: Postgres RLS + S3 prefixes; secrets per-tenant.
- Immutable audit log stream; export per tenant.
- Human approval enforced for medium/high risk, low confidence, or billing-impacting actions.
- PHI minimization for model calls; redaction for non-essential fields.
- Signed URLs for document access; short TTL.
- Secrets management placeholder for vault integration.
- Change management hooks and incident response runbook placeholders.

## Future Roadmap
- Payer API integrations, advanced denial prediction models.
- Federated learning patterns with de-identified telemetry.
- Patient-facing portal for check-in and estimates.
- Multi-region sharding and disaster recovery automation.
- De-identified cross-tenant analytics with privacy budgets.

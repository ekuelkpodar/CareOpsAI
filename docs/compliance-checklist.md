# Compliance-by-Design Checklist (MVP)

- Access Control: RBAC roles (Admin, Billing Manager, Front Desk, Clinician, Auditor), least privilege defaults, per-tenant feature flags.
- Tenant Isolation: Postgres RLS on tenant_id; S3 prefixes per tenant; API middleware enforces tenant context.
- Audit Logging: Append-only audit_events table + stream; agent runs capture run_id, inputs, recommendations, approvals.
- Data Handling: Signed URLs for documents; PHI redaction before non-essential model calls; deny write-back without approval when risk > low.
- Encryption: TLS for all endpoints; at-rest encryption assumed for Postgres + object storage.
- Change Management: CI hooks for lint/test; infrastructure changes via Terraform with code review.
- Incident Response: Runbook placeholders, alert routing to on-call; health checks and dashboards in backlog.
- Data Retention: Configurable retention windows per tenant; soft-delete with purge jobs planned.
- Vendor Management: Secrets scoped per integration; webhooks signed; outbound calls logged.
- Human-in-the-loop: Policy engine enforces approvals on medium/high risk, billing-impacting changes, low confidence outputs.

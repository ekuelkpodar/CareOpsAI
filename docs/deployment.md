# Deployment & Dev Environment

## Local (Docker Compose)
1. `docker compose up -d` to start Postgres, Redis, and MinIO.
2. `npm install` at repo root.
3. `npm run dev:api` (API on port 3000).
4. `npm run dev:web` (Next.js on port 3001 by default via env). Update `.env` as needed.

## Environment Variables
See `.env.example` for required settings. Key items: `POSTGRES_URL`, `REDIS_URL`, `S3_ENDPOINT`, `JWT_SECRET`.

## Production (Terraform Skeleton)
- Use `infra/terraform` as a starting point: provision VPC, Postgres (managed), Redis, object storage bucket, and container services for API/Web.
- Enable TLS termination and WAF. Configure secrets via a vault/secret manager.
- Configure monitoring stack (logs to centralized store, uptime checks, alerting on queue depth and error rates).

## CI/CD
- Add pipeline stages: lint, test, build, image publish, Terraform plan/apply with approvals.
- Gate deploys on policy engine/unit tests and vulnerability scans.

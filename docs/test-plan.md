# Test Plan

## Unit Tests
- Policy engine decision logic (confidence thresholds, risk levels, tenant force-approval).
- FHIR resource validation schemas.
- Agent output schema parsing.

## Integration Tests
- Document upload endpoint returns identifiers and accepted status.
- Agent run endpoint executes sample agent and returns structured recommendations.
- FHIR mapping stubs accept validated resources.

## Security Tests
- Tenant isolation: ensure tenant_id scoping on requests (to be enforced when DB is wired).
- Role restrictions: verify non-admin roles cannot bypass approvals.

## Manual/Exploratory
- UI smoke: marketing site renders hero/agent cards; console navigation present.
- Approval toggles: simulate low confidence outputs to confirm approval routing.
- Document pipeline: upload -> classify -> mapping -> review path using stubs.

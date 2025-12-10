export * from "./resources";

export interface FhirWriteResult<T = unknown> {
  resourceType: string;
  id?: string;
  payload: T;
  status: "accepted" | "pending_review" | "rejected";
  auditTrailId?: string;
}

export interface TenantContext {
  tenantId: string;
  actorId: string;
  role: string;
}

export interface AuditEvent {
  id: string;
  tenantId: string;
  actorId: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

import { z } from "zod";
import { FhirResource } from "@careops/fhir";

export const AgentRecommendationSchema = z.object({
  action: z.string(),
  payload: z.any(),
  requires_human_approval: z.boolean().default(true),
  risk_level: z.enum(["low", "medium", "high"]).default("medium"),
});

export const AgentOutputSchema = z.object({
  agent_name: z.string(),
  run_id: z.string(),
  patient_id: z.string().optional(),
  source_documents: z.array(z.string()).default([]),
  extracted_facts: z
    .array(z.object({ field: z.string(), value: z.any(), confidence: z.number().min(0).max(1) }))
    .default([]),
  recommendations: z.array(AgentRecommendationSchema).default([]),
  summary: z.string().optional(),
  confidence_overall: z.number().min(0).max(1).optional(),
});

export type AgentRecommendation = z.infer<typeof AgentRecommendationSchema>;
export type AgentOutput = z.infer<typeof AgentOutputSchema>;

export interface AgentRunContext {
  tenantId: string;
  actorId: string;
  role: string;
  permissions: string[];
  policy?: AgentPolicy;
}

export interface AgentPolicy {
  minConfidence?: number;
  forceHumanApproval?: boolean;
  autoApproveLowRisk?: boolean;
}

export interface AgentInput<TInput = unknown> {
  payload: TInput;
  relatedResources?: FhirResource[];
  documents?: { id: string; url: string; type?: string }[];
}

export type AgentResult<T = unknown> = AgentOutput & { output?: T; auditLogId?: string };

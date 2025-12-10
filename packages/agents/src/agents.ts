import { BaseAgent } from "./baseAgent";
import { AgentInput, AgentRunContext, AgentResult } from "./types";

export class EligibilityAgent extends BaseAgent<{ insuranceCardText?: string }, { coverageStatus: string }> {
  name = "EligibilityAgent";

  protected async execute(input: AgentInput<{ insuranceCardText?: string }>, context: AgentRunContext): Promise<Partial<AgentResult<{ coverageStatus: string }>>> {
    const coverageStatus = input.payload.insuranceCardText ? "active" : "unknown";

    return {
      patient_id: "unknown",
      source_documents: input.documents?.map((d) => d.id) ?? [],
      extracted_facts: [
        {
          field: "payer_name",
          value: "Example Health",
          confidence: 0.91,
        },
      ],
      recommendations: [
        {
          action: "update_fhir_coverage",
          payload: { resourceType: "Coverage", status: coverageStatus },
          requires_human_approval: true,
          risk_level: coverageStatus === "active" ? "medium" : "high",
        },
      ],
      summary: "Eligibility appears active; prior auth may be required for MRI.",
      confidence_overall: 0.84,
      output: { coverageStatus },
    };
  }
}

export class CodingAssistantAgent extends BaseAgent<{ summary: string }, { codes: string[] }> {
  name = "CodingAssistantAgent";

  protected async execute(input: AgentInput<{ summary: string }>, context: AgentRunContext): Promise<Partial<AgentResult<{ codes: string[] }>>> {
    const codes = ["99213", "Z00.00"];

    return {
      patient_id: "unknown",
      extracted_facts: [
        { field: "visit_reason", value: input.payload.summary, confidence: 0.76 },
        { field: "suggested_codes", value: codes, confidence: 0.71 },
      ],
      recommendations: [
        {
          action: "draft_claim_line_items",
          payload: { codes },
          requires_human_approval: true,
          risk_level: "medium",
        },
      ],
      summary: "Suggested CPT/ICD codes based on visit summary.",
      confidence_overall: 0.73,
      output: { codes },
    };
  }
}

export const AgentRegistry = {
  EligibilityAgent,
  CodingAssistantAgent,
};

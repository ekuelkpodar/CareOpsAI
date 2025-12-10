import { describe, expect, it } from "vitest";
import { evaluatePolicies } from "../src/policyEngine";
import { AgentOutput } from "../src/types";

const baseOutput: AgentOutput = {
  agent_name: "test",
  run_id: "1",
  patient_id: "p1",
  source_documents: [],
  extracted_facts: [],
  recommendations: [
    { action: "a", payload: {}, requires_human_approval: false, risk_level: "low" },
  ],
  summary: "",
  confidence_overall: 0.9,
};

describe("policyEngine", () => {
  it("requires approval for high risk", () => {
    const decision = evaluatePolicies({
      ...baseOutput,
      recommendations: [{ action: "a", payload: {}, requires_human_approval: false, risk_level: "high" }],
    });
    expect(decision.requiresHumanApproval).toBe(true);
  });

  it("requires approval when below confidence threshold", () => {
    const decision = evaluatePolicies({ ...baseOutput, confidence_overall: 0.5 }, { minConfidence: 0.8 });
    expect(decision.requiresHumanApproval).toBe(true);
  });

  it("auto approves low risk when allowed", () => {
    const decision = evaluatePolicies(baseOutput, { autoApproveLowRisk: true });
    expect(decision.requiresHumanApproval).toBe(false);
  });
});

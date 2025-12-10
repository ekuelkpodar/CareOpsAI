import { AgentOutput, AgentPolicy } from "./types";

export type PolicyDecision = {
  requiresHumanApproval: boolean;
  reasons: string[];
};

export function evaluatePolicies(output: AgentOutput, policy?: AgentPolicy): PolicyDecision {
  const reasons: string[] = [];
  let requiresHumanApproval = false;

  const risk = output.recommendations.some((rec) => rec.risk_level === "high");
  if (risk) {
    requiresHumanApproval = true;
    reasons.push("High risk recommendation detected");
  }

  if (output.confidence_overall !== undefined && policy?.minConfidence !== undefined) {
    if (output.confidence_overall < policy.minConfidence) {
      requiresHumanApproval = true;
      reasons.push(`Confidence ${output.confidence_overall} below minimum ${policy.minConfidence}`);
    }
  }

  if (policy?.forceHumanApproval) {
    requiresHumanApproval = true;
    reasons.push("Tenant policy forces human approval");
  }

  if (policy?.autoApproveLowRisk && !requiresHumanApproval) {
    const onlyLowRisk = output.recommendations.every((rec) => rec.risk_level === "low");
    if (onlyLowRisk) {
      reasons.push("Auto-approved low risk recommendations");
      return { requiresHumanApproval: false, reasons };
    }
  }

  if (!requiresHumanApproval) {
    const actionNeedsApproval = output.recommendations.some((rec) => rec.requires_human_approval);
    requiresHumanApproval = actionNeedsApproval;
    if (actionNeedsApproval) {
      reasons.push("Agent marked recommendation as requiring approval");
    }
  }

  return { requiresHumanApproval, reasons };
}

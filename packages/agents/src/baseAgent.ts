import { randomUUID } from "crypto";
import { AgentInput, AgentRunContext, AgentResult, AgentOutputSchema } from "./types";
import { evaluatePolicies } from "./policyEngine";

export abstract class BaseAgent<TInput = unknown, TOutput = unknown> {
  abstract name: string;

  async run(input: AgentInput<TInput>, context: AgentRunContext): Promise<AgentResult<TOutput>> {
    const run_id = randomUUID();
    const raw = await this.execute(input, context);
    const outputParsed = AgentOutputSchema.parse({ ...raw, run_id, agent_name: this.name });
    const decision = evaluatePolicies(outputParsed, context.policy);

    return {
      ...outputParsed,
      auditLogId: raw.auditLogId,
      output: (raw as any).output,
      recommendations: outputParsed.recommendations.map((rec) => ({
        ...rec,
        requires_human_approval: rec.requires_human_approval || decision.requiresHumanApproval,
      })),
    };
  }

  protected abstract execute(input: AgentInput<TInput>, context: AgentRunContext): Promise<Partial<AgentResult<TOutput>>>;
}

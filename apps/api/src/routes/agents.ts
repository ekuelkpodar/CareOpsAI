import { FastifyInstance } from "fastify";
import { z } from "zod";
import { AgentRegistry, AgentRunContext } from "@careops/agents";

const AgentRunSchema = z.object({
  agent: z.enum(["EligibilityAgent", "CodingAssistantAgent"]),
  tenantId: z.string(),
  actorId: z.string(),
  role: z.string(),
  payload: z.any(),
});

export function registerAgentRoutes(app: FastifyInstance) {
  app.post("/api/agents/run", async (request, reply) => {
    const body = AgentRunSchema.parse(request.body);
    const AgentCtor = (AgentRegistry as any)[body.agent];
    if (!AgentCtor) {
      return reply.code(404).send({ message: "Agent not found" });
    }

    const agent = new AgentCtor();
    const context: AgentRunContext = {
      tenantId: body.tenantId,
      actorId: body.actorId,
      role: body.role,
      permissions: [],
      policy: { minConfidence: 0.8, forceHumanApproval: body.role !== "Admin" },
    };

    const result = await agent.run({ payload: body.payload }, context);
    return { result };
  });
}

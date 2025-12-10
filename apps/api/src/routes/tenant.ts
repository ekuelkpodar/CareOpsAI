import { FastifyInstance } from "fastify";
import { z } from "zod";

const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  featureFlags: z.record(z.string(), z.boolean()).optional(),
});

export function registerTenantRoutes(app: FastifyInstance) {
  const tenants: Record<string, z.infer<typeof TenantSchema>> = {};

  app.post("/api/tenants", async (request, reply) => {
    const body = TenantSchema.parse(request.body);
    tenants[body.id] = body;
    reply.code(201).send(body);
  });

  app.get("/api/tenants", async () => Object.values(tenants));
}

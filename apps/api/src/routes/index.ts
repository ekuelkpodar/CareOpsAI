import { FastifyInstance } from "fastify";
import { registerTenantRoutes } from "./tenant";
import { registerAgentRoutes } from "./agents";
import { registerDocumentRoutes } from "./documents";

export function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ status: "ok" }));
  registerTenantRoutes(app);
  registerAgentRoutes(app);
  registerDocumentRoutes(app);
}

import { describe, expect, it } from "vitest";
import Fastify from "fastify";
import { registerRoutes } from "../src/routes";

function buildServer() {
  const app = Fastify({ logger: false });
  registerRoutes(app);
  return app;
}

describe("api routes", () => {
  it("uploads a document", async () => {
    const app = buildServer();
    const response = await app.inject({ method: "POST", url: "/api/documents/upload" });
    expect(response.statusCode).toBe(201);
  });

  it("runs an agent", async () => {
    const app = buildServer();
    const response = await app.inject({
      method: "POST",
      url: "/api/agents/run",
      payload: {
        agent: "EligibilityAgent",
        tenantId: "t1",
        actorId: "u1",
        role: "Admin",
        payload: { insuranceCardText: "Sample" },
      },
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.result.recommendations.length).toBeGreaterThan(0);
  });
});

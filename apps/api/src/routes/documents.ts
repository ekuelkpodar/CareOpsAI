import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";

export function registerDocumentRoutes(app: FastifyInstance) {
  app.post("/api/documents/upload", async (request, reply) => {
    const id = randomUUID();
    // In production, stream to S3-compatible storage with signed URL
    return reply.code(201).send({ id, status: "received" });
  });

  app.get("/api/documents/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    return reply.send({ id, status: "pending_classification" });
  });
}

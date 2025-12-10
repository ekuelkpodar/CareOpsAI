import { Queue } from "bullmq";

export const agentQueue = new Queue("agent-runs", {
  connection: { host: process.env.REDIS_HOST || "localhost", port: Number(process.env.REDIS_PORT || 6379) },
});

export const documentQueue = new Queue("document-pipeline", {
  connection: { host: process.env.REDIS_HOST || "localhost", port: Number(process.env.REDIS_PORT || 6379) },
});

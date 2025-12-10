import Fastify from "fastify";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { loadEnv } from "@careops/config";
import { registerRoutes } from "./routes";

const env = loadEnv(process.env);
const server = Fastify({ logger: true });

server.register(cors, { origin: true });
server.register(multipart);

registerRoutes(server);

async function start() {
  try {
    await server.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    server.log.info(`API listening on ${env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();

import { buildApp } from "./app.js";

// This file is the real runtime entrypoint.
// `app.ts` builds the Fastify app. `server.ts` starts listening on a port.

// Logger mode makes Fastify print request and error logs.
// In production you would usually configure level, redaction, and transport.
const app = buildApp({
  logger: true,
});

// Environment variables let you change runtime settings without editing code.
// Examples:
// PORT=3333 bun run dev
// HOST=127.0.0.1 bun run dev
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

// Validate the port before asking Fastify to listen.
if (!Number.isInteger(port) || port <= 0) {
  throw new Error("PORT must be a positive integer");
}

try {
  // `listen` starts the HTTP server.
  // The top-level `await` works because this project uses ESM.
  await app.listen({ port, host });
} catch (error) {
  // Startup errors include cases like "port already in use".
  app.log.error(error);
  process.exit(1);
}

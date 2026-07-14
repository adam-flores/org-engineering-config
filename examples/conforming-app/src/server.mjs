import http from "node:http";
import { fileURLToPath } from "node:url";
import { log } from "./logger.mjs";

// Secret is supplied at runtime, never hardcoded (sec-no-plaintext-secrets).
const API_TOKEN = process.env.API_TOKEN;

// Pure handler, unit-testable in isolation (qual-deterministic-tests).
export function handle(req) {
  // Log a correlation id, not user data (obs-correlation-ids, obs-no-pii-in-logs).
  const requestId = req.headers["x-request-id"] ?? "unknown";
  log("info", "request.received", { requestId, path: req.url });
  return { status: 200, body: "ok" };
}

// Health endpoint (obs-health-readiness-endpoints).
export function health() {
  return { status: 200, body: "healthy" };
}

// Start the server only when run directly, never on import — keeps tests isolated
// (qual-deterministic-tests).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = http.createServer((req, res) => {
    const { status, body } = req.url === "/health" ? health() : handle(req);
    res.writeHead(status, { "content-type": "text/plain" });
    res.end(body);
  });
  const port = Number(process.env.PORT ?? 3000);
  server.listen(port, () => log("info", "server.listening", { port }));
}

import http from "node:http";
import { API_KEY } from "./config.mjs";
import { db } from "./db.mjs";

export function handle(req, user) {
  // !! DELIBERATE VIOLATION (obs-no-pii-in-logs, Strategic · audit → required-but-unenforceable) !!
  // Logs PII (email) and a secret, as an unstructured string.
  console.log("Handling request for user email: " + (user?.email ?? "n/a") + " with token=" + API_KEY);

  const rows = db.prepare("SELECT * FROM users").all();
  return { status: 200, body: JSON.stringify(rows) };
}

const server = http.createServer((req, res) => {
  const { status, body } = handle(req, { email: "jane.doe@example.com" });
  res.writeHead(status, { "content-type": "application/json" });
  res.end(body);
});
server.listen(3000);

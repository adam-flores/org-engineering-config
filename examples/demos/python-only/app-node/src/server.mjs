// greeting-service — a tiny HTTP service.
//
// This is the "before" app in the python-only demo: it is written in Node.js, which the demo's
// guidance prohibits (arch-no-nodejs) and requires to be Python instead (arch-python-required).
// Running /standards-review here produces two BLOCK findings and a remediation plan whose single
// "go do" task is: rewrite this service in Python. See app-python/ for the "after".
import http from "node:http";

function greet(name) {
  return { message: `Hello, ${name ?? "world"} — built by Node.js` };
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const body = greet(url.searchParams.get("name"));
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
});

server.listen(3000);

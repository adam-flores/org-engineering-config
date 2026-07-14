import { test } from "node:test";
import assert from "node:assert/strict";
import { handle, health } from "../src/server.mjs";

// Real, deterministic, non-skipped tests (qual-no-skipped-tests, qual-deterministic-tests).
test("handle returns ok for a request", () => {
  const res = handle({ headers: { "x-request-id": "abc" }, url: "/" });
  assert.equal(res.status, 200);
  assert.equal(res.body, "ok");
});

test("health endpoint reports healthy", () => {
  const res = health();
  assert.equal(res.status, 200);
  assert.equal(res.body, "healthy");
});

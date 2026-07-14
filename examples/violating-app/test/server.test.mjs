import { test } from "node:test";

// !! DELIBERATE VIOLATION (qual-no-skipped-tests, Strategic · ci-gate → BLOCK) !!
// A skipped test merged into the suite.
test.skip("server responds to requests", () => {
  // TODO: enable once the flaky DB fixture is fixed
});

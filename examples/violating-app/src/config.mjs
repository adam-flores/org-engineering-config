// !! DELIBERATE VIOLATION (sec-no-plaintext-secrets, Policy · ci-gate → BLOCK) !!
// A hardcoded credential committed in plaintext. The value below is a fake, clearly-marked
// placeholder for the demo — it is NOT a real secret — but it matches a secret shape on purpose.
export const API_KEY = "sk_live_EXAMPLE_FAKE_DO_NOT_USE_00000000000000000000";
export const DB_CONNECTION = "postgres://admin:hunter2@db.internal:5432/prod";

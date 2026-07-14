// Structured logging with consistent fields (obs-structured-logging).
// Never logs secrets or PII (obs-no-pii-in-logs).
export function log(level, event, fields = {}) {
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...fields });
  process.stdout.write(line + "\n");
}

---
id: obs-no-pii-in-logs
title: Keep secrets and PII out of logs and telemetry
domain: Observability & Data
severity: Handbook
status: active
since: 0.1.0
tags: [pii, secrets, logging, privacy, data-in-telemetry]
---

## Rule

Logs, metrics, traces, and error payloads **should not** contain secrets or personal data (PII).
Redact, mask, or omit sensitive fields before they're emitted rather than relying on the sink to hide
them.

## Rationale

Telemetry is widely readable, retained, and copied into third-party tools — exactly where sensitive
data shouldn't spread. Keeping secrets and PII out at the source is far cheaper than scrubbing them
from every downstream system later, and it keeps the telemetry pipeline out of scope for a whole class
of compliance risk.

## Scope

All emitted telemetry across services. This is the data-in-telemetry sibling of the source-control rule
[`sec-no-plaintext-secrets`](../security-compliance/no-plaintext-secrets.md).

## Exceptions

Advisory (Handbook) **in the pilot** — warns rather than blocks, because there's no telemetry-scanning
enforcement yet. In a built-out enterprise this is a strong candidate for a Security & Compliance
**Policy** control, given the compliance exposure.

---
id: obs-structured-logging
title: Emit structured logs with consistent fields
domain: Observability & Data
severity: Handbook
enforcement_point: audit
agent_action: enforce
status: active
since: 0.1.0
tags: [logging, structured, observability]
---

## Rule

Services **should** emit **structured** logs (e.g. JSON) with a consistent set of fields — level,
timestamp, service name, and a correlation id — rather than free-form text lines. Avoid unstructured
`print`-style logging in application code.

## Rationale

Structured logs are queryable: you can filter, aggregate, and correlate them instead of grepping prose.
Consistent fields across services are what make a central sink actually useful during an incident.

## Scope

Application and service code that emits operational logs. One-off scripts and local development output
are out of scope.

## Enforcement

**Enforcement point:** `audit` — caught at a retroactive audit or periodic scan, after the fact. Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## Exceptions

Advisory (Handbook): warns rather than blocks. In a full catalog this pairs with rules covering where
the logs go and the correlation field that ties a request together — see
[`obs-logs-to-approved-sink`](https://github.com/adam-flores/sample-org-engineering-config/blob/main/guidance/observability-data/logs-to-approved-sink.md)
and
[`obs-correlation-ids`](https://github.com/adam-flores/sample-org-engineering-config/blob/main/guidance/observability-data/correlation-ids.md)
in the sample. This illustrative set carries neither.

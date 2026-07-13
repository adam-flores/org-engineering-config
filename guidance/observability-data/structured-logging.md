---
id: obs-structured-logging
title: Emit structured logs with consistent fields
domain: Observability & Data
severity: Handbook
enforcement: retroactive
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

## Exceptions

Advisory (Handbook): warns rather than blocks. Pairs with
[`obs-logs-to-approved-sink`](logs-to-approved-sink.md) (where the logs go) and
[`obs-correlation-ids`](correlation-ids.md) (the field that ties a request together).

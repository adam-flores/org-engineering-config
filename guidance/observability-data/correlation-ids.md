---
id: obs-correlation-ids
title: Propagate correlation IDs across services
domain: Observability & Data
severity: Handbook
enforcement: none
status: active
since: 0.1.0
tags: [tracing, correlation-id, observability, distributed]
---

## Rule

Services **should** generate a correlation (trace) id at the edge and propagate it through downstream
calls, attaching it to logs and, where available, distributed traces — so a single request can be
followed across service boundaries.

## Rationale

In anything beyond a single service, "what happened to this request" is unanswerable without a shared
id tying the pieces together. Correlation ids turn a pile of disconnected logs into a coherent trace of
one user's path through the system.

## Scope

Services that call, or are called by, other services. A fully standalone service with no downstream
calls gets less from this but still benefits from a per-request id.

## Exceptions

Advisory (Handbook): warns rather than blocks. Depends on [`obs-structured-logging`](structured-logging.md)
carrying the id as a field.

---
id: obs-analytics-event-schema
title: Follow an agreed schema for analytics events
domain: Observability & Data
severity: Handbook
enforcement_point: human-review
agent_action: align
status: active
since: 0.1.0
tags: [analytics, events, schema, tracking-plan, data-quality]
---

## Rule

Product analytics events **should** follow an agreed schema (a tracking plan): consistent event names,
defined properties, and stable types — rather than ad-hoc events invented per feature.

## Rationale

Analytics is only as good as its consistency. Ad-hoc event names and drifting property shapes make data
impossible to trust or join later; a shared schema keeps events comparable across features and over
time, so the numbers actually mean something.

## Scope

Product and usage analytics events. Operational telemetry (logs/metrics/traces) is covered by the other
observability rules.

## Enforcement

**Enforcement point:** `human-review` — caught at human review at PR time (no mechanical gate). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): warns rather than blocks. The tracking plan is a shared convention, not a
mechanical gate.

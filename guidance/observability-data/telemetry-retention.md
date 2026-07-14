---
id: obs-telemetry-retention
title: Define retention windows for telemetry
domain: Observability & Data
severity: Strategic
enforcement_point: audit
agent_action: aware
status: active
since: 0.1.0
tags: [retention, logging, telemetry, data-lifecycle]
---

## Rule

Logs, metrics, and traces **must** have a defined retention window — kept long enough to debug and
audit, then expired — rather than being retained indefinitely or discarded ad hoc.

## Rationale

Indefinite retention is both a cost and a liability (more sensitive data sitting around longer than it's
useful); too-short retention leaves you blind during a post-incident review. A deliberate window
balances debuggability, cost, and data-minimization.

## Scope

Operational telemetry (logs, metrics, traces). Regulatory retention of *business or user data* is a
compliance concern and lives in Security & Compliance, not here.

## Enforcement

**Enforcement point:** `audit` — caught at a retroactive audit or periodic scan, after the fact. It is **required but unenforceable** at a gate — held by review and culture, not a hard block.

**Agent action:** `aware` — a coding agent cannot self-satisfy this rule; it should surface it and never undermine it.

## Exceptions

Retention is governed by the telemetry platform's configuration; a legitimate deviation (e.g. a
longer window for a regulated dataset) is recorded with its justification and reviewed on the next
audit.

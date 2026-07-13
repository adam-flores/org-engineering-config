---
id: obs-telemetry-retention
title: Define retention windows for telemetry
domain: Observability & Data
severity: Handbook
status: active
since: 0.1.0
tags: [retention, logging, telemetry, data-lifecycle]
---

## Rule

Logs, metrics, and traces **should** have a defined retention window — kept long enough to debug and
audit, then expired — rather than being retained indefinitely or discarded ad hoc.

## Rationale

Indefinite retention is both a cost and a liability (more sensitive data sitting around longer than it's
useful); too-short retention leaves you blind during a post-incident review. A deliberate window
balances debuggability, cost, and data-minimization.

## Scope

Operational telemetry (logs, metrics, traces). Regulatory retention of *business or user data* is a
compliance concern and lives in Security & Compliance, not here.

## Exceptions

Advisory (Handbook): warns rather than blocks — retention is enforced by the telemetry platform's
configuration, which the pilot doesn't yet standardize.

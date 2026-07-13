---
id: obs-logs-to-approved-sink
title: Emit logs and telemetry to an approved sink
domain: Observability & Data
severity: Strategic
status: active
since: 0.1.0
tags: [logging, telemetry, retention]
---

## Rule

Application logs, metrics, and traces **must** be emitted to an approved central sink using the
standard structured format. Services must not rely solely on local files or ad-hoc destinations for
operational telemetry.

## Rationale

Centralized, structured telemetry is what makes incidents debuggable across services and keeps
retention, access, and PII handling under one auditable policy. Ad-hoc logging is invisible during an
outage and uncontrolled for compliance.

## Scope

All production and staging services. Local development output is out of scope.

## Exceptions

A service that cannot reach the standard sink (e.g. an isolated environment) documents its alternative
and its retention story with platform sign-off. Phase 2 enforces this via the exception path.

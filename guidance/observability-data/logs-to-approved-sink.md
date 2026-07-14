---
id: obs-logs-to-approved-sink
title: Emit logs and telemetry to an approved sink
domain: Observability & Data
severity: Handbook
enforcement_point: audit
agent_action: align
status: active
since: 0.1.0
tags: [logging, telemetry, retention]
---

## Rule

Application logs, metrics, and traces **should** be emitted to an approved central sink using the
standard structured format, rather than relying solely on local files or ad-hoc destinations for
operational telemetry.

## Rationale

Centralized, structured telemetry is what makes incidents debuggable across services and keeps
retention, access, and PII handling under one auditable policy. Ad-hoc logging is invisible during an
outage and uncontrolled for compliance.

## Scope

All production and staging services. Local development output is out of scope.

## Enforcement

**Enforcement point:** `audit` — caught at a retroactive audit or periodic scan, after the fact. Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): warns rather than blocks. In the pilot there's no central-sink enforcement to
gate against; this becomes a candidate for a blocking rule once an approved sink and a way to verify it
exist. A service that cannot reach the standard sink documents its alternative and its retention story.

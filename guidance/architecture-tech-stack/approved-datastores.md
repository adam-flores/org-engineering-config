---
id: arch-approved-datastores
title: Prefer Postgres, file/document storage, or no database
domain: Architecture & Tech Stack
severity: Handbook
enforcement_point: human-review
agent_action: align
status: active
since: 0.1.0
tags: [database, postgres, storage, persistence]
---

## Rule

When persistence is required, reach for an approved option in this order of preference:

1. **PostgreSQL** — the default for relational and general-purpose data.
2. **File / document storage** (e.g. XML or JSON documents) — for lightweight or
   configuration-shaped data that doesn't need a relational engine.
3. **No database** — prefer statelessness; don't introduce a datastore a service doesn't need.

## Rationale

A short, ranked list of datastores keeps backups, access control, and operational expertise
concentrated. Defaulting to Postgres, then to simple file/document storage, then to nothing, avoids
proliferating persistence technologies and steers teams away from stateful complexity they don't
need.

## Scope

New services and features that need persistence. Existing datastores are out of scope until migration.
This rule expresses *preference*; the hard prohibition on local/embedded SQL engines lives in
[`arch-no-local-sql-databases`](no-local-sql-databases.md).

## Enforcement

**Enforcement point:** `human-review` — caught at human review at PR time (no mechanical gate). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): a workload with needs Postgres genuinely can't serve (e.g. a specialized search
or analytics store) should record the choice with architecture review.

---
id: arch-service-boundaries
title: Cross service boundaries through APIs, not shared databases
domain: Architecture & Tech Stack
severity: Handbook
status: active
since: 0.1.0
tags: [service-boundaries, data-ownership, coupling]
---

## Rule

A service **should** own its data and expose it only through its API. Other services must not read or
write its database directly or reach into its internal storage to share data.

## Rationale

Shared-database coupling turns independent services into a single tangled system: schema changes break
unrelated teams and ownership becomes ambiguous. Talking through APIs keeps the boundary explicit and
lets each service evolve its storage freely — the system-level counterpart to API-first design.

## Scope

Services that own persistent data. A deliberately shared datastore owned by a single team (with that
ownership documented) is out of scope.

## Exceptions

Advisory (Handbook): a reporting or analytics read-replica pattern may access data out-of-band when
documented and owned, rather than growing ad-hoc cross-service database access.

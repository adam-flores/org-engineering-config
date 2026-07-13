---
id: arch-no-local-sql-databases
title: No SQLite or local/embedded SQL databases
domain: Architecture & Tech Stack
severity: Strategic
status: active
since: 0.1.0
tags: [database, sqlite, persistence, prohibition]
---

## Rule

Services **must not** use SQLite or other local/embedded SQL engines, or developer-local SQL instances,
as a datastore for application data. Relational persistence uses the approved managed database
(PostgreSQL — see [`arch-approved-datastores`](approved-datastores.md)).

## Rationale

Embedded and local SQL databases give no shared backups, access control, durability, or observability,
and they hide data on individual hosts or laptops. Standardizing on a managed engine keeps data
recoverable, auditable, and operable.

## Scope

Application data persistence in services and shared tooling. Purely local, disposable use with no
application data — for example a test fixture or a build cache — is out of scope.

## Exceptions

None by default. This is one of the few architecture rules that is mechanically detectable (dependency
and file scanning), which is why it blocks rather than warns. Phase 2 adds an admin-granted exception
path for reviewed cases.

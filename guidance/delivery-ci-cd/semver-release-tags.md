---
id: cicd-semver-release-tags
title: Tag releases with a semantic version
domain: Delivery & CI/CD
severity: Strategic
enforcement_point: ci-gate
agent_action: align
status: active
since: 0.1.0
tags: [releases, versioning, semver, tags]
---

## Rule

Every release **must** carry a **semantic version** tag of the form `MAJOR.MINOR.PATCH` (e.g.
`v2.4.1`), incremented by the nature of the change: MAJOR for breaking changes, MINOR for
backward-compatible additions, PATCH for backward-compatible fixes.

## Rationale

A consistent, meaningful version scheme lets consumers reason about what an upgrade will do, makes
release history auditable, and is the anchor other automation (changelogs, deploy tracking, rollback)
hangs off of. An unversioned or ad-hoc-tagged release can't be reasoned about or reliably rolled back
to.

## Scope

Anything cut as a release — services, libraries, and published artifacts. Ephemeral preview or CI
build identifiers are out of scope.

## Enforcement

**Enforcement point:** `ci-gate` — caught at a CI gate. Because it is required and centrally gated, this rule **blocks** the PR/release.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

None by default — the tag format is validated on release and blocks. This is Strategic (an internal
engineering mandate), not a compliance control. Phase 2 adds the admin-granted exception path.

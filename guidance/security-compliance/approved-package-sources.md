---
id: sec-approved-package-sources
title: Install packages only from approved, reputable registries
domain: Security & Compliance
severity: Strategic
enforcement_point: ci-gate
agent_action: enforce
status: active
since: 0.1.0
tags: [security, supply-chain, dependencies, registries, packages]
---

## Rule

Dependencies **must** be installed only from approved package sources:

- the **canonical public registry** for each ecosystem (e.g. npmjs.org, NuGet.org, PyPI); **or**
- an **org-approved internal registry or proxy** for first-party and vetted packages.

Packages **must not** be pulled directly from an individual publisher's personal source — arbitrary
`git`/URL installs, personal or unvetted third-party registries, or hand-shared archives.

## Rationale

Reputable registries provide provenance, moderation, and takedown, and leave an auditable trail.
Installing from an individual's personal source bypasses all of that and is a classic supply-chain
vector — typosquatting, account compromise, and malicious drop-in packages. First-party code belongs
in the approved internal registry, not wired in from a personal repository.

## Scope

Dependency declarations and lockfiles across all repositories. Detectable by scanning the resolved
source of each dependency in the lockfile/manifest. Vendored code with a recorded, reviewed origin is
out of scope.

## Enforcement

**Enforcement point:** `ci-gate` — caught at a CI gate. Because it is required and centrally gated, this rule **blocks** the PR/release.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## Exceptions

None by default — the gate blocks. A package genuinely needed but not on a public registry is published
to the org-approved internal registry rather than pulled from a personal source; broader deviations go
through the Phase-2 admin-granted exception path.

---
id: integ-dependency-licenses
title: Third-party dependencies must use allowed licenses
domain: Integrations & Tooling
severity: Strategic
enforcement_point: ci-gate
agent_action: align
status: active
since: 0.1.0
tags: [licensing, dependencies, supply-chain, compliance]
---

## Rule

Third-party dependencies **must** carry an allowed open-source license. Dependencies under prohibited
licenses (e.g. strong copyleft pulled into proprietary distribution) **must not** be introduced. The
allowed/prohibited license sets are maintained centrally.

## Rationale

A dependency's license is a legal obligation that rides along with the code — the wrong one can force
source disclosure or breach distribution terms. Checking licenses at the point they're added keeps
legal risk out of the product instead of discovering it in an audit.

## Scope

Third-party runtime and distributed dependencies. Dev-only tooling that isn't distributed is lower-risk
and may be scoped out.

## Enforcement

**Enforcement point:** `ci-gate` — caught at a CI gate. Because it is required and centrally gated, this rule **blocks** the PR/release.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

The gate blocks on the detectable part — dependency licenses are machine-readable, so a license scan
can fail the build. A specific dependency needed under a borderline license goes through the Phase-2
exception path with legal sign-off. This is Strategic (internal standard for allowed licenses); treat
it as a Policy control if your obligations are contractually or legally mandated.

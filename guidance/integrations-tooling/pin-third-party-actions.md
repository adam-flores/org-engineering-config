---
id: integ-pin-third-party-actions
title: Pin third-party CI actions and dependencies by digest
domain: Integrations & Tooling
severity: Handbook
enforcement: central
status: active
since: 0.1.0
tags: [supply-chain, pinning, ci]
---

## Rule

Third-party CI actions and build-time dependencies **should** be pinned to an immutable identifier (a
commit SHA or content digest) rather than a mutable tag like `latest` or a floating major version.

## Rationale

Mutable tags let an upstream change alter your build without review — the classic supply-chain vector.
Digest pinning makes builds reproducible and turns every upstream update into an explicit, reviewable
change.

## Scope

CI workflow definitions and build tooling. Runtime application dependencies are governed by each
project's lockfile and are out of scope here.

## Exceptions

Advisory (Handbook): trusted first-party internal actions may use a moving version where the
maintaining team accepts the risk.

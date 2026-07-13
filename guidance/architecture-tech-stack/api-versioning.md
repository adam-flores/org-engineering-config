---
id: arch-api-versioning
title: Version APIs and preserve backward compatibility
domain: Architecture & Tech Stack
severity: Handbook
enforcement: none
status: active
since: 0.1.0
tags: [api, versioning, compatibility]
---

## Rule

Published APIs **should** carry an explicit version and evolve without breaking existing consumers:
add rather than remove or repurpose fields, and introduce a new version when a breaking change is
unavoidable, retiring the old one on a communicated timeline.

## Rationale

Consumers integrate against a contract they can't redeploy in lockstep with the producer. Explicit
versioning and additive change keep integrations from breaking silently and make deprecation a managed
process rather than an outage.

## Scope

APIs consumed across a team or system boundary. Internal interfaces changed atomically with all their
callers are out of scope.

## Exceptions

Advisory (Handbook): a pre-release or clearly experimental API may break freely while it's labeled
unstable and has no production consumers.

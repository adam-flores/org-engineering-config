---
id: cicd-post-deploy-validation
title: Validate deployments after release
domain: Delivery & CI/CD
severity: Handbook
enforcement: retroactive
status: active
since: 0.1.0
tags: [deployment, validation, smoke-tests, health-checks, rollback]
---

## Rule

A deployment **should** run automated post-deploy validation — smoke and health checks against the
target environment — before it's considered complete, and a failing check **should** halt promotion or
trigger a rollback rather than leaving a bad release live.

## Rationale

Pre-merge tests run against the code; post-deploy validation runs against the *running release* in its
real environment, catching the config, secrets, connectivity, and infrastructure problems that unit
and integration tests can't see. It closes the loop between shipping and knowing it worked, and it's
what makes a rollback decision automatic instead of a 2am judgment call.

## Scope

Production (and staging) deployments of services. Local runs and developer sandboxes are out of scope.

## Exceptions

Advisory (Handbook): this warns rather than blocks. Whether a validation suite is adequate is a
judgment call that can't be mechanically verified, so it's recommended practice. It builds on
[`cicd-deploy-via-pipeline`](deploy-via-pipeline.md) (where validation runs) and
[`cicd-safe-rollback`](safe-rollback.md) (what a failure triggers).

---
id: obs-health-readiness-endpoints
title: Expose health and readiness endpoints
domain: Observability & Data
severity: Handbook
enforcement: retroactive
status: active
since: 0.1.0
tags: [health-check, readiness, observability, deployment]
---

## Rule

Services **should** expose **health** (is the process alive) and **readiness** (can it serve traffic)
endpoints, so the platform and the delivery pipeline can tell whether an instance is healthy.

## Rationale

Health and readiness signals are what let orchestrators route around bad instances and let deployments
verify a release before sending it traffic. They're the hook post-deploy validation and autoscaling
both rely on.

## Scope

Long-running services. Batch jobs, functions, and short-lived tasks are out of scope; their health is
observed differently.

## Exceptions

Advisory (Handbook): warns rather than blocks. This is the signal
[`cicd-post-deploy-validation`](../delivery-ci-cd/post-deploy-validation.md) checks after a release; it
becomes a candidate blocking rule once there's a platform contract to verify the endpoints against.

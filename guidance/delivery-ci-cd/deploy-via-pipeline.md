---
id: cicd-deploy-via-pipeline
title: Deploy through the pipeline, not by hand
domain: Delivery & CI/CD
severity: Strategic
status: active
since: 0.1.0
tags: [deployment, pipeline, environments, promotion, approvals]
---

## Rule

Deployments **must** go through the delivery pipeline, promoting a build through environments
(dev → staging → production) rather than being applied by hand. Production deployments **must** pass an
explicit approval gate.

## Rationale

A pipeline makes every deployment consistent, logged, and repeatable, and ensures the artifact reaching
production is the one that passed the earlier stages. Hand deployments skip those checks, leave no
audit trail, and are the classic source of "works in staging, breaks in prod." A production approval
gate keeps a human decision on the highest-risk step.

## Scope

Deployable services and applications. Local runs and developer sandboxes are out of scope.

## Exceptions

The gate blocks on what the platform can enforce — the pipeline and the production approval gate are
configured controls. "Nobody deployed by hand out-of-band" can't be detected from the repo, so it
stands as required practice backed by access controls. Break-glass deploys during an incident must be
logged and reconciled; broader deviations use the Phase-2 exception path.

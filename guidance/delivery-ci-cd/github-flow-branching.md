---
id: cicd-github-flow-branching
title: Follow GitHub Flow for branching
domain: Delivery & CI/CD
severity: Strategic
status: active
since: 0.1.0
tags: [branching, github-flow, workflow]
---

## Rule

Teams **must** follow **GitHub Flow**: `main` is always deployable; work happens on short-lived
branches cut from `main`; changes land back on `main` through a reviewed pull request. Long-lived
parallel branches (a permanent `develop`, release trains) are not the standard model.

## Rationale

A single always-deployable branch with short-lived topic branches keeps integration continuous, avoids
long-running merge divergence, and makes "what's in production" unambiguous. It's the branching model
the rest of the delivery gates assume.

## Scope

Application and service repositories. A repository with a genuinely different release model (e.g. a
versioned library maintaining multiple release lines) may deviate with that model documented.

## Exceptions

The enforceable core — PR into a protected `main`, no direct pushes — is gated by
[`cicd-required-checks-before-merge`](required-checks-before-merge.md). "Use GitHub Flow specifically"
as a whole isn't fully machine-checkable, so beyond that gate this rides as required convention rather
than a hard block on every aspect.

---
id: arch-approved-runtime-baselines
title: Build on approved language and runtime baselines
domain: Architecture & Tech Stack
severity: Strategic
status: active
since: 0.1.0
tags: [runtime, versions, tech-stack]
---

## Rule

New services **must** target a language runtime and version drawn from the organization's approved
baseline set. Runtimes past end-of-life or not on the approved list must not be introduced.

## Rationale

A bounded set of runtimes keeps security patching, base images, tooling, and on-call knowledge
tractable. Every additional runtime multiplies the surface that platform and security teams must
support.

## Scope

Applies to new services and to major-version upgrades of existing ones. Experiments and spikes that
never reach production are exempt while clearly marked as such.

## Exceptions

A deviation requires architecture-review sign-off recorded with the service. Phase 2 enforces this
through the managed exception path.

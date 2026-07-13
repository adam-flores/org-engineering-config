---
id: qual-deterministic-tests
title: Tests must be deterministic and isolated
domain: Quality & Testing
severity: Handbook
enforcement: retroactive
status: active
since: 0.1.0
tags: [testing, flaky, determinism, isolation]
---

## Rule

Tests **should** be deterministic and isolated — the same input produces the same result, with no
dependence on wall-clock time, network, ordering, or shared mutable state. A test that goes flaky is
quarantined and fixed, not papered over by retrying until it goes green.

## Rationale

A flaky suite trains everyone to ignore red, which is how real failures slip through. Retry-until-green
hides the flake instead of removing it and lets genuine intermittent bugs ride along. Deterministic,
isolated tests keep a red build meaningful.

## Scope

Automated tests at every level. Tests that deliberately exercise real external systems (a contract or
smoke test) should isolate that dependency or be clearly separated from the deterministic suite.

## Exceptions

Advisory (Handbook): "deterministic enough" is a judgment call and flakiness isn't cleanly detectable
in a single run, so this warns rather than blocks. Quarantining a flaky test is the pressure valve —
but it comes with a tracked fix, not an indefinite retry.

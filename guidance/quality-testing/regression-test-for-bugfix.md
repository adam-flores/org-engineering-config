---
id: qual-regression-test-for-bugfix
title: Add a regression test with every bug fix
domain: Quality & Testing
severity: Handbook
enforcement_point: human-review
agent_action: enforce
status: active
since: 0.1.0
tags: [testing, regressions]
---

## Rule

When fixing a bug, you **should** add a test that fails before the fix and passes after it. Prefer
writing the failing test first so the fix is demonstrably what closes it.

## Rationale

A regression test proves the fix works and pins the behavior so the bug can't silently return. It is
the cheapest documentation of what went wrong and why the code is shaped the way it is.

## Scope

Any change whose purpose is to correct incorrect behavior. Purely cosmetic or mechanical changes with
no behavioral effect are out of scope.

## Enforcement

**Enforcement point:** `human-review` — caught at human review at PR time (no mechanical gate). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## Exceptions

Advisory (Handbook): if the bug isn't practically reproducible in a test, note why in the change
description rather than skipping silently.

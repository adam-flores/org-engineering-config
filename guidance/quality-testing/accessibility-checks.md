---
id: qual-accessibility-checks
title: UI must pass automated accessibility checks
domain: Quality & Testing
severity: Strategic
enforcement_point: ci-gate
agent_action: enforce
status: active
since: 0.1.0
tags: [testing, accessibility, a11y, ui]
---

## Rule

User interfaces **must** pass automated accessibility checks (e.g. an axe-based scan) run in CI as a
required check, with no unresolved violations at or above the agreed severity.

## Rationale

Accessibility is far cheaper to keep than to retrofit, and an automated scan on every pull request
stops regressions — missing labels, broken contrast, un-focusable controls — from shipping. It also
keeps the product usable for everyone and supports the compliance obligations that often depend on it.

## Scope

Applications and services with a user interface. Headless services are out of scope. Pairs with
[`qual-ui-automated-testing`](ui-automated-testing.md), which runs the behavioral UI suite.

## Enforcement

**Enforcement point:** `ci-gate` — caught at a CI gate. Because it is required and centrally gated, this rule **blocks** the PR/release.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## Exceptions

The gate blocks on the automated scan passing. Automated tooling catches only a subset of
accessibility issues, so a green scan is a floor, not a proof of full accessibility — the rest is
manual review. A specific rule that can't yet be met is suppressed explicitly with a tracked reason,
not by removing the check; broader deviations use the Phase-2 exception path.

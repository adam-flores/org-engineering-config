---
id: qual-ui-automated-testing
title: UI development must have automated tests
domain: Quality & Testing
severity: Strategic
status: active
since: 0.1.0
tags: [testing, ui, e2e, playwright, automation]
---

## Rule

User-interface development **must** be covered by automated tests that run in CI as a required check.
The approved UI testing tool is **Playwright** (specified under Integrations & Tooling). A UI change
should ship with the automated tests that exercise it.

## Rationale

UI regressions are easy to introduce and expensive to catch by hand. An automated suite running on
every pull request keeps user-facing behavior verified continuously instead of relying on manual
click-through. Standardizing on one tool keeps the suites consistent and shareable across teams.

## Scope

Applications and services with a user interface. Purely headless services with no UI are out of scope
(their behavior is covered by unit and integration tests).

## Exceptions

The gate blocks on what's checkable — the Playwright suite exists and runs green as a required check
(see [`cicd-required-checks-before-merge`](../delivery-ci-cd/required-checks-before-merge.md)). "Every
UI feature has a matching test" can't be mechanically verified, so beyond the suite gate that rides as
required practice, caught in peer review. Pairs with
[`qual-accessibility-checks`](accessibility-checks.md).

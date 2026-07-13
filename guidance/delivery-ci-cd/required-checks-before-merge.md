---
id: cicd-required-checks-before-merge
title: Gate every merge on required CI checks
domain: Delivery & CI/CD
severity: Strategic
enforcement: central
status: active
since: 0.1.0
tags: [ci, branch-protection, merge]
---

## Rule

Changes to a protected branch **must** merge through a pull request whose required status checks
(build, tests, and the guidance freshness gate) have passed. Direct pushes that bypass required
checks are not permitted.

## Rationale

Required checks are where automated enforcement actually bites. Without branch protection, every other
standard degrades to a suggestion. This is the mechanism the whole governance model relies on.

## Scope

All protected branches (default branch and release branches). Personal or throwaway branches without
protection are out of scope until they target a protected branch.

## Exceptions

Break-glass merges for incident response must be logged and reviewed after the fact. Phase 2 formalizes
the break-glass path.

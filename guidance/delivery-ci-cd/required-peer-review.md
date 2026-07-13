---
id: cicd-required-peer-review
title: Require an approving peer review before merge
domain: Delivery & CI/CD
severity: Strategic
status: active
since: 0.1.0
tags: [code-review, pull-requests, branch-protection]
---

## Rule

A pull request into a protected branch **must** have at least one approving review from someone other
than the author before it can merge. Self-approval does not satisfy the requirement.

## Rationale

Automated checks catch what they're written to catch; a second person catches design problems, missing
context, and judgment calls that no linter will. Required review also spreads knowledge so no change
lands understood by only one person. This is distinct from — and complementary to —
[`cicd-required-checks-before-merge`](required-checks-before-merge.md): CI proves it works, review
proves someone else looked.

## Scope

Pull requests targeting protected branches. Repositories with a single maintainer may configure the
minimum the platform allows, documented as such.

## Exceptions

None by default — enforced through branch-protection review rules. Break-glass merges during an
incident must be logged and reviewed after the fact; broader deviations use the Phase-2 exception path.

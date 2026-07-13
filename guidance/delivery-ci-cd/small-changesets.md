---
id: cicd-small-changesets
title: Prefer small commits and pull requests
domain: Delivery & CI/CD
severity: Handbook
status: active
since: 0.1.0
tags: [commits, pull-requests, review, size]
---

## Rule

Keep changes small:

- **Commits** — prefer under **200 lines** changed; a commit should be one coherent step.
- **Pull requests** — prefer under **1000 lines** changed; a PR should be one reviewable unit.

Larger commits and PRs are discouraged and should be split where practical.

## Rationale

Review quality falls off sharply as a diff grows — large changes get rubber-stamped, and defects slip
through. Small commits and PRs get real scrutiny, are faster to merge, and are far easier to bisect and
revert when something breaks.

## Scope

Application and service changes. Bulk mechanical changes (generated code, a formatter sweep, a
dependency bump) that are large but low-risk are out of scope — call them out as such in the PR.

## Exceptions

Advisory (Handbook): the thresholds are guidance, not hard limits, so this warns rather than blocks.
Diff size is measurable, so a CI check may surface an advisory warning on oversized changes.

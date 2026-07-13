---
id: cicd-decompose-work
title: Decompose work into small, independently branched pieces
domain: Delivery & CI/CD
severity: Handbook
enforcement: none
status: active
since: 0.1.0
tags: [planning, decomposition, branching, workflow]
---

## Rule

A plan **should** be split into disparate, independently shippable pieces, with a separate branch (and
pull request) for each piece, rather than developed as one large branch that lands everything at once.

## Rationale

Small, independent pieces are easier to review, safer to merge, and quicker to roll back if one turns
out wrong. Decomposing the plan up front also surfaces hidden dependencies early and lets pieces ship
as they're ready instead of waiting on the whole.

## Scope

Any non-trivial change or feature. A genuinely atomic change that can't be split is out of scope.

## Exceptions

Advisory (Handbook): how finely to decompose is a judgment call, so this warns rather than blocks. It
pairs with [`cicd-small-changesets`](small-changesets.md), which sizes the resulting commits and PRs.

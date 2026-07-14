---
id: cicd-delete-merged-branches
title: Delete branches after they merge
domain: Delivery & CI/CD
severity: Handbook
enforcement_point: ci-gate
agent_action: align
status: active
since: 0.1.0
tags: [branching, github-flow, hygiene]
---

## Rule

Topic branches **should** be short-lived and deleted once their pull request merges, rather than
lingering. Prefer enabling the platform's automatic-delete-on-merge setting.

## Rationale

Stale branches pile up, hide which work is actually in flight, and tempt someone to build on a branch
that's already merged or abandoned. Deleting on merge keeps the branch list an honest picture of
active work — the hygiene that keeps [`cicd-github-flow-branching`](github-flow-branching.md) actually
short-lived.

## Scope

Topic and feature branches in application and service repositories. Protected and long-lived
release-line branches are, by definition, out of scope.

## Enforcement

**Enforcement point:** `ci-gate` — caught at a CI gate. It runs in CI but only **warns** — Handbook rules never block.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): warns rather than blocks. Auto-delete-on-merge is a repository setting rather than
a per-change gate, so this is hygiene guidance, not a hard control.

---
id: env-pre-commit-hooks
title: Provide standard pre-commit hooks
domain: Developer Environment
severity: Handbook
enforcement_point: pre-commit
agent_action: align
status: active
since: 0.1.0
tags: [pre-commit, hooks, formatting, scanning, shift-left]
---

## Rule

Repositories **should** ship a standard pre-commit hook configuration that runs the formatter/linter
and the local security scans before a commit is created, so problems are caught at the keyboard rather
than at the pull-request gate.

## Rationale

A shared pre-commit config makes the "run it locally first" expectation real and effortless: format,
lint, and scan happen automatically instead of relying on memory. It's the mechanism that delivers
[`sec-local-vulnerability-scanning`](../security-compliance/local-vulnerability-scanning.md) and
[`env-shared-formatter-config`](shared-formatter-config.md) in practice.

## Scope

Application and service repositories. Docs-only repositories may use a lighter set.

## Enforcement

**Enforcement point:** `pre-commit` — caught at a pre-commit hook or local scan (real, but bypassable). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): warns rather than blocks — pre-commit hooks are local and bypassable
(`--no-verify`), so the authoritative enforcement stays on the remote gate. The hook is the convenience
that keeps you ahead of it.

---
id: env-shared-formatter-config
title: Use the shared formatter and linter configuration
domain: Developer Environment
severity: Handbook
enforcement_point: pre-commit
agent_action: enforce
status: active
since: 0.1.0
tags: [formatting, linting, consistency]
---

## Rule

Projects **should** adopt the organization's shared formatter and linter configuration rather than
maintaining bespoke per-project style rules, and run it in a pre-merge check.

## Rationale

A shared, automated style baseline removes formatting debate from review, keeps diffs meaningful, and
lets engineers move between repos without relearning conventions. The value is in everyone sharing
*one* config, not in the specific rules.

## Scope

Application and library repositories. Generated code and vendored third-party code are excluded from
formatting.

## Enforcement

**Enforcement point:** `pre-commit` — caught at a pre-commit hook or local scan (real, but bypassable). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## Exceptions

Advisory (Handbook): a project may extend the shared config with additive local rules, but should not
disable its baseline rules wholesale.

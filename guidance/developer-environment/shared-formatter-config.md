---
id: env-shared-formatter-config
title: Use the shared formatter and linter configuration
domain: Developer Environment
severity: Handbook
enforcement: local
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

## Exceptions

Advisory (Handbook): a project may extend the shared config with additive local rules, but should not
disable its baseline rules wholesale.

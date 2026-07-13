---
id: env-gitignore-local-settings
title: Don't commit local environment settings
domain: Developer Environment
severity: Handbook
enforcement: local
status: active
since: 0.1.0
tags: [gitignore, local-config, editor-settings, hygiene]
---

## Rule

Machine- and user-specific environment settings **should not** be committed — personal editor/IDE
settings, local tool config, OS cruft (`.DS_Store`), and local `.env` files. Keep them out of source
control with an appropriate `.gitignore` (and a shared org baseline where one exists).

## Rationale

Committed local settings create noise and conflicts — one person's editor config or absolute paths
break for everyone else, and every PR carries irrelevant churn. A good `.gitignore` keeps the
repository to what's genuinely shared, so diffs stay meaningful.

## Scope

Personal and machine-specific files. Configuration meant to be shared (a recommended-extensions list, a
committed formatter config) is deliberately in scope for the repo and not covered here.

## Exceptions

Advisory (Handbook): warns rather than blocks. Committed local files are partly detectable in review,
but which files are "personal" varies by setup, so this is hygiene guidance. Pairs with
[`env-local-secrets-handling`](local-secrets-handling.md) for the secrets case.

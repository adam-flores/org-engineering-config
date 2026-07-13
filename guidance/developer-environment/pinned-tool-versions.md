---
id: env-pinned-tool-versions
title: Pin local runtime and tool versions
domain: Developer Environment
severity: Handbook
enforcement: retroactive
status: active
since: 0.1.0
tags: [versions, toolchain, reproducibility, mise, nvm]
---

## Rule

Repositories **should** pin the local runtime and tool versions they expect — via a version file such
as `.nvmrc`, `.tool-versions`, or a `mise`/`asdf` config — so every contributor and CI run uses the
same toolchain.

## Rationale

Version skew between laptops (and between a laptop and CI) is a quiet source of "passes locally, fails
in CI." A checked-in version file makes the expected toolchain explicit and lets version managers set
it up automatically.

## Scope

Repositories with a language runtime or build toolchain. Purely static content is out of scope.

## Exceptions

Advisory (Handbook): warns rather than blocks. The presence of a version file is partly detectable,
but matching the org's approved runtimes ([`arch-approved-app-stack`](../architecture-tech-stack/approved-app-stack.md))
is the substantive intent.

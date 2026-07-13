---
id: env-reproducible-setup
title: Make local setup reproducible
domain: Developer Environment
severity: Handbook
enforcement: retroactive
status: active
since: 0.1.0
tags: [onboarding, devcontainer, bootstrap, reproducibility]
---

## Rule

A repository **should** provide a reproducible way to stand up its local environment — a devcontainer,
or a documented one-command bootstrap (e.g. `make setup`) — rather than a wiki page of manual steps
that drifts out of date.

## Rationale

"Works on my machine" is a setup problem. A scripted or containerized environment gets a new
contributor productive in minutes, keeps everyone on the same toolchain, and turns environment drift
into a fixable, version-controlled artifact instead of tribal knowledge.

## Scope

Application and service repositories that others are expected to run locally. A throwaway or
single-owner script is out of scope.

## Exceptions

Advisory (Handbook): warns rather than blocks. Works hand-in-hand with
[`env-pinned-tool-versions`](pinned-tool-versions.md) (what versions) and
[`env-pre-commit-hooks`](pre-commit-hooks.md) (what runs before commit).

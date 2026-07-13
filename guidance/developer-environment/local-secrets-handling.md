---
id: env-local-secrets-handling
title: Handle local secrets safely
domain: Developer Environment
severity: Handbook
enforcement: local
status: active
since: 0.1.0
tags: [secrets, local, dotenv, credentials]
---

## Rule

Local development secrets **should** be supplied through a gitignored `.env` file or a local secret
manager, never hardcoded into source and never committed. Provide a checked-in `.env.example` with
placeholder keys so contributors know what to set without exposing real values.

## Rationale

Secrets are needed to run things locally, which is exactly when they tend to get pasted into source and
committed by accident. A gitignored `.env` plus an example template keeps the real values on the
developer's machine and gives a safe, obvious pattern to follow.

## Scope

Local development configuration and credentials. Production and CI secret delivery is governed by the
platform, not this rule.

## Exceptions

Advisory (Handbook) locally, but the moment a secret is committed it becomes the
[`sec-no-plaintext-secrets`](../security-compliance/no-plaintext-secrets.md) Policy — rotate and purge.
Pairs with [`env-gitignore-local-settings`](gitignore-local-settings.md).

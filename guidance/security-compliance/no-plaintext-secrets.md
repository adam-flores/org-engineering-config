---
id: sec-no-plaintext-secrets
title: Never commit plaintext secrets to source control
domain: Security & Compliance
severity: Policy
enforcement: central
status: active
since: 0.1.0
tags: [secrets, credentials]
---

## Rule

Credentials, API keys, tokens, private keys, and connection strings **must not** be committed to
source control in plaintext. Secrets are supplied at runtime from an approved secret manager or the
platform's encrypted configuration.

## Rationale

Source history is effectively permanent and widely readable; a secret committed once must be treated
as compromised and rotated. Keeping secrets out of the repo is the single highest-leverage control
against credential leakage.

## Scope

All tracked files in every repository, including tests, fixtures, sample configs, and documentation.
Encrypted secrets (e.g. sealed/SOPS-encrypted files) that require a key held outside the repo are not
plaintext and are out of scope.

## Exceptions

None by default. A committed secret is an incident: rotate it, then purge if feasible. Phase 2 adds
an admin-granted exception path for narrowly scoped, reviewed cases.

---
id: sec-no-plaintext-secrets
title: Never commit plaintext secrets to source control
domain: Security & Compliance
severity: Policy
enforcement_point: ci-gate
agent_action: enforce
references: ["SOC2 CC6.1", "ISO 27001 A.9.2.3", "NIST SP 800-53 IA-5"]
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

## Enforcement

**Enforcement point:** `ci-gate` — caught at a CI gate. Because it is required and centrally gated, this rule **blocks** the PR/release.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## References

Maps to: SOC2 CC6.1, ISO 27001 A.9.2.3, NIST SP 800-53 IA-5.

## Exceptions

None by default. A committed secret is an incident: rotate it, then purge if feasible. Phase 2 adds
an admin-granted exception path for narrowly scoped, reviewed cases.

# Guidance catalog

The neutral source of truth: one markdown file per rule, classified by `domain × severity`. Format is
defined in [`../docs/GUIDANCE-SCHEMA.md`](../docs/GUIDANCE-SCHEMA.md).

> **Stage 2 — seed guidance.** These items are illustrative samples that exercise every domain and all
> three severities, so reviewers can see the taxonomy in practice. They are not yet an authoritative
> standard set.

## Items

| id | Title | Domain | Severity |
|---|---|---|---|
| [`sec-no-plaintext-secrets`](security-compliance/no-plaintext-secrets.md) | Never commit plaintext secrets to source control | Security & Compliance | **Policy** |
| [`arch-approved-runtime-baselines`](architecture-tech-stack/approved-runtime-baselines.md) | Build on approved language and runtime baselines | Architecture & Tech Stack | **Strategic** |
| [`cicd-required-checks-before-merge`](delivery-ci-cd/required-checks-before-merge.md) | Gate every merge on required CI checks | Delivery & CI/CD | **Strategic** |
| [`obs-logs-to-approved-sink`](observability-data/logs-to-approved-sink.md) | Emit logs and telemetry to an approved sink | Observability & Data | **Strategic** |
| [`qual-regression-test-for-bugfix`](quality-testing/regression-test-for-bugfix.md) | Add a regression test with every bug fix | Quality & Testing | Handbook |
| [`integ-pin-third-party-actions`](integrations-tooling/pin-third-party-actions.md) | Pin third-party CI actions and dependencies by digest | Integrations & Tooling | Handbook |
| [`env-shared-formatter-config`](developer-environment/shared-formatter-config.md) | Use the shared formatter and linter configuration | Developer Environment | Handbook |

**Coverage:** 7 domains · Policy ×1, Strategic ×3, Handbook ×3.

# Guidance catalog

The neutral source of truth: one markdown file per rule, classified by `domain × severity`. Format is
defined in [`../docs/GUIDANCE-SCHEMA.md`](../docs/GUIDANCE-SCHEMA.md).

> **Stage 2 — authoring real guidance, domain by domain.** Architecture & Tech Stack now holds real
> rules. The remaining domains still carry a single illustrative sample each (marked below) until we
> author them.

## Architecture & Tech Stack

| id | Title | Severity |
|---|---|---|
| [`arch-api-first-design`](architecture-tech-stack/api-first-design.md) | Design the API contract first | Handbook |
| [`arch-approved-compute-platform`](architecture-tech-stack/approved-compute-platform.md) | Prefer AWS and serverless; Docker when needed | Handbook |
| [`arch-approved-app-stack`](architecture-tech-stack/approved-app-stack.md) | Build on approved frontend and API stacks | Handbook |
| [`arch-no-unapproved-stack`](architecture-tech-stack/no-unapproved-stack.md) | No frontend frameworks or API languages outside the approved set | **Strategic** |
| [`arch-approved-datastores`](architecture-tech-stack/approved-datastores.md) | Prefer Postgres, file/document storage, or no database | Handbook |
| [`arch-no-local-sql-databases`](architecture-tech-stack/no-local-sql-databases.md) | No SQLite or local/embedded SQL databases | **Strategic** |
| [`arch-api-versioning`](architecture-tech-stack/api-versioning.md) | Version APIs and preserve backward compatibility | Handbook |
| [`arch-diagrams-in-repo`](architecture-tech-stack/diagrams-in-repo.md) | Keep architecture diagrams in the codebase | Handbook |
| [`arch-adrs`](architecture-tech-stack/adrs.md) | Record significant decisions as ADRs | Handbook |
| [`arch-service-boundaries`](architecture-tech-stack/service-boundaries.md) | Cross boundaries through APIs, not shared databases | Handbook |
| [`arch-infrastructure-as-code`](architecture-tech-stack/infrastructure-as-code.md) | Provision infrastructure as code with Terraform | Handbook |

## Other domains (illustrative sample — not yet authored)

| id | Title | Domain | Severity |
|---|---|---|---|
| [`sec-no-plaintext-secrets`](security-compliance/no-plaintext-secrets.md) | Never commit plaintext secrets to source control | Security & Compliance | **Policy** |
| [`cicd-required-checks-before-merge`](delivery-ci-cd/required-checks-before-merge.md) | Gate every merge on required CI checks | Delivery & CI/CD | **Strategic** |
| [`obs-logs-to-approved-sink`](observability-data/logs-to-approved-sink.md) | Emit logs and telemetry to an approved sink | Observability & Data | **Strategic** |
| [`qual-regression-test-for-bugfix`](quality-testing/regression-test-for-bugfix.md) | Add a regression test with every bug fix | Quality & Testing | Handbook |
| [`integ-pin-third-party-actions`](integrations-tooling/pin-third-party-actions.md) | Pin third-party CI actions and dependencies by digest | Integrations & Tooling | Handbook |
| [`env-shared-formatter-config`](developer-environment/shared-formatter-config.md) | Use the shared formatter and linter configuration | Developer Environment | Handbook |

## Parked for later domains

- **Mermaid** as the diagramming tool → **Integrations & Tooling** (severity TBD).
- **Notion** as the knowledge base → **Integrations & Tooling** (likely Handbook — can't be
  mechanically blocked).

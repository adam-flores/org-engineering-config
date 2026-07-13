# Guidance catalog

The neutral source of truth: one markdown file per rule, classified by `domain × severity`. Format is
defined in [`../docs/GUIDANCE-SCHEMA.md`](../docs/GUIDANCE-SCHEMA.md).

> **Stage 2 — authoring real guidance, domain by domain.** Architecture & Tech Stack, Security &
> Compliance, Delivery & CI/CD, Quality & Testing, and Observability & Data now hold real rules. The
> remaining domains still carry a single illustrative sample each (marked below) until we author them.

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
| [`arch-infrastructure-as-code`](architecture-tech-stack/infrastructure-as-code.md) | Provision infrastructure as code with Terraform | **Strategic** |

## Security & Compliance

| id | Title | Severity |
|---|---|---|
| [`sec-no-plaintext-secrets`](security-compliance/no-plaintext-secrets.md) | Never commit plaintext secrets to source control | **Policy** |
| [`sec-remote-vulnerability-scanning`](security-compliance/remote-vulnerability-scanning.md) | Block merges on unresolved vulnerabilities above Low (GHAS) | **Strategic** |
| [`sec-approved-package-sources`](security-compliance/approved-package-sources.md) | Install packages only from approved, reputable registries | **Strategic** |
| [`sec-local-vulnerability-scanning`](security-compliance/local-vulnerability-scanning.md) | Scan for vulnerabilities locally before pushing | Handbook |

## Delivery & CI/CD

| id | Title | Severity |
|---|---|---|
| [`cicd-required-checks-before-merge`](delivery-ci-cd/required-checks-before-merge.md) | Gate every merge on required CI checks | **Strategic** |
| [`cicd-required-peer-review`](delivery-ci-cd/required-peer-review.md) | Require an approving peer review before merge | **Strategic** |
| [`cicd-github-flow-branching`](delivery-ci-cd/github-flow-branching.md) | Follow GitHub Flow for branching | **Strategic** |
| [`cicd-semver-release-tags`](delivery-ci-cd/semver-release-tags.md) | Tag releases with a semantic version | **Strategic** |
| [`cicd-deploy-via-pipeline`](delivery-ci-cd/deploy-via-pipeline.md) | Deploy through the pipeline, not by hand | **Strategic** |
| [`cicd-decompose-work`](delivery-ci-cd/decompose-work.md) | Decompose work into small, independently branched pieces | Handbook |
| [`cicd-small-changesets`](delivery-ci-cd/small-changesets.md) | Prefer small commits and pull requests | Handbook |
| [`cicd-safe-rollback`](delivery-ci-cd/safe-rollback.md) | Every release must have a safe rollback path | Handbook |
| [`cicd-post-deploy-validation`](delivery-ci-cd/post-deploy-validation.md) | Validate deployments after release | Handbook |
| [`cicd-delete-merged-branches`](delivery-ci-cd/delete-merged-branches.md) | Delete branches after they merge | Handbook |

## Quality & Testing

| id | Title | Severity |
|---|---|---|
| [`qual-unit-test-coverage`](quality-testing/unit-test-coverage.md) | Meet the unit-test coverage bar on new code (80% + no regression) | **Strategic** |
| [`qual-ui-automated-testing`](quality-testing/ui-automated-testing.md) | UI development must have automated tests | **Strategic** |
| [`qual-no-skipped-tests`](quality-testing/no-skipped-tests.md) | No skipped, disabled, or focused tests merged | **Strategic** |
| [`qual-accessibility-checks`](quality-testing/accessibility-checks.md) | UI must pass automated accessibility checks | **Strategic** |
| [`qual-regression-test-for-bugfix`](quality-testing/regression-test-for-bugfix.md) | Add a regression test with every bug fix | Handbook |
| [`qual-deterministic-tests`](quality-testing/deterministic-tests.md) | Tests must be deterministic and isolated | Handbook |

## Observability & Data

All Handbook — for the pilot, none of these have an enforcement system to block against yet (see each
rule's Exceptions).

| id | Title | Severity |
|---|---|---|
| [`obs-logs-to-approved-sink`](observability-data/logs-to-approved-sink.md) | Emit logs and telemetry to an approved sink | Handbook |
| [`obs-structured-logging`](observability-data/structured-logging.md) | Emit structured logs with consistent fields | Handbook |
| [`obs-correlation-ids`](observability-data/correlation-ids.md) | Propagate correlation IDs across services | Handbook |
| [`obs-health-readiness-endpoints`](observability-data/health-readiness-endpoints.md) | Expose health and readiness endpoints | Handbook |
| [`obs-no-pii-in-logs`](observability-data/no-pii-in-logs.md) | Keep secrets and PII out of logs and telemetry | Handbook |
| [`obs-telemetry-retention`](observability-data/telemetry-retention.md) | Define retention windows for telemetry | Handbook |
| [`obs-analytics-event-schema`](observability-data/analytics-event-schema.md) | Follow an agreed schema for analytics events | Handbook |
| [`obs-data-classification`](observability-data/data-classification.md) | Classify data and handle it by its class | Handbook |

## Other domains (illustrative sample — not yet authored)

| id | Title | Domain | Severity |
|---|---|---|---|
| [`integ-pin-third-party-actions`](integrations-tooling/pin-third-party-actions.md) | Pin third-party CI actions and dependencies by digest | Integrations & Tooling | Handbook |
| [`env-shared-formatter-config`](developer-environment/shared-formatter-config.md) | Use the shared formatter and linter configuration | Developer Environment | Handbook |

## Parked for later domains

- **Mermaid** as the diagramming tool → **Integrations & Tooling** (severity TBD).
- **Notion** as the knowledge base → **Integrations & Tooling** (likely Handbook — can't be
  mechanically blocked).
- **Playwright** as the UI testing tool → **Integrations & Tooling** (referenced by
  [`qual-ui-automated-testing`](quality-testing/ui-automated-testing.md)).

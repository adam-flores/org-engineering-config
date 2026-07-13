# Guidance catalog

The neutral source of truth: one markdown file per rule, classified by
`domain × severity × enforcement`. Format is defined in
[`../docs/GUIDANCE-SCHEMA.md`](../docs/GUIDANCE-SCHEMA.md); how to propose or change a rule is in
[`../CONTRIBUTING.md`](../CONTRIBUTING.md).

**53 rules across 7 domains.** Severity: 2 Policy · 15 Strategic · 36 Handbook. Enforcement: 20
`central` · 5 `local` · 12 `retroactive` · 16 `none`. **A rule blocks only when it is required
(Policy/Strategic) *and* `central`.**

## Architecture & Tech Stack

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`arch-infrastructure-as-code`](architecture-tech-stack/infrastructure-as-code.md) | Provision infrastructure as code with Terraform | **Strategic** | `central` |
| [`arch-no-local-sql-databases`](architecture-tech-stack/no-local-sql-databases.md) | No SQLite or local/embedded SQL databases | **Strategic** | `central` |
| [`arch-no-unapproved-stack`](architecture-tech-stack/no-unapproved-stack.md) | No frontend frameworks or API languages outside the approved set | **Strategic** | `central` |
| [`arch-adrs`](architecture-tech-stack/adrs.md) | Record significant decisions as ADRs | Handbook | `retroactive` |
| [`arch-api-first-design`](architecture-tech-stack/api-first-design.md) | Design the API contract first | Handbook | `none` |
| [`arch-api-versioning`](architecture-tech-stack/api-versioning.md) | Version APIs and preserve backward compatibility | Handbook | `none` |
| [`arch-approved-app-stack`](architecture-tech-stack/approved-app-stack.md) | Build on approved frontend and API stacks | Handbook | `none` |
| [`arch-approved-compute-platform`](architecture-tech-stack/approved-compute-platform.md) | Prefer AWS and serverless; containerize with Docker when needed | Handbook | `none` |
| [`arch-approved-datastores`](architecture-tech-stack/approved-datastores.md) | Prefer Postgres, file/document storage, or no database | Handbook | `none` |
| [`arch-diagrams-in-repo`](architecture-tech-stack/diagrams-in-repo.md) | Keep architecture diagrams in the codebase | Handbook | `retroactive` |
| [`arch-service-boundaries`](architecture-tech-stack/service-boundaries.md) | Cross service boundaries through APIs, not shared databases | Handbook | `none` |

## Security & Compliance

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`sec-no-plaintext-secrets`](security-compliance/no-plaintext-secrets.md) | Never commit plaintext secrets to source control | **Policy** | `central` |
| [`sec-approved-package-sources`](security-compliance/approved-package-sources.md) | Install packages only from approved, reputable registries | **Strategic** | `central` |
| [`sec-remote-vulnerability-scanning`](security-compliance/remote-vulnerability-scanning.md) | Block merges on unresolved vulnerabilities above Low | **Strategic** | `central` |
| [`sec-local-vulnerability-scanning`](security-compliance/local-vulnerability-scanning.md) | Scan for vulnerabilities locally before pushing | Handbook | `local` |

## Delivery & CI/CD

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`cicd-deploy-via-pipeline`](delivery-ci-cd/deploy-via-pipeline.md) | Deploy through the pipeline, not by hand | **Strategic** | `central` |
| [`cicd-github-flow-branching`](delivery-ci-cd/github-flow-branching.md) | Follow GitHub Flow for branching | **Strategic** | `central` |
| [`cicd-required-checks-before-merge`](delivery-ci-cd/required-checks-before-merge.md) | Gate every merge on required CI checks | **Strategic** | `central` |
| [`cicd-required-peer-review`](delivery-ci-cd/required-peer-review.md) | Require an approving peer review before merge | **Strategic** | `central` |
| [`cicd-semver-release-tags`](delivery-ci-cd/semver-release-tags.md) | Tag releases with a semantic version | **Strategic** | `central` |
| [`cicd-decompose-work`](delivery-ci-cd/decompose-work.md) | Decompose work into small, independently branched pieces | Handbook | `none` |
| [`cicd-delete-merged-branches`](delivery-ci-cd/delete-merged-branches.md) | Delete branches after they merge | Handbook | `central` |
| [`cicd-post-deploy-validation`](delivery-ci-cd/post-deploy-validation.md) | Validate deployments after release | Handbook | `retroactive` |
| [`cicd-safe-rollback`](delivery-ci-cd/safe-rollback.md) | Every release must have a safe rollback path | Handbook | `none` |
| [`cicd-small-changesets`](delivery-ci-cd/small-changesets.md) | Prefer small commits and pull requests | Handbook | `central` |

## Quality & Testing

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`qual-accessibility-checks`](quality-testing/accessibility-checks.md) | UI must pass automated accessibility checks | **Strategic** | `central` |
| [`qual-no-skipped-tests`](quality-testing/no-skipped-tests.md) | No skipped, disabled, or focused tests merged | **Strategic** | `central` |
| [`qual-ui-automated-testing`](quality-testing/ui-automated-testing.md) | UI development must have automated tests | **Strategic** | `central` |
| [`qual-unit-test-coverage`](quality-testing/unit-test-coverage.md) | Meet the unit-test coverage bar on new code | **Strategic** | `central` |
| [`qual-deterministic-tests`](quality-testing/deterministic-tests.md) | Tests must be deterministic and isolated | Handbook | `retroactive` |
| [`qual-regression-test-for-bugfix`](quality-testing/regression-test-for-bugfix.md) | Add a regression test with every bug fix | Handbook | `none` |

## Observability & Data

All rules here are `Handbook` severity; enforcement ranges from `retroactive` to `none` — none has a
central gate in the pilot.

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`obs-analytics-event-schema`](observability-data/analytics-event-schema.md) | Follow an agreed schema for analytics events | Handbook | `none` |
| [`obs-correlation-ids`](observability-data/correlation-ids.md) | Propagate correlation IDs across services | Handbook | `none` |
| [`obs-data-classification`](observability-data/data-classification.md) | Classify data and handle it by its class | Handbook | `retroactive` |
| [`obs-health-readiness-endpoints`](observability-data/health-readiness-endpoints.md) | Expose health and readiness endpoints | Handbook | `retroactive` |
| [`obs-logs-to-approved-sink`](observability-data/logs-to-approved-sink.md) | Emit logs and telemetry to an approved sink | Handbook | `retroactive` |
| [`obs-no-pii-in-logs`](observability-data/no-pii-in-logs.md) | Keep secrets and PII out of logs and telemetry | Handbook | `retroactive` |
| [`obs-structured-logging`](observability-data/structured-logging.md) | Emit structured logs with consistent fields | Handbook | `retroactive` |
| [`obs-telemetry-retention`](observability-data/telemetry-retention.md) | Define retention windows for telemetry | Handbook | `retroactive` |

## Integrations & Tooling

Package registries are governed by
[`sec-approved-package-sources`](security-compliance/approved-package-sources.md) in Security &
Compliance (kept there to avoid duplication).

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`integ-denylist-tools`](integrations-tooling/denylist-tools.md) | Prohibited tools must not be used | **Policy** | `central` |
| [`integ-dependency-licenses`](integrations-tooling/dependency-licenses.md) | Third-party dependencies must use allowed licenses | **Strategic** | `central` |
| [`integ-ai-usage-guardrails`](integrations-tooling/ai-usage-guardrails.md) | Use only approved AI tools with company code | Handbook | `none` |
| [`integ-approved-tools`](integrations-tooling/approved-tools.md) | Use the approved tool for each capability | Handbook | `none` |
| [`integ-new-tool-approval`](integrations-tooling/new-tool-approval.md) | Route new tools through the approval path | Handbook | `none` |
| [`integ-pin-third-party-actions`](integrations-tooling/pin-third-party-actions.md) | Pin third-party CI actions and dependencies by digest | Handbook | `central` |
| [`integ-tool-telemetry-off`](integrations-tooling/tool-telemetry-off.md) | Disable tool telemetry and usage tracking | Handbook | `none` |

## Developer Environment

All `Handbook`; enforcement is `local` or `retroactive` — developer-side, none centrally gated.

| id | Title | Severity | Enforcement |
|---|---|---|---|
| [`env-gitignore-local-settings`](developer-environment/gitignore-local-settings.md) | Don't commit local environment settings | Handbook | `local` |
| [`env-local-secrets-handling`](developer-environment/local-secrets-handling.md) | Handle local secrets safely | Handbook | `local` |
| [`env-pinned-tool-versions`](developer-environment/pinned-tool-versions.md) | Pin local runtime and tool versions | Handbook | `retroactive` |
| [`env-pre-commit-hooks`](developer-environment/pre-commit-hooks.md) | Provide standard pre-commit hooks | Handbook | `local` |
| [`env-preferred-editors`](developer-environment/preferred-editors.md) | Prefer VS Code or the terminal as the editor | Handbook | `none` |
| [`env-reproducible-setup`](developer-environment/reproducible-setup.md) | Make local setup reproducible | Handbook | `retroactive` |
| [`env-shared-formatter-config`](developer-environment/shared-formatter-config.md) | Use the shared formatter and linter configuration | Handbook | `local` |

# Guidance catalog (sample rule-set)

> **Sample content — a proof-of-concept rule-set, not enacted policy.** These rules demonstrate the
> neutral-source *format* and exercise the mechanism end-to-end; they are **not** an organization's
> adopted standards. A real org replaces this catalog with its own authored rules. The **product** is
> the mechanism (schema + taxonomy + adapters), not any particular rule below.

One markdown file per rule, classified by `domain × severity × enforcement_point × agent_action`.
Format is defined in [`../docs/GUIDANCE-SCHEMA.md`](../docs/GUIDANCE-SCHEMA.md); how to propose or change
a rule is in [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

This sample carries **53 rules across 7 domains.**
Severity: 2 Policy · 20 Strategic · 31 Handbook.
Enforcement point: 20 `ci-gate` · 5 `pre-commit` · 12 `audit` · 15 `human-review` · 1 `none`.
Agent action: 18 `enforce` · 28 `align` · 7 `aware`.

**A rule blocks only when it is required (Policy/Strategic) *and* its `enforcement_point` is
`ci-gate` or `managed-platform`** — so **17 rules block**; the remaining 36 warn, catch late, or rely
on people. Several of those are *required-but-unenforceable* (`Strategic` + `human-review`/`audit`).
The `agent_action` column tells an AI coding agent its own role: `enforce` (fix it as you write),
`align` (comply; the gate is elsewhere), or `aware` (surface it; you can't self-satisfy it).

## Architecture & Tech Stack

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`arch-infrastructure-as-code`](architecture-tech-stack/infrastructure-as-code.md) | Provision infrastructure as code with Terraform | **Strategic** | `ci-gate` | `align` |
| [`arch-no-local-sql-databases`](architecture-tech-stack/no-local-sql-databases.md) | No SQLite or local/embedded SQL databases | **Strategic** | `ci-gate` | `enforce` |
| [`arch-no-unapproved-stack`](architecture-tech-stack/no-unapproved-stack.md) | No frontend frameworks or API languages outside the approved set | **Strategic** | `ci-gate` | `enforce` |
| [`arch-adrs`](architecture-tech-stack/adrs.md) | Record significant decisions as ADRs | Handbook | `audit` | `align` |
| [`arch-api-first-design`](architecture-tech-stack/api-first-design.md) | Design the API contract first | Handbook | `human-review` | `align` |
| [`arch-api-versioning`](architecture-tech-stack/api-versioning.md) | Version APIs and preserve backward compatibility | Handbook | `human-review` | `align` |
| [`arch-approved-app-stack`](architecture-tech-stack/approved-app-stack.md) | Build on approved frontend and API stacks | Handbook | `human-review` | `align` |
| [`arch-approved-compute-platform`](architecture-tech-stack/approved-compute-platform.md) | Prefer AWS and serverless; containerize with Docker when needed | Handbook | `human-review` | `align` |
| [`arch-approved-datastores`](architecture-tech-stack/approved-datastores.md) | Prefer Postgres, file/document storage, or no database | Handbook | `human-review` | `align` |
| [`arch-diagrams-in-repo`](architecture-tech-stack/diagrams-in-repo.md) | Keep architecture diagrams in the codebase | Handbook | `audit` | `align` |
| [`arch-service-boundaries`](architecture-tech-stack/service-boundaries.md) | Cross service boundaries through APIs, not shared databases | Handbook | `human-review` | `align` |

## Security & Compliance

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`sec-no-plaintext-secrets`](security-compliance/no-plaintext-secrets.md) | Never commit plaintext secrets to source control | **Policy** | `ci-gate` | `enforce` |
| [`sec-approved-package-sources`](security-compliance/approved-package-sources.md) | Install packages only from approved, reputable registries | **Strategic** | `ci-gate` | `enforce` |
| [`sec-remote-vulnerability-scanning`](security-compliance/remote-vulnerability-scanning.md) | Block merges on unresolved vulnerabilities above Low | **Strategic** | `ci-gate` | `align` |
| [`sec-local-vulnerability-scanning`](security-compliance/local-vulnerability-scanning.md) | Scan for vulnerabilities locally before pushing | Handbook | `pre-commit` | `align` |

## Delivery & CI/CD

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`cicd-deploy-via-pipeline`](delivery-ci-cd/deploy-via-pipeline.md) | Deploy through the pipeline, not by hand | **Strategic** | `ci-gate` | `align` |
| [`cicd-github-flow-branching`](delivery-ci-cd/github-flow-branching.md) | Follow GitHub Flow for branching | **Strategic** | `ci-gate` | `align` |
| [`cicd-required-checks-before-merge`](delivery-ci-cd/required-checks-before-merge.md) | Gate every merge on required CI checks | **Strategic** | `ci-gate` | `aware` |
| [`cicd-required-peer-review`](delivery-ci-cd/required-peer-review.md) | Require an approving peer review before merge | **Strategic** | `ci-gate` | `aware` |
| [`cicd-semver-release-tags`](delivery-ci-cd/semver-release-tags.md) | Tag releases with a semantic version | **Strategic** | `ci-gate` | `align` |
| [`cicd-decompose-work`](delivery-ci-cd/decompose-work.md) | Decompose work into small, independently branched pieces | Handbook | `human-review` | `align` |
| [`cicd-delete-merged-branches`](delivery-ci-cd/delete-merged-branches.md) | Delete branches after they merge | Handbook | `ci-gate` | `align` |
| [`cicd-post-deploy-validation`](delivery-ci-cd/post-deploy-validation.md) | Validate deployments after release | Handbook | `audit` | `aware` |
| [`cicd-safe-rollback`](delivery-ci-cd/safe-rollback.md) | Every release must have a safe rollback path | Handbook | `human-review` | `align` |
| [`cicd-small-changesets`](delivery-ci-cd/small-changesets.md) | Prefer small commits and pull requests | Handbook | `ci-gate` | `align` |

## Quality & Testing

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`qual-accessibility-checks`](quality-testing/accessibility-checks.md) | UI must pass automated accessibility checks | **Strategic** | `ci-gate` | `enforce` |
| [`qual-no-skipped-tests`](quality-testing/no-skipped-tests.md) | No skipped, disabled, or focused tests merged | **Strategic** | `ci-gate` | `enforce` |
| [`qual-ui-automated-testing`](quality-testing/ui-automated-testing.md) | UI development must have automated tests | **Strategic** | `ci-gate` | `enforce` |
| [`qual-unit-test-coverage`](quality-testing/unit-test-coverage.md) | Meet the unit-test coverage bar on new code | **Strategic** | `ci-gate` | `enforce` |
| [`qual-deterministic-tests`](quality-testing/deterministic-tests.md) | Tests must be deterministic and isolated | Handbook | `audit` | `enforce` |
| [`qual-regression-test-for-bugfix`](quality-testing/regression-test-for-bugfix.md) | Add a regression test with every bug fix | Handbook | `human-review` | `enforce` |

## Observability & Data

Three rules here are required (`Strategic`) but their `enforcement_point` is `audit` — a scan after
the fact, not a gate; the rest are `Handbook`. Nothing here has a CI gate in the pilot, so **nothing
here blocks** — the required ones are honestly *required-but-unenforceable*.

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`obs-data-classification`](observability-data/data-classification.md) | Classify data and handle it by its class | **Strategic** | `audit` | `aware` |
| [`obs-no-pii-in-logs`](observability-data/no-pii-in-logs.md) | Keep secrets and PII out of logs and telemetry | **Strategic** | `audit` | `enforce` |
| [`obs-telemetry-retention`](observability-data/telemetry-retention.md) | Define retention windows for telemetry | **Strategic** | `audit` | `aware` |
| [`obs-analytics-event-schema`](observability-data/analytics-event-schema.md) | Follow an agreed schema for analytics events | Handbook | `human-review` | `align` |
| [`obs-correlation-ids`](observability-data/correlation-ids.md) | Propagate correlation IDs across services | Handbook | `human-review` | `align` |
| [`obs-health-readiness-endpoints`](observability-data/health-readiness-endpoints.md) | Expose health and readiness endpoints | Handbook | `audit` | `align` |
| [`obs-logs-to-approved-sink`](observability-data/logs-to-approved-sink.md) | Emit logs and telemetry to an approved sink | Handbook | `audit` | `align` |
| [`obs-structured-logging`](observability-data/structured-logging.md) | Emit structured logs with consistent fields | Handbook | `audit` | `enforce` |

## Integrations & Tooling

Package registries are governed by
[`sec-approved-package-sources`](security-compliance/approved-package-sources.md) in Security &
Compliance (kept there to avoid duplication).

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`integ-denylist-tools`](integrations-tooling/denylist-tools.md) | Prohibited tools must not be used | **Policy** | `ci-gate` | `enforce` |
| [`integ-ai-usage-guardrails`](integrations-tooling/ai-usage-guardrails.md) | Use only approved AI tools with company code | **Strategic** | `human-review` | `align` |
| [`integ-dependency-licenses`](integrations-tooling/dependency-licenses.md) | Third-party dependencies must use allowed licenses | **Strategic** | `ci-gate` | `align` |
| [`integ-tool-telemetry-off`](integrations-tooling/tool-telemetry-off.md) | Disable tool telemetry and usage tracking | **Strategic** | `human-review` | `enforce` |
| [`integ-approved-tools`](integrations-tooling/approved-tools.md) | Use the approved tool for each capability | Handbook | `human-review` | `align` |
| [`integ-new-tool-approval`](integrations-tooling/new-tool-approval.md) | Route new tools through the approval path | Handbook | `human-review` | `aware` |
| [`integ-pin-third-party-actions`](integrations-tooling/pin-third-party-actions.md) | Pin third-party CI actions and dependencies by digest | Handbook | `ci-gate` | `enforce` |

## Developer Environment

All `Handbook`; `enforcement_point` is `pre-commit`, `audit`, or `none` — developer-side, nothing
centrally gated, so **nothing here blocks**.

| id | Title | Severity | Enforcement point | Agent action |
|---|---|---|---|---|
| [`env-gitignore-local-settings`](developer-environment/gitignore-local-settings.md) | Don't commit local environment settings | Handbook | `pre-commit` | `enforce` |
| [`env-local-secrets-handling`](developer-environment/local-secrets-handling.md) | Handle local secrets safely | Handbook | `pre-commit` | `enforce` |
| [`env-pinned-tool-versions`](developer-environment/pinned-tool-versions.md) | Pin local runtime and tool versions | Handbook | `audit` | `align` |
| [`env-pre-commit-hooks`](developer-environment/pre-commit-hooks.md) | Provide standard pre-commit hooks | Handbook | `pre-commit` | `align` |
| [`env-preferred-editors`](developer-environment/preferred-editors.md) | Prefer VS Code or the terminal as the editor | Handbook | `none` | `aware` |
| [`env-reproducible-setup`](developer-environment/reproducible-setup.md) | Make local setup reproducible | Handbook | `audit` | `align` |
| [`env-shared-formatter-config`](developer-environment/shared-formatter-config.md) | Use the shared formatter and linter configuration | Handbook | `pre-commit` | `enforce` |

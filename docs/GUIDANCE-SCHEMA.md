# Guidance item schema

> **Stage 2.** Defines the neutral source format every guidance item follows. This is the *core* of
> the repo — tool-agnostic markdown + metadata. Adapters (Stage 2, later) render items from this
> format into each tool's native packaging; nothing here is tool-specific.

## What a guidance item is

One rule = one markdown file with **YAML frontmatter** (the machine-readable metadata) followed by
**markdown body** (the human-readable rule and its rationale). The frontmatter carries the
`domain × severity` taxonomy; the body carries the prose.

Items live under [`../guidance/`](../guidance/), one folder per domain:

```
guidance/
  security-compliance/
  architecture-tech-stack/
  quality-testing/
  delivery-ci-cd/
  observability-data/
  integrations-tooling/
  developer-environment/
```

## Frontmatter fields

| Field | Required | Type | Notes |
|---|---|---|---|
| `id` | yes | string | Stable, unique, kebab-case, domain-prefixed (see below). Never reused or renumbered. |
| `title` | yes | string | Short imperative statement of the rule. |
| `domain` | yes | enum | Exactly one canonical domain name (see table). |
| `severity` | yes | enum | One of `Policy`, `Strategic`, `Handbook`. |
| `status` | yes | enum | `active` or `deprecated`. Defaults to `active`. |
| `since` | yes | semver | Version in which the item was introduced. Seed items are `0.1.0`. |
| `tags` | no | list | Optional free-form labels for search/grouping. |

`id` is the contract. It's what a pin references and what the freshness gate diffs against, so it
**must not change** once merged. If a rule is retired, set `status: deprecated` rather than deleting
the file.

## Domains, slugs, and id prefixes

| Domain (canonical `domain` value) | Folder slug | `id` prefix |
|---|---|---|
| Security & Compliance | `security-compliance` | `sec-` |
| Architecture & Tech Stack | `architecture-tech-stack` | `arch-` |
| Quality & Testing | `quality-testing` | `qual-` |
| Delivery & CI/CD | `delivery-ci-cd` | `cicd-` |
| Observability & Data | `observability-data` | `obs-` |
| Integrations & Tooling | `integrations-tooling` | `integ-` |
| Developer Environment | `developer-environment` | `env-` |

Example: `sec-no-plaintext-secrets` lives at
`guidance/security-compliance/no-plaintext-secrets.md`.

## Body convention

The body is plain markdown. Use these sections so items read consistently (convention, not yet
machine-enforced):

- **Rule** — the normative statement. For `Policy`/`Strategic`, phrase it as a hard requirement
  ("must"/"must not"); for `Handbook`, as a recommendation ("prefer"/"should").
- **Rationale** — why the rule exists.
- **Scope** — where it applies (and where it doesn't).
- **Exceptions** — how a legitimate deviation is handled. True non-overridability plus an
  admin-granted exception path is Phase 2; for now this documents intent.

## Template

```markdown
---
id: sec-example-rule
title: One-line imperative statement
domain: Security & Compliance
severity: Policy
status: active
since: 0.1.0
tags: [secrets]
---

## Rule

<the normative statement>

## Rationale

<why it exists>

## Scope

<where it applies>

## Exceptions

<how a legitimate deviation is handled — Phase 2 enforces this>
```

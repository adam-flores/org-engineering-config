# Guidance item schema

> **Stage 3.** Defines the neutral source format every guidance item follows. This is the *core* of
> the repo — tool-agnostic markdown + metadata. Adapters (later) render items from this format into
> each tool's native packaging; nothing here is tool-specific.

## What a guidance item is

One rule = one markdown file with **YAML frontmatter** (the machine-readable metadata) followed by
**markdown body** (the human-readable rule and its rationale). The frontmatter carries the
`domain × severity × enforcement` taxonomy; the body carries the prose.

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
| `severity` | yes | enum | One of `Policy`, `Strategic`, `Handbook`. How authoritative — see below. |
| `enforcement` | yes | enum | One of `local`, `central`, `retroactive`, `none`. Where/how it's made to stick — see below. |
| `status` | yes | enum | `active` or `deprecated`. Defaults to `active`. |
| `since` | yes | semver | Version in which the item was introduced. Seed items are `0.1.0`. |
| `tags` | no | list | Optional free-form labels for search/grouping. |

`id` is the contract. It's what a pin references and what the freshness gate diffs against, so it
**must not change** once merged. If a rule is retired, set `status: deprecated` rather than deleting
the file.

## Severity — how authoritative a rule is

Severity says whether a rule is *required* or *recommended* — **not** whether it blocks (that's
enforcement).

| Severity | Meaning | Required? |
|---|---|---|
| `Policy` | An external/regulatory or compliance control | Required |
| `Strategic` | An internally-mandated enterprise practice | Required |
| `Handbook` | A recommended pattern, default, or style | Recommended |

## Enforcement — where/how a rule is made to stick

Enforcement is a separate axis from severity. A rule may only claim `local`, `central`, or
`retroactive` if that enforcement genuinely exists or is realistically achievable; if none of them
can, it is honestly `none`.

| Enforcement | Meaning |
|---|---|
| `local` | Enforced on the developer's machine (pre-commit hook, local scan). Real, but bypassable. |
| `central` | Enforced at the remote/CI gate. This is the only value that can hard-block a PR or release. |
| `retroactive` | Caught after the fact — automated audit, periodic scan. Detects violations; doesn't prevent them at a gate. |
| `none` | Can't be enforced by any of the above. Relies on review and culture. |

**Does a rule block?** Only when it is **required (`Policy`/`Strategic`) *and* `central`.** Everything
else warns, catches late, or relies on people:

- `Strategic` + `central` → blocks the PR/release.
- `Handbook` + `central` → runs in CI but only warns.
- `Strategic` + `none` → **required but unenforceable** — authoritative, but held up by review and
  culture, not a gate. This state is deliberately expressible; don't launder it into `Handbook`.
- `Handbook` + `local`/`none` → the ordinary advisory case.

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
- **Exceptions** — how a legitimate deviation is handled, and — importantly — a plain statement of the
  rule's `enforcement`: what actually catches a violation (`central` gate, `local` hook, `retroactive`
  audit) or an honest admission that nothing does (`none`). Don't imply a block the enforcement value
  can't back up.

## Template

```markdown
---
id: sec-example-rule
title: One-line imperative statement
domain: Security & Compliance
severity: Policy
enforcement: central
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

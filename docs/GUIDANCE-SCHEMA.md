# Guidance item schema

> **Stage 3.** Defines the neutral source format every guidance item follows. This is the *core* of
> the repo — tool-agnostic markdown + metadata. Adapters (see [`../adapters/`](../adapters/)) render
> items from this format into each tool's native packaging; nothing here is tool-specific.

## What a guidance item is

One rule = one markdown file with **YAML frontmatter** (the machine-readable metadata) followed by
**markdown body** (the human-readable rule and its rationale). The frontmatter carries the
`domain × severity × enforcement_point × agent_action` taxonomy; the body carries the prose.

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
| `severity` | yes | enum | One of `Policy`, `Strategic`, `Handbook`. How *authoritative* — see below. |
| `enforcement_point` | yes | enum | *Where/who* catches a violation. See below. |
| `agent_action` | yes | enum | What an AI **coding agent** should do about the rule: `enforce`, `align`, or `aware`. See below. |
| `references` | conditional | list | External control IDs the rule maps to. **Required when `severity: Policy`**; optional for `Strategic`; omit for `Handbook`. |
| `status` | yes | enum | `active` or `deprecated`. Defaults to `active`. |
| `since` | yes | semver | Version in which the item was introduced. Seed items are `0.1.0`. |
| `tags` | no | list | Optional free-form labels for search/grouping. |

`id` is the contract. It's what a pin references and what the freshness gate diffs against, so it
**must not change** once merged. If a rule is retired, set `status: deprecated` rather than deleting
the file.

## The three axes

A rule is placed on three independent axes. **Severity** and **enforcement_point** together decide
whether it blocks; **agent_action** tells a coding agent its own role. Keeping them separate is the
point — we never claim a block we can't back up, and an agent always knows whether *it* is the line
of defense or merely aligning to a gate elsewhere.

### Severity — how authoritative a rule is

Severity says whether a rule is *required* or *recommended* — **not** whether it blocks.

| Severity | Meaning | Required? |
|---|---|---|
| `Policy` | An external/regulatory or compliance control | Required |
| `Strategic` | An internally-mandated enterprise practice | Required |
| `Handbook` | A recommended pattern, default, or style | Recommended |

### Enforcement point — where/who catches a violation

The *authoritative locus* that actually catches a break. A rule may only claim a stronger point if
that enforcement genuinely exists or is realistically achievable; if nothing catches it, be honest.

| `enforcement_point` | Where the violation is caught |
|---|---|
| `coding-agent` | The AI coding agent is the primary line — it applies the rule as it writes. Real but not a hard gate. |
| `pre-commit` | A pre-commit hook or local scan on the developer's machine. Real, but bypassable. |
| `ci-gate` | A remote/CI check. One of the two points that can **hard-block** a PR or release. |
| `managed-platform` | Org-managed, non-overridable settings (the Phase-2 managed tier). Also hard-blocks. |
| `human-review` | A human reviewer's judgment at PR time. Detects, doesn't mechanically gate. |
| `audit` | A retroactive/periodic scan. Catches violations after the fact. |
| `none` | Nothing catches it mechanically; it rides on culture. |

### Agent action — what a coding agent should do

The axis that makes the guidance legible to an AI coding agent working in a repo. It answers: is
*this agent* responsible for the rule, or is the rule enforced elsewhere and the agent just aligns to
it?

| `agent_action` | What the coding agent does |
|---|---|
| `enforce` | Actively prevent and fix violations as it writes code (e.g. never emit a plaintext secret, add a regression test with a bug fix, always structure logs). |
| `align` | Shape its output to comply, knowing the real gate is elsewhere (e.g. use the approved stack, follow the branching model). The agent complies but isn't the enforcer. |
| `aware` | It cannot self-satisfy the rule; it must not undermine it and should surface it (e.g. a required peer review, a data-classification audit, a retention window). |

## Does a rule block?

**Only when it is required (`Policy`/`Strategic`) *and* its `enforcement_point` is `ci-gate` or
`managed-platform`.** Everything else warns, catches late, or relies on people:

- `Strategic` + `ci-gate` → **blocks** the PR/release.
- `Handbook` + `ci-gate` → runs in CI but only **warns**.
- `Strategic` + `human-review`/`audit`/`none` → **required but unenforceable** — authoritative, but
  held up by review and culture, not a gate. This state is deliberately expressible; don't launder it
  into `Handbook`, and don't overstate its teeth.
- `agent_action` never changes whether a rule blocks — it only tells the coding agent its role.

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

## References — traceability for Policy

A `Policy` rule exists because of an external driver (regulation, compliance, licensing). The
`references` field names *which* control it maps to, so everyone can trace the rule back to its
source. Use whatever identifier the org's auditors recognize:

```yaml
references: ["SOC2 CC6.1", "ISO 27001 A.9.2.3"]   # external frameworks
references: ["ORG-SEC-014"]                          # or an internal control register
```

Required for `Policy`. Optional for `Strategic` (use it when an internal mandate has a named control).
Omit for `Handbook`.

## Body convention

The body is plain markdown. Use these sections so items read consistently (convention, not yet
machine-enforced):

- **Rule** — the normative statement. For `Policy`/`Strategic`, phrase it as a hard requirement
  ("must"/"must not"); for `Handbook`, as a recommendation ("prefer"/"should").
- **Rationale** — why the rule exists.
- **Scope** — where it applies (and where it doesn't).
- **Enforcement** — a plain statement of the `enforcement_point` (what actually catches a violation —
  a `ci-gate`, a `pre-commit` hook, an `audit`, or an honest admission of `human-review`/`none`) and
  the `agent_action` (whether a coding agent enforces, aligns to, or is merely aware of it). Don't
  imply a block the enforcement point can't back up.
- **References** (Policy only) — the control IDs from the `references` field, spelled out.
- **Exceptions** — how a legitimate deviation is handled.

## Template

```markdown
---
id: sec-example-rule
title: One-line imperative statement
domain: Security & Compliance
severity: Policy
enforcement_point: ci-gate
agent_action: enforce
references: ["SOC2 CC6.1"]
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

## Enforcement

Caught at <enforcement_point>. A coding agent should <enforce | align to | stay aware of> this.

## References

<control IDs — Policy only>

## Exceptions

<how a legitimate deviation is handled — Phase 2 enforces this>
```

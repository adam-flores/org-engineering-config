# Contributing guidance

This repo is a **contributable source of truth for engineering standards**. Anyone can propose a new
rule or a change to an existing one; once merged and promoted, it becomes everyone's default. This
guide is how you do that.

If your proposal doesn't already classify itself, **apply the framework below** — every rule must land
on all four axes. A proposal that just says "we should do X" isn't done until it's been placed as a
`domain × severity × enforcement_point × agent_action`.

## The classification framework

Every rule is one `domain × severity × enforcement_point × agent_action` placement plus its prose.
Work through the axes in order. (Full definitions live in
[`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md).)

### 1. Domain — what is the rule *about*?

Pick exactly one. Classify by subject, not by which team owns it (there is deliberately no "DevOps"
domain — pipeline rules go to Delivery & CI/CD, monitoring to Observability & Data, and so on).

Security & Compliance · Architecture & Tech Stack · Quality & Testing · Delivery & CI/CD ·
Observability & Data · Integrations & Tooling · Developer Environment

### 2. Severity — how authoritative is it?

This axis is *only* about required vs recommended — **not** whether it blocks.

- **Policy** — a required control with an *external* driver (regulation, compliance, legal, licensing).
- **Strategic** — a required *internal* enterprise mandate.
- **Handbook** — a recommended pattern, default, or style.

Reserve **Policy** for genuinely external/regulatory obligations; a firm internal decision is
**Strategic**. A `Policy` rule **must** carry a `references` list naming the control it maps to (see
step 5).

### 3. Enforcement point — where is a violation actually caught?

Pick the strongest that honestly applies. You may only choose a mechanical point if that enforcement
really exists or is realistically achievable. If nothing catches it, the honest answer is
`human-review` or `none`.

- **coding-agent** — the AI coding agent is the primary line. Real, but not a hard gate.
- **pre-commit** — a pre-commit hook or local scan. Real, but bypassable.
- **ci-gate** — a remote/CI gate. One of the two points that can hard-block a PR or release.
- **managed-platform** — org-managed, non-overridable settings (the Phase-2 managed tier). Also hard-blocks.
- **human-review** — a human reviewer catches it at PR time. Detects, doesn't mechanically gate.
- **audit** — a retroactive/periodic scan catches it after the fact.
- **none** — nothing catches it mechanically; it rides on culture.

### 4. Agent action — what should a coding agent do about it?

This is what makes a rule legible to an AI coding agent working in a repo. Ask: is *the agent*
responsible, or is the rule enforced elsewhere and the agent just aligns to it?

- **enforce** — the agent actively prevents/fixes violations as it writes code.
- **align** — the agent shapes its output to comply, but the real gate is elsewhere.
- **aware** — the agent can't self-satisfy the rule; it must not undermine it and should surface it.

> **The one rule to remember:** a rule blocks **only** when it is *required* (`Policy`/`Strategic`)
> **and** its `enforcement_point` is `ci-gate` or `managed-platform`. So a firm mandate we can't yet
> gate is `Strategic` + `human-review`/`none` — **"required but unenforceable"** — not a `Handbook`
> suggestion. Don't downgrade severity just because enforcement is weak; that's what the enforcement
> and agent-action axes are for.

### 5. References — where does a Policy come from? (Policy required)

If the rule is `Policy`, add a `references` list naming the external control it maps to — a framework
ID (`SOC2 CC6.1`, `ISO 27001 A.9.2.3`) or an internal control register entry (`ORG-SEC-014`). This
gives everyone traceability from the rule back to its authority. Optional for `Strategic` when a
named control exists; omit for `Handbook`.

## Adding or changing a rule

1. **One idea per pull request.** Keep the diff small and reviewable.
2. **Create the file** under `guidance/<domain-slug>/<short-name>.md`, using the template and
   frontmatter in [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md). The `id` is
   `<prefix>-<short-name>` (e.g. `sec-no-plaintext-secrets`) and is a permanent contract — **never
   rename or renumber it** once merged; to retire a rule, set `status: deprecated`.
3. **Write the body** — Rule, Rationale, Scope, Enforcement, References (Policy only), Exceptions. In
   Enforcement, state plainly what catches the rule (or admit `none`) and what a coding agent does
   about it; don't imply a block the enforcement point can't back up.
4. **Update the catalog index** ([`guidance/README.md`](guidance/README.md)) so the new rule is listed.
5. **Open the PR.** Explain the change in one or two sentences and name the `(domain, severity,
   enforcement_point, agent_action)` you chose and why — especially any `ci-gate`/`managed-platform`
   claim (what gate?) or a `Strategic` + `human-review`/`none` (why it's required despite being
   unenforceable). For a `Policy` rule, cite its `references`.

## Changing an existing rule

- **Wording, scope, rationale** — edit in place; the `id` stays.
- **Severity, enforcement_point, or agent_action** — allowed, but call it out prominently in the PR;
  the first two change how the rule *behaves* for every consumer, and the third changes what coding
  agents do.
- **Moving domains** — note that the `id` prefix encodes the domain, so a move changes the `id`. This
  is a known rough edge; flag it in the PR so reviewers can weigh the cost.

## What we optimize for

Clear, honest, reviewable rules. A rule that overstates its teeth ("this blocks!" when nothing gates
it) is worse than one that admits `enforcement_point: none`. When in doubt, be precise about what
actually happens when someone breaks the rule — and about whether the coding agent or a gate
elsewhere is the thing holding the line.

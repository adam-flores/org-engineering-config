# Contributing guidance

This repo is a **contributable source of truth for engineering standards**. Anyone can propose a new
rule or a change to an existing one; once merged and promoted, it becomes everyone's default. This
guide is how you do that.

If your proposal doesn't already classify itself, **apply the framework below** — every rule must land
with a domain, a severity, and an enforcement value. A proposal that just says "we should do X"
isn't done until it's been placed on all three axes.

## The classification framework

Every rule is one `domain × severity × enforcement` triple plus its prose. Work through the three
axes in order. (Full definitions live in [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md).)

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
**Strategic**.

### 3. Enforcement — how is it actually made to stick?

Pick the strongest that honestly applies. **You may only choose `local`, `central`, or `retroactive`
if that enforcement really exists or is realistically achievable.** If nothing can catch a violation,
the honest answer is `none`.

- **local** — a pre-commit hook or local scan. Real, but bypassable.
- **central** — a remote/CI gate. The *only* value that can hard-block a PR or release.
- **retroactive** — an audit or periodic scan that catches violations after the fact.
- **none** — nothing catches it; it rides on review and culture.

> **The one rule to remember:** a rule blocks **only** when it is *required* (`Policy`/`Strategic`)
> **and** `central`. So a firm mandate we can't yet gate is `Strategic` + `none` — **"required but
> unenforceable"** — not a `Handbook` suggestion. Don't downgrade severity just because enforcement is
> weak; that's what the enforcement axis is for.

## Adding or changing a rule

1. **One idea per pull request.** Keep the diff small and reviewable.
2. **Create the file** under `guidance/<domain-slug>/<short-name>.md`, using the template and
   frontmatter in [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md). The `id` is
   `<prefix>-<short-name>` (e.g. `sec-no-plaintext-secrets`) and is a permanent contract — **never
   rename or renumber it** once merged; to retire a rule, set `status: deprecated`.
3. **Write the body** — Rule, Rationale, Scope, Exceptions. In Exceptions, state plainly what enforces
   the rule (or admit `none`); don't imply a block the enforcement value can't back up.
4. **Update the catalog index** ([`guidance/README.md`](guidance/README.md)) so the new rule is listed.
5. **Open the PR.** Explain the change in one or two sentences and name the `(domain, severity,
   enforcement)` you chose and why — especially any `central` claim (what gate?) or a `Strategic` +
   `none` (why it's required despite being unenforceable).

## Changing an existing rule

- **Wording, scope, rationale** — edit in place; the `id` stays.
- **Severity or enforcement** — allowed, but call it out prominently in the PR; these change how the
  rule behaves for every consumer.
- **Moving domains** — note that the `id` prefix encodes the domain, so a move changes the `id`. This
  is a known rough edge; flag it in the PR so reviewers can weigh the cost.

## What we optimize for

Clear, honest, reviewable rules. A rule that overstates its teeth ("this blocks!" when nothing gates
it) is worse than one that admits `enforcement: none`. When in doubt, be precise about what actually
happens when someone breaks the rule.

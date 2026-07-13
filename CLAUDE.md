# CLAUDE.md

How to work in this repo. Read this before proposing changes.

## What this repo is

`org-engineering-config` is a **tool-agnostic, versioned, contributable source of truth for
engineering standards**. Guidance lives as neutral markdown + metadata; tool-specific packaging
(e.g. Claude Code) is produced by **adapters**. Individuals **pull** current guidance into their
projects and **contribute** improvements back via pull request.

Key docs: [`README.md`](README.md) (elevator pitch + the core idea), [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md)
(the guidance-item format), [`CONTRIBUTING.md`](CONTRIBUTING.md) (how to propose or change a rule),
and the guidance catalog at [`guidance/README.md`](guidance/README.md).

## Current stage

**Stage 3 — polishing the design against what authoring taught us.** Stages 1–2 are done: the design,
the guidance-item schema, and real guidance authored across all seven domains (53 rules). Stage 3
refines the model — the `enforcement` axis is the first change. Still **not** built: the Claude Code
adapter and CI workflows (freshness gate, promotion, bump bot). Guidance content and the design/schema
docs are in scope; **executable tooling (adapters, scripts, CI workflows) is not** — if a change would
introduce it, stop and confirm the stage first.

## Conventions

### Documentation is the product (for now)

- The deliverable is prose and metadata: clear, reviewable guidance. Optimize every change for a
  reviewer reading top-to-bottom.
- Keep the README as the **index and summary** and the guidance catalog
  ([`guidance/README.md`](guidance/README.md)) as the rule index; detail lives in each rule file and
  in `docs/`. If any two of them disagree, that's a bug — fix it in the same change.
- Prefer plain markdown. Tables for taxonomies. No build steps.

### Terminology (use these exact terms)

- **Domain**: what a rule is *about* (Security & Compliance, Architecture & Tech Stack, Quality &
  Testing, Delivery & CI/CD, Observability & Data, Integrations & Tooling, Developer Environment).
- **Severity**: one of `Policy`, `Strategic`, `Handbook` — how *authoritative* a rule is. Policy and
  Strategic are **required**; Handbook is **recommended**. Severity alone does **not** decide blocking.
- **Enforcement**: one of `local`, `central`, `retroactive`, `none` — where/how a rule is made to
  stick. **A rule blocks only when it is required *and* `central`.** `Strategic` + `none` means
  "required but unenforceable" — say that honestly rather than demoting it to Handbook.
- **Neutral source** vs **adapter** vs **build target**: the source is tool-agnostic; adapters render
  it into a tool's format; the AI-tool integration is a build target, not the core.
- **Pin / freshness gate / bump bot**: the lockfile-style governance model (pinned version + CI
  currency check + scheduled bump PRs).

### Making changes

- One idea per pull request. Keep diffs small and self-explanatory.
- Every rule is a `domain × severity × enforcement` triple — see [`CONTRIBUTING.md`](CONTRIBUTING.md)
  for the classification framework and [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md) for the format.
- When you change the design, update every place it's described (README summary, the schema, the
  affected rules, the catalog index) so the repo never contradicts itself.
- Don't overstate a rule's teeth: never imply a block the `enforcement` value can't back up.
- Write in the second person for reviewer-facing prose, present tense for how the system behaves.
- Mark future work explicitly (Stage 3 / Phase 2); don't reference tooling that doesn't exist yet as
  though it does.

### What not to do

- No adapters, workflows, or scripts yet — build tooling is later work, not this stage.
- No tool-specific assumptions leaking into the neutral source. Guidance items describe *what* is
  required, never *which tool* enforces it.
- No silent local overrides of org guidance — org guidance is authoritative by design.

## Review focus

We are actively seeking feedback on: the **severity × enforcement** split (does separating *"required"*
from *"how it's enforced"* hold up?), the domain list, the pinned + CI-enforced currency tradeoff, and
whether neutral-core + adapters is worth the indirection. See the "What we're asking reviewers" section
of the README.

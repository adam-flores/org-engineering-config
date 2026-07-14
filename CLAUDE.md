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

**Stage 3 — the design polish is landing, and we're crossing into Phase-2 build.** Stages 1–2 are done
(the design, the guidance-item schema, and real guidance across all seven domains). Stage 3's headline
change is complete: enforcement is now **two axes** — `enforcement_point` (*where* a violation is
caught: `coding-agent`/`pre-commit`/`ci-gate`/`managed-platform`/`human-review`/`audit`/`none`) and
`agent_action` (*what a coding agent does*: `enforce`/`align`/`aware`). Severity still means *how
authoritative* (required vs recommended). A rule blocks only when it is required **and** its
`enforcement_point` is `ci-gate`/`managed-platform`. `Policy` rules now carry a `references` list
mapping them to an external control.

Per the approved plan (`~/.claude/plans/let-s-build-out-a-golden-iverson.md`), the next steps cross
into **Phase-2 build work**: a Claude Code **adapter** (`adapters/claude-code/`) that renders the
neutral guidance into a reviewer skill + agent, then two `examples/` apps + a test matrix, then a
How-To-Use adoption guide. That work introduces **executable tooling** — authorized by the current
plan, kept under `adapters/`/`examples/`, and never leaking tool assumptions into the neutral source.

## Where we left off (2026-07-13)

Current catalog: **53 rules** across 7 domains — 2 Policy · 20 Strategic · 31 Handbook. Enforcement
point: 20 `ci-gate` · 5 `pre-commit` · 12 `audit` · 15 `human-review` · 1 `none`. Agent action: 18
`enforce` · 28 `align` · 7 `aware`. **17 rules block** (required + `ci-gate`).

Resolved in the model-redesign change:
- The two-field enforcement model (`enforcement_point` + `agent_action`) and `references` for Policy.
- The **denylist** open thread — [`integ-denylist-tools`](guidance/integrations-tooling/denylist-tools.md)
  now points at control register `ORG-SEC-021` as the canonical "DO NOT USE" home.
- A consistency read-through of all 53 rules against the new model.

Still open / next:
- **`integ-tool-telemetry-off` placement** — straddles Integrations & Tooling vs Security & Compliance;
  pick its final home.
- **Phase B** — the Claude Code adapter: validate frontmatter + render the `standards-review` skill and
  `standards-enforcer` agent from `guidance/`.
- **Phase C** — two `examples/` apps (conforming + violating) + the test matrix.
- **Phase D (gated on A–C passing)** — `docs/HOW-TO-USE.md` adoption guide with mermaid visuals.

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
- **Enforcement point**: one of `coding-agent`, `pre-commit`, `ci-gate`, `managed-platform`,
  `human-review`, `audit`, `none` — *where* a violation is caught. Only `ci-gate`/`managed-platform`
  can hard-block. **A rule blocks only when it is required *and* its `enforcement_point` is
  `ci-gate`/`managed-platform`.** `Strategic` + `human-review`/`audit` means "required but
  unenforceable" — say that honestly rather than demoting it to Handbook.
- **Agent action**: one of `enforce`, `align`, `aware` — what an AI **coding agent** should do about
  the rule (fix it as you write / comply, the gate is elsewhere / surface it, you can't self-satisfy).
- **References**: `Policy` rules carry a `references` list of control IDs mapping them to their
  external driver (e.g. `SOC2 CC6.1`).
- **Neutral source** vs **adapter** vs **build target**: the source is tool-agnostic; adapters render
  it into a tool's format; the AI-tool integration is a build target, not the core.
- **Pin / freshness gate / bump bot**: the lockfile-style governance model (pinned version + CI
  currency check + scheduled bump PRs).

### Making changes

- One idea per pull request. Keep diffs small and self-explanatory.
- Every rule is a `domain × severity × enforcement_point × agent_action` placement — see
  [`CONTRIBUTING.md`](CONTRIBUTING.md) for the classification framework and
  [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md) for the format.
- When you change the design, update every place it's described (README summary, the schema, the
  affected rules, the catalog index) so the repo never contradicts itself.
- Don't overstate a rule's teeth: never imply a block the `enforcement_point` can't back up.
- Write in the second person for reviewer-facing prose, present tense for how the system behaves.
- Mark future work explicitly (Phase B/C/D); don't reference tooling that doesn't exist yet as
  though it does.

### What not to do

- Build tooling (adapter, sample apps, CI) is authorized Phase-2 work — keep it under
  `adapters/`/`examples/`, never inside `guidance/`. The neutral source stays markdown + metadata.
- No tool-specific assumptions leaking into the neutral source. Guidance items describe *what* is
  required, never *which tool* enforces it.
- No silent local overrides of org guidance — org guidance is authoritative by design.

## Review focus

We are actively seeking feedback on: the **severity × enforcement_point × agent_action** split (does
separating *"required"* from *"where it's caught"* from *"what the coding agent does"* hold up?), the
domain list, the pinned + CI-enforced currency tradeoff, and whether neutral-core + adapters is worth
the indirection. See the "What we're asking reviewers" section of the README.

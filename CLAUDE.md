# CLAUDE.md

How to work in this repo. Read this before proposing changes.

## What this repo is

`org-engineering-config` is a **tool-agnostic, versioned, contributable mechanism for engineering
standards**. Guidance lives as neutral markdown + metadata; tool-specific packaging (e.g. Claude Code)
is produced by **adapters**. Individuals **pull** current guidance into their projects and
**contribute** improvements back via pull request.

**Product vs. sample — keep this straight.** The *product* is the mechanism: the guidance-item schema,
the four-axis taxonomy, the governance model, and the adapters. The 53 rules under `guidance/` are a
**proof-of-concept sample** that exercises the mechanism, **not** enacted org policy. Don't treat the
rule-set as the deliverable; treat it as test material we can add to, re-severity, or remove to prove
the pipeline. (Roadmap: once validated, the sample migrates into a separate enacted-standards repo and
this repo keeps only a light skeleton — see "Current state.")

Key docs: [`README.md`](README.md) (elevator pitch + the core idea), [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md)
(the guidance-item format), [`CONTRIBUTING.md`](CONTRIBUTING.md) (how to propose or change a rule),
and the guidance catalog at [`guidance/README.md`](guidance/README.md).

## Current state

**The mechanism works end-to-end; governance has no teeth yet.** In place: the guidance-item schema, a
sample rule-set across all seven domains, the Claude Code adapter (`adapters/claude-code/`) that renders
the neutral source into a reviewer skill + agent, two `examples/` apps plus the `python-only` demo, and
the `docs/HOW-TO-USE.md` adoption guide. Not built: the CI workflows (freshness gate, promotion, bump
bot) that make "pinned + current" enforceable, and the managed-platform tier. Keep that distinction
honest in prose — the README's "What's left" is the canonical list.

Enforcement is **two axes**: `enforcement_point` (*where* a violation is caught:
`coding-agent`/`pre-commit`/`ci-gate`/`managed-platform`/`human-review`/`audit`/`none`) and
`agent_action` (*what a coding agent does*: `enforce`/`align`/`aware`). Severity means *how
authoritative* (required vs recommended). A rule blocks only when it is required **and** its
`enforcement_point` is `ci-gate`/`managed-platform`. `Policy` rules carry a `references` list mapping
them to an external control.

Executable tooling is authorized, but it stays under `adapters/`/`examples/` and never leaks tool
assumptions into the neutral source.

**Next: the four-repo split** — per the approved plan
(`~/.claude/plans/org-standards-app-lexical-brooks.md`), this repo becomes pure mechanism while the
53-rule sample, the demo, and a consumer app move to their own repos. See "Deferred redesign" below.

## Where we left off (2026-07-14)

Sample catalog: **53 rules** across 7 domains — 2 Policy · 20 Strategic · 31 Handbook. Enforcement
point: 20 `ci-gate` · 5 `pre-commit` · 12 `audit` · 15 `human-review` · 1 `none`. Agent action: 18
`enforce` · 28 `align` · 7 `aware`. **17 rules block** (required + `ci-gate`). (These are the sample's
composition — test material, not enacted policy.)

**Deferred redesign (roadmap, not built yet).** Once the mechanism is validated, split the three
concerns into three repos: (1) this repo keeps only the mechanism + a light, axis-complete skeleton
sample; (2) a **template repository** an org instantiates to author its own enacted standards (the
current 53-rule sample migrates here — which is why we don't trim or delete it now); (3) a **consumer
app** outside that repo that pulls the enacted standards. Until then, everything stays in one repo so
the mechanism is legible while we prove it.

Resolved in the model-redesign change:
- The two-field enforcement model (`enforcement_point` + `agent_action`) and `references` for Policy.
- The **denylist** open thread — [`integ-denylist-tools`](guidance/integrations-tooling/denylist-tools.md)
  now points at control register `ORG-SEC-021` as the canonical "DO NOT USE" home.
- A consistency read-through of all 53 rules against the new model.

Still open / next:
- **The four-repo split** — the deferred redesign above, now approved and in progress.
- **`integ-tool-telemetry-off` placement** — straddles Integrations & Tooling vs Security & Compliance;
  pick its final home.
- **The CI workflows** — freshness gate, promotion, bump bot. Until these exist, the pinned + current
  governance model is designed but unenforced; don't describe it as though it runs.

## Conventions

### The mechanism is the product; prose is how we express it (for now)

- The product is the **mechanism** (schema, taxonomy, governance model, adapters). While we prove it,
  that mechanism — and the sample rule-set that exercises it — is expressed as prose and metadata:
  clear, reviewable markdown. Optimize every change for a reviewer reading top-to-bottom.
- Keep the README as the **index and summary** and the guidance catalog
  ([`guidance/README.md`](guidance/README.md)) as the **sample** rule index; detail lives in each rule
  file and in `docs/`. If any two of them disagree, that's a bug — fix it in the same change.
- Prefer plain markdown. Tables for taxonomies. No build steps in the neutral source.

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
- Mark future work explicitly; don't reference tooling that doesn't exist yet as though it does.

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

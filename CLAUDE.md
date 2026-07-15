# CLAUDE.md

How to work in this repo. Read this before proposing changes.

## What this repo is

`org-engineering-config` is a **tool-agnostic, versioned, contributable mechanism for engineering
standards**. Guidance lives as neutral markdown + metadata; tool-specific packaging (e.g. Claude Code)
is produced by **adapters**. Individuals **pull** current guidance into their projects and
**contribute** improvements back via pull request.

**Product vs. sample — keep this straight.** The *product* is the mechanism: the guidance-item schema,
the four-axis taxonomy, the governance model, and the adapters. **This repo holds no org's standards.**
The only rules here are the 4 under [`examples/guidance/`](examples/guidance/) — a fixture that gives
the adapter something to render, chosen for axis coverage. They are not a catalog, and nothing should
grow them into one; a full worked example lives in the sample repo (see "The four repos").

Key docs: [`README.md`](README.md) (elevator pitch + the core idea), [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md)
(the guidance-item format), and [`CONTRIBUTING.md`](CONTRIBUTING.md) (how to propose or change a rule).

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

## The four repos

The split is **done**. This repo is the mechanism; the rules and the apps live elsewhere. Content moved
out — don't re-add it here:

| Repo | Holds | Note |
|---|---|---|
| **this one** | Schema, taxonomy, governance model, adapters, `examples/guidance/` (4 illustrative rules) | No catalog. The 4 rules are a **fixture**, not standards |
| `sample-org-engineering-config` | The 53-rule sample as an org's enacted standards | Rules only; renders via this repo's adapter |
| `demo-org-engineering-config` | The "Python only" demo: 2 rules + both apps + rendered reviewers | Self-contained |
| `sample-consumer-app` | A working Node app with planted violations | Ships **unwired** on purpose (no `.claude/`) — the reader hooks it up |

All four are public under `adam-flores`. Cross-repo rendering is by **relative path to a sibling
clone**; a real deployment would vendor or pin the adapter, which is the deferred distribution layer.

**`--source` is effectively required.** The adapter reads `<source>/guidance/`, and this repo has none
at its root. It exits `2` when the source is missing or empty rather than rendering an empty catalog
over a consumer's `rules.md` — that failure mode shipped a reviewer that passed everything, so don't
reintroduce a silent default.

## Still open / next

- **The CI workflows** — freshness gate, promotion, bump bot. Until these exist, the pinned + current
  governance model is designed but unenforced; don't describe it as though it runs.
- **`integ-tool-telemetry-off` placement** — straddles Integrations & Tooling vs Security & Compliance;
  pick its final home. Lives in the sample repo now.
- **Distribution** — vendoring/pinning the adapter, so consumers stop reaching across the filesystem.

## Conventions

### The mechanism is the product; prose is how we express it (for now)

- The product is the **mechanism** (schema, taxonomy, governance model, adapters). While we prove it,
  that mechanism is expressed as prose and metadata: clear, reviewable markdown. Optimize every change
  for a reviewer reading top-to-bottom.
- Keep the README as the **index and summary**; detail lives in `docs/` and in each adapter's README.
  If any two of them disagree, that's a bug — fix it in the same change. That now spans repos: a claim
  here about the sample, the demo, or the consumer app must match what those repos actually do.
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

- Build tooling stays under `adapters/`; a guidance source stays markdown + metadata, never code.
- **Don't grow `examples/guidance/` into a catalog.** It's a 4-rule fixture for axis coverage. New
  rules belong in a standards repo, not here — re-merging the two is the thing this split undid.
- No tool-specific assumptions leaking into the neutral source. Guidance items describe *what* is
  required, never *which tool* enforces it.
- No silent local overrides of org guidance — org guidance is authoritative by design.
- Don't give the adapter a default `--source`. It exits `2` on a missing or empty source on purpose:
  silently rendering an empty catalog leaves a reviewer that passes everything.

## Review focus

We are actively seeking feedback on: the **severity × enforcement_point × agent_action** split (does
separating *"required"* from *"where it's caught"* from *"what the coding agent does"* hold up?), the
domain list, the pinned + CI-enforced currency tradeoff, and whether neutral-core + adapters is worth
the indirection. See the "What we're asking reviewers" section of the README.

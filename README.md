# org-engineering-config

> **Status: Stage 2 — scaffolding the neutral source.** The design (Stage 1) is in place and now has a
> concrete guidance-item format plus seed sample guidance. Adapters and CI workflows are still staged
> (see below). Feedback on both the design and the emerging source format is welcome.

A **tool-agnostic, versioned, contributable source of truth for engineering standards** — the way an
organization scales any shared standard. Individuals **pull** current guidance into their projects and
**contribute** improvements back via pull request. Once promoted, an improvement becomes everyone's default.

## The core idea

1. **Neutral source of truth.** Guidance lives as plain markdown + metadata, tied to *no* particular AI
   tool or model. Tool-specific packaging (Claude Code today, others later) is produced by **adapters** that
   render the neutral source into each tool's format. The AI-tool integration is a *build target*, not the core.

2. **Three-axis taxonomy.** Every guidance item is classified by `domain × severity × enforcement`.
   Severity says how *authoritative* a rule is; enforcement says how it's *made to stick* — kept
   separate so we never claim a block we can't back up.

   | Severity | Meaning | Required? |
   |---|---|---|
   | **Policy** | An external/regulatory or compliance control | Required |
   | **Strategic** | An internally-mandated enterprise practice | Required |
   | **Handbook** | A recommended pattern, default, or style | Recommended |

   | Enforcement | How it's made to stick |
   |---|---|
   | **local** | On the dev's machine (pre-commit, local scan) — bypassable |
   | **central** | At the remote/CI gate — the only value that can hard-block |
   | **retroactive** | Caught after the fact by audit/scan — detects, doesn't prevent |
   | **none** | Can't be enforced; relies on review and culture |

   **A rule blocks only when it is required *and* `central`.** That lets *"required but unenforceable"*
   (`Strategic` + `none`) be stated honestly instead of demoted to `Handbook`.

   **Domains** (what a rule is *about*): Security & Compliance · Architecture & Tech Stack · Quality &
   Testing · Delivery & CI/CD · Observability & Data · Integrations & Tooling · Developer Environment.

3. **Governance = pinned + a CI freshness gate** (the lockfile pattern). Projects **pin** a version so
   nothing breaks mid-work and behavior is reproducible/auditable. A CI check at pull-request time enforces
   *currency* against the promoted `stable` release:
   - Behind on a **Policy** or **Strategic** item → the check **fails the PR**.
   - Behind on a **Handbook** item → the check **warns** but doesn't block.
   - A **grace window** prevents a same-day update from instantly blocking an in-flight PR.
   - A scheduled bot opens "bump" PRs so drift is surfaced proactively, not discovered mid-work.

4. **No silent local override.** Org guidance is authoritative. True non-overridability (plus an
   admin-granted exception / sandbox path) is a later phase built on tool-level managed settings.

## What we're asking reviewers

- Does the **severity × enforcement** split hold up — is separating *"required"* from *"how it's
  enforced"* (so `Strategic` + `none` can mean "required but unenforceable") the right model?
- Is the **domain list** right — anything missing, over-split, or mis-named?
- Is **pinned + CI-enforced currency** the right governance tradeoff versus always-latest or hard-pinned?
- Is the **neutral-core + adapters** separation worth the indirection, or over-engineered for now?

## Repository contents (today)

- [`CLAUDE.md`](CLAUDE.md) — how to work in this repo (project overview, conventions, current stage).
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to propose or change a rule, using the classification framework.
- [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md) — the neutral guidance-item format (frontmatter + body).
- [`guidance/`](guidance/) — the guidance catalog: real rules across all seven domains ([index](guidance/README.md)).

## Staged rollout

- **Stage 1 — done:** the design + conventions, for peer review.
- **Stage 2 — done:** the neutral guidance-item schema and real guidance authored across all seven domains.
- **Stage 3 — now:** polishing the design in light of what authoring taught us — the `enforcement`
  dimension is the first change. Still ahead: the Claude Code adapter and the GitHub Actions (freshness
  gate, promotion, bump bot).
- **Phase 2 — later:** the non-overridable managed-settings enforcement tier and live-fire validation
  (two prototype apps + a policy that intentionally breaks one, to prove the gate blocks in anger).

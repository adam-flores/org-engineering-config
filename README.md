# org-engineering-config

> **Status: design review.** This repo currently contains only the design and working conventions.
> No build components exist yet — they're intentionally staged (see below). Feedback on the design is
> exactly what we're looking for right now.

A **tool-agnostic, versioned, contributable source of truth for engineering standards** — the way an
organization scales any shared standard. Individuals **pull** current guidance into their projects and
**contribute** improvements back via pull request. Once promoted, an improvement becomes everyone's default.

## The core idea

1. **Neutral source of truth.** Guidance lives as plain markdown + metadata, tied to *no* particular AI
   tool or model. Tool-specific packaging (Claude Code today, others later) is produced by **adapters** that
   render the neutral source into each tool's format. The AI-tool integration is a *build target*, not the core.

2. **Two-axis taxonomy.** Every guidance item is classified by `domain × severity`:

   | Severity | Meaning | Enforcement |
   |---|---|---|
   | **Policy** | A control, compliance, or regulatory rule | **Blocks** (hard stop) |
   | **Strategic** | A required enterprise practice (e.g. log to an approved sink) | **Blocks** (hard stop) |
   | **Handbook** | A recommended pattern, default, or style | **Warns / annotates** |

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

- Does the **severity model** (Policy / Strategic / Handbook, two of three blocking) match how you'd want
  standards enforced?
- Is the **domain list** right — anything missing, over-split, or mis-named?
- Is **pinned + CI-enforced currency** the right governance tradeoff versus always-latest or hard-pinned?
- Is the **neutral-core + adapters** separation worth the indirection, or over-engineered for now?

## Repository contents (today)

- [`CLAUDE.md`](CLAUDE.md) — how to work in this repo (project overview + conventions).
- [`docs/PLAN.md`](docs/PLAN.md) — the full design and staged implementation plan.

## Staged rollout

- **Stage 1 — now:** this design + conventions, for peer review. *No build components.*
- **Stage 2 — on go-ahead:** the taxonomy definition, seed guidance, the Claude Code adapter, and the
  GitHub Actions (freshness gate, promotion, bump bot).
- **Phase 2 — later:** the non-overridable managed-settings enforcement tier and live-fire validation
  (two prototype apps + a policy that intentionally breaks one, to prove the gate blocks in anger).

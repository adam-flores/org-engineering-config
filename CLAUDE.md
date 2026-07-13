# CLAUDE.md

How to work in this repo. Read this before proposing changes.

## What this repo is

`org-engineering-config` is a **tool-agnostic, versioned, contributable source of truth for
engineering standards**. Guidance lives as neutral markdown + metadata; tool-specific packaging
(e.g. Claude Code) is produced by **adapters**. Individuals **pull** current guidance into their
projects and **contribute** improvements back via pull request.

See [`README.md`](README.md) for the elevator pitch and [`docs/PLAN.md`](docs/PLAN.md) for the full
design and staged implementation plan.

## Current stage

**Stage 2 — scaffolding the neutral source.** The Stage 1 design is in place. This stage adds the
guidance-item format ([`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md)) and seed sample guidance
under [`guidance/`](guidance/). Still **not** built in this stage: adapters and CI workflows. Guidance
items and their schema are in scope now; **executable tooling (adapters, scripts, CI workflows) is
not** — if a change would introduce it, stop and confirm the stage first.

## Conventions

### Documentation is the product (for now)

- The deliverable in this stage is prose: clear, reviewable design. Optimize every change for a
  reviewer reading top-to-bottom.
- Keep the README as the **index and summary**. Detail belongs in `docs/`. If the README and a doc
  disagree, that's a bug — fix it in the same change.
- Prefer plain markdown. Tables for taxonomies. No build steps, no generated files.

### Terminology (use these exact terms)

- **Severity**: one of `Policy`, `Strategic`, `Handbook`. Policy and Strategic **block**; Handbook
  **warns**. Don't invent synonyms.
- **Domain**: what a rule is *about* (Security & Compliance, Architecture & Tech Stack, Quality &
  Testing, Delivery & CI/CD, Observability & Data, Integrations & Tooling, Developer Environment).
- **Neutral source** vs **adapter** vs **build target**: the source is tool-agnostic; adapters render
  it into a tool's format; the AI-tool integration is a build target, not the core.
- **Pin / freshness gate / bump bot**: the lockfile-style governance model (pinned version + CI
  currency check + scheduled bump PRs).

### Making changes

- One idea per pull request. Keep diffs small and self-explanatory.
- When you change the design, update every place it's described (README summary + the relevant
  `docs/` section) so the repo never contradicts itself.
- Write in the second person for reviewer-facing prose ("you pin a version"), present tense for how
  the system behaves.
- Don't reference files, tools, or workflows that don't exist yet as though they do. Mark future work
  explicitly as Stage 2 / Phase 2.

### What not to do

- No adapters, workflows, or scripts yet — those are later-Stage-2 build work, not this increment.
- No tool-specific assumptions leaking into the neutral source (the whole point is neutrality).
  Guidance items describe *what* is required, never *which tool* enforces it.
- No silent local overrides of org guidance in the design — org guidance is authoritative by design.

## Review focus

We are actively seeking feedback on: the severity model, the domain list, the pinned + CI-enforced
currency tradeoff, and whether neutral-core + adapters is worth the indirection. See the "What we're
asking reviewers" section of the README.

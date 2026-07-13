# Design & Staged Implementation Plan

> **Stage 2 — scaffolding the neutral source.** This document is the full design behind
> [`README.md`](../README.md). The Stage 1 design is settled; Stage 2 makes the neutral source
> concrete — see the guidance-item format in [`GUIDANCE-SCHEMA.md`](GUIDANCE-SCHEMA.md) and seed items
> under [`../guidance/`](../guidance/). Adapters and CI are still ahead. Feedback on the design and the
> emerging source format is what we want.

## 1. Problem

Engineering standards in most organizations are scattered, stale, and unenforceable: a wiki page
nobody reads, a linter config copied between repos that immediately drifts, tribal knowledge that
lives in review comments. When standards *are* enforced, they're usually welded to one tool, so
adopting a new tool means rewriting the standards.

We want a single **source of truth for engineering standards** that is:

- **Neutral** — not tied to any one AI tool, linter, or model.
- **Versioned** — reproducible and auditable; a project can say exactly which guidance it ran under.
- **Contributable** — anyone can propose an improvement; once promoted it becomes everyone's default.
- **Enforceable** — the important rules actually block, without freezing in-flight work.

## 2. Core concepts

### 2.1 Neutral source + adapters

Guidance is authored once as **plain markdown + metadata**, tied to no particular tool or model.
Tool-specific packaging is produced by **adapters** that render the neutral source into each tool's
native format (Claude Code today; others later). The AI-tool integration is therefore a **build
target**, not the core.

```
                       ┌──────────────────────┐
   contributors  ──►   │  neutral source       │   ──►  adapter: Claude Code  ──►  .claude/…
   (pull requests)     │  (markdown + metadata)│   ──►  adapter: <future tool> ──►  …
                       └──────────────────────┘
```

Why: the standards outlive any tool. Keeping the source neutral means a new tool costs *one adapter*,
not a rewrite. The tradeoff is a layer of indirection — one of the explicit review questions is
whether that's worth it this early.

### 2.2 Three-axis taxonomy: `domain × severity × enforcement`

Every guidance item is classified on three axes. Authoring the real guidance made clear that the
original two-axis model overloaded severity — it conflated *"is this required"* with *"can we make it
stick."* Those are now separate axes.

**Domain** — what a rule is *about*:

- Security & Compliance
- Architecture & Tech Stack
- Quality & Testing
- Delivery & CI/CD
- Observability & Data
- Integrations & Tooling
- Developer Environment

**Severity** — how authoritative the rule is (required vs recommended):

| Severity | Meaning | Required? |
|---|---|---|
| **Policy** | An external/regulatory or compliance control | Required |
| **Strategic** | An internally-mandated enterprise practice | Required |
| **Handbook** | A recommended pattern, default, or style | Recommended |

The Policy/Strategic distinction is *source of authority* (external/regulatory vs internal decision),
not strength — both are required.

**Enforcement** — where/how the rule is actually made to stick:

| Enforcement | Meaning |
|---|---|
| **local** | Enforced on the developer's machine (pre-commit, local scan). Real, but bypassable. |
| **central** | Enforced at the remote/CI gate. The only value that can hard-block. |
| **retroactive** | Caught after the fact — audit, periodic scan. Detects, doesn't prevent. |
| **none** | Can't be enforced by any of the above. Relies on review and culture. |

A rule may only claim `local`/`central`/`retroactive` if that enforcement genuinely exists or is
achievable; otherwise it is honestly `none`.

**What actually blocks:** a rule blocks only when it is **required *and* `central`**. This is the key
correction. It lets us express **"required but unenforceable"** (`Strategic` + `none`) honestly —
authoritative guidance held up by review and culture rather than a gate — instead of quietly demoting
it to `Handbook` to avoid claiming a block that doesn't exist. Without a scorecard/IDP mechanism to
affirm alignment, many "every service has X" rules land at `retroactive` or `none`, and the taxonomy
now says so plainly.

A guidance item is exactly one `(domain, severity, enforcement)` triple plus its prose.

### 2.3 Governance: pinned + a CI freshness gate (the lockfile pattern)

Modeled on dependency lockfiles.

- **Pin.** A project pins a specific released version of the guidance. Nothing changes mid-work;
  behavior is reproducible and auditable.
- **Freshness gate.** A CI check at pull-request time compares the project's pinned version against
  the promoted `stable` release:
  - Behind on a **Policy** or **Strategic** item → the check **fails the PR**.
  - Behind on a **Handbook** item → the check **warns** but doesn't block.
  - A **grace window** prevents a same-day promotion from instantly blocking an in-flight PR.
- **Bump bot.** A scheduled job opens "bump" PRs against consuming projects, so drift is surfaced
  proactively rather than discovered mid-work.

This threads the needle between *always-latest* (reproducibility nightmare; a promotion can break
unrelated work) and *hard-pinned forever* (standards rot; nobody upgrades). You pin for stability but
CI keeps you honest about currency, weighted by severity.

### 2.4 No silent local override

Org guidance is **authoritative** — a project cannot quietly weaken or disable a blocking rule
locally. True non-overridability, plus an **admin-granted exception / sandbox path** for legitimate
deviations, is built on tool-level *managed settings* and is deferred to Phase 2. In Stage 1 this is a
design commitment, not yet an enforced mechanism.

## 3. Lifecycle of a guidance change

1. **Propose.** A contributor opens a PR editing the neutral source (new item or change to an
   existing one), setting its `domain` and `severity`.
2. **Review & merge.** Maintainers review. Merge lands it on the mainline but not necessarily in
   `stable`.
3. **Promote.** A release promotes mainline guidance to the `stable` channel that the freshness gate
   compares against.
4. **Propagate.** The bump bot opens PRs bumping consumers' pins; the freshness gate enforces
   currency by severity.
5. **Pull.** Projects pull the guidance at their pinned version; adapters render it into each tool.

## 4. Staged rollout

- **Stage 1 — done.** This design + working conventions ([`CLAUDE.md`](../CLAUDE.md)), for peer
  review.
- **Stage 2 — now.** The concrete guidance-item schema ([`GUIDANCE-SCHEMA.md`](GUIDANCE-SCHEMA.md))
  and seed guidance items ([`../guidance/`](../guidance/)). Still ahead in this stage: the **Claude
  Code adapter** and the **GitHub Actions** (freshness gate, promotion, bump bot).
- **Stage 3 — next.** Polish the design docs in light of what building the source teaches us, before
  moving on.
- **Phase 2 — later.** The non-overridable **managed-settings** enforcement tier (plus the
  admin-granted exception path), and **live-fire validation**: two prototype apps and a policy that
  intentionally breaks one, to prove the gate blocks in anger.

## 5. Open questions for reviewers

1. **Severity × enforcement.** Does splitting *how authoritative* (severity) from *how it's enforced*
   (enforcement) hold up — in particular, is `Strategic` + `none` ("required but unenforceable") a
   useful state, or a smell? And is the Policy-vs-Strategic split (source of authority) still worth
   keeping now that neither implies blocking on its own?
2. **Domain list.** Is the seven-domain list right — anything missing, over-split, or mis-named?
3. **Governance tradeoff.** Is *pinned + CI-enforced currency* the right call versus always-latest or
   hard-pinned?
4. **Neutral-core + adapters.** Is the neutral-source/adapter separation worth the indirection, or
   over-engineered for where we are now?

## 6. Explicitly out of scope for the current stage

- Any adapter implementation, including the Claude Code one.
- CI workflows — freshness gate, promotion, bump bot.
- Managed-settings enforcement and the exception/sandbox path (Phase 2).

Delivered so far: the guidance-item schema ([`GUIDANCE-SCHEMA.md`](GUIDANCE-SCHEMA.md)), real guidance
across all seven domains ([`../guidance/`](../guidance/)), and the `domain × severity × enforcement`
taxonomy with a contribution guide ([`../CONTRIBUTING.md`](../CONTRIBUTING.md)).

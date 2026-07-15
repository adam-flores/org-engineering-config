# org-engineering-config

> **Status: the mechanism works end-to-end; governance has no teeth yet.** The neutral guidance-item
> schema, a sample rule-set across all seven domains, the Claude Code adapter, two worked example apps,
> and an adoption guide are all in place. The CI workflows that make "pinned + current" enforceable are
> not (see [what's left](#whats-left)). Feedback on both the design and the source format is welcome.

A **tool-agnostic, versioned, contributable mechanism for engineering standards** — the way an
organization scales any shared standard. Individuals **pull** current guidance into their projects and
**contribute** improvements back via pull request. Once promoted, an improvement becomes everyone's default.

> **What is the product here?** The product is the **mechanism** — the neutral guidance-item schema, the
> four-axis taxonomy, the pinned + CI-freshness governance model, and the adapters that render the source
> into a tool. The rules under [`guidance/`](guidance/) are a **proof-of-concept sample** that exercises
> that mechanism, **not** an enacted org standard: they let us prove the pipeline end-to-end. A real
> organization replaces them with its own authored rules — see [what's left](#whats-left) for how the
> sample eventually migrates out into an enacted-standards repo.

## The core idea

1. **Neutral source of truth.** Guidance lives as plain markdown + metadata, tied to *no* particular AI
   tool or model. Tool-specific packaging (Claude Code today, others later) is produced by **adapters** that
   render the neutral source into each tool's format. The AI-tool integration is a *build target*, not the core.

2. **Four-axis taxonomy.** Every guidance item is classified by
   `domain × severity × enforcement_point × agent_action`. Severity says how *authoritative* a rule
   is; enforcement_point says *where a violation is caught*; agent_action tells an AI coding agent its
   *own role*. Keeping them separate means we never claim a block we can't back up, and an agent
   always knows whether it is the line of defense or merely aligning to a gate elsewhere.

   | Severity | Meaning | Required? |
   |---|---|---|
   | **Policy** | An external/regulatory or compliance control | Required |
   | **Strategic** | An internally-mandated enterprise practice | Required |
   | **Handbook** | A recommended pattern, default, or style | Recommended |

   | Enforcement point | Where a violation is caught |
   |---|---|
   | **coding-agent** | The AI agent as it writes — real, but not a hard gate |
   | **pre-commit** | A dev-machine hook/scan — bypassable |
   | **ci-gate** | A remote/CI gate — one of the two points that can hard-block |
   | **managed-platform** | Org-managed, non-overridable settings — also hard-blocks |
   | **human-review** | A human reviewer at PR time — detects, doesn't mechanically gate |
   | **audit** | A retroactive/periodic scan — catches after the fact |
   | **none** | Nothing mechanical; relies on culture |

   | Agent action | What a coding agent does |
   |---|---|
   | **enforce** | Actively prevent and fix violations as it writes code |
   | **align** | Shape its output to comply — the authoritative check is elsewhere |
   | **aware** | It can't self-satisfy the rule; surface it and never undermine it |

   **A rule blocks only when it is required *and* its `enforcement_point` is `ci-gate` or
   `managed-platform`.** That lets *"required but unenforceable"* (`Strategic` + `human-review`/`audit`)
   be stated honestly instead of demoted to `Handbook`. `Policy` rules additionally carry a
   `references` list mapping them to the external control they enforce (e.g. `SOC2 CC6.1`,
   `ISO 27001 A.9.2.3`) for full traceability.

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

- Does the **severity × enforcement_point × agent_action** split hold up — is separating *"required"*
  from *"where it's caught"* from *"what the coding agent does"* the right decomposition (so
  `Strategic` + `human-review` can mean "required but unenforceable")?
- Is the **domain list** right — anything missing, over-split, or mis-named?
- Is **pinned + CI-enforced currency** the right governance tradeoff versus always-latest or hard-pinned?
- Is the **neutral-core + adapters** separation worth the indirection, or over-engineered for now?

## Repository contents

- [`CLAUDE.md`](CLAUDE.md) — how to work in this repo (project overview, conventions, current state).
- [`docs/HOW-TO-USE.md`](docs/HOW-TO-USE.md) — adopt this in an org: setup, worked samples, and a "how I know it's working" self-check.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to propose or change a rule, using the classification framework.
- [`docs/GUIDANCE-SCHEMA.md`](docs/GUIDANCE-SCHEMA.md) — the neutral guidance-item format (frontmatter + body).
- [`guidance/`](guidance/) — the guidance catalog: a **sample rule-set** (proof-of-concept, not enacted policy) across all seven domains ([index](guidance/README.md)).
- [`adapters/`](adapters/) — build targets that render the neutral source into a tool's format; the
  [Claude Code adapter](adapters/claude-code/) generates a `standards-review` skill + `standards-enforcer` agent.
- [`examples/`](examples/) — a conforming and a violating sample app, each with the rendered reviewer, to see it pass and block.
- [`examples/demos/python-only/`](examples/demos/python-only/) — a self-contained, demoable scenario: its own two-rule guidance ("Python only, Node prohibited") renders a reviewer that **blocks** a Node app with a "rewrite it in Python" remediation task and **passes** the Python rewrite — a vivid before/after showing that swapping the guidance changes enforcement with no code change.

## What's built

- **The mechanism** — the neutral guidance-item schema, the four-axis taxonomy, and the pinned +
  freshness-gate governance model, described above.
- **A sample rule-set** — 53 rules across all seven domains, exercising every axis
  ([`guidance/`](guidance/)). Proof-of-concept test material, not enacted policy.
- **The Claude Code adapter** — renders the neutral source into a `standards-review` skill and a
  `standards-enforcer` agent ([`adapters/claude-code/`](adapters/claude-code/)).
- **Worked examples** — a conforming and a violating app, plus a self-contained
  ["Python only" before/after demo](examples/demos/python-only/) showing that swapping the guidance
  changes enforcement with no code change ([`examples/`](examples/)).
- **An adoption guide** — [`docs/HOW-TO-USE.md`](docs/HOW-TO-USE.md).

## What's left

- **The CI workflows** — the freshness gate, promotion, and bump bot. Governance is *designed* today,
  not *enforced*: nothing yet fails a pull request for drifting behind `stable`.
- **The managed-platform tier** — non-overridable settings, plus live-fire validation (a policy that
  intentionally breaks one app, to prove the gate blocks in anger).
- **Scoping, ownership, and waivers** — `applies_to` scoping so the reviewer isn't noisy, an
  accountable owner per rule/domain, and a time-boxed exception path. See the design notes in
  [`docs/HOW-TO-USE.md`](docs/HOW-TO-USE.md#scaling-the-rollout-design-notes).
- **The product/sample split** — separating the mechanism, an org's enacted standards, and a consuming
  app into their own repos. Today they live here together on purpose: it keeps the mechanism legible
  while we prove it.

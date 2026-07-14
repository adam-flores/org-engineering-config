# Claude Code adapter

Renders the neutral guidance into Claude Code packaging:

- `.claude/skills/standards-review/SKILL.md` — a user-invocable `/standards-review` skill.
- `.claude/skills/standards-review/rules.md` — the compiled rule catalog (generated; do not edit).
- `.claude/agents/standards-enforcer.md` — a subagent for deeper, multi-file audits.

The skill and agent are static templates that live in this adapter under
[`templates/`](templates/) — the canonical, hand-editable source. The build **copies** them verbatim
and only **generates** `rules.md` from the guidance, so the reviewer's prose is reviewed like any other
file and the catalog always reflects the current rules.

## Usage

```
node adapters/claude-code/build.mjs --out <projectDir> [--source <guidanceCheckout>]
```

- `--out` — the target **project** directory. Artifacts are written under `<projectDir>/.claude/`.
  The adapter **refuses to write to the global `~/.claude` profile**.
- `--source` — optional guidance checkout to render from (defaults to this repo). Point it at a
  pinned version to render exactly what a project has pinned.

## What it does

1. Parses and **validates** every rule in `guidance/`: required fields present, enum values legal
   (`severity`, `enforcement_point`, `agent_action`, `status`), ids unique and domain-prefixed,
   `domain` matches its folder, `since` is semver, and every `Policy` rule carries `references`. If
   validation fails it prints each error, writes nothing, and exits non-zero.
2. Generates the compiled catalog and copies the skill + agent. Every finding the reviewer reports is
   classified **BLOCK / WARN / advisory** straight from the `severity × enforcement_point` model, and
   grouped by `agent_action` so the agent knows whether to **enforce** it, **align** to it, or just be
   **aware** of it.

Dependency-free (plain Node ≥ 18).

---

# Get it working in Claude Code

This adapter targets **Claude Code specifically** (terminal CLI and the VS Code / JetBrains
extension). The steps below take a consumer from zero to a working `/standards-review` with no prior
context. For the org-level picture — pulling/pinning a version, rolling it out at scale — see
[`docs/HOW-TO-USE.md`](../../docs/HOW-TO-USE.md); this section is the Claude Code tool mechanics.

## 1. Deploy it into your project

Run the adapter once, pointing `--out` at the project you want reviewed:

```bash
node adapters/claude-code/build.mjs --out /path/to/your-project
```

That writes three files into your project (creating `.claude/` if needed):

```
your-project/
└── .claude/
    ├── skills/
    │   └── standards-review/
    │       ├── SKILL.md     ← the /standards-review skill (copied from the adapter template)
    │       └── rules.md     ← the compiled rule catalog (generated — do not edit)
    └── agents/
        └── standards-enforcer.md   ← the deep-audit subagent (copied from the adapter template)
```

**Install scope — project, not global.** Everything lands under your **project's** `.claude/`, so the
standard is versioned with the project and shared with everyone who checks it out. The adapter writes
project-scoped only and **refuses to write to your global `~/.claude` profile** — the standard belongs
to the org and its projects, not to one person's personal setup. Commit `.claude/` to share it.

**Refresh when the guidance changes.** Re-run the same command to pull the current standards — new and
changed rules flow into `rules.md` with no edits to the skill or agent:

```bash
node adapters/claude-code/build.mjs --out /path/to/your-project
```

## 2. Use it in Claude Code

**Discovery is automatic.** When you run Claude Code **inside that project**, it auto-loads
`.claude/skills/*/SKILL.md` as the `/standards-review` slash command and `.claude/agents/*.md` as the
`standards-enforcer` subagent. This is identical for the **terminal CLI** and the **VS Code /
JetBrains extension** — both read the project's `.claude/`. (If you added the files while Claude Code
was already running, start a new session so it picks them up.)

**Invoke the skill** — in the CLI or the IDE extension, run:

```
/standards-review
```

It reviews your current diff by default (or the whole repo), then reports findings grouped
**BLOCK → WARN → notes**, followed by a **remediation plan packaged for a coding agent** — routed
**go-do** (the `enforce`/`align` fixes, BLOCK-first) vs **raise-to-human** (the `aware` items) — that
you can hand straight to your coding agent, and ends in a `PASS` or `BLOCKED — n` verdict. The reviewer
audits and hands off; it never edits code itself.

**Invoke the subagent** — for a deeper, multi-file audit, ask Claude in plain language, e.g.
*"use the standards-enforcer agent to audit this repo against our standards."* It follows the same
review protocol and returns the same grouped report plus a coding-agent-ready remediation plan — it
audits and hands off, it does not edit code.

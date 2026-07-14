# Claude Code adapter

Renders the neutral guidance into Claude Code packaging:

- `.claude/skills/standards-review/SKILL.md` — a user-invocable `/standards-review` skill.
- `.claude/skills/standards-review/rules.md` — the compiled rule catalog (generated; do not edit).
- `.claude/agents/standards-enforcer.md` — a subagent for deeper, multi-file audits.

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
2. Compiles the rules and renders the skill, catalog, and agent. Every finding the reviewer reports is
   classified **BLOCK / WARN / advisory** straight from the `severity × enforcement_point` model, and
   grouped by `agent_action` so the agent knows whether to **enforce** it, **align** to it, or just be
   **aware** of it.

Dependency-free (plain Node ≥ 18). Re-run after any guidance change to refresh a project's copy — that
is the "pull the current standards" step.

# Adapters

Adapters render a neutral guidance source into a specific tool's native packaging. The source is a
`guidance/` tree in a standards repo, passed with `--source`; adapters are **build targets** — they add
no rules and change no meaning, they only translate the same `domain × severity × enforcement_point ×
agent_action` model into a form a given tool can consume.

## The pattern

```
<source>/guidance/*.md      adapters/<tool>/            <target project>
(neutral source      ─────► render/validate    ─────► tool-native packaging
 of truth)                  (build step)                (skill, agent, config, …)
```

Every adapter follows the same contract:

- **Reads** the neutral source (optionally a pinned checkout via a `--source` flag) and **validates**
  it before emitting anything — a bad rule fails the build, it doesn't ship.
- **Writes project-scoped only.** Output lands in the target project (never a user's global profile,
  never the neutral source), so the standard is versioned with the project.
- **Re-runnable.** Re-rendering is the "pull the current standards" step; regenerating never requires
  hand-edits to the tool packaging.

## Adapters

Each tool gets its own sibling directory — `adapters/<tool>/` — so adapters stay independent and a new
tool slots in without touching the others:

- [`claude-code/`](claude-code/) — the **reference implementation**. Renders the guidance into a Claude
  Code `standards-review` skill and a `standards-enforcer` subagent, installed into a target project's
  project-scoped `.claude/`. See its [README](claude-code/README.md) for deploy + use instructions.

Future tools follow the same layout — e.g. `adapters/cursor/`, `adapters/kiro/` — each rendering the
same neutral rules into that tool's native format. None exist yet; when one is added it lives here as a
sibling and reuses the contract above.

Adapters never write to a user's global profile and never modify the neutral source.

# Adapters

Adapters render the neutral guidance source ([`../guidance/`](../guidance/)) into a specific tool's
native packaging. The neutral source is the product; adapters are **build targets** — they add no
rules and change no meaning, they only translate the same `domain × severity × enforcement_point ×
agent_action` model into a form a given tool can consume.

- [`claude-code/`](claude-code/) — renders the guidance into a Claude Code `standards-review` skill
  and a `standards-enforcer` subagent, installed into a target project's project-scoped `.claude/`.

Adapters never write to a user's global profile and never modify the neutral source.

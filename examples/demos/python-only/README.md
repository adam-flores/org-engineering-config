# Demo: "Python only — Node.js is prohibited"

A deliberately **extreme, self-contained demo** you can run in front of a team. It shows what a hard,
whole-application language mandate looks like end-to-end: the entire app is in the wrong runtime, the
reviewer **blocks** it, and the remediation plan hands a coding agent a single, unambiguous task —
**rewrite the service in Python**.

It also makes the product's core point concrete. This demo ships its **own guidance** — just two rules —
separate from the repo's 53-rule sample catalog. Same reviewer machinery, a different rule-set, entirely
different enforcement, and **not one line of the adapter or reviewer changed**. Swap the guidance, the
behavior changes.

## The two rules (this bundle's `guidance/`)

| id | Rule | Severity · point · action |
|---|---|---|
| [`arch-no-nodejs`](guidance/architecture-tech-stack/no-nodejs.md) | Node.js / JavaScript runtimes are prohibited | Strategic · ci-gate · enforce |
| [`arch-python-required`](guidance/architecture-tech-stack/python-required.md) | Services must be implemented in Python | Strategic · ci-gate · enforce |

Both are **required + `ci-gate`**, so both **block**.

## Layout

```
python-only/
  guidance/architecture-tech-stack/   ← the two rules above (this demo's whole rule-set)
  app-node/     ← the "before": a Node.js service (WRONG language) — BLOCKS
    src/server.mjs, package.json
    .claude/    ← reviewer rendered from THIS guidance
  app-python/   ← the "after": the same service in Python (approved) — PASSES
    app.py, pyproject.toml
    .claude/    ← same reviewer
  README.md
```

## Run it (before / after)

Open Claude Code **inside** an app directory and run the skill:

```
cd app-node    &&  # then, in Claude Code:  /standards-review   → BLOCKED
cd app-python  &&  # then, in Claude Code:  /standards-review   → PASS
```

Both directories carry the **same** reviewer (rendered from the same two rules). The only difference is
the language the service is written in.

### `app-node` → **BLOCKED**

Two blocking findings, then a remediation plan whose single "go do" task is the rewrite:

```
BLOCK
  - arch-no-nodejs — Node.js and JavaScript runtimes are prohibited
      package.json, src/server.mjs (`import http from "node:http"`, .mjs) — a Node.js service.
  - arch-python-required — Services must be implemented in Python
      No Python entrypoint (.py) or pyproject.toml/requirements.txt; the service is not Python.

Remediation plan (for a coding agent)
  Go do:
    1. [BLOCK] Port the service from Node.js to Python (arch-python-required, arch-no-nodejs):
       rewrite src/server.mjs as a Python HTTP service (e.g. app.py using http.server), add
       pyproject.toml, and delete package.json and the .mjs source.
  Raise to the human: (none)

Verdict: BLOCKED — 2 blocking violation(s)
```

The reviewer **audits and hands off** — it never edits code. The rewrite task is exactly what you hand
to your coding agent. `app-python/` is what that agent would produce.

### `app-python` → **PASS**

Python source + `pyproject.toml`, no Node runtime — neither rule is violated:

```
Verdict: PASS — no blocking violations
Remediation plan: (empty — nothing to do)
```

## Regenerate the reviewer

The `.claude/` in each app is generated from this bundle's guidance — re-render with:

```bash
node adapters/claude-code/build.mjs --source examples/demos/python-only --out examples/demos/python-only/app-node
node adapters/claude-code/build.mjs --source examples/demos/python-only --out examples/demos/python-only/app-python
```

> These rules are demo material, intentionally extreme — they are **not** part of the sample catalog
> under [`guidance/`](../../../guidance/) and not a suggestion any org actually adopt them verbatim.

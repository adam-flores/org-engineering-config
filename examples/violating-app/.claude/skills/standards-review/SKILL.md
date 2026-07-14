---
name: standards-review
description: Review the working tree or current diff against the organization's engineering standards. Reports blocking violations (required + centrally gated), warnings, and alignment/awareness notes, grouped and traceable. Use when asked to check code against org standards, before opening a PR, or to audit a repo for compliance.
user-invocable: true
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(git diff*)
  - Bash(git status*)
---
# standards-review

Review code against the organization's engineering standards — the neutral guidance source, compiled into this skill.

The compiled rule catalog is at `.claude/skills/standards-review/rules.md`. Read it first.

### How to review

1. **Scope.** Default to the current change: `git diff` plus staged (`git diff --cached`) and untracked files. If there is no diff, or the user asks, review the whole repository. State the scope you chose.
2. **Gather evidence** with Read/Grep/Glob (and read-only Bash like `git diff`). Do not guess — cite `file:line`.
3. **Check each rule** in the catalog against the code in scope.
4. **Classify every finding** using the catalog:
   - **BLOCK** — a violated rule tagged BLOCK (required **and** `ci-gate`/`managed-platform`). Must be fixed before merge.
   - **WARN** — a violated Handbook or non-blocking rule. Fixing is recommended.
   - **REQUIRED-unenforceable** — a violated required rule with no gate; surface it firmly, but it does not hard-block.
5. **Use `agent_action` to know your role:**
   - `enforce` — you should prevent/fix this as you write code; if violated, fix it now.
   - `align` — make the code comply; the authoritative gate is elsewhere.
   - `aware` — you cannot self-satisfy it (e.g. peer review, an audit); note it for humans, never claim it passes.
6. **For `Policy` violations, cite the `references`** (control IDs) so the finding is traceable.

### Report format

Group findings: **BLOCK** first, then **WARN**, then **notes** (align/aware). For each finding give:
rule `id`, title, `file:line`, what is wrong, and how to fix it. End with a one-line verdict:
`PASS` (no BLOCK findings) or `BLOCKED — n blocking violation(s)`.

---

For a deeper, multi-file audit you can hand off to the `standards-enforcer` subagent, which follows the same protocol.

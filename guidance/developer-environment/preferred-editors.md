---
id: env-preferred-editors
title: Prefer VS Code or the terminal as the editor
domain: Developer Environment
severity: Handbook
enforcement: none
status: active
since: 0.1.0
tags: [editor, ide, vscode, terminal]
---

## Rule

**VS Code** or a **terminal**-based editor are the preferred development environments. Teams should
standardize shared editor configuration (extensions, settings) around these rather than each person
maintaining a bespoke setup.

## Rationale

A shared editor baseline means setup guides, recommended extensions, and debugging instructions work
for everyone, and it's the environment the org's tooling (the Claude Code assistant, formatter
integrations) is set up for. It's a preference, not a mandate — use what makes you productive, but
expect shared config to target these.

## Scope

Day-to-day application and service development. Specialized work with its own tooling needs is out of
scope.

## Exceptions

Advisory (Handbook): a preference that warns rather than blocks. Pairs with
[`integ-tool-telemetry-off`](../integrations-tooling/tool-telemetry-off.md) (disable editor telemetry)
and [`integ-ai-usage-guardrails`](../integrations-tooling/ai-usage-guardrails.md).

---
id: integ-approved-tools
title: Use the approved tool for each capability
domain: Integrations & Tooling
severity: Handbook
enforcement: none
status: active
since: 0.1.0
tags: [tooling, registry, approved-tools, github, claude, mermaid, notion, playwright]
---

## Rule

Reach for the approved tool for each capability before introducing an alternative:

| Capability | Approved tool |
|---|---|
| Remote repository / VCS hosting | **GitHub** |
| CI/CD platform | **GitHub Actions** |
| AI assistant + model set | **Claude** (preferred) |
| Diagramming | **Mermaid** |
| Knowledge base | **Notion** |
| UI testing | **Playwright** |

Package registries are governed separately by
[`sec-approved-package-sources`](../security-compliance/approved-package-sources.md). Adding a tool
outside this list follows [`integ-new-tool-approval`](new-tool-approval.md); tools on the prohibited
list are covered by [`integ-denylist-tools`](denylist-tools.md).

## Rationale

A shared, named default per capability keeps integrations, expertise, and support concentrated instead
of every team picking its own stack. It also makes the surrounding rules concrete — GitHub is what the
delivery gates assume, Playwright is what the UI-testing rule means, and so on.

## Scope

Tool selection for new work. Existing tools are out of scope until a migration.

## Exceptions

Advisory (Handbook): warns rather than blocks — the registry is a declared standard, not a mechanical
gate, and in the pilot there's no system to verify tool choice. A capability not covered here goes
through [`integ-new-tool-approval`](new-tool-approval.md).

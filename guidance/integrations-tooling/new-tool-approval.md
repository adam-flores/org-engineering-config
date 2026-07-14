---
id: integ-new-tool-approval
title: Route new tools through the approval path
domain: Integrations & Tooling
severity: Handbook
enforcement_point: human-review
agent_action: aware
status: active
since: 0.1.0
tags: [governance, tooling, approval, process]
---

## Rule

Adopting a tool not already on the approved list **should** go through the tool-approval path — a
review of licensing, security, data handling, and overlap with existing tools — before it's introduced.
The outcome updates the approved list or the "DO NOT USE" list so both stay current.

## Rationale

The approved-tools registry and the denylist are only useful if they're maintained. A defined approval
path keeps them from going stale, stops the same evaluation being redone per team, and ensures
licensing and security questions are answered once, up front.

## Scope

New tools, services, and integrations that touch company code or data. Trying something out locally
with no company data is out of scope until it's proposed for real use.

## Enforcement

**Enforcement point:** `human-review` — caught at human review at PR time (no mechanical gate). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `aware` — a coding agent cannot self-satisfy this rule; it should surface it and never undermine it.

## Exceptions

Advisory (Handbook): a lightweight governance process, not a mechanical gate. It's the upkeep mechanism
behind [`integ-approved-tools`](approved-tools.md) and [`integ-denylist-tools`](denylist-tools.md).

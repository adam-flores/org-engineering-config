---
id: integ-denylist-tools
title: Prohibited tools must not be used
domain: Integrations & Tooling
severity: Policy
status: active
since: 0.1.0
tags: [tooling, denylist, prohibited, compliance]
---

## Rule

Any tool, service, or dependency on the organization's **"DO NOT USE"** list **must not** be used,
introduced, or integrated. The list is maintained centrally; the entries below are illustrative until
the canonical list has a home.

| Prohibited | Reason (category) |
|---|---|
| _(to be populated)_ | legal / licensing / security / data-residency |

## Rationale

Some tools are off-limits for legal, licensing, security, or data-residency reasons, and those
decisions have to hold regardless of individual preference. A single authoritative denylist makes the
prohibition explicit and reviewable rather than tribal knowledge.

## Scope

All tools, services, and dependencies across repositories and workflows.

## Exceptions

None — this is a Policy control (compliance/legal driver). Detectability varies: a prohibited package
or CI action is scannable and can be gated; a prohibited SaaS used in a browser is not, so that part
relies on policy and review. A specific exception requires the Phase-2 admin-granted path with a
recorded, reviewed reason.

## Open item

The canonical "DO NOT USE" list needs a home — a dedicated artifact this rule points at, kept current
via [`integ-new-tool-approval`](new-tool-approval.md). Resolve in the Stage-3 design polish.

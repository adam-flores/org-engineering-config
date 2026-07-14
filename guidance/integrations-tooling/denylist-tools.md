---
id: integ-denylist-tools
title: Prohibited tools must not be used
domain: Integrations & Tooling
severity: Policy
enforcement_point: ci-gate
agent_action: enforce
references: ["SOC2 CC6.8", "ORG-SEC-021"]
status: active
since: 0.1.0
tags: [tooling, denylist, prohibited, compliance]
---

## Rule

Any tool, service, or dependency on the organization's **"DO NOT USE"** list **must not** be used,
introduced, or integrated. The canonical list is the org's tooling denylist register (control
`ORG-SEC-021`); the categories below describe what that register covers.

| Prohibited (category) | Reason |
|---|---|
| Unlicensed / copyleft-incompatible tools | legal / licensing |
| Tools with known unpatched CVEs or supply-chain compromise | security |
| Services that store data outside approved regions | data-residency |

## Rationale

Some tools are off-limits for legal, licensing, security, or data-residency reasons, and those
decisions have to hold regardless of individual preference. A single authoritative denylist makes the
prohibition explicit and reviewable rather than tribal knowledge.

## Scope

All tools, services, and dependencies across repositories and workflows.

## Enforcement

**Enforcement point:** `ci-gate` — prohibited packages and CI actions are scannable and blocked at
the CI gate; a prohibited SaaS used outside the codebase isn't mechanically catchable and rides on
review. For the detectable surface, this required control **blocks** the PR/release.

**Agent action:** `enforce` — a coding agent should actively prevent and fix violations as it writes code.

## References

Maps to: SOC2 CC6.8, ORG-SEC-021. The register `ORG-SEC-021` is the canonical "DO NOT USE" list this
rule points at, kept current via [`integ-new-tool-approval`](new-tool-approval.md).

## Exceptions

None by default — this is a Policy control (compliance/legal driver). A specific exception requires
the Phase-2 admin-granted path with a recorded, reviewed reason.

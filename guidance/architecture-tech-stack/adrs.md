---
id: arch-adrs
title: Record significant decisions as ADRs
domain: Architecture & Tech Stack
severity: Handbook
enforcement_point: audit
agent_action: align
status: active
since: 0.1.0
tags: [documentation, adr, decisions]
---

## Rule

Significant or hard-to-reverse architectural decisions **should** be captured as Architecture Decision
Records (ADRs) checked into the codebase — the context, the options weighed, the decision, and its
consequences.

## Rationale

An ADR preserves *why* a decision was made, not just what the code ended up doing. It saves future
engineers from re-litigating settled questions and gives newcomers the reasoning behind the system's
shape.

## Scope

Decisions with lasting or cross-cutting impact (a datastore choice, a service boundary, a framework
adoption). Routine, easily reversible choices don't need an ADR.

## Enforcement

**Enforcement point:** `audit` — caught at a retroactive audit or periodic scan, after the fact. Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): warns rather than blocks. What counts as "significant" is a judgment call, so we
don't mechanically gate it.

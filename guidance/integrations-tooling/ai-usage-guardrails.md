---
id: integ-ai-usage-guardrails
title: Use only approved AI tools with company code
domain: Integrations & Tooling
severity: Strategic
enforcement_point: human-review
agent_action: align
status: active
since: 0.1.0
tags: [ai, guardrails, data-protection, claude]
---

## Rule

Proprietary code, secrets, and confidential or personal data **must not** be pasted into or
processed by AI tools outside the approved set — the approved AI assistant is **Claude** (see
[`integ-approved-tools`](approved-tools.md)). Company work with AI runs through approved tooling, not
arbitrary consumer AI services.

## Rationale

Prompts to an unapproved AI service can be retained, logged, or used for training — an uncontrolled
path for source and secrets to leave the organization. Constraining AI use to approved tooling keeps
that data under a known agreement and retention policy. This is about data protection, not
anti-AI: approved AI use is encouraged — the guardrail is *which* tool, not *whether*.

## Scope

Any use of AI tools on company code, data, or confidential material.

## Enforcement

**Enforcement point:** `human-review` — caught at human review at PR time (no mechanical gate). It is **required but unenforceable** at a gate — held by review and culture, not a hard block.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Required (Strategic) with enforcement `none` — the canonical **required-but-unenforceable** case:
nothing stops a paste into a browser, so it rides on review and culture rather than a gate. A built-out
enterprise would back it with a Security & Compliance Policy and endpoint controls.

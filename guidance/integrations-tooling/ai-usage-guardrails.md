---
id: integ-ai-usage-guardrails
title: Use only approved AI tools with company code
domain: Integrations & Tooling
severity: Handbook
status: active
since: 0.1.0
tags: [ai, guardrails, data-protection, claude]
---

## Rule

Proprietary code, secrets, and confidential or personal data **should not** be pasted into or
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

## Exceptions

Advisory (Handbook): this is a firm expectation but **can't be mechanically enforced** — nothing stops
a paste into a browser — so it warns rather than blocks. It's a leading example of the
"required-but-unenforceable" gap flagged for the Stage-3 design polish; a built-out enterprise would
back it with a Security & Compliance Policy and endpoint controls.

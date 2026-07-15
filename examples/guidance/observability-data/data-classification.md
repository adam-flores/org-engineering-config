---
id: obs-data-classification
title: Classify data and handle it by its class
domain: Observability & Data
severity: Strategic
enforcement_point: audit
agent_action: aware
status: active
since: 0.1.0
tags: [data-classification, pii, governance, privacy]
---

## Rule

Data **must** be classified (e.g. public / internal / confidential / regulated-PII) and handled
according to its class — where it may be stored, who may access it, and how it must be protected.
New data stores and flows must record the classification of what they hold.

## Rationale

You can't protect data consistently if nobody's agreed what's sensitive. A simple, shared
classification turns "handle data carefully" into concrete, checkable expectations and is the
foundation the stricter controls (encryption, access, retention) build on.

## Scope

Application and analytics data at rest and in flight.

## Enforcement

**Enforcement point:** `audit` — caught at a retroactive audit or periodic scan, after the fact. It is **required but unenforceable** at a gate — held by review and culture, not a hard block.

**Agent action:** `aware` — a coding agent cannot self-satisfy this rule; it should surface it and never undermine it.

## Exceptions

A legitimate deviation (e.g. a dataset whose class is still being determined) is noted in the change
description and resolved before release. This rule overlaps Security & Compliance: in a built-out
enterprise, data classification would most likely live there as a **Policy** control.

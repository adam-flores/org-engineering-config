---
id: obs-data-classification
title: Classify data and handle it by its class
domain: Observability & Data
severity: Strategic
enforcement: retroactive
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

## Exceptions

Required (Strategic), enforced `retroactive`ly — classifications are checked by audit, not a pre-merge
gate. This overlaps Security & Compliance: in a built-out enterprise, data classification and PII
handling would most likely live there as a **Policy** control. Revisit its home in the Stage-3 polish.

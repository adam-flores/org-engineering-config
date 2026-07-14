---
id: arch-python-required
title: Services must be implemented in Python
domain: Architecture & Tech Stack
severity: Strategic
enforcement_point: ci-gate
agent_action: enforce
status: active
since: 0.1.0
tags: [language, runtime, stack, demo]
---

## Rule

Every service **must** be implemented in **Python**. A conforming service has Python source (`.py`) and
a Python project descriptor (`pyproject.toml` or `requirements.txt`), and no other-language runtime. A
service that is not Python — no `.py` entrypoint — violates this rule.

## Rationale

The positive half of the demo language mandate (the prohibition is
[`arch-no-nodejs`](no-nodejs.md)). Together they produce two blocking findings on a non-Python app and a
remediation plan whose single "go do" task is to rewrite the service in Python.

## Scope

The demo service in this bundle. Not part of the main sample catalog.

## Enforcement

**Enforcement point:** `ci-gate` — required and centrally gated, so this rule **blocks** the PR/release.

**Agent action:** `enforce` — the coding agent should (re)implement the service in Python.

## Exceptions

None — this is a demonstration of a non-negotiable stack mandate.

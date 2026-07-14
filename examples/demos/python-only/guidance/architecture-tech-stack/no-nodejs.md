---
id: arch-no-nodejs
title: Node.js and JavaScript runtimes are prohibited
domain: Architecture & Tech Stack
severity: Strategic
enforcement_point: ci-gate
agent_action: enforce
status: active
since: 0.1.0
tags: [language, runtime, stack, demo]
---

## Rule

Services **must not** be implemented on the Node.js / JavaScript runtime. Any of the following is a
violation: a `package.json`, a `node_modules/` directory, a Node lockfile (`package-lock.json`,
`yarn.lock`, `pnpm-lock.yaml`), `.js` / `.mjs` / `.cjs` / `.ts` source files, or an `import`/`require`
of a `node:` builtin.

## Rationale

This is an intentionally **extreme, demo-only** rule. It exists to show what a hard, whole-application
language mandate looks like when it flows through the reviewer: the entire app is in the wrong runtime,
so it blocks, and the remediation plan hands a coding agent a single, unambiguous task — port it.

## Scope

The demo service in this bundle. Not part of the main sample catalog.

## Enforcement

**Enforcement point:** `ci-gate` — required and centrally gated, so this rule **blocks** the PR/release.

**Agent action:** `enforce` — the coding agent should remove the Node.js runtime and port the service to
the approved language (see [`arch-python-required`](python-required.md)).

## Exceptions

None — this is a demonstration of a non-negotiable stack mandate.

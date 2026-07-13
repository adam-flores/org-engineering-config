---
id: arch-no-unapproved-stack
title: No frontend frameworks or API languages outside the approved set
domain: Architecture & Tech Stack
severity: Strategic
status: active
since: 0.1.0
tags: [frontend, backend, languages, frameworks, tech-stack, prohibition]
---

## Rule

A new application **must not** introduce a frontend framework or API language outside the approved
set:

- **Frontend frameworks:** React, Angular, Vue.
- **API / service languages:** Node.js, Python, .NET.

Anything outside these sets is not permitted for a new project without an approved exception. The
ranked *preference* among the approved options lives in
[`arch-approved-app-stack`](approved-app-stack.md); this rule is the hard boundary around them.

## Rationale

A bounded stack is only bounded if the boundary holds. Off-stack frameworks and languages multiply the
hiring, security-patching, and shared-tooling surface the org has to carry, so introducing one is a
decision that needs review rather than a default a single team can take unilaterally.

## Scope

The **primary** stack of a new application or service, as identified by its main dependency manifest
(`package.json`, `pyproject.toml` / `requirements.txt`, `*.csproj`, etc.). Isolated build scripts,
tooling, and incidental dependencies are out of scope, as is any existing system until a major
rewrite. This scoping is what keeps the check honest — it keys off the service's primary manifest, not
every file in the repo.

## Exceptions

None by default. This rule blocks because stack membership is mechanically detectable from dependency
manifests and language markers. A legitimate off-stack choice goes through the Phase-2 admin-granted
exception path, recorded with architecture review.

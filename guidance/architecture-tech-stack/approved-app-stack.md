---
id: arch-approved-app-stack
title: Build on approved frontend and API stacks
domain: Architecture & Tech Stack
severity: Handbook
status: active
since: 0.1.0
tags: [frontend, backend, languages, frameworks, tech-stack]
---

## Rule

New applications **should** be built on an approved stack:

- **Frontend:** React, Angular, or Vue.
- **APIs / services:** Node.js, Python, or .NET.

This rule expresses *preference* among the approved options. The hard prohibition on introducing a
framework or language outside the set lives in [`arch-no-unapproved-stack`](no-unapproved-stack.md).

## Rationale

A bounded set of frontend frameworks and API runtimes keeps hiring, code review, shared libraries,
and security patching tractable, and lets engineers move between teams without relearning the stack
each time.

## Scope

New applications and services. Existing systems on other stacks are out of scope until a major
rewrite. Language choices inside isolated tooling or scripts are not constrained here.

## Exceptions

Advisory (Handbook): a project with a strong technical reason to step outside the list should record
the rationale with architecture review.

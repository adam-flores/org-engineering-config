---
id: arch-api-first-design
title: Design the API contract first
domain: Architecture & Tech Stack
severity: Handbook
status: active
since: 0.1.0
tags: [api, design, contracts]
---

## Rule

New services and integrations **should** start from an explicit API contract (the interface and its
schema) agreed before the implementation is built, rather than letting the contract emerge from the
code after the fact.

## Rationale

Designing the contract first lets consumers and producers work in parallel against a stable
interface, surfaces breaking decisions early, and keeps the boundary between services intentional
rather than accidental.

## Scope

Services, and integrations that expose or consume an interface across a team or system boundary.
Purely internal, single-module code is out of scope.

## Exceptions

Advisory (Handbook): spikes and throwaway prototypes may skip a formal contract, but should adopt one
before the interface is depended on by another team.

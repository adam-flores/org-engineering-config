---
id: arch-diagrams-in-repo
title: Keep architecture diagrams in the codebase
domain: Architecture & Tech Stack
severity: Handbook
status: active
since: 0.1.0
tags: [documentation, diagrams, architecture]
---

## Rule

A service's **Capability**, **Logical**, and **Structural** architecture diagrams **should** live in
its codebase (as diagram-as-code checked in alongside the source), so they version with the code and
are reviewed in the same pull requests.

## Rationale

Diagrams that live next to the code stay current, travel with the repository, and change under review
instead of drifting on a separate wiki. Keeping the three views together gives a reader the capability
(what it does), logical (how it's organized), and structural (how it's deployed) picture in one place.

## Scope

Services and significant components. Trivial scripts and libraries with no meaningful architecture are
out of scope.

## Exceptions

Advisory (Handbook): this warns rather than blocks — we can check that a diagram file exists but not
that it is accurate or current, so we don't claim to hard-gate it. The tool for authoring these
diagrams is covered under Integrations & Tooling.

---
id: integ-tool-telemetry-off
title: Disable tool telemetry and usage tracking
domain: Integrations & Tooling
severity: Handbook
enforcement: none
status: active
since: 0.1.0
tags: [telemetry, privacy, tooling, configuration]
---

## Rule

Development and delivery tools **should** be configured with telemetry, usage tracking, and
advertising/analytics features **turned off** where the tool allows it. The organization does not opt
in to having its tool usage monitored by vendors.

## Rationale

Tool telemetry can send usage patterns — and sometimes file names, paths, or snippets — to third-party
vendors. Turning it off by default keeps that data in-house and is the least-surprising posture for an
organization that hasn't chosen to be monitored.

## Scope

Tools the organization adopts and configures — editors, CLIs, CI tooling, SDKs. Where a tool offers no
way to disable telemetry, note it so the trade-off is a visible decision.

## Exceptions

Advisory (Handbook): a firm expectation, but it's a configuration standard verified at setup rather
than a per-change CI gate, so it warns. **Placement note:** this straddles Integrations & Tooling
(tool configuration) and Security & Compliance / data-governance (not leaking usage data) — filed here
for now; revisit its home in the Stage-3 polish.

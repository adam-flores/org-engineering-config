---
id: arch-infrastructure-as-code
title: Provision infrastructure as code with Terraform
domain: Architecture & Tech Stack
severity: Handbook
status: active
since: 0.1.0
tags: [iac, terraform, provisioning, infrastructure]
---

## Rule

Cloud infrastructure **should** be defined as code with **Terraform** and applied through review,
rather than provisioned by hand in a console. Manual, un-tracked infrastructure changes are
discouraged.

## Rationale

Infrastructure-as-code makes environments reproducible, reviewable, and auditable, and turns
provisioning drift into a visible diff instead of a surprise. Standardizing on Terraform keeps that
tooling and expertise shared across teams.

## Scope

Cloud infrastructure and environment provisioning. One-off local or throwaway experiments are out of
scope.

## Exceptions

Advisory (Handbook): break-glass manual changes during an incident are acceptable, but should be
reconciled back into Terraform afterward. *Placement note:* this rule may move to Delivery & CI/CD
when that domain is authored.

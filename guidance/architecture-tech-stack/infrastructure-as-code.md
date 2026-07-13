---
id: arch-infrastructure-as-code
title: Provision infrastructure as code with Terraform
domain: Architecture & Tech Stack
severity: Strategic
enforcement: central
status: active
since: 0.1.0
tags: [iac, terraform, provisioning, infrastructure]
---

## Rule

Cloud infrastructure **must** be defined as code with **Terraform** and applied through review, not
provisioned by hand in a console. Infrastructure-as-code in another tool is not the standard, and
manual, un-tracked infrastructure changes are not permitted as the way infrastructure is managed.

## Rationale

Infrastructure-as-code makes environments reproducible, reviewable, and auditable, and turns
provisioning drift into a visible diff instead of a surprise. Standardizing on Terraform keeps that
tooling and expertise shared across teams.

## Scope

Cloud infrastructure and environment provisioning. One-off local or throwaway experiments are out of
scope.

## Exceptions

The gate blocks on the detectable part — committed IaC must be Terraform, not another tool. The "no
manual console changes" part can't be detected from the repo, so it stands as required practice backed
by review rather than a mechanical check. Break-glass manual changes during an incident are acceptable
but must be reconciled back into Terraform afterward; broader deviations use the Phase-2 exception path.

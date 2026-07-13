---
id: arch-approved-compute-platform
title: Prefer AWS and serverless; containerize with Docker when needed
domain: Architecture & Tech Stack
severity: Handbook
status: active
since: 0.1.0
tags: [aws, serverless, containers, docker, hosting]
---

## Rule

New workloads **should** run on AWS, with a **serverless-first** preference. When a serverless model
doesn't fit, containerize with **Docker** as the container platform rather than provisioning bespoke
long-lived hosts.

## Rationale

Concentrating on one cloud and a serverless-first default keeps operational surface, security
patching, and on-call knowledge bounded, and pushes scaling and undifferentiated ops onto the
platform. Docker gives a portable fallback for workloads that need a container without fragmenting the
hosting story.

## Scope

New services and workloads. Existing workloads on other platforms are out of scope until a major
migration or rewrite.

## Exceptions

Advisory (Handbook): a workload with a genuine reason to run elsewhere (data residency, a managed
dependency only available on another platform) should document the reason with the service.

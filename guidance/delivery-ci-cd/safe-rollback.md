---
id: cicd-safe-rollback
title: Every release must have a safe rollback path
domain: Delivery & CI/CD
severity: Handbook
enforcement_point: human-review
agent_action: align
status: active
since: 0.1.0
tags: [rollback, releases, recovery, deployment]
---

## Rule

Every release **should** have a known, tested way to get back to a good state — a roll-back to the
prior version or a roll-forward fix on a defined path — rather than discovering the recovery route
during an incident. Changes that can't be trivially reverted (e.g. destructive migrations) should ship
with their recovery plan.

## Rationale

The question during an outage is never "should we recover" but "how fast can we." A rollback path
decided in advance turns a scramble into a routine action, and forces the hard cases — irreversible
migrations, data changes — to be thought through before they ship, not after they break.

## Scope

Deployable services and any change to persistent data or schema. Stateless, trivially revertible
changes need no special plan beyond the standard revert.

## Enforcement

**Enforcement point:** `human-review` — caught at human review at PR time (no mechanical gate). Advisory — surfaced by review or local tooling, not gated.

**Agent action:** `align` — a coding agent should shape its output to comply — the authoritative check is elsewhere.

## Exceptions

Advisory (Handbook): whether a recovery path is adequate is a judgment call that can't be mechanically
verified, so this warns rather than blocks. It leans on [`cicd-semver-release-tags`](semver-release-tags.md)
as the anchor for what "the prior version" is.

---
id: qual-unit-test-coverage
title: Meet the unit-test coverage bar on new code
domain: Quality & Testing
severity: Strategic
enforcement: central
status: active
since: 0.1.0
tags: [testing, coverage, unit-tests]
---

## Rule

New and changed code **must** reach at least **80% coverage**, and a pull request **must not** lower
the repository's overall coverage. Coverage is measured on the diff (patch coverage), not by holding
the whole legacy codebase to the bar. Prefer **branch coverage** where the tooling supports it, and
exclude generated code and migrations.

## Rationale

Gating on the *diff* keeps new work well-tested without punishing a PR for pre-existing untested code —
which is what pushes people to game the metric. The no-regression rule ratchets overall coverage up
over time instead of letting it erode. Coverage is a **floor, not a guarantee**: it shows what code ran
under test, not that the assertions are meaningful — so treat the bar as necessary, not sufficient.

## Scope

Unit-tested application and service code. Generated code, migrations, and throwaway spikes are
excluded from the measurement.

## Exceptions

None by default — coverage tooling emits a percentage and the check blocks below the bar. A file that
genuinely can't be meaningfully unit-tested is excluded explicitly (with the exclusion visible in
config), not by lowering the global threshold. Broader deviations use the Phase-2 exception path.

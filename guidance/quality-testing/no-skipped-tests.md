---
id: qual-no-skipped-tests
title: No skipped, disabled, or focused tests merged
domain: Quality & Testing
severity: Strategic
enforcement: central
status: active
since: 0.1.0
tags: [testing, skip, focus, discipline]
---

## Rule

Tests **must not** be merged in a skipped or disabled state without a tracked reason, and focused-test
markers **must not** be merged at all:

- No `.skip` / `xit` / `@Ignore` / `@Disabled` without a linked issue explaining why and when it
  returns.
- No focused tests — `it.only`, `fdescribe`, `test.only` — ever, since they silently disable every
  other test in the file.

## Rationale

A skipped test is a hole in the suite that looks like coverage but isn't. A focused test is worse: it
quietly turns off its neighbors, so the suite passes while barely running. Requiring a tracked reason
for skips keeps them visible and temporary; banning focus markers prevents an accidental green build.

## Scope

Test code in application and service repositories.

## Exceptions

The ban on focus markers is absolute and blocks. A skip with a linked, tracked reason is allowed — that
annotation is the exception mechanism. Both are detectable by scanning test files, which is why this
blocks.

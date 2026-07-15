# Illustrative guidance (4 rules)

> **Not a catalog — a fixture.** Four rules, copied verbatim from the
> [53-rule sample](https://github.com/adam-flores/sample-org-engineering-config), kept here so the
> adapter always has something to render in tests, docs, and a quick local try. They are **not** an
> org's standards, and they are not meant to be adopted.

They were chosen for **axis coverage, not variety**: between them they produce every classification the
adapter can emit. That makes this set enough to demonstrate — and regression-test — the renderer.

| Rule | Severity | Enforcement point | Agent action | Renders as |
|---|---|---|---|---|
| [`sec-no-plaintext-secrets`](security-compliance/no-plaintext-secrets.md) | `Policy` | `ci-gate` | `enforce` | **BLOCK** |
| [`qual-no-skipped-tests`](quality-testing/no-skipped-tests.md) | `Strategic` | `ci-gate` | `enforce` | **BLOCK** |
| [`obs-data-classification`](observability-data/data-classification.md) | `Strategic` | `audit` | `aware` | **REQUIRED (unenforceable)** |
| [`obs-structured-logging`](observability-data/structured-logging.md) | `Handbook` | `audit` | `enforce` | **ADVISORY** |

What each one demonstrates:

- **`sec-no-plaintext-secrets`** — the only `Policy` rule here, so it's also the one carrying a
  `references` list (`SOC2 CC6.1`, `ISO 27001 A.9.2.3`, `NIST SP 800-53 IA-5`). Policy rules must map to
  an external control; this exercises that.
- **`qual-no-skipped-tests`** — blocks for a different reason: `Strategic`, not `Policy`. Both severities
  are *required*, and required + `ci-gate` is what blocks.
- **`obs-data-classification`** — *required but unenforceable*. `Strategic` (so: mandated) but caught at
  `audit` (so: no gate). The format states that honestly rather than demoting it to `Handbook`. Its
  `aware` action tells a coding agent it **cannot self-satisfy** this one — surface it, don't fake it.
- **`obs-structured-logging`** — recommended, not required, so it can't block no matter where it's
  caught. Note it's `audit` + `enforce`: same enforcement point as the rule above, different agent
  action. The agent fixes this one itself.

**A rule blocks only when it is required (`Policy`/`Strategic`) *and* its `enforcement_point` is
`ci-gate` or `managed-platform`** — so 2 of these 4 block.

## Render them

From the repo root:

```sh
node adapters/claude-code/build.mjs --source examples --out /path/to/some-project
```

Expect `✓ validated 4 rules (2 block)`.

The format these follow is defined in [`../../docs/GUIDANCE-SCHEMA.md`](../../docs/GUIDANCE-SCHEMA.md);
how to propose or change a rule is in [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md).

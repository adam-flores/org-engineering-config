#!/usr/bin/env node
// Claude Code adapter — renders the neutral guidance source into tool-native packaging:
// a `standards-review` skill (+ compiled rule catalog) and a `standards-enforcer` subagent.
//
//   node adapters/claude-code/build.mjs --out <projectDir>
//
// Writes only under <projectDir>/.claude/ — never the user's global ~/.claude profile.
// Dependency-free by design (the neutral source is the product; this is just packaging).

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..', '..');

// ---- taxonomy (mirrors docs/GUIDANCE-SCHEMA.md) ----
const DOMAIN_BY_SLUG = {
  'security-compliance': 'Security & Compliance',
  'architecture-tech-stack': 'Architecture & Tech Stack',
  'quality-testing': 'Quality & Testing',
  'delivery-ci-cd': 'Delivery & CI/CD',
  'observability-data': 'Observability & Data',
  'integrations-tooling': 'Integrations & Tooling',
  'developer-environment': 'Developer Environment',
};
const PREFIX_BY_SLUG = {
  'security-compliance': 'sec-', 'architecture-tech-stack': 'arch-', 'quality-testing': 'qual-',
  'delivery-ci-cd': 'cicd-', 'observability-data': 'obs-', 'integrations-tooling': 'integ-',
  'developer-environment': 'env-',
};
const SEVERITIES = ['Policy', 'Strategic', 'Handbook'];
const POINTS = ['coding-agent', 'pre-commit', 'ci-gate', 'managed-platform', 'human-review', 'audit', 'none'];
const ACTIONS = ['enforce', 'align', 'aware'];
const STATUSES = ['active', 'deprecated'];
const BLOCKING_POINTS = ['ci-gate', 'managed-platform'];

// ---- parsing ----
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    fm[mm[1]] = v;
  }
  return { fm, body: m[2] };
}

function ruleStatement(body) {
  const m = body.match(/##\s*Rule\s*\n+([\s\S]*?)(?:\n##\s|\s*$)/);
  return m ? m[1].trim().replace(/\s+/g, ' ') : '';
}

function isRequired(r) { return r.severity === 'Policy' || r.severity === 'Strategic'; }
function blocks(r) { return isRequired(r) && BLOCKING_POINTS.includes(r.enforcement_point); }
function classify(r) {
  if (blocks(r)) return 'BLOCK';
  if (BLOCKING_POINTS.includes(r.enforcement_point)) return 'WARN (CI, non-blocking)';
  if (isRequired(r)) return 'REQUIRED (unenforceable — review/culture)';
  return 'ADVISORY';
}

// ---- load + validate ----
function loadRules(sourceRoot) {
  const root = join(sourceRoot, 'guidance');
  const rules = [];
  const errors = [];
  const ids = new Map();
  for (const slug of Object.keys(DOMAIN_BY_SLUG)) {
    const dir = join(root, slug);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter(n => n.endsWith('.md') && n !== 'README.md')) {
      const rel = `guidance/${slug}/${f}`;
      const parsed = parseFrontmatter(readFileSync(join(dir, f), 'utf8'));
      if (!parsed) { errors.push(`${rel}: no valid frontmatter`); continue; }
      const { fm, body } = parsed;
      const req = ['id', 'title', 'domain', 'severity', 'enforcement_point', 'agent_action', 'status', 'since'];
      for (const k of req) if (fm[k] === undefined || fm[k] === '') errors.push(`${rel}: missing ${k}`);
      if (fm.severity && !SEVERITIES.includes(fm.severity)) errors.push(`${rel}: bad severity "${fm.severity}"`);
      if (fm.enforcement_point && !POINTS.includes(fm.enforcement_point)) errors.push(`${rel}: bad enforcement_point "${fm.enforcement_point}"`);
      if (fm.agent_action && !ACTIONS.includes(fm.agent_action)) errors.push(`${rel}: bad agent_action "${fm.agent_action}"`);
      if (fm.status && !STATUSES.includes(fm.status)) errors.push(`${rel}: bad status "${fm.status}"`);
      if (fm.domain && fm.domain !== DOMAIN_BY_SLUG[slug]) errors.push(`${rel}: domain "${fm.domain}" != folder "${DOMAIN_BY_SLUG[slug]}"`);
      if (fm.id && !fm.id.startsWith(PREFIX_BY_SLUG[slug])) errors.push(`${rel}: id "${fm.id}" missing prefix "${PREFIX_BY_SLUG[slug]}"`);
      if (fm.since && !/^\d+\.\d+\.\d+$/.test(fm.since)) errors.push(`${rel}: since "${fm.since}" not semver`);
      if (fm.severity === 'Policy' && !(Array.isArray(fm.references) && fm.references.length)) errors.push(`${rel}: Policy rule missing references`);
      if (fm.id) { if (ids.has(fm.id)) errors.push(`${rel}: duplicate id "${fm.id}" (also ${ids.get(fm.id)})`); else ids.set(fm.id, rel); }
      rules.push({
        id: fm.id, title: fm.title, domain: fm.domain, slug, severity: fm.severity,
        enforcement_point: fm.enforcement_point, agent_action: fm.agent_action,
        references: Array.isArray(fm.references) ? fm.references : [],
        status: fm.status, statement: ruleStatement(body),
      });
    }
  }
  return { rules, errors };
}

// ---- rendering ----
function renderRulesCatalog(rules) {
  const active = rules.filter(r => r.status === 'active');
  const L = [];
  L.push('# Compiled rule catalog');
  L.push('');
  L.push('> Generated by `adapters/claude-code/build.mjs` from the neutral guidance source. Do not edit by hand.');
  L.push('');
  L.push(`${active.length} active rules · ${active.filter(blocks).length} block (required + ci-gate/managed-platform).`);
  L.push('');
  L.push('Classification legend: **BLOCK** = must fix before merge · **WARN** = fix recommended ·');
  L.push('**REQUIRED (unenforceable)** = mandated but no gate, held by review/culture · **ADVISORY** = recommended.');
  L.push('');
  for (const slug of Object.keys(DOMAIN_BY_SLUG)) {
    const inDomain = active.filter(r => r.slug === slug);
    if (!inDomain.length) continue;
    L.push(`## ${DOMAIN_BY_SLUG[slug]}`);
    L.push('');
    for (const r of inDomain) {
      const refs = r.references.length ? ` · refs: ${r.references.join(', ')}` : '';
      L.push(`**${r.id}** — ${r.title}  `);
      L.push('`' + r.severity + '` · `' + r.enforcement_point + '` · agent: `' + r.agent_action + '` · ' + classify(r) + refs + '  ');
      L.push(`Rule: ${r.statement}`);
      L.push('');
    }
  }
  return L.join('\n');
}

const REVIEW_PROTOCOL = [
  'The compiled rule catalog is at `.claude/skills/standards-review/rules.md`. Read it first.',
  '',
  '### How to review',
  '',
  '1. **Scope.** Default to the current change: `git diff` plus staged (`git diff --cached`) and untracked files. If there is no diff, or the user asks, review the whole repository. State the scope you chose.',
  '2. **Gather evidence** with Read/Grep/Glob (and read-only Bash like `git diff`). Do not guess — cite `file:line`.',
  '3. **Check each rule** in the catalog against the code in scope.',
  '4. **Classify every finding** using the catalog:',
  '   - **BLOCK** — a violated rule tagged BLOCK (required **and** `ci-gate`/`managed-platform`). Must be fixed before merge.',
  '   - **WARN** — a violated Handbook or non-blocking rule. Fixing is recommended.',
  '   - **REQUIRED-unenforceable** — a violated required rule with no gate; surface it firmly, but it does not hard-block.',
  '5. **Use `agent_action` to know your role:**',
  '   - `enforce` — you should prevent/fix this as you write code; if violated, fix it now.',
  '   - `align` — make the code comply; the authoritative gate is elsewhere.',
  '   - `aware` — you cannot self-satisfy it (e.g. peer review, an audit); note it for humans, never claim it passes.',
  '6. **For `Policy` violations, cite the `references`** (control IDs) so the finding is traceable.',
  '',
  '### Report format',
  '',
  'Group findings: **BLOCK** first, then **WARN**, then **notes** (align/aware). For each finding give:',
  'rule `id`, title, `file:line`, what is wrong, and how to fix it. End with a one-line verdict:',
  '`PASS` (no BLOCK findings) or `BLOCKED — n blocking violation(s)`.',
].join('\n');

function renderSkill() {
  const fm = [
    '---',
    'name: standards-review',
    'description: Review the working tree or current diff against the organization\'s engineering standards. Reports blocking violations (required + centrally gated), warnings, and alignment/awareness notes, grouped and traceable. Use when asked to check code against org standards, before opening a PR, or to audit a repo for compliance.',
    'user-invocable: true',
    'allowed-tools:',
    '  - Read',
    '  - Grep',
    '  - Glob',
    '  - Bash(git diff*)',
    '  - Bash(git status*)',
    '---',
    '',
  ].join('\n');
  const body = [
    '# standards-review',
    '',
    'Review code against the organization\'s engineering standards — the neutral guidance source, compiled into this skill.',
    '',
    REVIEW_PROTOCOL,
    '',
    '---',
    '',
    'For a deeper, multi-file audit you can hand off to the `standards-enforcer` subagent, which follows the same protocol.',
    '',
  ].join('\n');
  return fm + body;
}

function renderAgent() {
  const fm = [
    '---',
    'name: standards-enforcer',
    'description: Use this agent to audit a codebase or a diff against the organization\'s engineering standards and report violations grouped by severity and enforcement. Trigger it for pre-PR compliance checks or a deep standards audit of a repo.',
    'tools: ["Read", "Grep", "Glob", "Bash"]',
    'model: inherit',
    '---',
    '',
  ].join('\n');
  const body = [
    'You are **standards-enforcer**, an auditor for the organization\'s engineering standards. Your job is to check code against the compiled rule catalog and report exactly what blocks, what warns, and what needs a human — never overstating a rule\'s teeth.',
    '',
    REVIEW_PROTOCOL,
    '',
    'Your final message is a report, not a conversation: lead with the verdict line, then the grouped findings.',
    '',
  ].join('\n');
  return fm + body;
}

// ---- write ----
function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log(`  wrote ${path}`);
}

function main() {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf('--out');
  if (outIdx === -1 || !args[outIdx + 1]) {
    console.error('usage: node adapters/claude-code/build.mjs --out <projectDir>');
    process.exit(2);
  }
  const outDir = resolve(args[outIdx + 1]);
  const srcIdx = args.indexOf('--source');
  const sourceRoot = srcIdx !== -1 && args[srcIdx + 1] ? resolve(args[srcIdx + 1]) : REPO_ROOT;
  const claudeDir = join(outDir, '.claude');
  // Guardrail: never write into the user's global ~/.claude profile.
  if (resolve(claudeDir) === resolve(homedir(), '.claude')) {
    console.error(`refusing to write to the global profile ${claudeDir}. Target a project directory instead.`);
    process.exit(2);
  }

  const { rules, errors } = loadRules(sourceRoot);
  if (errors.length) {
    console.error(`✗ validation failed (${errors.length}):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  const active = rules.filter(r => r.status === 'active');
  console.log(`✓ validated ${rules.length} rules (${active.filter(blocks).length} block)`);

  writeFile(join(claudeDir, 'skills', 'standards-review', 'rules.md'), renderRulesCatalog(rules));
  writeFile(join(claudeDir, 'skills', 'standards-review', 'SKILL.md'), renderSkill());
  writeFile(join(claudeDir, 'agents', 'standards-enforcer.md'), renderAgent());
  console.log(`✓ rendered standards-review skill + standards-enforcer agent into ${claudeDir}`);
}

main();

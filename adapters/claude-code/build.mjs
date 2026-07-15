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

// Static templates for the reviewer skill + agent. These are the canonical, hand-editable source;
// the adapter copies them verbatim and only *generates* the compiled rules.md catalog.
const TEMPLATES = join(HERE, 'templates');
const SKILL_TEMPLATE = join(TEMPLATES, 'skills', 'standards-review', 'SKILL.md');
const AGENT_TEMPLATE = join(TEMPLATES, 'agents', 'standards-enforcer.md');

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

// ---- write ----
function writeFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log(`  wrote ${path}`);
}

// Copy a static template verbatim (byte-for-byte) into the target project.
function copyTemplate(src, dest) {
  writeFile(dest, readFileSync(src, 'utf8'));
}

function main() {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf('--out');
  if (outIdx === -1 || !args[outIdx + 1]) {
    console.error('usage: node adapters/claude-code/build.mjs --source <guidanceRepo> --out <projectDir>');
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

  // Guardrail: an absent or empty source renders an empty catalog over the target's rules.md,
  // leaving a reviewer that passes everything. Fail instead of quietly disarming the consumer.
  const guidanceDir = join(sourceRoot, 'guidance');
  if (!existsSync(guidanceDir)) {
    console.error(`✗ no guidance/ directory at ${guidanceDir}`);
    console.error(`  Point --source at a guidance source. This repo holds the mechanism, not a rule-set:`);
    console.error(`    --source examples                          # the illustrative 4-rule set here`);
    console.error(`    --source ../sample-org-engineering-config  # an org's enacted standards`);
    process.exit(2);
  }

  const { rules, errors } = loadRules(sourceRoot);
  if (errors.length) {
    console.error(`✗ validation failed (${errors.length}):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  if (rules.length === 0) {
    console.error(`✗ ${guidanceDir} contains no rules`);
    console.error(`  Refusing to render an empty catalog: it would overwrite the target's rules.md and`);
    console.error(`  leave a reviewer that passes everything.`);
    process.exit(2);
  }
  const active = rules.filter(r => r.status === 'active');
  console.log(`✓ validated ${rules.length} rules (${active.filter(blocks).length} block)`);

  // Generate the compiled catalog; copy the skill + agent verbatim from the static templates.
  writeFile(join(claudeDir, 'skills', 'standards-review', 'rules.md'), renderRulesCatalog(rules));
  copyTemplate(SKILL_TEMPLATE, join(claudeDir, 'skills', 'standards-review', 'SKILL.md'));
  copyTemplate(AGENT_TEMPLATE, join(claudeDir, 'agents', 'standards-enforcer.md'));
  console.log(`✓ rendered standards-review skill + standards-enforcer agent into ${claudeDir}`);
}

main();

#!/usr/bin/env node
// Coverage gate: do the built pages of a lecture teach every ledger item?
//
//   node scripts/coverage.mjs <lecture-id> [--ledger <path>] [--html <path>] [--ignore-type t1,t2] [--strict] [--json]
//
//   <lecture-id>   e.g. lec01. A lecture is several pages: the overview dist/lectures/<id>/index.html and one page per
//                  chapter, dist/lectures/<id>/<chapter>/index.html. All of them are read together
//                  (run `npm run build` first). --html <file or directory> reads other built pages instead.
//   --ledger       ledger JSONL. Default: ../lectures/<id>/ledger/ledger.jsonl, then ../learn/<id>/ledger/ledger.jsonl
//                  (paths are relative to the repo root, i.e. the parent of site/).
//   --ignore-type  ledger types that need not appear on the page (e.g. admin_reference).
//   --strict       exit 1 if ANY item is missing (default: exit 1 only if a core item is missing).
//   --json         machine-readable report on stdout.
//
// Every element that teaches an item carries data-k="L-0001 L-0002" (components: k prop; MDX prose: a trailing
// [[L-0001 L-0002]] marker). Ids found in the page but not in the ledger are reported as unknown.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '..');
const repo = path.resolve(site, '..');

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const flag = (name) => args.includes(name);
const VALUED = new Set(['--ledger', '--html', '--ignore-type']);
const id = args.find((a, i) => !a.startsWith('--') && !VALUED.has(args[i - 1]));
if (!id) { console.error('usage: node scripts/coverage.mjs <lecture-id> [--ledger path] [--html path] [--ignore-type a,b] [--strict] [--json]'); process.exit(2); }

const resolveFromRepo = (p) => (path.isAbsolute(p) ? p : path.resolve(repo, p));
const ledgerPath = opt('--ledger')
  ? (fs.existsSync(path.resolve(opt('--ledger'))) ? path.resolve(opt('--ledger')) : resolveFromRepo(opt('--ledger')))
  : [`lectures/${id}/ledger/ledger.jsonl`, `learn/${id}/ledger/ledger.jsonl`].map(resolveFromRepo).find((p) => fs.existsSync(p));
const htmlPath = opt('--html') ? path.resolve(opt('--html')) : path.join(site, 'dist', 'lectures', id);
if (!ledgerPath || !fs.existsSync(ledgerPath)) { console.error(`ledger not found for ${id} (try --ledger <path>)`); process.exit(2); }
if (!fs.existsSync(htmlPath)) { console.error(`page not found: ${htmlPath} (run npm run build, or pass --html)`); process.exit(2); }

const ignore = new Set((opt('--ignore-type') ?? '').split(',').filter(Boolean));
const ledger = fs.readFileSync(ledgerPath, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
// every page of the lecture: the overview and each chapter page (any index.html under the lecture's directory)
const pages = [];
(function walk(p) {
  if (fs.statSync(p).isDirectory()) { for (const f of fs.readdirSync(p).sort()) walk(path.join(p, f)); }
  else if (p.endsWith('.html')) pages.push(p);
})(htmlPath);
if (!pages.length) { console.error(`no built pages under ${htmlPath} (run npm run build)`); process.exit(2); }
const htmlOf = new Map(pages.map((p) => [p, fs.readFileSync(p, 'utf8')]));
const html = [...htmlOf.values()].join('\n');

// every data-k on the page (attribute values are plain ids; no entities expected)
const onPage = new Map(); // id -> count
for (const m of html.matchAll(/data-k="([^"]*)"/g)) for (const k of m[1].split(/[\s,]+/).filter(Boolean)) onPage.set(k, (onPage.get(k) ?? 0) + 1);
const stray = (html.match(/\[\[\s*L-\d{4}[^\]]*\]\]/g) ?? []); // markers that were not converted

const known = new Set(ledger.map((x) => x.id));
const required = ledger.filter((x) => !ignore.has(x.type));
const missing = required.filter((x) => !onPage.has(x.id));
const unknown = [...onPage.keys()].filter((k) => !known.has(k));
const order = { core: 0, supporting: 1, aside: 2 };
missing.sort((a, b) => (order[a.importance] ?? 9) - (order[b.importance] ?? 9) || a.id.localeCompare(b.id));

const report = {
  lecture: id, ledger: path.relative(repo, ledgerPath), page: path.relative(repo, htmlPath),
  pages: pages.map((p) => {
    const ids = new Set([...htmlOf.get(p).matchAll(/data-k="([^"]*)"/g)].flatMap((m) => m[1].split(/[\s,]+/).filter(Boolean)));
    return { page: path.relative(repo, p), ids: ids.size };
  }),
  required: required.length, covered: required.length - missing.length,
  missing: missing.map((x) => ({ id: x.id, importance: x.importance, type: x.type, topic: x.topic, statement: x.statement })),
  unknown, unconvertedMarkers: stray,
};

if (flag('--json')) console.log(JSON.stringify(report, null, 2));
else {
  const pct = required.length ? ((100 * report.covered) / required.length).toFixed(1) : '100';
  console.log(`coverage ${id}: ${report.covered}/${required.length} ledger items on the page (${pct}%)${ignore.size ? `, ignoring ${[...ignore].join(', ')}` : ''}`);
  console.log(`  ledger ${report.ledger}\n  pages  ${report.page} (${pages.length})`);
  for (const p of report.pages) console.log(`         ${p.page}  ${p.ids} ids`);
  for (const imp of ['core', 'supporting', 'aside']) {
    const g = missing.filter((x) => x.importance === imp);
    if (!g.length) continue;
    console.log(`\nmissing ${imp} (${g.length})`);
    for (const x of g) console.log(`  ${x.id}  ${x.type.padEnd(15)} ${x.statement.slice(0, 110)}${x.statement.length > 110 ? '…' : ''}`);
  }
  if (unknown.length) console.log(`\nids on the page that are not in the ledger: ${unknown.join(' ')}`);
  if (stray.length) console.log(`\nunconverted [[…]] markers (wrap the MDX in <Prose>?): ${stray.slice(0, 5).join(' ')}`);
}
const fail = unknown.length > 0 || stray.length > 0 || (flag('--strict') ? missing.length > 0 : missing.some((x) => x.importance === 'core'));
process.exit(fail ? 1 : 0);

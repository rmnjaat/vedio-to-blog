#!/usr/bin/env node
// Link gate for the built site: every internal link, asset and #fragment must resolve.
//   node scripts/check-links.mjs [--dist dist] [--base /vedio-to-blog/]
// Reads every dist/**/*.html. Checks href, src and srcset values:
//   #id              an element with that id on the same page (#fig/step-3 checks #fig)
//   <base>path#id    the file dist/path (or dist/path/index.html) exists, and has the id
//   /path            not under the base: broken on GitHub Pages (a link that is not base-aware)
//   relative path    resolved against the page's URL, then checked as above
// External URLs (http:, https:, mailto:) are not fetched. A bare "#" is allowed (placeholder link).
// The base defaults to the `base` in astro.config.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const dist = path.resolve(site, opt('--dist') ?? 'dist');
const cfg = fs.readFileSync(path.join(site, 'astro.config.mjs'), 'utf8');
const base = (opt('--base') ?? /\bbase:\s*['"]([^'"]+)['"]/.exec(cfg)?.[1] ?? '/').replace(/\/?$/, '/');

const files = [];
(function walk(p) {
  for (const f of fs.readdirSync(p)) {
    const q = path.join(p, f);
    if (fs.statSync(q).isDirectory()) walk(q); else if (q.endsWith('.html')) files.push(q);
  }
})(dist);

const idCache = new Map();
const idsOf = (file) => {
  if (!idCache.has(file)) idCache.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idCache.get(file);
};
const urlOf = (file) => base + path.relative(dist, file).split(path.sep).join('/').replace(/index\.html$/, '');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#38;/g, '&');

let checked = 0;
const broken = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8').replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/g, '$1$2'); // skip inline script bodies
  const pageUrl = urlOf(file);
  const refs = [];
  for (const m of html.matchAll(/\s(href|src|component-url|renderer-url|before-hydration-url)="([^"]*)"/g)) refs.push(decode(m[2]));
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) for (const part of m[1].split(',')) refs.push(decode(part.trim().split(/\s+/)[0]));
  for (const ref of refs) {
    if (!ref || ref === '#' || /^(https?:|mailto:|data:|tel:|javascript:)/i.test(ref) || ref.startsWith('//')) continue;
    checked++;
    let target, hash;
    if (ref.startsWith('#')) { target = file; hash = ref.slice(1); }
    else {
      const u = new URL(ref, 'http://x' + pageUrl);
      hash = u.hash.slice(1);
      let p = decodeURIComponent(u.pathname);
      if (!p.startsWith(base)) { broken.push(`${urlOf(file)}: ${ref}  (outside the base ${base})`); continue; }
      p = p.slice(base.length);
      const cand = [path.join(dist, p), path.join(dist, p, 'index.html')];
      target = cand.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
      if (!target) { broken.push(`${urlOf(file)}: ${ref}  (no file)`); continue; }
    }
    if (hash) {
      const id = decodeURIComponent(hash).replace(/\/step-\d+$/, '');
      if (!target.endsWith('.html')) continue;
      if (!idsOf(target).has(id)) broken.push(`${urlOf(file)}: ${ref}  (no #${id} on ${urlOf(target)})`);
    }
  }
}
console.log(`check-links: ${files.length} pages, ${checked} internal links and assets checked under base ${base}`);
for (const b of broken) console.log('  BROKEN ' + b);
console.log(broken.length ? `${broken.length} broken` : 'ok: zero broken links');
process.exit(broken.length ? 1 : 0);

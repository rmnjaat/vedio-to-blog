#!/usr/bin/env node
// Figure legibility + layout gate for a built page, at phone width.
//   node scripts/check-figures.mjs <url> [--width 390]
// Reports every visible SVG <text> in a .fig-svg rendered below 12px, and horizontal page scroll.
// Needs Playwright (not a site dependency, to keep installs light): run with NODE_PATH pointing at a
// node_modules that has it, or `npm i -D playwright` locally. Serve the build first: `npm run preview`.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
let chromium;
for (const base of [import.meta.url, ...(process.env.NODE_PATH ?? '').split(':').filter(Boolean).map((d) => pathToFileURL(d + '/').href)]) {
  try { ({ chromium } = createRequire(base)('playwright')); break; } catch {}
}
if (!chromium) { console.error('playwright not found: install it (npm i -D playwright) or set NODE_PATH'); process.exit(2); }
const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
const width = Number(args[args.indexOf('--width') + 1]) || 390;
if (!url) { console.error('usage: node scripts/check-figures.mjs <url> [--width 390]'); process.exit(2); }

const browser = await chromium.launch();
let bad = 0;
try {
  for (const scheme of ['light', 'dark']) {
    const page = await (await browser.newContext({ viewport: { width, height: 844 }, colorScheme: scheme })).newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const r = await page.evaluate(() => {
      const small = [];
      for (const t of document.querySelectorAll('.fig-svg text')) {
        const svg = t.ownerSVGElement;
        if (!svg || !svg.getBoundingClientRect().width || getComputedStyle(svg).display === 'none' || svg.closest('[hidden]')) continue;
        if (t.closest('.fig-desk') && getComputedStyle(t.closest('.fig-desk')).display === 'none') continue;
        const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
        const px = parseFloat(t.getAttribute('font-size') || '0') * scale;
        if (px < 11.95) small.push(`${svg.dataset.fig ?? svg.closest('figure')?.id ?? '?'}: "${t.textContent}" ${px.toFixed(1)}px`);
      }
      return { small, sw: document.documentElement.scrollWidth, iw: innerWidth };
    });
    if (r.sw > r.iw) { bad++; console.log(`[${scheme}] horizontal scroll: ${r.sw} > ${r.iw}`); }
    for (const s of r.small) { bad++; console.log(`[${scheme}] small label ${s}`); }
    await page.context().close();
  }
} finally { await browser.close(); }
console.log(bad ? `${bad} problem(s)` : `ok: all figure labels >= 12px at ${width}px, no horizontal scroll`);
process.exit(bad ? 1 : 0);

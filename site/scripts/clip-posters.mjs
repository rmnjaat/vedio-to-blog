#!/usr/bin/env node
// Capture each clip's poster frame from a served build into public/clips/<id>/poster-{paper,blackboard}[-phone].png,
// so <AnimationClip> can put the poster in the static HTML (shown before hydration and without JS).
//   npm run build && npm run preview   (in another terminal)
//   node scripts/clip-posters.mjs http://localhost:4321/lectures/lec01/
//   npm run build                      (again, so the pages pick the images up)
// Re-run it whenever a clip's composition or posterFrame changes. Needs Playwright (see check-figures.mjs).
// HEAVY: run it under the machine lock (lectures/lec01/BUILD_BRIEF.md).
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
let chromium;
for (const base of [import.meta.url, ...(process.env.NODE_PATH ?? '').split(':').filter(Boolean).map((d) => pathToFileURL(d + '/').href)]) {
  try { ({ chromium } = createRequire(base)('playwright')); break; } catch {}
}
if (!chromium) { console.error('playwright not found: install it (npm i -D playwright) or set NODE_PATH'); process.exit(2); }
const url = process.argv[2];
if (!url) { console.error('usage: node scripts/clip-posters.mjs <page url>'); process.exit(2); }
const out = path.join(process.cwd(), 'public', 'clips');
const sep = url.includes('?') ? '&' : '?';

const browser = await chromium.launch();
try {
  for (const [vw, suffix] of [[1440, ''], [390, '-phone']]) for (const [scheme, theme] of [['light', 'paper'], ['dark', 'blackboard']]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: 900 }, colorScheme: scheme, deviceScaleFactor: vw === 1440 ? 1.31 : 2 });
    const page = await ctx.newPage();
    await page.goto(url + sep + 'capture-posters', { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    for (const fig of await page.$$('figure.clip:not(.pending)')) {
      const id = (await fig.getAttribute('id')).replace(/-fig$/, '');
      const hasPhone = await fig.$eval('.stage', (s) => s.classList.contains('has-phone'));
      if (suffix && !hasPhone) continue;
      await fig.scrollIntoViewIfNeeded();
      const stage = await fig.$('.stage');
      // wait for the live poster (Remotion Thumbnail) to draw something
      await page.waitForFunction((s) => s.querySelector('svg, canvas, div div'), stage, { timeout: 20000 });
      await page.waitForTimeout(1200);
      fs.mkdirSync(path.join(out, id), { recursive: true });
      const file = path.join(out, id, `poster-${theme}${suffix}.png`);
      await stage.screenshot({ path: file });
      console.log('wrote', path.relative(process.cwd(), file));
    }
    await ctx.close();
  }
} finally { await browser.close(); }

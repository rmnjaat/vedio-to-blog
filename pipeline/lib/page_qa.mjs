// Page QA + screenshots for one lecture of a built site served under its base (pipeline/bin/site.sh shots|qa runs it).
//   node pipeline/lib/page_qa.mjs <base-url, e.g. http://127.0.0.1:4399/vedio-to-blog/> <lecture-id> <outdir>
//        [--widths 1440,1024,390] [--sweep] [--pages overview,2-scaling] [--sample <file:// url of the design sample>]
// Generalised from lectures/lec01/qa/tools/{qa,layout_qa}.mjs. For every page of the lecture (the overview and each
// chapter page, found from the overview's chapter list) at every width, light and dark, it:
//   - checks: console errors / failed requests / HTTP >= 400, horizontal scroll, figure labels < 12px,
//     the three-column layout per width (nav, "On this page" rail, dropdown, menu button), current page in the nav
//   - walks every step-through (Next to the end, Home back), clicks every pause-and-think choice, plays every clip
//     and clicks its chapter chips (controls must mount)
//   - writes screenshots: <tag>-<page>-top/-mid/-end.png; with --sweep a viewport-by-viewport sweep
//     sweep/<tag>/<page>/NNN.png (1440 and 390 only); fig/<tag>-<figure id>.png for every figure (1440 + 390 light,
//     390 dark); step/<tag>-<id>-sN.png (1440 + 390 light); clip/<tag>-<id>-poster|playing.png
//   - report.json { failures: [...], notes: [...], pages: [...] } and report.txt; exit 1 when there are failures.
// Needs Playwright (NODE_PATH, see pipeline/bin/site.sh). HEAVY: run only under the machine lock.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

let chromium;
for (const base of [import.meta.url, ...(process.env.NODE_PATH ?? '').split(':').filter(Boolean).map((d) => pathToFileURL(d + '/').href)]) {
  try { ({ chromium } = createRequire(base)('playwright')); break; } catch {}
}
if (!chromium) { console.error('playwright not found (set NODE_PATH)'); process.exit(2); }

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const pos = args.filter((a, i) => !a.startsWith('--') && !['--widths', '--pages', '--sample'].includes(args[i - 1]));
const [baseUrl, lec, out] = pos;
if (!baseUrl || !lec || !out) { console.error('usage: page_qa.mjs <base-url> <lecture-id> <outdir> [--widths ..] [--sweep] [--pages ..] [--sample url]'); process.exit(2); }
const B = baseUrl.replace(/\/?$/, '/');
const widths = opt('--widths', '1440,1024,390').split(',').map(Number);
const sweep = args.includes('--sweep');
const onlyPages = opt('--pages', '') ? opt('--pages').split(',') : null;
const sample = opt('--sample', '');
fs.mkdirSync(out, { recursive: true });
const failures = [], notes = [];
const fail = (s) => failures.push(s);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const IGNORE_CONSOLE = /remotion.*licen[cs]e|acknowledgeRemotionLicense|fonts\.g/i;

const browser = await chromium.launch();
async function newPage(width, scheme, errors) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error' && !IGNORE_CONSOLE.test(m.text())) errors.push(`console error: ${m.text().slice(0, 300)}`); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message.slice(0, 300)));
  page.on('requestfailed', (r) => { if (!r.url().includes('fonts.g')) errors.push('requestfailed: ' + r.url()); });
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().includes('fonts.g')) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  return page;
}
const vis = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return getComputedStyle(e).display !== 'none' && r.width > 0 && r.height > 0; }, sel);

const pagesSeen = [];
try {
  // discover the lecture's pages from the overview's chapter list
  const L = B + `lectures/${lec}/`;
  const probe = await (await browser.newContext()).newPage();
  const resp = await probe.goto(L, { waitUntil: 'load' });
  if (!resp || resp.status() >= 400) throw new Error(`overview not served: ${L} (${resp?.status()})`);
  const chapterUrls = await probe.evaluate((l) => [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href)
    .filter((h) => h.startsWith(l) && h !== l && !h.includes('#')).map((h) => h.replace(/[?#].*$/, '')))], L);
  await probe.context().close();
  let PAGES = [{ name: 'overview', url: L }, ...chapterUrls.map((u) => ({ name: u.slice(L.length).replace(/\/$/, ''), url: u }))];
  if (onlyPages) PAGES = PAGES.filter((p) => onlyPages.includes(p.name));
  notes.push(`pages: ${PAGES.map((p) => p.name).join(', ')}`);

  for (const width of widths) for (const scheme of ['light', 'dark']) {
    const tag = `${width}-${scheme}`;
    const errors = [];
    const page = await newPage(width, scheme, errors);
    const keyShots = (width === 1440 || width === 390);
    for (const { name, url } of PAGES) {
      await page.goto(url, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await sleep(300);
      const r = await page.evaluate(() => {
        const small = [];
        for (const t of document.querySelectorAll('.fig-svg text')) {
          const svg = t.ownerSVGElement;
          if (!svg || !svg.getBoundingClientRect().width) continue;
          let hidden = false; for (let e = svg; e; e = e.parentElement) if (getComputedStyle(e).display === 'none' || e.hidden) { hidden = true; break; }
          if (hidden) continue;
          const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
          const px = parseFloat(t.getAttribute('font-size') || '0') * scale;
          if (px < 11.95) small.push(`${svg.dataset.fig ?? svg.closest('figure')?.id ?? '?'}: "${t.textContent}" ${px.toFixed(1)}px`);
        }
        const wide = [];
        for (const e of document.querySelectorAll('main *')) {
          const b = e.getBoundingClientRect();
          if (b.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed') { wide.push((e.id || String(e.className) || e.tagName).slice(0, 60)); if (wide.length > 6) break; }
        }
        return { small, sw: document.documentElement.scrollWidth, iw: innerWidth, wide, h: document.documentElement.scrollHeight };
      });
      pagesSeen.push({ tag, name, height: r.h });
      if (r.sw > r.iw) fail(`[${tag}] ${name}: horizontal scroll ${r.sw} > ${r.iw} (${r.wide.join(' | ')})`);
      for (const s of r.small) fail(`[${tag}] ${name}: small figure label ${s}`);
      // three-column layout
      const got = [await vis(page, '.docs-nav'), await vis(page, '.docs-otp'), await vis(page, '.otp-bar'), await vis(page, '#menu-btn')];
      const want = width >= 1280 ? [true, true, false, false] : width >= 1024 ? [true, false, true, false] : [false, false, true, true];
      if (name !== 'overview' && got.join() !== want.join()) fail(`[${tag}] ${name}: nav/otp/dropdown/menu visible ${got} want ${want}`);
      const cur = await page.evaluate(() => document.querySelector('.docs-nav a[aria-current="page"]')?.getAttribute('href'));
      if (cur !== new URL(url).pathname) fail(`[${tag}] ${name}: course nav marks ${cur} as current, not ${new URL(url).pathname}`);
      await page.addStyleTag({ content: '*{scroll-behavior:auto!important}' });
      await page.screenshot({ path: `${out}/${tag}-${name}-top.png` });
      // viewport sweep (what a reader sees, screen by screen)
      if (sweep && keyShots) {
        const dir = path.join(out, 'sweep', tag, name); fs.mkdirSync(dir, { recursive: true });
        const vh = width < 600 ? 844 : 900;
        for (let y = 0, n = 0; y < r.h && n < 400; y += vh - 80, n++) {
          await page.evaluate((yy) => window.scrollTo(0, yy), y); await sleep(120);
          await page.screenshot({ path: path.join(dir, `${String(n).padStart(3, '0')}.png`) });
        }
      }
      // figures (static)
      if (keyShots && (scheme === 'light' || width === 390)) {
        fs.mkdirSync(path.join(out, 'fig'), { recursive: true });
        for (const f of await page.$$('main figure[id]:not(.clip)')) {
          const id = await f.getAttribute('id');
          if (!(await f.isVisible())) continue;
          await f.scrollIntoViewIfNeeded(); await sleep(60);
          await f.screenshot({ path: path.join(out, 'fig', `${tag}-${id}.png`) }).catch(() => {});
        }
        for (const t of await page.$$('main aside.think')) {
          const i = (await page.$$('main aside.think')).indexOf(t);
          await t.scrollIntoViewIfNeeded();
          await t.screenshot({ path: path.join(out, 'fig', `${tag}-${name}-think${i + 1}-before.png`) }).catch(() => {});
        }
      }
      // step-throughs
      for (const f of await page.$$('figure.stepper-fig')) {
        const id = await f.getAttribute('id');
        const total = Number(await f.getAttribute('data-total'));
        await f.scrollIntoViewIfNeeded();
        for (let i = 1; i <= total; i++) {
          if (i > 1) { const nx = await f.$('[data-next]'); if (!nx) { fail(`[${tag}] ${name} ${id}: no Next button`); break; } await nx.click(); await sleep(450); } // let the .2–.25s step opacity transition finish before the shot
          const cnt = (await (await f.$('.counter'))?.textContent())?.trim();
          if (cnt !== `${i} / ${total}`) fail(`[${tag}] ${name} ${id}: counter "${cnt}" at step ${i}`);
          if (keyShots && scheme === 'light') { fs.mkdirSync(path.join(out, 'step'), { recursive: true }); await f.screenshot({ path: path.join(out, 'step', `${tag}-${id}-s${i}.png`) }).catch(() => {}); }
        }
        const wrap = await f.$('.lag-wrap'); if (wrap) { await wrap.focus(); await page.keyboard.press('Home'); }
        const back = (await (await f.$('.counter'))?.textContent())?.trim() ?? '';
        if (!back.startsWith('1 /')) fail(`[${tag}] ${name} ${id}: Home key did not return to step 1`);
      }
      // pause-and-think
      let ti = 0;
      for (const t of await page.$$('main aside.think')) {
        ti++;
        await t.scrollIntoViewIfNeeded();
        for (const b of await t.$$('[data-correct]')) await b.click();
        const hidden = await t.$eval('.answer', (a) => a.hidden).catch(() => true);
        if (hidden) fail(`[${tag}] ${name}: pause-and-think ${ti} answer stayed hidden after choosing`);
        if (keyShots && (scheme === 'light' || width === 390)) await t.screenshot({ path: path.join(out, 'fig', `${tag}-${name}-think${ti}-after.png`) }).catch(() => {});
      }
      // clips
      for (const c of await page.$$('figure.clip')) {
        const id = await c.getAttribute('id');
        await c.scrollIntoViewIfNeeded(); await sleep(900);
        fs.mkdirSync(path.join(out, 'clip'), { recursive: true });
        if (keyShots) await c.screenshot({ path: path.join(out, 'clip', `${tag}-${id}-poster.png`) }).catch(() => {});
        if (await c.evaluate((e) => e.classList.contains('pending'))) { fail(`[${tag}] ${name} ${id}: clip is a pending placeholder`); continue; }
        const play = await c.$('button.play');
        if (!play) { fail(`[${tag}] ${name} ${id}: no play button (island not hydrated?)`); continue; }
        await play.click(); await sleep(1800);
        if (keyShots) await c.screenshot({ path: path.join(out, 'clip', `${tag}-${id}-playing.png`) }).catch(() => {});
        for (const ch of await c.$$('.chips button')) { await ch.click(); await sleep(250); }
        if (!(await c.$('.clip-controls'))) fail(`[${tag}] ${name} ${id}: controls never mounted after Play`);
        const pause = await c.$('.ctl-play'); if (pause && (await pause.getAttribute('aria-label')) === 'Pause clip') await pause.click();
      }
      // mid and end of the page
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2)); await sleep(250);
      await page.screenshot({ path: `${out}/${tag}-${name}-mid.png` });
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await sleep(250);
      await page.screenshot({ path: `${out}/${tag}-${name}-end.png` });
    }
    for (const e of [...new Set(errors)]) fail(`[${tag}] ${e}`);
    await page.context().close();
  }
  if (sample) for (const width of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto(sample, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${out}/sample-${width}-full.png`, fullPage: true });
    await ctx.close();
  }
} catch (e) {
  fail('page_qa crashed: ' + (e?.stack ?? e));
} finally { await browser.close(); }
const report = { lecture: lec, failures, notes, pages: pagesSeen };
fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 1));
fs.writeFileSync(path.join(out, 'report.txt'), [...notes, ...failures.map((f) => 'FAIL ' + f), failures.length ? `${failures.length} failure(s)` : 'ok: no failures'].join('\n') + '\n');
console.log(notes.join('\n')); for (const f of failures.slice(0, 60)) console.log('FAIL ' + f);
console.log(failures.length ? `${failures.length} failure(s)` : 'ok: no failures');
process.exit(failures.length ? 1 : 0);

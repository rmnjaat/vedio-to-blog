// Layout QA for the chapter-split lecture site served under /vedio-to-blog/.
// usage: NODE_PATH=… node layout_qa.mjs <origin> <outdir> [widths]
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(process.env.NODE_PATH + '/');
const { chromium } = require('playwright');
const [origin, out, widthsArg] = process.argv.slice(2);
const widths = (widthsArg ?? '1440,1024,390').split(',').map(Number);
const B = origin + '/vedio-to-blog/';
const L = B + 'lectures/lec01/';
const CH = ['1-caching', '2-scaling', '3-delegation', '4-concurrency', '5-communication', '6-what-to-keep'];
const PAGES = [B, L, ...CH.map((c) => L + c + '/')];
fs.mkdirSync(out, { recursive: true });
const log = [];
const fail = (s) => { log.push('FAIL ' + s); };
const ok = (s) => log.push('ok   ' + s);
const browser = await chromium.launch();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(width, scheme, errors) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console error: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => { if (!r.url().includes('fonts.g')) errors.push('requestfailed: ' + r.url()); });
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().includes('fonts.g')) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  return page;
}
const vis = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return getComputedStyle(e).display !== 'none' && r.width > 0 && r.height > 0; }, sel);

try {
  for (const width of widths) for (const scheme of ['light', 'dark']) {
    const tag = `${width}-${scheme}`;
    const errors = [];
    const page = await newPage(width, scheme, errors);
    for (const url of PAGES) {
      const name = url.replace(B, '').replace(/\/$/, '').replace(/\//g, '_') || 'home';
      await page.goto(url, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
      if (r.sw > r.iw) fail(`[${tag}] ${name}: horizontal scroll ${r.sw} > ${r.iw}`);
      if (name === 'home') { await page.screenshot({ path: `${out}/${tag}-${name}.png` }); continue; }
      // layout per width
      const nav = await vis(page, '.docs-nav'), otp = await vis(page, '.docs-otp'), drop = await vis(page, '.otp-bar'), menu = await vis(page, '#menu-btn');
      const want = width >= 1280 ? [true, true, false, false] : width >= 1024 ? [true, false, true, false] : [false, false, true, true];
      const got = [nav, otp, drop, menu];
      if (got.join() !== want.join()) fail(`[${tag}] ${name}: nav/otp/drop/menu visible ${got} want ${want}`);
      // nav content
      const n = await page.evaluate(() => {
        const s = document.querySelector('.docs-nav');
        return { lec: s.querySelectorAll('.cn-lec').length, soon: s.querySelectorAll('.cn-lec.soon').length, soonLinks: s.querySelectorAll('.cn-lec.soon a').length,
          ch: s.querySelectorAll('.cn-ch a').length, cur: s.querySelector('a[aria-current="page"]')?.getAttribute('href') };
      });
      if (n.lec !== 10 || n.soon !== 9 || n.soonLinks || n.ch !== 6 || n.cur !== new URL(url).pathname) fail(`[${tag}] ${name}: nav ${JSON.stringify(n)}`);
      await page.screenshot({ path: `${out}/${tag}-${name}-top.png` });
      // scrollspy: jump to the middle section and the last one
      const secs = await page.evaluate(() => [...document.querySelectorAll('.otp-list')[0].querySelectorAll('a[data-spy]')].map((a) => a.dataset.spy));
      for (const id of [secs[Math.floor(secs.length / 2)], secs[secs.length - 1]]) {
        if (!id) continue;
        await page.evaluate((i) => { const e = document.getElementById(i); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 140); }, id);
        await sleep(250);
        const s = await page.evaluate(() => ({
          cur: [...document.querySelectorAll('.otp-list a[aria-current="true"]')].map((a) => a.dataset.spy),
          lbl: document.getElementById('otp-cur')?.textContent, crumb: document.getElementById('crumb-here')?.textContent,
          prog: document.getElementById('prog')?.style.width,
        }));
        if (!s.cur.length || s.cur.some((c) => c !== id)) fail(`[${tag}] ${name}: scrollspy at #${id} marks ${s.cur}`);
        else if (width === 1440 && scheme === 'light' || width === 390) ok(`[${tag}] ${name}: scrollspy #${id} · dropdown "${s.lbl}" · crumb "${s.crumb}" · progress ${s.prog}`);
      }
      // a mid-page screenshot (rails, sticky dropdown)
      if (secs.length > 2) {
        const id = secs[Math.floor(secs.length / 2)];
        await page.evaluate((i) => { const e = document.getElementById(i); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 100); }, id);
        await sleep(250);
        await page.screenshot({ path: `${out}/${tag}-${name}-mid.png` });
      }
      // the end of the page: section end, pager, footer
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await sleep(250);
      await page.screenshot({ path: `${out}/${tag}-${name}-end.png` });
      // step-throughs
      for (const f of await page.$$('figure.stepper-fig')) {
        const id = await f.getAttribute('id'), total = Number(await f.getAttribute('data-total'));
        await f.scrollIntoViewIfNeeded();
        for (let i = 2; i <= total; i++) await (await f.$('[data-next]')).click();
        const cnt = (await (await f.$('.counter')).textContent()).trim();
        if (cnt !== `${total} / ${total}`) fail(`[${tag}] ${name} ${id}: counter "${cnt}"`);
      }
      // clips: play the first one on the page
      const play = await page.$('.clip-player .play');
      if (play && scheme === 'light') {
        await play.scrollIntoViewIfNeeded(); await play.click();
        await sleep(2500);
        const t = await page.evaluate(() => document.querySelector('.clip-player .ctl-time')?.textContent);
        if (!t || t.startsWith('0:00 ')) fail(`[${tag}] ${name}: clip did not advance (${t})`); else ok(`[${tag}] ${name}: clip plays (${t})`);
        await page.screenshot({ path: `${out}/${tag}-${name}-clip.png` });
      }
    }
    // pager: from chapter 2, next goes to chapter 3, prev to chapter 1; chapter 6 next is "Lecture 02 · coming soon"
    await page.goto(L + '2-scaling/');
    await (await page.$('.pager a.pg-next')).click(); await page.waitForLoadState('load');
    if (!page.url().endsWith('3-delegation/')) fail(`[${tag}] pager next -> ${page.url()}`);
    await (await page.$('.pager a.pg-prev')).click(); await page.waitForLoadState('load');
    if (!page.url().endsWith('2-scaling/')) fail(`[${tag}] pager prev -> ${page.url()}`);
    await page.goto(L + '6-what-to-keep/');
    const last = await page.evaluate(() => document.querySelector('.pager .pg-next')?.textContent.replace(/\s+/g, ' ').trim());
    if (!/Next lecture.*Lecture 02 · coming soon/.test(last ?? '')) fail(`[${tag}] last chapter next = ${last}`); else ok(`[${tag}] last chapter next: ${last}`);
    // cross-chapter link: §6 list item → §2.4 on the scaling page
    await page.locator('main a[href$="2-scaling/#s2-4"]:visible').first().click(); await page.waitForLoadState('load'); await sleep(300);
    const landed = await page.evaluate(() => ({ url: location.pathname + location.hash, top: Math.round(document.getElementById('s2-4').getBoundingClientRect().top) }));
    if (!landed.url.endsWith('2-scaling/#s2-4') || landed.top < 0 || landed.top > 200) fail(`[${tag}] cross-chapter link landed ${JSON.stringify(landed)}`); else ok(`[${tag}] cross-chapter link → ${landed.url} (top ${landed.top}px)`);
    // narrow: dropdown and drawer
    if (width < 1280) {
      await page.goto(L + '1-caching/');
      await page.click('#otp-drop summary'); await sleep(200);
      await page.screenshot({ path: `${out}/${tag}-dropdown-open.png` });
      const target = await page.evaluate(() => [...document.querySelectorAll('#otp-drop a[data-spy]')][4].dataset.spy);
      await page.click(`#otp-drop a[data-spy="${target}"]`); await sleep(400);
      const d = await page.evaluate(() => ({ open: document.getElementById('otp-drop').open, hash: location.hash, cur: document.getElementById('otp-cur').textContent }));
      if (d.open || d.hash !== '#' + target) fail(`[${tag}] dropdown link: ${JSON.stringify(d)}`); else ok(`[${tag}] dropdown → #${target}, label "${d.cur}"`);
      await page.screenshot({ path: `${out}/${tag}-dropdown-after.png` });
    }
    if (width < 1024) {
      await page.goto(L + '3-delegation/');
      await page.click('#menu-btn'); await sleep(300);
      const open = await page.evaluate(() => document.getElementById('drawer').open);
      if (!open) fail(`[${tag}] drawer did not open`);
      await page.screenshot({ path: `${out}/${tag}-drawer.png` });
      await page.keyboard.press('Escape'); await sleep(100);
      if (await page.evaluate(() => document.getElementById('drawer').open)) fail(`[${tag}] drawer did not close on Escape`);
      await page.click('#menu-btn'); await sleep(200);
      await page.click('#drawer a[href$="5-communication/"]'); await page.waitForLoadState('load');
      if (!page.url().endsWith('5-communication/')) fail(`[${tag}] drawer link -> ${page.url()}`); else ok(`[${tag}] drawer → chapter 5`);
    }
    for (const e of [...new Set(errors)]) fail(`[${tag}] ${e}`);
    await page.context().close();
  }
  // 360px: no horizontal scroll anywhere, drawer + dropdown
  {
    const errors = [];
    const page = await newPage(360, 'light', errors);
    for (const url of PAGES) {
      await page.goto(url, { waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready);
      const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
      if (r.sw > r.iw) fail(`[360] ${url}: horizontal scroll ${r.sw} > ${r.iw}`);
    }
    await page.goto(L + '2-scaling/'); await page.screenshot({ path: `${out}/360-light-2-scaling-top.png` });
    ok('[360] horizontal scroll checked on all pages');
    for (const e of [...new Set(errors)]) fail(`[360] ${e}`);
    await page.context().close();
  }
} finally { await browser.close(); }
fs.writeFileSync(out + '/report.txt', log.join('\n') + '\n');
console.log(log.join('\n'));
console.log(log.filter((l) => l.startsWith('FAIL')).length + ' failure(s)');

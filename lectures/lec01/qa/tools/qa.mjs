// QA pass for the lec01 page: per-section screenshots at 1440/390 light/dark, every interaction exercised,
// console errors, horizontal scroll, figure label sizes. Usage: node qa.mjs <url> <outdir> [widths]
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(process.env.NODE_PATH + '/');
const { chromium } = require('playwright');
const [url, out, widthsArg] = process.argv.slice(2);
const widths = (widthsArg ?? '1440,390').split(',').map(Number);
fs.mkdirSync(out, { recursive: true });
const report = [];
const browser = await chromium.launch();
try {
  for (const width of widths) for (const scheme of ['light', 'dark']) {
    const tag = `${width}-${scheme}`;
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    page.on('requestfailed', (r) => { if (!r.url().includes('fonts.g')) errors.push('requestfailed: ' + r.url()); });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    // open every collapsible so screenshots show all content
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    // labels and scroll
    const lab = await page.evaluate(() => {
      const small = [];
      for (const t of document.querySelectorAll('.fig-svg text')) {
        const svg = t.ownerSVGElement;
        if (!svg || !svg.getBoundingClientRect().width || svg.closest('[hidden]')) continue;
        let hiddenAnc = false; for (let e = svg; e; e = e.parentElement) if (getComputedStyle(e).display === 'none') { hiddenAnc = true; break; }
        if (hiddenAnc) continue;
        const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
        const px = parseFloat(t.getAttribute('font-size') || '0') * scale;
        if (px < 11.95) small.push(`${svg.dataset.fig ?? svg.closest('figure')?.id ?? '?'}: "${t.textContent}" ${px.toFixed(1)}px`);
      }
      // any element wider than the viewport
      const wide = [];
      for (const e of document.querySelectorAll('main *')) {
        const r = e.getBoundingClientRect();
        if (r.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed') { wide.push((e.id || e.className || e.tagName).toString().slice(0, 60) + ' ' + Math.round(r.right)); if (wide.length > 8) break; }
      }
      return { small, sw: document.documentElement.scrollWidth, iw: innerWidth, wide };
    });
    // step-throughs: walk every one to the end, screenshot each step of each
    const steppers = await page.$$('figure.stepper-fig');
    let stepShots = 0;
    for (const f of steppers) {
      const id = await f.getAttribute('id');
      const total = Number(await f.getAttribute('data-total'));
      await f.scrollIntoViewIfNeeded();
      for (let i = 1; i <= total; i++) {
        if (i > 1) await (await f.$('[data-next]')).click();
        const cnt = await (await f.$('.counter')).textContent();
        if (cnt.trim() !== `${i} / ${total}`) report.push(`[${tag}] ${id}: counter "${cnt}" at step ${i}`);
        if (width === 1440 && scheme === 'light' || width === 390 && scheme === 'light') { await f.screenshot({ path: `${out}/${tag}-${id}-step${i}.png` }); stepShots++; }
      }
      // keyboard back to start
      await (await f.$('.lag-wrap')).focus(); await page.keyboard.press('Home');
      const cnt = await (await f.$('.counter')).textContent();
      if (!cnt.startsWith('1 /')) report.push(`[${tag}] ${id}: Home key failed`);
    }
    // pause-and-think: click the wrong then the right choice
    const thinks = await page.$$('aside.think');
    for (const t of thinks) {
      await t.scrollIntoViewIfNeeded();
      const btns = await t.$$('[data-correct]');
      for (const b of btns) await b.click();
      const hidden = await t.$eval('.answer', (a) => a.hidden);
      if (hidden) report.push(`[${tag}] think answer stayed hidden`);
    }
    // clips: play each, let it run 1.5 s, click each chapter chip
    const clips = await page.$$('figure.clip');
    for (const c of clips) {
      const id = await c.getAttribute('id');
      await c.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      const play = await c.$('button.play');
      if (!play) { report.push(`[${tag}] ${id}: no play button (island not hydrated?)`); continue; }
      await play.click();
      await page.waitForTimeout(1500);
      const chips = await c.$$('.chips button');
      for (const ch of chips) { await ch.click(); await page.waitForTimeout(250); }
      const hasPlayer = await c.$('.clip-controls');
      if (!hasPlayer) report.push(`[${tag}] ${id}: controls never mounted after Play`);
      const pause = await c.$('.ctl-play'); if (pause) { const l = await pause.getAttribute('aria-label'); if (l === 'Pause clip') await pause.click(); }
      if (width === 1440 && scheme === 'light' || width === 390) await c.screenshot({ path: `${out}/${tag}-${id}-playing.png` });
    }
    // theme toggle round trip
    await page.click('#theme'); await page.waitForTimeout(150); await page.click('#theme');
    await page.evaluate(() => { try { localStorage.removeItem('wb-theme'); } catch {} delete document.documentElement.dataset.theme; });
    // reset steppers to the last step? keep step 1 for section shots
    await page.evaluate(() => scrollTo(0, 0));
    // per-section screenshots (header block + each article); unstick the bar and hide the rail so nothing overlays
    await page.addStyleTag({ content: '.bar{position:static!important}.rail{display:none!important}' });
    const header = await page.$('.col.lecture');
    if (header) await header.screenshot({ path: `${out}/${tag}-00-header.png` });
    const firstCol = await page.$$('main > .col');
    const secs = await page.$$('article.section');
    let n = 0;
    for (const s of secs) {
      const id = await s.getAttribute('id');
      await s.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      await s.screenshot({ path: `${out}/${tag}-${String(++n).padStart(2, '0')}-${id}.png` });
    }
    // the s0 header block
    const intro = await page.$('main .col:not(.lecture):not(.section)');
    if (intro) await intro.screenshot({ path: `${out}/${tag}-00b-intro.png` });
    report.push(`[${tag}] sections ${secs.length}, steppers ${steppers.length}, thinks ${thinks.length}, clips ${clips.length}, stepShots ${stepShots}`);
    if (lab.sw > lab.iw) report.push(`[${tag}] HORIZONTAL SCROLL ${lab.sw} > ${lab.iw}: ${lab.wide.join(' | ')}`);
    for (const s of lab.small) report.push(`[${tag}] small label ${s}`);
    for (const e of errors) report.push(`[${tag}] console ${e}`);
    await ctx.close();
  }
  // the design sample's §2.4, for the side-by-side comparison
  if (process.env.SAMPLE) for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto(process.env.SAMPLE, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '.bar{position:static!important}.rail{display:none!important}' });
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    const secs = await page.$$('article');
    let n = 0;
    for (const s of secs) { await s.scrollIntoViewIfNeeded(); await s.screenshot({ path: `${out}/sample-${width}-${++n}.png` }); }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(`${out}/report.txt`, report.join('\n') + '\n');
console.log(report.join('\n'));

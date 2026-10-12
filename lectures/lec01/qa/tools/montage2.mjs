// slice full section screenshots into tiles (exact offsets) and lay `per` tiles side by side per sheet
import { createRequire } from 'node:module'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire(process.env.NODE_PATH + '/'); const { chromium } = require('playwright');
const [dir, pat, out, per = '4', x0 = '0', w = '390', h = '1500'] = process.argv.slice(2);
const re = new RegExp(pat);
const files = fs.readdirSync(dir).filter((f) => re.test(f)).sort();
fs.mkdirSync(out, { recursive: true });
const tiles = [];
for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f)); const H = buf.readUInt32BE(20);
  for (let y = 0; y < H; y += +h) tiles.push({ f, y, hh: Math.min(+h, H - y) });
}
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: (+w + 8) * +per, height: +h + 30 } });
for (let i = 0; i < tiles.length; i += +per) {
  const g = tiles.slice(i, i + +per);
  const html = `<body style="margin:0;display:flex;gap:8px;align-items:flex-start;background:#888;font:12px sans-serif">${g.map((t) => `<div><div style="height:22px;color:#fff">${t.f} @${t.y}</div><div style="width:${w}px;height:${t.hh}px;overflow:hidden;position:relative"><img src="file://${path.resolve(dir, t.f)}" style="position:absolute;left:-${x0}px;top:-${t.y}px"></div></div>`).join('')}</body>`;
  fs.writeFileSync(out + '/t.html', html);
  await p.goto('file://' + path.resolve(out, 't.html'));
  await p.screenshot({ path: `${out}/sheet-${String(i / +per + 1).padStart(3, '0')}.png`, fullPage: true });
}
await b.close();
console.log(tiles.length, 'tiles');

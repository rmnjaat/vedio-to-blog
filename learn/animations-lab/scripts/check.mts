// Render-check: renders the storyboard's stills for one clip (light + dark), then builds
//   - a contact sheet at full size (inspect composition, timing, colours)
//   - a contact sheet at phone width (358 px per frame = 390 px viewport − 2×16 px gutters)
// Usage:  node scripts/check.mts l01-replica-lag [--light-only] [--phone] [--frames=116,348] [--mp4]
//   --mp4 renders one preview mp4 to renders/<id>/<id>[-phone].mp4 instead of stills.
//   --phone renders the portrait phone composition (<id>-phone) and sizes its sheet at 358 px wide.
//   The "full" sheet of the wide layout is at 540 px: the size the site shows it on desktop.
// Needs: ffmpeg on PATH. Renders run one at a time with --concurrency=1 (keep the laptop responsive).
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {mkdirSync, existsSync, readdirSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const clip = process.argv[2];
if (!clip) throw new Error('usage: node scripts/check.mts <clip-id>');
const lightOnly = process.argv.includes('--light-only');
const phone = process.argv.includes('--phone');
const mp4 = process.argv.includes('--mp4');
const only = process.argv.find((a) => a.startsWith('--frames='))?.slice(9).split(',').map(Number);

const {STILLS} = (await import(join(root, 'src/clips', clip, 'timeline.ts'))) as {STILLS: {name: string; frame: number}[]};
const stills = only ? only.map((f) => ({name: `f${f}`, frame: f})) : STILLS;
const out = join(root, 'renders', clip, 'stills');
mkdirSync(out, {recursive: true});

// Bundle a one-clip entry (src/.entries/<clip>.tsx, generated): other clips, possibly half-written by a parallel
// lecture, are never compiled. Bundle once, reuse one browser for every still (much lighter than one CLI call per frame).
const comp = readdirSync(join(root, 'src/clips', clip)).filter((f) => /^[A-Z].*\.tsx$/.test(f));
if (comp.length !== 1) throw new Error(`src/clips/${clip}/ needs exactly one capitalised component file, found: ${comp.join(', ') || 'none'}`);
mkdirSync(join(root, 'src/.entries'), {recursive: true});
const entry = join(root, 'src/.entries', `${clip}.tsx`);
writeFileSync(entry, `import React from 'react';
import {registerRoot} from 'remotion';
import '../fonts';
import {compositionsFor} from '../compositions';
import {META} from '../clips/${clip}/timeline';
import Clip from '../clips/${clip}/${comp[0].replace(/\.tsx$/, '')}';
registerRoot(() => <>{compositionsFor(META, Clip)}</>);
`);
const serveUrl = await bundle({entryPoint: entry});
if (mp4) { // one preview mp4 (paper, wide or --phone), concurrency 1
  const id = phone ? `${clip}-phone` : clip;
  const composition = await selectComposition({serveUrl, id});
  const file = join(root, 'renders', clip, `${id}.mp4`);
  mkdirSync(dirname(file), {recursive: true});
  await renderMedia({composition, serveUrl, codec: 'h264', crf: 20, concurrency: 1, outputLocation: file});
  console.log('mp4:', file);
  process.exit(0);
}
const browser = await openBrowser('chrome', {chromiumOptions: {}});

const base = phone ? `${clip}-phone` : clip;
const pre = phone ? 'phone-' : '';
const themes = lightOnly ? [['paper', base]] : [['paper', base], ['blackboard', `${base}-dark`]];
let aspect = 2 / 3;
for (const [theme, comp] of themes) {
  const files: string[] = [];
  for (const s of stills) {
    const file = join(out, `${pre}${theme}-${String(s.frame).padStart(4, '0')}-${s.name}.png`);
    const composition = await selectComposition({serveUrl, id: comp, puppeteerInstance: browser});
    aspect = composition.height / composition.width;
    await renderStill({composition, serveUrl, output: file, frame: s.frame, puppeteerInstance: browser, overwrite: true, timeoutInMilliseconds: 120000});
    console.log('still:', file);
    files.push(file);
  }
  if (only) continue;
  // contact sheets (3 columns)
  const cols = 3;
  const rows = Math.ceil(files.length / cols);
  const inputs = files.flatMap((f) => ['-i', f]);
  const sizes = phone ? ([['phone', 358]] as const) : ([['full', 540], ['phone-shrunk', 358]] as const);
  for (const [tag, w] of sizes) {
    const h = Math.round(w * aspect);
    const scaled = files.map((_, i) => `[${i}:v]scale=${w}:${h}:flags=lanczos,pad=${w + 8}:${h + 8}:4:4:gray[s${i}]`).join(';');
    const layout = files.map((_, i) => `${(i % cols) * (w + 8)}_${Math.floor(i / cols) * (h + 8)}`).join('|');
    const xs = files.map((_, i) => `[s${i}]`).join('');
    const sheet = join(out, `_sheet-${pre}${theme}-${tag}.png`);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', `${scaled};${xs}xstack=inputs=${files.length}:layout=${layout}:fill=gray`, sheet]);
    if (!existsSync(sheet)) throw new Error('sheet failed');
    console.log('sheet:', sheet, `(${rows}×${cols})`);
  }
}
await browser.close({silent: true});

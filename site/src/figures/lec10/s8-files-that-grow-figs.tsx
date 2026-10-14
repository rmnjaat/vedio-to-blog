// Lecture 10 (lec10), chapter 8 (8.1–8.4): Fig 8·a (D-15 left half redraw: file rotation, the map with file + offset),
// Fig 8·b (D-20 redraw, StepThrough: merge and compact through a temporary hash table), Fig 8·c (D-15 right half +
// D-20 graph: the sawtooth under the 1 TB cap) and the §8 rule-box sketch (keep the sawtooth under the cap).
// Specs: lectures/lec10/lesson/figures.md §8. Parts: ./s8-files-that-grow-parts.
import React from 'react';
import { Arrow, Ceiling, Dot, Label, Line, Mark, Num, Step, StepState } from '../kit/Kit';
import type { Pt } from '../kit/Kit';
import {
  ActiveFile, Dial, Fig, HBrace, MemMap, Ring, RowFile, StripeFile, mapH, mapRowY, type Layout, type MapRow, type Row,
} from './s8-files-that-grow-parts';

/* ------------------------------------------------------------------ Fig 8·a: file rotation */

const FILE1: Row[] = [{ text: 'K1 V1' }, { text: 'K2 V2' }, { text: 'K3 V3' }, { text: 'K1 V1′' }, { text: 'K2 −1' }];

export function FileRotation({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f8a-p' : 'l10-f8a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'File rotation';
  const desc = 'The store writes to one active file, 004; when it crosses a size threshold a new file starts and the old ones, 001 to 003, become read-only but can still be read. The in-memory map now stores the file and the offset for each key: K1 in file 1 at offset 4, K3 in file 1 at offset 3. Every key must fit in RAM.';

  if (P) {
    const mx = 95, my = 10, mw = 150, rowH = 28, fy = 180;
    const r = (i: number) => fy + rowH * (i + 0.5);
    return (
      <Fig id={id} w={340} h={580} title={title} desc={desc}>
        <MemMap x={mx} y={my} w={mw} rows={[{ text: 'K1 → f1, O4' }, { text: 'K3 → f1, O3' }]} seed={s('map')} />
        <Label x={170} y={my + mapH(2) + 26}>keys must fit in RAM</Label>
        <Dot x={mx} y={mapRowY(my, 0)} />
        <Arrow pts={[[mx, mapRowY(my, 0)], [6, mapRowY(my, 0)], [6, r(3)], [18, r(3)]]} weight="thin" seed={s('p1')} />
        <Dot x={mx} y={mapRowY(my, 1)} />
        <Arrow pts={[[mx, mapRowY(my, 1)], [14, mapRowY(my, 1)], [14, r(2)], [18, r(2)]]} weight="thin" seed={s('p3')} />
        <RowFile x={20} y={fy} w={100} rows={FILE1} rowH={rowH} name="001" nameAbove seed={s('f1')} />
        <StripeFile x={150} y={fy} w={56} h={140} wavy name="002" nameAbove seed={s('f2')} />
        <StripeFile x={236} y={fy} w={56} h={140} wavy name="003" nameAbove seed={s('f3')} />
        <HBrace x0={20} x1={292} y={330} label="read only · still readable" seed={s('br')} />
        <ActiveFile x={60} y={420} w={60} h={120} name="004" nameAbove seed={s('f4')} />
        <Label anchor="start" x={160} y={513}>writes go here</Label>
        <Label x={90} y={562}>active</Label>
        <Arrow pts={[[122, 440], [236, 440]]} seed={s('rot')} />
        <Label x={180} y={428}>file rotation</Label>
        <Label kind="mono" x={180} y={460}>&gt; threshold</Label>
        <StripeFile x={240} y={410} w={50} h={70} lines={2} name="005" nameAbove seed={s('f5')} />
      </Fig>
    );
  }

  const mx = 10, my = 60, mw = 150, rowH = 32, fx = 220, fy = 60;
  const r = (i: number) => fy + rowH * (i + 0.5);
  const y3 = mapRowY(my, 0), y1 = mapRowY(my, 1);
  return (
    <Fig id={id} w={830} h={282} title={title} desc={desc}>
      <MemMap x={mx} y={my} w={mw} rows={[{ text: 'K3 → f1, O3' }, { text: 'K1 → f1, O4' }]} seed={s('map')} />
      <Label x={mx + mw / 2} y={my + mapH(2) + 30}>keys must fit in RAM</Label>
      <Dot x={mx + mw} y={y3} />
      <Arrow pts={[[mx + mw, y3], [195, y3], [195, r(2)], [fx - 2, r(2)]]} weight="thin" seed={s('p3')} />
      <Dot x={mx + mw} y={y1} />
      <Arrow pts={[[mx + mw, y1], [180, y1], [180, r(3)], [fx - 2, r(3)]]} weight="thin" seed={s('p1')} />
      <RowFile x={fx} y={fy} w={104} rows={FILE1} rowH={rowH} name="001" nameAbove seed={s('f1')} />
      <StripeFile x={370} y={fy} w={60} h={160} wavy name="002" nameAbove seed={s('f2')} />
      <StripeFile x={450} y={fy} w={60} h={160} wavy name="003" nameAbove seed={s('f3')} />
      <HBrace x0={fx} x1={510} y={232} label="read only · still readable" seed={s('br')} />
      <ActiveFile x={550} y={fy} w={60} h={160} name="004" nameAbove label="writes go here" seed={s('f4')} />
      <Label x={580} y={28}>active</Label>
      <Arrow pts={[[614, 95], [756, 95]]} seed={s('rot')} />
      <Label x={686} y={84}>file rotation</Label>
      <Label kind="mono" x={686} y={118}>&gt; threshold</Label>
      <StripeFile x={760} y={70} w={44} h={60} lines={2} name="005" nameAbove seed={s('f5')} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·b: merge and compact */

const F1: Row[] = [{ text: 'K1 V1', muted: true }, { text: 'K2 V2' }, { text: 'K3 V3' }, { text: 'K1 V1′', muted: true }, { text: 'K2 −1' }];
const F2: Row[] = [{ text: 'K4 V4' }, { text: 'K1 V1″' }];
const TMP: MapRow[] = [{ text: 'K1: V1→V1′→V1″' }, { text: 'K2: V2 → −1', strike: true, muted: true }, { text: 'K3: V3' }, { text: 'K4: V4' }];
const MERGED: Row[] = [{ text: 'K3 V3', tone: 'green' }, { text: 'K4 V4', tone: 'green' }, { text: 'K1 V1″', tone: 'green' }];
const MAP_OLD: MapRow[] = [{ text: 'K1 → f2, O2' }, { text: 'K3 → f1, O3' }, { text: 'K4 → f2, O1' }];
const MAP_NEW: MapRow[] = [{ text: 'K1 → m, O3', tone: 'green' }, { text: 'K3 → m, O1', tone: 'green' }, { text: 'K4 → m, O2', tone: 'green' }];

export function MergeCompact({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f8b-p' : 'l10-f8b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Merge and compact';
  const desc = 'Two read-only files hold stale entries (old values of K1) and a deleted key (K2 and its −1). A separate process reads them into a temporary hash table, where a newer entry replaces a key and a delete removes it, then flushes the table as one new merged file holding K3, K4 and the latest K1. The active file keeps taking writes meanwhile. The offsets changed, so the in-memory map is repointed to the merged file, and the old files are deleted.';
  const g = P
    ? { W: 340, H: 525, f1x: 4, fw: 96, f2x: 108, f3x: 212, an: 118, tw: 168, mx: 180, mw: 156, gx: 258, n2: 160 }
    : { W: 420, H: 500, f1x: 8, fw: 104, f2x: 124, f3x: 262, an: 138, tw: 200, mx: 226, mw: 186, gx: 319, n2: 190 };
  const fy = 30, rowH = 26, ty = 200, my = 200, gy = 390;
  const mergedR = gy + rowH * 1.5; // the K4 row: where the repointed arrow lands
  return (
    <Fig id={id} w={g.W} h={g.H} title={title} desc={desc} halo>
      {/* the files: names above, stale rows grey */}
      <RowFile x={g.f1x} y={fy} w={g.fw} rows={F1} rowH={rowH} name="001" nameAbove seed={s('f1')} />
      <RowFile x={g.f2x} y={fy} w={g.fw} rows={F2} rowH={rowH} name="002" nameAbove seed={s('f2')} />
      <ActiveFile x={g.f3x} y={fy} w={P ? 44 : 50} h={84} name="003" nameAbove arrowLen={P ? 28 : 34} seed={s('f3')} />
      <Label anchor="start" x={g.f3x + (P ? 52 : 58)} y={87}>{P ? 'writes' : 'writes go on'}</Label>
      <Label x={g.f3x + (P ? 22 : 25)} y={134}>active</Label>
      <Label kind="mono" x={g.f1x + g.tw / 2} y={g.H - (P ? 39 : 14)}>merged</Label>
      <RowFile x={g.f1x} y={gy} w={g.tw} rows={[{}, {}, {}]} rowH={rowH} dashed seed={s('mg0')} />

      {/* the in-memory map: old pointers until step 4 */}
      <StepState from={1} to={3}><MemMap x={g.mx} y={my} w={g.mw} rows={MAP_OLD} seed={s('map')} /></StepState>
      <StepState from={4}><MemMap x={g.mx} y={my} w={g.mw} rows={MAP_NEW} tone="green" seed={s('map')} /></StepState>

      <Step n={1}>
        <Ring x={g.f1x + g.fw / 2} y={fy + rowH * 1.5} rx={g.fw / 2 + 2} ry={13} tone="red" seed={s('rg1')} />
        <Ring x={g.f1x + g.fw / 2} y={fy + rowH * 4.5} rx={g.fw / 2 + 2} ry={13} tone="red" seed={s('rg2')} />
        <Num x={g.an} y={112} n={1} />
        <Label muted anchor="start" x={g.an + 16} y={117}>stale</Label>
        <Label tone="red" anchor="start" x={g.an + 16} y={142}>deleted</Label>
      </Step>

      <Step n={2}>
        <Arrow dashed pts={[[60, fy + rowH * 5 + 4], [60, ty - 2]]} seed={s('rd')} />
        <MemMap x={g.f1x} y={ty} w={g.tw} rows={TMP} rowH={24} title="tmp table" seed={s('tmp')} />
        <Num x={g.n2} y={ty + 16} n={2} />
        <Label anchor="start" x={P ? 96 : 108} y={362}>separate from</Label>
        <Label anchor="start" x={P ? 96 : 108} y={381}>the index</Label>
      </Step>

      <Step n={3}>
        <Arrow dashed pts={[[P ? 40 : 50, ty + mapH(4, 24) + 2], [P ? 40 : 50, gy - 2]]} seed={s('fl')} />
        <Label anchor="start" x={P ? 46 : 58} y={368}>flush</Label>
        <RowFile x={g.f1x} y={gy} w={g.tw} rows={MERGED} rowH={rowH} tone="green" seed={s('mg')} />
        <Num x={g.n2} y={gy + 14} n={3} />
        <Mark a={[g.f3x + 7, 92]} b={[g.f3x + (P ? 34 : 40), 92]} tone="green" seed={s('nw')} />
      </Step>

      <Step n={4}>
        <Arrow tone="green" pts={[[g.gx, my + mapH(3)], [g.gx, mergedR], [g.f1x + g.tw + 2, mergedR]]} seed={s('rp')} />
        <Num x={g.gx} y={P ? 360 : 350} n={4} tone="green" />
        {P
          ? <Label x={170} y={510}>update the index atomically!</Label>
          : <>
            <Label anchor="start" x={328} y={378}>update the index</Label>
            <Label anchor="start" x={328} y={398}>atomically!</Label>
          </>}
        <Mark a={[g.f1x + 4, fy + 4]} b={[g.f1x + g.fw - 4, fy + rowH * 5 - 4]} seed={s('x1')} />
        <Mark a={[g.f2x + 4, fy + 4]} b={[g.f2x + g.fw - 4, fy + rowH * 2 - 4]} seed={s('x2')} />
        <Label anchor="start" x={P ? 100 : 110} y={182}>old files deleted</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·c: the sawtooth */

/** Usage as a sawtooth: each tooth climbs in small steps (writes) and drops at a merge. */
function teeth(ox: number, period: number, n: number, lows: number[], peaks: number[], end: boolean): Pt[] {
  const pts: Pt[] = [];
  for (let t = 0; t < n; t++) {
    const x0 = ox + period * t, L = lows[t], H = peaks[t], k = 5, dx = period / k;
    pts.push([x0, L]);
    for (let j = 0; j < k; j++) {
      const yj = L + ((H - L) * j) / k, yn = L + ((H - L) * (j + 1)) / k;
      pts.push([x0 + dx * (j + 1), yj]);
      pts.push([x0 + dx * (j + 1), yn]);
    }
    if (t < n - 1 || !end) pts.push([x0 + period, lows[t + 1] ?? L]);
  }
  return pts;
}

export function Sawtooth({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f8c-p' : 'l10-f8c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The sawtooth';
  const desc = 'Disk usage rises with writes and drops each time merge and compaction runs, drawing a sawtooth that must stay under the 1 TB disk. Two knobs shape it: merge frequency and the file rotation threshold.';
  const g = P
    ? { W: 340, H: 362, ox: 40, oy: 200, x1: 324, top: 18, cap: 48, per: 70, capX: 280 }
    : { W: 680, H: 290, ox: 60, oy: 240, x1: 480, top: 24, cap: 62, per: 100, capX: 420 };
  const sc = (g.oy - g.cap) / (240 - 62); // keep the same shape at both sizes
  const lows = [222, 200, 205, 196].map((v) => g.oy - (240 - v) * sc);
  const peaks = [100, 92, 104, 96].map((v) => g.oy - (240 - v) * sc);
  const saw = teeth(g.ox, g.per, 4, lows, peaks, true);
  const drops = [1, 2, 3].map((i) => g.ox + g.per * i);
  return (
    <Fig id={id} w={g.W} h={g.H} title={title} desc={desc}>
      <Arrow pts={[[g.ox, g.oy], [g.x1, g.oy]]} weight="thin" seed={s('xa')} />
      <Arrow pts={[[g.ox, g.oy], [g.ox, g.top]]} weight="thin" seed={s('ya')} />
      <Label x={g.ox - 16} y={(g.oy + g.top) / 2 + 30} rotate={-90}>disk used</Label>
      <Label anchor="end" x={g.x1} y={g.oy + 22}>time</Label>
      <Ceiling x0={g.ox} x1={g.x1 - 10} y={g.cap} seed={s('cap')} />
      <Label kind="mono" tone="red" x={g.capX} y={g.cap - 12}>1 TB</Label>
      <Label tone="red" anchor="start" x={g.capX + 24} y={g.cap - 12}>cap</Label>
      <Line pts={saw} seed={s('saw')} />
      {drops.map((x, i) => <Mark key={i} a={[x, g.oy + 6]} b={[x, g.oy + 18]} dashed seed={s('d' + i)} />)}
      <Label x={g.ox + g.per * 2} y={g.oy + 40}>merge &amp; compaction</Label>
      {P ? (
        <g>
          <Label x={170} y={290}>the two knobs</Label>
          <Label kind="mono" x={170} y={316}>1. merge frequency</Label>
          <Label kind="mono" x={170} y={340}>2. file rotation threshold</Label>
        </g>
      ) : (
        <g>
          <Label x={584} y={110}>the two knobs</Label>
          <Label kind="mono" anchor="start" x={514} y={142}>1. merge frequency</Label>
          <Label kind="mono" anchor="start" x={514} y={168}>2. file rotation</Label>
          <Label kind="mono" anchor="start" x={538} y={190}>threshold</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §8 */

export function SawtoothRule({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule8-p' : 'l10-rule8';
  const s = (k: string) => `${id}-${k}`;
  const g = P
    ? { W: 300, H: 176, ox: 16, per: 60, low: 104, peak: 50, cap: 34, cx: 276, d1: [90, 132] as Pt, d2: [210, 132] as Pt }
    : { W: 480, H: 132, ox: 30, per: 56, low: 108, peak: 48, cap: 32, cx: 288, d1: [340, 64] as Pt, d2: [430, 64] as Pt };
  const saw = teeth(g.ox, g.per, 4, [g.low, g.low - 6, g.low - 2, g.low - 8], [g.peak, g.peak - 4, g.peak + 2, g.peak - 2], true);
  return (
    <Fig id={id} w={g.W} h={g.H} title="Keep the sawtooth under the cap"
      desc="A small sawtooth of disk usage stays under a red cap line. Two dials set its shape: merge frequency and the file size at which rotation starts a new file.">
      <Ceiling x0={g.ox - 6} x1={g.ox + g.per * 4 + 6} y={g.cap} seed={s('cap')} />
      <Label kind="mono" tone="red" anchor="start" x={g.ox + g.per * 4 + 12} y={g.cap + 5}>cap</Label>
      <Line pts={saw} seed={s('saw')} />
      <Dial cx={g.d1[0]} cy={g.d1[1]} angle={-35} label="merge freq" seed={s('k1')} />
      <Dial cx={g.d2[0]} cy={g.d2[1]} angle={30} label="rotation size" seed={s('k2')} />
    </Fig>
  );
}

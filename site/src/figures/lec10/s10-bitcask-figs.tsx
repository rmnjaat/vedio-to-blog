// Lecture 10 (lec10), chapter 10 (10.1–10.3): Fig 10·a (D-17 + D-18 + D-19 merged redraw: one map, many files, and
// the GET path), Fig 10·b (D-21 redraw, corrected per SN-08: Bitcask under every Riak node, no master) and the §10
// rule-box sketch (throughput with persistence → look for the append).
// Specs: lectures/lec10/lesson/figures.md §10. Parts: ./s8-files-that-grow-parts.
import React from 'react';
import { Actor, Arrow, Box, Dot, Label, Line, Num } from '../kit/Kit';
import type { Pt } from '../kit/Kit';
import { chamferRect, ellipse } from '../kit/hand';
import { ActiveFile, Fig, Gauge, HBrace, RecordBar, StripeFile, cellX, type Cell, type Layout } from './s8-files-that-grow-parts';

/* ------------------------------------------------------------------ Fig 10·a: one map, many files */

const GET = ['hash table lookup', 'disk seek', 'disk read'];

function Entry({ x, y, k, cells, seed }: { x: number; y: number; k: string; cells: Cell[]; seed: string }) {
  return (
    <g>
      <Box x={x} y={y} w={36} h={30} label={k} seed={seed + '-k'} />
      <Arrow weight="thin" pts={[[x + 37, y + 15], [x + 56, y + 15]]} seed={seed + '-a'} />
      <RecordBar x={x + 58} y={y} cells={cells} seed={seed + '-e'} />
    </g>
  );
}

export function OneMapManyFiles({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f10a-p' : 'l10-f10a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'One map, many files';
  const desc = 'Bitcask’s in-memory map holds, for every key, the file id, entry size, offset and timestamp of its latest record; entries point into any file, while writes go only to the active one. A get is one map lookup, one disk seek and one read. Every key must fit in memory.';
  const ws = P ? [74, 42, 48, 38] : [82, 50, 56, 40];
  const cells: Cell[] = [{ label: 'file id', w: ws[0] }, { label: 'vsz', w: ws[1] }, { label: 'vpos', w: ws[2] }, { label: 'ts', w: ws[3] }];

  if (P) {
    const ex = 4, bx = ex + 58, vpos = cellX(bx, cells, 2) + ws[2] / 2, y1 = 44, y2 = 340, fy = 130;
    return (
      <Fig id={id} w={340} h={596} title={title} desc={desc}>
        <Label x={cellX(bx, cells, 1) + ws[1] / 2} y={y1 - 10}>entry size</Label>
        <Label x={cellX(bx, cells, 3) + ws[3] / 2 + 6} y={y1 - 10}>timestamp</Label>
        <Entry x={ex} y={y1} k="K1" cells={cells} seed={s('k1')} />
        <Arrow tone="blue" pts={[[vpos, y1 + 31], [vpos, fy + 70], [163, fy + 70]]} seed={s('p1')} />
        <StripeFile x={24} y={fy} w={56} h={120} name="001" seed={s('f1')} />
        <StripeFile x={104} y={fy} w={56} h={120} name="002" seed={s('f2')} />
        <ActiveFile x={236} y={fy} w={50} h={120} name="003" arrowLen={30} seed={s('f3')} />
        <Label x={261} y={fy - 10}>active</Label>
        <HBrace x0={24} x1={160} y={fy + 148} label="immutable · readable" seed={s('br')} />
        <Arrow pts={[[vpos, y2 - 1], [vpos, fy + 100], [233, fy + 100]]} weight="thin" seed={s('p2')} />
        <Entry x={ex} y={y2} k="K2" cells={cells} seed={s('k2')} />
        <Label x={vpos} y={y2 + 50}>offset</Label>
        <Label x={170} y={430}>GET(k) → pointed queries</Label>
        {GET.map((t, i) => (
          <g key={t}>
            <Num x={86} y={458 + i * 30} n={i + 1} tone="blue" />
            <Label anchor="start" x={102} y={463 + i * 30}>{t}</Label>
          </g>
        ))}
        <Label tone="red" x={170} y={566}>limitation: index (every key)</Label>
        <Label tone="red" x={170} y={586}>must fit in memory</Label>
      </Fig>
    );
  }

  // K2 is listed first so both connectors run above the files without crossing: K2 along the top into the gap
  // before 003, K1 under it into the gap before 002. Both end in an arrowhead on the file they name.
  const ex = 10, bx = ex + 58, vpos = cellX(bx, cells, 2) + ws[2] / 2, bEnd = cellX(bx, cells, 4), y1 = 30, y2 = 110, fy = 116;
  return (
    <Fig id={id} w={860} h={388} title={title} desc={desc}>
      <Label x={cellX(bx, cells, 1) + ws[1] / 2} y={y1 - 10}>entry size</Label>
      <Label x={cellX(bx, cells, 3) + ws[3] / 2 + 8} y={y1 - 10}>timestamp</Label>
      <Entry x={ex} y={y1} k="K2" cells={cells} seed={s('k2')} />
      <Label x={vpos} y={y1 + 48}>offset</Label>
      <Entry x={ex} y={y2} k="K1" cells={cells} seed={s('k1')} />
      <Arrow weight="thin" pts={[[bEnd + 1, y1 + 15], [516, y1 + 15], [516, fy + 100], [537, fy + 100]]} seed={s('p2')} />
      <Arrow tone="blue" pts={[[bEnd + 1, y2 + 15], [316, y2 + 15], [316, 80], [428, 80], [428, fy + 70], [437, fy + 70]]} seed={s('p1')} />
      <StripeFile x={360} y={fy} w={56} h={150} name="001" nameAbove seed={s('f1')} />
      <StripeFile x={440} y={fy} w={56} h={150} name="002" nameAbove seed={s('f2')} />
      <ActiveFile x={540} y={fy} w={56} h={150} name="003" nameAbove arrowLen={30} label="writes go here" seed={s('f3')} />
      <Label x={568} y={84}>active</Label>
      <HBrace x0={360} x1={496} y={fy + 158} seed={s('br')} />
      <Label x={428} y={fy + 188}>immutable ·</Label>
      <Label x={428} y={fy + 208}>available for reads</Label>
      <Label anchor="start" x={652} y={46}>GET(k) → pointed queries</Label>
      {GET.map((t, i) => (
        <g key={t}>
          <Num x={668} y={80 + i * 34} n={i + 1} tone="blue" />
          <Label anchor="start" x={684} y={85 + i * 34}>{t}</Label>
        </g>
      ))}
      <Label tone="red" x={430} y={372}>limitation: index (every key) must fit in memory</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 10·b: Bitcask inside Riak */

function RiakNode({ cx, cy, w, h, seed }: { cx: number; cy: number; w: number; h: number; seed: string }) {
  const x = cx - w / 2, y = cy - h / 2;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} />
      <Label kind="mono" x={cx} y={y + 19}>riak</Label>
      <Box x={x + 8} y={y + h - 30} w={w - 16} h={22} label="bitcask" labelSize={13} seed={seed + '-b'} />
    </g>
  );
}

const arc = (cx: number, cy: number, r: number, a0: number, a1: number): Pt[] =>
  Array.from({ length: 10 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / 9) * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });

export function RiakRing({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f10b-p' : 'l10-f10b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Bitcask inside Riak';
  const desc = 'Riak, a distributed key-value store, runs an instance of Bitcask under every node. A request can go to any node; keys are hashed onto a ring and each key is stored on N nodes, with no master.';
  const g = P
    ? { W: 340, H: 392, cx: 190, cy: 210, r: 86, bw: 84, bh: 58, ax: 26 }
    : { W: 520, H: 362, cx: 320, cy: 175, r: 110, bw: 96, bh: 62, ax: 60 };
  const at = (deg: number): Pt => [g.cx + Math.cos((deg * Math.PI) / 180) * g.r, g.cy + Math.sin((deg * Math.PI) / 180) * g.r];
  const top = at(270), bl = at(150), br = at(30);
  return (
    <Fig id={id} w={g.W} h={g.H} title={title} desc={desc}>
      <path className="ink thin" d={ellipse(g.cx, g.cy, g.r, g.r, s('ring'))} />
      <Arrow weight="thin" pts={arc(g.cx, g.cy, g.r + 9, 178, 244)} seed={s('a1')} />
      <Arrow weight="thin" pts={arc(g.cx, g.cy, g.r + 9, 122, 58)} seed={s('a2')} />
      {[top, bl, br].map(([x, y], i) => <RiakNode key={i} cx={x} cy={y} w={g.bw} h={g.bh} seed={s('n' + i)} />)}
      <Label x={g.cx} y={g.cy + 4}>each key on N nodes</Label>
      <Actor x={g.ax} y={bl[1] - 22} seed={s('user')} />
      <Arrow tone="blue" pts={[[g.ax + 16, bl[1]], [bl[0] - g.bw / 2 - 2, bl[1]]]} seed={s('req')} />
      {P ? (
        <g>
          <Label anchor="start" x={10} y={24}>what we just designed is</Label>
          <Box x={208} y={8} w={86} h={26} label="bitcask" seed={s('name')} />
          <Label anchor="start" x={10} y={60}>any node can route the request</Label>
          <Label x={170} y={326}>no master: keys hashed onto a ring</Label>
          <Label x={170} y={356}>each node of Riak has an</Label>
          <Label x={170} y={376}>instance of Bitcask running</Label>
        </g>
      ) : (
        <g>
          <Label anchor="start" x={20} y={30}>what we just designed is</Label>
          <Box x={44} y={42} w={92} h={28} label="bitcask" seed={s('name')} />
          <Label anchor="start" x={20} y={294}>any node can route the request</Label>
          <Label x={g.cx} y={324}>no master: keys hashed onto a ring</Label>
          <Label x={g.W / 2} y={350}>each node of Riak has an instance of Bitcask running</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §10 */

export function ThroughputRule({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule10-p' : 'l10-rule10';
  const s = (k: string) => `${id}-${k}`;
  const n = P ? 5 : 6, cw = P ? 34 : 40, x = P ? 14 : 40, y = 58;
  const cells: Cell[] = Array.from({ length: n }, () => ({ w: cw }));
  const end = x + n * cw;
  return (
    <Fig id={id} w={P ? 300 : 480} h={P ? 160 : 130} title="Throughput with persistence means append-only"
      desc="An append-only file, a write arrow going into its tail, and beside it a throughput gauge reading high: when a system claims high throughput with persistence, look for the append.">
      <RecordBar x={x} y={y} cells={cells} h={28} seed={s('bar')} />
      <Line dotted pts={[[end, y], [end + cw, y], [end + cw, y + 28], [end, y + 28]]} seed={s('free')} />
      <Arrow pts={[[end + cw / 2, y - 34], [end + cw / 2, y - 4]]} seed={s('app')} />
      <Label anchor="start" x={end + cw / 2 + 8} y={y - 22}>append</Label>
      <Gauge cx={P ? 250 : 410} cy={y + 26} r={P ? 24 : 30} label="throughput" seed={s('g')} />
      <Dot x={P ? 250 : 410} y={y + 26} />
      <Label x={P ? 120 : 170} y={P ? 128 : 116}>look for the append</Label>
    </Fig>
  );
}

// Lecture 03 (lec05), chapter 4 "If it were in memory: how Redis expires keys".
// Fig 4·a (deleting on disk vs in memory), Fig 4·b (a sample stands for the population, board redraw S69),
// and the §4 rule-box sketch. Glyphs the kit lacks (tiny B+ tree, hash-table strip, key square) are drawn here
// from the kit's hand geometry, as chapter 1 does in s1-locks-parts.tsx. Specs: lectures/lec05/lesson/figures.md.
import React from 'react';
import { chamferRect, ellipse, poly, roundRect } from '../kit/hand';
import { Arrow, Fig, Label, Line, Num } from './floor';
import { Tick } from './s1-locks-parts';

type Layout = 'wide' | 'phone';

/* ------------------------------------------------------------------ glyphs */

/** A tiny three-level B+ tree: one root, two internal nodes, four leaves. (x, y) is the top-left of a w-wide area.
 *  `struck` (0–3) puts a red strike through one leaf entry; `rebalance` draws the red "rebalance?" loop under two leaves. */
function BTree({ x, y, w, seed, struck, rebalance, nodeW = 52, gap = 46 }: {
  x: number; y: number; w: number; seed: string; struck?: number; rebalance?: string; nodeW?: number; gap?: number;
}) {
  const h = 22;
  const lw = Math.min(nodeW, w * 0.21);
  const rootX = x + w / 2;
  const inX = [x + w * 0.25, x + w * 0.75];
  const leafX = [x + w * 0.11, x + w * 0.37, x + w * 0.63, x + w * 0.89];
  const y1 = y + gap, y2 = y + gap * 2;
  const node = (cx: number, top: number, k: string, ww = nodeW) => (
    <path key={k} className="ink shape" d={chamferRect(cx - ww / 2, top, ww, h, `${seed}-${k}`, 2)} />
  );
  return (
    <g>
      {inX.map((ix, i) => <Line key={'e' + i} weight="thin" pts={[[rootX + (i ? 10 : -10), y + h], [ix, y1]]} seed={`${seed}-e${i}`} />)}
      {leafX.map((lx, i) => <Line key={'l' + i} weight="thin" pts={[[inX[i < 2 ? 0 : 1] + (i % 2 ? 10 : -10), y1 + h], [lx, y2]]} seed={`${seed}-le${i}`} />)}
      {node(rootX, y, 'root')}
      {inX.map((ix, i) => node(ix, y1, 'in' + i))}
      {leafX.map((lx, i) => node(lx, y2, 'leaf' + i, lw))}
      {/* entries inside the leaves: two short ticks each */}
      {leafX.map((lx, i) => [0, 1].map((j) => (
        <Line key={`k${i}${j}`} weight="thin" pts={[[lx - lw / 2 + 7 + j * (lw / 2 - 2), y2 + 11], [lx - lw / 2 + 4 + (j + 1) * (lw / 2 - 2) - 4, y2 + 11]]} seed={`${seed}-k${i}${j}`} />
      )))}
      {struck !== undefined && (
        <Line tone="red" weight="heavy" pts={[[leafX[struck] - lw / 2 + 4, y2 + 17], [leafX[struck] + lw / 2 - 4, y2 + 5]]} seed={`${seed}-strike`} />
      )}
      {rebalance && struck !== undefined && (
        <g>
          <Arrow tone="red" head="both" pts={[[leafX[struck], y2 + h + 4], [leafX[struck], y2 + h + 18], [leafX[struck + 1], y2 + h + 18], [leafX[struck + 1], y2 + h + 4]]} seed={`${seed}-rb`} />
          <Label tone="red" x={(leafX[struck] + leafX[struck + 1]) / 2} y={y2 + h + 38}>{rebalance}</Label>
        </g>
      )}
    </g>
  );
}

/** A hash-table strip (Redis's dict): `n` slots stacked vertically. Slot i spans y + i*sh … y + (i+1)*sh. */
function Dict({ x, y, n = 6, sw = 38, sh = 24, seed }: { x: number; y: number; n?: number; sw?: number; sh?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, sw, n * sh, seed, 2)} />
      {Array.from({ length: n - 1 }, (_, i) => (
        <Line key={i} weight="thin" pts={[[x + 3, y + (i + 1) * sh], [x + sw - 3, y + (i + 1) * sh]]} seed={`${seed}-s${i}`} />
      ))}
    </g>
  );
}

/** One chained entry: a small box with `key → v`. */
function Entry({ x, y, w = 70, h = 24, label, seed, faint }: { x: number; y: number; w?: number; h?: number; label: string; seed: string; faint?: boolean }) {
  return (
    <g>
      <path className={`ink shape${faint ? ' faint' : ''}`} d={chamferRect(x, y, w, h, seed, 2)} />
      <Label kind="mono" muted={faint} x={x + w / 2} y={y + h / 2 + 5} size={13}>{label}</Label>
    </g>
  );
}

/** A key with a TTL: a small square. state: live (plain), expired (graphite strike), freed (faint + green tick). */
function KeySq({ x, y, s, state, seed }: { x: number; y: number; s: number; state: 'live' | 'expired' | 'freed'; seed: string }) {
  return (
    <g>
      <path className={`ink thin${state === 'freed' ? ' faint' : ''}`} d={roundRect(x, y, s, s, 2, seed)} />
      {state === 'expired' && <path className="ink thin" d={poly([[x + 2, y + s - 2], [x + s - 2, y + 2]], seed + 'x')} />}
      {state === 'freed' && <Tick x={x + s / 2 - 1} y={y + s - 2} s={s * 0.42} seed={seed + 't'} />}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 4·a */

function DiskPanel({ ox, oy, seed }: { ox: number; oy: number; seed: string }) {
  return (
    <g>
      <BTree x={ox + 12} y={oy + 10} w={276} seed={seed + '-bt'} struck={1} rebalance="rebalance?" />
      <Label kind="mono" muted anchor="start" x={ox + 186} y={oy + 25}>B+ tree</Label>
      <Label x={ox + 150} y={oy + 196}>so batch the deletes</Label>
      <Label kind="title" x={ox + 150} y={oy + 228}>on disk</Label>
    </g>
  );
}

function MemoryPanel({ ox, oy, seed }: { ox: number; oy: number; seed: string }) {
  const dx = ox + 22, dy = oy + 10, sh = 24;
  const ey = dy + sh * 2 - 12; // entries hang off slot 2
  return (
    <g>
      <Dict x={dx} y={dy} sh={sh} seed={seed + '-d'} />
      <Label kind="mono" muted x={dx + 19} y={dy + sh * 6 + 20}>dict</Label>
      <Arrow pts={[[dx + 30, ey + 12], [dx + 66, ey + 12]]} seed={seed + '-a1'} />
      <Entry x={dx + 68} y={ey} label="k3 → v" seed={seed + '-e1'} />
      <Line dotted weight="thin" pts={[[dx + 138, ey + 12], [dx + 168, ey + 12]]} seed={seed + '-a2'} />
      <Entry x={dx + 170} y={ey} label="k7 → v" seed={seed + '-e2'} faint />
      <Tick x={dx + 200} y={ey + 50} s={9} seed={seed + '-tk'} />
      <Label kind="mono" tone="green" x={dx + 205} y={ey + 74}>free()</Label>
      <Label anchor="start" x={dx + 68} y={ey + 104} size={13}>expired k7 unlinked</Label>
      <Label anchor="start" x={dx + 68} y={ey + 122} size={13}>from its bucket</Label>
      <Label x={ox + 150} y={oy + 196}>microseconds: delete right there</Label>
      <Label kind="title" x={ox + 150} y={oy + 228}>in memory</Label>
    </g>
  );
}

export function DiskVsMemory({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-fig4a-p' : 'l5-fig4a';
  const title = 'Deleting on disk vs in memory';
  const desc = 'On disk, the keys live in a B+ tree. Deleting one entry from a leaf can push the tree out of shape and force a rebalance of neighbouring leaves, so a disk-based store batches its deletes. In memory, a key lives in a hash table: deleting an expired key unlinks its entry from the bucket and frees the memory, which takes microseconds, so it is done right there.';
  if (P)
    return (
      <Fig id={id} w={300} h={490} title={title} desc={desc}>
        <DiskPanel ox={0} oy={0} seed={id + '-a'} />
        <MemoryPanel ox={0} oy={252} seed={id + '-b'} />
      </Fig>
    );
  return (
    <Fig id={id} w={640} h={240} title={title} desc={desc}>
      <DiskPanel ox={0} oy={0} seed={id + '-a'} />
      <Line dotted weight="thin" pts={[[320, 14], [320, 210]]} seed={id + '-sep'} />
      <MemoryPanel ox={340} oy={0} seed={id + '-b'} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b */

// Deterministic "about 30% expired" population. Each round samples 20 keys scattered at random over the whole
// field (not a block): the sampled cells are ringed in blue where they sit, solid for round 1, dashed for round 2.
// Round 1 is forced to 6 expired of 20, round 2 to 3 of 20; the sampled expired keys are deleted (faint + tick).
const expiredAt = (c: number, r: number) => ((c * 7 + r * 13 + (c * r) % 5) % 10) < 3;
const scatter = (c: number, r: number) => ((c * 2654435761 + r * 40503 * 97 + (c ^ (r * 31)) * 7919) >>> 0) % 100003;

function pickRounds(cols: number, rows: number) {
  const all: [number, number][] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) all.push([c, r]);
  all.sort((p, q) => scatter(p[0], p[1]) - scatter(q[0], q[1]));
  const taken = new Set<string>();
  const round = (expired: number) => {
    const out: string[] = [];
    let e = 0, l = 0;
    for (const [c, r] of all) {
      const k = `${c}-${r}`;
      if (taken.has(k)) continue;
      if (expiredAt(c, r) ? e < expired : l < 20 - expired) { out.push(k); taken.add(k); expiredAt(c, r) ? e++ : l++; }
      if (out.length === 20) break;
    }
    return new Set(out);
  };
  return [round(6), round(3)];
}

function Population({ x, y, cols, rows, pitch, s, seed }: {
  x: number; y: number; cols: number; rows: number; pitch: number; s: number; seed: string;
}) {
  const [r1, r2] = pickRounds(cols, rows);
  const rr = s / 2 + 2.5;
  const cells: React.ReactNode[] = [];
  const rings: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = `${c}-${r}`;
      const sampled = r1.has(k) ? 1 : r2.has(k) ? 2 : 0;
      const state: 'live' | 'expired' | 'freed' = expiredAt(c, r) ? (sampled ? 'freed' : 'expired') : 'live';
      const cx = x + c * pitch + s / 2, cy = y + r * pitch + s / 2;
      cells.push(<KeySq key={k} x={x + c * pitch} y={y + r * pitch} s={s} state={state} seed={`${seed}-${k}`} />);
      if (sampled) rings.push(<path key={'g' + k} className="blue thin" d={ellipse(cx, cy, rr, rr, `${seed}-g${k}`)}
        strokeDasharray={sampled === 2 ? '3 2.5' : undefined} />);
    }
  return <g>{cells}{rings}</g>;
}

/** Legend: a solid ring "round 1", a dashed ring "round 2", each "20 keys at random". */
function RingKey({ x, y, n, label, seed }: { x: number; y: number; n: 1 | 2; label: string; seed: string }) {
  return (
    <g>
      <path className="blue thin" d={ellipse(x + 8, y - 5, 8.5, 8.5, seed)} strokeDasharray={n === 2 ? '3 2.5' : undefined} />
      <Num x={x + 30} y={y - 5} n={n} />
      <Label anchor="start" x={x + 44} y={y}>{label}</Label>
    </g>
  );
}

function RoundLog({ x, y, gap = 22 }: { x: number; y: number; gap?: number }) {
  return (
    <g>
      <Num x={x + 9} y={y - 5} n={1} />
      <Label kind="mono" anchor="start" x={x + 26} y={y}>6 / 20 = 30% &gt; 25%</Label>
      <Label anchor="start" x={x + 26} y={y + gap}>delete 6, sample again</Label>
      <Num x={x + 9} y={y + gap * 3 - 5} n={2} />
      <Label kind="mono" anchor="start" x={x + 26} y={y + gap * 3}>3 / 20 = 15% &lt; 25%</Label>
      <Label anchor="start" x={x + 26} y={y + gap * 4}>delete 3, stop</Label>
      <Label anchor="start" muted x={x + 26} y={y + gap * 5} size={13}>(about 15% left, and that is fine)</Label>
    </g>
  );
}

export function SamplePopulation({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-fig4b-p' : 'l5-fig4b';
  const title = 'A sample stands for the population';
  const desc = 'A field of keys that have an expiry, about 30% of them expired. Redis samples 20 keys at random, scattered across the whole key set, and deletes the expired ones in the sample. In the first sample 6 of 20 were expired, 30%, more than 25%, so it samples again. In the next sample, 20 other random keys, 3 of 20 were expired, 15%, under 25%, so it deletes those 3 and stops; about 15% of the population is then expired but not yet deleted. Because a random sample represents the population, the job never scans the whole key set.';
  if (P) {
    const pitch = 22, s = 14, x0 = 60, y0 = 40, rows = 10;
    const ky = y0 + rows * pitch + 20;
    return (
      <Fig id={id} w={340} h={484} title={title} desc={desc}>
        <Label x={170} y={20}>population: keys with an expiry</Label>
        <Population x={x0} y={y0} cols={10} rows={rows} pitch={pitch} s={s} seed={id + '-pop'} />
        <RingKey x={40} y={ky} n={1} label="20 keys at random" seed={id + '-k1'} />
        <RingKey x={40} y={ky + 26} n={2} label="20 more at random" seed={id + '-k2'} />
        <RoundLog x={40} y={ky + 70} />
      </Fig>
    );
  }
  const pitch = 18, s = 12, x0 = 24, y0 = 44;
  return (
    <Fig id={id} w={720} h={262} title={title} desc={desc}>
      <Label anchor="start" x={x0} y={24}>population: keys with an expiry</Label>
      <Population x={x0} y={y0} cols={20} rows={10} pitch={pitch} s={s} seed={id + '-pop'} />
      <RingKey x={x0} y={y0 + 10 * pitch + 22} n={1} label="round 1: 20 keys at random" seed={id + '-k1'} />
      <RingKey x={x0 + 270} y={y0 + 10 * pitch + 22} n={2} label="round 2: 20 more" seed={id + '-k2'} />
      <RoundLog x={430} y={78} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §4 */

export function BatchOrRightThere({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-rule4-p' : 'l5-rule4';
  const W = P ? 320 : 480;
  const half = W / 2;
  const title = 'On disk batch the deletes; in memory delete right there';
  const desc = 'Left: a tiny B+ tree with a struck leaf entry and a red rebalance mark, labelled on disk: batch. Right: a hash-table strip whose expired entry is freed with a green tick, labelled in memory: right there.';
  const tw = P ? 140 : 190;
  const dx = half + (P ? 30 : 60);
  return (
    <Fig id={id} w={W} h={150} title={title} desc={desc} className="rule4">
      <BTree x={(half - tw) / 2} y={8} w={tw} seed={id + '-bt'} struck={1} nodeW={P ? 30 : 40} gap={30} />
      <Label tone="red" x={half / 2} y={106} size={13}>rebalance</Label>
      <Label kind="mono" x={half / 2} y={136} size={13}>on disk: batch</Label>
      <Dict x={dx} y={8} n={4} sh={20} sw={30} seed={id + '-d'} />
      <Arrow pts={[[dx + 24, 38], [dx + 50, 38]]} seed={id + '-a'} />
      <Entry x={dx + 52} y={26} w={P ? 52 : 60} label="k7" seed={id + '-e'} faint />
      <Tick x={dx + (P ? 76 : 80)} y={78} s={8} seed={id + '-tk'} />
      <Label kind="mono" x={half + half / 2} y={136} size={13}>in memory: right there</Label>
    </Fig>
  );
}

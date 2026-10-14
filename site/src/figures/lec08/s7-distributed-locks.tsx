// Lecture 05 (lec08), §7 Distributed locks.
// Fig 7·a Five independent nodes (D-10 redraw, frames b_022930, b_023500; static twin of clip l08-redlock): wide 700 + phone 340.
// Fig 7·b Two holders (new StepThrough): 420 + phone 340. Time runs down; each row is the five nodes' lock cells.
// Fig 7·c Scale out vs distribute (new; the §7 rule-box sketch): 480 + phone 320.
// The client initiates: arrows point client → node.
import React from 'react';
import { Arrow, Box, Cross, Cyl, Fig, Label, Line, Num, Step } from '../kit/Kit';

/* ------------------------------------------------------------------ Fig 7·a */

const T7A = 'Five independent nodes';
const D7A =
  'One client above five Redis nodes, r1 to r5, with no replication and no link between them. The client sends SET NX to every node. r1, r2 and r3 grant it the lock; r4 is already held by another client; r5 times out. Three of five is more than half, and the client got them in less than the TTL, so it holds the lock. Had it failed, it would release the lock on every node and retry later.';

export function FiveNodes({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig7a-p' : 'fig7a';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 700;
  const cx = W / 2;
  // node positions: desktop one row of five; phone 3 + 2
  const N = P
    ? [[60, 110], [170, 110], [280, 110], [115, 236], [225, 236]]
    : [[90, 150], [220, 150], [350, 150], [480, 150], [610, 150]];
  const rx = P ? 34 : 40, h = P ? 40 : 50, ry = rx * 0.26;
  const bus = P ? 80 : 100;
  const val = ['c1', 'c1', 'c1', 'c2', '—'];
  const tone = ['green', 'green', 'green', 'red', 'ink'] as const;
  const note = ['got it', 'got it', 'got it', 'taken', 'timeout'];
  const T = 14;
  return (
    <Fig id={id} w={W} h={P ? 446 : 372} title={T7A} desc={D7A}>
      <Box x={cx - 50} y={12} w={100} h={38} label="client" seed={s('cl')} />
      <Line pts={[[cx, 50], [cx, bus]]} seed={s('trunk')} />
      <Line pts={[[N[0][0], bus], [N[2][0] > N[4][0] ? N[2][0] : N[4][0], bus]]} seed={s('bus')} />
      <Label kind="mono" anchor="start" x={cx + 8} y={bus - 12} size={T}>SET NX</Label>
      {N.map(([x, top], i) => (
        <g key={i}>
          <Arrow pts={[[x, bus], [x, top - ry - 2]]} seed={s(`a${i}`)} />
          <Cyl cx={x} top={top} rx={rx} h={h} seed={s(`n${i}`)} label={`r${i + 1}`} />
          <Label kind="mono" tone={tone[i]} muted={i === 4} x={x} y={top + h - (P ? 10 : 14)} size={T}>{val[i]}</Label>
          <Label tone={tone[i]} muted={i === 4} x={x} y={top + h + ry + (P ? 36 : 40)} size={T}>{note[i]}</Label>
        </g>
      ))}
      {P ? (
        <g>
          <Label x={cx} y={342} size={14}>no replication · all independent</Label>
          <Label tone="green" x={cx} y={368} size={14}>3 of 5 &gt; 50% → acquired</Label>
          <Label tone="green" x={cx} y={386} size={14}>and in less than the TTL</Label>
          <Label x={cx} y={414} size={14}>fail → release on every node,</Label>
          <Label x={cx} y={431} size={14}>retry later</Label>
        </g>
      ) : (
        <g>
          <Label x={cx} y={290}>no replication · all independent</Label>
          <Label tone="green" x={cx} y={320} size={15}>3 of 5 &gt; 50% → acquired, and in less than the TTL</Label>
          <Label x={cx} y={352}>fail → release on every node, retry later</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·b */

const T7B = 'Two holders';
const D7B =
  'Five lock cells, one per Redis node r1 to r5, shown again at each moment. 1: c1 holds r1, r2 and r3, a majority. 2: r1 and r2 crash and restart empty; only r3 still says c1. 3: c2 locks r1, r2 and r4, three of five; c1 also believes it holds the lock: two holders. 4: as taught, this needs both nodes to fail in the two or three seconds before c1 grabs the rest, so it is unlikely. 5: more precisely, the window is the whole TTL; keep a restarted node out for longer than the max TTL, and c2 can get only two of five.';

type Cell = { v?: string; tone?: 'ink' | 'red' | 'green'; out?: boolean; x?: boolean };

export function TwoHolders({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig7b-p' : 'fig7b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const X = P ? [72, 128, 184, 240, 296] : [110, 170, 230, 290, 350];
  const cw = P ? 44 : 48;
  const T = P ? 14 : 13.5;
  const NX = P ? 14 : 16, LX = P ? 30 : 32;
  const dy = (n: number) => (P ? (n - 1) * 12 : 0); // phone: tighter rows, so the sheet ends at the last row
  const row = (y: number, cells: Cell[], k: string) => (
    <g>
      {cells.map((c, i) => (
        <g key={i}>
          <Box x={X[i] - cw / 2} y={y} w={cw} h={28} seed={s(`${k}${i}`)} tone={c.tone ?? 'ink'} faint={c.out} />
          {c.v && <Label kind="mono" tone={c.tone} muted={c.out} x={X[i]} y={y + 19} size={P ? 14 : 13}>{c.v}</Label>}
          {c.x && <Cross x={X[i]} y={y + 14} size={16} seed={s(`${k}x${i}`)} />}
        </g>
      ))}
    </g>
  );
  return (
    <Fig id={id} w={W} h={P ? 432 : 486} title={T7B} desc={D7B}>
      {X.map((x, i) => <Cyl key={i} cx={x} top={18} rx={P ? 14 : 16} h={16} seed={s(`h${i}`)} label={`r${i + 1}`} />)}

      <Step n={1}>
        <Num x={NX} y={82} n={1} tone="green" size={P ? 14 : 12.5} />
        <Label anchor="start" x={LX} y={87} size={T}>c1 locks r1, r2, r3: three of five</Label>
        {row(96, [{ v: 'c1', tone: 'green' }, { v: 'c1', tone: 'green' }, { v: 'c1', tone: 'green' }, {}, {}], 'a')}
      </Step>
      <Step n={2}>
        <Num x={NX} y={154 - dy(2)} n={2} tone="red" size={P ? 14 : 12.5} />
        <Label anchor="start" tone="red" x={LX} y={159 - dy(2)} size={T}>r1 and r2 crash, restart empty</Label>
        {row(168 - dy(2), [{ tone: 'red', x: true }, { tone: 'red', x: true }, { v: 'c1', tone: 'green' }, {}, {}], 'b')}
      </Step>
      <Step n={3}>
        <Num x={NX} y={226 - dy(3)} n={3} tone="red" size={P ? 14 : 12.5} />
        <Label anchor="start" x={LX} y={231 - dy(3)} size={T}>c2 locks r1, r2, r4: also three</Label>
        {row(240 - dy(3), [{ v: 'c2', tone: 'red' }, { v: 'c2', tone: 'red' }, { v: 'c1', tone: 'red' }, { v: 'c2', tone: 'red' }, {}], 'c')}
        <Label tone="red" x={(X[0] + X[4]) / 2} y={292 - dy(3)} size={P ? 14 : 15}>two holders</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={322 - dy(4)} n={4} size={P ? 14 : 12.5} />
        <Label anchor="start" x={LX} y={327 - dy(4)} size={T}>as taught: unlikely, a window of</Label>
        <Label anchor="start" x={LX} y={345 - dy(4)} size={T}>2–3 s while c1 grabs the rest</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={380 - dy(5)} n={5} tone="green" size={P ? 14 : 12.5} />
        <Label anchor="start" x={LX} y={385 - dy(5)} size={T}>fix: keep r1, r2 out &gt; max TTL</Label>
        {row(394 - dy(5), [{ v: 'out', out: true }, { v: 'out', out: true }, { v: 'c1', tone: 'green' }, { v: 'c2' }, { v: 'c2' }], 'e')}
        <Label tone="green" x={(X[0] + X[4]) / 2} y={444 - dy(5)} size={T}>c2 gets two of five: no majority</Label>
        <Label x={(X[0] + X[4]) / 2} y={466 - dy(5)} size={T}>the real window is the TTL</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·c = rule sketch §7 */

const T7C = 'Scale out vs distribute';
const D7C =
  'Left, scale out: incoming requests are shared by three API servers, three times the requests. Right, distribute: five Redis nodes all hold the same one lock key; one has failed and one is down, and the lock survives two nodes down, but each acquire is slower.';

export function ScaleVsDistribute({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig7c-p' : 'fig7c';
  const s = (k: string) => `${id}-${k}`;
  // panel origins
  const a = [0, 0];
  const b = P ? [0, 168] : [236, 0];
  const nodes = [0, 1, 2, 3, 4].map((i) => b[0] + (P ? 40 : 30) + i * (P ? 60 : 44));
  return (
    <Fig id={id} w={P ? 320 : 480} h={P ? 336 : 178} title={T7C} desc={D7C}>
      {/* panel a: scale out */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Arrow tone="blue" pts={[[a[0] + (P ? 70 : 14), a[1] + 26 + i * 34], [a[0] + (P ? 180 : 104), a[1] + 26 + i * 34]]} seed={s(`r${i}`)} />
          <Box x={a[0] + (P ? 182 : 106)} y={a[1] + 12 + i * 34} w={70} h={28} label="api" seed={s(`api${i}`)} />
        </g>
      ))}
      <Label x={a[0] + (P ? 160 : 110)} y={a[1] + 132} size={14}>3× the requests</Label>
      <Label kind="title" x={a[0] + (P ? 160 : 110)} y={a[1] + 156} size={16}>scale out</Label>

      {/* panel b: distribute */}
      {nodes.map((x, i) => (
        <g key={i}>
          <Cyl cx={x} top={b[1] + 24} rx={16} h={34} seed={s(`n${i}`)} dashed={i === 4} />
          <Label kind="mono" x={x} y={b[1] + 52} size={14}>q7</Label>
          {i === 3 && <Cross x={x} y={b[1] + 42} size={26} seed={s('x')} />}
        </g>
      ))}
      <Label x={b[0] + (P ? 160 : 122)} y={b[1] + 94} size={14}>same one lock · survives 2 down</Label>
      <Label x={b[0] + (P ? 160 : 122)} y={b[1] + 113} size={14}>slower per acquire</Label>
      <Label kind="title" x={b[0] + (P ? 160 : 122)} y={b[1] + 156} size={16}>distribute</Label>
    </Fig>
  );
}

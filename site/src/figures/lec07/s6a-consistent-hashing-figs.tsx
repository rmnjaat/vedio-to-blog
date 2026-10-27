// Lecture 09 (lec07), chapter 6 part a (6.1–6.4): Fig 6·a (D-17 redraw: % 2 → % 3), Fig 6·b (D-18 redraw: the ring
// decides ownership), Fig 6·c (new: ring and array), Fig 6·d (D-19 redraw: adding cache 5), Fig 6·e (D-20 redraw,
// StepThrough: removing cache 1), Fig 6·f (new StepThrough: adding cache 5 safely) and the §6 rule-box sketch.
// Specs: lectures/lec07/lesson/figures.md §6. Ring glyphs: ./s6a-consistent-hashing-parts.
// Keys and nodes are told apart by mono labels and position, never by colour.
import React from 'react';
import { Arrow, Box, Bubble, Cross, Cyl, Label, Lifeline, Num, Step, StepState, TimeAxis } from '../kit/Kit';
import { Fig } from './floor';
import { KTable, RingArc, RingKey, RingLine, RingNode, at, type Layout, type RingG } from './s6a-consistent-hashing-parts';

/* the class example: four caches on a ring of 16 positions */
const NODES: [number, string][] = [[3, 'cache 1'], [5, 'cache 3'], [10, 'cache 4'], [12, 'cache 2']];
const SHORT: [number, string][] = [[3, 'c1'], [5, 'c3'], [10, 'c4'], [12, 'c2']];

/* ------------------------------------------------------------------ Fig 6·a: % 2 → % 3 */

const COLS = [56, 56, 64];
const HEAD = ['key', 'hash', 'node'];
const MOD2 = [['K1', '6', 'c0'], ['K2', '8', 'c0'], ['K3', '7', 'c1'], ['K4', '1', 'c1'], ['K5', '3', 'c1'], ['K6', '2', 'c0']];
const MOD3 = [['K1', '6', 'c0', ''], ['K2', '8', 'c2', 'r'], ['K3', '7', 'c1', ''], ['K4', '1', 'c1', ''], ['K5', '3', 'c0', 'r'], ['K6', '2', 'c2', 'r']];

export function ModTables({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6a-p' : 'l7-f6a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'hash % 2 → hash % 3 moves half the keys';
  const desc = 'Two tables of six keys with their hash values: K1 6, K2 8, K3 7, K4 1, K5 3, K6 2. With hash % 2 on two caches, K1, K2 and K6 go to c0 and K3, K4, K5 to c1. Adding cache 2 makes it hash % 3: K1 stays on c0, K3 and K4 stay on c1, but K2 moves to c2, K5 to c0 and K6 to c2. Three of six keys, 50%, move. On average going from % N to % (N+1) moves about N/(N+1) of the keys.';
  const t1 = { rows: MOD2.map((r) => ({ cells: r })) };
  const t2 = { rows: MOD3.map((r) => ({ cells: r.slice(0, 3), red: r[3] === 'r' })) };
  const head = (x: number, y: number, mod: string, sub: string, k: string) => (
    <g key={k}>
      <Label kind="mono" x={x} y={y}>{mod}</Label>
      <Label muted x={x} y={y + 19}>{sub}</Label>
    </g>
  );
  if (P)
    return (
      <Fig id={id} w={340} h={622} title={title} desc={desc}>
        {head(170, 22, 'hash % 2', 'two caches', 'h1')}
        <KTable x={82} y={52} cols={COLS} head={HEAD} rows={t1.rows} seed={s('t1')} />
        <Arrow pts={[[170, 246], [170, 288]]} seed={s('add')} />
        <Label anchor="start" x={182} y={272}>add a node</Label>
        {head(170, 312, 'hash % 3', 'cache 2 added', 'h2')}
        <KTable x={82} y={342} cols={COLS} head={HEAD} rows={t2.rows} seed={s('t2')} />
        <Label tone="red" x={170} y={552}>3 of 6 = 50% moved</Label>
        <Label muted x={170} y={578}>on average, % N → % (N+1)</Label>
        <Label muted x={170} y={598}>moves about N/(N+1) of the keys</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={600} h={316} title={title} desc={desc}>
      {head(138, 22, 'hash % 2', 'two caches', 'h1')}
      <KTable x={50} y={52} cols={COLS} head={HEAD} rows={t1.rows} seed={s('t1')} />
      <Arrow pts={[[250, 143], [338, 143]]} seed={s('add')} />
      <Label x={294} y={132}>add a node</Label>
      {head(448, 22, 'hash % 3', 'cache 2 added', 'h2')}
      <KTable x={360} y={52} cols={COLS} head={HEAD} rows={t2.rows} seed={s('t2')} />
      <Label tone="red" x={448} y={262}>3 of 6 = 50% moved</Label>
      <Label muted x={300} y={300}>on average, % N → % (N+1) moves about N/(N+1) of the keys</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·b: the ring decides ownership */

export function OwnershipRing() {
  const id = 'l7-f6b';
  const s = (k: string) => `${id}-${k}`;
  const g: RingG = { cx: 185, cy: 186, r: 95 };
  return (
    <Fig id={id} w={360} h={372} title="The ring decides ownership"
      desc="A ring of hash positions 0 to 15, 0 at the top, running clockwise. Each cache is placed by hashing its id: cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12. Key K1 hashes to 0; its owner is the first node clockwise, cache 1 at 3. A speech bubble on the ring says “I move your data for you”, the misconception: the ring only decides ownership.">
      <RingLine g={g} nums={[0, 3, 5, 10, 12]} seed={s('ring')} numSize={13.5} />
      {NODES.map(([p, n]) => <RingNode key={p} g={g} p={p} label={n} seed={s('n' + p)} />)}
      <RingKey g={g} p={0} seed={s('k1')} />
      <Label kind="mono" anchor="end" x={170} y={86}>K1</Label>
      <RingArc g={g} p0={0.35} p1={2.65} dr={14} seed={s('own')} tone="blue" />
      <Label kind="mono" tone="blue" anchor="start" x={252} y={76}>owner</Label>
      <Bubble x={8} y={12} w={142} h={42} tail={[112, 116]} lines={['I move your data', 'for you']} size={13.5} seed={s('bub')} />
      <Label x={180} y={336}>consistent hashing: for determining ownership</Label>
      <Label muted x={180} y={358}>owner = the first node clockwise</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c: ring and array */

const CELLS = ['3:c1', '5:c3', '10:c4', '12:c2'];

function SmallRing({ g, s }: { g: RingG; s: (k: string) => string }) {
  return (
    <g>
      <RingLine g={g} nums={[0, 3, 5, 10, 12]} seed={s('ring')} numSize={13} numDr={-28} />
      {SHORT.map(([p, n]) => <RingNode key={p} g={g} p={p} label={n} w={24} h={10} seed={s('n' + p)} />)}
      <RingKey g={g} p={0} seed={s('k1')} s={11} />
      <Label kind="mono" anchor="end" x={g.cx - 12} y={g.cy - g.r - 6}>K1</Label>
      <RingArc g={g} p0={0.4} p1={2.6} dr={12} seed={s('own')} tone="blue" />
    </g>
  );
}

function SortedArray({ x, y, cw, s }: { x: number; y: number; cw: number; s: (k: string) => string }) {
  return (
    <g>
      {CELLS.map((c, i) => (
        <g key={c}>
          <Box x={x + i * cw} y={y} w={cw} h={36} label={c} seed={s('c' + i)} />
          <Label kind="mono" muted x={x + i * cw + cw / 2} y={y - 8} size={13}>{`[${i}]`}</Label>
        </g>
      ))}
    </g>
  );
}

export function RingAndArray({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6c-p' : 'l7-f6c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Ring and array';
  const desc = 'Left, the ring: cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12, key K1 at 0. Right, the same information as a sorted array of four entries: 3 c1, 5 c3, 10 c4, 12 c2. To find K1’s owner, hash it to 0 and binary-search for the first position at or after 0: 3, so c1. A key that hashes to 13 is past the end, so the search wraps to index 0: c1 again.';
  if (P) {
    const g: RingG = { cx: 170, cy: 108, r: 72 };
    return (
      <Fig id={id} w={340} h={452} title={title} desc={desc}>
        <SmallRing g={g} s={s} />
        <Label anchor="start" x={30} y={226}>sorted array of positions</Label>
        <SortedArray x={30} y={258} cw={70} s={s} />
        <Arrow tone="blue" pts={[[65, 318], [65, 298]]} seed={s('k1a')} />
        <Label kind="mono" tone="blue" anchor="start" x={20} y={334}>hash(K1) = 0</Label>
        <Label anchor="start" x={20} y={356}>binary search: first ≥ 0 → 3 → c1</Label>
        <Label kind="mono" tone="blue" anchor="start" x={20} y={398}>hash(K9) = 13</Label>
        <Label anchor="start" x={20} y={420}>past the end → wrap to</Label>
        <Label anchor="start" x={20} y={440}>index 0 → c1</Label>
      </Fig>
    );
  }
  const g: RingG = { cx: 120, cy: 122, r: 76 };
  return (
    <Fig id={id} w={680} h={262} title={title} desc={desc}>
      <SmallRing g={g} s={s} />
      <Label muted x={120} y={250}>the picture</Label>
      <Label anchor="start" x={290} y={26}>sorted array of positions</Label>
      <SortedArray x={290} y={58} cw={86} s={s} />
      <Arrow tone="blue" pts={[[333, 122], [333, 98]]} seed={s('k1a')} />
      <Label kind="mono" tone="blue" anchor="start" x={290} y={140}>hash(K1) = 0</Label>
      <Label anchor="start" x={290} y={162}>binary search: first position ≥ 0 → 3 → c1</Label>
      <Label kind="mono" tone="blue" anchor="start" x={290} y={198}>hash(K9) = 13</Label>
      <Label anchor="start" x={290} y={220}>past the end → wrap to index 0 → c1</Label>
      <Label muted x={462} y={250}>the implementation</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d: adding cache 5 */

function AddRing({ g, s, size }: { g: RingG; s: (k: string) => string; size: number }) {
  return (
    <g>
      <RingLine g={g} nums={[0, 1, 3, 5, 10, 12]} seed={s('ring')} numSize={13} numDr={-32} />
      {NODES.map(([p, n]) => <RingNode key={p} g={g} p={p} label={n} size={size} seed={s('n' + p)} />)}
      <RingNode g={g} p={1} label="cache 5" tone="green" labelTone="green" size={size} seed={s('n1')} />
      <RingKey g={g} p={0} seed={s('k1')} />
      <Label kind="mono" anchor="end" x={g.cx - 12} y={g.cy - g.r - 8} size={size}>K1</Label>
      {/* the old owner, ghosted, inside the ring; the new owner, green, outside */}
      <RingArc g={g} p0={0.35} p1={2.65} dr={-15} seed={s('old')} className="faint" />
      <RingArc g={g} p0={0.2} p1={0.75} dr={14} seed={s('new')} tone="green" />
      {/* the slice that changes owner: (12, 1], a bracket just outside the ring */}
      <RingArc g={g} p0={12.6} p1={0.85} dr={26} seed={s('slice')} tone="green" weight="heavy" head="none" />
      <Label kind="mono" tone="green" anchor="end" x={at(g, 14, 34)[0]} y={at(g, 14, 34)[1]} size={size}>(12, 1]</Label>
    </g>
  );
}

export function AddCache5({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6d-p' : 'l7-f6d';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Adding cache 5';
  const desc = 'The ring of Fig 6·b with a new node, cache 5, hashed to position 1. Key K1 at 0 used to belong to cache 1 at 3; its first node clockwise is now cache 5. Only keys in the slice from 12 (exclusive) to 1 change owner, all from cache 1 to cache 5; every other key keeps its owner. The board: we create cache 5 using cache 1, then add it to the ring.';
  if (P) {
    const g: RingG = { cx: 176, cy: 176, r: 96 };
    return (
      <Fig id={id} w={340} h={470} title={title} desc={desc}>
        <AddRing g={g} s={s} size={14} />
        <Label anchor="start" x={20} y={338}>only keys in (12, 1] move:</Label>
        <Label kind="mono" anchor="start" x={20} y={360}>cache 1 → cache 5</Label>
        <Label anchor="start" x={20} y={390}>everyone else: untouched</Label>
        <Label muted anchor="start" x={20} y={428}>“we create cache 5 using cache 1,</Label>
        <Label muted anchor="start" x={20} y={448}>then add it to the ring”</Label>
      </Fig>
    );
  }
  const g: RingG = { cx: 190, cy: 192, r: 108 };
  return (
    <Fig id={id} w={640} h={360} title={title} desc={desc}>
      <AddRing g={g} s={s} size={14} />
      <Label anchor="start" x={396} y={130}>only keys in (12, 1] move:</Label>
      <Label kind="mono" anchor="start" x={396} y={152}>cache 1 → cache 5</Label>
      <Label anchor="start" x={396} y={190}>everyone else: untouched</Label>
      <Label muted anchor="start" x={396} y={250}>“we create cache 5 using cache 1,</Label>
      <Label muted anchor="start" x={396} y={270}>then add it to the ring”</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·e: removing cache 1 (StepThrough) */

/* Step labels in 6·e and 6·f cross lifelines: the floor's `halo` puts a paper box behind each one. */

export function RemoveCache1({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6e-p' : 'l7-f6e';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const R = P ? 58 : 84, L1 = P ? 172 : 220, L3 = P ? 290 : 356;
  const g: RingG = { cx: W / 2 + 6, cy: 104, r: 66 };
  const NX = P ? 39 : 46;
  const [c1p, c1n] = SHORT[0];
  const [c1x, c1y] = at(g, c1p);
  return (
    <Fig id={id} w={W} h={712} halo title="Removing cache 1: graceful or abrupt"
      desc="Top: the ring with cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12, and key K1 at 0 owned by cache 1. Below, lanes for the router, cache 1 and cache 3, time running down. 1: cache 1 holds the slice from 12 to 3 and is to be removed. 2, graceful: snapshot cache 1 and copy its data to cache 3. 3: remove cache 1 from the ring; on the ring K1’s owner is now cache 3, and the router’s request for K1 goes to cache 3 and hits. 4, abrupt: cache 1 just dies with no copy; the slice from 12 to 3 arrives at cache 3 cold, and a request for K1 misses. 5: either way, the ranges of cache 4 and cache 2 do not change.">
      <RingLine g={g} seed={s('ring')} />
      {SHORT.slice(1).map(([p, n]) => <RingNode key={p} g={g} p={p} label={n} w={24} h={10} seed={s('n' + p)} />)}
      <RingKey g={g} p={0} seed={s('k1')} s={11} />
      <Label kind="mono" anchor="end" x={g.cx - 12} y={g.cy - g.r - 6}>K1</Label>
      {/* steps 1–2: cache 1 is on the ring and owns K1 */}
      <StepState from={1} to={2}>
        <RingNode g={g} p={c1p} label={c1n} w={24} h={10} seed={s('n3')} />
        <RingArc g={g} p0={0.4} p1={2.6} dr={12} seed={s('own')} tone="blue" />
      </StepState>
      {/* from step 3: cache 1 is off the ring; K1's first node clockwise is cache 3 */}
      <StepState from={3}>
        <RingNode g={g} p={c1p} label={c1n} w={24} h={10} faint seed={s('n3x')} />
        <Cross x={c1x} y={c1y} size={14} seed={s('x1')} />
        <RingArc g={g} p0={0.5} p1={4.5} dr={-16} seed={s('own3')} tone="blue" />
      </StepState>

      <Box x={R - 38} y={196} w={76} h={30} label="router" labelSize={P ? 13 : 14} seed={s('hr')} />
      <Box x={L1 - 44} y={196} w={88} h={30} label="cache 1" seed={s('h1')} />
      <Box x={L3 - 44} y={196} w={88} h={30} label="cache 3" seed={s('h3')} />
      <Lifeline x={R} y0={226} y1={700} seed={s('lr')} />
      <Lifeline x={L1} y0={226} y1={700} seed={s('l1')} />
      <Lifeline x={L3} y0={226} y1={700} seed={s('l3')} />
      <TimeAxis x={10} y0={240} y1={700} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={268} n={1} />
        <Label kind="mono" x={L1} y={272} size={13.5}>owns (12, 3]: K1</Label>
        <Label x={L1} y={298}>over-provisioned: remove it</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={350} n={2} />
        <Label anchor="start" x={NX + 14} y={334}>graceful:</Label>
        <Arrow dashed pts={[[L1 + 4, 362], [L3 - 4, 362]]} seed={s('copy')} />
        <Label x={(L1 + L3) / 2} y={354}>snapshot + copy</Label>
        <Label kind="mono" tone="green" x={L3} y={392}>K1 ✓</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={430} n={3} />
        <Cross x={L1} y={428} size={18} seed={s('x3')} />
        <Label anchor="start" x={L1 + 16} y={433}>off the ring</Label>
        <Arrow tone="blue" pts={[[R + 4, 470], [L3 - 4, 470]]} seed={s('get3')} />
        <Label kind="mono" tone="blue" anchor="start" x={R + 10} y={462}>get K1</Label>
        <Label kind="mono" tone="green" anchor="start" x={L3 + 10} y={475}>hit</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={540} n={4} tone="red" />
        <Label anchor="start" x={NX + 14} y={524}>abrupt:</Label>
        <Cross x={L1} y={544} size={18} seed={s('x4')} />
        <Label tone="red" anchor="start" x={L1 + 16} y={549}>dies, no copy</Label>
        <Arrow tone="blue" pts={[[R + 4, 586], [L3 - 4, 586]]} seed={s('get4')} />
        <Label kind="mono" tone="blue" anchor="start" x={R + 10} y={578}>get K1</Label>
        <Label kind="mono" tone="red" anchor="start" x={L3 + 10} y={591}>miss</Label>
        <Label tone="red" anchor="end" x={W - 10} y={618}>the whole slice lands here, cold</Label>
        {/* on the ring: the slice that reaches cache 3 with nothing in it */}
        <RingArc g={g} p0={12.6} p1={2.6} dr={24} seed={s('cold')} tone="red" weight="heavy" head="none" />
        <Label kind="mono" tone="red" anchor="end" x={at(g, 14.2, 34)[0]} y={at(g, 14.2, 34)[1]} size={13}>(12, 3] cold</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={664} n={5} tone="green" />
        <Label anchor="start" x={NX + 14} y={669}>every other key stays where it was</Label>
        <RingArc g={g} p0={5.5} p1={11.5} dr={-9} seed={s('same')} tone="green" weight="heavy" head="none" />
        <Label tone="green" x={g.cx} y={g.cy + 18} size={13}>unchanged</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·f: adding cache 5 safely (StepThrough) */

export function AddSafely({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6f-p' : 'l7-f6f';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const R = P ? 60 : 74, C5 = P ? 142 : 176, C1 = P ? 222 : 276, DB = P ? 302 : 374;
  const BW = P ? 72 : 76;
  const T = P ? 13.5 : 14;
  const NX = 42;
  return (
    <Fig id={id} w={W} h={560} halo title="Adding cache 5 safely"
      desc="Lanes for the router, cache 5, cache 1 and the backend database, time running down. 1: a blank cache 5 is put on the ring at peak; a request for K1 goes to cache 5, misses, and falls through to the database, whose load rises. 2: instead, take a snapshot of cache 1 and build cache 5 from it. 3: then add cache 5 to the ring; the request for K1 hits. 4: then slowly delete the keys cache 1 no longer owns, the slice from 12 to 1.">
      <Box x={R - BW / 2} y={20} w={BW} h={30} label="router" labelSize={P ? 13 : T} seed={s('hr')} />
      <Box x={C5 - BW / 2} y={20} w={BW} h={30} label="cache 5" labelSize={P ? 13 : T} seed={s('h5')} />
      <Box x={C1 - BW / 2} y={20} w={BW} h={30} label="cache 1" labelSize={P ? 13 : T} seed={s('h1')} />
      <Cyl cx={DB} top={18} rx={P ? 17 : 20} ry={5} h={24} seed={s('db')} />
      <Label kind="mono" x={DB} y={68} size={T}>db</Label>
      {[R, C5, C1].map((x, i) => <Lifeline key={i} x={x} y0={50} y1={548} seed={s('l' + i)} />)}
      <Lifeline x={DB} y0={76} y1={548} seed={s('ld')} />
      <TimeAxis x={10} y0={80} y1={548} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={96} n={1} tone="red" />
        <Label kind="mono" muted x={C5} y={74} size={13}>blank</Label>
        <Arrow tone="blue" pts={[[R + 4, 104], [C5 - 4, 104]]} seed={s('g1')} />
        <Label kind="mono" tone="blue" x={(R + C5) / 2} y={96} size={13}>get K1</Label>
        <Label kind="mono" tone="red" anchor="start" x={C5 + 8} y={109} size={T}>miss</Label>
        <Arrow tone="red" pts={[[R + 4, 146], [DB - 4, 146]]} seed={s('fall')} />
        <Label tone="red" x={(C5 + C1) / 2} y={138} size={T}>falls through to the db</Label>
        <Label kind="mono" tone="red" x={DB} y={174} size={T}>load ↑</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={232} n={2} />
        <Label anchor="start" x={NX + 14} y={214} size={T}>instead:</Label>
        <Arrow dashed pts={[[C1 - 4, 240], [C5 + 4, 240]]} seed={s('snap')} />
        <Label x={(C5 + C1) / 2} y={232} size={T}>snapshot</Label>
        <Label kind="mono" tone="green" x={C5} y={268} size={T}>K1 ✓</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={318} n={3} tone="green" />
        <Label kind="mono" anchor="start" x={R + 8} y={316} size={13}>+ cache 5</Label>
        <Arrow tone="blue" pts={[[R + 4, 344], [C5 - 4, 344]]} seed={s('g3')} />
        <Label kind="mono" tone="blue" x={(R + C5) / 2} y={336} size={13}>get K1</Label>
        <Label kind="mono" tone="green" anchor="start" x={C5 + 8} y={349} size={T}>hit</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={414} n={4} />
        <Label x={C1} y={410} size={T}>slowly delete</Label>
        <Label kind="mono" x={C1} y={430} size={T}>(12, 1]</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §6 */

export function OwnershipRule() {
  const id = 'l7-r6';
  const s = (k: string) => `${id}-${k}`;
  const g: RingG = { cx: 92, cy: 84, r: 58 };
  return (
    <Fig id={id} w={340} h={168} title="Who owns it, that’s all"
      desc="A small ring with four nodes and one key; a curved arrow runs clockwise from the key to the next node, its owner. Nothing else is drawn: the ring decides ownership and nothing more.">
      <RingLine g={g} seed={s('ring')} />
      {[3, 5, 10, 12].map((p) => <RingNode key={p} g={g} p={p} w={20} h={9} seed={s('n' + p)} />)}
      <RingKey g={g} p={0} seed={s('k')} s={10} />
      <RingArc g={g} p0={0.4} p1={2.6} dr={11} seed={s('own')} tone="blue" />
      <Label anchor="start" x={196} y={78} size={17}>who owns it.</Label>
      <Label anchor="start" x={196} y={104} size={17}>that’s all.</Label>
    </Fig>
  );
}

// Lecture 09 (lec07), chapter 2 "One node, every byte counted".
// Fig 2·a (the hash table), Fig 2·b (stage 1 of the struct that grows), Fig 2·c (when the heap fills, D-05 redraw
// with the corrected panel), Fig 2·d (sizeof sees the wrapper, not the data), Fig 2·e (zmalloc and the cap, D-06
// redraw) and the §2 rule-box sketch (renumbered by the design fixer, critic C-13; section comments keep old names). Specs: lectures/lec07/lesson/figures.md §2. Glyphs: ./s2-one-node-parts.
import React from 'react';
import {
  Arrow, Blob, Bubble, BitBar, CodePanel, Code, Fig, Gauge, HBracket, Heap, Label, Line, Struct, Table, Tick,
  structRowY, structH,
} from './s2-one-node-parts';
import { Bracket } from '../kit/Kit';
import { chamferRect } from '../kit/hand';

type Layout = 'wide' | 'phone';

/* ------------------------------------------------------------------ Fig 2·a (2.2): storage is a hash table */

export function HashTable() {
  const id = 'l7-fig2a';
  const sh = 34, ty = 26;
  const keys = ['k1', 'k2', 'k3'];
  return (
    <Fig id={id} w={360} h={186} title="Storage is a hash table"
      desc="One node's storage: a hash table whose slots hold the keys k1, k2 and k3. Each slot holds a pointer to where its value lives in memory.">
      <Table x={30} y={ty} keys={keys} sw={56} sh={sh} seed={id + '-t'} />
      <Label x={146} y={16}>a pointer per key</Label>
      {keys.map((k, i) => {
        const yc = ty + sh * (i + 0.5);
        return (
          <g key={k}>
            <Arrow pts={[[88, yc], [206, yc]]} seed={`${id}-a${i}`} />
            <Blob x={210} y={yc - 13} w={110} label="value" seed={`${id}-v${i}`} />
          </g>
        );
      })}
      <Label kind="title" x={180} y={170}>storage = a hash table</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·a, continued (2.3): MyValue, stage 1 */

const TYPES = ['string', 'set', 'list', 'bloom'];
const ROWS = ['void *value;', 'unsigned type : 4;'];

export function StructStage1({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-fig2a2-p' : 'l7-fig2a2';
  const title = 'The struct that grows, stage 1';
  const desc = 'The key stays a plain key in the hash table. Its slot points at a small wrapper, MyValue, with two fields: a void pointer to the actual value, which can be a string, a set, a list or a Bloom filter, and a type field. The type needs only 4 bits of a 32-bit word: 4 bits give 16 types, and the codes are 0 string, 1 int, 2 set, 3 list.';
  if (P) {
    const sx = 104, sy = 24, row0 = structRowY(sy, 0), sb = sy + structH(2);
    const gx = [118, 214], gy = [176, 210];
    return (
      <Fig id={id} w={340} h={400} title={title} desc={desc}>
        <Table x={12} y={30} keys={['k1', 'k2', 'k3']} sw={52} sh={30} seed={id + '-t'} />
        <Arrow pts={[[66, 75], [sx - 2, 75]]} seed={id + '-a'} />
        <Label anchor="start" x={8} y={146}>the key stays</Label>
        <Label anchor="start" x={8} y={164}>a plain key</Label>
        <Struct x={sx} y={sy} w={226} rows={ROWS} seed={id + '-s'} />
        <Arrow pts={[[300, row0], [318, row0], [318, sb + 22], [250, sb + 22], [250, gy[0] - 4]]} seed={id + '-v'} />
        <Line weight="thin" pts={[[gx[0] + 40, gy[0] - 4], [gx[1] + 40, gy[0] - 4]]} seed={id + '-vl'} />
        {TYPES.map((t, i) => (
          <Blob key={t} x={gx[i % 2]} y={gy[Math.floor(i / 2)]} w={80} h={26} label={t} seed={`${id}-b${i}`} />
        ))}
        <Label x={210} y={260}>points at anything</Label>
        <BitBar x={42} y={286} w={256} seed={id + '-bb'} fields={[{ bits: 4, filled: true, label: 'type' }, { bits: 28, faint: true }]} />
        <Label anchor="start" x={92} y={326}>4 bits = 16 types</Label>
        <Label kind="mono" x={170} y={354}>0 string · 1 int · 2 set · 3 list</Label>
        <Label kind="title" x={170} y={388}>stage 1: key → MyValue</Label>
      </Fig>
    );
  }
  const sx = 200, sy = 40, row0 = structRowY(sy, 0), sb = sy + structH(2);
  const shY = [32, 68, 104, 140];
  return (
    <Fig id={id} w={720} h={312} title={title} desc={desc}>
      <Table x={30} y={40} keys={['k1', 'k2', 'k3']} sw={56} sh={34} seed={id + '-t'} />
      <Line weight="thin" pts={[[30, 91], [16, 91], [16, 160]]} seed={id + '-lead'} />
      <Label anchor="start" x={8} y={178}>the key stays</Label>
      <Label anchor="start" x={8} y={196}>a plain key</Label>
      <Arrow pts={[[88, 91], [sx - 2, 91]]} seed={id + '-a'} />
      <Struct x={sx} y={sy} w={240} rows={ROWS} seed={id + '-s'} />
      <Arrow pts={[[sx + 240, row0], [528, row0]]} seed={id + '-v'} />
      <Line weight="thin" pts={[[530, shY[0] + 13], [530, shY[3] + 13]]} seed={id + '-vl'} />
      {TYPES.map((t, i) => (
        <g key={t}>
          <Line weight="thin" pts={[[530, shY[i] + 13], [548, shY[i] + 13]]} seed={`${id}-vt${i}`} />
          <Blob x={550} y={shY[i]} w={92} h={26} label={t} seed={`${id}-b${i}`} />
        </g>
      ))}
      <Label x={596} y={20}>points at anything</Label>
      <Arrow pts={[[216, sb + 2], [216, 206]]} seed={id + '-ty'} />
      <BitBar x={sx} y={210} w={256} seed={id + '-bb'} fields={[{ bits: 4, filled: true, label: 'type' }, { bits: 28, faint: true }]} />
      <Label anchor="start" x={472} y={226}>4 bits = 16 types</Label>
      <Label kind="mono" anchor="start" x={sx} y={272}>0 string · 1 int · 2 set · 3 list</Label>
      <Label kind="title" x={360} y={304}>stage 1: key → MyValue</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b (2.4): when the heap fills */

function ThoughtExperiment({ ox, oy, tx, ty, id }: { ox: number; oy: number; tx: number; ty: number; id: string }) {
  return (
    <g>
      <Blob x={ox + 110} y={oy + 22} w={70} label="1 MB" dashed seed={id + '-blk'} />
      <Label anchor="start" x={ox + 190} y={oy + 40}>iteration 1025?</Label>
      <Arrow dashed pts={[[ox + 145, oy + 50], [ox + 145, oy + 76]]} seed={id + '-drop'} />
      <Label kind="mono" anchor="start" muted x={ox + 70} y={oy + 72} size={13}>heap</Label>
      <Heap x={ox + 70} y={oy + 80} s={150} fill={1} seed={id + '-heap'} />
      <Bubble x={ox + 230} y={oy + 112} w={100} h={46} tail={[ox + 222, oy + 150]} lines={['full heap', '→ segfault?']} seed={id + '-bub'} />
      <Label kind="mono" x={ox + 145} y={oy + 258}>malloc(1 MB) × 1024 = 1 GB</Label>
      <Label kind="title" x={tx} y={ty}>the thought experiment</Label>
    </g>
  );
}

function WhatHappens({ ox, oy, tx, id }: { ox: number; oy: number; tx: number; id: string }) {
  const t = ox + 20, a = ox + 46, b = ox + 66;
  const y1 = oy + 92, y2 = oy + 162, y3 = oy + 252;
  return (
    <g>
      <path className="ink shape" d={chamferRect(ox + 4, oy + 22, 156, 34, id + '-m')} />
      <Label kind="mono" x={ox + 82} y={oy + 44}>malloc #1025</Label>
      <Line pts={[[t, oy + 56], [t, y3]]} seed={id + '-trunk'} />
      {[y1, y2, y3].map((y, i) => <Arrow key={i} pts={[[t, y], [a - 4, y]]} seed={`${id}-br${i}`} />)}
      <Label kind="mono" anchor="start" x={a} y={y1 + 5}>malloc → NULL</Label>
      <Label anchor="start" tone="green" x={b} y={y1 + 29}>check it, refuse the write</Label>
      <Label anchor="start" x={a} y={y2 + 5}>Linux overcommit: malloc succeeds</Label>
      <Label anchor="start" muted x={b} y={y2 + 29}>later, touching the pages:</Label>
      <Label kind="mono" anchor="start" tone="red" x={b} y={y2 + 53}>OOM killer · SIGKILL</Label>
      <Label anchor="start" x={a} y={y3 + 5}>use the NULL anyway</Label>
      <Label kind="mono" anchor="start" tone="red" x={b} y={y3 + 29}>SIGSEGV</Label>
      <Label kind="mono" anchor="start" muted x={b} y={y3 + 56} size={12.5}>source: man malloc(3), signal(7)</Label>
      <Label kind="title" x={tx} y={oy + 340}>what actually happens</Label>
    </g>
  );
}

export function HeapFills({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-fig2b-p' : 'l7-fig2b';
  const title = 'When the heap fills';
  const desc = 'Left: the thought experiment. A program mallocs 1 MB at a time on a machine with 1 GB of RAM; after 1024 iterations the heap is full, and the class answered that iteration 1025 segfaults. Right: what actually happens to the 1025th malloc. Either malloc returns NULL, and a careful program checks it and refuses the write; or, with Linux overcommit, malloc succeeds and the process is killed later by the OOM killer with SIGKILL when the pages are touched; or the program uses the NULL anyway and gets SIGSEGV. Either way, the cache must cap its own memory.';
  if (P)
    return (
      <Fig id={id} w={340} h={712} title={title} desc={desc}>
        <ThoughtExperiment ox={-36} oy={0} tx={170} ty={296} id={id + '-a'} />
        <WhatHappens ox={4} oy={316} tx={170} id={id + '-b'} />
        <Label x={170} y={698} size={15}>either way: cap the memory yourself</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={800} h={376} title={title} desc={desc}>
      <ThoughtExperiment ox={0} oy={0} tx={170} ty={320} id={id + '-a'} />
      <Line dotted weight="thin" pts={[[352, 20], [352, 300]]} seed={id + '-sep'} />
      <WhatHappens ox={380} oy={-20} tx={580} id={id + '-b'} />
      <Label x={400} y={360} size={16}>either way: cap the memory yourself</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c (2.5): sizeof sees the wrapper */

export function SizeofVsData({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-fig2c-p' : 'l7-fig2c';
  const title = 'sizeof sees the wrapper, not the data';
  const desc = 'The MyValue wrapper is 16 bytes: sizeof covers only its pointer and its type. The pointer leads to a Bloom filter of 1 MB, allocated separately. Adding sizeof(MyValue) per key misses that megabyte; adding b inside every malloc counts everything the cache holds.';
  const rows = ['void *value;', 'int type;'];
  if (P) {
    const sy = 50, row0 = structRowY(sy, 0), sb = sy + structH(2);
    return (
      <Fig id={id} w={340} h={440} title={title} desc={desc}>
        <Struct x={20} y={sy} w={190} rows={rows} seed={id + '-s'} />
        <HBracket under x0={20} x1={210} y={sb + 8} label="sizeof = 16 B" seed={id + '-sz'} />
        <Arrow pts={[[210, row0], [250, row0], [250, 222]]} seed={id + '-p'} />
        <Blob x={20} y={226} w={280} h={80} label="bloom filter, 1 MB" seed={id + '-bf'} />
        <Bracket x={318} y0={sy} y1={306} tone="ink" label="what you actually use" size={13.6} seed={id + '-all'} />
        <Code x={20} y={346} parts={['size += sizeof(MyValue)']} />
        <Label anchor="start" tone="red" x={20} y={368}>misses the 1 MB</Label>
        <Tick x={14} y={402} s={6} seed={id + '-tk'} />
        <Code x={28} y={404} parts={['size += b in every malloc']} />
        <Label anchor="start" tone="green" x={28} y={426}>counts it all</Label>
      </Fig>
    );
  }
  const sy = 58, row0 = structRowY(sy, 0), sb = sy + structH(2);
  return (
    <Fig id={id} w={680} h={292} title={title} desc={desc}>
      <HBracket x0={30} x1={650} y={34} label="what you actually use" seed={id + '-all'} />
      <Struct x={30} y={sy} w={200} rows={rows} seed={id + '-s'} />
      <HBracket under x0={30} x1={230} y={sb + 8} label="sizeof = 16 B" seed={id + '-sz'} />
      <Arrow pts={[[230, row0], [316, row0]]} seed={id + '-p'} />
      <Blob x={320} y={sy} w={330} h={structH(2)} label="bloom filter, 1 MB" seed={id + '-bf'} />
      <Code x={30} y={248} parts={['size += sizeof(MyValue)']} />
      <Label anchor="start" tone="red" x={30} y={272}>misses the 1 MB</Label>
      <Tick x={348} y={246} s={6} seed={id + '-tk'} />
      <Code x={362} y={248} parts={['size += b in every malloc']} />
      <Label anchor="start" tone="green" x={362} y={272}>counts it all</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·d (2.6): zmalloc and the cap */

const ZM = (P: boolean): Parameters<typeof CodePanel>[0]['lines'] => [
  ['zmalloc(b) {'],
  ['  while total_size + b ', { t: '> maxmemory', tone: 'red' }],
  ['      ', { t: '→ evict', tone: 'red' }, { t: P ? '  // our design' : '      // our design', tone: 'muted' }],
  ['  o = malloc(b)'],
  ['  total_size += b'],
  ['  return o'],
  ['}'],
];

/** The machine (dashed, tall, broken by two ≈ marks: much more than drawn) with the 1 GB total_size bar standing at
 *  its foot, so the cap reads as a small slice of 32 GB (critic C-20: the outline was no taller than the bar). */
function CapGauge({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const W = 150, H = 236, mx = ox + W / 2;
  const gw = 46, gh = 62, gy = oy + H - 34 - gh, cap = gy;
  const brk = oy + 86;
  return (
    <g>
      <path className="ink shape faint" d={chamferRect(ox, oy, W, H, id + '-ghost', 2)} strokeDasharray="5 4" />
      <Label muted x={mx} y={oy + 26}>machine: 32 GB</Label>
      {[ox, ox + W].map((x) => (
        <g key={x}>
          <Line weight="thin" pts={[[x - 8, brk + 4], [x + 8, brk - 4]]} seed={`${id}-b${x}a`} />
          <Line weight="thin" pts={[[x - 8, brk + 11], [x + 8, brk + 3]]} seed={`${id}-b${x}b`} />
        </g>
      ))}
      <Gauge x={mx - gw / 2} y={gy} w={gw} h={gh} fill={0.9} seed={id + '-g'} />
      <Line dotted tone="red" pts={[[mx - 38, cap], [mx + 38, cap]]} seed={id + '-cap'} />
      <Label kind="mono" tone="red" x={mx} y={cap - 10}>maxmemory 1 GB</Label>
      <Label kind="mono" x={mx} y={oy + H - 12}>total_size</Label>
    </g>
  );
}

export function ZmallocCap({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-fig2d-p' : 'l7-fig2d';
  const title = 'zmalloc and the cap';
  const desc = 'zmalloc wraps malloc: in our design it first evicts keys (chapter 5) for as long as total_size plus b would pass maxmemory; then it mallocs b bytes, adds b to the global total_size and returns the object. Beside the code, a gauge of total_size sits just under its 1 GB cap, on a machine with 32 GB of RAM.';
  if (P)
    return (
      <Fig id={id} w={340} h={510} title={title} desc={desc}>
        <CodePanel x={4} y={8} w={332} lines={ZM(true)} seed={id + '-code'} />
        <Label anchor="start" muted x={14} y={240}>evict → chapter 5</Label>
        <CapGauge ox={95} oy={256} id={id} />
      </Fig>
    );
  return (
    <Fig id={id} w={720} h={286} title={title} desc={desc}>
      <CodePanel x={10} y={14} w={400} lines={ZM(false)} seed={id + '-code'} />
      <Arrow pts={[[414, 88], [448, 88]]} seed={id + '-ev'} />
      <Label anchor="start" muted x={454} y={93}>ch. 5</Label>
      <CapGauge ox={530} oy={24} id={id} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §2 */

export function EveryBit() {
  const id = 'l7-rule2';
  return (
    <Fig id={id} w={340} h={132} title="Every bit has a job"
      desc="One 32-bit word split into small fields of 4, 4 and 24 bits, each with its own job, instead of a whole integer per piece of metadata.">
      <Label kind="mono" muted x={170} y={22}>one 32-bit word</Label>
      <BitBar x={20} y={38} w={300} h={26} seed={id + '-bb'}
        fields={[{ bits: 4, filled: true, label: '4' }, { bits: 4, filled: true, label: '4' }, { bits: 24, label: '24' }]} />
      <Label x={170} y={120} size={16}>every bit has a job</Label>
    </Fig>
  );
}

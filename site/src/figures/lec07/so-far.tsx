// Lecture 9 (lec07): the "so far" maps shown at the top of every chapter. Two drawings, one per build, each growing
// chapter by chapter; the piece the previous chapter added sits on a blue wash with a small "new" note.
//   SoFarCopy  (Part 1, chapters 1–3 tops): the blog's API → prod db; publish → kafka → consumer → copy (stage 0);
//              + a cdc tool reading the db's log into the copy (stage 1); + a checkpoint on the log, three sinks and
//              the cache box that Part 2 opens (stage 2).
//   SoFarCache (Part 2, chapters 4–9 tops and the end of 9): one node, hash table → MyValue {value*, type:4} (0);
//              + zmalloc's total_size under maxmemory (1); + lru 24 bits, expires_at, evict/ttl rules (2); + a resp
//              port and one thread (3); + a router in front of three copies with key ranges (4); + the ring (5);
//              + replicas on the ring and an append-only file (6).
// Desk layouts 640 wide (about 1:1 on a laptop); phone layouts 330 wide. Kit parts only, through ./floor's Fig.
import React from 'react';
import { chamferRect, roundRect } from '../kit/hand';
import { Arrow, Box, Ceiling, Client, Cyl, Label, Line, Replica, Worker } from '../kit/Kit';
import { Fig } from './floor';
import { Struct } from './s3-eviction-and-expiry-parts';
import { RingLine, RingNode, type RingG } from './s6a-consistent-hashing-parts';

type Layout = 'desk' | 'phone';
export type CopyStage = 0 | 1 | 2;
export type CacheStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** The blue wash behind the piece a chapter adds, with a small "new" note. */
function New({ x, y, w, h, seed, nx = 0, ny = 0, anchor = 'start', note = true }: {
  x: number; y: number; w: number; h: number; seed: string; nx?: number; ny?: number; anchor?: 'start' | 'middle' | 'end'; note?: boolean;
}) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 7, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      {note && <Label muted x={nx} y={ny} anchor={anchor} size={13}>new</Label>}
    </g>
  );
}

/* ------------------------------------------------------------------ Part 1: the copies */

const COPY_DESC: Record<CopyStage, string> = {
  0: 'The blog so far: readers call the API server, which writes to the production database. When a post is published the API also publishes an event to Kafka, and a consumer writes it into a copy that search reads.',
  1: 'The blog so far: readers, the API server and the production database; the API still publishes events to Kafka for a consumer. Marked new: a CDC tool that reads the database’s own log and writes every change into the copy.',
  2: 'The blog so far: the API server and the production database, and a CDC tool that reads the database’s log, remembers a checkpoint in it, and keeps three copies in sync: search, a warehouse and a backup. Marked new: the checkpoint and the three sinks, and, beside the API, the shared cache it reads on every request, the box Part 2 opens.',
};

function CopyDesk({ stage }: { stage: CopyStage }) {
  const id = `sf-copy${stage}`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={640} h={236} title="The blog’s copies so far" desc={COPY_DESC[stage]}>
      {stage === 1 && <New x={250} y={106} w={150} h={58} seed={s('n')} nx={404} ny={100} />}
      {stage === 2 && <g>
        <New x={200} y={104} w={64} h={52} seed={s('n1')} nx={232} ny={172} anchor="middle" />
        <New x={440} y={100} w={196} h={104} seed={s('n2')} nx={632} ny={96} anchor="end" />
        <New x={88} y={130} w={100} h={60} seed={s('n3')} nx={92} ny={208} />
      </g>}

      <Client x={14} y={34} seed={s('u')} label="readers" />
      <Arrow tone="blue" pts={[[60, 51], [92, 51]]} seed={s('a1')} />
      <Box x={94} y={34} w={80} h={34} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[174, 51], [206, 51]]} seed={s('a2')} />
      <Cyl cx={232} top={30} rx={26} ry={6} h={34} label="prod db" seed={s('db')} />

      {/* the event path */}
      <Arrow tone="blue" pts={[[134, 34], [134, 14], [300, 14], [300, 28]]} seed={s('pub')} />
      <Label anchor="start" x={146} y={10} size={13}>publish</Label>
      <Box x={280} y={30} w={64} h={30} label="kafka" seed={s('kafka')} />
      <Arrow pts={[[344, 45], [370, 45]]} seed={s('k2c')} />
      <Worker x={372} y={30} w={100} h={30} label="consumer" seed={s('cons')} />
      <Arrow pts={[[472, 45], [520, 45]]} seed={s('c2copy')} />
      {stage < 2 && <Cyl cx={548} top={26} rx={26} ry={6} h={34} label="copy" seed={s('copy')} />}

      {stage >= 1 && <g>
        {/* the log under the database, and the cdc tool reading it */}
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} className="ink thin" d={chamferRect(208 + i * 9, 110, 9, 18, `${s('log')}${i}`, 1)} />
        ))}
        <Label kind="mono" anchor="end" x={202} y={124} size={13}>log</Label>
        <Line pts={[[232, 92], [232, 108]]} seed={s('dblog')} />
        <Worker x={290} y={112} w={90} h={30} label="cdc" seed={s('cdc')} />
        <Arrow pts={[[288, 127], [256, 120]]} seed={s('reads')} />
        <Label anchor="start" x={292} y={160} size={13}>reads the log</Label>
        {stage === 1 && <Arrow tone="blue" pts={[[380, 127], [548, 127], [548, 88]]} seed={s('cdc2copy')} />}
      </g>}
      {stage === 2 && <g>
        <Label tone="green" x={232} y={148} size={13}>checkpoint</Label>
        <Arrow tone="blue" pts={[[380, 127], [448, 127]]} seed={s('fan')} />
        {[['search', 116], ['warehouse', 148], ['backup', 180]].map(([n, y]) => (
          <g key={n as string}>
            <Line pts={[[448, y as number], [462, y as number]]} tone="blue" seed={s('f' + n)} />
            <Cyl cx={478} top={(y as number) - 10} rx={12} ry={3.5} h={16} seed={s('s' + n)} />
            <Label kind="mono" anchor="start" x={498} y={(y as number) + 4} size={13}>{n as string}</Label>
          </g>
        ))}
        <Line pts={[[448, 127], [448, 180]]} tone="blue" seed={s('fanv')} />
        <Line pts={[[448, 116], [448, 127]]} tone="blue" seed={s('fanu')} />
        <Label muted anchor="start" x={526} y={50} size={13}>app events</Label>
        <Box x={96} y={142} w={84} h={30} label="cache ?" seed={s('cache')} />
        <Line dashed pts={[[134, 68], [134, 140]]} seed={s('api2cache')} />
      </g>}

      <Label kind="title" x={320} y={228}>the blog’s copies so far</Label>
    </Fig>
  );
}

function CopyPhone({ stage }: { stage: CopyStage }) {
  const id = `sf-copy${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const h = stage === 0 ? 250 : 304;
  return (
    <Fig id={id} w={330} h={h} title="The blog’s copies so far" desc={COPY_DESC[stage]}>
      {stage === 1 && <New x={164} y={86} w={162} h={140} seed={s('n')} nx={322} ny={82} anchor="end" />}
      {stage === 2 && <g>
        <New x={168} y={114} w={62} h={20} seed={s('n1')} note={false} />
        <New x={100} y={250} w={228} h={24} seed={s('n2')} nx={324} ny={244} anchor="end" />
        <New x={4} y={190} w={92} h={42} seed={s('n3')} nx={50} ny={248} anchor="middle" />
      </g>}

      <Client x={8} y={30} seed={s('u')} />
      <Arrow tone="blue" pts={[[54, 47], [74, 47]]} seed={s('a1')} />
      <Box x={76} y={30} w={70} h={34} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[146, 47], [170, 47]]} seed={s('a2')} />
      <Cyl cx={198} top={26} rx={24} ry={6} h={32} label="prod db" seed={s('db')} />

      <Arrow tone="blue" pts={[[124, 64], [124, 138]]} seed={s('pub')} />
      <Label anchor="end" x={118} y={110} size={13}>publish</Label>
      <Box x={90} y={140} w={70} h={30} label="kafka" seed={s('kafka')} />
      <Arrow pts={[[160, 155], [176, 155]]} seed={s('k2c')} />
      <Worker x={178} y={140} w={100} h={30} label="consumer" seed={s('cons')} />
      {stage < 2 && <g>
        <Arrow pts={[[228, 170], [228, 194]]} seed={s('c2copy')} />
        <Cyl cx={228} top={196} rx={18} ry={5} h={20} seed={s('copy')} />
        <Label kind="mono" anchor="end" x={204} y={214} size={13}>copy</Label>
      </g>}
      {stage === 2 && <Label muted x={228} y={190} size={13}>app events</Label>}

      {stage >= 1 && <g>
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} className="ink thin" d={chamferRect(176 + i * 9, 94, 9, 16, `${s('log')}${i}`, 1)} />
        ))}
        <Label kind="mono" anchor="end" x={170} y={107} size={13}>log</Label>
        <Worker x={244} y={90} w={80} h={30} label="cdc" seed={s('cdc')} />
        <Arrow pts={[[242, 105], [224, 103]]} seed={s('reads')} />
        {stage === 1 && <Arrow tone="blue" pts={[[300, 120], [300, 206], [248, 206]]} seed={s('cdc2copy')} />}
      </g>}
      {stage === 2 && <g>
        <Label tone="green" x={198} y={128} size={13}>checkpoint</Label>
        <Arrow tone="blue" pts={[[300, 120], [300, 248]]} seed={s('fan')} />
        <Label kind="mono" anchor="end" x={322} y={266} size={13}>search · warehouse · backup</Label>
        <Box x={8} y={194} w={84} h={30} label="cache ?" seed={s('cache')} />
        <Line dashed pts={[[90, 64], [90, 82], [40, 82], [40, 192]]} seed={s('api2cache')} />
      </g>}
      <Label kind="title" x={165} y={h - 8}>the blog’s copies so far</Label>
    </Fig>
  );
}

export function SoFarCopy({ stage, layout = 'desk' }: { stage: CopyStage; layout?: Layout }) {
  return layout === 'phone' ? <CopyPhone stage={stage} /> : <CopyDesk stage={stage} />;
}

/* ------------------------------------------------------------------ Part 2: our Redis */

const CACHE_DESC: Record<CacheStage, string> = {
  0: 'Our Redis so far, one node: a hash table whose keys point at a small wrapper, MyValue, holding a pointer to the value and a 4-bit type. Marked new: the MyValue wrapper.',
  1: 'Our Redis so far, one node: a hash table of keys pointing at MyValue wrappers (value pointer, 4-bit type). Marked new: every allocation goes through zmalloc, which keeps total_size, capped at maxmemory.',
  2: 'Our Redis so far, one node: a hash table of keys pointing at MyValue wrappers, zmalloc keeping total_size under maxmemory. Marked new: two more fields in MyValue, 24 LRU bits and an absolute expires_at, and two rules: evict by LRU, LFU or random when full; expire lazily plus by sampling.',
  3: 'Our Redis so far, one node: a resp port, a hash table of keys pointing at MyValue wrappers (value, 4-bit type, 24 LRU bits, expires_at), zmalloc under maxmemory, eviction and expiry rules. Marked new: the resp port clients speak, and one thread that runs every command.',
  4: 'Our Redis so far: the single node, complete. Marked new: three copies of it, c1, c2 and c3, each owning a range of keys (a to j, k to t, u to z), and a router between the client and them.',
  5: 'Our Redis so far: the single node, and a client and a router in front of many nodes. Marked new: the nodes now sit on a ring of hash positions, and each key belongs to the first node clockwise from its hash.',
  6: 'Our Redis at the end of the lecture: one node with a resp port, one thread, a hash table of MyValue wrappers (value, type, LRU bits, expiry), zmalloc under maxmemory, eviction and expiry rules; many nodes on a ring behind a router. Marked new: a replica pulling from a node, and an append-only file on each node’s disk.',
};

const ROWS_A = [{ text: 'void *value;' }, { text: 'type : 4;' }];
const ROWS_B = [...ROWS_A, { text: 'lru : 24;' }, { text: 'expires_at;' }];

/** The single node: port, hash table, MyValue, the zmalloc line, the thread, the evict/ttl rules. Origin (nx, ny). */
function Node({ nx, ny, stage, s, size = 13 }: { nx: number; ny: number; stage: CacheStage; s: (k: string) => string; size?: number }) {
  const rows = stage >= 2 ? ROWS_B : ROWS_A;
  return (
    <g>
      {stage >= 3 && <g>
        <Box x={nx} y={ny + 32} w={44} h={26} label="resp" labelSize={size} seed={s('port')} />
        <Arrow pts={[[nx + 44, ny + 45], [nx + 54, ny + 45]]} seed={s('p2t')} />
      </g>}
      <Box x={nx + 56} y={ny + 28} w={92} h={34} label="hash table" labelSize={size} seed={s('ht')} />
      <Arrow pts={[[nx + 148, ny + 45], [nx + 164, ny + 45]]} seed={s('t2s')} />
      <Struct x={nx + 166} y={ny + 4} w={146} name="MyValue" rows={rows} rowH={22} size={size} seed={s('st')} />
      {stage >= 1 && <g>
        <Label kind="mono" anchor="start" x={nx} y={ny + 92} size={size}>zmalloc: total_size</Label>
        <Ceiling x0={nx} x1={nx + 60} y={ny + 104} seed={s('cap')} />
        <Label kind="mono" tone="red" anchor="start" x={nx + 66} y={ny + 109} size={size}>maxmemory</Label>
      </g>}
      {stage >= 3 && <Worker x={nx} y={ny + 122} w={104} h={28} label="1 thread" size={size} seed={s('thread')} />}
      {stage >= 6 && <Label kind="mono" anchor="start" x={nx} y={ny + 172} size={size}>+ aof on disk</Label>}
      {stage >= 2 && <g>
        <Label kind="mono" anchor="start" x={nx + 150} y={ny + 158} size={size}>evict: lru·lfu·random</Label>
        <Label kind="mono" anchor="start" x={nx + 150} y={ny + 176} size={size}>ttl: lazy + sample</Label>
      </g>}
    </g>
  );
}

function nodeWashes(stage: CacheStage, nx: number, ny: number, s: (k: string) => string) {
  if (stage === 0) return <New x={nx + 160} y={ny} w={158} h={98} seed={s('n')} nx={nx + 318} ny={ny - 4} anchor="end" />;
  if (stage === 1) return <New x={nx - 4} y={ny + 76} w={158} h={40} seed={s('n')} nx={nx - 4} ny={ny + 130} />;
  if (stage === 2) return <g>
    <New x={nx + 160} y={ny + 70} w={158} h={46} seed={s('n1')} nx={nx + 318} ny={ny - 4} anchor="end" />
    <New x={nx + 146} y={ny + 142} w={174} h={42} seed={s('n2')} nx={nx + 142} ny={ny + 170} anchor="end" />
  </g>;
  if (stage === 3) return <g>
    <New x={nx - 4} y={ny + 28} w={52} h={34} seed={s('n1')} nx={nx + 22} ny={ny + 22} anchor="middle" />
    <New x={nx - 4} y={ny + 118} w={112} h={36} seed={s('n2')} nx={nx + 112} ny={ny + 140} />
  </g>;
  if (stage === 6) return <New x={nx - 4} y={ny + 158} w={120} h={22} seed={s('n3')} note={false} />;
  return null;
}

/** The cluster: client → router → three range nodes (stage 4) or a ring (5+); replica from stage 6. Origin (cx0, cy0). */
const ringOf = (cx0: number, cy0: number): RingG => ({ cx: cx0 + 212, cy: cy0 + 97, r: 54 });

function Cluster({ cx0, cy0, stage, s, size = 13 }: { cx0: number; cy0: number; stage: CacheStage; s: (k: string) => string; size?: number }) {
  const g = ringOf(cx0, cy0);
  const ry = cy0 + 57; // the request line
  return (
    <g>
      <Client x={cx0} y={cy0 + 40} seed={s('cl')} />
      <Arrow tone="blue" pts={[[cx0 + 44, ry], [cx0 + 50, ry]]} seed={s('c2r')} />
      <Box x={cx0 + 52} y={cy0 + 40} w={62} h={34} label="router" labelSize={size} seed={s('router')} />
      {stage === 4 && <g>
        {[['c1', 'a–j', 30], ['c2', 'k–t', 82], ['c3', 'u–z', 134]].map(([n, r, y]) => (
          <g key={n as string}>
            <Arrow tone="blue" pts={[[cx0 + 114, ry], [cx0 + 140, ry], [cx0 + 140, cy0 + (y as number) + 13], [cx0 + 164, cy0 + (y as number) + 13]]} seed={s('r' + n)} />
            <Box x={cx0 + 166} y={cy0 + (y as number)} w={50} h={26} label={n as string} labelSize={size} seed={s('b' + n)} />
            <Label kind="mono" anchor="start" x={cx0 + 224} y={cy0 + (y as number) + 18} size={size}>{r as string}</Label>
          </g>
        ))}
      </g>}
      {stage >= 5 && <g>
        <Arrow tone="blue" pts={[[cx0 + 114, ry], [g.cx - 38, ry]]} seed={s('r2ring')} />
        <RingLine g={g} seed={s('ring')} />
        {[[3, 'c1'], [5, 'c3'], [10, 'c4'], [12, 'c2']].map(([p, n]) => (
          <RingNode key={p as number} g={g} p={p as number} label={n as string} w={22} h={10} gap={5} size={size} seed={s('rn' + p)} />
        ))}
        <Label kind="mono" muted x={g.cx} y={g.cy + 5} size={size}>ring</Label>
      </g>}
      {stage >= 6 && <g>
        <Replica cx={g.cx + 70} top={cy0 + 158} rx={12} ry={3.5} h={14} seed={s('rep')} />
        <Arrow dashed pts={[[g.cx + 62, cy0 + 158], [g.cx + 46, cy0 + 140]]} seed={s('pull')} />
        <Label x={g.cx + 70} y={cy0 + 196} size={size}>replica</Label>
      </g>}
    </g>
  );
}

function clusterWash(stage: CacheStage, cx0: number, cy0: number, s: (k: string) => string) {
  const g = ringOf(cx0, cy0);
  if (stage === 4) return <New x={cx0 + 134} y={cy0 + 24} w={144} h={144} seed={s('nc')} nx={cx0 + 278} ny={cy0 + 18} anchor="end" />;
  if (stage === 5) return <New x={g.cx - 76} y={cy0 + 26} w={152} h={142} seed={s('nc')} nx={g.cx + 76} ny={cy0 + 20} anchor="end" />;
  if (stage === 6) return <New x={g.cx + 44} y={cy0 + 148} w={52} h={56} seed={s('nc')} nx={g.cx + 40} ny={cy0 + 176} anchor="end" />;
  return null;
}

function CacheDesk({ stage }: { stage: CacheStage }) {
  const id = `sf-cache${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const many = stage >= 4;
  const nx = many ? 8 : 162, ny = 26;
  return (
    <Fig id={id} w={640} h={240} title="Our Redis so far" desc={CACHE_DESC[stage]}>
      {nodeWashes(stage, nx, ny, s)}
      {many && clusterWash(stage, 336, 4, s)}
      <Node nx={nx} ny={ny} stage={stage} s={s} />
      {many && <Cluster cx0={336} cy0={4} stage={stage} s={s} />}
      <Label kind="title" x={many ? 168 : 320} y={232}>one node</Label>
      {many && <Label kind="title" x={480} y={232}>many nodes</Label>}
    </Fig>
  );
}

function CachePhone({ stage }: { stage: CacheStage }) {
  const id = `sf-cache${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const many = stage >= 4;
  const nx = 6, ny = 26;
  return (
    <Fig id={id} w={330} h={many ? 470 : 240} title="Our Redis so far" desc={CACHE_DESC[stage]}>
      {nodeWashes(stage, nx, ny, s)}
      {many && clusterWash(stage, 16, 246, s)}
      <Node nx={nx} ny={ny} stage={stage} s={s} size={13} />
      <Label kind="title" x={165} y={232}>one node</Label>
      {many && <Cluster cx0={16} cy0={246} stage={stage} s={s} size={13} />}
      {many && <Label kind="title" x={165} y={462}>many nodes</Label>}
    </Fig>
  );
}

export function SoFarCache({ stage, layout = 'desk' }: { stage: CacheStage; layout?: Layout }) {
  return layout === 'phone' ? <CachePhone stage={stage} /> : <CacheDesk stage={stage} />;
}

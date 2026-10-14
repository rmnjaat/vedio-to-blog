// Lecture 06 (lec03), §7 Instagram: Snowflake inside the database.
// Fig 7·a "Twitter's 64 bits and Instagram's 64 bits" (D-20 drawn as a bar under D-17; board frame b_020345),
// Fig 7·b "Logical shards on a physical server" (D-19 redraw; frame b_020900), Fig 7·c "Moving a hot shard" (new),
// Fig 7·d "One insert, one ID" (new step-through; code page b_021045, b_021412) and the §7 rule-box sketch.
// The bit-field bar is drawn the way Fig 6·a draws it (cells proportional to bits, time cell heavy, unused bit thin).
// Instagram's three fields fill all 64 bits (41 + 13 + 10); Twitter's leave the top bit 0 (1 + 41 + 10 + 12).
// Ledger: 7·a L-0261..L-0264; 7·b L-0267, L-0268; 7·c L-0272, L-0274, L-0275; 7·d L-0278, L-0279, L-0282..L-0285,
// L-0287; rule sketch L-0287.
import React from 'react';
import { Arrow, Box, Cyl, Fig, Label, Line, Step } from '../kit/Kit';
import { chamferRect } from '../kit/hand';
import { TableBlock, Tick } from './s4-id-size-parts';

type Field = { bits: number; name: string; heavy?: boolean; unused?: boolean };
const TWITTER: Field[] = [
  { bits: 1, name: 'unused', unused: true },
  { bits: 41, name: 'time', heavy: true },
  { bits: 10, name: 'machine id' },
  { bits: 12, name: 'counter' },
];
const INSTAGRAM: Field[] = [
  { bits: 41, name: 'time', heavy: true },
  { bits: 13, name: 'shard id' },
  { bits: 10, name: 'sequence' },
];

/** Cell edges of a 64-bit bar from x0 to x1. */
function edges(x0: number, x1: number, fields: Field[]) {
  const u = (x1 - x0) / 64;
  const out: { a: number; b: number; m: number; f: Field }[] = [];
  let x = x0;
  for (const f of fields) { out.push({ a: x, b: x + f.bits * u, m: x + (f.bits * u) / 2, f }); x += f.bits * u; }
  return out;
}

/** The bit-field bar. `inside` replaces the bit counts written in the cells (undefined = leave the cell empty). */
function BitBar({ x0, x1, y, h, fields, seed, counts = true, size = 15 }: {
  x0: number; x1: number; y: number; h: number; fields: Field[]; seed: string; counts?: boolean; size?: number;
}) {
  return (
    <g>
      {edges(x0, x1, fields).map(({ a, b, m, f }, i) => (
        <g key={i}>
          <Line pts={[[a, y], [b, y], [b, y + h], [a, y + h], [a, y]]} weight={f.heavy ? 'heavy' : f.unused ? 'thin' : 'regular'}
            className={f.unused ? 'faint' : undefined} seed={`${seed}-c${i}`} />
          {counts && !f.unused && <Label kind="mono" x={m} y={y + h / 2 + size * 0.36} size={size}>{String(f.bits)}</Label>}
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 7·a */

export function TwoLayouts({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = "Twitter's 64 bits and Instagram's 64 bits";
  const desc = "Two 64-bit bars, one above the other. Twitter's Snowflake: an unused top bit, 41 bits of time, a 10-bit machine id (1024 machines) and a 12-bit counter (4096 IDs per millisecond per machine). Instagram's: 41 bits of milliseconds since its 2011 epoch, a 13-bit logical shard id (8192 shards) and a 10-bit per-shard sequence (1024 IDs per millisecond per shard), filling all 64 bits. Time stays on the left in both; only the two right-hand fields change width.";
  if (layout === 'phone') {
    const x0 = 14, x1 = 326;
    return (
      <Fig id="fig7a-p" w={340} h={286} title={title} desc={desc}>
        <Label kind="mono" anchor="start" x={x0} y={22} size={14}>twitter snowflake</Label>
        <BitBar x0={x0} x1={x1} y={32} h={36} fields={TWITTER} seed="f7a-p-t" size={14} />
        <Label kind="mono" anchor="start" x={x0} y={92} size={14}>0 · 41 time · 10 machine · 12 counter</Label>
        <Label kind="mono" muted anchor="start" x={x0} y={112} size={14}>1024 machines · 4096 ids per ms</Label>
        <Label kind="mono" anchor="start" x={x0} y={156} size={14}>instagram</Label>
        <BitBar x0={x0} x1={x1} y={166} h={36} fields={INSTAGRAM} seed="f7a-p-i" size={14} />
        <Label kind="mono" anchor="start" x={x0} y={226} size={14}>41 time since 2011 · 13 shard · 10 seq</Label>
        <Label kind="mono" muted anchor="start" x={x0} y={246} size={14}>2^13 = 8192 logical shards</Label>
        <Label kind="mono" muted anchor="start" x={x0} y={266} size={14}>2^10 = 1024 ids per ms per shard</Label>
      </Fig>
    );
  }
  const x0 = 40, x1 = 720;
  const T = edges(x0, x1, TWITTER), I = edges(x0, x1, INSTAGRAM);
  const ty = 48, iy = 206, h = 44;
  return (
    <Fig id="fig7a" w={760} h={336} title={title} desc={desc}>
      {/* Twitter, as in Fig 6·a */}
      <Label kind="mono" anchor="start" x={x0} y={22} size={14}>twitter snowflake</Label>
      <Label muted anchor="start" x={x0 - 2} y={40} size={13}>bit 63</Label>
      <Label muted x={T[2].a} y={40} size={13}>22</Label>
      <Label muted x={T[3].a} y={40} size={13}>12</Label>
      <Label muted anchor="end" x={x1 + 2} y={40} size={13}>0</Label>
      <BitBar x0={x0} x1={x1} y={ty} h={h} fields={TWITTER} seed="f7a-t" />
      <Label x={T[1].m} y={ty + h + 22} size={15}>time (ms since an epoch)</Label>
      <Label x={T[2].m} y={ty + h + 22} size={15}>machine id</Label>
      <Label x={T[3].m} y={ty + h + 22} size={15}>counter</Label>
      <Label kind="mono" muted x={T[2].m} y={ty + h + 42} size={13}>1024 machines</Label>
      <Label kind="mono" muted x={T[3].m} y={ty + h + 42} size={13}>4096 per ms</Label>

      {/* Instagram: the same 64 bits, all three fields used */}
      <Label kind="mono" anchor="start" x={x0} y={iy - 26} size={14}>instagram</Label>
      <Label muted anchor="start" x={x0 - 2} y={iy - 8} size={13}>bit 63</Label>
      <Label muted x={I[1].a} y={iy - 8} size={13}>23</Label>
      <Label muted x={I[2].a} y={iy - 8} size={13}>10</Label>
      <Label muted anchor="end" x={x1 + 2} y={iy - 8} size={13}>0</Label>
      <BitBar x0={x0} x1={x1} y={iy} h={h} fields={INSTAGRAM} seed="f7a-i" />
      <Label x={I[0].m} y={iy + h + 22} size={15}>time (ms since the 2011 epoch)</Label>
      <Label x={I[1].m} y={iy + h + 22} size={15}>shard id</Label>
      <Label x={I[2].m} y={iy + h + 22} size={15}>sequence</Label>
      <Label kind="mono" x={I[1].m} y={iy + h + 44} size={13}>2^13 = 8192</Label>
      <Label x={I[1].m} y={iy + h + 62} size={14}>logical shards</Label>
      <Label kind="mono" x={I[2].m} y={iy + h + 44} size={13}>1024 per ms</Label>
      <Label x={I[2].m} y={iy + h + 62} size={14}>per shard</Label>
      <Label muted anchor="start" x={x0} y={iy + h + 62} size={14}>time on the left in both</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ logical-shard glyph */

/** A logical shard: a small chamfered rectangle with three dots (D-19), optional mono name under it. */
function Shard({ cx, y, w = 60, h = 22, name, seed, tone = 'ink', size = 13 }: {
  cx: number; y: number; w?: number; h?: number; name?: string; seed: string; tone?: 'ink' | 'red'; size?: number;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(cx - w / 2, y, w, h, seed, 2)} />
      {[-8, 0, 8].map((d) => <circle key={d} className="dot" cx={cx + d} cy={y + h / 2} r={1.8} />)}
      {name && <Label kind="mono" x={cx} y={y + h + size + 3} size={size} tone={tone}>{name}</Label>}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 7·b */

export function LogicalShards({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig7b-p' : 'fig7b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Logical shards on a physical server';
  const desc = 'One physical database server, drawn as a large cylinder, holds several logical shards: insta1, insta2, insta5, insta9, insta12. Each logical shard is a database made with CREATE DATABASE, with the same tables as every other. Instagram ran thousands of logical shards, at most 2^13 = 8192, on far fewer physical servers (10 to 15 in the class’s example).';
  const cx = P ? 170 : 130;
  const shards = [
    { dx: -36, y: 60, n: 'insta1' }, { dx: 36, y: 60, n: 'insta2' },
    { dx: 0, y: 108, n: 'insta5' },
    { dx: -36, y: 156, n: 'insta9' }, { dx: 36, y: 156, n: 'insta12' },
  ];
  const lines: { t: string; kind: 'hand' | 'mono'; muted?: boolean; gap?: number }[] = [
    { t: 'logical shards (partitions)', kind: 'hand' },
    { t: '1000s, at most 2^13 = 8192', kind: 'mono' },
    { t: 'on physical db servers', kind: 'hand', gap: 14 },
    { t: 'say, 10–15 of them', kind: 'mono' },
    { t: 'CREATE DATABASE insta5;', kind: 'mono', gap: 14 },
    { t: '↓ logical separation', kind: 'hand' },
    { t: "(a schema in Instagram's Postgres)", kind: 'hand', muted: true },
  ];
  let ly = P ? 274 : 52;
  const lx = P ? 20 : 280;
  return (
    <Fig id={id} w={P ? 340 : 640} h={P ? 466 : 264} title={title} desc={desc}>
      <Cyl cx={cx} top={24} rx={100} ry={16} h={176} seed={s('srv')} label="physical server" />
      {shards.map((sh, i) => <Shard key={i} cx={cx + sh.dx} y={sh.y} name={sh.n} seed={s('sh' + i)} size={P ? 14 : 13} />)}
      {lines.map((l, i) => {
        ly += (i === 0 ? 0 : 22) + (l.gap ?? 0);
        return <Label key={i} kind={l.kind} muted={l.muted} anchor="start" x={lx} y={ly} size={l.kind === 'mono' ? 14 : 15}>{l.t}</Label>;
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·c */

function MovePanel({ ox, oy, after, P, seed }: { ox: number; oy: number; after: boolean; P: boolean; seed: string }) {
  const ax = ox + (P ? 72 : 80), bx = ox + (P ? 268 : 290), rx = P ? 54 : 58, top = oy + 34;
  const slots = [
    { dx: -27, y: 56 }, { dx: 27, y: 56 },
    { dx: -27, y: 98 }, { dx: 27, y: 98 },
    { dx: -27, y: 140 }, { dx: 27, y: 140 },
  ];
  const hot = 3;
  return (
    <g>
      <Cyl cx={ax} top={top} rx={rx} ry={11} h={148} seed={`${seed}-a`} label="server 1" />
      <Cyl cx={bx} top={top} rx={rx} ry={11} h={148} seed={`${seed}-b`} label={after ? 'server 2' : 'server 2 (new)'} />
      {slots.map((sl, i) => (i === hot && after) ? null : (
        <Shard key={i} cx={ax + sl.dx} y={oy + sl.y} w={44} h={18} seed={`${seed}-s${i}`} tone={i === hot ? 'red' : 'ink'} />
      ))}
      {!after && <Label tone="red" anchor="start" x={ax + rx + 6} y={oy + 112} size={15}>hot</Label>}
      {!after && <Label muted x={bx} y={oy + 112} size={14}>empty</Label>}
      {after && (
        <g>
          <Shard cx={bx} y={oy + 98} w={44} h={18} seed={`${seed}-moved`} />
          <Tick x={bx + 36} y={oy + 105} seed={`${seed}-tick`} />
          <Arrow dashed pts={[[ax + rx + 4, oy + 107], [bx - rx - 4, oy + 107]]} seed={`${seed}-mv`} />
          <Label x={(ax + bx) / 2} y={oy + 96} size={14}>dump → load</Label>
        </g>
      )}
    </g>
  );
}

export function MoveHotShard({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig7c-p' : 'fig7c';
  const title = 'Moving a hot shard';
  const desc = 'Panel a: server 1 holds six logical shards and one of them, outlined red, is hot; a new server 2 stands empty. Panel b: the hot shard has been dumped from server 1 and loaded onto server 2 as a whole, a dashed arrow marking the move, with a green tick. No rows are picked one by one.';
  if (P) {
    return (
      <Fig id={id} w={340} h={566} title={title} desc={desc}>
        <MovePanel ox={0} oy={0} after={false} P seed={`${id}-pa`} />
        <Label kind="title" x={170} y={250} size={16}>a · one shard runs hot</Label>
        <MovePanel ox={0} oy={272} after P seed={`${id}-pb`} />
        <Label kind="title" x={170} y={522} size={16}>b · move it whole</Label>
        <Label x={170} y={548} size={14}>no row-by-row picking</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={760} h={300} title={title} desc={desc}>
      <MovePanel ox={0} oy={0} after={false} P={false} seed={`${id}-pa`} />
      <MovePanel ox={390} oy={0} after P={false} seed={`${id}-pb`} />
      <Label kind="title" x={185} y={258}>a · one shard runs hot</Label>
      <Label kind="title" x={575} y={258}>b · move it whole</Label>
      <Label x={575} y={284} size={14}>no row-by-row picking: the shard moves whole</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·d (step-through) */

// A worked example for this page: now_ms = 1,676,784,716,000 (the class's timestamp, 19 Feb 2023), Instagram's
// epoch 1314220021721 (24 Aug 2011), shard 5, nextval = 5001 → 5001 % 1024 = 905.
export const EX = {
  nextval: '5001', seq: '905', ms: '362564694279',
  r1: '3041413094946373632', r2: '3041413094946378752', r3: '3041413094946379657',
};

export function OneInsertOneId({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig7d-p' : 'fig7d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const title = 'One insert, one ID';
  const desc = `An INSERT into insta5.photos gives no id, so the column default calls insta5.next_id(). The function takes nextval of the shard's sequence, ${EX.nextval}, modulo 1024: ${EX.seq}. It shifts the milliseconds since Instagram's epoch, ${EX.ms}, left by 23 into the top 41 bits, ORs in shard 5 shifted left by 10, then ORs in ${EX.seq}. The row is stored with id ${EX.r3}; the API server never made an ID.`;
  // the phone layout is packed tighter, so the whole drawing stays short next to the step text
  const L = P
    ? { fn: 58, s2: 112, by: 160, bh: 36, rows: [250, 298, 346], vy: 18, tbl: 404, H: 462 }
    : { fn: 74, s2: 134, by: 192, bh: 40, rows: [286, 332, 378], vy: 18, tbl: 436, H: 500 };
  const x0 = 10, x1 = W - 10, by = L.by, bh = L.bh;
  const ts = P ? 14 : 13; // mono size: the phone layout shows at ~0.88
  const E = edges(x0, x1, INSTAGRAM);
  const code = (y: number, c: string, v: string) => (
    <g>
      <Label kind="mono" anchor="start" x={x0} y={y} size={ts}>{c}</Label>
      <Label kind="mono" muted anchor="start" x={x0 + 24} y={y + L.vy} size={ts}>{'= ' + v}</Label>
    </g>
  );
  const cell = (i: number, v: string) => <Label kind="mono" x={E[i].m} y={by + bh / 2 + 4.7} size={ts}>{v}</Label>;
  return (
    <Fig id={id} w={W} h={L.H} title={title} desc={desc}>
      <Label kind="mono" anchor="start" x={x0} y={22} size={ts}>INSERT INTO insta5.photos (caption)</Label>
      <Label kind="mono" anchor="start" x={x0} y={40} size={ts}>VALUES ('sunset');</Label>
      <Label muted anchor="start" x={x0 + 164} y={40} size={14}>no id given</Label>

      {/* the empty bar, Instagram's layout */}
      {E.map((e, i) => <Label key={i} kind="mono" muted x={e.m} y={by - 8} size={ts}>{String(e.f.bits)}</Label>)}
      <BitBar x0={x0} x1={x1} y={by} h={bh} fields={INSTAGRAM} seed={s('bar')} counts={false} />
      <Label x={E[0].m} y={by + bh + 20} size={14}>ms since the epoch</Label>
      <Label x={E[1].m} y={by + bh + 20} size={14}>shard</Label>
      <Label x={E[2].m} y={by + bh + 20} size={14}>seq</Label>

      <Step n={1}>
        <Arrow tone="blue" pts={[[x0 + 16, 50], [x0 + 16, L.fn - 2]]} seed={s('call')} />
        <Box x={x0} y={L.fn} w={170} h={30} label="insta5.next_id()" labelSize={ts} seed={s('fn')} />
        <Label anchor="start" x={x0 + 182} y={L.fn + 20} size={14}>the column default</Label>
      </Step>
      <Step n={2}>
        <Label kind="mono" anchor="start" x={x0} y={L.s2} size={ts}>{`nextval('insta5.table_id_seq') = ${EX.nextval}`}</Label>
        <Label kind="mono" anchor="start" x={x0} y={L.s2 + 20} size={ts}>{`${EX.nextval} % 1024 → seq_id = ${EX.seq}`}</Label>
      </Step>
      <Step n={3}>
        {cell(0, EX.ms)}
        {code(L.rows[0], 'result := (now_ms - epoch) << 23', EX.r1)}
      </Step>
      <Step n={4}>
        {cell(1, '5')}
        {code(L.rows[1], 'result := result | (shard_id << 10)', EX.r2)}
      </Step>
      <Step n={5}>
        {cell(2, EX.seq)}
        {code(L.rows[2], 'result := result | seq_id', EX.r3)}
      </Step>
      <Step n={6}>
        <TableBlock x={x0} y={L.tbl} title="insta5.photos" cols={[{ h: 'id', w: 186 }, { h: 'caption', w: 92 }]}
          rows={[[EX.r3, "'sunset'"]]} seed={s('tbl')} size={ts} />
        <Tick x={x0 + 292} y={L.tbl + 34} seed={s('ok')} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §7 */

export function RuleIdInDb({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule7-p' : 'rule7';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The database fills in the ID';
  const desc = "An INSERT with no id travels into a database cylinder. The id column's default is next_id(), so the database makes the ID itself and the API side holds no ID logic.";
  const W = P ? 320 : 480, cx = P ? 214 : 300;
  return (
    <Fig id={id} w={W} h={P ? 176 : 150} title={title} desc={desc}>
      <Label kind="mono" x={P ? 86 : 136} y={52} size={P ? 14 : 13}>INSERT … (no id)</Label>
      <Arrow tone="blue" pts={[[P ? 12 : 30, 64], [cx - 46, 64]]} seed={s('ins')} />
      <Cyl cx={cx} top={30} rx={40} ry={10} h={56} seed={s('db')} />
      <Line weight="thin" pts={[[cx, 98], [cx, 112]]} seed={s('lead')} />
      <path className="ink shape" d={chamferRect(cx - 94, 112, 188, 26, s('tag'), 2)} />
      <Label kind="mono" x={cx} y={130} size={P ? 14 : 13}>id default next_id()</Label>
      {P
        ? <Label x={W / 2} y={164} size={14}>the database fills in the id</Label>
        : (
          <g>
            <Label anchor="start" x={cx + 52} y={56} size={14}>the database</Label>
            <Label anchor="start" x={cx + 52} y={74} size={14}>fills in the id</Label>
          </g>
        )}
    </Fig>
  );
}

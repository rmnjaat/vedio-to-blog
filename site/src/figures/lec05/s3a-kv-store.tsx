// Lecture 03 (lec05), §3.2–3.5 figures: Fig 3·a "The store table, built live" (D-06 redraw as a StepThrough) and
// Fig 3·b "Why the index can't help" (new, two panels). Built only from the kit and the lecture's shared glyphs.
// Spec: lectures/lec05/lesson/figures.md, chapter 3.
import React from 'react';
import { Arrow, Box, Bubble, Cross, Fig, Label, Line, Mark, Num, Step, TimeAxis } from './floor';
import { chamferRect } from '../kit/hand';
import { MiniTable } from './s2a-check-in-parts';
import { Ring, RowBox } from './s1-locks-parts';

/* ------------------------------------------------------------------ Fig 3·a: the store table, built live (StepThrough) */

const TS = 13; // table text size
/** Baseline of body row j (1-based) of a MiniTable at y (size 13, rowH 21). */
const rowBase = (y: number, j: number) => y + TS + 11 + j * 21 - 5;

export function StoreBuild({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3a-p' : 'fig3a';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 440;
  const X = P ? 50 : 64; // table left edge
  const NX = P ? 30 : 40;
  // band tops (table y) per step
  const Y = P ? [40, 130, 240, 352, 486] : [40, 150, 290, 408, 584];
  const H = P ? 600 : 700;
  const c3 = [{ h: 'key', w: 52 }, { h: 'value', w: 52 }, { h: 'expired_at', w: 96 }];
  return (
    <Fig id={id} w={W} h={H} title="The store table, built live"
      desc="Five versions of the key-value store's one table; time runs down. 1: key is the primary key, a VARCHAR(16), and the value is a BLOB, a black box. 2: created_at and ttl_sec columns, with a cleanup query that computes now() minus created_at for every row, so no index helps. 3: those two columns are replaced by expired_at, the absolute expiry time, indexed; cleanup is DELETE FROM store WHERE expired_at <= now(). 4: an is_deleted column is dropped; a delete sets expired_at to -1, and the same cleanup job removes the row. 5: PUT k1 v1 then PUT k1 v2: an upsert replaces v1 with v2 in one statement.">
      <TimeAxis x={P ? 10 : 16} y0={20} y1={H - 12} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={Y[0] + 12} n={1} size={TS} />
        <MiniTable x={X} y={Y[0]} title="store" cols={[{ h: 'key', w: 70 }, { h: 'value', w: 70 }]} rows={[['k1', '…']]} seed={s('t1')} />
        <Label kind="mono" anchor="start" x={X + 154} y={Y[0] + 18} size={TS}>{P ? 'PK, VARCHAR(16)' : 'key: PK, VARCHAR(16)'}</Label>
        <Label kind="mono" anchor="start" x={X + 154} y={Y[0] + 40} size={TS}>{P ? 'BLOB' : 'value: BLOB'}</Label>
        {!P && <Label kind="mono" muted anchor="start" x={X} y={Y[0] + 72} size={TS}>{'id → { … }'}</Label>}
        {!P && <Label muted anchor="start" x={X + 92} y={Y[0] + 72} size={TS}>query inside? then not a blob</Label>}
      </Step>

      <Step n={2}>
        <Num x={NX} y={Y[1] + 12} n={2} size={TS} />
        <MiniTable x={X} y={Y[1]} title="store"
          cols={[{ h: 'key', w: 52 }, { h: 'value', w: 52 }, { h: 'created_at', w: 96 }, { h: 'ttl_sec', w: 72 }]}
          rows={[['k1', 'v1', '11:50', '600']]} seed={s('t2')} />
        {!P && <Label kind="mono" anchor="start" x={X} y={Y[1] + 74} size={TS}>DELETE … WHERE now() - created_at &gt;= ttl_sec</Label>}
        {!P && <Ring x={X + 172} y={Y[1] + 69} rx={186} ry={16} seed={s('ring2')} />}
        <Label tone="red" anchor="start" x={X} y={Y[1] + (P ? 70 : 102)} size={TS}>computed per row: every row, every run</Label>
      </Step>

      <Step n={3}>
        <Num x={NX} y={Y[2] + 12} n={3} size={TS} />
        <MiniTable x={X} y={Y[2]} title="store" cols={c3} rows={[['k1', 'v1', '12:00']]} seed={s('t3')} />
        <Label kind="mono" muted anchor="start" x={P ? X : X + 220} y={P ? Y[2] + 72 : Y[2] + 16} size={TS}>created_at, ttl_sec</Label>
        <Mark tone="red" a={[P ? X - 4 : X + 216, P ? Y[2] + 68 : Y[2] + 12]} b={[P ? X + 152 : X + 372, P ? Y[2] + 68 : Y[2] + 12]} seed={s('x3')} />
        <Label tone="green" anchor="start" x={X + 214} y={Y[2] + (P ? 22 : 40)} size={TS}>{P ? 'indexed' : 'absolute time, indexed'}</Label>
        {!P && <Label kind="mono" tone="green" anchor="start" x={X} y={Y[2] + 72} size={TS}>DELETE FROM store WHERE expired_at &lt;= now()</Label>}
      </Step>

      <Step n={4}>
        <Num x={NX} y={Y[3] + 12} n={4} size={TS} />
        <MiniTable x={X} y={Y[3]} title="store" cols={[...c3, { h: 'is_del', w: 60 }]}
          rows={[['k1', 'v1', '12:00', ''], ['a', '—', '-1', '']]} seed={s('t4')} />
        <Ring x={X + 230} y={Y[3] + 13} rx={27} ry={11} seed={s('ring4')} />
        <Mark tone="red" a={[X + 204, Y[3] + 4]} b={[X + 256, Y[3] + 66]} seed={s('x4')} />
        <Ring tone="green" x={X + 152} y={rowBase(Y[3], 2) - 4} rx={18} ry={10} seed={s('m4')} />
        {!P && <Label kind="mono" anchor="start" x={X} y={Y[3] + 94} size={TS}>UPDATE store SET expired_at = -1</Label>}
        {!P && <Label kind="mono" anchor="start" x={X} y={Y[3] + 112} size={TS}>WHERE key = 'a'</Label>}
        <Label muted anchor="start" x={X} y={Y[3] + (P ? 92 : 134)} size={TS}>{P ? 'no is_deleted column: -1 marks it' : 'no is_deleted column; the same cleanup job removes it'}</Label>
      </Step>

      <Step n={5}>
        <Num x={NX} y={Y[4] + 12} n={5} size={TS} />
        <MiniTable x={X} y={Y[4]} title="store" cols={c3} rows={[['k1', '', '12:00']]} seed={s('t5')} />
        <Label kind="mono" muted x={X + 66} y={rowBase(Y[4], 1)} size={TS}>v1</Label>
        <Mark tone="red" a={[X + 56, rowBase(Y[4], 1) - 4]} b={[X + 76, rowBase(Y[4], 1) - 4]} seed={s('x5')} />
        <Label kind="mono" x={X + 90} y={rowBase(Y[4], 1)} size={TS}>v2</Label>
        <Label kind="mono" anchor="start" x={X + 216} y={Y[4] + 20} size={TS}>PUT k1 v1</Label>
        <Label kind="mono" anchor="start" x={X + 216} y={Y[4] + 42} size={TS}>PUT k1 v2</Label>
        {!P && <Line weight="thin" pts={[[X + 296, Y[4] + 8], [X + 304, Y[4] + 8], [X + 304, Y[4] + 48], [X + 296, Y[4] + 48]]} seed={s('br5')} />}
        <Box x={X} y={Y[4] + 66} w={P ? 230 : 300} h={30} tone="green" seed={s('up5')} labelSize={TS}
          label={P ? 'ON DUPLICATE KEY UPDATE' : 'INSERT … ON DUPLICATE KEY UPDATE'} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b: why the index can't help (two panels) */

/** A tiny B+ tree: one root, two internal nodes, four leaves (232 × 110). Leaf texts in mono. */
function TinyTree({ x, y, leaves, seed, faint }: { x: number; y: number; leaves: string[]; seed: string; faint?: boolean }) {
  const cls = faint ? 'ink shape faint' : 'ink shape';
  const node = (nx: number, ny: number, k: string) => <path key={k} className={cls} d={chamferRect(nx, ny, 52, 22, `${seed}-${k}`, 2)} />;
  const ln = (a: [number, number], b: [number, number], k: string) =>
    <Line key={k} weight="thin" className={faint ? 'faint' : undefined} pts={[a, b]} seed={`${seed}-${k}`} />;
  return (
    <g>
      {node(x + 90, y, 'r')}
      {node(x + 30, y + 44, 'i0')}
      {node(x + 150, y + 44, 'i1')}
      {[0, 1, 2, 3].map((i) => node(x + i * 60, y + 88, 'l' + i))}
      {ln([x + 116, y + 22], [x + 56, y + 44], 'e0')}
      {ln([x + 116, y + 22], [x + 176, y + 44], 'e1')}
      {ln([x + 56, y + 66], [x + 26, y + 88], 'e2')}
      {ln([x + 56, y + 66], [x + 86, y + 88], 'e3')}
      {ln([x + 176, y + 66], [x + 146, y + 88], 'e4')}
      {ln([x + 176, y + 66], [x + 206, y + 88], 'e5')}
      {leaves.map((t, i) => <Label key={'t' + i} kind="mono" muted={faint} x={x + i * 60 + 26} y={y + 103} size={12.5}>{t}</Label>)}
    </g>
  );
}

export function IndexCantHelp({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3b-p' : 'fig3b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 740;
  const H = P ? 612 : 300;
  const [ax, ay] = [P ? 0 : 0, 0];
  const [bx, by] = P ? [0, 312] : [460, 0];
  const rx = ax + (P ? 260 : 290); // rows column (panel a)
  const rw = P ? 66 : 96;
  const scanX = ax + (P ? 334 : 404);
  return (
    <Fig id={id} w={W} h={H} title="Why the index can't help"
      desc="Panel a: the cleanup condition now() minus created_at >= ttl_sec is computed from two columns and the clock for each row, so an index on created_at is no use and the job reads every row on every run. Panel b: with expired_at stored, the condition expired_at <= now() is a range on the indexed column: the scan enters the B+ tree at the leftmost leaf, reads the expired keys and stops at the first key after now().">
      {/* panel a */}
      <Bubble x={ax + 8} y={ay + 6} w={244} h={30} tail={[ax + 120, ay + 58]} lines={['just add an index on created_at?']} seed={s('bub')} />
      <TinyTree x={ax + (P ? 6 : 20)} y={ay + 62} leaves={['09:10', '10:40', '11:30', '11:55']} seed={s('ta')} faint />
      <Cross x={ax + (P ? 122 : 136)} y={ay + 116} size={34} seed={s('xa')} />
      <Label kind="mono" muted x={ax + (P ? 122 : 136)} y={ay + 194} size={13}>index on created_at</Label>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <RowBox key={i} x={rx} y={ay + 40 + i * 30} w={rw} h={24} label={`row ${i + 1}`} seed={s('ra' + i)} size={13} />
      ))}
      <Arrow tone="blue" pts={[[scanX, ay + 42], [scanX, ay + 214]]} seed={s('scan')} />
      <Label kind="mono" anchor="end" x={scanX} y={ay + 238} size={13}>rows read: all</Label>
      <Label tone="red" anchor="end" x={scanX} y={ay + 258} size={13}>each row: now() − created_at</Label>
      <Label kind="mono" x={P ? ax + 170 : ax + 210} y={ay + 284} size={14}>now() - created_at &gt;= ttl_sec</Label>
      {P && <Line dotted pts={[[10, 300], [330, 300]]} seed={s('sep')} />}

      {/* panel b */}
      <TinyTree x={bx + (P ? 50 : 20)} y={by + 62} leaves={['11:50', '11:58', '12:04', '12:30']} seed={s('tb')} />
      <Arrow tone="blue" pts={[[bx + (P ? 40 : 10), by + 150], [bx + (P ? 40 : 10), by + 184], [bx + (P ? 158 : 128), by + 184]]} seed={s('rng')} />
      <Mark tone="red" a={[bx + (P ? 166 : 136), by + 142]} b={[bx + (P ? 166 : 136), by + 196]} seed={s('now')} />
      <Label kind="mono" tone="red" x={bx + (P ? 166 : 136)} y={by + 214} size={13}>now() = 12:00</Label>
      <Label kind="mono" anchor="start" x={bx + (P ? 40 : 20)} y={by + 240} size={13}>rows read: expired only</Label>
      <Label muted anchor="start" x={bx + (P ? 40 : 20)} y={by + 260} size={13}>stops at the first key after now()</Label>
      <Label kind="mono" x={P ? bx + 170 : bx + 210} y={by + 284} size={14}>expired_at &lt;= now()</Label>
    </Fig>
  );
}

// Lecture 10 (lec10) overview, "Our storage so far" (design fixer, critic C-07): an unnumbered sketch of where
// storage stood before this lecture, one panel per earlier lecture, each headed by the lecture it comes from.
// Lecture 9: a cache like Redis, one hash table in memory, a ring of nodes to find each key, and an append-only
// file to come back after a restart. Lecture 3: a key-value store on MySQL, where a delete is an update to a magic
// value and a cleanup job removes those rows in batches. A recap of the paragraph above it: no new ledger ids.
// Desk: two panels side by side (600 wide); phone: stacked (340 wide).
import React from 'react';
import { Arrow, Box, Cache, Cyl, Label, Line, Queue } from '../kit/Kit';
import { ellipse } from '../kit/hand';
import { Fig, RowFile } from './s3-one-file-parts';

type PanelProps = { x: number; y: number; w: number; s: (k: string) => string };

function Head({ x, w, y, n }: { x: number; w: number; y: number; n: number }) {
  return <Label kind="mono" muted x={x + w / 2} y={y + 16}>{`Lecture ${n}`}</Label>;
}

function Foot({ x, w, y, lines }: { x: number; w: number; y: number; lines: string[] }) {
  return <g>{lines.map((t, i) => <Label key={i} x={x + w / 2} y={y + 146 + i * 20}>{t}</Label>)}</g>;
}

/** Lecture 9: one hash table in memory, a ring of nodes, an append-only file. */
function RedisPanel({ x, y, w, s }: PanelProps) {
  const rcx = x + w * 0.56, rcy = y + 66, r = 26;
  return (
    <g>
      <Head x={x} w={w} y={y} n={9} />
      <Cache x={x + 6} y={y + 30} w={100} h={76} label="in memory" rows={2} seed={s('ht')} />
      <path className="ink thin" d={ellipse(rcx, rcy, r, r, s('ring'))} />
      {[0, 1, 2, 3].map((i) => {
        const a = (i * Math.PI) / 2 - Math.PI / 4;
        return <Box key={i} x={rcx + Math.cos(a) * r - 7} y={rcy + Math.sin(a) * r - 7} w={14} h={14} seed={s('n' + i)} />;
      })}
      <Label kind="mono" x={rcx} y={y + 118}>ring</Label>
      <Queue x={x + w - 82} y={y + 54} w={54} h={22} cells={3} seed={s('aof')} />
      <Arrow pts={[[x + w - 4, y + 65], [x + w - 26, y + 65]]} seed={s('app')} />
      <Label kind="mono" x={x + w - 55} y={y + 98}>aof</Label>
      <Foot x={x} w={w} y={y} lines={['one hash table in memory,', 'a ring of nodes, an append-only file']} />
    </g>
  );
}

/** Lecture 3: key-value rows in MySQL; delete = update to a magic value, cleaned up in batches. */
function MysqlPanel({ x, y, w, s }: PanelProps) {
  return (
    <g>
      <Head x={x} w={w} y={y} n={3} />
      <Cyl cx={x + 34} top={y + 40} rx={24} h={40} label="mysql" seed={s('db')} />
      <RowFile x={x + 72} y={y + 32} w={112} rowH={26} rows={['k1 · v1', 'k2 · −1']} toneRows={{ 1: 'red' }} seed={s('kv')} />
      <Label tone="red" x={x + 128} y={y + 112}>−1 = deleted</Label>
      <Box x={x + w - 82} y={y + 46} w={76} h={36} label="cleanup" seed={s('job')} />
      <Arrow dashed pts={[[x + w - 84, y + 75], [x + 188, y + 75]]} seed={s('del')} />
      <Label x={x + w - 44} y={y + 104}>in batches</Label>
      <Foot x={x} w={w} y={y} lines={['key-value rows in MySQL;', 'delete = a magic value, batched cleanup']} />
    </g>
  );
}

const TITLE = 'Our storage so far';
const DESC = 'Two small panels, one per earlier lecture. Lecture 9: a cache like Redis keeps one hash table in memory, finds each key on a ring of nodes, and writes an append-only file to come back after a restart. Lecture 3: a key-value store on MySQL, where a delete is an update of the value to a magic −1 and a cleanup job removes those rows in batches.';

export function StorageSoFar({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'l10-sofar-p' : 'l10-sofar';
  const s = (k: string) => `${id}-${k}`;
  if (P)
    return (
      <Fig id={id} w={340} h={398} title={TITLE} desc={DESC}>
        <RedisPanel x={6} y={0} w={328} s={(k) => s('a-' + k)} />
        <Line pts={[[10, 196], [330, 196]]} weight="thin" dotted className="faint" seed={s('sep')} />
        <MysqlPanel x={6} y={204} w={328} s={(k) => s('b-' + k)} />
      </Fig>
    );
  return (
    <Fig id={id} w={620} h={196} title={TITLE} desc={DESC}>
      <RedisPanel x={0} y={0} w={300} s={(k) => s('a-' + k)} />
      <Line pts={[[310, 12], [310, 184]]} weight="thin" dotted className="faint" seed={s('sep')} />
      <MysqlPanel x={320} y={0} w={300} s={(k) => s('b-' + k)} />
    </Fig>
  );
}

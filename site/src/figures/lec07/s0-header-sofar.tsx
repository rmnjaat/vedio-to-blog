// Lecture 09 (lec07) overview, "Our Redis so far" (design fixer, critic C-09): an unnumbered sketch of where the
// cache stood before this lecture, one small panel per earlier lecture, each headed by the lecture it comes from.
// Lecture 1: heartbeats (the green dots) kept in a store with a TTL. Lecture 2: one shared Redis beside the API
// servers. Lecture 3: the key-value store with range shards and replicas. Lecture 5: the load balancer as a proxy,
// and five independent Redis nodes for Redlock. A recap of the paragraph above it: no new ledger ids.
// Desk: four panels in a row (664 wide); phone: two by two (340 wide).
import React from 'react';
import { Arrow, Box, Cyl, Label, Line, Replica } from '../kit/Kit';
import { Fig } from './floor';

type PanelProps = { x: number; y: number; s: (k: string) => string };

function Head({ x, y, n }: { x: number; y: number; n: number }) {
  return <Label kind="mono" muted x={x + 80} y={y + 16}>{`Lecture ${n}`}</Label>;
}

function Foot({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return <g>{lines.map((t, i) => <Label key={i} x={x + 80} y={y + 152 + i * 19}>{t}</Label>)}</g>;
}

/** Lecture 1: three online users' heartbeats land in a store whose keys expire. */
function Ttl({ x, y, s }: PanelProps) {
  return (
    <g>
      <Head x={x} y={y} n={1} />
      {[50, 80, 110].map((dy, i) => (
        <g key={i}>
          <circle className="dot-green" cx={x + 22} cy={y + dy} r={4.5} />
          <Arrow tone="blue" pts={[[x + 30, y + dy], [x + 84, y + 80 + (i - 1) * 9]]} seed={s('hb' + i)} />
        </g>
      ))}
      <Box x={x + 86} y={y + 62} w={62} h={36} label="ttl" seed={s('ttl')} />
      <Foot x={x} y={y} lines={['heartbeats', 'that expire']} />
    </g>
  );
}

/** Lecture 2: two API servers, one shared Redis beside the database. */
function Shared({ x, y, s }: PanelProps) {
  return (
    <g>
      <Head x={x} y={y} n={2} />
      <Box x={x + 8} y={y + 40} w={52} h={28} label="api" seed={s('a1')} />
      <Box x={x + 8} y={y + 92} w={52} h={28} label="api" seed={s('a2')} />
      <Box x={x + 92} y={y + 36} w={60} h={28} label="redis" seed={s('r')} />
      <Cyl cx={x + 122} top={y + 88} rx={20} ry={5} h={28} seed={s('db')} />
      <Label kind="mono" x={x + 122} y={y + 136}>db</Label>
      {/* both API servers join one line, which reaches the shared redis and the db */}
      <Line pts={[[x + 60, y + 54], [x + 74, y + 54], [x + 74, y + 106], [x + 60, y + 106]]} seed={s('bus')} />
      <Arrow pts={[[x + 74, y + 54], [x + 90, y + 50]]} seed={s('ar')} />
      <Arrow pts={[[x + 74, y + 106], [x + 100, y + 106]]} seed={s('ad')} />
      <Foot x={x} y={y} lines={['one shared redis']} />
    </g>
  );
}

/** Lecture 3: a key-value store split into range shards, each with a replica pulling from it. */
function Kv({ x, y, s }: PanelProps) {
  return (
    <g>
      <Head x={x} y={y} n={3} />
      <Box x={x + 52} y={y + 28} w={56} h={24} label="kv" seed={s('kv')} />
      <Line pts={[[x + 68, y + 52], [x + 44, y + 64]]} seed={s('l1')} />
      <Line pts={[[x + 92, y + 52], [x + 116, y + 64]]} seed={s('l2')} />
      <Cyl cx={x + 44} top={y + 66} rx={18} ry={5} h={22} seed={s('sh1')} />
      <Cyl cx={x + 116} top={y + 66} rx={18} ry={5} h={22} seed={s('sh2')} />
      {/* replication is a pull: replica → its shard */}
      <Replica cx={x + 44} top={y + 118} rx={11} ry={3} h={12} seed={s('rp1')} />
      <Replica cx={x + 116} top={y + 118} rx={11} ry={3} h={12} seed={s('rp2')} />
      <Arrow dashed pts={[[x + 44, y + 114], [x + 44, y + 98]]} seed={s('p1')} />
      <Arrow dashed pts={[[x + 116, y + 114], [x + 116, y + 98]]} seed={s('p2')} />
      <Foot x={x} y={y} lines={['range shards', '+ replicas']} />
    </g>
  );
}

/** Lecture 5: a load balancer that forwards (a proxy), and five independent Redis nodes for Redlock. */
function Lb({ x, y, s }: PanelProps) {
  return (
    <g>
      <Head x={x} y={y} n={5} />
      <Box x={x + 10} y={y + 44} w={44} h={30} label="lb" seed={s('lb')} />
      <Box x={x + 92} y={y + 32} w={52} h={24} label="api" labelSize={13} seed={s('a1')} />
      <Box x={x + 92} y={y + 64} w={52} h={24} label="api" labelSize={13} seed={s('a2')} />
      <Arrow tone="blue" pts={[[x + 54, y + 54], [x + 90, y + 44]]} seed={s('f1')} />
      <Arrow tone="blue" pts={[[x + 54, y + 64], [x + 90, y + 76]]} seed={s('f2')} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} x={x + 14 + i * 27} y={y + 106} w={22} h={16} seed={s('rl' + i)} />
      ))}
      <Foot x={x} y={y} lines={['lb as a proxy,', 'redlock on 5 redis']} />
    </g>
  );
}

const TITLE = 'Our Redis so far';
const DESC = 'Four small panels, one per earlier lecture. Lecture 1: green dots send heartbeats into a store with a TTL, so keys expire. Lecture 2: two API servers call one shared Redis that sits beside the database. Lecture 3: a key-value store split into two range shards, each with a dashed replica pulling from it. Lecture 5: a load balancer forwarding requests to API servers as a proxy, and five independent Redis nodes used for Redlock.';

export function RedisSoFar({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'l7-sofar-p' : 'l7-sofar';
  const s = (k: string) => `${id}-${k}`;
  const at = P ? [[0, 0], [176, 0], [0, 196], [176, 196]] : [[0, 0], [168, 0], [336, 0], [504, 0]];
  const panels = [Ttl, Shared, Kv, Lb];
  return (
    <Fig id={id} w={P ? 340 : 664} h={P ? 388 : 192} title={TITLE} desc={DESC}>
      {panels.map((Panel, i) => <Panel key={i} x={at[i][0]} y={at[i][1]} s={(k) => s(`p${i}-${k}`)} />)}
      {!P && [168, 336, 504].map((x) => <Line key={x} pts={[[x - 4, 10], [x - 4, 182]]} weight="thin" className="faint" seed={s('sep' + x)} />)}
    </Fig>
  );
}

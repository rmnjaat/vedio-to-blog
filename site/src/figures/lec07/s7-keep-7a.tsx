// Fig 7·a "Our Redis, end of Lecture 9" (new; figures.md §7). Clients → a router → a ring of five cache nodes, two with
// a dashed replica; one node exploded into a zoom bubble: the MyValue struct (stage 3), the zmalloc gauge with its
// maxmemory cap, the resp port, one thread, the eviction and expiry rules. Far left, smaller: the §1 CDC strip.
// Every part carries a section tag that links to its section (a recap; no new ids).
// Desk 880 wide; phone: the same parts as a vertical stack, the CDC strip as a row at the bottom (critic C-05).
import React from 'react';
import { Arrow, Box, Ceiling, Client, Cyl, Label, Line, Replica, Worker } from '../kit/Kit';
import { Fig } from './floor';
import { chamferRect, ellipse, poly } from '../kit/hand';
import { Bubbleish, Struct } from './s3-eviction-and-expiry-parts';

const HREF: Record<string, string> = {
  '1.3': '#s1-3', '1.4': '#s1-4', '2.3': '#s2-3', '2.6': '#s2-6', '3.4': '#s3-4', '3.5': '#s3-5', '4.3': '#s4-3',
  '4.5': '#s4-5', '5.4': '#s5-4', '6.2': '#s6-2', '6.7': '#s6-7',
};

function Tag({ x, y, no, anchor = 'middle', size = 14 }: { x: number; y: number; no: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return (
    <a href={HREF[no]} className="fig-tag">
      <Label kind="mono" muted anchor={anchor} x={x} y={y} size={size}>{`§${no}`}</Label>
    </a>
  );
}

const TITLE = 'Our Redis, end of Lecture 9';
const DESC = 'Clients send requests to a router (a proxy, a smart client or a redirect), which finds the owner of a key on a ring of five cache nodes; two nodes have a dashed replica that pulls from them. One node is opened up: requests arrive on a resp port; each value sits in a MyValue struct with its type, LRU bits and expiry; every allocation goes through zmalloc, which keeps total_size under a maxmemory cap; one thread runs the commands; when memory is full a key is evicted by LRU, LFU or random; expired keys go by lazy deletion plus sampling. Far left, smaller: a CDC tool reads a database log and writes a copy elsewhere. Each part is tagged with the section that covers it.';

const RING = { cx: 520, cy: 190, r: 90 };
const at = (deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [RING.cx + RING.r * Math.sin(a), RING.cy - RING.r * Math.cos(a)];
};
const NODES: [string, number][] = [['c1', 270], ['c2', 340], ['c3', 50], ['c4', 120], ['c5', 200]];

const ROWS = [{ text: 'void *value;' }, { text: 'int type : 4;' }, { text: 'lru_bits : 28;' }, { text: 'expires_at;' }];

export function OurRedis({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  if (layout === 'phone') return <OurRedisList />;
  const s = (k: string) => `f7a-${k}`;
  return (
    <Fig id="f7a" w={880} h={446} title={TITLE} desc={DESC}>
      {/* §1: the CDC strip */}
      <Tag x={70} y={24} no="1.3" />
      <Cyl cx={70} top={38} rx={26} ry={6} h={30} seed={s('src')} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} className="ink thin" d={chamferRect(40 + i * 10, 84, 10, 12, `${s('log')}${i}`, 1)} />
      ))}
      <Label kind="mono" anchor="start" x={104} y={95} size={13}>log</Label>
      <Worker x={35} y={140} w={72} h={30} label="cdc" seed={s('cdc')} />
      <Arrow pts={[[64, 140], [64, 100]]} seed={s('reads')} />
      <Label anchor="start" x={72} y={124} size={13}>reads</Label>
      <Arrow tone="blue" pts={[[64, 172], [64, 206]]} seed={s('writes')} />
      <Cyl cx={70} top={210} rx={26} ry={6} h={30} seed={s('sink')} label="copy" />

      {/* §5 and §6 sit 30 units left of their authored x, so the opened-node card can be 30 wider (critic C-23) */}
      <g transform="translate(-30 0)">
      {/* §5: clients and the router */}
      <Client x={180} y={148} seed={s('cl1')} />
      <Client x={180} y={208} seed={s('cl2')} />
      <Line pts={[[224, 165], [238, 165], [238, 190]]} tone="blue" seed={s('c1l')} />
      <Line pts={[[224, 225], [238, 225], [238, 190]]} tone="blue" seed={s('c2l')} />
      <Arrow tone="blue" pts={[[238, 190], [252, 190]]} seed={s('c0')} />
      <Box x={254} y={168} w={120} h={44} label="router" seed={s('router')} />
      <Label muted x={314} y={260} size={13}>proxy · client · redirect</Label>
      <Tag x={314} y={156} no="5.4" />
      <Arrow tone="blue" pts={[[374, 190], [406, 190]]} seed={s('route')} />

      {/* §6: the ring and its replicas */}
      <path className="ink" d={ellipse(RING.cx, RING.cy, RING.r, RING.r, s('ring'))} />
      <Label kind="mono" muted x={RING.cx} y={186} size={14}>ring</Label>
      <Tag x={RING.cx} y={206} no="6.2" />
      {NODES.map(([n, d]) => {
        const [x, y] = at(d);
        return <Box key={n} x={x - 20} y={y - 11} w={40} h={22} label={n} labelSize={13} seed={s(n)} />;
      })}
      <Replica cx={474} top={46} rx={12} ry={3.5} h={14} seed={s('rep1')} />
      <Arrow dashed pts={[[474, 70], [474, 92]]} seed={s('pull1')} />
      <Replica cx={474} top={312} rx={12} ry={3.5} h={14} seed={s('rep2')} />
      <Arrow dashed pts={[[474, 310], [474, 288]]} seed={s('pull2')} />
      <Label anchor="end" x={456} y={62} size={13}>replica</Label>
      <Label anchor="end" x={456} y={328} size={13}>replica</Label>
      <Tag x={456} y={348} no="6.7" anchor="end" />
      </g>

      {/* zoom into c3 (c3's right edge is at 579 after the shift); the card is 266 wide, § refs in a right column */}
      <Line pts={[[579, 121], [606, 30]]} dashed weight="thin" seed={s('z1')} />
      <Line pts={[[579, 143], [606, 250]]} dashed weight="thin" seed={s('z2')} />
      <Bubbleish x={606} y={20} w={266} h={410} seed={s('bub')} />
      <path className="ink shape" d={chamferRect(592, 40, 46, 22, s('port'), 2)} />
      <Label kind="mono" x={615} y={56} size={13}>resp</Label>
      <Tag x={862} y={56} no="4.3" anchor="end" />
      <Struct x={620} y={74} w={240} name="MyValue" rows={ROWS} rowH={21} size={13} seed={s('st')} />
      <Tag x={852} y={90} no="2.3" anchor="end" />
      {/* the zmalloc gauge */}
      <path className="ink shape" d={chamferRect(628, 226, 24, 86, s('gauge'), 2)} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} className="ink thin" d={poly([[631, 306 - i * 10], [649, 306 - i * 10]], `${s('fill')}${i}`)} />
      ))}
      <Ceiling x0={620} x1={660} y={236} seed={s('cap')} />
      <Label kind="mono" tone="red" anchor="start" x={668} y={240} size={13}>maxmemory</Label>
      <Label kind="mono" anchor="start" x={668} y={270} size={13}>zmalloc:</Label>
      <Label kind="mono" anchor="start" x={668} y={288} size={13}>total_size</Label>
      <Tag x={862} y={288} no="2.6" anchor="end" />
      <Worker x={620} y={330} w={120} h={30} label="1 thread" size={13} seed={s('thread')} />
      <Tag x={862} y={350} no="4.5" anchor="end" />
      <Label kind="mono" anchor="start" x={620} y={386} size={13}>evict: lru·lfu·random</Label>
      <Tag x={862} y={386} no="3.4" anchor="end" size={13} />
      <Label kind="mono" anchor="start" x={620} y={410} size={13}>ttl: lazy + sample</Label>
      <Tag x={862} y={410} no="3.5" anchor="end" size={13} />
    </Fig>
  );
}

/** Phone layout: the same architecture as a vertical stack. Clients → router → a smaller ring (c1 on top, two
 *  dashed replicas pulling from c2 and c5) → c3 opened into a callout card; the CDC strip as its own row at the bottom. */
const PRING = { cx: 170, cy: 264, r: 80 };
const pat = (deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [PRING.cx + PRING.r * Math.sin(a), PRING.cy - PRING.r * Math.cos(a)];
};
const PNODES: [string, number][] = [['c1', 0], ['c2', 72], ['c3', 144], ['c4', 216], ['c5', 288]];

function OurRedisList() {
  const s = (k: string) => `f7a-p-${k}`;
  const [c3x, c3y] = pat(144);
  return (
    <Fig id="f7a-p" w={340} h={850} title={TITLE} desc={DESC}>
      {/* §5: clients and the router */}
      <Client x={92} y={12} seed={s('cl1')} />
      <Client x={204} y={12} seed={s('cl2')} />
      <Line pts={[[114, 46], [114, 62], [170, 62]]} tone="blue" seed={s('c1l')} />
      <Line pts={[[226, 46], [226, 62], [170, 62]]} tone="blue" seed={s('c2l')} />
      <Arrow tone="blue" pts={[[170, 62], [170, 82]]} seed={s('c0')} />
      <Box x={110} y={84} w={120} h={36} label="router" seed={s('router')} />
      <Tag x={242} y={107} no="5.4" anchor="start" />
      <Label muted x={170} y={140} size={13.5}>proxy · client · redirect</Label>
      <Arrow tone="blue" pts={[[170, 148], [170, 171]]} seed={s('route')} />

      {/* §6: the ring and its replicas */}
      <path className="ink" d={ellipse(PRING.cx, PRING.cy, PRING.r, PRING.r, s('ring'))} />
      <Label kind="mono" muted x={PRING.cx} y={258} size={14}>ring</Label>
      <Tag x={PRING.cx} y={280} no="6.2" />
      {PNODES.map(([n, d]) => {
        const [x, y] = pat(d);
        return <Box key={n} x={x - 20} y={y - 11} w={40} h={22} label={n} labelSize={13.5} seed={s(n)} />;
      })}
      <Replica cx={310} top={198} rx={12} ry={3.5} h={14} seed={s('rep1')} />
      <Arrow dashed pts={[[300, 218], [270, 232]]} seed={s('pull1')} />
      <Label anchor="end" x={334} y={190} size={13.5}>replica</Label>
      <Replica cx={30} top={198} rx={12} ry={3.5} h={14} seed={s('rep2')} />
      <Arrow dashed pts={[[40, 218], [70, 232]]} seed={s('pull2')} />
      <Label anchor="start" x={6} y={190} size={13.5}>replica</Label>
      <Tag x={22} y={244} no="6.7" />

      {/* zoom into c3 */}
      <Line pts={[[c3x - 14, c3y + 11], [120, 368]]} dashed weight="thin" seed={s('z1')} />
      <Line pts={[[c3x + 14, c3y + 11], [300, 368]]} dashed weight="thin" seed={s('z2')} />
      <Bubbleish x={14} y={368} w={312} h={382} seed={s('bub')} />
      <path className="ink shape" d={chamferRect(30, 384, 52, 24, s('port'), 2)} />
      <Label kind="mono" x={56} y={401} size={13.5}>resp</Label>
      <Tag x={92} y={401} no="4.3" anchor="start" />
      <Struct x={30} y={420} w={236} name="MyValue" rows={ROWS} rowH={22} size={13.5} seed={s('st')} />
      <Tag x={276} y={437} no="2.3" anchor="start" />
      {/* the zmalloc gauge */}
      <path className="ink shape" d={chamferRect(38, 568, 22, 70, s('gauge'), 2)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} className="ink thin" d={poly([[41, 630 - i * 10], [57, 630 - i * 10]], `${s('fill')}${i}`)} />
      ))}
      <Ceiling x0={30} x1={68} y={578} seed={s('cap')} />
      <Label kind="mono" tone="red" anchor="start" x={78} y={583} size={13.5}>maxmemory</Label>
      <Label kind="mono" anchor="start" x={78} y={608} size={13.5}>zmalloc: total_size</Label>
      <Tag x={78} y={630} no="2.6" anchor="start" />
      <Worker x={30} y={652} w={112} h={30} label="1 thread" size={13.5} seed={s('thread')} />
      <Tag x={154} y={672} no="4.5" anchor="start" />
      <Label kind="mono" anchor="start" x={30} y={710} size={13.5}>evict: lru·lfu·random</Label>
      <Tag x={222} y={710} no="3.4" anchor="start" />
      <Label kind="mono" anchor="start" x={30} y={734} size={13.5}>ttl: lazy + sample</Label>
      <Tag x={222} y={734} no="3.5" anchor="start" />

      {/* §1: the CDC strip, set apart */}
      <Tag x={14} y={782} no="1.3" anchor="start" />
      <Cyl cx={36} top={796} rx={18} ry={5} h={24} seed={s('src')} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} className="ink thin" d={chamferRect(64 + i * 9, 803, 9, 12, `${s('log')}${i}`, 1)} />
      ))}
      <Label kind="mono" x={91} y={840} size={13.5}>log</Label>
      <Arrow pts={[[164, 810], [124, 810]]} seed={s('reads')} />
      <Label x={144} y={798} size={13.5}>reads</Label>
      <Worker x={166} y={796} w={68} h={28} label="cdc" size={13.5} seed={s('cdc')} />
      <Arrow tone="blue" pts={[[236, 810], [272, 810]]} seed={s('writes')} />
      <Cyl cx={298} top={796} rx={18} ry={5} h={24} seed={s('sink')} label="copy" />
    </Fig>
  );
}

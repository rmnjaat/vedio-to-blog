// Lecture 09 (lec07), chapter 6 part b (6.5–6.7): Fig 6·g (new: virtual nodes, where a new node's data comes from),
// Fig 6·h (D-21 redraw: a distributed hash table), Fig 6·i (D-20 bottom redraw + RF panel: two ways to survive a node)
// and Fig 6·j (D-22 redraw, small: the orchestrator, glimpsed on the board).
// Specs: lectures/lec07/lesson/figures.md §6. Ring glyphs: ./s6a-consistent-hashing-parts.
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cyl, Dot, Label, Line, Num, Replica } from '../kit/Kit';
import { Fig } from './floor';
import type { Pt } from '../kit/Kit';
import { Hoop, RingKey, RingLine, RingNode, arcPts, at, type Layout, type RingG } from './s6a-consistent-hashing-parts';

const SHORT: [number, string][] = [[3, 'c1'], [5, 'c3'], [10, 'c4'], [12, 'c2']];

/* ------------------------------------------------------------------ Fig 6·g: virtual nodes */

/** a copy arrow inside the ring, running counter-clockwise from the source node back to the new node */
function CopyBack({ g, from, to, seed }: { g: RingG; from: number; to: number; seed: string }) {
  return <Arrow dashed pts={arcPts(g, to, from, -13, 4).reverse()} seed={seed} />;
}

function OneToken({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  const g: RingG = { cx: x0 + 160, cy: y0 + 136, r: 86 };
  return (
    <g>
      <RingLine g={g} seed={s('ra')} />
      {SHORT.map(([p, n]) => <RingNode key={p} g={g} p={p} label={n} w={24} h={10} seed={s('a' + p)} />)}
      <RingNode g={g} p={1} label="new" tone="green" labelTone="green" w={24} h={10} seed={s('anew')} />
      <CopyBack g={g} from={2.7} to={1.3} seed={s('acopy')} />
      <Label x={x0 + 160} y={y0 + 262}>one source, one copy</Label>
      <Label kind="title" x={x0 + 160} y={y0 + 290}>one token per node</Label>
    </g>
  );
}

/* each physical node at three places (degrees on the ring); the new node at three places, each copying from its successor */
const VN: [number, string][] = [[15, 'c1'], [45, 'c3'], [75, 'c2'], [105, 'c4'], [135, 'c3'], [165, 'c1'], [195, 'c2'], [225, 'c4'], [255, 'c1'], [285, 'c2'], [315, 'c3'], [345, 'c4']];
const NEW = [[30, 45], [240, 255], [330, 345]];

function Virtual({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  const g: RingG = { cx: x0 + 160, cy: y0 + 136, r: 86, n: 360 };
  return (
    <g>
      <RingLine g={g} seed={s('rb')} />
      {VN.map(([d, n]) => <RingNode key={d} g={g} p={d} label={n} size={13} w={20} h={9} gap={4} seed={s('b' + d)} />)}
      {NEW.map(([d, src]) => (
        <g key={d}>
          <RingNode g={g} p={d} tone="green" w={20} h={9} seed={s('bn' + d)} />
          <CopyBack g={g} from={src - 4} to={d + 4} seed={s('bc' + d)} />
        </g>
      ))}
      <Label tone="green" x={x0 + 160} y={y0 + 140}>new node,</Label>
      <Label tone="green" x={x0 + 160} y={y0 + 158}>3 places</Label>
      <Label x={x0 + 160} y={y0 + 262}>same total (~1/N), from many sources</Label>
      <Label kind="title" x={x0 + 160} y={y0 + 290}>virtual nodes</Label>
    </g>
  );
}

export function VirtualNodes({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6g-p' : 'l7-f6g';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Virtual nodes: where a new node’s data comes from';
  const desc = 'Left, one token per node: four nodes on the ring and a new node at one position; its keys come from one neighbour, the next node clockwise, in one copy. Right, virtual nodes: each of c1 to c4 sits at three places on the ring, and the new node also sits at three places, so it copies three small slices from three different nodes. The total is the same, about 1/N of the data, but it comes from many sources. That buys smoother balance, since the load spreads evenly across the other nodes, and costs harder operations: many streams to coordinate instead of one copy.';
  if (P)
    return (
      <Fig id={id} w={340} h={712} title={title} desc={desc}>
        <OneToken x0={10} y0={0} s={s} />
        <Line pts={[[30, 312], [310, 312]]} seed={s('div')} className="faint" />
        <Virtual x0={10} y0={318} s={s} />
        <Label anchor="start" x={14} y={644}>cost: many streams to run</Label>
        <Label anchor="start" x={14} y={662}>instead of one copy</Label>
        <Label muted anchor="start" x={14} y={688}>gain: load spreads evenly</Label>
        <Label muted anchor="start" x={14} y={706}>across the others</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={680} h={372} title={title} desc={desc}>
      <OneToken x0={10} y0={0} s={s} />
      <Line pts={[[340, 20], [340, 280]]} seed={s('div')} className="faint" />
      <Virtual x0={350} y0={0} s={s} />
      <Label x={340} y={338}>cost: many streams to run instead of one copy</Label>
      <Label muted x={340} y={362}>gain: the load spreads evenly across the others</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·h: a distributed hash table */

function Chain({ x, y, s }: { x: number; y: number; s: (k: string) => string }) {
  const cy = y + 238;
  return (
    <g>
      <Label kind="mono" x={x} y={y + 14}>key</Label>
      <Arrow pts={[[x, y + 22], [x, y + 48]]} seed={s('c1')} />
      <Label kind="mono" x={x} y={y + 68}>hash function</Label>
      <Arrow pts={[[x, y + 76], [x, y + 102]]} seed={s('c2')} />
      <Label kind="mono" x={x} y={y + 122}>i</Label>
      <Line pts={[[x, y + 130], [x - 12, y + 196]]} seed={s('c3')} />
      <Cloud cx={x} cy={cy} w={240} h={124} seed={s('cloud')} />
      <Cyl cx={x - 62} top={cy - 34} rx={11} ry={3.5} h={16} seed={s('d1')} />
      <Cyl cx={x + 52} top={cy - 38} rx={11} ry={3.5} h={16} seed={s('d2')} />
      <Label kind="mono" anchor="start" x={x + 68} y={cy - 26} size={13}>k2</Label>
      <Cyl cx={x - 22} top={cy + 2} rx={11} ry={3.5} h={16} seed={s('d3')} />
      <Label kind="mono" anchor="start" x={x - 6} y={cy + 30} size={13}>k1 k3</Label>
      <Cyl cx={x + 62} top={cy + 6} rx={11} ry={3.5} h={16} seed={s('d4')} />
      <Label x={x} y={cy + 92}>no load balancer!</Label>
    </g>
  );
}

/** points along a quadratic curve a → b with control point c (for the board's curved lookup arrows) */
function curve(a: Pt, c: Pt, b: Pt, k = 14): Pt[] {
  return Array.from({ length: k + 1 }, (_, i) => {
    const t = i / k, u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]] as Pt;
  });
}

function Lookup({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  const X = (v: number) => x0 + v, Y = (v: number) => y0 + v;
  const ccx = X(222), ccy = Y(92);
  return (
    <g>
      <Label muted anchor="start" x={X(0)} y={Y(-14)}>decentralised</Label>
      <Actor x={X(34)} y={Y(76)} seed={s('act')} />
      <Label x={X(34)} y={Y(146)}>request</Label>
      <Cloud cx={ccx} cy={ccy} w={170} h={100} seed={s('peers')} />
      <Dot x={ccx - 56} y={ccy - 2} />
      <Dot x={ccx - 14} y={ccy - 26} />
      <Dot x={ccx + 14} y={ccy + 22} />
      <Dot x={ccx - 30} y={ccy + 28} />
      <Dot x={ccx + 40} y={ccy - 6} />
      <Num x={ccx + 58} y={ccy - 20} n={2} />
      <Arrow tone="blue" pts={[[X(54), ccy - 2], [ccx - 62, ccy - 2]]} seed={s('near')} />
      <Label x={X(104)} y={ccy - 10}>nearest</Label>
      <Arrow pts={curve([ccx - 60, ccy + 6], [X(110), Y(146)], [X(56), Y(110)])} seed={s('goto')} />
      {/* the same drawn numeral as on the node, not the font's ② glyph (critic C-19) */}
      <Label anchor="end" x={X(118)} y={Y(148)}>go to</Label>
      <Num x={X(132)} y={Y(143)} n={2} />
      <Arrow tone="blue" pts={curve([X(46), Y(66)], [X(190), Y(-34)], [ccx + 44, ccy - 12])} seed={s('arc')} />
    </g>
  );
}

const USES = ['distributed file systems', 'DNS servers', 'instant messaging', 'peer-to-peer sharing'];

function UseList({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Label anchor="start" x={x} y={y}>DHTs are used in building:</Label>
      {USES.map((u, i) => <Label key={u} anchor="start" x={x + 14} y={y + 24 + i * 22}>{`· ${u}`}</Label>)}
      <Label anchor="start" x={x} y={y + 132}>BitTorrent, IPFS use DHTs</Label>
      <Label muted anchor="start" x={x} y={y + 156} size={13}>(see “More precisely”)</Label>
    </g>
  );
}

export function DhtFigure({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6h-p' : 'l7-f6h';
  const s = (k: string) => `${id}-${k}`;
  const title = 'A distributed hash table';
  const desc = 'Top: a key goes through a hash function to a number i, which picks one of several storage nodes in a cloud: k2 on one node, k1 and k3 on another. There is no load balancer. Bottom: decentralised lookup. A request goes to the nearest node; it answers go to node 2; the requester then goes to node 2 itself. Beside it, the board’s list: DHTs are used in building distributed file systems, DNS servers, instant messaging and peer-to-peer sharing; BitTorrent and IPFS use DHTs (see More precisely).';
  if (P)
    return (
      <Fig id={id} w={340} h={780} title={title} desc={desc}>
        <Chain x={170} y={4} s={s} />
        <Lookup x0={12} y0={370} s={s} />
        <UseList x={20} y={588} />
      </Fig>
    );
  return (
    <Fig id={id} w={720} h={428} title={title} desc={desc}>
      <UseList x={20} y={34} />
      <Lookup x0={14} y0={250} s={s} />
      <Chain x={560} y={4} s={s} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·i: two ways to survive a node */

function ReplicaPanel({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  return (
    <g>
      <Box x={x0 + 40} y={y0 + 90} w={100} h={36} label="cache 1" seed={s('c1')} />
      <Replica cx={x0 + 236} top={y0 + 88} rx={30} ry={7} h={30} seed={s('rep')} label="replica" />
      <Arrow dashed pts={[[x0 + 204, y0 + 108], [x0 + 142, y0 + 108]]} seed={s('pull')} />
      <Label x={x0 + 150} y={y0 + 196}>standby takes over</Label>
      <Label muted x={x0 + 150} y={y0 + 218}>the price: one more node to run</Label>
      <Label kind="title" x={x0 + 150} y={y0 + 268}>a replica per node</Label>
    </g>
  );
}

function CopiesPanel({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  const g: RingG = { cx: x0 + 160, cy: y0 + 110, r: 78 };
  return (
    <g>
      <RingLine g={g} seed={s('ring')} />
      {SHORT.map(([p, n]) => <RingNode key={p} g={g} p={p} label={n} w={24} h={10} gap={9} seed={s('n' + p)} />)}
      {[3, 5, 10].map((p) => { const [x, y] = at(g, p); return <Hoop key={p} x={x} y={y} rx={17} ry={11} seed={s('h' + p)} />; })}
      <RingKey g={g} p={0} seed={s('k')} s={11} />
      <Label kind="mono" anchor="end" x={g.cx - 12} y={g.cy - g.r - 6}>K</Label>
      <Label tone="green" x={g.cx} y={g.cy + 4}>owner +</Label>
      <Label tone="green" x={g.cx} y={g.cy + 22}>next two</Label>
      <Label kind="mono" x={x0 + 160} y={y0 + 222}>replication factor 3</Label>
      <Label muted x={x0 + 160} y={y0 + 242}>three copies in all</Label>
      <Label kind="title" x={x0 + 160} y={y0 + 268}>copies on the next nodes</Label>
    </g>
  );
}

export function SurviveNode({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f6i-p' : 'l7-f6i';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Two ways to survive a node';
  const desc = 'Left: cache 1 with a dashed replica that pulls its data; if cache 1 goes down the standby takes over, at the cost of one more node to run. Right: the ring with key K at 0; its owner c1 and the next two nodes clockwise, c3 and c4, are ringed: each holds a copy. Three copies in all: a replication factor of 3.';
  if (P)
    return (
      <Fig id={id} w={340} h={572} title={title} desc={desc}>
        <ReplicaPanel x0={20} y0={-50} s={s} />
        <Line pts={[[30, 238], [310, 238]]} seed={s('div')} className="faint" />
        <CopiesPanel x0={10} y0={292} s={s} />
      </Fig>
    );
  return (
    <Fig id={id} w={640} h={282} title={title} desc={desc}>
      <ReplicaPanel x0={0} y0={0} s={s} />
      <Line pts={[[310, 20], [310, 250]]} seed={s('div')} className="faint" />
      <CopiesPanel x0={320} y0={0} s={s} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·j: the orchestrator (glimpsed) */

export function Orchestrator() {
  const id = 'l7-f6j';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={360} h={250} title="The orchestrator, glimpsed on the board"
      desc="An orchestrator box with a metadb beside it, holding metadata. Three cache servers send heartbeats up to it, so it knows which are alive and can handle failovers. A prometheus box monitors the servers. Glimpsed on the board only; the layout is approximate.">
      <Cyl cx={46} top={22} rx={26} ry={6} h={26} seed={s('meta')} label="metadb" />
      <Line pts={[[72, 40], [104, 40]]} seed={s('ml')} />
      <Box x={104} y={22} w={132} h={36} label="orchestrator" seed={s('orc')} />
      <Box x={244} y={24} w={112} h={32} label="prometheus" labelSize={13} seed={s('prom')} />
      <Label muted x={300} y={78} size={13}>monitors servers</Label>
      {[0, 1, 2].map((i) => <Box key={i} x={24 + i * 112} y={160} w={88} h={30} label={`cache ${i + 1}`} seed={s('c' + i)} />)}
      <Arrow pts={[[68, 160], [68, 124], [150, 124], [150, 58]]} seed={s('hb1')} />
      <Arrow pts={[[180, 160], [180, 58]]} seed={s('hb2')} />
      <Arrow pts={[[292, 160], [292, 124], [210, 124], [210, 58]]} seed={s('hb3')} />
      <Label x={100} y={116} size={13}>heartbeat</Label>
      <Label muted x={180} y={234} size={13}>glimpsed on the board; layout approximate</Label>
    </Fig>
  );
}

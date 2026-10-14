// Lecture 04 (lec02), chapter 1 "NoSQL is not one thing" (writer w1): this lecture's notation marks,
// Fig 1·a Two consistencies, Fig 1·b One instance vs spread out, Fig 1·c Anything that shards, scales,
// and the §1 RuleBox sketch. Specs: lectures/lec02/lesson/figures.md §1.
import React from 'react';
import {
  Actor, Arrow, Balancer, Box, Bubble, ColFile, Cross, Cyl, EdgeServer, Fig, KafkaPipe, Label, Line, Mark, Node,
  PubSub, SmallX, Tick, WsLine,
} from './s1-nosql-kit';
import { roundRect } from '../kit/hand';

type Layout = { layout?: 'wide' | 'phone' };

/* ------------------------------------------------------------------ notation: this lecture's marks */

const KEY_DESC = 'Notation for this lecture: three cylinders marked ×N are a sharded database; a sheet with a folded corner is one file per column (chapter 3); two circles and a line are a graph node and an edge (chapter 4); a box with a two-prong plug is an edge server holding users’ WebSockets; a double thin line marked WS is a WebSocket connection; a single line marked tcp is a server-to-server link; a pipe with dotted lanes and a broadcast mark is the real-time redis pub/sub, which pushes and keeps nothing; a pipe with a filled message square kept at its right end is kafka, which keeps messages for consumers to pull; a box with a compass is the balancer, which tells a client where to connect.';

function keyItems(s: (k: string) => string) {
  return [
    {
      g: (gx: number, cy: number) => (
        <g>
          {[-28, 0, 28].map((d, i) => <Cyl key={i} cx={gx - 6 + d} top={cy - 11} rx={10} ry={3} h={20} seed={s('sh' + i)} />)}
          <Label anchor="start" x={gx + 36} y={cy + 4}>×N</Label>
        </g>
      ),
      name: 'shards', t: 'a sharded database',
    },
    { g: (gx: number, cy: number) => <ColFile x={gx - 18} y={cy - 24} w={36} h={48} lines={2} seed={s('cf')} />, name: 'price.col', t: 'one file per column (ch. 3)' },
    {
      g: (gx: number, cy: number) => (
        <g>
          <Line pts={[[gx - 22, cy + 8], [gx + 22, cy - 8]]} seed={s('ge')} />
          <Node cx={gx - 22} cy={cy + 8} r={8} seed={s('n1')} />
          <Node cx={gx + 22} cy={cy - 8} r={8} seed={s('n2')} />
        </g>
      ),
      name: 'node · edge', t: 'a graph node and an edge (ch. 4)',
    },
    { g: (gx: number, cy: number) => <EdgeServer x={gx - 34} y={cy - 12} w={68} h={28} label="ws1" seed={s('es')} />, name: 'edge server', t: 'holds users’ WebSockets' },
    {
      g: (gx: number, cy: number) => (
        <g>
          <WsLine x0={gx - 42} x1={gx + 42} y={cy + 6} seed={s('ws')} />
          <Label kind="mono" x={gx} y={cy - 4}>WS</Label>
        </g>
      ),
      name: 'WS', t: 'a WebSocket connection',
    },
    {
      g: (gx: number, cy: number) => (
        <g>
          <Line pts={[[gx - 42, cy + 6], [gx + 42, cy + 6]]} seed={s('tcp')} />
          <Label kind="mono" x={gx} y={cy - 4}>tcp</Label>
        </g>
      ),
      name: 'tcp', t: 'server to server',
    },
    { g: (gx: number, cy: number) => <PubSub x={gx - 40} cy={cy + 4} w={74} ry={11} seed={s('ps')} />, name: 'redis pub/sub', t: 'pushes, keeps nothing' },
    { g: (gx: number, cy: number) => <KafkaPipe x={gx - 40} cy={cy} w={74} ry={11} seed={s('kf')} />, name: 'kafka', t: 'keeps messages, consumers pull' },
    { g: (gx: number, cy: number) => <Balancer x={gx - 36} y={cy - 14} w={72} h={28} seed={s('bal')} />, name: 'balancer', t: 'tells a client where to connect' },
  ];
}

/** This lecture's own marks, shown once under the course notation key at the top of chapter 1. */
export function LectureMarks({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l02-key-p' : 'l02-key';
  const s = (k: string) => `${id}-${k}`;
  const items = keyItems(s);
  const title = 'This lecture’s marks';
  if (P) {
    const RH = 58;
    return (
      <Fig id={id} w={340} h={items.length * RH + 8} title={title} desc={KEY_DESC}>
        {items.map((it, i) => {
          const cy = 30 + i * RH;
          return (
            <g key={i}>
              {it.g(50, cy)}
              <Label kind="mono" anchor="start" x={112} y={cy - 4}>{it.name}</Label>
              <Label anchor="start" muted x={112} y={cy + 15}>{it.t}</Label>
            </g>
          );
        })}
      </Fig>
    );
  }
  const RH = 62;
  return (
    <Fig id={id} w={760} h={5 * RH + 10} title={title} desc={KEY_DESC}>
      {items.map((it, i) => {
        const col = i < 5 ? 0 : 1, row = i < 5 ? i : i - 5;
        const ox = col * 390, cy = 34 + row * RH;
        return (
          <g key={i}>
            {it.g(ox + 58, cy)}
            <Label kind="mono" anchor="start" x={ox + 132} y={cy - 4}>{it.name}</Label>
            <Label anchor="start" muted x={ox + 132} y={cy + 16}>{it.t}</Label>
          </g>
        );
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·a Two consistencies */

/* ------------------------------------------------------------------ §1.1 sketch: one blanket, named stores */
// Unnumbered, notation-key scale (critic C-07). Each store is tagged with the type this lecture teaches it under.

const STORES: [string, string][] = [
  ['Cassandra', 'ingestion (ch. 5)'], ['MongoDB', 'documents (ch. 2)'], ['DynamoDB', 'key-value (ch. 2)'], ['Neo4j', 'graphs (ch. 4)'],
];

export function NamedStores() {
  const id = 'l02-fig1-names';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={268} title="Name the database, not the family"
      desc="A dashed blanket labelled NoSQL, struck through, over four named databases, each tagged with its workload: Cassandra for ingestion (chapter 5), MongoDB for documents and DynamoDB for key-value (chapter 2), Neo4j for graphs (chapter 4). Under it: name the database, not the family; each was built for a specific workload.">
      <Label muted x={170} y={24}>“NoSQL”</Label>
      <Mark a={[132, 19]} b={[208, 18]} seed={s('strike')} />
      <path className="ink thin" d={roundRect(14, 36, 312, 176, 14, s('blanket'))} strokeDasharray="6 5" />
      {STORES.map(([name, tag], i) => {
        const x = i % 2 ? 182 : 28, y = i < 2 ? 54 : 130;
        return (
          <g key={name}>
            <Box x={x} y={y} w={130} h={34} label={name} seed={s('b' + i)} />
            <Label x={x + 65} y={y + 56}>{tag}</Label>
          </g>
        );
      })}
      <Label x={170} y={238}>name the database, not the family</Label>
      <Label muted x={170} y={258}>each built for a specific workload</Label>
    </Fig>
  );
}

function AcidPanel({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-acid-${k}`;
  const xs = [8, 124, 240];
  return (
    <g>
      <Label x={ox + 170} y={oy + 40}>correct → correct → correct</Label>
      {xs.map((x, i) => (
        <g key={i}>
          <Box x={ox + x} y={oy + 76} w={92} h={40} label={`state ${i + 1}`} seed={s('b' + i)} />
          <Tick x={ox + x + 46} y={oy + 68} s={0.8} seed={s('t' + i)} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={'a' + i}>
          <Arrow pts={[[ox + xs[i] + 93, oy + 96], [ox + xs[i + 1] - 1, oy + 96]]} seed={s('a' + i)} />
          <Label kind="mono" x={ox + xs[i] + 108} y={oy + 136}>txn</Label>
        </g>
      ))}
      <Label x={ox + 170} y={oy + 176}>the data stays correct</Label>
      <Label kind="title" x={ox + 170} y={oy + 238}>a · ACID consistency</Label>
    </g>
  );
}

function CapPanel({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-cap-${k}`;
  const n1 = ox + 76, n2 = ox + 264;
  return (
    <g>
      <Actor x={ox + 22} y={oy + 12} seed={s('w')} />
      <Arrow tone="blue" pts={[[ox + 38, oy + 34], [n1, oy + 34], [n1, oy + 56]]} seed={s('wa')} />
      <Label kind="mono" tone="blue" anchor="start" x={n1 + 8} y={oy + 28}>write x = 2</Label>
      <Actor x={ox + 318} y={oy + 12} seed={s('r')} />
      <Arrow tone="blue" pts={[[ox + 302, oy + 34], [n2, oy + 34], [n2, oy + 56]]} seed={s('ra')} />
      <Label kind="mono" tone="blue" anchor="end" x={n2 - 8} y={oy + 28}>read x</Label>
      <Cyl cx={n1} top={oy + 66} rx={32} ry={8} h={40} label="node 1" seed={s('n1')} />
      <Cyl cx={n2} top={oy + 66} rx={32} ry={8} h={40} label="node 2" seed={s('n2')} />
      <Arrow dashed pts={[[n2 - 34, oy + 92], [n1 + 34, oy + 92]]} seed={s('cu')} />
      {/* the replica pulls (course rule): the arrow starts at node 2; the label says so (critic C-08) */}
      <Label x={(n1 + n2) / 2} y={oy + 66}>node 2 pulls,</Label>
      <Label x={(n1 + n2) / 2} y={oy + 84}>catches up</Label>
      <Label muted anchor="start" x={ox + 14} y={oy + 160}>the read returns:</Label>
      <Label kind="mono" tone="green" anchor="end" x={ox + 30} y={oy + 184}>2</Label>
      <Label tone="green" anchor="start" x={ox + 40} y={oy + 184}>strong: visible right away</Label>
      <Label kind="mono" tone="red" anchor="end" x={ox + 30} y={oy + 206}>1</Label>
      <Label tone="red" anchor="start" x={ox + 40} y={oy + 206}>eventual: old value for a while</Label>
      <Label kind="title" x={ox + 170} y={oy + 238}>b · CAP consistency</Label>
    </g>
  );
}

export function TwoConsistencies({ layout = 'wide' }: Layout) {
  const title = 'Two consistencies';
  const desc = 'Panel a, ACID consistency: each transaction moves the data from one correct state to the next, state 1 to state 2 to state 3, each ticked. Panel b, CAP consistency: a writer writes x = 2 to node 1 while a reader reads x from node 2, which pulls from node 1 to catch up later. A strongly consistent store returns 2 right away; an eventually consistent one may return the old value 1 for a while. Same word, two meanings.';
  if (layout === 'phone')
    return (
      <Fig id="l02-fig1a-p" w={340} h={540} title={title} desc={desc}>
        <AcidPanel ox={0} oy={0} id="l02-1a-p" />
        <Line dotted pts={[[20, 254], [320, 254]]} seed="l02-1a-p-sep" />
        <CapPanel ox={0} oy={262} id="l02-1a-p" />
        <Label x={170} y={530}>same word, two meanings</Label>
      </Fig>
    );
  return (
    <Fig id="l02-fig1a" w={760} h={282} title={title} desc={desc}>
      <AcidPanel ox={0} oy={0} id="l02-1a" />
      <Line dotted pts={[[380, 20], [380, 230]]} seed="l02-1a-sep" />
      <CapPanel ox={420} oy={0} id="l02-1a" />
      <Label x={380} y={274}>same word, two meanings</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·b One instance vs spread out */

function OnePanel({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-one-${k}`;
  const ys = [56, 96, 136];
  return (
    <g>
      {ys.map((y, i) => (
        <g key={i}>
          <Label kind="mono" x={ox + 22} y={oy + y + 5}>{'ABC'[i]}</Label>
          <Arrow tone="blue" pts={[[ox + 36, oy + y], [ox + 182, oy + y]]} seed={s('a' + i)} />
          <SmallX x={ox + 140} y={oy + y} s={6} seed={s('x' + i)} />
        </g>
      ))}
      <Cyl cx={ox + 236} top={oy + 52} rx={46} ry={11} h={84} label="db" seed={s('db')} />
      <Cross x={ox + 236} y={oy + 100} size={44} seed={s('cr')} />
      <Label tone="red" x={ox + 236} y={oy + 30}>everything down</Label>
      <Label muted x={ox + 170} y={oy + 192}>a standby replica can keep</Label>
      <Label muted x={ox + 170} y={oy + 210}>one primary available</Label>
      <Label kind="title" x={ox + 170} y={oy + 246}>a · relational, one instance</Label>
    </g>
  );
}

function SpreadPanel({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-spr-${k}`;
  const xs = [ox + 60, ox + 170, ox + 280];
  return (
    <g>
      {xs.map((x, i) => <Label key={'u' + i} kind="mono" x={x} y={oy + 26}>{'ABC'[i]}</Label>)}
      <Arrow tone="blue" pts={[[xs[0], oy + 34], [xs[0], oy + 98]]} seed={s('a0')} />
      <Arrow tone="blue" pts={[[xs[1], oy + 34], [xs[1], oy + 62], [xs[2] - 14, oy + 62], [xs[2] - 14, oy + 98]]} seed={s('a1')} />
      <Arrow tone="blue" pts={[[xs[2], oy + 34], [xs[2], oy + 98]]} seed={s('a2')} />
      {xs.map((x, i) => (
        <Cyl key={'n' + i} cx={x} top={oy + 108} rx={34} ry={9} h={42} label={`node ${i + 1}`} seed={s('n' + i)} />
      ))}
      <Cross x={xs[1]} y={oy + 128} size={34} seed={s('cr')} />
      <Tick x={xs[0] + 44} y={oy + 112} seed={s('t0')} />
      <Tick x={xs[2] + 44} y={oy + 112} seed={s('t2')} />
      <Label tone="green" x={ox + 170} y={oy + 210}>others still serve</Label>
      <Label kind="title" x={ox + 170} y={oy + 246}>b · spread over nodes</Label>
    </g>
  );
}

export function OneVsSpread({ layout = 'wide' }: Layout) {
  const title = 'One instance vs spread out';
  const desc = 'Panel a: all the data sits in one relational database instance; when it fails, the requests of users A, B and C all fail and everything is down (a standby replica can keep one primary available). Panel b: the data is spread over three nodes; node 2 fails, and the requests go to nodes 1 and 3, which still serve.';
  if (layout === 'phone')
    return (
      <Fig id="l02-fig1b-p" w={340} h={530} title={title} desc={desc}>
        <OnePanel ox={0} oy={0} id="l02-1b-p" />
        <Line dotted pts={[[20, 262], [320, 262]]} seed="l02-1b-p-sep" />
        <SpreadPanel ox={0} oy={272} id="l02-1b-p" />
      </Fig>
    );
  return (
    <Fig id="l02-fig1b" w={760} h={262} title={title} desc={desc}>
      <OnePanel ox={0} oy={0} id="l02-1b" />
      <Line dotted pts={[[380, 20], [380, 230]]} seed="l02-1b-sep" />
      <SpreadPanel ox={420} oy={0} id="l02-1b" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·c Anything that shards, scales */

export function AnythingShards() {
  const id = 'l02-fig1c';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={392} title="Anything that shards, scales"
      desc="Lecture 03’s key-value store on MySQL: a router sends keys from A to M to one MySQL database and keys from N to Z to another, for example the key mango to the first and pear to the second. It gave up cross-shard consistency and got horizontal scale, the same move non-relational databases make. The board’s box: NoSQL databases scaling does not mean SQL does not; anything that shards, scales.">
      <Actor x={30} y={22} seed={s('c')} />
      <Arrow tone="blue" pts={[[46, 44], [112, 44]]} seed={s('a0')} />
      <Box x={114} y={26} w={96} h={36} label="router" seed={s('rt')} />
      <Bubble x={220} y={0} w={116} h={44} tail={[212, 30]} lines={['relational DBs', 'don’t scale?']} seed={s('bb')} />
      <Arrow tone="blue" pts={[[146, 62], [146, 92], [80, 92], [80, 134]]} seed={s('a1')} />
      <Arrow tone="blue" pts={[[178, 62], [178, 92], [260, 92], [260, 134]]} seed={s('a2')} />
      <Label kind="mono" tone="blue" x={36} y={120}>"mango"</Label>
      <Label kind="mono" tone="blue" x={306} y={120}>"pear"</Label>
      <Cyl cx={80} top={144} rx={42} ry={10} h={48} label="mysql" sub="A–M" seed={s('s1')} />
      <Cyl cx={260} top={144} rx={42} ry={10} h={48} label="mysql" sub="N–Z" seed={s('s2')} />
      <Label x={170} y={268}>gave up cross-shard consistency,</Label>
      <Label x={170} y={287}>got horizontal scale</Label>
      <Box x={8} y={304} w={324} h={80} seed={s('board')} />
      <Label x={170} y={328}>NoSQL DBs scale does not mean</Label>
      <Label x={170} y={348}>SQL does not → anything</Label>
      <Label x={170} y={368}>that shards, scales</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ §1 RuleBox sketch */

export function NeverBelieveRule({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l02-rule1-p' : 'l02-rule1';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Never believe a generic statement';
  const desc = 'A speech bubble says X scales! Beside it a large question mark asks: for what workload? An arrow points at the question mark: find the counter-example.';
  if (P)
    return (
      <Fig id={id} w={320} h={170} title={title} desc={desc}>
        <Bubble x={10} y={10} w={124} h={38} tail={[54, 62]} lines={['X scales!']} seed={s('bb')} />
        <Label size={44} x={226} y={58}>?</Label>
        <Label x={160} y={96}>for what workload?</Label>
        <Arrow pts={[[150, 126], [208, 70]]} seed={s('ar')} />
        <Label muted x={150} y={152}>find the counter-example</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={480} h={124} title={title} desc={desc}>
      <Bubble x={14} y={12} w={130} h={40} tail={[56, 66]} lines={['X scales!']} seed={s('bb')} />
      <Label size={46} x={216} y={58}>?</Label>
      <Label x={216} y={102}>for what workload?</Label>
      <Arrow pts={[[300, 40], [240, 40]]} seed={s('ar')} />
      <Label muted anchor="start" x={306} y={45}>find the counter-example</Label>
    </Fig>
  );
}

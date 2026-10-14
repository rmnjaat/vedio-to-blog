// Lecture 01 (lec04), §4.1–4.5 Six million heartbeats a minute, part a. Writer w2.
// Fig 4·a The write load (D-10, frames b_010445, green note b_012600): wide 700 + phone 340.
// Fig 4·b One heartbeat, five trips (new StepThrough): lane figure 420 + phone 340.
// Fig 4·c The connection pool (D-11, frame b_010530): wide 600 + phone 340.
// Fig 4·d The pool is a queue inside the server (new; a hand annotation, no speech bubble): wide 600 + phone 340.
// Fig 4·e Three connections, four requests (new StepThrough): lane figure 420 + phone 340.
// RuleBox sketch §4 "start conservative": 480 + phone 320.
// Arrowheads sit on the initiator: users send heartbeats to the api, the api writes to the db, a handler calls the queue.
import React from 'react';
import { Actor, Arrow, Box, Bracket, Cyl, Dot, Fig, Label, Lifeline, Line, Mark, Num, Queue, Step, TimeAxis, type Tone } from './_kit';

type Layout = { layout?: 'wide' | 'phone' };

/** Heartbeat pulses: small blue dots along a line. */
function Pulses({ xs, y }: { xs: number[]; y: number }) {
  return <g>{xs.map((x, i) => <Dot key={i} x={x} y={y} tone="blue" />)}</g>;
}

/** TTL timer: a small clock face with one hand. */
export function Timer({ x, y, tone = 'ink', seed, size = 9 }: { x: number; y: number; tone?: Tone; seed: string; size?: number }) {
  const r = 9 * (size / 12.5);
  return (
    <g>
      <Num x={x} y={y} n="" tone={tone} size={size} />
      <Mark a={[x, y]} b={[x + r * 0.15, y - r * 0.7]} tone={tone} weight="thin" seed={seed + 'h1'} />
      <Mark a={[x, y]} b={[x + r * 0.6, y + r * 0.1]} tone={tone} weight="thin" seed={seed + 'h2'} />
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 4·a */

const T4A = 'The write load';
const D4A =
  'Arithmetic from the class board: one heartbeat every 10 seconds is 6 a minute per user; times 1 million active users is 6 million requests a minute; each request is one database write. Below, two users send heartbeats to an api server, which writes each one to the database. Next to the database, in red: 6 million updates per minute. The board’s later note: micro reads and updates, so the bottleneck is the network.';

const MATH = ['1 beat / 10 s → 6 / min / user', '× 1m active users', '= 6m requests / min', '1 request = 1 db write'];

export function WriteLoad({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4a-p' : 'fig4a';
  const s = (k: string) => `${id}-${k}`;
  const T = 14.5;
  if (P) {
    return (
      <Fig id={id} w={340} h={420} title={T4A} desc={D4A}>
        {MATH.map((m, i) => (
          <Label key={i} kind="mono" anchor="start" x={14} y={28 + i * 26 + (i === 3 ? 10 : 0)} size={T}>{m}</Label>
        ))}
        <Mark a={[14, 85]} b={[180, 85]} seed={s('u1')} />
        <Mark a={[14, 90]} b={[180, 90]} seed={s('u2')} />
        <Actor x={30} y={150} s={0.85} seed={s('a1')} />
        <Actor x={30} y={214} s={0.85} seed={s('a2')} />
        <Arrow tone="blue" pts={[[46, 174], [104, 174]]} seed={s('h1')} />
        <Arrow tone="blue" pts={[[46, 238], [76, 238], [76, 204], [104, 204]]} seed={s('h2')} />
        <Pulses xs={[60, 74, 88]} y={174} />
        <Label tone="blue" anchor="start" x={46} y={150} size={13}>heartbeat</Label>
        <Box x={106} y={160} w={84} h={58} label="api" seed={s('api')} />
        <Arrow tone="blue" pts={[[192, 189], [238, 189]]} seed={s('w')} />
        <Cyl cx={274} top={166} rx={32} h={40} seed={s('db')} label="db" />
        <Label tone="red" x={170} y={300} size={16}>6m updates per minute!!</Label>
        <Label x={170} y={346} size={T}>micro reads / updates</Label>
        <Label x={170} y={366} size={T}>→ network bottleneck</Label>
        <Label muted x={170} y={392} size={12.5}>(the board’s note, 01:25)</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={700} h={300} title={T4A} desc={D4A}>
      {MATH.map((m, i) => (
        <Label key={i} kind="mono" anchor="start" x={40} y={32 + i * 26 + (i === 3 ? 12 : 0)} size={15}>{m}</Label>
      ))}
      <Mark a={[40, 89]} b={[214, 89]} seed={s('u1')} />
      <Mark a={[40, 94]} b={[214, 94]} seed={s('u2')} />
      <Actor x={64} y={164} seed={s('a1')} />
      <Actor x={64} y={226} seed={s('a2')} />
      <Arrow tone="blue" pts={[[84, 192], [168, 192]]} seed={s('h1')} />
      <Arrow tone="blue" pts={[[84, 254], [124, 254], [124, 222], [168, 222]]} seed={s('h2')} />
      <Pulses xs={[100, 118, 136]} y={192} />
      <Label tone="blue" x={126} y={178} size={T}>heartbeat</Label>
      <Box x={170} y={176} w={110} h={62} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[282, 207], [366, 207]]} seed={s('w')} />
      <Label kind="mono" tone="blue" x={324} y={198} size={13}>update</Label>
      <Cyl cx={404} top={184} rx={36} h={42} seed={s('db')} label="db" />
      <Label tone="red" anchor="start" x={466} y={202} size={17}>6m updates per minute!!</Label>
      <Label anchor="start" x={466} y={244} size={T}>micro reads / updates</Label>
      <Label anchor="start" x={466} y={264} size={T}>→ network bottleneck</Label>
      <Label muted anchor="start" x={466} y={286} size={12.5}>(the board’s note, 01:25)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b */

const T4B = 'One heartbeat, five trips';
const D4B =
  'Two lifelines, the api server and the database, time running down. 1: the three-way handshake, SYN, SYN-ACK and ACK. 2: the database reads the packets and spends CPU and buffers just to accept the connection, plus a login and, in PostgreSQL, a new process. 3: the actual write, one UPDATE of one row by primary key, and an OK. 4: the teardown, FIN and FIN/ACK, two more trips as the lecture counts them. 5: five trips of setup and teardown for one tiny write.';

export function FiveTrips({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4b-p' : 'fig4b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 96 : 116, D = P ? 252 : 312; // lanes: api, db
  const M = (A + D) / 2; // arrow labels sit at mid-span, just above each arrow
  const NX = P ? 40 : 46;
  const BR = P ? 274 : 336, BR2 = P ? 316 : 396; // step 2 bracket, step 5 brackets
  const T = 14;
  const NS = 14;
  return (
    <Fig id={id} w={W} h={500} title={T4B} desc={D4B}>
      <Box x={A - 36} y={24} w={72} h={36} label="api" seed={s('api')} labelSize={T} />
      <Cyl cx={D} top={22} rx={26} ry={7} h={30} seed={s('db')} />
      <Label kind="mono" x={D} y={78} size={T}>db</Label>
      <Lifeline x={A} y0={62} y1={420} seed={s('l1')} />
      <Lifeline x={D} y0={86} y1={420} seed={s('l2')} />
      <TimeAxis x={P ? 12 : 18} y0={96} y1={418} seed={s('t')} size={14} />

      <Step n={1}>
        <Arrow pts={[[A, 108], [D - 2, 122]]} seed={s('syn')} />
        <Label kind="mono" x={M} y={109} size={T}>SYN</Label>
        <Arrow pts={[[D, 136], [A + 2, 150]]} seed={s('synack')} />
        <Label kind="mono" x={M} y={137} size={T}>SYN-ACK</Label>
        <Arrow pts={[[A, 164], [D - 2, 178]]} seed={s('ack')} />
        <Label kind="mono" x={M} y={165} size={T}>ACK</Label>
        <Num x={NX} y={108} n={1} size={NS} />
      </Step>
      <Step n={2}>
        <Bracket x={BR} y0={106} y1={180} tone="ink" seed={s('br2')} />
        <Label anchor="end" x={D - 8} y={198} size={T}>db: reads packets,</Label>
        <Label anchor="end" x={D - 8} y={215} size={T}>CPU, buffers</Label>
        <Label muted anchor="end" x={D - 8} y={232} size={12.5}>+ login, a process</Label>
        <Num x={NX} y={198} n={2} size={NS} />
      </Step>
      <Step n={3}>
        <Arrow tone="blue" pts={[[A, 254], [D - 2, 268]]} seed={s('upd')} />
        <Label kind="mono" tone="blue" x={M} y={255} size={T}>UPDATE pulse …</Label>
        <Arrow tone="green" pts={[[D, 282], [A + 2, 296]]} seed={s('ok')} />
        <Label kind="mono" tone="green" x={M} y={283} size={T}>OK</Label>
        <Label kind="mono" muted x={M} y={322} size={12.5}>{P ? '1 row, by key' : '1 row, by primary key'}</Label>
        <Num x={NX} y={254} n={3} tone="blue" size={NS} />
      </Step>
      <Step n={4}>
        <Arrow pts={[[A, 352], [D - 2, 366]]} seed={s('fin')} />
        <Label kind="mono" x={M} y={353} size={T}>FIN</Label>
        <Arrow pts={[[D, 380], [A + 2, 394]]} seed={s('finack')} />
        <Label kind="mono" x={M} y={381} size={T}>FIN/ACK</Label>
        <Num x={NX} y={352} n={4} size={NS} />
      </Step>
      <Step n={5}>
        <Bracket x={BR2} y0={106} y1={176} tone="red" label="3 trips" seed={s('br5a')} size={12.5} />
        <Bracket x={BR2} y0={350} y1={394} tone="red" label="2 trips" seed={s('br5b')} size={12.5} />
        <Num x={NX} y={448} n={5} tone="red" size={NS} />
        <Label tone="red" x={(A + D) / 2 + 10} y={452} size={15}>5 trips of setup + teardown</Label>
        <Label tone="red" x={(A + D) / 2 + 10} y={472} size={15}>for 1 tiny write</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c */

const T4C = 'The connection pool';
const D4C =
  'Redrawn from the class board. The question above: what is hectic? Creating a new connection every time. An api server, one of a fleet, keeps three pre-established connections open to the database: the connection pool. One connection is in use, drawn blue with a loop: it is reused for the next query instead of being closed.';

export function ConnectionPool({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4c-p' : 'fig4c';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const y = [124, 138, 152];
    return (
      <Fig id={id} w={340} h={268} title={T4C} desc={D4C}>
        <Label x={170} y={24} size={14.5}>what’s hectic? creating a new</Label>
        <Label x={170} y={42} size={14.5}>connection every time</Label>
        <Box x={22} y={110} w={86} h={56} label="api" seed={s('srv')} />
        {y.map((yy, i) => <Line key={i} pts={[[110, yy], [236, yy]]} weight="thin" tone={i === 0 ? 'blue' : 'ink'} seed={s(`c${i}`)} />)}
        <Arrow tone="blue" pts={[[150, 120], [150, 106], [186, 106], [186, 120]]} weight="thin" seed={s('loop')} />
        <Label tone="blue" x={168} y={98} size={13.5}>reused</Label>
        <Label x={98} y={78} size={14.5}>connection pool</Label>
        <Line pts={[[124, 84], [124, 120]]} weight="thin" seed={s('lead')} />
        <Cyl cx={270} top={116} rx={30} h={40} seed={s('db')} label="db" />
        <Arrow pts={[[172, 222], [172, 160]]} seed={s('up')} />
        <Label x={172} y={244} size={14.5}>pre-established connections</Label>
      </Fig>
    );
  }
  const y = [114, 128, 142];
  return (
    <Fig id={id} w={600} h={240} title={T4C} desc={D4C}>
      <Label x={300} y={30} size={16}>what’s hectic? creating a new connection every time</Label>
      <Box x={150} y={100} w={120} h={58} label="api" seed={s('srv')} />
      {y.map((yy, i) => <Line key={i} pts={[[272, yy], [446, yy]]} weight="thin" tone={i === 0 ? 'blue' : 'ink'} seed={s(`c${i}`)} />)}
      <Arrow tone="blue" pts={[[384, 110], [384, 96], [420, 96], [420, 110]]} weight="thin" seed={s('loop')} />
      <Label tone="blue" x={402} y={88} size={14}>reused</Label>
      <Label x={312} y={78} size={15}>connection pool</Label>
      <Line pts={[[312, 84], [312, 110]]} weight="thin" seed={s('lead')} />
      <Cyl cx={480} top={104} rx={32} h={42} seed={s('db')} label="db" />
      <Arrow pts={[[360, 198], [360, 150]]} seed={s('up')} />
      <Label x={360} y={220} size={15}>pre-established connections</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·d */

const T4D = 'The pool is a queue inside the server';
const D4D =
  'A large api server box. Inside it, a request handler and a blocking queue holding three connection objects. The handler calls take() on the queue to get a connection, waiting if the queue is empty, and put(c) to give it back. From each connection a line leaves the server to the database outside. A hand note with a leader line to the queue: a library inside the process, not a service.';

export function PoolQueue({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4d-p' : 'fig4d';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const tx = [170, 210, 250];
    return (
      <Fig id={id} w={340} h={350} title={T4D} desc={D4D}>
        <Box x={8} y={20} w={324} h={196} seed={s('srv')} />
        <Label kind="mono" anchor="start" x={22} y={44}>api server</Label>
        <Label x={214} y={64} size={13.5}>a library inside the process,</Label>
        <Label x={214} y={82} size={13.5}>not a service</Label>
        <Line pts={[[214, 90], [214, 122]]} weight="thin" seed={s('lead')} />
        <Box x={18} y={118} w={80} h={44} label="handler" seed={s('h')} labelSize={13.5} />
        <Queue x={150} y={126} w={120} h={30} cells={3} filled={3} seed={s('q')} />
        <Arrow pts={[[100, 132], [146, 132]]} weight="thin" seed={s('take')} />
        <Arrow pts={[[100, 152], [146, 152]]} weight="thin" seed={s('put')} />
        <Label kind="mono" x={132} y={124} size={12.5}>take()</Label>
        <Label kind="mono" x={132} y={172} size={12.5}>put(c)</Label>
        <Label kind="mono" anchor="end" x={162} y={200} size={13.5}>blocking queue</Label>
        {tx.map((x, i) => <Line key={i} pts={[[x, 158], [x, 262]]} weight="thin" seed={s(`l${i}`)} />)}
        <Cyl cx={210} top={258} rx={62} ry={12} h={36} seed={s('db')} label="db" />
      </Fig>
    );
  }
  const tx = [215, 265, 315];
  const ly = [210, 200, 190];
  return (
    <Fig id={id} w={600} h={262} title={T4D} desc={D4D}>
      <Box x={20} y={40} w={420} h={190} seed={s('srv')} />
      <Label kind="mono" anchor="start" x={36} y={66}>api server</Label>
      <Label x={265} y={84} size={14}>a library inside the process,</Label>
      <Label x={265} y={102} size={14}>not a service</Label>
      <Line pts={[[265, 110], [265, 132]]} weight="thin" seed={s('lead')} />
      <Box x={40} y={130} w={90} h={44} label="handler" seed={s('h')} />
      <Queue x={190} y={136} w={150} h={32} cells={3} filled={3} seed={s('q')} />
      <Arrow pts={[[132, 144], [186, 144]]} weight="thin" seed={s('take')} />
      <Arrow pts={[[132, 162], [186, 162]]} weight="thin" seed={s('put')} />
      <Label kind="mono" x={159} y={136} size={13}>take()</Label>
      <Label kind="mono" x={159} y={182} size={13}>put(c)</Label>
      <Label kind="mono" anchor="start" x={350} y={150} size={13.5}>blocking</Label>
      <Label kind="mono" anchor="start" x={350} y={166} size={13.5}>queue</Label>
      {tx.map((x, i) => <Line key={i} pts={[[x, 170], [x, ly[i]], [498, ly[i]]]} weight="thin" seed={s(`l${i}`)} />)}
      <Cyl cx={530} top={170} rx={32} h={44} seed={s('db')} label="db" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·e */

const T4E = 'Three connections, four requests';
const D4E =
  'Five snapshots of one api server’s pool, top to bottom. 1: minimum 3; three requests each take one connection, all busy. 2: a fourth request finds none free and waits. 3: instead the pool opens a fourth connection and keeps it: three becomes four. 4: with a maximum of 100, request 101 waits for a release. 5: a connection idle for 10 minutes is closed.';

export function ThreeFour({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4e-p' : 'fig4e';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const NX = P ? 14 : 18;
  const RX = P ? 30 : 36; // request labels
  const SX = P ? 108 : 128, SW = P ? 50 : 64; // server box
  const L0 = SX + SW + 2, DB = P ? 248 : 318, DR = P ? 18 : 22; // pool lines, db
  const L1 = DB - DR - 2;
  const AX = P ? 276 : 352; // right annotation
  const T = 14;
  const row = (i: number) => 44 + i * 92;
  const ly = (top: number, k: number) => top + 18 + k * 17;

  const frame = (i: number) => {
    const top = row(i);
    return (
      <g>
        <Box x={SX} y={top + 4} w={SW} h={76} label="api" seed={s(`srv${i}`)} labelSize={13} />
        <Cyl cx={DB} top={top + 14} rx={DR} ry={6} h={54} seed={s(`db${i}`)} />
      </g>
    );
  };
  const req = (top: number, k: number, label: string, tone: Tone, key: string, reach = true) => (
    <g>
      <Label kind="mono" tone={tone} anchor="start" x={RX} y={ly(top, k) + 4} size={13}>{label}</Label>
      {reach
        ? <Arrow tone={tone} weight="thin" pts={[[RX + 24, ly(top, k)], [SX - 2, ly(top, k)]]} seed={s(key)} />
        : <Line dotted tone={tone} pts={[[RX + label.length * 8 + 4, ly(top, k)], [RX + label.length * 8 + 18, ly(top, k)]]} seed={s(key)} />}
    </g>
  );
  const pool = (top: number, n: number, tone: Tone, key: string) =>
    Array.from({ length: n }, (_, k) => <Line key={k} pts={[[L0, ly(top, k)], [L1, ly(top, k)]]} weight="thin" tone={tone} seed={s(`${key}${k}`)} />);

  return (
    <Fig id={id} w={W} h={510} title={T4E} desc={D4E}>
      <Label muted x={RX + 14} y={22} size={13}>requests</Label>
      <Label muted x={SX + SW / 2} y={22} size={13}>{P ? 'api' : 'api server'}</Label>
      <Label muted x={(L0 + L1) / 2} y={22} size={13}>pool</Label>
      <Label muted x={DB} y={22} size={13}>db</Label>

      <Step n={1}>
        {frame(0)}
        {['r1', 'r2', 'r3'].map((r, k) => <g key={r}>{req(row(0), k, r, 'blue', `r1-${k}`)}</g>)}
        {pool(row(0), 3, 'blue', 'p1-')}
        <Label kind="mono" anchor="start" x={AX} y={row(0) + 42} size={T}>min 3</Label>
        <Num x={NX} y={row(0) + 38} n={1} tone="blue" size={14} />
      </Step>
      <Step n={2}>
        {frame(1)}
        {['r1', 'r2', 'r3'].map((r, k) => <g key={r}>{req(row(1), k, r, 'blue', `r2-${k}`)}</g>)}
        {req(row(1), 3, 'r4', 'ink', 'r2-3', false)}
        <Label anchor="start" x={RX + 40} y={ly(row(1), 3) + 4} size={13}>waits</Label>
        {pool(row(1), 3, 'blue', 'p2-')}
        <Label anchor="start" x={AX} y={row(1) + 34} size={T}>all</Label>
        <Label anchor="start" x={AX} y={row(1) + 51} size={T}>busy</Label>
        <Num x={NX} y={row(1) + 38} n={2} size={14} />
      </Step>
      <Step n={3}>
        {frame(2)}
        {['r1', 'r2', 'r3', 'r4'].map((r, k) => <g key={r}>{req(row(2), k, r, 'blue', `r3-${k}`)}</g>)}
        {pool(row(2), 3, 'blue', 'p3-')}
        <Line dashed tone="blue" weight="thin" pts={[[L0, ly(row(2), 3)], [L1, ly(row(2), 3)]]} seed={s('p3-new')} />
        <Label kind="mono" anchor="start" x={AX} y={row(2) + 42} size={T}>3 → 4</Label>
        <Num x={NX} y={row(2) + 38} n={3} tone="blue" size={14} />
      </Step>
      <Step n={4}>
        {frame(3)}
        {req(row(3), 3, 'r101', 'red', 'r4-x', false)}
        <Mark a={[SX - 12, ly(row(3), 3) - 10]} b={[SX - 12, ly(row(3), 3) + 10]} tone="red" weight="heavy" seed={s('gate')} />
        <Label tone="red" x={SX - 12} y={ly(row(3), 3) - 16} size={13}>cap</Label>
        {pool(row(3), 4, 'blue', 'p4-')}
        <Label kind="mono" muted x={(L0 + L1) / 2} y={row(3) + 90} size={12.5}>… up to 100</Label>
        <Label kind="mono" tone="red" anchor="start" x={AX} y={row(3) + 42} size={T}>max 100</Label>
        <Num x={NX} y={row(3) + 38} n={4} tone="red" size={14} />
      </Step>
      <Step n={5}>
        {frame(4)}
        {pool(row(4), 3, 'ink', 'p5-')}
        <Line dotted pts={[[L0, ly(row(4), 3)], [L1, ly(row(4), 3)]]} seed={s('p5-idle')} />
        <Timer x={(L0 + L1) / 2} y={ly(row(4), 3) + 2} tone="red" seed={s('ttl')} size={10} />
        <Label anchor="start" x={AX} y={row(4) + 34} size={T}>idle</Label>
        <Label kind="mono" anchor="start" x={AX} y={row(4) + 51} size={T}>10 min</Label>
        <Num x={NX} y={row(4) + 38} n={5} size={14} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §4 */

export function StartConservative({ layout = 'wide' }: Layout) {
  const title = 'Start conservative';
  const desc = 'A server with a small pool of three connections to the database and a gauge on the server with its needle low: start small, watch the metrics, then retune.';
  if (layout === 'phone')
    return (
      <Fig id="l04-rule4-p" w={320} h={170} title={title} desc={desc}>
        <Box x={14} y={26} w={96} h={70} seed="r4w-p-srv" />
        <Num x={62} y={50} n="" size={16} />
        <Mark a={[62, 50]} b={[52, 55]} weight="thin" seed="r4w-p-needle" />
        <Label kind="mono" x={62} y={86} size={14}>server</Label>
        {[46, 60, 74].map((y, i) => <Line key={i} pts={[[112, y], [214, y]]} weight="thin" seed={`r4w-p-c${i}`} />)}
        <Cyl cx={246} top={36} rx={30} h={40} seed="r4w-p-db" label="db" />
        <Label x={160} y={150} size={15}>start small · observe · retune</Label>
      </Fig>
    );
  return (
    <Fig id="l04-rule4" w={480} h={150} title={title} desc={desc}>
      <Box x={30} y={30} w={110} h={76} seed="r4w-srv" />
      <Num x={85} y={56} n="" size={17} />
      <Mark a={[85, 56]} b={[74, 61]} weight="thin" seed="r4w-needle" />
      <Label kind="mono" x={85} y={94} size={14}>server</Label>
      {[54, 68, 82].map((y, i) => <Line key={i} pts={[[142, y], [272, y]]} weight="thin" seed={`r4w-c${i}`} />)}
      <Cyl cx={306} top={44} rx={32} h={42} seed="r4w-db" label="db" />
      <Label anchor="start" x={366} y={52} size={15}>start small,</Label>
      <Label anchor="start" x={366} y={74} size={15}>observe,</Label>
      <Label anchor="start" x={366} y={96} size={15}>retune</Label>
    </Fig>
  );
}

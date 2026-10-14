// Lecture 05 (lec08) · chapter 1 "How to approach distributed systems": Fig 1·a, Fig 1·b and the §1 rule sketch.
// Fig 1·a redraws the board pages S03–S05 (b_001015, b_001200, b_001230): day 0, then the scale/load/rectify/
// re-architect loop. Fig 1·b is new: every layer checked, the database ringed (SN-01, A-DSC-08).
// Ledger: L-0030 L-0031 L-0033 L-0034 (1·a) · L-0037 L-0038 L-0039 L-0040 L-0043 L-0044 (1·b) · L-0026 L-0029 (rule).
import React from 'react';
import { Arrow, Box, Cloud, Cross, Cube, Cyl, Fig, Fleet, Label, Line, LoadBalancer, Mark, Replica } from '../kit/Kit';

type Layout = { layout?: 'wide' | 'phone' };

/** A small green hand tick. */
function Tick({ x, y, seed }: { x: number; y: number; seed: string }) {
  return (
    <g>
      <Mark a={[x, y]} b={[x + 5, y + 6]} tone="green" seed={seed + 'a'} />
      <Mark a={[x + 5, y + 6]} b={[x + 16, y - 8]} tone="green" seed={seed + 'b'} />
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 1·a */

const LOOP_T = 'The day-zero loop';
const LOOP_D =
  'Day zero is one of each: one server, one database, one cache. From there a loop: scale each component, see how it performs under load, ' +
  'rectify the system, re-architect, and repeat. Each turn zooms in on a finer, lower-level detail to fix.';

export function DayZeroLoop({ layout = 'wide' }: Layout) {
  if (layout === 'phone') {
    const X = 200;
    return (
      <Fig id="f1a-p" w={340} h={470} title={LOOP_T} desc={LOOP_D}>
        <Line dashed pts={[[30, 14], [310, 14], [310, 106], [30, 106], [30, 14]]} seed="f1a-p-out" />
        <Box x={46} y={38} w={84} h={36} label="server" seed="f1a-p-srv" />
        <Cyl cx={178} top={36} rx={20} ry={5.5} h={30} label="db" seed="f1a-p-db" />
        <Cube x={240} y={34} s={34} d={8} seed="f1a-p-cache" />
        <Label kind="mono" x={261} y={98} size={14}>cache</Label>
        <Label x={170} y={130} size={15}>day 0: one of each</Label>
        <Arrow pts={[[X, 140], [X, 168]]} seed="f1a-p-in" />
        <Label x={X} y={190} size={15}>scale each component</Label>
        <Arrow pts={[[X, 202], [X, 228]]} seed="f1a-p-1" />
        <Label x={X} y={250} size={15}>see how it performs</Label>
        <Label x={X} y={270} size={15}>under load</Label>
        <Arrow pts={[[X, 282], [X, 308]]} seed="f1a-p-2" />
        <Label x={X} y={330} size={15}>rectify</Label>
        <Arrow pts={[[X, 342], [X, 368]]} seed="f1a-p-3" />
        <Label x={X} y={390} size={15}>re-architect</Label>
        <Arrow pts={[[150, 385], [52, 385], [52, 185], [118, 185]]} seed="f1a-p-back" />
        <Label x={40} y={286} rotate={-90} size={15}>and repeat</Label>
        <Label muted x={170} y={432} size={14}>each turn: zoom in,</Label>
        <Label muted x={170} y={452} size={14}>find the next detail to fix</Label>
      </Fig>
    );
  }
  return (
    <Fig id="f1a" w={880} h={300} title={LOOP_T} desc={LOOP_D}>
      <Line dashed pts={[[24, 52], [244, 52], [244, 236], [24, 236], [24, 52]]} seed="f1a-out" />
      <Box x={60} y={72} w={148} h={40} label="server" seed="f1a-srv" labelSize={15} />
      <Cyl cx={88} top={140} rx={22} ry={6} h={34} seed="f1a-db" />
      <Label kind="mono" x={88} y={198} size={15}>db</Label>
      <Cube x={152} y={136} s={38} d={9} seed="f1a-cache" />
      <Label kind="mono" x={174} y={206} size={15}>cache</Label>
      <Label x={134} y={264} size={15}>day 0: one of each</Label>

      <Arrow pts={[[244, 144], [320, 144], [320, 66], [380, 66]]} seed="f1a-in" />
      <Label x={470} y={71} size={15}>scale each component</Label>
      <Arrow pts={[[562, 66], [644, 66]]} seed="f1a-1" />
      <Label x={724} y={60} size={15}>see how it performs</Label>
      <Label x={724} y={80} size={15}>under load</Label>
      <Arrow pts={[[724, 94], [724, 208]]} seed="f1a-2" />
      <Label x={724} y={232} size={15}>rectify</Label>
      <Arrow pts={[[692, 227], [522, 227]]} seed="f1a-3" />
      <Label x={470} y={232} size={15}>re-architect</Label>
      <Arrow pts={[[470, 212], [470, 86]]} seed="f1a-back" />
      <Label anchor="start" x={482} y={154} size={15}>and repeat</Label>

      <Label muted anchor="end" x={866} y={272} size={15}>each turn: zoom in, find the next detail to fix</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·b */

const LAYERS_T = 'Check every layer';
const LAYERS_D =
  'Seven layers of one system: CDN, load balancer, API servers, cache, a stateful service, the database and a stateless service, the same seven the class listed. Six scale out. The class called a layer that cannot scale out a single point of failure; more precisely, ' +
  'the database is one machine: a bottleneck if it cannot keep up, and a single point of failure only if it also has no standby. ' +
  'A standby removes the single point of failure but still does not scale it out.';

export function CheckEveryLayer({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f1b-p' : 'f1b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 600;
  const G = P ? 48 : 80; // glyph centre
  const N = P ? 98 : 160; // layer name
  const T = P ? 222 : 340; // tick column
  const rows = [52, 118, 184, 250, 316]; // cdn, lb, api, cache, stateful
  const DB = 392, DNS = 556;
  const names = ['cdn', 'lb', 'api', 'cache', 'stateful svc'];
  return (
    <Fig id={id} w={W} h={600} title={LAYERS_T} desc={LAYERS_D}>
      <Cloud cx={G} cy={rows[0]} w={66} h={40} seed={s('cdn')} />
      <LoadBalancer x={G - 30} y={rows[1] - 8} w={60} h={18} label="" seed={s('lb')} />
      <Fleet x={G - 30} y={rows[2] - 12} w={52} h={26} n={3} countLabel={false} seed={s('api')} />
      <Cube x={G - 16} y={rows[3] - 18} s={28} d={7} seed={s('cache')} />
      <Box x={G - 30} y={rows[4] - 15} w={60} h={30} seed={s('svc')} />
      {names.map((n, i) => (
        <g key={n}>
          <Label kind="mono" anchor="start" x={N} y={rows[i] + 5} size={14}>{n}</Label>
          <Tick x={T} y={rows[i] - 2} seed={s('t' + i)} />
          <Label anchor="start" x={T + 24} y={rows[i] + 5} size={14} tone="green">scales out</Label>
        </g>
      ))}

      {/* the database row, ringed red */}
      <Line tone="red" pts={[[8, DB - 40], [W - 8, DB - 40], [W - 8, DB + 112], [8, DB + 112], [8, DB - 40]]} seed={s('ring')} />
      <Cyl cx={P ? G - 22 : G - 14} top={DB - 22} rx={18} ry={5} h={34} seed={s('db')} />
      <Replica cx={P ? G + 18 : G + 30} top={DB - 22} rx={16} ry={4.5} h={34} seed={s('sb')} />
      <Label kind="mono" anchor="start" x={N} y={DB + 5} size={14}>db</Label>
      <Label anchor="start" x={T} y={DB + 5} size={14} tone="red">one machine</Label>
      <Label anchor="start" x={22} y={DB + 46} size={14}>bottleneck if it can’t keep up</Label>
      <Label anchor="start" x={22} y={DB + 68} size={14} tone="red">SPOF if it also has no standby</Label>
      <Label anchor="start" muted x={22} y={DB + 92} size={14}>+ standby = no SPOF, still no scale-out</Label>

      <Box x={G - 26} y={DNS - 15} w={52} h={30} seed={s('dns')} />
      <Label kind="mono" anchor="start" x={N} y={DNS + 5} size={14}>stateless svc</Label>
      <Tick x={T} y={DNS - 2} seed={s('t6')} />
      <Label anchor="start" x={T + 24} y={DNS + 5} size={14} tone="green">scales out</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §1 */

export function Rule1Anything({ layout = 'wide' }: Layout) {
  const title = 'Anything that can go wrong';
  const desc = 'One server with three things that will go wrong sooner or later, each with a question mark: it crashes, it lags, and its network link is cut.';
  const P = layout === 'phone';
  const id = P ? 'rule1-p' : 'rule1';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const bx = P ? 96 : 176;
  return (
    <Fig id={id} w={W} h={150} title={title} desc={desc}>
      <Box x={bx} y={56} w={110} h={42} label="server" seed={s('srv')} />
      {/* crash: a red zigzag above the box */}
      <Line tone="red" pts={[[bx + 30, 20], [bx + 44, 36], [bx + 54, 24], [bx + 68, 44]]} seed={s('zz')} />
      <Label tone="red" anchor="start" x={bx + 76} y={34} size={14}>crash ?</Label>
      {/* lag: a graphite wave under the box */}
      <Line pts={[[bx + 12, 118], [bx + 26, 110], [bx + 40, 118], [bx + 54, 110], [bx + 68, 118]]} seed={s('wave')} />
      <Label anchor="start" x={bx + 76} y={122} size={14}>lag ?</Label>
      {/* partition: the network lead, cut */}
      <Line pts={[[bx + 110, 77], [W - 14, 77]]} seed={s('net')} />
      <Cross x={bx + 110 + (W - 14 - bx - 110) / 2} y={77} size={16} seed={s('cut')} />
      <Label tone="red" x={bx + 110 + (W - 14 - bx - 110) / 2} y={112} size={14}>partition ?</Label>
    </Fig>
  );
}

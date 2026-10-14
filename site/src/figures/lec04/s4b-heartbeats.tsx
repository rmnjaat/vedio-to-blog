// Lecture 01 (lec04), §4.6–4.9 Six million heartbeats a minute, part b. Writer w2.
// Fig 4·f The pool budget (new): two panels of 340, wide 720 + phone 340 (panels stack).
// Fig 4·g Four resources, two workloads (new): wide 640 + phone 340.
// Fig 4·h Heartbeats, reused (new, board b_011845 heading only): two panels of 340, wide 720 + phone 340 (panels stack).
// Arrowheads sit on the initiator: nodes send heartbeats to the tracker; backends send heartbeats to their own load balancer.
import React from 'react';
import { Arrow, Box, Cross, Cyl, Dot, Fig, Fleet, Label, Line, LoadBalancer, Num } from './_kit';
import { chamferRect } from '../kit/hand';

type Layout = { layout?: 'wide' | 'phone' };

/* ------------------------------------------------------------------ Fig 4·f */

/** The key's fleet glyph (two faint api boxes offset behind the front one) with a mono note under the name. */
function ApiFleet({ x, y, w, h, sub, seed }: { x: number; y: number; w: number; h: number; sub: string; seed: string }) {
  return (
    <g>
      {[28, 14].map((o, i) => <path key={i} className="ink shape faint" d={chamferRect(x + o, y - o, w, h, `${seed}-b${i}`)} />)}
      <Box x={x} y={y} w={w} h={h} label="api" sub={sub} seed={seed} labelSize={13.5} />
    </g>
  );
}

const T4F = 'The pool budget';
const D4F =
  'Two panels over the same database, which accepts at most 1,000 connections. a, fits: 100 servers, drawn as 10 boxes of 10, each with a pool maximum of 10: 1,000 divided by 100 servers is 10 each. b, the spike: each server’s pool keeps a minimum of 100 connections, so 10 servers already hold all 1,000; autoscaling adds 20 more servers, and their connections are refused at the database, marked with a red cross: the new servers get nothing.';

function BudgetFits({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-a-${k}`;
  const xs = Array.from({ length: 10 }, (_, i) => 22 + i * 30);
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <Label x={170} y={22} size={15}>1,000 ÷ 100 servers = 10 each</Label>
      <Label muted x={170} y={42} size={12.5}>each box: 10 servers, max 10 each</Label>
      {xs.map((x, i) => <Box key={i} x={x} y={58} w={24} h={22} seed={s(`b${i}`)} />)}
      {xs.map((x, i) => <Line key={'l' + i} pts={[[x + 12, 82], [x + 12, 150]]} weight="thin" seed={s(`l${i}`)} />)}
      <Cyl cx={170} top={152} rx={152} ry={12} h={36} seed={s('db')} />
      <Label kind="mono" x={170} y={222} size={14}>db · max 1,000 connections</Label>
      <Label kind="title" x={170} y={276}>a · fits</Label>
    </g>
  );
}

function BudgetSpike({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-b-${k}`;
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <Label anchor="start" x={18} y={22} size={14}>10 servers</Label>
      <ApiFleet x={18} y={54} w={104} h={48} sub="pool min 100" seed={s('fleet')} />
      <Label tone="red" anchor="start" x={196} y={22} size={14}>+20 servers</Label>
      <ApiFleet x={196} y={54} w={96} h={48} sub="new" seed={s('n0')} />
      <Line pts={[[70, 102], [70, 150]]} weight="heavy" seed={s('used')} />
      <Label kind="mono" anchor="start" x={80} y={132} size={13}>10 × 100 = 1,000</Label>
      <Line dashed tone="red" pts={[[244, 102], [244, 126]]} seed={s('refused')} />
      <Cyl cx={170} top={152} rx={152} ry={12} h={36} tone="red" seed={s('db')} />
      <Cross x={244} y={132} size={16} seed={s('x')} />
      <Label kind="mono" x={170} y={222} size={14}>db · max 1,000 connections</Label>
      <Label tone="red" x={170} y={246} size={15}>new servers get nothing</Label>
      <Label kind="title" x={170} y={276}>b · the spike</Label>
    </g>
  );
}

export function PoolBudget({ layout = 'wide' }: Layout) {
  if (layout === 'phone')
    return (
      <Fig id="fig4f-p" w={340} h={586} title={T4F} desc={D4F}>
        <BudgetFits ox={0} oy={0} id="fig4f-p" />
        <Line dotted pts={[[20, 294], [320, 294]]} seed="fig4f-p-sep" />
        <BudgetSpike ox={0} oy={300} id="fig4f-p" />
      </Fig>
    );
  return (
    <Fig id="fig4f" w={720} h={290} title={T4F} desc={D4F}>
      <BudgetFits ox={10} oy={0} id="fig4f" />
      <Line dotted pts={[[360, 20], [360, 260]]} seed="fig4f-sep" />
      <BudgetSpike ox={370} oy={0} id="fig4f" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·g */

const T4G = 'Four resources, two workloads';
const D4G =
  'Four equal bars: memory, CPU, disk and network, the only four things that decide scaling. Tags pinned below: heartbeat writes connect to network; a 12-table report connects to CPU and memory; a data warehouse connects to disk.';

export function FourResources({ layout = 'wide' }: Layout) {
  if (layout === 'phone') {
    const s = (k: string) => `fig4g-p-${k}`;
    const bars = ['memory', 'cpu', 'disk', 'network'];
    return (
      <Fig id="fig4g-p" w={340} h={244} title={T4G} desc={D4G}>
        {bars.map((b, i) => (
          <g key={b}>
            <Box x={12} y={20 + i * 56} w={118} h={40} seed={s(b)} />
            <Label x={71} y={45 + i * 56} size={16}>{b}</Label>
          </g>
        ))}
        <Box x={190} y={48} w={140} h={40} label="12-table report" seed={s('rep')} labelSize={13} />
        <Line tone="blue" pts={[[190, 60], [160, 60], [160, 40], [132, 40]]} seed={s('rep-m')} />
        <Line tone="blue" pts={[[190, 76], [160, 76], [160, 96], [132, 96]]} seed={s('rep-c')} />
        <Box x={190} y={132} w={140} h={40} label="data warehouse" seed={s('dw')} labelSize={13} />
        <Line tone="blue" pts={[[190, 152], [132, 152]]} seed={s('dw-l')} />
        <Box x={190} y={188} w={140} h={40} label="heartbeat writes" seed={s('hb')} labelSize={13} />
        <Line tone="blue" pts={[[190, 208], [132, 208]]} seed={s('hb-l')} />
      </Fig>
    );
  }
  const s = (k: string) => `fig4g-${k}`;
  const bars: [string, number][] = [['memory', 30], ['cpu', 180], ['disk', 330], ['network', 480]];
  return (
    <Fig id="fig4g" w={640} h={214} title={T4G} desc={D4G}>
      {bars.map(([b, x]) => (
        <g key={b}>
          <Box x={x} y={30} w={120} h={48} seed={s(b)} />
          <Label x={x + 60} y={60} size={17}>{b}</Label>
        </g>
      ))}
      <Box x={100} y={160} w={150} h={38} label="12-table report" seed={s('rep')} />
      <Line tone="blue" pts={[[140, 160], [140, 120], [90, 120], [90, 80]]} seed={s('rep-m')} />
      <Line tone="blue" pts={[[210, 160], [210, 120], [240, 120], [240, 80]]} seed={s('rep-c')} />
      <Box x={326} y={160} w={128} h={38} label="data warehouse" seed={s('dw')} labelSize={13.5} />
      <Line tone="blue" pts={[[390, 160], [390, 80]]} seed={s('dw-l')} />
      <Box x={466} y={160} w={148} h={38} label="heartbeat writes" seed={s('hb')} />
      <Line tone="blue" pts={[[540, 160], [540, 80]]} seed={s('hb-l')} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·h */

const T4H = 'Heartbeats, reused';
const D4H =
  'Two panels. a, failure detection: four nodes each send heartbeat pulses to a central tracker, which shows a green dot for each live node; the third node’s pulses have stopped, it is outlined red, and the tracker shows its dot as a hollow offline ring. b, your own load balancer, as taught: three backends send heartbeats to the load balancer; one backend goes quiet, marked with a red cross, and the load balancer stops routing requests to it. A grey note: real load balancers often ask instead, with health checks.';

function Detect({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-a-${k}`;
  const ys = [30, 80, 130, 180];
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <Box x={226} y={22} w={96} h={200} seed={s('tr')} />
      <Label kind="mono" x={284} y={128} size={14}>tracker</Label>
      {ys.map((y, i) => {
        const dead = i === 2;
        const cy = y + 17;
        return (
          <g key={i}>
            <Box x={14} y={y} w={74} h={34} label="node" tone={dead ? 'red' : 'ink'} seed={s(`n${i}`)} labelSize={13.5} />
            {dead
              ? <Line dotted pts={[[90, cy], [224, cy]]} seed={s(`l${i}`)} />
              : <Arrow tone="blue" pts={[[90, cy], [224, cy]]} seed={s(`l${i}`)} />}
            {!dead && [118, 146, 174].map((x) => <Dot key={x} x={x} y={cy} tone="blue" />)}
            {dead
              ? <Num x={244} y={cy} n="" size={7} />
              : <Dot x={244} y={cy} tone="green" />}
          </g>
        );
      })}
      <Label tone="red" x={156} y={140} size={13.5}>no beats</Label>
      <Label tone="blue" x={156} y={22} size={13.5}>heartbeats</Label>
      <Label kind="title" x={170} y={274}>a · failure detection</Label>
    </g>
  );
}

function Health({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-b-${k}`;
  const ys = [44, 110, 176];
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <LoadBalancer x={22} y={44} h={172} seed={s('lb')} />
      {ys.map((y, i) => {
        const dead = i === 1;
        const cy = y + 20;
        return (
          <g key={i}>
            <Box x={226} y={y} w={100} h={40} label="backend" tone={dead ? 'red' : 'ink'} seed={s(`b${i}`)} labelSize={13.5} />
            {dead
              ? <Line dotted pts={[[48, cy], [222, cy]]} seed={s(`h${i}`)} />
              : <Arrow tone="blue" pts={[[224, cy], [48, cy]]} seed={s(`h${i}`)} />}
          </g>
        );
      })}
      <Cross x={204} y={130} size={18} seed={s('x')} />
      <Label tone="blue" x={136} y={56} size={13.5}>heartbeats</Label>
      <Label tone="red" x={126} y={122} size={13.5}>not routed</Label>
      <Label muted x={176} y={242} size={13.5}>real lbs often ask instead: health checks</Label>
      <Label kind="title" x={170} y={274}>b · a load balancer</Label>
    </g>
  );
}

export function HeartbeatsReused({ layout = 'wide' }: Layout) {
  if (layout === 'phone')
    return (
      <Fig id="fig4h-p" w={340} h={584} title={T4H} desc={D4H}>
        <Detect ox={0} oy={0} id="fig4h-p" />
        <Line dotted pts={[[20, 292], [320, 292]]} seed="fig4h-p-sep" />
        <Health ox={0} oy={300} id="fig4h-p" />
      </Fig>
    );
  return (
    <Fig id="fig4h" w={720} h={290} title={T4H} desc={D4H}>
      <Detect ox={10} oy={0} id="fig4h" />
      <Line dotted pts={[[360, 20], [360, 250]]} seed="fig4h-sep" />
      <Health ox={370} oy={0} id="fig4h" />
    </Fig>
  );
}

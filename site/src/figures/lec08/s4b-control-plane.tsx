// Lecture 05 (lec08), §4.4–4.6 The control plane, part b.
// Fig 4·d Poll vs push (D-04 timeline + meta port, frames b_012400, b_012645, b_015051; static twin of l08-stale-config): 640 + phone 340.
// Fig 4·e Three ways a change reaches the LB servers (D-04/D-05, frames b_012830, b_015054, b_012630): wide 700 + phone 340.
// Fig 4·f Vitals flow into one place (D-05 second form, frames b_015057, b_013930): wide 700 + phone 340.
// Rule-box sketch §4: reactive, not polling: 480 + phone 320.
// The config path is dashed graphite with circled letters; only the request path is blue. Prometheus scrapes (arrow prometheus → agent).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Dot, Fig, Label, Line, Mark, Num, Pipe } from '../kit/Kit';
import { Agent, LbServer, Orchestrator, TimeSeries } from './s3-one-laptop-parts';

/* ------------------------------------------------------------------ Fig 4·d */

const T4D = 'Poll vs push';
const D4D =
  'Two timelines from 0 to 20 seconds with requests spread evenly over three backends. Top, poll every 10 s: backend 2 dies at 1 s, but the LB servers only re-read the config at 10 s, so every request sent to backend 2 between 1 s and 10 s fails: 9 s of requests to a dead backend. Bottom, push: when backend 2 dies the orchestrator calls the LB server’s meta port 9091 and the LB server pulls the new config from the database at once, so the window is near zero.';

export function PollVsPush({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig4d-p' : 'fig4d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 640;
  const x0 = P ? 22 : 40, x1 = P ? 318 : 600;
  const X = (t: number) => x0 + ((x1 - x0) * t) / 20;
  const T = 14;
  const N = P ? 20 : 30; // requests, dealt to b1 b2 b3 in turn (phone: about one a second, so the ticks stay apart)
  const dots = (y: number, red: (t: number, b: number) => boolean) =>
    Array.from({ length: N }, (_, i) => {
      const t = (i + 0.5) * (20 / N);
      const r = red(t, i % 3);
      // one request = one short tick; red = sent to the dead backend (drawn doubled on the phone so it reads as wider)
      return (
        <g key={i}>
          <Mark a={[X(t), y - 6]} b={[X(t), y + 6]} weight="heavy" tone={r ? 'red' : 'blue'} seed={s(`rq${y}-${i}`)} />
          {P && r && <Mark a={[X(t) + 2.5, y - 6]} b={[X(t) + 2.5, y + 6]} weight="heavy" tone="red" seed={s(`rq${y}-${i}w`)} />}
        </g>
      );
    });
  const axis = (y: number, poll: boolean, k: string) => (
    <g>
      <Line pts={[[x0, y], [x1, y]]} seed={s(k)} />
      {[0, 10, 20].map((t) => (
        <g key={t}>
          <Mark a={[X(t), y - 6]} b={[X(t), y + 6]} seed={s(`${k}${t}`)} />
          <Label kind="mono" x={X(t)} y={y + 22} size={T} anchor={t === 0 ? 'start' : t === 20 ? 'end' : 'middle'}>{`${t} s`}</Label>
          {poll && <Label x={X(t)} y={y + 40} size={T} anchor={t === 0 ? 'start' : t === 20 ? 'end' : 'middle'}>poll</Label>}
        </g>
      ))}
    </g>
  );
  // panel b geometry
  const by = P ? 230 : 214;
  const dbx = P ? 46 : 120, lbx = P ? 100 : 230, ox = P ? 222 : 440;
  const lbw = P ? 80 : 100, ow = P ? 112 : 140;
  const ay = by + 126;
  return (
    <Fig id={id} w={W} h={P ? 474 : 450} title={T4D} desc={D4D}>
      {/* panel a: poll every 10 s */}
      <Label tone="red" anchor="start" x={X(1) + 4} y={22} size={T}>b srv2 dies</Label>
      <Mark a={[X(1), 30]} b={[X(1), 70]} tone="red" weight="heavy" seed={s('dieA')} />
      <Line pts={[[X(1), 56], [X(1), 48], [X(10), 48], [X(10), 56]]} tone="red" seed={s('brA')} />
      <Label tone="red" anchor={P ? 'start' : 'middle'} x={P ? X(1) + 6 : (X(1) + X(10)) / 2} y={42} size={T}>
        9 s of requests to a dead backend
      </Label>
      {axis(70, true, 'axA')}
      {dots(P ? 132 : 134, (t, b) => b === 1 && t >= 1 && t < 10)}
      <Label kind="title" x={W / 2} y={P ? 166 : 170}>poll every 10 s</Label>

      {/* panel b: push */}
      <Cyl cx={dbx} top={by} rx={P ? 24 : 30} h={30} seed={s('db')} />
      <Label kind="mono" x={dbx} y={by + 62} size={T}>config db</Label>
      <LbServer x={lbx} y={by} w={lbw} h={42} sub=":9090" seed={s('lb')} size={T} subSize={P ? 14 : 12.5} />
      <Mark a={[lbx + lbw, by + 22]} b={[lbx + lbw + 12, by + 22]} seed={s('stub')} />
      <Box x={ox} y={by} w={ow} h={42} label="orchestrator" seed={s('o')} labelSize={14} />
      <Arrow dashed pts={[[ox - 2, by + 22], [lbx + lbw + 14, by + 22]]} seed={s('meta')} />
      <Label kind="mono" x={(lbx + lbw + ox) / 2 + (P ? 0 : 0)} y={by - 10} size={T}>call :9091 meta</Label>
      <Arrow dashed pts={[[lbx - 2, by + 22], [dbx + (P ? 26 : 32), by + 22]]} seed={s('pull')} />
      <Label x={(lbx + dbx) / 2 + (P ? 6 : 0)} y={by - 10} size={T}>{P ? 'pull' : 'pull config'}</Label>

      <Label tone="red" anchor="start" x={X(1) + 4} y={ay - 30} size={T}>b srv2 dies</Label>
      <Mark a={[X(1), ay - 24]} b={[X(1), ay]} tone="red" weight="heavy" seed={s('dieB')} />
      <Line pts={[[X(1), ay - 6], [X(1), ay - 12], [X(1.6), ay - 12], [X(1.6), ay - 6]]} tone="red" seed={s('brB')} />
      {axis(ay, false, 'axB')}
      {dots(ay + 44, (t, b) => b === 1 && t >= 1 && t < 1.8)}
      <Label tone="red" anchor="start" x={X(1) + 8} y={ay + 66} size={T}>near zero</Label>
      <Label kind="title" x={W / 2} y={ay + 96}>push (meta port)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·e */

const T4E = 'Three ways a change reaches the LB servers';
const D4E =
  'A change can come from the orchestrator when a health check fails, from a developer through the LB console API, or from autoscaling; each writes to the config database (A). The database feeds a Redis Pub/Sub channel through CDC, or the orchestrator or console publish directly (B). The broker pushes the message to every LB server (C), and each refreshes its in-memory config copy (D). Option 1 instead: call each LB server on port 9091. Redis Pub/Sub is at-most-once, so an LB server that was offline re-pulls on reconnect.';

export function ChangeReaches({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f4e-p-${k}`;
    const LX = [12, 122, 232];
    return (
      <Fig id="fig4e-p" w={340} h={540} title={T4E} desc={D4E}>
        <Label anchor="start" x={10} y={18} size={14}>dashed left: option 1, call each LB on :9091</Label>
        {LX.map((x, i) => <LbServer key={i} x={x} y={34} w={86} h={40} copy copyTone="green" seed={s(`lb${i}`)} />)}
        <Num x={330} y={54} n="D" size={14} />
        <Arrow dashed pts={[[10, 404], [4, 404], [4, 54], [10, 54]]} weight="thin" seed={s('meta')} />
        {LX.map((x, i) => <Arrow key={i} dashed pts={[[x + 43, 128], [x + 43, 76]]} seed={s(`up${i}`)} />)}
        <Num x={70} y={102} n="C" size={14} />
        <Pipe x={14} cy={140} w={316} ry={13} seed={s('pipe')} />
        <Label kind="mono" anchor="start" x={150} y={145} size={14}>redis pub/sub</Label>
        <Label tone="red" anchor="start" x={180} y={176} size={14}>at-most-once: an LB</Label>
        <Label tone="red" anchor="start" x={180} y={192} size={14}>that was offline</Label>
        <Label tone="red" anchor="start" x={180} y={208} size={14}>re-pulls on reconnect</Label>

        <Arrow dashed pts={[[120, 250], [120, 155]]} seed={s('cdc')} />
        <Label kind="mono" anchor="start" x={128} y={206} size={14}>cdc</Label>
        <Num x={104} y={206} n="B" size={14} />
        <Cyl cx={120} top={252} rx={32} h={34} seed={s('db')} />
        <Label kind="mono" x={120} y={326} size={14}>config db</Label>

        <Arrow dashed pts={[[60, 380], [60, 272], [86, 272]]} seed={s('a1')} />
        <Arrow dashed pts={[[198, 380], [198, 272], [154, 272]]} seed={s('a2')} />
        <Arrow dashed pts={[[298, 388], [298, 300], [200, 300]]} seed={s('a3')} />
        <Num x={170} y={256} n="A" size={14} />
        <Orchestrator x={10} y={382} w={112} h={40} seed={s('o')} size={14} />
        <Label x={66} y={442} size={14}>check failed</Label>
        <Box x={152} y={382} w={108} h={40} seed={s('con')} />
        <Label kind="mono" x={206} y={399} size={14}>lb console</Label>
        <Label kind="mono" x={206} y={415} size={14}>api</Label>
        <Arrow dashed pts={[[198, 470], [198, 424]]} seed={s('dev')} />
        <Actor x={198} y={474} s={0.8} seed={s('devp')} />
        <Label x={252} y={520} size={14}>developer</Label>
        <Label x={300} y={410} size={14}>autoscaling</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f4e-${k}`;
  const LX = [180, 330, 480];
  return (
    <Fig id="fig4e" w={700} h={430} title={T4E} desc={D4E}>
      {LX.map((x, i) => <LbServer key={i} x={x} y={30} w={110} h={44} copy copyTone="green" seed={s(`lb${i}`)} />)}
      <Num x={606} y={52} n="D" />
      <Label anchor="start" x={620} y={57} size={13.5}>copies</Label>
      <Label anchor="start" x={620} y={74} size={13.5}>refreshed</Label>
      {LX.map((x, i) => <Arrow key={i} dashed pts={[[x + 55, 136], [x + 55, 76]]} seed={s(`up${i}`)} />)}
      <Num x={214} y={106} n="C" />
      <Pipe x={180} cy={150} w={410} ry={14} seed={s('pipe')} />
      <Label kind="mono" anchor="start" x={196} y={188}>redis pub/sub</Label>
      <Label tone="red" anchor="start" x={598} y={136} size={13.5}>at-most-once:</Label>
      <Label tone="red" anchor="start" x={598} y={153} size={13.5}>an LB that was</Label>
      <Label tone="red" anchor="start" x={598} y={170} size={13.5}>offline re-pulls</Label>
      <Label tone="red" anchor="start" x={598} y={187} size={13.5}>on reconnect</Label>

      <Arrow dashed pts={[[385, 228], [385, 166]]} seed={s('cdc')} />
      <Label kind="mono" anchor="start" x={395} y={202}>cdc</Label>
      <Num x={366} y={198} n="B" />
      <Arrow dashed pts={[[150, 344], [150, 150], [176, 150]]} weight="thin" seed={s('direct')} />
      <Label anchor="end" x={142} y={232} size={13.5}>or publish</Label>
      <Label anchor="end" x={142} y={249} size={13.5}>directly</Label>
      <Cyl cx={385} top={230} rx={36} h={40} seed={s('db')} label="config db" />

      <Arrow dashed pts={[[185, 344], [185, 252], [347, 252]]} seed={s('a1')} />
      <Arrow dashed pts={[[505, 344], [505, 262], [423, 262]]} seed={s('a2')} />
      <Arrow dashed pts={[[640, 352], [640, 244], [423, 244]]} seed={s('a3')} />
      <Num x={300} y={238} n="A" />
      <Orchestrator x={110} y={346} w={140} h={40} seed={s('o')} />
      <Label x={180} y={410} size={13.5}>health check failed</Label>
      <Actor x={380} y={352} s={0.85} seed={s('devp')} />
      <Arrow dashed pts={[[396, 368], [438, 368]]} seed={s('dev')} />
      <Label x={380} y={414} size={13.5}>developer</Label>
      <Box x={440} y={346} w={130} h={40} label="lb console api" seed={s('con')} labelSize={13.5} />
      <Label x={640} y={372}>autoscaling</Label>

      <Arrow dashed pts={[[110, 366], [40, 366], [40, 52], [178, 52]]} weight="thin" seed={s('meta')} />
      <Label kind="mono" anchor="start" x={48} y={44} size={13.5}>:9091</Label>
      <Label anchor="middle" x={28} y={210} rotate={-90} size={13.5}>option 1: call each LB</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·f */

const T4F = 'Vitals flow into one place';
const D4F =
  'Every machine, LB servers and backends alike, runs an agent. Prometheus scrapes cpu, memory, network and disk from each agent and keeps them as time series, not key-value config. The orchestrator queries Prometheus for average CPU over the last 30 minutes, a history rather than a snapshot, and adds an LB server when the trend calls for it.';

export function VitalsFlow({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f4f-p-${k}`;
    const BX = [10, 120, 230];
    return (
      <Fig id="fig4f-p" w={340} h={430} title={T4F} desc={D4F}>
        <Orchestrator x={10} y={40} w={124} h={40} seed={s('o')} size={14} />
        <TimeSeries cx={282} top={24} rx={40} h={44} seed={s('prom')} />
        <Arrow pts={[[160, 60], [240, 60]]} seed={s('q')} />
        <Label kind="mono" anchor="end" x={234} y={88} size={14}>query avg cpu</Label>
        <Label muted anchor="end" x={234} y={105} size={14}>(last 30 min)</Label>
        <Label anchor="end" x={326} y={150} size={14}>history, not a snapshot</Label>
        <Label anchor="end" x={326} y={168} size={14}>time series ≠ key-value config</Label>

        <Arrow dashed tone="green" pts={[[100, 80], [100, 200], [255, 200], [255, 254]]} seed={s('add')} />
        <Label tone="green" anchor="start" x={108} y={192} size={14}>add an LB server</Label>
        <Line dashed pts={[[282, 112], [282, 120], [334, 120], [334, 316], [60, 316]]} seed={s('bus')} />
        <Line dashed pts={[[334, 236], [55, 236]]} seed={s('bus2')} />
        <Label kind="mono" anchor="start" x={16} y={229} size={14}>scrape: cpu · mem · n/w · disk</Label>
        <Arrow dashed pts={[[55, 236], [55, 256]]} seed={s('s1')} />
        <Arrow dashed pts={[[155, 236], [155, 256]]} seed={s('s2')} />
        <LbServer x={10} y={258} w={90} h={40} seed={s('lb1')} />
        <LbServer x={110} y={258} w={90} h={40} seed={s('lb2')} />
        <LbServer x={210} y={258} w={90} h={40} seed={s('lb3')} faint />
        <Agent x={18} y={290} />
        <Agent x={118} y={290} />
        <Label anchor="start" x={10} y={393} size={14}>agent: the dot on each machine</Label>
        {BX.map((x, i) => (
          <g key={i}>
            <Arrow dashed pts={[[x + 50, 316], [x + 50, 334]]} seed={s(`sb${i}`)} />
            <Box x={x} y={336} w={100} h={38} label="backend" seed={s(`b${i}`)} labelSize={14} />
            <Agent x={x + 8} y={366} />
          </g>
        ))}
      </Fig>
    );
  }
  const s = (k: string) => `f4f-${k}`;
  const BX = [400, 500, 600];
  return (
    <Fig id="fig4f" w={700} h={372} title={T4F} desc={D4F}>
      <Orchestrator x={40} y={40} w={150} h={44} seed={s('o')} />
      <TimeSeries cx={600} top={30} rx={46} h={50} seed={s('prom')} />
      <Arrow pts={[[190, 62], [552, 62]]} seed={s('q')} />
      <Label kind="mono" x={370} y={52}>query avg cpu (last 30 min)</Label>
      <Label anchor="end" x={540} y={124}>history, not a snapshot</Label>
      <Label anchor="end" x={540} y={144}>time series ≠ key-value config</Label>

      <Arrow dashed tone="green" pts={[[150, 84], [150, 112], [298, 112], [298, 254]]} seed={s('add')} />
      <Label tone="green" anchor="start" x={158} y={104}>add an LB server</Label>
      <Line dashed pts={[[600, 126], [600, 200], [78, 200]]} seed={s('bus')} />
      <Label kind="mono" x={460} y={190}>scrape: cpu · mem · n/w · disk</Label>
      {[78, 188].map((x, i) => <Arrow key={i} dashed pts={[[x, 200], [x, 254]]} seed={s(`sl${i}`)} />)}
      {BX.map((x, i) => <Arrow key={i} dashed pts={[[x + 45, 200], [x + 45, 254]]} seed={s(`sb${i}`)} />)}

      <LbServer x={30} y={256} w={96} h={44} seed={s('lb1')} />
      <LbServer x={140} y={256} w={96} h={44} seed={s('lb2')} />
      <LbServer x={250} y={256} w={96} h={44} seed={s('lb3')} faint />
      <Agent x={38} y={292} />
      <Agent x={148} y={292} />
      {BX.map((x, i) => (
        <g key={i}>
          <Box x={x} y={256} w={90} h={44} label="backend" seed={s(`b${i}`)} />
          <Agent x={x + 8} y={292} />
        </g>
      ))}
      <Label anchor="start" x={30} y={322}>agent</Label>
      <Label x={190} y={350}>LB servers</Label>
      <Label x={545} y={350}>backends</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §4 */

const TR4 = 'Reactive, not polling';
const DR4 = 'Left: a clock standing for the polling interval, its stale window marked in red, struck through. Right: a change arrives as an event and goes straight into an LB server, whose config copy is fresh.';

export function ReactiveSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule4-p' : 'rule4';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const cx = P ? 70 : 110, cy = 66;
  const lx = P ? 200 : 330;
  return (
    <Fig id={id} w={W} h={150} title={TR4} desc={DR4} className="bottomup">
      <Num x={cx} y={cy} n="" size={52} />
      <Mark a={[cx, cy]} b={[cx, cy - 26]} seed={s('h1')} />
      <Mark a={[cx, cy]} b={[cx + 18, cy + 6]} seed={s('h2')} />
      <Mark a={[cx + 8, cy - 30]} b={[cx + 26, cy - 14]} tone="red" weight="heavy" seed={s('w')} />
      <Mark a={[cx - 44, cy - 44]} b={[cx + 44, cy + 44]} weight="heavy" seed={s('x1')} />
      <Mark a={[cx + 44, cy - 44]} b={[cx - 44, cy + 44]} weight="heavy" seed={s('x2')} />
      <Label x={cx} y={136} size={14}>polling</Label>
      <Arrow dashed pts={[[lx - (P ? 70 : 110), 30], [lx - (P ? 44 : 70), 58], [lx - (P ? 58 : 84), 62], [lx - 4, 76]]} seed={s('bolt')} />
      <Label x={lx - (P ? 70 : 100)} y={102} size={14}>change</Label>
      <LbServer x={lx} y={50} w={P ? 96 : 120} h={46} copy copyTone="green" seed={s('lb')} />
      <Label x={lx + (P ? 48 : 60)} y={136} size={14}>reactive</Label>
    </Fig>
  );
}

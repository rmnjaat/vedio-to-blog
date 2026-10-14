// Lecture 06 (lec03), chapter 3 "Order, and why clocks break it" (writer w1).
// All figures are authored at 300–340 units (content shifted left where the drawing was laid out on 360), one layout
// each, so labels stay >= 12px down to a 360px phone:
// Fig 3·a (D-06), number strip (3.2), Fig 3·b (D-07), Fig 3·c (new), Fig 3·d (D-09, the chapter's one speech bubble),
// Fig 3·e (D-10), rule-box sketch §3. D-08 (four machines, four clocks) is told by the l03-clock-skew clip alone.
import React from 'react';
import { Arrow, Box, Bubble, Client, Cross, Fig, Label, Line, LoadBalancer, TEXT } from '../kit/Kit';
import { Clock, Threads, Tick, Under } from './s2-building-getid-parts';
import { chamferRect, poly, type Pt } from '../kit/hand';

const cw = (size: number) => size * 0.6;

/* ------------------------------------------------------------------ Fig 3·a */

export function WhichWriteFirst() {
  const s = (k: string) => `f3a-${k}`;
  const A = 100, B = 260;
  return (
    <Fig id="l03-f3a" w={300} h={236} title="Which write came first?"
      desc="A row holds a = 10. Transaction T1 sets a = 20 and transaction T2 sets a = 30. Which came first? If T1 carries ID 1 and T2 carries ID 2, the larger number marks the newer write, and with newer-write-wins the row keeps a = 30.">
      <g transform="translate(-40 0)">
      <Box x={140} y={12} w={80} h={30} label="a = 10" seed={s('row')} />
      <Threads cx={A} cy={102} n={1} h={26} seed={s('t1')} />
      <Threads cx={B} cy={102} n={1} h={26} seed={s('t2')} />
      <Label anchor="end" x={A - 10} y={107}>T1</Label>
      <Label anchor="start" x={B + 10} y={107}>T2</Label>
      <Arrow tone="blue" pts={[[A, 86], [A, 58], [158, 58], [158, 44]]} seed={s('w1')} />
      <Arrow tone="blue" pts={[[B, 86], [B, 58], [202, 58], [202, 44]]} seed={s('w2')} />
      <Label kind="mono" x={A} y={136}>a = 20</Label>
      <Label kind="mono" tone="green" x={B} y={136}>a = 30</Label>
      <Label x={180} y={107}>which came first?</Label>
      <Label kind="mono" x={A} y={172}>T1 → id 1</Label>
      <Label kind="mono" x={B} y={172}>T2 → id 2</Label>
      <Label x={172} y={214}>newer write wins: keep a = 30</Label>
      <Tick x={B + 50} y={136} seed={s('ok')} />
      </g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ 3.2 number strip */

export function IncreasingStrip() {
  const s = (k: string) => `f32-${k}`;
  const nums = (y: number, list: string[], x0: number, step: number) =>
    list.map((n, i) => <Label key={n + i} kind="mono" x={x0 + i * step} y={y}>{n}</Label>);
  return (
    <Fig id="l03-f32" w={340} h={150} title="Increasing, with and without gaps"
      desc="Top row: 1 2 3 4 5 6, every integer in turn, which the lecture calls strictly monotonic. Bottom row: 1 2 5 7 8 9 32 33 34, with gaps; each ID is still larger than every ID before it, which is all the lecture's 'monotonic' asks for.">
      <Label anchor="start" x={10} y={22}>strictly monotonic</Label>
      {nums(50, ['1', '2', '3', '4', '5', '6'], 24, 30)}
      <Label anchor="start" x={10} y={92}>monotonic: gaps allowed</Label>
      {nums(120, ['1', '2', '5', '7', '8', '9', '32', '33', '34'], 24, 36)}
      <Label muted anchor="start" x={210} y={50}>no gaps</Label>
      <Label muted anchor="start" x={24} y={144}>each one bigger than all before it</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b */

export function TimeFirst() {
  const s = (k: string) => `f3b-${k}`;
  const rows: [string, string][] = [['1729', '0001'], ['1729', '0002'], ['1730', '0001'], ['1730', '0002'], ['1730', '0003'], ['1731', '0001']];
  const X = 30, size = TEXT.mono, w4 = 4 * cw(size);
  const y0 = 64, dy = 28;
  return (
    <Fig id="l03-f3b" w={340} h={262} title="Time first decides the order"
      desc="Six eight-digit IDs: 1729 0001, 1729 0002, 1730 0001, 1730 0002, 1730 0003, 1731 0001. The first four digits are the time in milliseconds, the most significant part, so they decide the order; the last four digits are the machine ID or a counter and only break ties within one millisecond.">
      <Label anchor="start" x={X - 4} y={22}>time</Label>
      <Label muted anchor="start" x={X + w4 + 10} y={22} size={14}>machine</Label>
      <Label muted anchor="start" x={X + w4 + 10} y={38} size={14}>or counter</Label>
      {rows.map(([t, m], i) => (
        <g key={i}>
          <Label kind="mono" anchor="start" x={X} y={y0 + i * dy}>{t}</Label>
          <Under heavy x0={X} x1={X + w4 - 3} y={y0 + i * dy + 5} seed={s('u' + i)} />
          <Label kind="mono" anchor="start" x={X + w4 + 10} y={y0 + i * dy}>{m}</Label>
        </g>
      ))}
      <Line weight="thin" pts={[[150, 56], [150, 210]]} seed={s('rule')} />
      <Label anchor="start" x={164} y={76}>decides the order:</Label>
      <Label anchor="start" x={164} y={96}>most significant part</Label>
      <Label anchor="start" x={164} y={132}>makes sorting simple</Label>
      <Label anchor="start" x={164} y={168}>a tie is broken by</Label>
      <Label anchor="start" x={164} y={188}>the second half</Label>
      <Label kind="mono" muted anchor="start" x={X - 4} y={236}>return concat(get_time_ms(),</Label>
      <Label kind="mono" muted anchor="start" x={X - 4 + 14 * cw(size)} y={254}>machine_id)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·c */

export function DriftingClocks() {
  const s = (k: string) => `f3c-${k}`;
  const ox = 46, oy = 214, x1 = 284;
  const perfect = (x: number) => oy - 0.68 * (x - ox);
  // clock A runs ahead between syncs; clock B runs behind. A sync nudges each back to the true line.
  const path = (syncs: number[], drift: number) => {
    const pts: Pt[][] = [];
    let last = ox;
    for (const sx of [...syncs, x1]) {
      pts.push([[last, perfect(last)], [sx, perfect(sx) - drift * (sx - last)]]);
      last = sx;
    }
    return pts;
  };
  const A = path([128, 210], 0.2), B = path([170, 250], -0.13);
  const skewX = 206;
  return (
    <Fig id="l03-f3c" w={336} h={262} title="A clock that runs fast, a clock that runs slow"
      desc="True time runs along the bottom, what each clock says up the side. A perfect clock is the diagonal. Clock A drifts ahead of it and clock B drifts behind; each sync nudges them back toward the diagonal, and they drift again. Just before a sync, clock A is off by the gap marked in red: if an ID is made at that moment, its time part is wrong by that much. A quartz crystal's rate shifts with temperature, which is why clocks drift at all.">
      <g transform="translate(-12 0)">
      <Arrow weight="thin" pts={[[ox, oy], [x1 + 14, oy]]} seed={s('ax')} />
      <Arrow weight="thin" pts={[[ox, oy], [ox, 18]]} seed={s('ay')} />
      <Label x={170} y={242}>true time</Label>
      <Label x={24} y={120} rotate={-90}>what the clock says</Label>
      <Line weight="thin" dashed pts={[[ox, oy], [x1, perfect(x1)]]} seed={s('perf')} />
      {A.map((p, i) => <Line key={'a' + i} pts={p} seed={s('a' + i)} />)}
      {[128, 210].map((x, i) => <Line key={'as' + i} weight="thin" pts={[[x, perfect(x) - 0.2 * (x - (i ? 128 : ox))], [x, perfect(x)]]} seed={s('as' + i)} />)}
      {B.map((p, i) => <Line key={'b' + i} pts={p} seed={s('b' + i)} />)}
      {[170, 250].map((x, i) => <Line key={'bs' + i} weight="thin" pts={[[x, perfect(x) + 0.13 * (x - (i ? 170 : ox))], [x, perfect(x)]]} seed={s('bs' + i)} />)}
      {/* three end labels, one per line, stacked with clear gaps; clock B's sits lower on a short leader */}
      <Label anchor="start" x={x1 + 6} y={perfect(x1) - 0.2 * (x1 - 210) - 6} size={14}>clock A</Label>
      <Label anchor="start" x={x1 + 6} y={perfect(x1) + 4} size={14}>perfect</Label>
      <Line weight="thin" pts={[[x1 + 3, perfect(x1) + 0.13 * (x1 - 250) + 3], [x1 + 8, perfect(x1) + 22]]} seed={s('bl')} />
      <Label anchor="start" x={x1 + 6} y={perfect(x1) + 38} size={14}>clock B</Label>
      <Label anchor="end" x={124} y={perfect(128) - 0.2 * 82 - 8} size={14}>sync</Label>
      {/* the skew at one instant */}
      <Line tone="red" pts={[[skewX + 6, perfect(skewX) - 0.2 * (skewX - 128)], [skewX + 6, perfect(skewX)]]} seed={s('skew')} />
      <Line tone="red" weight="thin" dotted pts={[[skewX + 6, perfect(skewX) - 0.2 * (skewX - 128) - 2], [skewX + 6, 34], [200, 34]]} seed={s('lead')} />
      <Label tone="red" anchor="start" x={60} y={30} size={14}>skew at the moment</Label>
      <Label tone="red" anchor="start" x={60} y={48} size={14}>an ID is made</Label>
      {/* the crystal */}
      <path className="ink shape" d={chamferRect(196, 166, 12, 22, s('xtal'), 2)} />
      <path className="ink thin" d={poly([[200, 188], [200, 196]], s('xl1'))} />
      <path className="ink thin" d={poly([[204, 188], [204, 196]], s('xl2'))} />
      <Label anchor="start" x={216} y={178} size={14}>quartz: rate shifts</Label>
      <Label anchor="start" x={216} y={194} size={14}>with temperature</Label>
      </g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·d */

export function OneIdServer() {
  const s = (k: string) => `f3e-${k}`;
  return (
    <Fig id="l03-f3e" w={300} h={268} title="One ID server"
      desc="One central ID server runs the same get_id() with one clock. Client 1 and client 2 each make a network call to it and get an ID back. Because there is only one clock, the IDs it hands out increase no matter which client asks; the server's speech bubble says its clock never goes back.">
      <g transform="translate(-30 0)">
      <Bubble x={110} y={6} w={214} h={32} tail={[214, 54]} lines={['my clock never goes back']} seed={s('bub')} size={14} />
      <Box x={115} y={56} w={130} h={44} label="id server" seed={s('srv')} />
      <Clock cx={232} cy={70} r={8} seed={s('clk')} />
      <Label x={180} y={122}>same get_id(), one clock</Label>
      <Client x={44} y={196} label="client 1" seed={s('c1')} />
      <Client x={272} y={196} label="client 2" seed={s('c2')} />
      <Arrow tone="blue" pts={[[60, 196], [60, 70], [113, 70]]} seed={s('q1')} />
      <Arrow tone="blue" pts={[[115, 88], [78, 88], [78, 194]]} seed={s('a1')} />
      <Label kind="mono" tone="blue" anchor="start" x={84} y={158}>id</Label>
      <Arrow tone="blue" pts={[[300, 196], [300, 70], [247, 70]]} seed={s('q2')} />
      <Arrow tone="blue" pts={[[245, 88], [282, 88], [282, 194]]} seed={s('a2')} />
      <Label kind="mono" tone="blue" anchor="end" x={276} y={158}>id</Label>
      </g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·e */

export function TwoIdServers() {
  const s = (k: string) => `f3f-${k}`;
  const L = 85, R = 275;
  return (
    <Fig id="l03-f3f" w={320} h={318} title="Two ID servers must gossip"
      desc="To remove the single point of failure, two ID servers sit behind a load balancer and clients reach either one. Before answering, whichever server gets a request must ask the other for its last ID and add a buffer, so the two gossip on every ID. That constant gossip, marked red, makes a simple function slow and complex.">
      <g transform="translate(-20 0)">
      <Label x={180} y={20}>gossip: what’s your last id?</Label>
      <Arrow dashed head="both" pts={[[L, 74], [L, 36], [R, 36], [R, 74]]} seed={s('g')} />
      <path className="red" d={poly([[130, 46], [130, 52], [230, 52], [230, 46]], s('gb'))} />
      <Label tone="red" x={180} y={70} size={14}>slow, complex</Label>
      <Box x={L - 55} y={76} w={110} h={40} label="id server" seed={s('s1')} />
      <Box x={R - 55} y={76} w={110} h={40} label="id server" seed={s('s2')} />
      <LoadBalancer x={168} y={150} w={24} h={36} seed={s('lb')} label="" />
      <Label kind="mono" anchor="start" x={198} y={157}>lb</Label>
      <Arrow tone="blue" pts={[[180, 150], [180, 134], [L, 134], [L, 118]]} seed={s('l1')} />
      <Arrow tone="blue" pts={[[180, 134], [R, 134], [R, 118]]} seed={s('l2')} />
      <Client x={58} y={200} label="client 1" seed={s('c1')} />
      <Client x={258} y={200} label="client 2" seed={s('c2')} />
      <Arrow tone="blue" pts={[[80, 200], [80, 168], [166, 168]]} seed={s('q1')} />
      <Arrow tone="blue" pts={[[280, 200], [280, 168], [194, 168]]} seed={s('q2')} />
      <Label muted x={180} y={278} size={14}>two servers, to remove the single point</Label>
      <Label muted x={180} y={298} size={14}>of failure, which now must agree on every id</Label>
      </g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §3 */

export function RelaxOrder() {
  const s = (k: string) => `r3-${k}`;
  return (
    <Fig id="l03-rule3" w={320} h={118} className="bottomup" title="Relax what you don’t need"
      desc="Two clocks reading 23 and 24, and under them the IDs 244 and 237 with a red cross between: distributed clocks break strict order. Underneath: relax what you don't need.">
      <Clock cx={100} cy={24} r={11} seed={s('c1')} />
      <Label kind="mono" anchor="start" x={116} y={29}>24</Label>
      <Clock cx={200} cy={24} r={11} seed={s('c2')} />
      <Label kind="mono" anchor="start" x={216} y={29}>23</Label>
      <Label kind="mono" x={110} y={70}>244</Label>
      <Cross x={160} y={65} size={16} seed={s('x')} />
      <Label kind="mono" tone="red" x={210} y={70}>237</Label>
      <Label x={160} y={106}>relax what you don’t need</Label>
    </Fig>
  );
}

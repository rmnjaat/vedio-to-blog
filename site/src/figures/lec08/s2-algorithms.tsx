// Lecture 05 (lec08) · chapter 2 "Choosing a backend": Fig 2·a, Fig 2·b (three panels), Fig 2·c (StepThrough)
// and the §2 rule sketch.
// Fig 2·a redraws D-01 (b_001930). Fig 2·b redraws D-02 (b_002245, b_004000); panel b's numbers are drawn from the
// 1:2:1 rule because the board's are cut off. Fig 2·c is new: five requests under least connections, then the same
// five under round robin; the §2 misconception bubble sits on the lb in step 5.
// Ledger: L-0049 L-0050 L-0051 (2·a) · L-0053 L-0057 L-0059 L-0061 L-0062 L-0070 L-0078 (2·b) ·
// L-0070 L-0072 L-0076 L-0077 L-0079 L-0089 (2·c) · L-0055 L-0062 L-0078 (rule).
import React from 'react';
import { Actor, Arrow, Box, Bubble, Fig, Label, Lifeline, Line, LoadBalancer, Mark, Num, Step, TimeAxis } from '../kit/Kit';

type Layout = { layout?: 'wide' | 'phone' };
const NB = ' ';

/* ------------------------------------------------------------------ Fig 2·a */

const ENTRY_T = 'One entry point';
const ENTRY_D =
  'Two clients send their requests to one load balancer, reached by one name that never changes. The load balancer forwards each request ' +
  'to one of three API servers. Advantages written beside it: fault tolerance, and no overloaded server.';

export function OneEntryPoint({ layout = 'wide' }: Layout) {
  if (layout === 'phone') {
    const xs = [62, 170, 278];
    return (
      <Fig id="f2a-p" w={340} h={420} title={ENTRY_T} desc={ENTRY_D}>
        <Actor x={110} y={14} s={0.9} seed="f2a-p-c1" />
        <Actor x={230} y={14} s={0.9} seed="f2a-p-c2" />
        <Arrow tone="blue" pts={[[110, 70], [110, 112]]} seed="f2a-p-a1" />
        <Arrow tone="blue" pts={[[230, 70], [230, 112]]} seed="f2a-p-a2" />
        <Box x={40} y={116} w={260} h={24} seed="f2a-p-lb" />
        <Label kind="mono" anchor="start" x={50} y={133} size={14}>lb</Label>
        <Label kind="mono" x={170} y={164} size={14}>payments.lb.google.com</Label>
        {xs.map((x, i) => (
          <g key={i}>
            <Arrow pts={[[x, 184], [x, 228]]} seed={`f2a-p-f${i}`} />
            <Box x={x - 44} y={232} w={88} h={36} label="api" seed={`f2a-p-api${i}`} />
          </g>
        ))}
        <Line pts={[[62, 184], [278, 184]]} seed="f2a-p-bar" />
        <Line pts={[[170, 140], [170, 148]]} seed="f2a-p-stem" />
        <Line pts={[[170, 172], [170, 184]]} seed="f2a-p-stem2" />
        <Label x={170} y={304} size={15}>single point of entry</Label>
        <Label muted x={170} y={344} size={14}>advantages:</Label>
        <Label x={170} y={368} size={14}>fault tolerance</Label>
        <Label x={170} y={392} size={14}>no overloaded server</Label>
      </Fig>
    );
  }
  const ys = [70, 150, 230];
  return (
    <Fig id="f2a" w={880} h={310} title={ENTRY_T} desc={ENTRY_D}>
      <Actor x={90} y={64} seed="f2a-c1" />
      <Actor x={90} y={176} seed="f2a-c2" />
      <Arrow tone="blue" pts={[[114, 96], [200, 96], [200, 140], [296, 140]]} seed="f2a-a1" />
      <Arrow tone="blue" pts={[[114, 208], [200, 208], [200, 160], [296, 160]]} seed="f2a-a2" />
      <Label kind="mono" x={312} y={34} size={15}>payments.lb.google.com</Label>
      <LoadBalancer x={300} y={76} w={24} h={148} seed="f2a-lb" size={15} />
      {ys.map((y, i) => (
        <g key={i}>
          <Arrow pts={i === 1 ? [[324, 150], [476, 150]] : [[324, 150], [400, 150], [400, y], [476, y]]} seed={`f2a-f${i}`} />
          <Box x={480} y={y - 20} w={120} h={40} label="api" seed={`f2a-api${i}`} labelSize={15} />
        </g>
      ))}
      <Label x={312} y={256} size={15}>single point of entry</Label>
      <Label muted anchor="start" x={672} y={118} size={15}>advantages:</Label>
      <Label anchor="start" x={672} y={146} size={15}>fault tolerance</Label>
      <Label anchor="start" x={672} y={172} size={15}>no overloaded server</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b */

/** One panel of Fig 2·b: lb on the left, a fan to three backends, request numbers beside each. */
function Fan({ id, sizes, wide, nums, weights, children, note, title, h = 300 }: {
  id: string; sizes: string[]; wide?: number; nums: string[]; weights?: string[]; children?: React.ReactNode;
  note: string; title: string; h?: number;
}) {
  const s = (k: string) => `${id}-${k}`;
  const ys = [34, 94, 154];
  const BX = 112;
  return (
    <>
      <Box x={10} y={88} w={54} h={44} label="lb" seed={s('lb')} labelSize={16} />
      {ys.map((y, i) => {
        const w = i === wide ? 100 : 50;
        return (
          <g key={i}>
            <Arrow pts={i === 1 ? [[64, 110], [BX - 2, 110]] : [[64, 110], [76, 110], [76, y + 16], [BX - 2, y + 16]]} seed={s('a' + i)} />
            {weights && <Label kind="mono" muted x={95} y={y + 10} size={16}>{weights[i]}</Label>}
            <Box x={BX} y={y} w={w} h={32} label={sizes[i]} seed={s('b' + i)} labelSize={16} />
            <Label kind="mono" tone="blue" anchor="start" x={BX + w + 8} y={y + 21} size={16}>{nums[i]}</Label>
          </g>
        );
      })}
      {children}
      <Label muted x={150} y={h - 40} size={16}>{note}</Label>
      <Label kind="title" x={150} y={h - 12}>{title}</Label>
    </>
  );
}

const RR_D = 'Round robin: three equal 4 GB servers get requests in turn, 1 and 4, 2 and 5, 3 and 6. It suits uniform infrastructure and uniform load.';
export function PanelRR({ sfx = '' }: { sfx?: string }) {
  return (
    <Fig id={'f2b-a' + sfx} w={300} h={300} title="Round robin" desc={RR_D}>
      <Fan id={'f2b-a' + sfx} sizes={['4 GB', '4 GB', '4 GB']} nums={['1,4', '2,5', '3,6']}
        note="uniform infra · uniform load" title="round robin" />
    </Fig>
  );
}

const WRR_D =
  'Weighted round robin: 4 GB, 8 GB and 4 GB servers with weights 1, 2 and 1. Of every four requests the 8 GB server gets two: ' +
  '1 and 5, then 2, 3, 6 and 7, then 4 and 8. Under plain round robin the 8 GB server would sit at about 40% while the others ran at 80%; ' +
  'with weights, at the same total load, all three run at about 60%, so about a third more traffic fits before any server reaches 80%.';
export function PanelWRR({ sfx = '' }: { sfx?: string }) {
  const id = 'f2b-b' + sfx;
  const GX = [12, 108, 204], GW = 54, GH = 12;
  /** One fill gauge per server: outline plus a heavy fill, red when the server idles (under half its capacity). */
  const gauge = (x: number, y: number, pct: number, k: string) => {
    const tone = pct < 50 ? 'red' : 'ink';
    const fx = x + 3 + ((GW - 6) * pct) / 100;
    return (
      <g key={k}>
        <Box x={x} y={y} w={GW} h={GH} seed={`${id}-g${k}`} tone={tone} />
        <Line pts={[[x + 3, y + 4], [fx, y + 4]]} weight="heavy" tone={tone} seed={`${id}-f${k}a`} />
        <Line pts={[[x + 3, y + 8], [fx, y + 8]]} weight="heavy" tone={tone} seed={`${id}-f${k}b`} />
        <Label kind="mono" tone={tone === 'red' ? 'red' : undefined} anchor="start" x={x + GW + 5} y={y + 11} size={14}>{`${pct}%`}</Label>
      </g>
    );
  };
  const row = (y: number, label: string, pcts: number[], k: string) => (
    <g>
      <Label anchor="start" x={12} y={y} size={15}>{label}</Label>
      {pcts.map((p, i) => gauge(GX[i], y + 8, p, `${k}${i}`))}
    </g>
  );
  return (
    <Fig id={id} w={300} h={380} title="Weighted round robin" desc={WRR_D}>
      <Fan id={id} sizes={['4 GB', '8 GB', '4 GB']} wide={1} nums={['1,5', '2,3,6,7', '4,8']} weights={['w=1', 'w=2', 'w=1']}
        note="non-uniform infra · as per weights" title="weighted round robin" h={380}>
        {/* utilisation per server, top to bottom of the fan: 4 GB · 8 GB · 4 GB */}
        {['4 GB', '8 GB', '4 GB'].map((g, i) => (
          <Label key={g + i} kind="mono" muted x={GX[i] + GW / 2} y={212} size={14}>{g}</Label>
        ))}
        {row(236, 'round robin', [80, 40, 80], 'rr')}
        {row(290, 'weighted 1 : 2 : 1', [60, 60, 60], 'w')}
      </Fan>
    </Fig>
  );
}

const LC_D =
  'Least connections: three equal servers; each request goes to the one with the fewest open connections, so the numbers are uneven: ' +
  '1, 5, 7 · 2, 4, 8, 9 · 3, 6, 10. It suits loads with a big variance in response times, such as analytics.';
export function PanelLC({ sfx = '' }: { sfx?: string }) {
  return (
    <Fig id={'f2b-c' + sfx} w={300} h={300} title="Least connections" desc={LC_D}>
      <Fan id={'f2b-c' + sfx} sizes={['4 GB', '4 GB', '4 GB']} nums={['1,5,7', '2,4,8,9', '3,6,10']}
        note="big variance in response times" title="least connections" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c (StepThrough) */

const LC_STEP_D =
  'Swim lanes for the load balancer and three servers, time running down. 1: requests 1, 2 and 3 go to servers 1, 2 and 3, one connection each. ' +
  '2: request 2 was a one-second call; its connection closes and server 2 is free. 3: request 4 goes to server 2, which has the fewest connections. ' +
  '4: request 4 runs long; request 5 arrives with servers 1 and 3 tied at one connection, and the load balancer picks server 1. ' +
  '5: under round robin the same five requests would have put the long requests 1 and 4 on server 1. The load balancer only sees its connections, not CPU.';

export function LeastConnSteps({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f2c-p' : 'f2c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const LB = P ? 72 : 92;
  const S = P ? [150, 222, 294] : [200, 286, 372];
  const BW = P ? 62 : 74;
  const NX = P ? 38 : 46;
  const T = 14;
  const srv = P ? ['srv 1', 'srv 2', 'srv 3'] : ['server 1', 'server 2', 'server 3'];
  const CX = LB + 6; // counters
  const counter = (y: number, v: string) => (
    <Label kind="mono" anchor="start" x={CX} y={y} size={P ? 14 : 13}>{v.split(' ').join(NB + NB)}</Label>
  );
  const req = (n: number, to: number, y: number, tone: 'blue' = 'blue') => (
    <g>
      <Arrow tone={tone} pts={[[LB, y], [S[to] - 3, y + 14]]} seed={s('r' + n)} />
      <Label kind="mono" tone="blue" anchor="end" x={S[to] - 6} y={y + 2} size={P ? 14 : 13}>{String(n)}</Label>
    </g>
  );
  const bar = (lane: number, y0: number, y1: number, off = 0, tone: 'blue' | 'red' = 'blue', k = '') => (
    <Line pts={[[S[lane] + 5 + off, y0], [S[lane] + 5 + off, y1]]} weight="heavy" tone={tone} seed={s('bar' + lane + off + k + y0)} />
  );
  return (
    <Fig id={id} w={W} h={600} title="Least connections, one request at a time" desc={LC_STEP_D}>
      <Box x={LB - 26} y={18} w={52} h={30} label="lb" seed={s('lb')} labelSize={T} />
      {S.map((x, i) => <Box key={i} x={x - BW / 2} y={18} w={BW} h={30} label={srv[i]} seed={s('srv' + i)} labelSize={T} />)}
      <Label kind="mono" muted anchor="start" x={CX} y={72} size={P ? 14 : 13}>{['s1', 's2', 's3'].join(NB)}</Label>
      <Lifeline x={LB} y0={50} y1={392} seed={s('l0')} />
      {S.map((x, i) => <Lifeline key={i} x={x} y0={50} y1={392} seed={s('l' + (i + 1))} />)}
      <TimeAxis x={P ? 6 : 12} y0={84} y1={388} seed={s('t')} size={P ? 14 : 13} />

      <Step n={1}>
        <Num x={NX} y={96} n={1} tone="blue" size={P ? 14 : 13} />
        {req(1, 0, 88)}{req(2, 1, 100)}{req(3, 2, 112)}
        {bar(0, 102, 392)}{bar(1, 114, 178)}{bar(2, 126, 392)}
        {counter(156, '1 1 1')}
      </Step>
      <Step n={2}>
        <Num x={NX} y={190} n={2} tone="green" size={P ? 14 : 13} />
        <Mark a={[S[1] - 4, 184]} b={[S[1] + 1, 190]} tone="green" seed={s('tk1')} />
        <Mark a={[S[1] + 1, 190]} b={[S[1] + 12, 176]} tone="green" seed={s('tk2')} />
        <Label tone="green" anchor="start" x={S[1] + 16} y={196} size={P ? 14 : 13}>done</Label>
        {counter(212, '1 0 1')}
      </Step>
      <Step n={3}>
        <Num x={NX} y={240} n={3} tone="blue" size={P ? 14 : 13} />
        {req(4, 1, 236)}
        {bar(1, 250, 290)}
        {counter(282, '1 1 1')}
      </Step>
      <Step n={4}>
        <Num x={NX} y={312} n={4} tone="blue" size={P ? 14 : 13} />
        {bar(1, 290, 392, 0, 'blue', 'x')}
        <Label anchor="start" x={S[1] + 12} y={326} size={P ? 14 : 13}>long</Label>
        {req(5, 0, 306)}
        {bar(0, 320, 392, 9)}
        {P
          ? <><Label anchor="start" x={CX} y={338} size={P ? 14 : 13}>tie →</Label><Label anchor="start" x={CX} y={353} size={P ? 14 : 13}>pick one</Label></>
          : <Label anchor="start" x={CX} y={350} size={P ? 14 : 13}>tie → pick one</Label>}
        {counter(372, '2 1 1')}
      </Step>
      <Step n={5}>
        <Num x={NX} y={470} n={5} tone="red" size={P ? 14 : 13} />
        <Bubble x={P ? 30 : 40} y={410} w={P ? 240 : 250} h={34} tail={[LB, 494]} lines={['CPU? I only see my connections.']} seed={s('bub')} size={P ? 14 : 13} />
        <Label anchor="start" x={LB + 36} y={474} size={14}>round robin, same five:</Label>
        <Box x={LB - 26} y={498} w={52} h={26} label="lb" seed={s('lb2')} labelSize={T} />
        {/* rr: 1→s1, 2→s2, 3→s3, 4→s1, 5→s2 */}
        {[['1,4', 0], ['2,5', 1], ['3', 2]].map(([t, i]) => (
          <Label key={String(i)} kind="mono" tone={i === 0 ? 'red' : 'blue'} x={S[i as number]} y={514} size={14}>{t as string}</Label>
        ))}
        <Line tone="red" pts={[[S[0] - 30, 496], [S[0] + 30, 496], [S[0] + 30, 522], [S[0] - 30, 522], [S[0] - 30, 496]]} seed={s('ring')} />
        <Label tone="red" x={S[0]} y={548} size={P ? 14 : 13}>two long ones</Label>
        <Label tone="red" x={S[0]} y={566} size={P ? 14 : 13}>pile up</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §2 */

function MiniFan({ x, y, tag, kind, seed }: { x: number; y: number; tag: string; kind: 'rr' | 'wrr' | 'lc'; seed: string }) {
  const ys = [y, y + 26, y + 52];
  return (
    <g>
      <Box x={x} y={y + 14} w={22} h={36} seed={seed + 'lb'} />
      {ys.map((yy, i) => {
        const w = kind === 'wrr' && i === 1 ? 64 : 32;
        return (
          <g key={i}>
            <Line pts={i === 1 ? [[x + 22, yy + 8], [x + 52, yy + 8]] : [[x + 22, y + 34], [x + 36, y + 34], [x + 36, yy + 8], [x + 52, yy + 8]]} seed={`${seed}l${i}`} />
            <Box x={x + 52} y={yy} w={w} h={16} seed={`${seed}b${i}`} />
            {kind === 'lc' && i === 0 && <Line pts={[[x + 58, yy + 8], [x + 80, yy + 8]]} weight="heavy" tone="blue" seed={`${seed}long`} />}
          </g>
        );
      })}
      <Label kind="mono" x={x + 50} y={y + 92} size={14}>{tag}</Label>
    </g>
  );
}

export function Rule2Pick({ layout = 'wide' }: Layout) {
  const title = 'Pick by infrastructure and load';
  const desc =
    'Three small load balancers, each fanning out to three servers. rr: three equal servers. wrr: the middle server is twice as big. ' +
    'lc: one server holds a long request.';
  if (layout === 'phone')
    return (
      <Fig id="rule2-p" w={320} h={120} title={title} desc={desc}>
        <MiniFan x={4} y={8} tag="rr" kind="rr" seed="r2p-a" />
        <MiniFan x={96} y={8} tag="wrr" kind="wrr" seed="r2p-b" />
        <MiniFan x={226} y={8} tag="lc" kind="lc" seed="r2p-c" />
      </Fig>
    );
  return (
    <Fig id="rule2" w={480} h={120} title={title} desc={desc}>
      <MiniFan x={30} y={8} tag="rr" kind="rr" seed="r2-a" />
      <MiniFan x={180} y={8} tag="wrr" kind="wrr" seed="r2-b" />
      <MiniFan x={350} y={8} tag="lc" kind="lc" seed="r2-c" />
    </Fig>
  );
}

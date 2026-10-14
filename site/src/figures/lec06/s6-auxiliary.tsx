// Lecture 08 (lec06), §6 figures (writer w4). Fig 6·c is Paths({ aux: true }) in s5b-badge.tsx (D-13 full redraw).
//  RuleBox sketch §6 RoseUnderGlass  the main store under a glass dome; a small aux store catches the arrows
//  Fig 6·a LoadAudit       "Where the load goes" (new)
//  Fig 6·b FirstVsRepeats  "First message vs repeats" (new StepThrough; lanes worker · aux · main)
//  Fig 6·d WhichFailure    "Which failure hurts" (new, two panels)
import React from 'react';
import { Arrow, Box, Cross, Cyl, Label, Lifeline, Line, Num, Step, TimeAxis, Worker, type Pt } from '../kit/Kit';
import { Fig } from './floor';
import { Ring } from './s1-images-parts';
import { Cluster, MsgIcon } from './s5a-badge-parts';

type Layout = { layout?: 'wide' | 'phone' };
const at = (x: number, y: number) => `translate(${x} ${y})`;

/* ------------------------------------------------------------------ rule sketch §6 */

export function RoseUnderGlass({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'rule6-p' : 'rule6';
  const s = (k: string) => `${id}-${k}`;
  const ax = P ? 108 : 150, mx = P ? 236 : 330, rx = P ? 58 : 64;
  const dome: Pt[] = Array.from({ length: 9 }, (_, i) => {
    const t = (Math.PI * i) / 8;
    return [mx - rx * Math.cos(t), 160 - 118 * Math.sin(t)];
  });
  const ys = [106, 118, 130, 142];
  return (
    <Fig id={id} w={P ? 320 : 480} h={204} title="The database under glass"
      desc="The main store sits under a glass dome, like the rose kept in a jar. A small auxiliary store beside it catches the repeated writes; only one write per new sender passes through to the main store.">
      <Line pts={dome} seed={s('dome')} />
      <Line pts={[[mx - rx - 10, 160], [mx + rx + 10, 160]]} seed={s('base')} />
      <Cyl cx={mx} top={96} rx={34} ry={8} h={48} seed={s('main')} />
      <Label kind="mono" x={mx} y={182}>main redis</Label>
      <Label muted x={mx} y={28} size={13.5}>under glass</Label>
      {ys.map((y, i) => <Arrow key={i} weight="thin" pts={[[P ? 8 : 24, y], [ax - 26, y]]} seed={s('a' + i)} />)}
      <Cyl cx={ax} top={102} rx={22} ry={6} h={44} seed={s('aux')} />
      <Label kind="mono" x={ax} y={182}>aux redis</Label>
      <Arrow tone="blue" pts={[[ax + 24, 124], [mx - 38, 124]]} seed={s('one')} />
      <Label tone="blue" x={(ax + mx) / 2 - 6} y={114} size={13}>1 write</Label>
      <Label muted x={P ? 52 : 74} y={94} size={13}>repeats</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·a */

export function LoadAudit({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig6a-p' : 'fig6a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Where the load goes';
  const desc = 'Three kinds of call reach the Redis cluster. get_status: millions of refreshes, each a read the badge needs from the source of truth. clear: a delete on every tap, which can’t be reduced. The write path: thirty ON_MSG_UNSENT events from C to B. The first adds C to B’s set; the other 29 are received, checked against the set and discarded. 29 of 30 writes change nothing.';
  const reds = [0, 1, 2, 3, 4, 5];
  if (P) {
    return (
      <Fig id={id} w={340} h={330} title={title} desc={desc}>
        {/* critic C-06: the cluster at the standard glyph size; a bus line gathers the calls into it */}
        <Cluster x={110} y={18} seed={s('db')} />
        <Label kind="mono" anchor="start" x={214} y={56}>redis cluster</Label>
        <Line pts={[[26, 118], [330, 118]]} seed={s('bus')} />
        <Arrow tone="blue" weight="heavy" pts={[[158, 118], [158, 84]]} seed={s('in')} />
        {[34, 54, 74, 94].map((x, i) => <Arrow key={'g' + i} tone="blue" pts={[[x, 196], [x, 120]]} seed={s('g' + i)} />)}
        {[146, 166].map((x, i) => <Arrow key={'c' + i} tone="blue" pts={[[x, 196], [x, 120]]} seed={s('c' + i)} />)}
        <Arrow tone="blue" pts={[[214, 196], [214, 120]]} seed={s('w0')} />
        {reds.map((i) => <Arrow key={'r' + i} tone="red" pts={[[234 + i * 16, 196], [234 + i * 16, 120]]} seed={s('r' + i)} />)}
        <Label kind="mono" x={64} y={220} size={13}>get_status</Label>
        <Label x={64} y={240} size={13}>millions of</Label>
        <Label x={64} y={258} size={13}>refreshes;</Label>
        <Label x={64} y={276} size={13}>must read</Label>
        <Label kind="mono" x={156} y={220} size={13}>clear</Label>
        <Label x={156} y={240} size={13}>must</Label>
        <Label x={156} y={258} size={13}>delete</Label>
        <Label kind="mono" x={268} y={220} size={13}>write path</Label>
        <Label x={268} y={240} size={13}>30 events C→B</Label>
        <Label tone="green" x={268} y={258} size={13}>1st: added C</Label>
        <Label tone="red" x={268} y={276} size={13}>29: no change</Label>
        <Label tone="red" x={170} y={312} size={14}>29 of 30 writes change nothing</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={880} h={340} title={title} desc={desc}>
      {/* critic C-06: the cluster at the standard glyph size; a bus line gathers the calls into it */}
      <Line pts={[[712, 58], [712, 296]]} seed={s('bus')} />
      <Arrow tone="blue" weight="heavy" pts={[[712, 176], [744, 176]]} seed={s('in')} />
      <Cluster x={746} y={150} seed={s('db')} />
      <Label kind="mono" x={794} y={240}>redis cluster</Label>
      <Label kind="mono" anchor="start" x={20} y={80}>get_status</Label>
      <Label muted anchor="start" x={20} y={102} size={13}>millions of refreshes · must read: source of truth</Label>
      {[66, 78, 90, 102].map((y, i) => <Arrow key={'g' + i} tone="blue" pts={[[420, y], [706, y]]} seed={s('g' + i)} />)}
      <Label kind="mono" anchor="start" x={20} y={168}>clear</Label>
      <Label muted anchor="start" x={20} y={190} size={13}>must delete the key</Label>
      {[164, 176].map((y, i) => <Arrow key={'c' + i} tone="blue" pts={[[420, y], [706, y]]} seed={s('c' + i)} />)}
      <Label kind="mono" anchor="start" x={20} y={238}>write path</Label>
      <Label muted anchor="start" x={20} y={260} size={13}>30 ON_MSG_UNSENT events, C→B</Label>
      <Arrow tone="blue" pts={[[420, 228], [706, 228]]} seed={s('w0')} />
      <Label tone="green" x={640} y={220} size={13}>1st: added C</Label>
      {reds.map((i) => <Arrow key={'r' + i} tone="red" pts={[[420, 242 + i * 9], [706, 242 + i * 9]]} seed={s('r' + i)} />)}
      <Label tone="red" x={563} y={316} size={14}>29 of 30 writes change nothing</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·b */

export function FirstVsRepeats({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig6b-p' : 'fig6b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 62 : 72, X = P ? 184 : 222, M = P ? 290 : 358, NX = P ? 22 : 26;
  const T = 13, NS = P ? 14 : 12.5;
  const B = (A + X) / 2; // the status api box of step 5 (critic C-03: the clear starts at the api, not the worker)
  return (
    <Fig id={id} w={W} h={590} halo title="First message vs repeats"
      desc="Lanes for the worker, the auxiliary Redis and the main Redis cluster, time running down. 1: C’s first message to B; the worker sets B_C on aux only if it is absent, and aux answers OK, newly set. 2: only then the worker adds C to B’s set on main. 3: C’s second message; aux answers nil, the key exists, and main isn’t touched. 4: messages 3 to 30 are 28 more checks, all on aux; main still has one write. 5: B taps the icon; the status API clears both stores: DEL B_C B_D on aux and DEL B on main.">
      <Worker x={A - 45} y={26} w={90} h={34} label="worker" seed={s('wk')} />
      <Cyl cx={X} top={24} rx={26} ry={7} h={30} seed={s('aux')} label="aux redis" />
      <Cyl cx={M} top={24} rx={30} ry={7} h={30} seed={s('main')} label="main redis" />
      <Lifeline x={A} y0={70} y1={576} seed={s('la')} />
      <Lifeline x={X} y0={96} y1={576} seed={s('lx')} />
      <Lifeline x={M} y0={96} y1={576} seed={s('lm')} />
      <TimeAxis x={P ? 6 : 8} y0={62} y1={572} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Num x={NX} y={128} n={1} tone="blue" size={NS} />
        <Label kind="mono" anchor="end" x={A - 6} y={112} size={T}>C→B #1</Label>
        <Label kind="mono" x={(A + X) / 2 + 6} y={126} size={T}>SET B_C 1 NX</Label>
        <Arrow tone="blue" pts={[[A + 6, 134], [X - 6, 144]]} seed={s('s1')} />
        <Arrow tone="green" pts={[[X - 6, 156], [A + 6, 166]]} seed={s('r1')} />
        <Label kind="mono" tone="green" x={(A + X) / 2} y={184} size={T}>OK (new)</Label>
        <Label kind="mono" tone="green" anchor="start" x={X + 8} y={190} size={T}>B_C</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={224} n={2} tone="green" size={NS} />
        <Label kind="mono" x={(A + M) / 2 - 20} y={214} size={T}>SADD B C</Label>
        <Arrow tone="blue" pts={[[A + 6, 222], [M - 6, 234]]} seed={s('s2')} />
        <Label kind="mono" tone="green" x={M} y={256} size={T}>B: {'{'}C{'}'}</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={306} n={3} size={NS} />
        <Label kind="mono" anchor="end" x={A - 6} y={290} size={T}>C→B #2</Label>
        <Label kind="mono" x={(A + X) / 2 + 6} y={304} size={T}>SET B_C 1 NX</Label>
        <Arrow tone="blue" pts={[[A + 6, 312], [X - 6, 322]]} seed={s('s3')} />
        <Arrow pts={[[X - 6, 334], [A + 6, 344]]} seed={s('r3')} />
        <Label kind="mono" x={(A + X) / 2} y={362} size={T}>nil: exists</Label>
        <Label muted x={M} y={330} size={13.5}>not touched</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={402} n={4} size={NS} />
        <Label kind="mono" anchor="start" x={A + 8} y={392} size={T}>#3 … #30</Label>
        {[0, 1, 2].map((i) => <Arrow key={i} weight="thin" pts={[[A + 6, 404 + i * 9], [X - 6, 408 + i * 9]]} seed={s('c' + i)} />)}
        <Label x={X} y={448} size={13.5}>28 more checks, all in aux</Label>
        <Label x={M} y={404} size={13.5}>still 1 write</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={494} n={5} tone="green" size={NS} />
        <Box x={B - (P ? 47 : 44)} y={462} w={P ? 94 : 88} h={40} label="status api" sub="a tap" seed={s('api')} labelSize={T} />
        <Arrow tone="green" pts={[[B + 20, 502], [B + 20, 518], [X - 6, 518]]} seed={s('d1')} />
        <Label kind="mono" tone="green" anchor="start" x={X + 8} y={523} size={T}>DEL B_C B_D</Label>
        <Arrow tone="green" pts={[[B - 20, 502], [B - 20, 552], [M - 6, 552]]} seed={s('d2')} />
        <Label kind="mono" tone="green" x={(X + M) / 2} y={544} size={T}>DEL B</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d */

function MainDown({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Box x={10} y={40} w={124} h={40} label="status api" seed={s('api')} />
      <Arrow tone="red" pts={[[136, 60], [214, 60]]} seed={s('rd')} />
      <Cyl cx={258} top={34} rx={40} ry={9} h={50} tone="red" seed={s('main')} label="main redis" />
      <MsgIcon x={40} y={130} s={34} n="?" seed={s('icon')} />
      <Label tone="red" x={220} y={156} size={15}>everything is down</Label>
      <Label kind="title" x={170} y={206}>main down</Label>
    </g>
  );
}

function AuxDown({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Worker x={10} y={40} w={96} h={34} label="worker" seed={s('wk')} />
      <Line tone="red" dashed pts={[[66, 76], [66, 118]]} seed={s('al')} />
      <Cyl cx={66} top={122} rx={24} ry={6} h={30} tone="red" seed={s('aux')} label="aux redis" />
      <Cross x={66} y={140} size={22} seed={s('x')} />
      <Arrow tone="blue" pts={[[108, 46], [216, 46]]} seed={s('w0')} />
      {[0, 1, 2].map((i) => <Arrow key={i} tone="red" pts={[[108, 56 + i * 9], [216, 56 + i * 9]]} seed={s('w' + (i + 1))} />)}
      <Label x={162} y={104} size={13}>all 30 writes</Label>
      <Cyl cx={260} top={30} rx={40} ry={9} h={56} seed={s('main')} />
      {/* critic C-18: the ring is neutral ink; green stays for successful acks */}
      <Ring x={260} y={60} rx={60} ry={48} seed={s('ring')} />
      <Label kind="mono" x={260} y={126}>main redis</Label>
      <Label x={240} y={150} size={14}>back to the old load</Label>
      <Label kind="title" x={170} y={206}>aux down</Label>
    </g>
  );
}

/** critic C-18: the drift case drawn, not only said. aux takes the write, main's fails, so C is never counted. */
function OutOfSync({ id, phone }: { id: string; phone?: boolean }) {
  const s = (k: string) => `${id}-${k}`;
  const ix = phone ? 22 : 340, iy = phone ? 168 : 52; // the messages icon
  const tx = phone ? 86 : 396; // its labels (critic C-25: on phone, clear of the badge circle)
  return (
    <g>
      <Worker x={10} y={30} w={96} h={34} label="worker" seed={s('wk')} />
      <Arrow tone="green" pts={[[108, 44], [212, 44]]} seed={s('ok')} />
      <Label kind="mono" tone="green" x={160} y={36} size={13}>SET B_C ✓</Label>
      <Cyl cx={240} top={22} rx={26} ry={7} h={28} seed={s('aux')} label="aux redis" />
      <Arrow tone="red" pts={[[60, 66], [60, 130], [206, 130]]} seed={s('fail')} />
      <Cross x={140} y={130} size={16} seed={s('x')} />
      <Label kind="mono" tone="red" x={134} y={154} size={13}>SADD B C fails</Label>
      <Cyl cx={240} top={110} rx={30} ry={8} h={34} seed={s('main')} label="main redis" />
      <MsgIcon x={ix} y={iy} s={34} n={2} seed={s('icon')} />
      <Label anchor={phone ? 'start' : 'middle'} x={tx} y={phone ? 184 : 122} size={14}>badge shows 2</Label>
      <Label anchor={phone ? 'start' : 'middle'} tone="red" x={tx} y={phone ? 202 : 140} size={14}>while 300 messages wait</Label>
      <Label kind="title" x={phone ? 170 : 220} y={phone ? 240 : 206}>out of sync</Label>
      <Label muted x={phone ? 170 : 220} y={phone ? 260 : 226} size={14}>both reset at the next tap</Label>
    </g>
  );
}

export function WhichFailure({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig6d-p' : 'fig6d';
  const desc = 'Two failures. If the main Redis cluster goes down, the badge can’t be read and everything is down. If the auxiliary Redis goes down, the workers write every event straight to main, all 30 of them, which is the load main carried before the auxiliary existed; it stays up. If one store’s write succeeds and the other’s fails, they drift: the badge may show 2 while 300 messages wait, until the next tap clears both.';
  return (
    <Fig id={id} w={P ? 340 : 880} h={P ? 746 : 492} title="Which failure hurts" desc={desc}>
      <g transform={at(P ? 0 : 60, 0)}><MainDown id={id + '-a'} /></g>
      <g transform={at(P ? 0 : 480, P ? 230 : 0)}><AuxDown id={id + '-b'} /></g>
      <Line weight="thin" dotted className="faint" pts={P ? [[10, 222], [330, 222]] : [[440, 20], [440, 220]]} seed={id + '-sep1'} />
      <Line weight="thin" dotted className="faint" pts={P ? [[10, 452], [330, 452]] : [[20, 244], [860, 244]]} seed={id + '-sep2'} />
      <g transform={at(P ? 0 : 230, P ? 470 : 256)}><OutOfSync id={id + '-c'} phone={P} /></g>
    </Fig>
  );
}

// Lecture 05 (lec08), §6.5–6.8 Remote locks, part b.
// Fig 6·c Redis as the lock manager (D-09 redraw, frames b_022215, b_023554): wide 700 + phone 340.
// Fig 6·d Who deletes whose lock? (new StepThrough; static twin of clip l08-lock-ttl): lane 420 + phone 340.
// Fig 6·e Locks on three shards (new, small): 340, one layout.
// One-connection lock server (§6.7, new, small): 340, one layout.
// Consumers initiate: every arrow into Redis starts at a consumer; replies are short green arrows back.
import React from 'react';
import { Arrow, Box, Cross, Cyl, Fig, Label, Lifeline, Line, Mark, Num, Step, TimeAxis, Worker } from '../kit/Kit';
import { LockTag, QueueScene } from './s6a-remote-locks-parts';

/* ------------------------------------------------------------------ Fig 6·c */

export function RedisLockManager({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig6c-p' : 'fig6c';
  return (
    <Fig id={id} w={P ? 340 : 700} h={P ? 360 : 368} title="Redis as the lock manager"
      desc="Queue 7 above three consumers, and one Redis below them acting as the lock manager. Every consumer sends SET NX to Redis; Redis holds the entry queue7 : consumer 1 with an expiry of 300 seconds, so consumer 1 pops from the queue. Consumer 3 says: I’ll just delete the key.">
      <QueueScene layout={layout} mode="redis" id={id} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d */

const T6D = 'Who deletes whose lock?';
const D6D =
  'Swim lanes for consumer 1, Redis holding the key queue7, and consumer 2, time running down. 1: consumer 1 sets queue7 to c1 with NX and a 300-second expiry and gets OK. 2: consumer 1 keeps working past five minutes; Redis expires the key. 3: consumer 2 sets the key and gets OK; the key now holds c2. 4: consumer 1 finishes and sends DEL queue7, deleting consumer 2’s lock. 5: replay with an owner check: consumer 1 gets c1 back, the key expires right after, consumer 2 takes it, and consumer 1’s DEL still deletes c2. 6: the check and the delete run as one EVAL Lua script inside Redis; it returns 0 and c2’s lock survives.';

export function WhoDeletes({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig6d-p' : 'fig6d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 64 : 84, R = P ? 180 : 214, B = P ? 292 : 352;
  const T = P ? 14 : 13.5;
  const NX = P ? 40 : 58, NS = P ? 14 : 12.5;
  const mid = (a: number, b: number) => (a + b) / 2;
  const tag = (y: number, text: string, k: string, tone: 'ink' | 'red' | 'green' = 'ink') => (
    <Box x={R - 22} y={y} w={44} h={22} label={text} seed={s(k)} tone={tone} labelSize={P ? 14 : 13} />
  );
  return (
    <Fig id={id} w={W} h={690} title={T6D} desc={D6D}>
      <Box x={A - (P ? 46 : 44)} y={14} w={P ? 92 : 88} h={34} label="consumer 1" seed={s('ha')} labelSize={P ? 14 : 13} />
      <Box x={R - 34} y={14} w={68} h={34} label="redis" seed={s('hr')} labelSize={T} />
      <Box x={B - (P ? 46 : 44)} y={14} w={P ? 92 : 88} h={34} label="consumer 2" seed={s('hb')} labelSize={P ? 14 : 13} />
      <Label kind="mono" muted x={R} y={66} size={P ? 14 : 12.5}>key queue7</Label>
      <Lifeline x={A} y0={74} y1={680} seed={s('la')} />
      <Lifeline x={R} y0={74} y1={680} seed={s('lr')} />
      <Lifeline x={B} y0={74} y1={680} seed={s('lb')} />
      <TimeAxis x={P ? 8 : 10} y0={90} y1={676} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Label kind="mono" x={mid(A, R)} y={92} size={T}>SET NX EX 300</Label>
        <Arrow pts={[[A, 98], [R - 2, 106]]} seed={s('1a')} />
        {tag(110, 'c1', '1t')}
        <Arrow tone="green" pts={[[R, 136], [A + 2, 144]]} seed={s('1r')} />
        <Label kind="mono" tone="green" x={mid(A, R)} y={130} size={T}>OK</Label>
        <Line pts={[[R + 30, 112], [R + 36, 112], [R + 36, 206], [R + 30, 206]]} seed={s('ttl')} />
        <Label anchor="start" x={R + 42} y={162} size={T}>TTL 5 min</Label>
        <Num x={NX} y={104} n={1} size={NS} />
      </Step>
      <Step n={2}>
        <Line pts={[[A, 150], [A, 372]]} weight="heavy" seed={s('work')} />
        <Label anchor="start" x={A + 10} y={190} size={T}>still working</Label>
        <Label kind="mono" tone="red" x={R} y={226} size={T}>expired</Label>
        <Label kind="mono" muted x={R} y={244} size={P ? 14 : 12.5}>(no key)</Label>
        <Num x={NX} y={220} n={2} tone="red" size={NS} />
      </Step>
      <Step n={3}>
        <Label kind="mono" x={mid(R, B)} y={262} size={T}>SET NX</Label>
        <Arrow pts={[[B, 268], [R + 2, 276]]} seed={s('3a')} />
        {tag(280, 'c2', '3t')}
        <Arrow tone="green" pts={[[R, 306], [B - 2, 314]]} seed={s('3r')} />
        <Label kind="mono" tone="green" x={mid(R, B)} y={300} size={T}>OK</Label>
        <Num x={NX} y={286} n={3} size={NS} />
      </Step>
      <Step n={4}>
        <Label kind="mono" tone="blue" x={mid(A, R)} y={338} size={T}>DEL queue7</Label>
        <Arrow tone="blue" pts={[[A, 344], [R - 2, 352]]} seed={s('4a')} />
        {tag(356, 'c2', '4t', 'red')}
        <Cross x={R} y={367} size={18} seed={s('4x')} />
        <Label tone="red" x={mid(R, B)} y={398} size={T}>c2’s lock, gone</Label>
        <Num x={NX} y={350} n={4} tone="red" size={NS} />
      </Step>
      <Step n={5}>
        <Label muted anchor="start" x={P ? 20 : 24} y={430} size={T}>replay, with an owner check:</Label>
        <Label kind="mono" x={mid(A, R)} y={450} size={T}>GET</Label>
        <Arrow pts={[[A, 456], [R - 2, 462]]} seed={s('5a')} />
        <Arrow tone="green" pts={[[R, 470], [A + 2, 476]]} seed={s('5r')} />
        <Label kind="mono" tone="green" anchor="end" x={R - 8} y={490} size={T}>c1 ✓</Label>
        <Mark a={[R - 10, 500]} b={[R + 10, 500]} tone="red" weight="heavy" seed={s('5x')} />
        <Label tone="red" anchor="start" x={R + 16} y={505} size={T}>expires here</Label>
        <Arrow pts={[[B, 516], [R + 2, 522]]} seed={s('5b')} />
        {tag(526, 'c2', '5t')}
        <Arrow tone="red" pts={[[A, 556], [R - 2, 562]]} seed={s('5d')} />
        <Label kind="mono" tone="red" x={mid(A, R) - 10} y={552} size={T}>DEL</Label>
        <Label tone="red" anchor="start" x={R + 30} y={566} size={T}>c2 deleted</Label>
        <Num x={NX} y={470} n={5} tone="red" size={NS} />
      </Step>
      <Step n={6}>
        <Arrow pts={[[A, 600], [R - (P ? 82 : 86), 606]]} seed={s('6a')} />
        <Label kind="mono" anchor="start" x={A + 6} y={594} size={T}>EVAL</Label>
        <Box x={R - (P ? 80 : 84)} y={588} w={P ? 160 : 168} h={46} seed={s('6b')} />
        <Label kind="mono" x={R} y={607} size={P ? 14 : 13}>Lua: if get == me</Label>
        <Label kind="mono" x={R} y={625} size={P ? 14 : 13}>then del</Label>
        <Arrow tone="green" pts={[[R - (P ? 80 : 84), 628], [A + 2, 636]]} seed={s('6r')} />
        <Label kind="mono" tone="green" x={mid(A, R) - 20} y={652} size={T}>0</Label>
        {tag(648, 'c2', '6t', 'green')}
        <Label tone="green" anchor="start" x={R + 30} y={664} size={T}>c2 survives</Label>
        <Num x={NX} y={612} n={6} tone="green" size={NS} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ §6.7 one-connection lock server */

export function OneConnectionLock() {
  const s = (k: string) => `f6k-${k}`;
  const CX = [8, 118, 228], cw = 104, ch = 46, cy = 20;
  const mid = CX.map((x) => x + (cw - 16) / 2);
  return (
    <Fig id="fig6k" w={340} h={270} title="A lock server that accepts one connection"
      desc="Three consumers above one TCP lock server that serves only one connection at a time. Consumer 1 has connected, solid green, and the server has written “granted” to its connection: that is the lock. Consumers 2 and 3 connect too, dashed; their connections are open but have received nothing, and they wait in the server’s backlog until consumer 1’s connection closes.">
      {CX.map((x, i) => (
        <g key={i}>
          <Worker x={x} y={cy} w={cw} h={ch} label="" seed={s(`c${i}`)} />
          <Label kind="mono" x={mid[i]} y={cy + 19} size={14}>consumer</Label>
          <Label kind="mono" x={mid[i]} y={cy + 37} size={14}>{String(i + 1)}</Label>
        </g>
      ))}
      <Arrow tone="green" pts={[[mid[0], cy + ch], [mid[0], 190], [94, 190]]} seed={s('hold')} />
      <Label tone="green" anchor="start" x={mid[0] + 8} y={112} size={14}>got</Label>
      <Label tone="green" anchor="start" x={mid[0] + 8} y={130} size={14}>“granted”</Label>
      {[1, 2].map((i) => (
        <g key={i}>
          <Arrow dashed pts={[[mid[i], cy + ch], [mid[i], 166]]} seed={s(`try${i}`)} />
        </g>
      ))}
      <Box x={96} y={168} w={200} h={46} label="lock server" seed={s('srv')} />
      <Label x={196} y={236} size={14}>serves one connection at a time</Label>
      <Label muted x={196} y={258} size={14}>the others wait in its backlog</Label>
    </Fig>
  );
}

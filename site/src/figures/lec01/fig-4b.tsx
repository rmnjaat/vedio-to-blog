// Lecture 01, §4.2 — Fig 4·b "Two claps, one lost" (StepThrough). Lanes: reader A's request, the stories row,
// reader B's request; time runs down. Ledger: L-0219, L-0230.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Lifeline, Line, Num, Step, TimeAxis } from '../kit/Kit';

export function LostUpdate({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig4b-p' : 'fig4b';
  const W = P ? 340 : 420;
  const A = P ? 82 : 92, R = P ? 192 : 236, B = P ? 298 : 370; // lanes: reader A, row, reader B
  const NX = P ? 42 : 44; // step numerals, on the time axis (phone: clear of the rotated "time" label)
  const T = 14; // label size: ~14px at display on both layouts (drawn ~1:1)
  const NS = 14;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={W} h={588} title="Two claps, one lost"
      desc="Swim lanes for reader A's request, the stories row holding claps, and reader B's request; time runs down. 1: A reads claps = 100. 2: B reads claps = 100 too, because A has not written yet. 3: A adds one and writes 101. 4: B adds one to the 100 it read and also writes 101, so one clap is gone: the row says 101 instead of 102. 5: the same race between two threads running count++ 1,000 times each ends near 1,997 instead of 2,000.">
      <Actor x={A} y={22} s={0.9} seed={s('a')} />
      <Cyl cx={R} top={26} rx={22} ry={6} h={30} seed={s('row')} />
      <Actor x={B} y={22} s={0.9} seed={s('b')} />
      <Label x={A} y={88} size={T}>reader A’s</Label>
      <Label x={A} y={104} size={T}>request</Label>
      <Label x={R} y={88} size={T}>stories row</Label>
      <Label kind="mono" muted x={R} y={104} size={T}>claps</Label>
      <Label x={B} y={88} size={T}>reader B’s</Label>
      <Label x={B} y={104} size={T}>request</Label>
      <Lifeline x={A} y0={116} y1={480} seed={s('l1')} />
      <Lifeline x={R} y0={116} y1={480} seed={s('l2')} />
      <Lifeline x={B} y0={116} y1={480} seed={s('l3')} />
      <TimeAxis x={P ? 10 : 16} y0={124} y1={478} seed={s('t')} size={14} />
      <Box x={R - 24} y={122} w={48} h={24} label="100" seed={s('v0')} labelSize={T} />

      <Step n={1}>
        <Arrow tone="blue" pts={[[A, 160], [R - 2, 176]]} seed={s('1a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={156} size={T}>read</Label>
        <Arrow tone="blue" pts={[[R, 186], [A + 2, 202]]} seed={s('1b')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 10} y={220} size={T}>100</Label>
        <Num x={NX} y={160} n={1} tone="blue" size={NS} />
      </Step>
      <Step n={2}>
        <Arrow tone="blue" pts={[[B, 236], [R + 2, 252]]} seed={s('2a')} />
        <Label kind="mono" tone="blue" anchor="end" x={B - 8} y={232} size={T}>read</Label>
        <Arrow tone="blue" pts={[[R, 262], [B - 2, 278]]} seed={s('2b')} />
        <Label kind="mono" tone="blue" anchor="end" x={B - 10} y={296} size={T}>100</Label>
        <Num x={NX} y={236} n={2} tone="blue" size={NS} />
      </Step>
      <Step n={3}>
        <Arrow tone="green" pts={[[A, 318], [R - 2, 334]]} seed={s('3a')} />
        <Label kind="mono" tone="green" anchor="start" x={A + 8} y={314} size={T}>write 101</Label>
        <Box x={R - 24} y={336} w={48} h={24} label="101" tone="green" seed={s('v1')} labelSize={T} />
        <Num x={NX} y={318} n={3} tone="green" size={NS} />
      </Step>
      <Step n={4}>
        <Arrow tone="red" pts={[[B, 380], [R + 2, 396]]} seed={s('4a')} />
        <Label kind="mono" tone="red" anchor="end" x={B - 8} y={376} size={T}>write 101</Label>
        <Box x={R - 24} y={398} w={48} h={24} label="101" tone="red" seed={s('v2')} labelSize={T} />
        <Label tone="red" x={R} y={444} size={T}>one clap lost</Label>
        <Label muted x={R} y={462} size={T}>should be 102</Label>
        <Num x={NX} y={380} n={4} tone="red" size={NS} />
      </Step>
      <Step n={5}>
        <Line dotted pts={[[P ? 22 : 28, 500], [W - 12, 500]]} seed={s('sep')} />
        <Num x={NX} y={528} n={5} size={NS} />
        <Label kind="mono" anchor="start" x={NX + 18} y={533} size={T}>2 threads × 1,000 count++</Label>
        <Label muted anchor="start" x={NX + 18} y={562} size={T}>expected 2,000</Label>
        <Label tone="red" anchor="start" x={NX + 140} y={562} size={T}>got about 1,997</Label>
      </Step>
    </Fig>
  );
}

/* ---------------------------------------------------------------- Clip 4·1 poster (l01-count-race, end state)
   Used only while the clip is storyboarded but not registered (AnimationClip's pending form). */

function RacePanel({ ox, oy, atomic, T }: { ox: number; oy: number; atomic?: boolean; T: number }) {
  const k = atomic ? 'at' : 'pp';
  const tone = (atomic ? 'green' : 'red') as 'green' | 'red';
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <Box x={0} y={30} w={120} h={40} label="T1 ×1,000" seed={`cr-${k}-t1`} labelSize={T} />
      <Box x={0} y={100} w={120} h={40} label="T2 ×1,000" seed={`cr-${k}-t2`} labelSize={T} />
      <Arrow tone="blue" pts={[[122, 50], [150, 50], [150, 74], [176, 74]]} seed={`cr-${k}-a1`} />
      <Arrow tone="blue" pts={[[122, 120], [150, 120], [150, 96], [176, 96]]} seed={`cr-${k}-a2`} />
      <Box x={178} y={50} w={150} h={70} tone={tone} seed={`cr-${k}-c`} />
      <Label kind="mono" tone={tone} x={253} y={95} size={T + 12}>{atomic ? '2,000' : '≈ 1,997'}</Label>
      <Label muted x={253} y={146} size={T}>{atomic ? 'every +1 counts' : 'expected 2,000'}</Label>
      <Label kind="title" x={164} y={196} size={T + 1}>{atomic ? 'atomic +1' : 'count++: read, add, write'}</Label>
    </g>
  );
}

export function CountRacePoster({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Clip poster: a thousand increments, three lost';
  const desc = 'End state of the clip. Left: two threads each run count++ 1,000 times on one counter, which ends at about 1,997 instead of 2,000, in red. Right: the same two threads with an atomic +1 end at 2,000, in green. Below: on Medium, 100 plus 2 claps must be 102.';
  if (layout === 'phone')
    return (
      <Fig id="countrace-p" w={340} h={500} title={title} desc={desc}>
        <RacePanel ox={6} oy={0} T={14} />
        <Line dotted pts={[[20, 226], [320, 226]]} seed="cr-p-sep" />
        <RacePanel ox={6} oy={232} atomic T={14} />
        <Label kind="mono" x={170} y={484} size={16}>100 + 2 claps = 102</Label>
      </Fig>
    );
  return (
    <Fig id="countrace" w={880} h={330} title={title} desc={desc}>
      <RacePanel ox={40} oy={20} T={16} />
      <Line dotted pts={[[440, 50], [440, 230]]} seed="cr-sep" />
      <RacePanel ox={500} oy={20} atomic T={16} />
      <Label kind="mono" x={440} y={300} size={20}>Medium: 100 + 2 claps = 102</Label>
    </Fig>
  );
}

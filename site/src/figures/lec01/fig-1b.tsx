// Fig 1·b: Two servers, two copies (new step-through). Swim lanes, time running down:
// reader · api A · api B · db. Desk 420 wide (the stepper's drawing column), phone 340 wide (labels ≥ 12px at 360px).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Lifeline, Num, Step, TimeAxis } from '../kit/Kit';
import { CacheDot, Ring, Tick } from './s1-parts';

export function TwoCopies({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f1b-p' : 'f1b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const R = P ? 58 : 82, A = P ? 148 : 182, B = P ? 236 : 282, D = P ? 312 : 380; // lanes
  const NX = P ? 38 : 46; // step numerals (phone: clear of the rotated "time" label)
  const T = 14; // label size
  const NS = 14;
  const BW = P ? 52 : 60; // api box width
  const api = (x: number, name: string, k: string) => (
    <g>
      <Box x={x - BW / 2} y={20} w={BW} h={30} label="api" seed={s(k)} labelSize={T} />
      <CacheDot x={x + BW / 2 - 8} y={28} r={4} empty seed={s(k + 'd')} />
      <Label kind="mono" x={x} y={70} size={T}>{name}</Label>
    </g>
  );
  /** a cache entry on a lane: dot + version */
  const entry = (x: number, y: number, v: string, k: string, tone: 'ink' | 'red' = 'ink', side: 'l' | 'r' = 'r') => (
    <g>
      <CacheDot x={x} y={y} r={5} seed={s(k)} tone={tone} />
      <Label kind="mono" tone={tone} anchor={side === 'r' ? 'start' : 'end'} x={side === 'r' ? x + 10 : x - 10} y={y + 5} size={T}>{v}</Label>
    </g>
  );
  return (
    <Fig id={id} w={W} h={P ? 640 : 610} title="Two servers, two copies"
      desc="Swim lanes for the reader, API server A, API server B and the database, time running down. 1: a request for story 42 reaches A, misses A's empty local cache, reads the database and fills A's cache with v1. 2: the next request lands on B, which never saw A's copy; it misses, reads the database and fills its own cache with v1. 3: the story is edited; the database now holds v2 while both caches still hold v1. 4: B's entry expires (TTL) and B refetches v2; A still serves v1, a stale read, so two readers get two answers. 5: fine for a published story, not for a clap count.">
      <Actor x={R} y={20} s={P ? 0.72 : 0.8} seed={s('reader')} />
      <Label x={R} y={70} size={T}>reader</Label>
      {api(A, 'A', 'apiA')}
      {api(B, 'B', 'apiB')}
      <Cyl cx={D} top={22} rx={18} ry={5} h={26} seed={s('db')} />
      <Label kind="mono" x={D} y={70} size={T}>db</Label>
      <Lifeline x={R} y0={82} y1={598} seed={s('l0')} />
      <Lifeline x={A} y0={82} y1={598} seed={s('l1')} />
      <Lifeline x={B} y0={82} y1={598} seed={s('l2')} />
      <Lifeline x={D} y0={82} y1={598} seed={s('l3')} />
      <TimeAxis x={P ? 8 : 16} y0={94} y1={596} seed={s('t')} size={14} />

      <Step n={1}>
        <Num x={NX} y={112} n={1} tone="blue" size={NS} />
        <Label kind="mono" tone="blue" anchor="start" x={R + 6} y={104} size={T}>GET story 42</Label>
        <Arrow tone="blue" pts={[[R, 112], [A - 2, 128]]} seed={s('1a')} />
        <Label anchor="end" x={A - 8} y={148} size={T}>miss</Label>
        <Arrow tone="blue" pts={[[A, 140], [D - 2, 158]]} seed={s('1b')} />
        <Arrow pts={[[D, 166], [A + 2, 184]]} seed={s('1c')} />
        <Label kind="mono" anchor="start" x={B + 8} y={190} size={T}>v1</Label>
        {entry(A, 198, 'v1', '1d', 'ink', 'l')}
        <Tick x={A + 16} y={204} seed={s('1t')} />
      </Step>
      <Step n={2}>
        <Num x={NX} y={236} n={2} tone="blue" size={NS} />
        <Label kind="mono" tone="blue" anchor="start" x={R + 6} y={228} size={T}>GET story 42</Label>
        <Arrow tone="blue" pts={[[R, 236], [B - 2, 256]]} seed={s('2a')} />
        <Label anchor="end" x={B - 8} y={278} size={T}>miss</Label>
        <Arrow tone="blue" pts={[[B, 268], [D - 2, 282]]} seed={s('2b')} />
        <Arrow pts={[[D, 290], [B + 2, 304]]} seed={s('2c')} />
        {entry(B, 318, 'v1', '2d', 'ink', 'l')}
        <Tick x={B + 16} y={324} seed={s('2t')} />
      </Step>
      <Step n={3}>
        <Num x={NX} y={360} n={3} size={NS} />
        <Label anchor="start" x={R + 6} y={352} size={T}>writer edits story 42</Label>
        <Arrow pts={[[R, 360], [D - 2, 382]]} seed={s('3a')} />
        {entry(D, 396, 'v2', '3d', 'ink', 'l')}
        <Label muted anchor="middle" x={(A + B) / 2} y={424} size={T}>both caches still v1</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={456} n={4} size={NS} />
        <Label anchor="end" x={B - 10} y={460} size={T}>ttl runs out</Label>
        <CacheDot x={B} y={456} r={5} empty seed={s('4e')} />
        <Arrow tone="blue" pts={[[B, 468], [D - 2, 482]]} seed={s('4b')} />
        <Arrow pts={[[D, 490], [B + 2, 504]]} seed={s('4c')} />
        {entry(B, 518, 'v2', '4d', 'ink', 'r')}
        <Tick x={B - 14} y={524} seed={s('4t')} />
        {entry(A, 518, 'v1', '4a', 'red', 'l')}
        <Ring x={A} y={518} r={11} tone="red" seed={s('4r')} />
        <Label tone="red" anchor="start" x={A + 14} y={523} size={T}>stale</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={572} n={5} tone="green" size={NS} />
        {P ? (
          <g>
            <Label anchor="start" x={R - 6} y={576} size={T}>fine for a published story,</Label>
            <Label tone="red" anchor="start" x={R - 6} y={594} size={T}>not for a clap count</Label>
          </g>
        ) : (
          <g>
            <Label anchor="start" x={R - 14} y={577} size={T}>fine for a published story ·</Label>
            <Label tone="red" anchor="start" x={R + 190} y={577} size={T}>not for a clap count</Label>
          </g>
        )}
      </Step>
    </Fig>
  );
}

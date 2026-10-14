// Fig 3·e "Lazy deletion and sampling" (new step-through; figures.md §3). Time runs down. Lanes: client · cache
// (keys with a TTL; a red clock = expired) · the active cycle. 1 a read finds k7 expired and frees it (zfree lowers
// total_size); 2 most keys go that way; 3 some expired keys are never read: a leak; 4 the cycle samples keys with a
// TTL and frees the expired ones; 5 it samples again while more than a quarter were expired, and stops; 6 the
// leftover waits for a later read or sample. Four squares stand in for the 20 sampled keys.
// Desk 420 wide (the stepper's drawing column), phone 340.
import React from 'react';
import { Arrow, Box, Client, Label, Num, Step, TimeAxis, Worker } from '../kit/Kit';
import { Fig } from './floor';
import { KeySq, SpanBracket } from './s3-eviction-and-expiry-parts';

const TITLE = 'Lazy deletion and sampling';
const DESC = 'Time runs down. 1: a client reads k7; its expires_at has passed, so the cache deletes it on the spot with zfree, which also lowers total_size. 2: most expired keys go this way, at the cost of one free. 3: some expired keys (k1, k3, k9) are never read again, so their memory leaks. 4: the active cycle samples keys that have a TTL (20 in Redis; four drawn here), finds k1 and k3 expired and frees them. 5: two of four were expired, more than a quarter, so it samples again; k5 to k8 holds none, so it stops (Redis today keeps going above about 10%). 6: k9 is still there: the leak is temporary, because a later read or a later sample frees it.';

const KEYS = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'];

export function LazyAndSampling({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f3e-p' : 'f3e';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const NX = P ? 30 : 36;
  const CL = P ? 62 : 70; // client lane (step text starts at CL - 12, clear of the numerals)
  const CY = P ? 286 : 370; // cycle lane
  const X0 = P ? 58 : 118; // first key of the strip
  const DX = 27; // key pitch
  const kx = (i: number) => X0 + i * DX;
  const strip = (y: number, k: string, freed: number[], expired: number[], gone: number[] = [6]) => (
    <g>
      {KEYS.map((name, i) => (
        <KeySq key={name} x={kx(i)} y={y} label={name} seed={s(`${k}-${name}`)}
          freed={freed.includes(i) || gone.includes(i)} expired={expired.includes(i)} />
      ))}
    </g>
  );
  const sample = (y: number, i0: number, i1: number, k: string) => (
    <g>
      <SpanBracket x0={kx(i0) - 2} x1={kx(i1) + 26} y={y} seed={s(k + '-br')} tone="blue" />
      <Arrow tone="blue" pts={[[CY + 18, y + 4], [CY + 18, y - 14], [(kx(i0) + kx(i1) + 24) / 2, y - 14], [(kx(i0) + kx(i1) + 24) / 2, y - 2]]} seed={s(k + '-ar')} />
    </g>
  );
  const KY = P ? 150 : 206; // key square in step 1
  return (
    <Fig id={id} w={W} h={560} title={TITLE} desc={DESC}>
      {/* lane heads */}
      <Client x={CL - 22} y={18} seed={s('client')} />
      <Label x={CL} y={70} size={14}>client</Label>
      <Box x={P ? 128 : 176} y={20} w={P ? 92 : 108} h={32} label="cache" seed={s('cache')} />
      <Label muted x={P ? 174 : 230} y={70} size={14}>keys with a TTL</Label>
      <Worker x={CY - 34} y={20} w={P ? 76 : 78} h={32} label="cycle" seed={s('cycle')} />
      <TimeAxis x={P ? 8 : 12} y0={22} y1={548} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={110} n={1} tone="blue" size={14} />
        <Label kind="mono" tone="blue" anchor="start" x={CL - 12} y={106} size={14}>GET k7</Label>
        <Arrow tone="blue" pts={[[CL - 12, 118], [KY - 3, 118]]} seed={s('1a')} />
        <KeySq x={KY} y={107} label="k7" expired seed={s('1k')} />
        <Label tone="red" anchor="start" x={CL - 12} y={142} size={13}>expires_at passed</Label>
        <Label kind="mono" anchor="start" x={KY + 34} y={116} size={13}>zfree(k7)</Label>
        <Label kind="mono" tone="green" anchor="start" x={KY + 34} y={136} size={13}>total_size −= b</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={176} n={2} size={14} />
        <Label anchor="start" x={CL - 12} y={181} size={14}>most expired keys go like k7: one free()</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={222} n={3} size={14} />
        {strip(212, 's3', [], [0, 2, 8])}
        <Label tone="red" anchor="start" x={X0} y={254} size={13}>never read again: memory leaks</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={300} n={4} size={14} />
        {sample(290, 0, 3, 's4')}
        {strip(298, 's4', [0, 2], [8])}
        <Label tone="blue" anchor="start" x={X0} y={340} size={13}>sample keys with a TTL, free the expired</Label>
        <Label anchor="start" x={X0} y={358} size={13}>2 of 4 were expired: over a quarter</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={402} n={5} size={14} />
        {sample(392, 4, 7, 's5')}
        {strip(400, 's5', [0, 2], [8])}
        <Label tone="blue" anchor="start" x={X0} y={442} size={13}>so sample again</Label>
        <Label tone="green" anchor="start" x={X0} y={460} size={13}>0 of 4 expired: stop</Label>
      </Step>
      <Step n={6}>
        <Num x={NX} y={496} n={6} tone="green" size={14} />
        {strip(486, 's6', [0, 2], [8])}
        <Label anchor="start" x={X0} y={528} size={13}>k9 waits for a later read or sample:</Label>
        <Label tone="green" anchor="start" x={X0} y={546} size={13}>the leak is temporary</Label>
      </Step>
    </Fig>
  );
}

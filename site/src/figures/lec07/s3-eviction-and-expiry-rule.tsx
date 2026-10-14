// RuleBox sketch §3: two tiny access curves side by side (a spike that decays; a line that keeps coming back),
// hand "read the key's life first". Desk 480 wide (class "bottomup" caps it at 480px), phone 320.
import React from 'react';
import { Label, type Pt } from '../kit/Kit';
import { Fig } from './floor';
import { Axes, Curve } from './s3-eviction-and-expiry-parts';

const DESC = 'Two small sketches of reads over time for one key. Left: a spike that decays, a key hit hard and then forgotten, which suits LRU. Right: a line that dips and keeps coming back, a key whose past popularity predicts its future, which suits LFU. Read the key’s life first, then pick the policy.';

export function KeyLife({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule3-p' : 'rule3';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const pw = P ? 130 : 170; // panel width
  const g = P ? 30 : 60; // gap
  const x1 = P ? 14 : 40, x2 = x1 + pw + g, Y = 92;
  const at = (x0: number, pts: [number, number][]): Pt[] => pts.map(([x, y]) => [x0 + x * pw, Y - y]);
  return (
    <Fig id={id} w={W} h={150} title="Read the key’s life first" desc={DESC} className="bottomup">
      <Axes x={x1} y={Y} w={pw} h={74} seed={s('a1')} />
      <Curve pts={at(x1, [[0.04, 3], [0.1, 68], [0.17, 46], [0.28, 24], [0.45, 12], [0.7, 7], [0.98, 5]])} seed={s('c1')} />
      <Label kind="mono" x={x1 + pw / 2} y={Y + 22}>lru</Label>
      <Axes x={x2} y={Y} w={pw} h={74} seed={s('a2')} />
      <Curve pts={at(x2, [[0.03, 14], [0.15, 36], [0.27, 24], [0.4, 48], [0.52, 34], [0.66, 56], [0.78, 40], [0.92, 60], [0.98, 52]])} seed={s('c2')} />
      <Label kind="mono" x={x2 + pw / 2} y={Y + 22}>lfu</Label>
      <Label x={W / 2} y={Y + 48} size={15}>read the key’s life first</Label>
    </Fig>
  );
}

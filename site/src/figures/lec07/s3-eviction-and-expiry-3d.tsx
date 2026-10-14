// Fig 3·d "Expiry: the queue we don't build" (D-12 redraw, frame b_013545, + struct stage 3). Left: a priority queue
// of keys ordered by absolute expiry time, freed at the head; crossed out because it costs pointers per key.
// Right: MyValue gains one row, expires_at. Desk 720 wide, phone 340 (stacked).
import React from 'react';
import { Arrow, Cross, Label } from '../kit/Kit';
import { Fig } from './floor';
import { Struct } from './s3-eviction-and-expiry-parts';

const TITLE = 'Expiry: the queue we don’t build';
const DESC = 'Left, rejected: a priority queue holding every key with a TTL, ordered by absolute expiry time (k2:100, k7:101, k9:105, k3:110), freed at the head. It is simple and consistent, but it is an extra data structure with pointers for every key. Right, what we do: store the absolute expiry time as one more field, expires_at, in the per-key MyValue wrapper next to the type and the LRU bits. One number, no extra structure.';

const ROWS = [
  { text: 'void *value;', ghost: true },
  { text: 'int type : 4;', ghost: true },
  { text: 'lru_bits : 28;', ghost: true },
  { text: 'expires_at;', mark: true },
];

function Rejected({ ox, oy, s }: { ox: number; oy: number; s: (k: string) => string }) {
  return (
    <g>
      <Label anchor="start" x={ox} y={oy + 20}>priority queue</Label>
      <Cross x={ox + 150} y={oy + 14} size={22} seed={s('x')} />
      <Label tone="red" anchor="start" x={ox + 172} y={oy + 20}>pointers per key</Label>
      <Label kind="mono" anchor="start" x={ox} y={oy + 64}>k2:100 , k7:101 , k9:105 , k3:110</Label>
      <Arrow pts={[[ox + 26, oy + 104], [ox + 26, oy + 74]]} seed={s('abs')} />
      <Label anchor="start" x={ox} y={oy + 122}>absolute expiry</Label>
      <Label anchor="start" x={ox + 160} y={oy + 98}>ordered by expiry →</Label>
      <Label anchor="start" muted x={ox} y={oy + 146}>free happens at the head</Label>
      <Label kind="title" anchor="start" x={ox} y={oy + 190}>rejected</Label>
    </g>
  );
}

export function ExpiryQueue({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f3d-p-${k}`;
    return (
      <Fig id="f3d-p" w={340} h={460} title={TITLE} desc={DESC}>
        <Rejected ox={14} oy={6} s={s} />
        <Struct x={14} y={226} w={210} name="MyValue" rows={ROWS} seed={s('st')} />
        <Label anchor="start" x={14} y={392}>one number, no extra structure</Label>
        <Label kind="title" anchor="start" x={14} y={428}>what we do</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3d-${k}`;
  return (
    <Fig id="f3d" w={720} h={230} title={TITLE} desc={DESC}>
      <Rejected ox={20} oy={10} s={s} />
      <Struct x={440} y={14} w={220} name="MyValue" rows={ROWS} seed={s('st')} />
      <Label anchor="start" x={440} y={178}>one number, no extra structure</Label>
      <Label kind="title" anchor="start" x={440} y={210}>what we do</Label>
    </Fig>
  );
}

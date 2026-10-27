// Fig 3·a "The struct that grows, stage 2" (new; figures.md §3). The MyValue wrapper from §2 gains an lru_bits row;
// two 32-bit words underneath: the class's 4 type + 28 lru, and current Redis's 4 type + 4 encoding + 24 lru
// (A-DCL-01). Desk 660 wide, phone 340 (stacked).
import React from 'react';
import { Arrow, Label } from '../kit/Kit';
import { Fig } from './floor';
import { BitBar, Struct } from './s3-eviction-and-expiry-parts';

const TITLE = 'The struct that grows, stage 2';
const DESC = 'The per-key wrapper MyValue holds a value pointer and a 4-bit type, and now also a 24-bit lru field. Under LRU the field holds the time of the last access; under LFU a small access counter; either way it is updated on every access. Underneath, Redis packs 4 type bits, 4 encoding bits and the 24-bit LRU/LFU field into one 32-bit word of each object header.';

const ROWS = [
  { text: 'void *value;', ghost: true },
  { text: 'unsigned type : 4;', ghost: true },
  { text: 'lru : 24;', mark: true },
];

export function StructStage2({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f3a-p-${k}`;
    return (
      <Fig id="f3a-p" w={340} h={334} title={TITLE} desc={DESC}>
        <Struct x={20} y={14} w={200} name="MyValue" rows={ROWS} seed={s('st')} />
        <Label anchor="start" x={20} y={150}>LRU: a timestamp</Label>
        <Label anchor="start" x={20} y={170}>LFU: a counter</Label>
        <Label anchor="start" muted x={20} y={190}>updated on every access</Label>
        <Label anchor="start" x={226} y={103}>← new</Label>

        <Label kind="mono" anchor="start" x={18} y={238} size={13}>redis: 4 type + 4 enc + 24 lru</Label>
        <BitBar x={18} y={248} unit={9.5} seed={s('b2')} fields={[{ bits: 4, label: '4' }, { bits: 4, label: '4' }, { bits: 24, label: 'lru 24' }]} />
        <Label muted anchor="start" x={18} y={316} size={13}>one 32-bit word of metadata per key</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3a-${k}`;
  return (
    <Fig id="f3a" w={660} h={250} title={TITLE} desc={DESC}>
      <Struct x={20} y={20} w={210} name="MyValue" rows={ROWS} seed={s('st')} />
      <Label anchor="start" x={20} y={172}>LRU: a timestamp · LFU: a counter</Label>
      <Label anchor="start" muted x={20} y={194}>updated on every access</Label>

      <Label kind="mono" anchor="start" x={310} y={76}>redis: 4 type + 4 encoding + 24 lru</Label>
      <BitBar x={310} y={88} unit={10} seed={s('b2')} fields={[{ bits: 4, label: '4' }, { bits: 4, label: '4' }, { bits: 24, label: 'lru 24' }]} />
      <Arrow pts={[[222, 104], [306, 104]]} seed={s('lead')} />
      <Label muted anchor="start" x={310} y={160}>one 32-bit word of metadata per key</Label>
    </Fig>
  );
}

// Fig 3·a "The struct that grows, stage 2" (new; figures.md §3). The MyValue wrapper from §2 gains an lru_bits row;
// two 32-bit words underneath: the class's 4 type + 28 lru, and current Redis's 4 type + 4 encoding + 24 lru
// (A-DCL-01). Desk 660 wide, phone 340 (stacked).
import React from 'react';
import { Arrow, Label } from '../kit/Kit';
import { Fig } from './floor';
import { BitBar, Struct } from './s3-eviction-and-expiry-parts';

const TITLE = 'The struct that grows, stage 2';
const DESC = 'The per-key wrapper MyValue holds a value pointer and a 4-bit type, and now also lru_bits. Under LRU the field holds a timestamp of the last access; under LFU a counter; either way it is updated on every access. As taught, 4 type bits plus 28 LRU bits make one 32-bit integer. Current Redis packs 4 type bits, 4 encoding bits and a 24-bit LRU/LFU field into one 32-bit word of the object header.';

const ROWS = [
  { text: 'void *value;', ghost: true },
  { text: 'int type : 4;', ghost: true },
  { text: 'lru_bits : 28;', mark: true },
];

export function StructStage2({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f3a-p-${k}`;
    return (
      <Fig id="f3a-p" w={340} h={430} title={TITLE} desc={DESC}>
        <Struct x={20} y={14} w={200} name="MyValue" rows={ROWS} seed={s('st')} />
        <Label anchor="start" x={20} y={150}>LRU: a timestamp</Label>
        <Label anchor="start" x={20} y={170}>LFU: a counter</Label>
        <Label anchor="start" muted x={20} y={190}>updated on every access</Label>
        <Label anchor="start" x={226} y={103}>← new</Label>

        <Label kind="mono" anchor="start" x={18} y={238} size={13}>class: 4 type + 28 lru = 32</Label>
        <BitBar x={18} y={248} unit={9.5} seed={s('b1')} fields={[{ bits: 4, label: '4' }, { bits: 28, label: 'lru 28' }]} />
        <Label kind="mono" anchor="start" x={18} y={318} size={13}>redis: 4 type + 4 enc + 24 lru</Label>
        <BitBar x={18} y={328} unit={9.5} seed={s('b2')} fields={[{ bits: 4, label: '4' }, { bits: 4, label: '4' }, { bits: 24, label: 'lru 24' }]} />
        <Label muted anchor="start" x={18} y={396} size={13}>one 32-bit word of metadata per key</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3a-${k}`;
  return (
    <Fig id="f3a" w={660} h={250} title={TITLE} desc={DESC}>
      <Struct x={20} y={20} w={210} name="MyValue" rows={ROWS} seed={s('st')} />
      <Label anchor="start" x={20} y={172}>LRU: a timestamp · LFU: a counter</Label>
      <Label anchor="start" muted x={20} y={194}>updated on every access</Label>

      <Label kind="mono" anchor="start" x={310} y={44}>class: 4 type + 28 lru = 32</Label>
      <BitBar x={310} y={56} unit={10} seed={s('b1')} fields={[{ bits: 4, label: '4' }, { bits: 28, label: 'lru_bits 28' }]} />
      <Label kind="mono" anchor="start" x={310} y={136}>redis: 4 type + 4 encoding + 24 lru</Label>
      <BitBar x={310} y={148} unit={10} seed={s('b2')} fields={[{ bits: 4, label: '4' }, { bits: 4, label: '4' }, { bits: 24, label: 'lru 24' }]} />
      <Arrow pts={[[222, 104], [290, 104], [290, 70], [306, 70]]} seed={s('lead')} />
      <Label muted anchor="start" x={310} y={218}>one 32-bit word of metadata per key</Label>
    </Fig>
  );
}

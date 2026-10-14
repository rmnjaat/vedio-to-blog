// Lecture 10 (lec10), chapter 11 (recap): Fig 11·a (new: the two engines side by side, with the ideas they share
// marked a, b, c in both panels, matching the rows of the "Same idea, twice" table).
// Spec: lectures/lec10/lesson/figures.md §11. Parts: ./s8-files-that-grow-parts.
import React from 'react';
import { Arrow, Box, Cloud, Fleet, Label, Num } from '../kit/Kit';
import { poly } from '../kit/hand';
import { Fig, MemMap, RecordBar, StripeFile, type Layout } from './s8-files-that-grow-parts';

function Marker({ x, y, n, text, anchor = 'start' }: { x: number; y: number; n: string; text: string; anchor?: 'start' | 'end' }) {
  return (
    <g>
      <Num x={x} y={y} n={n} />
      <Label kind="mono" anchor={anchor} x={anchor === 'start' ? x + 14 : x - 14} y={y + 5}>{text}</Label>
    </g>
  );
}

function MetaFile({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  const c = 10;
  return (
    <g>
      <path className="ink shape" d={poly([[x, y], [x + w - c, y], [x + w, y + c], [x + w, y + h], [x, y + h]], seed, true)} />
      <path className="ink thin" d={poly([[x + w - c, y], [x + w - c, y + c], [x + w, y + c]], seed + '-ear')} />
      <Label kind="mono" x={x + w / 2} y={y + h + 18}>meta.json</Label>
    </g>
  );
}

/** Engine 1: the dictionary on S3 (local panel, 340 wide). */
function Dictionary({ s }: { s: (k: string) => string }) {
  return (
    <g>
      <Fleet x={10} y={40} w={78} h={40} n={3} label="api" seed={s('api')} />
      <Box x={14} y={118} w={70} h={30} label="w → o" labelSize={13} seed={s('wo')} />
      <Marker x={100} y={133} n="a" text="map" />
      <Cloud cx={240} cy={70} w={170} h={100} label="s3" seed={s('s3')} />
      <Arrow tone="blue" pts={[[90, 70], [153, 70]]} seed={s('get')} />
      <RecordBar x={170} y={136} cells={[{ label: 'H', w: 26 }, { label: 'I', w: 44 }, { label: 'D', w: 90 }]} h={28} seed={s('bar')} />
      <Marker x={183} y={184} n="b" text="sizes" />
      <MetaFile x={262} y={200} w={68} h={30} seed={s('meta')} />
      <Box x={10} y={200} w={112} h={40} label="update job" seed={s('job')} />
      <Arrow dashed pts={[[122, 220], [150, 220], [150, 150], [168, 150]]} seed={s('up')} />
      <Label anchor="start" x={10} y={268}>merge → new path → deploy</Label>
      <Marker x={18} y={294} n="c" text="never in place" />
      <Label kind="title" x={170} y={334}>the dictionary (§1–§6)</Label>
    </g>
  );
}

/** Engine 2: the key-value store (local panel, 340 wide). */
function KeyValue({ s }: { s: (k: string) => string }) {
  return (
    <g>
      <MemMap x={10} y={40} w={130} rows={[{ text: 'K → file, O' }]} seed={s('map')} />
      <Marker x={24} y={132} n="a" text="map" />
      <StripeFile x={180} y={40} w={40} h={100} name="001" seed={s('f1')} />
      <StripeFile x={232} y={40} w={40} h={100} name="002" seed={s('f2')} />
      <StripeFile x={284} y={40} w={40} h={100} lines={3} name="003" seed={s('f3')} />
      <Arrow pts={[[304, 8], [304, 37]]} seed={s('app')} />
      <Marker x={282} y={18} n="c" text="never in place" anchor="end" />
      <Arrow tone="blue" pts={[[140, 74], [178, 74]]} seed={s('get')} />
      <Arrow dashed pts={[[200, 170], [200, 204], [252, 204], [252, 170]]} seed={s('mc')} />
      <Label x={226} y={228}>merge &amp; compaction</Label>
      <RecordBar x={10} y={262} cells={[{ label: 'CRC', w: 40 }, { label: 'TS', w: 34 }, { label: 'KSZ', w: 40 }, { label: 'VSZ', w: 40 }, { label: 'K', w: 30 }, { label: 'V', w: 60 }]} h={28} seed={s('rec')} />
      <Marker x={274} y={276} n="b" text="sizes" />
      <Label kind="title" x={170} y={334}>the key-value store (§7–§10)</Label>
    </g>
  );
}

export function TwoEngines({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f11a-p' : 'l10-f11a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Two engines';
  const desc = 'The two engines side by side: the dictionary as one indexed file on S3, read by API servers that keep a word-to-offset map in memory and updated by a job that merges into a new path; and the key-value store as append-only files with an in-memory map of keys to file and offset, cleaned by merge and compaction. Both keep a small map in memory pointing into big files (a), read records by known sizes (b), and never write in place (c).';
  if (P)
    return (
      <Fig id={id} w={340} h={736} title={title} desc={desc}>
        <g transform="translate(0 4)"><Dictionary s={s} /></g>
        <Label x={170} y={374}>same ideas, twice</Label>
        <g transform="translate(0 390)"><KeyValue s={s} /></g>
      </Fig>
    );
  return (
    <Fig id={id} w={780} h={372} title={title} desc={desc}>
      <Label x={390} y={22}>same ideas, twice</Label>
      <g transform="translate(20 30)"><Dictionary s={s} /></g>
      <g transform="translate(420 30)"><KeyValue s={s} /></g>
    </Fig>
  );
}

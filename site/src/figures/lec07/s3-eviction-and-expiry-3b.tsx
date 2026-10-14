// Fig 3·b "The textbook LRU and its bill" (D-07 redraw, frame b_013200). Top: a map pointing at nodes of a doubly
// linked list; an accessed node moves to the head. Bottom: one node's three pointers (12 B with 4-byte pointers,
// 24 B with 8-byte ones) against the 5 B of data in `a : 2`. The spec's §3 bubble ("everyone uses me") is now a plain
// hand note over the whole list, "the answer everyone gives" (critic C-12).
// Desk 720 wide, phone 340.
import React from 'react';
import { Arrow, Bracket, Label, Mark } from '../kit/Kit';
import { Fig } from './floor';
import { DoubleLink, ListNode, SpanBracket, Struct } from './s3-eviction-and-expiry-parts';
import { chamferRect, poly } from '../kit/hand';

const TITLE = 'The textbook LRU and its bill';
const DESC = 'A hash map points at the nodes of a doubly linked list. When a key is accessed its node is unlinked and moved to the head in O(1), so the tail is the least recently used key. Each node carries a next, a prev and a value pointer: 4 + 4 + 4 = 12 bytes per key with 4-byte pointers, 24 bytes with 8-byte pointers. For key a (1 byte) and value 2 (4 bytes), 5 bytes of data carry 12 bytes of bookkeeping: more overhead than data.';

const NODE_ROWS = [
  { text: 'next*   4 B' },
  { text: 'prev*   4 B' },
  { text: 'value*  4 B' },
];

/** The map glyph: a small ruled box with three key rows. */
function MapBox({ x, y, seed }: { x: number; y: number; seed: string }) {
  const w = 60, rh = 22;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, rh * 3, seed, 2)} />
      {[1, 2].map((i) => <path key={i} className="ink thin" d={poly([[x, y + rh * i], [x + w, y + rh * i]], `${seed}-r${i}`)} />)}
      {['a', 'b', 'c'].map((k, i) => <Label key={k} kind="mono" x={x + w / 2} y={y + rh * i + rh / 2 + 5}>{k}</Label>)}
      <Label kind="mono" x={x + w / 2} y={y - 9}>map</Label>
    </g>
  );
}

export function TextbookLru({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f3b-p-${k}`;
    const xs = [42, 102, 162, 222, 282];
    const Y = 168, R = 13;
    return (
      <Fig id="f3b-p" w={340} h={570} title={TITLE} desc={DESC}>
        <Label muted anchor="start" x={14} y={44}>the answer everyone</Label>
        <Label muted anchor="start" x={14} y={64}>gives: this list</Label>
        <Arrow weight="thin" pts={[[70, 74], [130, 150]]} seed={s('ev')} />
        <MapBox x={232} y={34} seed={s('map')} />
        <Arrow pts={[[244, 100], [244, 134], [222, 134], [222, Y - R - 2]]} seed={s('m1')} />
        <Arrow pts={[[282, 100], [282, Y - R - 2]]} seed={s('m2')} />
        <Label anchor="end" x={226} y={120}>map → node</Label>
        {xs.map((x, i) => <ListNode key={i} cx={x} cy={Y} r={R} seed={s('n' + i)} />)}
        {xs.slice(1).map((x, i) => <DoubleLink key={i} x0={xs[i] + R + 3} x1={x - R - 3} y={Y} seed={s('l' + i)} />)}
        <Label anchor="middle" x={42} y={204}>head</Label>
        <Label muted anchor="middle" x={282} y={204}>tail</Label>
        <Mark a={[24, 210]} b={[60, 210]} seed={s('u1')} />
        <Mark a={[24, 214]} b={[60, 214]} seed={s('u2')} />
        <Arrow tone="blue" pts={[[222, Y + R + 2], [222, 236], [12, 236], [12, Y], [42 - R - 2, Y]]} seed={s('mv')} />
        <Label tone="blue" anchor="middle" x={160} y={258}>accessed → move to head</Label>

        <Struct x={20} y={290} w={180} name="node" rows={NODE_ROWS} seed={s('st')} />
        <Bracket x={214} y0={316} y1={384} tone="ink" seed={s('br')} />
        <Label kind="mono" anchor="start" x={226} y={355}>12 B</Label>
        <Label muted anchor="start" x={20} y={432}>24 B with 8-byte pointers</Label>

        <Label kind="mono" anchor="middle" x={100} y={484} size={22}>a : 2</Label>
        <Label kind="mono" anchor="middle" x={78} y={510}>1 B</Label>
        <Label kind="mono" anchor="middle" x={124} y={510}>4 B</Label>
        <SpanBracket x0={62} x1={142} y={522} down={false} seed={s('sb')} />
        <Label kind="mono" anchor="middle" x={102} y={546}>5 B</Label>
        <Arrow tone="red" pts={[[126, 541], [296, 541], [296, 351], [266, 351]]} seed={s('ov')} />
        <Label tone="red" anchor="middle" x={214} y={532}>overhead &gt; data</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3b-${k}`;
  const xs = [190, 290, 390, 490, 590];
  const Y = 160, R = 15;
  return (
    <Fig id="f3b" w={720} h={430} title={TITLE} desc={DESC}>
      <MapBox x={30} y={127} seed={s('map')} />
      <Arrow pts={[[90, Y], [xs[0] - R - 2, Y]]} seed={s('m1')} />
      <Arrow pts={[[90, 182], [110, 182], [110, 218], [390, 218], [390, Y + R + 2]]} seed={s('m2')} />
      <Label anchor="middle" x={60} y={222}>map → node</Label>
      {xs.map((x, i) => <ListNode key={i} cx={x} cy={Y} r={R} seed={s('n' + i)} />)}
      {xs.slice(1).map((x, i) => <DoubleLink key={i} x0={xs[i] + R + 4} x1={x - R - 4} y={Y} seed={s('l' + i)} />)}
      <Label anchor="middle" x={190} y={200}>head</Label>
      <Mark a={[170, 205]} b={[210, 205]} seed={s('u1')} />
      <Mark a={[170, 209]} b={[210, 209]} seed={s('u2')} />
      <Arrow tone="blue" pts={[[490, Y - R - 2], [490, 98], [190, 98], [190, Y - R - 3]]} seed={s('mv')} />
      <Label tone="blue" anchor="middle" x={340} y={88}>accessed → move to head</Label>
      {/* the whole list is the textbook answer (critic C-12: the bubble sat on the tail, the key evicted next) */}
      <SpanBracket x0={170} x1={610} y={58} seed={s('ev')} />
      <Label muted anchor="middle" x={390} y={46}>the answer everyone gives</Label>
      <Label muted anchor="middle" x={590} y={200}>tail: next to evict</Label>

      <Struct x={60} y={262} w={200} name="node" rows={NODE_ROWS} seed={s('st')} />
      <Bracket x={276} y0={288} y1={358} tone="ink" seed={s('br')} />
      <Label kind="mono" anchor="start" x={290} y={328}>12 B</Label>
      <Label muted anchor="start" x={60} y={410}>24 B with 8-byte pointers</Label>

      <Label kind="mono" anchor="middle" x={540} y={300} size={24}>a : 2</Label>
      <Label kind="mono" anchor="middle" x={514} y={330}>1 B</Label>
      <Label kind="mono" anchor="middle" x={566} y={330}>4 B</Label>
      <SpanBracket x0={496} x1={586} y={342} down={false} seed={s('sb')} />
      <Label kind="mono" anchor="middle" x={541} y={368}>5 B</Label>
      <Arrow tone="red" pts={[[520, 380], [520, 396], [360, 396], [360, 324], [334, 324]]} seed={s('ov')} />
      <Label tone="red" anchor="middle" x={440} y={388}>overhead &gt; data</Label>
    </Fig>
  );
}

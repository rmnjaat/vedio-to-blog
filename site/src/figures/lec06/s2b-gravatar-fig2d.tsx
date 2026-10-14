// Lecture 08 (lec06), §2.4 Fig 2·d: Somebody else's photo id (new StepThrough).
// Lanes, time running down: the caller's app (user 729) and the photos table holding two users' rows.
// Lane figure (420) with a phone layout (340).
import React from 'react';
import { Arrow, Box, Cyl, Label, Lifeline, Num, Step, TimeAxis } from '../kit/Kit';
import { Fig } from './floor';

export function ForeignPhotoId({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig2d-p' : 'fig2d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  // critic C-05: on phone the lanes sit wider apart so the app's notes and the rows never touch
  const A = P ? 108 : 112; // app lane (critic C-24: on phone, clear of the step circles)
  const D = P ? 256 : 300; // db lane
  const E = D - 86; // arrow ends, clear of the row text
  const NX = P ? 24 : 30;
  const T = P ? 14 : 13.5;
  const NS = P ? 14 : 12.5;
  const rows = (y: number, a: string, b: string, ta?: 'green' | 'red', tb?: 'green' | 'red') => (
    <g>
      <Label kind="mono" tone={ta} x={D} y={y} size={T}>{a}</Label>
      <Label kind="mono" tone={tb} x={D} y={y + 20} size={T}>{b}</Label>
    </g>
  );
  return (
    <Fig id={id} w={W} h={640} halo title="Somebody else's photo id"
      desc="Lanes for user 729's app and the photos table, time running down. 1: the app asks to make photo 9f00 active, but 9f00 belongs to user 812. 2: the first update clears user 729's active photo. 3: without a user_id check the second update marks user 812's photo active. 4: with the check, 0 rows change on 812's side, but 729 has already lost their active photo. 5: checking first, with a locking select, finds no such row for 729 and stops before any write.">
      <Box x={A - 50} y={30} w={100} h={36} label="app" seed={s('app')} />
      <Label x={A} y={88} size={T}>caller: user 729</Label>
      <Cyl cx={D} top={26} rx={24} ry={6} h={30} seed={s('db')} label="photos" />
      <Lifeline x={A} y0={98} y1={628} seed={s('la')} />
      <Lifeline x={D} y0={100} y1={628} seed={s('ld')} />
      <TimeAxis x={P ? 8 : 10} y0={84}y1={624} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Num x={NX} y={134} n={1} tone="blue" size={NS} />
        <Label kind="mono" tone="blue" x={A} y={130} size={T}>make 9f00 mine</Label>
        <Label x={A} y={150} size={T}>(9f00 is 812’s)</Label>
        {rows(130, '729: 7abe active', '812: 9f00 inactive')}
      </Step>
      <Step n={2}>
        <Num x={NX} y={206} n={2} tone="blue" size={NS} />
        <Label kind="mono" x={A} y={196} size={T}>update 1</Label>
        <Arrow tone="blue" pts={[[A, 204], [E, 214]]} seed={s('u1')} />
        <Label kind="mono" x={D} y={218} size={T}>729: 7abe inactive</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={280} n={3} tone="red" size={NS} />
        <Label kind="mono" x={A} y={270} size={T}>update 2</Label>
        <Label kind="mono" x={A} y={288} size={T}>where id = 9f00</Label>
        <Arrow tone="red" pts={[[A, 298], [E, 300]]} seed={s('u2')} />
        <Label kind="mono" tone="red" x={D} y={304} size={T}>812: 9f00 active ✕</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={370} n={4} size={NS} />
        <Label kind="mono" x={A} y={360} size={T}>… and user_id</Label>
        <Label kind="mono" x={A} y={378} size={T}>= 729</Label>
        <Arrow pts={[[A, 388], [E, 390]]} seed={s('u3')} />
        <Label kind="mono" x={D} y={374} size={T}>0 rows</Label>
        <Label kind="mono" x={D} y={394} size={T}>812 untouched</Label>
        <Label tone="red" x={D} y={420} size={T}>729: none active</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={480} n={5} tone="green" size={NS} />
        <Label kind="mono" x={A} y={470} size={T}>select … where</Label>
        <Label kind="mono" x={A} y={488} size={T}>id = 9f00 and</Label>
        <Label kind="mono" x={A} y={506} size={T}>user_id = 729</Label>
        <Label kind="mono" x={A} y={524} size={T}>for update</Label>
        <Arrow tone="blue" pts={[[A, 534], [E, 538]]} seed={s('q')} />
        <Label kind="mono" x={D} y={542} size={T}>not found</Label>
        <Label tone="green" x={A} y={566} size={T}>stop: no writes</Label>
        {rows(584, '729: 7abe active ✓', '812: 9f00 inactive', 'green')}
      </Step>
    </Fig>
  );
}

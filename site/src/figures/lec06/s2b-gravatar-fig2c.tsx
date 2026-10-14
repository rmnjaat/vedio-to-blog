// Lecture 08 (lec06), §2.4 Fig 2·c: Crash between two updates (new StepThrough).
// Lanes, time running down: the app, user 729's rows in photos, and facebook.com rendering the photo.
// Lane figure (420) with a phone layout (340).
import React from 'react';
import { Arrow, Box, Client, Cross, Cyl, Label, Lifeline, Num, Step, TimeAxis } from '../kit/Kit';
import { Fig } from './floor';

export function CrashBetweenUpdates({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig2c-p' : 'fig2c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 90 : 92; // app lane (critic C-24: on phone, clear of the step circles)
  const D = P ? 192 : 236; // db lane
  const F = P ? 296 : 362; // facebook lane
  const NX = P ? 26 : 30;
  const T = P ? 14 : 13.5;
  const NS = P ? 14 : 12.5;
  const rows = (y: number, a: string, c: string, ta?: 'green' | 'red', tc?: 'green' | 'red') => (
    <g>
      <Label kind="mono" tone={ta} x={D} y={y} size={T}>{a}</Label>
      <Label kind="mono" tone={tc} x={D} y={y + 20} size={T}>{c}</Label>
    </g>
  );
  return (
    <Fig id={id} w={W} h={640} halo title="Crash between two updates"
      desc="Lanes for the app, user 729's photos and facebook.com, time running down. 1: 7abe is active and the user asks for c1d0. 2: the first update clears the active photo, so both are inactive. 3: the process crashes before the second update; there is no transaction. 4: facebook.com requests the photo from the app, the app finds no active row in photos and answers 404. 5: with both updates inside one transaction, the crash rolls the first update back and 7abe stays active.">
      <Box x={A - 34} y={30} w={68} h={36} label="app" seed={s('app')} />
      <Cyl cx={D} top={26} rx={24} ry={6} h={30} seed={s('db')} label="photos" />
      <Client x={F - 22} y={30} seed={s('fb')} />
      <Label x={F} y={P ? 88 : 86} size={T}>facebook.com</Label>
      <Lifeline x={A} y0={76} y1={628} seed={s('la')} />
      <Lifeline x={D} y0={100} y1={628} seed={s('ld')} />
      <Lifeline x={F} y0={100} y1={628} seed={s('lf')} />
      <TimeAxis x={P ? 8 : 10} y0={84}y1={624} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Num x={NX} y={134} n={1} tone="blue" size={NS} />
        <Label kind="mono" tone="blue" x={A} y={130} size={T}>make c1d0</Label>
        <Label kind="mono" tone="blue" x={A} y={148} size={T}>active</Label>
        {rows(130, '7abe active', 'c1d0 inactive')}
      </Step>
      <Step n={2}>
        <Num x={NX} y={206} n={2} tone="blue" size={NS} />
        <Arrow tone="blue" pts={[[A, 200], [D - 64, 210]]} seed={s('u1')} />
        <Label kind="mono" x={A} y={188} size={T}>update 1</Label>
        {rows(214, '7abe inactive','c1d0 inactive')}
      </Step>
      <Step n={3}>
        <Num x={NX} y={292} n={3} tone="red" size={NS} />
        <Cross x={A} y={292} size={20} seed={s('x')} />
        <Label tone="red" x={A} y={326} size={T}>crash</Label>
        <Label tone="red" x={A} y={346} size={T}>no update 2</Label>
        <Label tone="red" x={D} y={300} size={T}>none active</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={392} n={4} tone="red" size={NS} />
        {/* critic C-13: the request goes to the app (the Gravatar API), which reads photos and answers */}
        <Arrow tone="blue" pts={[[F, 378], [A + 8, 388]]} seed={s('get')} />
        <Label kind="mono" tone="blue" x={(D + F) / 2 + 6} y={372} size={T}>GET /0eafd172</Label>
        <Arrow tone="blue" pts={[[A + 8, 400], [D - 8, 406]]} seed={s('rd')} />
        <Arrow pts={[[D - 8, 416], [A + 8, 422]]} seed={s('none')} />
        <Label kind="mono" muted anchor="start" x={D + 8} y={418} size={T}>no row</Label>
        <Arrow tone="red" pts={[[A + 8, 434], [F, 446]]} seed={s('404')} />
        <Label kind="mono" tone="red" x={F} y={468} size={P ? 16 : 17}>404</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={496} n={5} tone="green" size={NS} />
        <Label kind="mono" x={A} y={500} size={T}>BEGIN</Label>
        <Label kind="mono" x={A} y={520} size={T}>update 1</Label>
        <Cross x={A} y={548} size={18} seed={s('x2')} />
        <Label kind="mono" x={A} y={584} size={T}>ROLLBACK</Label>
        {rows(560, '7abe active ✓', 'c1d0 inactive', 'green')}
        <Label x={D} y={606} size={T}>old photo kept</Label>
      </Step>
    </Fig>
  );
}

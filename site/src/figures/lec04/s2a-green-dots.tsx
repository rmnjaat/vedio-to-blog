// Lecture 01 (lec04), chapter 2 "Green dots", sections 2.1–2.4.
// Key add-on (this lecture's marks), Fig 2·a (D-01), Fig 2·b (D-03), Fig 2·c (D-04 + new panel), Fig 2·d (D-05),
// Fig 2·e (new step-through), Fig 2·f (D-06). Board frames: b_002245, b_002230, b_002415, b_002615, b_002945.
// Figures ≤ 360 units wide have one layout; wider ones get a <Phone> layout (FIGURES.md rule 3).
import React from 'react';
import { Actor, Arrow, Box, Bubble, Cross, Cyl, Fig, Label, Lifeline, Line, Num, Step, TimeAxis, Bracket } from './_kit';
import { chamferRect } from '../kit/hand';
import { Laptop, PhoneGlyph, Pulse, Ring, StatusDot, Table, Timer } from './s2a-parts';

/* ------------------------------------------------------------------ key add-on */

/** The marks this lecture adds to the notation key (360 × 92). */
export function LectureMarks() {
  const s = (k: string) => `f04-key-${k}`;
  return (
    <Fig id="f04-key" shown={300} w={360} h={92} title="Marks this lecture adds"
      desc="A filled green dot means online. A hollow ring means offline. A small blue dot is one heartbeat. A small clock face is a TTL timer. A ruled block with a header row is a table, drawn only to show a schema.">
      <StatusDot x={14} y={20} on seed={s('on')} />
      <Label anchor="start" x={26} y={25}>online</Label>
      <StatusDot x={104} y={20} on={false} seed={s('off')} />
      <Label anchor="start" x={116} y={25}>offline</Label>
      <Pulse x={202} y={20} />
      <Label anchor="start" x={212} y={25}>heartbeat</Label>
      <Timer x={16} y={58} r={8} seed={s('ttl')} />
      <Label kind="mono" anchor="start" x={30} y={63}>ttl 30s</Label>
      <Table x={104} y={46} cols={[{ name: '', w: 20 }, { name: '', w: 20 }]} rows={[['', '']]} rowH={9} seed={s('tbl')} />
      <Label anchor="start" x={154} y={63}>table</Label>
      <Label anchor="start" x={154} y={83}>(a schema, not a DB choice)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·a */

/** Fig 2·a: what the user sees (D-01). 320 × 190. */
export function WhatUserSees() {
  const s = (k: string) => `f04-2a-${k}`;
  const rows: [string, boolean][] = [['user 1', true], ['user 4', true], ['user 5', false], ['user 3', false]];
  return (
    <Fig id="f04-2a" w={320} h={190} title="What the user sees"
      desc="A friends list card with four rows: user 1 and user 4 have a green dot, online; user 5 and user 3 have a hollow ring, offline.">
      <path className="ink shape" d={chamferRect(30, 14, 170, 160, s('card'))} />
      <Label kind="mono" muted anchor="start" x={46} y={38} size={13}>friends</Label>
      <Line pts={[[30, 48], [200, 48]]} weight="thin" seed={s('hd')} />
      {rows.map(([name, on], i) => (
        <g key={name}>
          <Label kind="mono" anchor="start" x={50} y={78 + i * 28}>{name}</Label>
          <StatusDot x={176} y={73 + i * 28} on={on} seed={s('d' + i)} />
        </g>
      ))}
      <Line pts={[[186, 73], [236, 73]]} weight="thin" seed={s('l-on')} />
      <Label tone="green" anchor="start" x={242} y={78}>online</Label>
      <Line pts={[[186, 129], [236, 129]]} weight="thin" seed={s('l-off')} />
      <Label anchor="start" x={242} y={134}>offline</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b */

/** Fig 2·b: storage first, database later (D-03). 360 × 200. */
export function StorageFirst() {
  const s = (k: string) => `f04-2b-${k}`;
  return (
    <Fig id="f04-2b" shown={300} w={360} h={200} title="Storage first, database later"
      desc="For every user store user ID and online or offline: the user ID is an integer, the status a boolean. A database cylinder beside it is labelled not yet decided. Below: the access pattern is key-value, three operations: get many ids, get one id, set one id.">
      <Label kind="mono" anchor="start" x={14} y={30}>user → online/offline</Label>
      <Arrow pts={[[34, 40], [34, 66]]} seed={s('a1')} />
      <Arrow pts={[[136, 40], [136, 66]]} seed={s('a2')} />
      <Label kind="mono" x={34} y={86}>int</Label>
      <Label kind="mono" x={136} y={86}>bool</Label>
      <Label x={290} y={20} size={20}>?</Label>
      <Cyl cx={290} top={30} rx={30} ry={7} h={40} seed={s('db')} />
      <Label x={290} y={106}>not yet decided</Label>
      <Label kind="mono" anchor="start" x={14} y={140}>access: key-value</Label>
      <Label kind="mono" muted anchor="start" x={14} y={172}>get(ids…)</Label>
      <Label kind="mono" muted anchor="start" x={126} y={172}>get(id)</Label>
      <Label kind="mono" muted anchor="start" x={220} y={172}>set(id)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c */

function CallsPanel({ id, batch }: { id: string; batch?: boolean }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Actor x={24} y={52} s={0.85} seed={s('u')} />
      <PhoneGlyph x={6} y={104} w={16} h={26} seed={s('ph')} />
      <Box x={198} y={34} w={58} h={104} label="api" seed={s('api')} />
      <Arrow pts={[[257, 86], [303, 86]]} head="both" seed={s('adb')} />
      <Cyl cx={324} top={68} rx={18} ry={5} h={30} seed={s('db')} />
      <Label kind="mono" x={324} y={122}>db</Label>
      {!batch && ['u1', 'u2', 'u3', 'u4'].map((u, i) => (
        <g key={u}>
          <Label kind="mono" tone="blue" x={124} y={42 + i * 26} size={13}>{`GET /status/${u}`}</Label>
          <Arrow tone="blue" pts={[[54, 50 + i * 26], [196, 50 + i * 26]]} seed={s('c' + i)} />
        </g>
      ))}
      {!batch && <Label tone="red" x={150} y={170}>4 calls for 4 dots</Label>}
      {batch && (
        <g>
          <Label kind="mono" tone="blue" x={124} y={46} size={13}>GET /status/users</Label>
          <Label kind="mono" tone="blue" x={124} y={64} size={13}>?ids=u1,u2,u3,u4</Label>
          <Arrow tone="blue" pts={[[54, 74], [196, 74]]} seed={s('c')} />
          <Line pts={[[78, 86], [78, 92], [172, 92], [172, 86]]} weight="thin" seed={s('br')} />
          <Label x={124} y={108} size={13}>the users on screen</Label>
          <Arrow tone="green" pts={[[196, 124], [54, 124]]} seed={s('r')} />
          <Label kind="mono" tone="green" x={124} y={146} size={13}>{'{u1: on, u2: on, …}'}</Label>
          <Label x={150} y={170}>one call, the backend does the work</Label>
        </g>
      )}
      <Label kind="title" x={160} y={206}>{batch ? 'one batch call' : 'one call per user'}</Label>
    </g>
  );
}

const DESC_2C =
  'user with a device ⟷ API server ⟷ database, both arrows double-headed. ' +
  'Two panels with a user holding a phone, an API server and a database joined by a double-headed arrow. Panel 1, one call per user: four blue arrows from the user to the API server, GET /status/u1 to u4; in red, 4 calls for 4 dots. ' +
  'Panel 2, one batch call: one blue arrow, GET /status/users?ids=u1,u2,u3,u4, a brace under the ids marking the users on screen, and a green reply listing each user as on or off.';

/** Fig 2·c: four calls or one. Desk 700 × 218, phone 350 × 440 (db sits 30 right of the api box so the ⟷ has a shaft). */
export function FourCallsOrOne({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Four calls or one';
  if (layout === 'phone')
    return (
      <Fig id="f04-2c-p" w={350} h={440} title={title} desc={DESC_2C}>
        <CallsPanel id="f04-2c-p1" />
        <Line pts={[[10, 220], [340, 220]]} weight="thin" dotted seed="f04-2c-p-sep" className="faint" />
        <g transform="translate(0 226)"><CallsPanel id="f04-2c-p2" batch /></g>
      </Fig>
    );
  return (
    <Fig id="f04-2c" w={700} h={218} title={title} desc={DESC_2C}>
      <CallsPanel id="f04-2c-1" />
      <Line pts={[[350, 12], [350, 206]]} weight="thin" dotted seed="f04-2c-sep" className="faint" />
      <g transform="translate(356 0)"><CallsPanel id="f04-2c-2" batch /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·d */

const DESC_2D =
  'Three users on the left each send a blue arrow, their heartbeat, that merges into one API server, which writes to a database. ' +
  'A dashed arrow from the API server back toward the users carries a red cross: the server cannot reach the client. A speech bubble on the server says: can’t I just ask them? ' +
  'Below: users push their status periodically, unless there is a persistent connection.';

/** Fig 2·d: users push, the server can't pull (D-05). Desk 440 × 300, phone 340 × 330. */
export function UsersPush({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f04-2d-p' : 'f04-2d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 440;
  const MX = P ? 96 : 126; // where the three pushes merge
  const AX = P ? 132 : 180, AW = P ? 56 : 64; // api box
  const DB = P ? 286 : 380;
  const Y = [66, 128, 190]; // actor heads
  const AY = 134; // api box top
  return (
    <Fig id={id} w={W} h={300} title="Users push; the server can’t pull" desc={DESC_2D}>
      {Y.map((y, i) => (
        <g key={i}>
          <Actor x={28} y={y} s={0.8} seed={s('u' + i)} />
          <Line tone="blue" pts={[[44, y + 14], [MX, y + 14], [MX, 154]]} seed={s('p' + i)} />
        </g>
      ))}
      <Arrow tone="blue" pts={[[MX, 154], [AX - 2, 154]]} seed={s('push')} />
      <Box x={AX} y={AY} w={AW} h={40} label="api" seed={s('api')} />
      <Arrow pts={[[AX + AW, 154], [DB - 22, 154]]} seed={s('adb')} />
      <Cyl cx={DB} top={136} rx={20} ry={5.5} h={30} seed={s('db')} />
      <Label kind="mono" x={DB} y={194}>db</Label>
      {/* the pull that can't happen */}
      <Arrow dashed pts={[[AX + AW / 2, AY], [AX + AW / 2, 40], [50, 40]]} seed={s('pull')} />
      <Cross x={P ? 108 : 120} y={40} size={16} seed={s('x')} />
      <Label tone="red" x={P ? 108 : 120} y={22} size={13.5}>can’t reach the client</Label>
      <Bubble x={P ? 196 : 238} y={P ? 64 : 60} w={P ? 136 : 160} h={P ? 48 : 40} tail={[AX + AW - 6, AY - 2]}
        lines={P ? ['can’t I just', 'ask them?'] : ['can’t I just ask them?']} seed={s('bub')} size={P ? 13.5 : 13} />
      <Label anchor="start" x={14} y={262}>users push their status periodically</Label>
      <Label muted anchor="start" x={14} y={284} size={13}>* unless there is a persistent connection</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·e (step-through) */

/** Fig 2·e: two calls are not enough. Swim lanes laptop · api · store · friend's screen. Desk 420, phone 340. */
export function TwoCallsNotEnough({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f04-2e-p' : 'f04-2e';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const U = P ? 70 : 84, A = P ? 148 : 180, S = P ? 222 : 270, F = P ? 298 : 362; // lanes
  const NX = P ? 34 : 44;
  const T = 13.5;
  const screen = (y: number, on: boolean, k: string, stale?: boolean) => (
    <g>
      <path className="ink shape" d={chamferRect(F - 16, y - 12, 32, 24, s(k + 's'), 2)} />
      <StatusDot x={F} y={y} on={on} r={5.5} seed={s(k + 'd')} />
      {stale && <Ring x={F} y={y} r={13} tone="red" seed={s(k + 'r')} />}
    </g>
  );
  return (
    <Fig id={id} w={W} h={630} title="Two calls are not enough"
      desc="Swim lanes for the user's laptop, the API server, the store and a friend's screen, time running down. 1: at login the laptop sends online; the store marks u7 online and the friend sees a green dot. 2: a while of use, nothing is sent, still green. 3: the battery dies and no offline call leaves the laptop. 4: much later the friend still sees green, a stale dot. 5: replay with periodic heartbeats every 10 seconds; after the battery dies there is silence, and after 30 seconds of silence the store marks u7 offline and the friend sees a ring.">
      <Laptop x={U - 18} y={24} w={36} h={22} seed={s('lap')} />
      <Label x={U} y={74} size={T}>laptop</Label>
      <Box x={A - 28} y={22} w={56} h={30} label="api" seed={s('api')} labelSize={T} />
      <Cyl cx={S} top={24} rx={18} ry={5} h={24} seed={s('db')} />
      <Label kind="mono" x={S} y={74} size={T}>store</Label>
      <path className="ink shape" d={chamferRect(F - 18, 22, 36, 30, s('fs'), 2)} />
      <Label x={F} y={74} size={T}>friend</Label>
      {[U, A, S, F].map((x, i) => <Lifeline key={i} x={x} y0={84} y1={618} seed={s('l' + i)} />)}
      <TimeAxis x={P ? 8 : 14} y0={94} y1={616} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={110} n={1} tone="blue" />
        <Label kind="mono" tone="blue" anchor="start" x={U + 6} y={104} size={T}>online</Label>
        <Arrow tone="blue" pts={[[U, 112], [A - 2, 124]]} seed={s('1a')} />
        <Arrow tone="blue" pts={[[A, 128], [S - 2, 140]]} seed={s('1b')} />
        <Label kind="mono" anchor="end" x={S - 8} y={158} size={T}>u7 = online</Label>
        {screen(150, true, '1')}
      </Step>
      <Step n={2}>
        <Num x={NX} y={196} n={2} />
        <Label muted anchor="start" x={U + 8} y={200} size={T}>a while of use,</Label>
        <Label muted anchor="start" x={U + 8} y={218} size={T}>nothing sent</Label>
        {screen(226, true, '2')}
      </Step>
      <Step n={3}>
        <Num x={NX} y={276} n={3} tone="red" />
        <Laptop x={U - 14} y={262} w={28} h={18} seed={s('3lap')} tone="red" />
        <Cross x={U} y={274} size={20} seed={s('3x')} />
        <Arrow dashed tone="red" pts={[[U + 16, 296], [A - 30, 306]]} seed={s('3a')} />
        <Label tone="red" anchor="start" x={U + 6} y={326} size={T}>no “offline” call</Label>
        {screen(296, true, '3')}
      </Step>
      <Step n={4}>
        <Num x={NX} y={366} n={4} tone="red" />
        <Label muted anchor="start" x={U - 6} y={370} size={T}>much later</Label>
        {screen(380, true, '4', true)}
        <Label tone="red" anchor="end" x={F - 18} y={410} size={T}>still green</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={444} n={5} tone="green" />
        <Label anchor="start" x={U + 6} y={440} size={T}>replay, with heartbeats</Label>
        {[462, 488, 514].map((y, i) => (
          <g key={y}>
            <Pulse x={U} y={y} r={3.6} />
            <Arrow tone="blue" pts={[[U + 4, y], [S - 4, y + 8]]} seed={s('5p' + i)} />
          </g>
        ))}
        <Label kind="mono" muted anchor="end" x={U - 8} y={480} size={12.5}>10s</Label>
        <Cross x={U} y={534} size={14} seed={s('5x')} />
        <Bracket x={S + 18} y0={522} y1={576} label="30 s" tone="ink" seed={s('5br')} size={12.5} />
        <Timer x={S} y={548} r={8} tone="red" seed={s('5t')} />
        <Label kind="mono" anchor="end" x={S - 12} y={596} size={T}>u7 offline</Label>
        {screen(596, false, '5')}
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·f */

/** Fig 2·f: a periodic pulse (D-06). 360 × 262. */
export function PeriodicPulse() {
  const s = (k: string) => `f04-2f-${k}`;
  return (
    <Fig id="f04-2f" shown={300} w={360} h={262} title="A periodic pulse"
      desc="A user sends a row of blue heartbeats, one after another, to the API server's POST /heartbeat endpoint, which marks the authenticated user alive. Below: a user is offline when no heartbeat arrives for long enough; long enough is subjective, here 30 seconds, with a heartbeat every 10 seconds.">
      <Label x={180} y={22} size={13.5}>marks the authenticated user alive</Label>
      <Label kind="mono" tone="blue" x={160} y={50}>POST /heartbeat</Label>
      <Actor x={26} y={62} s={0.85} seed={s('u')} />
      <Line tone="blue" pts={[[46, 82], [240, 82]]} weight="thin" seed={s('line')} />
      {[76, 112, 148, 184, 220].map((x) => <Pulse key={x} x={x} y={82} />)}
      <Arrow tone="blue" pts={[[230, 82], [252, 82]]} seed={s('in')} />
      <Box x={254} y={64} w={70} h={36} label="api" seed={s('api')} />
      <Arrow pts={[[148, 122], [148, 92]]} weight="thin" seed={s('lead')} />
      <Label x={148} y={140}>periodic pulse</Label>
      <Label anchor="start" x={14} y={186}>offline = no heartbeat for</Label>
      <Label anchor="start" x={208} y={186}>long enough</Label>
      <Line pts={[[208, 192], [294, 192]]} weight="thin" seed={s('ul')} />
      <Arrow pts={[[251, 196], [251, 212]]} weight="thin" seed={s('sub')} />
      <Label x={251} y={230}>subjective! here 30 s</Label>
      <Label kind="mono" muted anchor="start" x={14} y={252} size={13}>heartbeat every 10 s</Label>
    </Fig>
  );
}

// Lecture 04 (lec02), chapter 10 "Deleting, ordering, and what to keep": Fig 10·a (new, two panels),
// Fig 10·b (new, StepThrough, lanes A · database · B's screen, time running down) and the §10 RuleBox sketch.
// No red in this chapter: a deliberate delete is a graphite strike, and out-of-order arrival is expected, not a failure.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Label, Lifeline, Line, Mark, Num, Step, TimeAxis } from '../kit/Kit';
// Fig: the kit's, with a label floor for 360px phones (assembler; see s0-label-floor.tsx)
import { Fig } from './s0-label-floor';
import { Clock, EdgeServer, PhoneGlyph, Sized, Strike, UserStub, type Layout } from './s9-whole-system-parts';

/* ------------------------------------------------------------------ Fig 10·a: two ways to delete */

export function DeleteOnDevices() {
  const id = 'f10a-a';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={262} title="WhatsApp-style delete"
      desc="Where the copies live on the devices, deleting is an event: a delete-permanently message goes from one phone through the edge server to the other, and both phones drop their own copy.">
      <PhoneGlyph x={8} y={24} w={112} h={130} seed={s('p1')} />
      {/* the bubbles hold the message on two lines, so it fits the phone at the 360px label floor (assembler) */}
      <Box x={20} y={58} w={88} h={42} seed={s('b1')} />
      <Label kind="mono" x={64} y={75} size={12.5}>standup</Label>
      <Label kind="mono" x={64} y={92} size={12.5}>in 5</Label>
      <Strike x0={12} x1={116} y={78} seed={s('x1')} />
      <PhoneGlyph x={220} y={24} w={112} h={130} seed={s('p2')} />
      <Box x={232} y={58} w={88} h={42} seed={s('b2')} />
      <Label kind="mono" x={276} y={75} size={12.5}>standup</Label>
      <Label kind="mono" x={276} y={92} size={12.5}>in 5</Label>
      <Strike x0={224} x1={328} y={78} seed={s('x2')} />
      <EdgeServer x={138} y={74} w={64} h={30} label="edge" seed={s('e')} />
      <Arrow dashed pts={[[120, 89], [138, 89]]} seed={s('a1')} />
      <Arrow dashed pts={[[202, 89], [220, 89]]} seed={s('a2')} />
      <Label kind="mono" x={170} y={126} size={12.5}>delete</Label>
      <Label kind="mono" x={170} y={142} size={12.5}>permanently</Label>
      <Label x={170} y={186}>the copies live on the devices</Label>
      <Label kind="title" x={170} y={248}>WhatsApp-style</Label>
    </Fig>
  );
}

export function DeleteInStore() {
  const id = 'f10a-b';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={262} title="Slack-style delete"
      desc="Where messages live in the backend, the stored row is deleted first, then a deleted notification goes out over the edge server to every user in real time.">
      <Cyl cx={46} top={34} rx={34} h={52} label="messages" seed={s('db')} />
      <Label kind="mono" anchor="start" x={6} y={152} size={12.5}>m42 standup in 5</Label>
      <Strike x0={4} x1={128} y={147} seed={s('x')} />
      <Box x={104} y={46} w={52} h={32} label="api" seed={s('api')} />
      <Arrow pts={[[104, 62], [82, 62]]} seed={s('del')} />
      <Arrow tone="blue" pts={[[156, 62], [184, 62]]} seed={s('n1')} />
      <EdgeServer x={184} y={46} w={62} h={32} label="edge" seed={s('e')} />
      <Arrow tone="blue" pts={[[246, 56], [270, 56], [270, 36], [292, 36]]} seed={s('u1')} />
      <Arrow tone="blue" pts={[[246, 70], [270, 70], [270, 96], [292, 96]]} seed={s('u2')} />
      <UserStub x={306} y={30} name="B" seed={s('ub')} />
      <UserStub x={306} y={90} name="C" seed={s('uc')} />
      <Label tone="green" x={328} y={36}>✓</Label>
      <Label tone="green" x={328} y={96}>✓</Label>
      <Label kind="mono" tone="blue" x={240} y={124} size={12.5}>deleted: m42</Label>
      <Label x={170} y={192}>delete in the store, then tell</Label>
      <Label x={170} y={210}>everyone in real time</Label>
      <Label kind="title" x={170} y={248}>Slack-style</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 10·b: two out-of-order cases (StepThrough) */

export function OutOfOrder({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f10b-p' : 'f10b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 60 : 100, D = P ? 190 : 228, B = P ? 290 : 352; // lanes: A, database, B's screen
  const NX = P ? 32 : 44, T = 14, BW = P ? 60 : 72, M = P ? 50 : 64, Y6 = P ? 764 : 752;
  const list = (y: number, items: { t: string; tone?: 'ink' | 'blue' | 'green' }[], tone: 'ink' | 'green', key: string) => (
    <g>
      <Box x={B - BW / 2} y={y} w={BW} h={10 + items.length * 20} tone={tone} seed={s(key)} />
      {items.map((it, i) => <Label key={i} kind="mono" tone={it.tone ?? tone} x={B} y={y + 24 + i * 20} size={T}>{it.t}</Label>)}
    </g>
  );
  return (
    <Fig id={id} w={W} h={P ? 836 : 816} title="Two out-of-order cases"
      desc="Lanes for user A, the database and B's screen; time runs down. 1: A sends message 1 then message 2; the database stores them in that order by its own clock, t1 before t2. 2: case 1, message 2 reaches B first and the screen shows them as they arrive. 3: a refresh, or a job that fetches the last 50, reloads them in the database's order. 4: case 2, B keeps its list sorted by timestamp and message 2 arrives first. 5: message 1 arrives late and is inserted in place above 2, with a brief flicker. 6: the order is the database's insertion time, never the client's clock.">
      <Actor x={A} y={20} s={0.9} seed={s('a')} />
      <Cyl cx={D} top={26} rx={22} ry={6} h={30} seed={s('db')} />
      <Box x={B - 22} y={18} w={44} h={50} seed={s('scr')} />
      <Label x={A} y={92} size={T}>A</Label>
      <Label x={D} y={92} size={T}>database</Label>
      <Label x={B} y={92} size={T}>B’s screen</Label>
      <Lifeline x={A} y0={104} y1={716} seed={s('l1')} />
      <Lifeline x={D} y0={104} y1={716} seed={s('l2')} />
      <Lifeline x={B} y0={104} y1={716} seed={s('l3')} />
      {/* the axis label sits above the arrow, clear of the step-number column (critic C-03) */}
      <TimeAxis x={P ? 10 : 16} y0={112} y1={712} seed={s('t')} label="" size={T} />
      <Label muted anchor="start" x={P ? 2 : 6} y={104} size={T}>time</Label>

      <Step n={1}>
        <Num x={NX} y={128} n={1} tone="blue" size={T} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={122} size={13}>m1 hey</Label>
        <Arrow tone="blue" pts={[[A, 128], [D - 2, 142]]} seed={s('1a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={158} size={13}>m2 standup in 5</Label>
        <Arrow tone="blue" pts={[[A, 164], [D - 2, 178]]} seed={s('1b')} />
        <Box x={D - 32} y={186} w={64} h={24} label="m1 t1" tone="green" seed={s('r1')} labelSize={T} />
        <Box x={D - 32} y={214} w={64} h={24} label="m2 t2" tone="green" seed={s('r2')} labelSize={T} />
        <Label kind="mono" muted anchor="start" x={A + 8} y={258} size={T}>t1 &lt; t2 (db clock)</Label>
      </Step>

      <Step n={2}>
        <Num x={NX} y={276} n={2} tone="blue" size={T} />
        <Label anchor="start" x={A + 8} y={300} size={T}>case 1</Label>
        <Arrow tone="blue" pts={[[D + 2, 272], [B - 2, 286]]} seed={s('2a')} />
        <Label kind="mono" tone="blue" x={D + M + 30} y={272} size={T}>m2</Label>
        <Arrow tone="blue" pts={[[D + 2, 296], [B - 2, 310]]} seed={s('2b')} />
        <Label kind="mono" tone="blue" x={D + M} y={322} size={T}>m1</Label>
        {list(318, [{ t: 'm2' }, { t: 'm1' }], 'ink', 'c1')}
        <Label anchor="end" x={W - 4} y={388} size={T}>shown as they arrive</Label>
      </Step>

      <Step n={3}>
        <Num x={NX} y={418} n={3} tone="green" size={T} />
        <Label kind="mono" tone="blue" anchor="end" x={B - 10} y={410} size={T}>refresh</Label>
        <Arrow tone="blue" pts={[[B - 2, 416], [D + 2, 430]]} seed={s('3a')} />
        <Arrow tone="green" pts={[[D + 2, 438], [B - 2, 452]]} seed={s('3b')} />
        <Label kind="mono" tone="green" anchor="start" x={D + 6} y={474} size={T}>last 50</Label>
        {list(460, [{ t: 'm1' }, { t: 'm2' }], 'green', 'c1r')}
      </Step>

      <Line dotted pts={[[28, 524], [W - 12, 524]]} seed={s('sep')} />

      <Step n={4}>
        <Num x={NX} y={550} n={4} tone="blue" size={T} />
        <Label anchor="start" x={A + 8} y={574} size={T}>case 2</Label>
        <Arrow tone="blue" pts={[[D + 2, 544], [B - 2, 558]]} seed={s('4a')} />
        <Label kind="mono" tone="blue" x={D + M} y={542} size={T}>m2</Label>
        {list(564, [{ t: 'm2' }], 'ink', 'c2')}
        <Label anchor="end" x={W - 4} y={612} size={T}>list sorted by timestamp</Label>
      </Step>

      <Step n={5}>
        <Num x={NX} y={644} n={5} tone="blue" size={T} />
        <Arrow tone="blue" pts={[[D + 2, 638], [B - 2, 652]]} seed={s('5a')} />
        <Label kind="mono" tone="blue" x={D + M} y={636} size={T}>m1 late</Label>
        {list(658, [{ t: 'm1', tone: 'blue' }, { t: 'm2' }], 'ink', 'c2b')}
        <Line pts={[[B - BW / 2 - 22, 666], [B - BW / 2 - 14, 674], [B - BW / 2 - 22, 682], [B - BW / 2 - 14, 690], [B - BW / 2 - 22, 698]]} seed={s('zig')} />
        {P
          ? <Label x={B} y={728} size={T}>flicker</Label>
          : <Label anchor="end" x={B - BW / 2 - 28} y={688} size={T}>flicker</Label>}
      </Step>

      <Step n={6}>
        <Num x={NX} y={Y6} n={6} size={T} />
        <Clock cx={NX + 36} cy={Y6 - 4} r={11} seed={s('clk')} />
        <Label kind="mono" anchor="start" x={NX + 54} y={Y6 + 1} size={T}>01-01-1970</Label>
        <Strike x0={NX + 50} x1={NX + 142} y={Y6 - 4} seed={s('x')} />
        {/* stacked under the clock at every width: the struck date and the warning never run together (critic C-03) */}
        <Label anchor="start" x={NX + 22} y={Y6 + 28} size={T}>never trust the client’s clock</Label>
        <Label tone="green" anchor="start" x={NX + 22} y={Y6 + 56} size={T}>the database’s order is the truth</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §10: design realistic systems */

export function RealisticRule({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'r10-p' : 'r10';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 300 : 480, H = P ? 200 : 156;
  const cols = P ? [16, 156] : [40, 200];
  const len = P ? 104 : 120;
  const rows = [58, 82, 106, 130];
  const kept = ['0-2', '1-1'];
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="Design realistic systems"
        desc="A hand-ruled list headed 100 loopholes. Six of its eight lines are struck through; two keep a green tick. Ask how likely each case is and whether you need it.">
        <Label anchor="start" x={cols[0]} y={30}>100 loopholes</Label>
        <Mark weight="thin" a={[cols[0], 38]} b={[cols[1] + len, 38]} seed={s('rule')} />
        {cols.map((x, c) => rows.map((y, r) => {
          const key = `${c}-${r}`;
          const keep = kept.includes(key);
          return (
            <g key={key}>
              <Mark weight="thin" a={[x, y]} b={[x + len - (r % 2) * 18, y]} seed={s('l' + key)} />
              {keep
                ? <Label tone="green" x={x + len + 10} y={y + 5}>✓</Label>
                : <Mark a={[x + 6, y + 5]} b={[x + len - 24, y - 5]} seed={s('x' + key)} />}
            </g>
          );
        }))}
        {P
          ? <Label x={W / 2} y={180}>how likely? do you need it?</Label>
          : <g>
              <Label x={410} y={84}>how likely?</Label>
              <Label x={410} y={104}>do you need it?</Label>
            </g>}
      </Fig>
    </Sized>
  );
}

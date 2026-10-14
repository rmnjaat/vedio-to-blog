// Lecture 08 (lec06), §5.1–5.3 figures (writer w4).
//  Fig 5·a ThreePeople   "Three people, not three messages" (D-08 redraw, board 02:03–02:06, frame b_020345)
//  Fig 5·b Crude         "CRUDE" (D-09 redraw, board 02:08–02:19, frames b_021900, b_021930)
//  Fig 5·c IndexOrder    "Which index order reads less" (new, small)
//  Fig 5·d OneSet        "One set per user" (new layout of D-09's left side, board 02:20–02:23)
// Multi-panel figures are drawn as panels of at most 340 units: side by side on a desk, stacked on a phone.
import React from 'react';
import { chamferRect } from '../kit/hand';
import { Arrow, Box, Bracket, Bubble, Label, Line, Mark } from '../kit/Kit';
import { Fig } from './floor';
import { ByteStrip } from './s1-images-parts';
import { Table } from './s2a-gravatar-parts';
import { Brace, MsgIcon, Strike } from './s5a-badge-parts';

type Layout = { layout?: 'wide' | 'phone' };
const at = (x: number, y: number) => `translate(${x} ${y})`;

/* ------------------------------------------------------------------ Fig 5·a */

const ROWS = ['A · 212 unread', 'C · 61 unread', 'D · 27 unread'];

function BadgePanel({ id, after }: { id: string; after?: boolean }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      {after ? (
        <g>
          <MsgIcon x={16} y={70} s={36} seed={s('icon')} />
          <Arrow tone="blue" pts={[[34, 26], [34, 62]]} seed={s('tap')} />
          <Label tone="blue" anchor="start" x={46} y={40} size={15}>one tap</Label>
        </g>
      ) : (
        <g>
          <MsgIcon x={16} y={70} s={36} n={3} seed={s('icon')} />
          <Bubble x={92} y={8} w={232} h={34} tail={[66, 56]} seed={s('bub')} size={14} lines={['3 unread? no: 3 people']} />
        </g>
      )}
      {ROWS.map((r, i) => (
        <Box key={r} x={100} y={64 + i * 38} w={200} h={28} label={r} seed={s('r' + i)} labelSize={14} />
      ))}
      <Bracket x={314} y0={64} y1={176} tone="ink" seed={s('br')} />
      {after
        ? <Label x={170} y={204} size={14}>all still unread: nothing was read</Label>
        : <Label x={170} y={204} size={14}>3 = three people since your last tap</Label>}
      <Label kind="title" x={170} y={236}>{after ? 'after one tap' : 'before the tap'}</Label>
    </g>
  );
}

export function ThreePeople({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig5a-p' : 'fig5a';
  const desc = 'Two states of the messages icon. Before the tap, the badge shows 3 while three conversations hold 212, 61 and 27 unread messages: 300 messages, three people, so the badge counts the people who wrote since your last tap, not the messages. After one tap the badge is gone, yet all three conversations are still unread: the tap acknowledges that new messages exist; it reads nothing.';
  return (
    <Fig id={id} w={P ? 340 : 880} h={P ? 500 : 250} title="Three people, not three messages" desc={desc}>
      <g transform={at(P ? 0 : 50, 0)}><BadgePanel id={id + '-b'} /></g>
      <g transform={at(P ? 0 : 490, P ? 256 : 0)}><BadgePanel id={id + '-a'} after /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·b */

const MSG_ROWS = [['hey', 'C', 'B', '10:02'], ['come here', 'C', 'B', '10:03'], ['lunch?', 'D', 'B', '10:05']];

export function Crude({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig5b-p' : 'fig5b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'CRUDE';
  const desc = 'Three tables: user (id), user_activity (user_id, last_read_at) and messages (msg, from, to, ts), with from, to and ts marked for the index. The badge query counts distinct senders in messages addressed to the user after last_read_at. It is boxed CRUDE and marked INEFFICIENT: it walks every new message to count a handful of senders. It is still correct every time, because these tables are the source of truth.';
  if (P) {
    return (
      <Fig id={id} w={340} h={482} title={title} desc={desc}>
        <Table x={10} y={40} cols={['id']} widths={[44]} rows={[['B']]} name="user" seed={s('u')} />
        <Table x={78} y={40} cols={['user_id', 'last_read_at']} widths={[84, 122]} rows={[['B', '09:40']]} name="user_activity" seed={s('ua')} />
        <Table x={10} y={146} cols={['msg', '*from', '*to', '*ts']} widths={[100, 70, 60, 70]} rows={MSG_ROWS} name="messages" seed={s('m')} />
        <path className="ink shape" d={chamferRect(10, 284, 112, 40, s('crude'))} />
        <Label x={66} y={310} size={18}>CRUDE</Label>
        <Arrow pts={[[66, 284], [66, 262]]} seed={s('ca')} />
        <Label tone="red" x={238} y={310} size={17}>INEFFICIENT</Label>
        <Mark tone="red" a={[188, 318]} b={[288, 318]} seed={s('u1')} />
        <Mark tone="red" a={[192, 323]} b={[284, 323]} seed={s('u2')} />
        {['select count(distinct from)', 'from messages', 'where to = ?', 'and ts > last_read_at'].map((l, i) => (
          <Label key={i} kind="mono" anchor="start" x={10} y={360 + i * 21} size={14}>{l}</Label>
        ))}
        <Label anchor="start" x={10} y={452} size={14}>correct every time: these tables</Label>
        <Label anchor="start" x={10} y={471} size={14}>are the source of truth</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={880} h={306} title={title} desc={desc}>
      <Table x={40} y={50} cols={['id']} widths={[56]} rows={[['B']]} name="user" seed={s('u')} />
      <Table x={140} y={50} cols={['user_id', 'last_read_at']} widths={[90, 130]} rows={[['B', '09:40']]} name="user_activity" seed={s('ua')} />
      <Table x={420} y={50} cols={['msg', '*from', '*to', '*ts']} widths={[120, 76, 60, 76]} rows={MSG_ROWS} name="messages" seed={s('m')} />
      <path className="ink shape" d={chamferRect(230, 140, 116, 42, s('crude'))} />
      <Label x={288} y={167} size={18}>CRUDE</Label>
      <Arrow pts={[[346, 161], [396, 161], [396, 112], [414, 112]]} seed={s('ca')} />
      <Label tone="red" x={150} y={240} size={17}>INEFFICIENT</Label>
      <Mark tone="red" a={[100, 248]} b={[200, 248]} seed={s('u1')} />
      <Mark tone="red" a={[104, 253]} b={[196, 253]} seed={s('u2')} />
      <Label kind="mono" anchor="start" x={250} y={230} size={15}>select count(distinct from) from messages</Label>
      <Label kind="mono" anchor="start" x={250} y={253} size={15}>where to = ? and ts {'>'} last_read_at</Label>
      <Label x={460} y={292} size={14}>correct every time: these tables are the source of truth</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·c */

const BY_SENDER = ['A', 'A', 'A', 'A', 'C', 'C', 'C', 'D', 'D', 'D'];
const BY_TIME = ['A', 'C', 'A', 'D', 'A', 'C', 'C', 'A', 'D', 'A'];

/** One index leaf run: other recipients' entries greyed at both ends, B's entries in the middle. */
function Run({ x, y, cw, g, cells, seed, size }: { x: number; y: number; cw: number; g: number; cells: string[]; seed: string; size: number }) {
  const w = cells.length * cw;
  return (
    <g>
      <path className="ink shape faint" d={chamferRect(x, y, g, 24, seed + '-l', 2)} />
      <Label kind="mono" muted x={x + g / 2} y={y + 16} size={12.5}>…</Label>
      <ByteStrip x={x + g} y={y} cells={cells} cw={cw} h={24} size={size} seed={seed + '-b'} />
      <path className="ink shape faint" d={chamferRect(x + g + w, y, g, 24, seed + '-r', 2)} />
      <Label kind="mono" muted x={x + g + w + g / 2} y={y + 16} size={12.5}>…</Label>
    </g>
  );
}

export function IndexOrder({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig5c-p' : 'fig5c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Which index order reads less';
  const desc = 'Two index leaf runs for recipient B, with other recipients greyed at both ends. With (to, from, ts) B’s entries are grouped by sender, so the query reads every entry for B. With (to, ts, from) they are ordered by time, so the scan starts at last_read_at and reads only what came after. Either way, one sender who sent 10,000 messages still costs 10,000 entries to learn that the answer is 1.';
  const cw = P ? 26 : 32, g = P ? 24 : 60, x0 = P ? 8 : 170, size = P ? 13 : 14;
  const bx0 = x0 + g, bx1 = x0 + g + 10 * cw, tick = bx0 + 6 * cw;
  const y1 = P ? 70 : 74, y2 = P ? 186 : 168;
  return (
    <Fig id={id} w={P ? 340 : 640} h={P ? 318 : 268} title={title} desc={desc}>
      <Label kind="mono" anchor="start" x={P ? 8 : 16} y={P ? 30 : y1 + 17}>(to, from, ts)</Label>
      <Brace x0={bx0} x1={bx1} y={y1 - 10} tone="red" label="reads every entry for B" seed={s('b1')} />
      <Run x={x0} y={y1} cw={cw} g={g} cells={BY_SENDER} seed={s('r1')} size={size} />

      <Label kind="mono" anchor="start" x={P ? 8 : 16} y={P ? 146 : y2 + 17}>(to, ts, from)</Label>
      <Brace x0={tick} x1={bx1} y={y2 - 10} tone="blue" label="starts at last_read_at" seed={s('b2')} />
      <Run x={x0} y={y2} cw={cw} g={g} cells={BY_TIME} seed={s('r2')} size={size} />
      <Line pts={[[tick, y2 - 4], [tick, y2 + 32]]} weight="heavy" seed={s('tick')} />
      <Label kind="mono" x={tick} y={y2 + 50} size={13}>last_read_at</Label>

      {P ? (
        <g>
          <Label tone="red" x={170} y={276} size={14}>still: one sender × 10,000 messages</Label>
          <Label tone="red" x={170} y={296} size={14}>= 10,000 entries to learn “1”</Label>
        </g>
      ) : <Label tone="red" x={320} y={254} size={14}>still: one sender × 10,000 messages = 10,000 entries to learn “1”</Label>}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·d */

function SetPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Strike x={110} y={24} w={176} text="newly_unread_count: 3" seed={s('st')} size={14} />
      <Label muted x={198} y={44} size={13}>dropped: the set knows its size</Label>
      <Box x={8} y={66} w={66} h={28} label="C→B" seed={s('c')} />
      <Box x={8} y={136} w={66} h={28} label="E→B" seed={s('e')} />
      <Arrow pts={[[76, 80], [126, 80]]} seed={s('ca')} />
      <Arrow tone="green" pts={[[76, 150], [126, 150]]} seed={s('ea')} />
      <Label kind="mono" anchor="start" x={134} y={86} size={16}>B: {'{'}C, D{'}'}</Label>
      <Label anchor="start" x={134} y={108} size={13.5}>C already in: no change</Label>
      <Label kind="mono" anchor="start" x={134} y={156} size={16}>B: {'{'}C, D, E{'}'}</Label>
      <Label tone="green" anchor="start" x={134} y={178} size={13.5}>E is new: added</Label>
      <Label kind="title" x={165} y={214}>a sender writes</Label>
    </g>
  );
}

function SizePanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <MsgIcon x={86} y={70} s={42} n={3} seed={s('icon')} />
      <Label x={110} y={150} size={14}>badge = size of the set</Label>
      <Label kind="mono" x={110} y={172} size={14}>|B| = 3</Label>
      <Label muted x={110} y={192} size={13}>size is O(1)</Label>
      <Label kind="title" x={110} y={214}>the badge</Label>
    </g>
  );
}

function TapPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <MsgIcon x={34} y={76} s={42} seed={s('icon')} />
      <Arrow tone="blue" pts={[[55, 30], [55, 68]]} seed={s('tap')} />
      <Label tone="blue" anchor="start" x={66} y={44} size={15}>tap</Label>
      <Arrow tone="blue" pts={[[100, 96], [170, 96]]} seed={s('del')} />
      <Label kind="mono" tone="blue" x={134} y={86} size={14}>DEL B</Label>
      <Label kind="mono" muted anchor="start" x={186} y={102} size={16}>B: {'{'} {'}'}</Label>
      <Mark a={[182, 80]} b={[248, 112]} seed={s('x1')} />
      <Mark a={[248, 80]} b={[182, 112]} seed={s('x2')} />
      <Label x={140} y={160} size={14}>tap → delete the set</Label>
      <Label muted x={140} y={180} size={13}>the badge is gone</Label>
      <Label kind="title" x={140} y={214}>one tap</Label>
    </g>
  );
}

export function OneSet({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig5d-p' : 'fig5d';
  const desc = 'Per user, keep only a set of senders. The board’s separate newly_unread_count is struck out: the set already knows its size. A message from C to B changes nothing, because C is already in B’s set {C, D}; a message from E adds E. The badge shows the size of the set, 3, an O(1) read. One tap deletes the set, and the badge is gone.';
  return (
    <Fig id={id} w={P ? 340 : 880} h={P ? 680 : 226} title="One set per user" desc={desc}>
      <g transform={at(P ? 0 : 0, 0)}><SetPanel id={id + '-1'} /></g>
      <g transform={at(P ? 60 : 340, P ? 230 : 0)}><SizePanel id={id + '-2'} /></g>
      <g transform={at(P ? 20 : 580, P ? 456 : 0)}><TapPanel id={id + '-3'} /></g>
    </Fig>
  );
}

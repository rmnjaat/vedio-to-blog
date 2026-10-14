// Lecture 04 (lec02), chapter 7: the RuleBox sketch (§7.3) and the notation reminder beside Fig 7·c.
// Rule sketch: one user, three tiny paths ①②③, each ending in its marks in order:
//   ① saved (green) then shown; ② shown then saved (green, dashed: later); ③ shown only.
// Desk 480 wide; phone 300 wide.
import React from 'react';
import { Actor, Arrow, Dot, Fig, Label, Line, Num } from '../kit/Kit';
import { KafkaPipe } from './s1-nosql-kit';
import { EdgeServer, Sized, type Layout } from './s7-sending-parts';

const RULE_TITLE = 'Different guarantees, different architecture';
const RULE_DESC = 'One user, three paths for the same message. Path one: saved, then shown. Path two: shown at once, saved later. Path three: shown, never saved. Pick by how critical persistence is.';

export function GuaranteesRule({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'r7-p' : 'r7';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 300 : 480, H = P ? 176 : 164;
  const x0 = P ? 54 : 70, xn = P ? 82 : 108;
  const m1 = P ? 156 : 230, m2 = P ? 246 : 360, end = P ? 290 : 440;
  const ys = [30, 74, 118];
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={RULE_TITLE} desc={RULE_DESC}>
        <Actor x={P ? 22 : 34} y={56} seed={s('u')} />
        <Line pts={[[P ? 36 : 48, 80], [x0, 80]]} seed={s('stem')} />
        <Line pts={[[x0, ys[0]], [x0, ys[2]]]} seed={s('spine')} />
        {ys.map((y, i) => <Num key={i} x={xn} y={y} n={i + 1} />)}
        {/* ① saved, then shown */}
        <Line pts={[[x0, ys[0]], [xn - 10, ys[0]]]} seed={s('l1a')} />
        <Arrow pts={[[xn + 10, ys[0]], [end, ys[0]]]} seed={s('l1')} />
        <Dot x={m1} y={ys[0]} tone="green" /><Label tone="green" x={m1} y={ys[0] - 9}>saved</Label>
        <Dot x={m2} y={ys[0]} /><Label x={m2} y={ys[0] - 9}>shown</Label>
        {/* ② shown, then saved later */}
        <Line pts={[[x0, ys[1]], [xn - 10, ys[1]]]} seed={s('l2a')} />
        <Line pts={[[xn + 10, ys[1]], [m1, ys[1]]]} seed={s('l2')} />
        <Arrow dashed pts={[[m1, ys[1]], [end, ys[1]]]} seed={s('l2b')} />
        <Dot x={m1} y={ys[1]} /><Label x={m1} y={ys[1] - 9}>shown</Label>
        <Dot x={m2} y={ys[1]} tone="green" /><Label tone="green" x={m2} y={ys[1] - 9}>saved</Label>
        {/* ③ shown only */}
        <Line pts={[[x0, ys[2]], [xn - 10, ys[2]]]} seed={s('l3a')} />
        <Arrow pts={[[xn + 10, ys[2]], [m1 + 30, ys[2]]]} seed={s('l3')} />
        <Dot x={m1} y={ys[2]} /><Label x={m1} y={ys[2] - 9}>shown</Label>
        <Label x={W / 2 + (P ? 14 : 20)} y={H - 10}>pick by how critical persistence is</Label>
      </Fig>
    </Sized>
  );
}

const KEY_TITLE = 'Two glyphs in Fig 7·c';
const KEY_DESC = 'Reminder of two glyphs. The kafka pipe, as in Lecture 02: it keeps messages and consumers pull from it. The edge server: a box with a small plug mark, meaning a WebSocket server, not a CDN edge.';

export function SendingKey({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'k7-p' : 'k7';
  const s = (k: string) => `${id}-${k}`;
  if (P)
    return (
      <Sized w={300}>
        <Fig id={id} w={300} h={164} title={KEY_TITLE} desc={KEY_DESC}>
          <KafkaPipe x={10} cy={30} w={96} ry={12} seed={s('pipe')} />
          <Label kind="mono" anchor="start" x={124} y={26}>kafka</Label>
          <Label anchor="start" x={124} y={44} size={13}>keeps messages,</Label>
          <Label anchor="start" x={124} y={60} size={13}>consumers pull</Label>
          <EdgeServer x={10} y={98} w={96} h={34} label="edge" seed={s('edge')} />
          <Label kind="mono" anchor="start" x={124} y={110}>edge server</Label>
          <Label anchor="start" x={124} y={128} size={13}>a WebSocket server,</Label>
          <Label anchor="start" x={124} y={144} size={13}>not a CDN edge</Label>
        </Fig>
      </Sized>
    );
  return (
    <Sized w={640}>
      <Fig id={id} w={640} h={70} title={KEY_TITLE} desc={KEY_DESC}>
        <KafkaPipe x={8} cy={30} w={90} ry={12} seed={s('pipe')} />
        <Label kind="mono" anchor="start" x={112} y={26}>kafka</Label>
        <Label anchor="start" x={112} y={44} size={13}>keeps messages, consumers pull</Label>
        <EdgeServer x={340} y={16} w={80} h={32} label="edge" seed={s('edge')} />
        <Label kind="mono" anchor="start" x={434} y={26}>edge server</Label>
        <Label anchor="start" x={434} y={44} size={13}>a WebSocket server, not a CDN edge</Label>
      </Fig>
    </Sized>
  );
}

// Lecture 08 (lec06), §4.6 Fig 4·c "One PHOTO_TAG event, many consumers" (D-07 redraw, board 02:01–02:02,
// frames b_020130, b_020245). The tagging service checks authz (board: RBAC), then publishes one PHOTO_TAG
// event to Kafka; six consumers each pull it. Ledger: L-0218, L-0219; addition A-PTU-06 (the authz note).
// Desktop 880 units; the phone layout puts the consumers in a 2×3 grid at 340.
import React from 'react';
import { Arrow, Box, Label, Pipe, Worker } from '../kit/Kit';
import { Fig } from './floor';

const CONSUMERS = ['search', 'notification', 'analytics', 'profile/activity', 'feed', 'face detection'];
const DESC = 'Before tagging, the tagging service checks with the authorization service: is this person allowed to tag that user? That rule is per user, closer to an access control list than to a role. The tag then becomes one PHOTO_TAG event on Kafka, and every team that cares pulls it: search, notification, analytics, profile and activity, feed and face detection. Kafka is the key component for extensibility: a new consumer needs no change in the tagging service.';

export function PhotoTagEvent({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const id = 'fig4c-p';
    const s = (k: string) => `${id}-${k}`;
    return (
      <Fig id={id} w={340} h={420} title="One PHOTO_TAG event, many consumers" desc={DESC}>
        <Box x={10} y={20} w={110} h={44} label="authz" seed={s('authz')} />
        <Box x={180} y={20} w={150} h={44} label="tagging service" seed={s('svc')} />
        <Arrow tone="blue" pts={[[180, 42], [123, 42]]} seed={s('chk')} />
        <Label anchor="start" x={10} y={90} size={14}>allowed to tag?</Label>
        <Label anchor="start" muted x={10} y={110} size={13}>per-user rule (an ACL), not a role</Label>
        <Arrow tone="blue" dashed pts={[[262, 64], [262, 135]]} seed={s('pub')} />
        <Pipe x={10} cy={150} w={320} ry={14} seed={s('kafka')} />
        <Label kind="mono" x={120} y={155}>PHOTO_TAG</Label>
        <Arrow pts={[[170, 226], [170, 166]]} seed={s('pull')} />
        <Label anchor="start" x={180} y={202} size={14}>each consumer pulls</Label>
        {CONSUMERS.map((c, i) => {
          const col = i % 2, row = Math.floor(i / 2);
          return <Worker key={c} x={col ? 175 : 10} y={232 + row * 50} w={155} h={38} label={c} size={12.5} seed={s('w' + i)} />;
        })}
        <Label x={170} y={406} size={14}>key component for extensibility: Kafka</Label>
      </Fig>
    );
  }
  const id = 'fig4c';
  const s = (k: string) => `${id}-${k}`;
  // consumer widths follow their labels (mono 15, the floor for an 880 figure, ≈ 9.2 units a character, plus the loop mark)
  const widths = CONSUMERS.map((c) => Math.max(80, Math.round(c.length * 9.2 + 38)));
  const gap = 12;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
  let x = (880 - total) / 2;
  const workers = CONSUMERS.map((c, i) => {
    const w = widths[i], wx = x;
    x += w + gap;
    return { c, x: wx, w };
  });
  return (
    <Fig id={id} w={880} h={322} title="One PHOTO_TAG event, many consumers" desc={DESC}>
      <Box x={60} y={36} w={150} h={46} label="authz" seed={s('authz')} />
      <Label muted x={135} y={104} size={13}>per-user rule (an ACL),</Label>
      <Label muted x={135} y={120} size={13}>not a role</Label>
      <Box x={340} y={36} w={180} h={46} label="tagging service" seed={s('svc')} />
      <Arrow tone="blue" pts={[[340, 59], [213, 59]]} seed={s('chk')} />
      <Label x={276} y={49} size={14}>allowed to tag?</Label>
      <Arrow tone="blue" dashed pts={[[430, 82], [430, 145]]} seed={s('pub')} />
      <Label anchor="start" x={446} y={124} size={14}>key component for extensibility: Kafka</Label>
      <Pipe x={30} cy={160} w={820} ry={14} seed={s('kafka')} />
      <Label kind="mono" x={600} y={165}>PHOTO_TAG</Label>
      {workers.map((w, i) => (
        <g key={w.c}>
          <Arrow pts={[[w.x + w.w / 2, 238], [w.x + w.w / 2, 176]]} seed={s('p' + i)} />
          <Worker x={w.x} y={240} w={w.w} h={40} label={w.c} seed={s('w' + i)} />
        </g>
      ))}
      <Label x={440} y={308} size={14}>one event, many consumers: each one pulls</Label>
    </Fig>
  );
}

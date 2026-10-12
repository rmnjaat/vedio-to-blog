// Lecture 01, §5.4, Fig 5·d: WebSockets (D-18 redraw, board frames b_020500, b_020230).
import React from 'react';
import { Arrow, Box, Fig, Label } from '../kit/Kit';
import { ClientWin, Sized, type Layout } from './fig-5a';

export function WebSockets({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5d-p' : 'f5d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 600, H = P ? 190 : 182;
  const bw = P ? 92 : 120, bh = 56, y = 70;
  const cx0 = P ? 12 : 40, sx = W - cx0 - bw;
  const a0 = cx0 + bw, a1 = sx, span = a1 - a0;
  const ly = y + bh / 2;
  const q1 = a0 + span * 0.28, q3 = a0 + span * 0.72;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="WebSockets"
        desc="A client and a server joined by one thick two-way arrow: a bidirectional channel that is kept open. One message travels from the client to the server, and another travels from the server to the client without the client asking: the server speaks first.">
        <ClientWin x={cx0} y={y} w={bw} h={bh} seed={s('c')} />
        <Box x={sx} y={y} w={bw} h={bh} label="api" seed={s('s')} />
        <Label x={(a0 + a1) / 2} y={y - 26}>bidirectional · kept open</Label>
        <Arrow head="both" weight="heavy" pts={[[a0 + 2, ly], [a1 - 2, ly]]} seed={s('ch')} />
        {/* a client message travelling right, above the channel */}
        <Box x={q1 - 22} y={ly - 22} w={12} h={12} seed={s('m1')} />
        <Arrow tone="blue" weight="thin" pts={[[q1 - 4, ly - 16], [q1 + 22, ly - 16]]} seed={s('m1a')} />
        {/* a server message travelling left, below it */}
        <Box x={q3 + 10} y={ly + 10} w={12} h={12} seed={s('m2')} />
        <Arrow tone="blue" weight="thin" pts={[[q3 + 4, ly + 16], [q3 - 22, ly + 16]]} seed={s('m2a')} />
        <Label x={q3} y={ly + 50}>server speaks first</Label>
      </Fig>
    </Sized>
  );
}

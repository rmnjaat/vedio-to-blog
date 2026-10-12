// Lecture 01, §5.5, Fig 5·e: server-sent events (D-19 redraw, board frame b_020645).
// The board's yellow subscribe arrow is graphite here; the event stream is the blue data path.
import React from 'react';
import { Arrow, Box, Fig, Label } from '../kit/Kit';
import { ClientWin, Sized, type Layout } from './fig-5a';

export function ServerSentEvents({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5e-p' : 'f5e';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 600, H = P ? 230 : 216;
  const bw = P ? 92 : 120, bh = 74, y = 50;
  const cx0 = P ? 12 : 40, sx = W - cx0 - bw;
  const a0 = cx0 + bw, a1 = sx, mid = (a0 + a1) / 2;
  const yt = y + 18, yb = y + bh - 18;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="Server-sent events"
        desc="The client sends one request to subscribe. After that the traffic is one-way: the server keeps the connection open and sends a stream of events to the client, which sends nothing back over it. Used for stock tickers and deployment logs.">
        <ClientWin x={cx0} y={y} w={bw} h={bh} seed={s('c')} />
        <Box x={sx} y={y} w={bw} h={bh} label="api" seed={s('s')} />
        <Arrow weight="thin" pts={[[a0, yt], [a1, yt]]} seed={s('sub')} />
        <Label x={mid} y={yt - 10}>subscribe (once)</Label>
        <Arrow tone="blue" pts={[[a1, yb], [a0, yb]]} seed={s('ev')} />
        {[-34, 0, 34].map((d, i) => <Box key={i} x={mid + d - 6} y={yb - 6} w={12} h={12} seed={s('e' + i)} />)}
        <Label tone="blue" x={mid} y={yb + 28}>events</Label>
        <Label x={mid} y={yb + 54}>one-way after that</Label>
        <Label muted x={W / 2} y={H - 14}>tickers · deploy logs</Label>
      </Fig>
    </Sized>
  );
}

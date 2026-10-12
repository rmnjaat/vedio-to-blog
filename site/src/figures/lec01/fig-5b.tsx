// Lecture 01, §5.2, Fig 5·b: short polling (D-16 redraw, board frame b_015500).
import React from 'react';
import { Arrow, Box, Fig, Label, Line } from '../kit/Kit';
import { ClientWin, Sized, type Layout } from './fig-5a';

export function ShortPolling({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5b-p' : 'f5b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 600, H = P ? 262 : 244;
  const bw = P ? 92 : 120, bh = 50, y = 78;
  const cx0 = P ? 12 : 40, sx = W - cx0 - bw;
  const a0 = cx0 + bw, a1 = sx, mid = (a0 + a1) / 2;
  const ly = y + bh / 2;
  const r = P ? [60, 170, 284] : [180, 300, 420]; // the three answers
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="Short polling"
        desc="A client asks the server for the status again and again, every few seconds. Each time it gets an immediate answer: in progress, in progress, and finally ready. All but the last answer are redundant, and each one costs a full HTTP request and response.">
        <ClientWin x={cx0} y={y} w={bw} h={bh} seed={s('c')} />
        <Box x={sx} y={y} w={bw} h={bh} label="api" seed={s('s')} />
        <Arrow head="both" pts={[[a0, ly], [a1, ly]]} seed={s('rr')} />
        {/* the repeat loop above the pair */}
        <Arrow pts={[[mid - 34, ly - 10], [mid - 34, y - 18], [mid + 34, y - 18], [mid + 34, ly - 10]]} weight="thin" seed={s('loop')} />
        <Label x={mid} y={y - 30}>every few seconds</Label>
        <Label kind="mono" x={r[0]} y={y + bh + 40}>in progress</Label>
        <Label kind="mono" x={r[1]} y={y + bh + 40}>in progress</Label>
        <Label kind="mono" tone="green" x={r[2]} y={y + bh + 40}>ready</Label>
        <Line pts={[[r[0] - 50, y + bh + 50], [r[1] + 50, y + bh + 50]]} weight="thin" seed={s('under')} />
        <Label muted x={(r[0] + r[1]) / 2} y={y + bh + 68}>redundant</Label>
        {P ? (
          <>
            <Label x={W / 2} y={232}>cost: an HTTP request</Label>
            <Label x={W / 2} y={250}>+ response, each time</Label>
          </>
        ) : (
          <Label x={W / 2} y={228}>cost: an HTTP request + response, each time</Label>
        )}
      </Fig>
    </Sized>
  );
}

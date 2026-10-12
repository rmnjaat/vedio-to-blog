// Lecture 01, §5.1, Fig 5·a: the usual communication (D-15 redraw, board frame b_015245).
// Small two-box figures in §5 are drawn 1:1 (1 unit = 1 CSS px) and capped at their authored width with <Sized>,
// so the wide figure sheet doesn't blow their lettering up. Each has a 340-unit phone layout (<Desk>/<Phone>).
import React from 'react';
import { Arrow, Box, Client, Fig, Label, Line } from '../kit/Kit';

/** Caps a figure at its authored width (1 unit = 1 CSS px) and centres it on the sheet. */
export function Sized({ w, children }: { w: number; children: React.ReactNode }) {
  return <div style={{ maxWidth: w, margin: '0 auto' }}>{children}</div>;
}

export type Layout = 'wide' | 'phone';

/** The key's client glyph (a browser window) at box size, with `client` written inside in mono.
 *  Used in §5 next to the key's API-server box (chamfered, `api`), so both ends read as the notation key. */
export function ClientWin({ x, y, w, h, seed, label = 'client' }: { x: number; y: number; w: number; h: number; seed: string; label?: string }) {
  return (
    <g>
      <Client x={x} y={y} w={w} h={h} seed={seed} />
      <Label kind="mono" x={x + w / 2} y={y + 9 + (h - 9) / 2 + 5} size={14}>{label}</Label>
    </g>
  );
}

export function UsualComm({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5a-p' : 'f5a';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 600, H = P ? 252 : 236;
  const bw = P ? 92 : 120, bh = 52, y = 64;
  const cx0 = P ? 12 : 40, sx = W - cx0 - bw;
  const a0 = cx0 + bw, a1 = sx, mid = (a0 + a1) / 2;
  const sc = sx + bw / 2;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="The usual communication: request and response"
        desc="A client box and a server box. The client sends a request (REQ) to the server; the server does the heavy lifting, such as database access, computation and authentication, and sends the response (RES) back. The connection is kept open with a timeout.">
        <ClientWin x={cx0} y={y} w={bw} h={bh} seed={s('c')} />
        <Box x={sx} y={y} w={bw} h={bh} label="api" seed={s('s')} />
        <Arrow tone="blue" pts={[[a0, y + 14], [a1, y + 14]]} seed={s('req')} />
        <Label kind="mono" tone="blue" x={mid} y={y + 4}>REQ</Label>
        <Arrow tone="green" pts={[[a1, y + bh - 14], [a0, y + bh - 14]]} seed={s('res')} />
        <Label kind="mono" tone="green" x={mid + 30} y={y + bh + 8}>RES</Label>
        {/* the board's pointer from the response line to its note */}
        <Line pts={[[mid - 30, y + bh - 8], [mid - 30, y + 86]]} weight="thin" seed={s('lead')} />
        <Label x={mid - 30} y={y + 104}>kept open with a timeout</Label>
        <Arrow pts={[[sc, P ? 192 : 184], [sc, y + bh + 6]]} seed={s('heavy')} />
        <Label x={sc} y={P ? 212 : 204}>heavy lifting</Label>
        <Label muted anchor={P ? 'end' : 'middle'} x={P ? W - 6 : sc} y={P ? 232 : 222}>db · compute · auth</Label>
      </Fig>
    </Sized>
  );
}

// Lecture 04 (lec02), chapter 7: small glyphs shared by this chapter's figures, all built from kit parts
// (figures.md §0 "New in this lecture"): the edge server (a box with a two-prong plug mark), the WebSocket line
// (two thin parallel lines, no head), a chat bubble holding a message, and a clock.
import React from 'react';
import { Box, Label, Line, Mark, type Pt } from '../kit/Kit';
import { ellipse } from '../kit/hand';

export type Layout = 'wide' | 'phone';

/** Caps a figure at its authored width (1 unit = 1 CSS px) and centres it on the sheet. */
export function Sized({ w, children }: { w: number; children: React.ReactNode }) {
  return <div style={{ maxWidth: w, margin: '0 auto' }}>{children}</div>;
}

/** Edge server: the WebSocket server users connect to. A box with a small two-prong plug mark at its top-right corner. */
export function EdgeServer({ x, y, w, h, label = 'edge server', seed, size }: { x: number; y: number; w: number; h: number; label?: string; seed: string; size?: number }) {
  const px = x + w - 16;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} label={label} seed={seed} labelSize={size} />
      <Mark a={[px - 4, y]} b={[px - 4, y - 7]} seed={seed + '-p1'} />
      <Mark a={[px + 4, y]} b={[px + 4, y - 7]} seed={seed + '-p2'} />
    </g>
  );
}

/** A WebSocket connection: two thin parallel lines 3 units apart along an orthogonal route. It has no direction. */
export function WsLine({ pts, seed }: { pts: Pt[]; seed: string }) {
  const off = (d: number) => pts.map(([x, y]) => [x + d, y + d] as Pt);
  return (
    <g>
      <Line pts={off(-1.5)} weight="thin" seed={seed + '-a'} />
      <Line pts={off(1.5)} weight="thin" seed={seed + '-b'} />
    </g>
  );
}

/** A small circle (kit ellipse), e.g. a clock face. */
export function Ring({ cx, cy, r, seed, tone = 'ink' }: { cx: number; cy: number; r: number; seed: string; tone?: 'ink' | 'blue' | 'red' | 'green' }) {
  return <path className={`${tone} fillpaper`} d={ellipse(cx, cy, r, r, seed)} />;
}

/** Clock: waiting / a visible delay. */
export function Clock({ cx, cy, r = 13, seed }: { cx: number; cy: number; r?: number; seed: string }) {
  return (
    <g>
      <Ring cx={cx} cy={cy} r={r} seed={seed + '-f'} />
      <Mark a={[cx, cy]} b={[cx, cy - r * 0.62]} seed={seed + '-m'} />
      <Mark a={[cx, cy]} b={[cx + r * 0.45, cy + r * 0.2]} seed={seed + '-h'} />
    </g>
  );
}

/** A message as the user sees it: a chamfered box with the text in mono and a short tail at its bottom-left. */
export function ChatBubble({ x, y, w, h = 40, text, seed }: { x: number; y: number; w: number; h?: number; text: string; seed: string }) {
  return (
    <g>
      <Line pts={[[x + 14, y + h - 1], [x + 10, y + h + 11], [x + 26, y + h - 1]]} seed={seed + '-tail'} />
      <Box x={x} y={y} w={w} h={h} seed={seed} />
      <Label kind="mono" x={x + w / 2} y={y + h / 2 + 5}>{text}</Label>
    </g>
  );
}

/** A user drawn as a letter on a short stub line (for figures that already have three Actors, or phone strips). */
export function UserStub({ x, y, name, seed }: { x: number; y: number; name: string; seed: string }) {
  return (
    <g>
      <Label kind="mono" x={x} y={y + 5}>{name}</Label>
      <Mark a={[x - 8, y + 12]} b={[x + 8, y + 12]} seed={seed} />
    </g>
  );
}

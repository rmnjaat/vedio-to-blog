// Lecture 04 (lec02), chapters 9 and 10: glyphs shared by this writer's figures, all built from kit parts
// (figures.md §0 "New in this lecture"): the edge server (a box with a two-prong plug mark), the WebSocket line
// (two thin parallel lines, no head), the real-time Pub/Sub (a pipe with dotted lanes and a broadcast mark; it never
// holds message squares), the Balancer (a box with a small compass), a user stub, a key (a credential held by a
// server), a clock, a phone outline and a struck-through line.
import React from 'react';
import { Box, Label, Line, Mark, Pipe, type Pt, type Tone } from '../kit/Kit';
import { ellipse } from '../kit/hand';

export type Layout = 'wide' | 'phone';

/** Caps a figure at its authored width (1 unit = 1 CSS px) and centres it on the sheet. */
export function Sized({ w, children }: { w: number; children: React.ReactNode }) {
  return <div style={{ maxWidth: w, margin: '0 auto' }}>{children}</div>;
}

/** Edge server: the WebSocket server users connect to. A box with a two-prong plug mark at its top-right corner. */
export function EdgeServer({ x, y, w, h, label = 'edge server', seed, size = 14 }: {
  x: number; y: number; w: number; h: number; label?: string; seed: string; size?: number;
}) {
  const px = x + w - 16;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} label={label || undefined} seed={seed} labelSize={size} />
      <Mark a={[px - 4, y]} b={[px - 4, y - 7]} seed={seed + '-p1'} />
      <Mark a={[px + 4, y]} b={[px + 4, y - 7]} seed={seed + '-p2'} />
    </g>
  );
}

/** A WebSocket connection: two thin parallel lines 3 units apart. It has no direction. */
export function WsLine({ pts, seed, tone = 'ink' }: { pts: Pt[]; seed: string; tone?: Tone }) {
  const straight = pts.length === 2;
  const vertical = straight && Math.abs(pts[0][0] - pts[1][0]) < Math.abs(pts[0][1] - pts[1][1]);
  const off = (d: number) => pts.map(([x, y]) => (straight ? (vertical ? [x + d, y] : [x, y + d]) : [x + d, y + d]) as Pt);
  return (
    <g>
      <Line pts={off(-1.5)} weight="thin" tone={tone} seed={seed + '-a'} />
      <Line pts={off(1.5)} weight="thin" tone={tone} seed={seed + '-b'} />
    </g>
  );
}

/** A user drawn as a letter on a short stub line (as on the board). */
export function UserStub({ x, y, name, seed, size = 14 }: { x: number; y: number; name: string; seed: string; size?: number }) {
  return (
    <g>
      <Label kind="mono" x={x} y={y + 5} size={size}>{name}</Label>
      <Mark a={[x - 8, y + 12]} b={[x + 8, y + 12]} seed={seed} />
    </g>
  );
}

/** Real-time Pub/Sub: a pipe with three dotted lanes inside (nothing stored) and a broadcast mark on top. */
export function PubSub({ x, cy, w, ry = 14, seed, mark = true }: { x: number; cy: number; w: number; ry?: number; seed: string; mark?: boolean }) {
  const mx = x + w / 2, top = cy - ry;
  const lanes = [-ry * 0.45, 0, ry * 0.45];
  return (
    <g>
      <Pipe x={x} cy={cy} w={w} ry={ry} seed={seed} />
      {lanes.map((d, i) => <Line key={i} dotted weight="thin" pts={[[x + ry * 0.6, cy + d], [x + w - ry * 0.3, cy + d]]} seed={`${seed}-ln${i}`} />)}
      {mark && <g>
        <Mark a={[mx - 7, top - 4]} b={[mx - 14, top - 13]} seed={seed + '-b1'} />
        <Mark a={[mx, top - 5]} b={[mx, top - 16]} seed={seed + '-b2'} />
        <Mark a={[mx + 7, top - 4]} b={[mx + 14, top - 13]} seed={seed + '-b3'} />
      </g>}
    </g>
  );
}

/** A small circle from the kit geometry. */
export function Ring({ cx, cy, r, seed, tone = 'ink' }: { cx: number; cy: number; r: number; seed: string; tone?: Tone }) {
  return <path className={`${tone} fillpaper`} d={ellipse(cx, cy, r, r, seed)} />;
}

/** The Balancer: the service that tells a client which edge server to connect to. A box with a small compass at its
 *  top-left. Not a load balancer: never the narrow lb bar. */
export function Balancer({ x, y, w, h, label = 'balancer', seed, size = 14 }: { x: number; y: number; w: number; h: number; label?: string; seed: string; size?: number }) {
  const cx = x + 14, cy = y + 13;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} />
      <Ring cx={cx} cy={cy} r={6} seed={seed + '-c'} />
      <Mark a={[cx - 3, cy + 3]} b={[cx + 3, cy - 3]} seed={seed + '-n'} />
      <Label kind="mono" x={x + w / 2 + 8} y={y + h / 2 + size * 0.36} size={size}>{label}</Label>
    </g>
  );
}

/** A key: a credential held by a server. Ring at (x, y), shaft to the right, two teeth. About 24 units long. */
export function Key({ x, y, seed, tone = 'ink' }: { x: number; y: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <Ring cx={x} cy={y} r={5} seed={seed + '-r'} tone={tone} />
      <Mark tone={tone} a={[x + 5, y]} b={[x + 24, y]} seed={seed + '-s'} />
      <Mark tone={tone} a={[x + 17, y]} b={[x + 17, y + 5]} seed={seed + '-t1'} />
      <Mark tone={tone} a={[x + 22, y]} b={[x + 22, y + 5]} seed={seed + '-t2'} />
    </g>
  );
}

/** Clock: waiting, a timer, or (crossed out) a client's clock. */
export function Clock({ cx, cy, r = 12, seed }: { cx: number; cy: number; r?: number; seed: string }) {
  return (
    <g>
      <Ring cx={cx} cy={cy} r={r} seed={seed + '-f'} />
      <Mark a={[cx, cy]} b={[cx, cy - r * 0.62]} seed={seed + '-m'} />
      <Mark a={[cx, cy]} b={[cx + r * 0.45, cy + r * 0.2]} seed={seed + '-h'} />
    </g>
  );
}

/** A phone outline: a tall chamfered box with a speaker slit at the top and a home bar at the bottom. */
export function PhoneGlyph({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} />
      <Mark weight="thin" a={[x + w / 2 - 9, y + 9]} b={[x + w / 2 + 9, y + 9]} seed={seed + '-sp'} />
      <Mark weight="thin" a={[x + w / 2 - 12, y + h - 9]} b={[x + w / 2 + 12, y + h - 9]} seed={seed + '-hb'} />
    </g>
  );
}

/** A message as the user sees it: a small chamfered box with the text in mono. */
export function ChatBubble({ x, y, w, h = 28, text, seed, size = 12.5, tone = 'ink' }: {
  x: number; y: number; w: number; h?: number; text: string; seed: string; size?: number; tone?: Tone;
}) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} tone={tone} />
      <Label kind="mono" tone={tone} x={x + w / 2} y={y + h / 2 + size * 0.36} size={size}>{text}</Label>
    </g>
  );
}

/** A deliberate strike-through (graphite unless told otherwise): a slightly rising line, light enough to read through. */
export function Strike({ x0, x1, y, seed, tone = 'ink' }: { x0: number; x1: number; y: number; seed: string; tone?: Tone }) {
  return <Mark tone={tone} a={[x0, y + 3]} b={[x1, y - 3]} seed={seed} />;
}

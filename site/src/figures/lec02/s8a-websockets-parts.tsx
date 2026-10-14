// Lecture 04 (lec02), chapter 8: glyphs shared by this chapter's figures, all built from kit parts
// (figures.md §0 "New in this lecture"): the edge server (a box with a two-prong plug mark) with its connection
// slots, the WebSocket line (two thin parallel lines, no head), the real-time Pub/Sub (a pipe with dotted lanes and a
// broadcast mark; it never holds message squares), the Balancer (a box with a small compass) and a user stub.
import React from 'react';
import { Box, Label, Line, Mark, Pipe, type Pt, type Tone } from '../kit/Kit';
import { chamferRect, ellipse } from '../kit/hand';

export type Layout = 'wide' | 'phone';

/** Caps a figure at its authored width (1 unit = 1 CSS px) and centres it on the sheet. */
export function Sized({ w, children }: { w: number; children: React.ReactNode }) {
  return <div style={{ maxWidth: w, margin: '0 auto' }}>{children}</div>;
}

/** Fades a group to the "carried over" weight used for context parts (figures.md: "at 38%"). */
export function Faded({ children }: { children: React.ReactNode }) {
  return <g style={{ opacity: 0.38 }}>{children}</g>;
}

export type SlotKind = 'empty' | 'user' | 'peer' | 'pubsub';
const SLOT = 9;
const PITCH = 13;

/** One connection slot: outline = free, blue = a user, red = a mesh peer link, graphite = the one Pub/Sub link. */
export function Slot({ x, y, kind, seed }: { x: number; y: number; kind: SlotKind; seed: string }) {
  const tone: Tone = kind === 'user' ? 'blue' : kind === 'peer' ? 'red' : 'ink';
  const fill = kind === 'user' ? 'dot-blue' : kind === 'peer' ? 'dot-red' : kind === 'pubsub' ? 'dot' : 'shape';
  return <path className={`${tone} ${fill}`} d={chamferRect(x, y, SLOT, SLOT, seed, 1.5)} />;
}

/**
 * A server's slot strip: `cap` user slots (the toy limit), the first `users` of them taken, a short red cap tick,
 * then any server-to-server links counted on top (4 + 3 = 7, L-0276).
 */
export function SlotStrip({ x, y, users, extra = [], cap = 4, seed, showEmpty = true }: {
  x: number; y: number; users: number; extra?: ('peer' | 'pubsub')[]; cap?: number; seed: string; showEmpty?: boolean;
}) {
  const capX = x + cap * PITCH + 1;
  return (
    <g>
      {Array.from({ length: cap }, (_, i) => (i < users || showEmpty) &&
        <Slot key={i} x={x + i * PITCH} y={y} kind={i < users ? 'user' : 'empty'} seed={`${seed}-s${i}`} />)}
      <Mark tone="red" a={[capX, y - 4]} b={[capX, y + SLOT + 4]} seed={seed + '-cap'} />
      {extra.map((k, i) => <Slot key={'e' + i} x={capX + 6 + i * PITCH} y={y} kind={k} seed={`${seed}-e${i}`} />)}
    </g>
  );
}
/** x of the i-th slot after the cap tick (for placing a slot in a later step). */
export const extraSlotX = (x: number, i: number, cap = 4) => x + cap * PITCH + 7 + i * PITCH;
export const userSlotX = (x: number, i: number) => x + i * PITCH;

/** Edge server: the WebSocket server users connect to. A box with a two-prong plug mark at its top-right corner.
 *  With `slots` the name sits high and the slot strip runs along the bottom inside the box. */
export function EdgeServer({ x, y, w, h, label = 'edge server', seed, size = 14, slots, faint }: {
  x: number; y: number; w: number; h: number; label?: string; seed: string; size?: number; faint?: boolean;
  slots?: { users: number; extra?: ('peer' | 'pubsub')[]; showEmpty?: boolean };
}) {
  const px = x + w - 16;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} faint={faint} label={slots ? undefined : label} labelSize={size} />
      {slots && <Label kind="mono" x={x + w / 2} y={y + 21} size={size}>{label}</Label>}
      {slots && <SlotStrip x={x + 10} y={y + h - 17} users={slots.users} extra={slots.extra} showEmpty={slots.showEmpty} seed={seed + '-slots'} />}
      <Mark a={[px - 4, y]} b={[px - 4, y - 7]} seed={seed + '-p1'} />
      <Mark a={[px + 4, y]} b={[px + 4, y - 7]} seed={seed + '-p2'} />
    </g>
  );
}

/** A WebSocket connection: two thin parallel lines 3 units apart. It has no direction. */
export function WsLine({ pts, seed, tone = 'ink', dashed }: { pts: Pt[]; seed: string; tone?: Tone; dashed?: boolean }) {
  const vertical = pts.length === 2 && Math.abs(pts[0][0] - pts[1][0]) < Math.abs(pts[0][1] - pts[1][1]);
  const off = (d: number) => pts.map(([x, y]) => (vertical ? [x + d, y] : [x, y + d]) as Pt);
  return (
    <g>
      <Line pts={off(-1.5)} weight="thin" tone={tone} dashed={dashed} seed={seed + '-a'} />
      <Line pts={off(1.5)} weight="thin" tone={tone} dashed={dashed} seed={seed + '-b'} />
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
export function PubSub({ x, cy, w, ry = 14, label, seed, mark = true }: { x: number; cy: number; w: number; ry?: number; label?: string; seed: string; mark?: boolean }) {
  const mx = x + w / 2, top = cy - ry;
  const lanes = [-ry * 0.45, 0, ry * 0.45];
  return (
    <g>
      <Pipe x={x} cy={cy} w={w} ry={ry} label={label} seed={seed} />
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

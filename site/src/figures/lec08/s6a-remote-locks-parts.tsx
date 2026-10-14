// Lecture 05 (lec08), §6–§7: small glyphs shared by the locking figures, built only from kit parts.
// Lock record (key tag), RAM chip, thread mark, and the queue-7 scene (queue, three consumers, lock store)
// that Figs 6·b and 6·c draw in different states. See lectures/lec08/lesson/figures.md §0 and §6.
import React from 'react';
import { Arrow, Box, Bubble, Cyl, Dot, Label, Line, Mark, Queue, TEXT, Worker, type Tone } from '../kit/Kit';
import type { Pt } from '../kit/Kit';

/** Lock record: a key tag (a box with a punched hole) holding mono text, e.g. `queue7 → c1`. */
export function LockTag({ x, y, w, h = 28, text, seed, tone = 'ink', size = TEXT.mono, faint }: {
  x: number; y: number; w: number; h?: number; text: string; seed: string; tone?: Tone; size?: number; faint?: boolean;
}) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} tone={tone} faint={faint} />
      <Dot x={x + 10} y={y + h / 2} tone={tone} />
      <Label kind="mono" tone={tone} x={x + 16 + (w - 16) / 2} y={y + h / 2 + size * 0.36} size={size}>{text}</Label>
    </g>
  );
}

/** A RAM chip: a small box with pins above and below. Centre (cx, cy). */
export function Chip({ cx, cy, w = 56, h = 30, seed, label = 'ram', size = TEXT.small }: {
  cx: number; cy: number; w?: number; h?: number; seed: string; label?: string; size?: number;
}) {
  const x = cx - w / 2, y = cy - h / 2;
  const pins = [1, 2, 3, 4].map((i) => x + (w * i) / 5);
  return (
    <g>
      {pins.map((px, i) => (
        <g key={i}>
          <Mark a={[px, y - 6]} b={[px, y]} weight="thin" seed={`${seed}-pt${i}`} />
          <Mark a={[px, y + h]} b={[px, y + h + 6]} weight="thin" seed={`${seed}-pb${i}`} />
        </g>
      ))}
      <Box x={x} y={y} w={w} h={h} label={label} seed={seed} labelSize={size} />
    </g>
  );
}

/** A thread: a short vertical zigzag. (x, top) is its top; `len` its height. */
export function ThreadMark({ x, top, len = 48, seed }: { x: number; top: number; len?: number; seed: string }) {
  const n = 6, step = len / n;
  const pts: Pt[] = Array.from({ length: n + 1 }, (_, i) => [x + (i === 0 || i === n ? 0 : i % 2 ? 6 : -6), top + i * step]);
  return <Line pts={pts} weight="thin" seed={seed} />;
}

/* ------------------------------------------------------------------ the queue-7 scene */

type Mode = 'race' | 'db' | 'redis';

/**
 * Queue 7 (remote, unprotected) above three consumers; in `db` and `redis` modes a lock store below them.
 * Consumers initiate everything: pop arrows point consumer → queue, lock arrows consumer → store.
 * race: consumers 1 and 2 both pop (red) and get the same message.
 * db:   the store holds `queue7 → c1`; consumer 1 holds the lock (green) and reads (blue); the others wait.
 * redis: the store is Redis, the lock manager; every consumer tries SET NX; consumer 3 has the misconception bubble.
 */
export function QueueScene({ layout, mode, id }: { layout: 'wide' | 'phone'; mode: Mode; id: string }) {
  const P = layout === 'phone';
  const s = (k: string) => `${id}-${k}`;
  const T = P ? 14 : TEXT.label;          // hand lettering
  const M = P ? 14 : TEXT.mono;         // mono lettering
  // geometry
  const qx = P ? 24 : 60, qw = P ? 300 : 480, qy = 40, qh = P ? 36 : 40;
  const cw = P ? 106 : 130, ch = P ? 46 : 44, cy = P ? 140 : 150;
  const CX = P ? [2, 117, 232] : [150, 300, 450];
  const mid = CX.map((x) => x + cw / 2);
  const W = P ? 340 : 700;
  const cBot = cy + ch;
  // lock store (db / redis)
  const sx = W / 2 + (P ? 0 : 15), rx = P ? 36 : 40, top = P ? 236 : 250, sh = P ? 40 : 44;
  const lane = P ? 256 : 272;             // height at which side consumers turn into the store
  const popTone = (i: number): Tone => (mode === 'race' ? (i < 2 ? 'red' : 'ink') : 'blue');
  const pops = mode === 'race' ? [0, 1, 2] : [0];
  return (
    <g>
      <Arrow pts={[[P ? 4 : 18, qy + qh / 2], [qx - 2, qy + qh / 2]]} seed={s('in')} />
      <Queue x={qx} y={qy} w={qw} h={qh} cells={P ? 7 : 10} filled={P ? 5 : 7} seed={s('q')} />
      <Label kind="mono" anchor="start" x={qx} y={28} size={M}>queue 7</Label>
      <Label muted anchor="end" x={qx + qw} y={28} size={T}>remote · unprotected</Label>

      {CX.map((x, i) => (
        <g key={i}>
          {/* phone: the name on two lines, so it clears the worker's loop mark */}
          <Worker x={x} y={cy} w={cw} h={ch} label={P ? '' : `consumer ${i + 1}`} seed={s(`c${i}`)} size={M} />
          {P && <Label kind="mono" x={x + (cw - 16) / 2} y={cy + 19} size={M}>consumer</Label>}
          {P && <Label kind="mono" x={x + (cw - 16) / 2} y={cy + 37} size={M}>{String(i + 1)}</Label>}
        </g>
      ))}
      {pops.map((i) => <Arrow key={i} tone={popTone(i)} pts={[[mid[i], cy], [mid[i], qy + qh + 2]]} seed={s(`pop${i}`)} />)}
      <Label kind="mono" tone={mode === 'race' ? 'red' : 'blue'} anchor="start" x={mid[0] + 8} y={P ? 112 : 120} size={M}>pop()</Label>

      {mode === 'race' && (
        <g>
          {[0, 1].map((i) => <Label key={i} kind="mono" tone="red" x={mid[i]} y={cBot + (P ? 20 : 24)} size={M}>got msg 1</Label>)}
          <Label tone="red" x={W / 2} y={P ? 236 : 252} size={P ? 14.5 : 15}>two consumers, one message</Label>
          <Label muted x={W / 2} y={P ? 258 : 274} size={T}>no lock, and no access to the queue’s server</Label>
        </g>
      )}

      {mode !== 'race' && (
        <g>
          <Arrow tone={mode === 'db' ? 'green' : 'ink'} pts={[[mid[0], cBot], [mid[0], lane], [sx - rx - 2, lane]]} seed={s('l0')} />
          <Arrow pts={[[mid[1], cBot], [mid[1], top - rx * 0.26 - 2]]} seed={s('l1')} />
          <Arrow pts={[[mid[2], cBot], [mid[2], lane], [sx + rx + 2, lane]]} seed={s('l2')} />
          <Cyl cx={sx} top={top} rx={rx} h={sh} seed={s('store')} />
          <Label kind="mono" x={sx} y={top + sh - (P ? 10 : 12)} size={M}>{mode === 'db' ? 'db' : 'redis'}</Label>
        </g>
      )}

      {mode === 'db' && (
        <g>
          <Label tone="green" anchor="start" x={mid[0] + 8} y={P ? 214 : 232} size={T}>holds it</Label>
          <Label muted anchor="start" x={mid[1] + 8} y={P ? 206 : 222} size={T}>wait</Label>
          <Label muted anchor="end" x={mid[2] - 8} y={P ? 214 : 232} size={T}>wait</Label>
          <LockTag x={P ? 86 : 265} y={P ? 304 : 322} w={P ? 168 : 200} text="queue7 → c1" seed={s('tag')} size={M} />
          <Line pts={[[sx, top + sh + rx * 0.26 + 1], [sx, P ? 304 : 322]]} weight="thin" seed={s('tagl')} />
          <Label anchor="start" x={P ? 262 : 476} y={P ? 323 : 341} size={P ? 14 : 15}>+ TTL</Label>
          <Label muted x={W / 2 + (P ? 0 : 15)} y={P ? 354 : 374} size={T}>{P ? 'expires on its own' : 'the entry expires on its own'}</Label>
          <Label x={P ? W / 2 : 150} y={P ? 376 : 341} size={T}>{P ? 'the store needs: k,v · atomic · TTL' : 'needs: k,v · atomic · TTL'}</Label>
        </g>
      )}

      {mode === 'redis' && (
        <g>
          <Label kind="mono" anchor="start" x={mid[0] + 8} y={P ? 214 : 236} size={M}>SET NX</Label>
          <Label anchor="start" x={sx + rx + (P ? 8 : 10)} y={P ? 296 : 302} size={T}>lock manager</Label>
          <Line pts={[[sx, top + sh + rx * 0.26 + 1], [sx, P ? 314 : 322]]} weight="thin" seed={s('tagl')} />
          <LockTag x={P ? 45 : 225} y={P ? 314 : 322} w={P ? 250 : 280} text="queue7 : consumer 1  ex 300" seed={s('tag')} size={M} />
          <Bubble x={P ? 196 : 452} y={P ? 82 : 90} w={P ? 140 : 150} h={P ? 46 : 46} tail={[mid[2], cy - 2]}
            lines={['I’ll just', 'delete the key.']} seed={s('bub')} size={P ? 14 : 13.5} />
        </g>
      )}
    </g>
  );
}

// Lecture 07 (lec09), chapters 4–5: small glyphs used by this writer's figures (figures.md §0), built only from kit
// parts. S3 bucket (a cloud with a bucket mark), private-bucket lock, photo bytes chip, URL key tag with an expiry
// clock, a browser-window mock and a ruled table block.
import React from 'react';
import { Box, Cloud, Dot, Label, Line, Num, TEXT, type Tone } from './kit';

/** S3 / GCS: the board's cloud with a small bucket mark in its lower half. The CDN cloud never has the mark. */
export function Bucket({ cx, cy, w = 120, h = 70, seed, label = 's3', size = TEXT.mono }: {
  cx: number; cy: number; w?: number; h?: number; seed: string; label?: string; size?: number;
}) {
  const by = cy + 2;
  return (
    <g>
      <Cloud cx={cx} cy={cy} w={w} h={h} seed={seed} />
      <Label kind="mono" x={cx} y={cy - 4} size={size}>{label}</Label>
      <Line pts={[[cx - 11, by + 4], [cx + 11, by + 4]]} seed={seed + '-bt'} weight="thin" />
      <Line pts={[[cx - 11, by + 4], [cx - 8, by + 16], [cx + 8, by + 16], [cx + 11, by + 4]]} seed={seed + '-bb'} weight="thin" />
    </g>
  );
}

/** Private lock: a 12×9 box with a thin arc (shackle) above it. (x, y) is the box's top-left. */
export function Lock({ x, y, seed, tone = 'ink' }: { x: number; y: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <Line pts={[[x + 3, y], [x + 3, y - 5], [x + 9, y - 5], [x + 9, y]]} seed={seed + '-sh'} weight="thin" tone={tone} />
      <Box x={x} y={y} w={12} h={9} seed={seed + '-b'} tone={tone} />
    </g>
  );
}

/** Photo bytes: a small box with a dot, drawn only where the photo itself travels. */
export function PhotoChip({ x, y, tone = 'blue', seed }: { x: number; y: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <Box x={x - 8} y={y - 6} w={16} h={12} seed={seed} tone={tone} />
      <Dot x={x - 1} y={y} tone={tone} />
    </g>
  );
}

/** A small clock: a ring and two hands = expiry. */
export function Clock({ x, y, seed }: { x: number; y: number; seed: string }) {
  return (
    <g>
      <Num x={x} y={y} n=" " size={14} />
      <Line pts={[[x, y], [x, y - 6]]} seed={seed + '-h1'} weight="thin" />
      <Line pts={[[x, y], [x + 5, y + 2]]} seed={seed + '-h2'} weight="thin" />
    </g>
  );
}

/** URL key tag: a chamfered tag with a hole at its left end holding a mono URL fragment; a clock beside it. */
export function KeyTag({ x, y, w, text, seed, clock = true, size = 14, tone = 'ink' }: {
  x: number; y: number; w: number; text: string; seed: string; clock?: boolean; size?: number; tone?: Tone;
}) {
  const h = 24;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} tone={tone} />
      <Dot x={x + 8} y={y + h / 2} />
      <Label kind="mono" anchor="start" x={x + 16} y={y + h / 2 + size * 0.36} size={size}>{text}</Label>
      {clock && <Clock x={x + w + 15} y={y + h / 2} seed={seed + '-c'} />}
    </g>
  );
}

/** Browser-window mock: an outline with a bar 18 units under its top edge, the URL in mono in the bar.
 *  `dashed` = a private window. */
export function Window({ x, y, w, h, url, seed, dashed, size = 14 }: {
  x: number; y: number; w: number; h: number; url?: string; seed: string; dashed?: boolean; size?: number;
}) {
  return (
    <g>
      {dashed
        ? <Line pts={[[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]} dashed seed={seed} />
        : <Box x={x} y={y} w={w} h={h} seed={seed} />}
      <Line pts={[[x, y + 20], [x + w, y + 20]]} weight="thin" seed={seed + '-bar'} dashed={dashed} />
      {url && <Label kind="mono" anchor="start" x={x + 8} y={y + 15} size={size}>{url}</Label>}
    </g>
  );
}

/** A photo tile: a box with a little mountain and a sun. */
export function PhotoTile({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} />
      <Line pts={[[x + w * 0.12, y + h * 0.82], [x + w * 0.4, y + h * 0.45], [x + w * 0.58, y + h * 0.68], [x + w * 0.7, y + h * 0.56], [x + w * 0.88, y + h * 0.82]]}
        weight="thin" seed={seed + '-m'} />
      <Dot x={x + w * 0.74} y={y + h * 0.28} />
    </g>
  );
}

/** Ruled table block: a header row with the table name, then one row per entry (mono). Returns row centres via rowY. */
export function TableBlock({ x, y, w, name, rows, rowH = 34, seed, size = TEXT.mono }: {
  x: number; y: number; w: number; name: string; rows: string[]; rowH?: number; seed: string; size?: number;
}) {
  const head = 32;
  return (
    <g>
      <Box x={x} y={y} w={w} h={head + rows.length * rowH} seed={seed} />
      <Label kind="mono" x={x + w / 2} y={y + head / 2 + size * 0.36} size={size}>{name}</Label>
      <Line pts={[[x, y + head], [x + w, y + head]]} seed={seed + '-h'} />
      {rows.map((r, i) => (
        <g key={i}>
          {i > 0 && <Line pts={[[x + 6, y + head + i * rowH], [x + w - 6, y + head + i * rowH]]} weight="thin" seed={`${seed}-r${i}`} />}
          <Label kind="mono" anchor="start" x={x + 12} y={y + head + i * rowH + rowH / 2 + size * 0.36} size={size}>{r}</Label>
        </g>
      ))}
    </g>
  );
}
export const tableRowY = (y: number, i: number, rowH = 34) => y + 32 + i * rowH + rowH / 2;

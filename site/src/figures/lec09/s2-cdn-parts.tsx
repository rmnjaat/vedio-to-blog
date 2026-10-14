// Lecture 07 (lec09), chapters 1–2 (writer w1): glyphs the kit does not have yet. Photo bytes chip, S3 bucket (a cloud
// with a bucket mark), DNS box with a folded corner, network-card bandwidth bar, CDN cache slot, tick, ring, phone
// screen, URL key tag with an expiry clock. Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same
// seeded wobble, same stroke family as every other figure.
import React from 'react';
import { chamferRect, ellipse, poly } from '../kit/hand';
import { Cloud, Label, TEXT, type Tone } from './kit';

const fillClass = (tone: Tone) => (tone === 'ink' ? 'ink dot' : `${tone} dot-${tone}`);

/** The photo's bytes: a small filled rectangle (the board's photo icon). Only where the bytes actually travel. */
export function PhotoChip({ x, y, w = 14, h = 10, tone = 'blue', seed }: { x: number; y: number; w?: number; h?: number; tone?: Tone; seed: string }) {
  return <path className={fillClass(tone)} d={chamferRect(x, y, w, h, seed, 1.5)} />;
}

/** S3 / GCS bucket: a cloud (as the board draws it) with a small bucket mark in its lower half. Never confuse with the
 *  CDN cloud, which has no mark. Label sits in the upper half. */
export function Bucket({ cx, cy, w = 96, h = 58, seed, label = 's3', size = TEXT.mono }: { cx: number; cy: number; w?: number; h?: number; seed: string; label?: string; size?: number }) {
  const by = cy + 2, bw = 22, bb = 16, bh = 12;
  return (
    <g>
      <Cloud cx={cx} cy={cy} w={w} h={h} seed={seed} />
      {label && <Label kind="mono" x={cx} y={cy - 4} size={size}>{label}</Label>}
      <path className="ink thin" d={poly([[cx - bw / 2, by], [cx - bb / 2, by + bh], [cx + bb / 2, by + bh], [cx + bw / 2, by]], seed + '-bk')} />
      <path className="ink thin" d={poly([[cx - bw / 2, by], [cx + bw / 2, by]], seed + '-bt')} />
    </g>
  );
}

/** DNS: a small box with its top-right corner folded. */
export function DnsBox({ x, y, w = 56, h = 34, seed, size = TEXT.mono }: { x: number; y: number; w?: number; h?: number; seed: string; size?: number }) {
  const c = 9;
  return (
    <g>
      <path className="ink shape" d={poly([[x, y], [x + w - c, y], [x + w, y + c], [x + w, y + h], [x, y + h]], seed, true)} />
      <path className="ink thin" d={poly([[x + w - c, y], [x + w - c, y + c], [x + w, y + c]], seed + '-f')} />
      <Label kind="mono" x={x + w / 2 - 2} y={y + h / 2 + size * 0.36} size={size}>dns</Label>
    </g>
  );
}

/** A network card's bandwidth: a thin gauge with a fill; red at the limit, with a tick at the right end. */
export function BandwidthBar({ x, y, w = 80, h = 10, fill, tone = 'ink', seed }: { x: number; y: number; w?: number; h?: number; fill: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={fillClass(tone)} d={chamferRect(x + 2, y + 2, Math.max(2, (w - 4) * fill), h - 4, seed + '-in', 1)} />
      <path className="ink" d={chamferRect(x, y, w, h, seed, 1.5)} />
      <path className={tone === 'red' ? 'red' : 'ink'} d={poly([[x + w, y - 5], [x + w, y + h + 5]], seed + '-c')} />
    </g>
  );
}

/** The CDN's cache slot: a small box (one row), empty or holding a photo chip. (x, y) = top-left. */
export function CacheSlot({ x, y, w = 30, h = 18, filled = false, tone = 'green', seed }: { x: number; y: number; w?: number; h?: number; filled?: boolean; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className="ink thin fillpaper" d={chamferRect(x, y, w, h, seed, 2)} />
      {filled && <PhotoChip x={x + (w - 14) / 2} y={y + (h - 10) / 2} tone={tone} seed={seed + '-c'} />}
    </g>
  );
}

/** A hand tick. */
export function Tick({ x, y, tone = 'green', seed, s = 1 }: { x: number; y: number; tone?: Tone; seed: string; s?: number }) {
  return <path className={tone} d={poly([[x - 6 * s, y - 1 * s], [x - 1.5 * s, y + 4 * s], [x + 7 * s, y - 6 * s]], seed)} />;
}

/** A hand ring around something (graphite emphasis; red only for failure). */
export function Ring({ x, y, rx, ry, tone = 'ink', seed }: { x: number; y: number; rx: number; ry?: number; tone?: Tone; seed: string }) {
  return <path className={`${tone} thin`} d={ellipse(x, y, rx, ry ?? rx * 0.6, seed)} />;
}

/** A hand box drawn round a stretch of text (graphite emphasis). */
export function TextBox({ x0, x1, y, h = 20, tone = 'ink', seed }: { x0: number; x1: number; y: number; h?: number; tone?: Tone; seed: string }) {
  return <path className={`${tone} thin`} d={chamferRect(x0, y - h / 2, x1 - x0, h, seed, 2)} />;
}

/** A paper patch behind labels that sit on lifelines or lines (stroke halos don't paint; this does). */
export function Paper({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return <path className="fillpaper" d={chamferRect(x, y, w, h, seed, 1)} />;
}

/** An app screen: a tall chamfered box with a speaker slot. */
export function PhoneScreen({ x, y, w = 30, h = 56, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 6)} />
      <path className="ink thin" d={poly([[x + w / 2 - 7, y + 6], [x + w / 2 + 7, y + 6]], seed + '-s')} />
    </g>
  );
}

/** A small clock: circle with two hands (expiry). */
export function Clock({ cx, cy, r = 8, tone = 'ink', seed }: { cx: number; cy: number; r?: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={`${tone} fillpaper`} d={ellipse(cx, cy, r, r, seed)} />
      <path className={`${tone} thin`} d={poly([[cx, cy], [cx, cy - r * 0.62]], seed + '-m')} />
      <path className={`${tone} thin`} d={poly([[cx, cy], [cx + r * 0.5, cy + r * 0.12]], seed + '-h')} />
    </g>
  );
}

/** A URL key tag: a chamfered tag with a hole at its left end, holding a mono fragment, and an expiry clock beside it. */
export function KeyTag({ x, y, w, h = 22, text, seed, size = TEXT.small, clock = true }: { x: number; y: number; w: number; h?: number; text?: string; seed: string; size?: number; clock?: boolean }) {
  return (
    <g>
      <path className="ink shape" d={poly([[x, y + h / 2], [x + 8, y], [x + w, y], [x + w, y + h], [x + 8, y + h]], seed, true)} />
      <path className="ink thin" d={ellipse(x + 9, y + h / 2, 2.6, 2.6, seed + '-o')} />
      {text && <Label kind="mono" anchor="start" x={x + 16} y={y + h / 2 + size * 0.36} size={size}>{text}</Label>}
      {clock && <Clock cx={x + w + 14} cy={y + h / 2} r={8} seed={seed + '-k'} />}
    </g>
  );
}

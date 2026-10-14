// Lecture 10 (lec10), chapter 7 (7.1–7.4): Fig 7·a (D-13 redraw: a magnetic disk and the speed scale),
// Fig 7·b (D-14 redraw: append only, state a in 7.2 and state b with the map in 7.4), the §7 rule-box sketch
// (append, no matter what) and Fig 7·c (new StepThrough: crash and rebuild).
// Specs: lectures/lec10/lesson/figures.md §7. Parts: ./s6a-switching-servers-parts.
import React from 'react';
import { Arrow, Cross, Dot, Label, Line, Mark, Num, Step, StepState } from '../kit/Kit';
import type { Pt, Tone } from '../kit/Kit';
import { chamferRect, poly } from '../kit/hand';
import { Fig, Platter, RowFile, Tick, type Layout, type Row } from './s6a-switching-servers-parts';

/* ------------------------------------------------------------------ Fig 7·a: a magnetic disk */

function DiskPanel({ x0, y0, w, s }: { x0: number; y0: number; w: number; s: (k: string) => string }) {
  const cx = x0 + w * 0.42, cy = y0 + 104, rx = w * 0.36, ry = 52;
  const arc: Pt[] = Array.from({ length: 9 }, (_, i) => {
    const d = ((200 + i * 6) * Math.PI) / 180;
    return [cx + Math.cos(d) * rx * 1.1, cy + Math.sin(d) * ry * 1.22];
  });
  const tip: Pt = [cx + rx * 0.5, cy + 6];
  return (
    <g>
      <Platter cx={cx} cy={cy} rx={rx} ry={ry} seed={s('pl')} />
      <Arrow pts={arc} weight="thin" seed={s('spin')} />
      <Label anchor="start" x={x0 + 14} y={y0 + 34}>spins</Label>
      {/* the head arm reaches in from the right */}
      <Line pts={[[x0 + w - 8, y0 + 30], [tip[0] + 10, tip[1] - 4]]} seed={s('arm')} />
      <path className="ink shape" d={chamferRect(tip[0] - 4, tip[1] - 9, 16, 10, s('tip'), 2)} />
      <Label anchor="end" x={x0 + w - 8} y={y0 + 22}>head</Label>
      <Label kind="mono" x={cx} y={cy + ry + 22} size={13}>sector</Label>
      <Label tone="red" x={x0 + w / 2} y={y0 + 206}>moving the head = the slow part</Label>
      <Label x={x0 + w / 2} y={y0 + 232}>byte offset → disk · sector · offset in it</Label>
      <Label kind="title" x={x0 + w / 2} y={y0 + 268}>a magnetic disk</Label>
    </g>
  );
}

function SpeedPanel({ x0, y0, w, s }: { x0: number; y0: number; w: number; s: (k: string) => string }) {
  const y = y0 + 110, a = x0 + 12, b = x0 + w - 12;
  const at = (k: number) => a + (b - a) * k;
  return (
    <g>
      <Arrow head="both" pts={[[a, y], [b, y]]} weight="thin" seed={s('sc')} />
      {[0.06, 0.32, 0.9].map((k, i) => <Mark key={i} a={[at(k), y - 8]} b={[at(k), y + 8]} seed={s('t' + i)} />)}
      <Label kind="mono" x={at(0.06) + 20} y={y - 18}>memory</Label>
      <Label kind="mono" x={at(0.32)} y={y + 28}>SSD</Label>
      <Label kind="mono" x={at(0.9) - 4} y={y - 18}>HDD</Label>
      <Label anchor="start" x={a} y={y0 + 182}>← faster, costlier</Label>
      <Label anchor="end" x={b} y={y0 + 206}>slower, cheaper →</Label>
      <Label kind="title" x={x0 + w / 2} y={y0 + 268}>where SSDs sit</Label>
    </g>
  );
}

export function MagneticDisk({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f7a-p' : 'l10-f7a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'A magnetic disk';
  const desc = 'On a magnetic disk a head moves over a spinning platter to reach a sector; a byte offset in a file becomes a disk, a sector and an offset inside it, and that mechanical movement is the slow part of disk I/O. On the speed scale SSDs sit closer to memory than hard disks, in speed and in cost.';
  if (P)
    return (
      <Fig id={id} w={340} h={500} title={title} desc={desc}>
        <DiskPanel x0={0} y0={0} w={340} s={s} />
        <Line pts={[[30, 290], [310, 290]]} seed={s('div')} className="faint" />
        <SpeedPanel x0={10} y0={220} w={320} s={s} />
      </Fig>
    );
  return (
    <Fig id={id} w={700} h={282} title={title} desc={desc}>
      <DiskPanel x0={0} y0={0} w={400} s={s} />
      <Line pts={[[410, 30], [410, 250]]} seed={s('div')} className="faint" />
      <SpeedPanel x0={420} y0={0} w={270} s={s} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·b: append only, with a map */

const PUTS = ['PUT K1 V1', 'PUT K2 V2', 'PUT K3 V3', 'PUT K1 V1′'];
const SLOGAN = ['append only', 'zero seek', 'no big mechanical movement', 'best we can do!!'];

/** The in-memory map: a box titled `in-mem` with mono rows. */
function MemMap({ x, y, w, rows, seed, tone }: { x: number; y: number; w: number; rows: { text: string; tone?: Tone; muted?: boolean; strike?: boolean }[]; seed: string; tone?: Tone }) {
  const h = 40 + Math.max(rows.length, 2) * 28;
  return (
    <g>
      <path className={`${tone ?? 'ink'} shape`} d={chamferRect(x, y, w, h, seed)} />
      <Label kind="mono" x={x + w / 2} y={y + 22}>in-mem</Label>
      <path className="ink thin" d={poly([[x + 8, y + 32], [x + w - 8, y + 32]], seed + '-hd')} />
      {rows.map((r, i) => (
        <g key={i}>
          <Label kind="mono" tone={r.tone} muted={r.muted} x={x + w / 2} y={y + 56 + i * 28}>{r.text}</Label>
          {r.strike && <path className="red thin" d={poly([[x + 16, y + 51 + i * 28], [x + w - 16, y + 51 + i * 28]], `${seed}-s${i}`)} />}
        </g>
      ))}
    </g>
  );
}

/** offsets O1… beside a file's rows */
function Offsets({ x, y, n, rowH, anchor = 'start' }: { x: number; y: number; n: number; rowH: number; anchor?: 'start' | 'end' }) {
  return <g>{Array.from({ length: n }, (_, i) => <Label key={i} anchor={anchor} x={x} y={y + rowH * i + rowH / 2 + 5} size={13}>{`O${i + 1}`}</Label>)}</g>;
}

export function AppendOnly({ layout = 'desk', state = 'a' }: { layout?: Layout; state?: 'a' | 'b' }) {
  const P = layout === 'phone';
  const B = state === 'b';
  const id = `l10-f7b${B ? 'b' : 'a'}${P ? '-p' : ''}`;
  const s = (k: string) => `${id}-${k}`;
  const title = B ? 'Append only, with a map to the latest entry' : 'Append only';
  const desc = B
    ? 'Every put, update and delete is appended to the end of one file; delete is a put with the value −1. An in-memory map points each key at the offset of its latest entry: K3 at O3, K1 at O4, and K2 removed.'
    : 'Each put is appended to the end of one file, in order: K1 V1, K2 V2, K3 V3, then the update K1 V1′. Nothing is overwritten; the old K1 entry stays and is obsolete. The disk head is already at the end, so there is no seek.';
  const rows: Row[] = [{ text: 'K1 V1', muted: B }, { text: 'K2 V2', muted: B }, { text: 'K3 V3' }, { text: 'K1 V1′' }];
  if (B) rows.push({ text: 'K2 −1' });
  const rowH = 34;

  if (P) {
    const fx = B ? 196 : 120, fy = B ? 112 : 112, fw = 100;
    const tail = fy + rowH * rows.length + rowH / 2;
    return (
      <Fig id={id} w={340} h={B ? 400 : 430} title={title} desc={desc}>
        {PUTS.map((p, i) => <Label key={p} kind="mono" anchor="start" x={14 + (i % 2) * 168} y={24 + Math.floor(i / 2) * 24}>{p}</Label>)}
        {B && <Label kind="mono" anchor="start" x={14} y={84}>DEL K2 = PUT(K2, −1)</Label>}
        <RowFile x={fx} y={fy} w={fw} rows={rows} rowH={rowH} extra={1} align="middle" seed={s('file')} />
        <Dot x={fx} y={fy + 2} />
        {B ? (
          <g>
            <Offsets x={fx + fw + 8} y={fy} n={5} rowH={rowH} />
            <MemMap x={10} y={fy + 20} w={128} rows={[{ text: 'K3 → O3' }, { text: 'K1 → O4' }]} seed={s('map')} />
            <Dot x={138} y={fy + 71} />
            <Arrow pts={[[138, fy + 71], [166, fy + 71], [166, fy + rowH * 2.5], [fx - 2, fy + rowH * 2.5]]} seed={s('p3')} />
            <Dot x={138} y={fy + 99} />
            <Arrow pts={[[138, fy + 99], [166, fy + 99], [166, fy + rowH * 3.5], [fx - 2, fy + rowH * 3.5]]} seed={s('p1')} />
            <Label x={74} y={fy + 160}>no K2: deleted</Label>
            <Label x={170} y={fy + rowH * 6 + 34}>append only · zero seek</Label>
          </g>
        ) : (
          <g>
            <Arrow pts={[[fx + fw + 44, tail], [fx + fw + 4, tail]]} seed={s('app')} />
            <Label anchor="start" x={fx + fw + 10} y={tail - 12}>append</Label>
            {SLOGAN.map((t, i) => <Label key={t} x={170} y={fy + rowH * 5 + 42 + i * 22}>{t}</Label>)}
          </g>
        )}
      </Fig>
    );
  }

  const fx = B ? 380 : 220, fy = 30, fw = 110;
  const tail = fy + rowH * rows.length + rowH / 2;
  return (
    <Fig id={id} w={B ? 600 : 620} h={B ? 300 : 236} title={title} desc={desc}>
      {PUTS.map((p, i) => <Label key={p} kind="mono" anchor="start" x={20} y={fy + 22 + i * 30}>{p}</Label>)}
      {B && <Label kind="mono" anchor="start" x={20} y={fy + 22 + 4 * 30 + 16}>DEL K2 = PUT(K2, −1)</Label>}
      <RowFile x={fx} y={fy} w={fw} rows={rows} rowH={rowH} extra={1} align="middle" seed={s('file')} />
      <Dot x={fx} y={fy + 2} />
      {B ? (
        <g>
          <Offsets x={fx + fw + 10} y={fy} n={5} rowH={rowH} />
          {/* K3 is listed first (as in Fig 8·a), so the upper row points at the upper entry and the two
              connectors never cross: K3 → O3 (row 3), K1 → O4 (row 4) */}
          <MemMap x={196} y={fy + 20} w={130} rows={[{ text: 'K3 → O3' }, { text: 'K1 → O4' }]} seed={s('map')} />
          <Dot x={326} y={fy + 71} />
          <Arrow pts={[[326, fy + 71], [352, fy + 71], [352, fy + rowH * 2.5], [fx - 2, fy + rowH * 2.5]]} seed={s('p3')} />
          <Dot x={326} y={fy + 99} />
          <Arrow pts={[[326, fy + 99], [352, fy + 99], [352, fy + rowH * 3.5], [fx - 2, fy + rowH * 3.5]]} seed={s('p1')} />
          <Label x={261} y={fy + 162}>no K2: deleted</Label>
          <Label x={fx + fw / 2} y={fy + rowH * 6 + 30}>append only · zero seek</Label>
        </g>
      ) : (
        <g>
          <Arrow pts={[[fx + fw + 46, tail], [fx + fw + 4, tail]]} seed={s('app')} />
          <Label anchor="start" x={fx + fw + 52} y={tail + 5}>append</Label>
          {SLOGAN.map((t, i) => <Label key={t} anchor="start" x={fx + fw + 52} y={fy + 22 + i * 26}>{t}</Label>)}
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §7 */

export function AppendSketch({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule7-p' : 'l10-rule7';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 300 : 480, cw = P ? 34 : 54, x0 = P ? 14 : 40, n = 6, y = 58, h = 28;
  const end = x0 + cw * n;
  return (
    <Fig id={id} w={W} h={P ? 140 : 130} title="Append, no matter what"
      desc="An append-only file: a write goes only into the empty slot at its end; a write into the middle is crossed out. Reads can go anywhere.">
      <path className="ink shape" d={chamferRect(x0, y, cw * n, h, s('bar'), 2)} />
      {Array.from({ length: n - 1 }, (_, i) => <Mark key={i} a={[x0 + cw * (i + 1), y + 3]} b={[x0 + cw * (i + 1), y + h - 3]} weight="thin" seed={s('c' + i)} />)}
      <Line dotted pts={[[end, y], [end + cw, y], [end + cw, y + h], [end, y + h]]} seed={s('free')} />
      <Arrow pts={[[end + cw / 2, y - 34], [end + cw / 2, y - 4]]} seed={s('ok')} />
      <Tick x={end + cw / 2 + 14} y={y - 14} seed={s('tk')} />
      <Arrow pts={[[x0 + cw * 2.5, y - 34], [x0 + cw * 2.5, y - 4]]} seed={s('bad')} />
      <Cross x={x0 + cw * 2.5} y={y - 20} size={20} seed={s('x')} />
      {P ? (
        <g>
          <Label x={150} y={y + h + 28}>read anywhere ·</Label>
          <Label x={150} y={y + h + 48}>write only at the end</Label>
        </g>
      ) : <Label x={(x0 + end + cw) / 2} y={y + h + 30}>read anywhere · write only at the end</Label>}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·c: crash and rebuild */

const FILE7: Row[] = [{ text: 'K1 V1' }, { text: 'K2 V2' }, { text: 'K3 V3' }, { text: 'K1 V1′' }, { text: 'K2 −1' }];
const LOG = ['serving', 'power lost', 'restart: scan from the top', 'later entries win', 'serving again'];

export function CrashRebuild({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f7c-p' : 'l10-f7c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Crash and rebuild';
  const desc = 'The store serves with an in-memory map pointing K1 at O4 and K3 at O3. The machine dies and the map is gone, but the file is safe on disk. On restart the store reads the file from the top: K1 points at O1, K2 at O2, K3 at O3, then K1 moves to O4 and K2’s −1 removes it. The map is back as it was; the full scan is why a restart is slow.';
  const rowH = 34;
  const g = P
    ? { W: 340, H: 470, mx: 10, my: 20, mw: 136, fx: 190, fy: 20, lx: 20, ly: 252 }
    : { W: 420, H: 452, mx: 4, my: 20, mw: 136, fx: 236, fy: 20, lx: 14, ly: 256 }; // step column ~420px
  const fw = 96;
  const cy = (i: number) => g.fy + rowH * i + rowH / 2;
  const caret = (i: number, tone: Tone = 'blue') => (
    <Arrow tone={tone} pts={[[g.fx + fw + 40, cy(i)], [g.fx + fw + 4, cy(i)]]} seed={s('c' + i)} />
  );
  const mapAt = (rows: Parameters<typeof MemMap>[0]['rows'], tone?: Tone) => (
    <MemMap x={g.mx} y={g.my} w={g.mw} rows={rows} tone={tone} seed={s('map')} />
  );
  return (
    <Fig id={id} w={g.W} h={g.H} title={title} desc={desc}>
      <RowFile x={g.fx} y={g.fy} w={fw} rows={FILE7} rowH={rowH} align="middle" seed={s('file')} name="on disk" />
      <Offsets x={g.fx - 8} y={g.fy} n={5} rowH={rowH} anchor="end" />

      <StepState from={1} to={1}>{mapAt([{ text: 'K1 → O4' }, { text: 'K3 → O3' }])}</StepState>
      <StepState from={2} to={2}>
        {mapAt([{ text: 'K1 → O4', muted: true }, { text: 'K3 → O3', muted: true }], 'red')}
        <Cross x={g.mx + g.mw / 2} y={g.my + 62} size={46} seed={s('x')} />
      </StepState>
      <StepState from={3} to={3}>
        {mapAt([{ text: 'K1 → O1' }, { text: 'K2 → O2' }, { text: 'K3 → O3' }])}
        {caret(0)}{caret(1)}{caret(2)}
      </StepState>
      <StepState from={4} to={4}>
        {mapAt([{ text: 'K1 → O4', tone: 'blue' }, { text: 'K2 → O2', strike: true, muted: true }, { text: 'K3 → O3' }])}
        {caret(3)}{caret(4)}
      </StepState>
      <StepState from={5}>{mapAt([{ text: 'K1 → O4', tone: 'green' }, { text: 'K3 → O3', tone: 'green' }], 'green')}</StepState>

      {LOG.map((t, i) => (
        <Step key={i} n={i + 1}>
          <Num x={g.lx + 9} y={g.ly + i * 40} n={i + 1} tone={i === 1 ? 'red' : i === 4 ? 'green' : undefined} />
          <Label anchor="start" tone={i === 1 ? 'red' : undefined} x={g.lx + 26} y={g.ly + i * 40 + 5}>{t}</Label>
          {i === 4 && <Label muted anchor="start" x={g.lx + 26} y={g.ly + i * 40 + 25}>the full scan took a while</Label>}
        </Step>
      ))}
    </Fig>
  );
}

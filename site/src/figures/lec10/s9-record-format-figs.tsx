// Lecture 10 (lec10), chapter 9 (9.1–9.3): the §9 rule-box sketch (know how many bytes to read), Fig 9·a (D-16 bars
// 1–2 redraw: sizes before the bytes, with the section's speech bubble), Fig 9·b (new: the dictionary entry in the
// same record format) and Fig 9·c (D-16 bars 3–4 redraw, StepThrough: a torn record, caught by a CRC).
// Specs: lectures/lec10/lesson/figures.md §9. Parts: ./s8-files-that-grow-parts.
import React from 'react';
import { Arrow, Bubble, Cross, Label, Line, Mark, Num, Step, StepState } from '../kit/Kit';
import { Fig, HBrace, RecordBar, Span, Tick, cellX, type Cell, type Layout } from './s8-files-that-grow-parts';

const NL = '\\n';

/* ------------------------------------------------------------------ rule-box sketch §9 */

export function RecordRule({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule9-p' : 'l10-rule9';
  const s = (k: string) => `${id}-${k}`;
  const ws = P ? [36, 32, 36, 36, 40, 64] : [44, 44, 44, 44, 48, 80];
  const names = ['CRC', 'TS', 'KSZ', 'VSZ', 'K', 'V'];
  const cells: Cell[] = names.map((label, i) => ({ label, w: ws[i] }));
  const x = P ? 28 : 88, y = 44;
  const k0 = cellX(x, cells, 2), k1 = cellX(x, cells, 4), k2 = cellX(x, cells, 6);
  return (
    <Fig id={id} w={P ? 300 : 480} h={P ? 146 : 130} title="Know how many bytes to read"
      desc="A record laid out as CRC, timestamp, key size, value size, key, value. The sizes come first, so the key and value can be read in one shot; the CRC up front, checked, says the record is whole.">
      <RecordBar x={x} y={y} cells={cells} seed={s('rec')} />
      <Tick x={x + ws[0] / 2 - 2} y={y - 6} seed={s('tk')} />
      <HBrace x0={k0 + 2} x1={k1 - 2} y={y + 38} seed={s('b1')} />
      <HBrace x0={k1 + 2} x1={k2 - 2} y={y + 38} seed={s('b2')} />
      <Label x={(k0 + k1) / 2} y={y + 72}>sizes first</Label>
      <Label x={(k1 + k2) / 2} y={y + (P ? 94 : 72)}>read in one shot</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 9·a: sizes before the bytes */

export function SizesFirst({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f9a-p' : 'l10-f9a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Sizes before the bytes';
  const desc = 'Reading a record until a newline costs one call per byte. Prefixing each record with its key size and value size, 4 bytes each, lets a reader fetch it in two reads: the 8 bytes of sizes, then exactly the key and value.';
  const g = P
    ? { W: 340, H: 412, x: 10, y1: 64, y2: 200, c1: [24, 44, 80], c2: [24, 52, 52, 56, 96] }
    : { W: 640, H: 286, x: 40, y1: 50, y2: 180, c1: [30, 60, 120], c2: [30, 56, 56, 60, 120] };
  const bar1: Cell[] = [{ w: g.c1[0] }, { label: 'K', w: g.c1[1] }, { label: 'V', w: g.c1[2] }];
  const bar2: Cell[] = [{ w: g.c2[0] }, { label: 'KSZ', w: g.c2[1] }, { label: 'VSZ', w: g.c2[2] }, { label: 'K', w: g.c2[3] }, { label: 'V', w: g.c2[4] }];
  const b1end = cellX(g.x, bar1, 3);
  const k0 = cellX(g.x, bar2, 1), k1 = cellX(g.x, bar2, 2), k2 = cellX(g.x, bar2, 3), k3 = cellX(g.x, bar2, 5);
  const ticks = [0, 1, 2, 3, 4].map((i) => g.x + g.c1[0] + 6 + i * 10);
  const yc = g.y1 + 44; // caret row under bar 1
  const ys = g.y2 + 30 + 32; // read spans under bar 2
  const strikeY = P ? 131 : 115, strikeLabelY = P ? 136 : 120;
  return (
    <Fig id={id} w={g.W} h={g.H} title={title} desc={desc}>
      {P ? (
        <g>
          <Label x={170} y={22}>because key and value are</Label>
          <Label x={170} y={42}>variable length</Label>
        </g>
      ) : <Label x={320} y={22}>because key and value are variable length</Label>}

      {/* bar 1: read until a newline, one byte at a time */}
      <RecordBar x={g.x} y={g.y1} cells={bar1} seed={s('b1')} />
      {ticks.map((t, i) => <Mark key={i} a={[t, yc - 6]} b={[t, yc + 2]} tone="blue" weight="thin" seed={s('t' + i)} />)}
      <Arrow tone="blue" weight="thin" pts={[[ticks[0], yc + 8], [ticks[4] + 26, yc + 8]]} seed={s('car')} />
      <Label x={P ? 170 : 145} y={strikeLabelY}>{`one byte at a time until ${NL}?`}</Label>
      <Line tone="red" weight="thin" pts={[[P ? 60 : 36, strikeY], [P ? 280 : 254, strikeY]]} seed={s('strike')} />
      {P
        ? <Bubble x={172} y={56} w={162} h={46} tail={[b1end + 2, g.y1 + 16]} lines={['just read me', `until ${NL}`]} seed={s('bub')} size={13.7} />
        : <Bubble x={284} y={44} w={190} h={34} tail={[b1end + 4, g.y1 + 16]} lines={[`just read me until ${NL}`]} seed={s('bub')} />}

      {/* bar 2: key size and value size first */}
      <HBrace up x0={k0 + 2} x1={k2 - 2} y={g.y2 - 8} label="key size & value size" seed={s('br')} />
      <RecordBar x={g.x} y={g.y2} cells={bar2} seed={s('b2')} />
      <Label kind="mono" muted x={(k0 + k1) / 2} y={g.y2 + 48}>4 B</Label>
      <Label kind="mono" muted x={(k1 + k2) / 2} y={g.y2 + 48}>4 B</Label>
      <Span x0={k0 + 2} x1={k2 - 2} y={ys} seed={s('r1')} />
      <Span x0={k2 + 2} x1={k3 - 2} y={ys} seed={s('r2')} />
      <Num x={k0 + 12} y={ys + 22} n={1} tone="blue" />
      <Label kind="mono" anchor="start" x={k0 + 26} y={ys + 27}>8 B</Label>
      <Num x={k2 + 12} y={ys + 22} n={2} tone="blue" />
      <Label kind="mono" anchor="start" x={k2 + 26} y={ys + 27}>KSZ + VSZ bytes</Label>
      {P ? (
        <g>
          <Label x={170} y={ys + 56}>two reads</Label>
          <Label x={170} y={ys + 88}>we read KSZ (4 B), VSZ (4 B),</Label>
          <Label x={170} y={ys + 110}>then KSZ bytes for the key,</Label>
          <Label x={170} y={ys + 132}>VSZ bytes for the value</Label>
        </g>
      ) : (
        <g>
          <Label anchor="start" x={k3 + 70} y={ys + 27}>two reads</Label>
          <Label anchor="start" x={392} y={g.y2 - 6}>we read KSZ (4 B), VSZ (4 B),</Label>
          <Label anchor="start" x={392} y={g.y2 + 16}>then KSZ bytes for the key,</Label>
          <Label anchor="start" x={392} y={g.y2 + 38}>VSZ bytes for the value</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 9·b: the dictionary, re-recorded */

export function DictRecord({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f9b-p' : 'l10-f9b';
  const s = (k: string) => `${id}-${k}`;
  const u = P ? 10 : 12; // units per byte
  const x = P ? 10 : 40, y = P ? 74 : 64;
  const cells: Cell[] = [{ label: '5', w: 4 * u }, { label: '13', w: 4 * u }, { label: 'apple', w: 5 * u }, { label: 'a round fruit', w: 13 * u }];
  const csv = `apple,a round fruit⏎`;
  const csvW = csv.length * (P ? 8.3 : 8.4);
  return (
    <Fig id={id} w={P ? 340 : 520} h={P ? 216 : 196} title="The dictionary, re-recorded"
      desc="The dictionary's apple entry in the record format: a 4-byte word size of 5, a 4-byte meaning size of 13, then the word and the meaning. The CSV line it replaces is shown struck out above it.">
      <Label kind="mono" muted anchor="start" x={x} y={P ? 30 : 34}>{csv}</Label>
      <Line weight="thin" pts={[[x - 4, P ? 25 : 29], [x + csvW, P ? 25 : 29]]} seed={s('st')} />
      <Label anchor="start" x={P ? x : x + csvW + 20} y={P ? 54 : 34}>CSV: the easy start</Label>
      <RecordBar x={x} y={y} cells={cells} seed={s('rec')} />
      <HBrace x0={x + 2} x1={cellX(x, cells, 2) - 2} y={y + 38} seed={s('br')} />
      <Label kind="mono" muted x={cellX(x, cells, 2) + 2.5 * u} y={y + 50}>5 B</Label>
      <Label kind="mono" muted x={cellX(x, cells, 3) + 6.5 * u} y={y + 50}>13 B</Label>
      {P ? (
        <g>
          <Label anchor="start" x={x} y={y + 72}>word size · meaning size</Label>
          <Label anchor="start" x={x} y={y + 92}>(4 B each)</Label>
          <Label anchor="start" x={x} y={y + 126}>← same idea as the 16-byte header (§3)</Label>
        </g>
      ) : (
        <g>
          <Label anchor="start" x={x} y={y + 74}>word size · meaning size (4 B each)</Label>
          <Label anchor="start" x={x} y={y + 112}>← same idea as the 16-byte header (§3)</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 9·c: a torn record */

const LOG9: { t: string; tone?: 'red' | 'green' }[] = [
  { t: 'crash: the value is cut short', tone: 'red' },
  { t: 'restart: next record appended' },
  { t: 'trusting VSZ, the read runs on', tone: 'red' },
  { t: 'CRC fails → corrupt, skip', tone: 'green' },
];

export function TornRecord({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f9c-p' : 'l10-f9c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'A torn record';
  const desc = 'The machine crashes while writing a big value, so the record is cut short; after restart the next record is appended right after it. A reader that trusts the value size reads past the torn bytes into the next record and serves garbage. With a CRC written first, over the sizes, key and value, the reader recomputes it, sees it does not match, reports the record as corrupt and skips it; the next record checks out.';
  const k = P ? 0.8 : 1, x0 = P ? 30 : 40, W = P ? 340 : 420;
  const yA = 50, yB = 140;
  // steps 1–3 have no CRC slot yet (it is introduced at step 4)
  const old = (v: Cell, vw: number): Cell[] => [{ label: 'KSZ', w: 50 * k }, { label: 'VSZ', w: 50 * k }, { label: 'K', w: 50 * k }, { ...v, w: vw * k }];
  const neu = (v: Cell, vw: number): Cell[] => [{ label: 'CRC', w: 44 * k }, { label: 'TS', w: 40 * k }, { label: 'KSZ', w: 48 * k }, { label: 'VSZ', w: 48 * k }, { label: 'K', w: 44 * k }, { ...v, w: vw * k }];
  const xv = x0 + 150 * k, xj = x0 + 260 * k, over = 90 * k, xE = W - 8;
  const ly = P ? 244 : 240;
  return (
    <Fig id={id} w={W} h={ly + 3 * 36 + 24} title={title} desc={desc}>
      {/* steps 1–3: the record as key size | value size | key | value */}
      <StepState from={1} to={3}>
        <RecordBar x={x0} y={yA} cells={old({ label: '110…', tone: 'red' }, 110)} torn seed={s('a')} />
      </StepState>
      <StepState from={1} to={2}>
        <Label tone="red" x={W / 2} y={yA + 56}>machine crashed while writing value</Label>
      </StepState>
      <StepState from={2} to={3}>
        <RecordBar x={x0} y={yB} cells={old({ label: 'V' }, 200)} seed={s('b')} />
      </StepState>
      <StepState from={3} to={3}>
        <Span x0={xv + 2} x1={xj - 4} y={yA + 44} seed={s('rd')} />
        <Line tone="red" dashed pts={[[xj, yA + 44], [xE, yA + 44], [xE, yA + 72], [x0 - 14, yA + 72], [x0 - 14, yB + 44], [x0, yB + 44]]} seed={s('run')} />
        <Span tone="red" x0={x0 + 1} x1={x0 + over} y={yB + 44} seed={s('ov')} />
        <Label tone="red" anchor="start" x={x0 + over + 10} y={yB + 49}>reads into the next record</Label>
      </StepState>

      {/* step 4: CRC | TS | KSZ | VSZ | K | V */}
      <StepState from={4}>
        <Label anchor="start" x={x0} y={yA - 14}>CRC: first thing written</Label>
        <RecordBar x={x0} y={yA} cells={neu({ label: '110…', tone: 'red' }, 100)} torn seed={s('a2')} />
        <Cross x={x0 + 22 * k} y={yA + 16} size={20} seed={s('x')} />
        <Label tone="red" anchor="start" x={x0} y={yA + 56}>doesn’t match → “corrupt”, skip</Label>
        <RecordBar x={x0} y={yB} cells={neu({ label: 'V' }, 150)} seed={s('b2')} />
        <Tick x={x0 + 22 * k - 2} y={yB - 5} seed={s('ok')} />
        <Label anchor="start" x={x0} y={yB + 56}>TS: for conflicts</Label>
      </StepState>

      {LOG9.map((r, i) => (
        <Step key={i} n={i + 1}>
          <Num x={x0 - 4} y={ly + i * 36} n={i + 1} tone={r.tone} />
          <Label anchor="start" tone={r.tone === 'red' ? 'red' : undefined} x={x0 + 14} y={ly + i * 36 + 5}>{r.t}</Label>
        </Step>
      ))}
    </Fig>
  );
}

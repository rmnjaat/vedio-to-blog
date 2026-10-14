// Lecture 10 (lec10), chapter 5 "The weekly update" (figures.md §5): Fig 5·a (D-06 lower half: a job on its own
// server), Fig 5·b (D-07 redraw, step-through: apple runs into ball, byte by byte), Fig 5·c (D-08 redraw: merge, as
// in merge sort), the §5 rule-box sketch. The job initiates both transfers, so its download arrow points at S3.
// Byte counts in Fig 5·b are exact: "apple,a fruit⏎" is bytes 0–13, "ball,a round object⏎" 14–33, and
// "apple,a round fruit⏎" (20 bytes) written from 0 lands its last six bytes on 14–19, where "ball,a" was.
import React from 'react';
import { Arrow, Box, Bubble, Cloud, Cross, Label, Line, Mark, Num, Step, StepState, TimeAxis } from '../kit/Kit';
import { EmptySlot, Envelope, Fig, FileBar, OffsetCaret, RowFile, Stroke, Tick, ByteRow } from './s3-one-file-parts';

type L = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ Fig 5·a */

export function JobServer() {
  const id = 'l10-f5a';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={386} title="A job on its own server"
      desc="Each week a separate server downloads the current dictionary from S3 and holds it with the small changelog of changed words; it will build a new file rather than append.">
      <Cloud cx={196} cy={44} w={210} h={68} seed={s('s3')} />
      <Label kind="mono" x={196} y={49} size={14}>s3: dict1.dict</Label>
      <Label anchor="start" x={10} y={106} size={14}>update: weekly</Label>
      <Arrow dashed pts={[[196, 120], [196, 84]]} seed={s('dl')} />
      <Label anchor="start" x={206} y={108} size={14}>download</Label>
      <Box x={10} y={122} w={320} h={198} seed={s('job')} />
      <Label kind="mono" x={170} y={146} size={14}>update job</Label>
      <RowFile x={24} y={160} w={96} rowH={26} rows={['a, …', 'b, …']} dots seed={s('dict')} size={14} />
      <Label kind="mono" x={72} y={270} size={14}>dictionary</Label>
      <RowFile x={132} y={160} w={96} rowH={26} rows={['apple: —', 'ball: —', 'zoo: —']} seed={s('cl')} size={14} />
      <Label kind="mono" x={180} y={270} size={14}>changelog</Label>
      <EmptySlot x={240} y={160} w={78} h={86} seed={s('new')} />
      <Label kind="mono" x={279} y={270} size={14}>new file</Label>
      <Envelope x={120} y={286} seed={s('mail')} />
      <Label anchor="start" x={158} y={302} size={14}>arrives every Sunday</Label>
      <Label anchor="start" x={10} y={350} size={14}>append at end</Label>
      <Stroke tone="red" pts={[[6, 345], [114, 345]]} seed={s('strike')} />
      <Label muted anchor="start" x={10} y={374} size={14}>grows forever, duplicates</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·b (step-through) */

const OLD1 = 'apple,a fruit\n';
const OLD2 = 'ball,a round object\n';
const NEW = 'apple,a round fruit\n';
// the file's bytes after the in-place write: NEW over bytes 0–19, the rest of OLD2 after it
const AFTER = NEW + OLD2.slice(NEW.length - OLD1.length);

export function RunsIntoBall({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f5b-p' : 'l10-f5b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const cw = P ? 28 : 18;
  const x0 = P ? 44 : 50;
  // physical lines: desk = one per original line; phone = 10 bytes per line
  const lines: [number, number][] = P ? [[0, 10], [10, 14], [14, 24], [24, 34]] : [[0, 14], [14, 34]];
  const ly = (i: number) => (P ? [80, 128, 216, 264][i] : [86, 176][i]);
  const changed: Record<number, string> = {};
  for (let b = 0; b < NEW.length; b++) {
    const old = (OLD1 + OLD2)[b];
    if (old !== NEW[b]) changed[b] = old === '\n' ? '⏎' : old === ' ' ? '·' : old;
  }
  const strip = (bytes: string, k: string, opts: { ghost?: boolean; red?: boolean } = {}) => (
    <g>
      {lines.map(([a, b], i) => {
        const tones: Record<number, 'red'> = {};
        const ghost: Record<number, string> = {};
        for (let j = a; j < b; j++) {
          if (opts.red && j >= 14 && j < 20) tones[j] = 'red';
          if (opts.ghost && changed[j]) ghost[j] = changed[j];
        }
        return <ByteRow key={i} x={x0} y={ly(i)} cw={cw} text={bytes.slice(a, b)} start={a} tones={tones} ghost={ghost} seed={s(`${k}-${i}`)} size={P ? 14 : 13} />;
      })}
    </g>
  );
  const lastY = ly(lines.length - 1) + 26;
  const ball = P ? 2 : 1; // first line holding ball's bytes
  const rowY = (n: number) => lastY + (P ? 70 : 64) + (n - 1) * 34;
  const NX = 36, TX = 54;
  return (
    <Fig id={id} w={W} h={rowY(4) + 22} halo title="Apple runs into ball"
      desc="1: the file holds apple, a fruit (bytes 0–13) and then ball, a round object (bytes 14–33). 2: the index says apple starts at byte 0. 3: the 20-byte line apple, a round fruit is written from byte 0; its last six bytes land on 14–19, where ball,a was. 4: ball did not move down; its first bytes were overwritten, and the word ball is lost.">
      <Label anchor="start" x={6} y={24} size={14}>changelog:</Label>
      <Label kind="mono" anchor="start" x={P ? 96 : 92} y={24} size={14}>apple,a round fruit</Label>
      <Label kind="mono" anchor="start" x={6} y={56} size={14}>data.dict</Label>
      {lines.map(([a], i) => (
        <Label key={i} kind="mono" muted anchor="end" x={x0 - 6} y={ly(i) + 18} size={13}>{String(a)}</Label>
      ))}
      <TimeAxis x={6} y0={lastY + 52} y1={rowY(4) + 14} seed={s('t')} size={13} label="steps" />

      <StepState from={1} to={2}>{strip(OLD1 + OLD2, 'o')}</StepState>
      <StepState from={3} to={3}>{strip(AFTER, 'w', { ghost: true })}</StepState>
      <StepState from={4}>{strip(AFTER, 'r', { red: true })}</StepState>
      <StepState from={1} to={3}>
        <Bubble x={P ? 90 : 190} y={P ? 166 : 122} w={P ? 214 : 220} h={30} tail={[P ? 282 : 275, ly(ball) - 3]}
          lines={['I’ll just move down, right?']} seed={s('bub')} size={14} />
      </StepState>

      <Step n={1}>
        <Num x={NX} y={rowY(1) - 5} n={1} size={14} />
        <Label anchor="start" x={TX} y={rowY(1)} size={14}>apple, then ball, byte after byte</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={rowY(2) - 5} n={2} tone="blue" size={14} />
        <OffsetCaret x={x0 + cw / 2} y={ly(0) + 28} tone="blue" seed={s('caret')} />
        <Label kind="mono" tone="blue" anchor="start" x={TX} y={rowY(2)} size={14}>index: apple → 0</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={rowY(3) - 5} n={3} size={14} />
        <Label anchor="start" x={TX} y={rowY(3)} size={14}>write 20 bytes from byte 0</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={rowY(4) - 5} n={4} tone="red" size={14} />
        <Label tone="red" anchor="start" x={TX} y={rowY(4)} size={14}>bytes 14–19 lost: ball is gone</Label>
        <Mark tone="red" a={[x0 - 4, ly(ball) + 32]} b={[x0 + cw * 6 + 4, ly(ball) + 32]} seed={s('ring')} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·c */

const DICT = ['a – a′', 'b – b′', 'c – c′', 'd – d′', 'f – f′', 'g – g′', 'h – h′'];
const CHG = ['c – c″', 'e – e′', 'f – f″'];
const NEWD = ['a – a′', 'b – b′', 'c – c″', 'd – d′', 'e – e′', 'f – f″', 'g – g′', 'h – h′'];
const FROM_CHG: Record<number, number> = { 2: 0, 4: 1, 5: 2 }; // new row ← changelog row

export function MergeColumns({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f5c-p' : 'l10-f5c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 640;
  const rh = P ? 30 : 32;
  const cw = P ? 92 : 112;
  const cols = P ? [24, 132, 238] : [80, 280, 480];
  const y0 = 64;
  const ry = (i: number) => y0 + 4 + rh * i + rh / 2;
  const notesY = y0 + rh * 8 + 8 + (P ? 50 : 40);
  // a dashed empty slot under an input's last row: where its pointer ends once that input is used up
  const endY = (n: number) => y0 + rh * n + 14 + rh / 2;
  const endSlot = (x: number, n: number, k: string) => {
    const t = y0 + rh * n + 14;
    return (
      <g>
        <Line dotted pts={[[x, t], [x + cw, t], [x + cw, t + rh], [x, t + rh], [x, t]]} seed={s(k)} />
        <Label muted kind="mono" anchor="start" x={x + 10} y={t + rh / 2 + 5} size={14}>end</Label>
      </g>
    );
  };
  return (
    <Fig id={id} w={W} h={notesY + (P ? 80 : 32)} title="Merge, as in merge sort"
      desc="Two pointers walk the sorted dictionary and the sorted changelog; the smaller word is written to a new file, and on a match the changelog's meaning wins. The output is sorted and complete.">
      <Num x={cols[0] + 4} y={36} n={1} size={14} />
      <Label kind="mono" anchor="start" x={cols[0] + 20} y={41} size={14}>{P ? 'dict' : 'dictionary'}</Label>
      <Num x={cols[1] + 4} y={36} n={2} size={14} />
      <Label kind="mono" anchor="start" x={cols[1] + 20} y={41} size={14}>{P ? 'changes' : 'changelog'}</Label>
      <Label kind="mono" anchor="start" x={cols[2] + 4} y={41} size={14}>{P ? 'new' : 'new dictionary'}</Label>

      <RowFile x={cols[0]} y={y0} w={cw} rowH={rh} rows={DICT} seed={s('d')} size={14} />
      <RowFile x={cols[1]} y={y0} w={cw} rowH={rh} rows={CHG} seed={s('c')} size={14} />
      {endSlot(cols[0], DICT.length, 'de')}
      {endSlot(cols[1], CHG.length, 'ce')}
      <Label muted anchor="start" x={cols[1] + 10} y={y0 + rh * CHG.length + 14 + rh + 22} size={14}>done</Label>
      <RowFile x={cols[2]} y={y0} w={cw} rowH={rh} rows={NEWD} seed={s('n')} size={14} />
      <Label kind="mono" anchor="start" x={P ? cols[2] + 10 : cols[2] + cw + 6} y={P ? y0 + rh * 8 + 30 : ry(7) + 5} size={14}>//</Label>

      {/* the final pair of pointers, as in the clip poster: both past their last entry, on the dashed end slots */}
      <Arrow tone="blue" pts={[[cols[0] - 22, endY(DICT.length)], [cols[0] - 4, endY(DICT.length)]]} seed={s('p1')} />
      <Arrow tone="blue" pts={[[cols[1] - 22, endY(CHG.length)], [cols[1] - 4, endY(CHG.length)]]} seed={s('p2')} />

      {Object.entries(FROM_CHG).map(([n, c]) => (
        <g key={n}>
          {!P && <Stroke thin pts={[[cols[1] + cw + 2, ry(c)], [cols[2] - 2, ry(Number(n))]]} seed={s(`m${n}`)} />}
          <Tick x={cols[2] + cw - 14} y={ry(Number(n)) - 2} seed={s(`t${n}`)} />
        </g>
      ))}
      {P ? (
        <g>
          <Label anchor="start" x={10} y={notesY} size={14}>smaller word goes out;</Label>
          <Label anchor="start" x={10} y={notesY + 22} size={14}>equal → changelog wins, both move</Label>
          <Label anchor="start" x={10} y={notesY + 50} size={14}>one pass, line by line,</Label>
          <Label anchor="start" x={10} y={notesY + 72} size={14}>never the whole file in memory</Label>
        </g>
      ) : (
        <g>
          <Label x={W / 2} y={notesY - 6} size={14}>smaller word goes out; equal → changelog wins, both move</Label>
          <Label x={W / 2} y={notesY + 18} size={14}>one pass, line by line, never the whole file in memory</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §5 */

export function NeverInPlaceRule({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule5-p' : 'l10-rule5';
  const s = (k: string) => `${id}-${k}`;
  const u = P ? 28 : 40;
  const x = P ? 10 : 40;
  const nx = P ? 196 : 330, nw = P ? 92 : 110;
  const vx = P ? 176 : 290;
  const e1 = x + u * 5, e2 = x + u * 2;
  return (
    <Fig id={id} w={P ? 300 : 480} h={156} title="Never in place: merge into a new file"
      desc="Two sorted files, each with a pointer, are merged into a third, new file. Writing into the middle of the old file is crossed out.">
      <FileBar x={x} y={48} segs={['a', 'b', 'c', 'd', '…'].map((l) => ({ w: u, label: l }))} seed={s('f1')} size={14} />
      <FileBar x={x} y={108} segs={['c″', 'e′'].map((l) => ({ w: u, label: l }))} seed={s('f2')} size={14} />
      <OffsetCaret x={x + u / 2} y={80} seed={s('c1')} />
      <OffsetCaret x={x + u / 2} y={140} seed={s('c2')} />
      <Arrow pts={[[e1, 63], [vx, 63], [vx, 86], [nx - 2, 86]]} seed={s('a1')} />
      <Arrow pts={[[e2, 123], [vx, 123], [vx, 100], [nx - 2, 100]]} seed={s('a2')} />
      <FileBar x={nx} y={78} segs={[{ w: nw, label: 'new' }]} seed={s('n')} size={14} />
      <Tick x={nx + nw - 10} y={66} seed={s('tk')} />
      <Arrow pts={[[x + u * 2.5, 10], [x + u * 2.5, 44]]} seed={s('ip')} />
      <Cross x={x + u * 2.5} y={26} size={18} seed={s('x')} />
      <Label anchor="start" x={x + u * 2.5 + 16} y={30} size={14}>in place</Label>
    </Fig>
  );
}

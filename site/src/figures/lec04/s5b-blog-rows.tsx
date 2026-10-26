// Lecture 01 (lec04), chapter 5 "Blog rows", sections 5.6–5.9 (writer w3).
// Fig 5·f long text vs short text (D-13, frame b_015215), Fig 5·g three ways to store a date (D-14, frame b_015645),
// Fig 5·h twenty bytes or four (new byte strip), Fig 5·i the epoch number line (new, design fix C-02). Wider than 360 units → a <Phone> layout (~340 wide).
import React from 'react';
import { Arrow, Fig, Label, Line, Mark } from './_kit';
import { poly } from '../kit/hand';
import { Cells, CellText, Page } from './s5a-parts';

type Layout = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ Fig 5·f */

const DESC_5F =
  'Two rows of five cells. Long text: the middle cell holds only a reference; a line drops from it to a lined page stored elsewhere on disk. Type LONGTEXT. ' +
  'Short text: the middle cell holds the text itself, stored with the other columns. Type VARCHAR.';

const WIDTHS = [48, 56, 70, 48, 48];

function TextPanel({ id, long }: { id: string; long: boolean }) {
  const s = (k: string) => `${id}-${long ? 'l' : 's'}-${k}`;
  const x0 = 15, y0 = 30;
  const mx = x0 + WIDTHS[0] + WIDTHS[1];
  const mc = mx + WIDTHS[2] / 2;
  return (
    <g>
      <Cells x={x0} y={y0} widths={WIDTHS} h={32} seed={s('row')}>
        {long
          ? <CellText x={mc} y={y0 + 16}>→ ref</CellText>
          : [0, 1, 2].map((i) => <path key={i} className="ink thin" d={poly([[mx + 10, y0 + 9 + i * 7], [mx + WIDTHS[2] - 10, y0 + 9 + i * 7]], s('t' + i))} />)}
      </Cells>
      {long ? (
        <g>
          <Line pts={[[mc, y0 + 32], [mc, 92]]} weight="thin" seed={s('drop')} />
          <Page x={mc - 15} y={92} w={30} h={40} seed={s('page')} />
          <Label anchor="end" x={mc - 24} y={112} size={13.5}>large text,</Label>
          <Label anchor="end" x={mc - 24} y={129} size={13.5}>elsewhere</Label>
          <Label anchor="start" x={mc + 24} y={112}>stored as a</Label>
          <Label anchor="start" x={mc + 24} y={130}>reference</Label>
          <Label kind="mono" x={150} y={166}>LONGTEXT</Label>
          <Label kind="title" x={150} y={198}>long text: body</Label>
        </g>
      ) : (
        <g>
          <Label x={150} y={104}>stored along with</Label>
          <Label x={150} y={122}>the other columns</Label>
          <Label kind="mono" x={150} y={166}>VARCHAR</Label>
          <Label kind="title" x={150} y={198}>short text: bio</Label>
        </g>
      )}
    </g>
  );
}

/** Fig 5·f: long text vs short text (D-13). Desk 620 × 210, phone 340 × 420. */
export function LongShortText({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5f-p' : 'f04-5f';
  if (P)
    return (
      <Fig id={id} w={340} h={420} title="Long text vs short text" desc={DESC_5F}>
        <g transform="translate(20 0)"><TextPanel id={id} long /></g>
        <g transform="translate(20 210)"><TextPanel id={id} long={false} /></g>
      </Fig>
    );
  return (
    <Fig id={id} w={620} h={210} title="Long text vs short text" desc={DESC_5F}>
      <TextPanel id={id} long />
      <g transform="translate(320 0)"><TextPanel id={id} long={false} /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·g */

const DESC_5G =
  'Three ways to store published_at. As the native date-time type, 2022-04-02 09:01:36, stored by the engine in a compact binary form: convenient and readable. ' +
  'As an epoch integer, 1648890096, seconds since 1 January 1970: a plain integer compare, unreadable. ' +
  'As a custom integer format YYYYMMDD, 20220402: readable, an integer, a date only.';

const DATE_ROWS = [
  { name: 'native date-time', sub: '', value: '2022-04-02 09:01:36', note: 'compact binary inside the engine', traits: 'convenient · readable', traits2: 'decoded by the engine' },
  { name: 'epoch integer', sub: '', value: '1648890096', note: 'seconds since 1 Jan 1970', traits: 'integer compare · unreadable', traits2: '' },
  { name: 'custom format', sub: '(int)', value: 'YYYYMMDD → 20220402', note: '', traits: 'readable · integer · date only', traits2: '' },
];

/** Fig 5·g: three ways to store a date (D-14). Desk 740 × 250, phone 340 × 380. */
export function ThreeDates({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5g-p' : 'f04-5g';
  const s = (k: string) => `${id}-${k}`;
  if (P)
    return (
      <Fig id={id} w={340} h={372} title="Three ways to store a date" desc={DESC_5G}>
        {DATE_ROWS.map((r, i) => {
          const y = 30 + i * 130;
          return (
            <g key={i}>
              <Label anchor="start" x={12} y={y} size={15.5}>{`${i + 1}. ${r.name}${r.sub ? ' ' + r.sub : ''}`}</Label>
              <Label kind="mono" anchor="start" x={24} y={y + 28}>{r.value}</Label>
              {r.note && <Label anchor="start" muted x={24} y={y + 50} size={13}>{r.note}</Label>}
              <Label anchor="start" x={24} y={r.note ? y + 72 : y + 52} size={13.5}>{r.traits}</Label>
              {r.traits2 && <Label anchor="start" x={24} y={y + 92} size={13.5}>{r.traits2}</Label>}
              {i < 2 && <Line pts={[[12, y + 104], [328, y + 104]]} weight="thin" dotted seed={s('sep' + i)} className="faint" />}
            </g>
          );
        })}
      </Fig>
    );
  return (
    <Fig id={id} w={740} h={250} title="Three ways to store a date" desc={DESC_5G}>
      {DATE_ROWS.map((r, i) => {
        const y = 40 + i * 80;
        return (
          <g key={i}>
            <Label anchor="start" x={16} y={y} size={15.5}>{`${i + 1}. ${r.name}`}</Label>
            {r.sub && <Label anchor="start" muted x={34} y={y + 22} size={13}>{r.sub}</Label>}
            <Label kind="mono" anchor="start" x={262} y={y}>{r.value}</Label>
            {r.note && <Label anchor="start" muted x={262} y={y + 22} size={13}>{r.note}</Label>}
            <Label anchor="start" x={500} y={y} size={14}>{r.traits}</Label>
            {r.traits2 && <Label anchor="start" x={500} y={y + 22} size={14}>{r.traits2}</Label>}
            {i < 2 && <Line pts={[[16, y + 42], [724, y + 42]]} weight="thin" dotted seed={s('sep' + i)} className="faint" />}
          </g>
        );
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·h */

const DESC_5H =
  'Byte strips. The string 02-04-2022T09:01:36Z takes 20 cells, one byte per character, about 20 bytes. ' +
  'The same instant as a 32-bit epoch integer, 1648890096, takes 4 bytes: 62 48 10 F0 in hex. ' +
  'For comparison, MySQL actually stores a DATETIME in 5 bytes.';

const CHARS = '02-04-2022T09:01:36Z'.split('');
const HEX = ['62', '48', '10', 'F0'];

/** Fig 5·h: twenty bytes or four (new). Desk 600 × 250, phone 340 × 330. */
export function TwentyOrFour({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5h-p' : 'f04-5h';
  const s = (k: string) => `${id}-${k}`;
  const cw = P ? 28 : 22;
  const perRow = P ? 10 : 20;
  const x0 = P ? 16 : 20;
  const strip = (chars: string[], y: number, key: string, start: number) => (
    <g>
      <Cells x={x0} y={y} widths={chars.map(() => cw)} h={28} seed={s(key)}>
        {chars.map((c, i) => <CellText key={i} x={x0 + cw * (i + 0.5)} y={y + 14} size={13}>{c}</CellText>)}
      </Cells>
      {chars.map((_, i) => <Label key={'n' + i} kind="num" muted x={x0 + cw * (i + 0.5)} y={y - 6} size={12.5}>{String(start + i + 1)}</Label>)}
    </g>
  );
  if (P)
    return (
      <Fig id={id} w={340} h={372} title="Twenty bytes or four" desc={DESC_5H}>
        <Label anchor="start" x={x0} y={18} size={13.5}>as a string</Label>
        {strip(CHARS.slice(0, perRow), 48, 'a1', 0)}
        {strip(CHARS.slice(perRow), 110, 'a2', perRow)}
        <Label kind="mono" anchor="end" x={x0 + cw * 10} y={162} size={15}>≈ 20 B</Label>
        <Label anchor="start" x={x0} y={200} size={13.5}>as an epoch integer</Label>
        <Label kind="mono" anchor="start" x={x0} y={222} size={13}>int32 1648890096</Label>
        <Cells x={x0} y={234} widths={HEX.map(() => 40)} h={28} seed={s('b')}>
          {HEX.map((h, i) => <CellText key={i} x={x0 + 40 * (i + 0.5)} y={248}>{h}</CellText>)}
        </Cells>
        <Label kind="mono" anchor="start" x={x0 + 170} y={254} size={15}>4 B</Label>
        <g className="faint">
          <Cells x={x0} y={290} widths={[18, 18, 18, 18, 18]} h={20} seed={s('c')} />
        </g>
        <Label kind="mono" anchor="start" x={x0 + 104} y={305} size={13}>MySQL DATETIME = 5 B</Label>
        <Label anchor="start" muted x={x0} y={336} size={13}>what MySQL actually stores</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={600} h={250} title="Twenty bytes or four" desc={DESC_5H}>
      <Label anchor="start" x={x0} y={18} size={13.5}>as a string</Label>
      {strip(CHARS, 48, 'a', 0)}
      <Label kind="mono" anchor="start" x={x0 + cw * 20 + 14} y={68} size={15}>≈ 20 B</Label>
      <Label anchor="start" x={x0} y={118} size={13.5}>as an epoch integer</Label>
      <Label kind="mono" anchor="start" x={x0 + 150} y={118} size={13}>int32 1648890096</Label>
      <Cells x={x0} y={130} widths={HEX.map(() => 32)} h={28} seed={s('b')}>
        {HEX.map((h, i) => <CellText key={i} x={x0 + 32 * (i + 0.5)} y={144}>{h}</CellText>)}
      </Cells>
      <Label kind="mono" anchor="start" x={x0 + 128 + 14} y={150} size={15}>4 B</Label>
      <g className="faint">
        <Cells x={x0} y={196} widths={[cw, cw, cw, cw, cw]} h={20} seed={s('c')} />
      </g>
      <Label kind="mono" anchor="start" x={x0 + cw * 5 + 14} y={211} size={13}>MySQL DATETIME = 5 B</Label>
      <Label anchor="start" muted x={x0 + cw * 5 + 194} y={211} size={13}>what MySQL actually stores</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·i */

const DESC_5I =
  'An epoch number line in seconds. 0 is 1 January 1970; −1, just left of it, is 31 December 1969, and the line runs on to the left: negative values are dates before 1970. ' +
  'To the right, a signed 32-bit integer (4 bytes) runs out at 2,147,483,647, a red wall at 19 January 2038. ' +
  'Past the wall the line continues dashed: a 64-bit integer (8 bytes) has no practical limit. Not to scale.';

/** Fig 5·i: the epoch number line (new). Desk 600 × 196, phone 340 × 218. */
export function EpochLine({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5i-p' : 'f04-5i';
  const s = (k: string) => `${id}-${k}`;
  const Y = P ? 112 : 100;
  const M = P ? 36 : 84, Z = P ? 92 : 124, WALL = P ? 220 : 430, END = P ? 330 : 586;
  const T = 14;
  return (
    <Fig id={id} w={P ? 340 : 600} h={P ? 218 : 196} title="The epoch number line" desc={DESC_5I}>
      <Label muted anchor="start" x={P ? 8 : 20} y={P ? 26 : 34} size={13}>negative = before 1970</Label>
      <Arrow pts={[[Z, Y], [P ? 10 : 22, Y]]} seed={s('neg')} />
      <Line pts={[[Z, Y], [WALL, Y]]} seed={s('i32')} />
      <Arrow dashed pts={[[WALL, Y], [END, Y]]} seed={s('i64')} />
      <Mark a={[M, Y - 6]} b={[M, Y + 6]} seed={s('tm')} />
      <Mark a={[Z, Y - 8]} b={[Z, Y + 8]} weight="heavy" seed={s('tz')} />
      <Label kind="mono" x={M} y={Y - 14} size={T}>−1</Label>
      <Label kind="mono" x={Z} y={Y - 14} size={T}>0</Label>
      {P ? (
        <g>
          <Label x={M} y={Y + 26} size={13}>31 Dec</Label>
          <Label x={M} y={Y + 43} size={13}>1969</Label>
          <Label x={Z} y={Y + 26} size={13}>1 Jan</Label>
          <Label x={Z} y={Y + 43} size={13}>1970</Label>
        </g>
      ) : (
        <g>
          <Label anchor="end" x={M + 4} y={Y + 28} size={13.5}>31 Dec 1969</Label>
          <Label anchor="start" x={Z - 4} y={Y + 28} size={13.5}>1 Jan 1970</Label>
        </g>
      )}
      <Label kind="mono" x={(Z + WALL) / 2 + (P ? 8 : 20)} y={Y - 12} size={13}>{P ? 'int32 · 4 B' : 'int32 seconds · 4 B'}</Label>
      <Mark a={[WALL, Y - 34]} b={[WALL, Y + 34]} tone="red" weight="heavy" seed={s('wall')} />
      <Label kind="mono" tone="red" x={WALL} y={Y - 44} size={13}>2,147,483,647</Label>
      <Label tone="red" x={WALL} y={Y + 54} size={T}>19 Jan 2038</Label>
      <Label kind="mono" x={(WALL + END) / 2 + 2} y={Y - 12} size={13}>int64 · 8 B</Label>
      <Label muted anchor="end" x={END + 2} y={P ? Y + 94 : Y + 28} size={12.5}>no practical limit</Label>
    </Fig>
  );
}

// Lecture 06 (lec03), §6.2 and §6.5. Fig 6·a "Snowflake's 64 bits" (D-17 redraw, board frame b_013730) and
// Fig 6·c "Decode a tweet ID" (new). Both use one bit-field bar at one scale: cell widths proportional to bit
// counts, the time cell outlined heavy, the unused top bit a thin cell holding 0.
// Ledger: Fig 6·a L-0197, L-0199, L-0202, L-0203, L-0205; Fig 6·c L-0214, L-0215.
import React from 'react';
import { Arrow, Fig, Label, Line } from '../kit/Kit';

type Field = { bits: number; name: string; heavy?: boolean; unused?: boolean };
export const SNOWFLAKE: Field[] = [
  { bits: 1, name: 'unused', unused: true },
  { bits: 41, name: 'time', heavy: true },
  { bits: 10, name: 'machine id' },
  { bits: 12, name: 'counter' },
];

/** Cell edges of a 64-bit bar from x0 to x1. */
function edges(x0: number, x1: number, fields: Field[]) {
  const u = (x1 - x0) / 64;
  const out: { a: number; b: number; f: Field }[] = [];
  let x = x0;
  for (const f of fields) { out.push({ a: x, b: x + f.bits * u, f }); x += f.bits * u; }
  return out;
}

/** The bit-field bar: one rectangle split into cells. Bit counts sit inside unless `digits` fills the cells. */
function BitBar({ x0, x1, y, h, seed, counts = true, size = 15 }: { x0: number; x1: number; y: number; h: number; seed: string; counts?: boolean; size?: number }) {
  const E = edges(x0, x1, SNOWFLAKE);
  return (
    <g>
      {E.map(({ a, b, f }, i) => (
        <g key={i}>
          <Line pts={[[a, y], [b, y], [b, y + h], [a, y + h], [a, y]]} weight={f.heavy ? 'heavy' : f.unused ? 'thin' : 'regular'}
            className={f.unused ? 'faint' : undefined} seed={`${seed}-c${i}`} />
          {counts && !f.unused && <Label kind="mono" x={(a + b) / 2} y={y + h / 2 + size * 0.36} size={size}>{String(f.bits)}</Label>}
        </g>
      ))}
    </g>
  );
}

export function SnowflakeBits({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = "Snowflake's 64 bits";
  const desc = 'A 64-bit integer split into fields. The top bit is unused and stays 0. Then 41 bits of milliseconds since an epoch, the most significant part, so time is on the left. Then a 10-bit machine id, 2 to the 10 = 1024 machines, and a 12-bit per-machine counter, 2 to the 12 = 4096 IDs per millisecond. Time orders the IDs; machine and counter break the tie.';
  if (layout === 'phone') {
    const x0 = 14, x1 = 326, y = 46, h = 40;
    const E = edges(x0, x1, SNOWFLAKE);
    return (
      <Fig id="fig6a-p" w={340} h={304} title={title} desc={desc}>
        <Label muted anchor="start" x={x0} y={30} size={14}>bit 63</Label>
        <Label muted anchor="end" x={x1} y={30} size={14}>bit 0</Label>
        <BitBar x0={x0} x1={x1} y={y} h={h} seed="f6a-p" size={14} />
        {/* the list below the bar: each field, its name, and what its width allows */}
        {[
          { m: '0', t: 'unused top bit, keeps IDs positive' },
          { m: '41', t: 'time: ms since an epoch' },
          { m: '10', t: 'machine id' },
          { m: '', t: '2^10 = 1024 machines', mono: true },
          { m: '12', t: 'counter, per machine' },
          { m: '', t: '2^12 = 4096 ids per ms', mono: true },
        ].map((r, i) => (
          <g key={i}>
            {r.m && <Label kind="mono" anchor="end" x={44} y={126 + i * 24} size={14}>{r.m}</Label>}
            <Label kind={r.mono ? 'mono' : 'hand'} anchor="start" x={56} y={126 + i * 24} size={14}>{r.t}</Label>
          </g>
        ))}
        <Label anchor="middle" x={170} y={286} size={14}>time on the left · tie broken on the right</Label>
      </Fig>
    );
  }
  const x0 = 40, x1 = 720, y = 52, h = 48;
  const E = edges(x0, x1, SNOWFLAKE);
  return (
    <Fig id="fig6a" w={760} h={250} title={title} desc={desc}>
      <Label muted anchor="start" x={x0 - 4} y={38} size={13}>bit 63</Label>
      <Label muted x={E[2].a} y={38} size={13}>22</Label>
      <Label muted x={E[3].a} y={38} size={13}>12</Label>
      <Label muted anchor="end" x={x1 + 4} y={38} size={13}>0</Label>
      <BitBar x0={x0} x1={x1} y={y} h={h} seed="f6a" />
      <Label muted anchor="start" x={x0 - 4} y={y + h + 26} size={13}>↑ unused, always 0</Label>
      <Label x={(E[1].a + E[1].b) / 2} y={y + h + 26} size={15}>time (ms since an epoch)</Label>
      <Label x={(E[2].a + E[2].b) / 2} y={y + h + 26} size={15}>machine id</Label>
      <Label x={(E[3].a + E[3].b) / 2} y={y + h + 26} size={15}>counter,</Label>
      <Label x={(E[3].a + E[3].b) / 2} y={y + h + 44} size={15}>per machine</Label>
      <Label kind="mono" x={(E[2].a + E[2].b) / 2} y={y + h + 74} size={13}>2^10 = 1024</Label>
      <Label kind="mono" x={(E[2].a + E[2].b) / 2} y={y + h + 92} size={13}>machines</Label>
      <Label kind="mono" x={(E[3].a + E[3].b) / 2} y={y + h + 74} size={13}>2^12 = 4096</Label>
      <Label kind="mono" x={(E[3].a + E[3].b) / 2} y={y + h + 92} size={13}>ids per ms</Label>
      <Label muted x={(E[1].a + E[1].b) / 2} y={y + h + 52} size={14}>most significant: moves forward every ms</Label>
      <Label x={380} y={236} size={15}>time on the left · tie broken on the right</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c */

// An example ID built for this page from the class's timestamp (1,676,784,716,000 ms = 19 Feb 2023, 05:31:56 UTC),
// machine 7, counter 0 and Twitter's epoch 1288834974657 (4 Nov 2010): ((t - epoch) << 22) | (7 << 12) | 0.
export const EXAMPLE_ID = '1627179151913938944';
const BIN = '0001011010010100111001101101000101000111110000000111000000000000';

export function DecodeTweetId({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Decode a tweet ID';
  const desc = `The example ID ${EXAMPLE_ID} written in binary and spread over the 64-bit bar. Shifting right by 22 and adding Twitter's epoch gives 1,676,784,716,000 ms, 19 February 2023 at 05:31:56 UTC. Shifting right by 12 and keeping 10 bits gives machine 7. Keeping the low 12 bits gives counter 0.`;
  if (layout === 'phone') {
    const x0 = 14, x1 = 326, y = 70, h = 36;
    const E = edges(x0, x1, SNOWFLAKE);
    const rows: { f: string; r: string; tone?: 'blue' }[] = [
      { f: '(id >> 22) + epoch', r: '1676784716000 ms', tone: 'blue' },
      { f: '', r: '19 Feb 2023, 05:31:56 UTC', tone: 'blue' },
      { f: '(id >> 12) & 1023', r: 'machine 7' },
      { f: 'id & 4095', r: 'counter 0' },
    ];
    return (
      <Fig id="fig6c-p" w={340} h={392} title={title} desc={desc}>
        <Label kind="mono" x={170} y={26} size={16}>{EXAMPLE_ID}</Label>
        <Label muted x={170} y={48} size={14}>example id, 64 bits</Label>
        <BitBar x0={x0} x1={x1} y={y} h={h} seed="f6c-p" size={14} />
        <Label x={(E[1].a + E[1].b) / 2} y={y + h + 20} size={14}>time</Label>
        <Label x={(E[2].a + E[2].b) / 2 - 6} y={y + h + 20} size={14}>mach.</Label>
        <Label x={(E[3].a + E[3].b) / 2 + 4} y={y + h + 20} size={14}>count</Label>
        <Arrow tone="blue" pts={[[(E[1].a + E[1].b) / 2, y + h + 30], [(E[1].a + E[1].b) / 2, 172]]} seed="f6c-p-a" />
        {rows.map((r, i) => {
          const yy = 196 + i * 46;
          return (
            <g key={i}>
              {r.f && <Label kind="mono" anchor="start" x={14} y={yy} size={14}>{r.f}</Label>}
              <Label kind="mono" tone={r.tone} anchor="start" x={r.f ? 34 : 34} y={yy + (r.f ? 20 : -6)} size={14}>{(r.f ? '→ ' : '') + r.r}</Label>
            </g>
          );
        })}
        <Label muted x={170} y={378} size={14}>any tweet link decodes the same way</Label>
      </Fig>
    );
  }
  const x0 = 40, x1 = 720, y = 92, h = 40;
  const E = edges(x0, x1, SNOWFLAKE);
  const u = (x1 - x0) / 64;
  const tx = (E[1].a + E[1].b) / 2, mx = (E[2].a + E[2].b) / 2, cx = (E[3].a + E[3].b) / 2;
  return (
    <Fig id="fig6c" w={760} h={330} title={title} desc={desc}>
      <Label kind="mono" x={380} y={30} size={18}>{EXAMPLE_ID}</Label>
      <Label muted x={380} y={54} size={13}>an example id, in binary below</Label>
      <BitBar x0={x0} x1={x1} y={y} h={h} seed="f6c" counts={false} />
      {/* the unused top bit is too thin a cell to hold a digit: its 0 sits just above it */}
      <Label kind="mono" muted x={x0 + u / 2} y={y - 8} size={13}>{BIN[0]}</Label>
      {/* each field's bits, centred in its own cell and grouped in fours from the right, clear of the dividers */}
      {E.slice(1).map(({ a, b }, k) => {
        const start = [1, 42, 52][k], bits = BIN.slice(start, start + SNOWFLAKE[k + 1].bits);
        const size = 14, dw = size * 0.6, gap = k === 0 ? 4 : 3;
        const gaps = Math.floor((bits.length - 1) / 4);
        const x = (a + b) / 2 - (bits.length * dw + gaps * gap) / 2;
        return bits.split('').map((d, i) => (
          <Label key={`${k}-${i}`} kind="mono" x={x + i * dw + dw / 2 + (gaps - Math.floor((bits.length - 1 - i) / 4)) * gap}
            y={y + h / 2 + 4.7} size={size}>{d}</Label>
        ));
      })}
      <Label x={tx} y={y + h + 22} size={15}>time: 41 bits</Label>
      <Label x={mx} y={y + h + 22} size={14}>machine</Label>
      <Label x={cx} y={y + h + 22} size={14}>counter</Label>
      <Arrow tone="blue" pts={[[tx, y + h + 32], [tx, 208]]} seed="f6c-a-t" />
      <Arrow pts={[[mx, y + h + 32], [mx, 208]]} seed="f6c-a-m" />
      <Arrow pts={[[cx, y + h + 32], [cx, 208]]} seed="f6c-a-c" />
      <Label kind="mono" x={tx} y={230} size={13}>(id &gt;&gt; 22) + 1288834974657</Label>
      <Label kind="mono" tone="blue" x={tx} y={256} size={14}>= 1676784716000 ms</Label>
      <Label tone="blue" x={tx} y={282} size={16}>19 Feb 2023, 05:31:56 UTC</Label>
      <Label kind="mono" x={mx - 6} y={230} size={13}>(id &gt;&gt; 12) &amp; 1023</Label>
      <Label kind="mono" x={mx} y={256} size={14}>= 7</Label>
      <Label kind="mono" x={cx + 8} y={230} size={13}>id &amp; 4095</Label>
      <Label kind="mono" x={cx} y={256} size={14}>= 0</Label>
      <Label muted x={380} y={318} size={13}>1288834974657 is Twitter’s epoch in ms (4 Nov 2010) · any tweet link decodes the same way</Label>
    </Fig>
  );
}

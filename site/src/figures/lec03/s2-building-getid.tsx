// Lecture 06 (lec03), chapter 2 "Building getid(), one constraint at a time" (writer w1).
// LectureMarks (this lecture's own glyphs, under the course NotationKey), Fig 2·a (D-01), Fig 2·b (D-02 + D-03, two
// panels of 300), Fig 2·c (D-04, step-through, desk 420 / phone 340), Fig 2·d (summary ladder, desk 660 / phone 340),
// rule-box sketch §2 (320). D-05 (flush every 3, crash, restart) is told by the l03-flush-crash clip alone.
import React from 'react';
import { Arrow, Fig, Label, Line, Num, Step, TEXT, type Tone } from '../kit/Kit';
import { BitBar, Clock, CounterCell, Laptop, Strike, Tick, Under } from './s2-building-getid-parts';

type Layout = { layout?: 'desk' | 'phone' };
/** mono advance per character (Recursive MONO 1 = 0.6 em) */
const cw = (size: number) => size * 0.6;

/** A line of code drawn as segments; `mark` segments get an ink underline, `strike` a red strike. Returns x after. */
function Code({ x, y, segs, size = TEXT.mono, seed, tone }: {
  x: number; y: number; size?: number; seed: string; tone?: Tone;
  segs: { t: string; mark?: boolean; strike?: boolean; tone?: Tone }[];
}) {
  let cx = x;
  const out: React.ReactNode[] = [];
  segs.forEach((sg, i) => {
    // SVG drops leading spaces in a text element: advance past them by hand, then draw the rest
    const lead = sg.t.length - sg.t.trimStart().length;
    cx += lead * cw(size);
    const t = sg.t.trimStart();
    const w = t.length * cw(size);
    if (t) out.push(<Label key={'t' + i} kind="mono" tone={sg.tone ?? tone} anchor="start" x={cx} y={y} size={size}>{t}</Label>);
    if (sg.mark) out.push(<Under key={'u' + i} x0={cx} x1={cx + w - cw(size) * 0.4} y={y + 5} seed={`${seed}-u${i}`} />);
    if (sg.strike) out.push(<Strike key={'s' + i} x0={cx - 2} x1={cx + w} y={y - size * 0.32} seed={`${seed}-s${i}`} />);
    cx += w;
  });
  return <g>{out}</g>;
}

/* ------------------------------------------------------------------ this lecture's marks */

export function LectureMarks({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const s = (k: string) => `${P ? 'mk-p' : 'mk'}-${k}`;
  const title = 'This lecture’s marks';
  const desc = 'Marks used in this lecture’s figures: a laptop is one machine running getid(); wavy lines inside it are threads; a small square with a number is a counter; a circle with hands is a machine’s clock; a long bar split into cells is an ID’s bit layout, with the time field outlined heavier because it is the most significant part.';
  if (P)
    return (
      <Fig id="l03-marks-p" w={340} h={214} title={title} desc={desc}>
        <Laptop x={30} y={16} w={46} h={30} seed={s('lap')} />
        <Label x={53} y={84}>machine</Label>
        <Laptop x={140} y={16} w={46} h={30} seed={s('th')} threads={2} />
        <Label x={163} y={84}>threads</Label>
        <CounterCell x={252} y={18} s={30} value="42" seed={s('ctr')} />
        <Label x={267} y={84}>counter</Label>
        <Clock cx={46} cy={130} r={12} seed={s('clk')} />
        <Label kind="mono" anchor="start" x={64} y={135}>23</Label>
        <Label x={53} y={168}>clock</Label>
        <BitBar x={120} y={116} w={200} h={24} size={14} seed={s('bar')} fields={[{ name: 'time', bits: 41, heavy: true }, { name: 'm', bits: 10 }, { name: 'ctr', bits: 12 }]} />
        <Label x={220} y={196}>ID bit layout, time heavier</Label>
      </Fig>
    );
  return (
    <Fig id="l03-marks" w={640} h={112} title={title} desc={desc}>
      <Laptop x={26} y={18} w={46} h={30} seed={s('lap')} />
      <Label x={49} y={86}>machine</Label>
      <Laptop x={128} y={18} w={46} h={30} seed={s('th')} threads={2} />
      <Label x={151} y={86}>threads</Label>
      <CounterCell x={224} y={20} s={30} value="42" seed={s('ctr')} />
      <Label x={239} y={86}>counter</Label>
      <Clock cx={308} cy={35} r={12} seed={s('clk')} />
      <Label kind="mono" anchor="start" x={326} y={40}>23</Label>
      <Label x={316} y={86}>clock</Label>
      <BitBar x={390} y={22} w={230} h={24} seed={s('bar')} fields={[{ name: 'time', bits: 41, heavy: true }, { name: 'm', bits: 10 }, { name: 'ctr', bits: 12 }]} />
      <Label x={505} y={98}>ID bit layout, time heavier</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·a */

export function OneMachine() {
  const s = (k: string) => `f2a-${k}`;
  return (
    <Fig id="l03-f2a" w={336} h={150} title="One machine, one clock"
      desc="One machine returns the current epoch millisecond, 1729, as its ID. That is unique on one machine as long as the function is never called twice within the same millisecond.">
      <g transform="translate(-18 0)">
      <Laptop x={36} y={30} w={60} h={40} seed={s('m')} label="m1" />
      <Label kind="mono" x={66} y={104}>t = 1729</Label>
      <Arrow tone="blue" pts={[[120, 52], [168, 52]]} seed={s('a')} />
      <Label kind="mono" anchor="start" x={178} y={57}>get_id() → 1729</Label>
      <Label anchor="start" x={130} y={110}>fine on one machine,</Label>
      <Label anchor="start" x={130} y={130}>if never called twice in one ms</Label>
      </g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b */

export function TwoMachinesPanel() {
  const s = (k: string) => `f2b1-${k}`;
  const A = 78, B = 222;
  return (
    <Fig id="l03-f2b1" w={300} h={282} title="Two machines"
      desc="Two machines call the function in the same millisecond and both return 1729: a collision. Prefixing the machine ID gives m1-1729 and m2-1729, which are unique.">
      <Laptop x={A - 28} y={26} w={56} h={36} seed={s('m1')} label="m1" />
      <Laptop x={B - 28} y={26} w={56} h={36} seed={s('m2')} label="m2" />
      <Label kind="mono" x={A} y={96}>t = 1729</Label>
      <Label kind="mono" x={B} y={96}>t = 1729</Label>
      <Label kind="mono" tone="red" x={A} y={134}>1729</Label>
      <Label kind="mono" tone="red" x={150} y={134}>=</Label>
      <Label kind="mono" tone="red" x={B} y={134}>1729</Label>
      <Label tone="red" x={150} y={154} size={12.5}>collision</Label>
      <Code x={A - 29} y={184} seed={s('i1')} segs={[{ t: 'm1-', mark: true }, { t: '1729' }]} />
      <Code x={B - 29} y={184} seed={s('i2')} segs={[{ t: 'm2-', mark: true }, { t: '1729' }]} />
      <Tick x={B + 42} y={184} seed={s('ok')} />
      <Label kind="mono" x={150} y={222} size={13}>concat(machine_id, get_epoch_ms())</Label>
      <Label kind="title" x={150} y={264}>two machines</Label>
    </Fig>
  );
}

export function ThreadsPanel() {
  const s = (k: string) => `f2b2-${k}`;
  const A = 78, B = 222;
  return (
    <Fig id="l03-f2b2" w={300} h={282} title="Threads inside a machine"
      desc="Two threads on machine m1 run the function in the same millisecond and both return m1-1729: a collision again. Adding the thread ID gives m1-t1-1729, m1-t2-1729, m2-t1-1729 and m2-t3-1729 (m2's threads happen to be t1 and t3), which are unique.">
      <Laptop x={A - 28} y={26} w={56} h={36} seed={s('m1')} label="m1" threads={2} />
      <Laptop x={B - 28} y={26} w={56} h={36} seed={s('m2')} label="m2" threads={2} />
      <Label x={A} y={96}>t1 · t2</Label>
      <Label x={B} y={96}>t1 · t3</Label>
      <Label kind="mono" tone="red" x={A} y={134}>m1-1729</Label>
      <Label kind="mono" tone="red" x={150} y={134}>=</Label>
      <Label kind="mono" tone="red" x={B} y={134}>m1-1729</Label>
      <Label tone="red" x={150} y={154} size={12.5}>two threads, same ms</Label>
      <Code x={A - 46} y={180} size={13} seed={s('i1')} segs={[{ t: 'm1-' }, { t: 't1-', mark: true }, { t: '1729' }]} />
      <Code x={A - 46} y={200} size={13} seed={s('i2')} segs={[{ t: 'm1-' }, { t: 't2-', mark: true }, { t: '1729' }]} />
      <Code x={B - 46} y={180} size={13} seed={s('i3')} segs={[{ t: 'm2-' }, { t: 't1-', mark: true }, { t: '1729' }]} />
      <Code x={B - 46} y={200} size={13} seed={s('i4')} segs={[{ t: 'm2-' }, { t: 't3-', mark: true }, { t: '1729' }]} />
      <Tick x={B + 56} y={200} seed={s('ok')} />
      <Label kind="mono" x={150} y={228} size={13}>concat(machine_id, thread_id,</Label>
      <Label kind="mono" x={150} y={245} size={13}>get_epoch_ms())</Label>
      <Label kind="title" x={150} y={272}>threads inside a machine</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c */

export function ThreadsToCounter({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l03-f2c-p' : 'l03-f2c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 100 : 130, B = P ? 250 : 300; // laptop centres
  const X = P ? 34 : 40; // code / id start
  const NX = 14;
  const cs = P ? 14 : 13; // code size (14 on the phone: the drawing shows at ~0.88 there)
  const ls = P ? 14 : 13; // annotation size
  const ns = P ? 14 : undefined; // step number size
  const band = (n: number) => 116 + (n - 1) * (P ? 104 : 92);
  const ids = (y: number, list: string[], cols: number[], tone?: Tone) =>
    list.map((t, i) => <Label key={t + i} kind="mono" tone={tone} anchor="start" x={cols[i % cols.length]} y={y + Math.floor(i / cols.length) * 20} size={cs}>{t}</Label>);
  const colsW = P ? [X, X + 150] : [X, X + 92, X + 184, X + 276];
  const y1 = band(1), y2 = band(2), y3 = band(3), y4 = band(4);
  const H = band(4) + (P ? 96 : 86);
  return (
    <Fig id={id} w={W} h={H} title="From threads to a counter"
      desc="Machines m1 and m2, each with threads. 1: adding the thread ID gives m1-t1-1729 and so on, unique but longer with every new cause. 2: one shared counter, incremented atomically on every call, replaces the thread ID: m1-1729-01, m1-1729-02, m1-1729-03, then m1-1730-01. 3: the counter already increases on every call, so the time part is struck out as redundant. 4: the ID becomes machine plus counter: m1-01, m1-02, m1-03 and m2-01, m2-02, m2-03, unique as long as the counter never resets.">
      <Laptop x={A - 26} y={26} w={52} h={34} seed={s('m1')} label="m1" threads={2} />
      <Laptop x={B - 26} y={26} w={52} h={34} seed={s('m2')} label="m2" threads={2} />
      <Label kind="mono" x={A} y={92}>t = 1729</Label>
      <Label kind="mono" x={B} y={92}>t = 1729</Label>

      <Step n={1}>
        <Num x={NX} y={y1 - 5} n={1} size={ns} />
        {P ? (
          <g>
            <Code x={X} y={y1} size={cs} seed={s('c1')} segs={[{ t: 'concat(machine_id, ' }, { t: 'thread_id,', mark: true }]} />
            <Code x={X + 46} y={y1 + 18} size={cs} seed={s('c1b')} segs={[{ t: 'get_epoch_ms())' }]} />
            {ids(y1 + 44, ['m1-t1-1729', 'm1-t2-1729'], colsW)}
          </g>
        ) : (
          <g>
            <Code x={X} y={y1} size={cs} seed={s('c1')} segs={[{ t: 'concat(machine_id, ' }, { t: 'thread_id,', mark: true }, { t: ' get_epoch_ms())' }]} />
            {ids(y1 + 30, ['m1-t1-1729', 'm1-t2-1729', 'm2-t1-1729'], [X, X + 120, X + 240])}
          </g>
        )}
      </Step>

      <Step n={2}>
        <Num x={NX} y={y2 - 5} n={2} size={ns} />
        {P ? (
          <g>
            <Code x={X} y={y2} size={cs} seed={s('c2')} segs={[{ t: 'concat(machine_id, ' }, { t: 'get_epoch_ms(),', tone: 'ink' }]} />
            <Code x={X + 46} y={y2 + 18} size={cs} seed={s('c2b')} segs={[{ t: 'counter++', mark: true }, { t: ')' }]} />
            {ids(y2 + 44, ['m1-1729-01', 'm1-1729-02', 'm1-1729-03', 'm1-1730-01'], colsW)}
          </g>
        ) : (
          <g>
            <Code x={X} y={y2} size={cs} seed={s('c2')} segs={[{ t: 'concat(machine_id, ' }, { t: 'get_epoch_ms(),' }, { t: ' ' }, { t: 'counter++', mark: true }, { t: ')' }]} />
            {ids(y2 + 30, ['m1-1729-01', 'm1-1729-02', 'm1-1729-03', 'm1-1730-01'], colsW)}
          </g>
        )}
        <CounterCell x={A + 46} y={28} s={28} value="3" seed={s('ctr')} size={ls} />
        <Label x={A + 60} y={20} size={ls}>counter</Label>
      </Step>

      <Step n={3}>
        <Num x={NX} y={y3 - 5} n={3} tone="red" size={ns} />
        {/* the time part of version 2's code line, struck out */}
        <Strike x0={X + 19 * cw(cs) - 2} x1={X + 34 * cw(cs)} y={y2 - cs * 0.32} seed={s('st')} />
        <Label tone="red" anchor="start" x={X} y={y3} size={ls}>the counter already grows on every call:</Label>
        <Label tone="red" anchor="start" x={X} y={y3 + 20} size={ls}>the time part adds nothing</Label>
      </Step>

      <Step n={4}>
        <Num x={NX} y={y4 - 5} n={4} tone="green" size={ns} />
        <Code x={X} y={y4} size={cs} seed={s('c4')} segs={[{ t: 'concat(machine_id, ' }, { t: 'counter++', mark: true }, { t: ')' }]} />
        {['m1-01', 'm1-02', 'm1-03'].map((t, i) => <Label key={t} kind="mono" x={A} y={y4 + 30 + i * 20} size={cs}>{t}</Label>)}
        {['m2-01', 'm2-02', 'm2-03'].map((t, i) => <Label key={t} kind="mono" x={B} y={y4 + 30 + i * 20} size={cs}>{t}</Label>)}
        <Tick x={B + 40} y={y4 + 52} seed={s('ok')} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·d */

type Seg = { t: string; mark?: boolean };
const RUNGS: { why: string; desk: Seg[]; phone: Seg[][] }[] = [
  { why: 'one machine', desk: [{ t: 'return epoch_ms()' }], phone: [[{ t: 'return epoch_ms()' }]] },
  { why: 'many machines', desk: [{ t: 'concat(' }, { t: 'machine_id, ', mark: true }, { t: 'epoch_ms())' }],
    phone: [[{ t: 'concat(' }, { t: 'machine_id, ', mark: true }, { t: 'epoch_ms())' }]] },
  { why: 'threads', desk: [{ t: 'concat(machine_id, ' }, { t: 'thread_id, ', mark: true }, { t: 'epoch_ms())' }],
    phone: [[{ t: 'concat(machine_id, ' }, { t: 'thread_id,', mark: true }], [{ t: 'epoch_ms())' }]] },
  { why: 'shorter IDs', desk: [{ t: 'concat(machine_id, ' }, { t: 'counter++', mark: true }, { t: ')' }],
    phone: [[{ t: 'concat(machine_id, ' }, { t: 'counter++', mark: true }, { t: ')' }]] },
  { why: 'reboots', desk: [{ t: 'counter = ' }, { t: 'load()', mark: true }, { t: '; counter++; ' }, { t: 'save(counter)', mark: true }],
    phone: [[{ t: 'counter = ' }, { t: 'load()', mark: true }], [{ t: 'counter++; ' }, { t: 'save(counter)', mark: true }]] },
  { why: 'fewer disk writes', desk: [{ t: 'counter = load()' }, { t: ' + N', mark: true }, { t: '; … ' }, { t: 'if counter % N == 0:', mark: true }, { t: ' save()' }],
    phone: [[{ t: 'counter = load()' }, { t: ' + N', mark: true }], [{ t: 'if counter % N == 0:', mark: true }, { t: ' save()' }]] },
];

export function SixVersions({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l03-f2e-p' : 'l03-f2e';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Six versions of getid()';
  const desc = 'A ladder of the six versions of getid() built in this chapter, each with the constraint that forced it: one machine returns the epoch millisecond; many machines add the machine ID; threads add the thread ID; shorter IDs replace the thread ID and time with an atomic counter; reboots load the counter at start and save it on every call; fewer disk writes start from load() + N and save only when the counter is a multiple of N. The part that changed from the rung above is underlined.';
  if (P) {
    const cs = 14;
    let y = 28;
    const rows = RUNGS.map((r, i) => {
      const y0 = y;
      const g = (
        <g key={i}>
          <Num x={16} y={y0 - 5} n={i + 1} size={14} />
          <Label anchor="start" x={34} y={y0}>{r.why}</Label>
          {r.phone.map((ln, j) => <Code key={j} x={34} y={y0 + 22 + j * 19} size={cs} seed={s(`r${i}-${j}`)} segs={ln} />)}
        </g>
      );
      y += 22 + r.phone.length * 19 + 18;
      return g;
    });
    return (
      <Fig id={id} w={340} h={y - 6} title={title} desc={desc}>
        <Line weight="thin" pts={[[16, 34], [16, y - 50]]} seed={s('rail')} />
        {rows}
      </Fig>
    );
  }
  const RH = 44;
  return (
    <Fig id={id} w={660} h={RUNGS.length * RH + 20} title={title} desc={desc}>
      <Line weight="thin" pts={[[18, 34], [18, 20 + (RUNGS.length - 1) * RH]]} seed={s('rail')} />
      {RUNGS.map((r, i) => {
        const y = 32 + i * RH;
        return (
          <g key={i}>
            <Num x={18} y={y - 5} n={i + 1} />
            <Label anchor="start" x={38} y={y}>{r.why}</Label>
            <Code x={196} y={y} seed={s(`r${i}`)} segs={r.desk} />
          </g>
        );
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §2 */

export function AddTheCause() {
  const s = (k: string) => `r2-${k}`;
  return (
    <Fig id="l03-rule2" w={320} h={100} className="bottomup" title="Add what caused the collision"
      desc="Two IDs, m1-1729 and m2-1729. The same millisecond collided on two machines, so the machine prefixes m1 and m2, the cause of the collision, are added and underlined.">
      <Code x={40} y={40} seed={s('a')} segs={[{ t: 'm1-', mark: true }, { t: '1729' }]} />
      <Code x={196} y={40} seed={s('b')} segs={[{ t: 'm2-', mark: true }, { t: '1729' }]} />
      <Tick x={274} y={40} seed={s('ok')} />
      <Label x={160} y={84}>add what caused the collision</Label>
    </Fig>
  );
}


// Lecture 03 (lec05), §2.4–2.7 figures: Fig 2·e "Wait, signal, re-check" (StepThrough), Fig 2·f "Two taps on seat 67",
// Fig 2·g "Lock for a moment, hold for ten minutes", and the §2 rule-box sketch.
import React from 'react';
import { Arrow, Box, Cross, Fig, Label, Lifeline, Line, Mark, Num, Step, TimeAxis } from './floor';
import { Hourglass, LockMark, RowBox, Tx } from './s2a-check-in-parts';
import { ellipse } from '../kit/hand';

/* ------------------------------------------------------------------ Fig 2·e: wait, signal, re-check (StepThrough) */

export function WaitSignal({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig2e-p' : 'fig2e';
  const W = P ? 340 : 440;
  const [T1, T2, T3] = P ? [58, 120, 182] : [70, 140, 210];
  const E = P ? 270 : 296; // engine lane
  const SE = 382; // seats lane (wide only)
  const NX = P ? 30 : 40;
  const T = P ? 13 : 14;
  const s = (k: string) => `${id}-${k}`;
  const seat = (y: number, label: string, lock: 'ink' | 'green' | null, k: string) => P ? null : (
    <g>
      <RowBox x={SE - 30} y={y} w={60} h={22} label={label} seed={s(k)} size={13} />
      {lock && <LockMark x={SE + 40} y={y + 9} tone={lock} seed={s(k + 'l')} />}
    </g>
  );
  // Labels are stacked so each one fits inside its own lane gap, clear of the next lifeline.
  const grant = (seatLabel: string, y: number, x: number) => <>
    <Label kind="mono" tone="green" anchor="start" x={x + 6} y={y} size={T}>{seatLabel}</Label>
    <Label kind="mono" tone="green" anchor="start" x={x + 6} y={y + 15} size={T}>+ lock</Label>
  </>;
  return (
    <Fig id={id} w={W} h={636} title="Wait, signal, re-check"
      desc="Swim lanes for three transactions, the database engine and, on wide screens, the seats; time runs down. 1: T1, T2 and T3 all run SELECT … ORDER BY id LIMIT 1 FOR UPDATE. The engine grants T1 the lock on 1A; T2 and T3 get no row yet and wait. 2: T1 updates 1A and commits, releasing its lock, and the engine signals the waiters. 3: T2 and T3 re-evaluate the same statement inside the engine; 1A no longer has user_id NULL, so the scan moves on and T2 locks 1B while T3 waits again. 4: T2 commits, T3 is signalled, re-checks and locks 1C. 5: in the worst case every waiter re-checks after every commit: 3 + 2 + 1 = 6 evaluations for 3 transactions, N(N+1)/2.">
      {[T1, T2, T3].map((x, i) => <Tx key={i} x={x} y={40} label={`T${i + 1}`} seed={s('tx' + i)} size={T} />)}
      <Box x={E - 36} y={22} w={72} h={34} label="engine" seed={s('eng')} labelSize={T - 0.5} />
      <Label kind="mono" muted x={E} y={76} size={13.5}>lock table</Label>
      {!P && <Label kind="mono" x={SE} y={44} size={T}>seats</Label>}
      {[T1, T2, T3, E, ...(P ? [] : [SE])].map((x, i) => <Lifeline key={'l' + i} x={x} y0={86} y1={532} seed={s('ll' + i)} />)}
      <TimeAxis x={P ? 10 : 14} y0={92} y1={530} seed={s('t')} size={13} />

      <Step n={1}>
        <Label kind="mono" tone="blue" anchor="start" x={T1 + 8} y={102} size={T}>… LIMIT 1 FOR UPDATE</Label>
        {[T1, T2, T3].map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 110 + i * 4], [E - 2, 126 + i * 2]]} seed={s('1q' + i)} />)}
        <Arrow tone="green" pts={[[E - 2, 146], [T1 + 2, 160]]} seed={s('1g')} />
        {grant('1A', 180, T1)}
        {seat(134, '1A', 'green', 's1')}
        <Hourglass x={T2} y={214} seed={s('h2')} />
        <Hourglass x={T3} y={214} seed={s('h3')} />
        <Label anchor="start" x={T3 + 9} y={212} size={13}>waiting:</Label>
        <Label anchor="start" x={T3 + 9} y={227} size={13}>no row yet</Label>
        <Num x={NX} y={P ? 136 : 120} n={1} tone="blue" size={T} />
      </Step>
      <Step n={2}>
        <Label kind="mono" tone="green" anchor="start" x={T1 + 8} y={250} size={T}>UPDATE</Label>
        <Label kind="mono" tone="green" anchor="start" x={T1 + 8} y={265} size={T}>COMMIT</Label>
        <Arrow tone="green" pts={[[T1, 272], [E - 2, 282]]} seed={s('2c')} />
        {seat(270, '1A = T1', null, 's2')}
        <Arrow weight="thin" pts={[[E - 2, 292], [T2 + 2, 304]]} seed={s('2s2')} />
        <Arrow weight="thin" pts={[[E - 2, 296], [T3 + 2, 306]]} seed={s('2s3')} />
        <Label kind="mono" anchor="start" x={E + 8} y={312} size={T}>signal</Label>
        <Num x={NX} y={274} n={2} tone="green" size={T} />
      </Step>
      <Step n={3}>
        {P
          ? <Label anchor="start" x={E + 8} y={352} size={13}>re-check</Label>
          : <><Label anchor="start" x={T2 + 6} y={332} size={13}>re-check</Label>
              <Label anchor="start" x={T3 + 6} y={332} size={13}>re-check</Label></>}
        <Arrow tone="blue" pts={[[T2, 340], [E - 2, 350]]} seed={s('3q2')} />
        <Arrow tone="blue" pts={[[T3, 344], [E - 2, 352]]} seed={s('3q3')} />
        <Arrow tone="green" pts={[[E - 2, 364], [T2 + 2, 378]]} seed={s('3g')} />
        {grant('1B', 396, T2)}
        {seat(354, '1B', 'green', 's3')}
        <Hourglass x={T3} y={418} seed={s('h3b')} />
        <Label anchor="start" x={T3 + 9} y={423} size={T}>waits</Label>
        <Num x={NX} y={348} n={3} tone="blue" size={T} />
      </Step>
      <Step n={4}>
        <Label kind="mono" tone="green" anchor="start" x={T2 + 8} y={446} size={T}>COMMIT</Label>
        <Arrow tone="green" pts={[[T2, 452], [E - 2, 462]]} seed={s('4c')} />
        <Arrow weight="thin" pts={[[E - 2, 470], [T3 + 2, 480]]} seed={s('4s')} />
        <Label kind="mono" anchor="start" x={E + 8} y={484} size={T}>signal</Label>
        <Arrow tone="green" pts={[[E - 2, 492], [T3 + 2, 504]]} seed={s('4g')} />
        {grant('1C', 520, T3)}
        {seat(498, '1C', 'green', 's4')}
        <Num x={NX} y={462} n={4} tone="green" size={T} />
      </Step>
      <Step n={5}>
        <Line dotted pts={[[P ? 20 : 26, 548], [W - 10, 548]]} seed={s('sep')} />
        <Num x={NX} y={580} n={5} size={T} />
        <Label kind="mono" anchor="start" x={NX + 18} y={585} size={T}>evaluations: 3 + 2 + 1 = 6</Label>
        <Label kind="mono" muted anchor="start" x={NX + 18} y={605} size={T}>= N(N+1)/2 for N = 3</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·f: two taps on seat 67 */

export function SeatSixtySeven() {
  const K1 = 64, K2 = 168, S = 284;
  return (
    <Fig id="fig2f" w={340} h={350} title="Two taps on seat 67"
      desc="Two kiosks send SELECT … WHERE id = 67 AND user_id IS NULL FOR UPDATE for the same seat. Kiosk 1 gets the lock, updates the seat and commits. Kiosk 2 waits, then re-checks the same seat, finds it taken and matches no rows: the screen says the seat is gone. The query is pinned to id 67, so there is nowhere else to go.">
      <Label kind="mono" x={K1} y={30} size={14}>kiosk 1</Label>
      <Label kind="mono" x={K2} y={30} size={14}>kiosk 2</Label>
      <RowBox x={S - 40} y={12} w={80} h={26} label="seat 67" seed="f2f-seat" size={14} />
      {[K1, K2, S].map((x, i) => <Lifeline key={i} x={x} y0={46} y1={300} seed={`f2f-l${i}`} />)}
      <Label kind="mono" tone="blue" anchor="start" x={K1 + 8} y={64} size={13}>… id = 67 FOR UPDATE</Label>
      <Arrow tone="blue" pts={[[K1, 72], [S - 2, 82]]} seed="f2f-q1" />
      <Arrow tone="blue" pts={[[K2, 88], [S - 2, 98]]} seed="f2f-q2" />
      <Arrow tone="green" pts={[[S - 2, 112], [K1 + 2, 124]]} seed="f2f-g1" />
      <LockMark x={S + 14} y={112} tone="green" seed="f2f-lk" />
      <Label kind="mono" tone="green" anchor="start" x={K1 + 6} y={140} size={13}>lock</Label>
      <Hourglass x={K2} y={134} seed="f2f-h" />
      <Label anchor="start" x={K2 + 9} y={139} size={14}>waits</Label>
      <Label kind="mono" tone="green" anchor="start" x={K1 + 8} y={160} size={13}>UPDATE, COMMIT</Label>
      <Arrow tone="green" pts={[[K1, 166], [S - 2, 178]]} seed="f2f-c1" />
      <Label kind="mono" tone="green" anchor="start" x={S + 8} y={184} size={13}>taken</Label>
      <Label kind="mono" anchor="start" x={K2 + 8} y={206} size={13}>re-check id = 67</Label>
      <Arrow tone="blue" pts={[[K2, 212], [S - 2, 222]]} seed="f2f-q3" />
      <Arrow tone="red" pts={[[S - 2, 236], [K2 + 2, 248]]} seed="f2f-r" />
      <Cross x={226} y={242} size={14} seed="f2f-x" />
      <Label kind="mono" tone="red" anchor="start" x={K2 + 6} y={268} size={13}>no rows</Label>
      <Label tone="red" anchor="end" x={K2 - 10} y={268} size={14}>seat’s gone</Label>
      <Label x={170} y={330} size={14}>pinned to id = 67: nowhere else to go</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·g: lock for a moment, hold for ten minutes */

const HOLD_TITLE = 'Lock for a moment, hold for ten minutes';
const HOLD_DESC = 'A time axis from 0 to 10 minutes. At 0, a transaction lasting a moment locks the seat, sets its status to HOLD and commits. For the next 10 minutes the seat is on hold: a status in the row, with no lock held, while the user pays. The later phases, after the payment, belong to a separate design and are not drawn in detail. Below, struck out in red: one transaction held open for the whole 10 minutes, which would collapse the database’s throughput.';

export function HoldNotLock({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig2g-p" w={340} h={560} title={HOLD_TITLE} desc={HOLD_DESC}>
        <Arrow pts={[[40, 40], [40, 530]]} seed="f2g-p-ax" />
        <Label kind="mono" muted anchor="end" x={32} y={64} size={13}>0</Label>
        <Label kind="mono" muted anchor="end" x={32} y={484} size={13}>10</Label>
        <Label kind="mono" muted anchor="end" x={32} y={500} size={13}>min</Label>
        <Mark tone="green" weight="heavy" a={[34, 60]} b={[60, 60]} seed="f2g-p-s1" />
        <Label kind="mono" tone="green" anchor="start" x={68} y={56} size={13}>txn: lock seat → HOLD</Label>
        <Label kind="mono" tone="green" anchor="start" x={68} y={72} size={13}>→ commit (a moment)</Label>
        <Box x={48} y={88} w={26} h={372} seed="f2g-p-band" />
        <Label anchor="start" x={86} y={200} size={14}>seat on hold:</Label>
        <Label anchor="start" x={86} y={218} size={14}>a status, no lock</Label>
        <Box x={86} y={250} w={92} h={30} label="payment" seed="f2g-p-pay" labelSize={14} />
        <Mark tone="green" weight="heavy" a={[34, 480]} b={[60, 480]} seed="f2g-p-s2" />
        <Label kind="mono" tone="green" anchor="start" x={68} y={478} size={13}>later phases:</Label>
        <Label kind="mono" tone="green" anchor="start" x={68} y={494} size={13}>a separate design</Label>
        <Line tone="red" weight="heavy" pts={[[270, 60], [270, 480]]} seed="f2g-p-bad" />
        <Cross x={270} y={330} size={26} seed="f2g-p-x" />
        <Label kind="mono" tone="red" x={300} y={160} rotate={90} size={13}>one transaction for 10 min</Label>
        <Label tone="red" x={250} y={544} size={14}>throughput collapses</Label>
      </Fig>
    );
  return (
    <Fig id="fig2g" w={720} h={262} title={HOLD_TITLE} desc={HOLD_DESC}>
      <Arrow pts={[[40, 150], [692, 150]]} seed="f2g-ax" />
      <Mark a={[62, 144]} b={[62, 156]} seed="f2g-t0" />
      <Mark a={[658, 144]} b={[658, 156]} seed="f2g-t1" />
      <Label kind="mono" muted x={62} y={172} size={13}>0</Label>
      <Label kind="mono" muted x={658} y={172} size={13}>10 min</Label>
      <Box x={68} y={118} w={584} h={24} seed="f2g-band" />
      <Label x={360} y={135} size={14}>seat on hold: a status, no lock</Label>
      <Box x={318} y={78} w={84} h={28} label="payment" seed="f2g-pay" labelSize={14} />
      <Mark tone="green" weight="heavy" a={[62, 112]} b={[62, 146]} seed="f2g-s1" />
      <Label kind="mono" tone="green" anchor="start" x={56} y={66} size={13}>txn: lock seat → HOLD → commit</Label>
      <Line weight="thin" tone="green" pts={[[62, 72], [62, 110]]} seed="f2g-lead1" />
      <Mark tone="green" weight="heavy" a={[658, 112]} b={[658, 146]} seed="f2g-s2" />
      <Label kind="mono" tone="green" anchor="end" x={664} y={66} size={13}>later phases: a separate design</Label>
      <Line weight="thin" tone="green" pts={[[658, 72], [658, 110]]} seed="f2g-lead2" />
      <Line tone="red" weight="heavy" pts={[[62, 210], [658, 210]]} seed="f2g-bad" />
      <Label kind="mono" tone="red" x={360} y={198} size={13}>one transaction for 10 minutes</Label>
      <Cross x={600} y={210} size={24} seed="f2g-x" />
      <Label tone="red" x={360} y={240} size={14}>throughput collapses</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Rule-box sketch §2 */

export function FixedInventory({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const W = P ? 320 : 480;
  const x0 = P ? 150 : 196, gap = P ? 22 : 26, y = 96;
  const tx = x0 + 2 * gap;
  const from: [number, number][] = P
    ? [[20, 40], [20, 96], [20, 150], [60, 14], [110, 8], [250, 8], [296, 24], [306, 60]]
    : [[40, 40], [40, 96], [40, 150], [90, 16], [150, 10], [330, 10], [400, 24], [440, 60]];
  return (
    <Fig id={P ? 'rule2-p' : 'rule2'} w={W} h={172} title="Fixed inventory plus contention"
      desc="Six seats in a row. Eight arrows, many people, converge on the same seat, which carries a lock mark: fixed inventory plus contention calls for locking.">
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} className={i === 2 ? 'ink dot' : 'ink thin'} d={ellipse(x0 + i * gap, y, 5, 5, `r2-${P ? 'p' : 'w'}-${i}`)} />
      ))}
      {from.map(([fx, fy], i) => {
        const dx = tx - fx, dy = y - fy, d = Math.hypot(dx, dy);
        return <Arrow key={i} tone="blue" weight="thin" pts={[[fx, fy], [tx - (dx / d) * 12, y - (dy / d) * 12]]} seed={`r2-${P ? 'p' : 'w'}-a${i}`} />;
      })}
      <LockMark x={tx + 12} y={y - 12} tone="ink" seed={`r2-${P ? 'p' : 'w'}-lk`} />
      <Label kind="mono" x={P ? 210 : 330} y={152} size={14}>fixed inventory + contention</Label>
    </Fig>
  );
}

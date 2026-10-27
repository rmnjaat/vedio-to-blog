// Lecture 03 (lec05), §2.1–2.3 figures: Fig 2·a schema (D-04), Fig 2·b architecture (D-05),
// Fig 2·c the seat map after approach 2 (from the terminal), Fig 2·d "Three kiosks, one first seat" (StepThrough).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Lifeline, Line, Mark, Num, Step, TimeAxis } from './floor';
import { MiniTable, miniTableH, RowBox, SeatMap, seatX, seatY } from './s2a-check-in-parts';

/* ------------------------------------------------------------------ Fig 2·a: the check-in schema (D-04) */

const AIRLINES = [['1', 'AIRINDIA'], ['2', 'INDIGO'], ['3', 'GOAIR']];
const FLIGHTS = [['1', '1', 'AIRINDIA 101'], ['2', '1', 'AIRINDIA 279'], ['3', '2', 'INDIGO 6E101']];
const TRIPS = [['1', '1', '08/04/2022 10:00'], ['2', '1', '09/04/2022 10:00'], ['3', '2', '08/04/2022 9:00'], ['4', '3', '09/04/2022 12:00'], ['5', '3', '08/04/2022 07:00']];
const USERS = [['1', 'user 1'], ['2', 'user 2'], ['3', 'user 3'], ['4', 'user 4'], ['5', 'user 5']];
const SEATS = [['1', '1A', '1', '1'], ['2', '1B', '1', '3'], ['3', '1C', '1', '2'], ['4', '1D', '1', '5'], ['5', '1E', '1', '4'], ['6', '1F', '1', 'NULL']];

const SCHEMA_TITLE = 'The check-in schema';
const SCHEMA_DESC = 'Five tables. airlines (id, name): AIRINDIA, INDIGO, GOAIR. flights (id, airline_id, name), each pointing at an airline. trips (id, flight_id, fly_time), each pointing at a flight. users (id, name). seats (id, name, trip_id, user_id): one row per seat of a trip, named 1A, 1B and so on, pointing at its trip and at the user who sits there. On a new trip every user_id starts NULL; user_id is the only column the demo writes.';

export function CheckinSchema({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <CheckinSchemaPhone />;
  const top = 50, low = 250;
  const tripsBottom = top + miniTableH(5);
  return (
    <Fig id="fig2a" w={880} h={432} title={SCHEMA_TITLE} desc={SCHEMA_DESC}>
      <MiniTable x={24} y={top} title="airlines" seed="f2a-air" cols={[{ h: 'id', w: 36 }, { h: 'name', w: 112 }]} rows={AIRLINES} />
      <MiniTable x={236} y={top} title="flights" seed="f2a-fl" cols={[{ h: 'id', w: 36 }, { h: 'airline_id', w: 116 }, { h: 'name', w: 140 }]} rows={FLIGHTS} />
      <MiniTable x={560} y={top} title="trips" seed="f2a-tr" cols={[{ h: 'id', w: 36 }, { h: 'flight_id', w: 104 }, { h: 'fly_time', w: 164 }]} rows={TRIPS} />
      <MiniTable x={24} y={low} title="users" seed="f2a-us" cols={[{ h: 'id', w: 36 }, { h: 'name', w: 100 }]} rows={USERS} />
      <MiniTable x={236} y={low} title="seats" seed="f2a-se" blueCol={3}
        cols={[{ h: 'id', w: 36 }, { h: 'name', w: 60 }, { h: 'trip_id', w: 88 }, { h: 'user_id', w: 90 }]} rows={SEATS} />

      {/* key links, thin, head at the referenced table */}
      <Arrow weight="thin" pts={[[234, 62], [176, 62]]} seed="f2a-k1" />
      <Arrow weight="thin" pts={[[558, 62], [532, 62]]} seed="f2a-k2" />
      <Arrow weight="thin" pts={[[512, 262], [646, 262], [646, tripsBottom + 4]]} seed="f2a-k3" />
      <Arrow weight="thin" pts={[[234, 262], [164, 262]]} seed="f2a-k4" />
      <Label kind="mono" muted x={199} y={254} size={12.5}>user_id</Label>
      <Label kind="mono" muted anchor="end" x={640} y={254} size={12.5}>trip_id</Label>

      <Label tone="blue" anchor="start" x={530} y={300} size={14}>user_id: the only column the demo writes</Label>
      <Label anchor="start" x={530} y={393} size={14}>← on a new trip, every user_id starts NULL</Label>
      <Label muted anchor="start" x={530} y={336} size={13}>seat names follow the plane: 1A … 1F, 2A …</Label>
    </Fig>
  );
}

function CheckinSchemaPhone() {
  const S = 12.5;
  const blocks: { title: string; cols: { h: string; w: number }[]; rows: string[][]; keys?: string; blue?: number }[] = [
    { title: 'airlines', cols: [{ h: 'id', w: 30 }, { h: 'name', w: 96 }], rows: AIRLINES },
    { title: 'flights', cols: [{ h: 'id', w: 30 }, { h: 'airline_id', w: 94 }, { h: 'name', w: 112 }], rows: FLIGHTS, keys: 'airline_id → airlines.id' },
    { title: 'trips', cols: [{ h: 'id', w: 30 }, { h: 'flight_id', w: 82 }, { h: 'fly_time', w: 136 }], rows: TRIPS, keys: 'flight_id → flights.id' },
    { title: 'users', cols: [{ h: 'id', w: 30 }, { h: 'name', w: 86 }], rows: USERS },
    { title: 'seats', cols: [{ h: 'id', w: 30 }, { h: 'name', w: 46 }, { h: 'trip_id', w: 66 }, { h: 'user_id', w: 70 }], rows: SEATS, keys: 'trip_id → trips.id · user_id → users.id', blue: 3 },
  ];
  let y = 34, seatsY = 0;
  const out: React.ReactNode[] = [];
  blocks.forEach((b, i) => {
    if (b.title === 'seats') seatsY = y;
    out.push(<MiniTable key={b.title} x={12} y={y} title={b.title} seed={`f2a-p-${i}`} cols={b.cols} rows={b.rows} size={S} blueCol={b.blue} />);
    y += miniTableH(b.rows.length, S);
    if (b.keys) { out.push(<Label key={b.title + 'k'} kind="mono" muted anchor="start" x={12} y={y + 20} size={12.5}>{b.keys}</Label>); y += 24; }
    y += 44;
  });
  return (
    <Fig id="fig2a-p" w={340} h={y + 10} title={SCHEMA_TITLE} desc={SCHEMA_DESC}>
      {out}
      <Label tone="blue" anchor="start" x={234} y={seatsY + 14} size={13}>← the column</Label>
      <Label tone="blue" anchor="start" x={234} y={seatsY + 30} size={13}>the demo writes</Label>
      <Label anchor="start" x={234} y={seatsY + 23.5 + 5 * 21 - 5} size={13}>a new trip:</Label>
      <Label anchor="start" x={234} y={seatsY + 23.5 + 6 * 21 - 5} size={13}>← all NULL</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b: check-in architecture (D-05) */

const ARCH_TITLE = 'Check-in architecture';
const ARCH_DESC = 'Passengers use the check-in service, which reads and writes seats in MySQL. An admin service, run by the airline, also writes to MySQL: it adds flights and trips and, when a trip opens, creates one seat row per seat with user_id NULL.';

export function CheckinArch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig2b-p" w={340} h={452} title={ARCH_TITLE} desc={ARCH_DESC}>
        <Actor x={130} y={16} s={0.9} seed="f2b-p-u1" />
        <Actor x={170} y={16} s={0.9} seed="f2b-p-u2" />
        <Actor x={210} y={16} s={0.9} seed="f2b-p-u3" />
        <Label x={170} y={82} size={14}>passengers</Label>
        <Arrow tone="blue" pts={[[170, 92], [170, 126]]} seed="f2b-p-a1" />
        <Box x={105} y={128} w={130} h={40} label="check-in" seed="f2b-p-ci" />
        <Label x={170} y={190} size={13}>end-user facing check-ins</Label>
        <Arrow tone="blue" pts={[[170, 200], [170, 232]]} seed="f2b-p-a2" />
        <Cyl cx={170} top={238} rx={40} ry={9} h={48} label="mysql" seed="f2b-p-db" />
        <Actor x={30} y={354} s={0.85} seed="f2b-p-ad" />
        <Label x={30} y={414} size={13}>admin</Label>
        <Box x={60} y={352} w={110} h={40} label="admin svc" seed="f2b-p-adm" />
        <Arrow pts={[[172, 372], [262, 372], [262, 262], [214, 262]]} seed="f2b-p-a3" />
        <Label x={190} y={420} size={13}>adds flights & trips,</Label>
        <Label x={190} y={438} size={13}>opens seats (user_id NULL)</Label>
      </Fig>
    );
  return (
    <Fig id="fig2b" w={620} h={322} title={ARCH_TITLE} desc={ARCH_DESC}>
      <Actor x={40} y={58} seed="f2b-u1" />
      <Actor x={78} y={58} seed="f2b-u2" />
      <Actor x={116} y={58} seed="f2b-u3" />
      <Label x={78} y={130} size={14}>passengers</Label>
      <Arrow tone="blue" pts={[[140, 86], [208, 86]]} seed="f2b-a1" />
      <Box x={210} y={64} w={130} h={44} label="check-in" seed="f2b-ci" />
      <Label x={275} y={46} size={14}>end-user facing check-ins</Label>
      <Arrow tone="blue" pts={[[342, 86], [420, 86]]} seed="f2b-a2" />
      <Cyl cx={466} top={58} rx={44} ry={10} h={56} label="mysql" seed="f2b-db" />
      <Actor x={340} y={212} s={0.9} seed="f2b-ad" />
      <Label x={340} y={274} size={14}>admin</Label>
      <Box x={384} y={214} w={124} h={42} label="admin svc" seed="f2b-adm" />
      <Arrow pts={[[510, 235], [566, 235], [566, 92], [512, 92]]} seed="f2b-a3" />
      <Label x={446} y={284} size={14}>adds flights & trips,</Label>
      <Label x={446} y={302} size={14}>opens seats (user_id NULL)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c: after approach 2 (terminal, 00:39) */

// The terminal printed 6 lines (seat letters) × 20 columns (seat rows). Transcribed from the frame at 00:39:57.
const A2_BY_LETTER: Record<string, number[]> = {
  A: [2, 10, 12, 16, 20],
  B: [4, 5, 6, 8, 11, 13, 14, 16, 19],
  C: [1, 7, 14, 18],
  D: [1, 2, 6, 8, 12, 14, 20],
  E: [1, 5, 9, 10, 13],
  F: [19],
};
const A2_BOOKED = Object.entries(A2_BY_LETTER).flatMap(([l, rs]) => rs.map((r) => `${r}${l}`));

export function AfterApproach2() {
  const X = 48, Y = 52, DY = 15;
  const ex = seatX(X, 4);
  const y7 = seatY(Y, 7, DY), y12 = seatY(Y, 12, DY);
  return (
    <Fig id="fig2c" w={340} h={372} title="After approach 2"
      desc="A seat map of 20 rows by 6 seats, A to F, after 120 passengers each booked a random seat with no checks. Most seats are empty. Seats 7E and 12E are ringed red: two passengers each were told they had booked them.">
      <SeatMap x={X} y={Y} rows={20} dy={DY} booked={A2_BOOKED} doubled={['7E', '12E']} seed="f2c" />
      <Line weight="thin" tone="red" pts={[[ex + 10, y7], [180, y7]]} seed="f2c-l7" />
      <Label kind="mono" tone="red" anchor="start" x={186} y={y7 + 5} size={13.5}>7-E: two passengers</Label>
      <Line weight="thin" tone="red" pts={[[ex + 10, y12], [180, y12]]} seed="f2c-l12" />
      <Label kind="mono" tone="red" anchor="start" x={186} y={y12 + 5} size={13.5}>12-E: two passengers</Label>
      <Label tone="red" anchor="start" x={186} y={y7 + 26} size={14}>two passes, one seat</Label>
      <Label muted anchor="start" x={186} y={seatY(Y, 17, DY)} size={14}>most seats</Label>
      <Label muted anchor="start" x={186} y={seatY(Y, 17, DY) + 18} size={14}>never booked</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·d: three kiosks, one first seat (StepThrough) */

export function FirstFreeSeat({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig2d-p' : 'fig2d';
  const W = P ? 340 : 420;
  const L = P ? [72, 134, 196] : [100, 172, 244]; // p1, p2, p3
  const S = P ? 254 : 320; // seats lane
  const NX = P ? 34 : 44;
  const T = P ? 13 : 14;
  const BW = P ? 72 : 76; // row-state boxes sit right of the seats lane, so arrows end on the line
  const s = (k: string) => `${id}-${k}`;
  const box = (y: number, label: string, tone: 'ink' | 'green' | 'red', k: string) =>
    <RowBox x={S + 8} y={y} w={BW} h={24} label={label} tone={tone} seed={s(k)} size={T - 0.5} />;
  return (
    <Fig id={id} w={W} h={612} title="Three kiosks, one first seat"
      desc="Swim lanes for three passengers, standing in for 120, and the seats table; time runs down. 1: all three run SELECT … WHERE user_id IS NULL ORDER BY id LIMIT 1 at the same moment and all three get seat 1A. 2: p1 updates 1A and commits, then p2 updates 1A and commits; the last write wins and p1’s booking is overwritten. 3: p3 reads after p2’s commit, so user_id IS NULL skips 1A and it gets 1B. 4: a handful of seats fill, in order, and the log shows 1A given to many passengers; 2 to 4 seats filled per run.">
      {L.map((x, i) => <Actor key={i} x={x} y={20} s={0.85} seed={s('a' + i)} />)}
      {L.map((x, i) => <Label key={'n' + i} kind="mono" x={x} y={84} size={T}>{`p${i + 1}`}</Label>)}
      {L.map((x, i) => <Label key={'k' + i} muted x={x} y={100} size={T - 0.5}>{`kiosk ${i + 1}`}</Label>)}
      <Label x={S} y={36} size={T}>3 of 120</Label>
      <Label kind="mono" x={S} y={84} size={T}>seats</Label>
      <Label muted x={S} y={100} size={T - 0.5}>trip 1</Label>
      {[...L, S].map((x, i) => <Lifeline key={'l' + i} x={x} y0={110} y1={516} seed={s('ll' + i)} />)}
      <TimeAxis x={P ? 10 : 16} y0={118} y1={514} seed={s('t')} size={13} />
      <RowBox x={S - 38} y={114} w={76} h={24} label="all NULL" tone="ink" seed={s('v0')} size={T - 0.5} />

      <Step n={1}>
        <Label kind="mono" tone="blue" anchor="start" x={L[0] + 8} y={152} size={T}>SELECT … LIMIT 1</Label>
        {L.map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 158 + i * 6], [S - 2, 168 + i * 10]]} seed={s('1q' + i)} />)}
        {L.map((x, i) => <Arrow key={'r' + i} tone="blue" pts={[[S - 2, 204 + i * 8], [x + 2, 214 + i * 6]]} seed={s('1r' + i)} />)}
        {/* each reply's value sits under its own arrowhead, below every shaft that passes over that lane */}
        {L.map((x, i) => <Label key={'v' + i} kind="mono" tone="blue" anchor="start" x={x + 8} y={250} size={T}>1A</Label>)}
        <Num x={NX} y={168} n={1} tone="blue" size={T} />
      </Step>
      <Step n={2}>
        {/* "UPDATE / commit" stacked so each label fits inside its own lane gap, clear of the next lifeline */}
        <Label kind="mono" tone="blue" anchor="start" x={L[0] + 8} y={276} size={T}>UPDATE</Label>
        <Label kind="mono" tone="blue" anchor="start" x={L[0] + 8} y={291} size={T}>commit</Label>
        <Arrow tone="blue" pts={[[L[0], 298], [S - 2, 310]]} seed={s('2a')} />
        {box(298, '1A = p1', 'green', 'v1')}
        <Label kind="mono" tone="blue" anchor="start" x={L[1] + 8} y={330} size={T}>UPDATE</Label>
        <Label kind="mono" tone="blue" anchor="start" x={L[1] + 8} y={345} size={T}>commit</Label>
        <Arrow tone="blue" pts={[[L[1], 352], [S - 2, 364]]} seed={s('2b')} />
        {box(352, '1A = p2', 'ink', 'v2')}
        <Mark tone="red" a={[S + 12, 310]} b={[S + 4 + BW, 310]} seed={s('2x')} />
        <Label tone="red" x={S + 8 + BW / 2} y={396} size={T}>p1’s seat</Label>
        <Label tone="red" x={S + 8 + BW / 2} y={412} size={T}>overwritten</Label>
        <Num x={NX} y={304} n={2} tone="blue" size={T} />
      </Step>
      <Step n={3}>
        <Label muted anchor="start" x={S + 8} y={436} size={T}>reads after</Label>
        <Label muted anchor="start" x={S + 8} y={451} size={T}>p2’s commit</Label>
        <Arrow tone="blue" pts={[[L[2], 456], [S - 2, 466]]} seed={s('3a')} />
        <Arrow tone="blue" pts={[[S - 2, 476], [L[2] + 2, 486]]} seed={s('3b')} />
        <Label kind="mono" tone="blue" anchor="start" x={L[2] + 8} y={506} size={T}>1B</Label>
        {box(472, '1B = p3', 'green', 'v3')}
        <Num x={NX} y={462} n={3} tone="blue" size={T} />
      </Step>
      <Step n={4}>
        <Line dotted pts={[[P ? 22 : 28, 528], [W - 10, 528]]} seed={s('sep')} />
        <Num x={NX} y={564} n={4} size={T} />
        <SeatMap x={NX + 42} y={564} rows={1} booked={['1A', '1B']} dx={16} aisle={10} seed={s('map')} />
        <Label kind="mono" anchor="start" x={NX + 150} y={569} size={T}>log: 1-A × many</Label>
        <Label anchor="start" x={NX + 18} y={600} size={T}>a handful, in order: 2 to 4 per run</Label>
      </Step>
    </Fig>
  );
}

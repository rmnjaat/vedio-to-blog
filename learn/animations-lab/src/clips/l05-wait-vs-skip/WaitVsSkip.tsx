// Clip l05-wait-vs-skip — "120 passengers, two queries".
// Storyboard: lectures/lec05/animations/l05-wait-vs-skip/storyboard.{yaml,md}. Ledger: L-0112, L-0113, L-0115, L-0119,
// L-0121, L-0122, L-0154, L-0155.
// Frame 0 = two lanes (FOR UPDATE above, FOR UPDATE SKIP LOCKED below), each with a crowd of passengers at the left,
// an empty seat strip and an empty time track; the last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×900, portrait re-flow, ≤ 640 px).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {handLine, serverBox, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, PASSENGERS, R, ROUND, ROUND0, T_SKIP, T_WAIT} from './timeline';

export type WaitVsSkipProps = {theme: ThemeName; layout?: Layout};

// Wide lettering pinned to the page's sheets (critic C-05): the stage shows at ×0.45 (540 px), so 34 canvas px lands
// at ~15 px and the 36 px caption at ~16 px, beside the sheets' 13–14 px labels. Phone keeps the shared sizes
// (30 → 15 px at 358 px).
const typeFor = (l: Layout) => (l === 'phone' ? TYPE_PHONE : {...TYPE, label: 34, mono: 34, small: 34, title: 36, caption: 36});
const CAP_K = 36 / TYPE.caption;
/** The shared caption band; on the wide stage drawn in a 1/CAP_K-size box and scaled down, so it letters at 36 px. */
const Captions: React.FC<{top: number; layout: Layout}> = ({top, layout}) =>
  layout === 'phone' ? (
    <CaptionBand cues={CAPTIONS} top={top} layout="phone" />
  ) : (
    <div style={{position: 'absolute', left: 0, top: 0, width: `${100 / CAP_K}%`, height: `${100 / CAP_K}%`, transform: `scale(${CAP_K})`, transformOrigin: '0 0'}}>
      <CaptionBand cues={CAPTIONS} top={top / CAP_K} layout="wide" />
    </div>
  );

const N = PASSENGERS;
const LIN = Easing.linear;
const fmt = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, '0')}` : String(n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const TS = TY.label;
  const CW = TS * 0.6; // mono advance
  // phone: 'slowed down' gets its own line above the lanes (the title row is full)
  const LANE_Y = (ph ? [50, 410] : [0, 318]) as readonly [number, number];
  const SLOWED_Y = ph ? 40 : LANE_Y[0] + 48;
  // seats: wide 1A..2F (12), phone 1A..1F (6); aisle after C, wider gap between rows
  const SEAT = ph ? {x0: 120, w: 62, h: 48, step: 70} : {x0: 150, w: 60, h: 54, step: 68};
  const N_VIS = ph ? 6 : 12;
  const gapAfter = (i: number) => (i === 2 || i === 8 ? 12 : i === 5 ? 22 : 0);
  const SEAT_X: number[] = [];
  for (let i = 0, x = SEAT.x0; i < N_VIS; i++) {
    SEAT_X.push(x);
    x += SEAT.step + gapAfter(i);
  }
  const SEAT_CX = SEAT_X.map((x) => x + SEAT.w / 2);
  const stripEnd = SEAT_X[N_VIS - 1] + SEAT.w;
  const TAIL_X = stripEnd + (ph ? 14 : 16);
  const TAIL_TEXT = '…20F';
  const TAIL_CX = TAIL_X + (TAIL_TEXT.length * CW) / 2;
  const TICK_X = TAIL_X + TAIL_TEXT.length * CW + (ph ? 30 : 34);
  // positions the top crowd / holder can sit at: each visible seat, then the tail
  const POS = [...SEAT_CX, TAIL_CX];
  const lane = (Y: number) =>
    ph
      ? {Y, title: Y + 40, crowdY: Y + 92, holderY: Y + 142, seatTop: Y + 156, barY: Y + 244, readY: Y + 254, counterY: Y + 298}
      : {Y, title: Y + 48, crowdY: Y + 104, holderY: Y + 160, seatTop: Y + 176, barY: Y + 272, readY: Y + 286, counterY: Y + 286};
  const L = LANE_Y.map(lane);
  const CROWD = ph ? {sp: 18, r: 7, homeX: 65} : {sp: 21, r: 8, homeX: 84};
  const CROWD_HALF = CROWD.sp + CROWD.r;
  // 12 slots, bottom row first (the remaining crowd sits nearest the seats)
  const SLOTS: Pt[] = [];
  for (let row = 3; row >= 0; row--) for (const col of [0, -1, 1]) SLOTS.push([col * CROWD.sp, (row - 1.5) * CROWD.sp]);
  const BAR = ph ? {x0: 74, max: 280, clockX: 50, clockR: 12} : {x0: 82, max: 400, clockX: 52, clockR: 14};
  // counter: number right-aligned at NUM_END, 'evaluations' after it, 'up to' / 'about' before it
  const NUM_END = ph ? 226 : 900;
  return {
    ph,
    W,
    H,
    TS,
    SLOWED_Y,
    CW,
    L,
    SEAT,
    N_VIS,
    SEAT_X,
    SEAT_CX,
    SEAT_D: L.map((l, li) => SEAT_X.map((x, i) => serverBox(x, l.seatTop, SEAT.w, SEAT.h, `seat${li}-${i}`))),
    TAIL_X,
    TAIL_TEXT,
    TAIL_CX,
    TICK_X,
    POS,
    CROWD,
    CROWD_HALF,
    SLOTS,
    BAR,
    TRACK_D: L.map((l, i) => handLine([BAR.x0, l.barY], [BAR.x0 + BAR.max, l.barY], `track${i}`)),
    NUM_END,
    TITLES: ['FOR UPDATE', 'FOR UPDATE SKIP LOCKED'] as const,
    TAGS: ph ? (['waits, re-checks', 'never waits'] as const) : (['waits, re-checks', 'skips, never waits'] as const),
    UNDERLINE_D: handLine(
      [40 + 11 * CW, L[1].title + (ph ? 9 : 11)],
      [40 + 22 * CW - CW * 0.1, L[1].title + (ph ? 9 : 11)],
      'underline',
    ),
    TWO_WORDS: {x: 40 + 16.5 * CW, y: L[1].title + (ph ? 40 : 48)},
    CAPTION_TOP: ph ? 756 : 652,
  };
};
type Geo = ReturnType<typeof build>;
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Piecewise-linear position along POS (seat centres, then the tail) for a fractional index p. */
const posX = (G: Geo, p: number) => {
  const q = Math.max(0, Math.min(G.POS.length - 1, p));
  const i = Math.min(G.POS.length - 2, Math.floor(q));
  return lerp(G.POS[i], G.POS[i + 1], q - i);
};

// ================= top lane (FOR UPDATE): state as a function of the frame =================
const roundAt = (r: number) => ROUND0 + r * ROUND;
const at = (r: number, o: readonly [number, number]) => [roundAt(r) + o[0], o[1]] as const;

/** Seats booked during the fast-forward: 3 -> visible seats over ffA, then -> 120 over ffB (linear: the run). */
const ffK = (G: Geo, frame: number) =>
  frame < EV.ffB[0]
    ? lerp(EV.rounds, G.N_VIS, ramp(frame, EV.ffA[0], EV.ffA[1], LIN))
    : lerp(G.N_VIS, N, ramp(frame, EV.ffB[0], EV.ffB[1], LIN));
/** Frame at which the fast-forward books visible seat i (i >= 3). */
const ffBookFrame = (G: Geo, i: number) => EV.ffA[0] + ((i + 1 - EV.rounds) / (G.N_VIS - EV.rounds)) * EV.ffA[1];
const topBookFrame = (G: Geo, i: number) => (i < EV.rounds ? roundAt(i) : ffBookFrame(G, i));
const topLockFrame = (i: number) => (i === 0 ? EV.lock0[0] : roundAt(i - 1) + R.lock[0]);

const topBooked = (G: Geo, frame: number) =>
  frame >= EV.ffA[0] ? ffK(G, frame) : [0, 1, 2].reduce((a, r) => a + ramp(frame, roundAt(r), R.commit[1], LIN), 0);

const topCrowdX = (G: Geo, frame: number) => {
  if (frame < EV.slide0[0] + EV.slide0[1]) return lerp(G.CROWD.homeX, G.POS[0], ramp(frame, EV.slide0[0], EV.slide0[1], EASE_MOVE));
  if (frame < EV.ffA[0]) return posX(G, [0, 1, 2].reduce((a, r) => a + ramp(frame, ...at(r, R.slide), EASE_MOVE), 0));
  return posX(G, ffK(G, frame));
};

/** Transactions waiting in the crowd (not holding a lock). */
const topWaiting = (G: Geo, frame: number) => {
  if (frame < EV.lock0[0]) return N;
  if (frame < EV.ffA[0]) {
    let w = N - 1;
    for (let r = 0; r < EV.rounds; r++) if (frame >= roundAt(r) + R.lock[0]) w--;
    return w;
  }
  return Math.max(0, N - Math.floor(ffK(G, frame)) - 1);
};

/** Worst-case evaluations after k commits: 120 + 119 + ... + (120 - k). */
const evalsAfter = (k: number) => N + N * k - (k * (k + 1)) / 2;
const topEvals = (G: Geo, frame: number): {v: number; since: number} => {
  if (frame >= EV.ffA[0]) return {v: evalsAfter(Math.min(N, Math.floor(ffK(G, frame)))), since: -1};
  let v = N;
  let since: number = EV.counter0[0];
  for (let r = 0; r < EV.rounds; r++) {
    const f = roundAt(r) + R.recheck[0];
    if (frame >= f) {
      v = evalsAfter(r + 1);
      since = f;
    }
  }
  return {v, since};
};

const topBlue = (frame: number) => {
  let b = fade(frame, EV.slide0[0], EV.lock0[0], 6, 8);
  for (let r = 0; r < EV.rounds; r++) b = Math.max(b, fade(frame, roundAt(r) + R.recheck[0], roundAt(r) + R.lock[0], 6, 8));
  return b;
};

// ================= bottom lane (SKIP LOCKED) =================
type Trip = {pts: Pt[]; len: number; depart: number; arrive: number};
const trip = (from: Pt, to: Pt[], depart: number): Trip => {
  const pts = [from, ...to];
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return {pts, len, depart, arrive: depart + Math.round(10 + len / 30)};
};
const pointOn = (t: Trip, p: number): Pt => {
  let d = t.len * p;
  for (let i = 1; i < t.pts.length; i++) {
    const [a, b] = [t.pts[i - 1], t.pts[i]];
    const seg = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (d <= seg || i === t.pts.length - 1) {
      const u = seg === 0 ? 1 : Math.min(1, d / seg);
      return [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
    }
    d -= seg;
  }
  return t.pts[t.pts.length - 1];
};
const buildSkip = (G: Geo) => {
  const l = G.L[1];
  const from: Pt = [G.CROWD.homeX + G.CROWD_HALF, l.crowdY]; // dots leave from the crowd's right edge
  const seats = G.SEAT_CX.map((cx, k) =>
    trip(from, [[cx, l.crowdY], [cx, l.holderY]], EV.skipStart + k * EV.skipGap),
  ).map((t) => ({...t, commit: t.arrive + EV.commitLag}));
  const streamStart = EV.skipStart + G.N_VIS * EV.skipGap;
  const streamN = G.ph ? 19 : 27;
  const perDot = (N - G.N_VIS) / streamN; // passengers per drawn stream dot (6 phone, 4 wide)
  const stream = Array.from({length: streamN}, (_, j) => trip(from, [[G.TAIL_CX, l.crowdY]], streamStart + j * EV.streamGap));
  return {seats, stream, perDot};
};
const SKIP = {wide: buildSkip(LAYOUTS.wide), phone: buildSkip(LAYOUTS.phone)};

// ================= component =================
export const WaitVsSkip: React.FC<WaitVsSkipProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const S = SKIP[layout];
  const {TS, L} = G;
  const [lt, lb] = L;

  // ---- top lane state ----
  const crowdX = topCrowdX(G, frame);
  const waiting = topWaiting(G, frame);
  const blue = topBlue(frame);
  const ev = topEvals(G, frame);
  const topLen = (G.BAR.max * topBooked(G, frame)) / N;
  const k = frame >= EV.ffA[0] ? ffK(G, frame) : 0;

  // ---- bottom lane state ----
  const departedSeats = S.seats.filter((t) => frame >= t.depart).length;
  const departedStream = S.stream.filter((t) => frame >= t.depart).length;
  const departed = Math.round(departedSeats + departedStream * S.perDot);
  const botBooked = S.seats.reduce((a, t) => a + ramp(frame, t.commit, 12, LIN), 0) + S.stream.filter((t) => frame >= t.arrive).length * S.perDot;
  const botLen = (G.BAR.max * (T_SKIP / T_WAIT) * botBooked) / N;

  const topDoneO = ramp(frame, ...EV.topDone, EASE_FADE);
  const botDoneO = ramp(frame, ...EV.botDone, EASE_FADE);

  // seat states for both lanes: locked (0..1), booked (0..1)
  const topSeat = (i: number) => {
    const lockF = topLockFrame(i);
    const bookF = topBookFrame(G, i);
    const booked = ramp(frame, bookF, i < EV.rounds ? 12 : 6, EASE_FADE);
    const locked = i <= EV.rounds ? fade(frame, lockF + 4, bookF, 8, i < EV.rounds ? 12 : 6) : 0;
    return {locked, booked};
  };
  const botSeat = (i: number) => {
    const t = S.seats[i];
    return {locked: fade(frame, t.arrive, t.commit, 6, 12), booked: ramp(frame, t.commit, 12, EASE_FADE)};
  };

  const waitN = (r: number) => N - 2 - r; // after round r's lock: 118, 117, 116
  // label windows on the top crowd: [written at, removed at]
  const waitLabels = [
    {text: `${N - 1} wait`, w: EV.waitLbl0, out: roundAt(0) + R.recheck[0]},
    ...[0, 1, 2].map((r) => ({
      text: `${waitN(r)} wait`,
      w: at(r, R.waitLbl),
      out: r < EV.rounds - 1 ? roundAt(r + 1) + R.recheck[0] : EV.ffDrop[0],
    })),
  ];
  const recheckLabels = [0, 1, 2].map((r) => ({w: at(r, R.recheck), out: roundAt(r) + R.lock[0]}));
  const lblX = crowdX + G.CROWD_HALF + (G.ph ? 38 : 44);
  const hgX = crowdX + G.CROWD_HALF + (G.ph ? 16 : 20);
  const hourglassO = Math.max(...waitLabels.map((w) => fade(frame, w.w[0], w.out, 8, 8)));

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        <Write x={G.W - 40} y={G.SLOWED_Y} text="slowed down" size={TS} color="ink2" anchor="end" />
        {L.map((l, li) => (
          <g key={li}>
            <Write x={40} y={l.title} text={G.TITLES[li]} size={TS} variant="mono" weight={560} />
            <Write x={40 + G.TITLES[li].length * G.CW + (G.ph ? 20 : 28)} y={l.title} text={G.TAGS[li]} size={TS} color="ink2" />
            {G.SEAT_D[li].map((d, i) => (
              <Ink key={i} d={d} color="ink2" width={STROKE.thin + 0.6} fill={T.sheet} />
            ))}
            {/* the empty track shows the shared scale; the bottom one gives way to its reading, which is written over it */}
            <Ink d={G.TRACK_D[li]} color="ink3" width={STROKE.thin} dash="2 10" opacity={li === 0 ? 1 : 1 - ramp(frame, EV.botReading[0] - 6, 8, EASE_FADE)} />
            <Clock x={G.BAR.clockX} y={l.barY} r={G.BAR.clockR} T={T} />
          </g>
        ))}

        {/* ===== seats: locked / booked overlays, labels on top ===== */}
        {L.map((l, li) =>
          G.SEAT_X.map((x, i) => {
            const st = li === 0 ? topSeat(i) : botSeat(i);
            return (
              <g key={`${li}-${i}`}>
                {st.booked > 0 ? (
                  <path d={G.SEAT_D[li][i]} fill={T.green} fillOpacity={0.2 * st.booked} stroke={T.green} strokeWidth={STROKE.ink} opacity={st.booked} />
                ) : null}
                {st.locked > 0 ? <path d={G.SEAT_D[li][i]} fill="none" stroke={T.ink} strokeWidth={STROKE.ink} opacity={st.locked} /> : null}
                <Write x={G.SEAT_CX[i]} y={l.seatTop + G.SEAT.h / 2 + TS * 0.35} text={seatName(i)} size={TS} variant="mono" anchor="middle" />
                <Padlock x={x + G.SEAT.w - 2} y={l.seatTop + 1} s={G.ph ? 0.85 : 1} o={st.locked} T={T} />
              </g>
            );
          }),
        )}
        {/* the tail: …20F, green with a tick when the lane is done */}
        {L.map((l, li) => {
          const o = li === 0 ? topDoneO : botDoneO;
          const y = l.seatTop + G.SEAT.h / 2 + TS * 0.35;
          return (
            <g key={li}>
              <Write x={G.TAIL_X} y={y} text={G.TAIL_TEXT} size={TS} variant="mono" color="ink2" opacity={1 - o} />
              <Write x={G.TAIL_X} y={y} text={G.TAIL_TEXT} size={TS} variant="mono" color="green" weight={600} opacity={o} />
              <Tick x={G.TICK_X} y={l.seatTop + G.SEAT.h / 2} color={T.green} sheet={T.sheet} o={o} s={G.ph ? 0.85 : 1} />
            </g>
          );
        })}

        {/* ===== top lane: the crowd, its holder, its labels ===== */}
        <Crowd G={G} x={crowdX} y={lt.crowdY} n={Math.ceil((12 * waiting) / N)} blue={blue} T={T} />
        {/* holders of seats 0..3 (seat 3's holder rides the crowd in the fast-forward) */}
        {[0, 1, 2, 3].map((i) => {
          const lockF = topLockFrame(i);
          if (frame < lockF) return null;
          const dropIn = ramp(frame, lockF, i === 0 ? EV.lock0[1] : R.lock[1], EASE_MOVE);
          const fromY = lt.crowdY + 1.5 * G.CROWD.sp;
          let x = G.SEAT_CX[i];
          let y = lerp(fromY, lt.holderY, dropIn);
          let o = 1;
          if (i < EV.rounds) {
            const c = ramp(frame, roundAt(i), R.commit[1], EASE_MOVE);
            y = lerp(y, lt.seatTop, c); // sinks onto the seat's edge and fades (never over the seat label)
            o = 1 - ramp(frame, roundAt(i) + 4, R.commit[1] - 4, EASE_FADE);
          } else {
            x = frame >= EV.ffA[0] ? posX(G, k) : x;
            o = 1 - ramp(frame, EV.ffB[0] + EV.ffB[1] - 6, 8, EASE_FADE);
          }
          if (o <= 0) return null;
          return <Dot key={i} x={x} y={y} r={G.CROWD.r + 1} color={T.green} sheet={T.sheet} o={o} />;
        })}
        <Hourglass x={hgX} y={lt.crowdY} s={G.ph ? 0.8 : 1} color={T.ink2} o={hourglassO} />
        {waitLabels.map((w, i) => (
          <Write key={`w${i}`} x={lblX} y={lt.crowdY + TS * 0.35} text={w.text} size={TS} progress={ramp(frame, ...w.w)} opacity={1 - ramp(frame, w.out, 8, EASE_FADE)} />
        ))}
        {recheckLabels.map((w, i) => (
          <Write key={`r${i}`} x={hgX - 6} y={lt.crowdY + TS * 0.35} text="re-check" size={TS} color="blue" weight={600} progress={ramp(frame, ...w.w)} opacity={1 - ramp(frame, w.out, 8, EASE_FADE)} />
        ))}

        {/* ===== bottom lane: crowd, travelling dots, holders ===== */}
        <Crowd G={G} x={G.CROWD.homeX} y={lb.crowdY} n={Math.ceil((12 * (N - departed)) / N)} blue={0} T={T} />
        {S.stream.map((t, j) => {
          if (frame < t.depart || frame > t.arrive) return null;
          const p = ramp(frame, t.depart, t.arrive - t.depart, EASE_MOVE);
          const [x, y] = pointOn(t, p);
          return <Dot key={`s${j}`} x={x} y={y} r={G.CROWD.r} color={T.blue} sheet={T.sheet} o={1 - ramp(frame, t.arrive - 5, 5, EASE_FADE)} />;
        })}
        {S.seats.map((t, i) => {
          if (frame < t.depart) return null;
          const p = ramp(frame, t.depart, t.arrive - t.depart, EASE_MOVE);
          let [x, y] = pointOn(t, p);
          const c = ramp(frame, t.commit, 12, EASE_MOVE);
          y = lerp(y, lb.seatTop, c);
          const o = 1 - ramp(frame, t.commit + 4, 8, EASE_FADE);
          if (o <= 0) return null;
          const g = ramp(frame, t.arrive - 2, 6, EASE_FADE);
          return (
            <g key={`d${i}`}>
              <Dot x={x} y={y} r={G.CROWD.r + (G.ph ? 0.5 : 1) * g} color={T.blue} sheet={T.sheet} o={o} />
              <Dot x={x} y={y} r={G.CROWD.r + (G.ph ? 0.5 : 1) * g} color={T.green} sheet={T.sheet} o={o * g} />
            </g>
          );
        })}

        {/* ===== time bars (same scale) + readings ===== */}
        {[topLen, botLen].map((len, li) =>
          len > 0.5 ? (
            <line key={li} x1={G.BAR.x0} y1={L[li].barY} x2={G.BAR.x0 + len} y2={L[li].barY} stroke={T.ink} strokeWidth={STROKE.thick + 1} strokeLinecap="round" />
          ) : null,
        )}
        <Write x={G.BAR.x0 + G.BAR.max + 18} y={lt.readY} text="1.7 s" size={TS} variant="mono" weight={600} progress={ramp(frame, ...EV.topReading)} />
        <Write x={G.BAR.x0 + G.BAR.max * (T_SKIP / T_WAIT) + 18} y={lb.readY} text="147 ms" size={TS} variant="mono" weight={600} progress={ramp(frame, ...EV.botReading)} />
        <Write
          x={G.BAR.x0 + G.BAR.max * (T_SKIP / T_WAIT) + 18 + 6 * G.CW + (G.ph ? 22 : 30)}
          y={lb.readY}
          text="≈ 1/10 the time"
          size={TS}
          progress={ramp(frame, ...EV.ratio)}
        />

        {/* ===== evaluation counters ===== */}
        <Counter G={G} y={lt.counterY} value={ev.v} prog={ev.since < 0 ? 1 : ramp(frame, ev.since, 10)} show={ramp(frame, ...EV.counter0)} prefix="up to" prefixP={ramp(frame, ...EV.topUpTo)} />
        <Counter G={G} y={lb.counterY} value={departed} prog={1} show={frame >= EV.skipStart ? ramp(frame, EV.skipStart, 16) : 0} prefix="about" prefixP={ramp(frame, ...EV.botAbout)} />

        {/* ===== two words ===== */}
        <Pen d={G.UNDERLINE_D} progress={ramp(frame, ...EV.underline)} width={STROKE.ink} />
        <Write x={G.TWO_WORDS.x} y={G.TWO_WORDS.y} text="two words" size={TS} anchor="middle" progress={ramp(frame, ...EV.twoWords)} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const seatName = (i: number) => `${Math.floor(i / 6) + 1}${'ABCDEF'[i % 6]}`;

/** The waiting crowd: up to 12 transaction dots in a 3×4 cluster, graphite, re-inked blue while evaluating. */
const Crowd: React.FC<{G: Geo; x: number; y: number; n: number; blue: number; T: Theme}> = ({G, x, y, n, blue, T}) => (
  <g>
    {G.SLOTS.slice(0, Math.max(0, Math.min(12, n))).map(([dx, dy], i) => (
      <g key={i}>
        <circle cx={x + dx} cy={y + dy} r={G.CROWD.r} fill={T.ink2} />
        {blue > 0 ? <circle cx={x + dx} cy={y + dy} r={G.CROWD.r} fill={T.blue} opacity={blue} /> : null}
      </g>
    ))}
  </g>
);

const Dot: React.FC<{x: number; y: number; r: number; color: string; sheet: string; o: number}> = ({x, y, r, color, sheet, o}) =>
  o <= 0 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={r + 3} fill={sheet} />
      <circle cx={x} cy={y} r={r} fill={color} />
    </g>
  );

/** Lock mark: a small padlock (body + shackle), green = lock held. Sits on a seat's top-right corner. */
const Padlock: React.FC<{x: number; y: number; s: number; o: number; T: Theme}> = ({x, y, s, o, T}) =>
  o <= 0 ? null : (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -6 -4 L -6 -10 Q -6 -17 0 -17 Q 6 -17 6 -10 L 6 -4" fill="none" stroke={T.green} strokeWidth={3.2} strokeLinecap="round" />
      <rect x={-10} y={-5} width={20} height={15} rx={3} fill={T.green} stroke={T.sheet} strokeWidth={1.5} />
    </g>
  );

const Hourglass: React.FC<{x: number; y: number; s: number; color: string; o: number}> = ({x, y, s, color, o}) =>
  o <= 0 ? null : (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -9 -13 L 9 -13 L -9 13 L 9 13 Z" fill="none" stroke={color} strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );

const Clock: React.FC<{x: number; y: number; r: number; T: Theme}> = ({x, y, r, T}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={T.sheet} stroke={T.ink2} strokeWidth={STROKE.thin + 0.6} />
    <path d={`M ${x} ${y - r * 0.62} L ${x} ${y} L ${x + r * 0.5} ${y + r * 0.2}`} fill="none" stroke={T.ink2} strokeWidth={STROKE.thin + 0.6} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const Tick: React.FC<{x: number; y: number; color: string; sheet: string; o: number; s: number}> = ({x, y, color, sheet, o, s}) =>
  o <= 0 ? null : (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={0} r={18} fill={sheet} />
      <path d="M -13 1 L -3 11 L 14 -12" fill="none" stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

/** '<prefix> 7,260 evaluations': number right-aligned so its width can change without moving the words. */
const Counter: React.FC<{G: Geo; y: number; value: number; prog: number; show: number; prefix: string; prefixP: number}> = ({G, y, value, prog, show, prefix, prefixP}) => {
  if (show <= 0) return null;
  const txt = fmt(value);
  const gap = G.ph ? 12 : 14;
  return (
    <g>
      <Write x={G.NUM_END} y={y} text={txt} size={G.TS} variant="mono" anchor="end" weight={600} progress={prog} />
      <Write x={G.NUM_END + gap} y={y} text="evaluations" size={G.TS} progress={show} />
      <Write x={G.NUM_END - txt.length * G.CW - gap} y={y} text={prefix} size={G.TS} anchor="end" progress={prefixP} />
    </g>
  );
};

export default WaitVsSkip;

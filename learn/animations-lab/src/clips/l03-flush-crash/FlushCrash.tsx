// Clip l03-flush-crash — "The counter runs ahead of the disk".
// Storyboard: lectures/lec03/animations/l03-flush-crash/storyboard.{yaml,md}. Ledger: L-0042 … L-0046.
// Frame 0 = board D-05 before step 1 (title, empty `issued` lane) with the memory box and the disk cylinder at 00;
// the last frame is the annotated poster. Rows are counter values (time runs down the lane, as on board D-05).
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×970, portrait re-flow, ≤ 640 px).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, cylinder, handLine, handPoly, serverBox} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META} from './timeline';

export type FlushCrashProps = {theme: ThemeName; layout?: Layout};

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const S = typeFor(layout).label; // 40 wide, 30 phone
  const MONO_W = S * 0.62; // mono advance per character
  // the issued lane: rows are counter values 1..10, a gap after 8 holds the crash line
  const ROW0 = ph ? 446 : 170;
  const STEP = ph ? 40 : 48;
  const CRASH_Y = ROW0 + 7 * STEP + (ph ? 22 : 24);
  const row = (n: number) => (n <= 8 ? ROW0 + (n - 1) * STEP : CRASH_Y + (ph ? 40 : 42) + (n - 9) * (ph ? 42 : 44));
  const COL_A = ph ? 32 : 56; // IDs handed out before the crash
  const COL_R = ph ? 196 : 262; // IDs handed out after a restart
  const ID_W = MONO_W * 5;
  // memory box and disk cylinder
  const MEM = ph ? {x: 32, y: 116, w: 172, h: 140} : {x: 630, y: 138, w: 200, h: 180};
  const DISK = ph ? {cx: 382, top: 130, rx: 76, ry: 16, h: 110} : {cx: 1060, top: 152, rx: 96, ry: 20, h: 150};
  const BIG = ph ? 80 : 104; // the live values
  const ARROW_Y = ph ? 186 : 228;
  const AX0 = MEM.x + MEM.w + 10;
  const AX1 = DISK.cx - DISK.rx - 8;
  const BR_Y = ph ? 296 : 352; // the 'ahead of disk' bracket
  const memCx = MEM.x + MEM.w / 2;
  return {
    ph,
    W: ph ? META.phone.width : META.width,
    H: ph ? META.phone.height : META.height,
    S,
    MONO_W,
    ID_W,
    row,
    CRASH_Y,
    COL_A,
    COL_R,
    EQ_X: (COL_A + ID_W + COL_R) / 2,
    NOTE_X: COL_R + ID_W + (ph ? 16 : 18),
    TICK_X: COL_A + ID_W + (ph ? 22 : 26),
    TITLE: ph ? {x: 32, y: 52} : {x: 56, y: 60},
    LANE_HDR_Y: ph ? 400 : 118,
    MEM,
    MEM_D: serverBox(MEM.x, MEM.y, MEM.w, MEM.h, 'mem'),
    MEM_HDR_Y: ph ? 100 : 118,
    memCx,
    memValY: MEM.y + MEM.h * 0.5 + BIG * 0.36 + (ph ? 4 : 10),
    DISK,
    DISK_G: cylinder(DISK.cx, DISK.top, DISK.rx, DISK.ry, DISK.h, 'disk'),
    diskValY: DISK.top + DISK.h * 0.5 + BIG * 0.36 + (ph ? 8 : 14),
    BIG,
    FLUSH_D: handLine([AX0, ARROW_Y], [AX1, ARROW_Y], 'flush'),
    FLUSH_HEAD: chevron([AX1, ARROW_Y], 1, 0, ph ? 13 : 16, 'flushH'),
    FLUSH_LBL: {x: (AX0 + AX1) / 2, y: ARROW_Y - (ph ? 14 : 18)},
    BRACKET_D: handPoly(
      [
        [memCx, BR_Y - (ph ? 14 : 18)],
        [memCx, BR_Y],
        [DISK.cx, BR_Y],
        [DISK.cx, BR_Y - (ph ? 14 : 18)],
      ],
      'bracket',
    ),
    BRACKET_LBL: {x: (memCx + DISK.cx) / 2, y: BR_Y + (ph ? 40 : 50)},
    // window box: around the unflushed IDs of the lane
    WIN: {x0: COL_A - (ph ? 12 : 16), x1: COL_A + ID_W + (ph ? 10 : 14), top: (a: number) => row(a) - S * 0.9, bot: (b: number) => row(b) + S * 0.32},
    CRASH_D: handLine([COL_A - (ph ? 14 : 18), CRASH_Y], [COL_A + ID_W + (ph ? 40 : 48), CRASH_Y], 'crash'),
    FORMULA: ph ? [{x: 486, y: 176, t: '06 + 3 + 1'}, {x: 486, y: 222, t: '= 10'}] : [{x: 630, y: 478, t: '06 + 3 + 1 = 10'}],
    CAPTION_TOP: ph ? 868 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type Geo = (typeof LAYOUTS)['wide'];

const id = (n: number) => `m1-${String(n).padStart(2, '0')}`;
const two = (n: number) => String(n).padStart(2, '0');

/** How many IDs have been handed out (before the crash) by `frame`. */
const issued = (frame: number) => EV.ids.filter((f) => frame >= f).length;

// The live value of the memory counter and of the disk, as a list of states (each replaces the last in place).
type Val = {at: number; text: string; color: MarkerColor};
const MEMORY: Val[] = [
  {at: 0, text: '00', color: 'ink'},
  ...EV.ids.map((f, i) => ({at: f, text: two(i + 1), color: 'ink' as MarkerColor})),
  {at: EV.red, text: '', color: 'ink'}, // crash: the counter in memory is gone
  {at: EV.load06, text: '06', color: 'ink'}, // restart from the disk value
  {at: EV.dup7[0], text: '07', color: 'red'},
  {at: EV.dup8[0], text: '08', color: 'red'},
  {at: EV.id10[0], text: '10', color: 'green'}, // safe restart
];
const DISK: Val[] = [
  {at: 0, text: '00', color: 'ink'},
  {at: EV.disk03, text: '03', color: 'ink'},
  {at: EV.disk06, text: '06', color: 'ink'},
];

export const FlushCrash: React.FC<FlushCrashProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const S = G.S;
  const at = (r: readonly [number, number]) => r;

  // ----- the "not on disk" window in the lane: rows after the last flush, up to the newest ID -----
  const n = issued(frame);
  const FADE_OUT = 10;
  const winA = frame >= EV.disk06 + FADE_OUT ? 7 : frame >= EV.disk03 + FADE_OUT ? 4 : 1;
  const flushLand = winA === 1 ? EV.disk03 : winA === 4 ? EV.disk06 : Infinity;
  const winB = Math.min(winA + 2, Math.max(winA, n));
  const grow = n >= winA ? ramp(frame, EV.ids[winB - 1], 10) : 0;
  const top = G.WIN.top(winA);
  const prevBot = winB === winA ? top + 10 : G.WIN.bot(winB - 1);
  const bot = prevBot + (G.WIN.bot(winB) - prevBot) * grow;
  const winO = n >= winA ? fade(frame, EV.ids[winA - 1], flushLand, 8, FADE_OUT) : 0;
  const red = ramp(frame, EV.red, 14, EASE_FADE); // the crash turns the open window red
  const winD = serverBox(G.WIN.x0, top, G.WIN.x1 - G.WIN.x0, Math.max(10, bot - top), `win${winA}-${winB}`);

  // memory box: red from the crash until the restart
  const memRed = red * (1 - ramp(frame, EV.load06, 10, EASE_FADE));

  // flush arrow: blue while a flush is being written, graphite once it has landed
  const flushP = ramp(frame, ...at(EV.flush1));
  const reink = ramp(frame, ...at(EV.flush2));
  const blue1 = 1 - ramp(frame, EV.flush1[0] + EV.flush1[1] + 18, 14, EASE_FADE);
  const blue2 = 1 - ramp(frame, EV.flush2[0] + EV.flush2[1] + 18, 14, EASE_FADE);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        <Write x={G.TITLE.x} y={G.TITLE.y} text="flush every 3 IDs" size={S} color="ink2" />
        <Write x={G.COL_A} y={G.LANE_HDR_Y} text="issued" size={S} />
        <Write x={G.MEM.x} y={G.MEM_HDR_Y} text="m1 memory" size={S} />
        <Write x={G.DISK.cx} y={G.MEM_HDR_Y} text="disk" size={S} anchor="middle" />
        <path d={G.MEM_D} fill={T.sheet} />
        <Ink d={G.MEM_D} opacity={1 - memRed} />
        <Ink d={G.MEM_D} color="red" width={STROKE.ink + 0.8} opacity={memRed} />
        <path d={G.DISK_G.bodyFill} fill={T.sheet} />
        <Ink d={G.DISK_G.sides} />
        <Ink d={G.DISK_G.front} />
        <path d={G.DISK_G.top} fill={T.sheet} />
        <Ink d={G.DISK_G.top} />
        <Value G={G} vals={MEMORY} frame={frame} x={G.memCx} y={G.memValY} />
        <Value G={G} vals={DISK} frame={frame} x={G.DISK.cx} y={G.diskValY} />

        {/* ===== ① ② the flush arrow memory → disk (one solid write arrow: the machine pushes it; re-inked at every flush) ===== */}
        {flushP > 0 ? (
          <g>
            <Pen d={G.FLUSH_D} head={G.FLUSH_HEAD} progress={flushP} color="ink" opacity={1 - blue1} />
            <Pen d={G.FLUSH_D} head={G.FLUSH_HEAD} progress={flushP} color="blue" opacity={blue1} />
            <Pen d={G.FLUSH_D} head={G.FLUSH_HEAD} progress={reink} color="blue" opacity={blue2} />
            <Write x={G.FLUSH_LBL.x} y={G.FLUSH_LBL.y} text="flush" size={S} color="ink2" anchor="middle" progress={ramp(frame, ...at(EV.flushLbl))} />
          </g>
        ) : null}

        {/* ===== the window box (behind the IDs) ===== */}
        {winO > 0 ? (
          <g opacity={winO * ghost(frame, BEAT.safe)}>
            <Ink d={winD} color="ink2" width={STROKE.thin + 0.6} dash="10 8" opacity={1 - red} />
            <Ink d={winD} color="red" width={STROKE.ink} dash="10 8" opacity={red} />
          </g>
        ) : null}

        {/* ===== IDs handed out, m1-01 … m1-08, with a green tick where the value reached the disk ===== */}
        {EV.ids.map((f, i) => (
          <IdRow key={i} x={G.COL_A} y={G.row(i + 1)} text={id(i + 1)} size={S} frame={frame} at={f} />
        ))}
        <Tick x={G.TICK_X} y={G.row(3) - S * 0.34} color={T.green} s={G.ph ? 0.75 : 1} o={ramp(frame, EV.disk03 + 4, 8, EASE_FADE)} />
        <Tick x={G.TICK_X} y={G.row(6) - S * 0.34} color={T.green} s={G.ph ? 0.75 : 1} o={ramp(frame, EV.disk06 + 4, 8, EASE_FADE)} />

        {/* ===== ③ memory ahead of disk, then the crash ===== */}
        <g opacity={ghost(frame, BEAT.dup)}>
          <Pen d={G.BRACKET_D} progress={ramp(frame, ...at(EV.bracket))} color="ink2" width={STROKE.thin + 0.6} opacity={1 - red} />
          <Write x={G.BRACKET_LBL.x} y={G.BRACKET_LBL.y} text="ahead of disk" size={S} color="ink2" anchor="middle" progress={ramp(frame, ...at(EV.bracketLbl))} opacity={1 - red} />
          {red > 0 ? (
            <>
              <Ink d={G.BRACKET_D} color="red" width={STROKE.ink} opacity={red} />
              <Write x={G.BRACKET_LBL.x} y={G.BRACKET_LBL.y} text="ahead of disk" size={S} color="red" anchor="middle" weight={600} opacity={red} />
            </>
          ) : null}
        </g>
        <Pen d={G.CRASH_D} progress={ramp(frame, ...at(EV.crash))} color="red" width={STROKE.ink + 1.4} />
        <Write x={G.COL_A} y={G.row(9)} text="crash" size={S} color="red" weight={600} progress={ramp(frame, ...at(EV.crashLbl))} />

        {/* ===== ④ wrong restart from 6: 07 and 08 again ===== */}
        <Write x={G.COL_R} y={G.LANE_HDR_Y} text="restart" size={S} progress={ramp(frame, ...at(EV.restartHdr))} />
        <g opacity={ghost(frame, BEAT.safe)}>
          <Write x={G.COL_R} y={G.row(7)} text={id(7)} size={S} variant="mono" color="red" weight={560} progress={ramp(frame, ...at(EV.dup7))} />
          <Write x={G.EQ_X} y={G.row(7)} text="=" size={S} variant="mono" color="red" anchor="middle" weight={600} progress={ramp(frame, ...at(EV.eq7))} />
          <Write x={G.COL_R} y={G.row(8)} text={id(8)} size={S} variant="mono" color="red" weight={560} progress={ramp(frame, ...at(EV.dup8))} />
          <Write x={G.EQ_X} y={G.row(8)} text="=" size={S} variant="mono" color="red" anchor="middle" weight={600} progress={ramp(frame, ...at(EV.eq8))} />
          <Write x={G.NOTE_X} y={G.row(8)} text="twice" size={S} color="red" weight={600} progress={ramp(frame, ...at(EV.twice))} />
        </g>

        {/* ===== ⑤ safe restart: 06 + 3 + 1 = 10 ===== */}
        {G.FORMULA.map((l, i) => (
          <Write
            key={i}
            x={l.x}
            y={l.y}
            text={l.t}
            size={S}
            variant="mono"
            weight={560}
            progress={ramp(frame, EV.formula[0] + i * 26, G.FORMULA.length > 1 ? EV.formula[1] - 14 : EV.formula[1])}
          />
        ))}
        <Write x={G.COL_R} y={G.row(9)} text={id(9)} size={S} variant="mono" color="ink3" progress={ramp(frame, ...at(EV.id9))} />
        <Write x={G.NOTE_X} y={G.row(9)} text="never used" size={S} color="ink2" progress={ramp(frame, ...at(EV.unused))} />
        <Write x={G.COL_R} y={G.row(10)} text={id(10)} size={S} variant="mono" color="green" weight={600} progress={ramp(frame, ...at(EV.id10))} />
        {[0, 1].map((k) => (
          <Pen
            key={k}
            d={handLine([G.COL_R - 2, G.row(10) + (G.ph ? 8 : 10) + k * (G.ph ? 6 : 7)], [G.COL_R + G.ID_W + 2, G.row(10) + (G.ph ? 8 : 10) + k * (G.ph ? 6 : 7)], `ul${k}`)}
            progress={ramp(frame, EV.underline[0] + k * 6, EV.underline[1] - 6)}
            color="green"
            width={STROKE.thin + 0.6}
          />
        ))}
        <Write x={G.NOTE_X} y={G.row(10)} text="safest" size={S} color="green" weight={600} progress={ramp(frame, ...at(EV.safest))} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** A live value (memory counter or disk copy): each new state replaces the last in place (10 f cross-fade). */
const Value: React.FC<{G: Geo; vals: Val[]; frame: number; x: number; y: number}> = ({G, vals, frame, x, y}) => {
  let i = 0;
  while (i + 1 < vals.length && frame >= vals[i + 1].at) i++;
  const cur = vals[i];
  const prev = i > 0 ? vals[i - 1] : null;
  const p = prev ? ramp(frame, cur.at, 10, EASE_FADE) : 1;
  const w = cur.color === 'ink' ? 560 : 640;
  return (
    <g>
      {prev && prev.text && p < 1 ? (
        <Write x={x} y={y} text={prev.text} size={G.BIG} variant="mono" anchor="middle" color={prev.color} weight={560} opacity={1 - p} />
      ) : null}
      {cur.text ? <Write x={x} y={y} text={cur.text} size={G.BIG} variant="mono" anchor="middle" color={cur.color} weight={w} opacity={p} /> : null}
    </g>
  );
};

/** One ID handed out: written in blue (it is leaving the machine), settling to ink once it is out. */
const IdRow: React.FC<{x: number; y: number; text: string; size: number; frame: number; at: number}> = ({x, y, text, size, frame, at}) => {
  const p = ramp(frame, at, EV.idWrite);
  if (p <= 0) return null;
  const settle = ramp(frame, at + EV.idSettle, 14, EASE_FADE);
  return (
    <g>
      <Write x={x} y={y} text={text} size={size} variant="mono" color="blue" weight={560} progress={p} opacity={1 - settle} />
      <Write x={x} y={y} text={text} size={size} variant="mono" opacity={settle} />
    </g>
  );
};

/** Green check: the value of this row reached the disk. */
const Tick: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 1}) =>
  o <= 0 ? null : (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -13 1 L -3 11 L 14 -12" fill="none" stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

export default FlushCrash;

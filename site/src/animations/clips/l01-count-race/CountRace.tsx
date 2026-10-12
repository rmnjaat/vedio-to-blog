// Clip l01-count-race — "A thousand increments, three lost".
// Storyboard: lectures/lec01/animations/l01-count-race/storyboard.{yaml,md}. Ledger: L-0219, L-0230, L-0231.
// Frame 0 = two thread lanes into one shared `count` box holding 100 (two claps arrive); the last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×880, portrait re-flow, ≤ 640 px).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, handLine, serverBox} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Packet, Pen, Sheet, Stage, StepBadge, Write, Ink, useTheme} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META} from './timeline';

export type CountRaceProps = {theme: ThemeName; layout?: Layout};

type ChipKey = 'r1' | 'r2' | 'w1' | 'w2' | 'a1' | 'a2';
type Chip = {lane: 0 | 1; x: number; w: number; text: string; n?: number; dir: 'in' | 'out'};

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const LANE_Y = (ph ? [112, 252] : [150, 270]) as readonly [number, number];
  const RAIL_X0 = ph ? 40 : 228;
  const BOX = ph ? {x: 540, y: 92, w: 168, h: 180} : {x: 870, y: 110, w: 280, h: 190};
  const CHIP_H = ph ? 52 : 64;
  const CHIP: Record<ChipKey, Chip> = ph
    ? {
        r1: {lane: 0, x: 150, w: 164, text: 'read 100', n: 1, dir: 'in'},
        r2: {lane: 1, x: 150, w: 164, text: 'read 100', n: 2, dir: 'in'},
        w1: {lane: 0, x: 326, w: 178, text: 'write 101', n: 3, dir: 'out'},
        w2: {lane: 1, x: 326, w: 178, text: 'write 101', n: 4, dir: 'out'},
        a1: {lane: 0, x: 196, w: 184, text: 'atomic +1', dir: 'out'},
        a2: {lane: 1, x: 270, w: 184, text: 'atomic +1', dir: 'out'},
      }
    : {
        r1: {lane: 0, x: 240, w: 210, text: 'read 100', n: 1, dir: 'in'},
        r2: {lane: 1, x: 320, w: 210, text: 'read 100', n: 2, dir: 'in'},
        w1: {lane: 0, x: 466, w: 230, text: 'write 101', n: 3, dir: 'out'},
        w2: {lane: 1, x: 546, w: 230, text: 'write 101', n: 4, dir: 'out'},
        a1: {lane: 0, x: 240, w: 250, text: 'atomic +1', dir: 'out'},
        a2: {lane: 1, x: 510, w: 250, text: 'atomic +1', dir: 'out'},
      };
  const chipD = (c: Chip, seed: string) => serverBox(c.x, LANE_Y[c.lane] - CHIP_H / 2, c.w, CHIP_H, seed);
  // data moves along the lane rail: read = count -> chip, write = chip -> count
  const moveD = (c: Chip, seed: string) =>
    c.dir === 'in'
      ? handLine([BOX.x - 2, LANE_Y[c.lane]], [c.x + c.w + 4, LANE_Y[c.lane]], seed)
      : handLine([c.x + c.w + 2, LANE_Y[c.lane]], [BOX.x - 4, LANE_Y[c.lane]], seed);
  const GEO = Object.fromEntries(
    (Object.keys(CHIP) as ChipKey[]).map((k) => [k, {box: chipD(CHIP[k], k + 'b'), move: moveD(CHIP[k], k + 'm')}]),
  ) as Record<ChipKey, {box: string; move: string}>;
  // track ("time (sped up)")
  const AX = ph ? {x0: 40, x1: 690, y: 436, p0: 66, span: 590} : {x0: 60, x1: 830, y: 470, p0: 80, span: 700};
  return {
    ph,
    W,
    H,
    TY,
    LANE_Y,
    BOX,
    BOX_CX: BOX.x + BOX.w / 2,
    BOX_D: serverBox(BOX.x, BOX.y, BOX.w, BOX.h, 'count'),
    RING_D: serverBox(BOX.x - 12, BOX.y - 12, BOX.w + 24, BOX.h + 24, 'ring'),
    RAIL_D: LANE_Y.map((y, i) => handLine([RAIL_X0, y], [BOX.x, y], `rail${i}`)),
    // lane labels: left of the rail (wide), above the rail's left end (phone)
    LANE_LBL: ph ? LANE_Y.map((y) => ({x: 40, y: y - 40})) : LANE_Y.map((y) => ({x: 40, y: y + 14})),
    CHIP,
    CHIP_H,
    GEO,
    // step badges: above lane 1 and below lane 2 (wide); above both lanes (phone, where the label sits left of it)
    badgeY: (lane: 0 | 1) => (ph ? LANE_Y[lane] - 54 : lane === 0 ? LANE_Y[0] - 60 : LANE_Y[1] + 60),
    BADGE_R: ph ? 20 : 24,
    AX,
    px: (p: number) => AX.p0 + AX.span * p,
    AXIS_D: handLine([AX.x0, AX.y], [AX.x1, AX.y], 'axis'),
    AXIS_HEAD: chevron([AX.x1, AX.y], 1, 0, 16, 'axh'),
    VALUE_SIZE: ph ? 48 : 80,
    // "should be 102" and the closing claps note sit under the count box
    NOTE: ph ? {x: 708, anchor: 'end' as const, y1: 318, y2: 362} : {x: 1010, anchor: 'middle' as const, y1: 372, y2: 428},
    // part 2's label, above the track on the left
    PART2: ph ? {x: 40, y: 366} : {x: 60, y: 394},
    // results: side by side (wide); stacked (phone)
    RES: ph
      ? {l: {x: 40, y: 566, vx: 230, crossX: 404}, r: {x: 40, y: 670, vx: 230, tickX: 400}, sub: 42, val: 40}
      : {l: {x: 60, y: 584, vx: 270, crossX: 460}, r: {x: 620, y: 584, vx: 870, tickX: 1052}, sub: 44, val: 48},
    CAPTION_TOP: ph ? 750 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;
const fmt = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, '0')}` : String(n));

// ---------- the counter's value over time ----------
// part 1: 100 -> 101 (two claps, one lost); part 2: from 0, sped up to ~1,997; atomic replay: 0 -> 1 -> 2 -> 2,000
const P1 = [
  {at: 0, v: 100},
  {at: EV.ctrTo101, v: 101},
];
const P3 = [
  {at: EV.ctrTo0, v: 0},
  {at: EV.ctrA1, v: 1},
  {at: EV.ctrA2, v: 2},
];
const lossesBy = (p: number) => EV.lossAt.filter((l) => p >= l).length;
const run1Value = (p: number) => Math.round(2000 * p) - lossesBy(p);
const stepped = (frame: number, ch: {at: number; v: number}[], endAt: number) => {
  let i = 0;
  for (let k = 0; k < ch.length; k++) if (ch[k].at <= frame) i = k;
  const cur = ch[i];
  const nextAt = ch[i + 1]?.at ?? endAt;
  return {text: fmt(cur.v), prog: cur.at === 0 ? 1 : ramp(frame, cur.at, 12), o: 1 - ramp(frame, nextAt - 8, 8, EASE_FADE)};
};
const counter = (frame: number) => {
  if (frame < EV.reset) return stepped(frame, P1, EV.reset);
  if (frame < EV.run1[0]) return {text: '0', prog: ramp(frame, EV.reset, 8), o: 1};
  // sped-up runs: the number is the accumulating quantity, it changes every frame
  if (frame < EV.ctrTo0 - 8) return {text: fmt(run1Value(ramp(frame, EV.run1[0], EV.run1[1], LIN))), prog: 1, o: 1};
  if (frame < EV.ctrTo0) return {text: '1,997', prog: 1, o: 1 - ramp(frame, EV.ctrTo0 - 8, 8, EASE_FADE)};
  if (frame >= EV.run2[0]) return {text: fmt(2 + Math.round(1998 * ramp(frame, EV.run2[0], EV.run2[1], LIN))), prog: 1, o: 1};
  return stepped(frame, P3, Infinity);
};

// the blue on the atomic chips' write paths fades once the replay has landed
const ATOMIC_BLUE_UNTIL = BEAT.end;

export const CountRace: React.FC<CountRaceProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;

  const at = (r: readonly [number, number]) => r;
  const gone = 1 - ramp(frame, ...at(EV.clear), EASE_FADE); // read/write chips are replaced by the atomic chips
  const slowGhost = ghost(frame, BEAT.fast) * gone;

  const c = counter(frame);
  const ctrColor = frame >= EV.run2[0] + EV.run2[1] ? 'green' : frame >= EV.ctrRed && frame < EV.ctrTo0 - 8 ? 'red' : 'ink';

  const chip = (k: ChipKey, box: readonly [number, number], text: readonly [number, number], pkt: readonly [number, number], opacity: number, blueUntil: number) => {
    const ch = G.CHIP[k];
    const g = G.GEO[k];
    const y = G.LANE_Y[ch.lane];
    const boxP = ramp(frame, ...box);
    const pktP = ramp(frame, ...pkt, EASE_MOVE);
    return (
      <g key={k}>
        <Pen d={g.move} progress={pktP} color="blue" width={STROKE.ink + 1} opacity={1 - ramp(frame, blueUntil, 14, EASE_FADE)} />
        <Packet d={g.move} progress={pktP} color="blue" r={G.ph ? 8 : 10} />
        {/* the chip's paper fill stays opaque while ghosted, so the rail never strikes through its label */}
        <path d={g.box} fill={T.sheet} opacity={boxP > 0 ? (k.startsWith('a') ? 1 : gone) : 0} />
        <g opacity={opacity}>
          <Pen d={g.box} progress={boxP} />
          <Write x={ch.x + ch.w / 2} y={y + TS * 0.35} text={ch.text} size={TS} variant="mono" anchor="middle" progress={ramp(frame, ...text)} />
          {ch.n ? <StepBadge x={ch.x + ch.w / 2} y={G.badgeY(ch.lane)} n={ch.n} r={G.BADGE_R} color="blue" opacity={fade(frame, box[0], Infinity, 8)} /> : null}
        </g>
      </g>
    );
  };

  // loss marks on the track
  const losses = EV.lossAt.map((p) => ({p, f: Math.round(EV.run1[0] + p * EV.run1[1])}));
  const lossGhost = ghost(frame, BEAT.atomic);
  const run1P = ramp(frame, ...at(EV.run1), LIN);
  const run2P = ramp(frame, ...at(EV.run2), LIN);
  const play1O = fade(frame, EV.run1[0], EV.run1[0] + EV.run1[1] + 6, 6, 10);
  const play2O = fade(frame, EV.run2[0], EV.run2[0] + EV.run2[1] + 6, 6, 10);
  const {AX, RES} = G;

  return (
    <Sheet theme={theme}>
      <Stage title="Lost increments" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {G.RAIL_D.map((d, i) => (
          <Ink key={i} d={d} color="ink2" width={STROKE.thin + 0.6} />
        ))}
        <Write x={G.LANE_LBL[0].x} y={G.LANE_LBL[0].y} text="thread 1" size={TS} />
        <Write x={G.LANE_LBL[1].x} y={G.LANE_LBL[1].y} text="thread 2" size={TS} />
        <Ink d={G.BOX_D} fill={T.sheet} />
        <Write x={G.BOX_CX} y={G.BOX.y + (G.ph ? 48 : 56)} text="count" size={TS} variant="mono" color="ink2" anchor="middle" />
        <Ink d={G.AXIS_D} width={STROKE.thin + 0.6} color="ink2" />
        <Ink d={G.AXIS_HEAD} width={STROKE.thin + 0.6} color="ink2" />
        <Write x={AX.x1} y={AX.y + (G.ph ? 46 : 52)} text="time (sped up)" size={TS} color="ink2" anchor="end" />

        {/* counter value */}
        <Write x={G.BOX_CX} y={G.BOX.y + (G.ph ? 134 : 152)} text={c.text} variant="mono" size={G.VALUE_SIZE} anchor="middle" color={ctrColor} progress={c.prog} opacity={c.o} weight={560} />

        {/* ===== ① ② both read 0 ===== */}
        {chip('r1', EV.r1Box, EV.r1Text, EV.r1Pkt, slowGhost, BEAT.write)}
        {chip('r2', EV.r2Box, EV.r2Text, EV.r2Pkt, slowGhost, BEAT.write)}
        {/* ===== ③ ④ both write 1 ===== */}
        {chip('w1', EV.w1Box, EV.w1Text, EV.w1Pkt, slowGhost, BEAT.fast)}
        {chip('w2', EV.w2Box, EV.w2Text, EV.w2Pkt, slowGhost, BEAT.fast)}
        {/* lost: red ring + note */}
        <Ink d={G.RING_D} color="red" width={STROKE.ink} dash="12 9" opacity={fade(frame, EV.lost, Infinity, 8) * slowGhost} />
        <Write x={G.NOTE.x} y={G.NOTE.y1} text="should be 102" size={TS} color="red" anchor={G.NOTE.anchor} progress={ramp(frame, ...at(EV.shouldBe))} opacity={slowGhost} weight={600} />

        {/* ===== part 2: the same race from 0, sped up ===== */}
        <Write x={G.PART2.x} y={G.PART2.y} text="from 0, 1,000 each" size={TS} color="ink2" progress={ramp(frame, ...at(EV.part2Label))} opacity={lossGhost} />

        {/* ===== sped-up run: playhead + loss marks ===== */}
        {losses.map((l, i) => (
          <LossMark key={i} x={G.px(l.p)} y={AX.y} size={TS} at={l.f} frame={frame} opacity={lossGhost} />
        ))}
        <g opacity={play1O}>
          <line x1={G.px(run1P)} y1={AX.y - 18} x2={G.px(run1P)} y2={AX.y + 9} stroke={T.ink} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>

        {/* ===== result 1 ===== */}
        <Write x={RES.l.x} y={RES.l.y} text="count++" size={TS} variant="mono" progress={ramp(frame, EV.res1[0], 14)} />
        <Write x={RES.l.vx} y={RES.l.y + 2} text="1,997" variant="mono" size={RES.val} color="red" weight={600} progress={ramp(frame, EV.res1[0] + 10, 14)} />
        <Cross x={RES.l.crossX} y={RES.l.y - 14} color={T.red} o={ramp(frame, EV.res1[0] + 22, 8, EASE_FADE)} />
        <Write x={RES.l.x} y={RES.l.y + RES.sub} text="expected 2,000" size={TS} color="ink2" progress={ramp(frame, ...at(EV.res1b))} />

        {/* ===== atomic replay ===== */}
        {chip('a1', EV.a1Box, EV.a1Text, EV.a1Pkt, 1, ATOMIC_BLUE_UNTIL)}
        {chip('a2', EV.a2Box, EV.a2Text, EV.a2Pkt, 1, ATOMIC_BLUE_UNTIL)}
        <g opacity={play2O}>
          <line x1={G.px(run2P)} y1={AX.y - 18} x2={G.px(run2P)} y2={AX.y + 9} stroke={T.ink} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>
        <Tick x={G.px(1)} y={AX.y} color={T.green} sheet={T.sheet} o={ramp(frame, EV.run2[0] + EV.run2[1], 8, EASE_FADE)} />

        {/* ===== result 2 ===== */}
        <Write x={RES.r.x} y={RES.r.y} text="atomic +1" size={TS} variant="mono" progress={ramp(frame, EV.res2[0], 14)} />
        <Write x={RES.r.vx} y={RES.r.y + 2} text="2,000" variant="mono" size={RES.val} color="green" weight={600} progress={ramp(frame, EV.res2[0] + 10, 14)} />
        <Tick x={RES.r.tickX} y={RES.r.y - 14} color={T.green} sheet={T.sheet} o={ramp(frame, EV.res2[0] + 22, 8, EASE_FADE)} />
        <Write x={RES.r.x} y={RES.r.y + RES.sub} text="nothing lost" size={TS} color="ink2" progress={ramp(frame, ...at(EV.res2b))} />

        {/* ===== the two claps again ===== */}
        <Write x={G.NOTE.x} y={G.NOTE.y1} text="2 claps on 100" size={TS} anchor={G.NOTE.anchor} progress={ramp(frame, ...at(EV.med1))} />
        <Write x={G.NOTE.x} y={G.NOTE.y2} text="atomic: 102" size={TS} variant="mono" color="green" anchor={G.NOTE.anchor} weight={560} progress={ramp(frame, ...at(EV.med2))} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const Cross: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 13}) =>
  o <= 0 ? null : (
    <path d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`} stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" opacity={o} />
  );

const Tick: React.FC<{x: number; y: number; color: string; sheet: string; o: number}> = ({x, y, color, sheet, o}) =>
  o <= 0 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={16} fill={sheet} />
      <path d={`M ${x - 13} ${y + 1} L ${x - 3} ${y + 11} L ${x + 14} ${y - 12}`} fill="none" stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

/** A lost update stamped on the track: red ✕ on the axis + "lost" written above. */
const LossMark: React.FC<{x: number; y: number; size: number; at: number; frame: number; opacity: number}> = ({x, y, size, at: atF, frame, opacity}) => {
  const t = useTheme();
  const o = ramp(frame, atF, 8, EASE_FADE);
  if (o <= 0) return null;
  return (
    <g opacity={o * opacity}>
      <circle cx={x} cy={y} r={16} fill={t.sheet} />
      <Cross x={x} y={y} color={t.red} o={1} s={11} />
      <Write x={x} y={y - 28} text="lost" color="red" size={size} anchor="middle" progress={ramp(frame, atF, 14)} weight={600} />
    </g>
  );
};

export default CountRace;

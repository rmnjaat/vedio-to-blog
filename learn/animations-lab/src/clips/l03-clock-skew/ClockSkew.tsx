// Clip l03-clock-skew — "Four clocks, four requests".
// Storyboard: lectures/lec03/animations/l03-clock-skew/storyboard.{yaml,md}. Ledger: L-0071, L-0072.
// Frame 0 = board D-08 before step 1: four laptops m2 m4 m7 m9 with 'time: 23 / 24 / 23 / 23', the
// 'real time' axis and four empty ID slots. The last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800: laptops in a row, the get_id list under them) and
// 'phone' (720×1070, portrait re-flow: laptops in a 2×2 grid, the list in one column under the grid).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE, PAST} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, REQ, REQ_SETTLE} from './timeline';

export type ClockSkewProps = {theme: ThemeName; layout?: Layout};

// The class's numbers (L-0071): machine, its clock, the ID it makes (time first, then machine).
const MACHINES = [
  {name: 'm2', time: '23', id: '232'},
  {name: 'm4', time: '24', id: '244'},
  {name: 'm7', time: '23', id: '237'},
  {name: 'm9', time: '23', id: '239'},
] as const;

// Recursive's mono advance is 0.6 em.
const MONO_EM = 0.6;

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  // laptops: wide = one row; phone = 2×2 grid (m2 m4 / m7 m9)
  const CX = ph ? [190, 530, 190, 530] : [330, 550, 770, 990];
  const SY = ph ? [66, 66, 302, 302] : [86, 86, 86, 86]; // screen top
  const SW = ph ? 180 : 170;
  const SH = ph ? 84 : 92;
  const BASE_H = ph ? 24 : 28;
  const BASE_FLARE = ph ? 18 : 20;
  const NAME_SIZE = ph ? 40 : 48;
  const TIME_DY = ph ? 146 : 168; // time label baseline below the screen top
  const ARROW = ph ? {from: 52, to: 6} : {from: 70, to: 6}; // request arrow, above the screen top
  // the get_id list
  const ROW_Y = ph ? [586, 662, 738, 814] : [360, 428, 496, 564];
  const ROW = ph
    ? {badgeX: 96, badgeR: 18, textX: 126, arrow: [358, 390], slotX: 416, slotW: 112, slotH: 52, idSize: 40, mid: 10}
    : {badgeX: 112, badgeR: 22, textX: 152, arrow: [460, 516], slotX: 548, slotW: 150, slotH: 60, idSize: 48, mid: 14};
  const slotCx = ROW.slotX + ROW.slotW / 2;
  const machines = MACHINES.map((m, i) => {
    const cx = CX[i];
    const sy = SY[i];
    const by = sy + SH;
    const base: Pt[] = [
      [cx - SW / 2 - BASE_FLARE, by + BASE_H],
      [cx - SW / 2, by],
      [cx + SW / 2, by],
      [cx + SW / 2 + BASE_FLARE, by + BASE_H],
      [cx - SW / 2 - BASE_FLARE, by + BASE_H],
    ];
    const a0: Pt = [cx, sy - ARROW.from];
    const a1: Pt = [cx, sy - ARROW.to];
    const y = ROW_Y[i];
    const rowMid = y - ROW.mid;
    return {
      ...m,
      cx,
      sy,
      screen: serverBox(cx - SW / 2, sy, SW, SH, `scr${i}`),
      base: handPoly(base, `base${i}`) + ' Z',
      req: handLine(a0, a1, `req${i}`),
      reqHead: chevron(a1, 0, 1, 16, `reqh${i}`),
      timeY: sy + TIME_DY,
      y,
      rowArrow: handLine([ROW.arrow[0], rowMid], [ROW.arrow[1], rowMid], `ra${i}`),
      rowHead: chevron([ROW.arrow[1], rowMid], 1, 0, 14, `rah${i}`),
      slot: serverBox(ROW.slotX, y - ROW.mid - ROW.slotH / 2, ROW.slotW, ROW.slotH, `slot${i}`),
    };
  });
  const cw = ROW.idSize * MONO_EM;
  // underline under the two time digits of a centred 3-digit ID
  const underD = (y: number, i: number) => handLine([slotCx - 1.5 * cw + 3, y + 8], [slotCx + 0.5 * cw - 3, y + 8], `un${i}`);
  const r3 = ROW_Y[2];
  const r0 = ROW_Y[0];
  const r4 = ROW_Y[3];
  const m4 = machines[1];
  const labelW = 8 * TY.label * 0.56; // 'time: 24'
  const BR_X = ph ? 550 : 728; // the red down-arrow beside the IDs
  const brTop: Pt = [BR_X, r0 - ROW.mid - ROW.slotH / 2];
  const brBot: Pt = [BR_X, r4 - ROW.mid + ROW.slotH / 2 + 4];
  return {
    ph,
    W,
    H,
    TY,
    NAME_SIZE,
    ROW,
    slotCx,
    machines,
    UNDER: machines.map((m, i) => underD(m.y, i)),
    // 'real time' axis down the left of the list
    RT_LABEL: ph ? {x: 32, y: 520} : {x: 36, y: 304},
    AXIS_D: ph ? handLine([52, 538], [52, 846], 'axis') : handLine([60, 326], [60, 592], 'axis'),
    AXIS_HEAD: ph ? chevron([52, 846], 0, 1, 14, 'axh') : chevron([60, 592], 0, 1, 16, 'axh'),
    // B3: ring on the 237 slot + 'smaller than 244'; ring on 'time: 24' + 'ahead'
    RING_237: serverBox(ROW.slotX - 12, r3 - ROW.mid - ROW.slotH / 2 - 10, ROW.slotW + 24, ROW.slotH + 20, 'ring237'),
    SMALLER: ph
      ? [{x: 566, y: r3 - 8, text: 'smaller'}, {x: 566, y: r3 + 26, text: 'than 244'}]
      : [{x: 746, y: r3, text: 'smaller than 244'}],
    RING_24: serverBox(m4.cx - labelW / 2 - 14, m4.timeY - TY.label * 0.95, labelW + 28, TY.label * 1.3, 'ring24'),
    // phone: left of the ring (its right side runs into the canvas edge); wide: under it
    AHEAD: ph ? {x: m4.cx - labelW / 2 - 30, y: m4.timeY, anchor: 'end' as const} : {x: m4.cx, y: m4.timeY + 50, anchor: 'middle' as const},
    // B5: red down-arrow beside the four IDs + 'not monotonically / increasing'
    BRACKET: handPoly([[BR_X - 12, brTop[1]], brTop, brBot], 'br'),
    BRACKET_HEAD: chevron(brBot, 0, 1, 16, 'brh'),
    NOT_MONO: ph ? [{x: 126, y: 900}, {x: 126, y: 936}] : [{x: 756, y: 352}, {x: 756, y: 396}], // top of the arrow, clear of 'smaller than 244'
    CAPTION_TOP: ph ? 966 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

export const ClockSkew: React.FC<ClockSkewProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const {ROW} = G;

  return (
    <Sheet theme={theme}>
      <Stage title="Four clocks, four requests" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): laptops, clocks, axis, empty slots ===== */}
        {G.machines.map((m, i) => (
          <g key={`lap${i}`}>
            <Ink d={m.base} fill={T.sheet} />
            <Ink d={m.screen} fill={T.sheet} />
            <Write x={m.cx} y={m.sy + (G.ph ? 56 : 62)} text={m.name} size={G.NAME_SIZE} variant="mono" anchor="middle" />
            <Write x={m.cx} y={m.timeY} text={`time: ${m.time}`} size={TS} anchor="middle" />
          </g>
        ))}
        <Write x={G.RT_LABEL.x} y={G.RT_LABEL.y} text="real time" size={TS} color="ink2" />
        <Ink d={G.AXIS_D} width={STROKE.thin + 0.6} color="ink2" />
        <Ink d={G.AXIS_HEAD} width={STROKE.thin + 0.6} color="ink2" />
        {G.machines.map((m, i) => (
          <Ink key={`slot${i}`} d={m.slot} color="ink3" width={STROKE.thin + 0.6} dash="10 8" fill={T.sheet} />
        ))}

        {/* ===== ① – ④ the four requests, in real-time order ===== */}
        {G.machines.map((m, i) => {
          const ev = REQ[i];
          const settle = REQ_SETTLE[i];
          const live = 1 - ramp(frame, settle, 14, EASE_FADE); // blue fades when the next beat starts
          const past = PAST * ramp(frame, settle, 14, EASE_FADE); // ...and the arrow stays as graphite at 38%
          const arrowP = ramp(frame, ...ev.arrow, EASE_MOVE);
          return (
            <g key={`req${i}`}>
              <Pen d={m.req} progress={arrowP} head={m.reqHead} opacity={past} />
              <Pen d={m.req} progress={arrowP} head={m.reqHead} color="blue" width={STROKE.ink + 0.6} opacity={live} />
              <Packet d={m.req} progress={arrowP} color="blue" r={G.ph ? 8 : 10} />
              <Pen d={m.screen} progress={ramp(frame, ...ev.screen)} color="blue" width={STROKE.ink + 1} opacity={live} />
              {/* the list row: badge, get_id on mN, arrow, the ID with its time digits underlined */}
              <StepBadge x={ROW.badgeX} y={m.y - ROW.mid} n={i + 1} r={ROW.badgeR} color="blue" opacity={fade(frame, ev.row[0], Infinity, 8)} />
              <Write x={ROW.textX} y={m.y} text={`get_id on ${m.name}`} size={TS} variant="mono" progress={ramp(frame, ...ev.row)} />
              <Pen d={m.rowArrow} progress={ramp(frame, ...ev.rowArrow)} head={m.rowHead} width={STROKE.thin + 0.8} />
              <Write x={G.slotCx} y={m.y + (G.ph ? 1 : 0)} text={m.id} size={ROW.idSize} variant="mono" anchor="middle" weight={560} progress={ramp(frame, ...ev.id)} />
              <Pen d={G.UNDER[i]} progress={ramp(frame, ...ev.under)} color="ink2" width={STROKE.thin + 0.6} />
            </g>
          );
        })}

        {/* ===== ③ 237 is smaller than 244; m4's clock is ahead ===== */}
        <Pen d={G.RING_237} progress={ramp(frame, ...EV.ring237)} color="red" dash="12 9" />
        {G.SMALLER.map((l, i) => (
          <Write key={`sm${i}`} x={l.x} y={l.y} text={l.text} size={TS} color="red" weight={600}
            progress={ramp(frame, EV.smaller[0] + i * 12, EV.smaller[1] - i * 6)} />
        ))}
        <Pen d={G.RING_24} progress={ramp(frame, ...EV.ring24)} color="red" dash="12 9" width={STROKE.thin + 0.8} />
        <Write x={G.AHEAD.x} y={G.AHEAD.y} text="ahead" size={TS} color="red" weight={600} anchor={G.AHEAD.anchor} progress={ramp(frame, ...EV.ahead)} />

        {/* ===== B5: read down the list: not monotonically increasing ===== */}
        <Pen d={G.BRACKET} progress={ramp(frame, ...EV.bracket)} head={G.BRACKET_HEAD} color="red" />
        <Write x={G.NOT_MONO[0].x} y={G.NOT_MONO[0].y} text="not monotonically" size={TS} color="red" weight={600} progress={ramp(frame, ...EV.notMono)} />
        <Write x={G.NOT_MONO[1].x} y={G.NOT_MONO[1].y} text="increasing" size={TS} color="red" weight={600} progress={ramp(frame, ...EV.increasing)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default ClockSkew;

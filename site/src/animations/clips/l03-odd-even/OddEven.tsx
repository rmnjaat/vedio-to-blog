// Clip l03-odd-even — "One ticket server goes away and comes back".
// Storyboard: lectures/lec03/animations/l03-odd-even/storyboard.{yaml,md}. Ledger: L-0177, L-0179 … L-0183.
// Frame 0 = Fig 5·d (board D-16): two ticket cylinders, an lb bar under them, requests coming up from below, plus the
// empty strip of IDs handed out. The last frame is the annotated poster (four rows of the stream).
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×1010, portrait re-flow, ≤ 640 px).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {chevron, cylinder, handLine, handPoly, type Pt} from '../../lib/hand';
import {ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, HOP, ID_WRITE, META, REQS, ROWS, SETTLE} from './timeline';

export type OddEvenProps = {theme: ThemeName; layout?: Layout};

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const S = typeFor(layout).label; // 40 wide, 30 phone
  const MW = S * 0.62; // mono advance per character
  const GAP = ph ? 24 : 30; // between IDs in a strip row
  // the two ticket servers
  const CY = ph ? {top: 140, rx: 70, ry: 15, h: 120} : {top: 175, rx: 80, ry: 18, h: 130};
  const CX: Record<1 | 2, number> = ph ? {1: 200, 2: 470} : {1: 140, 2: 380};
  const cylBot = CY.top + CY.h + CY.ry; // lowest point of the front arc
  // lb bar under them, the request arrow entering it from below
  const BAR = ph ? {x: 100, y: 330, w: 470, h: 20} : {x: 60, y: 390, w: 400, h: 24};
  const ENTRY_X = BAR.x + BAR.w / 2;
  const ENTRY_Y0 = ph ? 425 : 500; // where requests come from
  const BAR_MID = BAR.y + BAR.h / 2;
  const linkTop = cylBot + 4;
  const link = (s: 1 | 2): Pt[] => [
    [CX[s], BAR.y],
    [CX[s], linkTop],
  ];
  const route = (s: 1 | 2) =>
    handPoly(
      [
        [ENTRY_X, ENTRY_Y0],
        [ENTRY_X, BAR_MID],
        [CX[s], BAR_MID],
        [CX[s], linkTop + 6],
      ],
      `route${s}`,
    );
  // the strip of IDs handed out: a header, then four rows (label above, IDs below)
  const ST = ph ? {x: 40, head: 512, row0: 556, step: 92, num: 40} : {x: 600, head: 70, row0: 124, step: 116, num: 52};
  const rowLblY = (r: number) => ST.row0 + r * ST.step;
  const rowNumY = (r: number) => rowLblY(r) + ST.num;
  const TOKENS: string[][] = [
    ['1', '2', '3', '4', '5', '6'],
    ['8', '10', '12', '…', '202'],
    ['7', '204', '9', '206'],
    ['241', '242', '243', '244'],
  ];
  const slotX = TOKENS.map((row) => {
    const xs: number[] = [];
    let x = ST.x;
    for (const t of row) {
      xs.push(x);
      x += t.length * MW + GAP;
    }
    return xs;
  });
  const endX = (r: number) => slotX[r][slotX[r].length - 1] + TOKENS[r][TOKENS[r].length - 1].length * MW;
  const midLink = (linkTop + BAR.y) / 2;
  return {
    ph,
    W: ph ? META.phone.width : META.width,
    H: ph ? META.phone.height : META.height,
    S,
    MW,
    CY,
    CX,
    CYL: {1: cylinder(CX[1], CY.top, CY.rx, CY.ry, CY.h, 'tk1'), 2: cylinder(CX[2], CY.top, CY.rx, CY.ry, CY.h, 'tk2')},
    NAME_Y: ph ? 62 : 80,
    ROLE_Y: ph ? 106 : 132,
    NEXT_Y: CY.top + (ph ? 56 : 63),
    VAL_Y: CY.top + (ph ? 105 : 117),
    VAL_SIZE: ph ? 44 : 56,
    BAR,
    BAR_D: handPoly(
      [
        [BAR.x, BAR.y],
        [BAR.x + BAR.w, BAR.y],
        [BAR.x + BAR.w, BAR.y + BAR.h],
        [BAR.x, BAR.y + BAR.h],
        [BAR.x, BAR.y],
      ],
      'bar',
    ),
    LB_LBL: {x: BAR.x + BAR.w + (ph ? 14 : 16), y: BAR.y + BAR.h - (ph ? 0 : 1)},
    LINK: {1: handPoly(link(1), 'link1'), 2: handPoly(link(2), 'link2')},
    HEAD: {1: chevron(link(1)[1], 0, -1, ph ? 13 : 16, 'h1'), 2: chevron(link(2)[1], 0, -1, ph ? 13 : 16, 'h2')},
    ENTRY_D: handLine([ENTRY_X, ENTRY_Y0], [ENTRY_X, BAR.y + BAR.h + 4], 'entry'),
    ENTRY_HEAD: chevron([ENTRY_X, BAR.y + BAR.h + 4], 0, -1, ph ? 13 : 16, 'entryH'),
    RR_LBL: {x: ENTRY_X + (ph ? 22 : 24), y: ph ? 400 : 468},
    REQ_LBL: {x: ENTRY_X, y: ENTRY_Y0 + (ph ? 36 : 44)},
    ROUTE: {1: route(1), 2: route(2)},
    // the 'down' mark on ticket 1's link
    CROSS: [
      handLine([CX[1] - 14, midLink - 14], [CX[1] + 14, midLink + 14], 'x1'),
      handLine([CX[1] + 14, midLink - 14], [CX[1] - 14, midLink + 14], 'x2'),
    ],
    DOWN_LBL: {x: CX[1] - (ph ? 26 : 30), y: midLink + S * 0.36},
    ST,
    rowLblY,
    rowNumY,
    TOKENS,
    slotX,
    endX,
    CAPTION_TOP: ph ? 890 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type Geo = (typeof LAYOUTS)['wide'];

// ---------- the live "next ID" of each server ----------
type Val = {at: number; text: string; cut?: boolean};
const counterStates = (srv: 1 | 2): Val[] => {
  const v: Val[] = [{at: 0, text: String(srv)}];
  for (const q of REQS) if (q.srv === srv) v.push({at: q.at + HOP, text: String(q.id + 2)});
  // after the fast-forward ticket 2 has handed out 202, so its next is 204 (the rolling value already shows it: no fade)
  if (srv === 2) v.push({at: EV.ff[0] + EV.ff[1], text: '204', cut: true});
  v.push({at: EV.resetVals, text: String(240 + srv)});
  return v.sort((a, b) => a.at - b.at);
};
const COUNTERS = {1: counterStates(1), 2: counterStates(2)};

/** Ticket 2's counter while the outage is fast-forwarded: 14 → 204 in even steps, linear (speed = time sped up). */
const ffValue = (frame: number) => {
  const [a, d] = EV.ff;
  if (frame < a || frame >= a + d) return null;
  const p = interpolate(frame, [a, a + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return String(14 + 2 * Math.round(p * 95));
};

/** Opacity of a strip row: written at full ink, ghosted when the next row starts, back to full for the poster. */
const rowOpacity = (frame: number, r: number) => {
  const next = [BEAT.down, BEAT.back, BEAT.reset, Infinity][r];
  const g = next === Infinity ? 1 : ghost(frame, next);
  return g + (1 - g) * ramp(frame, EV.unghost, 12, EASE_FADE);
};

export const OddEven: React.FC<OddEvenProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const S = G.S;
  const at = (r: readonly [number, number]) => r;

  // ticket 1 down between ② and ③
  const downO = ramp(frame, ...at(EV.red), EASE_FADE) * (1 - ramp(frame, EV.backLbl, 10, EASE_FADE));
  const crossP = ramp(frame, ...at(EV.cross));
  const crossO = 1 - ramp(frame, EV.backLbl, 10, EASE_FADE);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): Fig 5·d ===== */}
        {([1, 2] as const).map((s) => (
          <g key={s}>
            <Write x={G.CX[s]} y={G.NAME_Y} text={`ticket ${s}`} size={S} variant="mono" anchor="middle" />
            <Ink d={G.LINK[s]} />
            <Ink d={G.HEAD[s]} />
            <path d={G.CYL[s].bodyFill} fill={T.sheet} />
            <Ink d={G.CYL[s].sides} opacity={s === 1 ? 1 - downO : 1} />
            <Ink d={G.CYL[s].front} opacity={s === 1 ? 1 - downO : 1} />
            <path d={G.CYL[s].top} fill={T.sheet} />
            <Ink d={G.CYL[s].top} opacity={s === 1 ? 1 - downO : 1} />
            {s === 1 && downO > 0 ? (
              <g opacity={downO}>
                <Ink d={G.CYL[1].sides} color="red" width={STROKE.ink + 0.8} />
                <Ink d={G.CYL[1].front} color="red" width={STROKE.ink + 0.8} />
                <Ink d={G.CYL[1].top} color="red" width={STROKE.ink + 0.8} />
              </g>
            ) : null}
            <Write x={G.CX[s]} y={G.NEXT_Y} text="next" size={S} color="ink2" anchor="middle" />
            <Counter G={G} vals={COUNTERS[s]} frame={frame} x={G.CX[s]} y={G.VAL_Y} ff={s === 2 ? ffValue(frame) : null} />
          </g>
        ))}
        <Write x={G.CX[1]} y={G.ROLE_Y} text="odd" size={S} color="ink2" anchor="middle" />
        <Write x={G.CX[2]} y={G.ROLE_Y} text="even" size={S} color="ink2" anchor="middle" />
        <path d={G.BAR_D} fill={T.sheet} />
        <Ink d={G.BAR_D} />
        <Write x={G.LB_LBL.x} y={G.LB_LBL.y} text="lb" size={S} variant="mono" />
        <Ink d={G.ENTRY_D} />
        <Ink d={G.ENTRY_HEAD} />
        <Write x={G.RR_LBL.x} y={G.RR_LBL.y} text="round robin" size={S} color="ink2" />
        <Write x={G.REQ_LBL.x} y={G.REQ_LBL.y} text="requests" size={S} color="ink2" anchor="middle" />
        <Write x={G.ST.x} y={G.ST.head} text="IDs handed out" size={S} color="ink2" />

        {/* ===== ② ticket 1 goes down, ③ it comes back ===== */}
        {crossP > 0 ? (
          <g opacity={crossO}>
            <Pen d={G.CROSS[0]} progress={Math.min(1, crossP * 2)} color="red" width={STROKE.ink + 1} />
            <Pen d={G.CROSS[1]} progress={Math.max(0, crossP * 2 - 1)} color="red" width={STROKE.ink + 1} />
          </g>
        ) : null}
        <Write
          x={G.DOWN_LBL.x}
          y={G.DOWN_LBL.y}
          text="down"
          size={S}
          color="red"
          weight={600}
          anchor="end"
          progress={ramp(frame, ...at(EV.downLbl))}
          opacity={1 - ramp(frame, EV.backLbl, 10, EASE_FADE)}
        />
        <Write x={G.DOWN_LBL.x} y={G.DOWN_LBL.y} text="back" size={S} color="green" weight={600} anchor="end" progress={ramp(frame, EV.backLbl + 8, 16)} />

        {/* ===== request packets: entry arrow → lb → the chosen server ===== */}
        {REQS.map((q, i) => (
          <Packet key={i} d={G.ROUTE[q.srv]} progress={ramp(frame, q.at, HOP, EASE_MOVE)} color="blue" />
        ))}

        {/* ===== the strip of IDs handed out ===== */}
        {ROWS.map((row, r) => (
          <g key={r} opacity={rowOpacity(frame, r)}>
            <Write x={G.ST.x} y={G.rowLblY(r)} text={row.label} size={S} color="ink2" progress={ramp(frame, row.at, r === 3 ? EV.resetLbl[1] : 20)} />
            {REQS.filter((q) => q.row === r).map((q) => (
              <IdCell key={q.slot} x={G.slotX[r][q.slot]} y={G.rowNumY(r)} text={String(q.id)} size={S} frame={frame} at={q.at + HOP} />
            ))}
            {r === 1 ? (
              <>
                <Write x={G.slotX[1][3]} y={G.rowNumY(1)} text="…" size={S} variant="mono" progress={ramp(frame, ...at(EV.ellipsis))} />
                <IdCell x={G.slotX[1][4]} y={G.rowNumY(1)} text="202" size={S} frame={frame} at={EV.id202[0]} />
              </>
            ) : null}
            {r === 2 ? (
              <>
                {[0, 2].map((slot, k) => (
                  <Ring key={slot} G={G} x={G.slotX[2][slot] + G.MW / 2} y={G.rowNumY(2) - S * 0.34} p={ramp(frame, EV.rings[k], 16)} />
                ))}
                <Tick x={G.endX(2) + (G.ph ? 40 : 50)} y={G.rowNumY(2) - S * 0.34} color={T.green} s={G.ph ? 0.8 : 1} o={ramp(frame, ...at(EV.tick), EASE_FADE)} />
                <Write x={G.endX(2) + (G.ph ? 66 : 80)} y={G.rowNumY(2)} text="unique" size={S} color="green" weight={600} progress={ramp(frame, ...at(EV.uniqueLbl))} />
              </>
            ) : null}
          </g>
        ))}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** A server's next ID: each new value replaces the last in place (8 f cross-fade); `ff` overrides while rolling. */
const Counter: React.FC<{G: Geo; vals: Val[]; frame: number; x: number; y: number; ff: string | null}> = ({G, vals, frame, x, y, ff}) => {
  if (ff) return <Write x={x} y={y} text={ff} size={G.VAL_SIZE} variant="mono" anchor="middle" weight={560} />;
  let i = 0;
  while (i + 1 < vals.length && frame >= vals[i + 1].at) i++;
  const cur = vals[i];
  const prev = i > 0 ? vals[i - 1] : null;
  const p = prev && !cur.cut ? ramp(frame, cur.at, 8, EASE_FADE) : 1;
  return (
    <g>
      {prev && p < 1 ? <Write x={x} y={y} text={prev.text} size={G.VAL_SIZE} variant="mono" anchor="middle" weight={560} opacity={1 - p} /> : null}
      <Write x={x} y={y} text={cur.text} size={G.VAL_SIZE} variant="mono" anchor="middle" weight={560} opacity={p} />
    </g>
  );
};

/** One ID handed out: written in blue as it leaves the server, settling to ink. */
const IdCell: React.FC<{x: number; y: number; text: string; size: number; frame: number; at: number}> = ({x, y, text, size, frame, at}) => {
  const p = ramp(frame, at, ID_WRITE);
  if (p <= 0) return null;
  const settle = ramp(frame, at + SETTLE, 14, EASE_FADE);
  return (
    <g>
      <Write x={x} y={y} text={text} size={size} variant="mono" color="blue" weight={560} progress={p} opacity={1 - settle} />
      <Write x={x} y={y} text={text} size={size} variant="mono" weight={560} opacity={settle} />
    </g>
  );
};

/** Graphite ring around a small ID that came back out of place (not red: nothing is wrong). */
const Ring: React.FC<{G: Geo; x: number; y: number; p: number}> = ({G, x, y, p}) => {
  if (p <= 0) return null;
  const rx = G.ph ? 22 : 28;
  const ry = G.ph ? 24 : 31;
  const d = handPoly(
    Array.from({length: 13}, (_, k) => {
      const a = -Math.PI / 2 + (k / 12) * Math.PI * 2.08;
      return [x + rx * Math.cos(a), y + ry * Math.sin(a)] as Pt;
    }),
    `ring${x}`,
  );
  return <Pen d={d} progress={p} color="ink2" width={STROKE.thin + 0.6} />;
};

/** Green check: every ID in the row is still unique. */
const Tick: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 1}) =>
  o <= 0 ? null : (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -13 1 L -3 11 L 14 -12" fill="none" stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

export default OddEven;

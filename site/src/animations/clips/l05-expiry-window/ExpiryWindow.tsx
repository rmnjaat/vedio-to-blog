// Clip l05-expiry-window — "Expired, hidden, then gone": between a key's expiry and the next cron run its row is
// still on disk, so GET and delete both carry `AND expired_at > UNIX_TIMESTAMP()`; the cron's `expired_at <= UNIX_TIMESTAMP()` then removes
// expired and soft-deleted rows in one query.
// Storyboard: lectures/lec05/animations/l05-expiry-window/storyboard.{yaml,md}.
// Ledger: L-0201, L-0221, L-0222, L-0236, L-0199, L-0258, L-0259, L-0263, L-0202.
// Frame 0 = Fig 3·d's parts (axis + cron, the store behind the api); the last frame is the annotated poster.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {chevron, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, MOVES} from './timeline';
import {clock, cross, tick} from './glyphs';

export type ExpiryWindowProps = {theme: ThemeName; layout?: Layout};

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

const ROWS = [
  {key: 'k1', value: 'v1', exp: '12:02'},
  {key: 'k2', value: 'v2', exp: '12:02'},
  {key: 'k3', value: 'v3', exp: '12:30'},
];

// The query strip under the table: who runs it, then three SQL lines; line 3 is the clause (blue) when there is one.
type Strip = {who: string; lines: [string, string, string]; at: readonly [number, number]; out: number};
const STRIPS: Strip[] = [
  {who: 'GET k1', lines: ['SELECT * FROM store', "WHERE `key` = 'k1'", 'AND expired_at > UNIX_TIMESTAMP()'], at: EV.strip1, out: EV.stripOut1},
  {who: 'DELETE k2', lines: ['UPDATE store SET expired_at = -1', "WHERE `key` = 'k2'", 'AND expired_at > UNIX_TIMESTAMP()'], at: EV.strip2, out: EV.stripOut2},
  {who: 'DELETE k3', lines: ['UPDATE store SET expired_at = -1', "WHERE `key` = 'k3'", 'AND expired_at > UNIX_TIMESTAMP()'], at: EV.strip3, out: EV.stripOut3},
  {who: 'cron', lines: ['DELETE FROM store', 'WHERE expired_at <=', 'UNIX_TIMESTAMP()'], at: EV.strip4, out: Infinity},
];

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: the clock axis across the top (cron clocks under its ends, the red window label under it), the
// store table left with the api bar right and one request lane per row between them, the query strip under the table.
// phone 720×920: the same stack, narrower table and lanes; the strip puts "who" on its own line.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const S = typeFor(layout).label;
  const CH = S * 0.6; // mono advance per character (measured on the renders)
  const AX0 = ph ? 60 : 110;
  const AX1 = ph ? 640 : 1010;
  const AY = ph ? 104 : 96;
  const xm = (m: number) => AX0 + (m * (AX1 - AX0)) / 10;
  const TB = ph ? {x: 20, y: 250, cols: [88, 112, 220], headH: 46, rowH: 80} : {x: 60, y: 186, cols: [110, 150, 280], headH: 48, rowH: 72};
  const colX = [TB.x, TB.x + TB.cols[0], TB.x + TB.cols[0] + TB.cols[1]];
  const TW = TB.cols[0] + TB.cols[1] + TB.cols[2];
  const TR = TB.x + TW;
  const rowTop = (i: number) => TB.y + TB.headH + i * TB.rowH;
  const TH = TB.headH + ROWS.length * TB.rowH;
  const API = ph ? {x: 662, w: 32} : {x: 1060, w: 50};
  const pad = ph ? 12 : 18;
  const cellBase = (i: number) => rowTop(i) + TB.rowH / 2 + S * 0.35;
  const laneY = (i: number) => rowTop(i) + (ph ? 64 : 62);
  const laneLbl = (i: number) => rowTop(i) + (ph ? 46 : 44);
  const hs = ph ? 14 : 18;
  const lanes = ROWS.map((_, i) => {
    const pts: Pt[] = [
      [API.x, laneY(i)],
      [TR + 4, laneY(i)],
    ];
    return {d: handPoly(pts, `lane${i}`), head: chevron(pts[1], -1, 0, hs, `lane${i}h`)};
  });
  // the hand-ruled table: outline, header rule, row rules, column rules
  const grid = [
    ...[1, 2, 3].map((i) => handLine([TB.x, rowTop(i - 1)], [TR, rowTop(i - 1)], `hr${i}`)),
    handLine([colX[1], TB.y], [colX[1], TB.y + TH], 'vc1'),
    handLine([colX[2], TB.y], [colX[2], TB.y + TH], 'vc2'),
  ];
  const expX = colX[2] + pad;
  const laneX = TR + (ph ? 18 : 28);
  const SY = ph ? [600, 644, 684, 724] : [518, 518, 562, 606]; // strip baselines: who, line 1, 2, 3
  const SX = ph ? [TB.x, TB.x] : [60, 330]; // who x, SQL x ("DELETE k2" ends at 276: keep a clear gap)
  const clk = (m: number, seed: string) => clock(xm(m), AY + (ph ? 36 : 42), ph ? 14 : 17, seed);
  return {
    ph, S, CH, AX0, AX1, AY, xm, TB, colX, TW, TR, TH, rowTop, cellBase, laneY, laneLbl, lanes, grid, expX, laneX, SY, SX, API, pad,
    W: ph ? META.phone.width : META.width,
    H: ph ? META.phone.height : META.height,
    outline: serverBox(TB.x, TB.y, TW, TH, 'table'),
    apiBox: serverBox(API.x, rowTop(0), API.w, ROWS.length * TB.rowH, 'api'),
    axis: handLine([AX0 - (ph ? 10 : 16), AY], [AX1 + (ph ? 10 : 16), AY], 'axis'),
    ticks: Array.from({length: 11}, (_, m) => {
      const h = m === 0 || m === 10 ? (ph ? 11 : 13) : ph ? 6 : 8;
      return handLine([xm(m), AY - h], [xm(m), AY + h], `tk${m}`);
    }).join(' '),
    clock0: clk(0, 'c0'),
    clock10: clk(10, 'c10'),
    cronLbl: {x: xm(0) + (ph ? 24 : 30), y: AY + (ph ? 46 : 56)},
    bandLbl: {x: xm(2) - (ph ? 4 : 6), y: AY + (ph ? 72 : 64)},
    phTop: AY - (ph ? 20 : 22),
    phBot: AY + (ph ? 16 : 18),
    phLbl: AY - (ph ? 32 : 38),
    apiLbl: {x: API.x + API.w / 2, y: rowTop(0) - (ph ? 16 : 14)},
    notSent: ph ? 'not sent' : 'v1 not sent',
    updated: ph ? 'updated' : 'row updated',
    pr: ph ? 8 : 10,
    CAPTION_TOP: ph ? 770 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const at = (r: readonly [number, number]) => r;

/** Clock minute (0..10 past 12:00) at this frame: eased moves between holds. */
const minuteAt = (frame: number) => {
  let m = 0;
  for (const mv of MOVES) m = interpolate(ramp(frame, mv.at[0], mv.at[1], EASE_MOVE), [0, 1], [m, mv.to]);
  return m;
};

export const ExpiryWindow: React.FC<ExpiryWindowProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const S = G.S;

  const m = minuteAt(frame);
  const nowX = G.xm(m);
  const clockText = `12:${String(Math.round(m)).padStart(2, '0')}`;

  // past rows: everything the sweep removes ghosts to 38%
  const past = ghost(frame, EV.gone);
  // lane verdicts stay nearly full ink (85%): they are the poster's summary; at 55% the red and green words read pale
  const lblPast = 1 - 0.15 * ramp(frame, EV.gone, 12, EASE_FADE);
  // "v1 ✓" is history once k1 has expired: it ghosts when the rows turn red
  const v1O = fade(frame, 0, EV.v1Out, 1, 10) * ghost(frame, EV.wash);
  // lanes: graphite base drawn by the first request on it; blue overlays fade back after each request
  const get1P = ramp(frame, ...at(EV.get1), EASE_MOVE);
  const get2P = ramp(frame, ...at(EV.get2), EASE_MOVE);
  const del2P = ramp(frame, ...at(EV.del2), EASE_MOVE);
  const del3P = ramp(frame, ...at(EV.del3), EASE_MOVE);
  const blue = (inkAt: number) => 1 - ramp(frame, inkAt, 14, EASE_FADE);
  // the window: from 12:02 to the clock, once the clock has reached 12:02
  const bandO = fade(frame, EV.wash - 4, Infinity, 10);
  const bandX1 = Math.max(G.xm(2), nowX);

  const tk = G.ph ? 10 : 13;
  const v1W = 2 * S * 0.56;

  return (
    <Sheet theme={theme}>
      <Stage title="Expired, hidden, then gone" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== the clock axis ===== */}
        {bandO > 0 && bandX1 > G.xm(2) ? (
          <g opacity={bandO}>
            <rect x={G.xm(2)} y={G.AY - 12} width={bandX1 - G.xm(2)} height={24} fill={T.redWash} />
            <Ink d={handLine([G.xm(2), G.AY], [bandX1, G.AY], 'band')} color="red" width={STROKE.thick} />
          </g>
        ) : null}
        <Ink d={G.axis} width={STROKE.thin + 0.6} />
        <Ink d={G.ticks} width={STROKE.thin} />
        <Ink d={G.clock0.face} fill={T.sheet} />
        <Ink d={G.clock0.hands} width={STROKE.thin + 0.4} />
        <Ink d={G.clock10.face} fill={T.sheet} />
        <Ink d={G.clock10.hands} width={STROKE.thin + 0.4} />
        <Pen d={G.clock10.face} progress={ramp(frame, EV.move6[0] + EV.move6[1], 16)} width={STROKE.thick} />
        <Write x={G.cronLbl.x} y={G.cronLbl.y} text="cron" size={S} color="ink2" />
        <Write x={G.bandLbl.x} y={G.bandLbl.y} text="expired, still on disk" size={S} color="red" progress={ramp(frame, ...at(EV.bandLbl))} />
        {/* playhead */}
        <Ink d={`M ${nowX} ${G.phTop} L ${nowX} ${G.phBot}`} width={STROKE.ink} />
        <Write x={nowX} y={G.phLbl} text={clockText} variant="mono" size={S} anchor="middle" />

        {/* ===== the store table ===== */}
        <Ink d={G.outline} fill={T.sheet} />
        {/* row washes (expired: k1, k2), under the grid */}
        <g opacity={fade(frame, EV.wash) * past}>
          {[0, 1].map((i) => (
            <rect key={i} x={G.TB.x + 3} y={G.rowTop(i) + 3} width={G.TW - 6} height={G.TB.rowH - 6} fill={T.redWash} />
          ))}
        </g>
        {G.grid.map((d, i) => (
          <Ink key={i} d={d} width={i === 0 ? STROKE.ink : STROKE.thin + 0.4} />
        ))}
        {['key', 'value', 'expired_at'].map((h, c) => (
          <Write key={h} x={G.colX[c] + G.pad} y={G.TB.y + G.TB.headH / 2 + S * 0.35} text={h} variant="mono" size={S} color="ink2" />
        ))}
        <g opacity={past}>
          {ROWS.map((r, i) => (
            <g key={r.key}>
              <Write x={G.colX[0] + G.pad} y={G.cellBase(i)} text={r.key} variant="mono" size={S} />
              <Write x={G.colX[1] + G.pad} y={G.cellBase(i)} text={r.value} variant="mono" size={S} />
              <Write x={G.expX} y={G.cellBase(i)} text={r.exp} variant="mono" size={S} />
            </g>
          ))}
          {/* B2: the expired_at of k1, k2 underlined red */}
          {[0, 1].map((i) => (
            <Pen key={i} d={handLine([G.expX - 4, G.cellBase(i) + 9], [G.expX + 5 * G.CH + 4, G.cellBase(i) + 9], `ul${i}`)} progress={ramp(frame, ...at(EV.under))} color="red" />
          ))}
          {/* B5: k3's 12:30 struck, -1 beside it */}
          <Pen d={handLine([G.expX - 6, G.cellBase(2) - S * 0.3], [G.expX + 5 * G.CH + 6, G.cellBase(2) - S * 0.3], 'st30')} progress={ramp(frame, ...at(EV.strike30))} />
          <Write x={G.expX + 5 * G.CH + (G.ph ? 26 : 40)} y={G.cellBase(2)} text="-1" variant="mono" size={S} weight={620} progress={ramp(frame, ...at(EV.minus1))} />
        </g>
        {/* B6: the cron's strikes through the three rows */}
        {[0, 1, 2].map((i) => (
          <Pen key={i} d={handLine([G.TB.x + 12, G.rowTop(i) + G.TB.rowH / 2], [G.TR - 12, G.rowTop(i) + G.TB.rowH / 2], `sw${i}`)} progress={ramp(frame, EV.strikes[0] + i * 8, EV.strikes[1])} width={STROKE.ink + 0.6} />
        ))}

        {/* ===== the api and the request lanes ===== */}
        <Ink d={G.apiBox} fill={T.sheet} />
        <Write x={G.apiLbl.x} y={G.apiLbl.y} text="api" variant="mono" size={S} anchor="middle" />
        <g opacity={past}>
          {/* k1: GET at 12:01 (v1 back) and at 12:04 (filtered) */}
          <Pen d={G.lanes[0].d} progress={get1P} head={G.lanes[0].head} />
          <Pen d={G.lanes[0].d} progress={get1P} head={G.lanes[0].head} color="blue" opacity={blue(EV.ink1) * (1 - ramp(frame, EV.get2[0], 1))} />
          <Pen d={G.lanes[0].d} progress={get2P} head={G.lanes[0].head} color="blue" opacity={blue(EV.ink2)} />
          {/* k2: DELETE at 12:05 — nothing matches */}
          <Pen d={G.lanes[1].d} progress={del2P} head={G.lanes[1].head} />
          <Pen d={G.lanes[1].d} progress={del2P} head={G.lanes[1].head} color="blue" opacity={blue(EV.ink3)} />
          {/* k3: DELETE at 12:06 — marked -1 */}
          <Pen d={G.lanes[2].d} progress={del3P} head={G.lanes[2].head} />
          <Pen d={G.lanes[2].d} progress={del3P} head={G.lanes[2].head} color="blue" opacity={blue(EV.ink4)} />
        </g>
        {/* lane verdicts */}
        <g opacity={lblPast}>
          <Write x={G.laneX} y={G.laneLbl(0)} text="v1" size={S} color="green" weight={600} progress={ramp(frame, ...at(EV.v1))} opacity={v1O} />
          <Pen d={tick(G.laneX + v1W + tk * 1.6, G.laneLbl(0) - S * 0.36, tk)} progress={ramp(frame, EV.v1[0] + 8, 10)} color="green" opacity={v1O} />
          <Pen d={cross(G.laneX + tk * 0.4, G.laneLbl(0) - S * 0.34, tk * 0.85, 'x1')} progress={ramp(frame, EV.cross, 8)} color="red" />
          <Write x={G.laneX + tk * 2.2} y={G.laneLbl(0)} text={G.notSent} size={S} color="red" progress={ramp(frame, ...at(EV.notSent))} />
          <Write x={G.laneX} y={G.laneLbl(1)} text="no disk IO" size={S} progress={ramp(frame, ...at(EV.noIO))} />
          <Write x={G.laneX} y={G.laneLbl(2)} text={G.updated} size={S} color="green" progress={ramp(frame, ...at(EV.updated))} />
        </g>
        <Packet d={G.lanes[0].d} progress={get1P} color="blue" r={G.pr} />
        <Packet d={reversePath(G.lanes[0].d)} progress={ramp(frame, ...at(EV.back1), EASE_MOVE)} color="green" r={G.pr} />
        <Packet d={G.lanes[0].d} progress={get2P} color="blue" r={G.pr} />
        <Packet d={G.lanes[1].d} progress={del2P} color="blue" r={G.pr} />
        <Packet d={G.lanes[2].d} progress={del3P} color="blue" r={G.pr} />

        {/* ===== the query strip ===== */}
        {STRIPS.map((s, k) => {
          const o = fade(frame, 0, s.out, 1, 10);
          const p = ramp(frame, ...at(s.at));
          if (p <= 0 || o <= 0) return null;
          return (
            <g key={k} opacity={o}>
              <Write x={G.SX[0]} y={G.SY[0]} text={s.who} variant="mono" size={S} color="ink2" progress={p} />
              {s.lines.map((ln, j) =>
                ln ? (
                  <Write key={j} x={G.SX[1]} y={G.SY[j + 1]} text={ln} variant="mono" size={S} color={j === 2 ? 'blue' : 'ink'} weight={j === 2 ? 560 : undefined} progress={p} />
                ) : null,
              )}
              {k === 0 ? (
                <Pen d={handLine([G.SX[1] - 4, G.SY[3] + 10], [G.SX[1] + 33 * G.CH, G.SY[3] + 10], 'clause')} progress={ramp(frame, ...at(EV.clause))} color="blue" />
              ) : null}
            </g>
          );
        })}
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default ExpiryWindow;

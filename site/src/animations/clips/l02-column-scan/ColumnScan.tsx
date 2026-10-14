// Clip l02-column-scan — "One average, two layouts".
// Storyboard: lectures/lec02/animations/l02-column-scan/storyboard.{yaml,md}. Ledger: L-0053, L-0056, L-0057, L-0058, L-0059, L-0062.
// Frame 0 = Fig 3·a/3·b: the query, a row store (header over three 5-cell strips R1–R3, × 10,000) and a column store
// (five 3-cell files, naive model). The last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×1040, portrait re-flow, ≤ 640 px).
import React, {useId} from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {handLine, handPoly, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE} from '../../lib/anim';
import {CaptionBand, Ink, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META} from './timeline';

export type ColumnScanProps = {theme: ThemeName; layout?: Layout};

const COLS = ['symbol', 'price', 'name', 'exchange', 'ts'] as const;
const USED = [false, true, false, false, true];
const QUERY = "SELECT avg(price) WHERE ts = '…'";
const MONO_EM = 0.6; // Recursive MONO advance
const N_WIDE = 100; // the board's 100-column table
const WIDE_USED = [1, 99]; // price at column 2, ts at column 100 (illustrative)

const rect = (x: number, y: number, w: number, h: number, seed: string) =>
  handPoly(
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ] as Pt[],
    seed,
  ) + ' Z';

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TS = typeFor(layout).label;
  const X0 = ph ? 84 : 330;
  const widths = ph ? [130, 112, 96, 166, 100] : [176, 150, 124, 236, 144];
  const X1 = X0 + widths.reduce((a, b) => a + b, 0);
  const SH = ph ? 42 : 46; // strip height
  const SY = ph ? [212, 266, 320] : [132, 194, 256];
  const cells = widths.map((w, i) => ({x: X0 + widths.slice(0, i).reduce((a, b) => a + b, 0), w}));
  const strips = SY.map((y, r) => ({
    y,
    outline: rect(X0, y, X1 - X0, SH, `strip${r}`),
    dividers: cells.slice(1).map((c, i) => handLine([c.x, y], [c.x, y + SH], `div${r}-${i}`)),
  }));
  // 100-column comb: straight thin dividers, one path per strip
  const CW = (X1 - X0) / N_WIDE;
  const combD = SY.map((y) => {
    let d = '';
    for (let i = 1; i < N_WIDE; i++) d += `M ${(X0 + i * CW).toFixed(1)} ${y + 2} L ${(X0 + i * CW).toFixed(1)} ${y + SH - 2} `;
    return d;
  });
  // column files
  const FW = ph ? 150 : 120; // file width (3 cells)
  const FH = ph ? 40 : 46;
  const fileSlots = ph
    ? COLS.map((_, i) => {
        const col = i % 3;
        const row = i < 3 ? 0 : 1;
        return {cx: 32 + (656 / 3) * (col + 0.5), lblY: row ? 772 : 620};
      })
    : COLS.map((_, i) => ({cx: X0 + ((X1 - X0) / 5) * (i + 0.5), lblY: 486}));
  const files = fileSlots.map((s, i) => {
    const x = s.cx - FW / 2;
    const y = s.lblY + (ph ? 14 : 16);
    return {
      ...s,
      x,
      y,
      outline: rect(x, y, FW, FH, `file${i}`),
      dividers: [1, 2].map((k) => handLine([x + (FW / 3) * k, y], [x + (FW / 3) * k, y + FH], `fdiv${i}-${k}`)),
      underY: y + FH + (ph ? 38 : 48),
    };
  });
  return {
    ph,
    W,
    H,
    TS,
    X0,
    X1,
    SH,
    SY,
    cells,
    strips,
    CW,
    combD,
    FW,
    FH,
    files,
    Q: {x: ph ? 32 : 40, y: ph ? 52 : 56},
    TABLE: ph ? {x: 32, y: 92, anchor: 'start' as const} : {x: X1, y: 56, anchor: 'end' as const},
    ROW_TITLE: {x: ph ? 32 : 40, y: ph ? 150 : 116},
    HEADER_Y: ph ? 196 : 116,
    RLBL: ph ? {x: 32, anchor: 'start' as const} : {x: 304, anchor: 'end' as const},
    X10K: ph ? {x: 32, y: 410, anchor: 'start' as const} : {x: 304, y: 350, anchor: 'end' as const},
    BOUND_Y: ph ? 410 : 350,
    COUNTER: ph ? {x: 32, y: 456} : {x: X0, y: 350},
    DISCARD: ph ? {x: 32, y: 500} : {x: X0, y: 396},
    COL_TITLE: ph ? {x: 32, y: 566} : {x: 40, y: 486},
    NAIVE: ph ? {x: 250, y: 566} : {x: 40, y: 532},
    FILES_READ: ph ? {x: 32 + (656 / 3) * 2.5, y: 816, anchor: 'middle' as const} : {x: 40, y: files[0].underY, anchor: 'start' as const},
    CAPTION_TOP: ph ? 900 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;

export const ColumnScan: React.FC<ColumnScanProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TS;
  const uid = useId().replace(/:/g, '');
  const dark = theme === 'blackboard'; // the red hatch needs more ink on the blackboard to stay red, not brown
  const hatch = `h${uid}`;
  const combClip = `c${uid}`;

  // head position along a strip [x0, x1] for a linear sweep [start, dur]
  const headX = (x0: number, x1: number, sw: readonly [number, number]) => x0 + (x1 - x0) * ramp(frame, sw[0], sw[1], LIN);
  // frame at which a linear sweep reaches x
  const reachAt = (x0: number, x1: number, sw: readonly [number, number], x: number) => sw[0] + ((x - x0) / (x1 - x0)) * sw[1];
  const headO = (sw: readonly [number, number]) => fade(frame, sw[0], sw[0] + sw[1], 4, 6);

  const cleared = 1 - ramp(frame, EV.clear[0], EV.clear[1], EASE_FADE); // the 5-cell marks, replaced by the comb
  const reink = 1 - ramp(frame, EV.reinkOff, 14, EASE_FADE);
  const qBlue = ramp(frame, EV.qUnder[0], EV.qUnder[1]);
  const combX = headX(G.X0, G.X1, EV.comb);

  const Head: React.FC<{x: number; y: number; h: number; o: number}> = ({x, y, h, o}) =>
    o <= 0 ? null : <line x1={x} y1={y - 10} x2={x} y2={y + h + 10} stroke={T.blue} strokeWidth={STROKE.thick} strokeLinecap="round" opacity={o} />;

  const charX = (i: number) => G.Q.x + i * TS * MONO_EM;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        <defs>
          <pattern id={hatch} width={12} height={12} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={12} stroke={T.red} strokeWidth={dark ? 3.6 : 3} />
          </pattern>
          <clipPath id={combClip}>
            <rect x={G.X0} y={0} width={Math.max(0, combX - G.X0)} height={G.H} />
          </clipPath>
        </defs>

        {/* ===== static figure (frame 0) ===== */}
        <Write x={G.Q.x} y={G.Q.y} text={QUERY} size={TS} variant="mono" />
        <Write x={G.TABLE.x} y={G.TABLE.y} text="stock_ticks" size={TS} variant="mono" color="ink2" anchor={G.TABLE.anchor} />
        {/* the query's two columns, underlined blue at B1 */}
        {[
          [11, 16],
          [24, 26],
        ].map(([a, b], i) => (
          <line key={i} x1={charX(a)} y1={G.Q.y + 10} x2={charX(a) + (charX(b) - charX(a)) * qBlue} y2={G.Q.y + 10} stroke={T.blue} strokeWidth={STROKE.ink} strokeLinecap="round" opacity={qBlue > 0 ? 1 : 0} />
        ))}

        <Write x={G.ROW_TITLE.x} y={G.ROW_TITLE.y} text="row store" size={TS} weight={620} />
        {/* header: five names, removed at B4 for "price · 100 columns · ts" */}
        {COLS.map((c, i) => (
          <g key={c} opacity={cleared}>
            <Write x={G.cells[i].x + G.cells[i].w / 2} y={G.HEADER_Y} text={c} size={TS} variant="mono" color="ink2" anchor="middle" />
            {USED[i] ? <Write x={G.cells[i].x + G.cells[i].w / 2} y={G.HEADER_Y} text={c} size={TS} variant="mono" color="blue" anchor="middle" opacity={qBlue} weight={560} /> : null}
          </g>
        ))}
        {G.strips.map((s, r) => (
          <Write key={r} x={G.RLBL.x} y={s.y + G.SH / 2 + TS * 0.35} text={`R${r + 1}`} size={TS} variant="mono" color="ink2" anchor={G.RLBL.anchor} />
        ))}
        <Write x={G.X10K.x} y={G.X10K.y} text="× 10,000" size={TS} variant="mono" color="ink2" anchor={G.X10K.anchor} />

        {/* B1: per-cell read marks (under the ink) */}
        {G.strips.map((s, r) =>
          G.cells.map((c, i) => {
            const sw = EV.sweep[r];
            const o = ramp(frame, reachAt(G.X0, G.X1, sw, c.x + 4), 6, EASE_FADE) * cleared;
            if (o <= 0) return null;
            return USED[i] ? (
              <rect key={`${r}-${i}`} x={c.x + 2} y={s.y + 2} width={c.w - 4} height={G.SH - 4} fill={T.blue} opacity={0.3 * o} />
            ) : (
              <rect key={`${r}-${i}`} x={c.x + 2} y={s.y + 2} width={c.w - 4} height={G.SH - 4} fill={`url(#${hatch})`} opacity={(dark ? 0.9 : 0.62) * o} />
            );
          }),
        )}
        {/* B4: the 100-column comb, revealed behind the head */}
        <g clipPath={`url(#${combClip})`}>
          {G.strips.map((s, r) => (
            <g key={r}>
              <rect x={G.X0 + 2} y={s.y + 2} width={G.X1 - G.X0 - 4} height={G.SH - 4} fill={T.red} opacity={dark ? 0.24 : 0.14} />
              <path d={G.combD[r]} stroke={T.red} strokeWidth={dark ? 2 : 1.6} fill="none" opacity={dark ? 1 : 0.85} />
              {WIDE_USED.map((k) => (
                <rect key={k} x={G.X0 + k * G.CW - 1} y={s.y - 5} width={G.CW + 2} height={G.SH + 10} rx={2} fill={T.blue} />
              ))}
            </g>
          ))}
        </g>

        {/* strips: outline + 5-cell dividers */}
        {G.strips.map((s, r) => (
          <g key={r}>
            <Ink d={s.outline} />
            {s.dividers.map((d, i) => (
              <Ink key={i} d={d} opacity={cleared} />
            ))}
          </g>
        ))}

        {/* B1: the read head, row by row */}
        {G.strips.map((s, r) => (
          <Head key={r} x={headX(G.X0, G.X1, EV.sweep[r])} y={s.y} h={G.SH} o={headO(EV.sweep[r])} />
        ))}
        <Write x={G.COUNTER.x} y={G.COUNTER.y} text="reads 5, uses 2" size={TS} variant="mono" progress={ramp(frame, ...EV.counter1)} opacity={1 - ramp(frame, EV.counter2[0], 8, EASE_FADE)} />

        {/* B2: slowed replay on R3, each cell re-inked as the head passes it, to the row boundary */}
        {G.cells.map((c, i) => {
          const s = G.strips[2];
          const o = ramp(frame, reachAt(G.X0, G.X1, EV.slow, c.x + 6), 8, EASE_FADE) * reink;
          if (o <= 0) return null;
          return <rect key={i} x={c.x + 4} y={s.y + 4} width={c.w - 8} height={G.SH - 8} fill="none" stroke={USED[i] ? T.blue : T.red} strokeWidth={STROKE.ink + 1} rx={3} opacity={o} />;
        })}
        <Head x={headX(G.X0, G.X1, EV.slow)} y={G.SY[2]} h={G.SH} o={headO(EV.slow)} />
        <line x1={G.X1} y1={G.SY[2] - 6} x2={G.X1} y2={G.SY[2] + G.SH + (G.ph ? 20 : 24)} stroke={T.ink} strokeWidth={STROKE.thick} strokeLinecap="round" opacity={ramp(frame, ...EV.tick, EASE_FADE)} />
        <Write x={G.X1} y={G.BOUND_Y} text="row boundary" size={TS} anchor="end" progress={ramp(frame, ...EV.boundaryLbl)} />

        {/* ===== column store ===== */}
        <Write x={G.COL_TITLE.x} y={G.COL_TITLE.y} text="column store" size={TS} weight={620} />
        <Write x={G.NAIVE.x} y={G.NAIVE.y} text="(naive)" size={TS} color="ink2" />
        {G.files.map((f, i) => {
          const k = COLS[i] === 'price' ? 0 : COLS[i] === 'ts' ? 1 : null;
          const sw = k === null ? null : EV.fileRead[k];
          const lbl = k === null ? null : EV.fileLbl[k];
          return (
            <g key={i}>
              <Write x={f.cx} y={f.lblY} text={COLS[i]} size={TS} variant="mono" color="ink2" anchor="middle" />
              {sw ? <Write x={f.cx} y={f.lblY} text={COLS[i]} size={TS} variant="mono" color="blue" anchor="middle" weight={560} opacity={ramp(frame, sw[0], 10, EASE_FADE)} /> : null}
              {sw
                ? [0, 1, 2].map((c) => {
                    const cx = f.x + (G.FW / 3) * c;
                    const o = ramp(frame, reachAt(f.x, f.x + G.FW, sw, cx + 4), 6, EASE_FADE);
                    return o > 0 ? <rect key={c} x={cx + 2} y={f.y + 2} width={G.FW / 3 - 4} height={G.FH - 4} fill={T.blue} opacity={0.3 * o} /> : null;
                  })
                : null}
              <Ink d={f.outline} />
              {f.dividers.map((d, j) => (
                <Ink key={j} d={d} />
              ))}
              {sw && lbl ? (
                <>
                  <Ink d={f.outline} color="blue" opacity={ramp(frame, sw[0] + sw[1] - 4, 8, EASE_FADE)} />
                  <Head x={headX(f.x, f.x + G.FW, sw)} y={f.y} h={G.FH} o={headO(sw)} />
                  <Write x={f.cx} y={f.underY} text="read" size={TS} color="blue" anchor="middle" weight={600} progress={ramp(frame, lbl[0], lbl[1])} />
                </>
              ) : (
                <Write x={f.cx} y={f.underY} text="no IO" size={TS} color="ink2" anchor="middle" progress={ramp(frame, ...EV.noIO)} />
              )}
            </g>
          );
        })}
        <Write x={G.FILES_READ.x} y={G.FILES_READ.y} text="2 files read" size={TS} anchor={G.FILES_READ.anchor} weight={600} progress={ramp(frame, ...EV.files)} />

        {/* ===== B4: 100 columns ===== */}
        <Head x={combX} y={G.SY[0]} h={G.SY[2] + G.SH - G.SY[0]} o={headO(EV.comb)} />
        <Write x={G.X0 + G.CW * 1.5} y={G.HEADER_Y} text="price" size={TS} variant="mono" color="blue" anchor="middle" weight={560} progress={ramp(frame, ...EV.header2)} />
        <Write x={(G.X0 + G.X1) / 2} y={G.HEADER_Y} text="100 columns" size={TS} variant="mono" anchor="middle" progress={ramp(frame, ...EV.header2)} />
        <Write x={G.X0 + G.CW * 99.5} y={G.HEADER_Y} text="ts" size={TS} variant="mono" color="blue" anchor="middle" weight={560} progress={ramp(frame, ...EV.header2)} />
        <Write x={G.COUNTER.x} y={G.COUNTER.y} text="reads 100, uses 2" size={TS} variant="mono" progress={ramp(frame, EV.counter2[0] + 6, EV.counter2[1])} />
        <Write x={G.DISCARD.x} y={G.DISCARD.y} text="discarding 98 of them" size={TS} color="red" weight={600} progress={ramp(frame, ...EV.discard)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default ColumnScan;

// Clip l10-scan-vs-index — "Half a terabyte, or one line".
// Storyboard: lectures/lec10/animations/l10-scan-vs-index/storyboard.{yaml,md}.
// Ledger: L-0042, L-0043, L-0044, L-0047, L-0048, L-0050, L-0051, L-0063.
// Frame 0 = Fig 2·b without its pointer arrows (index.dict ghosted while the scan goes first); the last frame is the
// annotated poster. Two layouts share one timeline: 'wide' (1200×800, counters in a right-hand column) and
// 'phone' (720×960, the counters move into a block under the two files).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE, PAST} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META} from './timeline';

export type ScanVsIndexProps = {theme: ThemeName; layout?: Layout};

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


type FileBox = {x: number; top: number; w: number; rowH: number; n: number};
const BALL_DATA = 5; // ball's row in data.dict: about halfway down (illustrative, the file is unsorted)
const BALL_IDX = 3; // ball's row in index.dict
const DATA_ROWS: (string | 'text' | 'dots' | null)[] = ['apple,a fruit', 'amazon,…', 'text', 'text', 'text', 'ball,…', null, 'text', 'text', 'text', 'dots'];
const IDX_ROWS: (string | 'dots')[] = ['apple, 0', 'amazon, 14', 'dots', 'ball, …', 'dots'];
// word-like strokes for the unlabelled text rows: [start, end] as fractions of the row's text width
const TEXT_STROKES: Record<number, [number, number][]> = {
  2: [[0, 0.24], [0.3, 0.78]],
  3: [[0, 0.34], [0.4, 0.62]],
  4: [[0, 0.2], [0.26, 0.88]],
  7: [[0, 0.3], [0.36, 0.7]],
  8: [[0, 0.26], [0.32, 0.84]],
  9: [[0, 0.36], [0.42, 0.66]],
};

const rectPath = (x: number, y: number, w: number, h: number, seed: string) =>
  handPoly(
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ],
    seed,
  ) + ' Z';

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const DAT: FileBox = ph ? {x: 300, top: 64, w: 356, rowH: 40, n: 11} : {x: 420, top: 76, w: 380, rowH: 48, n: 11};
  // index rows line up with data rows so ball's pointer is one short horizontal arrow
  const IDX: FileBox = ph
    ? {x: 30, top: DAT.top + (BALL_DATA - BALL_IDX) * DAT.rowH, w: 220, rowH: 40, n: 5}
    : {x: 40, top: DAT.top + (BALL_DATA - BALL_IDX) * DAT.rowH, w: 290, rowH: 48, n: 5};
  const rowY = (f: FileBox, i: number) => f.top + i * f.rowH;
  const bottom = (f: FileBox) => rowY(f, f.n);
  const pad = ph ? 18 : 20;
  const ballMid = rowY(DAT, BALL_DATA) + DAT.rowH / 2;
  const ptrPts: Pt[] = [
    [IDX.x + IDX.w + 8, ballMid],
    [DAT.x - 8, ballMid],
  ];
  const BAR_X = ph ? [674, 692] : [822, 844];
  return {
    ph,
    W,
    H,
    TY,
    DAT,
    IDX,
    rowY,
    pad,
    dataD: rectPath(DAT.x, DAT.top, DAT.w, bottom(DAT) - DAT.top, 'data'),
    dataRules: Array.from({length: DAT.n - 1}, (_, i) => handLine([DAT.x, rowY(DAT, i + 1)], [DAT.x + DAT.w, rowY(DAT, i + 1)], `dr${i}`)),
    idxD: rectPath(IDX.x, IDX.top, IDX.w, bottom(IDX) - IDX.top, 'index'),
    idxRules: Array.from({length: IDX.n - 1}, (_, i) => handLine([IDX.x, rowY(IDX, i + 1)], [IDX.x + IDX.w, rowY(IDX, i + 1)], `ir${i}`)),
    textStrokes: Object.entries(TEXT_STROKES).flatMap(([row, segs]) =>
      segs.map(([a, b], k) => {
        const x0 = DAT.x + pad;
        const tw = DAT.w - pad * 2;
        const y = rowY(DAT, Number(row)) + DAT.rowH * 0.56;
        return handLine([x0 + tw * a, y], [x0 + tw * b, y], `ts${row}-${k}`);
      }),
    ),
    ballRowD: serverBox(DAT.x + 5, rowY(DAT, BALL_DATA) + 5, DAT.w - 10, DAT.rowH - 10, 'ballrow'),
    ptrD: handPoly(ptrPts, 'ptr'),
    ptrHead: chevron(ptrPts[1], 1, 0, ph ? 13 : 16, 'ptrh'),
    // the dashed worst case: from ball's row to the bottom of the file, beside request 1's bar
    worstD: handLine([BAR_X[0], rowY(DAT, BALL_DATA + 1) + 10], [BAR_X[0], bottom(DAT)], 'worst'),
    worstTick: handLine([BAR_X[0] - 12, bottom(DAT)], [BAR_X[0] + 12, bottom(DAT)], 'worstt'),
    BAR_X,
    IDX_BAR_X: ph ? 15 : 22,
    caret: {x: DAT.x + 20, y: rowY(DAT, BALL_DATA + 1) + 6},
    offsetLbl: {x: DAT.x + (ph ? 40 : 46), y: rowY(DAT, BALL_DATA + 1) + DAT.rowH * 0.74},
    names: ph
      ? {data: {x: DAT.x, y: DAT.top - 16}, idx: {x: IDX.x, y: IDX.top - 16}}
      : {data: {x: DAT.x, y: DAT.top - 20}, idx: {x: IDX.x, y: IDX.top - 20}},
    // labels under the index (the index's own cost)
    under: ph ? {x: IDX.x, keys: 390, only: 428, one: 480} : {x: IDX.x, keys: 464, only: 508, one: 572},
    // the scan's counters
    CTR: ph
      ? {head: {x: 30, y: 588}, req: [{x: 30, y: 640}, {x: 30, y: 694}], num: [{x: 300, y: 642}, {x: 300, y: 696}], per: {x: 300, y: 748}, worst: {x: 692, y: 550, anchor: 'end' as const}}
      : {head: {x: 872, y: 122}, req: [{x: 872, y: 188}, {x: 872, y: 322}], num: [{x: 872, y: 248}, {x: 872, y: 382}], per: {x: 872, y: 446}, worst: {x: 872, y: 600, anchor: 'start' as const}},
    NUM_SIZE: ph ? 40 : 52,
    MARK: ph ? 9 : 11,
    HEAD: ph ? 11 : 14,
    CAPTION_TOP: ph ? 784 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

// ---------- the scan: cursor row (continuous) and bytes read ----------
const HALF_TB = 5e11;
/** Bytes read once the cursor has read row `ci` of data.dict (apple's line is 14 bytes, amazon's ends at byte 34). */
const bytesAt = (ci: number) => (ci < 1 ? 14 : ci >= BALL_DATA ? HALF_TB : 34 + (HALF_TB - 34) * ((ci - 1) / (BALL_DATA - 1)));
const fmtBytes = (b: number) => {
  if (b >= HALF_TB) return '≈ 500 GB';
  if (b < 1e3) return `${Math.round(b)} B`;
  if (b < 1e6) return `${Math.round(b / 1e3)} KB`;
  if (b < 1e9) return `${Math.round(b / 1e6)} MB`;
  return `${Math.round(b / 1e9)} GB`;
};
const scan1 = (frame: number) => {
  if (frame < EV.row1At - EV.rowMove) return 0;
  if (frame < EV.run1[0]) return ramp(frame, EV.row1At - EV.rowMove, EV.rowMove, EASE_MOVE);
  return 1 + (BALL_DATA - 1) * ramp(frame, EV.run1[0], EV.run1[1], EASE_MOVE);
};
const scan2 = (frame: number) => BALL_DATA * ramp(frame, EV.run2[0], EV.run2[1], EASE_MOVE);
const idxScan = (frame: number) => {
  let ci = 0;
  EV.idxStops.forEach((at, k) => {
    if (frame >= at - EV.rowMove) ci = k + ramp(frame, at - EV.rowMove, EV.rowMove, EASE_MOVE);
  });
  return ci;
};

export const ScanVsIndex: React.FC<ScanVsIndexProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const C = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const {DAT, IDX, CTR} = G;

  // ----- opacities -----
  const g1 = ghost(frame, EV.ghost1); // request 1's overlays
  const gS = ghost(frame, EV.ghostScan); // the whole scan
  const back = ramp(frame, EV.unghost, 12, EASE_FADE); // the counters return for the poster
  const restore = (o: number) => o + (1 - o) * back;
  // the counters' lettering ghosts only to 55%: red at 38% on the blackboard sheet is illegible (review round 1)
  const TEXT_PAST = 0.55;
  const t1 = 1 - (1 - TEXT_PAST) * ramp(frame, EV.ghost1, 12, EASE_FADE);
  const tS = 1 - (1 - TEXT_PAST) * ramp(frame, EV.ghostScan, 12, EASE_FADE);
  const idxO = PAST + (1 - PAST) * ramp(frame, ...EV.idxIn, EASE_FADE);

  // ----- the two scans -----
  const c1 = scan1(frame);
  const c2 = scan2(frame);
  const cur1O = fade(frame, EV.cursor1In, EV.ball1, 8, 10);
  const cur2O = fade(frame, EV.cursor2In, EV.ball2, 8, 10);
  const barEnd = (ci: number) => G.rowY(DAT, Math.min(ci, BALL_DATA)) + DAT.rowH;
  const n1 = frame >= EV.cursor1In ? bytesAt(c1) : 0;
  const n2 = frame >= EV.run2[0] ? bytesAt(c2) : 14;
  const ballO = frame < EV.ball2 ? g1 : Math.max(PAST, fade(frame, EV.ball2, Infinity, 8)) * gS;

  // ----- the index -----
  const ci = idxScan(frame);
  const idxCurO = fade(frame, EV.idxCursorIn, Infinity, 8);
  const ptrP = ramp(frame, ...EV.pointer, EASE_MOVE);

  const cursorRect = (f: FileBox, row: number, o: number, key: string) =>
    o <= 0 ? null : (
      <rect key={key} x={f.x + 5} y={G.rowY(f, row) + 5} width={f.w - 10} height={f.rowH - 10} rx={6} fill="none" stroke={C.blue} strokeWidth={STROKE.ink + 0.8} opacity={o} />
    );
  const cursorWash = (f: FileBox, row: number, o: number, key: string) =>
    o <= 0 ? null : <rect key={key} x={f.x + 5} y={G.rowY(f, row) + 5} width={f.w - 10} height={f.rowH - 10} rx={6} fill={C.blueWash} opacity={o} />;
  const bar = (x: number, y1: number, o: number, seed: string) =>
    o <= 0 || y1 <= DAT.top + 4 ? null : (
      <g opacity={o}>
        <Ink d={handLine([x, DAT.top + 4], [x, y1], seed)} color="blue" width={STROKE.ink + 1} />
        <Ink d={chevron([x, y1], 0, 1, G.HEAD, seed + 'h')} color="blue" width={STROKE.ink + 1} />
      </g>
    );
  const dots = (f: FileBox, row: number, color: string, o = 1) =>
    [0.28, 0.5, 0.72].map((k) => <circle key={k} cx={f.x + G.pad + 4} cy={G.rowY(f, row) + f.rowH * k} r={G.ph ? 2.6 : 3.2} fill={color} opacity={o} />);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== cursor washes sit under the files' lines and lettering ===== */}
        {cursorWash(DAT, c1, cur1O, 'w1')}
        {cursorWash(DAT, c2, cur2O, 'w2')}
        {cursorWash(IDX, ci, idxCurO, 'wi')}

        {/* ===== static figure: data.dict ===== */}
        <Write x={G.names.data.x} y={G.names.data.y} text="data.dict" size={G.TY.mono} variant="mono" />
        <Ink d={G.dataD} />
        {G.dataRules.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
        ))}
        {G.textStrokes.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin + 0.6} color="ink3" />
        ))}
        {DATA_ROWS.map((r, i) =>
          r && r !== 'text' && r !== 'dots' ? (
            <Write key={i} x={DAT.x + G.pad} y={G.rowY(DAT, i) + DAT.rowH * 0.74} text={r} size={G.TY.mono} variant="mono" />
          ) : null,
        )}
        {dots(DAT, DAT.n - 1, C.ink2)}
        <Write x={DAT.x + DAT.w - G.pad} y={G.rowY(DAT, DAT.n - 1) + DAT.rowH * 0.74} text="1 TB" size={G.TY.mono} variant="mono" anchor="end" />

        {/* ===== static figure: index.dict (ghosted until the index's turn) ===== */}
        <g opacity={idxO}>
          <Write x={G.names.idx.x} y={G.names.idx.y} text="index.dict" size={G.TY.mono} variant="mono" />
          <Ink d={G.idxD} fill="none" />
          {G.idxRules.map((d, i) => (
            <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
          ))}
          {IDX_ROWS.map((r, i) =>
            r === 'dots' ? (
              <g key={i}>{dots(IDX, i, C.ink2)}</g>
            ) : (
              <Write key={i} x={IDX.x + G.pad} y={G.rowY(IDX, i) + IDX.rowH * 0.74} text={r} size={G.TY.mono} variant="mono" />
            ),
          )}
        </g>

        {/* ===== B1: request 1 scans line by line to ball ===== */}
        <g opacity={Math.min(g1, gS)}>{bar(G.BAR_X[0], barEnd(c1), frame >= EV.cursor1In ? 1 : 0, 'bar1')}</g>
        {cursorRect(DAT, c1, cur1O, 'c1')}
        {/* ball reached: green outline + tick (request 1, again for request 2) */}
        <g opacity={ballO}>
          <Pen d={G.ballRowD} progress={ramp(frame, EV.ball1 - 2, 10)} color="green" />
          <Tick x={DAT.x + DAT.w - (G.ph ? 30 : 36)} y={G.rowY(DAT, BALL_DATA) + DAT.rowH / 2} color={C.green} o={fade(frame, EV.ball1, Infinity, 8)} s={G.MARK} />
        </g>
        {/* the worst case: the rest of the file, dashed */}
        <g opacity={restore(tS)}>
          <Pen d={G.worstD} progress={ramp(frame, ...EV.worstExt)} color="ink2" width={STROKE.ink} dash="12 10" />
          <Ink d={G.worstTick} color="ink2" opacity={fade(frame, EV.worstExt[0] + EV.worstExt[1] - 4, Infinity, 6)} />
          <Write x={CTR.worst.x} y={CTR.worst.y} text="worst: 1 TB" size={TS} color="ink" anchor={CTR.worst.anchor} progress={ramp(frame, ...EV.worstLbl)} />
        </g>

        {/* ===== B2: request 2 reads it all again ===== */}
        <g opacity={gS}>{bar(G.BAR_X[1], barEnd(c2), frame >= EV.run2[0] ? 1 : 0, 'bar2')}</g>
        {cursorRect(DAT, c2, cur2O, 'c2')}

        {/* ===== the scan's counters ===== */}
        <Write x={CTR.head.x} y={CTR.head.y} text="bytes read" size={TS} color="ink2" />
        <g opacity={restore(Math.min(t1, tS))}>
          <Write x={CTR.req[0].x} y={CTR.req[0].y} text="request 1" size={TS} color="ink" progress={ramp(frame, ...EV.req1Lbl)} />
          {frame >= EV.cursor1In ? (
            <Write x={CTR.num[0].x} y={CTR.num[0].y} text={fmtBytes(n1)} size={G.NUM_SIZE} variant="mono" color={n1 >= HALF_TB ? 'red' : 'ink'} weight={600} />
          ) : null}
        </g>
        <g opacity={restore(tS)}>
          <Write x={CTR.req[1].x} y={CTR.req[1].y} text="request 2" size={TS} color="ink" progress={ramp(frame, ...EV.req2Lbl)} />
          {frame >= EV.cursor2In ? (
            <Write x={CTR.num[1].x} y={CTR.num[1].y} text={fmtBytes(n2)} size={G.NUM_SIZE} variant="mono" color={n2 >= HALF_TB ? 'red' : 'ink'} weight={600} opacity={fade(frame, EV.cursor2In, Infinity, 6)} />
          ) : null}
        </g>
        <Write x={CTR.per.x} y={CTR.per.y} text="per request" size={TS} color="red" weight={600} progress={ramp(frame, ...EV.perReq)} />

        {/* ===== B3: the index, scanned line by line to ball ===== */}
        {idxCurO > 0 ? (
          <g opacity={idxCurO}>
            <Ink d={handLine([G.IDX_BAR_X, IDX.top + 4], [G.IDX_BAR_X, G.rowY(IDX, ci) + IDX.rowH], 'ibar')} color="blue" width={STROKE.ink + 1} />
            <Ink d={chevron([G.IDX_BAR_X, G.rowY(IDX, ci) + IDX.rowH], 0, 1, G.HEAD, 'ibarh')} color="blue" width={STROKE.ink + 1} />
          </g>
        ) : null}
        {cursorRect(IDX, ci, idxCurO, 'ci')}
        <Write x={G.under.x} y={G.under.keys} text="keys + offsets" size={TS} color="ink2" progress={ramp(frame, ...EV.keysLbl)} />
        <Write x={G.under.x} y={G.under.only} text="only" size={TS} color="ink2" progress={ramp(frame, ...EV.onlyLbl)} />

        {/* ===== B4: one pointed read at ball's byte offset ===== */}
        <Pen d={G.ptrD} progress={ptrP} color="blue" width={STROKE.ink + 1} head={G.ptrHead} />
        <Packet d={G.ptrD} progress={ptrP} color="blue" r={G.ph ? 8 : 10} />
        <Caret x={G.caret.x} y={G.caret.y} color={C.ink} o={fade(frame, EV.caret, Infinity, 8)} s={G.ph ? 9 : 11} />
        <Write x={G.offsetLbl.x} y={G.offsetLbl.y} text="byte offset" size={TS} progress={ramp(frame, ...EV.offsetLbl)} />
        <Pen d={G.ballRowD} progress={ramp(frame, ...EV.rowGreen)} color="green" width={STROKE.ink + 0.6} />
        <Tick x={DAT.x + DAT.w - (G.ph ? 30 : 36)} y={G.rowY(DAT, BALL_DATA) + DAT.rowH / 2} color={C.green} o={fade(frame, EV.rowGreen[0] + 6, Infinity, 8)} s={G.MARK} />
        <Write x={G.under.x} y={G.under.one} text="+ one line" size={TS} color="green" weight={600} progress={ramp(frame, ...EV.oneLine)} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const Tick: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 11}) => {
  if (o <= 0) return null;
  const k = s / 11;
  return (
    <path
      d={`M ${x - 12 * k} ${y + 1 * k} L ${x - 3 * k} ${y + 10 * k} L ${x + 13 * k} ${y - 11 * k}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink + 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );
};

/** OffsetCaret: an open ^ just under the start of a row, pointing up at the byte where the line starts. */
const Caret: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 11}) =>
  o <= 0 ? null : (
    <path
      d={`M ${x - s} ${y + s * 1.4} L ${x} ${y} L ${x + s} ${y + s * 1.4}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );

export default ScanVsIndex;

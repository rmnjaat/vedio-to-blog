// Clip l10-append-only-log — "One file, one map".
// Storyboard: lectures/lec10/animations/l10-append-only-log/storyboard.{yaml,md}.
// Ledger: L-0211, L-0213, L-0216, L-0217, L-0221, L-0222, L-0223, L-0224, L-0226.
// Frame 0 = Fig 7·b's layout before any write (ops list | empty in-mem map | empty append-only file with its write
// slot); the last frame is the annotated poster. Two layouts share one timeline: 'wide' (1200×800: ops left, map
// middle, file right, as on the board) and 'phone' (720×960: the ops list in two columns on top, the file left and
// the map right below it, pointers running right → left).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, endDir, handLine, handPoly, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useTheme} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META} from './timeline';

export type AppendOnlyLogProps = {theme: ThemeName; layout?: Layout};

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


type Span = readonly [number, number];

const OPS = ['PUT K1 V1', 'PUT K2 V2', 'PUT K3 V3', 'PUT K1 V1′', 'DEL K2', 'GET K1', 'GET K2'];
/** file rows in append order: [entry, offset] */
const ROWS: [string, string][] = [
  ['K1 V1', 'O1'],
  ['K2 V2', 'O2'],
  ['K3 V3', 'O3'],
  ['K1 V1′', 'O4'],
  ['K2 −1', 'O5'],
];
/** map rows: key and the offset it first points at */
const MAP = [
  ['K1', 'O1'],
  ['K2', 'O2'],
  ['K3', 'O3'],
];
const MONO_EM = 0.6; // Recursive MONO advance
// Offsets are set in the upright casual face: in mono, "O1" reads as "01".
const OFF_W = 560;

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const TY = typeFor(layout);
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const top = ph ? 282 : 88;
  const rowH = ph ? 54 : 60;
  const rowY = (i: number) => top + i * rowH;
  const mid = (i: number) => rowY(i) + rowH / 2;
  const textY = (i: number) => mid(i) + TY.mono * 0.34;
  // file: offset cell on the side that faces the map (pointers land on the offset)
  const file = ph ? {x: 20, w: 340, cell: 290, cellW: 70, text: 36} : {x: 720, w: 250, cell: 790, cellW: 70, text: 806};
  const offX = ph ? file.cell + file.cellW / 2 : file.x + file.cellW / 2;
  const map = ph ? {x: 470, w: 230} : {x: 360, w: 220};
  const mapText = map.x + (ph ? 16 : 20);
  // pointers: from the map's edge facing the file to the file's edge facing the map
  const srcX = ph ? map.x : map.x + map.w;
  const dstX = ph ? file.x + file.w + 3 : file.x - 3;
  const jogX = ph ? 420 : 684; // K1's repointed route turns down here (between map and file)
  const ptr = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, ph ? 13 : 15, seed + 'h'), src: pts[0]};
  };
  const opPos: Pt[] = ph
    ? [
        [40, 60],
        [40, 104],
        [40, 148],
        [40, 192],
        [386, 60],
        [386, 148],
        [386, 192],
      ]
    : [
        [40, 116],
        [40, 168],
        [40, 220],
        [40, 272],
        [40, 324],
        [40, 424],
        [40, 476],
      ];
  const fileRow = (i: number, seed: string) => {
    const x0 = file.x;
    const x1 = file.x + file.w;
    const y0 = rowY(i);
    const y1 = rowY(i + 1);
    // the first row carries the top edge; later rows hang off the row above (no doubled strokes)
    const pts: Pt[] = i === 0 ? [[x1, y0], [x0, y0], [x0, y1], [x1, y1], [x1, y0]] : [[x0, y0], [x0, y1], [x1, y1], [x1, y0]];
    return {outline: handPoly(pts, seed), cell: handLine([file.cell, y0], [file.cell, y1], seed + 'c')};
  };
  const rect = (x: number, y: number, w: number, h: number, seed: string) =>
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
  return {
    ph,
    W,
    H,
    TY,
    rowH,
    rowY,
    mid,
    textY,
    file,
    offX,
    map,
    mapText,
    mapOffX: mapText + 5 * MONO_EM * TY.mono, // "K1 → " is five mono cells
    opPos,
    eq: ph ? ([402, 104] as Pt) : ([64, 368] as Pt),
    resX: ph ? 512 : 214,
    caret: chevron([0, 0], 1, 0, ph ? 12 : 15, 'caret'),
    caretDx: ph ? -10 : -14,
    rows: ROWS.map((_, i) => fileRow(i, `row${i}`)),
    slots: [0, 1, 2, 3, 4, 5].map((i) => rect(file.x, rowY(i), file.w, rowH, `slot${i}`)),
    mapD: rect(map.x, top, map.w, 3 * rowH, 'map'),
    mapRules: [1, 2].map((i) => handLine([map.x, rowY(i)], [map.x + map.w, rowY(i)], `mr${i}`)),
    ptrs: [0, 1, 2].map((i) => ptr([[srcX, mid(i)], [dstX, mid(i)]], `p${i}`)),
    k1New: ptr(
      [
        [srcX, mid(0)],
        [jogX, mid(0)],
        [jogX, mid(3)],
        [dstX, mid(3)],
      ],
      'p1new',
    ),
    head: {file: [file.x, top - 20] as Pt, map: [map.x, top - 20] as Pt},
    obsolete: ph ? ([150, textY(0)] as Pt) : ([file.x + file.w + 16, textY(0)] as Pt),
    noK2: ph ? ([map.x, rowY(3) + 42] as Pt) : ([map.x, rowY(3) + 48] as Pt),
    rule: ph
      ? [
          {x: 20, y: 680, t: 'writes only at the end ·'},
          {x: 20, y: 722, t: 'reads anywhere'},
        ]
      : [{x: 40, y: 562, t: 'writes only at the end · reads anywhere'}],
    o1: ph ? ([20, 784] as Pt) : ([40, 614] as Pt),
    mark: ph ? 9 : 11,
    CAPTION_TOP: ph ? 820 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Continuous index after the given moves (moves only go forward). */
const pos = (frame: number, moves: readonly Span[]) => moves.reduce((p, [at, dur]) => p + ramp(frame, at, dur, EASE_MOVE), 0);

export const AppendOnlyLog: React.FC<AppendOnlyLogProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const C = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const {TY, file, map} = G;
  const TM = TY.mono;
  const TS = TY.label;

  // ---- op caret: steps down the list, one op at a time ----
  const caretMoves: Span[] = [EV.appends[1].caret, EV.appends[2].caret, EV.appends[3].caret, EV.appends[4].caret, EV.get1Caret, EV.get2Caret];
  const cPos = pos(frame, caretMoves);
  const ci = Math.min(Math.floor(cPos), G.opPos.length - 2);
  const cf = cPos - ci;
  const cA = G.opPos[ci];
  const cB = G.opPos[ci + 1];
  const caretX = cA[0] + (cB[0] - cA[0]) * cf + G.caretDx;
  const caretY = cA[1] + (cB[1] - cA[1]) * cf - TM * 0.34;
  const caretO = fade(frame, EV.caretIn[0], EV.caretOut[0], EV.caretIn[1], EV.caretOut[1]);
  // an op dims to 55% when the caret leaves it (38% text is illegible on the blackboard)
  const PAST = 0.55;
  const opO = (i: number) => (i < caretMoves.length ? 1 - (1 - PAST) * ramp(frame, caretMoves[i][0], 12, EASE_FADE) : 1);
  const opProgress = (i: number) => (i === 5 ? ramp(frame, ...EV.get1Text) : i === 6 ? ramp(frame, ...EV.get2Text) : 1);

  // ---- write slot: the dashed row at the tail. It becomes the row, and a new slot appears below. ----
  const appended = EV.appends.filter((a) => frame >= a.text[0] + a.text[1]).length;
  const slotO = (() => {
    const a = EV.appends.find((x) => frame >= x.row[0] && frame < x.slot[0] + x.slot[1]);
    if (!a) return 1;
    if (frame < a.slot[0]) return 1 - ramp(frame, a.row[0], 6, EASE_FADE);
    return ramp(frame, a.slot[0], a.slot[1], EASE_FADE);
  })();

  // ---- obsolete rows ghost (row text only; the outline stays: the bytes are still on disk) ----
  const STALE = 0.45;
  const rowTextO = (i: number) =>
    i === 0 ? 1 - (1 - STALE) * ramp(frame, ...EV.obsolete1, EASE_FADE) : i === 1 ? 1 - (1 - STALE) * ramp(frame, ...EV.obsolete2, EASE_FADE) : 1;

  // ---- map ----
  const k1OldO = 1 - ramp(frame, ...EV.k1OldOut, EASE_FADE);
  const k2O = 1 - ramp(frame, ...EV.k2Out, EASE_FADE);
  const mapRowO = (i: number) => (i === 1 ? k2O : 1);

  // ---- gets ----
  const blueBack = 1 - ramp(frame, EV.get2Caret[0], 14, EASE_FADE); // GET K1's blue returns to graphite when GET K2 starts
  const lookupO = fade(frame, EV.lookup1[0], Infinity, EV.lookup1[1]) * blueBack;
  const rowO4O = fade(frame, EV.rowO4[0], Infinity, EV.rowO4[1]) * blueBack;
  const readP = ramp(frame, ...EV.read1, EASE_MOVE);
  const missO = fade(frame, EV.miss[0], Infinity, EV.miss[1]);

  const band = (x: number, y: number, w: number, h: number, col: 'blue' | 'red', o: number, dashed = false, key = '') =>
    o <= 0 ? null : (
      <g key={key} opacity={o}>
        <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={6} fill={col === 'blue' ? C.blueWash : C.redWash} />
        <rect
          x={x + 5}
          y={y + 5}
          width={w - 10}
          height={h - 10}
          rx={6}
          fill="none"
          stroke={C[col]}
          strokeWidth={STROKE.ink}
          strokeDasharray={dashed ? '10 8' : undefined}
        />
      </g>
    );

  const k2Strike = handLine(
    [G.mapText - 6, G.mid(1)],
    [G.mapText + 7 * MONO_EM * TM + 6, G.mid(1)],
    'k2strike',
  );

  const res = (i: 5 | 6) => G.opPos[i];

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure: the empty map (its sheet fill goes under the get highlights) ===== */}
        <Ink d={G.mapD} fill={C.sheet} />
        {G.mapRules.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
        ))}

        {/* ===== get highlights sit under the lettering ===== */}
        {band(map.x, G.rowY(0), map.w, G.rowH, 'blue', lookupO, false, 'lk')}
        {band(file.x, G.rowY(3), file.w, G.rowH, 'blue', rowO4O, false, 'o4')}
        {band(map.x, G.rowY(1), map.w, G.rowH, 'red', missO, true, 'miss')}

        {/* ===== static figure: headers ===== */}
        <Write x={G.head.map[0]} y={G.head.map[1]} text="in-mem" size={TS} />
        <Write x={G.head.file[0]} y={G.head.file[1]} text="append-only file" size={TS} />

        {/* ===== static figure: the operations ===== */}
        {OPS.map((t, i) => (
          <Write key={t} x={G.opPos[i][0]} y={G.opPos[i][1]} text={t} size={TM} variant="mono" opacity={opO(i)} progress={opProgress(i)} />
        ))}
        <Write x={G.eq[0]} y={G.eq[1]} text="= PUT(K2,−1)" size={TM} variant="mono" opacity={1 - (1 - PAST) * ramp(frame, EV.get1Caret[0], 12, EASE_FADE)} progress={ramp(frame, ...EV.eq)} />

        {/* ===== the file: rows appended at the tail ===== */}
        {G.rows.map((r, i) => {
          const a = EV.appends[i];
          return (
            <g key={i}>
              <Pen d={r.outline} progress={ramp(frame, ...a.row)} />
              <Pen d={r.cell} progress={ramp(frame, a.row[0] + 4, a.row[1])} width={STROKE.thin} color="ink2" />
              <Write x={file.text} y={G.textY(i)} text={ROWS[i][0]} size={TM} variant="mono" progress={ramp(frame, ...a.text)} opacity={rowTextO(i)} />
              <Write x={G.offX} y={G.textY(i)} text={ROWS[i][1]} size={TM} variant="ui" weight={OFF_W} anchor="middle" progress={ramp(frame, ...a.text)} opacity={rowTextO(i)} />
            </g>
          );
        })}
        {slotO > 0 ? (
          <g opacity={slotO}>
            <Ink d={G.slots[appended]} color="ink2" width={STROKE.thin + 0.4} dash="10 9" />
            <Write x={file.text} y={G.textY(appended)} text="append" size={TS} color="ink2" />
          </g>
        ) : null}
        <Write x={G.obsolete[0]} y={G.obsolete[1]} text="obsolete" size={TS} color="ink2" progress={ramp(frame, ...EV.obsoleteLbl)} />

        {/* ===== map rows and pointers (written after each append) ===== */}
        {MAP.map(([k, o], i) => {
          const p = ramp(frame, ...EV.mapRow[i]);
          return (
            <g key={k} opacity={mapRowO(i)}>
              <Write x={G.mapText} y={G.textY(i)} text={`${k} →`} size={TM} variant="mono" progress={p} />
              <Write x={G.mapOffX} y={G.textY(i)} text={o} size={TM} variant="ui" weight={OFF_W} progress={p} opacity={i === 0 ? k1OldO : 1} />
              <PointerArrow ptr={G.ptrs[i]} progress={ramp(frame, ...EV.pointer[i])} opacity={i === 0 ? k1OldO : 1} />
            </g>
          );
        })}
        {/* K1 repointed: O1 → O4 */}
        <Write x={G.mapOffX} y={G.textY(0)} text="O4" size={TM} variant="ui" weight={OFF_W} progress={ramp(frame, ...EV.k1New)} />
        <PointerArrow ptr={G.k1New} progress={ramp(frame, ...EV.k1Pointer)} />
        {/* K2 deleted: struck red, then removed */}
        <Pen d={k2Strike} progress={ramp(frame, ...EV.k2Strike)} color="red" opacity={k2O} />
        <Write x={G.noK2[0]} y={G.noK2[1]} text="no K2: deleted" size={TS} color="ink2" progress={ramp(frame, ...EV.noK2)} />

        {/* ===== gets ===== */}
        <Pen d={G.k1New.d} progress={readP} color="blue" width={STROKE.ink} head={G.k1New.head} opacity={blueBack} />
        <Packet d={G.k1New.d} progress={readP} color="blue" r={G.ph ? 8 : 10} />
        <Write x={G.resX} y={res(5)[1]} text="→ V1′" size={TM} variant="mono" color="green" progress={ramp(frame, ...EV.get1Res)} />
        <Tick x={G.resX + 5 * MONO_EM * TM + (G.ph ? 20 : 26)} y={res(5)[1] - TM * 0.34} color={C.green} o={fade(frame, EV.get1Tick, Infinity, 8)} s={G.mark} />
        <Write x={G.resX} y={res(6)[1]} text="→ 404" size={TM} variant="mono" color="red" progress={ramp(frame, ...EV.get2Res)} />
        <Cross x={map.x + map.w / 2} y={G.mid(1)} color={C.red} o={missO} s={G.mark} />

        {/* ===== op caret ===== */}
        {caretO > 0 ? (
          <g opacity={caretO} transform={`translate(${caretX} ${caretY})`}>
            <Ink d={G.caret} color="blue" width={STROKE.ink + 1} />
          </g>
        ) : null}

        {/* ===== B5: the summary ===== */}
        {G.rule.map((r, i) => (
          <Write
            key={i}
            x={r.x}
            y={r.y}
            text={r.t}
            size={TS}
            progress={ramp(frame, EV.rule[0] + (i * EV.rule[1]) / G.rule.length, EV.rule[1] / G.rule.length)}
          />
        ))}
        <Write x={G.o1[0]} y={G.o1[1]} text="put · update · delete · get: O(1)" size={TM} variant="ui" weight={620} progress={ramp(frame, ...EV.o1)} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** A map entry's pointer: thin graphite line, a dot at the map end, a chevron at the file row. */
const PointerArrow: React.FC<{ptr: {d: string; head: string; src: Pt}; progress: number; opacity?: number}> = ({ptr, progress, opacity = 1}) => {
  const t = useTheme();
  if (progress <= 0 || opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <circle cx={ptr.src[0]} cy={ptr.src[1]} r={5.5} fill={t.ink} />
      <Pen d={ptr.d} progress={progress} width={STROKE.thin + 0.6} head={ptr.head} />
    </g>
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

const Cross: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 11}) => {
  if (o <= 0) return null;
  return (
    <path
      d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`}
      stroke={color}
      strokeWidth={STROKE.ink + 1}
      strokeLinecap="round"
      opacity={o}
    />
  );
};

export default AppendOnlyLog;

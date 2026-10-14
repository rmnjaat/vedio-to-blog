// Clip l10-sorted-merge — "Two pointers, one pass".
// Storyboard: lectures/lec10/animations/l10-sorted-merge/storyboard.{yaml,md}.
// Ledger: L-0140, L-0142, L-0143, L-0144, L-0145, L-0310.
// Frame 0 = Fig 5·c before the merge (the new file empty, pointers at a and c); the last frame is the annotated
// poster. Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×980, the same three columns narrower
// with taller rows, labels under them).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handLine, handPoly, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META} from './timeline';

export type SortedMergeProps = {theme: ThemeName; layout?: Layout};

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


const DICT = ['a – a′', 'b – b′', 'c – c′', 'd – d′', 'f – f′', 'g – g′', 'h – h′'];
const LOG = ['c – c″', 'e – e′', 'f – f″'];
const OUT = ['a – a′', 'b – b′', 'c – c″', 'd – d′', 'e – e′', 'f – f″', 'g – g′', 'h – h′'];
/** new-file rows that come from the changelog, and the changelog row each comes from */
const FROM_LOG: Record<number, number> = {2: 0, 4: 1, 5: 2};
/** dictionary rows whose meaning the changelog replaces (struck), in strike order */
const STRUCK = [2, 4];

type Col = {x: number; w: number};

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
  const top = ph ? 84 : 92;
  const rowH = ph ? 56 : 50;
  const D: Col = ph ? {x: 26, w: 180} : {x: 96, w: 230};
  const L: Col = ph ? {x: 270, w: 180} : {x: 450, w: 230};
  const N: Col = ph ? {x: 526, w: 180} : {x: 850, w: 230};
  const rowY = (i: number) => top + i * rowH;
  const mid = (i: number) => rowY(i) + rowH / 2;
  const pad = ph ? 14 : 22;
  const rules = (c: Col, n: number, seed: string) =>
    Array.from({length: n - 1}, (_, i) => handLine([c.x, rowY(i + 1)], [c.x + c.w, rowY(i + 1)], `${seed}${i}`));
  const connPts = (from: number, to: number): Pt[] => [
    [L.x + L.w + (ph ? 6 : 8), mid(from)],
    [N.x - (ph ? 6 : 10), mid(to)],
  ];
  const arrowX = ph ? 696 : 1060;
  const arrowPts: Pt[] = ph
    ? [
        [arrowX, rowY(8) + 6],
        [arrowX, 694],
      ]
    : [
        [arrowX, rowY(8) + 6],
        [arrowX, 566],
      ];
  return {
    ph,
    W,
    H,
    TY,
    D,
    L,
    N,
    rowH,
    rowY,
    mid,
    pad,
    dictD: rectPath(D.x, top, D.w, 7 * rowH, 'dict'),
    dictRules: rules(D, 7, 'dr'),
    logD: rectPath(L.x, top, L.w, 3 * rowH, 'log'),
    logRules: rules(L, 3, 'lr'),
    slotD: rectPath(L.x, rowY(3), L.w, rowH, 'slot'),
    // the dictionary's end: an empty dashed slot after h, where its pointer lands after the last line
    dslotD: rectPath(D.x, rowY(7), D.w, rowH, 'dslot'),
    newD: rectPath(N.x, top, N.w, 8 * rowH, 'new'),
    newRules: rules(N, 8, 'nr'),
    conns: Object.entries(FROM_LOG).map(([to, from]) => handPoly(connPts(from, Number(to)), `conn${to}`)),
    // pointer caret: an open chevron pointing right at the row, drawn once at the origin and translated
    caret: chevron([0, 0], 1, 0, ph ? 14 : 18, 'caret'),
    caretX: {d: D.x - (ph ? 6 : 10), l: L.x - (ph ? 6 : 10)},
    arrowD: handPoly(arrowPts, 'next'),
    arrowHead: chevron(arrowPts[arrowPts.length - 1], 0, 1, ph ? 13 : 16, 'nexth'),
    headY: ph ? 60 : 68,
    badgeR: ph ? 16 : 22,
    // lettering under the columns
    lbl: ph
      ? {
          dictCtr: {x: D.x, y: 580},
          logCtr: {x: L.x, y: 360},
          mem: [
            {x: L.x, y: 420},
            {x: L.x, y: 462},
          ],
          cmp: {x: L.x, y: 516},
          endMark: {x: N.x + pad, y: 576},
          newCtr: {x: N.x, y: 624},
          newAnchor: 'start' as const,
          onePass: {x: D.x + 4, y: 690},
          next: {x: 704, y: 740},
        }
      : {
          dictCtr: {x: D.x, y: 546},
          logCtr: {x: L.x, y: 344},
          mem: [
            {x: L.x, y: 420},
            {x: L.x, y: 466},
          ],
          cmp: {x: L.x, y: 524},
          // the board's end mark follows h's row, outside the file; the arrow leaves the file's bottom edge
          endMark: {x: N.x + N.w + 12, y: rowY(7) + rowH * 0.72},
          newCtr: {x: N.x, y: 538},
          newAnchor: 'start' as const,
          onePass: {x: D.x, y: 612},
          next: {x: 1188, y: 606},
        },
    MARK: ph ? 9 : 11,
    CAPTION_TOP: ph ? 772 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Continuous pointer position (row index) after the given moves; moves never go back. */
const pos = (frame: number, moves: readonly (readonly [number, number])[]) =>
  moves.reduce((p, [at, dur]) => p + ramp(frame, at, dur, EASE_MOVE), 0);
const done = (frame: number, spans: readonly (readonly [number, number])[]) => spans.filter(([at, dur]) => frame >= at + dur).length;

export const SortedMerge: React.FC<SortedMergeProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const C = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const {D, L, N, TY} = G;
  const TS = TY.label;
  const TM = TY.mono;
  const textY = (i: number) => G.rowY(i) + G.rowH * 0.72;

  const dPos = pos(frame, EV.dictMoves);
  const lPos = pos(frame, EV.logMoves);
  const dLast = EV.dictMoves[EV.dictMoves.length - 1];
  const lLast = EV.logMoves[EV.logMoves.length - 1];
  const outlinesIn = fade(frame, EV.outlinesIn[0], Infinity, EV.outlinesIn[1]);
  const dOutline = outlinesIn * (1 - ramp(frame, dLast[0], dLast[1], EASE_FADE));
  const lOutline = outlinesIn * (1 - ramp(frame, lLast[0], lLast[1], EASE_FADE));

  // a consumed input row dims to 55% as its pointer leaves it (text at 38% is illegible on the blackboard);
  // a struck (stale) row ghosts to 40% when its strike is drawn
  const READ = 0.55;
  const STALE = 0.4;
  const rowO = (moves: readonly (readonly [number, number])[], i: number) =>
    i < moves.length ? 1 - (1 - READ) * ramp(frame, moves[i][0], 12, EASE_FADE) : 1;
  const strikeOf = (i: number) => STRUCK.indexOf(i);

  const outline = (c: Col, p: number, o: number, key: string) =>
    o <= 0 ? null : (
      <g key={key} opacity={o}>
        <rect x={c.x + 5} y={G.rowY(p) + 5} width={c.w - 10} height={G.rowH - 10} rx={6} fill={C.blueWash} />
        <rect x={c.x + 5} y={G.rowY(p) + 5} width={c.w - 10} height={G.rowH - 10} rx={6} fill="none" stroke={C.blue} strokeWidth={STROKE.ink + 0.6} />
      </g>
    );
  const caret = (x: number, p: number, key: string) => (
    <g key={key} transform={`translate(${x} ${G.mid(p)})`}>
      <Ink d={G.caret} color="blue" width={STROKE.ink + 1} />
    </g>
  );
  const textW = (t: string) => t.length * TM * 0.6;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== current-line washes and outlines sit under the lettering ===== */}
        {outline(D, Math.min(dPos, 6.999), dOutline, 'od')}
        {outline(L, lPos, lOutline, 'ol')}

        {/* ===== static figure: headers ===== */}
        <StepBadge x={D.x + G.badgeR} y={G.headY - TM * 0.34} n={1} r={G.badgeR} />
        <Write x={D.x + G.badgeR * 2 + 10} y={G.headY} text="dictionary" size={TM} variant="mono" />
        <StepBadge x={L.x + G.badgeR} y={G.headY - TM * 0.34} n={2} r={G.badgeR} />
        <Write x={L.x + G.badgeR * 2 + 10} y={G.headY} text="changelog" size={TM} variant="mono" />
        <Write x={N.x} y={G.headY} text={G.ph ? 'new' : 'new dictionary'} size={TM} variant="mono" />

        {/* ===== static figure: the three files ===== */}
        <Ink d={G.dictD} />
        {G.dictRules.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
        ))}
        <Ink d={G.logD} />
        {G.logRules.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
        ))}
        <Ink d={G.slotD} color="ink2" width={STROKE.thin + 0.4} dash="10 9" />
        <Ink d={G.dslotD} color="ink2" width={STROKE.thin + 0.4} dash="10 9" />
        <Ink d={G.newD} />
        {G.newRules.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
        ))}

        {/* dictionary rows: dim as read; c′ and f′ struck as stale */}
        {DICT.map((t, i) => {
          const k = strikeOf(i);
          const o = k < 0 ? rowO(EV.dictMoves, i) : 1 - (1 - STALE) * ramp(frame, EV.strikes[k][0], 12, EASE_FADE);
          return <Write key={i} x={D.x + G.pad} y={textY(i)} text={t} size={TM} variant="mono" opacity={o} />;
        })}
        {STRUCK.map((row, k) => (
          <Pen
            key={k}
            d={handLine([D.x + G.pad - 6, textY(row) - TM * 0.3], [D.x + G.pad + textW(DICT[row]) + 4, textY(row) - TM * 0.3], `strike${k}`)}
            progress={ramp(frame, ...EV.strikes[k])}
            color="red"
            width={STROKE.ink}
          />
        ))}
        {/* changelog rows */}
        {LOG.map((t, i) => (
          <Write key={i} x={L.x + G.pad} y={textY(i)} text={t} size={TM} variant="mono" opacity={rowO(EV.logMoves, i)} />
        ))}
        <Write x={L.x + G.pad} y={textY(3)} text="done" size={TS} color="ink2" progress={ramp(frame, ...EV.done)} />

        {/* ===== the merge: connectors (changelog rows only), packets, writes, ticks ===== */}
        {G.conns.map((d, k) => {
          const p = ramp(frame, ...EV.conns[k], EASE_MOVE);
          return (
            <g key={k}>
              <Pen d={d} progress={p} color="ink2" width={STROKE.thin + 0.6} />
              <Packet d={d} progress={p} color="blue" r={G.ph ? 8 : 10} />
            </g>
          );
        })}
        {OUT.map((t, i) => (
          <Write key={i} x={N.x + G.pad} y={textY(i)} text={t} size={TM} variant="mono" progress={ramp(frame, ...EV.writes[i])} />
        ))}
        {Object.keys(FROM_LOG).map((row, k) => (
          <Tick key={row} x={N.x + N.w - (G.ph ? 24 : 32)} y={G.mid(Number(row))} color={C.green} o={fade(frame, EV.ticks[k], Infinity, 8)} s={G.MARK} />
        ))}
        <Write x={G.lbl.endMark.x} y={G.lbl.endMark.y} text="//" size={TM} variant="mono" progress={ramp(frame, ...EV.endMark)} />

        {/* ===== pointers (blue carets), never moving back ===== */}
        {caret(G.caretX.d, dPos, 'cd')}
        {caret(G.caretX.l, lPos, 'cl')}

        {/* ===== counters and the in-memory tag ===== */}
        <g opacity={fade(frame, EV.outlinesIn[0], Infinity, 10)}>
          <Write x={G.lbl.dictCtr.x} y={G.lbl.dictCtr.y} text={`moves: ${done(frame, EV.dictMoves)}`} size={TS} color="ink2" />
          <Write x={G.lbl.logCtr.x} y={G.lbl.logCtr.y} text={`moves: ${done(frame, EV.logMoves)}`} size={TS} color="ink2" />
          <Write x={G.lbl.newCtr.x} y={G.lbl.newCtr.y} text={`lines: ${done(frame, EV.writes)}`} size={TS} color="ink2" anchor={G.lbl.newAnchor} />
        </g>
        <Write x={G.lbl.mem[0].x} y={G.lbl.mem[0].y} text="in memory:" size={TS} color="blue" progress={ramp(frame, EV.memLbl[0], EV.memLbl[1] * 0.55)} />
        <Write x={G.lbl.mem[1].x} y={G.lbl.mem[1].y} text="2 lines" size={TS} color="blue" progress={ramp(frame, EV.memLbl[0] + EV.memLbl[1] * 0.45, EV.memLbl[1] * 0.55)} />

        {/* the two current words, compared: one readout at a time, replaced in place */}
        {EV.compares.map((c, k) => {
          const o = 1 - ramp(frame, c.out, 8, EASE_FADE);
          return o <= 0 || frame < c.at ? null : (
            <Write key={k} x={G.lbl.cmp.x} y={G.lbl.cmp.y} text={c.text} size={TM} variant="mono" weight={600} progress={ramp(frame, c.at, 10)} opacity={o} />
          );
        })}

        {/* ===== B5: the summary ===== */}
        <Write x={G.lbl.onePass.x} y={G.lbl.onePass.y} text="one pass · O(n + m)" size={TM} variant="mono" weight={600} progress={ramp(frame, ...EV.onePass)} />
        <Pen d={G.arrowD} progress={ramp(frame, ...EV.arrow)} color="ink" dash="12 10" head={G.arrowHead} />
        <Write x={G.lbl.next.x} y={G.lbl.next.y} text="next week's input" size={TS} anchor="end" progress={ramp(frame, ...EV.nextLbl)} />
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

export default SortedMerge;

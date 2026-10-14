// Clip l06-aux-redis — "Thirty messages, one write".
// Storyboard: lectures/lec06/animations/l06-aux-redis/storyboard.{yaml,md}. Ledger: L-0286, L-0292, L-0293, L-0303.
// Frame 0 = two lanes, "without aux" (sender → worker → main redis) and "with aux" (the same plus aux redis under the
// worker), every tray empty; the last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×1020, portrait re-flow, ≤ 640 px).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, cylinder, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useTheme} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, MSGS, arrival, type Mark, type Msg, type Route, type Tray} from './timeline';

export type AuxRedisProps = {theme: ThemeName; layout?: Layout};

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const yA = 160;
  const yB = ph ? 560 : 440;
  const SRC = ph ? {x: 24, w: 140, up: 48, h: 96, r1: -10, r2: 30} : {x: 40, w: 190, up: 52, h: 104, r1: -10, r2: 36};
  const WK = ph ? {x: 210, w: 130, up: 34, h: 68, base: 10} : {x: 300, w: 180, up: 38, h: 76, base: 14};
  const MAIN = ph ? {cx: 470, rx: 78, ry: 13, up: 38, h: 76, base: 16, label: -68} : {cx: 800, rx: 94, ry: 15, up: 40, h: 84, base: 18, label: -72};
  const wkCx = WK.x + WK.w / 2;
  const srcR = SRC.x + SRC.w;
  const wkR = WK.x + WK.w;
  const mainL = MAIN.cx - MAIN.rx;
  const AUX = ph ? {top: 130, rx: 48, ry: 12, h: 50} : {top: 100, rx: 56, ry: 13, h: 56};
  const auxTop = yB + AUX.top;
  const auxHit = auxTop - AUX.ry - 2; // where the worker → aux arrow ends (top of the lid)
  const wkBottom = yB - WK.up + WK.h;
  const lane = (y: number, seed: string) => ({
    y,
    src: serverBox(SRC.x, y - SRC.up, SRC.w, SRC.h, seed + 'src'),
    wk: serverBox(WK.x, y - WK.up, WK.w, WK.h, seed + 'wk'),
    main: cylinder(MAIN.cx, y - MAIN.up, MAIN.rx, MAIN.ry, MAIN.h, seed + 'main'),
    toWk: handLine([srcR, y], [WK.x - 2, y], seed + 'aw'),
    toWkHead: chevron([WK.x - 2, y], 1, 0, ph ? 14 : 16, seed + 'awh'),
    toMain: handLine([wkR, y], [mainL - 2, y], seed + 'am'),
    toMainHead: chevron([mainL - 2, y], 1, 0, ph ? 14 : 16, seed + 'amh'),
  });
  const A = lane(yA, 'a');
  const B = lane(yB, 'b');
  const routePts: Record<Route, Pt[]> = {
    top: [[srcR + 2, yA], [mainL - 2, yA]],
    botAux: [[srcR + 2, yB], [wkCx, yB], [wkCx, auxHit]],
    botMain: [[wkR + 2, yB], [mainL - 2, yB]],
  };
  const ROUTE = Object.fromEntries((Object.keys(routePts) as Route[]).map((k) => [k, handPoly(routePts[k], 'r' + k)])) as Record<Route, string>;
  const tray = (x0: number, y0: number) => ({x0, y0});
  return {
    ph,
    W,
    H,
    TY,
    A,
    B,
    SRC,
    WK,
    MAIN,
    wkCx,
    TITLE: ph ? {x: 24, dy: -116} : {x: 40, dy: -96},
    DIVIDER: handLine([ph ? 24 : 40, ph ? 380 : 296], [ph ? 696 : 1160, ph ? 380 : 296], 'div'),
    AUX_CYL: cylinder(wkCx, auxTop, AUX.rx, AUX.ry, AUX.h, 'aux'),
    TO_AUX: handLine([wkCx, wkBottom], [wkCx, auxHit], 'tax'),
    TO_AUX_HEAD: chevron([wkCx, auxHit], 0, 1, ph ? 14 : 16, 'taxh'),
    AUX_LABEL: ph ? {x: 214, y: yB + 172} : {x: 320, y: yB + 150},
    AUX_KEYS: ph ? {x: 336, y1: yB + 160, y2: yB + 200} : {x: 462, y1: yB + 126, y2: yB + 170},
    TRAY: {
      top: ph ? tray(380, yA + 90) : tray(940, yA - 48),
      main: ph ? tray(380, yB + 90) : tray(940, yB - 48),
      aux: ph ? tray(440, yB + 140) : tray(600, yB + 92),
    } as Record<Tray, {x0: number; y0: number}>,
    PITCH: 24,
    NOTE: {
      top: ph ? {x: 356, y: yA + 140, anchor: 'end' as const} : {x: 1164, y: yA + 98, anchor: 'end' as const},
      main: ph ? {x: 434, y: yB + 100, anchor: 'start' as const} : {x: 1004, y: yB - 36, anchor: 'start' as const},
      aux: ph ? {x: 432, y: yB + 282, anchor: 'start' as const} : {x: 842, y: yB + 152, anchor: 'start' as const},
    },
    ROUTE,
    PKT_R: ph ? 8 : 9,
    CAPTION_TOP: ph ? 870 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;

// Each message's slot in its tray: the n-th arrival in that tray.
const SLOT: number[] = (() => {
  const n: Record<Tray, number> = {top: 0, main: 0, aux: 0};
  return MSGS.map((m) => n[m.tray]++);
})();
const laneOf = (m: Msg): 'A' | 'B' => (m.route === 'top' ? 'A' : 'B');
const sentBy = (frame: number, laneKey: 'A' | 'B', sender: 'C' | 'D') =>
  MSGS.filter((m) => m.send && laneOf(m) === laneKey && m.sender === sender && frame >= m.at).length;

/** A text that is replaced in place: each state is written at its start; the one before fades out just ahead of it. */
const swapState = (frame: number, states: {at: number; dur: number}[], i: number) => {
  const s = states[i];
  const next = states[i + 1];
  const prog = s.at <= 0 ? 1 : ramp(frame, s.at, s.dur);
  const o = next ? 1 - ramp(frame, next.at - 8, 8, EASE_FADE) : 1;
  return {prog, o};
};

export const AuxRedis: React.FC<AuxRedisProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const at = (r: readonly [number, number]) => r;

  // the main store's set, per lane: B:{ } -> B:{C} -> B:{C,D}
  const setStates = (s1: readonly [number, number], s2: readonly [number, number]) => [
    {at: 0, dur: 1, text: 'B:{ }', color: 'ink' as const},
    {at: s1[0], dur: s1[1], text: 'B:{C}', color: 'green' as const},
    {at: s2[0], dur: s2[1], text: 'B:{C,D}', color: 'green' as const},
  ];
  const SETS = {A: setStates(EV.topSet1, EV.topSet2), B: setStates(EV.botSet1, EV.botSet2)};

  const notes = (n1: readonly [number, number], n2: readonly [number, number], t1: string, t2: string) => [
    {at: n1[0], dur: n1[1], text: t1},
    {at: n2[0], dur: n2[1], text: t2},
  ];
  const NOTES = {
    top: {color: 'red' as const, states: notes(EV.topNote1, EV.topNote2, '29 no change', '48 no change')},
    aux: {color: 'ink2' as const, states: notes(EV.auxNote1, EV.auxNote2, '29 checks', '48 checks')},
    main: {color: 'green' as const, states: notes(EV.mainNote1, EV.mainNote2, '1 write', '2 writes')},
  };

  const cO = ghost(frame, EV.cGhost);
  const srcRows = (laneKey: 'A' | 'B', y: number) => {
    const cx = G.SRC.x + G.SRC.w / 2;
    const dP = ramp(frame, ...at(EV.dRow));
    return (
      <>
        <Write x={cx} y={y + G.SRC.r1} text={`C ×${sentBy(frame, laneKey, 'C')}`} size={TS} variant="mono" anchor="middle" opacity={cO} />
        <Write x={cx} y={y + G.SRC.r2} text={`D ×${sentBy(frame, laneKey, 'D')}`} size={TS} variant="mono" anchor="middle" progress={dP} />
      </>
    );
  };

  const laneDrawing = (L: typeof G.A, laneKey: 'A' | 'B', title: string) => (
    <g>
      <Write x={G.TITLE.x} y={L.y + G.TITLE.dy} text={title} size={TS} weight={620} />
      <Ink d={L.toWk} />
      <Ink d={L.toWkHead} />
      <Ink d={L.toMain} />
      <Ink d={L.toMainHead} />
      <Write x={G.MAIN.cx} y={L.y + G.MAIN.label} text="main redis" size={TS} variant="mono" anchor="middle" color="ink2" />
      {laneKey === 'B' ? (
        <>
          <Ink d={G.TO_AUX} />
          <Ink d={G.TO_AUX_HEAD} />
        </>
      ) : null}
    </g>
  );

  const boxes = (L: typeof G.A) => (
    <g>
      <Ink d={L.src} fill={T.sheet} />
      <Ink d={L.wk} fill={T.sheet} />
      <Write x={G.wkCx} y={L.y + G.WK.base} text="worker" size={TS} variant="mono" anchor="middle" />
      <path d={L.main.bodyFill} fill={T.sheet} />
      <Ink d={L.main.sides} />
      <Ink d={L.main.front} />
      <Ink d={L.main.top} fill={T.sheet} />
    </g>
  );

  const setText = (laneKey: 'A' | 'B', y: number) =>
    SETS[laneKey].map((s, i) => {
      const {prog, o} = swapState(frame, SETS[laneKey], i);
      if (frame < s.at) return null;
      return <Write key={i} x={G.MAIN.cx} y={y + G.MAIN.base} text={s.text} size={TS} variant="mono" anchor="middle" color={s.color} progress={prog} opacity={o} weight={560} />;
    });

  const note = (k: Tray) => {
    const N = NOTES[k];
    const P = G.NOTE[k];
    return N.states.map((s, i) => {
      const {prog, o} = swapState(frame, N.states, i);
      if (frame < s.at) return null;
      return <Write key={i} x={P.x} y={P.y} text={s.text} size={TS} color={N.color} anchor={P.anchor} progress={prog} opacity={o} weight={600} />;
    });
  };

  // blue re-ink of each sender's first hops (fades when the next beat's stream starts)
  const firstInk = MSGS.filter((m) => !m.linear).map((m, i) => {
    const until = m.sender === 'C' ? EV.firstBlueUntil : EV.dBlueUntil;
    const p = ramp(frame, m.at, m.dur, EASE_MOVE);
    return <Pen key={i} d={G.ROUTE[m.route]} progress={p} color="blue" width={STROKE.ink + 1} opacity={1 - ramp(frame, until, 14, EASE_FADE)} />;
  });

  const packets = MSGS.map((m, i) => (
    <Packet key={i} d={G.ROUTE[m.route]} progress={ramp(frame, m.at, m.dur, m.linear ? LIN : EASE_MOVE)} color="blue" r={G.PKT_R} />
  ));

  const marks = MSGS.map((m, i) => {
    const o = fade(frame, arrival(m), Infinity, 6);
    if (o <= 0) return null;
    const tr = G.TRAY[m.tray];
    const k = SLOT[i];
    const x = tr.x0 + (k % 10) * G.PITCH;
    const y = tr.y0 + Math.floor(k / 10) * G.PITCH;
    return <TrayMark key={i} x={x} y={y} kind={m.mark} o={o} />;
  });

  const keyP1 = ramp(frame, ...at(EV.auxKey1));
  const keyP2 = ramp(frame, ...at(EV.auxKey2));

  return (
    <Sheet theme={theme}>
      <Stage title="Thirty messages, one write" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        <Ink d={G.DIVIDER} color="ink3" width={STROKE.thin} dash="10 10" />
        {laneDrawing(G.A, 'A', 'without aux')}
        {laneDrawing(G.B, 'B', 'with aux')}

        {/* ===== moving: re-ink + packets, under the boxes so they pass behind the worker ===== */}
        {firstInk}
        {packets}

        {boxes(G.A)}
        {boxes(G.B)}
        <path d={G.AUX_CYL.bodyFill} fill={T.sheet} />
        <Ink d={G.AUX_CYL.sides} />
        <Ink d={G.AUX_CYL.front} />
        <Ink d={G.AUX_CYL.top} fill={T.sheet} />
        <Write x={G.AUX_LABEL.x} y={G.AUX_LABEL.y} text="aux redis" size={TS} variant="mono" anchor="end" color="ink2" />

        {srcRows('A', G.A.y)}
        {srcRows('B', G.B.y)}
        {setText('A', G.A.y)}
        {setText('B', G.B.y)}

        {/* aux keys: one per sender (existence only, no count) */}
        <Write x={G.AUX_KEYS.x} y={G.AUX_KEYS.y1} text="B_C" size={TS} variant="mono" progress={keyP1} />
        <Write x={G.AUX_KEYS.x} y={G.AUX_KEYS.y2} text="B_D" size={TS} variant="mono" progress={keyP2} />

        {/* ===== trays: one mark per message that reached the store ===== */}
        {marks}
        {note('top')}
        {note('aux')}
        {note('main')}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** One message that reached a store: green dot = the set changed, red ✕ = no change, graphite ring = a check. */
const TrayMark: React.FC<{x: number; y: number; kind: Mark; o: number}> = ({x, y, kind, o}) => {
  const t = useTheme();
  if (kind === 'change') return <circle cx={x} cy={y} r={9.5} fill={t.green} opacity={o} />;
  if (kind === 'nochange') {
    const s = 7.5;
    return (
      <path d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`} stroke={t.red} strokeWidth={STROKE.ink} strokeLinecap="round" opacity={o} />
    );
  }
  return <circle cx={x} cy={y} r={7.5} fill="none" stroke={t.ink2} strokeWidth={STROKE.thin + 0.6} opacity={o} />;
};

export default AuxRedis;

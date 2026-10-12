// Clip l01-queue-vs-stream — "Same messages, two brokers".
// Storyboard: lectures/lec01/animations/l01-queue-vs-stream/storyboard.{yaml,md}.
// Ledger: L-0155, L-0161, L-0170, L-0173, L-0174, L-0175, L-0176, L-0213.
// Frame 0 = both lanes of board D-11 with empty pipes and the five messages waiting; the last frame is the poster.
// Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×850, ≤ 640 px): queue above stream in both;
// on the phone the waiting messages sit above their pipe and drop in, and everything is drawn tighter with 30 px lettering.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {chevron, cylinder, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write, useTheme} from '../../lib/primitives';
import {FONT, STROKE, THEMES, typeFor, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, DISPATCH, EV, META} from './timeline';

export type QueueVsStreamProps = {theme: ThemeName; layout?: Layout};

const K5 = [0, 1, 2, 3, 4];

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const QY = ph ? 196 : 160; // queue lane centre line
  const SY = ph ? 512 : 462; // stream lane centre line
  const SQ = ph ? 44 : 52; // message square
  const SLOT_X = K5.map((k) => (ph ? 400 - 60 * k : 734 - 80 * k)); // places in the pipe, m1 at the exit end
  // waiting row: left of the pipe (wide), above the pipe (phone)
  const waitAt = (k: number, cy: number): Pt => (ph ? [SLOT_X[k], cy - 92] : [300 - 64 * k, cy]);
  const PIPE = ph ? {x0: 120, x1: 440, ry: 32, capRx: 10} : {x0: 360, x1: 790, ry: 38, capRx: 12};
  const BUS_X = ph ? 462 : 836;
  const CONS = ph ? {x: 486, w: 156, h: 50} : {x: 870, w: 216, h: 56};
  const CONS_Y = ph ? [116, 196, 276] : [74, 160, 246];
  const DIGIT_X = ph ? [666, 700] : [1116, 1164];
  const SEARCH = ph ? {x: 486, y: 392, w: 140, h: 50} : {x: 860, y: 326, w: 180, h: 56};
  const COUNTER = ph ? {x: 486, y: 572, w: 140, h: 50} : {x: 860, y: 542, w: 180, h: 56};
  const SEARCH_CY = SEARCH.y + SEARCH.h / 2;
  const COUNTER_CY = COUNTER.y + COUNTER.h / 2;
  const STORE_X = ph ? 680 : 1124;
  const st = ph ? {rx: 26, ry: 7, h: 32} : {rx: 40, ry: 10, h: 46};
  const ES_TOP = ph ? SEARCH_CY - 18 : 332;
  const DB_TOP = ph ? COUNTER_CY - 18 : 548;

  const pipeD = (cy: number, seed: string) => {
    const {x0, x1, ry, capRx} = PIPE;
    const top = handLine([x0, cy - ry], [x1, cy - ry], seed + 't');
    const bot = handLine([x0, cy + ry], [x1, cy + ry], seed + 'b');
    const left = `M ${x0} ${cy - ry} A ${capRx} ${ry} 0 1 0 ${x0} ${cy + ry} A ${capRx} ${ry} 0 1 0 ${x0} ${cy - ry}`;
    const right = `M ${x1} ${cy - ry} A ${capRx} ${ry} 0 0 1 ${x1} ${cy + ry}`;
    return `${top} ${bot} ${left} ${right}`;
  };
  const pipeFill = (cy: number) =>
    `M ${PIPE.x0} ${cy - PIPE.ry} L ${PIPE.x1} ${cy - PIPE.ry} A ${PIPE.capRx} ${PIPE.ry} 0 0 1 ${PIPE.x1} ${cy + PIPE.ry} L ${PIPE.x0} ${cy + PIPE.ry} Z`;

  return {
    ph, W, H, TY, QY, SY, SQ, SLOT_X, waitAt, PIPE, BUS_X, CONS, CONS_Y, DIGIT_X, SEARCH, COUNTER, SEARCH_CY, COUNTER_CY, STORE_X,
    PIPE_Q: pipeD(QY, 'pq'),
    PIPE_S: pipeD(SY, 'ps'),
    PIPE_FILL_Q: pipeFill(QY),
    PIPE_FILL_S: pipeFill(SY),
    SQUARE: K5.map((k) => serverBox(-SQ / 2, -SQ / 2, SQ, SQ, `m${k}`)),
    CONS_D: CONS_Y.map((y, i) => serverBox(CONS.x, y - CONS.h / 2, CONS.w, CONS.h, `c${i}`)),
    FAN_D: CONS_Y.map((y, i) => handPoly([[PIPE.x1 + PIPE.capRx, QY], [BUS_X, QY], [BUS_X, y], [CONS.x - 4, y]], `fan${i}`)),
    // straight route each message rides from its slot to its consumer
    ROUTE: K5.map((k) => {
      const y = CONS_Y[DISPATCH[k]];
      return `M ${SLOT_X[k]} ${QY} L ${BUS_X} ${QY} L ${BUS_X} ${y} L ${CONS.x - SQ / 2 - 8} ${y}`;
    }),
    SEARCH_D: serverBox(SEARCH.x, SEARCH.y, SEARCH.w, SEARCH.h, 'search'),
    COUNTER_D: serverBox(COUNTER.x, COUNTER.y, COUNTER.w, COUNTER.h, 'counter'),
    ES: cylinder(STORE_X, ES_TOP, st.rx, st.ry, st.h, 'es'),
    DB: cylinder(STORE_X, DB_TOP, st.rx, st.ry, st.h, 'db'),
    ES_LINK: handLine([SEARCH.x + SEARCH.w, SEARCH_CY], [STORE_X - st.rx - 4, SEARCH_CY], 'esl'),
    DB_LINK: handLine([COUNTER.x + COUNTER.w, COUNTER_CY], [STORE_X - st.rx - 4, COUNTER_CY], 'dbl'),
    SEP_D: ph ? handLine([24, 330], [696, 330], 'sep') : handLine([40, 300], [1160, 300], 'sep'),
    lbl: ph
      ? {
          qTitle: {x: 32, y: 44}, qSqs: {x: 134, y: 44}, qTopic: {x: 238, y: 44},
          sTitle: {x: 32, y: 380}, sKafka: {x: 154, y: 380}, sTopic: {x: 270, y: 380},
          esLbl: {x: STORE_X, y: ES_TOP + st.h + st.ry + 30}, dbLbl: {x: STORE_X, y: DB_TOP + st.h + st.ry + 30},
          status: {x: 712, y: 520}, tick: {x: 584, y: 506},
          deleted: {x: (PIPE.x0 + PIPE.x1) / 2, y: QY + PIPE.ry + 44},
          esCross: {x: STORE_X, y: ES_TOP + 18},
        }
      : {
          qTitle: {x: 40, y: 50}, qSqs: {x: 176, y: 50}, qTopic: {x: 40, y: 104},
          sTitle: {x: 40, y: 352}, sKafka: {x: 192, y: 352}, sTopic: {x: 40, y: 406},
          esLbl: {x: STORE_X, y: 376}, dbLbl: {x: STORE_X, y: 592},
          status: {x: STORE_X + 14 + 50, y: 444}, tick: {x: STORE_X - 70, y: 430},
          deleted: {x: (PIPE.x0 + PIPE.x1) / 2, y: QY + PIPE.ry + 56},
          esCross: {x: STORE_X, y: 362},
        },
    CAPTION_TOP: ph ? 664 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type Geo = (typeof LAYOUTS)['wide'];

// digit slot beside each consumer: the n-th message that consumer handled
const DIGIT_SLOT = K5.map((k) => DISPATCH.slice(0, k).filter((c) => c === DISPATCH[k]).length);

const cursorPts = (G: Geo, cx: number, which: 'search' | 'counter'): Pt[] =>
  which === 'search'
    ? [[G.SEARCH.x - 4, G.SEARCH_CY], [cx, G.SEARCH_CY], [cx, G.SY - G.SQ / 2 - 8]]
    : [[G.COUNTER.x - 4, G.COUNTER_CY], [cx, G.COUNTER_CY], [cx, G.SY + G.SQ / 2 + 8]];
const cursorHead = (G: Geo, cx: number, which: 'search' | 'counter') =>
  which === 'search' ? chevron([cx, G.SY - G.SQ / 2 - 8], 0, 1, G.ph ? 15 : 18, 'chs') : chevron([cx, G.SY + G.SQ / 2 + 8], 0, -1, G.ph ? 15 : 18, 'chc');

const cross = (x: number, y: number, s: number) => `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`;
const tick = (x: number, y: number, s: number) => `M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.75} L ${x + s} ${y - s * 0.8}`;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A numbered message square at (x, y). */
const Msg: React.FC<{G: Geo; x: number; y: number; k: number; color?: 'ink' | 'blue'; opacity?: number; dashed?: boolean}> = ({G, x, y, k, color = 'ink', opacity = 1, dashed}) => {
  const t = useTheme();
  if (opacity <= 0) return null;
  const c = t[color];
  const fs = G.ph ? 28 : 40;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <path d={G.SQUARE[k]} fill={t.sheet} stroke={c} strokeWidth={STROKE.ink} strokeDasharray={dashed ? '8 7' : undefined} strokeLinejoin="round" />
      <text x={0} y={fs * 0.35} textAnchor="middle" fontSize={fs} fill={c} style={FONT.mono}>
        {k + 1}
      </text>
    </g>
  );
};

const cursorK = (frame: number, steps: readonly number[]) => steps.reduce((s, at) => s + ramp(frame, at, EV.stepDur, EASE_MOVE), 0);

export const QueueVsStream: React.FC<QueueVsStreamProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T: Theme = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const L = G.lbl;
  const {QY, SY, SLOT_X, PIPE, CONS, CONS_Y, STORE_X} = G;

  // ---- ① queue ----
  const rowQ = ramp(frame, ...EV.rowInQ, EASE_MOVE);
  const depart = (k: number) => EV.dispatch0 + k * EV.dispatchGap;
  const arrive = (k: number) => depart(k) + EV.dispatchDur;

  // ---- ② stream ----
  const rowS = ramp(frame, ...EV.rowInS, EASE_MOVE);
  const sK = cursorK(frame, EV.searchSteps);
  const cK = cursorK(frame, EV.counterSteps);
  const sX = lerp(SLOT_X[0], SLOT_X[4], sK / 4);
  const cX = lerp(SLOT_X[0], SLOT_X[4], cK / 4);
  const sDrawP = ramp(frame, ...EV.searchDraw);
  const cDrawP = ramp(frame, ...EV.counterDraw);
  const stall = ramp(frame, ...EV.stall, EASE_FADE) * (1 - ramp(frame, ...EV.unstall, EASE_FADE));

  // ---- ③/④ es ----
  const esX = fade(frame, EV.esX, EV.esOk[0], 8, EV.esOk[1]);
  const esOk = ramp(frame, EV.esOk[0] + 4, 8, EASE_FADE);
  const downO = fade(frame, 0, EV.esOk[0], 1, 10);

  // ---- ⑤ retention ----
  const ret = ramp(frame, ...EV.retention, EASE_FADE);

  const searchPath = handPoly(cursorPts(G, sX, 'search'), 'cur-s');
  const counterPath = handPoly(cursorPts(G, cX, 'counter'), 'cur-c');
  const wait = (k: number, cy: number, p: number): Pt => {
    const [wx, wy] = G.waitAt(k, cy);
    return [lerp(wx, SLOT_X[k], p), lerp(wy, cy, p)];
  };
  const dy = TS * 0.35;

  return (
    <Sheet theme={theme}>
      <Stage title="Queue vs stream" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        <Write x={L.qTitle.x} y={L.qTitle.y} text="queue" size={TS} />
        <Write x={L.qSqs.x} y={L.qSqs.y} text="sqs" size={TS} variant="mono" color="ink2" />
        <Write x={L.qTopic.x} y={L.qTopic.y} text="ON_PUBLISH" size={TS} variant="mono" color="ink2" opacity={ghost(frame, EV.rowInQ[0] + 20)} />
        <Write x={L.sTitle.x} y={L.sTitle.y} text="stream" size={TS} />
        <Write x={L.sKafka.x} y={L.sKafka.y} text="kafka" size={TS} variant="mono" color="ink2" />
        <Write x={L.sTopic.x} y={L.sTopic.y} text="ON_PUBLISH" size={TS} variant="mono" color="ink2" opacity={ghost(frame, EV.rowInS[0] + 20)} />
        <Ink d={G.SEP_D} color="ink3" width={STROKE.thin} dash="10 10" />

        {/* queue: pipe, fan, three identical consumers */}
        <path d={G.PIPE_FILL_Q} fill={T.sheet} />
        <Ink d={G.PIPE_Q} />
        {G.FAN_D.map((d, i) => (
          <Ink key={`fan${i}`} d={d} />
        ))}
        {G.CONS_D.map((d, i) => (
          <g key={`c${i}`}>
            <Ink d={d} fill={T.sheet} />
            <Write x={CONS.x + CONS.w / 2} y={CONS_Y[i] + dy} text="count++" size={TS} variant="mono" anchor="middle" />
          </g>
        ))}

        {/* stream: pipe, two different consumers with their stores */}
        <path d={G.PIPE_FILL_S} fill={T.sheet} />
        <Ink d={G.PIPE_S} />
        <Ink d={G.ES_LINK} />
        <Ink d={G.DB_LINK} />
        <Ink d={G.SEARCH_D} fill={T.sheet} />
        <Write x={G.SEARCH.x + G.SEARCH.w / 2} y={G.SEARCH_CY + dy} text="search" size={TS} variant="mono" anchor="middle" />
        <Ink d={G.COUNTER_D} fill={T.sheet} />
        <Write x={G.COUNTER.x + G.COUNTER.w / 2} y={G.COUNTER_CY + dy} text="counter" size={TS} variant="mono" anchor="middle" />
        {[G.ES, G.DB].map((c, i) => (
          <g key={`st${i}`}>
            <path d={c.bodyFill} fill={T.sheet} />
            <Ink d={c.sides} />
            <Ink d={c.front} />
            <Ink d={c.top} fill={T.sheet} />
          </g>
        ))}
        <Write x={L.esLbl.x} y={L.esLbl.y} text="es" size={TS} variant="mono" anchor="middle" />
        <Write x={L.dbLbl.x} y={L.dbLbl.y} text="db" size={TS} variant="mono" anchor="middle" />

        {/* ===== ① queue: one consumer per message, then deleted ===== */}
        {K5.map((k) => {
          const d0 = depart(k);
          const p = ramp(frame, d0, EV.dispatchDur, EASE_MOVE);
          // ghost of the emptied slot
          const ghostO = 0.38 * ramp(frame, d0, 10, EASE_FADE);
          const ghostEl = ghostO > 0 ? <Msg G={G} key={`g${k}`} x={SLOT_X[k]} y={QY} k={k} opacity={ghostO} dashed /> : null;
          let el: React.ReactNode = null;
          if (p <= 0) {
            const [x, y] = wait(k, QY, rowQ);
            el = <Msg G={G} x={x} y={y} k={k} />;
          } else {
            const len = getLength(G.ROUTE[k]);
            const pt = getPointAtLength(G.ROUTE[k], len * Math.min(p, 1));
            const absorbed = ramp(frame, arrive(k), 10, EASE_FADE);
            el = pt ? <Msg G={G} x={pt.x} y={pt.y} k={k} color="blue" opacity={1 - absorbed} /> : null;
          }
          const c = DISPATCH[k];
          return (
            <g key={`q${k}`}>
              {ghostEl}
              {el}
              <Write x={G.DIGIT_X[DIGIT_SLOT[k]]} y={CONS_Y[c] + dy} text={`${k + 1}`} size={TS} variant="mono" color="green" anchor="middle" progress={ramp(frame, arrive(k), 14)} weight={600} />
            </g>
          );
        })}
        <Write x={L.deleted.x} y={L.deleted.y} text="all deleted" size={TS} color="green" anchor="middle" progress={ramp(frame, ...EV.deletedLabel)} />

        {/* ===== ② stream: messages stay ===== */}
        {K5.map((k) => {
          const [x, y] = wait(k, SY, rowS);
          return (
            <g key={`s${k}`}>
              <Msg G={G} x={x} y={y} k={k} opacity={k < 2 ? 1 - ret : 1} />
              {k < 2 && ret > 0 ? <Msg G={G} x={SLOT_X[k]} y={SY} k={k} opacity={0.38 * ret} dashed /> : null}
            </g>
          );
        })}
        {/* each consumer type's own position (cursor), drawn by pen, then following its position */}
        {sDrawP > 0 ? (
          sDrawP < 1 ? (
            <Pen d={searchPath} progress={sDrawP} head={cursorHead(G, sX, 'search')} />
          ) : (
            <g>
              <Ink d={searchPath} opacity={1 - stall} />
              <Ink d={cursorHead(G, sX, 'search')} opacity={1 - stall} />
              <Ink d={searchPath} color="red" dash="12 10" opacity={stall} />
              <Ink d={cursorHead(G, sX, 'search')} color="red" opacity={stall} />
            </g>
          )
        ) : null}
        {cDrawP > 0 ? (
          cDrawP < 1 ? (
            <Pen d={counterPath} progress={cDrawP} head={cursorHead(G, cX, 'counter')} />
          ) : (
            <g>
              <Ink d={counterPath} />
              <Ink d={cursorHead(G, cX, 'counter')} />
            </g>
          )
        ) : null}

        {/* ===== ③ es down / ④ es back ===== */}
        <g opacity={esX}>
          <path d={cross(L.esCross.x, L.esCross.y, G.ph ? 18 : 24)} stroke={T.sheet} strokeWidth={STROKE.ink + 6} strokeLinecap="round" fill="none" />
          <path d={cross(L.esCross.x, L.esCross.y, G.ph ? 18 : 24)} stroke={T.red} strokeWidth={STROKE.ink + 1.4} strokeLinecap="round" fill="none" />
        </g>
        <Write x={L.status.x} y={L.status.y} text="down" size={TS} color="red" anchor="end" progress={ramp(frame, ...EV.downLabel)} opacity={downO} weight={600} />
        <g opacity={esOk}>
          <path d={tick(L.tick.x, L.tick.y, 14)} stroke={T.green} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <Write x={L.status.x} y={L.status.y} text="back" size={TS} color="green" anchor="end" progress={ramp(frame, ...EV.backLabel)} weight={600} />

        {/* ===== ⑤ retention ===== */}
        <Write x={(SLOT_X[0] + SLOT_X[1]) / 2} y={SY - PIPE.ry - (G.ph ? 12 : 16)} text="retention" size={TS} color="ink2" anchor="middle" progress={ramp(frame, ...EV.retentionLabel)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default QueueVsStream;

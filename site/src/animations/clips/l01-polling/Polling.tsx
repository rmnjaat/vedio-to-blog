// Clip l01-polling — "Three ways to hear ready": short polling, long polling, push over one open connection.
// Storyboard: lectures/lec01/animations/l01-polling/storyboard.{yaml,md}.
// Ledger: L-0238, L-0243, L-0245, L-0246, L-0248, L-0250, L-0256, L-0265.
// Frame 0 = three empty browser/server lanes on one time line; the last frame is the annotated poster.
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, endDir, handLine, type Pt} from '../../lib/hand';
import {PAST, fade, ghost, ramp, EASE_FADE, EASE_MOVE, EASE_PEN} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, SHORT, shortPoll} from './timeline';

export type PollingProps = {theme: ThemeName; layout?: Layout};

// ---------- geometry per layout (canvas px) ----------
// wide: 1200×800, 0 s at x 240 and 60 s at x 1020. phone: 720×960, 0 s at x 168 and 60 s at x 504, a top row for
// "ready at 60 s", request counts on each lane's title row, the 1M-readers sum on its own row under the lanes.
// Time is not to scale for the round trips.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const X = (sec: number) => (ph ? 180 + 5.4 * sec : 240 + 13 * sec);
  const DX = ph ? 12 : 17; // half the width of one request/reply "V" (a round trip)
  const RAIL = ph ? {x0: 172, x1: 540} : {x0: 228, x1: 1050};
  const lane = (i: number) => {
    const H0 = ph ? 104 + 216 * i : 50 + 200 * i;
    return ph
      ? {H: H0, BR: H0 + 44, SV: H0 + 120, AN: H0 + 160, MID: H0 + 82, SEP: H0 + 186}
      : {H: H0, BR: H0 + 36, SV: H0 + 104, AN: H0 + 142, MID: H0 + 70, SEP: H0 + 163};
  };
  const L = [lane(0), lane(1), lane(2)];
  const hs = ph ? 13 : 16;
  const arrow = (a: Pt, b: Pt, seed: string, head = true) => {
    const d = handLine(a, b, seed);
    const [ux, uy] = endDir([a, b]);
    return {d, head: head ? chevron(b, ux, uy, hs, seed + 'h') : undefined};
  };
  /** One request (browser -> server, head at the server) + its reply trace back (no head: replies ride back). */
  const vAt = (x: number, l: (typeof L)[number], seed: string) => ({
    req: arrow([x, l.BR], [x + DX, l.SV - 2], seed + 'q'),
    ret: arrow([x + DX, l.SV], [x + 2 * DX, l.BR], seed + 'r', false),
  });
  const E60 = X(60) + 8; // the 60 s events sit just right of the green ready line so they stay readable
  return {
    ph, W, H, TY, X, DX, L, E60,
    RAILS: L.flatMap((l, i) => [handLine([RAIL.x0, l.BR], [RAIL.x1, l.BR], `br${i}`), handLine([RAIL.x0, l.SV], [RAIL.x1, l.SV], `sv${i}`)]),
    POLLS: [1, 2, 3, 4, 5, 6].map((k) => vAt(k === 6 ? E60 : X(10 * k), L[0], `p${k}`)),
    SEPS: [0, 1].map((i) => (ph ? handLine([24, L[i].SEP], [696, L[i].SEP], `sep${i}`) : handLine([40, L[i].SEP], [1160, L[i].SEP], `sep${i}`))),
    LONG_REQ: arrow([X(0), L[1].BR], [X(0) + DX, L[1].SV - 2], 'lq'),
    LONG_RET: arrow([E60, L[1].SV], [E60 + DX, L[1].BR], 'lr', false),
    CONNECT: arrow([X(0), L[2].BR], [X(0) + DX, L[2].SV - 2], 'cq'),
    // the server speaks first: the push is initiated by the server, so its head sits at the browser
    PUSH: arrow([E60, L[2].SV], [E60 + DX, L[2].BR + 2], 'ps'),
    READY_LINES: L.map((l, i) => handLine([X(60), l.BR - 18], [X(60), l.SV + 18], `rl${i}`)),
    lblX: ph ? 30 : 40,
    annX: ph ? 180 : 240,
    count: (i: number) => (ph ? {x: 690, y: L[i].H} : {x: 860, y: L[i].H}),
    readyLbl: ph ? {x: X(60), y: 50} : {x: X(60), y: L[0].H},
    scaleLbl: ph ? {x: 30, y: L[2].SEP + 30, anchor: 'start' as const} : {x: 1004, y: L[0].AN, anchor: 'end' as const},
    CAPTION_TOP: ph ? 790 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;

export const Polling: React.FC<PollingProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const {X, DX, L, E60, POLLS, LONG_REQ, LONG_RET, CONNECT, PUSH} = G;
  const TS = G.TY.label;
  const pr = G.ph ? 7 : 8;
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const at = (r: readonly [number, number]) => r;

  // lane focus: a lane ghosts while another lane is being explained, and comes back for the comparison at 60 s
  const back = (f: number) => PAST + (1 - PAST) * ramp(f, BEAT.ready, 12, EASE_FADE);
  const lane0O = frame < BEAT.ready ? ghost(frame, BEAT.long) : back(frame);
  const lane1O = frame < BEAT.ready ? ghost(frame, BEAT.push) : back(frame);

  // ---- lane 0: short polling ----
  const polls = [1, 2, 3, 4, 5].map((k) => shortPoll(k));
  const p6 = {req: EV.poll6Req[0], ret: EV.poll6Ret[0], done: EV.poll6Ret[0] + EV.poll6Ret[1]};
  const shortCount = polls.filter((p) => frame >= p.done).length + (frame >= p6.done ? 1 : 0);
  // playhead: moves between polls, rides the "V" during a poll (time is not to scale)
  let play0 = X(0);
  for (let k = 1; k <= SHORT.n; k++) {
    const p = polls[k - 1];
    const from = k === 1 ? X(0) : X(10 * (k - 1)) + 2 * DX;
    if (frame >= p.move) play0 = from + (X(10 * k) - from) * ramp(frame, p.move, SHORT.move, EASE_MOVE);
    if (frame >= p.req) play0 = X(10 * k) + 2 * DX * ramp(frame, p.req, SHORT.req + SHORT.ret, LIN);
  }
  if (frame >= EV.tick60[0]) play0 = X(50) + 2 * DX + (X(60) - X(50) - 2 * DX) * ramp(frame, ...at(EV.tick60), LIN);

  // ---- lane 1: long polling (held span grows with time) ----
  const heldX = frame < EV.tick60[0] ? X(0) + DX + (X(50) - X(0) - DX) * ramp(frame, ...at(EV.held), LIN) : X(50) + (X(60) - X(50)) * ramp(frame, ...at(EV.tick60), LIN);
  // ---- lane 2: open connection grows with time ----
  const openX = frame < EV.tick60[0] ? X(0) + DX + (X(50) - X(0) - DX) * ramp(frame, ...at(EV.open), LIN) : X(50) + (X(60) - X(50)) * ramp(frame, ...at(EV.tick60), LIN);

  const playO = (from: number, to: number) => fade(frame, from, to, 6, 10);
  const Playhead: React.FC<{x: number; l: (typeof L)[number]; o: number}> = ({x, l, o}) =>
    o <= 0 ? null : <line x1={x} y1={l.BR - 16} x2={x} y2={l.SV + 16} stroke={T.ink2} strokeWidth={STROKE.thin + 0.6} strokeLinecap="round" opacity={o} />;

  return (
    <Sheet theme={theme}>
      <Stage title="Hearing ready: short polling, long polling, push" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): three lanes ===== */}
        {G.RAILS.map((d, i) => (
          <Ink key={i} d={d} color="ink2" width={STROKE.thin + 0.6} />
        ))}
        {G.SEPS.map((d, i) => (
          <Ink key={i} d={d} color="ink3" width={STROKE.thin} dash="6 10" opacity={0.7} />
        ))}
        {L.map((l, i) => (
          <g key={i}>
            <Write x={G.lblX} y={l.BR + TS * 0.33} text="browser" size={TS} color="ink2" />
            <Write x={G.lblX} y={l.SV + TS * 0.33} text="server" size={TS} color="ink2" />
          </g>
        ))}
        <Write x={G.lblX} y={L[0].H} size={TS} text="short polling" weight={640} />
        <Write x={G.lblX} y={L[1].H} size={TS} text="long polling" weight={640} />
        <Write x={G.lblX} y={L[2].H} size={TS} text="push: websocket / sse" weight={640} />

        {/* ===== lane 0: short polling ===== */}
        <g opacity={lane0O}>
          {polls.map((p, i) => {
            const v = POLLS[i];
            const reqP = ramp(frame, p.req, SHORT.req, EASE_PEN);
            const retP = ramp(frame, p.ret, SHORT.ret, EASE_PEN);
            const blueO = 1 - ramp(frame, p.done + 6, 14, EASE_FADE);
            return (
              <g key={i}>
                <Pen d={v.req.d} progress={reqP} head={v.req.head} />
                <Pen d={v.req.d} progress={reqP} head={v.req.head} color="blue" opacity={blueO} />
                <Pen d={v.ret.d} progress={retP} color="ink2" />
                <Packet d={v.req.d} progress={reqP} color="blue" r={pr} />
                <Packet d={v.ret.d} progress={retP} color="ink2" r={pr} />
              </g>
            );
          })}
          <Write x={G.annX} y={L[0].AN} size={TS} text="in progress × 5" color="ink2" progress={ramp(frame, ...at(EV.annot0))} />
          <Write x={G.count(0).x} y={G.count(0).y} size={TS} text={`${shortCount} request${shortCount === 1 ? '' : 's'}`} variant="mono" color="ink2" anchor="end" opacity={fade(frame, polls[0].done, Infinity, 8)} />
        </g>
        <Playhead x={play0} l={L[0]} o={playO(SHORT.first, polls[4].done + 2) + playO(EV.tick60[0], EV.poll6Req[0])} />

        {/* ===== lane 1: long polling ===== */}
        <g opacity={lane1O}>
          <Pen d={LONG_REQ.d} progress={ramp(frame, ...at(EV.longReq))} head={LONG_REQ.head} />
          <Pen d={LONG_REQ.d} progress={ramp(frame, ...at(EV.longReq))} head={LONG_REQ.head} color="blue" opacity={1 - ramp(frame, BEAT.push, 14, EASE_FADE)} />
          <Packet d={LONG_REQ.d} progress={ramp(frame, ...at(EV.longReq), EASE_MOVE)} color="blue" r={pr} />
          {frame >= EV.held[0] ? (
            <line x1={X(0) + DX} y1={L[1].SV - 8} x2={heldX} y2={L[1].SV - 8} stroke={T.blue} strokeWidth={STROKE.thick} strokeDasharray="2 13" strokeLinecap="round" />
          ) : null}
          <Write x={G.annX} y={L[1].AN} size={TS} text="held until ready" color="ink2" progress={ramp(frame, ...at(EV.annot1))} />
          <Write x={G.count(1).x} y={G.count(1).y} size={TS} text="1 request" variant="mono" color="ink2" anchor="end" opacity={fade(frame, EV.held[0], Infinity, 8)} />
        </g>
        <Playhead x={heldX} l={L[1]} o={playO(EV.held[0], EV.held[0] + EV.held[1] + 2) + playO(EV.tick60[0], EV.longRet[0])} />

        {/* ===== lane 2: push over one open connection ===== */}
        <Pen d={CONNECT.d} progress={ramp(frame, ...at(EV.connect))} head={CONNECT.head} />
        <Pen d={CONNECT.d} progress={ramp(frame, ...at(EV.connect))} head={CONNECT.head} color="blue" opacity={1 - ramp(frame, BEAT.ready, 14, EASE_FADE)} />
        <Packet d={CONNECT.d} progress={ramp(frame, ...at(EV.connect), EASE_MOVE)} color="blue" r={pr} />
        {frame >= EV.open[0] ? (
          <line x1={X(0) + DX / 2} y1={L[2].MID} x2={openX} y2={L[2].MID} stroke={T.ink} strokeWidth={STROKE.thick + 2} strokeLinecap="round" opacity={0.55} />
        ) : null}
        <Write x={G.annX} y={L[2].AN} size={TS} text="connection kept open" color="ink2" progress={ramp(frame, ...at(EV.annot2))} />
        <Write x={G.count(2).x} y={G.count(2).y} size={TS} text="1 connection" variant="mono" color="ink2" anchor="end" opacity={fade(frame, EV.open[0], Infinity, 8)} />
        <Playhead x={openX} l={L[2]} o={playO(EV.open[0], EV.open[0] + EV.open[1] + 2) + playO(EV.tick60[0], EV.push[0])} />

        {/* ===== at 60 s: ready ===== */}
        {G.READY_LINES.map((d, i) => (
          <Pen key={i} d={d} progress={ramp(frame, ...at(EV.readyLine))} color="green" dash="9 9" width={STROKE.ink} />
        ))}
        <Write x={G.readyLbl.x} y={G.readyLbl.y} size={TS} text="ready at 60 s" color="green" anchor="middle" weight={600} progress={ramp(frame, ...at(EV.readyLabel))} />

        {/* 6th poll gets "ready" */}
        <g opacity={lane0O}>
          <Pen d={POLLS[5].req.d} progress={ramp(frame, ...at(EV.poll6Req))} head={POLLS[5].req.head} />
          <Pen d={POLLS[5].req.d} progress={ramp(frame, ...at(EV.poll6Req))} head={POLLS[5].req.head} color="blue" opacity={1 - ramp(frame, BEAT.scale, 14, EASE_FADE)} />
          <Pen d={POLLS[5].ret.d} progress={ramp(frame, ...at(EV.poll6Ret))} color="green" width={STROKE.ink + 1.4} />
          <Packet d={POLLS[5].req.d} progress={ramp(frame, ...at(EV.poll6Req))} color="blue" r={pr} />
          <Packet d={POLLS[5].ret.d} progress={ramp(frame, ...at(EV.poll6Ret))} color="green" r={pr} />
          <Write x={E60 + 2 * DX + 14} y={L[0].BR + TS * 0.33} size={TS} text="ready" color="green" weight={600} progress={ramp(frame, ...at(EV.ready0))} />
        </g>
        {/* the held request is answered */}
        <Pen d={LONG_RET.d} progress={ramp(frame, ...at(EV.longRet))} color="green" width={STROKE.ink + 1.4} />
        <Packet d={LONG_RET.d} progress={ramp(frame, ...at(EV.longRet), EASE_MOVE)} color="green" r={pr} />
        <Write x={E60 + 2 * DX + 14} y={L[1].BR + TS * 0.33} size={TS} text="ready" color="green" weight={600} progress={ramp(frame, ...at(EV.ready1))} />
        {/* the server pushes, unasked */}
        <Pen d={PUSH.d} progress={ramp(frame, ...at(EV.push))} color="green" head={PUSH.head} width={STROKE.ink + 1.4} />
        <Packet d={PUSH.d} progress={ramp(frame, ...at(EV.push), EASE_MOVE)} color="green" r={pr} />
        <Write x={E60 + 2 * DX + 14} y={L[2].BR + TS * 0.33} size={TS} text="ready" color="green" weight={600} progress={ramp(frame, ...at(EV.ready2))} />

        {/* ===== × 1M readers ===== */}
        <Write x={G.scaleLbl.x} y={G.scaleLbl.y} size={TS} text={G.ph ? '1M readers: 6M req/min' : '1M: 6M req/min'} anchor={G.scaleLbl.anchor} weight={640} progress={ramp(frame, ...at(EV.scale))} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default Polling;

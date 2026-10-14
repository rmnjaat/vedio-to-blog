// Clip l04-heartbeat-expiry — "Every beat moves the deadline": every heartbeat SETs the key with EX 30, so the
// expiry moves to 30 s after each beat; the battery dies; the store deletes the key 30 s after the last beat.
// Lane 2: one plain SET without EX clears the TTL and the user never goes offline (addition A-OOI-01, SN-02).
// Storyboard: lectures/lec04/animations/l04-heartbeat-expiry/storyboard.{yaml,md}.
// Ledger: L-0046, L-0047, L-0048, L-0062, L-0068, L-0070.
// Frame 0 = Fig 2·i panel b with Fig 2·e's laptop and friend's screen; the last frame is the annotated poster.
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {chevron, cylinder, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {PAST, fade, ghost, ramp, EASE_FADE, EASE_MOVE, EASE_PEN} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, CLOCK, EV, HB, META, SLIDE} from './timeline';

export type HeartbeatExpiryProps = {theme: ThemeName; layout?: Layout};

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: laptop -> api -> redis -> friend's screen in one row; lane 1 (EX 30) and lane 2 (no EX) below.
// phone 720×1000: laptop -> api -> redis on row 1, the friend's screen under redis on row 2; lanes stacked full width,
// titles above the tracks, "sped up" on its own line clear of the tick labels, lane 2's "online" under its end dot.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const TS = typeFor(layout).label;
  const X = (sec: number) => (ph ? 110 + 10.5 * sec : 260 + 14 * sec);
  const g = ph
    ? {
        W: META.phone.width, H: META.phone.height,
        topY: 48, hbLbl: {x: 20, anchor: 'start' as const}, setX: 312,
        laptop: {x: 20, y: 92, w: 112, h: 68, base: [[8, 174], [20, 160], [132, 160], [144, 174], [8, 174]] as Pt[]},
        batt: {cx: 76, cy: 126, w: 40, h: 20},
        api: {x: 230, y: 100, w: 90, h: 60},
        a1: [[140, 130], [224, 130]] as Pt[], a2: [[326, 130], [420, 130]] as Pt[],
        redis: {cx: 520, top: 96, rx: 96, ry: 20, h: 118},
        key: {x: 446, y: 120, w: 148, h: 44, tx: 458, ty: 152}, clock: {cx: 568, cy: 142, r: 14},
        ttl: {x: 520, y: 202},
        scr: {x: 440, y: 300, w: 260, h: 84, stand: 404}, dot: {cx: 478, cy: 342, r: 13}, status: {x: 502, y: 352},
        lblY: 268, laptopLbl: 76, redisLbl: 520, friend: {x: 422, y: 352, anchor: 'end' as const},
        dies: {x: 20, y: 312},
        l1: {axis: 515, lbl: 474, br: 492, m0: 498, m1: 527, tick: 562, title: {x: 20, y: 474}, sped: {x: 20, y: 626}, a0: 90, a1: 660},
        l2: {axis: 740, lbl: 700, title: {x: 20, y: 700}, a0: 90, a1: 660, end: {cx: 694, r: 11, ring: 19}, online: {x: 712, y: 790, anchor: 'end' as const}},
        noExpX: 498, setOff: 8, xs: 10, dr: 7, pr: 8, caption: 822,
      }
    : {
        W: META.width, H: META.height,
        topY: 62, hbLbl: {x: 26, anchor: 'start' as const}, setX: 334,
        laptop: {x: 40, y: 100, w: 140, h: 90, base: [[24, 206], [40, 190], [180, 190], [196, 206], [24, 206]] as Pt[]},
        batt: {cx: 110, cy: 145, w: 52, h: 26},
        api: {x: 290, y: 110, w: 110, h: 80},
        a1: [[190, 150], [284, 150]] as Pt[], a2: [[406, 150], [536, 150]] as Pt[],
        redis: {cx: 650, top: 112, rx: 110, ry: 22, h: 150},
        key: {x: 572, y: 140, w: 156, h: 50, tx: 588, ty: 178}, clock: {cx: 700, cy: 165, r: 17},
        ttl: {x: 650, y: 240},
        scr: {x: 900, y: 100, w: 250, h: 120, stand: 244}, dot: {cx: 946, cy: 160, r: 16}, status: {x: 976, y: 174},
        lblY: 320, laptopLbl: 110, redisLbl: 650, friend: {x: 1025, y: 320, anchor: 'middle' as const},
        dies: {x: 40, y: 364},
        l1: {axis: 440, lbl: 392, br: 410, m0: 418, m1: 454, tick: 494, title: {x: 40, y: 453}, sped: {x: 40, y: 494}, a0: 240, a1: 1020},
        l2: {axis: 596, lbl: 556, title: {x: 40, y: 609}, a0: 240, a1: 1020, end: {cx: 1100, r: 14, ring: 24}, online: {x: 1100, y: 556, anchor: 'middle' as const}},
        noExpX: 790, setOff: 12, xs: 13, dr: 9, pr: 10, caption: 652,
      };
  const hs = ph ? 13 : 16;
  const arrow = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
  };
  const cross = (cx: number, cy: number, s: number, seed: string) =>
    `${handLine([cx - s, cy - s], [cx + s, cy + s], seed + 'a')} ${handLine([cx + s, cy - s], [cx - s, cy + s], seed + 'b')}`;
  const {laptop, batt, scr, l1, l2} = g;
  const cyl = cylinder(g.redis.cx, g.redis.top, g.redis.rx, g.redis.ry, g.redis.h, 'redis');
  const bx = batt.cx - batt.w / 2;
  const by = batt.cy - batt.h / 2;
  // the bracket and the expiry marker are drawn once at 0 s -> 30 s and translated as the expiry moves
  const BR = handPoly([[X(0), l1.br + 9], [X(0), l1.br], [X(30), l1.br], [X(30), l1.br + 9]], 'br');
  const MARK = handLine([X(30), l1.m0], [X(30), l1.m1], 'mk');
  return {
    ph, TS, X, ...g,
    LAPTOP: serverBox(laptop.x, laptop.y, laptop.w, laptop.h, 'lap'),
    LAPTOP_BASE: handPoly(laptop.base, 'lapb'),
    BATT: serverBox(bx, by, batt.w, batt.h, 'bat'),
    BATT_NUB: handLine([bx + batt.w + 3, batt.cy - batt.h / 4], [bx + batt.w + 3, batt.cy + batt.h / 4], 'nub'),
    BATT_BARS: [0, 1, 2].map((i) => ({x: bx + 5 + i * ((batt.w - 10) / 3), y: by + 5, w: (batt.w - 10) / 3 - 3, h: batt.h - 10})),
    BATT_X: cross(batt.cx, batt.cy, batt.h * 0.75, 'bx'),
    API: serverBox(g.api.x, g.api.y, g.api.w, g.api.h, 'api'),
    A1: arrow(g.a1, 'a1'),
    A2: arrow(g.a2, 'a2'),
    CYL: cyl,
    KEY: serverBox(g.key.x, g.key.y, g.key.w, g.key.h, 'key'),
    KEY_X: cross(g.key.x + g.key.w / 2, g.key.y + g.key.h / 2, g.key.h * 0.36, 'kx'),
    SCR: serverBox(scr.x, scr.y, scr.w, scr.h, 'scr'),
    STAND: `${handLine([scr.x + scr.w / 2, scr.y + scr.h], [scr.x + scr.w / 2, scr.stand], 'st')} ${handLine([scr.x + scr.w / 2 - 36, scr.stand], [scr.x + scr.w / 2 + 36, scr.stand], 'sb')}`,
    AX1: arrow([[l1.a0, l1.axis], [l1.a1, l1.axis]], 'ax1'),
    TICKS: [0, 10, 20, 30, 40, 50].map((s) => handLine([X(s), l1.axis], [X(s), l1.axis + 10], `t${s}`)).join(' '),
    BR, MARK,
    DEATH1: cross(X(22), l1.axis, g.xs, 'd1'),
    EXP1: cross(X(50), l1.axis, g.xs, 'e1'),
    AX2: arrow([[l2.a0, l2.axis], [l2.a1, l2.axis]], 'ax2'),
    SPAN: arrow([[X(20), l2.axis - 12], [l2.a1, l2.axis - 12]], 'sp'),
    DEATH2: cross(X(22), l2.axis, g.xs, 'd2'),
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;
const clockAt = (f: number) =>
  interpolate(f, CLOCK.f as unknown as number[], CLOCK.t as unknown as number[], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** Clock face with a wedge for the time left (frac 1 = full 30 s) and one hand at the wedge's edge. */
const Timer: React.FC<{cx: number; cy: number; r: number; frac: number; ink: string; sheet: string}> = ({cx, cy, r, frac, ink, sheet}) => {
  const a = -Math.PI / 2 + 2 * Math.PI * Math.max(0, Math.min(1, frac));
  const ex = cx + r * Math.cos(a);
  const ey = cy + r * Math.sin(a);
  const large = frac > 0.5 ? 1 : 0;
  const wedge = frac >= 0.999 ? null : frac <= 0.001 ? null : `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={sheet} stroke={ink} strokeWidth={STROKE.thin + 0.6} />
      {frac >= 0.999 ? <circle cx={cx} cy={cy} r={r - 2} fill={ink} opacity={0.22} /> : wedge ? <path d={wedge} fill={ink} opacity={0.22} /> : null}
      <line x1={cx} y1={cy} x2={cx + (r - 3) * Math.cos(a)} y2={cy + (r - 3) * Math.sin(a)} stroke={ink} strokeWidth={STROKE.thin + 0.4} strokeLinecap="round" />
    </g>
  );
};

export const HeartbeatExpiry: React.FC<HeartbeatExpiryProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const {X, TS, l1, l2} = G;
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const at = (r: readonly [number, number]) => r;

  // ---- story clock, last heartbeat, expiry ----
  const clock = clockAt(frame);
  const last = frame >= HB[1].arrive ? 20 : frame >= HB[0].arrive ? 10 : 0;
  const ttlLeft = Math.max(0, last + 30 - clock);
  const ttl = Math.max(0, Math.ceil(ttlLeft - 1e-6));
  const shift = 10 * ramp(frame, HB[0].slide, SLIDE, EASE_MOVE) + 10 * ramp(frame, HB[1].slide, SLIDE, EASE_MOVE);
  const dx = X(shift) - X(0);

  // ---- focus: diagram + lane 1 ghost while lane 2 is told, and come back for the comparison ----
  const focus = frame < BEAT.end ? ghost(frame, BEAT.noEx) : PAST + (1 - PAST) * ramp(frame, BEAT.end, 12, EASE_FADE);
  const laptopO = Math.min(focus, ghost(frame, EV.laptopGhost[0], EV.laptopGhost[1]));

  const keyGone = ramp(frame, ...at(EV.keyStrike), EASE_PEN);
  const keyOut = 1 - ramp(frame, EV.deleted[0], 10, EASE_FADE);
  const dotOff = ramp(frame, ...at(EV.dot), EASE_FADE);
  const playO = fade(frame, CLOCK.f[0] - 4, EV.expiredMark[0] + 8, 6, 10);

  return (
    <Sheet theme={theme}>
      <Stage title="Every beat moves the deadline" desc={META.alt} width={G.W} height={G.H}>
        {/* ===================== top diagram ===================== */}
        <g opacity={focus}>
          {/* api, redis, friend's screen */}
          <Ink d={G.API} fill={T.sheet} />
          <Write x={G.api.x + G.api.w / 2} y={G.api.y + G.api.h / 2 + TS * 0.33} text="api" size={TS} variant="mono" anchor="middle" />
          <path d={G.CYL.bodyFill} fill={T.sheet} />
          <Ink d={G.CYL.sides} />
          <Ink d={G.CYL.front} />
          <Ink d={G.CYL.top} fill={T.sheet} />
          <Write x={G.redisLbl} y={G.lblY} text="redis" size={TS} variant="mono" anchor="middle" />
          <Ink d={G.SCR} fill={T.sheet} />
          <Ink d={G.STAND} />
          <Write x={G.friend.x} y={G.friend.y} text="friend sees" size={TS} color="ink2" anchor={G.friend.anchor} />

          {/* the key u42 with its TTL timer */}
          <Ink d={G.KEY} opacity={1 - ramp(frame, EV.keyStrike[0], 10, EASE_FADE)} />
          {/* the struck key fades out and "deleted" is written in its place (never on top of the struck key) */}
          <g opacity={keyOut}>
            <Pen d={G.KEY} progress={keyGone} dash="10 9" />
            <g opacity={ghost(frame, EV.keyStrike[0] + 6)}>
              <Write x={G.key.tx} y={G.key.ty} text="u42" size={TS} variant="mono" />
              <Timer cx={G.clock.cx} cy={G.clock.cy} r={G.clock.r} frac={ttlLeft / 30} ink={T.ink} sheet={T.sheet} />
            </g>
            <Pen d={G.KEY_X} progress={ramp(frame, EV.keyStrike[0] + 12, 12)} width={STROKE.ink} />
          </g>
          <Write x={G.ttl.x} y={G.ttl.y} text={`ttl ${ttl}s`} size={TS} variant="mono" anchor="middle" opacity={keyOut} />
          {/* the write lands: the reset ttl is inked blue for a moment, then settles back to graphite */}
          {HB.map((h, i) => (
            <Write key={i} x={G.ttl.x} y={G.ttl.y} text="ttl 30s" size={TS} variant="mono" color="blue" anchor="middle" opacity={fade(frame, h.arrive, h.arrive + 24, 4, 14)} />
          ))}
          <Write x={G.key.x + G.key.w / 2} y={G.key.ty} text="deleted" size={TS} anchor="middle" progress={ramp(frame, EV.deleted[0] + 10, EV.deleted[1] - 10)} />

          {/* friend's status dot: green while the key exists, the graphite ring once it is gone */}
          <circle cx={G.dot.cx} cy={G.dot.cy} r={G.dot.r} fill={T.green} opacity={1 - dotOff} />
          <circle cx={G.dot.cx} cy={G.dot.cy} r={G.dot.r - 1.5} fill="none" stroke={T.ink} strokeWidth={STROKE.ink} opacity={dotOff} />
          <Write x={G.status.x} y={G.status.y} text="online" size={TS} color="green" weight={600} opacity={1 - ramp(frame, EV.status[0], 10, EASE_FADE)} />
          <Write x={G.status.x} y={G.status.y} text="offline" size={TS} progress={ramp(frame, EV.status[0] + 6, EV.status[1] - 6)} />

          {/* request labels */}
          <Write x={G.setX} y={G.topY} text="SET u42 1 EX 30" size={TS} variant="mono" color="blue" />
        </g>

        {/* laptop + its arrow: ghost when the battery dies; their labels stay at full ink so they read on the phone */}
        <g opacity={focus}>
          <Write x={G.laptopLbl} y={G.lblY} text="laptop" size={TS} anchor="middle" />
          <Write x={G.hbLbl.x} y={G.topY} text="heartbeat" size={TS} color="blue" anchor={G.hbLbl.anchor} />
        </g>
        <g opacity={laptopO}>
          <Ink d={G.LAPTOP} fill={T.sheet} />
          <Ink d={G.LAPTOP_BASE} fill={T.sheet} />
          <Ink d={G.A1.d} />
          <Ink d={G.A1.head} />
        </g>
        <g opacity={focus}>
          <Ink d={G.A2.d} />
          <Ink d={G.A2.head} />
          {/* heartbeats 1 and 2: the pen re-inks the path blue as the packet travels */}
          {HB.map((h, i) => {
            const p1 = ramp(frame, h.send, h.hop, EASE_MOVE);
            const p2 = ramp(frame, h.send + h.hop, h.hop, EASE_MOVE);
            const off = 1 - ramp(frame, h.arrive + 8, 14, EASE_FADE);
            return (
              <g key={i}>
                <Pen d={G.A1.d} progress={p1} head={G.A1.head} color="blue" opacity={off} />
                <Pen d={G.A2.d} progress={p2} head={G.A2.head} color="blue" opacity={off} />
                <Packet d={G.A1.d} progress={p1} color="blue" r={G.pr} />
                <Packet d={G.A2.d} progress={p2} color="blue" r={G.pr} />
              </g>
            );
          })}
          {/* the battery stays readable: red outline and cross once dead */}
          <g opacity={laptopO}>
            <Ink d={G.BATT} width={STROKE.thin + 0.8} />
            <Ink d={G.BATT_NUB} width={STROKE.thin + 0.8} />
            {G.BATT_BARS.map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={T.ink} opacity={0.75} />
            ))}
          </g>
          <g opacity={ramp(frame, EV.battery[0], 8, EASE_FADE)}>
            <path d={G.BATT} fill={T.sheet} stroke={T.red} strokeWidth={STROKE.thin + 0.8} strokeLinecap="round" />
            <Ink d={G.BATT_NUB} color="red" width={STROKE.thin + 0.8} />
          </g>
          <Pen d={G.BATT_X} progress={ramp(frame, EV.battery[0] + 4, EV.battery[1] - 4)} color="red" width={STROKE.ink} />
          <Write x={G.dies.x} y={G.dies.y} text="battery dies" size={TS} color="red" weight={600} progress={ramp(frame, ...at(EV.deathLabel))} />
        </g>

        {/* ===================== lane 1: SET … EX 30 ===================== */}
        <g opacity={focus}>
          <Ink d={G.AX1.d} color="ink2" width={STROKE.thin + 0.6} />
          <Ink d={G.AX1.head} color="ink2" width={STROKE.thin + 0.6} />
          <Ink d={G.TICKS} color="ink2" width={STROKE.thin} />
          {[0, 10, 20, 30, 40, 50].map((s) => (
            <Write key={s} x={X(s)} y={l1.tick} text={`${s} s`} size={TS} variant="mono" color="ink2" anchor="middle" />
          ))}
          <Write x={l1.title.x} y={l1.title.y} text="EX 30" size={TS} variant="mono" weight={600} />
          <Write x={l1.sped.x} y={l1.sped.y} text="sped up" size={TS} color="ink2" />

          {/* expiry markers left behind (ghosted) */}
          {HB.map((h, i) =>
            frame >= h.slide ? (
              <g key={i} transform={`translate(${X(10 * i) - X(0)} 0)`}>
                <Ink d={G.MARK} dash="8 8" width={STROKE.thin + 0.8} opacity={PAST} />
              </g>
            ) : null,
          )}
          {/* the live expiry marker and the 30 s bracket from the last beat */}
          <g transform={`translate(${dx} 0)`}>
            <Ink d={G.MARK} dash="8 8" width={STROKE.ink} />
            <Write x={X(30)} y={l1.lbl} text="expires" size={TS} anchor="middle" />
            <Ink d={G.BR} color="ink2" width={STROKE.thin + 0.6} />
            <Write x={X(15)} y={l1.lbl} text="30 s" size={TS} color="ink2" anchor="middle" />
          </g>
          {/* beats on the track */}
          <circle cx={X(0)} cy={l1.axis} r={G.dr} fill={T.blue} />
          {HB.map((h, i) => (
            <circle key={i} cx={X(10 * (i + 1))} cy={l1.axis} r={G.dr} fill={T.blue} opacity={fade(frame, h.arrive, Infinity, 8)} />
          ))}
          <Pen d={G.DEATH1} progress={ramp(frame, ...at(EV.deathMark))} color="red" width={STROKE.ink} />
          <Pen d={G.EXP1} progress={ramp(frame, ...at(EV.expiredMark))} width={STROKE.ink} />
        </g>
        {/* playhead: "now" on the story clock */}
        {playO > 0 ? (
          <line x1={X(clock)} y1={l1.axis - 26} x2={X(clock)} y2={l1.axis + 20} stroke={T.ink2} strokeWidth={STROKE.thin + 0.6} strokeLinecap="round" opacity={playO * focus} />
        ) : null}

        {/* ===================== lane 2: one SET without EX ===================== */}
        <Write x={l2.title.x} y={l2.title.y} text="no EX" size={TS} variant="mono" color="red" weight={600} progress={ramp(frame, ...at(EV.l2Title))} />
        <Pen d={G.AX2.d} progress={ramp(frame, ...at(EV.l2Axis))} color="ink2" width={STROKE.thin + 0.6} />
        {[0, 10].map((s, i) => (
          <circle key={s} cx={X(s)} cy={l2.axis} r={G.dr} fill={T.blue} opacity={fade(frame, EV.l2Beats[0] + 6 * i, Infinity, 8)} />
        ))}
        <circle cx={X(20)} cy={l2.axis} r={G.dr} fill={T.red} opacity={fade(frame, EV.l2Set[0], Infinity, 8)} />
        <Write x={X(20) - G.setOff} y={l2.lbl} text="SET u42 1" size={TS} variant="mono" color="red" weight={560} progress={ramp(frame, ...at(EV.l2Set))} />
        <Pen d={G.SPAN.d} progress={ramp(frame, ...at(EV.l2Span), LIN)} head={G.SPAN.head} color="red" dash="12 10" width={STROKE.thick} />
        <Write x={G.noExpX} y={l2.lbl} text="no expiry" size={TS} color="red" weight={600} progress={ramp(frame, ...at(EV.l2NoExp))} />
        <Pen d={G.DEATH2} progress={ramp(frame, ...at(EV.l2Death))} color="red" width={STROKE.ink} />
        <circle cx={l2.end.cx} cy={l2.axis} r={l2.end.r} fill={T.green} opacity={fade(frame, EV.l2Dot[0], Infinity, EV.l2Dot[1])} />
        {frame >= EV.l2Ring[0] ? (
          <circle cx={l2.end.cx} cy={l2.axis} r={l2.end.ring} fill="none" stroke={T.red} strokeWidth={STROKE.ink}
            strokeDasharray={`${2 * Math.PI * l2.end.ring * ramp(frame, ...at(EV.l2Ring))} 999`} strokeLinecap="round"
            transform={`rotate(-90 ${l2.end.cx} ${l2.axis})`} />
        ) : null}
        <Write x={l2.online.x} y={l2.online.y} text="online" size={TS} color="green" weight={600} anchor={l2.online.anchor} progress={ramp(frame, ...at(EV.l2Online))} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.caption} layout={layout} />
    </Sheet>
  );
};

export default HeartbeatExpiry;

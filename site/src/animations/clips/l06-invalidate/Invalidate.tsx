// Clip l06-invalidate — "The old face lingers".
// Storyboard: lectures/lec06/animations/l06-invalidate/storyboard.{yaml,md}. Ledger: L-0126, L-0127, L-0128, L-0129.
// Frame 0 = Fig 3·b panel b (user 2 -> cdn -> api -> db + s3, user 1 above the api, kafka + the invalidation worker)
// with an empty two-lane time track; the last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×990, portrait re-flow, ≤ 640 px).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {chevron, cylinder, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useTheme, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META} from './timeline';
import {cloud, pipe, stickFigure} from './glyphs';

export type InvalidateProps = {theme: ThemeName; layout?: Layout};

type Box = {x: number; y: number; w: number; h: number};
const LIN = Easing.linear;

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const s = ph ? 0.85 : 1; // glyph scale
  const head = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return chevron(pts[pts.length - 1], ux, uy, ph ? 16 : 20, seed);
  };
  const arrow = (pts: Pt[], seed: string) => ({d: handPoly(pts, seed), head: head(pts, seed + 'h')});

  const L = ph
    ? {
        user2: {cx: 52, headY: 196, label: {x: 52, y: 318}},
        cdn: {cx: 248, cy: 236, w: 184, h: 112},
        cdnLbl: {x: 206, y: 246},
        card: {x: 240, y: 214, w: 66, h: 42} as Box,
        oldLbl: {x: 273, y: 160},
        api: {x: 400, y: 204, w: 120, h: 64} as Box,
        user1: {cx: 460, headY: 40, label: {x: 428, y: 78}},
        v2Lbl: {x: 476, y: 176},
        db: {cx: 636, top: 210, rx: 44, ry: 11, h: 46, label: {x: 636, y: 186}, v: {x: 636, y: 256}},
        s3: {cx: 626, cy: 370, w: 160, h: 104, label: {x: 626, y: 360}, v1: {x: 600, y: 400}, v2: {x: 652, y: 400}},
        pipe: {x0: 310, x1: 530, cy: 468, h: 36, label: {x: 420, y: 478}},
        evLbl: {x: 310, y: 530, anchor: 'start' as const},
        worker: {x: 24, y: 424, w: 238, h: 88} as Box,
        workerLbl: [{x: 143, y: 460, t: 'cdn'}, {x: 143, y: 496, t: 'invalidation'}],
        purgeLbl: {x: 204, y: 372},
        missLbl: {x: 370, y: 194},
        REQ: [[84, 236], [150, 236]] as Pt[],
        ORIGIN: [[342, 236], [398, 236]] as Pt[],
        UP: [[460, 132], [460, 200]] as Pt[],
        TO_DB: [[522, 232], [590, 232]] as Pt[],
        TO_S3: [[505, 270], [505, 372], [550, 372]] as Pt[],
        TO_KAFKA: [[440, 270], [440, 446]] as Pt[],
        PULL: [[264, 468], [306, 468]] as Pt[],
        PURGE: [[190, 420], [190, 298]] as Pt[],
        // track
        laneY: [636, 754] as const,
        laneTitle: [{x: 24, y: 600}, {x: 24, y: 718}],
        X0: 24,
        X1: 700,
        PRE_X: [70, 130],
        CHANGE_X: 250,
        TTL_X: 610,
        REFILL_X: 662,
        PURGE_X: 292,
        changeTop: 612,
        changeBot: 778,
        changeLbl: {x: 240, y: 812, anchor: 'end' as const},
        ttlLbl: {x: 700, y: 600, anchor: 'end' as const},
        staleLbl: {x: 430, y: 676},
        purgeMarkLbl: {x: 304, y: 724, anchor: 'start' as const},
        axisLbl: {x: 700, y: 812},
        tick: 11,
        captionTop: 846,
      }
    : {
        user2: {cx: 80, headY: 160, label: {x: 80, y: 296}},
        cdn: {cx: 330, cy: 203, w: 210, h: 116},
        cdnLbl: {x: 282, y: 217},
        card: {x: 330, y: 178, w: 74, h: 50} as Box,
        oldLbl: {x: 367, y: 128},
        api: {x: 570, y: 170, w: 140, h: 66} as Box,
        user1: {cx: 640, headY: 26, label: {x: 606, y: 64}},
        v2Lbl: {x: 658, y: 154},
        db: {cx: 862, top: 158, rx: 50, ry: 12, h: 54, label: {x: 862, y: 134}, v: {x: 862, y: 212}},
        s3: {cx: 1068, cy: 218, w: 180, h: 124, label: {x: 1068, y: 206}, v1: {x: 1038, y: 250}, v2: {x: 1098, y: 250}},
        pipe: {x0: 520, x1: 800, cy: 374, h: 44, label: {x: 660, y: 387}},
        evLbl: {x: 818, y: 388, anchor: 'start' as const},
        worker: {x: 140, y: 326, w: 290, h: 100} as Box,
        workerLbl: [{x: 285, y: 366, t: 'cdn'}, {x: 285, y: 408, t: 'invalidation'}],
        purgeLbl: {x: 316, y: 314},
        missLbl: {x: 504, y: 186},
        REQ: [[116, 203], [224, 203]] as Pt[],
        ORIGIN: [[438, 203], [566, 203]] as Pt[],
        UP: [[640, 120], [640, 166]] as Pt[],
        TO_DB: [[712, 193], [808, 193]] as Pt[],
        TO_S3: [[690, 238], [690, 262], [1004, 262]] as Pt[],
        TO_KAFKA: [[640, 238], [640, 348]] as Pt[],
        PULL: [[432, 374], [514, 374]] as Pt[],
        PURGE: [[300, 324], [300, 268]] as Pt[],
        laneY: [488, 572] as const,
        laneTitle: [{x: 30, y: 502}, {x: 30, y: 586}],
        X0: 300,
        X1: 1168,
        PRE_X: [340, 392],
        CHANGE_X: 440,
        TTL_X: 1060,
        REFILL_X: 1118,
        PURGE_X: 492,
        changeTop: 466,
        changeBot: 596,
        changeLbl: {x: 452, y: 458, anchor: 'start' as const},
        ttlLbl: {x: 1168, y: 458, anchor: 'end' as const},
        staleLbl: {x: 790, y: 536},
        purgeMarkLbl: {x: 492, y: 624, anchor: 'middle' as const},
        axisLbl: {x: 1168, y: 624},
        tick: 13,
        captionTop: 652,
      };

  // where on lane A the playhead is at a frame (linear: its speed means time)
  const px = (frame: number) => L.CHANGE_X + (L.TTL_X - L.CHANGE_X) * ramp(frame, EV.playhead[0], EV.playhead[1], LIN);
  const STALE_X = EV.stale.map((r) => px(r.resp[0] + r.resp[1]));

  const u1 = stickFigure(L.user1.cx, L.user1.headY, s, 'u1');
  const u2 = stickFigure(L.user2.cx, L.user2.headY, s, 'u2');
  const db = cylinder(L.db.cx, L.db.top, L.db.rx, L.db.ry, L.db.h, 'db');
  const pp = pipe(L.pipe.x0, L.pipe.x1, L.pipe.cy, L.pipe.h, 'kafka');
  const laneD = L.laneY.map((y, i) => handLine([L.X0, y], [L.X1, y], `lane${i}`));
  const laneHead = L.laneY.map((y, i) => chevron([L.X1, y], 1, 0, 14, `lh${i}`));

  return {
    ph,
    W,
    H,
    TY,
    L,
    px,
    STALE_X,
    u1,
    u2,
    db,
    pp,
    laneD,
    laneHead,
    CDN_D: cloud(L.cdn.cx, L.cdn.cy, L.cdn.w, L.cdn.h, 'cdn'),
    S3_D: cloud(L.s3.cx, L.s3.cy, L.s3.w, L.s3.h, 's3', 8),
    API_D: serverBox(L.api.x, L.api.y, L.api.w, L.api.h, 'api'),
    WORKER_D: serverBox(L.worker.x, L.worker.y, L.worker.w, L.worker.h, 'worker'),
    CARD_D: serverBox(L.card.x, L.card.y, L.card.w, L.card.h, 'card'),
    REQ: arrow(L.REQ, 'req'),
    ORIGIN: arrow(L.ORIGIN, 'origin'),
    UP: arrow(L.UP, 'up'),
    TO_DB: arrow(L.TO_DB, 'todb'),
    TO_S3: arrow(L.TO_S3, 'tos3'),
    TO_KAFKA: arrow(L.TO_KAFKA, 'tokafka'),
    PULL: arrow(L.PULL, 'pull'),
    PURGE: arrow(L.PURGE, 'purge'),
    CHANGE_D: handLine([L.CHANGE_X, L.changeTop], [L.CHANGE_X, L.changeBot], 'change'),
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const DASH = '13 10';

// ---------- small glyphs ----------
/** A served request stamped on a lane: ✓ (right photo, green) or ✕ (old photo, red). Fades in over 8 f. */
const Tick: React.FC<{x: number; y: number; r: number; at: number; kind: 'ok' | 'stale'; opacity?: number}> = ({x, y, r, at, kind, opacity = 1}) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  const o = ramp(frame, at, 8, EASE_FADE) * opacity;
  if (o <= 0) return null;
  const c = kind === 'ok' ? t.green : t.red;
  const k = r * 0.72;
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={r + 2} fill={t.sheet} />
      {kind === 'ok' ? (
        <path d={`M ${x - k} ${y + 1} L ${x - k * 0.25} ${y + k * 0.8} L ${x + k} ${y - k * 0.9}`} fill="none" stroke={c} strokeWidth={STROKE.ink + 0.8} strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M ${x - k} ${y - k} L ${x + k} ${y + k} M ${x + k} ${y - k} L ${x - k} ${y + k}`} stroke={c} strokeWidth={STROKE.ink + 0.8} strokeLinecap="round" />
      )}
    </g>
  );
};

/** A request round trip on the visitor's line: blue pen + packet in, a coloured photo packet back. */
const RoundTrip: React.FC<{d: string; head: string; req: readonly [number, number]; resp: readonly [number, number]; back: MarkerColor; blueOut: number}> = ({
  d,
  head,
  req,
  resp,
  back,
  blueOut,
}) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, req[0], req[1], EASE_MOVE);
  const q = ramp(frame, resp[0], resp[1], EASE_MOVE);
  const blueO = 1 - ramp(frame, blueOut, 10, EASE_FADE);
  return (
    <g>
      <Pen d={d} progress={p} color="blue" head={head} opacity={blueO} />
      <Packet d={d} progress={p} color="blue" />
      <Packet d={reversePath(d)} progress={q} color={back} />
    </g>
  );
};

export const Invalidate: React.FC<InvalidateProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const {L, TY} = G;
  const LB = TY.label;
  const MO = TY.mono;
  const at = (r: readonly [number, number]) => r;

  // ---- card in the cdn ----
  const oldO = ramp(frame, ...at(EV.cdnOld), EASE_FADE); // ink outline -> red dashed
  const cardGone = 1 - ramp(frame, ...at(EV.cardGone), EASE_FADE);
  const v2On = ramp(frame, ...at(EV.cardV2), EASE_FADE);
  const slotO = fade(frame, EV.cardGone[0] + 4, EV.cardV2[0], 8, 8); // empty dashed slot while the cdn has nothing
  const crossO = ramp(frame, EV.purged, 8, EASE_FADE) * cardGone;
  const cx = L.card.x + L.card.w / 2;
  const cy = L.card.y + L.card.h / 2;

  // ---- blue re-ink of each step, back to ink when its beat ends ----
  const blueUntil = (end: number) => 1 - ramp(frame, end, 14, EASE_FADE);

  // ---- lane A (TTL only) ----
  const phX = G.px(frame);
  const playO = fade(frame, EV.playhead[0], EV.ttlMark + 6, 8, 10);
  const spanA = frame >= EV.playhead[0] ? phX - L.CHANGE_X : 0;
  // ---- lane B (with purge) ----
  const sliverP = ramp(frame, EV.purged, 8, EASE_FADE);

  const [LA, LBy] = G.L.laneY;
  const R = L.tick;

  return (
    <Sheet theme={theme}>
      <Stage title="The old face lingers" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {/* arrows first, glyphs (filled with the sheet) on top */}
        <Ink d={G.REQ.d} />
        <Ink d={G.REQ.head} />
        <Ink d={G.ORIGIN.d} />
        <Ink d={G.ORIGIN.head} />
        <Ink d={G.UP.d} />
        <Ink d={G.UP.head} />
        <Ink d={G.TO_DB.d} />
        <Ink d={G.TO_DB.head} />
        <Ink d={G.TO_S3.d} />
        <Ink d={G.TO_S3.head} />
        <Ink d={G.TO_KAFKA.d} dash={DASH} />
        <Ink d={G.TO_KAFKA.head} />
        <Ink d={G.PULL.d} />
        <Ink d={G.PULL.head} />
        <Ink d={G.PURGE.d} dash={DASH} />
        <Ink d={G.PURGE.head} />

        {/* user 2 (the visitor) and user 1 (the photo's owner) */}
        <circle cx={G.u2.head.cx} cy={G.u2.head.cy} r={G.u2.head.r} fill={T.sheet} stroke={T.ink} strokeWidth={STROKE.ink} />
        <Ink d={G.u2.body} />
        <Write x={L.user2.label.x} y={L.user2.label.y} text="user 2" size={LB} anchor="middle" />
        <circle cx={G.u1.head.cx} cy={G.u1.head.cy} r={G.u1.head.r} fill={T.sheet} stroke={T.ink} strokeWidth={STROKE.ink} />
        <Ink d={G.u1.body} />
        <Write x={L.user1.label.x} y={L.user1.label.y} text="user 1" size={LB} anchor="end" />

        {/* cdn cloud with its cached copy */}
        <Ink d={G.CDN_D} fill={T.sheet} />
        <Write x={L.cdnLbl.x} y={L.cdnLbl.y} text="cdn" variant="mono" size={MO} anchor="middle" />

        {/* origin: api, db, s3 */}
        <Ink d={G.API_D} fill={T.sheet} />
        <Write x={L.api.x + L.api.w / 2} y={L.api.y + L.api.h / 2 + MO * 0.34} text="api" variant="mono" size={MO} anchor="middle" />
        <path d={G.db.bodyFill} fill={T.sheet} stroke="none" />
        <Ink d={G.db.sides} />
        <Ink d={G.db.front} />
        <Ink d={G.db.top} fill={T.sheet} />
        <Write x={L.db.label.x} y={L.db.label.y} text="db" variant="mono" size={MO} anchor="middle" />
        <Ink d={G.S3_D} fill={T.sheet} />
        <Write x={L.s3.label.x} y={L.s3.label.y} text="s3" variant="mono" size={MO} anchor="middle" />
        <Write x={L.s3.v1.x} y={L.s3.v1.y} text="v1" variant="mono" size={MO} anchor="middle" />

        {/* kafka pipe and the invalidation worker */}
        <path d={G.pp.fill} fill={T.sheet} stroke="none" />
        <Ink d={G.pp.sides} />
        <Ink d={G.pp.left} fill={T.sheet} />
        <Ink d={G.pp.right} fill={T.sheet} />
        <Write x={L.pipe.label.x} y={L.pipe.label.y} text="kafka" variant="mono" size={MO} anchor="middle" />
        <Ink d={G.WORKER_D} fill={T.sheet} />
        {L.workerLbl.map((w) => (
          <Write key={w.t} x={w.x} y={w.y} text={w.t} size={LB} anchor="middle" />
        ))}

        {/* time track: two lanes */}
        {G.laneD.map((d, i) => (
          <g key={i}>
            <Ink d={d} width={STROKE.thin + 0.6} color="ink2" />
            <Ink d={G.laneHead[i]} width={STROKE.thin + 0.6} color="ink2" />
          </g>
        ))}
        <Write x={L.laneTitle[0].x} y={L.laneTitle[0].y} text="TTL only" size={LB} />
        <Write x={L.laneTitle[1].x} y={L.laneTitle[1].y} text="with purge" size={LB} />
        <Write x={L.axisLbl.x} y={L.axisLbl.y} text="time (not to scale)" size={LB} color="ink2" anchor="end" />

        {/* ===== the cached photo (card) ===== */}
        <g opacity={cardGone}>
          <Ink d={G.CARD_D} fill={T.sheet} opacity={1 - oldO} />
          <Ink d={G.CARD_D} color="red" dash="9 7" opacity={oldO} />
          <Write x={cx} y={cy + MO * 0.34} text="v1" variant="mono" size={MO} anchor="middle" />
        </g>
        {crossO > 0 ? (
          <path
            d={`M ${cx - 22} ${cy - 22} L ${cx + 22} ${cy + 22} M ${cx + 22} ${cy - 22} L ${cx - 22} ${cy + 22}`}
            stroke={T.red}
            strokeWidth={STROKE.ink + 1.4}
            strokeLinecap="round"
            opacity={crossO}
          />
        ) : null}
        <Ink d={G.CARD_D} color="ink3" dash="7 7" opacity={slotO} width={STROKE.thin + 0.6} />
        <g opacity={v2On}>
          <Ink d={G.CARD_D} color="green" fill={T.sheet} />
        </g>
        <Write x={cx} y={cy + MO * 0.34} text="v2" variant="mono" size={MO} color="green" anchor="middle" progress={ramp(frame, ...at(EV.cardV2))} />
        <Write x={L.oldLbl.x} y={L.oldLbl.y} text="old" color="red" size={LB} anchor="middle" progress={ramp(frame, ...at(EV.oldLabel))} opacity={cardGone} />

        {/* ===== B1: hits ===== */}
        {EV.hits.map((h, i) => (
          <RoundTrip key={`h${i}`} d={G.REQ.d} head={G.REQ.head} req={h.req} resp={h.resp} back="green" blueOut={h.resp[0]} />
        ))}

        {/* ===== B2: user 1 uploads v2 ===== */}
        <Pen d={G.UP.d} progress={ramp(frame, ...at(EV.upload), EASE_MOVE)} color="blue" head={G.UP.head} opacity={blueUntil(BEAT.ttl)} />
        <Packet d={G.UP.d} progress={ramp(frame, ...at(EV.upload), EASE_MOVE)} color="blue" />
        <Write x={L.v2Lbl.x} y={L.v2Lbl.y} text="v2" variant="mono" size={MO} color="blue" progress={ramp(frame, ...at(EV.v2Label))} opacity={ghost(frame, BEAT.purge)} />
        <Pen d={G.TO_DB.d} progress={ramp(frame, ...at(EV.toDb), EASE_MOVE)} color="blue" head={G.TO_DB.head} opacity={blueUntil(BEAT.ttl)} />
        <Packet d={G.TO_DB.d} progress={ramp(frame, ...at(EV.toDb), EASE_MOVE)} color="blue" />
        <Write x={L.db.v.x} y={L.db.v.y} text="v1" variant="mono" size={MO} anchor="middle" opacity={1 - ramp(frame, EV.dbFlip, 8, EASE_FADE)} />
        <Write x={L.db.v.x} y={L.db.v.y} text="v2" variant="mono" size={MO} anchor="middle" progress={ramp(frame, EV.dbFlip + 6, 16)} />
        <Pen d={G.TO_S3.d} progress={ramp(frame, ...at(EV.toS3), EASE_MOVE)} color="blue" head={G.TO_S3.head} opacity={blueUntil(BEAT.ttl)} />
        <Packet d={G.TO_S3.d} progress={ramp(frame, ...at(EV.toS3), EASE_MOVE)} color="blue" />
        <Write x={L.s3.v2.x} y={L.s3.v2.y} text="v2" variant="mono" size={MO} anchor="middle" progress={ramp(frame, ...at(EV.s3V2))} />

        {/* the change, on both lanes */}
        <Pen d={G.CHANGE_D} progress={ramp(frame, ...at(EV.changeLine))} color="ink2" width={STROKE.thin + 0.6} dash="9 8" />
        <Write x={L.changeLbl.x} y={L.changeLbl.y} text="photo changed" size={LB} color="ink2" anchor={L.changeLbl.anchor} progress={ramp(frame, ...at(EV.changeLabel))} />

        {/* ===== B3: TTL only — the old photo, request after request ===== */}
        {EV.stale.map((h, i) => (
          <RoundTrip key={`s${i}`} d={G.REQ.d} head={G.REQ.head} req={h.req} resp={h.resp} back="red" blueOut={h.resp[0]} />
        ))}
        {spanA > 0 ? (
          <line x1={L.CHANGE_X} y1={LA} x2={L.CHANGE_X + spanA} y2={LA} stroke={T.red} strokeWidth={STROKE.thick + 2} strokeLinecap="round" />
        ) : null}
        <g opacity={playO}>
          <line x1={phX} y1={LA - 20} x2={phX} y2={LA + 20} stroke={T.ink} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>
        <Write x={L.staleLbl.x} y={L.staleLbl.y} text="old photo served" color="red" size={LB} anchor="middle" progress={ramp(frame, ...at(EV.staleLabel))} />
        {/* TTL expiry mark */}
        <g opacity={ramp(frame, EV.ttlMark, 8, EASE_FADE)}>
          <line x1={L.TTL_X} y1={LA - 22} x2={L.TTL_X} y2={LA + 22} stroke={T.ink} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>
        <Write x={L.ttlLbl.x} y={L.ttlLbl.y} text="TTL: 1–2 days" size={LB} anchor={L.ttlLbl.anchor} progress={ramp(frame, ...at(EV.ttlLabel))} />

        {/* ===== B4: with a purge ===== */}
        <Pen d={G.TO_KAFKA.d} progress={ramp(frame, ...at(EV.toKafka), EASE_MOVE)} color="blue" dash={DASH} head={G.TO_KAFKA.head} opacity={blueUntil(BEAT.refill)} />
        <Packet d={G.TO_KAFKA.d} progress={ramp(frame, ...at(EV.toKafka), EASE_MOVE)} color="blue" />
        <Write x={L.evLbl.x} y={L.evLbl.y} text="photo_updated" variant="mono" size={MO} color="blue" anchor={L.evLbl.anchor} progress={ramp(frame, ...at(EV.eventLabel))} />
        {/* the worker pulls: its line re-inks from the worker, the event rides back to it */}
        <Pen d={G.PULL.d} progress={ramp(frame, EV.toWorker[0], 10)} color="blue" head={G.PULL.head} opacity={blueUntil(BEAT.refill)} />
        <Packet d={reversePath(G.PULL.d)} progress={ramp(frame, ...at(EV.toWorker), EASE_MOVE)} color="blue" />
        <Pen d={G.PURGE.d} progress={ramp(frame, ...at(EV.purgeReq), EASE_MOVE)} color="blue" dash={DASH} head={G.PURGE.head} opacity={blueUntil(BEAT.refill)} />
        <Packet d={G.PURGE.d} progress={ramp(frame, ...at(EV.purgeReq), EASE_MOVE)} color="blue" />
        <Write x={L.purgeLbl.x} y={L.purgeLbl.y} text="purge /h1" variant="mono" size={MO} color="blue" progress={ramp(frame, ...at(EV.purgeLabel))} />
        {/* lane B: the window closes at the purge */}
        {sliverP > 0 ? (
          <line x1={L.CHANGE_X} y1={LBy} x2={L.CHANGE_X + (L.PURGE_X - L.CHANGE_X) * sliverP} y2={LBy} stroke={T.red} strokeWidth={STROKE.thick + 2} strokeLinecap="round" />
        ) : null}
        <g opacity={ramp(frame, EV.purged, 8, EASE_FADE)}>
          <line x1={L.PURGE_X} y1={LBy - 22} x2={L.PURGE_X} y2={LBy + 22} stroke={T.blue} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>
        <Write x={L.purgeMarkLbl.x} y={L.purgeMarkLbl.y} text="purge" color="blue" size={LB} anchor={L.purgeMarkLbl.anchor}progress={ramp(frame, EV.purged, 16)} />

        {/* ===== B5: the next request misses and refills ===== */}
        <RoundTrip d={G.REQ.d} head={G.REQ.head} req={EV.missReq} resp={EV.served} back="green" blueOut={BEAT.end} />
        <Pen d={G.ORIGIN.d} progress={ramp(frame, ...at(EV.toOrigin), EASE_MOVE)} color="blue" head={G.ORIGIN.head} opacity={blueUntil(BEAT.end)} />
        <Packet d={G.ORIGIN.d} progress={ramp(frame, ...at(EV.toOrigin), EASE_MOVE)} color="blue" />
        <Packet d={reversePath(G.ORIGIN.d)} progress={ramp(frame, ...at(EV.fromOrigin), EASE_MOVE)} color="green" />
        <Write x={L.missLbl.x} y={L.missLbl.y} text="miss" color="blue" size={LB} anchor="middle" progress={ramp(frame, ...at(EV.missLabel))} />

        {/* ===== ticks on the lanes (served requests) ===== */}
        {L.PRE_X.map((x, i) => {
          const t = EV.hits[i].resp[0] + EV.hits[i].resp[1];
          return (
            <g key={`p${i}`}>
              <Tick x={x} y={LA} r={R} at={t} kind="ok" />
              <Tick x={x} y={LBy} r={R} at={t} kind="ok" />
            </g>
          );
        })}
        {G.STALE_X.map((x, i) => (
          <Tick key={`a${i}`} x={x} y={LA} r={R} at={EV.stale[i].resp[0] + EV.stale[i].resp[1]} kind="stale" />
        ))}
        <Tick x={L.REFILL_X} y={LA} r={R} at={EV.ttlRefill} kind="ok" />
        {[...G.STALE_X, L.REFILL_X].map((x, i) => (
          <Tick key={`b${i}`} x={x} y={LBy} r={R} at={EV.freshTicks[i]} kind="ok" />
        ))}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={L.captionTop} layout={layout} />
    </Sheet>
  );
};

export default Invalidate;

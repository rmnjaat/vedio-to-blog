// Clip l06-badge — "Three people, not three hundred".
// Storyboard: lectures/lec06/animations/l06-badge/storyboard.{yaml,md}. Ledger: L-0231, L-0256, L-0227, L-0257, L-0233.
// Frame 0 = Fig 5·a/5·d before any message: B's phone (paper-plane icon, empty badge, unread 0), B's empty set
// `B: { }` linked to the badge, an empty message track into the phone and an empty badge strip. The last frame is the
// annotated poster: a two-row before/after summary. Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×930, portrait re-flow).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {chevron, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write, useTheme} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BADGE_STEPS, BEAT, CAPTIONS, EV, META, MSGS, arrival, type Msg, type Sender} from './timeline';
import {circle, phoneBody, plane} from './glyphs';

export type BadgeProps = {theme: ThemeName; layout?: Layout};

type TextPos = {x: number; y: number};
const LIN = Easing.linear;

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const L = ph
    ? {
        phone: {x: 30, y: 30, w: 290, h: 420},
        icon: {cx: 165, cy: 136, s: 88},
        badge: {cx: 246, cy: 74, r: 26},
        ringR: 58,
        messagesLbl: {x: 165, y: 236},
        unreadLbl: {x: 175, y: 292},
        unreadNum: {x: 175, y: 352, size: 48},
        nothingRead: {x: 175, y: 416},
        offline: {dotX: 40, x: 56, y: 498},
        header: [
          {x: 346, y: 66, t: 'this design:', c: 'ink2' as const},
          {x: 346, y: 106, t: 'badge =', c: 'ink' as const},
          {x: 346, y: 144, t: 'unique senders', c: 'ink' as const},
        ],
        set: {x: 340, y: 168, w: 360, h: 78, size: 38, base: 220, open: 358, slots: [478, 502, 572] as const, close: 668, closeTight: 522},
        cross: {x0: 470, x1: 652, y0: 186, y1: 232},
        link: [[274, 74], [332, 74], [332, 207], [338, 207]] as Pt[],
        already: {x: 700, y: 292, anchor: 'end' as const},
        deleted: {x: 346, y: 334, anchor: 'start' as const},
        track: [[700, 560], [300, 560], [300, 456]] as Pt[],
        chipPath: [[672, 560], [300, 560], [300, 492]] as Pt[],
        chip: {w: 50, h: 46, size: 32},
        spedUp: {x: 700, y: 524, anchor: 'end' as const},
        trackLbl: {x: 700, y: 614, anchor: 'end' as const},
        strip: {lbl: {x: 30, y: 694}, size: 36, v: [160, 196, 232] as const, msgs: {x: 266, y: 694}, sep: {x: 520, y0: 662, y1: 704}, tap: {x: 534, y: 694}, v0: 620, v1: 658},
        rows: {y: [680, 734] as const, lbl: 30, set: 216, badge: 398, unread: 530, labels: ['before tap', 'since tap'] as const, sets: ['B:{A,C,D}', 'B:{D}'] as const},
        captionTop: 772,
      }
    : {
        phone: {x: 50, y: 36, w: 300, h: 440},
        icon: {cx: 188, cy: 150, s: 100},
        badge: {cx: 272, cy: 82, r: 30},
        ringR: 66,
        messagesLbl: {x: 188, y: 262},
        unreadLbl: {x: 200, y: 328},
        unreadNum: {x: 200, y: 390, size: 56},
        nothingRead: {x: 200, y: 446},
        offline: {dotX: 64, x: 84, y: 534},
        header: [
          {x: 500, y: 74, t: 'this design:', c: 'ink2' as const},
          {x: 500, y: 122, t: 'badge = unique senders', c: 'ink' as const},
        ],
        set: {x: 494, y: 150, w: 566, h: 96, size: 52, base: 216, open: 524, slots: [686, 718, 814] as const, close: 944, closeTight: 742},
        cross: {x0: 676, x1: 916, y0: 170, y1: 228},
        link: [[304, 82], [462, 82], [462, 198], [490, 198]] as Pt[],
        already: {x: 1060, y: 302, anchor: 'end' as const},
        deleted: {x: 500, y: 352, anchor: 'start' as const},
        track: [[1150, 432], [356, 432]] as Pt[],
        chipPath: [[1118, 432], [392, 432]] as Pt[],
        chip: {w: 62, h: 54, size: 40},
        spedUp: {x: 1150, y: 498, anchor: 'end' as const},
        trackLbl: {x: 400, y: 498, anchor: 'start' as const},
        strip: {lbl: {x: 60, y: 584}, size: 44, v: [214, 266, 318] as const, msgs: {x: 360, y: 584}, sep: {x: 724, y0: 548, y1: 596}, tap: {x: 742, y: 584}, v0: 852, v1: 902},
        rows: {y: [562, 618] as const, lbl: 60, set: 400, badge: 730, unread: 930, labels: ['before the tap', 'since the tap'] as const, sets: ['B: {A, C, D}', 'B: {D}'] as const},
        captionTop: 652,
      };
  const [ux, uy] = endDir(L.track);
  return {
    ph,
    W,
    H,
    TS: TY.label,
    L,
    PHONE_D: phoneBody(L.phone.x, L.phone.y, L.phone.w, L.phone.h, 'phone'),
    SPEAKER_D: handLine([L.phone.x + L.phone.w / 2 - 34, L.phone.y + 16], [L.phone.x + L.phone.w / 2 + 34, L.phone.y + 16], 'spk'),
    PLANE_D: plane(L.icon.cx, L.icon.cy, L.icon.s, 'plane'),
    BADGE_D: circle(L.badge.cx, L.badge.cy, L.badge.r),
    RING_D: circle(L.icon.cx, L.icon.cy, L.ringR),
    SET_D: serverBox(L.set.x, L.set.y, L.set.w, L.set.h, 'set'),
    LINK_D: handPoly(L.link, 'link'),
    TRACK_D: handPoly(L.track, 'track'),
    TRACK_HEAD: chevron(L.track[L.track.length - 1], ux, uy, ph ? 16 : 20, 'trackh'),
    CHIP_PATH: handPoly(L.chipPath, 'chips'),
    CHIP_BOX: serverBox(-L.chip.w / 2, -L.chip.h / 2, L.chip.w, L.chip.h, 'chip'),
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
/** The end frame's two rows: the numbers the clip reached before the tap and after D's message (sets per layout). */
const SUMMARY = [
  {badge: 'badge 3', unread: 'unread 300'},
  {badge: 'badge 1', unread: 'unread 301'},
];
const CHIP_LEN = {wide: getLength(LAYOUTS.wide.CHIP_PATH), phone: getLength(LAYOUTS.phone.CHIP_PATH)};

// ---------- values over time ----------
const SLOW_ARRIVALS = MSGS.slice(0, 4).map(arrival);
const AFTER_ARRIVAL = arrival(MSGS[MSGS.length - 1]);
const FLOOD_END = EV.flood[0] + EV.flood[1];

/** The inbox's unread count: +1 per message, linear while sped up, never drops (nothing is read). */
const unread = (frame: number): {v: number; changedAt: number} => {
  if (frame >= AFTER_ARRIVAL) return {v: 301, changedAt: AFTER_ARRIVAL};
  if (frame >= FLOOD_END) return {v: 300, changedAt: -1};
  if (frame >= EV.flood[0]) return {v: 5 + Math.round(295 * ramp(frame, EV.flood[0], EV.flood[1], LIN)), changedAt: -1};
  const n = SLOW_ARRIVALS.filter((a) => frame >= a).length;
  return {v: n, changedAt: n ? SLOW_ARRIVALS[n - 1] : -1};
};

/** Badge value and when it last changed. */
const badgeAt = (frame: number) => {
  let v = 0;
  let at = -1;
  let next = Infinity;
  for (const [f, val] of BADGE_STEPS) {
    if (frame >= f) {
      v = val;
      at = f;
    } else {
      next = Math.min(next, f);
    }
  }
  return {v, at, next};
};

export const Badge: React.FC<BadgeProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const {L, TS} = G;

  // past states
  const alreadyO = ghost(frame, BEAT.flood);
  const spedO = ghost(frame, BEAT.tap);
  const offlineO = ghost(frame, EV.tapRing[0]);
  const preTapStripO = ghost(frame, EV.stripTap[0]);
  const ringO = ghost(frame, BEAT.after);
  const membersO = 1 - ramp(frame, ...EV.membersGone, EASE_FADE);
  // the end frame: ghosts and the running strip give way to the before/after rows
  const outO = 1 - ramp(frame, ...EV.summaryOut, EASE_FADE);

  // badge: the old value fades out just before its replacement is written in place
  const b = badgeAt(frame);
  const badgeOut = b.next === Infinity ? 1 : 1 - ramp(frame, b.next - 6, 6, EASE_FADE);
  const badgeIn = b.at < 0 ? 1 : ramp(frame, b.at, 10, EASE_FADE);
  const badgeO = badgeIn * badgeOut;
  const empty = b.v === 0;

  // unread counter
  const u = unread(frame);
  const uProg = u.changedAt < 0 ? 1 : ramp(frame, u.changedAt, 10);

  // set members: slot 0 holds A, then D after the tap
  const member = (slot: 0 | 1 | 2, text: string, at: readonly [number, number], o: number) => (
    <Write x={L.set.slots[slot]} y={L.set.base} text={text} size={L.set.size} variant="mono" color="green" weight={560} progress={ramp(frame, ...at)} opacity={o} />
  );

  // strip stamps: [x, text, at]
  const stamp = (x: number, text: string, at: readonly [number, number], o = 1, color: 'ink' | 'ink2' = 'ink') => (
    <Write x={x} y={L.strip.lbl.y} text={text} size={L.strip.size} variant="mono" color={color} anchor="middle" weight={560} progress={ramp(frame, ...at)} opacity={o} />
  );

  return (
    <Sheet theme={theme}>
      <Stage title="Three people, not three hundred" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {/* B's phone */}
        <Ink d={G.PHONE_D} fill={T.sheet} />
        <Ink d={G.SPEAKER_D} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.PLANE_D} />
        <Write x={L.messagesLbl.x} y={L.messagesLbl.y} text="messages" size={TS} color="ink2" anchor="middle" />
        <Write x={L.unreadLbl.x} y={L.unreadLbl.y} text="unread" size={TS} color="ink2" anchor="middle" />
        <Write x={L.unreadNum.x} y={L.unreadNum.y} text={String(u.v)} size={L.unreadNum.size} variant="mono" color="ink2" anchor="middle" weight={560} progress={uProg} />
        {/* offline */}
        <g opacity={offlineO * outO}>
          <circle cx={L.offline.dotX} cy={L.offline.y - TS * 0.32} r={G.ph ? 8 : 10} fill={T.ink3} />
          <Write x={L.offline.x} y={L.offline.y} text="B · offline" size={TS} color="ink2" />
        </g>
        {/* the set and its link to the badge */}
        {L.header.map((h, i) => (
          <Write key={i} x={h.x} y={h.y} text={h.t} size={TS} color={h.c} />
        ))}
        <Ink d={G.LINK_D} color="ink2" width={STROKE.thin + 0.6} dash="10 9" />
        <Ink d={G.SET_D} fill={T.sheet} />
        <Write x={L.set.open} y={L.set.base} text="B: {" size={L.set.size} variant="mono" />
        <Write x={L.set.close} y={L.set.base} text="}" size={L.set.size} variant="mono" opacity={1 - ramp(frame, ...EV.braceOut, EASE_FADE)} />
        <Write x={L.set.closeTight} y={L.set.base} text="}" size={L.set.size} variant="mono" progress={ramp(frame, ...EV.braceIn)} />
        {/* the message track (the sender initiates: the head points at B's phone) */}
        <Ink d={G.TRACK_D} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.TRACK_HEAD} color="ink2" width={STROKE.thin + 0.6} />
        <Write x={L.trackLbl.x} y={L.trackLbl.y} text="messages to B" size={TS} color="ink2" anchor={L.trackLbl.anchor} />
        {/* badge strip */}
        <Write x={L.strip.lbl.x} y={L.strip.lbl.y} text="badge:" size={TS} color="ink2" opacity={outO} />

        {/* ===== the badge ===== */}
        <g opacity={badgeO}>
          <path d={G.BADGE_D} fill={T.sheet} stroke={empty ? T.ink2 : T.ink} strokeWidth={STROKE.ink} strokeDasharray={empty ? '7 6' : undefined} />
          <Write x={L.badge.cx} y={L.badge.cy + L.badge.r * 0.45} text={String(b.v)} size={L.badge.r * 1.25} variant="num" color={empty ? 'ink2' : 'ink'} anchor="middle" />
        </g>

        {/* ===== ① A, A, A, C ===== */}
        {member(0, 'A', EV.joinA.member, membersO)}
        <Write x={L.already.x} y={L.already.y} text="A: already in set" size={TS} color="ink2" anchor={L.already.anchor} progress={ramp(frame, ...EV.alreadyNote)} opacity={alreadyO * outO} />
        {member(1, ', C', EV.joinC.member, membersO)}
        {stamp(L.strip.v[0], '1', EV.joinA.stamp, preTapStripO * outO)}
        {stamp(L.strip.v[1], '2', EV.joinC.stamp, preTapStripO * outO)}

        {/* ===== ② sped up: 300 messages, three senders ===== */}
        <Write x={L.spedUp.x} y={L.spedUp.y} text="sped up" size={TS} color="ink2" anchor={L.spedUp.anchor} progress={ramp(frame, ...EV.spedUp)} opacity={spedO * outO} />
        {member(2, ', D', EV.joinD.member, membersO)}
        {stamp(L.strip.v[2], '3', EV.joinD.stamp, preTapStripO * outO)}
        <Write x={L.strip.msgs.x} y={L.strip.msgs.y} text="(300 messages)" size={TS} color="ink2" progress={ramp(frame, ...EV.msgs300)} opacity={preTapStripO * outO} />

        {/* ===== ③ tap: badge 0, set deleted, nothing read ===== */}
        <Pen d={G.RING_D} progress={ramp(frame, ...EV.tapRing)} color="blue" width={STROKE.ink} opacity={ringO} />
        <g opacity={fade(frame, EV.stripTap[0], Infinity, 8) * outO}>
          <Ink d={handLine([L.strip.sep.x, L.strip.sep.y0], [L.strip.sep.x, L.strip.sep.y1], 'sep')} color="blue" width={STROKE.ink} />
        </g>
        <Write x={L.strip.tap.x} y={L.strip.tap.y} text="tap" size={TS} color="blue" progress={ramp(frame, EV.stripTap[0], 14)} opacity={outO} weight={600} />
        {stamp(L.strip.v0, '0', [EV.stripTap[0] + 10, 10], outO, 'ink2')}
        <g opacity={fade(frame, ...EV.cross) * membersO}>
          <path
            d={`M ${L.cross.x0} ${L.cross.y0} L ${L.cross.x1} ${L.cross.y1} M ${L.cross.x1} ${L.cross.y0} L ${L.cross.x0} ${L.cross.y1}`}
            stroke={T.ink}
            strokeWidth={STROKE.ink + 1}
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <Write x={L.deleted.x} y={L.deleted.y} text="set deleted on tap" size={TS} anchor={L.deleted.anchor} progress={ramp(frame, ...EV.deletedNote)} weight={560} />
        <Write x={L.nothingRead.x} y={L.nothingRead.y} text="nothing read" size={TS} anchor="middle" progress={ramp(frame, ...EV.nothingRead)} weight={600} />

        {/* ===== ④ D after the tap ===== */}
        {member(0, 'D', EV.joinD2.member, 1)}
        {stamp(L.strip.v1, '1', EV.joinD2.stamp, outO)}

        {/* ===== summary: before the tap / since the tap, written where the strip was ===== */}
        {SUMMARY.map((row, r) => {
          const R = L.rows;
          const segs = [
            {x: R.lbl, text: R.labels[r], color: r ? ('blue' as const) : ('ink2' as const), variant: 'hand' as const, weight: 600},
            {x: R.set, text: R.sets[r], color: 'ink' as const, variant: 'mono' as const, weight: 560},
            {x: R.badge, text: row.badge, color: 'ink' as const, variant: 'hand' as const, weight: 600},
            {x: R.unread, text: row.unread, color: 'ink2' as const, variant: 'hand' as const, weight: 560},
          ];
          const t0 = r ? EV.row2 : EV.row1;
          return segs.map((g, i) => (
            <Write key={`${r}-${i}`} x={g.x} y={R.y[r]} text={g.text} size={TS} variant={g.variant} color={g.color} weight={g.weight} progress={ramp(frame, t0 + i * EV.rowSeg, EV.rowDur)} />
          ));
        })}

        {/* ===== message chips riding the track (drawn last: they pass over nothing but the track) ===== */}
        {MSGS.map((m, i) => (
          <Chip key={i} m={m} frame={frame} layout={layout} />
        ))}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={L.captionTop} layout={layout} />
    </Sheet>
  );
};

/** A message from sender `s`: a small blue box with the sender's letter, riding the track into B's phone. */
const Chip: React.FC<{m: Msg; frame: number; layout: Layout}> = ({m, frame, layout}) => {
  const t = useTheme();
  const G = LAYOUTS[layout];
  const p = ramp(frame, m.at, m.dur, m.linear ? LIN : EASE_MOVE);
  if (p <= 0 || p >= 1) return null;
  const pt = getPointAtLength(G.CHIP_PATH, CHIP_LEN[layout] * p);
  if (!pt) return null;
  // appears over the first 8 %, slips into the phone over the last 14 %
  const o = Math.min(ramp(p, 0, 0.08, LIN), 1 - ramp(p, 0.86, 0.14, LIN));
  return (
    <g transform={`translate(${pt.x} ${pt.y})`} opacity={o}>
      <path d={G.CHIP_BOX} fill={t.sheet} stroke={t.blue} strokeWidth={STROKE.ink} strokeLinejoin="round" />
      <SenderLetter s={m.s} size={G.L.chip.size} />
    </g>
  );
};

const SenderLetter: React.FC<{s: Sender; size: number}> = ({s, size}) => (
  <Write x={0} y={size * 0.36} text={s} size={size} variant="mono" color="blue" anchor="middle" weight={600} />
);

export default Badge;

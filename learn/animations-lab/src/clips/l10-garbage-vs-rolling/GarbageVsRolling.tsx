// Clip l10-garbage-vs-rolling — "Same path vs a rolling deployment".
// Storyboard: lectures/lec10/animations/l10-garbage-vs-rolling/storyboard.{yaml,md}.
// Ledger: L-0157, L-0158, L-0159, L-0161, L-0177, L-0178, L-0183, L-0184, L-0196.
// Two lanes, one time scale. Each lane: an s3 cloud with its listing, the update job holding the new file (v2),
// three api boxes tagged with the file their index was built from, and one answer bar per server for GET apple that
// grows with a playhead. Top: same path (red window until each reload). Bottom: new path + meta.json + rolling
// deploy (graphite → green, never red). Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×1030).
import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {chevron, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, PAUSE_AT, SWITCH_AT} from './timeline';

export type GarbageVsRollingProps = {theme: ThemeName; layout?: Layout};

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


const LINEAR = (t: number) => t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// the kit's cloud: n scallops round an ellipse (as in the lecture 9 clips)
const cloud = (cx: number, cy: number, rx: number, ry: number, seed: string, n = 11) => {
  const P = (th: number, k = 1): Pt => [cx + rx * k * Math.cos(th), cy + ry * k * Math.sin(th)];
  const f = (p: Pt) => `${Math.round(p[0] * 10) / 10} ${Math.round(p[1] * 10) / 10}`;
  let d = `M ${f(P(Math.PI))}`;
  for (let i = 0; i < n; i++) {
    const a = Math.PI + (2 * Math.PI * i) / n;
    const b = Math.PI + (2 * Math.PI * (i + 1)) / n;
    const k = 1.22 + (random(`${seed}-${i}`) - 0.5) * 0.06;
    d += ` Q ${f(P((a + b) / 2, k))} ${f(P(b))}`;
  }
  return d + ' Z';
};

type Box = {x: number; y: number; w: number; h: number};
type LaneKey = 'top' | 'bot';

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const S = TY.label; // one lettering size for the whole clip
  const CW = S * 0.6; // mono advance
  const chip = ph ? {w: 54, h: 36} : {w: 66, h: 44};
  const sChip = ph ? {w: 54, h: 34} : {w: 58, h: 40};

  const lane = (key: LaneKey, y0: number) => {
    const listX = ph ? 40 : 34;
    const rowsBase = ph ? [130, 172, 214].map((v) => y0 + v) : [100, 150, 200].map((v) => y0 + v);
    const nRows = key === 'top' ? 1 : 3;
    const tagX = listX + 5 * CW + (ph ? 12 : 16); // after "dict1"
    const tagBox = (r: number): Box => ({x: tagX, y: rowsBase[r] - (ph ? 27 : 33), w: chip.w, h: chip.h});
    const cl = ph ? {cx: 78, cy: y0 + 69, rx: 52, ry: 19} : {cx: 96, cy: y0 + 34, rx: 62, ry: 23};
    const job: Box = ph ? {x: 520, y: y0 + 44, w: 180, h: 50} : {x: 236, y: y0 + 6, w: 180, h: 56};
    // phone: the chip sits at the job's left so its upload trail stays clear of the deploy line at the right edge
    const jobChip: Box = {x: ph ? job.x + 10 : job.x + job.w - chip.w - 10, y: job.y + (job.h - chip.h) / 2, w: chip.w, h: chip.h};
    const dest = tagBox(key === 'top' ? 0 : 1);
    const ctr = (b: Box): Pt => [b.x + b.w / 2, b.y + b.h / 2];
    // the upload leaves the job straight down, then runs left along the destination row (it crosses no lettering)
    const upPts: Pt[] = [ctr(jobChip), [ctr(jobChip)[0], ctr(dest)[1]], ctr(dest)];
    const bracketX = ph ? 26 : 22;
    const lastMid = rowsBase[nRows - 1] - S * 0.35;
    const servers: Box[] = (ph ? [252, 304, 356] : [74, 134, 194]).map((v) => ({
      x: ph ? 20 : 432,
      y: y0 + v,
      w: ph ? 150 : 168,
      h: ph ? 44 : 52,
    }));
    const track = ph ? {x: 186, w: 518} : {x: 612, w: 564};
    const deployPts: Pt[] = ph
      ? [
          [690, job.y + job.h + 2],
          [690, y0 + 236],
          [95, y0 + 236],
          [95, servers[0].y - 5],
        ]
      : [
          [job.x + job.w + 2, job.y + job.h / 2],
          [500, job.y + job.h / 2],
          [500, servers[0].y - 5],
        ];
    const spanY = ph ? y0 + 414 : y0 + 262;
    return {
      key,
      y0,
      listX,
      rowsBase,
      nRows,
      tagBox,
      cl,
      cloudD: cloud(cl.cx, cl.cy, cl.rx, cl.ry, `s3${key}`),
      job,
      jobD: serverBox(job.x, job.y, job.w, job.h, `job${key}`),
      jobChip,
      dest,
      upD: handPoly(upPts, `up${key}`),
      upPts,
      bracketD: handLine([bracketX, cl.cy + cl.ry * 1.1], [bracketX, lastMid], `br${key}`),
      bracketTicks: rowsBase.slice(0, nRows).map((b, i) => handLine([bracketX, b - S * 0.35], [bracketX + (ph ? 9 : 10), b - S * 0.35], `bt${key}${i}`)),
      servers,
      serverD: servers.map((b, i) => serverBox(b.x, b.y, b.w, b.h, `api${key}${i}`)),
      sChip: servers.map((b): Box => ({x: b.x + b.w - sChip.w - (ph ? 8 : 10), y: b.y + (b.h - sChip.h) / 2, w: sChip.w, h: sChip.h})),
      track,
      bar: servers.map((b) => ({y: b.y + (b.h - sChip.h) / 2, h: sChip.h})),
      deployD: handPoly(deployPts, `dep${key}`),
      deployHead: chevron(deployPts[deployPts.length - 1], 0, 1, ph ? 13 : 16, `deph${key}`),
      spanY,
      spanD: handLine([track.x, spanY], [track.x + track.w * SWITCH_AT[2], spanY], `span${key}`),
      underY: ph ? y0 + 448 : y0 + 296,
      headY: ph ? y0 + 30 : y0 + 44,
      // hand notes above the api column: 'reload' (top) / 'deploy' (bottom)
      colNote: ph ? {x: 676, y: y0 + 224, anchor: 'end' as const} : {x: 520, y: y0 + 60, anchor: 'start' as const},
      reloadNote: ph ? {x: 26, y: y0 + 240} : {x: 440, y: y0 + 62},
      playY: ph ? [y0 + 246, y0 + 406] : [y0 + 68, y0 + 252],
    };
  };
  return {
    ph,
    W,
    H,
    S,
    CW,
    lanes: {top: lane('top', ph ? 8 : 12), bot: lane('bot', ph ? 474 : 334)},
    MARK: ph ? 8 : 10,
    CAPTION_TOP: ph ? 942 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type G = (typeof LAYOUTS)['wide'];
type LaneG = G['lanes']['top'];

const Cross: React.FC<{x: number; y: number; s: number; color: string; o: number}> = ({x, y, s, color, o}) =>
  o <= 0 ? null : (
    <path d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`} stroke={color} strokeWidth={STROKE.ink} strokeLinecap="round" opacity={o} />
  );
const Tick: React.FC<{x: number; y: number; s: number; color: string; o: number}> = ({x, y, s, color, o}) => {
  if (o <= 0) return null;
  const k = s / 10;
  return (
    <path
      d={`M ${x - 11 * k} ${y + 1 * k} L ${x - 3 * k} ${y + 9 * k} L ${x + 12 * k} ${y - 10 * k}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink + 0.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );
};

/** A tag chip: rounded rect + centred mono text. */
const Chip: React.FC<{b: Box; text: string; C: Theme; color: string; S: number; o?: number; progress?: number; dx?: number; dy?: number}> = ({
  b,
  text,
  C,
  color,
  S,
  o = 1,
  progress = 1,
  dx = 0,
  dy = 0,
}) =>
  o <= 0 ? null : (
    <g opacity={o} transform={`translate(${dx} ${dy})`}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={7} fill={C.sheet} stroke={color} strokeWidth={STROKE.ink - 0.8} />
      <Write x={b.x + b.w / 2} y={b.y + b.h / 2 + S * 0.35} text={text} size={S} variant="mono" anchor="middle" color={color === C.red ? 'red' : 'ink'} progress={progress} />
    </g>
  );

export const GarbageVsRolling: React.FC<GarbageVsRollingProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const C = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const g = LAYOUTS[layout];
  const {S} = g;

  // playheads (0..1), same speed in both lanes; the top one pauses at PAUSE_AT between B1 and B2
  const pTop = PAUSE_AT * ramp(frame, ...EV.runTop1, LINEAR) + (1 - PAUSE_AT) * ramp(frame, ...EV.runTop2, LINEAR);
  const pBot = ramp(frame, ...EV.runBot, LINEAR);
  const topEnd = EV.runTop2[0] + EV.runTop2[1];
  const botEnd = EV.runBot[0] + EV.runBot[1];
  const playO = {top: fade(frame, EV.runTop1[0], topEnd, 6, 10), bot: fade(frame, EV.runBot[0], botEnd, 6, 10)};
  const topO = 1 - (1 - ghost(frame, EV.ghostTop)) * (1 - ramp(frame, EV.restoreTop, 14, EASE_FADE));

  const lane = (L: LaneG) => {
    const top = L.key === 'top';
    const p = top ? pTop : pBot;
    const x = (q: number) => L.track.x + L.track.w * q;
    const up = ramp(frame, ...(top ? EV.upTop : EV.upBot), EASE_MOVE);
    // the chip rides its own dashed trail
    const tip = up > 0 ? getPointAtLength(L.upD, getLength(L.upD) * up) : null;
    const flight = tip ? [tip.x - L.upPts[0][0], tip.y - L.upPts[0][1]] : [0, 0];
    const switches = top ? EV.reloadsTop : EV.replacesBot;

    return (
      <g key={L.key} opacity={top ? topO : 1}>
        {/* ===== header: lane title (right), GET apple over the top tracks ===== */}
        <Write x={g.ph ? 20 : L.track.x + L.track.w} y={L.headY} text={top ? 'same path' : 'new path'} size={S} anchor={g.ph ? 'start' : 'end'} weight={640} />
        {top ? <Write x={g.ph ? 704 : L.track.x} y={g.ph ? L.reloadNote.y : L.headY} text="GET apple" size={S} variant="mono" color="ink2" anchor={g.ph ? 'end' : 'start'} /> : null}

        {/* ===== s3: cloud + listing ===== */}
        <Ink d={L.cloudD} fill={C.sheet} />
        <Write x={L.cl.cx} y={L.cl.cy + S * 0.35} text="s3" size={S} variant="mono" anchor="middle" />
        <Ink d={L.bracketD} width={STROKE.thin} color="ink2" />
        {L.bracketTicks.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" opacity={top || i !== 1 ? 1 : fade(frame, EV.upBot[0] + EV.upBot[1] - 6, Infinity, 8)} />
        ))}
        <Write x={L.listX} y={L.rowsBase[0]} text="dict1" size={S} variant="mono" />
        {/* dict1's own tag: v1 (replaced by the arriving v2 at the same path, top lane only) */}
        <Chip b={L.tagBox(0)} text="v1" C={C} color={C.ink} S={S} o={top ? 1 - ramp(frame, EV.tagTop[0], 10, EASE_FADE) : 1} />
        {top ? null : (
          <>
            <Write x={L.listX} y={L.rowsBase[1]} text="dict2" size={S} variant="mono" progress={ramp(frame, ...EV.dict2Lbl)} />
            <Write x={L.listX} y={L.rowsBase[2]} text="meta.json:" size={S} variant="mono" />
            <Write x={L.listX + 11 * g.CW} y={L.rowsBase[2]} text="dict1" size={S} variant="mono" opacity={1 - ramp(frame, EV.metaOut[0], EV.metaOut[1], EASE_FADE)} />
            <Write x={L.listX + 11 * g.CW} y={L.rowsBase[2]} text="dict2" size={S} variant="mono" progress={ramp(frame, ...EV.metaIn)} />
          </>
        )}

        {/* ===== the upload: the v2 chip rides a dashed trail out of the job ===== */}
        <Pen d={L.upD} progress={up} dash="10 9" width={STROKE.thin + 0.4} color="ink2" />
        <Ink d={L.jobD} fill={C.sheet} />
        <Write x={g.ph ? L.job.x + L.job.w - 12 : L.job.x + 14} y={L.job.y + L.job.h / 2 + S * 0.35} text="job" size={S} variant="mono" anchor={g.ph ? 'end' : 'start'} />
        <Chip b={L.jobChip} text="v2" C={C} color={C.ink} S={S} dx={flight[0]} dy={flight[1]} />

        {/* ===== deploy (bottom lane): the job triggers it, so the head sits at the servers ===== */}
        {top ? null : (
          <>
            <Pen d={L.deployD} progress={ramp(frame, ...EV.deploy)} dash="12 10" head={L.deployHead} />
            <Write x={L.colNote.x} y={L.colNote.y} text="deploy" size={S} anchor={L.colNote.anchor} progress={ramp(frame, ...EV.deployLbl)} />
          </>
        )}
        {top ? <Write x={L.reloadNote.x} y={L.reloadNote.y} text="reload" size={S} color="ink2" progress={ramp(frame, ...EV.reloadLbl)} /> : null}

        {/* ===== api servers with their index tags ===== */}
        {L.servers.map((b, i) => {
          const at = switches[i];
          const sc = L.sChip[i];
          const apiX = b.x + (g.ph ? 10 : 12);
          const apiY = b.y + b.h / 2 + S * 0.35;
          if (top) {
            // v1 re-inks red at the swap (stale offsets), then the reload replaces it with v2
            const red = fade(frame, EV.staleTop[0], Infinity, EV.staleTop[1]);
            const out = 1 - ramp(frame, at, 10, EASE_FADE);
            return (
              <g key={i}>
                <Ink d={L.serverD[i]} fill={C.sheet} />
                <Write x={apiX} y={apiY} text="api" size={S} variant="mono" />
                <Chip b={sc} text="v1" C={C} color={C.ink} S={S} o={(1 - red) * out} />
                <Chip b={sc} text="v1" C={C} color={C.red} S={S} o={red * out} />
                <Chip b={sc} text="v2" C={C} color={C.ink} S={S} o={fade(frame, at + 8, Infinity, 4)} progress={ramp(frame, at + 8, 14)} />
              </g>
            );
          }
          // rolling deployment: the old box goes, a new one is inked, booted from meta.json → dict2 (v2)
          const oldO = 1 - ramp(frame, at, 10, EASE_FADE);
          const newP = ramp(frame, at + 8, 18);
          return (
            <g key={i}>
              {oldO > 0 ? (
                <g opacity={oldO}>
                  <Ink d={L.serverD[i]} fill={C.sheet} />
                  <Write x={apiX} y={apiY} text="api" size={S} variant="mono" />
                  <Chip b={sc} text="v1" C={C} color={C.ink} S={S} />
                </g>
              ) : null}
              <Pen d={L.serverD[i]} progress={newP} />
              <Write x={apiX} y={apiY} text="api" size={S} variant="mono" progress={ramp(frame, at + 20, 10)} />
              <Chip b={sc} text="v2" C={C} color={C.ink} S={S} o={fade(frame, at + 24, Infinity, 4)} progress={ramp(frame, at + 24, 12)} />
            </g>
          );
        })}

        {/* ===== answer bars: one per server, grown by the playhead ===== */}
        {L.bar.map((bar, i) => {
          const sw = SWITCH_AT[i];
          const a = Math.min(p, sw);
          const firstCol = top ? C.red : C.ink2;
          const firstWash = top ? C.redWash : 'none';
          const gap = g.ph ? 3 : 4;
          return (
            <g key={i}>
              {a > 0.002 ? (
                <rect x={x(0)} y={bar.y} width={Math.max(0, x(a) - x(0) - (p > sw ? gap : 0))} height={bar.h} rx={6} fill={firstWash} stroke={firstCol} strokeWidth={STROKE.ink - 0.8} />
              ) : null}
              {p > sw + 0.002 ? (
                <rect x={x(sw) + gap} y={bar.y} width={Math.max(0, x(p) - x(sw) - gap)} height={bar.h} rx={6} fill={C.greenWash} stroke={C.green} strokeWidth={STROKE.ink - 0.8} />
              ) : null}
              {top ? <Cross x={x(0) + (g.ph ? 16 : 20)} y={bar.y + bar.h / 2} s={g.MARK * 0.8} color={C.red} o={clamp01((x(a) - x(0) - (g.ph ? 30 : 36)) / 12)} /> : null}
              <Tick x={x(sw) + (g.ph ? 20 : 24)} y={bar.y + bar.h / 2} s={g.MARK} color={C.green} o={p > sw ? clamp01((x(p) - x(sw) - (g.ph ? 36 : 44)) / 12) : 0} />
            </g>
          );
        })}
        {/* labels, on row 1 only (the other rows repeat its pattern) */}
        {top ? (
          <Write x={x(0) + (g.ph ? 34 : 42)} y={L.bar[0].y + L.bar[0].h / 2 + S * 0.35} text="garbage" size={S} color="red" weight={600} progress={ramp(frame, ...EV.garbageLbl)} />
        ) : (
          <Write x={x(0) + (g.ph ? 10 : 14)} y={L.bar[0].y + L.bar[0].h / 2 + S * 0.35} text="a fruit" size={S} color="ink2" progress={ramp(frame, ...EV.fruitLbl)} />
        )}
        <Write
          x={x(SWITCH_AT[0]) + (g.ph ? 38 : 46)}
          y={L.bar[0].y + L.bar[0].h / 2 + S * 0.35}
          text="a round fruit"
          size={S}
          color="green"
          weight={600}
          progress={ramp(frame, ...(top ? EV.roundTop : EV.roundBot))}
        />

        {/* playhead */}
        {playO[L.key] > 0 ? (
          <line x1={x(p)} x2={x(p)} y1={L.playY[0]} y2={L.playY[1]} stroke={C.ink2} strokeWidth={STROKE.thin} strokeDasharray="6 6" opacity={playO[L.key]} />
        ) : null}

        {/* ===== under the tracks ===== */}
        {top ? (
          <>
            <Pen d={L.spanD} progress={Math.min(p, SWITCH_AT[2]) / SWITCH_AT[2]} color="red" width={STROKE.thick} />
            <Write x={x(0)} y={L.underY} text="until each reloads" size={S} color="red" progress={ramp(frame, ...EV.untilLbl)} />
            <Write x={x(1)} y={L.underY} text="time →" size={S} color="ink2" anchor="end" />
          </>
        ) : (
          <>
            <Write x={g.ph ? 20 : L.listX} y={L.underY} text="boots: reads meta.json" size={S} color="ink2" progress={ramp(frame, ...EV.bootLbl)} />
            <Write x={g.ph ? 704 : x(0)} y={L.underY} text="never garbage" size={S} color="green" weight={600} anchor={g.ph ? 'end' : 'start'} progress={ramp(frame, ...EV.neverLbl)} />
            {/* the phone's bottom row is full; the top lane's 'time →' covers both (one time scale) */}
            {g.ph ? null : <Write x={x(1)} y={L.underY} text="time →" size={S} color="ink2" anchor="end" />}
          </>
        )}
      </g>
    );
  };

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={g.W} height={g.H}>
        {lane(g.lanes.top)}
        {lane(g.lanes.bot)}
      </Stage>
      <Captions top={g.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default GarbageVsRolling;

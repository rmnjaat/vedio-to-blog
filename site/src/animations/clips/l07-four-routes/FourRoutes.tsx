// Clip l07-four-routes — "Four banks, one request".
// Storyboard: lectures/lec07/animations/l07-four-routes/storyboard.{yaml,md}.
// Ledger: L-0249, L-0250, L-0251, L-0252, L-0255 (context: L-0248, L-0245).
// Frame 0 = Fig 5·b in graphite: four panels (① proxy, ② smart client, ③ forwarding, ④ redirect), each a stick-figure
// client and desks c1–c3. The same request for `kiwi` (on c2) plays in each panel in turn while a counter adds one leg
// per message; then c2's job moves to c3 and the smart client's table goes stale. The last frame is the poster.
// Two layouts share one timeline: 'wide' (1200×800, a 2×2 grid) and 'phone' (720×1010, four stacked panels, the count
// on each panel's title row); lettering 40 / 30 px.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE, PAST} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write, useTheme} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, PANELS, type Leg} from './timeline';

export type FourRoutesProps = {theme: ThemeName; layout?: Layout};

// Wide lettering pinned to the page's sheets (critic C-17): the stage shows at ×0.45 (540 px), so 34 canvas px lands
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

const TITLES = ['proxy', 'smart client', 'forwarding', 'redirect'];
const DESKS = ['c1', 'c2', 'c3'];

// ---------- one panel's local geometry per layout (canvas px, relative to the panel origin) ----------
const LOCAL = {
  wide: {
    badge: [38, 30] as Pt, badgeR: 24, titleX: 70, titleY: 43,
    deskX: 410, deskW: 110, deskH: 48, deskY: [64, 128, 192], routeR: 564,
    fig: {x: 60, headY: 122, r: 14, arm: 30, hip: 56, foot: 92, armW: 22, legW: 18},
    clientR: 92, c1Y: 124, bendX: 262,
    proxy: {x: 180, w: 150},
    table: {x: 24, y: 94},
    bribe: [255, 222] as Pt, under: [242, 214] as Pt,
    count: {x: 24, y: 286},
    tick: 497, cross: 362, head: 18, mark: 11, ret: 13,
  },
  phone: {
    badge: [34, 30] as Pt, badgeR: 20, titleX: 64, titleY: 40,
    deskX: 560, deskW: 110, deskH: 40, deskY: [58, 110, 162], routeR: 704,
    fig: {x: 46, headY: 102, r: 12, arm: 28, hip: 50, foot: 80, armW: 18, legW: 15},
    clientR: 76, c1Y: 104, bendX: 400,
    proxy: {x: 250, w: 130},
    table: {x: 18, y: 78},
    bribe: [315, 188] as Pt, under: [300, 182] as Pt,
    count: {x: 312, y: 40},
    tick: 652, cross: 500, head: 15, mark: 9, ret: 11,
  },
};

const ORIGINS: Record<Layout, Pt[]> = {
  wide: [[20, 0], [620, 0], [20, 320], [620, 320]],
  phone: [[0, 8], [0, 226], [0, 444], [0, 662]],
};

const straight = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
const dirOf = (pts: Pt[]) => {
  const a = pts[pts.length - 2];
  const b = pts[pts.length - 1];
  const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [(b[0] - a[0]) / l, (b[1] - a[1]) / l] as const;
};

/**
 * An orthogonal polyline shifted `off` px to the right of its direction of travel (below a rightward run), corners
 * included: the answer's own line, parallel to the request's (Fig 5·b draws blue out, green back, side by side).
 */
const offsetPoly = (pts: Pt[], off: number): Pt[] => {
  const n = pts.slice(1).map((b, i) => {
    const a = pts[i];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(-(b[1] - a[1]) / l) * off, ((b[0] - a[0]) / l) * off] as const;
  });
  return pts.map(([x, y], k) => {
    const a = n[Math.max(0, k - 1)];
    const b = n[Math.min(n.length - 1, k)];
    const [ox, oy] = k === 0 || k === pts.length - 1 ? (k === 0 ? b : a) : [a[0] + b[0], a[1] + b[1]];
    return [x + ox, y + oy];
  });
};

/** d/head: the request's line; p/back: packet paths; rd/rhead: the answer's parallel line, drawn back to the sender. */
type Route = {d: string; head: string; p: string; back: string; rd: string; rhead: string; rback: string};

const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const L = LOCAL[layout];
  const TY = typeFor(layout);
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;

  const panels = ORIGINS[layout].map(([px, py], i) => {
    const P = (x: number, y: number): Pt => [px + x, py + y];
    const dc = L.deskY.map((y) => y + L.deskH / 2); // desk centre lines
    const dl = L.deskX; // desk left edge
    const dr = L.deskX + L.deskW; // desk right edge
    const route = (local: Pt[], seed: string, head = true): Route => {
      const pts = local.map(([x, y]) => P(x, y));
      const [ux, uy] = dirOf(pts);
      const ret = offsetPoly(pts, L.ret).reverse();
      const [rx, ry] = dirOf(ret);
      return {
        d: handPoly(pts, seed),
        head: head ? chevron(pts[pts.length - 1], ux, uy, L.head, seed + 'h') : '',
        p: straight(pts),
        back: straight([...pts].reverse()),
        rd: handPoly(ret, seed + 'r'),
        rhead: chevron(ret[ret.length - 1], rx, ry, L.head, seed + 'rh'),
        rback: straight(ret),
      };
    };
    const s = `p${i}${layout[0]}`;
    const routes: Record<string, Route> = {};
    const extra: Route[] = []; // graphite-only branches
    if (i === 0) {
      const pr = L.proxy.x + L.proxy.w;
      const bus = dl - 40;
      routes.toProxy = route([[L.clientR, dc[1]], [L.proxy.x, dc[1]]], s + 'tp');
      routes.fan2 = route([[pr, dc[1]], [dl, dc[1]]], s + 'f2');
      // the proxy's links to c1 and c3 are wires, not requests: no heads (only c2 is asked)
      extra.push(route([[bus, dc[1]], [bus, dc[0]], [dl, dc[0]]], s + 'f1', false));
      extra.push(route([[bus, dc[1]], [bus, dc[2]], [dl, dc[2]]], s + 'f3', false));
    }
    if (i === 1 || i === 3) routes.toC2 = route([[L.clientR, dc[1]], [dl, dc[1]]], s + 'c2');
    if (i === 2 || i === 3)
      routes.toC1 = route([[L.clientR, L.c1Y], [L.bendX, L.c1Y], [L.bendX, dc[0]], [dl, dc[0]]], s + 'c1');
    if (i === 2) routes.fwd = route([[dr, dc[0]], [L.routeR, dc[0]], [L.routeR, dc[1]], [dr, dc[1]]], s + 'fw');
    const move = i === 1 ? route([[dr, dc[1]], [L.routeR, dc[1]], [L.routeR, dc[2]], [dr, dc[2]]], s + 'mv') : null;
    return {
      i, px, py, P, dc,
      desks: L.deskY.map((y, k) => serverBox(px + dl, py + y, L.deskW, L.deskH, `${s}d${k}`)),
      proxy: i === 0 ? serverBox(px + L.proxy.x, py + L.deskY[1], L.proxy.w, L.deskH, s + 'px') : null,
      routes, extra, move,
    };
  });

  const sep = ph
    ? [1, 2, 3].map((k) => handPoly([[20, 8 + 218 * k - 5], [700, 8 + 218 * k - 5]], `sep${k}p`))
    : [handPoly([[600, 8], [600, 612]], 'sepv'), handPoly([[24, 316], [1176, 316]], 'seph')];

  return {ph, L, TY, W, H, panels, sep, CAPTION_TOP: ph ? 890 : 652};
};

const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type Geo = (typeof LAYOUTS)['wide'];
type PanelGeo = Geo['panels'][number];

const crossD = (x: number, y: number, s: number) => `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`;
const tickD = (x: number, y: number, s: number) => `M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.75} L ${x + s} ${y - s * 0.8}`;

/** A red ✕ or green ✓ with a sheet-coloured halo, drawn as strokes. */
const Mark: React.FC<{kind: 'x' | 'tick'; x: number; y: number; s: number; opacity: number}> = ({kind, x, y, s, opacity}) => {
  const t = useTheme();
  if (opacity <= 0) return null;
  const d = kind === 'x' ? crossD(x, y, s) : tickD(x, y, s);
  return (
    <g opacity={opacity}>
      <path d={d} stroke={t.sheet} strokeWidth={STROKE.ink + 6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={kind === 'x' ? t.red : t.green} strokeWidth={STROKE.ink + 1.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
};

/** Stick-figure client: head, body, arms, legs. */
const Client: React.FC<{G: Geo; p: PanelGeo}> = ({G, p}) => {
  const f = G.L.fig;
  const t = useTheme();
  const [x, hy] = p.P(f.x, f.headY);
  const s = `cl${p.i}${G.ph ? 'p' : 'w'}`;
  const body = handPoly([[x, hy + f.r], [x, hy + f.hip]], s + 'b');
  const arms = handPoly([[x - f.armW, hy + f.arm], [x + f.armW, hy + f.arm]], s + 'a');
  const legs = handPoly([[x - f.legW, hy + f.foot], [x, hy + f.hip], [x + f.legW, hy + f.foot]], s + 'l');
  return (
    <g>
      <circle cx={x} cy={hy} r={f.r} fill={t.sheet} stroke={t.ink} strokeWidth={STROKE.ink} />
      <Ink d={body} />
      <Ink d={arms} />
      <Ink d={legs} />
    </g>
  );
};

/** The leg counter: `n leg(s)`, the newest count written in as each message lands, then `· k round trip(s)`. */
const Count: React.FC<{G: Geo; p: PanelGeo; frame: number}> = ({G, p, frame}) => {
  const ev = PANELS[p.i];
  const size = G.TY.mono;
  const [x, y] = p.P(G.L.count.x, G.L.count.y);
  const lands = ev.legs.map((l) => l.at[0] + l.at[1]);
  const cw = size * 0.6; // Recursive MONO advance
  const n = lands.length;
  const legsText = `${n} legs`;
  return (
    <g>
      {lands.map((at, k) => {
        const next = lands[k + 1] ?? Infinity;
        const o = next === Infinity ? 1 : 1 - ramp(frame, next, 6, EASE_FADE);
        const text = `${k + 1} ${k === 0 ? 'leg' : 'legs'}`;
        return <Write key={k} x={x} y={y} text={text} size={size} variant="mono" progress={ramp(frame, at, 10)} opacity={o} />;
      })}
      <Write
        x={x + cw * (legsText.length + 1)}
        y={y}
        text={`· ${ev.trips} round ${ev.trips === 1 ? 'trip' : 'trips'}`}
        size={size}
        variant="mono"
        progress={ramp(frame, ...ev.trip)}
      />
    </g>
  );
};

/**
 * One leg in flight: a request re-inks its route in blue (and stays blue); an answer pens its own parallel line back
 * to the sender in its colour (and stays), so every counted leg is on the sheet.
 */
const LegMotion: React.FC<{r: Route; leg: Leg; frame: number}> = ({r, leg, frame}) => {
  const p = ramp(frame, leg.at[0], leg.at[1], EASE_MOVE);
  return (
    <g>
      {leg.back ? (
        <Pen d={r.rd} head={r.rhead} progress={p} color={leg.color} width={STROKE.ink} />
      ) : (
        <Pen d={r.d} head={r.head} progress={p} color="blue" width={STROKE.ink + 0.8} />
      )}
      <Packet d={leg.back ? r.rback : r.p} progress={p} color={leg.color} r={10} />
    </g>
  );
};

const NEXT_BEAT = [BEAT.smart, BEAT.forward, BEAT.redirect, BEAT.moved];

/** Panel ink: past panels ghost to 38%; in B5 only the smart client's panel is at full ink; at B6 all return. */
const panelOpacity = (i: number, frame: number) => {
  let dim = ramp(frame, NEXT_BEAT[i], EV.focus, EASE_FADE);
  if (i === 1) dim *= 1 - ramp(frame, BEAT.moved, EV.focus, EASE_FADE);
  dim *= 1 - ramp(frame, BEAT.end, EV.focus, EASE_FADE);
  return 1 - (1 - PAST) * dim;
};

export const FourRoutes: React.FC<FourRoutesProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T: Theme = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const {L} = G;
  const TS = G.TY.label;
  const dy = TS * 0.35;
  const cw = G.TY.mono * 0.6;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {G.sep.map((d, k) => (
          <Ink key={k} d={d} color="ink3" width={STROKE.thin} dash="10 10" />
        ))}
        {G.panels.map((p) => {
          const ev = PANELS[p.i];
          const o = panelOpacity(p.i, frame);
          const [tx, ty] = p.P(L.titleX, L.titleY);
          const [bx, by] = p.P(L.badge[0], L.badge[1]);
          const okO = fade(frame, ev.ok[0], Infinity, ev.ok[1]) * (p.i === 1 ? 1 - (1 - PAST) * ramp(frame, BEAT.moved, EV.focus, EASE_FADE) : 1);
          return (
            <g key={p.i} opacity={o}>
              {/* ===== static figure (frame 0) ===== */}
              <StepBadge x={bx} y={by} n={p.i + 1} r={L.badgeR} />
              <Write x={tx} y={ty} text={TITLES[p.i]} size={TS} />
              <Client G={G} p={p} />
              {/* every request line has its reply's line beside it from frame 0, faint and dashed, so the opening
                  overview already reads as the poster does: out and back, never a fan-out (critic C-11) */}
              {Object.values(p.routes).map((r, k) => (
                <g key={`r${k}`}>
                  <Ink d={r.rd} color="ink3" width={STROKE.thin} dash="8 8" />
                  <Ink d={r.rhead} color="ink3" width={STROKE.thin} />
                  <Ink d={r.d} />
                  <Ink d={r.head} />
                </g>
              ))}
              {/* the proxy's wires to c1 and c3: thin, headless, no reply (only c2 is asked) */}
              {p.extra.map((r, k) => (
                <g key={`x${k}`}>
                  <Ink d={r.d} color="ink3" width={STROKE.thin} />
                </g>
              ))}
              {p.desks.map((d, k) => {
                const [nx, ny] = p.P(L.deskX + 14, p.dc[k] + dy); // dc is panel-local
                return (
                  <g key={`d${k}`}>
                    <Ink d={d} fill={T.sheet} />
                    <Write x={nx} y={ny} text={DESKS[k]} size={TS} variant="mono" />
                  </g>
                );
              })}
              {p.proxy ? (
                <g>
                  <Ink d={p.proxy} fill={T.sheet} />
                  <Write x={p.px + L.proxy.x + L.proxy.w / 2} y={p.py + p.dc[1] + dy} text="proxy" size={TS} variant="mono" anchor="middle" />
                </g>
              ) : null}
              {p.i === 1 ? (
                <g>
                  <Write x={p.px + L.table.x} y={p.py + L.table.y} text="kiwi →" size={TS} variant="mono" />
                  <Write x={p.px + L.table.x + cw * 7} y={p.py + L.table.y} text="c2" size={TS} variant="mono" />
                </g>
              ) : null}

              {/* ===== motion: the messages, in order ===== */}
              {ev.legs.map((leg, k) => (
                <LegMotion key={`l${k}`} r={p.routes[leg.path]} leg={leg} frame={frame} />
              ))}
              <Mark kind="tick" x={p.px + L.tick} y={p.py + p.dc[1]} s={L.mark} opacity={okO} />
              <Count G={G} p={p} frame={frame} />

              {/* ===== annotations ===== */}
              {p.i === 0 ? <Write x={p.px + L.bribe[0]} y={p.py + L.bribe[1]} text="the fee" size={TS} anchor="middle" progress={ramp(frame, ...EV.bribe)} /> : null}
              {p.i === 1 ? <Write x={p.px + L.under[0]} y={p.py + L.under[1]} text="no middle hop" size={TS} anchor="middle" progress={ramp(frame, ...EV.noHop)} /> : null}
              {p.i === 3 ? <Write x={p.px + L.under[0]} y={p.py + L.under[1]} text="c1: go to c2" size={TS} anchor="middle" progress={ramp(frame, ...EV.goTo)} /> : null}

              {/* ===== B5: c2's job moves to c3; the smart client's table is stale ===== */}
              {p.move ? (
                <g>
                  <Pen d={p.move.d} head={p.move.head} progress={ramp(frame, ...EV.move, EASE_MOVE)} dash="12 10" />
                  <Packet d={p.move.p} progress={ramp(frame, ...EV.move, EASE_MOVE)} color="ink2" r={9} />
                  <Mark kind="x" x={p.px + L.cross} y={p.py + p.dc[1]} s={L.mark + 4} opacity={fade(frame, EV.cross[0], Infinity, EV.cross[1])} />
                  <StrikeC2 x={p.px + L.table.x + cw * 7} y={p.py + L.table.y - TS * 0.32} w={cw * 2} frame={frame} />
                  <Write
                    x={p.px + L.table.x + cw * 9 + TS * 0.4}
                    y={p.py + L.table.y}
                    text="stale"
                    size={TS}
                    color="red"
                    weight={600}
                    progress={ramp(frame, ...EV.stale)}
                  />
                </g>
              ) : null}
            </g>
          );
        })}
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** Red strike drawn left→right through `c2` in the smart client's table. */
const StrikeC2: React.FC<{x: number; y: number; w: number; frame: number}> = ({x, y, w, frame}) => {
  const d = handPoly([[x - 4, y + 2], [x + w + 4, y - 2]], 'strike');
  return <Pen d={d} progress={ramp(frame, ...EV.strike)} color="red" width={STROKE.ink + 0.8} />;
};

export default FourRoutes;

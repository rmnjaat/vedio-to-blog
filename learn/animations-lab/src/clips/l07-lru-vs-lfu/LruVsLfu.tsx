// Clip l07-lru-vs-lfu — "A scan and a spike".
// Storyboard: lectures/lec07/animations/l07-lru-vs-lfu/storyboard.{yaml,md}. Ledger: L-0165, L-0167, L-0168, L-0169.
// Frame 0 = the ticker "read [ ]" and two empty six-slot caches: LRU (by recency) and LFU (by frequency).
// The last frame is the annotated poster. Two layouts share one timeline: 'wide' (1200×800, the caches side by side)
// and 'phone' (720×1000, portrait re-flow: LRU above LFU).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handLine, serverBox} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, READS} from './timeline';
import {SLOTS, STEPS, stepAt, timing, type Policy, type Step} from './sim';

export type LruVsLfuProps = {theme: ThemeName; layout?: Layout};

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

const POLICIES: Policy[] = ['lru', 'lfu'];
const KEYS = ['A', 'B', 'C', 'D', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  // LFU cards hold the key and its count; LRU cards only the key, so they are shorter (bottoms aligned), which leaves
  // room for a hit card to lift fully clear of the row on its way to the head without touching the title.
  const CARD = ph
    ? {w: 100, h: 96, hLru: 68, step: 112, keyLru: 46, keyLfu: 40, count: 80}
    : {w: 74, h: 110, hLru: 76, step: 84, keyLru: 52, keyLfu: 48, count: 96};
  const cardH = (p: Policy) => (p === 'lru' ? CARD.hLru : CARD.h);
  const cardTop = (p: Policy) => (p === 'lru' ? CARD.h - CARD.hLru : 0);
  const rowW = CARD.step * (SLOTS - 1) + CARD.w;
  // origin of each cache block: wide = side by side, phone = stacked
  const origin = (c: number) => (ph ? {x: 30, y: c * 384} : {x: c === 0 ? 50 : 656, y: 0});
  const R = ph
    ? {title: 128, cards: 190, under: 326, evicted: 376, evictedKeys: 376, morning: 424, summary: 424}
    : {title: 132, cards: 196, under: 356, evicted: 414, evictedKeys: 466, morning: 530, summary: 590};
  const geo = POLICIES.map((p, c) => {
    const o = origin(c);
    return {
      o,
      top: o.y + R.cards + cardTop(p),
      h: cardH(p),
      slots: Array.from({length: SLOTS}, (_, i) => serverBox(o.x + i * CARD.step, o.y + R.cards + cardTop(p), CARD.w, cardH(p), `slot-${p}${i}`)),
      // one card outline per key, drawn at the card's own origin and translated (the wobble never changes)
      cards: Object.fromEntries(KEYS.map((k) => [k, serverBox(0, 0, CARD.w, cardH(p), `card-${p}-${k}`)])) as Record<string, string>,
    };
  });
  const TICK = ph ? {x: 322, y: 12, w: 76, h: 54, label: 308, base: 50} : {x: 562, y: 14, w: 76, h: 62, label: 548, base: 58};
  return {
    ph,
    W,
    H,
    TY,
    CARD,
    rowW,
    R,
    geo,
    TICK,
    tickBox: serverBox(TICK.x, TICK.y, TICK.w, TICK.h, 'ticker'),
    // evicted keys: wide = under the card columns on their own row; phone = on the label's line
    evictedX: (c: number, j: number) => (ph ? 30 + 330 + j * 74 : geo[c].o.x + j * CARD.step + CARD.w / 2),
    markX: (c: number, j: number) => geo[c].o.x + (ph ? 172 : 206) + j * (ph ? 44 : 52),
    summaryX: (c: number) => geo[c].o.x + (ph ? 172 + 4 * 44 + 6 : 0),
    MARK: ph ? 0.78 : 1,
    LIFT: ph ? 76 : 86, // > the LRU card height: the moving card passes above the others, never over them
    CAPTION_TOP: ph ? 842 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type G = ReturnType<typeof build>;

const colourOf = (s: Step, policy: Policy): MarkerColor =>
  s.read.phase !== 'morning' ? 'blue' : policy === 'lru' ? 'red' : 'green';

export const LruVsLfu: React.FC<LruVsLfuProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const n = stepAt(frame);
  const read = n >= 0 ? READS[n] : null;
  const tickerColour: MarkerColor = frame >= EV.tickerRest[0] ? 'ink2' : 'blue';

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== ticker: the key being read (both caches get every read) ===== */}
        <Write x={G.TICK.label} y={G.TICK.base} text="read" size={TS} anchor="end" />
        <Ink d={G.tickBox} fill={T.sheet} />
        {read ? (
          <Write
            key={n}
            x={G.TICK.x + G.TICK.w / 2}
            y={G.TICK.base + 1}
            text={read.key}
            size={TS}
            variant="mono"
            anchor="middle"
            color={tickerColour}
            weight={600}
            progress={ramp(frame, read.at, 8)}
          />
        ) : null}

        {POLICIES.map((policy, c) => (
          <CacheBlock key={policy} G={G} T={T} c={c} policy={policy} frame={frame} n={n} />
        ))}
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const CacheBlock: React.FC<{G: G; T: Theme; c: number; policy: Policy; frame: number; n: number}> = ({G, T, c, policy, frame, n}) => {
  const TS = G.TY.label;
  const {o, slots} = G.geo[c];
  const steps = STEPS[policy];
  const lru = policy === 'lru';
  const R = G.R;
  const scanEvictions = steps.filter((s) => s.read.phase === 'scan' && s.evicted);
  const morning = steps.filter((s) => s.read.phase === 'morning');
  const arrowY = o.y + R.under - TS * 0.32;
  const arrow0 = o.x + (G.ph ? 118 : 150);
  const arrow1 = o.x + G.rowW - (G.ph ? 118 : 150);

  return (
    <g>
      {/* ===== static figure (frame 0) ===== */}
      <Write x={o.x} y={o.y + R.title} text={lru ? 'LRU · by recency' : 'LFU · by frequency'} size={G.TY.title} />
      {slots.map((d, i) => (
        <Ink key={i} d={d} color="ink3" width={STROKE.thin} dash="10 9" />
      ))}
      {lru ? (
        <>
          <Write x={o.x} y={o.y + R.under} text="newest" size={TS} color="ink2" />
          <Ink d={handLine([arrow0, arrowY], [arrow1, arrowY], `arr-${c}`)} color="ink2" width={STROKE.thin + 0.6} />
          <Ink d={chevron([arrow1, arrowY], 1, 0, 12, `arh-${c}`)} color="ink2" width={STROKE.thin + 0.6} />
          <Write x={o.x + G.rowW} y={o.y + R.under} text="oldest" size={TS} color="ink2" anchor="end" />
        </>
      ) : (
        <Write x={o.x} y={o.y + R.under} text="count = times read" size={TS} color="ink2" />
      )}

      {/* ===== the cards ===== */}
      <Cards G={G} T={T} c={c} policy={policy} frame={frame} n={n} />

      {/* ===== B2: what the scan evicted ===== */}
      <Write x={o.x} y={o.y + R.evicted} text="the scan evicted:" size={TS} progress={ramp(frame, ...EV.evictedLabel)} />
      {scanEvictions.map((s, j) => (
        <Write
          key={s.evicted!.key}
          x={G.evictedX(c, j)}
          y={o.y + R.evictedKeys}
          text={s.evicted!.key}
          size={TS}
          variant="mono"
          anchor={G.ph ? 'start' : 'middle'}
          color="red"
          weight={600}
          progress={ramp(frame, s.read.at + 4, 14)}
        />
      ))}

      {/* ===== B3: the morning reads, one mark each ===== */}
      <Write x={o.x} y={o.y + R.morning} text="morning:" size={TS} progress={ramp(frame, ...EV.morningLabel)} />
      {morning.map((s, j) => {
        const op = fade(frame, s.read.at + 6, Infinity, 8);
        const x = G.markX(c, j);
        const y = o.y + R.morning - TS * 0.34;
        return s.hit ? <Tick key={j} x={x} y={y} color={T.green} o={op} s={G.MARK} /> : <Cross key={j} x={x} y={y} color={T.red} o={op} s={G.MARK} />;
      })}

      {/* ===== B4: the tally ===== */}
      <Write
        x={G.summaryX(c)}
        y={o.y + R.summary}
        text={lru ? `${morning.filter((s) => !s.hit).length} misses` : `${morning.filter((s) => s.hit).length} hits`}
        size={TS}
        color={lru ? 'red' : 'green'}
        weight={650}
        progress={lru ? ramp(frame, ...EV.missesNote) : ramp(frame, ...EV.hitsNote)}
      />
    </g>
  );
};

/** The cards of one cache at `frame`: the current step's before → after transition. */
const Cards: React.FC<{G: G; T: Theme; c: number; policy: Policy; frame: number; n: number}> = ({G, T, c, policy, frame, n}) => {
  if (n < 0) return null;
  const s = STEPS[policy][n];
  const t = frame - s.read.at;
  const tm = timing(s);
  const {o, cards} = G.geo[c];
  const lru = policy === 'lru';
  const slotX = (i: number) => o.x + i * G.CARD.step;
  const {top: y0, h: KH} = G.geo[c];
  const colour = colourOf(s, policy);
  const colourO = 1 - ramp(t, tm.colourEnd, 8, EASE_FADE);

  type Placed = {key: string; x: number; y: number; opacity: number; pen: number; write: number; colour: MarkerColor | null; colourO: number; count: number | null; countP: number; top: boolean};
  const out: Placed[] = [];
  const keys = new Set([...s.before, ...s.after].filter((k): k is string => k !== null));
  for (const key of keys) {
    const bi = s.before.indexOf(key);
    const ai = s.after.indexOf(key);
    const count = lru ? null : (s.counts[key] ?? null);
    if (ai < 0) {
      // evicted: outline goes red, then the card fades away in place
      out.push({key, x: slotX(bi), y: y0, opacity: 1 - ramp(t, 4, 10, EASE_FADE), pen: 1, write: 1, colour: 'red', colourO: fade(frame, s.read.at, Infinity, 4), count: lru ? null : (STEPS[policy][n - 1]?.counts[key] ?? null), countP: 1, top: false});
    } else if (bi < 0) {
      // inserted: the pen draws the card where it lands, then the key (and count 1) is written
      out.push({key, x: slotX(ai), y: y0, opacity: 1, pen: ramp(t, ...tm.pen), write: ramp(t, ...tm.write), colour, colourO, count, countP: ramp(t, ...tm.write), top: true});
    } else if (key === s.read.key) {
      // hit: LRU lifts the card clear of the row, carries it to the head and sets it down; LFU re-inks it and
      // re-writes its count
      const [m0, md] = tm.move;
      const lift = lru ? ramp(t, m0, md * 0.25, EASE_MOVE) * (1 - ramp(t, m0 + md * 0.75, md * 0.25, EASE_MOVE)) : 0;
      const p = lru ? ramp(t, m0 + md * 0.2, md * 0.6, EASE_MOVE) : 1;
      out.push({
        key,
        x: slotX(bi) + (slotX(ai) - slotX(bi)) * p,
        y: y0 - G.LIFT * lift,
        opacity: 1,
        pen: 1,
        write: 1,
        colour,
        colourO,
        count,
        countP: ramp(t, ...tm.count),
        top: true,
      });
    } else {
      // a bystander: LRU shifts it one slot right (after an eviction, once the evicted card has faded)
      const [m0, md] = s.hit ? tm.move : tm.shift;
      // on a hit the others make room while the read card is up (the same window as its sideways move)
      const p = s.hit ? ramp(t, m0 + md * 0.2, md * 0.6, EASE_MOVE) : ramp(t, m0, md, EASE_MOVE);
      out.push({key, x: slotX(bi) + (slotX(ai) - slotX(bi)) * p, y: y0, opacity: 1, pen: 1, write: 1, colour: null, colourO: 0, count, countP: 1, top: false});
    }
  }
  out.sort((a, b) => Number(a.top) - Number(b.top));
  const K = G.CARD;
  const TS = G.TY.label;
  return (
    <>
      {out.map((p) => (
        <g key={p.key} transform={`translate(${p.x} ${p.y})`} opacity={p.opacity}>
          <rect x={2} y={2} width={K.w - 4} height={KH - 4} fill={T.sheet} opacity={Math.min(1, p.pen * 3)} />
          <Pen d={cards[p.key]} progress={p.pen} />
          {p.colour && p.colourO > 0 ? <Pen d={cards[p.key]} progress={p.pen} color={p.colour} width={STROKE.ink + 1.4} opacity={p.colourO} /> : null}
          <Write x={K.w / 2} y={lru ? K.keyLru : K.keyLfu} text={p.key} size={TS} variant="mono" anchor="middle" weight={600} progress={p.write} />
          {p.count !== null ? <Write key={`${p.key}${p.count}`} x={K.w / 2} y={K.count} text={String(p.count)} size={TS} variant="num" anchor="middle" color="ink2" progress={p.countP} /> : null}
        </g>
      ))}
    </>
  );
};

const Tick: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 1}) =>
  o <= 0 ? null : (
    <path
      d={`M ${x - 13 * s} ${y + 1 * s} L ${x - 3 * s} ${y + 11 * s} L ${x + 14 * s} ${y - 12 * s}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink + 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );

const Cross: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 1}) =>
  o <= 0 ? null : (
    <path
      d={`M ${x - 11 * s} ${y - 11 * s} L ${x + 11 * s} ${y + 11 * s} M ${x + 11 * s} ${y - 11 * s} L ${x - 11 * s} ${y + 11 * s}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink + 1}
      strokeLinecap="round"
      opacity={o}
    />
  );

export default LruVsLfu;

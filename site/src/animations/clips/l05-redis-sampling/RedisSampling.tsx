// Clip l05-redis-sampling — "Twenty keys at a time": the classic Redis expiry job samples 20 keys with a TTL, deletes
// the expired ones, and goes again while more than 10% of the batch was expired (20%, 15%, then 5%: stop). Expired
// keys stay behind; a later GET deletes one on the spot (lazy deletion). Poster note: one example run (the 6.0 rule is in the caption line only).
// Storyboard: lectures/lec05/animations/l05-redis-sampling/storyboard.{yaml,md}.
// Ledger: L-0243, L-0244, L-0247, L-0249, L-0250, L-0251, L-0252, L-0301 (SN-12 note at the end).
// Frame 0 = Fig 4·b's parts (field + empty sample frame); the last frame is the annotated poster.
import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {chevron, handPoly, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, ROUNDS} from './timeline';
import {COLS, EXPIRED, GET_KEY, LEFTOVERS, N, SAMPLES, SAMPLE_EXPIRED, deletedInRound, ringRect, square, strike, tickIn} from './field';

export type RedisSamplingProps = {theme: ThemeName; layout?: Layout};

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

// Field and tray sizes per layout. Wide: the field is drawn at Fig 4·b's scale (38 px pitch ≈ 17 px on the 540 px
// stage, keys ≈ 13 px), so the clip and the sheet beside it show one grid (critic C-05). Phone: unchanged.
const SIZES = {
  wide: {P: 38, SQ: 28, TP: 40, TS: 30},
  phone: {P: 32, SQ: 24, TP: 46, TS: 34},
};

// Order in which a round's rings stamp: seeded, so the picks read as random rather than a scan.
const RING_RANK: number[][] = SAMPLES.map((smp) => {
  const byRand = [...smp].sort((a, b) => random(`ring${a}`) - random(`ring${b}`));
  return smp.map((i) => byRand.indexOf(i));
});

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: field of 200 keys on the left, the sample tray and round log on the right, the 6.0 note bottom left.
// phone 720×1010: the same field on top, tray (left) and log (right) under it, the 6.0 note under them.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const TY = typeFor(layout);
  const S = TY.label;
  const {P, SQ, TP, TS} = SIZES[layout];
  const FX = ph ? 45 : 40;
  const FY = ph ? 120 : 124;
  const keyXY = (i: number): Pt => [FX + (i % COLS) * P, FY + Math.floor(i / COLS) * P];
  const keys = [...Array(N).keys()].map((i) => {
    const [x, y] = keyXY(i);
    return {
      i,
      x,
      y,
      box: square(x, y, SQ, `k${i}`),
      strike: EXPIRED.has(i) ? strike(x, y, SQ, `s${i}`) : '',
      tick: tickIn(x, y, SQ),
      // pad just under half the gap: two sampled neighbours share one ring edge instead of a doubled pair of lines
      ring: ringRect(x, y, SQ, (P - SQ) / 2 - 0.5),
    };
  });
  const tray = ph ? {x: 40, y: 552, w: 254, h: 208} : {x: 846, y: 124, w: 230, h: 186};
  const TX0 = tray.x + (tray.w - (5 * TP - (TP - TS))) / 2;
  const TY0 = tray.y + (tray.h - (4 * TP - (TP - TS))) / 2;
  const slots = [...Array(20).keys()].map((j) => {
    const x = TX0 + (j % 5) * TP;
    const y = TY0 + Math.floor(j / 5) * TP;
    return {x, y, box: square(x, y, TS, `t${j}`), strike: strike(x, y, TS, `ts${j}`), tick: tickIn(x, y, TS)};
  });
  const [gx, gy] = keyXY(GET_KEY);
  const getX = gx + SQ / 2;
  const getPts: Pt[] = ph ? [[getX, 56], [getX, FY - 7]] : [[getX, 76], [getX, FY - 7]];
  const log = ph ? {x: 330, hy: 548, rows: [606, 662, 718], bx: 346, br: 16, mx: 372, vx: 540} : {x: 834, hy: 368, rows: [420, 470, 520], bx: 854, br: 19, mx: 884, vx: 1064};
  const note = ph ? {x: 32, y: 784, w: 400, h: 96, l1: 820, l2: 862, tx: 48} : {x: 34, y: 562, w: 470, h: 92, l1: 600, l2: 640, tx: 52};
  return {
    ph,
    S,
    keys,
    slots,
    W: ph ? META.phone.width : META.width,
    H: ph ? META.phone.height : META.height,
    trayD: handPoly(
      [
        [tray.x, tray.y],
        [tray.x + tray.w, tray.y],
        [tray.x + tray.w, tray.y + tray.h],
        [tray.x, tray.y + tray.h],
        [tray.x, tray.y],
      ],
      'tray',
    ),
    trayLbl: {x: tray.x + tray.w / 2, y: tray.y - (ph ? 18 : 22)},
    fieldLbl: {x: FX, y: FY - (ph ? 20 : 24)},
    shareLbl: {x: FX, y: ph ? 478 : 540},
    getD: handPoly(getPts, 'get'),
    getHead: chevron(getPts[1], 0, 1, ph ? 14 : 16, 'geth'),
    getLbl: {x: getX, y: ph ? 44 : 66},
    // "deleted on read" ends well left of the GET label (they touched at 40 px)
    getNote: {x: getX - (ph ? 50 : 66), y: ph ? 44 : 66},
    log,
    noteD: handPoly(
      [
        [note.x, note.y],
        [note.x + note.w, note.y],
        [note.x + note.w, note.y + note.h],
        [note.x, note.y + note.h],
        [note.x, note.y],
      ],
      'note',
    ),
    note,
    pr: ph ? 8 : 9,
    CAPTION_TOP: ph ? 892 : 672,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const at = (r: readonly [number, number]) => r;
const pct = (e: number) => Math.round((e / 20) * 100);

export const RedisSampling: React.FC<RedisSamplingProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const S = G.S;
  const red = ramp(frame, ...at(EV.leftRed), EASE_FADE);

  // ---- field: keys, strikes, deletions ----
  const field = G.keys.map((k) => {
    const dr = deletedInRound(k.i);
    const isGet = k.i === GET_KEY;
    const goneAt = dr >= 0 ? ROUNDS[dr].del[0] : isGet ? EV.getDel[0] : Infinity;
    const keyO = goneAt === Infinity ? 1 : 1 - ramp(frame, goneAt, 10, EASE_FADE);
    const tickP = goneAt === Infinity ? 0 : ramp(frame, goneAt + 2, 12);
    const tickO = dr >= 0 ? ghost(frame, ROUNDS[dr].out) : 1;
    const isLeft = LEFTOVERS.includes(k.i);
    return (
      <g key={k.i}>
        {keyO > 0 ? (
          <g opacity={keyO}>
            <Ink d={k.box} fill={T.sheet} width={2.8} />
            {k.strike ? <Ink d={k.strike} width={3.2} /> : null}
            {k.strike && isLeft ? <Ink d={k.strike} color="red" width={3.6} opacity={red} /> : null}
          </g>
        ) : null}
        <g opacity={tickO}>
          <Pen d={k.tick} progress={tickP} color="green" width={3.6} />
        </g>
      </g>
    );
  });

  // ---- rings: the keys a round reads ----
  const rings = SAMPLES.map((smp, r) => {
    const R = ROUNDS[r];
    // rounds 1–2 hand their place to the next round; round 3's rings stay ghosted, so the poster still shows the
    // sample scattered over the field (critic C-08)
    const off = r < 2 ? 1 - ramp(frame, R.out, 14, EASE_FADE) : ghost(frame, R.out);
    return smp.map((i, j) => {
      const o = ramp(frame, R.rings[0] + (RING_RANK[r][j] * (R.rings[1] - 6)) / 19, 6, EASE_FADE) * off;
      return o > 0 ? <Ink key={`r${r}-${i}`} d={G.keys[i].ring} color="blue" width={3} opacity={o} /> : null;
    });
  });

  // ---- tray: the current sample (round 3's stays for the poster) ----
  const tray = SAMPLES.map((smp, r) => {
    const R = ROUNDS[r];
    const out = r < 2 ? 1 - ramp(frame, R.out, 10, EASE_FADE) : 1;
    return smp.map((i, j) => {
      const sl = G.slots[j];
      const o = ramp(frame, R.tray[0] + (j * (R.tray[1] - 6)) / 19, 6, EASE_FADE) * out;
      if (o <= 0) return null;
      const exp = EXPIRED.has(i);
      const keyO = exp ? 1 - ramp(frame, R.del[0], 10, EASE_FADE) : 1;
      return (
        <g key={`t${r}-${j}`} opacity={o}>
          {keyO > 0 ? (
            <g opacity={keyO}>
              <Ink d={sl.box} fill={T.sheet} />
              {exp ? <Ink d={sl.strike} width={3.6} /> : null}
            </g>
          ) : null}
          {exp ? <Pen d={sl.tick} progress={ramp(frame, R.del[0] + 2, 12)} color="green" width={4.2} /> : null}
        </g>
      );
    });
  });

  // ---- round log ----
  const L = G.log;
  const rows = ROUNDS.map((R, r) => {
    const y = L.rows[r];
    const e = SAMPLE_EXPIRED[r];
    return (
      <g key={`row${r}`}>
        <StepBadge x={L.bx} y={y - S * 0.33} n={r + 1} r={L.br} opacity={fade(frame, R.row[0], Infinity, 8)} />
        <Write x={L.mx} y={y} text={`${e}/20=${pct(e)}%`} variant="mono" size={S} progress={ramp(frame, ...at(R.row))} />
        <Write x={L.vx} y={y} text={r < 2 ? 'again' : 'stop'} size={S} weight={r < 2 ? undefined : 640} progress={ramp(frame, ...at(R.verdict))} />
      </g>
    );
  });

  return (
    <Sheet theme={theme}>
      <Stage title="Redis samples 20 keys at a time" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): field, its labels, the empty sample frame ===== */}
        <Write x={G.fieldLbl.x} y={G.fieldLbl.y} text="keys with an expiry" size={S} />
        {field}
        <Write x={G.shareLbl.x} y={G.shareLbl.y} text="≈ 15% expired" size={S} opacity={1 - ramp(frame, EV.shareOut, 10, EASE_FADE)} />
        <Ink d={G.trayD} dash="13 10" width={STROKE.ink} />
        <Write x={G.trayLbl.x} y={G.trayLbl.y} text="sample of 20" size={S} anchor="middle" />

        {/* ===== B1–B2: rounds ===== */}
        {rings}
        {tray}
        <Write x={L.x} y={L.hy} text="again if > 10%" size={S} progress={ramp(frame, ...at(EV.rule))} />
        {rows}

        {/* ===== B3: leftovers ===== */}
        <Write x={G.shareLbl.x} y={G.shareLbl.y} text="≈ 11% still expired" size={S} color="red" weight={600} progress={ramp(frame, ...at(EV.share2))} />

        {/* ===== B4: a GET deletes a leftover ===== */}
        <Write x={G.getLbl.x} y={G.getLbl.y} text="GET" variant="mono" size={S} color="blue" anchor="middle" progress={ramp(frame, ...at(EV.getLbl))} />
        <Pen d={G.getD} progress={ramp(frame, ...at(EV.get), EASE_MOVE)} head={G.getHead} color="blue" />
        <Packet d={G.getD} progress={ramp(frame, ...at(EV.get), EASE_MOVE)} color="blue" r={G.pr} />
        <Write x={G.getNote.x} y={G.getNote.y} text="deleted on read" size={S} color="green" weight={600} anchor="end" progress={ramp(frame, ...at(EV.getNote))} />

        {/* ===== B5: the current rule is in the caption line; the sheet only marks this as one example run (C-17) ===== */}
        <Write x={G.note.tx} y={G.note.l1} text="one example run:" size={S} color="ink2" progress={ramp(frame, ...at(EV.note1))} />
        <Write x={G.note.tx} y={G.note.l2} text="the counts vary" size={S} color="ink2" progress={ramp(frame, ...at(EV.note2))} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default RedisSampling;

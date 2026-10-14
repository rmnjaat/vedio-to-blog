// Clip l03-offset-vs-keyset — "Page 1, page 10, page 1,000".
// Storyboard: lectures/lec03/animations/l03-offset-vs-keyset/storyboard.{yaml,md}. Ledger: L-0218, L-0224, L-0228, L-0233.
// Frame 0 = Fig 8·a as a table: pages 1 / 10 / 100 / 1,000; a limit-offset column of empty row strips and an ID-limit
// column of index-descent glyphs. The last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, two columns side by side) and 'phone' (720×1050, the two columns
// stacked as two blocks, each with its own header and notes).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, MAX_OFFSET, META, PAGES, ROWS} from './timeline';

export type OffsetVsKeysetProps = {theme: ThemeName; layout?: Layout};

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const PAGE_X = ph ? 130 : 170; // page numbers, right-aligned
  // offset column / block
  const OFF = ph ? {x0: 150, x1: 690, ringW: 46, ringH: 36, stripH: 26} : {x0: 200, x1: 700, ringW: 54, ringH: 44, stripH: 32};
  const ID_X0 = ph ? 150 : 740;
  // row tops: wide = one table (shared rows); phone = two blocks
  const offTop = (i: number) => (ph ? 100 + 76 * i : 124 + 100 * i);
  const idTop = (i: number) => (ph ? 586 + 70 * i : 124 + 100 * i);
  const offCy = (i: number) => offTop(i) + (ph ? 49 : 66);
  const idCy = (i: number) => idTop(i) + (ph ? 51 : 66);
  const offLblY = (i: number) => offTop(i) + (ph ? 26 : 34);
  const walkSpan = OFF.x1 - OFF.x0 - OFF.ringW;
  const walkPx = (rows: number) => (walkSpan * rows) / MAX_OFFSET;

  const rows = PAGES.map((p, i) => {
    const cy = offCy(i);
    const wEnd = OFF.x0 + walkPx(p.offset);
    // the ten rows returned: a ring (highlight, same size at every depth) at the end of the walk
    const ringX = wEnd;
    const icy = idCy(i);
    const t = idTop(i);
    // a small index tree: a root and two children; the seek goes root -> right child -> the leaf rows (the ring)
    const root: Pt = ph ? [ID_X0 + 38, t + 14] : [ID_X0 + 44, t + 20];
    const kids: Pt[] = ph
      ? [
          [ID_X0 + 14, t + 40],
          [ID_X0 + 62, t + 40],
        ]
      : [
          [ID_X0 + 16, t + 50],
          [ID_X0 + 72, t + 50],
        ];
    const nodes: Pt[] = [root, ...kids];
    const nW = ph ? 30 : 36;
    const nH = ph ? 15 : 18;
    const idRingX = ph ? ID_X0 + 98 : ID_X0 + 118;
    return {
      cy,
      strip: serverBox(OFF.x0, cy - OFF.stripH / 2, OFF.x1 - OFF.x0, OFF.stripH, `strip${i}`),
      // walk: from row 1 to the offset (at least 1 px so page 1's empty walk is a valid path)
      walk: handLine([OFF.x0 + 3, cy], [Math.max(OFF.x0 + 4, wEnd), cy], `walk${i}`),
      ring: serverBox(ringX, cy - OFF.ringH / 2, OFF.ringW, OFF.ringH, `ring${i}`),
      bar: handLine([ringX + 11, cy], [ringX + OFF.ringW - 11, cy], `bar${i}`),
      pageY: (ph ? Math.min(cy, icy) : cy) + (ph ? 11 : 14),
      offLbl: {x: OFF.x0, y: offLblY(i)},
      // ID-limit row
      icy,
      nodeBoxes: nodes.map((n, k) => serverBox(n[0] - nW / 2, n[1] - nH / 2, nW, nH, `node${i}${k}`)),
      edges: [handLine(root, kids[0], `edgeL${i}`), handLine(root, kids[1], `edgeR${i}`), handLine(kids[1], [idRingX, icy], `edgeK${i}`)],
      desc: handPoly([root, kids[1], [idRingX, icy]], `desc${i}`),
      idRing: serverBox(idRingX, icy - OFF.ringH / 2, OFF.ringW, OFF.ringH, `iring${i}`),
      idBar: handLine([idRingX + 11, icy], [idRingX + OFF.ringW - 11, icy], `ibar${i}`),
      idLbl: {x: idRingX + OFF.ringW + (ph ? 20 : 22), y: icy + (ph ? 11 : 14)},
      idPageY: icy + (ph ? 11 : 14),
    };
  });

  return {
    ph,
    W,
    H,
    TY,
    PAGE_X,
    OFF,
    ID_X0,
    rows,
    // headers: hand title + mono query; 'page' over the page numbers
    HEAD: ph
      ? {off: {x: OFF.x0, t: 44, q: 84}, id: {x: ID_X0, t: 528, q: 566}}
      : {off: {x: OFF.x0, t: 52, q: 98}, id: {x: ID_X0, t: 52, q: 98}},
    RULES: ph
      ? [handLine([30, 98], [690, 98], 'rule0'), handLine([30, 580], [690, 580], 'rule1')]
      : [handLine([40, 114], [1160, 114], 'rule0')],
    // notes under each column: line 1 ink2 (what happens), line 2 the verdict
    NOTES: ph
      ? {off: {x: OFF.x0, y1: 432, y2: 472}, id: {x: ID_X0, y1: 904, y2: 944}}
      : {off: {x: OFF.x0, y1: 566, y2: 614}, id: {x: ID_X0, y1: 566, y2: 614}},
    CAPTION_TOP: ph ? 964 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;

export const OffsetVsKeyset: React.FC<OffsetVsKeysetProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const S = G.ph ? 0.8 : 1; // mark size

  // past rows ghost when the next page starts; in the comparison every row returns to full ink
  const unghost = ramp(frame, ...EV.unghost, EASE_FADE);
  const rowO = (i: number) => {
    if (i === ROWS.length - 1) return 1;
    const g = ghost(frame, ROWS[i + 1].beat);
    return g + (1 - g) * unghost;
  };

  const redVerdictP = ramp(frame, ...EV.redVerdict);
  const greenVerdictP = ramp(frame, ...EV.greenVerdict);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {G.RULES.map((d, i) => (
          <Ink key={i} d={d} color="ink3" width={STROKE.thin} />
        ))}
        <Write x={G.HEAD.off.x} y={G.HEAD.off.t} text="limit-offset" size={TS} />
        <Write x={G.HEAD.off.x} y={G.HEAD.off.q} text="LIMIT 10 OFFSET m" size={TS} variant="mono" color="ink2" />
        <Write x={G.HEAD.id.x} y={G.HEAD.id.t} text="ID-limit" size={TS} />
        <Write x={G.HEAD.id.x} y={G.HEAD.id.q} text="WHERE id > last" size={TS} variant="mono" color="ink2" />
        <Write x={G.PAGE_X} y={G.HEAD.off.q} text="page" size={TS} color="ink3" anchor="end" />
        {G.ph ? <Write x={G.PAGE_X} y={G.HEAD.id.q} text="page" size={TS} color="ink3" anchor="end" /> : null}

        {G.rows.map((r, i) => {
          const ev = ROWS[i];
          const o = rowO(i);
          const walkP = ev.walk[1] > 0 ? ramp(frame, ev.walk[0], ev.walk[1], LIN) : 0;
          const ringP = ramp(frame, ...ev.offRing);
          const descP = ramp(frame, ...ev.idDesc, EASE_MOVE);
          const idRingP = ramp(frame, ...ev.idRing);
          const redP = i === ROWS.length - 1 ? ramp(frame, ...EV.redTrail, LIN) : 0;
          return (
            <g key={i}>
              {/* page number(s) */}
              <g opacity={o}>
                <Write x={G.PAGE_X} y={r.pageY} text={PAGES[i].page} size={TS} variant="mono" anchor="end" />
                {G.ph ? <Write x={G.PAGE_X} y={r.idPageY} text={PAGES[i].page} size={TS} variant="mono" anchor="end" /> : null}
              </g>

              {/* limit-offset: the strip of rows 1..10,000, the walk from row 1, the ten rows ringed */}
              <g opacity={o}>
                <Ink d={r.strip} color="ink2" width={STROKE.thin + 0.6} fill={T.sheet} />
                <Write x={r.offLbl.x} y={r.offLbl.y} text={PAGES[i].offsetText} size={TS} variant="mono" progress={ramp(frame, ...ev.offLbl)} />
                <Pen d={r.walk} progress={walkP} color="ink2" width={G.ph ? 9 : 11} />
                <Pen d={r.walk} progress={redP} color="red" width={G.ph ? 9 : 11} />
                {ringP > 0 ? <path d={r.ring} fill={T.blueWash} opacity={ringP} /> : null}
                <Pen d={r.ring} progress={ringP} color="blue" />
                <Pen d={r.bar} progress={ramp(frame, ev.offRing[0] + 6, 10)} color="blue" width={9} />
              </g>

              {/* ID-limit: index nodes (graphite, always there), the blue descent, the ten rows ringed */}
              <g opacity={o}>
                {r.edges.map((d, k) => (
                  <Ink key={k} d={d} color="ink2" width={STROKE.thin} />
                ))}
                {r.nodeBoxes.map((d, k) => (
                  <Ink key={k} d={d} color="ink2" width={STROKE.thin + 0.6} fill={T.sheet} />
                ))}
                <Pen d={r.desc} progress={descP} color="blue" width={STROKE.ink + 0.6} />
                {idRingP > 0 ? <path d={r.idRing} fill={T.blueWash} opacity={idRingP} /> : null}
                <Pen d={r.idRing} progress={idRingP} color="blue" />
                <Pen d={r.idBar} progress={ramp(frame, ev.idRing[0] + 6, 10)} color="blue" width={9} />
                <Write x={r.idLbl.x} y={r.idLbl.y} text={PAGES[i].idText} size={TS} variant="mono" progress={ramp(frame, ...ev.idLbl)} />
              </g>
            </g>
          );
        })}

        {/* ===== notes under each column ===== */}
        <Write x={G.NOTES.off.x} y={G.NOTES.off.y1} text="computed, thrown away" size={TS} color="ink2" progress={ramp(frame, ...EV.offNote)} />
        <Write x={G.NOTES.off.x} y={G.NOTES.off.y2} text="grows with depth" size={TS} color="red" weight={600} progress={redVerdictP} />
        <Cross x={G.NOTES.off.x + (G.ph ? 302 : 400)} y={G.NOTES.off.y2 - TS * 0.32} color={T.red} sheet={T.sheet} s={S} o={ramp(frame, ...EV.cross, EASE_FADE)} />
        <Write x={G.NOTES.id.x} y={G.NOTES.id.y1} text="log n + 10 rows" size={TS} color="ink2" progress={ramp(frame, ...EV.idNote)} />
        <Write x={G.NOTES.id.x} y={G.NOTES.id.y2} text="same at any depth" size={TS} color="green" weight={600} progress={greenVerdictP} />
        <Tick x={G.NOTES.id.x + (G.ph ? 320 : 422)} y={G.NOTES.id.y2 - TS * 0.32} color={T.green} sheet={T.sheet} s={S} o={ramp(frame, ...EV.tick, EASE_FADE)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const Cross: React.FC<{x: number; y: number; color: string; sheet: string; o: number; s?: number}> = ({x, y, color, sheet, o, s = 1}) =>
  o <= 0 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={18 * s} fill={sheet} />
      <path
        d={`M ${x - 12 * s} ${y - 12 * s} L ${x + 12 * s} ${y + 12 * s} M ${x + 12 * s} ${y - 12 * s} L ${x - 12 * s} ${y + 12 * s}`}
        stroke={color}
        strokeWidth={STROKE.ink + 1}
        strokeLinecap="round"
      />
    </g>
  );

const Tick: React.FC<{x: number; y: number; color: string; sheet: string; o: number; s?: number}> = ({x, y, color, sheet, o, s = 1}) =>
  o <= 0 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={18 * s} fill={sheet} />
      <path
        d={`M ${x - 13 * s} ${y + 1 * s} L ${x - 3 * s} ${y + 11 * s} L ${x + 14 * s} ${y - 12 * s}`}
        fill="none"
        stroke={color}
        strokeWidth={STROKE.ink + 1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );

export default OffsetVsKeyset;

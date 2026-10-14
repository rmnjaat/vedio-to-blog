// Lecture 04 (lec02), assembler: a label floor for figures that are shown below 1:1 somewhere.
// FIGURES.md rule 3 wants every label >= 12px on screen at 360, 390, 768 and 1440. The kit's parts (Cyl, Box, Num,
// Bubble…) draw their own labels at the kit sizes, so a floor passed through props cannot reach them. This `Fig` is a
// drop-in for the kit's: it renders the drawing once to static SVG, raises every font-size below the floor to the
// floor, and puts the result inside the kit's <Fig>. Positions are unchanged; labels grow in place around their
// anchor (by a few percent).
//
// Shown widths measured with check-figures on the lec02 build:
//   on a 360px phone, a drawing up to 420 units is shown about 300px wide (fig-stage 302, two-panel 310, lane 301;
//   rule sketches about 291-307);
//   at 768px a desk drawing is shown at most about 710px wide.
// So the automatic floor is 12 · w / 298 for 300 < w <= 420 (340 → 13.7, 360 → 14.5, 380 → 15.3) and 12 · w / 708 for
// w > 710 (880 → 14.9). Drawings of 300 units or less, and 421-710 units (desk only, shown about 1:1), need none.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Fig as KitFig } from '../kit/Kit';

const fmt = (n: number) => String(Math.ceil(n * 10) / 10);

export function autoFloor(w: number) {
  if (w > 300 && w <= 420) return (12 * w) / 298;
  if (w > 710) return (12 * w) / 708;
  return 0;
}

/** Raise every font-size in an SVG fragment to at least `floor`. */
export function floorMarkup(html: string, floor: number) {
  const f = fmt(floor);
  return html.replace(/font-size="([\d.]+)"/g, (m, s) => (Number(s) < Number(f) ? `font-size="${f}"` : m));
}

type FigProps = Parameters<typeof KitFig>[0];

/** The kit's <Fig>, with every label raised to at least `floor` units (default: from the width, see above). */
export function Fig({ floor, children, ...props }: FigProps & { floor?: number }) {
  const min = floor ?? autoFloor(props.w);
  if (min <= 12.5) return <KitFig {...props}>{children}</KitFig>;
  const inner = floorMarkup(renderToStaticMarkup(<>{children}</>), min);
  return (
    <KitFig {...props}>
      <g dangerouslySetInnerHTML={{ __html: inner }} />
    </KitFig>
  );
}

// Lecture 08 (lec06), §4.5 Fig 4·b "Pixels vs fractions" (D-06 redraw, board 01:59–02:01, frames b_020100,
// b_015900). Three panels: (a) a tag stored as pixels lands on the head at 720×720 but near the right edge at
// 360×360; (b) stored as fractions it lands on the head at both sizes; (c) a tag is a box, written LTRB or x,y,w,h.
// Footer: the board's posts_tags schema. Ledger: L-0212, L-0213, L-0214, L-0215, L-0216.
// Desktop 880 units; the phone layout stacks the three panels at 340.
import React from 'react';
import { Actor, Cross, Label, Line } from '../kit/Kit';
import { Fig } from './floor';
import type { Pt } from '../kit/Kit';

// Positions in the photo's own 720×720 pixel space.
const HEAD = { x: 338, y: 148, r: 62 }; // the friend's head
const TAP = { x: 320, y: 120 }; // where the owner tapped (on the head)
const BOX = { l: 0.38, t: 0.1, r: 0.56, b: 0.31 }; // bounding box around the head, relative

/** A square photo of a stick figure, `side` units wide, standing for an image of `px` pixels. */
function Photo({ x, y, side, seed }: { x: number; y: number; side: number; seed: string }) {
  const k = side / 720;
  const rect: Pt[] = [[x, y], [x + side, y], [x + side, y + side], [x, y + side], [x, y]];
  return (
    <g>
      <Line pts={rect} seed={seed + 'f'} />
      <Actor x={x + HEAD.x * k} y={y + HEAD.y * k} s={(HEAD.r * k) / 6} seed={seed + 'a'} />
    </g>
  );
}

const BIG = 150, SMALL = 75;

/** The tap mark: a green filled dot (a mono glyph, so it takes the label's marker colour). */
function Tap({ x, y }: { x: number; y: number }) {
  return <Label kind="mono" tone="green" x={x} y={y + 4.6} size={13}>●</Label>;
}

function PanelPixels({ ox, oy, id, ty }: { ox: number; oy: number; id: string; ty: number }) {
  const bx = ox + 12, sx = ox + 192, y = oy + 40;
  const kb = BIG / 720;
  return (
    <g>
      <Label kind="mono" anchor="start" x={bx} y={y - 9} size={12.5}>(0,0)</Label>
      <Photo x={bx} y={y} side={BIG} seed={id + 'pb'} />
      <Tap x={bx + TAP.x * kb} y={y + TAP.y * kb} />
      <Label kind="mono" tone="green" anchor="end" x={bx + BIG} y={y - 9} size={13}>(320, 120)</Label>
      <Label kind="mono" anchor="end" x={bx + BIG} y={y + BIG + 17} size={12.5}>(720,720)</Label>
      {/* the same pixels drawn on a 360×360 copy */}
      <Photo x={sx} y={y} side={SMALL} seed={id + 'ps'} />
      <Cross x={sx + (TAP.x / 360) * SMALL} y={y + (TAP.y / 360) * SMALL} size={12} seed={id + 'x'} />
      <Label kind="mono" anchor="end" x={sx + SMALL} y={y + SMALL + 17} size={12.5}>(360,360)</Label>
      <Label tone="red" x={sx + SMALL / 2} y={y + SMALL + 46} size={14}>same pixels,</Label>
      <Label tone="red" x={sx + SMALL / 2} y={y + SMALL + 64} size={14}>wrong place</Label>
      <Label kind="title" x={ox + 140} y={oy + ty}>a · stored as pixels</Label>
    </g>
  );
}

function PanelFractions({ ox, oy, id, ty }: { ox: number; oy: number; id: string; ty: number }) {
  const bx = ox + 12, sx = ox + 192, y = oy + 40;
  const fx = TAP.x / 720, fy = TAP.y / 720;
  return (
    <g>
      <Photo x={bx} y={y} side={BIG} seed={id + 'fb'} />
      <Tap x={bx + fx * BIG} y={y + fy * BIG} />
      <Label kind="mono" muted anchor="end" x={bx + BIG} y={y + BIG + 17} size={12.5}>720 × 720</Label>
      <Photo x={sx} y={y} side={SMALL} seed={id + 'fs'} />
      <Tap x={sx + fx * SMALL} y={y + fy * SMALL} />
      <Label kind="mono" muted anchor="end" x={sx + SMALL} y={y + SMALL + 17} size={12.5}>360 × 360</Label>
      <Label tone="green" x={sx + SMALL / 2} y={y + SMALL + 46} size={14}>on the head</Label>
      <Label tone="green" x={sx + SMALL / 2} y={y + SMALL + 64} size={14}>at both sizes ✓</Label>
      <Label kind="mono" x={ox + 140} y={oy + 232} size={13.5}>location = (320/720, 120/720)</Label>
      <Label kind="mono" x={ox + 140} y={oy + 251} size={13.5}>= (0.44, 0.17)</Label>
      <Label kind="title" x={ox + 140} y={oy + ty}>b · stored as fractions</Label>
    </g>
  );
}

function PanelBox({ ox, oy, id, ty }: { ox: number; oy: number; id: string; ty: number }) {
  const bx = ox + 65, y = oy + 40;
  const l = bx + BOX.l * BIG, r = bx + BOX.r * BIG, t = y + BOX.t * BIG, b = y + BOX.b * BIG;
  return (
    <g>
      <Photo x={bx} y={y} side={BIG} seed={id + 'bb'} />
      <Line dashed tone="green" pts={[[l, t], [r, t], [r, b], [l, b], [l, t]]} seed={id + 'box'} />
      <Label kind="mono" x={ox + 140} y={oy + 212} size={13}>LTRB (0.38, 0.10, 0.56, 0.31)</Label>
      <Label kind="mono" x={ox + 140} y={oy + 232} size={13}>x,y,w,h (0.38, 0.10, 0.18, 0.21)</Label>
      <Label muted x={ox + 140} y={oy + 254} size={14}>pick what the front end likes</Label>
      <Label kind="title" x={ox + 140} y={oy + ty}>c · a box, not a point</Label>
    </g>
  );
}

export function PixelsVsFractions({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Pixels vs fractions';
  const desc = 'A tag tapped at pixel (320, 120) on a 720 by 720 photo sits on the friend’s head. Stored as pixels, the same numbers drawn on a 360 by 360 copy land near the right edge, off the head. Stored as fractions of the image size, 320/720 and 120/720, about (0.44, 0.17), the tag lands on the head at both sizes. A tag is really a box around the head, stored as relative left-top and right-bottom corners or as x, y, width and height. The board’s table is posts_tags(post_id, user_id, location).';
  if (layout === 'phone') {
    const id = 'fig4b-p';
    return (
      <Fig id={id} w={340} h={892} title={title} desc={desc}>
        <PanelPixels ox={30} oy={0} id={id + 'a'} ty={236} />
        <PanelFractions ox={30} oy={256} id={id + 'b'} ty={282} />
        <PanelBox ox={30} oy={562} id={id + 'c'} ty={284} />
        <Label kind="mono" x={170} y={878} size={13}>posts_tags(post_id, user_id, location)</Label>
      </Fig>
    );
  }
  const id = 'fig4b';
  return (
    <Fig id={id} w={880} h={344} title={title} desc={desc}>
      <PanelPixels ox={0} oy={0} id={id + 'a'} ty={290} />
      <PanelFractions ox={300} oy={0} id={id + 'b'} ty={290} />
      <PanelBox ox={600} oy={0} id={id + 'c'} ty={290} />
      <Label kind="mono" x={440} y={332}>posts_tags(post_id, user_id, location)</Label>
    </Fig>
  );
}

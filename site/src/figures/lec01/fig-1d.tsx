// Fig 1·d: The CDN answers, and caches closer still (redraw of board D-02, frame b_002945, plus a new ISP panel).
// Panels are 300 × 300; desk = side by side (640 wide), phone = stacked (300 wide).
// The misconception (a CDN only caches images) is answered by a plain hand annotation beside the cdn.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Line } from '../kit/Kit';
import { Cloud, Tick } from './s1-parts';

function CdnPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  const C = { cx: 146, cy: 84, w: 116, h: 54 }; // cloud: x 88–204
  return (
    <g>
      {/* reader -> cdn (blue), and the answer straight back (green) */}
      <Arrow tone="blue" pts={[[30, 150], [30, 78], [C.cx - C.w / 2 - 2, 78]]} seed={s('req')} />
      <Arrow tone="green" pts={[[C.cx - C.w / 2 + 10, 96], [48, 96], [48, 150]]} seed={s('ack')} />
      <Label tone="green" anchor="start" x={58} y={124} size={13}>served from</Label>
      <Label tone="green" anchor="start" x={58} y={140} size={13}>the edge</Label>
      {/* cdn -> api only on a miss */}
      <Arrow pts={[[182, 100], [182, 166]]} seed={s('miss')} />
      <Label anchor="start" x={190} y={134} size={13}>only on</Label>
      <Label anchor="start" x={190} y={150} size={13}>a miss</Label>
      <Cloud {...C} seed={s('cdn')} label="cdn" />
      <Label anchor="end" x={296} y={26} size={14}>caches any bytes:</Label>
      <Label anchor="end" x={296} y={44} size={14}>images, JSON…</Label>

      <Actor x={38} y={160} seed={s('reader')} />
      <Label kind="mono" anchor="start" x={6} y={232}>GET /popular</Label>
      <Box x={150} y={168} w={64} h={34} label="api" seed={s('api')} />
      <Arrow pts={[[214, 185], [234, 185]]} seed={s('db-a')} />
      <Cyl cx={258} top={170} rx={22} ry={6} h={30} seed={s('db')} label="db" />
      <Label kind="title" x={150} y={290}>the cdn answers</Label>
    </g>
  );
}

function IspPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  const C = { cx: 140, cy: 66, w: 100, h: 48 }; // cloud: x 90–190
  return (
    <g>
      <Actor x={30} y={142} seed={s('reader')} />
      <Arrow tone="blue" pts={[[48, 160], [96, 160]]} seed={s('req')} />
      <Arrow tone="green" pts={[[96, 176], [50, 176]]} seed={s('ack')} />
      <Box x={98} y={150} w={84} h={36} label="isp" seed={s('isp')} />
      <Tick x={170} y={146} seed={s('tick')} />
      {/* isp -> cdn -> origin, only when the isp doesn't have it */}
      <Arrow pts={[[140, 150], [140, 92]]} seed={s('up')} />
      <Arrow pts={[[C.cx + C.w / 2, 66], [222, 66]]} seed={s('origin')} />
      <Cloud {...C} seed={s('cdn')} label="cdn" />
      <Box x={224} y={50} w={60} h={34} label="api" seed={s('api')} />
      <Label muted x={254} y={102} size={13}>origin</Label>
      <Label x={140} y={214} size={13}>very popular shows</Label>
      <Label muted x={140} y={232} size={13}>a show doesn’t change</Label>
      <Label muted x={140} y={248} size={13}>once it’s live</Label>
      <Label kind="title" x={150} y={290}>closer still: the isp</Label>
    </g>
  );
}

const DESC =
  'Panel a: a reader requests GET /popular. The request goes to the CDN cloud, which answers straight back from the edge; only on a miss does the CDN go on to the API server and its database. A speech bubble on the CDN says: images, JSON, it is all bytes to me. Panel b: a reader asks the ISP, which holds a copy of a very popular show and answers directly; only on a miss does the request go on to the CDN and then the origin API server. A show does not change once it is live.';

export function CdnAndIsp({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'The CDN answers, and caches closer still';
  if (layout === 'phone')
    return (
      <Fig id="f1d-p" w={300} h={612} title={title} desc={DESC}>
        <CdnPanel id="f1d-pa" />
        <Line pts={[[10, 306], [290, 306]]} weight="thin" dotted seed="f1d-p-sep" className="faint" />
        <g transform="translate(0 312)"><IspPanel id="f1d-pb" /></g>
      </Fig>
    );
  return (
    <Fig id="f1d" w={640} h={300} title={title} desc={DESC}>
      <g transform="translate(6 0)"><CdnPanel id="f1d-a" /></g>
      <Line pts={[[320, 14], [320, 286]]} weight="thin" dotted seed="f1d-sep" className="faint" />
      <g transform="translate(334 0)"><IspPanel id="f1d-b" /></g>
    </Fig>
  );
}

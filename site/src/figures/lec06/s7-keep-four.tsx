// Lecture 08 (lec06), §7 Fig 7·a "Four systems, one class" (new): a 2×2 grid of thumbnails, each a reduced
// version of an earlier chapter's figure with its habit in hand lettering: (1) <img> → handler → bytes;
// (2) cdn → api → db with the stored hash and active_photo_id; (3) the PHOTO_TAG pipe and its consumers;
// (4) ON_MSG_UNSENT → worker → aux → main. Ledger: L-0033, L-0082, L-0191, L-0259, L-0288.
// Desktop 880 units (tiles 440 × 200); the phone layout is a single column at 340.
import React from 'react';
import { Arrow, Box, Client, Cloud, Cyl, Label, Line, Pipe, Worker } from '../kit/Kit';
import { Fig } from './floor';

type T = { ox: number; oy: number; id: string };

function TileImages({ ox, oy, id }: T) {
  return (
    <g>
      <Client x={ox} y={oy + 38} w={52} h={40} seed={id + 'br'} />
      <Label kind="mono" x={ox + 26} y={oy + 98} size={12.5}>{'<img>'}</Label>
      <Arrow tone="blue" pts={[[ox + 56, oy + 58], [ox + 104, oy + 58]]} seed={id + 'get'} />
      <Label kind="mono" tone="blue" x={ox + 80} y={oy + 50} size={12.5}>GET</Label>
      <Box x={ox + 108} y={oy + 37} w={92} h={42} label="handler" seed={id + 'h'} />
      <Arrow tone="green" pts={[[ox + 204, oy + 58], [ox + 232, oy + 58]]} seed={id + 'ok'} />
      <Line pts={[[ox + 236, oy + 44], [ox + 320, oy + 44], [ox + 320, oy + 72], [ox + 236, oy + 72], [ox + 236, oy + 44]]} seed={id + 'bytes'} />
      <Label kind="mono" x={ox + 278} y={oy + 63} size={12.5}>89 50 4E…</Label>
      <Label muted x={ox + 278} y={oy + 98} size={12.5}>bytes</Label>
      <Label x={ox + 160} y={oy + 152} size={16}>it’s just bytes</Label>
      <Label kind="title" x={ox + 160} y={oy + 180}>§1 Images</Label>
    </g>
  );
}

function TileGravatar({ ox, oy, id }: T) {
  return (
    <g>
      <Cloud cx={ox + 40} cy={oy + 56} w={80} h={48} label="cdn" seed={id + 'cdn'} />
      <Arrow tone="blue" pts={[[ox + 80, oy + 56], [ox + 112, oy + 56]]} seed={id + 'miss'} />
      <Box x={ox + 116} y={oy + 35} w={84} h={42} label="api" seed={id + 'api'} />
      <Arrow tone="blue" pts={[[ox + 204, oy + 56], [ox + 244, oy + 56]]} seed={id + 'q'} />
      <Cyl cx={ox + 276} top={oy + 38} rx={26} ry={7} h={34} label="db" seed={id + 'db'} />
      <Label kind="mono" x={ox + 160} y={oy + 120} size={12.5}>users(*hash, active_photo_id)</Label>
      <Label x={ox + 160} y={oy + 152} size={16}>write the exact query</Label>
      <Label kind="title" x={ox + 160} y={oy + 180}>§2–3 Gravatar</Label>
    </g>
  );
}

function TileTagging({ ox, oy, id }: T) {
  const ws: [string, number, number][] = [['search', 84, 84], ['notify', 172, 84], ['feed', 260, 60]];
  return (
    <g>
      <Box x={ox} y={oy + 22} w={96} h={38} label="tagging" seed={id + 'svc'} />
      <Arrow tone="blue" dashed pts={[[ox + 96, oy + 41], [ox + 116, oy + 41]]} seed={id + 'pub'} />
      <Pipe x={ox + 118} cy={oy + 41} w={202} ry={13} seed={id + 'k'} />
      <Label kind="mono" x={ox + 219} y={oy + 46} size={12.5}>PHOTO_TAG</Label>
      {ws.map(([l, x, w], i) => (
        <g key={l}>
          <Arrow pts={[[ox + x + w / 2, oy + 84], [ox + x + w / 2, oy + 56]]} weight="thin" seed={id + 'p' + i} />
          <Worker x={ox + x} y={oy + 86} w={w} h={32} label={l} size={12.5} seed={id + 'w' + i} />
        </g>
      ))}
      <Label x={ox + 160} y={oy + 152} size={16}>every question changes the design</Label>
      <Label kind="title" x={ox + 160} y={oy + 180}>§4 Tagging</Label>
    </g>
  );
}

function TileBadge({ ox, oy, id }: T) {
  return (
    <g>
      <Pipe x={ox} cy={oy + 40} w={130} ry={13} seed={id + 'k'} />
      <Label kind="mono" x={ox + 62} y={oy + 45} size={12.5}>ON_MSG_UNSENT</Label>
      <Arrow pts={[[ox + 148, oy + 40], [ox + 132, oy + 40]]} seed={id + 'pull'} />
      <Worker x={ox + 150} y={oy + 22} w={84} h={36} label="worker" size={12.5} seed={id + 'w'} />
      <Arrow tone="blue" pts={[[ox + 234, oy + 40], [ox + 262, oy + 40]]} seed={id + 'chk'} />
      <Cyl cx={ox + 290} top={oy + 24} rx={24} ry={6} h={26} seed={id + 'aux'} />
      <Label kind="mono" anchor="end" x={ox + 320} y={oy + 16} size={12.5}>aux</Label>
      <Arrow tone="green" pts={[[ox + 191, oy + 58], [ox + 191, oy + 96], [ox + 262, oy + 96]]} seed={id + 'add'} />
      <Label tone="green" anchor="end" x={ox + 185} y={oy + 90} size={12.5}>only if new</Label>
      <Cyl cx={ox + 290} top={oy + 82} rx={24} ry={6} h={26} seed={id + 'main'} />
      <Label kind="mono" x={ox + 290} y={oy + 132} size={12.5}>main</Label>
      <Label x={ox + 160} y={oy + 152} size={16}>pre-compute, then protect the DB</Label>
      <Label kind="title" x={ox + 160} y={oy + 180}>§5–6 Badge and auxiliary DB</Label>
    </g>
  );
}

const TILES = [TileImages, TileGravatar, TileTagging, TileBadge];

export function FourSystems({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Four systems, one class';
  const desc = 'Four thumbnails. Images: a browser’s img tag sends a GET to a handler, which returns bytes; it’s just bytes. Gravatar: the CDN asks the API, which reads users by the stored hash and active_photo_id; write the exact query. Tagging: one PHOTO_TAG event on Kafka, pulled by search, notification and feed; every question changes the design. Badge: a worker pulls ON_MSG_UNSENT, checks the auxiliary store and writes to the main store only if the pair is new; pre-compute, then protect the database.';
  if (layout === 'phone') {
    const id = 'fig7a-p';
    return (
      <Fig id={id} w={340} h={4 * 210} title={title} desc={desc}>
        {TILES.map((Tile, i) => <Tile key={i} ox={10} oy={i * 210 + 6} id={`${id}-${i}`} />)}
      </Fig>
    );
  }
  const id = 'fig7a';
  return (
    <Fig id={id} w={880} h={416} title={title} desc={desc}>
      {TILES.map((Tile, i) => <Tile key={i} ox={(i % 2) * 440 + 60} oy={Math.floor(i / 2) * 210 + 6} id={`${id}-${i}`} />)}
      <Line weight="thin" dashed pts={[[440, 12], [440, 400]]} seed="fig7a-v" />
      <Line weight="thin" dashed pts={[[40, 208], [840, 208]]} seed="fig7a-h" />
    </Fig>
  );
}

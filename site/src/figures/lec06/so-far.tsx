// Lecture 8 (lec06): the "truth and what you keep ready" map shown at the top of chapters 2–8 and once more at the
// end. One row per decision the lecture makes, in the order it makes them: what you serve, where the truth for it
// lives, and what sits ready next to it (or is made on demand). The overview shows it empty (stage 0). Each chapter
// opens on the map as the previous chapter left it, with that chapter's rows on a blue wash marked "new".
//   stage 1 = after ch1 (card)          stage 5 = after ch5 (tag)
//   stage 2 = after ch2 (lookup)        stage 6 = after ch6 (badge v1)
//   stage 3 = after ch3 (active photo)  stage 7 = after ch7 (badge v2)
//   stage 4 = after ch4 (bytes, sizes)  stage 8 = after ch8 (repeat senders), the finished map
// Desk layout is 680 wide; phone layout is 330 wide (older rows fold to one line).
import React from 'react';
import { roundRect } from '../kit/hand';
import { Fig, Label, Line } from '../kit/Kit';

export type MapStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Layout = 'desk' | 'phone';

const ROWS: { what: string; truth: string; ready: string; ch: number }[] = [
  { what: 'a repo card', truth: 'the repo’s live numbers', ready: 'none; drawn on a CDN miss', ch: 1 },
  { what: 'user by hash', truth: 'users.email', ready: 'users.hash, indexed', ch: 2 },
  { what: 'the active photo', truth: 'users.active_photo_id', ready: 'on the row the read hits', ch: 3 },
  { what: 'photo bytes', truth: 'the DB says which; S3 holds', ready: 'a CDN copy, purged on change', ch: 4 },
  { what: 'each size', truth: 'one original in S3', ready: 'drawn on a CDN miss', ch: 4 },
  { what: 'a tag', truth: 'posts_tags, box as fractions', ready: 'one event for every team', ch: 5 },
  { what: 'the badge, v1', truth: 'messages + the last tap', ready: 'none; counted every load', ch: 6 },
  { what: 'the badge, v2', truth: 'the undelivered-message events', ready: 'a set of senders per user', ch: 7 },
  { what: 'repeat senders', truth: 'the main Redis set', ready: 'existence keys, aux store', ch: 8 },
];

const TITLE = 'Where the truth lives, and what you keep ready';

function shown(stage: MapStage) {
  return ROWS.filter((r) => r.ch <= stage);
}

function describe(stage: MapStage): string {
  const rows = shown(stage);
  if (rows.length === 0)
    return 'An empty table with three columns: what you serve, where the truth for it lives, and what you keep ready next to it or make on demand. Each chapter adds rows.';
  const fresh = rows.filter((r) => r.ch === stage).map((r) => r.what);
  return `Three columns: what you serve, where the truth lives, what is kept ready. ` +
    rows.map((r) => `${r.what}: truth in ${r.truth}; kept ready: ${r.ready}`).join('. ') + '.' +
    (fresh.length ? ` Marked new: ${fresh.join(', ')}.` : '');
}

function Wash({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return <path d={roundRect(x, y, w, h, 6, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />;
}

function MapDesk({ stage }: { stage: MapStage }) {
  const id = `sf-truth${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const rows = shown(stage);
  const RH = 28, top = 58;
  const rowY = (i: number) => top + i * RH;
  const firstFresh = rows.findIndex((r) => r.ch === stage);
  const nFresh = rows.filter((r) => r.ch === stage).length;
  const last = rows.length ? rowY(rows.length - 1) : top - 10;
  const H = last + (rows.length ? 54 : 70);
  return (
    <Fig id={id} w={680} h={H} title={TITLE} desc={describe(stage)}>
      {firstFresh >= 0 && stage > 0 && (
        <g>
          <Wash x={8} y={rowY(firstFresh) - 19} w={630} h={(nFresh - 1) * RH + 28} seed={s('w')} />
          <Label muted x={644} y={rowY(firstFresh) + 1} anchor="start" size={13}>new</Label>
        </g>
      )}
      <Label muted anchor="start" x={18} y={26} size={13.5}>what you serve</Label>
      <Label muted anchor="start" x={170} y={26} size={13.5}>the truth lives in</Label>
      <Label muted anchor="start" x={410} y={26} size={13.5}>kept ready next to it</Label>
      <Line weight="thin" pts={[[14, 36], [636, 36]]} seed={s('rule')} />
      {rows.map((r, i) => (
        <g key={r.what}>
          <Label anchor="start" x={18} y={rowY(i)} size={14}>{r.what}</Label>
          <Label anchor="start" x={170} y={rowY(i)} size={14}>{r.truth}</Label>
          <Label anchor="start" x={410} y={rowY(i)} size={14}>{r.ready}</Label>
        </g>
      ))}
      {rows.length === 0 && <Label muted anchor="start" x={18} y={64} size={14}>(empty: each chapter adds a row)</Label>}
      <Label kind="title" x={330} y={H - 12}>truth and what you keep ready</Label>
    </Fig>
  );
}

function MapPhone({ stage }: { stage: MapStage }) {
  // Phone: earlier rows fold to one line (what: kept ready); the rows new since the last chapter (all rows on the
  // finished map) show the truth line too, so the map stays short at the top of each chapter.
  const id = `sf-truth${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const rows = shown(stage);
  const full = (r: (typeof ROWS)[number]) => r.ch === stage || stage === 8;
  const top = 54;
  const ys: number[] = [];
  let y = top;
  for (const r of rows) { ys.push(y); y += full(r) ? 66 : 26; }
  const marked = rows.some((r) => r.ch === stage) && stage > 0;
  const end = rows.length ? y : top + 20;
  const H = end + (marked ? 52 : 34);
  return (
    <Fig id={id} w={330} h={H} title={TITLE} desc={describe(stage)}>
      {rows.map((r, i) => r.ch === stage && stage > 0 && (
        <Wash key={'w' + i} x={2} y={ys[i] - 18} w={326} h={60} seed={s('w' + i)} />
      ))}
      <Label muted anchor="start" x={6} y={22} size={13.5}>what you serve: what’s kept ready</Label>
      <Line weight="thin" pts={[[6, 32], [324, 32]]} seed={s('rule')} />
      {rows.map((r, i) => full(r) ? (
        <g key={r.what}>
          <Label anchor="start" x={6} y={ys[i]} size={14}>{r.what}</Label>
          <Label muted anchor="start" x={18} y={ys[i] + 20} size={13.5}>{`truth: ${r.truth}`}</Label>
          <Label muted anchor="start" x={18} y={ys[i] + 40} size={13.5}>{`ready: ${r.ready}`}</Label>
        </g>
      ) : (
        <Label key={r.what} anchor="start" x={6} y={ys[i]} size={13.5}>{`${r.what}: ${r.ready}`}</Label>
      ))}
      {rows.length === 0 && <Label muted anchor="start" x={6} y={58} size={13.5}>(empty: each chapter adds a row)</Label>}
      {marked && <Label muted anchor="start" x={6} y={end} size={13.5}>shaded: new since the last chapter</Label>}
      <Label kind="title" x={165} y={H - 8}>truth and what you keep ready</Label>
    </Fig>
  );
}

export function SoFarTruth({ stage, layout = 'desk' }: { stage: MapStage; layout?: Layout }) {
  return layout === 'phone' ? <MapPhone stage={stage} /> : <MapDesk stage={stage} />;
}

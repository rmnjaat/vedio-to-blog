// Lecture 06 (lec03): the "get_id() so far" ladder shown at the top of every chapter. One rung per version of the
// function, in the order the lecture builds them, with where each version's ID is born. Each chapter opens on the
// ladder as it stands, with the rungs the previous chapter added on a blue wash with a "new" note. Stage 10 is the
// finished ladder, shown once more at the end of the lecture with Instagram's rung marked.
//   0 start: AUTO_INCREMENT on each master          6 v6 flush every N           (end of ch2)
//   1–3 v1–v3: epoch ms, + machine, + thread (ch1)  7 v7 time on the left        (ch3)
//   4 v4 machine + counter                           8 v8 one ID server           (ch4)
//   5 v5 load / save on every call                   footer: 64 bits or less      (ch5)
//   9 amazon (ch6) · 10 flickr (ch7) · 11 snowflake (ch8) · 12 instagram (ch10)
// Desk layout is 640 wide (shown ~1:1 on a laptop); phone layout is 330 wide.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Fig, Label, Line } from '../kit/Kit';

export type LadderStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Layout = 'desk' | 'phone';
type Born = 'db' | 'app' | 'svc';

const RUNGS: { tag: string; code: string; phone?: string; born: Born; bad?: boolean }[] = [
  { tag: 'start', code: 'AUTO_INCREMENT per master', born: 'db', bad: true },
  { tag: 'v1', code: 'epoch_ms', born: 'app' },
  { tag: 'v2', code: 'machine + epoch_ms', born: 'app' },
  { tag: 'v3', code: 'machine + thread + epoch_ms', phone: 'machine+thread+epoch_ms', born: 'app' },
  { tag: 'v4', code: 'machine + counter++', born: 'app' },
  { tag: 'v5', code: 'machine + counter, saved each call', phone: 'counter saved every call', born: 'app' },
  { tag: 'v6', code: 'machine + counter, saved every N', phone: 'counter saved every N', born: 'app' },
  { tag: 'v7', code: 'epoch_ms + machine + counter', phone: 'epoch_ms+machine+counter', born: 'app' },
  { tag: 'v8', code: 'v7, on one ID server', born: 'svc' },
  { tag: 'amazon', code: 'ranges from a counter row', born: 'svc' },
  { tag: 'flickr', code: 'odd + even ticket DBs', born: 'svc' },
  { tag: 'snowflake', code: 'time 41|machine 10|seq 12', born: 'app' },
  { tag: 'instagram', code: 'time 41|shard 13|seq 10', born: 'db' },
];

const BORN_DESK: Record<Born, string> = { db: 'the database', app: 'your code', svc: 'an ID service' };
const BORN_PHONE: Record<Born, string> = { db: 'db', app: 'app', svc: 'svc' };
const BORN_SPOKEN: Record<Born, string> = { db: 'made by the database', app: 'made in your code', svc: 'made by an ID service' };

/** For each stage: how many rungs show, which rungs are new, whether the size footer shows and is new. */
const STAGES: Record<LadderStage, { n: number; fresh: number[]; footer: boolean; footerNew?: boolean }> = {
  0: { n: 1, fresh: [], footer: false },
  1: { n: 4, fresh: [1, 2, 3], footer: false },
  2: { n: 7, fresh: [4, 5, 6], footer: false },
  3: { n: 8, fresh: [7], footer: false },
  4: { n: 9, fresh: [8], footer: false },
  5: { n: 9, fresh: [], footer: true, footerNew: true },
  6: { n: 10, fresh: [9], footer: true },
  7: { n: 11, fresh: [10], footer: true },
  8: { n: 12, fresh: [11], footer: true },
  9: { n: 12, fresh: [], footer: true },
  10: { n: 13, fresh: [12], footer: true },
};

const FOOTER = 'every ID: 64 bits or less';

function describe(stage: LadderStage): string {
  const st = STAGES[stage];
  const rungs = RUNGS.slice(0, st.n).map((r) => `${r.tag}: ${r.code}, ${BORN_SPOKEN[r.born]}${r.bad ? ', and colliding' : ''}`);
  const fresh = st.fresh.map((i) => RUNGS[i].tag);
  if (st.footerNew) fresh.push('the size limit');
  return `The get_id() ladder so far, one rung per version, oldest first. ${rungs.join('. ')}.` +
    (st.footer ? ` Under the ladder: ${FOOTER}.` : '') +
    (fresh.length ? ` Marked new: ${fresh.join(', ')}.` : '');
}

/** The blue wash behind a new rung, with a small "new" note. */
function Wash({ x, y, w, h, seed, nx, ny }: { x: number; y: number; w: number; h: number; seed: string; nx?: number; ny?: number }) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 6, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      {nx !== undefined && ny !== undefined && <Label muted x={nx} y={ny} anchor="start" size={13}>new</Label>}
    </g>
  );
}

function LadderDesk({ stage }: { stage: LadderStage }) {
  const id = `sf-getid${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const st = STAGES[stage];
  const RH = 26, top = 54;
  const rowY = (i: number) => top + i * RH;
  const last = rowY(st.n - 1);
  const footY = last + 36;
  const H = (st.footer ? footY : last) + 46;
  return (
    <Fig id={id} w={640} h={H} title="get_id() so far" desc={describe(stage)}>
      {st.fresh.length > 0 && (
        <Wash x={8} y={rowY(st.fresh[0]) - 18} w={580} h={(st.fresh.length - 1) * RH + 26} seed={s('w')}
          nx={596} ny={rowY(st.fresh[0]) + 1} />
      )}
      {st.footerNew && <Wash x={8} y={footY - 18} w={580} h={26} seed={s('wf')} nx={596} ny={footY + 1} />}

      <Label muted anchor="start" x={20} y={24} size={13}>version</Label>
      <Label muted anchor="start" x={120} y={24} size={13}>the ID is…</Label>
      <Label muted anchor="start" x={400} y={24} size={13}>born in</Label>
      <Line weight="thin" pts={[[16, 34], [584, 34]]} seed={s('rule')} />

      {RUNGS.slice(0, st.n).map((r, i) => (
        <g key={r.tag}>
          <Label anchor="start" x={20} y={rowY(i)} size={14}>{r.tag}</Label>
          <Label kind="mono" tone={r.bad ? 'red' : undefined} anchor="start" x={120} y={rowY(i)} size={13}>{r.code}</Label>
          <Label muted anchor="start" x={400} y={rowY(i)} size={14}>{BORN_DESK[r.born]}</Label>
        </g>
      ))}

      {st.footer && <Label anchor="start" x={20} y={footY} size={14}>{FOOTER}</Label>}
      <Label kind="title" x={300} y={H - 12}>get_id() so far</Label>
    </Fig>
  );
}

function LadderPhone({ stage }: { stage: LadderStage }) {
  const id = `sf-getid${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const st = STAGES[stage];
  const RH = 26, top = 52;
  const rowY = (i: number) => top + i * RH;
  const last = rowY(st.n - 1);
  const footY = last + 32;
  const legendY = (st.footer ? footY : last) + 32;
  const marked = st.fresh.length > 0 || !!st.footerNew;
  const H = legendY + (marked ? 70 : 50);
  return (
    <Fig id={id} w={330} h={H} title="get_id() so far" desc={describe(stage)}>
      {st.fresh.length > 0 && (
        <Wash x={2} y={rowY(st.fresh[0]) - 18} w={326} h={(st.fresh.length - 1) * RH + 26} seed={s('w')} />
      )}
      {st.footerNew && <Wash x={2} y={footY - 18} w={326} h={26} seed={s('wf')} />}

      <Label muted anchor="start" x={6} y={22} size={13.5}>version</Label>
      <Label muted anchor="start" x={78} y={22} size={13.5}>the ID is…</Label>
      <Label muted anchor="end" x={326} y={22} size={13.5}>born</Label>
      <Line weight="thin" pts={[[6, 32], [324, 32]]} seed={s('rule')} />

      {RUNGS.slice(0, st.n).map((r, i) => (
        <g key={r.tag}>
          <Label anchor="start" x={6} y={rowY(i)} size={13.5}>{r.tag}</Label>
          <Label kind="mono" tone={r.bad ? 'red' : undefined} anchor="start" x={78} y={rowY(i)} size={13.5}>{r.phone ?? r.code}</Label>
          <Label muted anchor="end" x={326} y={rowY(i)} size={13.5}>{BORN_PHONE[r.born]}</Label>
        </g>
      ))}

      {st.footer && <Label anchor="start" x={6} y={footY} size={13.5}>{FOOTER}</Label>}
      <Label muted anchor="start" x={6} y={legendY} size={13.5}>app: your code · svc: an ID service</Label>
      <Label muted anchor="start" x={6} y={legendY + 20} size={13.5}>db: the database</Label>
      {marked && <Label muted anchor="start" x={6} y={legendY + 40} size={13.5}>shaded: new since the last chapter</Label>}
      <Label kind="title" x={165} y={H - 8}>get_id() so far</Label>
    </Fig>
  );
}

export function SoFarGetId({ stage, layout = 'desk' }: { stage: LadderStage; layout?: Layout }) {
  return layout === 'phone' ? <LadderPhone stage={stage} /> : <LadderDesk stage={stage} />;
}

// Lecture 10 (lec10): the "storage so far" ladder shown at the top of every chapter. One row per piece the lecture
// adds, in the order it adds them, grouped by build: the dictionary (chapters 1–6), then the key-value store
// (chapters 7–10). Each chapter opens on the ladder as it stands, with the rows the previous chapter added on a blue
// wash with a "new" note. Desk also shows what each piece buys; phone shows the piece only.
//   stage 0 (ch1 top): the brief             stage 5 (ch6 top): + weekly merge into a new file
//   stage 1 (ch2 top): + the text file, scan  stage 6 (ch7 top): + new path, meta.json, deploy; store heading
//   stage 2 (ch3 top): + word → offset map    stage 7 (ch8 top): + append-only file, key → offset map
//   stage 3 (ch4 top): + header, one file     stage 8 (ch9 top): + rotation, merge and compaction
//   stage 4 (ch5 top): + one copy on S3       stage 9 (ch10 top): + record format with a CRC
// Desk layout is 640 wide (shown ~1:1 on a laptop); phone layout is 330 wide.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Fig, Label, Line } from '../kit/Kit';

export type SoFarStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Layout = 'desk' | 'phone';

type Entry =
  | { kind: 'head'; text: string }
  | { kind: 'row'; tag: string; code: string; phone?: string; buys: string; bad?: boolean };

const ENTRIES: Entry[] = [
  { kind: 'head', text: 'the dictionary' },
  { kind: 'row', tag: 'brief', code: '1 TB, 170,000 words, no database', phone: '1 TB, no database, one file', buys: 'one portable file' },
  { kind: 'row', tag: 'ch 1', code: 'data.dict: word,meaning lines', buys: 'a lookup scans ~500 GB', bad: true },
  { kind: 'row', tag: 'ch 2', code: 'word → offset + length in RAM, ~3.5 MB', phone: 'word → offset, length in RAM', buys: 'one pointed read' },
  { kind: 'row', tag: 'ch 3', code: '16 B header | index | data', buys: 'still one file' },
  { kind: 'row', tag: 'ch 4', code: 'one copy on S3, ranged GETs', buys: 'not 100 copies' },
  { kind: 'row', tag: 'ch 5', code: 'weekly merge into a new file', buys: 'nothing written in place' },
  { kind: 'row', tag: 'ch 6', code: 'new path + meta.json + deploy', buys: 'a switch with no garbage' },
  { kind: 'head', text: 'the key-value store' },
  { kind: 'row', tag: 'ch 7', code: 'append-only file, DEL = PUT(k, −1)', phone: 'append-only, DEL = PUT(k,−1)', buys: 'writes with zero seek' },
  { kind: 'row', tag: 'ch 7', code: 'key → offset map in RAM', buys: 'a get is one read' },
  { kind: 'row', tag: 'ch 8', code: 'rotation + merge & compaction', buys: 'the disk never fills' },
  { kind: 'row', tag: 'ch 9', code: 'CRC | TS | KSZ | VSZ | K | V', buys: 'torn writes caught' },
];

/** For each stage: how many entries show, and which entry indexes are new. */
const STAGES: Record<SoFarStage, { n: number; fresh: number[] }> = {
  0: { n: 2, fresh: [] },
  1: { n: 3, fresh: [2] },
  2: { n: 4, fresh: [3] },
  3: { n: 5, fresh: [4] },
  4: { n: 6, fresh: [5] },
  5: { n: 7, fresh: [6] },
  6: { n: 9, fresh: [7] },
  7: { n: 11, fresh: [9, 10] },
  8: { n: 12, fresh: [11] },
  9: { n: 13, fresh: [12] },
};

function describe(stage: SoFarStage): string {
  const st = STAGES[stage];
  const parts: string[] = [];
  ENTRIES.slice(0, st.n).forEach((e) => {
    if (e.kind === 'head') parts.push(`${e.text}:`);
    else parts.push(`${e.tag}, ${e.code}, which ${e.bad ? 'is the problem: ' : 'buys '}${e.buys}.`);
  });
  const fresh = st.fresh.map((i) => { const e = ENTRIES[i]; return e.kind === 'row' ? e.code : ''; });
  const pending = stage === 6 ? ' The key-value store has no pieces yet.' : '';
  return `The storage built so far, one row per piece, oldest first. ${parts.join(' ')}${pending}` +
    (fresh.length ? ` Marked new: ${fresh.join('; ')}.` : '');
}

function Wash({ x, y, w, h, seed, nx, ny }: { x: number; y: number; w: number; h: number; seed: string; nx?: number; ny?: number }) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 6, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      {nx !== undefined && ny !== undefined && <Label muted x={nx} y={ny} anchor="start" size={13}>new</Label>}
    </g>
  );
}

function rowsY(n: number, top: number, RH: number, HH: number) {
  const ys: number[] = [];
  let y = top;
  ENTRIES.slice(0, n).forEach((e, i) => {
    if (e.kind === 'head') { if (i > 0) y += 10; ys.push(y); y += HH; }
    else { ys.push(y); y += RH; }
  });
  return { ys, end: y };
}

function LadderDesk({ stage }: { stage: SoFarStage }) {
  const id = `sf-l10-${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const st = STAGES[stage];
  const RH = 26, HH = 28, top = 56;
  const { ys, end } = rowsY(st.n, top, RH, HH);
  const pendingY = end + 4;
  const H = (stage === 6 ? pendingY + 24 : end) + 30;
  const fresh = st.fresh;
  return (
    <Fig id={id} w={640} h={H} title="Storage so far" desc={describe(stage)}>
      {fresh.length > 0 && (
        <Wash x={8} y={ys[fresh[0]] - 18} w={580} h={(fresh.length - 1) * RH + 26} seed={s('w')}
          nx={596} ny={ys[fresh[0]] + 1} />
      )}
      <Label muted anchor="start" x={20} y={24} size={13}>from</Label>
      <Label muted anchor="start" x={84} y={24} size={13}>the piece</Label>
      <Label muted anchor="start" x={400} y={24} size={13}>what it buys</Label>
      <Line weight="thin" pts={[[16, 34], [584, 34]]} seed={s('rule')} />
      {ENTRIES.slice(0, st.n).map((e, i) => e.kind === 'head' ? (
        <Label key={i} kind="title" anchor="start" x={20} y={ys[i] + 2} size={15}>{e.text}</Label>
      ) : (
        <g key={i}>
          <Label muted anchor="start" x={20} y={ys[i]} size={14}>{e.tag}</Label>
          <Label kind="mono" anchor="start" x={84} y={ys[i]} size={13}>{e.code}</Label>
          <Label tone={e.bad ? 'red' : undefined} anchor="start" x={400} y={ys[i]} size={14}>{e.buys}</Label>
        </g>
      ))}
      {stage === 6 && <Label muted anchor="start" x={84} y={pendingY + 8} size={14}>nothing yet: it starts in this chapter</Label>}
    </Fig>
  );
}

function LadderPhone({ stage }: { stage: SoFarStage }) {
  const id = `sf-l10-${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const st = STAGES[stage];
  const RH = 26, HH = 28, top = 52;
  const { ys, end } = rowsY(st.n, top, RH, HH);
  const pendingY = end + 4;
  const afterY = (stage === 6 ? pendingY + 24 : end) + 6;
  const marked = st.fresh.length > 0;
  const H = afterY + (marked ? 30 : 8);
  return (
    <Fig id={id} w={330} h={H} title="Storage so far" desc={describe(stage)}>
      {marked && (
        <Wash x={2} y={ys[st.fresh[0]] - 18} w={326} h={(st.fresh.length - 1) * RH + 26} seed={s('w')} />
      )}
      <Label muted anchor="start" x={6} y={22} size={14}>from</Label>
      <Label muted anchor="start" x={54} y={22} size={14}>the piece</Label>
      <Line weight="thin" pts={[[6, 32], [324, 32]]} seed={s('rule')} />
      {ENTRIES.slice(0, st.n).map((e, i) => e.kind === 'head' ? (
        <Label key={i} kind="title" anchor="start" x={6} y={ys[i] + 2} size={15}>{e.text}</Label>
      ) : (
        <g key={i}>
          <Label muted anchor="start" x={6} y={ys[i]} size={14}>{e.tag}</Label>
          <Label kind="mono" tone={e.bad ? 'red' : undefined} anchor="start" x={54} y={ys[i]} size={14}>{e.phone ?? e.code}</Label>
        </g>
      ))}
      {stage === 6 && <Label muted anchor="start" x={54} y={pendingY + 8} size={14}>nothing yet: it starts here</Label>}
      {marked && <Label muted anchor="start" x={6} y={afterY + 16} size={14}>shaded: new since the last chapter</Label>}
    </Fig>
  );
}

export function SoFarStorage({ stage, layout = 'desk' }: { stage: SoFarStage; layout?: Layout }) {
  return layout === 'phone' ? <LadderPhone stage={stage} /> : <LadderDesk stage={stage} />;
}

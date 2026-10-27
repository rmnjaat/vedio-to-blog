// Lecture 03 (lec05), §1.3 — Fig 1·b "Two shared locks on overlapping rows" (D-02 redraw) and
// Fig 1·c "Two exclusive locks on overlapping rows" (D-03 redraw). One layout, two variants.
// Plain connectors (no heads) from the rows to each transaction's query, as on the board: T1 solid, T2 thin.
// Ledger: 1·b L-0038 L-0039 L-0040 L-0041 L-0042; 1·c L-0045 L-0046 L-0047 L-0048 L-0049.
import React from 'react';
import { Fig, Label, Line, Mark, TEXT } from './floor';
import { Hourglass, Padlock, Ring, SixRows, TABLE_W, Txn, rowY } from './s1-locks-parts';

type Mode = 'share' | 'update';
const CW = TEXT.mono * 0.6; // Recursive MONO: one character is 0.6 em wide

/** One transaction's query, written as on the board. The `6` of the IN list can get the board's red dash. */
function Query({ x, y, ids, clause, dash, seed }: { x: number; y: number; ids: string; clause: string; dash?: boolean; seed: string }) {
  const head = `WHERE id IN (${ids.slice(0, -1)}`; // "(1,2," — the 6 is drawn on its own so it can be marked
  const x6 = x + head.length * CW;
  return (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y}>SELECT …</Label>
      <Label kind="mono" anchor="start" x={x} y={y + 22}>{head}</Label>
      <Label kind="mono" anchor="start" tone={dash ? 'red' : undefined} x={x6} y={y + 22}>6</Label>
      <Label kind="mono" anchor="start" x={x6 + CW} y={y + 22}>)</Label>
      {dash && <Mark tone="red" a={[x6, y + 28]} b={[x6 + CW, y + 28]} seed={seed + '-d'} />}
      <Label kind="mono" anchor="start" x={x} y={y + 44}>{clause}</Label>
    </g>
  );
}

function Locks({ mode, layout }: { mode: Mode; layout: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = `l5-fig1${mode === 'share' ? 'b' : 'c'}${P ? '-p' : ''}`;
  const s = (k: string) => `${id}-${k}`;
  const clause = mode === 'share' ? 'FOR SHARE;' : 'FOR UPDATE;';
  const ex = mode === 'update';
  // table
  const TX = P ? 20 : 170, TY = P ? 30 : 40, RH = P ? 28 : 30;
  const ry = (i: number) => rowY(TY, i, RH);
  const LX = TX + TABLE_W + 12; // first padlock
  // query blocks
  const QX = P ? 20 : 440;
  const T1Y = P ? 270 : 56, T2Y = P ? 392 : 196;
  const q1 = T1Y + 36, q2 = T2Y + 36;
  const tgt1: [number, number] = [QX - 10, q1 + 22], tgt2: [number, number] = [QX - 10, q2 + 22];

  return (
    <>
      <SixRows x={TX} y={TY} rowH={RH} seed={s('tb')} />
      {[1, 2, 6].map((i) => <Padlock key={'a' + i} x={LX} y={ry(i)} seed={s('l1-' + i)} />)}
      {!ex && [3, 4, 6].map((i) => <Padlock key={'b' + i} x={i === 6 ? LX + 15 : LX} y={ry(i)} seed={s('l2-' + i)} />)}
      {ex && <Ring x={TX + TABLE_W / 2 + 8} y={ry(6)} rx={TABLE_W / 2 + 26} ry={RH * 0.58} seed={s('ring')} />}

      {!P && [1, 2, 6].map((i) => <Line key={'c1' + i} pts={[[LX + 28, ry(i)], tgt1]} seed={s('c1-' + i)} />)}
      {/* in 1·c rows 3 and 4 carry no padlock (T2 is still waiting), so their connectors start at the table edge */}
      {!P && [3, 4, 6].map((i) => <Line key={'c2' + i} weight="thin" pts={[[ex && i !== 6 ? TX + TABLE_W + 6 : LX + 28, ry(i)], tgt2]} seed={s('c2-' + i)} />)}
      {P && (
        <>
          <Label kind="mono" anchor="start" x={LX + 34} y={ry(1) + 5}>1,2,6 → T1</Label>
          <Label kind="mono" anchor="start" x={LX + 34} y={ry(3) + 5}>3,4,6 → T2</Label>
        </>
      )}

      <Txn cx={QX + 14} cy={T1Y} label="T1" seed={s('t1')} />
      <Label anchor="start" x={QX + 40} y={T1Y + 5}>{ex ? 'read & modify' : 'reads'}</Label>
      <Query x={QX} y={q1} ids="1,2,6" clause={clause} dash={ex} seed={s('q1')} />

      <Txn cx={QX + 14} cy={T2Y} label="T2" seed={s('t2')} />
      {ex ? (
        <>
          <Hourglass x={QX + 46} y={T2Y} seed={s('hg')} />
          <Label anchor="start" x={QX + 60} y={T2Y + 5}>waits</Label>
        </>
      ) : <Label anchor="start" x={QX + 40} y={T2Y + 5}>reads too</Label>}
      <Query x={QX} y={q2} ids="3,4,6" clause={clause} dash={ex} seed={s('q2')} />

      {ex ? (
        <>
          <Label muted anchor="start" x={QX} y={q2 + 78}>without row 6, T2 would</Label>
          <Label muted anchor="start" x={QX} y={q2 + 96}>finish with 3 and 4</Label>
          {/* a plain hand note beside row 6, as 1·b's "both may read row 6": the lecture's one bubble is fig 3·b's */}
          {P ? (
            <>
              <Label muted anchor="start" x={LX + 34} y={ry(6) - 22}>plain SELECTs</Label>
              <Label muted anchor="start" x={LX + 34} y={ry(6) - 4}>still read</Label>
              <Label muted anchor="start" x={LX + 34} y={ry(6) + 14}>row 6</Label>
            </>
          ) : (
            <>
              <Label muted anchor="end" x={TX - 32} y={ry(6) - 4}>plain SELECTs</Label>
              <Label muted anchor="end" x={TX - 32} y={ry(6) + 14}>still read row 6</Label>
            </>
          )}
        </>
      ) : (
        <>
          <Label kind="mono" anchor="start" x={QX} y={q2 + 78}>→ UPDATE … row 6</Label>
          <Hourglass x={QX + 17 * CW + 12} y={q2 + 73} seed={s('hg2')} />
          <Label anchor="start" x={QX + 17 * CW + 26} y={q2 + 78}>waits for T1</Label>
          {P ? (
            <>
              <Label muted anchor="start" x={LX + 34} y={ry(6) - 4}>both may</Label>
              <Label muted anchor="start" x={LX + 34} y={ry(6) + 14}>read row 6</Label>
            </>
          ) : (
            <>
              <Label muted anchor="end" x={TX - 14} y={ry(6) - 4}>both may</Label>
              <Label muted anchor="end" x={TX - 14} y={ry(6) + 14}>read row 6</Label>
            </>
          )}
        </>
      )}
    </>
  );
}

export function SharedLocks({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Two shared locks on overlapping rows';
  const desc = 'A six-row table. T1 runs SELECT … WHERE id IN (1,2,6) FOR SHARE and holds shared locks on rows 1, 2 and 6. T2 runs the same with IN (3,4,6) FOR SHARE and also gets its locks, row 6 included, so row 6 carries two shared locks and both may read it. When T2 then tries to update row 6, it waits for T1.';
  const P = layout === 'phone';
  return <Fig id={P ? 'l5-fig1b-p' : 'l5-fig1b'} w={P ? 340 : 760} h={P ? 535 : 330} title={title} desc={desc}><Locks mode="share" layout={layout} /></Fig>;
}

export function ExclusiveLocks({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Two exclusive locks on overlapping rows';
  const desc = 'The same six-row table. T1 runs SELECT … WHERE id IN (1,2,6) FOR UPDATE and holds exclusive locks on rows 1, 2 and 6, to read and modify them. T2 asks for rows 3, 4 and 6 FOR UPDATE and waits, because row 6, ringed in red, is locked by T1; without row 6 in its list, T2 would finish with rows 3 and 4. Plain SELECTs by others still read row 6’s last committed version; only writers and locking reads wait.';
  const P = layout === 'phone';
  return <Fig id={P ? 'l5-fig1c-p' : 'l5-fig1c'} w={P ? 340 : 760} h={P ? 535 : 330} title={title} desc={desc}><Locks mode="update" layout={layout} /></Fig>;
}

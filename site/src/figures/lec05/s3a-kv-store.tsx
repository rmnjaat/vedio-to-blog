// Lecture 03 (lec05) figure: "Why the index can't help" (two panels; Fig 5·b on the page). Built only from the kit and the lecture's shared glyphs.
// Spec: lectures/lec05/lesson/figures.md, chapter 3.
import React from 'react';
import { Arrow, Bubble, Cross, Fig, Label, Line, Mark } from './floor';
import { chamferRect } from '../kit/hand';
import { RowBox } from './s1-locks-parts';

/* ------------------------------------------------------------------ Fig 3·b: why the index can't help (two panels) */

/** A tiny B+ tree: one root, two internal nodes, four leaves (232 × 110). Leaf texts in mono. */
function TinyTree({ x, y, leaves, seed, faint }: { x: number; y: number; leaves: string[]; seed: string; faint?: boolean }) {
  const cls = faint ? 'ink shape faint' : 'ink shape';
  const node = (nx: number, ny: number, k: string) => <path key={k} className={cls} d={chamferRect(nx, ny, 52, 22, `${seed}-${k}`, 2)} />;
  const ln = (a: [number, number], b: [number, number], k: string) =>
    <Line key={k} weight="thin" className={faint ? 'faint' : undefined} pts={[a, b]} seed={`${seed}-${k}`} />;
  return (
    <g>
      {node(x + 90, y, 'r')}
      {node(x + 30, y + 44, 'i0')}
      {node(x + 150, y + 44, 'i1')}
      {[0, 1, 2, 3].map((i) => node(x + i * 60, y + 88, 'l' + i))}
      {ln([x + 116, y + 22], [x + 56, y + 44], 'e0')}
      {ln([x + 116, y + 22], [x + 176, y + 44], 'e1')}
      {ln([x + 56, y + 66], [x + 26, y + 88], 'e2')}
      {ln([x + 56, y + 66], [x + 86, y + 88], 'e3')}
      {ln([x + 176, y + 66], [x + 146, y + 88], 'e4')}
      {ln([x + 176, y + 66], [x + 206, y + 88], 'e5')}
      {leaves.map((t, i) => <Label key={'t' + i} kind="mono" muted={faint} x={x + i * 60 + 26} y={y + 103} size={12.5}>{t}</Label>)}
    </g>
  );
}

export function IndexCantHelp({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3b-p' : 'fig3b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 740;
  const H = P ? 612 : 300;
  const [ax, ay] = [P ? 0 : 0, 0];
  const [bx, by] = P ? [0, 312] : [460, 0];
  const rx = ax + (P ? 260 : 290); // rows column (panel a)
  const rw = P ? 66 : 96;
  const scanX = ax + (P ? 334 : 404);
  return (
    <Fig id={id} w={W} h={H} title="Why the index can't help"
      desc="Panel a: the cleanup condition created_at + ttl_sec <= now_s, where now_s is UNIX_TIMESTAMP(), the current epoch time, is computed from two columns and the clock for each row, so an index on created_at is no use and the job reads every row on every run. Panel b: with expired_at stored, the condition expired_at <= now_s is a range on the indexed column: the scan enters the B+ tree at the leftmost leaf, reads the expired keys and stops at the first key after now_s.">
      {/* panel a */}
      <Bubble x={ax + 8} y={ay + 6} w={244} h={30} tail={[ax + 120, ay + 58]} lines={['just add an index on created_at?']} seed={s('bub')} />
      <TinyTree x={ax + (P ? 6 : 20)} y={ay + 62} leaves={['09:10', '10:40', '11:30', '11:55']} seed={s('ta')} faint />
      <Cross x={ax + (P ? 122 : 136)} y={ay + 116} size={34} seed={s('xa')} />
      <Label kind="mono" muted x={ax + (P ? 122 : 136)} y={ay + 194} size={13}>index on created_at</Label>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <RowBox key={i} x={rx} y={ay + 40 + i * 30} w={rw} h={24} label={`row ${i + 1}`} seed={s('ra' + i)} size={13} />
      ))}
      <Arrow tone="blue" pts={[[scanX, ay + 42], [scanX, ay + 214]]} seed={s('scan')} />
      <Label kind="mono" anchor="end" x={scanX} y={ay + 238} size={13}>rows read: all</Label>
      <Label tone="red" anchor="end" x={scanX} y={ay + 258} size={13}>each row: created_at + ttl_sec</Label>
      <Label kind="mono" x={P ? ax + 170 : ax + 210} y={ay + 284} size={14}>created_at + ttl_sec &lt;= now_s</Label>
      {P && <Line dotted pts={[[10, 300], [330, 300]]} seed={s('sep')} />}

      {/* panel b */}
      <TinyTree x={bx + (P ? 50 : 20)} y={by + 62} leaves={['11:50', '11:58', '12:04', '12:30']} seed={s('tb')} />
      <Arrow tone="blue" pts={[[bx + (P ? 40 : 10), by + 150], [bx + (P ? 40 : 10), by + 184], [bx + (P ? 158 : 128), by + 184]]} seed={s('rng')} />
      <Mark tone="red" a={[bx + (P ? 166 : 136), by + 142]} b={[bx + (P ? 166 : 136), by + 196]} seed={s('now')} />
      <Label kind="mono" tone="red" x={bx + (P ? 166 : 136)} y={by + 214} size={13}>now_s = 12:00</Label>
      <Label kind="mono" anchor="start" x={bx + (P ? 40 : 20)} y={by + 240} size={13}>rows read: expired only</Label>
      <Label muted anchor="start" x={bx + (P ? 40 : 20)} y={by + 260} size={13}>stops at the first key after now_s</Label>
      <Label kind="mono" x={P ? bx + 170 : bx + 210} y={by + 284} size={14}>expired_at &lt;= now_s</Label>
    </Fig>
  );
}

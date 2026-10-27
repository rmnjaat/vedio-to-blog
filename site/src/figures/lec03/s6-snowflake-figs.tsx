// Lecture 06 (lec03), §6. Fig 6·b "Snowflake inside the API servers, as taught" (D-18 redraw, board frame
// b_013915), Fig 6·d "Where the 41 bits run out" (new) and the §6 rule-box sketch.
// Ledger: Fig 6·b L-0200, L-0201; Fig 6·d L-0237, L-0238, L-0252, L-0253; rule sketch L-0245.
import React from 'react';
import { Actor, Arrow, Box, Cross, Cyl, Dot, Fig, Label, Line, Mark } from '../kit/Kit';

/* ------------------------------------------------------------------ Fig 6·b */

export function SnowflakeInApi({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig6b-p' : 'fig6b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Snowflake inside the API servers, as taught';
  const desc = 'A user sends a tweet to one of three API servers. Each API server has the Snowflake function inside it (a dot), makes the tweet ID itself while storing the tweet, and writes the tweet to a partitioned tweets database. No call goes to any separate ID service.';
  const W = P ? 340 : 640, H = P ? 300 : 280;
  const ax = P ? 22 : 40;                       // actor
  const sx = P ? 52 : 100;                      // request spine
  const bx = P ? 70 : 130, bw = P ? 112 : 190, bh = P ? 34 : 40; // api boxes
  const ys = P ? [60, 120, 180] : [44, 112, 180];
  const ox = bx + bw + (P ? 16 : 30);           // storage spine
  const dx = P ? [252, 300, 276] : [470, 560, 515], dt = P ? [62, 62, 150] : [56, 56, 150];
  const mid = ys[1] + bh / 2;
  return (
    <Fig id={id} w={W} h={H} title={title} desc={desc}>
      <Actor x={ax} y={mid - 22} s={P ? 0.85 : 1} seed={s('u')} />
      <Arrow tone="blue" pts={[[ax + 14, mid], [sx, mid]]} head="none" seed={s('in')} />
      <Line tone="blue" pts={[[sx, ys[0] + bh / 2], [sx, ys[2] + bh / 2]]} seed={s('spine')} />
      {ys.map((y, i) => (
        <g key={i}>
          <Arrow tone="blue" pts={[[sx, y + bh / 2], [bx - 2, y + bh / 2]]} seed={s('a' + i)} />
          <Box x={bx} y={y} w={bw} h={bh} label="api" seed={s('api' + i)} />
          <Dot x={bx + bw - 12} y={y + 10} />
          <Line tone="blue" pts={[[bx + bw + 2, y + bh / 2], [ox, y + bh / 2]]} seed={s('o' + i)} />
        </g>
      ))}
      <Label anchor="end" x={bx + bw - 20} y={ys[0] - 8} size={14}>snowflake() inside</Label>
      <Line tone="blue" pts={[[ox, ys[0] + bh / 2], [ox, ys[2] + bh / 2]]} seed={s('ospine')} />
      <Arrow tone="blue" pts={[[ox, mid], [P ? 236 : 444, mid]]} seed={s('store')} />
      {dx.map((x, i) => <Cyl key={i} cx={x} top={dt[i]} rx={P ? 18 : 26} ry={P ? 5 : 7} h={P ? 40 : 48} seed={s('db' + i)} />)}
      <Label kind="mono" x={P ? 276 : 515} y={P ? 226 : 236} size={14}>tweets db</Label>
      <Label muted x={P ? 276 : 515} y={P ? 244 : 254} size={P ? 14 : 13}>partitioned</Label>
      <Label x={P ? 126 : 225} y={P ? 248 : 248} size={14}>id computed while</Label>
      <Label x={P ? 126 : 225} y={P ? 266 : 266} size={14}>storing the tweet</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d */

export function EpochRunway({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig6d-p' : 'fig6d';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Where the 41 bits run out';
  const desc = 'Two timelines on one year axis. 2^41 milliseconds is about 69.7 years. Counting from 1970, the 41 bits run out in 2039, and by 2023 (1,676,784,716,000 ms) about 76% is already used. Counting the same 41 bits from a 2015 epoch (Discord’s launch year), the same 69.7 years last until about 2084. The years from 1970 to 2015 are what a 2015 company would waste.';
  const x0 = P ? 22 : 130, x1 = P ? 322 : 730;
  const X = (yr: number) => x0 + ((yr - 1970) / 120) * (x1 - x0);
  const T = 14;
  const l1 = P ? 104 : 96, l2 = P ? 200 : 170, ax = P ? 262 : 214;
  const end1 = X(1970 + 69.7), end2 = X(2015 + 69.7);
  const W = P ? 340 : 760, H = P ? 316 : 262;
  return (
    <Fig id={id} w={W} h={H} title={title} desc={desc}>
      {/* the years a 2015 company would waste */}
      <Line pts={[[X(1970), l1 - 18], [X(1970), l1 - 26], [X(2015), l1 - 26], [X(2015), l1 - 18]]} seed={s('br')} />
      {P ? <Label anchor="start" x={x0} y={l1 - 34} size={T}>wasted by a 2015 company</Label>
         : <Label x={(X(1970) + X(2015)) / 2} y={l1 - 34} size={T}>years a 2015 company would waste</Label>}

      {/* line 1: from 1970 */}
      {P ? <Label kind="mono" anchor="start" x={x0} y={l1 - 52} size={T}>epoch 1970</Label>
         : <Label kind="mono" anchor="end" x={x0 - 14} y={l1 + 5} size={T}>epoch 1970</Label>}
      <Line weight="heavy" pts={[[X(1970), l1], [end1, l1]]} seed={s('l1')} />
      <Cross x={end1} y={l1} size={16} seed={s('x1')} />
      <Label tone="red" anchor="start" x={end1 + 14} y={l1 + 5} size={T}>{P ? '2039' : '41 bits run out · 2039'}</Label>
      <Mark a={[X(2023.1), l1 - 8]} b={[X(2023.1), l1 + 8]} seed={s('t23')} />
      <Label kind="mono" x={X(2023.1)} y={l1 + 26} size={P ? 14 : 13}>1,676,784,716,000 ms</Label>
      <Label x={X(2023.1)} y={l1 + 44} size={T}>2023: about 76% used</Label>

      {/* line 2: from 2015 */}
      {P ? <Label kind="mono" anchor="start" x={X(2015)} y={l2 - 14} size={T}>epoch 2015</Label>
         : <Label kind="mono" anchor="end" x={x0 - 14} y={l2 + 5} size={T}>epoch 2015</Label>}
      <Line weight="heavy" pts={[[X(2015), l2], [end2, l2]]} seed={s('l2')} />
      <Mark a={[end2, l2 - 9]} b={[end2, l2 + 9]} weight="heavy" seed={s('e2')} />
      <Label anchor="end" x={end2} y={l2 + 26} size={T}>lasts to about 2084</Label>

      {/* the year axis */}
      <Line pts={[[x0, ax], [x1, ax]]} weight="thin" seed={s('ax')} />
      {(P ? [1970, 2010, 2050, 2090] : [1970, 1990, 2010, 2030, 2050, 2070, 2090]).map((yr) => (
        <g key={yr}>
          <Mark a={[X(yr), ax - 5]} b={[X(yr), ax + 5]} weight="thin" seed={s('k' + yr)} />
          <Label kind="mono" muted x={X(yr)} y={ax + 22} size={P ? 14 : 13}>{String(yr)}</Label>
        </g>
      ))}
      <Label muted x={W / 2} y={H - 8} size={T}>each line is 2^41 ms ≈ 69.7 years long</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §6 */

export function RuleSimple({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule6-p' : 'rule6';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Just a function call';
  const desc = 'A request arrives at an API server. The ID is made by a small function inside the server, and the tweet goes straight to the database. A separate ID service, drawn faint, is not needed: no arrow leaves the server for it.';
  const W = P ? 320 : 480, H = P ? 190 : 160;
  const bx = P ? 70 : 110, by = P ? 40 : 40, bw = P ? 120 : 150, bh = P ? 50 : 56;
  return (
    <Fig id={id} w={W} h={H} title={title} desc={desc}>
      <Arrow tone="blue" pts={[[P ? 12 : 30, by + bh / 2], [bx - 2, by + bh / 2]]} seed={s('in')} />
      <Box x={bx} y={by} w={bw} h={bh} label="api" seed={s('api')} />
      <Dot x={bx + bw - 14} y={by + 12} />
      <Label x={bx + bw / 2} y={by + bh + 22} size={15}>just a function call</Label>
      <Arrow tone="blue" pts={[[bx + bw + 2, by + bh / 2], [P ? 248 : 318, by + bh / 2]]} seed={s('out')} />
      <Cyl cx={P ? 276 : 348} top={by + 6} rx={P ? 22 : 26} ry={P ? 6 : 7} h={P ? 36 : 40} seed={s('db')} />
      <g className="faint">
        <Box x={P ? 210 : 392} y={P ? 128 : 96} w={P ? 96 : 80} h={34} label="id svc" seed={s('svc')} />
      </g>
      <Label muted x={P ? 258 : 432} y={P ? 182 : 150} size={P ? 14 : 13}>not needed</Label>
    </Fig>
  );
}

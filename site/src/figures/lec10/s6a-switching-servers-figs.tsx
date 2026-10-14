// Lecture 10 (lec10), chapter 6 part a (6.1–6.3): Fig 6·a (D-09 redraw, StepThrough: old index, new file),
// Fig 6·b (D-06 top-right redraw + D-11 inset: a pointer file) and Fig 6·c (D-10 redraw: two ways to hear "changed").
// Specs: lectures/lec10/lesson/figures.md §6. Parts: ./s6a-switching-servers-parts.
import React from 'react';
import { Arrow, Box, Bubble, Cloud, Cross, Dot, Label, Line, Mark, Num, Pipe, Step, StepState } from '../kit/Kit';
import { chamferRect } from '../kit/hand';
import { Fig, MetaFile, Ring, RowFile, StripeFile, Tick, type Layout, type Row } from './s6a-switching-servers-parts';

/* ------------------------------------------------------------------ Fig 6·a: old index, new file */

const OLD: Row[] = [
  { text: 'aah,to exclaim' }, { text: 'abate,to lessen' }, { text: 'apple,a fruit', tone: 'green' },
  { text: 'ball,a round obj' }, { text: 'bat,a club' }, { text: 'bath,a wash' },
];
const NEW: Row[] = [
  { text: 'aah,to exclaim' }, { text: 'abate,to make less' }, { text: '  intense; lessen' },
  { text: 'apple,a round fruit' }, { text: 'ball,a round obj' }, { text: 'bat,a club' },
];

export function OldIndexNewFile({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f6a-p' : 'l10-f6a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Old index, new file';
  const desc = 'An API server’s in-memory index says apple is at byte 100, 1,024 bytes long (the class’s round number), and the read, starting at apple’s entry, returns apple. The new dictionary is then uploaded to the same S3 path. The server still holds last week’s offsets, so the same read now returns bytes from another word, starting mid-line: garbage, until every server reloads its index.';
  const rowH = 28;
  // geometry: index box (bx, by), file (fx, fy); row 2 is the one at byte 100
  // the step-through column is ~420px wide on a desktop, so the desk layout is authored at 420 (FIGURES.md rule 1)
  const g = P
    ? { W: 340, H: 630, bx: 10, by: 58, bw: 320, fx: 70, fy: 250, fw: 230 }
    : { W: 420, H: 336, bx: 4, by: 58, bw: 180, fx: 250, fy: 40, fw: 166 };
  const r2 = g.fy + rowH * 2 + rowH / 2;
  const fileBottom = g.fy + rowH * 7;
  const idxY = P ? g.by + 34 : r2 - 15;
  const fileMid = g.fx + g.fw / 2;
  const read: [number, number][] = P
    ? [[g.bx + 14, g.by + 74], [g.bx + 14, r2], [g.fx - 2, r2]]
    : [[g.bx + g.bw - 10, r2], [g.fx - 2, r2]];
  // result lines (under the file on desk, under everything on phone)
  const ry = P ? fileBottom + 66 : fileBottom + 46;
  const rx = P ? 170 : fileMid;
  const lx = P ? 14 : 4;
  const ly = P ? ry + 58 : 262;
  return (
    <Fig id={id} w={g.W} h={g.H} title={title} desc={desc} halo>
      {/* the API server and its index */}
      <Box x={g.bx} y={g.by} w={g.bw} h={80} seed={s('api')} />
      <Label kind="mono" anchor="start" x={g.bx + 10} y={g.by + 20}>api</Label>
      <path className="ink thin" d={chamferRect(g.bx + 12, idxY, g.bw - 24, 30, s('idx'), 2)} />
      <Label kind="mono" x={g.bx + g.bw / 2} y={idxY + 20}>apple: 100, 1024</Label>
      <Label x={g.bx + g.bw / 2} y={g.by + 102}>index, on the server</Label>

      {/* the file at the S3 path: last week's, then this week's at the same path */}
      <StepState from={1} to={1}>
        <RowFile x={g.fx} y={g.fy} w={g.fw} rows={OLD} rowH={rowH} dots name="data.dat" seed={s('old')} />
      </StepState>
      <StepState from={2}>
        <RowFile x={g.fx} y={g.fy} w={g.fw} rows={NEW} rowH={rowH} dots name="data.dat [new]" seed={s('new')} />
      </StepState>
      <Label kind="mono" anchor="end" x={g.fx - 6} y={r2 - 14} size={13}>100</Label>
      <Mark a={[g.fx - 24, r2 - 10]} b={[g.fx - 4, r2 - 10]} seed={s('o100')} />

      <Step n={1}>
        <Arrow tone="blue" pts={read} seed={s('read')} />
        {P && <Label kind="mono" tone="blue" anchor="start" x={g.bx + 22} y={g.by + 146} size={13}>read 1,024 B at byte 100</Label>}
      </Step>
      <StepState from={1} to={1}>
        <Label tone="green" x={rx} y={ry}>returns: apple,a fruit</Label>
      </StepState>

      <Step n={2}>
        <Bubble x={P ? 118 : 4} y={P ? 2 : 2} w={P ? 214 : 200} h={42} tail={P ? [220, g.by] : [100, g.by]}
          lines={['same path, so', 'no one needs telling']} seed={s('bub')} />
        <Label x={fileMid} y={P ? g.fy - 14 : g.fy - 18}>new file, same path</Label>
        <Label muted x={g.bx + g.bw / 2} y={g.by + 122}>last week’s offsets</Label>
      </Step>

      <Step n={3}>
        <Ring x={fileMid} y={r2} rx={g.fw / 2 + 6} ry={rowH / 2 + 3} tone="red" seed={s('ring')} />
        <Label kind="mono" tone="red" x={rx} y={ry} size={13}>“…nse; lessen↵appl…”</Label>
        <Label tone="red" x={rx} y={ry + 22}>something random!!</Label>
      </Step>

      <Step n={4}>
        <Label tone="red" anchor="start" x={lx} y={ly}>user sees garbage until</Label>
        <Label tone="red" anchor="start" x={lx} y={ly + 20}>every server reloads</Label>
        <Label anchor="start" x={lx} y={ly + (P ? 48 : 66)}>how to smoothly transition?</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·b: a pointer file */

function Inset({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return <path className="ink thin" d={chamferRect(x, y, w, h, seed, 3)} />;
}

/** D-11 reduced: one file per word, rejected. (x, y) is the inset's top-left; w ~ 150 (desk) or 320 (phone). */
function OneFilePerWord({ x, y, w, h, s, wide }: { x: number; y: number; w: number; h: number; s: (k: string) => string; wide?: boolean }) {
  const ccx = wide ? x + 92 : x + w / 2;
  const ccy = wide ? y + 100 : y + 128;
  return (
    <g>
      <Inset x={x} y={y} w={w} h={h} seed={s('inset')} />
      <Box x={ccx - 34} y={wide ? y + 14 : y + 22} w={68} h={26} label="api" labelSize={13} seed={s('iapi')} />
      <Arrow tone="blue" pts={[[ccx, wide ? y + 40 : y + 48], [ccx, ccy - 30]]} seed={s('iget')} />
      <Cloud cx={ccx} cy={ccy} w={130} h={62} seed={s('icl')} />
      {[-34, -12, 10, 32].map((dx, i) => (
        <StripeFile key={i} x={ccx + dx - 8} y={ccy - 12 + (i % 2) * 6} w={16} h={20} lines={2} seed={s('if' + i)} />
      ))}
      <Cross x={ccx} y={ccy} size={44} seed={s('ix')} />
      <Label kind="mono" x={ccx} y={ccy + 46} size={13}>/z/zoo.txt</Label>
      {wide ? (
        <g>
          <Label anchor="start" x={x + 170} y={y + 64}>one file per word</Label>
          <Label tone="red" anchor="start" x={x + 170} y={y + 90}>breaks portability</Label>
          <Label muted anchor="start" x={x + 170} y={y + 114}>the brief: one file</Label>
        </g>
      ) : (
        <g>
          <Label tone="red" x={ccx} y={ccy + 76}>breaks portability</Label>
          <Label kind="title" x={ccx} y={y + h - 14}>one file per word</Label>
        </g>
      )}
    </g>
  );
}

export function PointerFile({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f6b-p' : 'l10-f6b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'A pointer file';
  const desc = 'The new dictionary is uploaded beside the old one under a new name, and a small meta.json at a fixed path is updated to point at it. The old file keeps serving until the servers move over. Storing one file per word is rejected because it breaks portability.';
  if (P)
    return (
      <Fig id={id} w={340} h={672} title={title} desc={desc}>
        <Label x={170} y={22}>static path: the one place to look</Label>
        <Cloud cx={170} cy={196} w={330} h={290} seed={s('cl')} />
        <Label kind="mono" x={170} y={86}>s3</Label>
        <StripeFile x={84} y={118} w={40} h={52} name="dict1.dict" nameAbove seed={s('d1')} />
        <Label muted x={104} y={190}>still serving</Label>
        <StripeFile x={200} y={118} w={40} h={52} name="dict2.dict" nameAbove seed={s('d2')} />
        <Tick x={252} y={136} seed={s('tk')} />
        <Label tone="green" anchor="start" x={262} y={134}>new</Label>
        <MetaFile x={64} y={206} w={208} h={52} lines={['{ path:', '"s3://wd/dict2.dict" }']} name="" seed={s('meta')} />
        <Label kind="mono" x={168} y={276}>meta.json</Label>
        <Dot x={252} y={206} />
        <Arrow pts={[[252, 206], [252, 192], [228, 192], [228, 174]]} seed={s('ptr')} />
        <Box x={110} y={382} w={120} h={36} label="update job" seed={s('job')} />
        <Arrow dashed pts={[[200, 382], [200, 358], [306, 358], [306, 146], [246, 146]]} seed={s('up')} />
        <Num x={306} y={300} n={1} />
        <Arrow dashed pts={[[140, 382], [140, 286]]} seed={s('upm')} />
        {/* below the cloud's bottom outline, on the dashed segment */}
        <Num x={140} y={362} n={2} />
        <Num x={22} y={444} n={1} />
        <Label anchor="start" x={40} y={449}>upload to a new path</Label>
        <Num x={22} y={470} n={2} />
        <Label anchor="start" x={40} y={475}>then update the path</Label>
        <OneFilePerWord x={10} y={492} w={320} h={170} s={s} wide />
      </Fig>
    );
  return (
    <Fig id={id} w={690} h={404} title={title} desc={desc}>
      <Label x={383} y={22}>static path: the one place to look</Label>
      <Cloud cx={256} cy={150} w={486} h={210} seed={s('cl')} />
      <Label kind="mono" x={256} y={66}>s3</Label>
      {/* the files sit ~20 units in from the cloud's left lobe, so "dict1.dict" clears its outline */}
      <StripeFile x={86} y={110} w={40} h={52} name="dict1.dict" nameAbove seed={s('d1')} />
      <Label muted x={106} y={184}>still serving</Label>
      <StripeFile x={186} y={110} w={40} h={52} name="dict2.dict" nameAbove seed={s('d2')} />
      <Tick x={236} y={126} seed={s('tk')} />
      <Label tone="green" anchor="start" x={246} y={124}>new</Label>
      <MetaFile x={290} y={104} w={186} h={52} lines={['{ path:', '"s3://wd/dict2.dict" }']} name="" seed={s('meta')} />
      <Label kind="mono" x={383} y={174}>meta.json</Label>
      <Line pts={[[383, 30], [383, 98]]} seed={s('lead')} className="faint" />
      <Dot x={290} y={140} />
      <Arrow pts={[[290, 140], [230, 140]]} seed={s('ptr')} />
      <Box x={150} y={326} w={140} h={38} label="update job" seed={s('job')} />
      <Arrow dashed pts={[[206, 326], [206, 164]]} seed={s('up')} />
      <Label anchor="end" x={198} y={300}>upload to a new path</Label>
      <Arrow dashed pts={[[262, 326], [262, 290], [383, 290], [383, 182]]} seed={s('upm')} />
      <Label anchor="start" x={392} y={300}>then update the path</Label>
      <Label kind="mono" x={330} y={396}>s3://word-dictionary/dictionary1.dictionary → dictionary2.dictionary</Label>
      <OneFilePerWord x={520} y={40} w={160} h={290} s={s} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c: two ways to hear "changed" */

function PollPanel({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  const X = (v: number) => x0 + v, Y = (v: number) => y0 + v;
  const ticks = [30, 90, 150, 210, 270];
  return (
    <g>
      <Arrow weight="thin" pts={[[X(10), Y(110)], [X(314), Y(110)]]} seed={s('ax')} />
      {ticks.map((t, i) => <Mark key={t} a={[X(t), Y(101)]} b={[X(t), Y(119)]} seed={s('t' + i)} />)}
      <Label x={X(30)} y={Y(92)}>pull</Label>
      <Label x={X(90)} y={Y(92)} muted>pull</Label>
      <Mark a={[X(238), Y(94)]} b={[X(238), Y(126)]} tone="red" seed={s('chg')} />
      <Label tone="red" x={X(232)} y={Y(76)}>index changes on S3</Label>
      <Line pts={[[X(238), Y(110)], [X(270), Y(110)]]} tone="red" weight="heavy" seed={s('gap')} />
      <Label tone="red" anchor="end" x={X(312)} y={Y(146)}>garbage responses</Label>
      <Label anchor="start" x={X(10)} y={Y(146)}>poll every 5–10 min</Label>
      <Label x={X(160)} y={Y(196)}>graceful termination | reload</Label>
      <Label kind="title" x={X(160)} y={Y(290)}>periodic refresh of the index</Label>
    </g>
  );
}

function PubSubPanel({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  const X = (v: number) => x0 + v, Y = (v: number) => y0 + v;
  const api = [50, 140, 230];
  return (
    <g>
      <Cloud cx={X(58)} cy={Y(38)} w={104} h={60} seed={s('cl')} />
      <StripeFile x={X(24)} y={Y(26)} w={18} h={24} lines={2} seed={s('d1')} />
      <StripeFile x={X(48)} y={Y(26)} w={18} h={24} lines={2} seed={s('d2')} />
      <Label kind="mono" x={X(86)} y={Y(43)} size={13}>s3</Label>
      <Box x={X(150)} y={Y(10)} w={116} h={34} label="update job" labelSize={13} seed={s('job')} />
      <Arrow dashed pts={[[X(208), Y(44)], [X(208), Y(94)]]} seed={s('pub')} />
      <Label anchor="end" x={X(200)} y={Y(80)}>publish: “changed”</Label>
      <Pipe x={X(40)} cy={Y(110)} w={260} seed={s('pipe')} />
      <Label kind="mono" x={X(130)} y={Y(115)} size={13}>redis pub/sub</Label>
      {api.map((a, i) => (
        <g key={a}>
          <Box x={X(a)} y={Y(170)} w={60} h={34} label="api" labelSize={13} seed={s('api' + i)} />
          <Arrow pts={[[X(a + 30), Y(170)], [X(a + 30), Y(125)]]} seed={s('sub' + i)} />
        </g>
      ))}
      <Label anchor="start" x={X(86)} y={Y(152)}>subscribe</Label>
      <Label tone="red" x={X(160)} y={Y(234)}>one more component · every server</Label>
      <Label tone="red" x={X(160)} y={Y(254)}>on a persistent connection</Label>
      <Label kind="title" x={X(160)} y={Y(290)}>reactive: pub/sub</Label>
    </g>
  );
}

export function TwoWaysChanged({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f6c-p' : 'l10-f6c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Two ways to hear “changed”';
  const desc = 'Left: each server polls meta.json every 5 to 10 minutes; between the change on S3 and the next pull it serves garbage, and it must reload gracefully. Right: every API server subscribes to a Redis Pub/Sub channel and the update job publishes “changed” when the upload is done; that tells every server at once but adds a component and a persistent connection per server.';
  if (P)
    return (
      <Fig id={id} w={340} h={612} title={title} desc={desc}>
        <PollPanel x0={10} y0={0} s={s} />
        <Line pts={[[30, 306], [310, 306]]} seed={s('div')} className="faint" />
        <PubSubPanel x0={10} y0={316} s={s} />
      </Fig>
    );
  return (
    <Fig id={id} w={680} h={302} title={title} desc={desc}>
      <PollPanel x0={10} y0={0} s={s} />
      <Line pts={[[340, 20], [340, 270]]} seed={s('div')} className="faint" />
      <PubSubPanel x0={352} y0={0} s={s} />
    </Fig>
  );
}

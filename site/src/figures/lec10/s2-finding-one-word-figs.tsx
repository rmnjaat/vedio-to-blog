// Lecture 10 (lec10), chapter 2 "Finding one word fast": Fig 2·a the naive scan (D-01 redraw with the scan), the §2
// rule sketch, Fig 2·b a one-level index (D-02 redraw, real byte offsets) and Fig 2·c the number crunch (D-02 right
// side as a calculator strip, with the 8-byte row from SN-02). Specs: lectures/lec10/lesson/figures.md §2.
import React from 'react';
import {
  Fig, Label, Line, Arrow, Dot, Cache, Bracket, RowFile, FileBar, OffsetCaret, Tick, rowY, type Layout,
} from './s1-dictionary-no-database-parts';
import { chamferRect, ellipse } from '../kit/hand';

/* ------------------------------------------------------------------ Fig 2·a the naive scan */

const DESC_2A =
  'The naive lookup reads the 1 TB file data.dict line by line from the top until it finds the word (the blue arrow down its left edge). A bracket over the whole file reads worst case 1 TB; a bracket over the upper half reads average 0.5 TB, 500 GB per request. Every request pays it again.';

export function NaiveScan({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'The naive lookup scans the file';
  if (layout === 'phone') {
    const s = (k: string) => `l10-f2a-p-${k}`;
    return (
      <Fig id="l10-f2a-p" w={340} h={346} title={title} desc={DESC_2A}>
        <RowFile x={46} y={20} w={170} h={170} rows={['apple,a fruit', 'amazon,…']} seed="l10-datafile" name="data.dict" />
        <Label kind="mono" anchor="end" x={208} y={182}>1 TB</Label>
        <Arrow pts={[[32, 26], [32, 188]]} tone="blue" seed={s('scan')} />
        <Bracket x={232} y0={20} y1={105} seed={s('half')} />
        <Bracket x={250} y0={20} y1={190} seed={s('full')} />
        <Label tone="red" anchor="start" x={258} y={58}>avg</Label>
        <Label tone="red" anchor="start" x={258} y={76}>0.5 TB</Label>
        <Label tone="red" anchor="start" x={258} y={166}>worst</Label>
        <Label tone="red" anchor="start" x={258} y={184}>1 TB</Label>
        <Label tone="blue" x={170} y={242}>read line by line until the word</Label>
        <Label tone="red" x={170} y={270}>average: 0.5 TB = 500 GB per request</Label>
        <Label tone="red" x={170} y={296}>worst case: the whole 1 TB</Label>
        <Label x={170} y={330}>every request, again</Label>
      </Fig>
    );
  }
  const s = (k: string) => `l10-f2a-${k}`;
  return (
    <Fig id="l10-f2a" w={660} h={318} title={title} desc={DESC_2A}>
      <RowFile x={170} y={30} w={270} h={230} rows={['apple,a fruit', 'amazon,a rainforest']} seed="l10-datafile" name="data.dict" />
      <Label kind="mono" anchor="end" x={430} y={250}>1 TB</Label>
      <Arrow pts={[[152, 36], [152, 258]]} tone="blue" seed={s('scan')} />
      <Label tone="blue" anchor="end" x={140} y={132}>read line by line</Label>
      <Label tone="blue" anchor="end" x={140} y={150}>until the word</Label>
      <Bracket x={462} y0={30} y1={145} seed={s('half')} />
      <Bracket x={484} y0={30} y1={260} seed={s('full')} />
      <Label tone="red" anchor="start" x={496} y={82}>average: 0.5 TB</Label>
      <Label tone="red" anchor="start" x={496} y={100}>= 500 GB per request</Label>
      <Label tone="red" anchor="start" x={496} y={252}>worst case: 1 TB</Label>
      <Label x={305} y={308}>every request, again</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §2 */

const DESC_R2 = 'A long data file with a short index above it; one blue arrow goes from the index straight down to one byte offset in the file. Under it: then, how big is the index?';

export function ReadsSlowIndex({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule2-p' : 'l10-rule2';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480, x0 = P ? 16 : 40, fw = P ? 288 : 400, ix = x0 + (P ? 24 : 40), iw = P ? 76 : 92, tx = x0 + fw * 0.66;
  return (
    <Fig id={id} w={W} h={160} title="Reads slow: index" desc={DESC_R2} className="bottomup">
      <FileBar x={ix} y={18} w={iw} h={22} segs={[{ label: 'index', w: iw }]} seed={s('idx')} />
      <FileBar x={x0} y={82} w={fw} h={28} seed={s('data')} />
      <Label kind="mono" x={x0 + fw * 0.3} y={101}>data</Label>
      <Arrow pts={[[ix + iw / 2, 40], [ix + iw / 2, 60], [tx, 60], [tx, 80]]} tone="blue" seed={s('ptr')} />
      <OffsetCaret x={tx} y={114} seed={s('car')} tone="blue" />
      <Label x={W / 2} y={150}>then: how big is the index?</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b a one-level index */

const DESC_2B =
  'A small index file, index.dict, lists each word with the byte offset where its line starts in the data file: apple at 0, amazon at 14, book at 34. Thin pointers run from each index row to its line in data.dict, which is 1 TB. The line "apple,a fruit" plus its newline is 14 bytes, so amazon starts at byte 14. A lookup reads the index, then jumps to that byte.';

export function OneLevelIndex({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'A one-level index';
  const idx = ['apple, 0, 14', 'amazon, 14, 20', 'book, 34, …'];
  const idxP = ['apple,0,14', 'amazon,14,20', 'book,34,…'];
  const offs = ['0', '14', '34'];
  if (layout === 'phone') {
    const s = (k: string) => `l10-f2b-p-${k}`;
    const Y = 40;
    return (
      <Fig id="l10-f2b-p" w={340} h={378} title={title} desc={DESC_2B}>
        <Label x={170} y={22}>“Indexing”</Label>
        <RowFile x={10} y={Y} w={112} h={170} rows={idxP} seed="l10-indexfile" name="index.dict" pad={10} />
        <RowFile x={160} y={Y} w={170} h={170} rows={['apple,a fruit', 'amazon,…', 'book,…']} seed="l10-datafile" name="data.dict" pad={42} />
        <Label kind="mono" anchor="end" x={322} y={202}>1 TB</Label>
        {offs.map((o, i) => (
          <g key={i}>
            <Dot x={118} y={rowY(Y, i)} />
            <Arrow pts={[[118, rowY(Y, i)], [158, rowY(Y, i)]]} weight="thin" seed={s(`p${i}`)} />
            <Label kind="mono" muted anchor="start" x={168} y={rowY(Y, i) + 5}>{o}</Label>
          </g>
        ))}
        <Label x={170} y={264}>index: keys + offsets + lengths only</Label>
        <Label kind="mono" x={170} y={292}>"apple,a fruit\n"</Label>
        <Label kind="mono" x={170} y={312}>= 14 bytes</Label>
        <Label x={170} y={342}>byte offset: the nth byte</Label>
        <Label x={170} y={362}>where the line starts</Label>
      </Fig>
    );
  }
  const s = (k: string) => `l10-f2b-${k}`;
  const Y = 50;
  return (
    <Fig id="l10-f2b" w={640} h={338} title={title} desc={DESC_2B}>
      <Label x={320} y={28}>“Indexing”</Label>
      <RowFile x={40} y={Y} w={140} h={200} rows={idx} seed="l10-indexfile" name="index.dict" />
      <RowFile x={290} y={Y} w={290} h={200} rows={['apple,a fruit', 'amazon,a rainforest', 'book,…']} seed="l10-datafile" name="data.dict" size="1 TB" pad={50} />
      {offs.map((o, i) => (
        <g key={i}>
          <Dot x={176} y={rowY(Y, i)} />
          <Arrow pts={[[176, rowY(Y, i)], [288, rowY(Y, i)]]} weight="thin" seed={s(`p${i}`)} />
          <Label kind="mono" muted anchor="start" x={300} y={rowY(Y, i) + 5}>{o}</Label>
        </g>
      ))}
      <Label x={110} y={300}>keys + offsets + lengths only</Label>
      <Label kind="mono" x={435} y={300}>"apple,a fruit\n" = 14 bytes</Label>
      <Label x={435} y={326}>byte offset: the nth byte where the line starts</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c the number crunch */

const DESC_2C =
  'The index estimate as a calculator strip: 170,000 words times (1 byte for the word’s length, plus 7.6 for the average distinct word, plus 8 for the byte offset a 1 TB file needs, plus 4 for the line’s length) is 170,000 times 20.6 bytes, 3,502,000 bytes, about 3.5 MB. It fits in RAM: peanuts next to the 1 TB of data. MB here is 10 to the 6 bytes.';

/** One arithmetic line laid out token by token, so labels can sit under each term. */
function Expr({ y, xs }: { y: number; xs: number[] }) {
  const t = ['(', '1', '+', '7.6', '+', '8', '+', '4', ')'];
  return (
    <g>
      {t.map((tok, i) => (
        <Label key={i} kind="mono" x={xs[i]} y={y}>{tok}</Label>
      ))}
    </g>
  );
}

function Circled({ cx, cy, rx, ry, seed }: { cx: number; cy: number; rx: number; ry: number; seed: string }) {
  return <path className="green" d={ellipse(cx, cy, rx, ry, seed)} />;
}

export function NumberCrunch({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'The number crunch';
  if (layout === 'phone') {
    const s = (k: string) => `l10-f2c-p-${k}`;
    const xs = [96, 112, 130, 156, 182, 204, 226, 248, 266];
    return (
      <Fig id="l10-f2c-p" w={340} h={268} title={title} desc={DESC_2C}>
        <path className="ink shape" d={chamferRect(6, 6, 328, 254, s('strip'), 3)} />
        <Label kind="mono" anchor="start" x={14} y={40}>170,000 ×</Label>
        <Expr y={40} xs={xs} />
        <Label anchor="start" x={14} y={66} size={13}>word length · avg word ·</Label>
        <Label anchor="start" x={14} y={84} size={13}>offset · line length (bytes)</Label>
        <Label kind="mono" anchor="start" x={14} y={118}>= 170,000 × 20.6 B</Label>
        <Label kind="mono" anchor="start" x={14} y={142}>= 3,502,000 B</Label>
        <Label kind="mono" anchor="start" x={14} y={172}>≈</Label>
        <Label kind="mono" x={70} y={172}>3.5 MB</Label>
        <Circled cx={70} cy={167} rx={40} ry={14} seed={s('ring')} />
        <Tick x={124} y={166} seed={s('t1')} />
        <Label tone="green" anchor="start" x={138} y={172}>fits in RAM:</Label>
        <Label tone="green" anchor="start" x={138} y={190}>“peanuts”</Label>
        <Cache x={262} y={100} w={62} h={58} label="ram" seed={s('ram1')} />
        <Label muted x={170} y={244}>MB = 10⁶ bytes · data: 1 TB</Label>
      </Fig>
    );
  }
  const s = (k: string) => `l10-f2c-${k}`;
  const xs = [128, 152, 176, 214, 252, 286, 320, 352, 376];
  return (
    <Fig id="l10-f2c" w={700} h={150} title={title} desc={DESC_2C}>
      <path className="ink shape" d={chamferRect(10, 10, 680, 130, s('strip'), 3)} />
      <Label kind="mono" anchor="start" x={30} y={50}>170,000 ×</Label>
      <Expr y={50} xs={xs} />
      <Label anchor="start" x={400} y={44} size={13}>word length + avg word</Label>
      <Label anchor="start" x={400} y={62} size={13}>+ offset + line length, in bytes</Label>
      <Label kind="mono" anchor="start" x={30} y={110}>= 170,000 × 20.6 B = 3,502,000 B ≈</Label>
      <Label kind="mono" x={368} y={110}>3.5 MB</Label>
      <Circled cx={368} cy={105} rx={38} ry={15} seed={s('ring')} />
      <Tick x={422} y={104} seed={s('t1')} />
      <Label tone="green" anchor="start" x={436} y={110}>fits in RAM: “peanuts”</Label>
      <Cache x={630} y={30} w={52} h={56} label="ram" seed={s('ram1')} />
      <Label muted anchor="end" x={672} y={130}>MB = 10⁶ bytes · data: 1 TB</Label>
    </Fig>
  );
}

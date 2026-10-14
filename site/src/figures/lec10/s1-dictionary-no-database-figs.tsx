// Lecture 10 (lec10), chapter 1 "A dictionary with no database": the lecture's own marks (under the NotationKey),
// Fig 1·a the brief, Fig 1·b a plain text file (D-01 redraw), Fig 1·c one file, not a folder, and the §1 rule sketch.
// Specs: lectures/lec10/lesson/figures.md "Lecture header + NotationKey" and §1. Desk layouts stay <= 711 units so
// labels hold 12.5 at 768px; phone layouts are ~340 units.
import React from 'react';
import {
  Fig, Label, Line, Mark, Arrow, Cross, Cloud, Cache, Actor, RowFile, StripeFile, FileBar, OffsetCaret, Tick, Strike,
  Calendar, Folder, ZipFile, Tag, Platter, RecordBar, type Layout,
} from './s1-dictionary-no-database-parts';
import { chamferRect } from '../kit/hand';

/* ------------------------------------------------------------------ the lecture's own marks */

const DESC_MARKS =
  'The marks this lecture adds to the course notation: a file bar split into header, index and data; S3 as a cloud; an in-memory map as a small key and value table; a caret under a file marking a byte offset; a magnetic disk platter; a short arrow appending to the tail of a file; the active file that takes the writes; and a record bar with CRC, timestamp, key size, value size, key and value.';

function MarkItem({ x, y, label, children }: { x: number; y: number; label: string; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {children}
      <Label x={0} y={78} size={13}>{label}</Label>
    </g>
  );
}

/** The eight glyphs, each drawn around (0, 0..60) with its label at y = 78. */
function marks(id: string) {
  const s = (k: string) => `${id}-${k}`;
  return [
    { label: 'header · index · data', el: <FileBar x={-62} y={22} w={124} segs={[{ label: 'H', w: 26 }, { label: 'I', w: 40 }, { label: 'D', w: 58 }]} seed={s('bar')} /> },
    { label: 'S3 (or any store)', el: <Cloud cx={0} cy={36} w={92} h={50} label="s3" seed={s('s3')} /> },
    { label: 'in-memory map', el: <Cache x={-38} y={6} w={76} h={58} label="map" seed={s('map')} /> },
    { label: 'byte offset', el: <g><FileBar x={-56} y={14} w={112} h={22} seed={s('ob')} /><OffsetCaret x={-8} y={40} seed={s('oc')} /></g> },
    { label: 'magnetic disk', el: <Platter cx={-4} cy={38} rx={40} ry={16} seed={s('pl')} /> },
    { label: 'append', el: <g><StripeFile x={-16} y={18} w={32} h={46} lines={4} seed={s('af')} /><Arrow pts={[[0, -2], [0, 16]]} seed={s('aa')} /></g> },
    { label: 'active file', el: <g><StripeFile x={-16} y={18} w={32} h={46} lines={4} seed={s('act')} /><Label x={0} y={10} size={12.5}>active</Label></g> },
    { label: 'one record', el: <RecordBar x={-80} y={24} seed={s('rec')} cells={[{ label: 'CRC', w: 32 }, { label: 'TS', w: 24 }, { label: 'KSZ', w: 32 }, { label: 'VSZ', w: 32 }, { label: 'K', w: 20 }, { label: 'V', w: 20 }]} /> },
  ];
}

export function LectureMarks({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'This lecture’s own marks';
  if (layout === 'phone') {
    const m = marks('l10-mk-p');
    return (
      <Fig id="l10-marks-p" w={340} h={4 * 104 + 8} title={title} desc={DESC_MARKS}>
        {m.map((it, i) => <MarkItem key={i} x={i % 2 === 0 ? 86 : 254} y={10 + Math.floor(i / 2) * 104} label={it.label}>{it.el}</MarkItem>)}
      </Fig>
    );
  }
  const m = marks('l10-mk');
  return (
    <Fig id="l10-marks" w={700} h={206} title={title} desc={DESC_MARKS}>
      {m.map((it, i) => <MarkItem key={i} x={90 + (i % 4) * 174} y={8 + Math.floor(i / 4) * 102} label={it.label}>{it.el}</MarkItem>)}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·a the brief */

const DESC_1A =
  'A requirement card for the dictionary, with four tabs along its top: storage, query, portability, seamless updates. Inside: a 1 TB file of 170,000 words; one word in, its meaning out, else 404; a key-value store from a word to two or three lines; scalable on storage and API sides; very read-heavy, far beyond 1000 to 1; mostly read-only; a changelog every Sunday and no live updates; a high response time is fine; one portable file. Along the bottom every database is struck out in red: no database at all. Under the card: 1 TB on purpose, too big to copy everywhere.';

function Tabs({ x, y, gap, rows }: { x: number; y: number; gap: number; rows: { label: string; w: number }[][] }) {
  return (
    <g>
      {rows.map((row, r) => {
        let at = x;
        return row.map((t, i) => {
          const x0 = at; at += t.w + gap;
          return (
            <g key={`${r}-${i}`}>
              <path className="ink shape" d={chamferRect(x0, y + r * 30, t.w, 26, `l10-tab-${r}-${i}-${x}`, 2)} />
              <Label kind="mono" x={x0 + t.w / 2} y={y + r * 30 + 18}>{t.label}</Label>
            </g>
          );
        });
      })}
    </g>
  );
}

export function TheBrief({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'The brief: a dictionary with no database';
  if (layout === 'phone') {
    const s = (k: string) => `l10-f1a-p-${k}`;
    const L = 22; // left text x
    const lines: [number, React.ReactNode][] = [
      [176, <Label anchor="start" x={L} y={176}>one word in → meaning out, else 404</Label>],
      [202, <Label anchor="start" x={L} y={202}>key → value: word → 2–3 lines</Label>],
      [228, <Label anchor="start" x={L} y={228}>scalable: storage and api sides</Label>],
      [254, <Label anchor="start" x={L} y={254}>read-heavy: ≫ 1000 : 1</Label>],
      [280, <Label anchor="start" x={L} y={280}>mostly read-only, like Oxford</Label>],
    ];
    return (
      <Fig id="l10-f1a-p" w={340} h={588} title={title} desc={DESC_1A}>
        <Tabs x={14} y={8} gap={8} rows={[[{ label: 'storage', w: 92 }, { label: 'query', w: 72 }], [{ label: 'portability', w: 116 }, { label: 'seamless updates', w: 160 }]]} />
        <path className="ink shape" d={chamferRect(8, 64, 324, 470, s('card'), 3)} />
        <StripeFile x={L} y={84} w={40} h={52} seed={s('file')} />
        <Label kind="mono" anchor="start" x={L + 54} y={106}>1 TB</Label>
        <Label kind="mono" anchor="start" x={L + 54} y={128}>170,000 words</Label>
        {lines.map(([, el], i) => <g key={i}>{el}</g>)}
        <Calendar x={L} y={298} seed={s('cal')} />
        <Label anchor="start" x={L + 32} y={316}>changelog every Sunday</Label>
        <Label anchor="start" x={L} y={346}>no live updates</Label>
        <Label anchor="start" x={L} y={372}>high response time is OK</Label>
        <FileBar x={L} y={386} w={44} h={18} seed={s('bar')} />
        <Label anchor="start" x={L + 56} y={400}>one portable file</Label>
        <Mark a={[20, 420]} b={[320, 420]} weight="thin" seed={s('sep')} />
        <Label kind="mono" x={170} y={448}>mysql postgres mongodb</Label>
        <Strike x0={70} x1={272} y={443} seed={s('st1')} />
        <Label kind="mono" x={170} y={474}>redis elasticsearch memcache</Label>
        <Strike x0={48} x1={292} y={469} seed={s('st2')} />
        <Label tone="red" x={170} y={510}>no database at all</Label>
        <Label x={170} y={560}>1 TB on purpose:</Label>
        <Label x={170} y={580}>too big to copy everywhere</Label>
      </Fig>
    );
  }
  const s = (k: string) => `l10-f1a-${k}`;
  const L = 44, R = 376;
  return (
    <Fig id="l10-f1a" w={700} h={378} title={title} desc={DESC_1A}>
      <Tabs x={36} y={10} gap={10} rows={[[{ label: 'storage', w: 100 }, { label: 'query', w: 84 }, { label: 'portability', w: 128 }, { label: 'seamless updates', w: 170 }]]} />
      <path className="ink shape" d={chamferRect(20, 36, 660, 290, s('card'), 3)} />
      {/* left column */}
      <StripeFile x={L} y={58} w={42} h={56} seed={s('file')} />
      <Label kind="mono" anchor="start" x={L + 58} y={80}>1 TB</Label>
      <Label kind="mono" anchor="start" x={L + 58} y={102}>170,000 words</Label>
      <Label anchor="start" x={L} y={150}>one word in → meaning out, else 404</Label>
      <Label anchor="start" x={L} y={180}>key → value: word → 2–3 lines</Label>
      <Label anchor="start" x={L} y={210}>scalable: storage and api sides</Label>
      {/* right column */}
      <Label anchor="start" x={R} y={72}>read-heavy: ≫ 1000 : 1</Label>
      <Label anchor="start" x={R} y={100}>mostly read-only, like Oxford</Label>
      <Calendar x={R} y={114} seed={s('cal')} />
      <Label anchor="start" x={R + 32} y={132}>changelog every Sunday</Label>
      <Label anchor="start" x={R} y={162}>no live updates</Label>
      <Label anchor="start" x={R} y={190}>high response time is OK</Label>
      <FileBar x={R} y={204} w={46} h={18} seed={s('bar')} />
      <Label anchor="start" x={R + 58} y={218}>one portable file</Label>
      {/* struck-out row */}
      <Mark a={[40, 240]} b={[660, 240]} weight="thin" seed={s('sep')} />
      <Label kind="mono" x={350} y={276}>mysql postgres mongodb redis elasticsearch memcache</Label>
      <Strike x0={130} x1={572} y={271} seed={s('st')} />
      <Label tone="red" x={350} y={308}>no database at all</Label>
      <Label x={350} y={360}>1 TB on purpose: too big to copy everywhere</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·b a plain text file */

const DESC_1B =
  'The dictionary as one plain text file, one line per word with its meaning: apple, a fruit; amazon, a rainforest; and so on, 1 TB in all. Beside it, text file has a green tick and JSON file is struck out in red, because checking one word would mean reading and parsing the whole file. No word appears twice.';

export function PlainTextFile({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'A plain text file';
  const rows = ['apple,a fruit', 'amazon,a rainforest'];
  if (layout === 'phone') {
    const s = (k: string) => `l10-f1b-p-${k}`;
    return (
      <Fig id="l10-f1b-p" w={340} h={330} title={title} desc={DESC_1B}>
        <Label anchor="start" x={30} y={26}>text file</Label>
        <Tick x={112} y={20} seed={s('tick')} />
        <Label anchor="start" x={180} y={26}>JSON file</Label>
        <Strike x0={176} x1={256} y={21} seed={s('st')} />
        <Label tone="red" anchor="start" x={180} y={48}>must read + parse</Label>
        <Label tone="red" anchor="start" x={180} y={66}>all of it</Label>
        <RowFile x={24} y={84} w={250} h={160} rows={rows} seed="l10-datafile" size="1 TB" />
        <Label x={170} y={280}>one line per word: word , meaning</Label>
        <Label x={170} y={306}>no word twice</Label>
      </Fig>
    );
  }
  const s = (k: string) => `l10-f1b-${k}`;
  return (
    <Fig id="l10-f1b" w={600} h={300} title={title} desc={DESC_1B}>
      <Label anchor="start" x={30} y={76}>text file</Label>
      <Tick x={112} y={70} seed={s('tick')} />
      <Label anchor="start" x={30} y={136}>JSON file</Label>
      <Strike x0={26} x1={106} y={131} seed={s('st')} />
      <Label tone="red" anchor="start" x={30} y={160}>must read + parse</Label>
      <Label tone="red" anchor="start" x={30} y={178}>all of it</Label>
      <RowFile x={220} y={30} w={290} h={196} rows={rows} seed="l10-datafile" size="1 TB" />
      <Label x={365} y={262}>one line per word: word , meaning</Label>
      <Label x={365} y={286}>no word twice</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·c one file, not a folder */

const DESC_1C =
  'Three options. Sharding the dictionary into a hundred files, a.dict to z.dict, with each word routed to its file: crossed out in red. One zip holding many folders: crossed out, because it is still many files inside. One file bar with a green tick: literally one file you can copy and ship.';

function Shards({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => <StripeFile key={i} x={x + i * 18} y={y + (i % 2) * 6} w={34} h={48} lines={5} seed={`${id}-sh${i}`} />)}
      <Label kind="mono" x={x + 53} y={y + 76}>a.dict … z.dict</Label>
      <Label x={x + 53} y={y + 98}>×100, shard by word</Label>
      <Cross x={x + 53} y={y + 26} size={44} seed={`${id}-x`} />
    </g>
  );
}

function Zip({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g>
      <Folder x={x - 2} y={y - 4} seed={`${id}-fo1`} />
      <Folder x={x + 18} y={y - 10} seed={`${id}-fo2`} />
      <Folder x={x + 38} y={y - 2} seed={`${id}-fo3`} />
      <ZipFile x={x} y={y + 6} w={60} h={56} seed={`${id}-zip`} />
      <Label kind="mono" x={x + 30} y={y + 84}>dict.zip</Label>
      <Label x={x + 30} y={y + 106}>still many files inside</Label>
      <Cross x={x + 30} y={y + 32} size={44} seed={`${id}-x`} />
    </g>
  );
}

function OneFile({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g>
      <FileBar x={x} y={y + 20} w={160} seed={`${id}-one`} />
      <Tick x={x + 182} y={y + 32} seed={`${id}-tick`} s={1.3} />
      <Label x={x + 80} y={y + 76}>literally one file:</Label>
      <Label x={x + 80} y={y + 96}>copy it, ship it</Label>
      <Tag x={x + 80} y={y - 8} text="one file" seed={`${id}-tag`} />
    </g>
  );
}

export function OneFileNotFolder({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'One file, not a folder';
  if (layout === 'phone') {
    const id = 'l10-f1c-p';
    return (
      <Fig id={id} w={340} h={400} title={title} desc={DESC_1C}>
        <Shards x={117} y={20} id={id} />
        <Zip x={140} y={160} id={id} />
        <OneFile x={80} y={320} id={id} />
      </Fig>
    );
  }
  const id = 'l10-f1c';
  return (
    <Fig id={id} w={690} h={170} title={title} desc={DESC_1C}>
      <Shards x={50} y={30} id={id} />
      <Zip x={300} y={36} id={id} />
      <OneFile x={480} y={42} id={id} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §1 */

const DESC_R1 = 'A staircase of three steps rising left to right. A small figure stands on the first step beside a text file; the next two steps hold only question marks: start with the simplest thing, then discover the design one step at a time.';

export function OneStepAtATime({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule1-p' : 'l10-rule1';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480, x0 = P ? 20 : 50, step = P ? 92 : 128, base = 150, rise = 34;
  const tops = [base - rise, base - 2 * rise, base - 3 * rise];
  return (
    <Fig id={id} w={W} h={164} title="One step at a time" desc={DESC_R1} className="bottomup">
      <Line pts={[[x0, base], [x0, tops[0]], [x0 + step, tops[0]], [x0 + step, tops[1]], [x0 + 2 * step, tops[1]], [x0 + 2 * step, tops[2]], [x0 + 3 * step, tops[2]], [x0 + 3 * step, base]]} seed={s('stairs')} />
      <Line pts={[[x0 - 10, base], [x0 + 3 * step + 10, base]]} weight="thin" seed={s('floor')} />
      <Actor x={x0 + 22} y={tops[0] - 36} s={0.8} seed={s('me')} />
      <StripeFile x={x0 + step - 36} y={tops[0] - 34} w={24} h={32} lines={4} seed={s('file')} />
      <Label x={x0 + step / 2} y={tops[0] + 22} size={13}>text file</Label>
      <Label x={x0 + step * 1.5} y={tops[1] - 12} size={17}>?</Label>
      <Label x={x0 + step * 2.5} y={tops[2] - 12} size={17}>?</Label>
    </Fig>
  );
}

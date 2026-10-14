// Lecture 01 (lec04), chapter 2 "Green dots", sections 2.5–2.8.
// Fig 2·g (D-07, frame b_003057), Fig 2·h (D-08, frame b_003515), Fig 2·i (board text pages b_004100 + b_004430),
// RuleBox sketch §2 (new). Wider than 360 units → a <Phone> layout (FIGURES.md rule 3).
import React from 'react';
import { Arrow, Box, Cyl, Fig, Label, Line, Mark } from './_kit';
import { chamferRect } from '../kit/hand';
import { LoopMark, PhoneGlyph, StatusDot, Table, Tick, Timer } from './s2a-parts';

/* ------------------------------------------------------------------ Fig 2·g */

const DESC_2G =
  'Left: table pulse with columns user_id and last_hb, rows u1 1000, u2 1050, u3 1060. Right: on every heartbeat, UPDATE pulse SET last_hb = NOW() WHERE user_id = u1, where NOW() is epoch seconds. ' +
  'Below: GET /status/<user_id> applies two rules: no entry means offline; last_hb older than now minus 30 seconds means offline; otherwise online.';

function Rules({ x, y, s }: { x: number; y: number; s: (k: string) => string }) {
  return (
    <g>
      <Label kind="mono" tone="blue" anchor="start" x={x} y={y}>{'GET /status/<user_id>'}</Label>
      <Label kind="mono" anchor="start" x={x + 10} y={y + 28}>no entry</Label>
      <Label anchor="start" x={x + 92} y={y + 28}>→ offline</Label>
      <StatusDot x={x + 176} y={y + 23} on={false} r={5} seed={s('r1')} />
      <Label kind="mono" anchor="start" x={x + 10} y={y + 54}>last_hb &lt; now − 30s</Label>
      <Label anchor="start" x={x + 182} y={y + 54}>→ offline</Label>
      <StatusDot x={x + 266} y={y + 49} on={false} r={5} seed={s('r2')} />
      <Label kind="mono" anchor="start" x={x + 10} y={y + 80}>else</Label>
      <Label tone="green" anchor="start" x={x + 92} y={y + 80}>→ online</Label>
      <StatusDot x={x + 170} y={y + 75} on r={5} seed={s('r3')} />
    </g>
  );
}

/** Fig 2·g: the pulse table and the two rules (D-07). Desk 560 × 260, phone 340 × 400. */
export function PulseTable({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f04-2g-p' : 'f04-2g';
  const s = (k: string) => `${id}-${k}`;
  const tbl = (
    <Table x={16} y={44} name="pulse" seed={s('t')} cols={[{ name: 'user_id', w: 80 }, { name: 'last_hb', w: 80 }]}
      rows={[['u1', '1000'], ['u2', '1050'], ['u3', '1060']]} />
  );
  if (P)
    return (
      <Fig id={id} w={340} h={400} title="The pulse table and the two rules" desc={DESC_2G}>
        {tbl}
        <Label anchor="start" x={196} y={70} size={13}>one row</Label>
        <Label anchor="start" x={196} y={86} size={13}>per user</Label>
        <Label anchor="start" x={16} y={174} size={13.5}>on every heartbeat:</Label>
        <Label kind="mono" anchor="start" x={16} y={198}>UPDATE pulse</Label>
        <Label kind="mono" anchor="start" x={16} y={218}>SET last_hb = NOW()</Label>
        <Label kind="mono" anchor="start" x={16} y={238}>WHERE user_id = u1</Label>
        <Arrow pts={[[236, 196], [236, 210], [196, 210]]} weight="thin" seed={s('ep')} />
        <Label anchor="start" x={244} y={200} size={13}>epoch seconds</Label>
        <Rules x={16} y={286} s={s} />
      </Fig>
    );
  return (
    <Fig id={id} w={560} h={260} title="The pulse table and the two rules" desc={DESC_2G}>
      {tbl}
      <Label anchor="start" x={226} y={40} size={13.5}>on every heartbeat:</Label>
      <Label kind="mono" anchor="start" x={226} y={68}>UPDATE pulse</Label>
      <Label kind="mono" anchor="start" x={226} y={90}>SET last_hb = NOW()</Label>
      <Label kind="mono" anchor="start" x={226} y={112}>WHERE user_id = u1</Label>
      <Arrow pts={[[448, 64], [368, 64], [368, 76]]} weight="thin" seed={s('ep')} />
      <Label anchor="start" x={454} y={68} size={13}>epoch seconds</Label>
      <Rules x={16} y={176} s={s} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·h */

const DESC_2H =
  'Left: a ladder, 100 users give 100 rows, 1 thousand give 1 thousand, 1 million give 1 million, 1 billion give 1 billion; 1 billion times 8 bytes is 8 GB. ' +
  'Right: user_id and last_hb are each a 4-byte int, so 8 bytes per row; a phone holds 128 GB. ' +
  'Inset: with absence meaning offline, 100 thousand active users give 100 thousand rows, 800 KB.';

/** Fig 2·h: how big is it? (D-08). Desk 600 × 250, phone 340 × 430. */
export function HowBig({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f04-2h-p' : 'f04-2h';
  const s = (k: string) => `${id}-${k}`;
  const ladder = [['100 users', '100 rows'], ['1k', '1k'], ['1m', '1m'], ['1B', '1B']];
  const Ladder = (
    <g>
      {ladder.map(([a, b], i) => (
        <g key={a}>
          <Label kind="mono" anchor="end" x={98} y={34 + i * 24}>{a}</Label>
          <Label kind="mono" muted x={116} y={34 + i * 24}>→</Label>
          <Label kind="mono" anchor="start" x={132} y={34 + i * 24}>{b}</Label>
        </g>
      ))}
      <Line pts={[[16, 116], [210, 116]]} weight="thin" seed={s('rule')} />
      <Label kind="mono" anchor="start" x={16} y={142} size={15}>1B × 8 B = 8 GB</Label>
    </g>
  );
  const Row = (x: number, y: number) => (
    <g>
      <Label kind="mono" x={x + 34} y={y}>user_id</Label>
      <Label kind="mono" x={x + 128} y={y}>last_hb</Label>
      <Arrow pts={[[x + 34, y + 8], [x + 34, y + 30]]} seed={s('a1')} />
      <Arrow pts={[[x + 128, y + 8], [x + 128, y + 30]]} seed={s('a2')} />
      <Label kind="mono" x={x + 34} y={y + 48}>int (4B)</Label>
      <Label kind="mono" x={x + 128} y={y + 48}>int (4B)</Label>
      <Label kind="mono" x={x + 81} y={y + 76}>= 8 B / row</Label>
    </g>
  );
  const Pocket = (x: number, y: number) => (
    <g>
      <PhoneGlyph x={x} y={y} w={30} h={50} seed={s('ph')} />
      <Label anchor="start" x={x + 40} y={y + 22} size={13.5}>128 GB in</Label>
      <Label anchor="start" x={x + 40} y={y + 40} size={13.5}>your pocket</Label>
    </g>
  );
  if (P)
    return (
      <Fig id={id} w={340} h={430} title="How big is it?" desc={DESC_2H}>
        {Ladder}
        <g transform="translate(0 176)">{Row(20, 0)}</g>
        {Pocket(230, 186)}
        <Line pts={[[16, 330], [324, 330]]} weight="thin" dotted seed={s('sep')} className="faint" />
        <Label anchor="start" x={16} y={360} size={13.5}>absence = offline (see 2.7):</Label>
        <Label kind="mono" anchor="start" x={16} y={382}>100k active → 100k rows</Label>
        <Label kind="mono" anchor="start" x={16} y={404}>= 800 KB</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={600} h={250} title="How big is it?" desc={DESC_2H}>
      {Ladder}
      {Row(244, 34)}
      {Pocket(470, 30)}
      <Line pts={[[16, 176], [584, 176]]} weight="thin" dotted seed={s('sep')} className="faint" />
      <Label anchor="start" x={16} y={210} size={13.5}>absence = offline:</Label>
      <Label kind="mono" anchor="start" x={150} y={210}>100k active → 100k rows = 800 KB</Label>
      <Label muted anchor="start" x={150} y={234} size={13}>(see 2.7)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·i */

/** A cron box: dashed outline (a new process to run) with a loop mark. */
function CronBox({ x, y, w = 70, h = 36, seed, crossed }: { x: number; y: number; w?: number; h?: number; seed: string; crossed?: boolean }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} strokeDasharray="6 5" />
      <LoopMark x={x + w - 13} y={y + 13} r={5} seed={seed + '-lp'} />
      <Label kind="mono" x={x + (w - 16) / 2} y={y + h / 2 + 5}>cron</Label>
      {crossed && (
        <g>
          <Mark a={[x - 6, y - 6]} b={[x + w + 6, y + h + 6]} weight="heavy" seed={seed + '-x1'} />
          <Mark a={[x + w + 6, y - 6]} b={[x - 6, y + h + 6]} weight="heavy" seed={seed + '-x2'} />
        </g>
      )}
    </g>
  );
}

function CronPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <CronBox x={30} y={70} seed={s('cron')} />
      <Label tone="red" anchor="start" x={14} y={52} size={13.5}>host it</Label>
      <Label tone="red" anchor="start" x={84} y={52} size={13.5}>keep it up</Label>
      <Label tone="red" anchor="start" x={14} y={130} size={13.5}>monitor it</Label>
      <Arrow pts={[[100, 88], [196, 88]]} seed={s('del')} />
      <Table x={198} y={66} name="pulse" seed={s('t')} cols={[{ name: 'user_id', w: 66 }, { name: 'hb', w: 40 }]}
        rows={[['u1', '…']]} rowH={22} size={12.5} />
      <Label kind="mono" anchor="start" x={10} y={174} size={13}>DELETE … WHERE</Label>
      <Label kind="mono" anchor="start" x={10} y={192} size={13}>last_hb &lt; now − 30s</Label>
      <Label anchor="start" x={180} y={174}>another</Label>
      <Label anchor="start" x={180} y={192}>moving part</Label>
      <Label kind="title" x={160} y={232}>a cron job</Label>
    </g>
  );
}

function TtlPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Box x={14} y={70} w={60} h={36} label="api" seed={s('api')} />
      <Label kind="mono" tone="blue" x={136} y={78} size={13}>SET u42 EX 30</Label>
      <Arrow tone="blue" pts={[[74, 88], [196, 88]]} seed={s('set')} />
      <Cyl cx={246} top={50} rx={48} ry={10} h={88} seed={s('db')} />
      <Label kind="mono" x={232} y={98}>u42</Label>
      <Timer x={268} y={93} r={8} seed={s('ttl')} />
      <Arrow dashed pts={[[246, 108], [246, 126]]} weight="thin" seed={s('exp')} />
      <Mark a={[240, 128]} b={[252, 140]} seed={s('x1')} />
      <Mark a={[252, 128]} b={[240, 140]} seed={s('x2')} />
      <Label muted x={246} y={172} size={13}>the store deletes it</Label>
      <Tick x={60} y={190} seed={s('tick')} />
      <Label tone="green" anchor="start" x={74} y={190}>nothing new to run</Label>
      <Label kind="title" x={160} y={232}>the store expires it</Label>
    </g>
  );
}

const DESC_2I =
  'Two panels. A cron job: a dashed cron box, a separate process, runs DELETE where last_hb is older than now minus 30 seconds against the pulse table; red tags around it say host it, keep it up, monitor it: another moving part. ' +
  'The store expires it: the API server sends SET u42 EX 30 in blue to a store; inside it the key u42 has a TTL timer and a dashed arrow to a cross, the store deleting the key itself; a green tick says nothing new to run.';

/** Fig 2·i: who deletes? Desk 660 × 244, phone 320 × 490. */
export function WhoDeletes({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Who deletes?';
  if (layout === 'phone')
    return (
      <Fig id="f04-2i-p" w={320} h={490} title={title} desc={DESC_2I}>
        <CronPanel id="f04-2i-p1" />
        <Line pts={[[10, 246], [310, 246]]} weight="thin" dotted seed="f04-2i-p-sep" className="faint" />
        <g transform="translate(0 250)"><TtlPanel id="f04-2i-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f04-2i" w={660} h={244} title={title} desc={DESC_2I}>
      <CronPanel id="f04-2i-1" />
      <Line pts={[[330, 12], [330, 232]]} weight="thin" dotted seed="f04-2i-sep" className="faint" />
      <g transform="translate(340 0)"><TtlPanel id="f04-2i-2" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §2 */

const RULE_DESC = 'A cron box crossed out in graphite (a choice, not a failure), beside a database cylinder holding a key with a TTL timer: the store already expires keys, so nothing new is built.';

/** RuleBox sketch §2: never reinvent the wheel. Desk 480 × 130, phone 320 × 200. */
export function NeverReinvent({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'r04-2-p' : 'r04-2';
  const s = (k: string) => `${id}-${k}`;
  if (P)
    return (
      <Fig id={id} w={320} h={200} title="Never reinvent the wheel" desc={RULE_DESC} className="bottomup">
        <CronBox x={30} y={40} seed={s('cron')} crossed />
        <Label x={65} y={110} size={13}>don’t build it</Label>
        <Cyl cx={226} top={30} rx={44} ry={9} h={60} seed={s('db')} />
        <Label kind="mono" x={214} y={74}>key</Label>
        <Timer x={246} y={69} r={8} seed={s('ttl')} />
        <Label kind="mono" x={226} y={130}>ttl 30s</Label>
        <Label x={160} y={176} size={13.5}>the store already does it</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={480} h={130} title="Never reinvent the wheel" desc={RULE_DESC} className="bottomup">
      <CronBox x={40} y={36} seed={s('cron')} crossed />
      <Label x={75} y={112} size={13}>don’t build it</Label>
      <Label x={190} y={62} size={20}>→</Label>
      <Cyl cx={290} top={24} rx={46} ry={9} h={60} seed={s('db')} />
      <Label kind="mono" x={278} y={68}>key</Label>
      <Timer x={310} y={63} r={8} seed={s('ttl')} />
      <Label kind="mono" x={290} y={122}>ttl 30s</Label>
      <Label anchor="start" x={360} y={56} size={13.5}>the store</Label>
      <Label anchor="start" x={360} y={74} size={13.5}>already</Label>
      <Label anchor="start" x={360} y={92} size={13.5}>does it</Label>
    </Fig>
  );
}

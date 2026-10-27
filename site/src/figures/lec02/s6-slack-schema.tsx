// Lecture 04 (lec02), chapter 6 "Slack: the problem and the schema": Fig 6·a (the requirements card), Fig 6·b (five
// drafts of `messages`, a step-through lane figure, time running down), Fig 6·c (the Slack schema: the 6.2 build-up
// state and the final D-02 redraw with a phone layout), Fig 6·d (the sidebar and the open channel) and the §6
// rule-box sketch. Specs: lectures/lec02/lesson/figures.md §6. Board: D-02 (frames b_010400 … b_011730).
import React from 'react';
import {
  Arrow, Badge, Box, Cells, ColList, DownChevron, Fig, Label, Line, Mark, Num, Step, Tick, chamferRect, poly, roundRect, type Layout,
} from './s4-graphs-parts';

/* ------------------------------------------------------------------ the sidebar glyph (Fig 6·a small, Fig 6·d) */

function MiniSidebar({ x, y, seed }: { x: number; y: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={roundRect(x, y, 128, 118, 8, seed)} />
      <Label kind="mono" anchor="start" x={x + 12} y={y + 26}># general</Label>
      <Label kind="mono" anchor="start" x={x + 12} y={y + 48}># standup</Label>
      <Line weight="thin" pts={[[x + 10, y + 62], [x + 118, y + 62]]} seed={seed + '-r'} />
      <Label kind="mono" anchor="start" x={x + 12} y={y + 84}>user B</Label>
      <Label kind="mono" anchor="start" x={x + 12} y={y + 106}>user C</Label>
    </g>
  );
}

/** A table drawn as a column of cells (the board's vertical lists), for the phone layout of Fig 6·b. */
function VCells({ x, y, w, rows, rh = 24, seed, tone = 'ink', dashed }: {
  x: number; y: number; w: number; rows: { t: string; tone?: 'ink' | 'red' }[]; rh?: number; seed: string; tone?: 'ink' | 'red'; dashed?: boolean;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, rows.length * rh, seed, 2)} strokeDasharray={dashed ? '5 4' : undefined} />
      {rows.map((r, i) => (
        <g key={i}>
          {i > 0 && <path className={`${tone} thin`} d={poly([[x + 3, y + i * rh], [x + w - 3, y + i * rh]], `${seed}-r${i}`)} />}
          <Label kind="mono" tone={r.tone} x={x + w / 2} y={y + i * rh + rh / 2 + 5}>{r.t}</Label>
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 6·a */

export function RequirementsCard() {
  const id = 'l02-fig6a';
  const req = ['one organisation, many users', 'many channels', 'DM a user or post in a channel', 'real time', 'scroll history'];
  return (
    <Fig id={id} w={340} h={372} title="The requirements card"
      desc="A card with the five requirements: one organisation with many users, many channels, a user can DM another user or post in a channel, chat is real time, and history can be scrolled. A chip says text only. Below it, a small Slack-like sidebar: this one part, done well.">
      <path className="ink shape" d={roundRect(8, 8, 324, 206, 10, id + '-card')} />
      <Label kind="title" anchor="start" x={24} y={38}>requirements</Label>
      <path className="ink thin" d={roundRect(240, 20, 80, 26, 12, id + '-chip')} />
      <Label x={280} y={38}>text only</Label>
      {req.map((r, i) => (
        <g key={r}>
          <Num x={34} y={72 + i * 30} n={i + 1} />
          <Label anchor="start" x={52} y={77 + i * 30}>{r}</Label>
        </g>
      ))}
      <MiniSidebar x={106} y={226} seed={id + '-sb'} />
      <Label x={170} y={364}>this, done well</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·b (step-through, 420 lane) */

export function MessageDrafts({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-fig6b-p' : 'l02-fig6b';
  const X = P ? 30 : 46, NX = P ? 13 : 18, W = P ? 340 : 420;
  const w1 = P ? [80, 88, 97, 36] : [92, 102, 110, 44];
  const w3 = P ? [58, 72, 46] : [64, 84, 52];
  // desk: compact rows so the whole sheet (drawing 712 tall) fits one laptop screen with its step text (critic C-01)
  const T = P ? [56, 214, 350, 504, 608, 784] : [48, 170, 306, 416, 530, 668];
  const b1 = w1[0], b2 = w1[0] + w1[1] + w1[2];
  const rh = 24, vy = T[0] + 20;
  return (
    <Fig id={id} w={W} h={P ? 670 : 590} lane={!P} title="Six drafts of messages"
      desc="Six drafts of the messages table, each rejected for a concrete reason. Draft 1 has channel_id and receiver_id, one always null, so a row with both null is an orphan. Two tables double every migration and a receiver array breaks when someone joins. A to column with CH- or usr- prefixes needs string processing in every query. A type enum still leaves no foreign key on to and fills the code with ifs and elses. A message that doesn't store its destination can't be rendered by channel.">
      <Label muted anchor="start" x={X} y={24}>settled:</Label>
      <Label kind="mono" anchor="start" x={X + 62} y={24}>users · channels · membership</Label>
      <Line weight="thin" pts={[[X - 6, 36], [W - 10, 36]]} seed={id + '-hd'} />

      {P ? (
      <Step n={1}>
        <Num x={NX} y={vy + 12} n={1} />
        <Label kind="mono" muted anchor="start" x={X} y={T[0] + 10}>messages</Label>
        <VCells x={X} y={vy} w={120} rh={rh} seed={id + '-d1'}
          rows={[{ t: 'sender_id' }, { t: 'channel_id' }, { t: 'receiver_id' }, { t: 'msg' }]} />
        <VCells x={X + 132} y={vy} w={64} rh={rh} seed={id + '-d1g'} tone="red" dashed
          rows={[{ t: 'u1' }, { t: 'null', tone: 'red' }, { t: 'null', tone: 'red' }, { t: 'hi' }]} />
        <Line weight="thin" pts={[[X + 204, vy + rh + 3], [X + 210, vy + rh + 3], [X + 210, vy + rh * 3 - 3], [X + 204, vy + rh * 3 - 3]]} seed={id + '-brace'} />
        <Label anchor="start" x={X + 216} y={vy + rh * 2 - 4}>one is always</Label>
        <Label anchor="start" x={X + 216} y={vy + rh * 2 + 14}>null</Label>
        <Label tone="red" anchor="start" x={X} y={vy + rh * 4 + 26}>both null = an orphan row</Label>
      </Step>
      ) : (
      <Step n={1}>
        <Num x={NX} y={T[0] + 38} n={1} />
        <Label kind="mono" muted anchor="start" x={X} y={T[0] + 10}>messages</Label>
        <Line weight="thin" pts={[[X + b1 + 4, T[0] + 20], [X + b1 + 4, T[0] + 14], [X + b2 - 4, T[0] + 14], [X + b2 - 4, T[0] + 20]]} seed={id + '-brace'} />
        <Label x={X + (b1 + b2) / 2 + (P ? 20 : 0)} y={T[0] + 7}>one is always null</Label>
        <Cells x={X} y={T[0] + 24} widths={w1} seed={id + '-d1'}
          cells={[{ t: 'sender_id' }, { t: 'channel_id' }, { t: 'receiver_id' }, { t: 'msg' }]} />
        <Cells x={X} y={T[0] + 58} widths={w1} seed={id + '-d1g'} tone="red" dashed
          cells={[{ t: 'u1' }, { t: 'null', tone: 'red' }, { t: 'null', tone: 'red' }, { t: 'hi' }]} />
        <Label tone="red" anchor="start" x={X} y={T[0] + 104}>both null = an orphan row</Label>
      </Step>
      )}

      <Step n={2}>
        <Num x={NX} y={T[1] + 24} n={2} />
        <Cells x={X} y={T[1] + 10} seed={id + '-d2a'} cells={[{ t: 'channel_messages' }]} />
        <Cells x={X + (P ? 152 : 160)} y={T[1] + 10} seed={id + '-d2b'} cells={[{ t: 'direct_messages' }]} />
        <Label tone="red" anchor="start" x={X} y={T[1] + 58}>every new column = two migrations</Label>
        <Cells x={X} y={T[1] + 72} seed={id + '-d3'} cells={[{ t: 'receiver_ids: [B, C, D]' }]} />
        <Label tone="red" anchor="start" x={X} y={T[1] + 120}>breaks when someone joins</Label>
      </Step>

      <Step n={3}>
        <Num x={NX} y={T[2] + 18} n={3} />
        <Cells x={X} y={T[2] + 4} widths={w3} seed={id + '-d4'} cells={[{ t: 'from' }, { t: 'to' }, { t: 'msg' }]} />
        <Cells x={X} y={T[2] + 34} widths={w3} seed={id + '-d4a'} cells={[{ t: 'u1', muted: true }, { t: 'CH-42' }, { t: 'hi', muted: true }]} />
        <Cells x={X} y={T[2] + 62} widths={w3} seed={id + '-d4b'} cells={[{ t: 'u2', muted: true }, { t: 'usr-7' }, { t: 'yo', muted: true }]} />
        <Label tone="red" anchor="start" x={P ? X : X + 214} y={T[2] + (P ? 114 : 52)}>string processing</Label>
        <Label tone="red" anchor="start" x={P ? X : X + 214} y={T[2] + (P ? 133 : 71)}>to pick the join</Label>
      </Step>

      <Step n={4}>
        <Num x={NX} y={T[3] + 38} n={4} />
        <Line pts={[[X + 64, T[3] + 24], [X + 64, T[3] + 8], [X + 112, T[3] + 8]]} seed={id + '-fk'} />
        <Label kind="mono" muted anchor="start" x={X + 118} y={T[3] + 13}>channels.id ?</Label>
        <Mark a={[X + 80, T[3] + 1]} b={[X + 94, T[3] + 15]} tone="red" weight="heavy" seed={id + '-fkx1'} />
        <Mark a={[X + 94, T[3] + 1]} b={[X + 80, T[3] + 15]} tone="red" weight="heavy" seed={id + '-fkx2'} />
        <Cells x={X} y={T[3] + 24} seed={id + '-d5'} cells={[{ t: 'from' }, { t: 'to' }, { t: 'type: ch/u' }, { t: 'msg' }]} />
        <Label tone="red" anchor="start" x={X} y={T[3] + 76}>no foreign key on to;</Label>
        <Label tone="red" anchor="start" x={X} y={T[3] + 96}>ifs and elses everywhere</Label>
      </Step>

      <Step n={5}>
        <Num x={NX} y={T[4] + 18} n={5} />
        <Cells x={X} y={T[4] + 4} seed={id + '-d6'} cells={[{ t: 'from' }, { t: 'msg' }]} />
        <Label tone="red" anchor="start" x={X + (P ? 104 : 120)} y={T[4] + 24}>then how do you</Label>
        <Label tone="red" anchor="start" x={X + (P ? 104 : 120)} y={T[4] + 43}>render a channel?</Label>
      </Step>

    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c, the 6.2 state */

export function SchemaStart() {
  const id = 'l02-fig6c-start';
  return (
    <Fig id={id} w={340} h={150} title="Users, channels, and a membership table"
      desc="Three tables so far: users, channels and membership. Membership is written over a struck-through user_channel: a noun gets a persona.">
      <Label muted x={170} y={22}>who is in which channel?</Label>
      <ColList x={16} y={62} w={52} title="users" rows={[]} seed={id + '-u'} />
      <ColList x={98} y={62} w={78} title="channels" rows={[]} seed={id + '-c'} />
      <ColList x={208} y={62} w={110} title="membership" rows={[]} seed={id + '-m'} />
      <Label kind="mono" muted anchor="start" x={212} y={96}>user_channel</Label>
      <Mark a={[208, 93]} b={[318, 92]} seed={id + '-strike'} />
      <Label x={262} y={134}>a noun gets a persona</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c, final */

export function SlackSchema({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-fig6c-p' : 'l02-fig6c';
  const title = 'The Slack schema';
  const desc = 'Four tables: users (id, name); channels (id, org, name, type: grp, user or reg); membership (user_id, channel_id, checkpoint); messages (id, from, channel_id, created_at, msg). membership.user_id points at users, and membership.channel_id and messages.channel_id point at channels. A direct message is a channel with two people.';
  const users = ['id', 'name'];
  const channels = ['id', 'org', 'name', 'type : grp/user/reg'];
  const membership = ['user_id', 'channel_id', '[ checkpoint ]'];
  const messages = ['id', 'from', 'channel_id', 'created_at', 'msg'];
  if (P)
    return (
      <Fig id={id} w={340} h={456} title={title} desc={desc}>
        <Label muted anchor="start" x={16} y={22}>Brainstorm: channels, messages,</Label>
        <Label muted anchor="start" x={16} y={42}>checkpoints, realtime communication</Label>
        <Label muted anchor="start" x={16} y={62}>(membership)</Label>
        <ColList x={18} y={106} w={120} title="users" rows={users} gap={26} seed={id + '-u'} />
        <ColList x={174} y={106} w={150} title="channels" rows={channels} gap={26} added={[3]} seed={id + '-c'} />
        <ColList x={18} y={266} w={130} title="membership" rows={membership} gap={26} added={[2]} seed={id + '-m'} />
        <ColList x={174} y={266} w={150} title="messages" rows={messages} gap={26} seed={id + '-g'} />
        <Label anchor="start" x={16} y={442}>DM = channel with 2 people</Label>
      </Fig>
    );
  const hy = 150, g = 30, ry = (i: number) => hy + 8 + g * (i + 1) - 5;
  return (
    <Fig id={id} w={880} h={360} title={title} desc={desc}>
      <Label anchor="start" x={40} y={40}>Brainstorm: channels, messages, checkpoints, realtime communication (membership)</Label>
      <ColList x={40} y={hy} w={120} title="users" rows={users} gap={g} seed={id + '-u'} />
      <ColList x={232} y={hy} w={200} title="channels" rows={channels} gap={g} added={[3]} seed={id + '-c'} />
      <ColList x={478} y={hy} w={170} title="membership" rows={membership} gap={g} added={[2]} seed={id + '-m'} />
      <ColList x={700} y={hy} w={150} title="messages" rows={messages} gap={g} seed={id + '-g'} />
      {/* membership.channel_id and messages.channel_id → channels (top lanes); membership.user_id → users (under the lists) */}
      <Line weight="thin" pts={[[474, ry(1)], [458, ry(1)], [458, 100], [276, 100], [276, 128]]} seed={id + '-l1'} />
      <Line weight="thin" pts={[[696, ry(2)], [680, ry(2)], [680, 82], [292, 82], [292, 128]]} seed={id + '-l2'} />
      <Line weight="thin" pts={[[474, ry(0)], [450, ry(0)], [450, 304], [84, 304], [84, 232]]} seed={id + '-l3'} />
      <Label anchor="start" x={40} y={342}>DM = channel with 2 people</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d */

/** `again` renders the second copy (Fig 6·d continued, in 6.5) with its own SVG ids. */
export function Sidebar({ again = false }: { again?: boolean }) {
  const id = again ? 'l02-fig6d-a2' : 'l02-fig6d-a';
  const x = 18, y = 16;
  return (
    <Fig id={id} w={340} h={300} title="The sidebar"
      desc="A Slack-like sidebar. Channels sit in the top half: # general with an unread badge of 12, and # standup. Direct messages sit in the bottom half: user B and user C. The channel type decides the half: reg or grp goes on top, user goes below.">
      <path className="ink shape" d={roundRect(x, y, 168, 246, 8, id + '-sb')} />
      <Label anchor="start" x={x + 14} y={y + 30}>channels</Label>
      <Label kind="mono" anchor="start" x={x + 18} y={y + 60}># general</Label>
      <Badge x={x + 146} y={y + 55} n="12" />
      <Label kind="mono" anchor="start" x={x + 18} y={y + 88}># standup</Label>
      <Line weight="thin" pts={[[x + 10, y + 108], [x + 158, y + 108]]} seed={id + '-rule'} />
      <Label anchor="start" x={x + 14} y={y + 138}>direct messages</Label>
      <Label kind="mono" anchor="start" x={x + 18} y={y + 168}>user B</Label>
      <Label kind="mono" anchor="start" x={x + 18} y={y + 196}>user C</Label>
      <Line weight="thin" pts={[[x + 176, y + 14], [x + 184, y + 14], [x + 184, y + 98], [x + 176, y + 98]]} seed={id + '-b1'} />
      <Label anchor="start" x={x + 192} y={y + 52}>type = reg / grp</Label>
      <Label anchor="start" x={x + 192} y={y + 72}>→ top half</Label>
      <Line weight="thin" pts={[[x + 176, y + 118], [x + 184, y + 118], [x + 184, y + 236], [x + 176, y + 236]]} seed={id + '-b2'} />
      <Label anchor="start" x={x + 192} y={y + 172}>type = user</Label>
      <Label anchor="start" x={x + 192} y={y + 192}>→ bottom half</Label>
      <Label kind="title" x={170} y={290}>the sidebar</Label>
    </Fig>
  );
}

export function OpenChannel() {
  const id = 'l02-fig6d-b';
  const lens = [150, 110, 170, 130, 90];
  const ly = [84, 108, 162, 186, 210];
  return (
    <Fig id={id} w={340} h={300} title="The open channel"
      desc="The open channel # general with 12 unread. Two messages above a dashed line, you last read until here, then the new messages below it with a jump here marker. The badge and the line both come from one column: membership.checkpoint.">
      <path className="ink shape" d={roundRect(14, 16, 300, 210, 8, id + '-pane')} />
      <Label kind="mono" anchor="start" x={28} y={44}># general</Label>
      <Badge x={124} y={39} n="12" />
      <Line weight="thin" pts={[[22, 58], [306, 58]]} seed={id + '-hd'} />
      {lens.map((l, i) => <Line key={i} pts={[[30, ly[i]], [30 + l, ly[i]]]} seed={`${id}-m${i}`} />)}
      <Label anchor="start" x={30} y={132} size={13}>you last read until here</Label>
      <Line dashed pts={[[24, 142], [290, 142]]} seed={id + '-rule'} />
      <Label anchor="end" x={276} y={168} size={13}>jump here</Label>
      <DownChevron x={286} y={168} seed={id + '-jmp'} />
      <Line weight="thin" pts={[[136, 39], [290, 39], [290, 240]]} seed={id + '-lead'} />
      <Box x={100} y={240} w={210} h={30} label="membership.checkpoint" seed={id + '-chip'} />
      <Label kind="title" x={170} y={296}>the open channel</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §6 */

export function Rule6({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-rule6-p' : 'l02-rule6';
  const W = P ? 320 : 480;
  const ux = P ? 86 : 130;
  return (
    <Fig id={id} w={W} h={150} title="Nouns, and piggyback"
      desc="A struck-through user_channel with membership written over it, and a new checkpoint column sprouting from membership with a plus. Under it: no ifs and elses.">
      <Label kind="title" x={ux} y={42}>membership</Label>
      <Label kind="mono" muted x={ux} y={74}>user_channel</Label>
      <Mark a={[ux - 56, 70]} b={[ux + 56, 68]} weight="heavy" seed={id + '-s'} />
      <Arrow pts={[[ux + 54, 40], [ux + (P ? 84 : 120), 40], [ux + (P ? 84 : 120), 88]]} seed={id + '-a'} />
      <Label kind="mono" anchor="start" x={ux + (P ? 52 : 86)} y={110}>+ checkpoint</Label>
      <Label x={W / 2} y={140}>no ifs and elses</Label>
    </Fig>
  );
}

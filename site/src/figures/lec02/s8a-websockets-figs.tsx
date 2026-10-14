// Lecture 04 (lec02), chapter 8 part 1 (8.1–8.3): Fig 8·a (+ 8·a′), Fig 8·b steps 1–2, Fig 8·b step 3 (the mesh),
// Fig 8·c and the §8 RuleBox sketch. Board: D-05 (frames b_015845, b_020115, b_020445), D-12 (b_023012, folded into
// Fig 8·a′), D-13 (b_023009, folded into Fig 8·b step 1's "we bridge the gap").
// Step-throughs are authored at 380 with labels at 14, one layout for every width. Blue = the message travelling,
// green = delivered, red = the connection cap and the slots spent on peers.
import React from 'react';
import { Arrow, Box, Bubble, Label, Line, Mark, Step, Num } from '../kit/Kit';
// Fig: the kit's, with a label floor for 360px phones (assembler; see s0-label-floor.tsx)
import { Fig } from './s0-label-floor';
import { Balancer, EdgeServer, PubSub, Sized, Slot, UserStub, WsLine, extraSlotX, userSlotX, type Layout } from './s8a-websockets-parts';

/* ------------------------------------------------------------------ Fig 8·a */

const A_TITLE = 'Four connections, five users';
const A_DESC = 'Five users in one channel, a four-connection limit: A to D share WS1 and E lands on WS2. WS1 delivers locally to B, C and D, but nothing reaches E. Under the servers, the membership each one keeps: WS1 has A, B, C and D in C1; WS2 has E in C1.';

export function FourConnections() {
  const id = 'f8a';
  const s = (k: string) => `${id}-${k}`;
  const W = 380, H = 352;
  const w1 = { x: 78, y: 118, w: 116, h: 52 };
  const w2 = { x: 262, y: 118, w: 110, h: 52 };
  const c1 = w1.x + w1.w / 2, c2 = w2.x + w2.w / 2;
  const sy = w1.y + w1.h - 17;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={A_TITLE} desc={A_DESC}>
        <Label anchor="start" x={12} y={24}>Channel 1 (C1):</Label>
        <Label kind="mono" anchor="start" x={124} y={24}>A B C D E</Label>
        <EdgeServer x={w1.x} y={w1.y} w={w1.w} h={w1.h} label="ws1" slots={{ users: 0 }} seed={s('ws1')} />

        <Step n={1}>
          <Label tone="red" x={c1} y={194}>limit: 4, a toy number</Label>
          <Label tone="red" x={c1} y={211}>(real: far more)</Label>
          <Num size={14} x={30} y={198} n={1} tone="red" />
        </Step>

        <Step n={2}>
          {[0, 1, 2, 3].map((i) => <Slot key={i} x={userSlotX(w1.x + 10, i)} y={sy} kind="user" seed={s('u' + i)} />)}
          <UserStub x={106} y={62} name="B" seed={s('sb')} />
          <UserStub x={166} y={62} name="A" seed={s('sa')} />
          <WsLine pts={[[106, 80], [106, w1.y]]} seed={s('wb')} />
          <WsLine pts={[[166, 80], [166, w1.y]]} seed={s('wa')} />
          <UserStub x={24} y={122} name="C" seed={s('sc')} />
          <UserStub x={24} y={150} name="D" seed={s('sd')} />
          <WsLine pts={[[36, 128], [w1.x, 128]]} seed={s('wc')} />
          <WsLine pts={[[36, 156], [w1.x, 156]]} seed={s('wd')} />
          <EdgeServer x={w2.x} y={w2.y} w={w2.w} h={w2.h} label="ws2" slots={{ users: 1 }} seed={s('ws2')} />
          <UserStub x={c2} y={62} name="E" seed={s('se')} />
          <WsLine pts={[[c2, 80], [c2, w2.y]]} seed={s('we')} />
          <Num size={14} x={14} y={96} n={2} tone="blue" />
        </Step>

        <Step n={3}>
          <Label kind="mono" tone="blue" x={166} y={44}>standup in 5</Label>
          <Arrow tone="blue" pts={[[176, 80], [176, w1.y - 3]]} seed={s('m-a')} />
          <Arrow tone="blue" pts={[[96, w1.y - 3], [96, 80]]} seed={s('m-b')} />
          <Arrow tone="blue" pts={[[w1.x - 3, 121], [40, 121]]} seed={s('m-c')} />
          <Arrow tone="blue" pts={[[w1.x - 3, 149], [40, 149]]} seed={s('m-d')} />
          <Label muted anchor="start" x={186} y={100}>sender skipped</Label>
          <Num size={14} x={14} y={42} n={3} tone="blue" />
        </Step>

        <Step n={4}>
          <Label tone="red" x={c2 + 20} y={70} size={22}>?</Label>
          <Label anchor="end" x={376} y={194}>like two friends in</Label>
          <Label anchor="end" x={376} y={211}>another hotel room</Label>
          <Num size={14} x={c2 + 42} y={64} n={4} tone="red" />
        </Step>

        {/* Fig 8·a′: always visible, the membership each server keeps (board b_020445) and D-12's local pool */}
        <Line weight="thin" dashed pts={[[8, 232], [W - 8, 232]]} seed={s('div')} />
        <Label muted anchor="start" x={12} y={254}>what each server keeps, in memory:</Label>
        <Label kind="mono" x={c1} y={278}>A→C1  B→C1</Label>
        <Label kind="mono" x={c1} y={297}>C→C1  D→C1</Label>
        <Label kind="mono" x={c2} y={278}>E→C1</Label>
        <Label anchor="start" x={12} y={324}>the client sends its channels after connecting;</Label>
        <Label anchor="start" x={12} y={342}>kept eventually consistent</Label>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 8·b steps 1–2 */

const B_TITLE = 'TCP links between WebSocket servers';
const B_DESC = 'WS1 reaches E with one plain TCP link to WS2: it delivers to B, C and D itself and relays the message over the link, and WS2 sends it to E. Then F joins C1 on WS3, WS1 opens a second link to WS3, and F gets it too. Each link costs a server one connection on top of its users.';

export function TcpLinks() {
  const id = 'f8b';
  const s = (k: string) => `${id}-${k}`;
  const W = 380, H = 330;
  const w1 = { x: 30, y: 64, w: 128 }, w2 = { x: 236, y: 64, w: 128 }, w3 = { x: 236, y: 214, w: 128 };
  const h = 52;
  const users = ['A', 'B', 'C', 'D'];
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={B_TITLE} desc={B_DESC}>
        {users.map((u, i) => {
          const x = w1.x + 22 + i * 28;
          return <g key={u}><UserStub x={x} y={20} name={u} seed={s('u' + u)} /><WsLine pts={[[x, 38], [x, w1.y]]} seed={s('w' + u)} /></g>;
        })}
        <EdgeServer x={w1.x} y={w1.y} w={w1.w} h={h} label="ws1" slots={{ users: 4 }} seed={s('ws1')} />
        <UserStub x={w2.x + 64} y={20} name="E" seed={s('ue')} />
        <WsLine pts={[[w2.x + 64, 38], [w2.x + 64, w2.y]]} seed={s('we')} />
        <EdgeServer x={w2.x} y={w2.y} w={w2.w} h={h} label="ws2" slots={{ users: 1 }} seed={s('ws2')} />

        <Step n={1}>
          <Line pts={[[w1.x + w1.w, 84], [w2.x, 84]]} seed={s('tcp12')} />
          <Label kind="mono" x={197} y={77}>tcp</Label>
          <Arrow tone="blue" pts={[[w1.x + w1.w + 4, 98], [w2.x - 4, 98]]} seed={s('m12')} />
          <Arrow tone="blue" pts={[[w2.x + 76, w2.y - 3], [w2.x + 76, 36]]} seed={s('m2e')} />
          <Label tone="green" anchor="start" x={w2.x + 86} y={30}>✓</Label>
          <Label x={197} y={142}>we bridge the gap</Label>
          <Slot x={extraSlotX(w1.x + 10, 0)} y={w1.y + h - 17} kind="peer" seed={s('p1a')} />
          <Slot x={extraSlotX(w2.x + 10, 0)} y={w2.y + h - 17} kind="peer" seed={s('p2a')} />
          <Num size={14} x={14} y={98} n={1} tone="blue" />
        </Step>

        <Step n={2}>
          <EdgeServer x={w3.x} y={w3.y} w={w3.w} h={h} label="ws3" slots={{ users: 1, extra: ['peer'] }} seed={s('ws3')} />
          <WsLine pts={[[w3.x + 64, w3.y + h], [w3.x + 64, 288]]} seed={s('wf')} />
          <UserStub x={w3.x + 64} y={296} name="F" seed={s('uf')} />
          <Label muted anchor="start" x={w3.x + 80} y={302}>joins C1</Label>
          <Line pts={[[94, w1.y + h], [94, 240], [w3.x, 240]]} seed={s('tcp13')} />
          <Label kind="mono" x={166} y={262}>tcp</Label>
          <Arrow tone="blue" pts={[[106, w1.y + h + 4], [106, 228], [w3.x - 4, 228]]} seed={s('m13')} />
          <Arrow tone="blue" pts={[[w3.x + 76, w3.y + h + 3], [w3.x + 76, 292]]} seed={s('m3f')} />
          <Label tone="green" anchor="start" x={w3.x + 86} y={286}>✓</Label>
          <Slot x={extraSlotX(w1.x + 10, 1)} y={w1.y + h - 17} kind="peer" seed={s('p1b')} />
          <Num size={14} x={14} y={228} n={2} tone="blue" />
        </Step>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 8·b step 3: the mesh */

const M_TITLE = 'Four servers, every one linked to every other';
const M_DESC = 'Four WebSocket servers in a two by two grid, joined pairwise by six TCP links: the four sides and both diagonals. Every server now spends three connections on its peers, drawn as three red slots after its four user slots.';

export function Mesh() {
  const id = 'f8b3';
  const s = (k: string) => `${id}-${k}`;
  const W = 380, H = 330;
  const bw = 128, bh = 52;
  const sv = [
    { n: 'ws1', x: 30, y: 64, u: 4 },
    { n: 'ws2', x: 222, y: 64, u: 1 },
    { n: 'ws3', x: 222, y: 216, u: 1 },
    { n: 'ws4', x: 30, y: 216, u: 0 },
  ];
  const [a, b, c, d] = sv;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={M_TITLE} desc={M_DESC}>
        <Label kind="mono" x={a.x + bw / 2} y={44}>A B C D</Label>
        <Label kind="mono" x={b.x + bw / 2} y={44}>E</Label>
        <Label kind="mono" x={c.x + bw / 2} y={296}>F</Label>
        {/* the six links */}
        <Line pts={[[a.x + bw, a.y + 24], [b.x, b.y + 24]]} seed={s('ab')} />
        <Line pts={[[d.x + bw, d.y + 24], [c.x, c.y + 24]]} seed={s('dc')} />
        <Line pts={[[a.x + 40, a.y + bh], [d.x + 40, d.y]]} seed={s('ad')} />
        <Line pts={[[b.x + 88, b.y + bh], [c.x + 88, c.y]]} seed={s('bc')} />
        <Line pts={[[a.x + bw, a.y + bh], [c.x, c.y]]} seed={s('ac')} />
        <Line pts={[[b.x, b.y + bh], [d.x + bw, d.y]]} seed={s('bd')} />
        <Label kind="mono" anchor="start" x={204} y={170}>tcp</Label>
        {sv.map((v) => (
          <EdgeServer key={v.n} x={v.x} y={v.y} w={bw} h={bh} label={v.n} slots={{ users: v.u, extra: ['peer', 'peer', 'peer'] }} seed={s(v.n)} />
        ))}
        <Label x={W / 2} y={322}>every server ↔ every other</Label>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 8·c */

const C_TITLE = 'Where WS1’s seven connections go';
const C_DESC = 'In a four-server mesh, a server with four users holds seven connections, and three of them only talk to other servers. At 100 servers, each one would spend 99 links on its peers.';

export function SevenConnections() {
  const id = 'f8c';
  const s = (k: string) => `${id}-${k}`;
  const W = 340, H = 212;
  const users = ['A', 'B', 'C', 'D'], peers = ['ws2', 'ws3', 'ws4'];
  const sx = (i: number) => 60 + i * 34 + (i >= 4 ? 10 : 0);
  const y = 104, sh = 32;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={C_TITLE} desc={C_DESC}>
        <Label kind="mono" anchor="end" x={52} y={y + 21}>ws1</Label>
        {users.map((u, i) => (
          <g key={u}>
            <Box tone="blue" x={sx(i)} y={y} w={32} h={sh} seed={s('u' + i)} />
            <Label kind="mono" x={sx(i) + 16} y={y + 21}>{u}</Label>
          </g>
        ))}
        {peers.map((p, i) => (
          <g key={p}>
            <Box tone="red" x={sx(i + 4)} y={y} w={32} h={sh} seed={s('p' + i)} />
            <Label kind="mono" tone="red" x={sx(i + 4) + 16} y={y + 21}>{p}</Label>
          </g>
        ))}
        <Mark tone="red" a={[sx(4) - 6, y - 6]} b={[sx(4) - 6, y + sh + 6]} seed={s('cap')} />
        {/* brackets over the two groups */}
        <Line tone="blue" pts={[[sx(0), y - 6], [sx(0), y - 14], [sx(3) + 32, y - 14], [sx(3) + 32, y - 6]]} seed={s('bu')} />
        <Label tone="blue" x={(sx(0) + sx(3) + 32) / 2} y={y - 22}>the job: serve users</Label>
        <Line tone="red" pts={[[sx(4), y - 6], [sx(4), y - 14], [sx(6) + 32, y - 14], [sx(6) + 32, y - 6]]} seed={s('bp')} />
        <Label tone="red" x={(sx(4) + sx(6) + 32) / 2} y={y - 22}>3 serve no user</Label>
        <Bubble x={6} y={6} w={128} h={32} tail={[32, y + 2]} lines={['just 3 links…']} seed={s('bub')} size={14} />
        <Label kind="mono" anchor="end" x={332} y={y + sh + 36}>4 users + 3 peers = 7</Label>
        <Label anchor="end" x={332} y={y + sh + 58}>100 servers → 99 links each</Label>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §8 */

const R_TITLE = 'Start simple, then make it better';
const R_DESC = 'Three steps: two WebSocket servers joined by one TCP link, the bare minimum; then four servers on one real-time Pub/Sub; then a Balancer above them that tells clients where to connect.';

export function StartSimpleRule({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'r8-p' : 'r8';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 300 : 480, H = P ? 412 : 162;
  // panel origins (each panel 132 wide) and the y of each panel's hand label
  const o: [number, number][] = P ? [[84, 4], [84, 116], [84, 264]] : [[0, 34], [174, 14], [348, 10]];
  const ly = P ? [80, 228, 402] : [148, 148, 148];
  const servers = (x: number, y: number, k: string) => (
    <g>
      {[0, 1].map((i) => <Mark key={'t' + i} a={[x + 24 + i * 84, y + 22]} b={[x + 24 + i * 84, y + 38]} seed={s(k + 'mt' + i)} />)}
      {[0, 1].map((i) => <Mark key={'b' + i} a={[x + 24 + i * 84, y + 56]} b={[x + 24 + i * 84, y + 70]} seed={s(k + 'mb' + i)} />)}
      {[0, 1].map((i) => <EdgeServer key={'u' + i} x={x + 4 + i * 84} y={y + 4} w={40} h={18} label="" seed={s(k + 'su' + i)} />)}
      {[0, 1].map((i) => <EdgeServer key={'d' + i} x={x + 4 + i * 84} y={y + 70} w={40} h={18} label="" seed={s(k + 'sd' + i)} />)}
      <PubSub x={x + 6} cy={y + 47} w={122} ry={9} mark={false} seed={s(k + 'ps')} />
    </g>
  );
  const [p1, p2, p3] = o;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={R_TITLE} desc={R_DESC}>
        <EdgeServer x={p1[0] + 2} y={p1[1] + 24} w={46} h={26} label="ws1" size={12.5} seed={s('a1')} />
        <EdgeServer x={p1[0] + 84} y={p1[1] + 24} w={46} h={26} label="ws2" size={12.5} seed={s('a2')} />
        <Line pts={[[p1[0] + 48, p1[1] + 37], [p1[0] + 84, p1[1] + 37]]} seed={s('al')} />
        <Label kind="mono" x={p1[0] + 66} y={p1[1] + 30} size={12.5}>tcp</Label>
        <Label x={p1[0] + 66} y={ly[0]}>the bare minimum</Label>

        {servers(p2[0], p2[1], 'b')}
        <Label x={p2[0] + 66} y={ly[1]}>then better</Label>

        <Balancer x={p3[0] + 26} y={p3[1]} w={80} h={22} label="" seed={s('bal')} />
        <Mark a={[p3[0] + 66, p3[1] + 22]} b={[p3[0] + 66, p3[1] + 28]} seed={s('balm')} />
        {servers(p3[0], p3[1] + 24, 'c')}
        <Label x={p3[0] + 66} y={ly[2]}>then better</Label>

        {P ? (
          <g>
            <Arrow pts={[[150, 88], [150, 110]]} seed={s('ar1')} />
            <Arrow pts={[[150, 236], [150, 258]]} seed={s('ar2')} />
          </g>
        ) : (
          <g>
            <Arrow pts={[[140, 71], [164, 71]]} seed={s('ar1')} />
            <Arrow pts={[[314, 71], [338, 71]]} seed={s('ar2')} />
          </g>
        )}
      </Fig>
    </Sized>
  );
}

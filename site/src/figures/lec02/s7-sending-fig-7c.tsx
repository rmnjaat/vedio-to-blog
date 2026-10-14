// Lecture 04 (lec02), §7.3, Fig 7·c: 3 ways to persist the message (D-04 redraw, board frame b_022045;
// heading at b_014609 / b_014630). Graphite only: the board's white / green / blue paths become the board's own
// numerals ①②③ (green and blue already mean ack and request on this site). Dashed = asynchronous; workers pull
// from kafka. One speech bubble, on the edge server, for the chapter's misconception.
// Desk 880 wide; phone 340 wide, three stacked strips, one per path, each with only its own parts.
import React from 'react';
import { Actor, Arrow, Bubble, Cyl, Fleet, Label, Line, LoadBalancer, Num, Worker } from '../kit/Kit';
// kafka: the lecture's one glyph (pipe + filled message square), as in the notation key and the clips
import { KafkaPipe } from './s1-nosql-kit';
// Fig: the kit's, with a label floor for 360px phones and 768px (assembler; see s0-label-floor.tsx)
import { Fig } from './s0-label-floor';
import { EdgeServer, Sized, UserStub, WsLine, type Layout } from './s7-sending-parts';

const TITLE = '3 ways to persist the message';
const DESC = 'Three ways to persist a message on one system. One, Slack in the instructor’s hypothesis: over HTTP through a load balancer to an API server, which saves it to the sharded database and then tells the edge server to deliver it. Two, a hypothetical WhatsApp-like app: over the WebSocket to the edge server, which delivers it at once and hands it to Kafka; workers pull it from Kafka and save it later. Three, Zoom chat: over the WebSocket, delivered to whoever is connected and never saved. Which one you pick depends on how critical persistence is.';

export function ThreeWays({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f7c-p' : 'f7c';
  const s = (k: string) => `${id}-${k}`;

  if (P) {
    const W = 340, H = 574;
    const a = 0, b = 172, c = 394;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
          {/* ① Slack */}
          <Num x={14} y={a + 16} n="1" />
          <Label anchor="start" x={30} y={a + 21}>Slack (the instructor’s hypothesis)</Label>
          <UserStub x={16} y={a + 56} name="A" seed={s('a1')} />
          <Arrow pts={[[28, a + 62], [44, a + 62]]} seed={s('1-lb')} />
          <LoadBalancer x={44} y={a + 46} w={12} h={32} seed={s('1-lbb')} />
          <Arrow pts={[[56, a + 62], [76, a + 62]]} seed={s('1-api')} />
          <Fleet x={76} y={a + 46} w={60} h={32} n={1} label="api" countLabel={false} seed={s('1-apib')} />
          <Arrow pts={[[136, a + 62], [176, a + 62]]} seed={s('1-db')} />
          <Cyl cx={196} top={a + 48} rx={20} h={26} seed={s('1-dbc')} />
          <Label anchor="start" tone="green" x={224} y={a + 67}>✓ saved first</Label>
          <Arrow pts={[[106, a + 78], [106, a + 126], [150, a + 126]]} seed={s('1-edge')} />
          <Label anchor="start" x={114} y={a + 101} size={13}>then tell the edge</Label>
          <EdgeServer x={150} y={a + 110} w={110} h={32} seed={s('1-e')} />
          <WsLine pts={[[260, a + 126], [300, a + 126]]} seed={s('1-ws')} />
          <UserStub x={316} y={a + 120} name="B" seed={s('b1')} />
          <Line weight="thin" dashed pts={[[8, b - 12], [W - 8, b - 12]]} seed={s('div1')} />

          {/* ② WhatsApp-like */}
          <Num x={14} y={b + 16} n="2" />
          <Label anchor="start" x={30} y={b + 21}>a WhatsApp-like app (hypothetical)</Label>
          <UserStub x={16} y={b + 56} name="A" seed={s('a2')} />
          <WsLine pts={[[28, b + 62], [80, b + 62]]} seed={s('2-ws1')} />
          <EdgeServer x={80} y={b + 46} w={110} h={32} seed={s('2-e')} />
          <WsLine pts={[[190, b + 62], [300, b + 62]]} seed={s('2-ws2')} />
          <Label tone="green" x={246} y={b + 52} size={13}>delivered now</Label>
          <UserStub x={316} y={b + 56} name="B" seed={s('b2')} />
          <Arrow dashed pts={[[135, b + 78], [135, b + 104]]} seed={s('2-k')} />
          <KafkaPipe x={86} cy={b + 118} w={100} ry={12} label="kafka" seed={s('2-pipe')} />
          <Worker x={214} y={b + 101} w={90} h={34} seed={s('2-w')} />
          <Arrow dashed pts={[[214, b + 118], [190, b + 118]]} seed={s('2-pull')} />
          <Label x={202} y={b + 98} size={12.5}>pull</Label>
          <Arrow pts={[[259, b + 135], [259, b + 158]]} seed={s('2-db')} />
          <Cyl cx={259} top={b + 162} rx={20} h={22} seed={s('2-dbc')} />
          <Label anchor="end" tone="green" x={224} y={b + 184}>✓ saved later</Label>
          <Line weight="thin" dashed pts={[[8, c - 12], [W - 8, c - 12]]} seed={s('div2')} />

          {/* ③ Zoom chat */}
          <Num x={14} y={c + 16} n="3" />
          <Label anchor="start" x={30} y={c + 21}>Zoom chat</Label>
          <Bubble x={120} y={c + 4} w={204} h={40} tail={[150, c + 58]} lines={['the socket’s open,', 'send on me?']} seed={s('bub')} size={13} />
          <UserStub x={16} y={c + 72} name="A" seed={s('a3')} />
          <WsLine pts={[[28, c + 78], [80, c + 78]]} seed={s('3-ws1')} />
          <EdgeServer x={80} y={c + 62} w={110} h={32} seed={s('3-e')} />
          <WsLine pts={[[190, c + 78], [300, c + 78]]} seed={s('3-ws2')} />
          <UserStub x={316} y={c + 72} name="B" seed={s('b3')} />
          <Label muted x={135} y={c + 116}>never saved</Label>

          <Label x={170} y={c + 152} size={13}>Depending on criticality of “persistence”</Label>
          <Label x={170} y={c + 170} size={13}>we pick one over other</Label>
        </Fig>
      </Sized>
    );
  }

  const W = 880, H = 516;
  return (
    <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
      {/* users */}
      <Actor x={70} y={62} seed={s('ua')} />
      <Label kind="mono" x={70} y={130}>A</Label>
      <Actor x={70} y={172} seed={s('ub')} />
      <Label kind="mono" x={70} y={240}>B</Label>

      {/* ① through the API servers to the shards, then to the edge */}
      <Num x={226} y={34} n="1" />
      <Label anchor="start" x={242} y={39}>Slack (the instructor’s hypothesis)</Label>
      <LoadBalancer x={150} y={50} w={22} h={170} seed={s('lb')} />
      <Arrow pts={[[86, 84], [150, 84]]} seed={s('a-lb')} />
      <Arrow pts={[[86, 194], [150, 194]]} seed={s('b-lb')} />
      <Fleet x={232} y={100} w={110} h={50} n={3} label="api" countLabel={false} seed={s('api')} />
      <Label x={290} y={172}>×3</Label>
      <Arrow pts={[[172, 125], [232, 125]]} seed={s('lb-api')} />
      <Arrow pts={[[342, 143], [674, 143]]} seed={s('api-db')} />
      <Label tone="green" x={520} y={133}>✓ saved first</Label>
      {[700, 770, 840].map((x, i) => <Cyl key={i} cx={x} top={112} rx={26} h={50} seed={s('db' + i)} />)}
      <Arrow pts={[[262, 150], [262, 400]]} seed={s('api-edge')} />
      <Label anchor="end" x={254} y={292}>then tell the edge</Label>

      {/* ② the edge hands it to kafka; workers pull and save */}
      <Num x={292} y={236} n="2" />
      <Label anchor="start" x={308} y={241}>a WhatsApp-like app (hypothetical)</Label>
      <KafkaPipe x={330} cy={300} w={200} ry={14} label="kafka" seed={s('pipe')} />
      {[230, 280, 330].map((y, i) => <Worker key={i} x={596} y={y} w={84} h={34} seed={s('w' + i)} />)}
      <Line dashed pts={[[596, 247], [568, 247], [568, 347], [596, 347]]} seed={s('pull-spine')} />
      <Arrow dashed pts={[[596, 297], [534, 297]]} seed={s('pull')} />
      <Label x={568} y={374}>pull</Label>
      <Arrow pts={[[680, 247], [700, 247], [700, 170]]} seed={s('w0-db')} />
      <Arrow pts={[[680, 297], [770, 297], [770, 170]]} seed={s('w1-db')} />
      <Arrow pts={[[680, 347], [840, 347], [840, 170]]} seed={s('w2-db')} />
      <Label tone="green" x={760} y={372}>✓ saved later</Label>
      <Arrow dashed pts={[[320, 428], [390, 428], [390, 316]]} seed={s('edge-k')} />

      {/* ③ the edge server and the users' WebSockets */}
      <EdgeServer x={180} y={400} w={140} h={56} seed={s('edge')} />
      <Num x={176} y={380} n="3" />
      <Label anchor="end" x={160} y={385}>Zoom chat</Label>
      <WsLine pts={[[58, 90], [24, 90], [24, 444], [180, 444]]} seed={s('a-ws')} />
      <WsLine pts={[[58, 200], [40, 200], [40, 424], [180, 424]]} seed={s('b-ws')} />
      <Label kind="mono" x={112} y={414}>WS</Label>
      <Bubble x={60} y={318} w={180} h={40} tail={[214, 398]} lines={['the socket’s open,', 'send on me?']} seed={s('bub')} />

      <Label x={470} y={500}>Depending on criticality of “persistence” we pick one over other</Label>
    </Fig>
  );
}

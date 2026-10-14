// Lecture 04 (lec02), chapter 8 part 2 (8.4–8.6): Fig 8·d, Fig 8·e, Fig 8·f, Fig 8·g and Fig 8·h.
// Board: D-06 (frames b_021000, b_021130, b_021530, b_021900), D-10 (b_022515), D-13 (b_023009, the "100 servers"
// note folded into Fig 8·d). Redis pushes: its arrows run from the Pub/Sub to the server (L-0293). The board's
// yellow links, pink edge boxes and purple Balancer are graphite here.
// Wide figures: 880 desk + 340 phone. Step-throughs: 380 with labels at 14, one layout for every width.
import React from 'react';
import { Actor, Arrow, Cross, Label, Lifeline, Line, Mark, Num, Step } from '../kit/Kit';
// Fig: the kit's, with a label floor for 360px phones and 768px (assembler; see s0-label-floor.tsx)
import { Fig } from './s0-label-floor';
import { Balancer, EdgeServer, Faded, PubSub, Sized, UserStub, WsLine, type Layout } from './s8a-websockets-parts';

/* ------------------------------------------------------------------ Fig 8·d */

const D_TITLE = 'One Pub/Sub in the middle';
const D_DESC = 'Four WebSocket servers, each with one connection to a real-time Pub/Sub (Redis) instead of one to every other server. The Pub/Sub pushes each message to the servers subscribed at that moment and stores nothing. Each server’s slots now show its users plus a single Pub/Sub link.';

export function PubSubMiddle({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f8d-p' : 'f8d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 880, H = P ? 472 : 384;
  const bw = P ? 150 : 150, bh = 52;
  // servers: ws1 top-left, ws2 top-right, ws3 bottom-right, ws4 bottom-left (board b_021900)
  const top = P ? 110 : 64, bot = P ? 306 : 288;
  const xl = P ? 8 : 150, xr = P ? 182 : 580;
  const pipe = P ? { x: 14, cy: 236, w: 312 } : { x: 120, cy: 204, w: 640 };
  const cl = xl + bw / 2, cr = xr + bw / 2;
  const userRow = top - 40;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={D_TITLE} desc={D_DESC}>
        {/* D-13, the recap's question */}
        {P ? (
          <g>
            <Label x={W / 2} y={20}>100 servers, every one to every other?</Label>
            <Label x={W / 2} y={38}>Not a great idea! Can we do better?</Label>
          </g>
        ) : (
          <g>
            <Label x={440} y={50}>100 servers, every one</Label>
            <Label x={440} y={68}>to every other? Not a great</Label>
            <Label x={440} y={86}>idea! Can we do better?</Label>
          </g>
        )}

        {/* users on stub lines */}
        {['A', 'B', 'C', 'D'].map((u, i) => {
          const x = xl + 30 + i * 30;
          return <g key={u}><UserStub x={x} y={userRow} name={u} seed={s('u' + u)} /><WsLine pts={[[x, userRow + 18], [x, top]]} seed={s('w' + u)} /></g>;
        })}
        {['E', 'F'].map((u, i) => {
          const x = xr + 50 + i * 50;
          return <g key={u}><UserStub x={x} y={userRow} name={u} seed={s('u' + u)} /><WsLine pts={[[x, userRow + 18], [x, top]]} seed={s('w' + u)} /></g>;
        })}
        {['G', 'H'].map((u, i) => {
          const x = xr + 50 + i * 50;
          return <g key={u}><WsLine pts={[[x, bot + bh], [x, bot + bh + 22]]} seed={s('w' + u)} /><UserStub x={x} y={bot + bh + 30} name={u} seed={s('u' + u)} /></g>;
        })}

        <EdgeServer x={xl} y={top} w={bw} h={bh} label="ws1" slots={{ users: 4, extra: ['pubsub'] }} seed={s('ws1')} />
        <EdgeServer x={xr} y={top} w={bw} h={bh} label="ws2" slots={{ users: 2, extra: ['pubsub'] }} seed={s('ws2')} />
        <EdgeServer x={xr} y={bot} w={bw} h={bh} label="ws3" slots={{ users: 2, extra: ['pubsub'] }} seed={s('ws3')} />
        <EdgeServer x={xl} y={bot} w={bw} h={bh} label="ws4" slots={{ users: 0, extra: ['pubsub'] }} seed={s('ws4')} />

        {/* one connection each into the pipe */}
        <Line pts={[[cl, top + bh], [cl, pipe.cy - 14]]} seed={s('l1')} />
        <Line pts={[[cr, top + bh], [cr, pipe.cy - 14]]} seed={s('l2')} />
        <Line pts={[[cr, bot], [cr, pipe.cy + 14]]} seed={s('l3')} />
        <Line pts={[[cl, bot], [cl, pipe.cy + 14]]} seed={s('l4')} />
        <Label kind="mono" anchor="start" x={cl + 8} y={P ? 192 : 150}>tcp</Label>
        <Label anchor={P ? 'start' : 'end'} x={P ? cl + 8 : xl - 10} y={P ? 210 : top + 36}>4 users + 1 link</Label>

        <PubSub x={pipe.x} cy={pipe.cy} w={pipe.w} mark={!P} seed={s('ps')} />
        <Label kind="mono" x={pipe.x + pipe.w / 2} y={pipe.cy + 36}>redis</Label>
        <Label x={pipe.x + pipe.w / 2} y={pipe.cy + 54}>real-time pub/sub</Label>

        {P ? (
          <g>
            <Label x={W / 2} y={438}>pushes to whoever is subscribed right now</Label>
            <Label x={W / 2} y={458}>keeps nothing · real-time, not Kafka</Label>
          </g>
        ) : (
          <g>
            <Label x={440} y={306}>pushes to whoever is</Label>
            <Label x={440} y={324}>subscribed right now</Label>
            <Label x={440} y={350}>keeps nothing · real-time, not Kafka</Label>
          </g>
        )}
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 8·e */

const E_TITLE = 'One edge server, its users’ Slack channels';
const E_DESC = 'An edge server collects the Slack channels of all its connected users, A in c1, c2 and c3, B in c2, c4 and c5, C in c1 and c3, D in c4, and subscribes once to the matching Redis channels: c1 to c5.';

export function SubscribeChannels() {
  const id = 'f8e';
  const s = (k: string) => `${id}-${k}`;
  const W = 360, H = 364;
  const box = { x: 100, y: 96, w: 140, h: 50 };
  const cx = box.x + box.w / 2;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={E_TITLE} desc={E_DESC}>
        <UserStub x={136} y={40} name="B" seed={s('ub')} />
        <UserStub x={180} y={40} name="A" seed={s('ua')} />
        <WsLine pts={[[136, 58], [136, box.y]]} seed={s('wb')} />
        <WsLine pts={[[180, 58], [180, box.y]]} seed={s('wa')} />
        <UserStub x={28} y={104} name="C" seed={s('uc')} />
        <UserStub x={28} y={132} name="D" seed={s('ud')} />
        <WsLine pts={[[40, 110], [box.x, 110]]} seed={s('wc')} />
        <WsLine pts={[[40, 138], [box.x, 138]]} seed={s('wd')} />
        <EdgeServer x={box.x} y={box.y} w={box.w} h={box.h} seed={s('edge')} />
        <Label anchor="end" x={354} y={30}>the server subscribes,</Label>
        <Label anchor="end" x={354} y={48}>not the user</Label>

        <Label kind="mono" anchor="start" x={12} y={184}>A (c1, c2, c3)</Label>
        <Label kind="mono" anchor="start" x={12} y={204}>B (c2, c4, c5)</Label>
        <Label kind="mono" anchor="start" x={12} y={224}>C (c1, c3)</Label>
        <Label kind="mono" anchor="start" x={12} y={244}>D (c4)</Label>

        <Arrow pts={[[cx + 20, box.y + box.h], [cx + 20, 254]]} seed={s('sub')} />
        <Label kind="mono" anchor="start" x={cx + 30} y={212}>SUB(c1,c2,</Label>
        <Label kind="mono" anchor="start" x={cx + 30} y={230}>c3,c4,c5)</Label>

        <PubSub x={40} cy={272} w={262} ry={16} mark={false} seed={s('ps')} />
        <Label kind="mono" anchor="start" x={310} y={277}>c1…c5</Label>
        <Label x={W / 2} y={312}>real-time pub/sub [redis]</Label>
        <Label x={W / 2} y={334}>one pub/sub channel for each Slack channel</Label>
        <Label muted x={W / 2} y={354}>* can be optimized</Label>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 8·f */

const F_TITLE = 'One message through Redis, then a new channel';
const F_DESC = 'Lanes for user A, WS1, the Redis Pub/Sub, WS2, WS3 and the API server, time running down. A message for C1 is delivered locally by WS1, published once to Redis channel c1 and pushed only to WS2, which delivers to E and F; WS3, subscribed to c2 only, gets nothing. Then A creates channel c3 with D through the API, a new-channel notice goes through Redis to the edge servers, and WS1 subscribes to c3.';

const F_DESC_PHONE = 'Lanes for user A, WS1, the Redis Pub/Sub, WS2 and the API server, time running down; WS3 is a note. A message for C1 is delivered locally by WS1, published once to Redis channel c1 and pushed only to WS2, which delivers to E and F; WS3, subscribed to c2 only, gets nothing. Then A creates channel c3 with D through the API, a new-channel notice goes through Redis to the edge servers, WS3 included, and WS1 subscribes to c3.';

/** critic C-13: the step labels of Fig 8·f cross lifelines; a paper-coloured halo painted under each label keeps the
 *  line from striking through it (stroke and paint-order are inherited by the <text>). */
const HLabel = (p: React.ComponentProps<typeof Label>) => (
  <g style={{ stroke: 'var(--fig-bg)', strokeWidth: 4, strokeLinejoin: 'round', paintOrder: 'stroke' }}><Label {...p} /></g>
);

/** Phone redraw (critic C-02): five lanes at 340 (ws3 becomes a note at steps 3 and 6), labels stacked under the
 *  lanes, so nothing sits on a lifeline header and the last note fits the sheet. */
function RedisThenNewChannelPhone() {
  const id = 'f8f-p';
  const s = (k: string) => `${id}-${k}`;
  // critic C-02 (final): rows packed tighter (552 → 480 high) so at the last step the whole phone figure, drawing,
  // step bar and caption, fits one 390×844 screen and the sticky step bar never has to sit over the drawing
  const W = 340, H = 480;
  const L = { a: 30, ws1: 98, r: 172, ws2: 246, api: 314 };
  const heads: [number, string, string, string][] = [
    [L.a, 'A', '', ''], [L.ws1, 'ws1', 'A–D', 'sub c1'], [L.r, 'redis', '', ''], [L.ws2, 'ws2', 'E F', 'sub c1'], [L.api, 'api', '', ''],
  ];
  return (
    <Fig id={id} w={W} h={H} title={F_TITLE} desc={F_DESC_PHONE}>
      {heads.map(([x, n, m, sub]) => (
        <g key={n}>
          <Label kind="mono" x={x} y={18}>{n}</Label>
          {m && <Label kind="mono" muted x={x} y={34}>{m}</Label>}
          {sub && <Label kind="mono" muted x={x} y={50}>{sub}</Label>}
          <Lifeline x={x} y0={58} y1={472} seed={s('ll' + n)} />
        </g>
      ))}

      <Step n={1}>
        <HLabel kind="mono" tone="blue" anchor="start" x={L.a + 4} y={74}>C1: standup in 5</HLabel>
        <Arrow tone="blue" pts={[[L.a, 84], [L.ws1 - 2, 84]]} seed={s('1')} />
        <Num size={14} x={12} y={84} n={1} tone="blue" />
      </Step>
      <Step n={2}>
        <Arrow tone="blue" pts={[[L.ws1, 100], [L.ws1 + 20, 100], [L.ws1 + 20, 116], [L.ws1 + 4, 116]]} seed={s('2')} />
        <HLabel tone="blue" anchor="start" x={L.ws1 + 26} y={113}>B C D</HLabel>
        <Num size={14} x={12} y={109} n={2} tone="blue" />
      </Step>
      <Step n={3}>
        <HLabel kind="mono" tone="blue" x={(L.ws1 + L.r) / 2} y={138}>PUBLISH c1</HLabel>
        <Arrow tone="blue" pts={[[L.ws1, 148], [L.r - 2, 148]]} seed={s('3a')} />
        <Arrow tone="blue" pts={[[L.r, 164], [L.ws2 - 2, 164]]} seed={s('3b')} />
        <HLabel x={(L.r + L.ws2) / 2} y={182}>pushed, not pulled</HLabel>
        <HLabel muted anchor="start" x={L.a + 4} y={200}>ws3 (sub c2 only): nothing</HLabel>
        <Num size={14} x={12} y={156} n={3} tone="blue" />
      </Step>
      <Step n={4}>
        <Arrow tone="blue" pts={[[L.ws2, 214], [L.ws2 + 20, 214], [L.ws2 + 20, 230], [L.ws2 + 4, 230]]} seed={s('4')} />
        <HLabel tone="green" anchor="end" x={L.ws2 - 8} y={227}>E F ✓</HLabel>
        <Num size={14} x={12} y={222} n={4} tone="green" />
      </Step>
      <Step n={5}>
        <HLabel kind="mono" tone="blue" x={(L.a + L.api) / 2} y={252}>create channel c3 (A, D)</HLabel>
        <Arrow tone="blue" pts={[[L.a, 262], [L.api - 2, 262]]} seed={s('5')} />
        <HLabel tone="green" anchor="end" x={L.api - 6} y={280}>db updated ✓</HLabel>
        <Num size={14} x={12} y={262} n={5} tone="blue" />
      </Step>
      <Step n={6}>
        <HLabel kind="mono" anchor="end" x={L.api} y={302}>new channel c3: A, D</HLabel>
        <Arrow dashed pts={[[L.api, 312], [L.r + 2, 312]]} seed={s('6a')} />
        <Arrow pts={[[L.r, 328], [L.ws1 + 2, 328]]} seed={s('6b')} />
        <Arrow pts={[[L.r, 342], [L.ws2 - 2, 342]]} seed={s('6c')} />
        <HLabel muted anchor="start" x={L.ws2 + 6} y={346}>+ ws3</HLabel>
        <Num size={14} x={12} y={328} n={6} />
      </Step>
      <Step n={7}>
        <HLabel kind="mono" anchor="start" x={L.a + 4} y={366}>I’m in c3</HLabel>
        <Arrow pts={[[L.a, 376], [L.ws1 - 2, 376]]} seed={s('7a')} />
        <HLabel kind="mono" x={(L.ws1 + L.r) / 2} y={396}>SUBSCRIBE c3</HLabel>
        <Arrow pts={[[L.ws1, 406], [L.r - 2, 406]]} seed={s('7b')} />
        <HLabel kind="mono" anchor="start" x={L.ws1 + 6} y={428}>ws1: c1, c3</HLabel>
        <HLabel muted x={W / 2} y={450}>also: a periodic meta call</HLabel>
        <HLabel muted x={W / 2} y={468}>listing my channels</HLabel>
        <Num size={14} x={12} y={391} n={7} />
      </Step>
    </Fig>
  );
}

export function RedisThenNewChannel({ layout = 'wide' }: { layout?: Layout }) {
  if (layout === 'phone') return <RedisThenNewChannelPhone />;
  const id = 'f8f';
  const s = (k: string) => `${id}-${k}`;
  const W = 380, H = 540;
  const L = { a: 44, ws1: 104, r: 174, ws2: 240, ws3: 298, api: 352 };
  const heads: [number, string, string, string][] = [
    [L.a, 'A', '', ''], [L.ws1, 'ws1', 'A–D', 'c1'], [L.r, 'redis', '', ''], [L.ws2, 'ws2', 'E F', 'c1'], [L.ws3, 'ws3', 'G H', 'c2'], [L.api, 'api', '', ''],
  ];
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={F_TITLE} desc={F_DESC}>
        {heads.map(([x, n, m, sub]) => (
          <g key={n}>
            <Label kind="mono" x={x} y={20}>{n}</Label>
            {m && <Label kind="mono" muted x={x} y={38}>{m}</Label>}
            {/* ws2's and ws3's lanes are 58 apart: lean their "sub" labels away from each other */}
            {sub && <Label kind="mono" muted x={n === 'ws2' ? x + 24 : n === 'ws3' ? x - 20 : x} y={56}
              anchor={n === 'ws2' ? 'end' : n === 'ws3' ? 'start' : 'middle'}>{'sub ' + sub}</Label>}
            <Lifeline x={x} y0={66} y1={530} seed={s('ll' + n)} />
          </g>
        ))}

        <Step n={1}>
          <HLabel kind="mono" tone="blue" x={102} y={88}>C1: standup in 5</HLabel>
          <Arrow tone="blue" pts={[[L.a, 98], [L.ws1 - 2, 98]]} seed={s('1')} />
          <Num size={14} x={14} y={98} n={1} tone="blue" />
        </Step>
        <Step n={2}>
          <Arrow tone="blue" pts={[[L.ws1, 124], [L.ws1 + 22, 124], [L.ws1 + 22, 142], [L.ws1 + 4, 142]]} seed={s('2')} />
          <HLabel tone="blue" anchor="start" x={L.ws1 + 28} y={138}>B C D</HLabel>
          <Num size={14} x={14} y={134} n={2} tone="blue" />
        </Step>
        <Step n={3}>
          <HLabel kind="mono" tone="blue" x={140} y={166}>PUBLISH c1</HLabel>
          <Arrow tone="blue" pts={[[L.ws1, 176], [L.r - 2, 176]]} seed={s('3a')} />
          <Arrow tone="blue" pts={[[L.r, 198], [L.ws2 - 2, 198]]} seed={s('3b')} />
          <HLabel x={207} y={218}>pushed, not pulled</HLabel>
          <HLabel muted x={L.ws3 + 8} y={184}>c2 only:</HLabel>
          <HLabel muted x={L.ws3 + 8} y={200}>nothing</HLabel>
          <Num size={14} x={14} y={186} n={3} tone="blue" />
        </Step>
        <Step n={4}>
          <Arrow tone="blue" pts={[[L.ws2, 238], [L.ws2 + 22, 238], [L.ws2 + 22, 256], [L.ws2 + 4, 256]]} seed={s('4')} />
          <HLabel tone="green" anchor="end" x={L.ws2 - 8} y={252}>E F ✓</HLabel>
          <Num size={14} x={14} y={248} n={4} tone="green" />
        </Step>
        <Step n={5}>
          <HLabel kind="mono" tone="blue" x={200} y={288}>create channel c3 (A, D)</HLabel>
          <Arrow tone="blue" pts={[[L.a, 298], [L.api - 2, 298]]} seed={s('5')} />
          <HLabel tone="green" anchor="end" x={L.api - 6} y={320}>db updated ✓</HLabel>
          <Num size={14} x={14} y={298} n={5} tone="blue" />
        </Step>
        <Step n={6}>
          <HLabel kind="mono" x={262} y={344}>new channel c3: A, D</HLabel>
          <Arrow dashed pts={[[L.api, 354], [L.r + 2, 354]]} seed={s('6a')} />
          <Arrow pts={[[L.r, 372], [L.ws1 + 2, 372]]} seed={s('6b')} />
          <Arrow pts={[[L.r, 386], [L.ws2 - 2, 386]]} seed={s('6c')} />
          <Arrow pts={[[L.r, 400], [L.ws3 - 2, 400]]} seed={s('6d')} />
          <Num size={14} x={14} y={370} n={6} />
        </Step>
        <Step n={7}>
          <HLabel kind="mono" x={74} y={422}>I’m in c3</HLabel>
          <Arrow pts={[[L.a, 432], [L.ws1 - 2, 432]]} seed={s('7a')} />
          <HLabel kind="mono" x={140} y={454}>SUBSCRIBE c3</HLabel>
          <Arrow pts={[[L.ws1, 464], [L.r - 2, 464]]} seed={s('7b')} />
          <HLabel kind="mono" anchor="start" x={L.ws1 + 6} y={488}>ws1: c1, c3</HLabel>
          <HLabel muted x={W / 2 + 6} y={516}>also: a periodic meta call listing my channels</HLabel>
          <Num size={14} x={14} y={448} n={7} />
        </Step>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 8·g */

const G_TITLE = 'Ask the Balancer, then connect';
const G_DESC = 'Before connecting, the Slack client asks the Balancer which edge server to use and gets an address back, ws1, then opens its WebSocket to that server. The Balancer keeps an organisation’s users on one server, so their messages rarely touch Redis. The other servers are shown faded.';

export function AskBalancer({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f8g-p' : 'f8g';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const W = 340, H = 384;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={G_TITLE} desc={G_DESC}>
          <Actor x={40} y={46} seed={s('a')} />
          <Label kind="mono" x={22} y={60}>A</Label>
          <Label x={112} y={26}>where do I connect?</Label>
          <Balancer x={176} y={40} w={152} h={48} seed={s('bal')} />
          <Arrow pts={[[56, 54], [176, 54]]} seed={s('ask')} />
          <Num x={70} y={40} n={1} />
          <Arrow pts={[[176, 76], [56, 76]]} seed={s('reply')} />
          <Label kind="mono" x={116} y={96}>ws1</Label>
          <Num x={154} y={92} n={2} />
          <Label x={252} y={108}>balance connections</Label>
          <WsLine tone="blue" pts={[[40, 96], [40, 150]]} seed={s('ws')} />
          <Num x={22} y={124} n={3} tone="blue" />
          <EdgeServer x={14} y={150} w={140} h={52} label="ws1" slots={{ users: 1, extra: ['pubsub'] }} seed={s('ws1')} />
          <Label anchor="start" x={174} y={150}>like DNS, not DNS</Label>
          <Label anchor="start" x={174} y={170}>not a load balancer</Label>
          <Line pts={[[84, 202], [84, 262]]} seed={s('l1')} />
          <Faded>
            <EdgeServer x={184} y={196} w={140} h={42} label="ws2" seed={s('ws2')} />
            <Line pts={[[254, 238], [254, 262]]} seed={s('l2')} />
          </Faded>
          <PubSub x={14} cy={276} w={312} seed={s('ps')} />
          <Label kind="mono" x={170} y={312}>redis</Label>
          <Label x={170} y={346}>same org → same server:</Label>
          <Label x={170} y={366}>Redis only for the worst case</Label>
        </Fig>
      </Sized>
    );
  }
  const W = 880, H = 360;
  return (
    <Fig id={id} w={W} h={H} title={G_TITLE} desc={G_DESC}>
      <Actor x={96} y={40} seed={s('a')} />
      <Label kind="mono" x={74} y={56}>A</Label>
      <Label anchor="start" x={146} y={48}>where do I connect?</Label>
      <Balancer x={300} y={44} w={170} h={52} seed={s('bal')} />
      <Arrow pts={[[112, 58], [300, 58]]} seed={s('ask')} />
      <Num x={130} y={43} n={1} />
      <Arrow pts={[[300, 82], [112, 82]]} seed={s('reply')} />
      <Label kind="mono" x={200} y={102}>ws1</Label>
      <Num x={236} y={98} n={2} />
      <Label x={385} y={118}>balance connections</Label>
      <Label anchor="start" x={500} y={56}>like DNS, not DNS</Label>
      <Label anchor="start" x={500} y={78}>not a load balancer</Label>
      <Label anchor="start" x={500} y={100}>same org → same server:</Label>
      <Label anchor="start" x={500} y={120}>Redis only for the worst case</Label>

      <WsLine tone="blue" pts={[[96, 100], [96, 170]]} seed={s('ws')} />
      <Num x={78} y={136} n={3} tone="blue" />
      <EdgeServer x={40} y={170} w={150} h={56} label="ws1" slots={{ users: 1, extra: ['pubsub'] }} seed={s('ws1')} />
      <Line pts={[[115, 226], [115, 278]]} seed={s('l1')} />
      <Faded>
        {[300, 490, 680].map((x, i) => (
          <g key={x}>
            <EdgeServer x={x} y={170} w={150} h={56} label={`ws${i + 2}`} seed={s('f' + i)} />
            <Line pts={[[x + 75, 226], [x + 75, 278]]} seed={s('fl' + i)} />
          </g>
        ))}
      </Faded>
      <PubSub x={60} cy={292} w={780} seed={s('ps')} />
      <Label kind="mono" x={450} y={330}>redis</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·h */

const H_TITLE = 'A server dies';
const H_DESC = 'Lanes for one organisation’s users A to D, the Balancer, three edge servers and the Redis Pub/Sub, time running down. WS1 dies; its users ask the Balancer again and are spread over WS2 and WS3, so their messages travel through Redis for a while. Later the Balancer regroups them on WS2 and Redis is out of the path again.';

export function ServerDies() {
  const id = 'f8h';
  const s = (k: string) => `${id}-${k}`;
  const W = 380, H = 520;
  const L = { u: 44, bal: 116, ws1: 186, ws2: 244, ws3: 298, r: 352 };
  const heads: [number, string][] = [[L.u, 'A–D'], [L.bal, 'balancer'], [L.ws1, 'ws1'], [L.ws2, 'ws2'], [L.ws3, 'ws3'], [L.r, 'redis']];
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={H_TITLE} desc={H_DESC}>
        {heads.map(([x, n]) => (
          <g key={n}>
            <Label kind="mono" x={x} y={20}>{n}</Label>
            <Lifeline x={x} y0={32} y1={510} seed={s('ll' + n)} />
          </g>
        ))}
        <Label muted x={120} y={52}>one org, one server</Label>
        <WsLine tone="blue" pts={[[L.u, 66], [L.ws1, 66]]} seed={s('ws-start')} />

        <Step n={1}>
          <Cross x={L.ws1} y={100} size={20} seed={s('x')} />
          <WsLine tone="red" dashed pts={[[L.u, 118], [L.ws1 - 12, 118]]} seed={s('cut')} />
          <Label tone="red" anchor="start" x={L.ws1 + 16} y={105}>ws1 dies</Label>
          <Num size={14} x={14} y={104} n={1} tone="red" />
        </Step>
        <Step n={2}>
          <Arrow pts={[[L.u, 150], [L.bal - 2, 150]]} seed={s('ask')} />
          <Label muted anchor="start" x={L.bal + 8} y={150}>where do I connect?</Label>
          <Label kind="mono" tone="red" x={L.bal} y={178}>ws1 ✕</Label>
          <Num size={14} x={14} y={150} n={2} />
        </Step>
        <Step n={3}>
          <Arrow pts={[[L.bal, 208], [L.u + 2, 208]]} seed={s('r1')} />
          <Label kind="mono" anchor="start" x={L.bal + 8} y={212}>A, B → ws2</Label>
          <Arrow pts={[[L.bal, 228], [L.u + 2, 228]]} seed={s('r2')} />
          <Label kind="mono" anchor="start" x={L.bal + 8} y={232}>C, D → ws3</Label>
          <WsLine tone="blue" pts={[[L.u, 252], [L.ws2, 252]]} seed={s('n2')} />
          <WsLine tone="blue" pts={[[L.u, 266], [L.ws3, 266]]} seed={s('n3')} />
          <Num size={14} x={14} y={230} n={3} />
        </Step>
        <Step n={4}>
          <Label kind="mono" tone="blue" x={142} y={292}>A posts in C1</Label>
          <Arrow tone="blue" pts={[[L.u, 302], [L.ws2 - 2, 302]]} seed={s('4a')} />
          <Arrow tone="blue" pts={[[L.ws2, 316], [L.ws2 - 20, 316], [L.ws2 - 20, 332], [L.ws2 - 4, 332]]} seed={s('4b')} />
          <Label tone="blue" anchor="end" x={L.ws2 - 26} y={330}>B</Label>
          <Label kind="mono" tone="blue" x={L.r - 50} y={346}>PUBLISH c1</Label>
          <Arrow tone="blue" pts={[[L.ws2, 356], [L.r - 2, 356]]} seed={s('4c')} />
          <Arrow tone="blue" pts={[[L.r, 374], [L.ws3 + 2, 374]]} seed={s('4d')} />
          <Arrow tone="blue" pts={[[L.ws3, 388], [L.ws3 - 20, 388], [L.ws3 - 20, 404], [L.ws3 - 4, 404]]} seed={s('4e')} />
          <Label tone="blue" anchor="end" x={L.ws3 - 26} y={402}>C D</Label>
          <Label anchor="end" x={376} y={426}>Redis carries it for now: fine</Label>
          <Num size={14} x={14} y={302} n={4} tone="blue" />
        </Step>
        <Step n={5}>
          <Arrow pts={[[L.bal, 454], [L.u + 2, 454]]} seed={s('5a')} />
          <Label kind="mono" anchor="start" x={L.bal + 8} y={458}>C, D → ws2</Label>
          <WsLine tone="blue" pts={[[L.u, 474], [L.ws2, 474]]} seed={s('5b')} />
          <Label anchor="end" x={376} y={500}>Redis IO back to the worst case only</Label>
          <Num size={14} x={14} y={466} n={5} />
        </Step>
      </Fig>
    </Sized>
  );
}

// Lecture 04 (lec02), chapter 9 "The whole system": Fig 9·a (D-08 redraw, frames b_022057 / b_022445),
// Fig 9·b (D-11 redraw, b_022945 / b_022730, with D-09 and D-12's three steps folded in; desk 880 + phone 340),
// Fig 9·c (new, D-12's membership sketch folded into panel b), Fig 9·d (new) and the §9 RuleBox sketch.
// Marker colours: blue = one message travelling, green = ack, red = never here; everything else graphite.
import React from 'react';
import { Actor, Arrow, Box, Bubble, Cloud, Cyl, Fleet, Label, Line, LoadBalancer, Mark, Num, Worker } from '../kit/Kit';
import { KafkaPipe } from './s1-nosql-kit';
// Fig: the kit's, with a label floor for 360px phones and 768px (assembler; see s0-label-floor.tsx)
import { Fig } from './s0-label-floor';
import { Balancer, EdgeServer, Key, PubSub, Ring, Sized, Strike, UserStub, WsLine, type Layout } from './s9-whole-system-parts';

/* ------------------------------------------------------------------ Fig 9·a: one WebSocket, a fleet of edge servers */

const A_DESC = 'Each user keeps one WebSocket open to the backend for everything real-time.';
const B_DESC = 'Those connections land on a fleet of edge servers, and every real-time service, chat or notifications, goes through them.';

/** Panel 1: one user, one persistent WebSocket to "our infra". */
export function OneSocket() {
  const id = 'f9a-1';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={280} title="One user, one WebSocket" desc={A_DESC}>
      <Actor x={40} y={66} seed={s('u')} />
      <WsLine pts={[[58, 90], [196, 90]]} seed={s('ws')} />
      <Label kind="mono" x={120} y={78}>WS</Label>
      <Label x={120} y={116}>persistent TCP</Label>
      <Cloud cx={262} cy={90} w={132} h={84} label="our infra" seed={s('c')} />
      <Label x={170} y={180}>1 websocket for anything</Label>
      <Label x={170} y={198}>and everything realtime</Label>
      <Label kind="title" x={170} y={262}>one user, one socket</Label>
    </Fig>
  );
}

/** Panel 2: three users, each with one WS line, to a fleet of edge servers. */
export function EdgeFleet() {
  const id = 'f9a-2';
  const s = (k: string) => `${id}-${k}`;
  const ys = [44, 104, 164];
  return (
    <Fig id={id} w={340} h={280} title="A fleet of edge servers" desc={B_DESC}>
      {ys.map((y, i) => <Actor key={i} x={30} y={y} s={0.85} seed={s('u' + i)} />)}
      {ys.map((y, i) => <WsLine key={i} pts={[[46, y + 16], [168, y + 16]]} seed={s('ws' + i)} />)}
      <Label kind="mono" x={108} y={ys[0] + 6}>WS</Label>
      <Fleet x={168} y={50} w={128} h={150} n={4} label="edge servers" countLabel={false} seed={s('f')} />
      <Label x={186} y={226}>chat, notifications, …</Label>
      <Label x={186} y={244}>all go through here</Label>
      <Label kind="title" x={170} y={272}>a fleet of edge servers</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 9·b: the overall architecture */

const ARCH_TITLE = 'The overall architecture';
const ARCH_DESC = 'Users hold one WebSocket each to the edge servers, which share messages through a clustered Redis Pub/Sub and hand them to Kafka; workers pull from Kafka and write them to a partitioned messages database. A separate load balancer and API servers handle non-real-time requests such as scrolling a channel. A Balancer tells each client which edge server to use. One message from A: 1, the edge server persists it in Kafka; 2, finds B in its local pool; 3, sends it to B.';

export function Architecture({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f9b-p' : 'f9b';
  const s = (k: string) => `${id}-${k}`;

  if (P) {
    const W = 340, H = 760;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={ARCH_TITLE} desc={ARCH_DESC}>
          {/* the Balancer, asked first */}
          <Balancer x={16} y={10} w={132} h={34} seed={s('bal')} />
          <Arrow pts={[[32, 76], [32, 46]]} seed={s('ask')} />
          <Arrow pts={[[52, 46], [52, 74]]} seed={s('ans')} />
          <Label x={214} y={50}>(membership)</Label>

          {/* real-time column: users → edge servers → pub/sub → more edge servers */}
          <Actor x={42} y={84} s={0.85} seed={s('ua')} />
          <Label kind="mono" anchor="end" x={24} y={108}>A</Label>
          <WsLine tone="blue" pts={[[58, 106], [110, 106]]} seed={s('wsa')} />
          <Label kind="mono" x={84} y={96}>WS</Label>
          <UserStub x={40} y={146} name="B" seed={s('ub')} />
          <WsLine tone="blue" pts={[[52, 152], [110, 152]]} seed={s('wsb')} />
          <Num x={82} y={152} n={3} tone="blue" />
          <Label anchor="start" x={14} y={182} size={12.5}>send to B</Label>
          <Fleet x={110} y={90} w={130} h={80} n={3} countLabel={false} seed={s('edge')} />
          <Num x={126} y={106} n={2} tone="blue" />
          <Label x={186} y={110} size={12.5}>find B in the</Label>
          <Label x={186} y={126} size={12.5}>local pool</Label>
          <Label kind="mono" x={175} y={156}>edge servers</Label>

          <Line pts={[[200, 170], [200, 206]]} seed={s('tcp')} />
          <Label kind="mono" anchor="end" x={194} y={194}>tcp</Label>
          <PubSub x={150} cy={220} w={170} seed={s('ps')} />
          <Label kind="mono" anchor="start" x={150} y={256}>redis pub/sub</Label>
          <Label anchor="start" x={150} y={273}>[clustered]</Label>
          <Line pts={[[290, 234], [290, 296]]} seed={s('tcp2')} />
          <EdgeServer x={200} y={296} w={130} h={34} label="edge servers" seed={s('edge2')} />
          <WsLine pts={[[235, 330], [235, 352]]} seed={s('wsd')} />
          <WsLine pts={[[300, 330], [300, 352]]} seed={s('wse')} />
          <UserStub x={235} y={362} name="D" seed={s('ud')} />
          <UserStub x={300} y={362} name="E" seed={s('ue')} />

          {/* persistence column: edge → kafka ← workers → db */}
          <Arrow tone="blue" dashed pts={[[125, 170], [125, 408]]} seed={s('ek')} />
          <Num x={125} y={290} n={1} tone="blue" />
          <Label anchor="end" x={112} y={318}>persist</Label>
          <Label anchor="end" x={112} y={335}>in kafka</Label>
          <Label kind="mono" anchor="start" x={50} y={402}>kafka</Label>
          <KafkaPipe x={50} cy={424} w={250} ry={14} seed={s('k')} />
          {[56, 150, 244].map((x, i) => <Worker key={i} x={x} y={470} w={84} h={34} seed={s('w' + i)} />)}
          {[98, 192, 286].map((x, i) => <Arrow key={i} dashed pts={[[x, 470], [x, 440]]} seed={s('pull' + i)} />)}
          <Label x={145} y={460}>pull</Label>
          {[98, 192, 286].map((x, i) => <Arrow key={i} pts={[[x, 504], [x, 534]]} seed={s('wd' + i)} />)}
          {[98, 192, 286].map((x, i) => <Cyl key={i} cx={x} top={542} rx={24} h={32} seed={s('db' + i)} />)}
          <Label kind="mono" x={192} y={606}>messages db (partitioned)</Label>

          {/* non-real-time column */}
          <Line weight="thin" dashed pts={[[8, 626], [W - 8, 626]]} seed={s('div')} />
          <Label anchor="end" x={W - 10} y={650}>non-realtime</Label>
          <UserStub x={20} y={680} name="C" seed={s('uc')} />
          <Arrow pts={[[32, 686], [66, 686]]} seed={s('c-lb')} />
          <LoadBalancer x={66} y={670} w={14} h={32} seed={s('lb')} />
          <Arrow pts={[[80, 686], [108, 686]]} seed={s('lb-api')} />
          <Box x={108} y={666} w={112} h={40} label="api servers" seed={s('api')} />
          <Arrow pts={[[220, 686], [266, 686]]} seed={s('api-db')} />
          <Cyl cx={292} top={672} rx={24} h={26} seed={s('dbapi')} />
          <Label kind="mono" anchor="end" x={334} y={734}>messages db</Label>
        </Fig>
      </Sized>
    );
  }

  const W = 880, H = 530;
  return (
    <Fig id={id} w={W} h={H} title={ARCH_TITLE} desc={ARCH_DESC}>
      <Label anchor="start" x={20} y={24}>overall architecture</Label>

      {/* the Balancer, with the client asking where to connect */}
      <Balancer x={26} y={38} w={132} h={34} seed={s('bal')} />
      <Arrow pts={[[50, 104], [50, 74]]} seed={s('ask')} />
      <Arrow pts={[[70, 74], [70, 102]]} seed={s('ans')} />

      {/* users A, B, C with their WebSockets */}
      <Actor x={60} y={110} s={0.85} seed={s('ua')} />
      <Label kind="mono" anchor="end" x={40} y={134}>A</Label>
      <WsLine tone="blue" pts={[[76, 134], [170, 134]]} seed={s('wsa')} />
      <Label kind="mono" x={124} y={124}>WS</Label>
      <UserStub x={58} y={186} name="B" seed={s('ub')} />
      <WsLine tone="blue" pts={[[72, 192], [170, 192]]} seed={s('wsb')} />
      <Num x={104} y={192} n={3} tone="blue" />
      <Label anchor="start" x={84} y={212} size={12.5}>send to B</Label>
      <UserStub x={58} y={226} name="C" seed={s('uc')} />
      <WsLine pts={[[72, 224], [170, 224]]} seed={s('wsc')} />

      {/* edge servers (membership) */}
      <Label x={262} y={92}>(membership)</Label>
      <Fleet x={170} y={130} w={130} h={100} n={3} countLabel={false} seed={s('edge')} />
      <Num x={186} y={146} n={2} tone="blue" />
      <Label x={245} y={150} size={12.5}>find B in the</Label>
      <Label x={245} y={166} size={12.5}>local pool</Label>
      <Label kind="mono" x={235} y={212}>edge servers</Label>

      {/* real-time pub/sub between edge servers */}
      <Line pts={[[300, 176], [380, 176]]} seed={s('tcp1')} />
      <PubSub x={380} cy={176} w={170} seed={s('ps')} />
      <Label kind="mono" x={465} y={210}>redis pub/sub</Label>
      <Label x={465} y={228}>[clustered]</Label>
      <Line pts={[[520, 162], [520, 82], [600, 82]]} seed={s('tcp2')} />
      <Label kind="mono" anchor="start" x={528} y={124}>tcp</Label>
      <EdgeServer x={600} y={60} w={130} h={44} label="edge servers" seed={s('edge2')} />
      <WsLine pts={[[730, 70], [786, 70]]} seed={s('wsd')} />
      <WsLine pts={[[730, 94], [786, 94]]} seed={s('wse')} />
      <UserStub x={800} y={58} name="D" seed={s('ud')} />
      <UserStub x={800} y={82} name="E" seed={s('ue')} />

      {/* persistence: edge → kafka ← workers → partitioned db */}
      <Arrow tone="blue" dashed pts={[[280, 230], [280, 284]]} seed={s('ek')} />
      <Num x={280} y={256} n={1} tone="blue" />
      <Label anchor="start" x={294} y={262}>persist in kafka</Label>
      <KafkaPipe x={150} cy={300} w={280} ry={14} seed={s('k')} />
      <Label kind="mono" anchor="start" x={440} y={305}>kafka</Label>
      {[160, 265, 370].map((x, i) => <Worker key={i} x={x} y={360} w={84} h={34} seed={s('w' + i)} />)}
      {[202, 307, 412].map((x, i) => <Arrow key={i} dashed pts={[[x, 360], [x, 316]]} seed={s('pull' + i)} />)}
      <Label x={254} y={344}>pull</Label>
      <Label kind="mono" anchor="start" x={470} y={382}>messaging service workers</Label>
      {[202, 307, 412].map((x, i) => <Arrow key={i} pts={[[x, 394], [x, 426]]} seed={s('wd' + i)} />)}
      {[202, 307, 412].map((x, i) => <Cyl key={i} cx={x} top={432} rx={26} h={40} seed={s('db' + i)} />)}
      <Label kind="mono" anchor="start" x={470} y={460}>messages db (partitioned)</Label>

      {/* non-real-time: C → lb → api servers → the same db */}
      <Arrow pts={[[58, 244], [58, 296]]} seed={s('c-lb')} />
      <LoadBalancer x={22} y={298} w={72} h={20} seed={s('lb')} label="" />
      <Label kind="mono" anchor="start" x={100} y={313}>lb</Label>
      <Arrow pts={[[58, 318], [58, 374]]} seed={s('lb-api')} />
      <Box x={8} y={376} w={112} h={40} label="api servers" seed={s('api')} />
      <Label anchor="start" x={124} y={402} size={12.5}>×3</Label>
      <Arrow pts={[[64, 416], [64, 456], [174, 456]]} seed={s('api-db')} />
      <Label anchor="start" x={8} y={484}>non-realtime API</Label>
      <Label anchor="start" x={8} y={502}>· channel scroll</Label>
      <Label anchor="start" x={8} y={520}>· muted channels</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §9: change only the guarantees */

const R9_TITLE = 'Swap the persistence path, keep the rest';
const R9_DESC = 'The overall diagram in miniature: a user, an edge server, the real-time Pub/Sub and the database. The persistence path between the edge server and the database is a dial with three positions, one synchronous, two asynchronous, three none, set here to two. Swap the path and keep the rest.';

export function GuaranteesDial({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'r9-p' : 'r9';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480, H = 186;
  const k = P ? 320 / 480 : 1;
  const X = (x: number) => x * k;
  const dx = X(260), dy = 128;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={R9_TITLE} desc={R9_DESC} floor={P ? 13.3 : undefined}>
        <Label anchor="end" x={W - 8} y={20}>swap the path, keep the rest</Label>
        <UserStub x={X(24)} y={54} name="A" seed={s('u')} />
        <WsLine pts={[[X(24) + 12, 60], [X(64), 60]]} seed={s('ws')} />
        <EdgeServer x={X(64)} y={44} w={X(96)} h={32} label="edge" seed={s('e')} />
        <Line pts={[[X(160), 60], [X(196), 60]]} seed={s('tcp')} />
        <PubSub x={X(196)} cy={60} w={X(120)} ry={12} seed={s('ps')} />
        <Line pts={[[X(112), 76], [X(112), dy], [dx - 20, dy]]} seed={s('p1')} />
        <Ring cx={dx} cy={dy} r={18} seed={s('dial')} />
        <Label kind="num" x={dx - 26} y={dy - 18}>1</Label>
        <Label kind="num" x={dx} y={dy - 24}>2</Label>
        <Label kind="num" x={dx + 26} y={dy - 18}>3</Label>
        <Mark weight="heavy" a={[dx, dy]} b={[dx, dy - 13]} seed={s('needle')} />
        <Line dashed pts={[[dx + 20, dy], [X(420), dy], [X(420), 90]]} seed={s('p2')} />
        <Cyl cx={X(420)} top={46} rx={22} h={34} seed={s('db')} />
        <Label kind="mono" anchor="end" x={X(420) - 28} y={70}>db</Label>
        <Label kind="mono" x={dx} y={174}>① sync · ② async · ③ none</Label>
      </Fig>
    </Sized>
  );
}

/* ------------------------------------------------------------------ Fig 9·c: two ways in */

const EXP_DESC = 'An exposed edge server faces the internet directly. It is hardened, ports hidden and SSH blocked, and holds only a Kafka connection string (the note below suggests making it write-only); database credentials never sit on it.';
const LB_DESC = 'Behind a load balancer the edge server costs a few milliseconds more per hop, the WebSocket stays sticky, and the private edge server can safely ask a membership API, backed by the database, before serving private channels.';

/** Panel a: the edge server exposed directly to clients. */
export function Exposed() {
  const id = 'f9c-a';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={290} title="Exposed: the edge server faces the internet" desc={EXP_DESC}>
      <Bubble x={168} y={26} w={140} h={32} tail={[232, 92]} lines={['public = unsafe?']} seed={s('bub')} />
      <Actor x={30} y={116} s={0.85} seed={s('u')} />
      <WsLine pts={[[46, 140], [128, 140]]} seed={s('ws')} />
      <Label kind="mono" x={88} y={130}>WS</Label>
      <EdgeServer x={128} y={100} w={196} h={104} label="" seed={s('e')} />
      <Label kind="mono" x={226} y={124}>edge server</Label>
      <Key x={144} y={152} seed={s('k1')} />
      <Label kind="mono" anchor="start" x={176} y={157} size={13}>kafka conn string</Label>
      <Key x={144} y={180} seed={s('k2')} />
      <Label kind="mono" anchor="start" x={176} y={185} size={13}>db creds</Label>
      <Strike x0={136} x1={242} y={181} seed={s('x')} tone="red" />
      <Label tone="red" anchor="start" x={250} y={185} size={13}>never here</Label>
      <Label x={226} y={230}>hardened: ports hidden, no SSH</Label>
      <Label kind="title" x={170} y={276}>exposed</Label>
    </Fig>
  );
}

/** Panel b: the edge server behind a load balancer, checking membership for private channels. */
export function BehindLb() {
  const id = 'f9c-b';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={390} title="Behind a load balancer, with a membership check" desc={LB_DESC}>
      <Actor x={26} y={96} s={0.85} seed={s('u')} />
      <WsLine pts={[[42, 120], [86, 120]]} seed={s('ws1')} />
      <LoadBalancer x={86} y={92} w={16} h={56} seed={s('lb')} />
      <WsLine pts={[[102, 120], [146, 120]]} seed={s('ws2')} />
      <EdgeServer x={146} y={84} w={186} h={76} label="" seed={s('e')} />
      <Label kind="mono" x={239} y={106}>edge server</Label>
      <Key x={160} y={134} seed={s('k')} />
      <Label kind="mono" anchor="start" x={188} y={139} size={13}>kafka conn string</Label>
      <Label tone="red" x={94} y={180}>+3–5 ms per hop</Label>
      <Label muted x={94} y={197} size={12.5}>(instructor’s estimate)</Label>
      <Label anchor="start" x={8} y={234}>sticky: one connection to the lb,</Label>
      <Label anchor="start" x={8} y={252}>one to the server</Label>
      <Arrow pts={[[300, 160], [300, 268]]} seed={s('e-m')} />
      <Box x={196} y={270} w={136} h={36} label="membership api" seed={s('m')} />
      <Arrow pts={[[196, 288], [118, 288]]} seed={s('m-db')} />
      <Cyl cx={94} top={274} rx={22} h={26} seed={s('db')} />
      <Label kind="mono" anchor="end" x={64} y={296}>db</Label>
      <Label x={170} y={340}>private channels: check membership here</Label>
      <Label kind="title" x={170} y={378}>behind a load balancer</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 9·d: ack after replication */

export function AckAfterReplication() {
  const id = 'f9d';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Sized w={340}>
      <Fig id={id} w={340} h={318} title="Ack after replication"
        desc="The worker writes message m42 to one node. Nodes 2 and 3 pull a copy from node 1. Only then does node 1 acknowledge the write to the worker, which waits for that ack. A write lost before that point was never accepted.">
        <Worker x={6} y={44} w={84} h={36} seed={s('w')} />
        <Num x={123} y={13} n={1} tone="blue" />
        <Label kind="mono" tone="blue" x={123} y={35} size={12.5}>write m42</Label>
        <Arrow tone="blue" pts={[[90, 56], [160, 56]]} seed={s('write')} />
        <Arrow tone="green" pts={[[160, 70], [92, 70]]} seed={s('ack')} />
        <Label kind="mono" tone="green" x={125} y={90} size={12.5}>ack ✓</Label>
        <Num x={125} y={110} n={3} tone="green" />
        <Cyl cx={190} top={36} rx={28} h={44} seed={s('n1')} />
        <Label kind="mono" anchor="start" x={224} y={64}>node 1</Label>
        <Arrow pts={[[170, 156], [170, 92]]} seed={s('c2')} />
        <Arrow pts={[[212, 156], [212, 92]]} seed={s('c3')} />
        {/* the replicas pull (course rule, as lec01's "replica pulls"): the arrows start at nodes 2 and 3 */}
        <Num x={191} y={108} n={2} />
        <Label anchor="start" x={222} y={118}>replicas pull</Label>
        <Label anchor="start" x={222} y={136}>a copy</Label>
        <Cyl cx={146} top={162} rx={28} h={38} label="node 2" seed={s('n2')} />
        <Cyl cx={240} top={162} rx={28} h={38} label="node 3" seed={s('n3')} />
        <Label anchor="start" x={4} y={134} size={13}>waits for</Label>
        <Label anchor="start" x={4} y={150} size={13}>the ack</Label>
        <Label x={170} y={256}>replication factor 3</Label>
        <Label x={170} y={276}>never says “done” before the copies</Label>
        <Label muted x={170} y={300} size={12.5}>DynamoDB: 2 of 3, see the note below</Label>
      </Fig>
    </Sized>
  );
}

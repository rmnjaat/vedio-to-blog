// Lecture 04 (lec02), §7.1 and §7.2, Fig 7·a: two kinds of connection, one sharded store
// (D-03 redraw, board frames b_014645 / b_012445, with D-07 b_022027 folded in: the `messaging service` outline,
// its `lb`, and the send_message REST call). Graphite only: this is the architecture, nothing is travelling yet.
// variant "send" (7.1) labels the REST call; variant "conn" (7.2) labels only the two connection types.
// Desk 880 wide; phone 340 wide (users on top, api and ws side by side, shards at the bottom).
import React from 'react';
import { Actor, Arrow, Cyl, Fleet, Label, Line, LoadBalancer } from '../kit/Kit';
// Fig: the kit's, with a label floor for 360px phones and 768px (assembler; see s0-label-floor.tsx)
import { Fig } from './s0-label-floor';
import { Sized, WsLine, type Layout } from './s7-sending-parts';

const TITLE = 'Two kinds of connection, one sharded store';
const DESC = 'Users A and B each hold two kinds of connection: HTTP to the API servers (the messaging service, behind a load balancer) and a WebSocket to the WebSocket servers. The API servers write each message to the shard chosen by its channel id, so all of a channel’s messages sit in one shard. The shards can be any database you can shard: MySQL, Cassandra or Mongo.';

export function TwoConnections({ layout = 'wide', variant = 'send' }: { layout?: Layout; variant?: 'send' | 'conn' }) {
  const P = layout === 'phone';
  const id = `f7a-${variant}${P ? '-p' : ''}`;
  const s = (k: string) => `${id}-${k}`;
  const conn = variant === 'conn';

  if (P) {
    const W = 340, H = 452;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
          <Actor x={56} y={22} seed={s('ua')} />
          <Label kind="mono" x={30} y={44}>A</Label>
          <Actor x={280} y={22} seed={s('ub')} />
          <Label kind="mono" x={306} y={44}>B</Label>

          {/* the messaging service: lb + api fleet */}
          <Line weight="thin" pts={[[10, 104], [152, 104], [152, 272], [10, 272], [10, 104]]} seed={s('svc')} />
          <Label anchor="end" x={146} y={250} size={13}>messaging</Label>
          <Label anchor="end" x={146} y={265} size={13}>service</Label>
          <LoadBalancer x={22} y={126} w={110} h={12} seed={s('lb')} />
          <Fleet x={24} y={184} w={76} h={44} n={3} label="api" countLabel={false} seed={s('api')} />
          <Fleet x={190} y={184} w={76} h={44} n={3} label="ws" countLabel={false} seed={s('ws')} />
          <Line pts={[[100, 220], [190, 220]]} seed={s('api-ws')} />

          {/* HTTP: A straight down, B round to the left */}
          <Arrow pts={[[56, 72], [56, 126]]} seed={s('a-rest')} />
          <Arrow pts={[[272, 72], [272, 94], [112, 94], [112, 126]]} seed={s('b-rest')} />
          <Arrow pts={[[77, 138], [77, 156]]} seed={s('lb-api')} />
          {conn
            ? <Label anchor="start" x={120} y={87} size={13}>HTTP to the API</Label>
            : <Label anchor="start" x={124} y={87} size={13}>REST</Label>}

          {/* WebSockets */}
          <WsLine pts={[[70, 48], [236, 48], [236, 156]]} seed={s('a-ws')} />
          <WsLine pts={[[290, 72], [290, 156]]} seed={s('b-ws')} />
          {conn
            ? <Label anchor="end" x={228} y={152} size={13}>WS to the edge</Label>
            : <Label kind="mono" x={262} y={140}>WS</Label>}

          {/* shards */}
          <Arrow pts={[[50, 228], [50, 330]]} seed={s('api-db')} />
          <Label kind="mono" anchor="start" x={60} y={304} size={13}>channel_id → shard</Label>
          <Label x={200} y={330}>any DB you can shard</Label>
          {[50, 170, 290].map((x, i) => <Cyl key={i} cx={x} top={340} rx={24} h={44} seed={s('db' + i)} />)}
          <Label kind="mono" muted x={170} y={412} size={12.5}>mysql / cassandra / mongo</Label>
          <Label x={170} y={436}>a channel’s messages all in one shard</Label>
        </Fig>
      </Sized>
    );
  }

  const W = 880, H = 404;
  return (
    <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
      <Actor x={96} y={66} seed={s('ua')} />
      <Label kind="mono" x={96} y={134}>A</Label>
      <Actor x={96} y={206} seed={s('ub')} />
      <Label kind="mono" x={96} y={274}>B</Label>

      {/* the messaging service (D-07): an outline around the lb and the api fleet */}
      <Line weight="thin" pts={[[410, 22], [652, 22], [652, 262], [410, 262], [410, 22]]} seed={s('svc')} />
      <Label x={566} y={46}>messaging service</Label>
      <LoadBalancer x={430} y={66} w={22} h={180} seed={s('lb')} />
      <Fleet x={490} y={135} w={100} h={50} n={3} label="api" countLabel={false} seed={s('api')} />
      <Label x={540} y={208}>×3</Label>
      <Arrow pts={[[452, 160], [490, 160]]} seed={s('lb-api')} />

      {/* HTTP from both users into the lb */}
      <Arrow pts={[[112, 86], [430, 86]]} seed={s('a-rest')} />
      <Arrow pts={[[112, 226], [430, 226]]} seed={s('b-rest')} />
      {conn
        ? <Label x={278} y={74}>HTTP to the API</Label>
        : <>
            <Label x={278} y={76}>REST</Label>
            {/* two lines, so the call stays clear of the lb at the 768px label floor (assembler) */}
            <Label kind="mono" anchor="start" x={118} y={106} size={12.5}>send_message(from_user,</Label>
            <Label kind="mono" anchor="start" x={136} y={124} size={12.5}>to_channel, text)</Label>
          </>}

      {/* WebSocket servers, joined to the API servers as on the board */}
      <Fleet x={490} y={320} w={100} h={50} n={3} label="ws" countLabel={false} seed={s('ws')} />
      <Label x={540} y={392}>×3</Label>
      <Line pts={[[504, 185], [504, 320]]} seed={s('api-ws')} />

      {/* each user's WebSocket */}
      <WsLine pts={[[82, 94], [40, 94], [40, 358], [490, 358]]} seed={s('a-ws')} />
      <WsLine pts={[[82, 234], [62, 234], [62, 338], [490, 338]]} seed={s('b-ws')} />
      {conn
        ? <Label x={290} y={326}>WS to the edge</Label>
        : <Label kind="mono" x={290} y={326}>WS</Label>}

      {/* the sharded store */}
      <Arrow pts={[[590, 160], [694, 160]]} seed={s('api-db')} />
      {/* the routing rule sits over the store: the gap between the service and the store is too narrow for it */}
      <Label x={780} y={88}>any DB you can shard</Label>
      <Label kind="mono" x={780} y={114} size={13}>channel_id → shard</Label>
      {[720, 780, 840].map((x, i) => <Cyl key={i} cx={x} top={132} rx={24} h={56} seed={s('db' + i)} />)}
      <Label kind="mono" muted anchor="end" x={872} y={220} size={12.5}>mysql / cassandra / mongo</Label>
      <Label x={780} y={250}>a channel’s messages</Label>
      <Label x={780} y={268}>all in one shard</Label>
    </Fig>
  );
}

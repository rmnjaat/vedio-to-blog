// Lecture 06 (lec03), chapter 5 part b: Fig 5·b Flickr's photo service with a ticket server (D-15 redraw, frame b_012657),
// Fig 5·c the ticket table (D-14 redraw, frames b_012115, b_012615), Fig 5·d two ticket servers, odd and even
// (D-16 redraw, frames b_012630, b_013130). Wide layouts with portrait phone layouts (340).
import React from 'react';
import { Actor, Arrow, Bubble, Cyl, Fig, Fleet, Label, LoadBalancer, Num } from '../kit/Kit';
import { Struck, TableBlock, rowBase } from './s4-id-size-parts';

/* ------------------------------------------------------------------ Fig 5·b */

const T5B = "Flickr's photo service with a ticket server";
const D5B =
  'A user posts a photo to one of the photo service servers. That server first asks the ticket server, a separate MySQL database, for an ID (1), gets the ID back, and then stores the photo under that ID in the sharded, multi-master photos database (2). The single ticket server is a single point of failure.';

export function FlickrFlow({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig5b-p" w={340} h={300} title={T5B} desc={D5B}>
        <Actor x={22} y={52} s={0.9} seed="f5b-p-user" />
        <Arrow tone="blue" pts={[[40, 78], [62, 78]]} seed="f5b-p-post" />
        <Fleet x={66} y={60} w={110} h={40} n={2} label="photos svc" countLabel={false} size={14} seed="f5b-p-svc" />
        <Arrow tone="blue" pts={[[176, 72], [228, 72]]} seed="f5b-p-get" />
        <Arrow tone="blue" pts={[[228, 90], [180, 90]]} seed="f5b-p-ret" />
        <Num x={204} y={56} n={1} tone="blue" size={14} />
        <Label kind="mono" tone="blue" x={204} y={108} size={14}>id</Label>
        <Cyl cx={274} top={56} rx={36} ry={8} h={40} seed="f5b-p-ticket" label="ticket server" />
        <Label muted x={274} y={139} size={14}>(mysql)</Label>
        <Label tone="red" x={250} y={168} size={14}>single point of failure</Label>
        <Arrow tone="blue" pts={[[120, 100], [120, 200]]} seed="f5b-p-store" />
        <Num x={136} y={142} n={2} tone="blue" size={14} />
        <Label anchor="start" x={150} y={147} size={14}>store photo</Label>
        {[70, 120, 170].map((cx, i) => <Cyl key={i} cx={cx} top={206} rx={20} ry={5} h={26} seed={`f5b-p-sh${i}`} />)}
        <Label kind="mono" x={120} y={260} size={14}>photos db</Label>
        <Label muted x={120} y={280} size={14}>sharded, multi-master</Label>
      </Fig>
    );
  return (
    <Fig id="fig5b" w={600} h={290} title={T5B} desc={D5B}>
      <Actor x={44} y={78} seed="f5b-user" />
      <Label x={44} y={150} size={14}>user</Label>
      <Arrow tone="blue" pts={[[68, 102], [126, 102]]} seed="f5b-post" />
      <Label anchor="start" x={70} y={92} size={13}>post</Label>
      <Fleet x={130} y={80} w={130} h={44} n={2} label="photos svc" countLabel={false} seed="f5b-svc" />
      <Arrow tone="blue" pts={[[260, 92], [396, 92]]} seed="f5b-get" />
      <Num x={292} y={76} n={1} tone="blue" />
      <Label anchor="start" x={306} y={81} size={14}>get id</Label>
      <Arrow tone="blue" pts={[[396, 114], [264, 114]]} seed="f5b-ret" />
      <Label kind="mono" tone="blue" x={330} y={132} size={13}>id</Label>
      <Cyl cx={446} top={76} rx={42} ry={10} h={46} seed="f5b-ticket" label="ticket server (mysql)" />
      <Label tone="red" x={446} y={176} size={14}>one box: a single point of failure</Label>
      <Arrow tone="blue" pts={[[195, 124], [195, 196]]} seed="f5b-store" />
      <Num x={212} y={156} n={2} tone="blue" />
      <Label anchor="start" x={226} y={161} size={14}>store photo</Label>
      {[145, 195, 245].map((cx, i) => <Cyl key={i} cx={cx} top={202} rx={20} ry={5} h={28} seed={`f5b-sh${i}`} />)}
      <Label kind="mono" x={195} y={256} size={14}>photos db</Label>
      <Label muted x={195} y={276} size={13}>sharded, multi-master</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·c */

const T5C = 'The ticket table';
const D5C =
  "Flickr's Tickets64 table has an auto-increment BIGINT id (the primary key) and a stub column with a unique key. It holds one row, id 74 with stub 'a'. Each ID request collides on the unique stub, the row is replaced, and auto-increment gives the new row the next id: 74, then 75, then 76.";

const SCHEMA_WIDE = [
  'create table Tickets64 (',
  '  id   bigint unsigned not null auto_increment,',
  "  stub char(1) not null default '',",
  '  primary key (id),',
  '  unique key (stub)',
  ');',
];
const SCHEMA_PHONE = [
  'create table Tickets64 (',
  '  id bigint unsigned not null',
  '     auto_increment,',
  "  stub char(1) not null default '',",
  '  primary key (id),',
  '  unique key (stub)',
  ');',
];

export function TicketTable({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const cols = [{ h: 'id', w: 64 }, { h: 'stub', w: 64 }];
  if (layout === 'phone') {
    const r = rowBase(44, 0, 14);
    return (
      <Fig id="fig5c-p" w={340} h={334} title={T5C} desc={D5C}>
        <TableBlock x={20} y={44} title="Tickets64" cols={cols} rows={[['74', 'a']]} seed="f5c-p-t" size={14} />
        <Struck x={182} y={r} text="74" seed="f5c-p-x" size={14} />
        <Arrow pts={[[198, r - 4], [218, r - 4]]} seed="f5c-p-a1" />
        <Label kind="mono" x={236} y={r} size={14}>75</Label>
        <Arrow pts={[[254, r - 4], [274, r - 4]]} seed="f5c-p-a2" />
        <Label kind="mono" tone="green" x={292} y={r} size={14}>76</Label>
        <Arrow pts={[[116, 120], [116, 94]]} seed="f5c-p-stub" />
        <Label anchor="start" x={20} y={138} size={14}>a dummy value: just there</Label>
        <Label anchor="start" x={20} y={156} size={14}>to hit the unique key</Label>
        {SCHEMA_PHONE.map((l, i) => (
          <Label key={i} kind="mono" muted anchor="start" x={14} y={196 + i * 19} size={14}>{l.replace(/ /g, ' ')}</Label>
        ))}
      </Fig>
    );
  }
  const r = rowBase(44, 0);
  return (
    <Fig id="fig5c" w={640} h={210} title={T5C} desc={D5C}>
      <TableBlock x={30} y={44} title="Tickets64" cols={cols} rows={[['74', 'a']]} seed="f5c-t" />
      <Struck x={46} y={r + 52} text="74" seed="f5c-x" size={14} />
      <Arrow pts={[[62, r + 48], [84, r + 48]]} seed="f5c-a1" />
      <Label kind="mono" x={102} y={r + 52} size={14}>75</Label>
      <Arrow pts={[[120, r + 48], [142, r + 48]]} seed="f5c-a2" />
      <Label kind="mono" tone="green" x={160} y={r + 52} size={14}>76</Label>
      <Arrow pts={[[186, 170], [186, r - 4], [162, r - 4]]} seed="f5c-stub" />
      <Label anchor="start" x={30} y={190} size={14}>stub = 'a': a dummy value, just there to hit the unique key</Label>
      {SCHEMA_WIDE.map((l, i) => (
        <Label key={i} kind="mono" muted anchor="start" x={230} y={34 + i * 20} size={13}>{l.replace(/ /g, ' ')}</Label>
      ))}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·d */

const T5D = 'Two ticket servers, odd and even';
const D5D =
  'Two ticket servers sit behind a round-robin load balancer. Both step by 2 (auto_increment_increment = 2); ticket 1 starts at 1 and issues 1, 3, 5, 7, ticket 2 starts at 2 and issues 2, 4, 6, 8. Requests alternate, so IDs come out 1, 2, 3, 4 and are never shared.';

function TicketText({ x, y, name, nums, offset, anchor, phone }: { x: number; y: number; name: string; nums: string; offset: number; anchor: 'start' | 'end'; phone?: boolean }) {
  return (
    <g>
      <Label kind="mono" anchor={anchor} x={x} y={y} size={14}>{name}</Label>
      <Label kind="mono" anchor={anchor} x={x} y={y + 22} size={15}>{nums}</Label>
      <Label kind="mono" muted anchor={anchor} x={x} y={y + 44} size={phone ? 14 : 13}>{phone ? 'increment = 2' : 'auto_increment_increment = 2'}</Label>
      <Label kind="mono" muted anchor={anchor} x={x} y={y + 62} size={phone ? 14 : 13}>{phone ? `offset = ${offset}` : `auto_increment_offset = ${offset}`}</Label>
    </g>
  );
}

export function OddEven({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig5d-p" w={340} h={360} title={T5D} desc={D5D}>
        <Bubble x={10} y={8} w={280} h={34} tail={[56, 66]} seed="f5d-p-bub" lines={["aren't we supposed to be in order?"]} size={14} />
        <Cyl cx={56} top={74} rx={30} ry={8} h={40} seed="f5d-p-t1" />
        <TicketText x={100} y={84} name="ticket 1" nums="1 3 5 7" offset={1} anchor="start" phone />
        <Cyl cx={284} top={170} rx={30} ry={8} h={40} seed="f5d-p-t2" />
        <TicketText x={240} y={180} name="ticket 2" nums="2 4 6 8" offset={2} anchor="end" phone />
        <LoadBalancer x={30} y={276} w={280} h={14} seed="f5d-p-lb" label="" />
        <Label kind="mono" anchor="start" x={316} y={288} size={14}>lb</Label>
        <Arrow pts={[[56, 276], [56, 132]]} head="none" seed="f5d-p-l1" />
        <Arrow pts={[[284, 276], [284, 228]]} head="none" seed="f5d-p-l2" />
        {[100, 126, 152, 178, 204, 230].map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 336], [x, 294]]} seed={`f5d-p-r${i}`} />)}
        <Label anchor="start" x={244} y={330} size={14}>round robin</Label>
      </Fig>
    );
  return (
    <Fig id="fig5d" w={660} h={330} title={T5D} desc={D5D}>
      <Bubble x={20} y={10} w={250} h={36} tail={[72, 74]} seed="f5d-bub" lines={["aren't we supposed to be in order?"]} />
      <Cyl cx={72} top={82} rx={34} ry={9} h={46} seed="f5d-t1" />
      <TicketText x={122} y={96} name="ticket 1" nums="1 3 5 7" offset={1} anchor="start" />
      <Cyl cx={418} top={82} rx={34} ry={9} h={46} seed="f5d-t2" />
      <TicketText x={468} y={96} name="ticket 2" nums="2 4 6 8" offset={2} anchor="start" />
      <LoadBalancer x={52} y={228} w={386} h={16} seed="f5d-lb" label="" />
      <Label kind="mono" anchor="end" x={44} y={241} size={14}>lb</Label>
      <Arrow pts={[[72, 228], [72, 146]]} head="none" seed="f5d-l1" />
      <Arrow pts={[[418, 228], [418, 146]]} head="none" seed="f5d-l2" />
      {[130, 160, 190, 220, 250, 280, 310, 340].map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 302], [x, 250]]} seed={`f5d-r${i}`} />)}
      <Label anchor="start" x={460} y={284} size={14}>round robin: 1, 2, 3, 4 …</Label>
    </Fig>
  );
}

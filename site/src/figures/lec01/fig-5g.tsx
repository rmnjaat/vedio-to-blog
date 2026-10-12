// Lecture 01, §5.6, Fig 5·g: the push path (new).
// Your server hands a notification to the platform push service (FCM / APNs), which you don't run.
// The phone's OS keeps ONE connection to that service for all apps (the device opens it, so the head sits on
// the service end) and hands the notification to the app. Delivery is best-effort: it may drop.
// A calendar app's reminder is a local notification: no network at all.
import React from 'react';
import { Arrow, Box, Fig, Label, Line } from '../kit/Kit';
import { Sized, type Layout } from './fig-5a';

const TITLE = 'The push path';
const DESC = 'Your server sends a notification to FCM or APNs, a push service you do not run. The phone\'s operating system keeps one shared connection to that service for all apps, opened by the device, and hands each notification to the right app. Delivery is best-effort, so a notification may drop. Separately, a calendar app raises a local notification through the OS with no network at all.';

export function PushPath({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5g-p' : 'f5g';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const W = 340, H = 460;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
          <Box x={110} y={12} w={120} h={44} label="your server" seed={s('srv')} />
          <Arrow tone="blue" pts={[[170, 56], [170, 104]]} seed={s('n')} />
          <Label anchor="start" x={180} y={86}>notification</Label>
          <Box x={110} y={104} w={120} h={44} label="fcm / apns" seed={s('push')} />
          <Label muted anchor="start" x={238} y={131}>not yours</Label>
          <Line tone="red" dotted pts={[[110, 126], [46, 126], [46, 172]]} seed={s('drop')} />
          <Label tone="red" x={46} y={192}>may drop</Label>
          {/* the phone */}
          <Box x={96} y={222} w={230} h={210} seed={s('phone')} />
          <Label muted anchor="start" x={104} y={448}>phone</Label>
          <Box x={124} y={250} w={92} h={44} label="os" seed={s('os')} />
          <Arrow pts={[[170, 250], [170, 148]]} seed={s('conn')} />
          <Label anchor="start" x={180} y={182}>one shared connection</Label>
          <Label anchor="start" x={180} y={199}>for all apps</Label>
          {[236, 286, 336].map((y, i) => (
            <Box key={i} x={262} y={y} w={48} h={36} label="app" seed={s('app' + i)} />
          ))}
          <Arrow tone="blue" weight="thin" pts={[[216, 262], [240, 262], [240, 254], [262, 254]]} seed={s('a0')} />
          <Arrow tone="blue" weight="thin" pts={[[216, 282], [240, 282], [240, 304], [262, 304]]} seed={s('a1')} />
          <Box x={124} y={350} w={92} h={44} label="calendar" seed={s('cal')} />
          <Arrow weight="thin" pts={[[170, 350], [170, 294]]} seed={s('local')} />
          <Label x={170} y={412}>local notification,</Label>
          <Label x={170} y={428}>no network</Label>
        </Fig>
      </Sized>
    );
  }
  const W = 760, H = 318;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
        <Box x={14} y={100} w={128} h={48} label="your server" seed={s('srv')} />
        <Arrow tone="blue" pts={[[142, 124], [244, 124]]} seed={s('n')} />
        <Label x={193} y={114}>notification</Label>
        <Box x={244} y={100} w={128} h={48} label="fcm / apns" seed={s('push')} />
        <Label muted x={308} y={86}>not yours</Label>
        <Line tone="red" dotted pts={[[308, 148], [308, 214]]} seed={s('drop')} />
        <Label tone="red" x={308} y={234}>may drop</Label>
        {/* the device opens and keeps the one connection: head on the service end */}
        <Arrow pts={[[500, 124], [372, 124]]} seed={s('conn')} />
        <Label x={436} y={160}>one shared</Label>
        <Label x={436} y={177}>connection</Label>
        <Label x={436} y={194}>for all apps</Label>
        {/* the phone */}
        <Box x={484} y={20} w={262} h={272} seed={s('phone')} />
        <Label muted anchor="start" x={494} y={310}>phone</Label>
        <Box x={500} y={100} w={80} h={48} label="os" seed={s('os')} />
        {[44, 106, 168].map((y, i) => (
          <Box key={i} x={660} y={y} w={56} h={40} label="app" seed={s('app' + i)} />
        ))}
        <Arrow tone="blue" weight="thin" pts={[[580, 112], [620, 112], [620, 64], [660, 64]]} seed={s('a0')} />
        <Arrow tone="blue" weight="thin" pts={[[580, 126], [660, 126]]} seed={s('a1')} />
        <Box x={500} y={204} w={80} h={44} label="calendar" seed={s('cal')} labelSize={13} />
        <Arrow weight="thin" pts={[[540, 204], [540, 148]]} seed={s('local')} />
        <Label anchor="start" x={592} y={232}>local notification,</Label>
        <Label anchor="start" x={592} y={249}>no network</Label>
      </Fig>
    </Sized>
  );
}

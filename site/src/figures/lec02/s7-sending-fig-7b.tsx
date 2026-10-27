// Lecture 04 (lec02), §7.2, Fig 7·b: grey, then black (new). Two frames of one message as the sender sees it:
// grey "sending…", a small clock for the visible delay, then black "sent". Under it: "a hint, not proof".
// Desk 480 wide; phone 300 wide with the frames stacked.
import React from 'react';
import { Arrow, Fig, Label } from '../kit/Kit';
import { ChatBubble, Clock, Sized, type Layout } from './s7-sending-parts';

const TITLE = 'Grey, then black';
const DESC = 'On Slack a sent message first shows grey, marked sending, then turns black, sent, after a short visible delay. That delay hints, without proving it, that sending goes through an ordinary request rather than the open WebSocket.';

export function GreyThenBlack({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f7b-p' : 'f7b';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const W = 300, H = 330;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
          <g className="faint"><ChatBubble x={70} y={14} w={160} text="standup in 5" seed={s('m1')} /></g>
          <Label muted x={150} y={86}>sending…</Label>
          <Clock cx={110} cy={130} seed={s('clk')} />
          <Arrow weight="thin" pts={[[150, 104], [150, 160]]} seed={s('wait')} />
          <Label anchor="start" x={162} y={136}>a visible delay</Label>
          <ChatBubble x={70} y={176} w={160} text="standup in 5" seed={s('m2')} />
          <Label x={150} y={248}>sent</Label>
        </Fig>
      </Sized>
    );
  }
  const W = 480, H = 176;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
        <g className="faint"><ChatBubble x={14} y={24} w={150} text="standup in 5" seed={s('m1')} /></g>
        <Label muted x={89} y={100}>sending…</Label>
        <Clock cx={240} cy={34} seed={s('clk')} />
        <Arrow weight="thin" pts={[[184, 64], [296, 64]]} seed={s('wait')} />
        <Label x={240} y={90}>a visible delay</Label>
        <ChatBubble x={316} y={24} w={150} text="standup in 5" seed={s('m2')} />
        <Label x={391} y={100}>sent</Label>
      </Fig>
    </Sized>
  );
}

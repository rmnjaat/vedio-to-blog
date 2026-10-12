// Lecture 01, §3.2 Fig 3·a: "74 essays" (D-07 redraw, board 01:05:45, frame b_010630).
// The board's author name is replaced by a generic one. Small figure: authored once at 360 units and
// capped at 400px wide so it is never blown up on the wide column (labels stay >= 12px on a 360px phone).
import React from 'react';
import { Actor, Arrow, Client, Fig, Label, Mark } from '../kit/Kit';

export function ProfileCard() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Fig id="fig3a" w={360} h={184} title="A profile card that shows how many essays the author has written"
        desc="A Medium-style profile page in a browser window: avatar, the name A. Writer, the line Engineer, writer, and the count 74 essays, underlined. An arrow from the note '#blogs of a user' points up at the count: this number is what the users table has to supply.">
        {/* the key's client glyph (a browser window) showing the author's profile page */}
        <Client x={12} y={14} w={262} h={124} seed="f3a-card" />
        <Actor x={52} y={46} s={1.1} seed="f3a-avatar" />
        <Label anchor="start" x={92} y={60} size={17}>A. Writer</Label>
        <Label anchor="start" muted x={92} y={86} size={15}>Engineer, writer</Label>
        <Label kind="mono" anchor="start" x={92} y={116} size={15}>74 essays</Label>
        <Mark a={[92, 124]} b={[178, 124]} seed="f3a-underline" />
        <Arrow pts={[[210, 166], [136, 166], [136, 127]]} seed="f3a-arrow" />
        <Label anchor="start" x={216} y={171} size={15}>#blogs of a user</Label>
      </Fig>
    </div>
  );
}

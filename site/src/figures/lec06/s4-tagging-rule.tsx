// Lecture 08 (lec06), §4 RuleBox sketch: the CXO's one-line brief ("tag people in photos") with six thin arrows
// out to the teams it touches: authz, notify, ml, search, feed, profile. Ledger: L-0191.
// Rule-box scale 480; phone layout at 320.
import React from 'react';
import { Actor, Arrow, Box, Bubble, Label } from '../kit/Kit';
import { Fig } from './floor';

const TEAMS = ['authz', 'notify', 'ml', 'search', 'feed', 'profile'];

export function OneLineManyTeams({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule4-p' : 'rule4';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const bx = P ? 8 : 20, bw = P ? 150 : 190, by = 56, bh = P ? 50 : 42;
  const tx = P ? 226 : 340, tw = P ? 86 : 110; // team boxes
  const fromX = bx + bw + 2, fromY = by + bh / 2;
  return (
    <Fig id={id} w={W} h={186} title="One line, many teams"
      desc="A one-line brief, tag people in photos, fans out to many teams, among them authorization, notifications, machine learning, search, feed and profile. Every requirement question about it changes the design or brings in another team.">
      <Bubble x={bx} y={by} w={bw} h={bh} tail={[bx + 34, by + bh + 22]} seed={s('b')} size={P ? 14 : 14}
        lines={P ? ['“tag people', 'in photos”'] : ['“tag people in photos”']} />
      <Actor x={bx + 30} y={by + bh + 34} s={0.8} seed={s('cxo')} />
      <Label muted anchor="start" x={bx + 50} y={by + bh + 66} size={13}>the CXO</Label>
      {TEAMS.map((t, i) => {
        const y = 8 + i * 29;
        return (
          <g key={t}>
            <Arrow pts={[[fromX, fromY], [tx - 4, y + 11]]} weight="thin" seed={s('a' + i)} />
            <Box x={tx} y={y} w={tw} h={23} label={t} seed={s('t' + i)} labelSize={13} />
          </g>
        );
      })}
    </Fig>
  );
}

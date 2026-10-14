// Lecture 08 (lec06), §2 RuleBox sketch: the users header with the hash column crossed off, then written back
// with a `*` because the query needed it. Rule-box sketch scale (480) with a phone layout (320).
import React from 'react';
import { Arrow, Label } from '../kit/Kit';
import { Fig } from './floor';
import { Table } from './s2a-gravatar-parts';

const TITLE = 'The hash column comes back';
const DESC =
  'The users table has id, email and hash. The hash is first crossed off because it can be derived from the email, then written back as an indexed column, because the query that serves every request needs it.';

export function HashBackSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="rule2-p" w={320} h={190} title={TITLE} desc={DESC} className="bottomup">
        <Table x={14} y={26} name="users" cols={['id', 'email', 'hash']} widths={[56, 130, 100]} seed="r2-p-t" strike={[2]} />
        <Arrow pts={[[236, 64], [236, 104]]} seed="r2-p-a" />
        <Label kind="mono" x={236} y={128} size={15}>* hash</Label>
        <Label x={236} y={148} size={14}>indexed</Label>
        <Label anchor="start" x={14} y={128} size={14}>the query</Label>
        <Label anchor="start" x={14} y={148} size={14}>needed it</Label>
        <Label anchor="start" muted x={14} y={178} size={13}>derivable, and stored anyway</Label>
      </Fig>
    );
  return (
    <Fig id="rule2" w={480} h={124} title={TITLE} desc={DESC} className="bottomup">
      <Table x={16} y={30} name="users" cols={['id', 'email', 'hash']} widths={[60, 150, 100]} seed="r2-t" strike={[2]} />
      <Arrow pts={[[330, 43], [378, 43]]} seed="r2-a" />
      <Label kind="mono" anchor="start" x={386} y={48} size={15}>* hash</Label>
      <Label anchor="start" x={386} y={70}>indexed</Label>
      <Label x={354} y={98}>the query needed it</Label>
    </Fig>
  );
}

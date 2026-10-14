// Lecture 08 (lec06), §2.2 Fig 2·a: Two tables, sample rows (D-04 redraw, frame b_010800; the board's
// email is replaced by an example address). The hash column is struck through: §2.2 hasn't restored it yet.
// The chapter's one speech bubble sits on the hash column (its misconception: "derivable, so don't store me?").
// Wide figure (680) with a phone layout (340): the tables stack.
import React from 'react';
import { Arrow, Bubble, Label } from '../kit/Kit';
import { Fig } from './floor';
import { Table } from './s2a-gravatar-parts';

const TITLE = 'Two tables, sample rows';
const DESC =
  'users holds id, email and a crossed-off hash: id 729, ana@example.com. photos holds one row per uploaded photo with id, user_id and is_active: 7abe for user 729 is active, c1d0 is not. Each photo row points at its user. The S3 path is not stored; it is derived from the user id and photo id.';

export function TwoTables({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig2a-p" w={340} h={410} title={TITLE} desc={DESC}>
        <Bubble x={150} y={8} w={182} h={46} tail={[282, 84]} lines={['derivable, so', 'don’t store me?']} seed="f2a-p-b" size={14} />
        <Table x={12} y={92} name="users" cols={['* id', '* email', 'hash']} widths={[52, 170, 96]} seed="f2a-p-u"
          rows={[['729', 'ana@example.com', '0eafd172']]} strike={[2]} />
        <Arrow pts={[[108, 218], [108, 180], [38, 180], [38, 148]]} seed="f2a-p-fk" />
        <Label anchor="start" x={120} y={190} size={14}>each photo points at its user</Label>
        <Table x={12} y={218} name="photos" cols={['id', 'user_id', 'is_active']} widths={[70, 90, 110]} seed="f2a-p-p"
          rows={[['7abe', '729', 'true'], ['c1d0', '729', 'false']]} />
        <Label anchor="start" x={12} y={340} size={14}>path? don’t store it, derive it:</Label>
        <Label kind="mono" anchor="start" x={12} y={364} size={14}>s3://gravatar-images/729/7abe</Label>
        <Label anchor="start" muted x={12} y={394} size={13}>(user id + photo id)</Label>
      </Fig>
    );
  return (
    <Fig id="fig2a" w={680} h={300} title={TITLE} desc={DESC}>
      <Table x={40} y={56} name="users" cols={['* id', '* email', 'hash']} widths={[70, 190, 110]} seed="f2a-u"
        rows={[['729', 'ana@example.com', '0eafd172']]} strike={[2]} />
      <Bubble x={448} y={14} w={196} h={46} tail={[398, 70]} lines={['derivable, so', 'don’t store me?']} seed="f2a-b" size={14} />
      <Arrow pts={[[170, 196], [170, 156], [75, 156], [75, 116]]} seed="f2a-fk" />
      <Label anchor="start" x={182} y={160}>each photo points at its user</Label>
      <Table x={40} y={196} name="photos" cols={['id', 'user_id', 'is_active']} widths={[80, 100, 110]} seed="f2a-p"
        rows={[['7abe', '729', 'true'], ['c1d0', '729', 'false']]} />
      <Label anchor="start" x={376} y={226}>path? don’t store it, derive it:</Label>
      <Label kind="mono" anchor="start" x={376} y={250}>s3://gravatar-images/729/7abe</Label>
      <Label anchor="start" muted x={376} y={272} size={13}>(user id + photo id)</Label>
    </Fig>
  );
}

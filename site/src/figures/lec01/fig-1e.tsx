// Fig 1·e: A materialized view (new). Base tables marks + people -> JOIN + computed total -> results_mv.
// Desk 700 wide (show it at max 700px so labels stay ~1:1 at 768px), phone 340 wide (ruled entity boxes).
import React from 'react';
import { Arrow, Fig, Label, Line } from '../kit/Kit';
import { Entity, SpanBracket, Table } from './s1-parts';

const DESC =
  'Two base tables: marks, with a student id and one column per subject (maths, physics, chemistry), and people, with id, name and city. A JOIN of the two plus the computation maths plus physics plus chemistry produces a third table, results_mv, with name, city, the three marks and a derived total column. A dashed refresh arrow runs from the base tables to the view: the view is only as fresh as its last refresh. Queries, in blue, hit the view instead of the tables.';

export function MaterializedView({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'A materialized view';
  if (layout === 'phone') {
    const s = (k: string) => `f1e-p-${k}`;
    return (
      <Fig id="f1e-p" w={340} h={560} title={title} desc={DESC}>
        <Entity x={8} y={20} w={150} name="marks" fields={['student_id', 'maths', 'physics', 'chemistry']} seed={s('marks')} />
        <Entity x={182} y={20} w={150} name="people" fields={['id', 'name', 'city']} seed={s('people')} />
        <Line pts={[[83, 140], [83, 168], [170, 168]]} seed={s('m1')} />
        <Line pts={[[257, 116], [257, 168], [170, 168]]} seed={s('m2')} />
        <Arrow pts={[[170, 168], [170, 238]]} seed={s('join')} />
        <Label kind="mono" anchor="start" x={180} y={196}>JOIN +</Label>
        <Label kind="mono" anchor="start" x={180} y={214}>maths+physics</Label>
        <Label kind="mono" anchor="start" x={180} y={232}>+chemistry</Label>
        <Entity x={84} y={242} w={172} name="results_mv" fields={['name', 'city', 'maths', 'physics', 'chemistry', 'total']} seed={s('mv')} mark={5} />
        <Line pts={[[262, 398], [272, 398]]} weight="thin" seed={s('dc-lead')} />
        <Label anchor="start" x={276} y={394}>derived</Label>
        <Label anchor="start" x={276} y={410}>column</Label>
        <Arrow dashed pts={[[24, 140], [24, 330], [82, 330]]} seed={s('refresh')} />
        <Label anchor="start" x={30} y={214}>refresh ①</Label>
        <Arrow tone="blue" pts={[[170, 470], [170, 414]]} seed={s('q')} />
        <Label tone="blue" x={170} y={494}>queries hit the view,</Label>
        <Label tone="blue" x={170} y={512}>not the tables</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f1e-${k}`;
  const marks = [{ name: 'student_id', w: 92 }, { name: 'maths', w: 56 }, { name: 'physics', w: 66 }, { name: 'chemistry', w: 82 }];
  const people = [{ name: 'id', w: 36 }, { name: 'name', w: 64 }, { name: 'city', w: 70 }];
  const mv = [{ name: 'name', w: 60 }, { name: 'city', w: 62 }, { name: 'maths', w: 56 }, { name: 'physics', w: 66 }, { name: 'chemistry', w: 82 }, { name: 'total', w: 58 }];
  // marks: x 40–336, people: x 470–640, view: 384 wide centred at 350 -> x 158–542
  return (
    <Fig id="f1e" w={700} h={372} title={title} desc={DESC}>
      <Table x={40} y={34} cols={marks} rows={[['1', '92', '78', '85'], ['2', '64', '81', '70']]} name="marks" seed={s('marks')} />
      <Table x={470} y={34} cols={people} rows={[['1', 'Asha', 'Pune'], ['2', 'Ravi', 'Delhi']]} name="people" seed={s('people')} />
      <Line pts={[[188, 106], [188, 136], [350, 136]]} seed={s('m1')} />
      <Line pts={[[555, 106], [555, 136], [350, 136]]} seed={s('m2')} />
      <Arrow pts={[[350, 136], [350, 206]]} seed={s('join')} />
      <Label kind="mono" anchor="start" x={360} y={178}>JOIN + maths+physics+chemistry</Label>
      <Table x={158} y={214} cols={mv} rows={[['Asha', 'Pune', '92', '78', '85', '255'], ['Ravi', 'Delhi', '64', '81', '70', '215']]} name="results_mv" seed={s('mv')} mark={5} />
      <SpanBracket x0={486} x1={540} y={296} down={false} seed={s('dc')} />
      <Label x={513} y={316}>derived column</Label>
      <Arrow dashed pts={[[40, 82], [22, 82], [22, 250], [154, 250]]} seed={s('refresh')} />
      <Label anchor="start" x={30} y={170}>refresh ①</Label>
      <Arrow tone="blue" pts={[[690, 250], [546, 250]]} seed={s('q')} />
      <Label tone="blue" x={634} y={276}>queries hit</Label>
      <Label tone="blue" x={634} y={293}>the view,</Label>
      <Label tone="blue" x={634} y={310}>not the tables</Label>
    </Fig>
  );
}

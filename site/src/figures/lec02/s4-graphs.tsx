// Lecture 04 (lec02), chapter 4 "Graph databases": Fig 4·a (an adjacency list is the whole idea), Fig 4·b (a cohort),
// Fig 4·c (a new edge outside the cluster, with a phone layout), Fig 4·d (three hops: one traversal vs self-joins,
// two stacking panels) and the §4 rule-box sketch. Specs: lectures/lec02/lesson/figures.md §4.
import React from 'react';
import {
  Arrow, Boundary, Bracket, Dot, Edge, Fig, Hulk, Jar, Label, Line, Mark, Node, PhoneGlyph, Tick, Box, type Layout, type Pt,
} from './s4-graphs-parts';

/* ------------------------------------------------------------------ Fig 4·a */

export function AdjacencyList() {
  const id = 'l02-fig4a';
  const N: Record<string, Pt> = { A: [60, 64], B: [190, 46], C: [92, 156], D: [222, 140] };
  const E: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D']];
  const lines = ['A: B, C', 'B: A, D', 'C: A, D', 'D: B, C'];
  return (
    <Fig id={id} w={340} h={336} title="An adjacency list is the whole idea"
      desc="Four nodes A, B, C and D with edges A–B, A–C, B–D and C–D. Below, the same graph as an adjacency list: A: B, C; B: A, D; C: A, D; D: B, C. A graph database stores each node's adjacency list as is and puts data APIs on top. Using one only to store follow lists is the Hulk opening a glass jar.">
      {E.map(([a, b]) => <Edge key={a + b} a={N[a]} b={N[b]} ra={17} rb={17} seed={`${id}-e${a}${b}`} />)}
      {Object.entries(N).map(([k, p]) => <Node key={k} x={p[0]} y={p[1]} r={17} label={k} seed={`${id}-n${k}`} />)}
      <Label anchor="start" x={22} y={210}>+ data APIs on top</Label>
      <Box x={22} y={220} w={112} h={104} seed={`${id}-box`} />
      {lines.map((l, i) => <Label key={l} kind="mono" anchor="start" x={36} y={246 + i * 22}>{l}</Label>)}
      <Line weight="thin" pts={[[142, 228], [150, 228], [150, 316], [142, 316]]} seed={`${id}-brace`} />
      <Label anchor="start" x={156} y={268}>stored</Label>
      <Label anchor="start" x={156} y={286}>as is</Label>
      <Jar x={244} y={238} seed={`${id}-jar`} />
      <Hulk x={292} y={224} w={36} h={58} seed={`${id}-hulk`} />
      <Label x={284} y={306} size={13}>the Hulk opening</Label>
      <Label x={284} y={324} size={13}>a glass jar</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b */

export function Cohort() {
  const id = 'l02-fig4b';
  const air: Pt = [176, 46], phone: Pt = [176, 282];
  const us: Pt[] = [[40, 172], [108, 166], [176, 160], [244, 166], [312, 172]];
  const names = ['u1', 'u2', 'u3', 'u4', 'u5'];
  return (
    <Fig id={id} w={352} h={392} title="A cohort"
      desc="A product node, iPhone, with five buyers u1 to u5 joined to it by 'bought' edges: everyone who bought one is a set of similar users. Buyer u3 gains a blue edge to a new product node, AirPods. Dashed arrows from AirPods to u1, u2, u4 and u5 show AirPods being recommended to the rest of the cohort. This is one level; real cohorts go two or three levels deep.">
      {us.map((u, i) => <Edge key={'b' + i} a={u} b={phone} ra={16} rb={33} seed={`${id}-b${i}`} />)}
      <Label x={70} y={238} size={13}>bought</Label>
      <Edge a={us[2]} b={air} ra={16} rb={36} tone="blue" seed={`${id}-buy`} />
      {[0, 1, 3, 4].map((i) => {
        const sx = air[0] + (i < 2 ? -24 : 24) + (i === 0 ? -6 : i === 4 ? 6 : 0);
        return <Edge key={'r' + i} a={[sx, air[1] + 14]} b={us[i]} ra={18} rb={18} dashed head="end" seed={`${id}-r${i}`} />;
      })}
      <Label anchor="end" x={92} y={96} size={13}>recommend</Label>
      <Node x={air[0]} y={air[1]} r={36} label="AirPods" seed={`${id}-air`} size={13} />
      <Node x={phone[0]} y={phone[1]} r={33} label="iPhone" seed={`${id}-iph`} size={13} />
      {us.map((u, i) => <Node key={names[i]} x={u[0]} y={u[1]} r={16} label={names[i]} tone={i === 2 ? 'blue' : 'ink'} seed={`${id}-u${i}`} size={13} />)}
      <Label x={176} y={344} size={13}>similar users = everyone who bought one</Label>
      <Label muted x={176} y={362} size={13}>one level here;</Label>
      <Label muted x={176} y={380} size={13}>real cohorts go 2–3 levels deep</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c */

type Merchant = { name: string; ang: number; at: 'left' | 'right' | 'above' | 'below' };

function Cluster({ c, r, rx, ry, out, merchants, seed, outLabel, red }: {
  c: Pt; r: number; rx: number; ry: number; out: Pt; merchants: Merchant[]; seed: string;
  outLabel: { x: number; y: number; anchor: 'start' | 'middle' | 'end' }; red: { x: number; y: number; anchor: 'start' | 'middle' | 'end' };
}) {
  const pos = (a: number): Pt => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] + r * Math.sin((a * Math.PI) / 180)];
  return (
    <g>
      <Boundary cx={c[0]} cy={c[1]} rx={rx} ry={ry} seed={seed + '-bd'} />
      {merchants.map((m) => <Edge key={'e' + m.name} a={c} b={pos(m.ang)} ra={20} rb={9} seed={`${seed}-e${m.name}`} />)}
      <Edge a={c} b={out} ra={20} rb={11} tone="red" seed={seed + '-new'} />
      {merchants.map((m) => { const p = pos(m.ang); return <Node key={m.name} x={p[0]} y={p[1]} r={9} label={m.name} labelAt={m.at} seed={`${seed}-m${m.name}`} />; })}
      <Node x={c[0]} y={c[1]} r={20} label="you" seed={seed + '-you'} />
      <Node x={out[0]} y={out[1]} r={11} tone="red" seed={seed + '-out'} />
      <Label kind="mono" anchor={outLabel.anchor} x={outLabel.x} y={outLabel.y}>overseas merchant</Label>
      <Label tone="red" anchor={red.anchor} x={red.x} y={red.y}>a new edge:</Label>
      <Label tone="red" anchor={red.anchor} x={red.x} y={red.y + 19}>suspicious</Label>
    </g>
  );
}

export function FraudEdge({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-fig4c-p' : 'l02-fig4c';
  const title = 'A new edge outside the cluster';
  const desc = "A customer's history forms a tight cluster of domestic merchants: grocery, fuel, rent, telecom and pharmacy. A sudden international transaction is a new red edge to an overseas merchant outside that cluster. On the timeline the card payment and OTP lead to a graph check, a decision and routing to an executive, all inside a red 200 ms SLA as relayed in class; the executive's call asking 'is this you?' comes after the decision.";
  if (P) {
    const steps = ['card + OTP', 'graph check', 'decide', 'route to an executive', 'call: is this you?'];
    const y0 = 440, gap = 50;
    return (
      <Fig id={id} w={340} h={720} title={title} desc={desc}>
        <Label x={170} y={26}>domestic: a closely knit cluster</Label>
        <Cluster c={[170, 162]} r={70} rx={150} ry={118} out={[302, 306]} seed={id}
          merchants={[{ name: 'fuel', ang: 180, at: 'left' }, { name: 'grocery', ang: -120, at: 'above' }, { name: 'telecom', ang: -60, at: 'above' },
            { name: 'rent', ang: 0, at: 'right' }, { name: 'pharmacy', ang: 120, at: 'below' }]}
          outLabel={{ x: 334, y: 342, anchor: 'end' }} red={{ x: 150, y: 306, anchor: 'middle' }} />
        <Label muted x={170} y={378}>50–60 parameters per transaction,</Label>
        <Label muted x={170} y={397}>by the instructor's account</Label>
        <Arrow pts={[[40, y0 - 14], [40, y0 + gap * 4 + 14]]} seed={id + '-tl'} />
        {steps.map((s, i) => (
          <g key={s}>
            <Dot x={40} y={y0 + i * gap} />
            <Label kind="mono" anchor="start" x={58} y={y0 + i * gap + 5}>{s}</Label>
          </g>
        ))}
        <PhoneGlyph x={248} y={y0 + gap * 4 - 22} seed={id + '-ph'} />
        <Bracket x={286} y0={y0 + gap - 10} y1={y0 + gap * 3 + 10} label="200 ms SLA" seed={id + '-br'} size={14} />
        <Label muted x={170} y={y0 + gap * 4 + 52}>200 ms: as relayed in class</Label>
      </Fig>
    );
  }
  const st = [480, 572, 664, 756, 846];
  const lab: string[][] = [['card', '+ OTP'], ['graph', 'check'], ['decide'], ['route to', 'executive'], ['call']];
  const by = 186;
  return (
    <Fig id={id} w={880} h={356} title={title} desc={desc}>
      <Label x={176} y={26}>domestic: a closely knit cluster</Label>
      <Cluster c={[176, 170]} r={78} rx={160} ry={128} out={[392, 62]} seed={id}
        merchants={[{ name: 'fuel', ang: 180, at: 'left' }, { name: 'grocery', ang: -125, at: 'above' }, { name: 'pharmacy', ang: 125, at: 'below' },
          { name: 'telecom', ang: 55, at: 'below' }, { name: 'rent', ang: 0, at: 'right' }]}
        outLabel={{ x: 436, y: 38, anchor: 'middle' }} red={{ x: 338, y: 134, anchor: 'start' }} />
      <Label muted x={176} y={326}>50–60 parameters per transaction,</Label>
      <Label muted x={176} y={346}>by the instructor's account</Label>
      <Arrow pts={[[456, by], [872, by]]} seed={id + '-tl'} />
      {st.map((x, i) => (
        <g key={x}>
          <Dot x={x} y={by} />
          {lab[i].map((l, j) => <Label key={l} kind="mono" x={x} y={by - 46 + j * 20 + (lab[i].length === 1 ? 20 : 0)}>{l}</Label>)}
        </g>
      ))}
      <PhoneGlyph x={838} y={by + 16} seed={id + '-ph'} />
      <Label anchor="end" x={874} y={by + 70}>“is this you?”</Label>
      <Line tone="red" pts={[[550, 112], [550, 100], [778, 100], [778, 112]]} seed={id + '-br'} />
      <Label tone="red" x={664} y={88}>200 ms SLA</Label>
      <Label muted x={664} y={62}>as relayed in class</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·d (two panels) */

export function ThreeHopsGraph() {
  const id = 'l02-fig4d-a';
  const ys = [44, 116, 188, 260];
  return (
    <Fig id={id} w={340} h={344} title="Three hops in a graph: one traversal"
      desc="Nodes A, B, C and D in a chain. The path from A to D, three levels deep, is drawn in blue: in a graph database it is one traversal.">
      {ys.slice(1).map((y, i) => <Edge key={y} a={[90, ys[i]]} b={[90, y]} ra={17} rb={17} tone="blue" head="end" seed={`${id}-h${i}`} />)}
      {['A', 'B', 'C', 'D'].map((k, i) => <Node key={k} x={90} y={ys[i]} r={17} label={k} tone={'ink'} seed={`${id}-n${k}`} />)}
      {[1, 2, 3].map((h, i) => <Label key={h} muted anchor="start" x={108} y={(ys[i] + ys[i + 1]) / 2 + 5}>{`hop ${h}`}</Label>)}
      <Label tone="blue" anchor="start" x={186} y={146}>one</Label>
      <Label tone="blue" anchor="start" x={186} y={166}>traversal</Label>
      <Label kind="title" x={170} y={330}>graph</Label>
    </Fig>
  );
}

export function ThreeHopsSql() {
  const id = 'l02-fig4d-b';
  const ys = [40, 110, 180];
  return (
    <Fig id={id} w={340} h={344} title="Three hops in SQL: self-joins, rewritten per depth"
      desc="Three copies of the same edges(from_id, to_id) table, aliased e1, e2 and e3, chained by joins on e1.to_id = e2.from_id and e2.to_id = e3.from_id. N levels take N self-joins and the query is rewritten for every depth; ten levels means nine self-joins, which is messy. SQL can also recurse: see the note below the figure.">
      <Label kind="mono" anchor="start" x={14} y={20}>edges(from_id, to_id)</Label>
      {ys.map((y, i) => <Box key={y} x={14} y={y} w={60} h={30} label={`e${i + 1}`} seed={`${id}-t${i}`} />)}
      {[0, 1].map((i) => (
        <g key={i}>
          <Line pts={[[44, ys[i] + 30], [44, ys[i + 1]]]} seed={`${id}-j${i}`} />
          <Label kind="mono" anchor="start" x={84} y={ys[i] + 45} size={13.5}>JOIN</Label>
          <Label kind="mono" anchor="start" x={84} y={ys[i] + 63} size={13.5}>{`e${i + 1}.to_id = e${i + 2}.from_id`}</Label>
        </g>
      ))}
      <Label tone="red" anchor="start" x={14} y={240}>N levels = N self-joins,</Label>
      <Label tone="red" anchor="start" x={14} y={259}>rewrite per depth</Label>
      <Label anchor="start" x={14} y={286}>10 levels → 9 self-joins: messy</Label>
      <Label muted anchor="start" x={14} y={308} size={13}>SQL can also recurse: see “More precisely”</Label>
      <Label kind="title" x={170} y={334}>relational</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §4 */

export function Rule4({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-rule4-p' : 'l02-rule4';
  const W = P ? 320 : 480;
  const half = W / 2;
  const jx = half / 2 - 36;
  const px = P ? [half + 22, half + 66, half + 110, half + 154] : [half + 36, half + 96, half + 156, half + 216];
  return (
    <Fig id={id} w={W} h={150} title="Graph algorithms, not graph-shaped data"
      desc="Left: the Hulk next to a glass jar, crossed out: it looks like a graph is not a reason. Right: a three-hop path A to B to C to D with a green tick: graph algorithms are.">
      <Jar x={jx} y={30} w={26} h={36} seed={id + '-jar'} />
      <Hulk x={jx + 46} y={20} w={32} h={50} seed={id + '-hulk'} />
      <Mark a={[jx - 12, 12]} b={[jx + 92, 90]} weight="heavy" seed={id + '-x1'} />
      <Mark a={[jx + 92, 12]} b={[jx - 12, 90]} weight="heavy" seed={id + '-x2'} />
      <Label x={half / 2} y={122} size={13}>“it looks like a graph” ✗</Label>
      {px.slice(1).map((x, i) => <Edge key={x} a={[px[i], 52]} b={[x, 52]} ra={13} rb={13} head="end" seed={`${id}-p${i}`} />)}
      {['A', 'B', 'C', 'D'].map((k, i) => <Node key={k} x={px[i]} y={52} r={13} label={k} seed={`${id}-n${k}`} size={13} />)}
      <Tick x={px[3] + 4} y={98} s={9} seed={id + '-tk'} />
      <Label x={(px[0] + px[3]) / 2} y={122} size={13}>graph algorithms ✓</Label>
    </Fig>
  );
}

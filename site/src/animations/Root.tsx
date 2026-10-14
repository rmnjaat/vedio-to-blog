// Remotion Studio / CLI root for the site's clips (optional: needs `@remotion/cli`, see README.md).
// Every clip folder clips/<id>/ (timeline.ts + one capitalised <Name>.tsx) is registered automatically, in paper
// and blackboard (and the phone layout when META.phone is set). Rendering and checking happen in the lab.
import React from 'react';
import { Composition } from 'remotion';

type MetaLite = { id: string; durationInFrames: number; fps: number; width: number; height: number; phone?: { width: number; height: number } };
const comps = (meta: MetaLite, component: React.FC<any>) =>
  (['wide', 'phone'] as const).flatMap((layout) => layout === 'phone' && !meta.phone ? [] :
    (['paper', 'blackboard'] as const).map((theme) => {
      const d = layout === 'phone' ? meta.phone! : meta;
      const id = meta.id + (layout === 'phone' ? '-phone' : '') + (theme === 'paper' ? '' : '-dark');
      return <Composition key={id} id={id} component={component} durationInFrames={meta.durationInFrames} fps={meta.fps}
        width={d.width} height={d.height} defaultProps={{ theme, layout }} />;
    }));

declare const require: { context: (dir: string, deep: boolean, re: RegExp) => { keys: () => string[]; (k: string): any } };
const metas = require.context('./clips', true, /^\.\/[^/]+\/timeline\.ts$/);
const files = require.context('./clips', true, /^\.\/[^/]+\/[A-Z][^/]*\.tsx$/);
const dir = (k: string) => k.split('/')[1];

export const RemotionRoot: React.FC = () => <>{metas.keys().flatMap((k) => {
  const c = files.keys().filter((x) => dir(x) === dir(k));
  return c.length === 1 ? comps(metas(k).META, files(c[0]).default) : [];
})}</>;

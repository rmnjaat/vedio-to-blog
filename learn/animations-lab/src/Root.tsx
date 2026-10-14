import React from 'react';
import {Composition} from 'remotion';
import './fonts';

// Every clip folder src/clips/<id>/ (timeline.ts exporting META + one capitalised <Name>.tsx with a default export)
// is registered automatically, so lectures built in parallel never edit this file.
// Composition ids: <id>, <id>-dark, and for clips with a portrait phone layout (META.phone) <id>-phone, <id>-phone-dark.
// scripts/check.mts does not use this root: it bundles a generated one-clip entry (src/.entries/<id>.tsx), so a clip
// that is half-written in another lecture can never break your render.
import {compositionsFor, type ClipMetaLite} from './compositions';

declare const require: {context: (dir: string, deep: boolean, re: RegExp) => {keys: () => string[]; (k: string): any}};
const metas = require.context('./clips', true, /^\.\/[^/]+\/timeline\.ts$/);
const comps = require.context('./clips', true, /^\.\/[^/]+\/[A-Z][^/]*\.tsx$/);
const dirOf = (k: string) => k.split('/')[1];
const CLIPS = metas.keys().flatMap((k) => {
  const c = comps.keys().filter((x) => dirOf(x) === dirOf(k));
  return c.length === 1 ? [{meta: metas(k).META as ClipMetaLite, component: comps(c[0]).default as React.FC<any>}] : [];
});

export const RemotionRoot: React.FC = () => <>{CLIPS.map((c) => compositionsFor(c.meta, c.component))}</>;

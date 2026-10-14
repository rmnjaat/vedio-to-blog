// Clip registry, discovered automatically: every folder src/animations/clips/<id>/ with a timeline.ts (exports META)
// and one component file <Name>.tsx (capitalised, default export) is a clip. Nothing to register by hand, so
// lectures built in parallel never edit a shared file. Each clip loads lazily: every clip is its own chunk and pages
// without clips ship no Remotion code.
//   meta:      clips/<id>/timeline.ts  -> { META }   (pure TS, also read at build time)
//   component: clips/<id>/<Name>.tsx   -> { default: React.FC<{theme, layout}> }
import type { ComponentType } from 'react';

export type ClipTheme = 'paper' | 'blackboard';
export type ClipMeta = {
  id: string; title: string; width: number; height: number; fps: number; durationInFrames: number; posterFrame: number;
  chapters: { label: string; frame: number }[];
  captions: { from: number; step?: number; color?: string; text: string }[];
  alt: string; ledger?: string[];
  /** optional portrait composition used at <= 640px: the component gets `layout: 'phone'` and this canvas size */
  phone?: { width: number; height: number };
};
type ClipComponent = ComponentType<{ theme: ClipTheme; layout?: 'wide' | 'phone' }>;
type Entry = {
  meta: () => Promise<{ META: ClipMeta }>;
  component: () => Promise<{ default: ClipComponent }>;
};

const METAS = import.meta.glob<{ META: ClipMeta }>('./clips/*/timeline.ts');
const COMPONENTS = import.meta.glob<{ default: ClipComponent }>('./clips/*/[A-Z]*.tsx');
const idOf = (key: string) => key.split('/')[2];

export const CLIPS: Record<string, Entry> = {};
for (const [key, meta] of Object.entries(METAS)) {
  const id = idOf(key);
  const comp = Object.keys(COMPONENTS).filter((k) => idOf(k) === id);
  if (comp.length !== 1) continue; // a clip folder needs exactly one component file
  CLIPS[id] = { meta, component: COMPONENTS[comp[0]] };
}

export async function loadMeta(id: string): Promise<ClipMeta> {
  const e = CLIPS[id];
  if (!e) throw new Error(`AnimationClip: unknown clip "${id}". Its folder src/animations/clips/<id>/ needs timeline.ts and one <Name>.tsx`);
  return (await e.meta()).META;
}

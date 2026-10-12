// Clip registry: the ONLY place the site learns about a composition.
// Each entry loads lazily, so every clip is its own chunk and pages without clips ship no Remotion code.
//   meta:      () => import('./clips/<id>/timeline')   -> { META }   (pure TS, also read at build time)
//   component: () => import('./clips/<id>/<Name>')      -> { default: React.FC<{theme}> }
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
type Entry = {
  meta: () => Promise<{ META: ClipMeta }>;
  component: () => Promise<{ default: ComponentType<{ theme: ClipTheme; layout?: 'wide' | 'phone' }> }>;
};

export const CLIPS: Record<string, Entry> = {
  'l01-replica-lag': {
    meta: () => import('./clips/l01-replica-lag/timeline'),
    component: () => import('./clips/l01-replica-lag/ReplicaLag'),
  },
  'demo-replica-pull': {
    meta: () => import('./clips/demo-replica-pull/timeline'),
    component: () => import('./clips/demo-replica-pull/ReplicaPull'),
  },
  'l01-cascade': {
    meta: () => import('./clips/l01-cascade/timeline'),
    component: () => import('./clips/l01-cascade/Cascade'),
  },
  'l01-queue-vs-stream': {
    meta: () => import('./clips/l01-queue-vs-stream/timeline'),
    component: () => import('./clips/l01-queue-vs-stream/QueueVsStream'),
  },
  'l01-count-race': {
    meta: () => import('./clips/l01-count-race/timeline'),
    component: () => import('./clips/l01-count-race/CountRace'),
  },
  'l01-polling': {
    meta: () => import('./clips/l01-polling/timeline'),
    component: () => import('./clips/l01-polling/Polling'),
  },
};

export async function loadMeta(id: string): Promise<ClipMeta> {
  const e = CLIPS[id];
  if (!e) throw new Error(`AnimationClip: unknown clip "${id}". Register it in src/animations/registry.ts`);
  return (await e.meta()).META;
}

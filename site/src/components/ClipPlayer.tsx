// React island that hosts a Remotion clip inside an <AnimationClip> figure.
// - Shows the poster frame (theme-aware) until the reader presses Play; the Player mounts only then.
// - Custom notebook controls: play/pause, scrub, time, 0.5x speed; chapter chips (rendered by Astro) seek.
// - prefers-reduced-motion: never autoplays; shows the still + opens the text version; "Play anyway" is offered.
// - The Player is not re-rendered per frame: <Controls> subscribes to the PlayerRef itself.
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PlayerRef } from '@remotion/player';
import { CLIPS, type ClipMeta, type ClipTheme } from '../animations/registry';

type PlayerMod = typeof import('@remotion/player');

const fmt = (frames: number, fps: number) => {
  const s = Math.max(0, Math.round(frames / fps));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

function currentTheme(): ClipTheme {
  const t = document.documentElement.dataset.theme;
  if (t === 'dark') return 'blackboard';
  if (t === 'light') return 'paper';
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'blackboard' : 'paper';
}
function useClipTheme(): ClipTheme {
  const [theme, setTheme] = useState<ClipTheme>('paper');
  useEffect(() => {
    const sync = () => setTheme(currentTheme());
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', sync);
    return () => { mo.disconnect(); mq.removeEventListener?.('change', sync); };
  }, []);
  return theme;
}
function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = matchMedia(q);
    const sync = () => setM(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, [q]);
  return m;
}
function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setR(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);
  return r;
}

const PlayIcon = ({ pause }: { pause?: boolean }) => (
  <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <circle cx="14" cy="14" r="12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    {pause ? <path d="M10.6 9v10M17.4 9v10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /> : <path d="M11 8.6 L19.6 14 L11 19.4 Z" fill="currentColor" />}
  </svg>
);

function Controls({ playerRef, meta, rate, setRate, say }: {
  playerRef: React.RefObject<PlayerRef | null>; meta: ClipMeta; rate: number; setRate: (r: number) => void; say: (s: string) => void;
}) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    const onFrame = (e: { detail: { frame: number } }) => setFrame(e.detail.frame);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    p.addEventListener('frameupdate', onFrame);
    p.addEventListener('seeked', onFrame);
    p.addEventListener('play', onPlay);
    p.addEventListener('pause', onPause);
    p.addEventListener('ended', onPause);
    setPlaying(p.isPlaying());
    setFrame(p.getCurrentFrame());
    return () => {
      p.removeEventListener('frameupdate', onFrame);
      p.removeEventListener('seeked', onFrame);
      p.removeEventListener('play', onPlay);
      p.removeEventListener('pause', onPause);
      p.removeEventListener('ended', onPause);
    };
  }, [playerRef]);
  // mark the current chapter chip
  useEffect(() => {
    const fig = document.getElementById(meta.id + '-fig');
    const chips = fig ? Array.from(fig.querySelectorAll<HTMLButtonElement>('.chips button')) : [];
    let cur = -1;
    chips.forEach((b, i) => { if (frame >= Number(b.dataset.frame)) cur = i; });
    chips.forEach((b, i) => (i === cur ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
  }, [frame, meta.id]);

  const last = meta.durationInFrames - 1;
  return (
    <div className="clip-controls">
      <button type="button" className="btn ctl-play" onClick={() => {
        const p = playerRef.current; if (!p) return;
        if (p.isPlaying()) p.pause(); else { if (p.getCurrentFrame() >= last) p.seekTo(0); p.play(); }
      }} aria-label={playing ? 'Pause clip' : 'Play clip'}>
        <PlayIcon pause={playing} /><span className="ctl-lbl">{playing ? 'Pause' : 'Play'}</span>
      </button>
      <input className="scrub" type="range" min={0} max={last} step={1} value={frame} aria-label="Position in clip"
        aria-valuetext={`${fmt(frame, meta.fps)} of ${fmt(meta.durationInFrames, meta.fps)}`}
        onChange={(e) => { const p = playerRef.current; if (!p) return; p.seekTo(Number(e.currentTarget.value)); }} />
      <span className="ctl-time hand">{fmt(frame, meta.fps)} / {fmt(meta.durationInFrames, meta.fps)}</span>
      <button type="button" className="btn ghost ctl-rate" aria-pressed={rate === 0.5}
        onClick={() => { const r = rate === 0.5 ? 1 : 0.5; setRate(r); say(r === 0.5 ? 'Half speed.' : 'Normal speed.'); }}>
        0.5×
      </button>
    </div>
  );
}

export default function ClipPlayer({ clip, meta, posters }: {
  clip: string; meta: ClipMeta;
  /** pre-rendered poster images (public/clips/<id>/poster-<theme>[-phone].png, made by scripts/clip-posters.mjs).
   *  They are in the static HTML (both themes, CSS picks one), so the poster shows before hydration and without JS.
   *  Without them the poster frame is drawn live once the island hydrates. */
  posters?: Partial<Record<ClipTheme | 'paper-phone' | 'blackboard-phone', string>>;
}) {
  const theme = useClipTheme();
  const reduced = useReducedMotion();
  const [mod, setMod] = useState<PlayerMod | null>(null);
  const [started, setStarted] = useState(false);
  const [rate, setRate] = useState(1);
  const [status, setStatus] = useState('');
  const pendingSeek = useRef<number | null>(null);
  const playerRef = useRef<PlayerRef>(null);
  const lazyComponent = useCallback(() => CLIPS[clip].component(), [clip]);
  const narrow = useMedia('(max-width: 640px)');
  const phone = !!(narrow && meta.phone);
  const dims = phone && meta.phone ? meta.phone : { width: meta.width, height: meta.height };
  const inputProps = useMemo(() => ({ theme, layout: phone ? 'phone' as const : 'wide' as const }), [theme, phone]);
  // ?capture-posters: draw the live poster even if images exist (used by scripts/clip-posters.mjs)
  const [capture, setCapture] = useState(false);
  useEffect(() => { setCapture(/[?&]capture-posters\b/.test(location.search)); }, []);
  const fig = () => document.getElementById(meta.id + '-fig');

  // load the player module (+ fonts) once the island is visible, so the poster can be drawn
  useEffect(() => {
    let on = true;
    Promise.all([import('@remotion/player'), document.fonts ? document.fonts.ready : Promise.resolve()]).then(([m]) => { if (on) setMod(m); });
    return () => { on = false; };
  }, []);

  // reduced motion: open the text version of the clip
  useEffect(() => {
    const d = fig()?.querySelector<HTMLDetailsElement>('details.clip-text');
    if (d && reduced) d.open = true;
  }, [reduced]);

  const start = useCallback((at?: number) => {
    pendingSeek.current = at ?? null;
    setStarted(true);
  }, []);

  // chapter chips (static HTML from Astro) seek / start the clip
  useEffect(() => {
    const chips = Array.from(fig()?.querySelectorAll<HTMLButtonElement>('.chips button') ?? []);
    const handlers = chips.map((b) => {
      const h = () => {
        const fr = Number(b.dataset.frame);
        setStatus(`Jumped to ${fmt(fr, meta.fps)}: ${b.dataset.label}.`);
        const p = playerRef.current;
        if (p) { p.seekTo(fr); if (!reduced) p.play(); } else start(fr);
      };
      b.addEventListener('click', h);
      return h;
    });
    return () => chips.forEach((b, i) => b.removeEventListener('click', handlers[i]));
  }, [start, reduced, meta.fps]);

  // once the Player is mounted: apply a pending seek and play
  const onRef = useCallback((p: PlayerRef | null) => {
    playerRef.current = p;
    if (!p) return;
    requestAnimationFrame(() => {
      if (pendingSeek.current !== null) p.seekTo(pendingSeek.current);
      pendingSeek.current = null;
      p.play();
    });
  }, []);

  const hasPosters = !capture && !!(posters?.paper && posters?.blackboard);
  const dur = fmt(meta.durationInFrames, meta.fps);
  const common = { lazyComponent, compositionWidth: dims.width, compositionHeight: dims.height, inputProps, style: { width: '100%', height: '100%' } };
  const pic = (t: ClipTheme) => (
    <picture className={'poster-' + t}>
      {meta.phone && posters?.[`${t}-phone` as const] && <source media="(max-width: 640px)" srcSet={posters[`${t}-phone` as const]} />}
      <img src={posters![t]} alt="" width={meta.width} height={meta.height} loading="lazy" decoding="async" />
    </picture>
  );

  return (
    <div className="clip-player" data-started={started || undefined}>
      <div className="clip-box">
        <div className={'stage sheet' + (meta.phone ? ' has-phone' : '')}
          style={{ aspectRatio: `${meta.width} / ${meta.height}`, ...(meta.phone ? { ['--ar-phone' as string]: `${meta.phone.width} / ${meta.phone.height}` } : {}) }}>
          {started && mod ? (
            <mod.Player ref={onRef} {...common} fps={meta.fps} durationInFrames={meta.durationInFrames}
              controls={false} clickToPlay={false} loop={false} playbackRate={rate} moveToBeginningWhenEnded={false}
            />
          ) : hasPosters ? (
            <>{pic('paper')}{pic('blackboard')}</>
          ) : mod ? (
            <mod.Thumbnail {...common} frameToDisplay={meta.posterFrame} fps={meta.fps} durationInFrames={meta.durationInFrames} />
          ) : null}
        </div>
        {!started && (
          <button className="play" type="button" onClick={() => start()} aria-describedby={meta.id + '-cap'}>
            <PlayIcon />
            <span className="lbl">{reduced ? 'Play anyway' : 'Play clip'}</span> <span className="dur">{dur}</span>
          </button>
        )}
      </div>
      {started && mod && <Controls playerRef={playerRef} meta={meta} rate={rate} setRate={setRate} say={setStatus} />}
      {reduced && !started && <p className="clip-status hand">Reduced motion is on: the still shows the end state, and the steps are written out below.</p>}
      <p className="clip-status hand" role="status">{status}</p>
    </div>
  );
}

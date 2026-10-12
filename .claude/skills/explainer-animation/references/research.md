# Research behind the rules

Sources were opened on 2026-10-12 unless marked. Items marked [snippet] were read only from search-result excerpts, and [unverified] items come from memory. Earlier project research is in `learn/research/brief.md` §4 and `learn/research/psychology.md`.

## Does animation help?
- **Tversky, Morrison & Bétrancourt (2002)** found that animations are often too fast or too complex to perceive accurately. People think of continuous processes as sequences of discrete steps, and most fair comparisons show no gain over equivalent static graphics. https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf → we animate only dynamics, split clips into beats, and let learners control playback.
- **Höffler & Leutner (2007)** found an overall gain of d = 0.37, rising to d ≈ 0.40 when the animation is *representational*, meaning it shows the thing that changes. https://www.leibniz-ipn.de/en/research/publications/instructional-animation-versus-static-pictures-a-meta-analysis → see `choosing.md`.
- **Berney & Bétrancourt (2016)** found a small effect, g ≈ 0.23. https://tecfa.unige.ch/perso/sandra/pdf/Earli2016_berney_betrancourt_FINAL.pdf

## Segmenting, pacing and transient information
- **Mayer, segmenting principle.** The lightning lesson was split into 16 segments of "one or two sentences and eight to ten seconds of animation" with a Continue button: d = 0.98, and a 2014 handbook median of d = 0.79. [snippet] https://cambridge.org/core/books/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning-segmenting-pretraining-and-modality-principles/DD24C2F48B9B1277CE59F78276110258 → one causal step per beat, about 3–10 s, with chapter chips.
- **Spanjers, van Gog & van Merriënboer (2010).** Segmenting works for two reasons: pauses give time to process, and boundaries cue the structure of events. Boundaries must sit at real event boundaries. The benefit is mainly for novices. https://link.springer.com/doi/10.1007/s10648-010-9135-6 → beats start at events, never on a timer.
- **Transient information effect** (Sweller, Ayres & Kalyuga 2011; Ayres & Paas 2007): learning suffers when information disappears before it has been processed. → ghost past states, keep arrows drawn, and end on a static summary that is also the poster.

## Signalling and salience
- **de Koning, Tabbers, Rikers & Paas (2009)** sort cues into three kinds: *selection* (where to look), *organisation* (structure, numbering) and *integration* (relations). Cues need to be designed for animation. https://link.springer.com/article/10.1007/s10648-009-9098-7 → we use circled step numbers (organisation), re-inking in marker colours (selection), and labels on the element itself (integration).
- **Lowe and Boucheix** describe *perceptual dominance*: learners look at what is salient, especially whatever moves differently from its surroundings, not at what matters. A *spreading-colour* cue along a causal path beat arrows and no cue. [snippet] https://tecfa.unige.ch/tecfa/teaching/methodo/boucheix-lowe2012.pdf → the important thing is the only thing moving, and the pen re-inks the path in colour as the message travels.
- **Signalling meta-analyses** (Schneider et al. 2018, Richter et al. 2016, Alpizar et al. 2020) report reliable effects on retention and smaller ones on transfer. Spatial-temporal cues beat purely physical cues for transfer. [snippet] https://journal.psych.ac.cn/xlxb/CN/Y2016/V48/I5/540

## Coherence, redundancy and captions
- **Coherence:** about 23/23 tests, d ≈ 0.86. **Redundancy:** about 16/16 tests, d ≈ 0.86. [snippet] Short highlighted text next to the graphic is the accepted exception. → no decoration, labels sit next to their parts, and one caption line per beat. With no narration, captions are the only verbal channel, so redundancy doesn't apply.
- **Reading speed:** the Netflix EN-US style guide allows ≤ 20 characters per second for adults, ≤ 17 for children, ≤ 42 characters per line and ≤ 2 lines. https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide → we use 17 cps (second-language, Hinglish-speaking audience) and keep captions at ≥ 2.5 s.

## Accessibility
- **WCAG 2.2.2 Pause, Stop, Hide (A)** applies to motion that starts automatically, lasts more than 5 s and runs alongside other content. It needs a pause, stop or hide control. https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html → click to play, always-visible controls, no autoplay.
- **WCAG 2.3.3 Animation from Interactions (AAA)** requires that motion can be disabled, using `prefers-reduced-motion` (C39/SCR40). https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html → under reduced motion we use the reduced-motion stills instead of the Player.

## What strong explainers do
- **samwho.dev** (https://samwho.dev/load-balancing/, https://samwho.dev/queueing/):
  - Requests are dots whose state shows on the dot itself (colour shifts the longer it waits, hollow means timed out, stripes are a redundant cue).
  - New arrivals are briefly highlighted, and queues are drawn as fixed slots.
  - Concepts are added one at a time with the other parameters held fixed.
  - Every sim has a speed control.
  - → we use packets as dots, red dashed empty slots, and a redundant shape for every colour.
- **Bartosz Ciechanowski** (https://ciechanow.ski/internal-combustion-engine/):
  - Motion runs very slowly by default, and readers can scrub with a time slider.
  - Colour semantics stay consistent, parts are introduced incrementally, and "not to scale" is stated explicitly.
  - → "time (slowed down)" on the axis, and 0.5× playback must stay readable.
- **3Blue1Brown FAQ:** "Every movement on the screen should be deliberate, with an identifiable purpose"; go concrete before abstract. https://www.3blue1brown.com/faq/ → there is no decorative motion, and the example is concrete (story 42) before the term (replication lag) is named.
- **Nicky Case** uses a deliberately rough hand-drawn style, guess-then-flip prompts and recall checks. https://ncase.me/remember/ → a predict prompt goes before each clip on the page.
- **Josh Comeau:** UI transitions run 100–450 ms, ease-out to enter and ease-in to exit, animating only transform and opacity, and animation should be used "like salt". https://www.joshwcomeau.com/animation/css-transitions/ → explainer moves are slower than UI feedback (0.6–1.3 s per hop) but follow the same restraint.
- **ByteByteGo and Hussein Nasser:** no sourced analysis was found. [unverified, own viewing] ByteByteGo uses clean boxes, consistent icons and numbered steps, but its steps often arrive too fast without holds. Nasser draws request and response arrows by hand *while* he says them, which is natural temporal contiguity. → the pen draws the arrow as the message travels, and every step gets a hold.

## Remotion (official docs)
- The current version is **4.0.535** (npm, 2026-10-12). v5 is "not yet released". https://www.remotion.dev/docs/5-0-migration (v5 changes: Player premount default becomes 2 s, google-fonts needs explicit weights/subsets, `getPointAtLength` returns null past the end, contractors count toward the licence team size.)
- **Licence** (https://github.com/remotion-dev/remotion/blob/main/LICENSE.md): the free licence covers individuals, for-profit organisations of ≤ 3 people, non-profits and evaluation. Others need a Company License. The licence will "slightly change" in v5.
- `interpolate`: extrapolation defaults to `extend`, so always clamp. `easing` can be given per segment. https://www.remotion.dev/docs/interpolate
- `Easing.bezier`, `in`, `out`, `inOut`. https://www.remotion.dev/docs/easing
- `spring`: raise `damping` to remove bounce, and use `durationInFrames` to fix the length. https://www.remotion.dev/docs/spring
- `<Sequence from durationInFrames premountFor>` shifts `useCurrentFrame` for its children. `<Series>` takes a negative offset to overlap. https://www.remotion.dev/docs/sequence · https://www.remotion.dev/docs/series
- `evolvePath(progress, d)` returns `{strokeDasharray, strokeDashoffset}`. `getLength`, `getPointAtLength` and `reversePath` exist. https://www.remotion.dev/docs/paths/evolve-path
- `random(seed)` is deterministic. `Math.random` differs between render threads. https://www.remotion.dev/docs/random
- `@remotion/google-fonts` `loadFont` blocks rendering until the font is ready. https://www.remotion.dev/docs/google-fonts/load-font (not used here because of Recursive's custom axes)
- **Player props:**
  - Defaults: `controls` false, `autoPlay` false, `moveToBeginningWhenEnded` true, `showPlaybackRateControl` false.
  - Available: `renderPoster`, `showPosterWhenUnplayed`/`Paused`/`Ended`, `inFrame`/`outFrame`, `acknowledgeRemotionLicense`, `lazyComponent`.
  - Ref API: `play(e)`, `seekTo`, `addEventListener('frameupdate')`.
  - https://www.remotion.dev/docs/player/player
- **Best practices:** don't re-render the Player, put frame-driven UI in a sibling, pass the event to `play(e)`, and `useMemo` the inputProps. https://www.remotion.dev/docs/player/best-practices
- `<Thumbnail frameToDisplay>` renders a static frame. https://www.remotion.dev/docs/player/thumbnail
- **CLI:** `remotion still --frame --scale --props --image-format`, and `remotion render --codec --frames --concurrency --crf --every-nth-frame`. https://www.remotion.dev/docs/cli/still · https://www.remotion.dev/docs/cli/render

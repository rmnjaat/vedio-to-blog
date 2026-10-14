# Review: l04-heartbeat-expiry (Every beat moves the deadline)

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Every line was ticked by looking at renders in `learn/animations-lab/renders/l04-heartbeat-expiry/`: the stills (`stills/paper-*`, `blackboard-*`, `phone-paper-*`, `phone-blackboard-*`), the contact sheets (wide at 540 px, phone at 358 px, both themes), the mp4 `l04-heartbeat-expiry.mp4` and the strips `strip-5.4/12.9/21.8/23.6/32.4.png`.

Clip: 1185 frames (39.5 s, 79 s at 0.5×), 7 beats (B0–B6), wide 1200×800 and phone 720×1000.

## Render-check rounds

**Round 1 (wide, paper).**
1. The top line read as one phrase, "heartbeat SET u42 1 EX 30". Fixed: "heartbeat" now sits over the laptop at the left and `SET u42 1 EX 30` starts at x 334, over the api → redis arrow, with a clear gap between them (b0, poster).
2. The dashed expiry marker ran down into the tick labels ("30¦s"). Fixed: the marker now ends at y 454 and the ticks moved to y 494.
3. Lane 2 had two chevrons stacked at the right end, the graphite axis chevron and the red span chevron. Fixed: the lane-2 axis has no head, so only the red "no expiry" chevron shows.
4. The B6 caption broke as "EX / 30". Fixed with a no-break space in `EX 30`.
5. When a heartbeat landed, nothing showed the TTL being reset. Fixed: "ttl 30s" is inked blue for about 0.8 s when each write lands (m2-slide), then settles back to graphite. It is a single fade, not a flash.

**Round 1 (phone, paper).**
6. The dashed marker crossed the tick labels here too. Fixed: m1 is now 527 and the ticks are at 562.
7. `SET u42 1 EX 30` sat over the laptop → api hop. Fixed: it starts at x 312, over api → redis.

**Round 2 (wide + phone, paper + blackboard).** All 12 stills × 4 sheets were checked and nothing new was found. On the blackboard sheet every colour flips (no stray dark ink), and blue, red and green all stay distinct. Ghosted (38%) items are faint at 358 px but readable, which is acceptable because they are past context.

**Motion (mp4 strips).**
- 5.4 s: the packet rides arrow 1 and then arrow 2. The pen tip and packet coincide, the TTL resets to 30 s, and the expiry marker and bracket slide together.
- 12.9 s: the battery bars clear, then the red ✕ is drawn. "battery dies" is written in with a wipe, and the laptop then ghosts.
- 21.8 s: the ✕ at 50 s is drawn first. The key outline then redraws dashed and the ✕ lands on it.
- 23.6 s: "deleted" is written in, the dot fades to the ring, and "online" is replaced by "offline".
- 32.4 s: the red span grows linearly, followed by "no expiry", the ✕, the green dot and the red ring drawn around it.

No teleports, no pops, and only one primary motion at a time throughout.

After the last code change (a comment in `timeline.ts`) I re-ran the final render-check: wide and phone, light and dark.

**Round 3 (critic C-08, phone poster).** The critic's 390 px poster showed three problems: "deleted" written over the struck "u42" and ⏱ in the cylinder, "laptop" and "heartbeat" ghosted along with the laptop body, and "sped up" crowding the "0 s" tick.
- The struck key (dashed box, ✕, "u42", clock) and "ttl 0s" now fade out over 10 f, and then "deleted" is written in the key's place. It no longer overlaps anything (b4 and the poster, both layouts).
- "laptop" and "heartbeat" moved out of the laptop's ghost group, so they stay at full ink. Only the laptop body and its arrow ghost.
- On phone, "sped up" sits on its own line (y 626) between lane 1's ticks and lane 2's title. Lane 2 moved down 50 px, and the phone canvas grew from 720×950 to 720×1000 (caption band at 822).
- Re-checked with `lab.sh tsc`, `lab.sh check` (wide) and `--phone`. I looked at all 12 stills on the paper and blackboard sheets, plus the phone posters in both themes, and found nothing new.

## Checklist

### Teaching and accuracy
- [x] **Motion test.** The deadline moving on each beat, and the countdown after the last beat, cannot be shown in a still (b1 vs m2 vs b3).
- [x] **Every label traces to the ledger.**
  - `SET u42 1 EX 30`, "ttl", "expires" and "30 s" → L-0070 / L-0062 / L-0048.
  - "battery dies" → L-0046.
  - "deleted", "offline" and "friend sees" → L-0062 / L-0070.
  - "no EX", `SET u42 1` and "no expiry" → addition A-OOI-01 (SN-02), listed in `additions`.
  - The 10 s interval → L-0103 (context).
- [x] **No invented numbers.** The timeline (beats at 0/10/20 s, death at 22 s, expiry at 50 s) is an example built from the class's 10 s and 30 s. It is noted in `fidelity_notes`, and the track is labelled "sped up".
- [x] **Simplifications listed.** Hops are not to scale (the clock pauses while a beat travels). DynamoDB is not animated.
- [x] **Causality.** The laptop initiates the call to the api and the api initiates the call to redis; the heads sit at api and redis. The store's own expiry is drawn as a dashed outline (the store acts, nobody calls). The fact-check's softened wording is followed: the clip never claims every store deletes exactly on time. It shows Redis only, and SN-02 covers DynamoDB on the page.
- [x] **Step numbering.** No step-through covers this mechanism, so the clip carries no numerals.
- [x] **Frame 0 = the static twin** (Fig 2·i panel b: a store with a TTL timer and `SET … EX 30`, plus Fig 2·e's laptop and friend's screen). The poster at 1184 tells the whole story without its caption: dead battery, key deleted, offline ring, beats, the "30 s" bracket ending at the ✕, and lane 2 "no expiry" with the dot still "online".

### Match with the storyboard
- [x] **Beat timing.** Beats sit at the frames in `storyboard.yaml` (± 0 f, from `timeline.ts`), and each caption appears with its event; motion starts 8–10 f after the caption.
- [x] **One primary motion per beat.** The clock and playhead are the slow indicators that B1 and B3 talk about.
- [x] **Ghosting, not removal.** Past expiry markers ghost at 38%, and the laptop ghosts after it dies. The diagram and lane 1 ghost during B5 and come back for B6. Things are removed only where something replaces them in place: "ttl 0s" → "deleted", "online" → "offline", and the solid key box → the dashed one.

### Legibility
- [x] **Lettering size.** Wide lettering is 40 px and phone lettering is 30 px; captions are 48 / 32 px. Everything reads on the 358 px phone sheet.
- [x] **Captions.** Each is ≤ 2 lines, inside the band, and never over the diagram.
- [x] **No overlaps.** After round 3 (C-08), no label overlaps another label, line or shape in any still. "u42" inside the struck key is deliberately crossed by the ✕ during m4, and the struck key fades out before "deleted" is written in its place.
- [x] **Strokes.** Ink is 3.6 px and the lane-2 span is 6 px; dashes still read at phone size.

### Colour and contrast
- [x] **Marker colours mean the right thing.**
  - Blue: heartbeats, the request labels, the reset TTL.
  - Red: the dead battery, the ✕ at 22 s, the missing EX and the stale ring.
  - Green: the online dot.
  - Graphite: the store's expiry and the offline ring.
- [x] **Second cue for every colour.** Red comes with a ✕ or the words "no EX" / "no expiry". Green comes with the word "online". Offline is a ring shape plus the word.
- [x] **Contrast.** Only the token colours are used, and they meet the measured ratios in both themes.
- [x] **No hard-coded colours.** Everything comes from `THEMES[theme]`.

### Motion quality
- [x] **No decorative motion.** No zoom, bounce, pulse or loop.
- [x] **Easing.** Easing comes from `anim.ts`. Linear is used only for the clock, playhead and span growth, where speed means time.
- [x] **Packets ride their lines.** Pens and packets share one ramp.
- [x] **Labels are written on with a wipe.**
- [x] **Holds.**
  - B0: 3.2 s.
  - Final hold: 4 s.
  - At least 1 s after the last motion of each beat: B1 33 f, B2 44 f, B4 52 f, B5 35 f.
  - Each caption is up for at least max(2.5 s, chars/17): the longest, 68 characters, needs 4 s and gets 5.4 s.
- [x] **Length.** 39.5 s (under 40). Nothing feels stuck at 0.5×.

### Engineering
- [x] **Type-check clean.** `lab.sh tsc` passes.
- [x] **Deterministic.** No random, Date, timers or state.
- [x] **META complete.** It has alt, chapters (10 f into each beat), captions, posterFrame = 1184 and phone {720, 1000}.
- [x] **All four compositions render.** `<id>`, `-dark`, `-phone` and `-phone-dark`.
- [x] **Renders present.** Stills, both sheets in both themes, and one mp4.
- [x] **Nothing left running.** No Studio or server; every step ran through `lab.sh`.
- [x] **Site copy builds.** `lab.sh copy` done and `site-check ok`.

## Known limits
- **Not to scale:** heartbeat hops (the clock pauses while a beat travels).
- **Example timeline:** 0/10/20/22/50 s.
- **Only one clock and one track for lane 2.** Lane 2 has no tick labels; it shares lane 1's x scale.
- **Ghosted past context is faint on the phone.** During B5, the diagram and lane 1 at 38% are faint at 358 px. That is by design, and they return to full ink for the poster.
- **DynamoDB's delayed deletion (SN-02) is not animated.** The page's SourceNote carries it.

## For the section writer (§2.8)
- **`<AnimationClip>` caption:** "Forget the TTL on one write and the user never goes offline."
- **Predict line:** "The laptop's battery dies right after a heartbeat. How long until the dot turns grey?"
- **After:** "So the only thing a client must do is keep beating; the store does the deleting."

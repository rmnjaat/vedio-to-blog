# Review: l05-expiry-window ("Expired, hidden, then gone")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Renders: `learn/animations-lab/renders/l05-expiry-window/`
(stills, `_sheet-paper-full.png`, `_sheet-blackboard-full.png`, `_sheet-phone-paper-phone.png`, `_sheet-phone-blackboard-phone.png`,
`l05-expiry-window.mp4`, `strip-4.6.png`, `strip-13.6.png`, `strip-28.0.png`). 1110 frames = 37.0 s (74 s at 0.5×).

## Render-check rounds
**Round 1** (all 13 stills, wide + phone, paper + blackboard):
1. Wide, b4 (654) and b5 (830): the mono who-label `DELETE k2` / `DELETE k3` ended at x≈276 and the SQL column started at 290, so the two read as one line ("DELETE k2UPDATE…"). **Fix:** SQL column moved to x 330 (the longest line, `UPDATE store SET expired_at = -1`, now ends at ≈1098, inside the canvas and below the api bar).
2. b6 (996) and poster (1109): the lane verdicts ghosted to 55%, so "v1 not sent" (red) and "row updated" (green) read pale pink/green over the ghosted lanes. They are the poster's summary. **Fix:** verdicts ghost only to 85%; rows and lanes still go to 38%.
3. Everything else matched its beat (list below).

**Round 2:** re-rendered 654, 830, 1109 (paper + dark), then the mp4 and three strips, then the full wide and phone sets after the last code change. No new findings.

## Teaching and accuracy
- [x] Motion test: the same GET returns v1 at 12:01 (b1) and nothing at 12:04 (b3) only because the playhead crossed 12:02; the red window grows with the clock (m3 381, b3 → b6). One still can't show that.
- [x] Every word traces: axis/cron (L-0236), "expired, still on disk" (L-0201), GET strip + "v1 not sent" (L-0221, L-0222), DELETE strips (L-0199, L-0258), "no disk IO" (L-0259, fact-check: accurate), "-1" + "row updated" (L-0199), cron strip `expired_at <= now()` (L-0263), all three rows struck in one run (L-0202).
- [x] No invented numbers: no value size (the plan's "10 MB" token was not used), no IO count (L-0260 stays in prose), times are illustrative inside the class's 10-minute example (fidelity_notes).
- [x] Simplifications listed in fidelity_notes: one column name `expired_at` (board's `ttl`); k2 expires at 12:02 not 11:58 (would already have been swept at 12:00); `-1` assumes an integer column (L-0199 fact-check simplified/low, left as taught); no NULL-TTL keys (A-KSD-08 on the page).
- [x] Causality: every lane's chevron sits at the table (the api initiates); responses are packets only (green packet back in m2 187; no packet back in b3).
- [x] No step-through twin to number against; Fig 3·d is a static figure.
- [x] Frame 0 (b0 80) = Fig 3·d's parts: axis with cron clocks at 12:00/12:10, the store table, the api. Poster (1109) shows the window, every verdict, struck rows and the cron query; it reads without the caption.

## Match with the storyboard
- [x] Beats at planned frames (stills 80/245/352/506/654/830/996/1109 each show their beat's end state with its caption).
- [x] One primary motion per beat (strips: playhead move, then strip write, then pen+packet, then verdict, never overlapping). The red window growing with the playhead is the slow indicator B3/B6 talk about.
- [x] Past states ghost: "v1 ✓" ghosts when k1 expires (b2 352) and is replaced in place by "✕ v1 not sent" (b3); swept rows ghost to 38% with strikes (b6, poster). The query strip is replaced in place (10 f fade) — the only removals.

## Legibility
- [x] Wide labels 40 px, captions 48 px; phone (720×940) labels 30 px, captions 32 px. Phone sheet (358 px): every SQL line, verdict and caption readable; phone verdicts shortened ("not sent", "updated") to fit the narrower lanes.
- [x] Captions ≤ 2 lines, inside the band, never over the diagram (all stills both layouts).
- [x] No overlaps after round 1 fix #1. Mid-motion stills m1 156, m2 187, m4 556 (half-written strip: clean vertical wipe edge), m5 934 (strikes half drawn) all clean.
- [x] Strokes visible at phone size; table rules and lanes clear at 358 px.

## Colour and contrast
- [x] Blue = request lanes, packets and the `AND expired_at > now()` clause; red = expired window, washed rows, ✕ "v1 not sent"; green = v1 coming back, "row updated"; graphite for everything else.
- [x] Second cues: ✕ and ✓ shapes, strikes, the words "expired", "not sent", "updated", "no disk IO".
- [x] Dark sheet: all colours flip; red/green/blue distinct on the blackboard; red wash on rows visible but dark enough for the mono text.
- [x] Colours only via tokens (`THEMES`, `Ink`/`Write` colour names).

## Motion quality
- [x] No decorative motion. Easing from `anim.ts`; playhead uses EASE_MOVE between holds.
- [x] Packets ride their lines; pen tip and packet coincide (strip-4.6, strip-13.6).
- [x] Labels written by wipe (m4 556).
- [x] Holds: B0 3 s; final hold 3.6 s; ≥ 1 s after each beat's last motion; every caption ≥ max(2.5 s, chars/17) (longest, 70 chars B4, needs 4.1 s, has 4.9 s).
- [x] 37 s total.

## Engineering
- [x] `pipeline/bin/lab.sh tsc` clean. Deterministic (seeded hand geometry, `random(seed)` only in glyphs.ts).
- [x] META complete: alt describes the mechanism, chapters 10 f into their beats, captions, posterFrame 1109, phone 720×940, ledger.
- [x] Both themes and both layouts render; mp4 rendered; site copy built (`site-check ok`).

## Known limits
- Time is sped up; the clock reading is the only scale (no "slowed down" label needed, no durations claimed).
- At B6 the caption leads the cron strip by ~2 s while the playhead travels to 12:10.
- A-KSD-08 (keys with no TTL) lives on the page, not in the clip.

## Fix round 2026-10-14 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip, the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page, the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px).
**Looked at.** Wide paper + blackboard sheets, including the mid-motion stills (strip wipes cut cleanly), and the
poster; phone sheets. Table cells, lane verdicts and the SQL strip read at the new size with more room; no
collisions. Beats, captions and chapters unchanged.

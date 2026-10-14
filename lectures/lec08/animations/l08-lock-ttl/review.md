# Review: l08-lock-ttl ("A lock outlives its holder's time")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`.

Renders are in `learn/animations-lab/renders/l08-lock-ttl/`:
- stills: `paper|blackboard[-phone]-<frame>-<name>.png`
- sheets: `_sheet-paper-full`, `_sheet-blackboard-full`, `_sheet-phone-paper-phone`, `_sheet-phone-blackboard-phone`
- `l08-lock-ttl.mp4`
- strips: `strip-3.8 / 7.0 / 12.6 / 15.6 / 21.3 / 26.4 / 28.8.png`

## Teaching and accuracy
- [x] **Motion test.** The lesson is two overlapping windows in time: the key's 5-min TTL and consumer 1's 6-min job. In b2 (442) the key fill has stopped at `expired` while C1's bar keeps running. In b3 (612) C2's retry wins right after 5 min. In b4 (752) the DEL lands at 6 min on `c2`. Two stills would not show the TTL draining under a holder that is still working.
- [x] **Every word traces** to a ledger id or a sourced addition:
  - `redis key queue7`, `c1`/`c2`, `TTL 5 min`: L-0263
  - `SET queue7 c1 NX EX 300`, `OK`: L-0264, in the A-LDA-01 one-command form
  - `retries`, `nil`: L-0267, with the SET reply sourced (addition 1)
  - `expired`: L-0257, L-0269
  - `working`, `DEL queue7`, `empty`: L-0268, L-0269
  - `EVAL: if get==c1: del`, `0`, `kept`: L-0270, L-0273, with the release script reply sourced (addition 2)
  - `time (sped up)`: the required not-to-scale label
- [x] **No invented numbers.** 5 min / 300 come from the class. 6 min comes from the page's predict line and is marked illustrative in `fidelity_notes`. Retry spacing is illustrative and no interval is claimed. The class's "returns 1/0" (L-0265, left as taught) is not contradicted on screen. The clip shows the drawn command's documented replies instead.
- [x] **Simplifications are listed** in `fidelity_notes`: c1/c2 stand in for random tokens (A-LDA-02 is in the prose), and L-0271 and fencing are not shown.
- [x] **Causality is correct.** Every arrowhead sits at the redis key (consumers initiate). Replies travel back as packets on the same line, with no second arrow.
- [x] **Steps ①–⑤ map onto Fig 6·d's steps 1–4 and 6.** Fig 6·d's step 5 (the GET-then-DEL race) is deliberately left to the StepThrough. The section writer should keep the figure's numbering. The clip's badges are caption-local and are not shown on the figure.
- [x] **Frame 0 and the poster.** Frame 0 shows Fig 6·d's lanes with the key `empty` and an empty axis (b0, 95). The poster (1049) tells the whole story without the caption: expired c1, refused retries, C2 OK, struck DEL, EVAL → 0, c2 kept, both work bars.

## Match with the storyboard
- [x] **Beats land at their planned frames.** b1 292, b2 442, b3 612, b4 752 and b5 937 each show their beat complete with the caption fully up. Chapter marks are at beat + 10 (115, 310, 460, 630, 770).
- [x] **One primary motion at a time.** In B1 the order is pen, then OK packet, then key, then playhead. The labels are written alongside their own element (strip 3.8 shows the SET label wiping in with its pen). In B2 the playhead is the motion the caption refers to. B3, B4 and B5 each run arrow → reply → label in order (strips 15.6, 21.3, 26.4).
- [x] **Past states ghost.** The c1 key and the SET label/OK go to 38%. In B5 the DEL is struck and then ghosted. The red outline and `empty` are removed only when the replay restores `c2` in the same place.

## Legibility
- [x] **Lettering sizes.** Wide is 40 px lettering with 48 px captions; phone is 30 px with 32 px captions. On the 358 px phone sheet every label is readable in both themes, including `nil`, `0` and `kept`.
- [x] **Captions** are ≤ 2 lines in both layouts and sit inside the band.
- [x] **No collisions after round 1** (see below). The one known overhang is listed under limits.
- [x] **Strokes.** Bars and arrows use 3.6 px. Retry arrows are thin graphite. Dashes stay visible on the phone (TTL box, retries bar, red outline).

## Colour and contrast
- [x] **Colour meanings.**
  - Blue: SET, DEL and EVAL requests.
  - Green: `OK`, `0` and `kept`.
  - Red: `expired`, the deleted-lock outline and `empty`.
  - Graphite: lanes, retries, `nil`.
- [x] **Second cues.** Colour is always backed by words (`expired`, `empty`, `kept`, `OK`), a dashed outline and a strike-through.
- [x] **Dark sheet.** Every colour flips. The ghosted SET label is dim but readable as past context.
- [x] **Theme tokens only.** All colours come from `THEMES[theme]`.

## Motion quality
- [x] **No decorative motion.** Only pens, packets, wipes, 10–12 f fades and a linear playhead.
- [x] **Easing comes from `anim.ts`.** Linear is used only for the playhead and the bars or key fill tied to it.
- [x] **Packets ride their lines** (strips 3.8 and 15.6). The re-ink pen is the same path as the arrow.
- [x] **Holds.**
  - B0 is 3.5 s.
  - Each beat has ≥ 30 f after its last motion: B1 ends at 270 against the next beat at 300, B2 at 408/450, B3 at 568/620, B4 at 692/760, B5 at 904/945.
  - The poster holds for 105 f (3.5 s).
  - Every caption stays up ≥ chars/17 s.
- [x] **Length.** 35.0 s, which is 70 s at 0.5×.

## Engineering
- [x] `lab.sh tsc` is clean. The code is deterministic (no random, Date or state).
- [x] **META is complete:** alt, chapters, captions, posterFrame 1049, ledger, phone 720×940.
- [x] **All four compositions render** (wide/phone × paper/blackboard). The site copy builds (`site-check ok`).
- [x] **Render outputs** (stills, four sheets, one mp4, seven strips) are in place. No Studio or server is left running.

## Problems found and fixed
1. **Round 1, all stills (wide + phone).** Consumer 2's retries were bare arrows with no sign that they had been refused. **Fix:** each retry now gets `nil` (ink2 mono) written beside it, which is the documented SET … NX reply. It is sourced and listed in the additions.
2. **Round 1, b3/b4.** The caption says "two consumers are now working", but C2's new bar had no label. **Fix:** `working` is now written in C2's bar during B3 (548–568).
3. **Round 1.** The EVAL label `EVAL: if get == c1 then del` was 27 characters, over the 22-character limit. **Fix:** it now reads `EVAL: if get==c1: del` (21).
4. **Round 1, phone b1–b5.** The `redis key` title touched the SET arrow at x 76. **Fix:** the title moved to x 108.
5. **Round 1 timing.**
   - B1's last motion ended 12 f before B2. **Fix:** the playhead and labels now start at 212, which leaves a 30 f hold.
   - B5's strike started on the caption's first frame. **Fix:** it moved to 778, and later B5 events were shifted by 4–8 f.
6. **Round 2:** wide, phone, paper and dark were all re-rendered and re-checked. Nothing new was found. The mp4 strips show no jumps or pop-ins.

## Critic fix (C-16, 2026-10-14)
- **Problem:** on the poster, `SET queue7 c1 NX EX 300`, both `OK`s and the struck `DEL queue7` were at 38% (pale
  blue and green on paper).
- **Fix:** a `story()` opacity is used for those groups. They ghost while later beats play, as before, and return to
  full ink over 12 f at B6 (945). The expired `c1` key, which is superseded state, stays ghosted. The struck
  `DEL queue7` now reads at full ink, with the strike visible.
- **Checks:** `lab.sh tsc` ok; `lab.sh check` wide and `--phone` re-rendered all stills. The poster was checked in paper
  and blackboard, wide and phone. The sheet confirms b2–b5 still ghost as before.

## Known limits
- **C2's `working` label overhangs.** The class numbers (5-min TTL, 6-min job) leave C2's work bar only 67–90 px wide in B3/B4. Its `working` label runs past the bar's open, growing right end for those two beats. It crosses no line, and from B5 on the bar covers it.
- **Ghosted labels are faint on blackboard.** They are past context and still readable.
- **The race is not in the clip.** The GET-then-DEL race (Fig 6·d step 5, L-0271) and fencing tokens (A-LDA-04) are left to the StepThrough and the prose.

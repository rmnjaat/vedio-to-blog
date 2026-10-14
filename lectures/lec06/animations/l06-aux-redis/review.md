# Review: l06-aux-redis ("Thirty messages, one write")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Renders in `learn/animations-lab/renders/l06-aux-redis/` (stills, `_sheet-paper-full.png`, `_sheet-blackboard-full.png`, `_sheet-phone-paper-phone.png`, `_sheet-phone-blackboard-phone.png`, `l06-aux-redis.mp4`, strips at 3.2 s, 9.9 s, 26.0 s).

## Teaching and accuracy
- [x] **Motion test.** The lesson is accumulation: the main store's tray fills one red ✕ per repeat (m3 at frame 360: `C ×17`, 8 marks) while the other lane's main tray stays at one green dot (b3 at 715). Two stills would give the totals but not the rate at which wasted writes pile onto main.
- [x] **Every word traces.** Captions: B0 L-0285, B1 L-0284, B2 L-0286, B3 L-0292/L-0293, B4 L-0303, B5 L-0288. Labels: `main redis`/`aux redis`/`worker` and `B_C`/`B_D` come from board D-13 and L-0292/L-0302. `B:{C,D}` is the board's `B : {C, D}`. The counts (29/48 no change, 29/48 checks, 1/2 writes) are arithmetic on the 30 and 20 messages.
- [x] **Nothing invented.** No ops/s, no latency, no failure threshold. The plan's qualitative load gauge was replaced with one mark per message, so no load level is implied.
- [x] **Simplifications listed** in `fidelity_notes`: the queue is folded into the sender box, one worker per lane, the aux reply isn't drawn, the SET NX detail is left to Fig 6·b, and the repeats are sped up.
- [x] **Direction.** The worker starts every hop (heads on worker → main and worker → aux). Messages go sender → worker. The work moves to aux rather than vanishing (fact-check on L-0291): every repeat visibly lands on aux.
- [x] **Step numbering.** Fig 6·b is a separate step-through with its own steps, and the clip shows no step numerals, so nothing can disagree.
- [x] **Frame 0** shows both lanes with empty trays and `B:{ }` (b0). **Poster** (1164) works without its caption: lane titles, both trays, `48 no change` against `2 writes` + `48 checks`, the same totals the B4 caption and the page caption give (C-04).

## Match with the storyboard
- [x] Beats land on their planned frames (timeline.ts mirrors the YAML). Each caption appears with its event. In the 3.2 s strip the packet leaves the sender ~8 f after the B1 caption.
- [x] **One primary motion per beat.** B1: top, then bottom aux, then bottom main, in sequence. B2: top only. B3: bottom only. B4: each first D message runs alone. Only the 19 repeats of the same burst run in both lanes together (deliberate; noted in `fidelity_notes`).
- [x] **Ghosting / removal.** The `C ×30` rows ghost to 38% when D starts (b4, poster). The notes and the `B:{…}` set are replaced in place (8 f fade, then a written wipe).

## Legibility (phone sheet, 358 px)
- [x] Wide lettering is 40 px and phone lettering 30 px (15 px on the phone sheet); every label can be read on `_sheet-phone-*-phone.png`.
- [x] Captions are 48/32 px, at most 2 lines, inside the band in every still.
- [x] No overlaps in any still, mid-motion included.
- [x] Strokes are 3.6 px. The divider dashes stay visible. The tray marks (✕ 15 px, dot r 9.5, ring r 7.5) stay distinct on the phone sheet.

## Colour and contrast
- [x] Blue = the message path (packets, first-hop re-ink). Green = the set changed (dots, `B:{C}`, `1/2 writes`). Red = reached main and changed nothing (✕, `no change`). Graphite = checks on aux.
- [x] Every colour has a second cue: shape (dot / ✕ / ring) plus the words "no change", "checks" and "writes".
- [x] Blackboard sheets: every colour flips, nothing is hard-coded, and the red and green notes read on #232927.
- [x] No colours outside `tokens.ts`.

## Motion quality
- [x] No decorative motion. Easing comes from anim.ts; linear is used only for the sped-up repeats, where speed means rate.
- [x] Packets ride their lines, hide inside the worker box and come out on the aux leg (9.9 s strip). The pen re-ink tip and the first packet coincide.
- [x] Labels are written on with the wipe.
- [x] **Holds.** B0 is 3.0 s. The gap from the last motion to the next caption is 1.0–1.1 s in every beat. The final hold is 3.7 s. Each caption stays up at least max(2.5 s, chars/17).
- [x] Length is 38.8 s (77.7 s at 0.5×).

## Engineering
- [x] `lab.sh tsc` clean. Deterministic: no random, Date, state or timers.
- [x] META is complete: alt text, chapters 10 f into each beat, captions, poster, `phone: 720×1020`, ledger.
- [x] All four compositions render (wide/phone × paper/blackboard). No Studio or server left running.

## Problems found and fixed
1. **Round 1 (wide, light).** The first green dot in each tray was a lone 8 px speck, and the 20 px tray pitch was cramped. **Fix:** pitch 24, dot r 9.5, ✕ 7.5, ring 7.5. Notes moved to clear the larger trays (top note to y 258, right-aligned to 1164; aux tray up 8 px, away from the caption rule).
2. **Round 2 (phone, light).** `B:{C,D}` touched the walls of the phone cylinder. **Fix:** phone main cylinder rx 72 → 78.
3. **Round 3 (all four sheets, mp4 strips).** No further issues.
4. **Critic C-04 (page critique, round 1).** The poster (C ×30 + D ×20, `48 no change`, `2 writes`, `48 checks`) disagreed with the page caption, which told only C's part ("30 writes, 29 change nothing"). The poster keeps the full two-sender story, since D's burst is what shows "one write per sender". **Fix:** the B4 burned-in caption is now "D sends twenty. Of all 50, 48 change nothing; with aux, main gets 2." (was "D sends twenty: main takes twenty writes without aux, one with it."); the alt text ends with the 50 / 48 / 2 / 48 totals; the page caption and predict line in `s6-auxiliary.mdx` now name both senders and the same totals. Storyboard yaml/md updated. Re-ran `lab.sh check` wide + `--phone` (all stills, both themes): the new caption fits two lines in the band on both layouts (`paper-1050-b4-d`, `phone-paper-1050-b4-d`); nothing else moved. mp4 re-rendered.

## Known limits
- When the set text changes, the old `B:{…}` fades out about 3 frames before the new one is written, so main is blank for 2–3 frames (visible in the 3.2 s strip). This is the replace-in-place rule.
- The phone's first green dot in each tray sits under the cylinder, slightly apart from it. It reads as the tray once more marks arrive.
- The trays use fixed slots, so the order of marks is illustrative of arrival, not of time.

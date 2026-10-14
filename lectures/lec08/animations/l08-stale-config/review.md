# Review: l08-stale-config ("Nine seconds of errors")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Renders: `learn/animations-lab/renders/l08-stale-config/` (stills `paper|blackboard[-phone]-<frame>-<name>.png`, sheets `_sheet-paper-full`, `_sheet-blackboard-full`, `_sheet-phone-paper-phone`, `_sheet-phone-blackboard-phone`, mp4, strips `strip-5.4/12.8/17.4/24.4/30.4.png`).

## Teaching and accuracy
- [x] Motion test: the lesson is a window in time (stale copy until the poll) and the requests that fall into it. Stills b2 (492) vs b3 (702) show the red span growing with the playhead and the red ✕ piling up only while the card is ringed `stale`; a still pair would not show that the errors last as long as the copy waits.
- [x] Every word traces: `orchestrator`, `health checks`, `remove b2` (L-0164); `lb servers`, card `b1 b2 b3`, `stale` (L-0152 context, L-0154); `poll every 10 s`, `0 s: poll`, `10 s: poll`, `b2 dies`, `9 s of errors` (L-0169, L-0170); `poll` (L-0167); `:9091 meta`, `pull`, `push (meta port)` (L-0171); `near zero` (L-0174, L-0176); `fresh` = the copy caught up (L-0166 context). `time, slowed down` is the required not-to-scale label.
- [x] No invented numbers: only 10 s, 1 s, 9 s and 9091 (all from the class). No request count, error rate or push latency.
- [x] Simplifications listed in `fidelity_notes` (stack for LB servers, crash = db update moment, round robin, meta port only, removal as taught).
- [x] Causality/arrowheads: health checks head at the backends (orchestrator asks, L-0371); orchestrator → db head at db; pull line head at db (the LB server pulls); meta call head at the LB servers; requests head at the backends; error packets ride back along the same line (no second arrow).
- [x] Step numbering ①–⑤ matches the caption badges; Fig 4·d has no numbered step-through.
- [x] Frame 0 = the architecture of Fig 4·b/4·d over two empty lanes (b0 still 122 shows only the first request added). Poster 1159 tells the whole story without the caption (poll span `9 s of errors` with three ✕, push sliver `near zero` with all-blue dots, architecture after the push).

## Match with the storyboard
- [x] Beats land at the planned frames (stills at 122/292/492/702/882/1032 each show their beat complete with its caption fully up; chapter marks at beat + 10).
- [x] One primary motion at a time: B1 crash → check → db write in sequence; B2 request stream with the red span as the slow indicator the caption refers to; B3 poll → strike → bracket → two requests; B4 meta → pull → strike, playhead sliver as indicator. Strip 24.4 shows the `:9091 meta` label being written alongside its own arrow's pen (same element).
- [x] Past states ghost: `remove b2` and the health-check ✕ go to 38% after B1; the whole poll lane ghosts during the push replay (882, 940, 1032) and returns for the summary (1159). Removed only where replaced in place: `poll` → `pull`, `stale` ↔ `fresh`, strike reset at the replay.

## Legibility
- [x] Wide lettering 40 px, phone 30 px, captions 48/32. Phone sheet (358 px) readable in both themes; card `b1 b2 b3`, `9 s of errors`, `near zero` all legible.
- [x] Captions ≤ 2 lines in both layouts (phone B1 was 3 lines in round 1, fixed).
- [x] No collisions after round 1 (see below).
- [x] Strokes ≥ 3.6 px for glyphs/arrows; dashes visible on the pull and meta lines at phone size.

## Colour and contrast
- [x] Blue = requests, health check, db write, poll/pull, meta call; red = crash, failed requests, stale ring/word, the window; green = `fresh`; graphite = glyphs, axes.
- [x] Second cues: ✕ shapes for crash and failures, dashed ring + word `stale`, word `fresh`, strike-through, words on spans.
- [x] Dark sheet: all colours flip (no hard-coded ink); ghosted poll lane is dim on blackboard but readable (past context).
- [x] Only tokens from `tokens.ts` (`THEMES[theme]` in the root).

## Motion quality
- [x] No zoom/bounce/pulse; pens, packets, wipes, 8 f stamps, 10–12 f fades only (strips 5.4, 12.8, 17.4, 24.4, 30.4).
- [x] Easing from `anim.ts`; linear only for the playheads and the growing span (time).
- [x] Packets ride their lines (polyline paths on the bus); the health-check pen re-inks exactly over its static line (same polyline + seed).
- [x] Holds: B0 2 s before the first motion; ≥ 30 f after each beat's last motion (B3 last packet ends 674, next beat 710; B5 ends 1004, summary at 1040); summary 120 f. Every caption ≥ chars/17 s.
- [x] 38.7 s (77 s at 0.5×).

## Engineering
- [x] `lab.sh tsc` clean; deterministic (no random/Date/state).
- [x] META complete (alt, chapters, captions, posterFrame, ledger, phone 720×940).
- [x] Four compositions render (wide/phone × paper/blackboard).
- [x] Stills, four sheets, one mp4 in `renders/l08-stale-config/`. No Studio or server left running.

## Problems found and fixed
1. Round 1 wide: `remove b2` ran into the back box of the `lb servers` stack (poster, b1 still). Fixed: stack, card, meta drop, pull line and bus moved 20 px right.
2. Round 1: the B0 still (124) showed the request dot barely faded in; moving the still to 130 put it inside the caption cross-fade (phone b0 showed a faint caption). Fixed: B0 motion moved 10 f earlier (playhead 66–114, request at 90, dot at 112) and the still set to 122.
3. Round 1 phone: B1 caption wrapped to three lines. Fixed: caption shortened to the plan's wording "Backend 2 crashes. The orchestrator notices and updates the db." (storyboard updated).
4. Round 2 (re-review of all four sheets): the poll-lane playhead (±26 px) and the 1 s crash tick (±24 px) reached into the label row under the axis. In m2 (405) the playhead cut "time, slowed down", and in b2 (492) it cut "10 s: poll", in both wide and phone. Fixed: both marks now reach only 14 px below the axis. All stills were re-rendered (wide and phone, light and dark) and checked again. m2 and phone b2 are clean, and nothing else changed. The mp4 was re-rendered and strips 12.8 and 17.4 were re-checked: the packets ride the bus, the span grows steadily and there are no jumps.

## Critic fix (C-16, 2026-10-14)
- **Problem:** the poster left "remove b2" at 38% (pale blue on paper).
- **Fix:** "remove b2" un-ghosts with the poll lane at B6 (1040, 12 f), so the poster's story labels are all at full
  ink. "pull" was already at full ink. Superseded state (the struck b2 in the card, the health-check ✕) stays as drawn.
  B2–B5 are unchanged (the label is still ghosted while the replay plays).
- **Checks:** `lab.sh tsc` ok; `lab.sh check` wide and `--phone` re-rendered all stills. The posters were checked in
  paper and blackboard, and the sheets confirm the B2–B5 stills are unchanged.

## Known limits
- The push-lane sliver (1 → 1.25 s) is narrow (21 px wide, 13 px phone); the `near zero` label carries it.
- The push lane has no `b2 dies` label of its own; the red crash tick sits at the same 1 s as the poll lane's labelled tick.
- Fig 4·d (written by the section writer) should mark only the requests that went to b2 inside the bracket red, to match the clip (every third request), and use the same lane titles.

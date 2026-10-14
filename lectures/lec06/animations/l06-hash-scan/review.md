# Review: l06-hash-scan · "Rows touched per query" (§2.3)

880 frames (29.3 s, 58.7 s at 0.5×), 1200×800 wide + 720×980 phone, paper + blackboard.
Renders: `learn/animations-lab/renders/l06-hash-scan/` (stills, `_sheet-paper-full`, `_sheet-blackboard-full`,
`_sheet-phone-paper-phone`, `_sheet-phone-blackboard-phone`, `l06-hash-scan.mp4`, strips at 3.2 / 5.8 / 12.2 / 19.2 / 25.4 s).

## Render-check rounds
**Round 1** (previous session, stills at 80–869): layout, both themes and the phone re-flow were already in place.
Found then and fixed in code: poster hold too short after "store it, index it" (DURATION 870 → 880, 2.7 s hold).

**Round 2** (this session). Looked at every still of the wide sheet (540 px), phone sheet (358 px), light and dark,
and the poster at full size. Found:
1. B0 caption "Find that user's photos" promised photos the clip never shows (it finds the user row; the join is
   prose). → "The URL gives us a hash. Which user has it?" (43 chars, 3.0 s up, needs 2.5 s). Traces to L-0074.
2. `META.alt` said "cannot use an index"; fact-check SN-03 softens L-0081 to "a plain index". → alt now says
   "cannot use a plain index on email". On-screen text never claimed it, so no still changed.
3. Storyboard YAML/MD still said 870 frames / poster 869 → synced to 880 / 879; B2 event frames synced to timeline.ts.
Re-rendered all stills (wide + phone, both themes) after the change; nothing else to fix.

**Motion (mp4 strips).** 3.2 s: cursor steps row by row, each ✕ stamps after the cursor arrives, counter 1→3, no jumps.
5.8 s: cursor parked on "⋮ 10,000 users", counter climbs linearly (5 → 4,003 in 1.3 s), nothing else moves.
12.2 s: left panel ghosted; root re-inks blue, packet rides the first hop with the pen tip. 19.2 s: "requests: 1"
written, then request 2 — left cursor re-sweep with counter +500 per 1/10 s, right packet rides the full lookup path,
right counter 1 → 2 at arrival. 25.4 s: "store it, index it" wipes on left→right, then 2.7 s hold. Only finding: the
"requests" digit is blank ~3 frames while re-written (kept; a write-on replacement, listed as a limit).

## Checklist
### Teaching and accuracy
- [x] Motion test: the lesson is accumulation (rows × requests); the counter climbing to 10,000 and 30,000 while the
  other side ticks 1, 2, 3 is what a still can't show.
- [x] Every caption/label traces: B0 L-0074 (context); B1 "every email is hashed and compared", "full table scan"
  L-0080/L-0081; B2 "one lookup, one row", "index on hash" L-0083; B3 "runs on every request… repeats every time"
  L-0081 ("every query is a full table scan"), L-0083 detail ("very common"); B4 "store it" L-0082.
  "10,000" is the teacher's example (L-0079 detail, 00:39:45); 20,000/30,000 are 10,000 × requests shown.
- [x] No invented numbers: the plan's "ten a second" rate was dropped (not in the lecture); no O(1), no latency.
- [x] Simplifications in fidelity_notes (match position, placeholder emails, sped-up re-sweeps, join left to prose,
  no expression index: SN-03 in prose after the clip).
- [x] Causality: the query (blue) visits rows / walks root → inner → leaf → row; arrowhead at the users row.
- [x] No step-through twin to number against; steps ①②③ match the captions.
- [x] Frame 0 = Fig 2·b unannotated (both queries, table, index, counters 0). Poster (879) reads alone: 30,000 red
  "full table scan" vs 3 green "one lookup", "requests: 3" both sides, "store it, index it".

### Match with the storyboard
- [x] Beats at 0/90/360/540/760 exactly (timeline.ts = YAML); captions cue with their events; chapters at 100/370/550.
- [x] One primary motion per beat. B3 moves both panels per request: one request answered two ways, the caption is
  about both (listed as a limit).
- [x] Left panel ghosts to 38% during B2 and returns for the comparison; nothing removed.

### Legibility
- [x] Wide labels ≥ 40 px, numbers 52 px; phone labels 30 px, captions 32; all readable on the 358 px phone sheet
  (checked "rows read", "index on hash", "users", "requests: 3", "store it, index it").
- [x] Captions ≤ 2 lines, inside the band, never over the diagram (wide band 652, phone 828).
- [x] No overlaps in any still incl. mid-motion (cursor outline sits inside the row rules; packet on the hop line;
  "store it, index it" clear of "users" and "rows read" in both layouts).
- [x] Strokes 3.6 px; divider dashes visible on phone.

### Colour and contrast
- [x] Blue = query path (cursor, index path, packets); red = wasted scan (✕, bracket, 10,000/30,000, "full table
  scan"); green = found/served (✓, row, 1/3, "one lookup", "store it, index it"); graphite rest.
- [x] Second cues: ✕/✓ shapes, words "full table scan" / "one lookup".
- [x] Dark sheet: all tokens flip (no stray ink), red/green/blue distinct on #232927; ghosted pink 10,000 in B2 is
  faint but legible (past context).
- [x] Colours only from `THEMES` tokens (C.red/C.green/C.blueWash, named marker colours).

### Motion quality
- [x] No zoom/bounce/shake/pulse; cursor uses EASE_MOVE; linear only for the counter (its speed is the table).
- [x] Packets ride their paths with the pen tip; labels wipe on.
- [x] Holds: B0 3.0 s; B1 ends 322, next cue 360 (1.3 s); B2 ends 490, next 540 (1.7 s); B3 ends 710, next 760
  (1.7 s); final hold 800 → 880 (2.7 s). Each caption up ≥ chars/17 (longest 67 chars, 7.3 s).
- [x] 29.3 s total; 0.5× = 58.7 s.

### Engineering
- [x] `pipeline/bin/lab.sh tsc l06-hash-scan` clean.
- [x] Deterministic (pure function of the frame).
- [x] META: id, title, 1200×800, phone 720×980, fps, durationInFrames 880, posterFrame 879, chapters, captions, alt.
- [x] Paper + dark, wide + phone compositions render.
- [x] Stills, four sheets, one mp4 in `renders/l06-hash-scan/`. No studio/server left running.

## Known limits
- B3 runs both panels together per request (deliberate comparison).
- "requests" digit blank ~3 frames on re-write.
- HASH(email) cells show the compare result (✕/✓), not hash strings; MD5/SHA-256 and 0eafd172 are prose (SN-02).

## For the section writer
- `<AnimationClip clip="l06-hash-scan" k="L-0080 L-0081 L-0082 L-0083" lead="The table has 10,000 users. How many rows does each query read?" caption="Hashing in the WHERE clause makes the database hash every email to find the match, on every request. A stored, indexed hash is one lookup. Not storing a derivable value cost a full scan, so store it." />`
- Predict line (PauseAndThink P2 before it): "The table has 10,000 users. How many rows does each query read?"
- SN-03 (expression indexes) goes right after the clip; the clip shows only a plain index.

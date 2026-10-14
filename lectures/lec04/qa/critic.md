# Lecture lec04 (course Lecture 01, "Green dots and blog rows"): design critique

I compared the built pages (overview plus chapters 1–7) against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md), using Lecture 1's finished pages as the reference.
Screenshots are in `lectures/lec04/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`
- `sweep/{1440,390}-{light,dark}/<page>/NNN.png`
- `fig/`, `step/` and `clip/`
- `report.json`: machine checks, no failures

"Lecture 01" in the breadcrumbs is correct: lec04 is position 1 in `course.json`. "coming soon" on the other lectures comes from the isolated QA build (VTB_ONLY), not from the site.

## Verdict: PASS WITH FIXES

There are no blockers or high-severity issues. 4 medium and 7 low issues remain, and the fixers can resolve all of them without rework.

## What matches the sample

- **Look.** Paper and blackboard tokens, Literata body and Recursive UI/mono, and graph-paper sheets throughout. Also matching:
  - the key-rule box ("The rule for this whole chapter", `1440-dark-4-heartbeats-mid.png`)
  - the yellow sticky-note pause-and-think cards
  - the notation key at the start of chapter 2 (`sweep/390-light/2-green-dots/000.png`)
  - the "From practice … skip unless" asides
- **Markers mean what they mean.** Blue is a request (heartbeats, `SET … EX 30`), green is an ack or success (OK, "nothing new to run", ✓ hit), and red is a failure or a stale state (stale dot, refused connections, "new servers get nothing").
- **One hand.** The figures match lec01's scale, stroke and lettering, and labels are 12 px or more at both widths. The best ones are fig-2c, 2i, 3c, 4f, 4h, 5c, 5d and 6c.
- **Phone layouts are real redraws, not shrunk copies.**
  - Two-panel figures stack vertically (2c, 2i, 3c, 4f, 6a).
  - fig-5h wraps the 20-byte string onto two rows.
  - fig-6b collapses the three readers into "×3 users".
- **Step-throughs.** All 15 steps (fig-2e, 4b, 4e) match their text, with past steps dimmed, the current step in ink, and working Prev/Next, counter and deep-link hint. Arrows sit on the initiator's side: SYN from api, the heartbeat from the laptop, the "expired" push from redis.
- **Pause-and-think.** All 14 cards have question-specific verdict copy that agrees with the reveal. Examples: "Right. Ten servers × 100 already use all 1,000." and "Right. Compress once, and every hop carries 1 KB."
- **Clips.** The four clips have story-telling posters, numbered chapter chips, "The clip as text" and captions that match the page. On phone they use portrait compositions with readable lettering (`clip/390-*`), which fixes lec01's blocker.
- **Navigation.**
  - All three columns are present: the course tree with current chapter marked, the content, and "On this page" with scrollspy that includes h3s.
  - Phone has a "☰" drawer and a sticky "On this page" dropdown.
  - Chapters open with a kicker, "chapter n of 7", a dek and a meta line, and close with previous/next hand-offs plus "coming later" chips.
- **Dark mode** is clean across pages, figures, cards and clips.

## Issues, ranked

### Medium

1. **C-01: Chapter 3 figure desert.**
   - Where: `sweep/1440-light/3-redis-or-dynamodb/004–011.png`.
   - §3.2 persistence, §3.3 managed vs self-managed and §3.5 room to grow have no drawing. fig-3b is the only figure in about 8 screens of prose and "More precisely" boxes.
   - Fix (owner: content): add three small figures: AOF/RDB with a crash marker, a "who runs it" split, and the Redis toolbox vs DynamoDB + Streams + Lambda.
2. **C-02: Chapter 5 §5.8–5.9 figure desert.**
   - Where: `sweep/1440-light/5-blog-rows/020–025.png`.
   - Redbus, time zones, the 2038 overflow and negative epochs are all prose, with the table only at the end.
   - Fix: add a Redbus before/after sheet, and an epoch number line from −1 through 0 to the int32 wall in 2038, with an int64 continuation.
3. **C-03: Transcript voice.**
   - "the instructor" appears 27 times and "the class" 72 times. Teacher biography appears in the body: the police station, "built GDPR compliance himself", "knows it through a friend… take it as his account", "the recording leaves unclear whether the instructor agreed".
   - Where: `sweep/1440-light/5-blog-rows/020.png`, `024.png`; `4-heartbeats/021.png`.
   - This repeats lec01 critic #14.
   - Fix: state claims directly, keep provenance in the meta lines, captions and asides, and bring "the instructor" down to 5 or fewer.
4. **C-04: Phone step-throughs separate the drawing from the step text.**
   - Where: `step/390-light-fig-2e-s1.png`, `sweep/390-light/2-green-dots/010.png` (a full screen of empty lanes), `step/390-light-fig-4b-s3.png`.
   - This repeats lec01 #6.
   - Fix (owner: design): crop the viewBox to the steps so far, and pin Prev/Next plus the step text to the bottom of the figure.

### Low

5. **C-05: fig-6b routing.** The api→cache and api→db lines share crossing trunks, and the ✓ floats (`fig/1440-light-fig-6b.png`). Give each server its own stubs to separate buses.
6. **C-06: Glyph drift in chapter 4.**
   - fig-4c, 4e and 4f use plain "server" boxes (4c with a ghost outline) instead of the key's api glyph.
   - fig-4g draws "data warehouse" in faded ink for no stated reason.
7. **C-07: fig-4d speech bubble** ("I'm a library, not a service") is decoration, not a misconception. Make it a hand annotation and keep fig-6a's bubble.
8. **C-08: Clip 2·1 phone poster collisions.**
   - "deleted" overlaps the crossed-out u42 and ⏱ in the cylinder.
   - "laptop" and "heartbeat" are in pale ink.
   - "sped up" crowds the 0 s tick.
   - Where: `clip/390-light-l04-heartbeat-expiry-fig-poster.png`.
9. **C-09: §3.7 table header misaligned.** The Redis columns have cube icons and DynamoDB has none, so its header floats about 40 px higher (`sweep/1440-light/3-redis-or-dynamodb/015.png`).
10. **C-10: Sticky bar covers step-through tops on phone deep links.** The lane heads are hidden and the api lane is unlabeled (`step/390-light-fig-2e-s1.png`). Add scroll-margin-top of about 110 px.
11. **C-11: Chapters 4 and 5 run to about 40 phone screens each.**
    - Repetition: the §4.7 restatement, the §5.8 objections told twice, and provenance sentences that duplicate captions.
    - Fix: cut about 15% while doing C-03.

## Checked and fine

- `report.json`: no failures, no horizontal scroll. All pages have three themes and widths captured.
- The pause-and-think "before" states don't leak the answer, and the "after" states mark the picked option.
- The clip chips land on settled frames (`clip/*-playing.png`).
- Code block (Pool), comparison tables and "coming later" chips render in both themes.
- There's no teacher–student dialogue, no student names, and none of the usual slop phrases.

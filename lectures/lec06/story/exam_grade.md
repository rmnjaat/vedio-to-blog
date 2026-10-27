# Lecture 8 (lec06) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 134 questions from `story/page_text.md` and the questions-only file alone (`story/blind_answers.json`). Step 2, the answers were graded against `qa/exam.json` without being changed. Where the key repeats a lecture claim that the fact-check corrected and the page carries the correction (Gravatar's hash is SHA-256 today, MD5 originally; ImageMagick is written in C, not C++; a private bucket alone doesn't force the API origin), the answer is graded on substance and counted correct.

## Score

| | count |
|---|---|
| correct | **119** |
| partial | 7 |
| wrong | 0 |
| missing (NOT ON PAGE) | 8 |
| **total** | 134 |

- Strict: **119 / 134 (88.8%)**
- Half credit for partials: **122.5 / 134 (91.4%)**
- The old long version scored 131/134 (97.8%; 98.9% with half credit) in `qa/exam_grade.md` (round 2 of the old version: 133/134, 99.3%).

Causes of the 15 non-correct answers: CUT-OK 12, CUT-LOSS 3 (two of them share one fix), PAGE-ERROR 0, READER-MISS 0.

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q001 | The board's four agenda items, in order | partial | CUT-OK | Board list. The overview's "three builds" carries the structure; on-demand image optimization is folded into Gravatar (§4.4). |
| Q019 | How Twitter could use the OG-image technique | missing | CUT-OK | A second example of the same trick; §1.4 already says "once you know the trick you see it everywhere". |
| Q026 | Why store the email, not only its hash | partial | CUT-LOSS | Reader gave login + profile page; the collision risk is absent. Same fix as Q031. |
| Q031 | How hash collisions were treated | missing | CUT-LOSS | Ch2 §2.2, after "a hash can't give it back. So the email stays.": "Logging in by hash alone would also mean that two emails that ever hashed alike could open each other's account; with the email stored, the design simply assumes hashes are unique, since two users with the same hash couldn't be told apart in the URL anyway, and for SHA-256 an accidental collision is negligible." (L-0066, L-0078; L-0078 fact-check note: accidental collisions are negligible.) |
| Q044 | Is inner vs left join the "minor optimization"? | partial | CUT-OK | Reader said no, but without the reason (they perform the same here). Q&A tangent; the page names the real optimization (active_photo_id). |
| Q047 | active_photo_id with is_active still in photos: transaction still needed? | missing | CUT-OK | Intermediate step. The page goes straight to the final design, which drops is_active, so the hybrid never arises. |
| Q057 | The board's two CDN benefits | partial | CUT-OK | Page: speed/scale and "a better experience for whoever is looking at the page"; key's second benefit is ease of use (a simple URL). Board wording; the simple URL is still the point of §4.2. |
| Q065 | Predicate pushdown | missing | CUT-OK | Q&A explanation of the optimizer. §3.5 keeps the effect (hash narrows to one user, then the join, then the flag); the term is optional. If wanted, §3.5 after "the flag picks one": "The optimizer runs the most selective filter first, the unique hash, before the join; that is called predicate pushdown." |
| Q070 | The board's six CDN steps for a URL-driven transform | partial | CUT-OK | Board list. The page places the transform at the origin (you build it because the CDN doesn't offer it) and says this is exactly what a CDN's image transformations do. |
| Q074 | What the CDN company's blog said | missing | CUT-OK | Source attribution. The content (ImageMagick, many-core machines, autoscaled fleet, nothing fancy) is in §4.4-4.5. |
| Q076 | Boolean or enum for a status | missing | CUT-OK | Q&A tangent; is_active is removed from the final design. |
| Q078 | Slack's membership table vs Gravatar's user_id | missing | CUT-OK | Cross-lecture Q&A comparison. |
| Q080 | The three hats of a senior engineer | missing | CUT-LOSS | Ch5 intro, after "This build is different on purpose.": "A senior engineer wears three hats at once: product manager (the requirements nobody else thought of), architect (a system that can grow) and engineer (the details that make every layer work). This chapter is the first hat." (L-0179, L-0180, L-0181, L-0182; L-0178 for "think only about requirements". Fact-check: accurate.) It also gives the overview's "A different hat" something to point at. |
| Q091 | Requirement questions in board order | partial | CUT-OK | Board order. The page reorders them as a story (authz and self-removal, limit, activity page, location, notifications, suggestions, feed); every item is present. |
| Q097 | Services the board listed for tagging | partial | CUT-OK | Board list; "Location" is the only one absent (the page has analytics, profile/activity and feed instead). |

Graded correct but flagged `found: false` by the reader: Q009 (folder tree; page uses logo.jpg instead of arpit.jpg), Q023 (PII: §2.1 "an email is personal data … keeps the address out of plain sight"), Q069, Q113.

## What was lost

- **Board lists, Q&A tangents and attributions (12 CUT-OK).** The agenda, the CDN-step list, the service list, the board order of the tagging questions, plus the join-type, Boolean-vs-enum, Slack and Twitter tangents and the CDN blog's attribution. A reader following the story doesn't need them.
- **Two real ideas (3 CUT-LOSS, 2 fixes).** The collision argument for storing the email (and the explicit "assume hashes are unique") and the three-hats framing of a senior engineer, which the overview and ch5 allude to ("a different hat") without saying what the hats are. One sentence each, above.
- No PAGE-ERROR: nothing the page says contradicted the key except where the page carries a fact-check correction.

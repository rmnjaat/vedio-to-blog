# Lecture 06 - blind-reader exam grade (round 1)

- Key: `lectures/lec06/qa/exam.json` (134 questions)
- Blind answers (built page only): `lectures/lec06/qa/blind_answers.json`
- Graded against the key's substance (numbers, order, conditions, who/what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 131 |
| partial | 3 (Q001, Q062, Q091) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**131/134 correct (97.8%); 132.5/134 = 98.9% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q001 | partial | The board's agenda order: Gravatar, on-demand image optimization, tagging, newly unread indicator. The answer gives the page's order (on-demand images first) and says "in that order". | **Present but distorted.** `s0-header.mdx:23` lists the systems in the page's chapter order. The board agenda (S01 00:00:00, in the L-0005 detail) is never shown. | Line 23, first sentence -> "The day covers four systems. On the board the agenda read, in order: designing Gravatar, on-demand image optimization, tagging photos, and designing the newly unread message indicator. [[L-0005]] The page starts with how images are served, because Gravatar and on-demand optimization both build on it. [[L-0013]]" |
| Q062 | partial | That the teacher gave "S3 is not public" as one of his own reasons, next to "S3 doesn't know which photo is active". The answer dismisses it as "not the real reason". | **Present but distorted.** `s3-serving.mdx:80` frames it as "one reason often given", line 88 opens "The real reason is...", and the RecallItem at line 200 says "A private bucket is not the obstacle". Transcript 01:18:26: "Because S3 is not public. Only my database knows which photo is active." The fact-check note replaced the teacher's point instead of sitting beside it. | Line 80 -> "It is a common question why the CDN doesn't point to S3 directly. The instructor's answer: because S3 is not public, and, more to the point, only the database knows which photo is active. [[L-0139]]" Keep the OAC SourceNote as the caveat. Line 88 "The real reason is that S3..." -> "And S3 doesn't know which photo is active..." [[L-0140]]. In the RecallItem (line 200), replace the last sentence with "In class the first reason given was that S3 isn't public; even if the CDN reads a private bucket (see the note), S3 still can't tell which photo is active." |
| Q091 | partial | The board's order of the requirement questions. The answer says no order is stated and moves self-removal up next to "who can tag"; on the board it is 4th, after notification & throttling. | **Present but distorted.** `s4-tagging.mdx` groups the questions by theme: self-removal sits at line 57 inside §4.2, before the max limit at line 67. The board S39 list (01:43:30) is never given in order. | After line 45 ("Each part below takes one question about the brief...") add: "On the class board the questions went up in this order: who can tag (authorization); max limit of people tagged in a photo; notification & throttling; self-removal; face recognition & suggestion (SLA); profile/activity (DB); feed. Self-removal is taken here with authorization, since it changes the same layer. [[L-0186 L-0201 L-0204 L-0208]]" |

## Correct, with minor omissions (no fix required)

- Q021: gives the Gravatar definition but doesn't quote the board's URL `https://gravatar.com/{hash(email)}`. The URL is on the page and used in nearby answers (Q022, Q056).
- Q055: writes the endpoint as `/photo/<hash>`; the board has `/photos/{hash}`. Minor.
- Q067: omits the board's sample row (729 | arpit@gmailcom | 0eafd172 | cdae).
- Q070: does not give the board's six numbered CDN steps ("cache the file locally, return the response" are folded in), and it puts the transform at the origin. That matches the transcript at 01:24:45 and L-0152, where the origin transforms, so the substance stands.
- Q109: names the pattern but leaves out its conditions (strong consistency vs efficiency, keeping pre-computed data updated). The reader gives these in Q110.

# Storyboard: l06-badge · "Three people, not three hundred" (§5.1, 35.7 s)

## 1. The one idea
In this design the badge counts unique senders since the last tap: every message raises the unread count, but only a
new sender raises the badge, and a tap clears the badge (deleting the set) without reading anything.

## 2. Why motion
Accumulation plus a reset. Fig 5·a (the static twin) puts "3" beside hundreds of unread messages, and Fig 5·d shows the
set and "tap → delete the set". The clip adds the time dimension: the reader watches which arrival moves which number
(each message bumps unread; only A's first, C's first and D's first touch the set and the badge), then sees one tap zero
the badge and empty the set while unread stays at 300, and a later message from D start the count again at 1.

## 3. Faithful to the lecture
| ledger | what was said | how the clip shows it |
|---|---|---|
| L-0231 | twist (a pseudo constraint): 3 means messages from three unique people; "300 messages, but from three unique people, so I'll show three" | header "this design: badge = unique senders"; A ×3 counts once; unread 300 vs badge 3 |
| L-0256 | whenever a user messages this user, the sender is put into the set | each new sender is written green into `B: { }` as its message arrives |
| L-0227 | clicking the icon drops the count to zero; it does not mean the messages were read | blue tap ring, badge → dashed 0, unread stays 300, "nothing read" |
| L-0257 | delete the set when the user clicks the messages icon | ✕ on the members, "set deleted on tap", `B: { }` |
| L-0233 | "newly" means since the last time I clicked the message icon | D after the tap: badge 1; summary row "since the tap: B: {D}, badge 1, unread 301" |

Context only: L-0224 (offline scenario: "B · offline"), L-0254 (badge = size of the set: the header and the dashed
badge–set link), L-0226, L-0230, L-0255 (prose).

**Not claimed**
- Nothing about how Instagram or any real app counts its badge (L-0226/L-0228 are unverifiable): the header says "this design".
- No complexity for the delete (the class's O(1) is corrected in prose by A-PTU-13); no Redis, SADD or DEL (§5.5, Fig 5·e).
- The A/C/D split and the 4 messages of beat 1 are illustrative; 300 is the teacher's number. "sped up" is on screen.
- Whether a real app hides the badge or shows 0: drawn as a dashed empty circle with 0.
- How the event reaches the set (messaging service, ON_MSG_UNSENT, workers) is §5.6/§6.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–80 | B is offline. Messages to B start arriving. | nothing: phone, dashed 0 badge, unread 0, `B: { }`, empty track |
| B1 ① | 80–400 | Three messages from A count once. C makes it two. | chip A → phone (unread 1, `A` green, badge 1, strip 1); A again (unread 2, "A: already in set"); A again (3); C (unread 4, `C` green, badge 2, strip 2) |
| B2 ② | 400–610 | Three hundred messages, three people: the badge says 3. | "sped up"; a stream of A/C/D chips; unread climbs to 300; D's first arrival → `D` green, badge 3, strip 3; "(300 messages)" |
| B3 ③ | 610–780 | A tap clears the badge and deletes the set. Nothing was read. | blue tap ring round the icon; badge → dashed 0; strip "│ tap 0"; ✕ on the members, "set deleted on tap", `B: { }` (the far `}` is rewritten tight); "nothing read" under unread 300 |
| B4 ④ | 780–900 | Newly means since that tap: one message from D, badge 1. | chip D → phone; unread 301; `D` green; badge 1; strip 1 |
| B5 | 900–1070 | The badge counts new senders since your last tap. | ghosted notes and the strip fade; two rows are written where the strip was: "before the tap · B: {A, C, D} · badge 3 · unread 300" and "since the tap · B: {D} · badge 1 · unread 301"; hold = poster |

The bottom strip "badge:" stamps each badge value as it changes: 1 2 3 (300 messages) │ tap 0 1. It is the clip's
memory while it plays. In B5 it gives way to a two-row before/after summary, so the poster states the lesson on its
own (critic C-12: the old poster mixed after-the-tap state with pale ghost labels).

Chapters (10 f into their beat): offline @10 · messages arrive @90 · 300 messages @410 · tap @620 · after the tap @790.

## 5. Poster and reduced-motion stills
Poster = frame 1069: phone with the ghosted tap ring, badge 1, unread 301, "nothing read"; set `B: { D }` (no gap)
with "set deleted on tap"; two rows under the track: "before the tap · B: {A, C, D} · badge 3 · unread 300" and
"since the tap · B: {D} · badge 1 · unread 301". No ghosted labels remain.
Reduced-motion stills: 70 (B0), 390 (end B1), 600 (end B2), 770 (end B3), 890 (end B4), 1069 (poster).

## 6. Page context
- **Predict (before the clip; P8 also sits before it):** "300 messages from 3 friends arrive while you're offline. What does the badge show, and what does one tap change?"
- **Caption under the clip:** "In this design the badge counts unique senders since your last tap: 300 messages from three people show 3. A tap clears the set and the badge, but nothing was read."
- **After:** prose states the requirement list (L-0232).

## Phone layout (720 × 930)
Phone glyph top-left (x 30–320) with the header in three lines and the set box to its right; the message track runs
right→left under the set and turns up into the phone's bottom edge; "B · offline" under the phone; the badge strip at
the bottom. Lettering 30, captions 32.

## Known limits
Status: reviewed. The badge digit is replaced with a short cross-fade (an in-place replacement, as the motion style
allows), not written. During the sped-up stretch the unread counter is a linear ramp, not one tick per chip (11 chips
stand for 296 messages). Ghosted notes ("A: already in set", "sped up", "B · offline") sit near 3:1 contrast by
design (past context) while the clip plays; they fade out in B5, replaced by the summary rows.

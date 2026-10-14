# lec06 follow-up fixes (after critic_final, faithfulness_verify, exam_grade_r2)

## Verification
- `site.sh build lec06`: build ok, 11 pages.
- `site.sh qa lec06 lectures/lec06/qa/followup_shots --widths 1440,390`: ok, no failures.
- `site.sh gates lec06 lectures/lec06/qa/gates_followup.txt`: **GATES PASS**. One earlier run failed: 3-serving scrolled sideways at 360 because of a long inline URL. Removing that URL fixed it.
- After-shots checked: fig/1440+390-light-fig-2e, 3b, 4d, 6c, 6d; step/390-light-fig-2c-s4, 2d-s5; 1440-light-4-tagging-top; 390-light-5-badge-top.
- No shared files touched, so no other lecture's gates needed.

## Issues
| id | change |
|---|---|
| C-21 (medium) | `figures/lec06/s2b-gravatar-fig2e.tsx:39-60,77,88`: new `spoken` prop on Column. The read-side join is now drawn unstruck, as on the board. `select * from users where hash = ?` sits in a dashed outline tagged "said in class, not written". Only the mark-active Tx is still struck. Desc (line 13) updated to match. |
| C-22 (low) | Overview `s0-header.mdx:25` and `s7-keep.mdx:69` now say plainly: "This lecture does not design the private platform … the question stays open". In `s4-tagging.mdx:144` and `s7-keep.mdx:53`, the YouTube video and the members-only series become short "Further watching / Further study" pointers. The schedule voice ("covered once, in an earlier cohort", "next parts") is gone. L-0006, L-0314 and L-0315 are ledger facts, so the pointers stay and keep their tags. |
| C-23 (low) | Chapter 4: the chapter dek no longer quotes the CXO's sentence, the frame says "nothing else attached" / "the questions the brief hides", and the §4.1 dek is now the three hats (`s4-tagging.mdx:6,10,12,18`). The CXO quote now appears once, in §4.1's first paragraph (L-0176). Chapter 5: the frame no longer repeats "number on the messages icon", and the §5.1 dek opens on "A 3 on the badge, hundreds unread" (`s5a-badge.mdx:10,17`). |
| C-24 (low) | Phone app lane moved right: `s2b-gravatar-fig2c.tsx:13` (78→90) and `s2b-gravatar-fig2d.tsx:14` (100→108). The step circles no longer touch "make c1d0" or "where id = 9f00". |
| C-25 (low) | `s5b-badge.tsx:203-206`: "notification system" now sits on two lines in a taller box (5·g, 6·c). The floating "checks here, writes there" is dropped on phone because the caption says it; the sheet is 614 tall. `s6-auxiliary.tsx:211`: "badge shows 2" moved clear of the ② circle (tx 70→86). |
| F-002 (medium) | `s2a-gravatar.mdx:92`: the caption now reads "…and the photo's path isn't stored (it is derived, as said in class)". |
| N-01 (low) | `s4-tagging-decisions.tsx:184,197-198,213`: the labels and desc now say "instructor's rule of thumb". |
| Exam Q070 (partial) | `s3-serving.mdx:138-149`: added the board's six-step "what a CDN does internally" list in board order. Step 4 is marked as the extra step, the origin does the transform, and the CDN caches each result. [[L-0152]] |
| Exam Q109 (partial) | No change: the grader marked it a reader slip, and L-0258/0259/0261 are already on the page. |
| Exam Q056 (note) | Endpoint aligned with the board's `/photos`: `s3-serving.mdx:57,59` and `s3-serving.tsx:80,105-106`. In Fig 3·b the label now sits on two lines, clear of the arrows. |
| Exam side note | No change: "Lecture 7" is course position 07, the previous lecture to position 08. |

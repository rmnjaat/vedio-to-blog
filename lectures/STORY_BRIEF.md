# Story brief: turning a lecture into a page people read instead of watching the video

The reader has never seen the class video and never will. This page replaces it. They should feel like they
are reading one well-told technical story, written to them, that leaves them understanding the system as well
as (or better than) someone who sat in the class. The owner rejected the previous version because it read like
notes about a class: complete, accurate, and impossible to follow. Readability and connected flow are now the
first goal. The full archive version is not kept.

## The reader
A working software engineer. Smart, busy, reading on a laptop or phone. Knows what a database and an API server
are. Has not seen the video, does not know the teacher, the students, or what happened in class.

## What the page must do
1. **One driving problem per lecture**, stated in the first screen in concrete terms the reader feels
   ("your friend's battery died an hour ago; why is the dot still green?"). Every chapter moves that problem
   forward or opens the next problem it caused. If a lecture has two builds, say so up front, give each its own
   problem, and write a real hand-off between them (why we switch, what carries over).
2. **Every paragraph earns the next.** The chain is: problem → the simple thing you'd try → watch it break
   (concretely, with numbers) → the fix → what the fix costs → the next problem. Each paragraph answers a question
   the previous one raised. Transitions are reasons ("That fixes the lie, but now we store a row for every user
   forever. Who removes it?"), never "Next, let's look at…".
3. **One voice, talking to "you".** Write as the author teaching the reader directly. Never "the teacher said",
   "in class", "the board shows", "a student asked", "as taught", "the lecture's view", timestamps, "redrawn from
   the board". Student questions become the reader's natural questions ("You might ask: why not just…"). War
   stories from the class stay, told as stories ("One team learned this the hard way: …"), not attributed to
   anyone by name.
4. **State the correct fact once, confidently.** Use the fact-check results to write the true version in the main
   text. No "More precisely" boxes, no claim-then-retraction. A simplification is fine if it is true at the level
   stated ("Redis keeps data in memory, which is a big part of why it is fast"). Mention a common misconception
   only when it is itself the lesson.
5. **Protect the reveal.** Chapter and section titles are questions or situations, not answers ("Who deletes the
   silence?", not "Let the database expire it"). Pause-and-think prompts come before the answer, the answer is
   hidden until tapped, and the next paragraph does not repeat it. Never give away a later chapter's twist.
6. **Pictures carry the story.** At least one figure, step-through or clip per ~500–700 words, placed at the
   moment it explains something. One small "so far" diagram grows across the lecture (shown at the top of each
   chapter with the new piece highlighted) so the reader sees the dots connect. Remove figures that only restate a
   slogan. Each idea gets one representation in the main flow (clip or stepper, not both plus a prose retelling).
7. **Numbers make it real.** Keep the concrete arithmetic (100M users, 30 s heartbeats, 6M writes a minute,
   8 GB) and use it as plot: the number is what makes the next problem appear.
8. **Length.** About 30–50 minutes of reading per lecture (8–12k words), chapters of 900–1,800 words. Keep what
   serves the story. Interesting but off-road material (engine internals, vendor details, legal detail, long Q&A
   tangents) is cut, or kept as at most one short "Go deeper" box per chapter (under 120 words, collapsed).
9. **Connect the course.** Open by saying what the reader already knows (from earlier lectures) that this builds
   on; end with what the lecture unlocks and the question the next lecture picks up. Refer to other lectures as
   "Lecture N" with a link.
10. **Light furniture.** No notation legend at the top of chapters, no class timestamps in section meta (use an
   honest reading time at about 200 words per minute), at most one rule box per chapter, a closing "What you can
   now do" with concrete facts and decisions (not slogans), and 3–4 recall questions.

## Sources of truth (content)
`lectures/<id>/ledger/ledger.jsonl` (what was taught), `factcheck/final.jsonl` + `factcheck_applied.md` (the
correct version of each claim), `teaching_map.md` (how the class told it: hooks, questions, war stories, pace),
`transcript/` (the teacher's actual words and examples), and the existing page (figures and clips to reuse).
Nothing may be invented: every claim on the page is either from the lecture or a verified fact-check result.

## Self-check before calling it done
- Read only the chapter titles in order: do they tell the story by themselves?
- For every paragraph: what question does it answer, and which earlier sentence raised it?
- Could a reader retell the lecture in 7 sentences after one read?
- grep the page for: instructor, in class, the class, the board, as taught, lecture's view, More precisely,
  student. Zero hits outside quoted code.

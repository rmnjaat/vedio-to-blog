# Speaker Identification (Teacher vs Students)

Diarization labels (`SPEAKER_00`, `TEACHER`, ...) are machine guesses. In a live online class they fail in
predictable ways: the teacher's voice gets split into 2 labels after a long pause or a mic change; short student
interjections get swallowed into the teacher's segment; two students get the same label; the teacher reading a
chat question gets labelled as a student.

## Step 1 - map labels to roles (once per lecture)

Open `speaker_stats.md` (from prepare.py). Then read 3-4 stretches of the raw transcript (start, ~1h, ~2h, end).

| Signal | Teacher | Student |
|---|---|---|
| Talk share | dominant (typically 75-95%) | small |
| Turn length | long monologues, minutes | short, one or two sentences |
| Explains, defines, gives examples | yes ("dekho", "maan lo", "example lete hain", "isko bolte hain ...") | rarely |
| Manages class | "audible hai?", "screen dikh rahi hai?", "5 minute break lete hain", "koi doubt?", "clear hai?", "next topic pe chalte hain", "kal ka homework" | answers these |
| Addresses | uses names: "haan Rahul, bolo", "Priya ne poocha" | "sir", "ma'am", "bhaiya", "didi" |
| Questions | rhetorical, answered by self in the same turn ("toh kya karenge? hum cache lagayenge") | real questions, answered by someone else |
| Back-channel | "haan", "right", "exactly", "bilkul" after a student | "yes sir", "haan sir", "samajh gaya", "okay sir" |
| Chat reading | "ek question aaya hai...", "chat mein X pooch raha hai...", "kisi ne poocha hai ki..." | - |

Record the mapping in `term_decisions.md` -> Speaker map, with the evidence. If two labels are both clearly the
teacher (label split), map both to Teacher.

Naming: `Teacher`. Students: `Student 1`, `Student 2`... in order of first appearance, stable across the lecture
(one diarization label = one student number, unless evidence shows the label mixes people). If the teacher
addresses the student by name right before/after the turn, you may write `Student (Rahul)`; otherwise never
invent names. If the role is unknowable, `Speaker?` (flagged).

## Step 2 - fix turn-level errors (Pass 4)

Change a label only with **clear evidence**: two independent signals from the table above, or one decisive one
(e.g. the turn says "sir, mera doubt hai..." and the next turn answers it). Log every change as `SPEAKER`.

| Situation | Action |
|---|---|
| Student turn labelled Teacher ("Sir, kya hum Redis use kar sakte hain?" inside a teacher segment) | Split the segment; new turn `**[~HH:MM:SS] Student N:**`; log `SPLIT` + `SPEAKER` |
| Teacher answer labelled Student (long explanation under a student label, right after the student's question) | Relabel Teacher; log `SPEAKER` |
| Teacher reads a chat question aloud | Speaker stays **Teacher**. Mark it as a chat Q&A block (output-format.md). Do not attribute it to a student. |
| Teacher's rhetorical question | Stays inside the teacher's turn. NOT a student question, NOT a Q&A block. |
| Student says "yes sir" / "haan" inside a teacher monologue (diarization merged it) | Split it out only if clearly distinguishable ("...clear hai? Yes sir. Toh ab...") - otherwise leave it in the teacher's text; do not guess |
| Two students, same label, clearly different people (one says "mera bhi same doubt hai" replying to the other) | Split into Student N / Student M; log `SPEAKER` |
| Signals conflict or only one weak signal | Keep the diarization-derived role and append `?` -> `**[HH:MM:SS] Student?:**` (picked up by extract_flags.py) |
| Overlapping speech / crosstalk where words are unclear | `[unclear: "..."]` with the ASR text; do not assign it |

Never change WHO said something just because it would read better, and never merge a student's question into the
teacher's text or vice versa.

## Step 3 - mark Q&A (Pass 5)

A Q&A block = a question from a student (spoken or from chat) + the teacher's answer.
- Spoken student question -> `> **Student Question [HH:MM:SS] - Student N:** <their words>`
- Chat question read by teacher -> `> **Chat Question [HH:MM:SS] (read aloud by Teacher):** <teacher's exact words, including "ek question aaya hai">`
- The answer follows as normal Teacher turn(s) starting `**[HH:MM:SS] Teacher (answer):**`.
- Q&A sessions at the end of class (many questions) go under their own `## Q&A` heading.
- A question the teacher postpones ("isko baad mein discuss karenge") is still marked; add no answer.

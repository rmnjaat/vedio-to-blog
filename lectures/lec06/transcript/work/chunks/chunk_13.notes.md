# chunk_13 notes (lec06, 02:20:33-02:32:06)

## New technical terms / names (not in term_decisions)
- "over" / "over and over" = O(1)? 02:22:55 teacher "every set gives a track of the length of the set. It's over. Don't worry." and 02:23:26 student "that deletion will be over and over. So I think this system is much more efficient." Both read like "O of 1" (constant-time set length / delete). Flagged `[?O(1) | asr: "over"]` and `[?O(1) | asr: "over and over"]`, not corrected. Lead to decide whether to add an "O(1) | over" row.
- "duly and read count" 02:21:15 = "newly unread count"? (student says "newly unread count" at 02:22:04; feature is the "newly unread message indicator"). Flagged `[?newly unread | asr: "duly and read"]`.
- "unsend" -> "unsent" (02:30:22, 02:30:31): corrected WORD medium; the teacher's own event name is "on message unsent" (02:31:22, 02:31:34). CTX 02:32:27 "on message and send" (chunk_14) is the same event name - chunk_14 should flag/correct it consistently.
- "source of trust" (02:30:45, 02:31:10): teacher said "source of truth" at 02:24:03-02:24:54 in the same chunk. Kept "trust" as written (said twice, could be the teacher's wording). Lead may decide.
- "Let's use Redis purpose." 02:26:20 kept as spoken (maybe "for this purpose"; not flagged).

## Speaker doubts
- 02:21:55 "fetch this," moved to Student 4 (SPLIT, medium): completes "the API will try to".
- 02:22:11 "Okay." left with Student 4; "Correct." -> Teacher (map); 02:22:13 "Isn't that what set was supposed to be?" -> Teacher (medium, no name evidence).
- 02:23:32 STUDENT_7 "Correct." -> `Teacher?`.
- 02:21:43 STUDENT_11 "okay" -> `Student?`.
- 02:25:36 "Hey man, which database would you pick?" - "Hey man" could be a student's name (Hemant?) being called; Student 1 answers. Kept + `[check]`.
- 02:28:11 teacher calls "Pankaj" -> next turn labelled `Student 4 (Pankaj)` (attach rule). Inside it, "Correct, correct. So the client also is offline, yeah." (02:28:40) may be a teacher interjection - left with student + `[check]`.

## Other for the lead
- 02:30:52 teacher sentence starts with "help of online, offline indicator service" - words before it may be lost (no gap in gaps.md) -> `[check]`.
- 02:30:05 "you see very other use case as a very well explained" -> `[unclear]` (maybe "every other use case, as Pankaj very well explained").
- 02:22:50 "Set length is not doing." -> `[unclear]`; 02:21:09 "count be purpose" -> `[unclear: "be purpose"]`.
- Verifier lists 3 single-word drops (first, okay, messaging) - the words are present in the text (repeats "first, first ... first", "Okay. Okay.", "messaging, messaging"); alignment artefacts of the stutter rule, not failures.
- Topic candidates: 02:23:39 query source of truth vs pre-computed; 02:25:32 which database (Redis set); 02:27:52 updating Redis / input from messaging service.

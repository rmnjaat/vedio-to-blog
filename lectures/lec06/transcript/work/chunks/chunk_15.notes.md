# chunk_15 notes (lec06, 02:45:27-02:55:51)

## New technical terms / names (not in term_decisions)

- "Beauty and the Beast" (02:48:41) - teacher's analogy (rose in a glass jar); ASR "beauty in the beast car rose" -> corrected film name (WORD medium), "car" left as `[unclear]`.
- "MD5 hash" (02:49:31), "phantom reads" (02:53:17), "explain statements" / "E-X-P-L-A-I-N" (02:53:46-02:53:49), "storage engines" (02:51:28, next week's topic) - all already correct in ASR; no change.

## Lead decisions needed

1. `right` = write outside the frozen list. term_decisions allows "write" only for listed hits, so these are FLAGGED, not corrected: 02:45:56-02:45:57 "this right field, or rather this right succeeded in this right field" (`[?write failed]` / `[?write]`), 02:46:26 "one right succeeds, other right fails" (`[?write]` x2), 02:48:13 "no in the right" (`[?write]`). Context is the two-write inconsistency (set + auxiliary Redis), so "write" is near-certain at 02:45:56 and 02:46:26. Consider adding these to the lec06 write(s) row and resolving the flags.
2. "account" -> count? 02:46:13 "In the account, you would see two" and 02:50:58 "You have to update the account" (unread count). Flagged `[?count | asr: "account"]`.
3. 02:46:07 "very likely that the WhatsApp was that would happen" -> flagged `[?worst | asr: "WhatsApp was"]` (teacher says "what's the worst that would happen?" at 02:47:06 and 02:47:48).
4. 02:49:36 "your Gravatar visitor ID" -> flagged `[?user ID]` (question was about user ID).
5. 02:50:04 "messages from any of the charts" -> flagged `[?chats]`.
6. 02:52:19 "that is my solid condition" -> flagged `[?foundation]`.
7. 02:53:31 "that's my strong quota" -> kept + `[check]` (open question 14).
8. 02:54:42-02:54:44 "if you spot any optimization company's workflow suggest" -> `[unclear]`.
9. 02:46:56 "You take up some inconsistency responses in favor of high throughput" -> kept + `[check]`.
10. 02:48:59 "provide a user ID in the graph" - kept as is (maybe "hash"; not flagged, low signal). 02:49:04 "How grow that is like, I." -> `[unclear]`.
11. 02:51:55-02:51:58 3 s gap mid-question ("relational database. to improvise on this") -> `[check: words possibly lost]`.

## Speaker doubts

- 02:46:19 STUDENT_7 "Right? Yeah." -> `Teacher?` (logged SPEAKER medium, per speaker map).
- 02:47:58-02:48:29 crosstalk: split at 02:48:21 "No, no, no, I, what I'm saying is..." to Teacher (SPLIT medium). Phrases in Student 2's turn ("here, read before write over here? No, in the [write], even read is okay?") may be teacher interjections -> `[check]` added.
- 02:49:54 STUDENT_9 "Yeah. Yeah." and 02:50:35 STUDENT_9 "That's it." -> `Student?` (map: Student 9 only where clearly a student; "That's it." could be the teacher ending the definition).
- 02:51:45 TEACHER "So" kept as Teacher (could be part of Student 2's "So see, initially...").
- 02:55:26 "Thanks, J.K." -> kept + `[check: name spelling]` (open question 9: J.K. vs DK). The 02:51:39 resources question is Student 2 (unnamed).
- 02:55:29 Student 2 labelled `Student 2 (Chandan)` - teacher calls "Chandan, go on" at 02:55:27.

## Topic candidates

02:48:52 Gravatar user-ID question; 02:49:57 "on message unsent" question; 02:51:05 wrap-up (admin); 02:51:39 DB learning-resources question; 02:55:27 auxiliary Redis cluster question. All inside the final Q&A (02:42:15-02:55:51).

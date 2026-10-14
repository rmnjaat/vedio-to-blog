## Part 3 (02:02:56-02:55:36)

### Windows

"Covered" = part-3 items whose first audio range starts in the window. Every transcript sentence in each window was read and matched to an item; unmatched sentences were pure admin (student call-outs, "Hey man, which database", "folks who want to drop off", demo chatter while opening Instagram).

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:02:56-02:07:56 | 13 (K3-001..K3-013) | 0 | - |
| 02:07:56-02:12:56 | 7 (K3-014..K3-020) | 0 | - |
| 02:12:56-02:17:56 | 7 (K3-021..K3-027) | 0 | - |
| 02:17:56-02:22:56 | 7 (K3-028..K3-034) | 0 | - |
| 02:22:56-02:27:56 | 12 (K3-035..K3-046) | 0 | - |
| 02:27:56-02:32:56 | 12 (K3-047..K3-058) | 0 | - |
| 02:32:56-02:37:56 | 12 (K3-059..K3-070) | 0 | - |
| 02:37:56-02:42:56 | 9 (K3-071..K3-079) | 0 | - |
| 02:42:56-02:47:56 | 9 (K3-080..K3-088) | 0 | - |
| 02:47:56-02:52:56 | 8 (K3-089..K3-096) | 0 | - |
| 02:52:56-02:55:36 | 6 (K3-097..K3-102) | 1 | G3-001 |

Windows 02:07:56-02:22:56 have only 7 items each, but they are slow student-teacher dialogue (Student 3 building the crude schema and query, Student 4 the hash-map/set proposal) with much back-and-forth and repetition; each was re-read sentence by sentence and every taught point (schema, user activity table, ORDER BY correction, row-per-message problem, count-unique query, timestamp index, composite index order, 10,000-entry worst case, count table, set length O(1)) has an item. The only miss is a small aside at the end: the teacher saying the EXPLAIN/staging practice is how he became good (G3-001).

Verbatims: 102/102 found word for word (validator `part` PASS, 0 errors, 0 warnings).

### Distortions

- **K3-054**: says the if/else logic of where the user is "is implemented in the messaging layer". The teacher said front end. Transcript: "Depending on ifs and else's, where you are, what you are doing, you just implement those logics over here from the front end." Fix: "the if/else logic of where the user is and what they are doing is implemented there (the teacher said 'from the front end')"; add flag `check: "from the front end" - the event itself comes from the messaging service (K3-050/K3-052)`; set confidence medium.
- **K3-068**: invents a relation ("like Voldemort protects the Deathly Hallows"). The teacher only name-dropped both, through ASR-flagged words. Transcript: "It's like [?Voldemort | asr: \"world emote\"] and it's basically [?Deathly Hallows | asr: \"deathly halos\"]. Keep it protected no matter what. Keep it like well protected by all the magical charms". Fix: statement "Protect the database the Harry Potter way (the teacher invoked Voldemort and the Deathly Hallows): keep it protected no matter what, by all the magical charms."; confidence low (both proper nouns rest on flags).
- **K3-031**: wrong status and wrong actor. It says the teacher "clarified the count is a named key"; in fact the teacher asked and the student clarified, then the teacher only renamed the key. Transcript: "**Teacher:** Then is this even a hash table? **Student 4:** No, no, no, no. Count. It's the name of the, it's the name of the key." and "It's actually total, or rather [?newly unread | asr: \"duly and read\"] count." Fix: statement "...per user key, a hash map holding a count key; asked whether it was even a hash table, the student clarified that 'count' is the key's name, and the teacher renamed it newly unread count." Status `endorsed` (the rejection of the count comes in K3-032/K3-033, not here).
- **K3-087**: "while having three new senders" - the teacher said messages. Transcript: "You see two messages count of two, but in reality, you have three new messages." Fix: "at worst you see a count of two while in reality you have three new messages".
- **K3-088**: weakens the teacher's claim ("often does not matter"). Transcript: "but in real world, it really does not matter." Fix: "in the real world it really does not matter".
- **K3-096** (minor): drops the teacher's hedge about the series. Transcript: "I cannot claim that I will cover all of that, but it is definitely going to be a big value add". Fix: add to detail "He cannot claim the series covers everything, but says it is a big value add."
- **K3-077** (minor): drops "two of them will 100% blow your mind away"; the "granular details" is the reason, not the description. Transcript: "three interesting storage engines, two of them will 100% blow your mind away because we'll go into those granular details". Fix: "three storage engines, two of which will 'blow your mind' because the class goes into granular details".

### Duplicates (within part 3)

- K3-005 / K3-009 (detail) / K3-010 (detail): all say clicking the icon resets the count whether or not messages were read. The teacher did repeat it three times. K3-005 adds "acknowledging presence"; the details of K3-009/K3-010 add nothing new. Keep K3-005; drop the repeats from the details.
- K3-043 / K3-056: any key-value store with a set as the value. K3-043 adds Redis as an oversimplified choice and "don't check-and-set yourself"; K3-056 adds "partitionable by default (all of them are)". Merge into K3-043, keep K3-056's partitionable clause.
- K3-054 / K3-092: "on message unsent" is an umbrella event. K3-054 adds the if/else placement and board name ON_MSG_UNSENT; K3-092 adds "could not deliver in real time" and Student 5's mistaken assumption (only when inactive). Merge, keep both nuances.
- K3-051 / K3-093: the definition of unsent (other tab vs offline) varies. K3-051 adds the teacher's simplification (offline only here) and "it comes from the messaging service"; K3-093 adds "that is a product call" and "must update the count in real time". Partial overlap; cross-link.
- K3-060 / K3-067: database is the most brittle component. K3-060 is the first statement ("check for unnecessary operations"); K3-067 adds the pattern (minimise no-state-change ops) and "no matter which cloud provider". Partial; keep both, cross-linked (already depends_on).
- K3-067 / K3-069: the pattern restated at 02:39:36 (K3-069's second range). K3-069 adds the remedy (auxiliary database, "service stays up"). Partial; keep both.
- K3-063 / K3-065 / K3-072: n-1 repeated writes change nothing. K3-063 the state view (1 vs 10,000 from B), K3-065 the waste (network I/O + DB handling), K3-072 the fix (aux takes the n-1). Partial; keep, cross-linked.
- K3-075 / K3-086 / K3-087: inconsistency acceptable because not financial. K3-075 adds "end of product if the system is down"; K3-086 adds "distributed transactions not worth it"; K3-087 adds "high throughput" and the human-behaviour argument. K3-075/K3-086 near-duplicate; merge into K3-086 keeping K3-075's "system down = end of product".
- K3-074 / K3-084: clear deletes from both Redis instances. K3-084 adds "entry recreated on the next message". Merge into K3-074, keep K3-084's recreation clause.
- K3-079 / K3-080: threshold optimisation. K3-079 is the student's version (show "100+", stop writing); K3-080 the teacher's refinement (once set length > 100 don't write even a first entry for a new sender). Keep both (proposal + refinement).
- K3-044 + K3-045 / K3-057: read path restated in the architecture summary. K3-057 adds the write path and board layout. Partial; keep.
- K3-024 / K3-027 / K3-030: cost of iterating all of a user's messages. K3-024 adds page-load frequency and millions of users; K3-027 the 10,000-index-entries worst case after index tuning; K3-030 the "100% correct but inefficient" framing. Partial; keep.

### Duplicates across parts (involving part 3)

- K1-005 / K3-008: the unread indicator is used to introduce a high-level pattern. K1-005 adds "many companies use it in production to prevent major outages" and "surprisingly complex"; K3-008 is the restatement at the start of the design. Merge into K1-005 (or cross-link).
- K2-063 / K3-001: agenda says the unread indicator comes after photo tagging; K3-001 is the actual start of the design and lists the platforms. Partial; cross-link, don't merge.
- K1-058 / K3-091: Gravatar hash is MD5 of the email and a function of it. K1-058 adds "constant URL because the same input gives the same hash"; K3-091 adds why no user ID is injected (universal function; third parties like Facebook can render from the email alone). Partial; cross-link.

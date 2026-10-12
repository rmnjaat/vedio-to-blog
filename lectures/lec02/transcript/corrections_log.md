# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:00:28 | WORD | how great their known relational databases | how great their non-relational databases | "known relational" is not a database category; sentence is about NoSQL promoters "challenging the relational database"; "non"/"known" acoustic confusion; "non-relational databases" said throughout | medium |
| C0002 | 00:02:17 | TERM | the one human's architecture | the von Neumann architecture | term_decisions (von Neumann): CPU architecture context ("of the first CPU set") | medium |
| C0003 | 00:02:54 | TERM | either no-SQL databases | either NoSQL databases | term_decisions NoSQL (casing/spacing) | high |
| C0004 | 00:03:27 | TERM | No SQL databases scale | NoSQL databases scale | term_decisions NoSQL (casing/spacing) | high |
| C0005 | 00:04:41 | TERM | or no SQL databases | or NoSQL databases | term_decisions NoSQL (casing/spacing); "non-SQL" before it kept as spoken | high |
| C0006 | 00:08:01 | WORD | scaled relational to. | scaled, relational too. | homophone; "relational to. You give up on constraints" makes no sense with "to"; argument = relational databases scale too (00:07:18 "does not mean that relational databases don't scale") | medium |
| C0007 | 00:09:17 | WORD | no hard and fast tool | no hard and fast rule | fixed idiom "hard and fast rule"; "tool" meaningless here; teacher says "there is no rule that..." at 00:11:09 | medium |
| C0008 | 00:11:03 | TERM | Document devs typically | Document DBs typically | "devs" meaningless; paragraph contrasts key-value store with document databases; "document DBs" said at 00:09:48 and 00:11:35 | high |
| C0009 | 00:12:24 | TERM | could support asset properties | could support ACID properties | term_decisions ACID rule (00:12:24-00:12:32) | high |
| C0010 | 00:12:29 | TERM | We are not asset | We are not ACID | term_decisions ACID rule; contrasted with "we are base" (BASE) | high |
| C0011 | 00:12:31 | TERM | MongoDB is asset compliant | MongoDB is ACID compliant | term_decisions ACID rule | high |
| C0012 | 00:12:32 | TERM | they are asset compliant | they are ACID compliant | term_decisions ACID rule | high |
| C0013 | 00:13:26 | TERM | cross-sharp queries you have | cross-shard queries you have | continues CTX #228-#229 "you can very easily shard the database ... cross shard queries"; "sharp" nonsense here | high |
| C0014 | 00:13:42 | TERM | doing cross-sharp queries | doing cross-shard queries | same term, same explanation (IDs on different databases) | high |
| C0015 | 00:13:46 | TERM | key values to limits | key-value store limits | key-value store section (CTX #221-#223 "key values store"); "values to" nonsense; term_decisions key-value store | medium |
| C0016 | 00:14:17 | TERM | cross-shot queries | cross-shard queries | same term as 00:13:26/00:13:42; distribution context ("the lesser you can distribute the data") | high |
| C0017 | 00:15:17 | TERM | with KeyValueStore, you lost | with key-value store, you lost | spacing/casing of "key value store" (term_decisions key-value store); same term as 00:13:56 | high |
| C0018 | 00:16:38 | WORD | writing it on the desk | writing it on the disk | persistence context; teacher says "persisted on the disk" at 00:16:47 | high |
| C0019 | 00:26:08 | WORD | all the columns from the desk | all the columns from the disk | teacher repeats "From the disk, it reads all the columns" at 00:26:11 | high |
| C0020 | 00:27:54 | TERM | But in raw oriented databases | But in row-oriented databases | row/raw homophone; contrast with column-oriented; student asked "row oriented databases versus column oriented" at 00:27:20 | high |
| C0021 | 00:28:02 | TERM | But color-oriented databases | But column-oriented databases | non-term; column-oriented said correctly at 00:27:10 and 00:27:24, same compression explanation | high |
| C0022 | 00:29:42 | TERM | So color-oriented databases also same? | So column-oriented databases also same? | same term; Student 4's follow-up on column-oriented DBs | high |
| C0023 | 00:29:45 | TERM | No, color-oriented databases continuously run. | No, column-oriented databases continuously run. | same term; answer to 03 | high |
| C0024 | 00:32:20 | TERM | should not use grab | should not use graph | graph-database section; "graph databases" repeated in same sentence | high |
| C0025 | 00:33:51 | TERM | piece of cake in craft | piece of cake in graph | graph-database recommendation example; "craft" makes no sense; "through this graph" at 00:34:32 | medium |
| C0026 | 00:35:01 | TERM | someone in the court purchased | someone in the cohort purchased | "cohorts of users" said at 00:33:59, 00:34:32, 00:34:55, "in the cohort" at 00:34:29 | high |
| C0027 | 00:36:14 | TERM | They power this through Grab databases. | They power this through graph databases. | fraud detection = "best use case for graph databases" (00:35:24); "using graph database" at 00:36:41 | high |
| C0028 | 00:37:13 | WORD | whenever a new age is | whenever a new edge is | "new edge that is being created/formed" at 00:36:33 and 00:36:41; graph context | high |
| C0029 | 00:39:17 | WORD | Return in Go works | Written in Go, works | "Return in Go" is nonsense as a description of Dgraph; "written in Go" fits (teacher next says it was a project he read "to understand Go"); acoustic written/return | medium |
| C0030 | 00:39:22 | TERM | I use D-graph very | I use Dgraph very | product casing/hyphen; term_decisions canonical "Dgraph"; same product named at 00:39:15 | high |
| C0031 | 00:39:26 | WORD | Return in Go and that | Written in Go and that | same as 01, same database (Dgraph) | medium |
| C0032 | 00:39:31 | TERM | Badger DBS | BadgerDB | term_decisions: Dgraph's embedded DB, "Badger DBS" -> BadgerDB | high |
| C0033 | 00:39:35 | TERM | called Tiger Graph | called TigerGraph | term_decisions: TigerGraph (spacing of product name) | high |
| C0034 | 00:39:39 | TERM | actually use Tiger Graph | actually use TigerGraph | same as 07 | high |
| C0035 | 00:39:44 | TERM | They use Tiger Graph | They use TigerGraph | same as 07 | high |
| C0036 | 00:45:44 | TERM | for no sql database | for NoSQL database | term_decisions: NoSQL (spacing/casing) | high |
| C0037 | 00:45:50 | TERM | in non-resistant databases | in non-relational databases | "non-resistant databases" is not a term; whole passage contrasts relational vs non-relational, teacher says "non-relational" at 00:45:13 and 00:45:27 | medium |
| C0038 | 00:45:56 | TERM | toolings non-resistant databases give | toolings non-relational databases give | same as 04, same sentence | medium |
| C0039 | 00:47:55 | TERM | KVStore is a NAND | KV store is a NAND | term_decisions: "KVStore" -> "KV store" (spacing); "KV store" said at 00:47:44 / 00:47:47 | high |
| C0040 | 00:50:04 | TERM | uh sequel versus non-sql | SQL versus non-SQL | term_decisions rule: DB-type comparison, unambiguous; "uh" filler dropped | high |
| C0041 | 00:51:01 | TERM | Wiretigers documentation | WiredTiger's documentation | non-word; WiredTiger = MongoDB's storage engine; passage is about MongoDB's official documentation on ACID | medium |
| C0042 | 00:51:06 | TERM | cross-shad ACID | cross-shard ACID | non-word; teacher says "cross-shard ACID compliance" at 00:50:27 in the same answer | high |
| C0043 | 00:51:20 | SPEAKER | STUDENT_4 | Student 2 | #874 is the first half of one sentence that continues in #875 (STUDENT_2: "...relational databases right and / now we can also see..."); Student 2 asks the follow-ups on KV stores at 00:52:14 and 00:52:44 | medium |
| C0044 | 00:51:49 | SPEAKER | STUDENT_2 | Teacher | "No, no, no." answers Student 2's own question and opens the teacher's answer "KV store are databases of themselves" (same second) | high |
| C0045 | 00:53:04 | SPEAKER | STUDENT_2 | Teacher | "No, it depends on how you, what you're storing..." answers Student 2's "will perform same. Is it?" and continues without break into #910 TEACHER "what's the throughput, how we are partitioning..." | high |
| C0046 | 00:54:08 | TERM | discuss slags, real-time | discuss Slack's real-time | term_decisions: topic after the break is Slack real-time communication (01:00:05) | high |
| C0047 | 00:59:43 | HALLUCINATION | Thank you. | (removed) | term_decisions: PHRASE + AFTER-GAP (318 s break); teacher resumes 22 s later with "Let's start with the second half" | high |
| C0048 | 01:01:55 | WORD | We'll quick off our brainstorming | We'll kick off our brainstorming | term_decisions: "quick off" nonsense as is, idiom "kick off" fits, ASR vowel confusion | medium |
| C0049 | 01:02:02 | TERM | scaling web sockets and all | scaling WebSockets and all | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token) | high |
| C0050 | 01:02:04 | TERM | jumping to web sockets is | jumping to WebSockets is | same as 11 | high |
| C0051 | 01:02:07 | TERM | come to web sockets and | come to WebSockets and | same as 11 | high |
| C0052 | 01:03:20 | WORD | a channel stable | a channels table | word-boundary error: "channel stable" is nonsense; student is listing tables ("one table for users", next "a messages table" at 01:03:30) | high |
| C0053 | 01:03:40 | SPEAKER | STUDENT_11 | Student 1 | "sent the message and." completes Student 1's sentence "...the channel ID in which the user" (#987); term_decisions speaker map | high |
| C0054 | 01:03:43 | SPEAKER | STUDENT_11 | Student? | lone "Okay." under mixed label STUDENT_11; speaker not identifiable | medium |
| C0055 | 01:03:43 | DUPLICATE | Okay. | (removed) | #990 identical consecutive copy of #989 at the same second (01:03:43); term_decisions lists #989/#990 as removable duplicate | high |
| C0056 | 01:04:10 | SPEAKER | STUDENT_11 | Student 1 | answers Teacher's "Looking over here?" asked of the student who proposed "membership"; Teacher replies "If you did not, but you still came up with this word" = Student 1 (#995) | medium |
| C0057 | 01:08:21 | WORD | and two will be two | and to will be to | column "to" just named by Student 1 at 01:08:10 ("from, to, and message"); "two will be two can be anything" is the to-column | high |
| C0058 | 01:09:49 | WORD | foreign key check on two | foreign key check on to | the "to" column (from/to schema), "it can also point to user" | high |
| C0059 | 01:10:46 | WORD | call it two from | call it to from | names the attribute "to" ("from this user to this") | high |
| C0060 | 01:10:49 | WORD | Now two can be | Now to can be | same "to" attribute; "can be channel or a user" | high |
| C0061 | 01:11:04 | WORD | store two information | store to information | same "to" attribute (where the message is going) | high |
| C0062 | 01:11:21 | SPEAKER | STUDENT_1 | Teacher? | "What would you do?" follows Teacher's "Let me pull it. Unmute" - same call-on pattern as 01:09:05 "DP, what would you do?"; label kept uncertain | medium |
| C0063 | 01:12:32 | TERM | on slacks api | on Slack's API | product name Slack; "if you ever use slack api" follows (casing/apostrophe) | high |
| C0064 | 01:17:09 | WORD | checkpoint favorites red till | checkpoint, favorites, read till | list of membership attributes; teacher says "read till this point" at 01:15:30 and 01:16:06 about the checkpoint; red/read homophone | high |
| C0065 | 01:20:49 | TERM | partitioning and sharting | partitioning and sharding | term_decisions: "sharting" (01:20:49) -> sharding; non-word; "sharding and partitioning" said at 01:19:29 | high |
| C0066 | 01:20:52 | WORD | hard and fast food | hard and fast rule | idiom; teacher says "there is no hard and fast rule over here" at 01:19:41 in the same argument; "food" is nonsense here | high |
| C0067 | 01:22:24 | SPLIT | and, why do you need a socket connection? | Student 1: "...and," / Teacher: "Why do you need a socket connection?" | question challenges the student's own proposal; teacher immediately repeats it at 01:22:31 ("Why do you need a web socket connection?") and student answers at 01:22:32 - teacher interjection inside STUDENT_1 segment | medium |
| C0068 | 01:22:24 | SPEAKER | Student 1 | Teacher | split part of row 04 | medium |
| C0069 | 01:22:24 | TERM | have a web socket connection | have a WebSocket connection | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token) | high |
| C0070 | 01:22:31 | TERM | need a web socket connection | need a WebSocket connection | same as 07 | high |
| C0071 | 01:23:38 | TERM | you use web sockets | you use WebSockets | same as 07 (plural kept) | high |
| C0072 | 01:23:46 | TERM | bunch of web sockets server | bunch of WebSockets server | same as 07 (plural kept as spoken) | high |
| C0073 | 01:23:55 | TERM | And web sockets servers | And WebSockets servers | same as 07 (plural kept as spoken) | high |
| C0074 | 01:24:03 | TERM | via web socket also | via WebSocket also | same as 07 | high |
| C0075 | 01:24:06 | TERM | over web socket | over WebSocket | same as 07 | high |
| C0076 | 01:24:22 | TERM | using web socket, I can | using WebSocket, I can | same as 07 | high |
| C0077 | 01:24:32 | TERM | special web socket server | special WebSocket server | same as 07 | high |
| C0078 | 01:24:32 | TERM | message special web socket | message special WebSocket | same as 07 | high |
| C0079 | 01:24:37 | SPEAKER | Student 4 | Student 4 (Sunil) | teacher calls "Let me pull in Sunil. Sunil, what would you have done?" (01:24:28-29) right before; STUDENT_4 answers - name label only, role unchanged | high |
| C0080 | 01:24:57 | TERM | using web socket for | using WebSocket for | same as 07 | high |
| C0081 | 01:25:41 | TERM | Slacks user base | Slack's user base | term_decisions "Slack's" rule (possessive of the product; apostrophe splits the token) | high |
| C0082 | 01:25:58 | TERM | use web socket for everything | use WebSocket for everything | same as 07 | high |
| C0083 | 01:27:03 | TERM | choose a web socket | choose a WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token, as chunk_07) | high |
| C0084 | 01:30:19 | TERM | a web socket server | a WebSocket server | same as 02 | high |
| C0085 | 01:30:19 | TERM | are web socket connections | are WebSocket connections | same as 02 | high |
| C0086 | 01:31:44 | TERM | salutes, web socket. | salutes, WebSocket. | same as 02 ("salutes" kept and flagged unclear) | high |
| C0087 | 01:32:31 | TERM | or web socket, because | or WebSocket, because | same as 02 ("or" kept, flagged) | high |
| C0088 | 01:33:55 | TERM | your web socket server | your WebSocket server | same as 02; term split across segments #1481/#1482 | high |
| C0089 | 01:34:52 | WORD | can do batch right through | can do batch write through | term_decisions row "write-through / right through (01:34:57)": preceding sentence is about not making synchronous DB calls to store; "right"->"write" homophone. Following "a synchronous" flagged, not corrected | medium |
| C0090 | 01:36:33 | TERM | message on web socket | message on WebSocket | same as 02 | high |
| C0091 | 01:39:18 | TERM | the web socket server | the WebSocket server | same as 02 | high |
| C0092 | 01:40:12 | TERM | have a web socket connection | have a WebSocket connection | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token) | high |
| C0093 | 01:40:31 | TERM | web circuit connection | WebSocket connection | non-word phrase; student said "WebSocket connection for receiving" at 01:40:12 and "until WebSocket sends us" at 01:40:41 | high |
| C0094 | 01:41:18 | WORD | a send a message to be | A send a message to B | users A/B example; same sentence continues "who will tell B that the message is there now" | high |
| C0095 | 01:42:15 | TERM | slacks message persistence | Slack's message persistence | term_decisions "Slack's" rule (slags/slacks -> Slack's); topic = Slack design | high |
| C0096 | 01:42:50 | TERM | imply that web sockets do | imply that WebSockets do | same as 09 | high |
| C0097 | 01:43:41 | TERM | my web socket server to | my WebSocket server to | same as 09 | high |
| C0098 | 01:44:25 | TERM | cloud front edge servers | CloudFront edge servers | term_decisions row CloudFront (01:44:25) | high |
| C0099 | 01:44:25 | TERM | on which web socket | on which WebSocket | same as 09 | high |
| C0100 | 01:47:14 | TERM | just drew web socket server | just drew WebSocket server | same as 09 | high |
| C0101 | 01:47:14 | TERM | scale web socket servers | scale WebSocket servers | same as 09 | high |
| C0102 | 01:47:19 | TERM | because web socket servers that | because WebSocket servers that | same as 09 | high |
| C0103 | 01:47:27 | TERM | uses web sockets the | uses WebSockets the | same as 09 | high |
| C0104 | 01:47:35 | TERM | through the web sockets are | through the WebSockets are | same as 09 | high |
| C0105 | 01:48:27 | TERM | even a web socket server | even a WebSocket server | same as 09 | high |
| C0106 | 01:48:48 | TERM | web software server | WebSocket server | same explanation: "even a web socket server has a limit of number of connections" (01:48:19), "my web socket server has 4 connection limits" (01:49:18) | high |
| C0107 | 01:48:48 | TERM | four web software connections | four WebSocket connections | same as 05; connections limit of a WebSocket server | high |
| C0108 | 01:49:18 | TERM | my web socket server has | my WebSocket server has | same as 09 | high |
| C0109 | 01:49:31 | WORD | D for users connected | D, four users connected | homophone; "four connection limit" (01:48:34), A, B, C, D = four users | high |
| C0110 | 01:50:29 | TERM | the web socket server would know | the WebSocket server would know | same as 09 | high |
| C0111 | 01:50:34 | TERM | with the web socket | with the WebSocket | same as 09 | high |
| C0112 | 01:50:40 | TERM | Your web socket if | Your WebSocket if | same as 09 | high |
| C0113 | 01:50:45 | TERM | the web socket server knows | the WebSocket server knows | same as 09 | high |
| C0114 | 01:51:37 | TERM | to a web socket server | to a WebSocket server | same as 09 | high |
| C0115 | 01:51:47 | WORD | web socket correction it | WebSocket connection it | "while establishing the web socket correction" - establishing a connection; "correction" nonsensical here | high |
| C0116 | 01:52:08 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0117 | 01:52:36 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0118 | 01:52:36 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0119 | 01:52:43 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0120 | 01:53:01 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0121 | 01:53:01 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0122 | 01:53:10 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0123 | 01:53:20 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0124 | 01:53:27 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0125 | 01:53:42 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0126 | 01:53:48 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0127 | 01:53:54 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0128 | 01:53:54 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0129 | 01:54:05 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0130 | 01:54:24 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0131 | 01:54:24 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0132 | 01:55:35 | TERM | web sockets | WebSockets | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0133 | 01:56:13 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0134 | 01:57:30 | TERM | web sockets | WebSockets | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0135 | 01:57:54 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0136 | 01:58:42 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0137 | 01:58:42 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0138 | 01:58:49 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0139 | 01:59:08 | WORD | sent to B, C, T and | sent to B, C, D and | users in channel 1 on WS1 are A, B, C, D ("sends this same message to B, C and D" 01:54:34, "sent to b c d" 02:00:28); D/T acoustic confusion | high |
| C0140 | 02:00:08 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0141 | 02:01:38 | TERM | web socket | WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged per occurrence so the verifier matches the joined token, as chunk_08) | high |
| C0142 | 02:02:19 | SPLIT | right okay yes jodhinder what would you do over here | Teacher: "Right. Okay. Yes, Jodhinder, what would you do over here?" / Student 6: rest of segment | teacher calling on a student by name (same pattern as "Amrik, how would this message reach WS2?" 01:56:56); student answers with "uh so yeah like uh we could have..." | high |
| C0143 | 02:02:19 | SPEAKER | STUDENT_6 | Teacher | first half of #1931 continues teacher's 02:02:15 sentence and calls on the student; see 27 | high |
| C0144 | 02:02:49 | WORD | creating a match | creating a mesh | Student 6 just said "it will sort of form a mesh" (02:02:27); teacher restates it: "every WebSocket server has to be connected to every other WebSocket server" | high |
| C0145 | 02:03:48 | SPLIT | yeah i'm not able to think of it | Student?: "Yeah, I'm not able to think of it." | student reply inside teacher segment; teacher answers "that's fine that's fine that's why i'm here"; flagged in term_decisions turn-level rules (#1971) | high |
| C0146 | 02:04:04 | SPLIT | yeah so i think | Student 9: "Yeah, so I think" + #1975 | student starting answer after teacher calls on "harsh gone"; continues in STUDENT_9 #1975 "I'm not sure what this communication looks like"; term_decisions turn-level rules (#1974) | high |
| C0147 | 02:05:37 | SPEAKER | Student 1 | Teacher | STUDENT_1 "Correct." right after Student 1's own "..., right?" = teacher confirming; term_decisions turn-level rule cites this exact line | medium |
| C0148 | 02:05:40 | SPEAKER | Student 11 | Student? | STUDENT_11 "Why?" between Student 1 lines; could be teacher prodding; term_decisions says `Student?` | medium |
| C0149 | 02:06:12 | SPLIT | Student 3 | Teacher | "no no no they're just once" inside STUDENT_3 segment is the teacher's reply; continues "once once the tcp connection is established" in TEACHER segment 02:06:18 | high |
| C0150 | 02:06:32 | TERM | the web socket connection the web Socket servers | the WebSocket connection. The WebSocket servers | term_decisions: web socket -> WebSocket | high |
| C0151 | 02:07:01 | TERM | every web socket server has to connect to every other web socket server | every WebSocket server has to connect to every other WebSocket server | term_decisions: web socket -> WebSocket | high |
| C0152 | 02:08:30 | TERM | this real-time pubsub | this real-time Pub/Sub | term_decisions: pubsub -> Pub/Sub | high |
| C0153 | 02:08:36 | TERM | what is real-time pubsub | what is real-time Pub/Sub | term_decisions: pubsub -> Pub/Sub | high |
| C0154 | 02:08:41 | TERM | real time pops up | real-time Pub/Sub | term_decisions RULE (02:08:41 named): "pops up" right after "real time" in Pub/Sub discussion; "real-time pubsub" said at 02:08:36 | high |
| C0155 | 02:09:49 | TERM | real time pubsup | real-time Pub/Sub | non-word; term_decisions lists "pubsup" as Pub/Sub form; same explanation | high |
| C0156 | 02:10:01 | TERM | real time Pubser | real-time Pub/Sub | non-word; same explanation of real-time Pub/Sub; Redis named as example right after | high |
| C0157 | 02:10:56 | TERM | on Redis PubSub side | on Redis Pub/Sub side | term_decisions: PubSub -> Pub/Sub | high |
| C0158 | 02:11:01 | TERM | called PubSub channel | called Pub/Sub channel | term_decisions: PubSub -> Pub/Sub | high |
| C0159 | 02:11:13 | TERM | Redis PubSub is the one | Redis Pub/Sub is the one | term_decisions: PubSub -> Pub/Sub | high |
| C0160 | 02:11:22 | TERM | Redis PubSub backbone | Redis Pub/Sub backbone | term_decisions: PubSub -> Pub/Sub | high |
| C0161 | 02:12:02 | WORD | not be the server | not B, the server | "not be the server" is nonsense; user B was just named ("b connects"); next clause "the server here is subscribing ... not the user" | medium |
| C0162 | 02:12:17 | TERM | having web socket connection | having WebSocket connection | term_decisions: web socket -> WebSocket | high |
| C0163 | 02:12:21 | TERM | redis popsob | Redis Pub/Sub | non-word; "Redis PubSub backbone" said at 02:11:22 | high |
| C0164 | 02:12:25 | TERM | connects to web socket server it tells its membership web socket server | connects to WebSocket server it tells its membership WebSocket server | term_decisions: web socket -> WebSocket | high |
| C0165 | 02:13:46 | TERM | web socket server two is subscribed | WebSocket server two is subscribed | term_decisions: web socket -> WebSocket | high |
| C0166 | 02:13:46 | TERM | sent to web socket server two | sent to WebSocket server two | term_decisions: web socket -> WebSocket | high |
| C0167 | 02:13:54 | TERM | web socket server is not pulling the message web socket server is | WebSocket server is not pulling the message WebSocket server is | term_decisions: web socket -> WebSocket; "pulling" kept per term_decisions | high |
| C0168 | 02:16:01 | TERM | web socket server for one organization | WebSocket server for one organization | term_decisions: web socket -> WebSocket | high |
| C0169 | 02:16:13 | TERM | for a web socket server | for a WebSocket server | term_decisions: web socket -> WebSocket | high |
| C0170 | 02:16:15 | TERM | one web socket server for each | one WebSocket server for each | term_decisions: web socket -> WebSocket | high |
| C0171 | 02:17:41 | TERM | through this redisk | through this Redis | non-word; same sentence ends "minimize the IO that happens over Redis" (02:17:53-02:17:59); messages moved between WebSocket servers via Redis | high |
| C0172 | 02:18:02 | TERM | how web sockets are scaled | how WebSockets are scaled | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token, as chunk_08) | high |
| C0173 | 02:18:09 | TERM | scale web sockets | scale WebSockets | same as 08 | high |
| C0174 | 02:18:12 | TERM | introducing a real-time pubsub | introducing a real-time Pub/Sub | term_decisions: pubsub -> Pub/Sub (glossary canonical) | high |
| C0175 | 02:18:18 | TERM | real-time pubsub like Redis | real-time Pub/Sub like Redis | same as 10 | high |
| C0176 | 02:18:22 | TERM | Redis PubSub, highly | Redis Pub/Sub, highly | same as 10 | high |
| C0177 | 02:18:43 | TERM | over radius | over Redis | repeats 02:17:53 "minimize the IO that happens over Redis"; Redis Pub/Sub discussed just before (02:18:18-02:18:22) | high |
| C0178 | 02:18:56 | TERM | web pockets are scale | WebSockets are scale | non-word in context; same passage "how web sockets are scaled" (02:18:02), "this is how web socket server scale" (02:19:15) | high |
| C0179 | 02:19:15 | TERM | how web socket server scale | how WebSocket server scale | same as 08 | high |
| C0180 | 02:19:24 | TERM | slacks real-time | Slack's real-time | term_decisions "Slack's" rule (slags/slacks -> Slack's); topic = Slack design | high |
| C0181 | 02:20:24 | TERM | database note | database node | "one database note definitely would not be able to handle the load" - sharded database context; "note" nonsensical | high |
| C0182 | 02:21:03 | TERM | it's web sockets | it's WebSockets | same as 08 | high |
| C0183 | 02:21:58 | TERM | firebox | Firefox | browser connection limits: "six is for chrome eight is for firebox" | high |
| C0184 | 02:22:10 | TERM | typically have just one web socket connection | typically have just one WebSocket connection | same as 08 | high |
| C0185 | 02:22:28 | TERM | establishing web socket to | establishing WebSocket to | same as 08 | high |
| C0186 | 02:22:35 | TERM | create one web socket for | create one WebSocket for | same as 08 | high |
| C0187 | 02:22:50 | TERM | because web socket is a | because WebSocket is a | same as 08 | high |
| C0188 | 02:22:54 | TERM | create one web socket connection, one is gone | create one WebSocket connection, one is gone | same as 08 | high |
| C0189 | 02:23:14 | TERM | no web socket connections | no WebSocket connections | same as 08 | high |
| C0190 | 02:23:36 | TERM | one web socket connection open | one WebSocket connection open | same as 08 | high |
| C0191 | 02:23:48 | TERM | two web socket connections | two WebSocket connections | same as 08 | high |
| C0192 | 02:23:57 | TERM | additional web socket connections | additional WebSocket connections | same as 08 | high |
| C0193 | 02:24:04 | TERM | will have just one web socket connection | will have just one WebSocket connection | same as 08 | high |
| C0194 | 02:24:16 | TERM | through that same web socket connection | through that same WebSocket connection | same as 08 | high |
| C0195 | 02:24:21 | TERM | same web socket connection. | same WebSocket connection. | same as 08 | high |
| C0196 | 02:24:45 | TERM | just one web socket connection | just one WebSocket connection | same as 08 | high |
| C0197 | 02:25:18 | TERM | this basically web socket | this basically WebSocket | same as 08 | high |
| C0198 | 02:25:36 | TERM | here are the web socket connections | here are the WebSocket connections | same as 08 | high |
| C0199 | 02:27:21 | TERM | real type of sub | real-time Pub/Sub | "real-time pubsub" for inter-server messaging said at 02:18:12-02:18:18; list item "for inter-edge server communication" = Redis Pub/Sub role | medium |
| C0200 | 02:28:06 | TERM | get which web socket server | get which WebSocket server | same as 08; term split across segments #2371/#2372 | high |
| C0201 | 02:28:46 | TERM | understand what redis pubsub is | understand what Redis Pub/Sub is | term_decisions: pubsub -> Pub/Sub (glossary canonical) | high |
| C0202 | 02:29:06 | TERM | It is real-time | It is real-time Pub/Sub | "pumps up" after "real-time" in the Redis Pub/Sub explanation; term_decisions pops up/pubs up -> Pub/Sub rule; teacher says "real time pub sub" at 02:30:40 | medium |
| C0203 | 02:29:10 | TERM | pumps up. | (removed) | replaced by "Pub/Sub" in row 02 (term split across segments #2384/#2385) | medium |
| C0204 | 02:29:29 | TERM | this new web socket | this: new WebSocket | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token, as chunk_08/12); term split across segments #2388/#2389 | high |
| C0205 | 02:30:40 | TERM | world of web socket balancer, real time pub sub | world of WebSocket, balancer, real-time Pub/Sub | term_decisions: web socket -> WebSocket; pub sub -> Pub/Sub | high |
| C0206 | 02:31:01 | WORD | want to drop up | want to drop off | teacher says "folks who want to drop off, people to drop off" at 02:31:50 (same announcement); "drop up" nonsense | medium |
| C0207 | 02:31:01 | WORD | to drop up next week | to drop off next week | same as 06 ("will free" kept and flagged) | medium |
| C0208 | 02:31:58 | SPEAKER | Student 5 | Student 5 (Rajiv) | teacher calls "Rajiv, go on." (02:31:54) immediately before | high |
| C0209 | 02:32:05 | TERM | Normal web socket servers | Normal WebSocket servers | same as 04 | high |
| C0210 | 02:33:13 | TERM | to a web | to a WebSocket | same as 04; term split across segments #2471/#2472 | high |
| C0211 | 02:33:18 | TERM | socket server every time | server every time | joined into "WebSocket" in row 09 | high |
| C0212 | 02:33:30 | SPLIT | STUDENT_4 | Teacher | segment #2476 ends "yeah you get" and teacher's #2477 continues "ton of them"; teacher repeats "A ton of them, right?" at 02:33:59 -> "Yeah, you get" moved to the Teacher answer turn [~02:33:44] | high |
| C0213 | 02:34:01 | TERM | my ad server directly | my edge server directly | discussion of publicly exposed edge servers (student's question about edge servers 02:31:59, "IP addresses of their edge servers" 02:32:36); "This server will never talk to my database directly" 02:34:30 | medium |
| C0214 | 02:35:31 | TERM | load valancer | load balancer | non-word; "load balancer" said throughout this answer (02:32:42, 02:33:07) | high |
| C0215 | 02:35:45 | WORD | Always kill that thing in me. | Always keep that thing in mind. | teacher says "Always keep that thing in mind." at 02:31:49; "kill ... in me" nonsense | medium |
| C0216 | 02:36:44 | TERM | over a web socket connection | over a WebSocket connection | same as 04 | high |
| C0217 | 02:37:16 | TERM | this Redis PubSub and | this Redis Pub/Sub and | term_decisions: PubSub -> Pub/Sub | high |
| C0218 | 02:37:28 | TERM | tells your PubSub to | tells your Pub/Sub to | same as 15 | high |
| C0219 | 02:38:12 | TERM | now pepsockets server one | now WebSockets server one | non-word; same design: "I am WebSocket server one" (02:25:30-02:26:10, chunk_12), edge server subscribing to a channel on Redis | high |
| C0220 | 02:38:53 | TERM | Redis pubs up here | Redis Pub/Sub here | term_decisions row "pubs up (02:38:53)" -> Pub/Sub | high |
| C0221 | 02:39:04 | TERM | gives you real-time pop-up I'll | gives you real-time Pub/Sub, I'll | term_decisions rule: "real-time pop-up" -> Pub/Sub (02:39:12/02:39:27) | high |
| C0222 | 02:39:12 | TERM | focus on real-time pop-up | focus on real-time Pub/Sub | same as 19 | high |
| C0223 | 02:39:27 | TERM | pop-up whichever provider | Pub/Sub. Whichever provider | same as 19 ("real-time" ends segment #2584) | high |
| C0224 | 02:39:27 | TERM | gives you real-time pop-up or | gives you real-time Pub/Sub, or | same as 19 | high |
| C0225 | 02:40:48 | TERM | put your head servers | put your edge servers | student asked about "authenticity of data at the edge servers" (02:40:13); same answer later "make this ad server talk to your database" = edge server | medium |
| C0226 | 02:41:19 | TERM | make this ad server talk | make this edge server talk | same as 11/23 | medium |
| C0227 | 02:42:06 | TERM | make a call to tv | make a call to DB | term_decisions DB rule: 02:42:06 "call to tv and get it" = data lookup instead of calling a service | medium |
| C0228 | 02:43:15 | TERM | the web socket servers | the WebSocket servers | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token) | high |
| C0229 | 02:43:21 | TERM | the Redis copsev | the Redis Pub/Sub | non-word; "WebSocket servers are subscribing for a channel to the Redis ..." = Redis Pub/Sub; teacher says "Redis PubSub" at 02:46:11 | medium |
| C0230 | 02:43:45 | TERM | on this radius | on this Redis | "minimal transfer on this radius" right after "multiple Redis, a cluster of Redis"; radius makes no sense here, Redis acoustically close | medium |
| C0231 | 02:44:18 | TERM | that age servers are | that edge servers are | "age servers" nonsense; edge servers discussed at 02:43:57 ("one edge server") and in question context (public IP of edge servers) | high |
| C0232 | 02:44:18 | TERM | public iip part | public IP part | non-word "iip"; public IP of the edge servers (teacher: "spits out IP addresses" 02:45:12) | high |
| C0233 | 02:44:26 | TERM | if age server is | if edge server is | same as 04 | high |
| C0234 | 02:45:45 | TERM | red is pubs up | Redis Pub/Sub | term_decisions rule (red is -> Redis; pubs up -> Pub/Sub); teacher answers about Redis Pub/Sub vs Kafka | high |
| C0235 | 02:45:52 | TERM | real time pubs up | real time Pub/Sub | term_decisions: "pubs up" -> Pub/Sub; glossary lists "pubs up" | high |
| C0236 | 02:46:06 | TERM | a full base thing | a pull-based thing | "full base" nonsense; same sentence "People pull", next line "consumers pull message from Kafka", contrast "Redis PubSub pushes" | medium |
| C0237 | 02:46:11 | TERM | Redis PubSub pushes | Redis Pub/Sub pushes | term_decisions: PubSub -> Pub/Sub (punctuation; logged so the verifier can match the split token) | high |
| C0238 | 02:46:18 | TERM | persistence on PubSub | persistence on Pub/Sub | same as 22 | high |
| C0239 | 02:46:37 | TERM | yes, read is superior | yes, Redis is superior | Redis vs Kafka comparison: "In case of real time, yes, read is superior. In case of persistence, yes, Kafka is superior." | medium |
| C0240 | 02:49:54 | TERM | grab database | graph database | student asked about graph for hierarchy (02:49:41); "grab database ... than relational" | high |
| C0241 | 02:49:57 | TERM | then joints and queries | then joins and queries | DB query context (relational vs graph, joins on a database) | high |
| C0242 | 02:49:57 | TERM | and cell joints | and self joins | tree/hierarchy depth in a relational DB = self joins; "joints" -> joins as 12 | high |
| C0243 | 02:50:01 | TERM | nine cell joints | nine self joins | same as 13 | high |
| C0244 | 02:50:53 | TERM | anything fii | anything FYI | teacher uses "FYI" elsewhere in lec02 (term_decisions list); aside at end of sentence | medium |
| C0245 | 02:53:35 | WORD | 200 300 links | 200 300 lines | same point made at 02:53:15 "100-200 lines of code change" | medium |
| C0246 | 02:53:35 | WORD | when delusion happens | when deletion happens | "delusion" nonsense; topic = message deletion ("support deletion of messages" 02:53:10) | high |
| C0247 | 02:54:01 | TERM | with web sockets and | with WebSockets and | same as 21 | high |
| C0248 | 02:54:18 | TERM | this exactly one semantics | this exactly-once semantics | glossary exactly-once; "exactly one semantics" is not a term; message ordering / delivery guarantee question | medium |
| C0249 | 02:54:18 | TERM | who said exactly one | who said exactly-once | same as 18 | medium |
| C0250 | 02:54:24 | TERM | adding that exactly one semantics | adding that exactly-once semantics | same as 18 | medium |
| C0251 | 02:54:37 | SPEAKER | STUDENT_7 | Teacher | #2916 "Correct." confirms Student 7's "...maintain the communication dialogue, right?" (#2915); term_decisions turn rule: lone "Correct." answering a student's "right?" = Teacher back-channel | medium |
| C0252 | 03:02:35 | TERM | write to the DV | write to the DB | term_decisions DB rule (03:02:35 -> DB, high); "a single node ... the write was being written" storage context | high |
| C0253 | 03:03:45 | WORD | serving the right request | serving the write request | DB write context: "the write was being written over there" (03:02:22), teacher "your write comes to one data node" (03:03:36) | medium |
| C0254 | 03:03:58 | WORD | you accepted the right | you accepted the write | "Then you would never commit ... accepted the write ... when you wrote it to three different places" | high |
| C0255 | 03:04:33 | TERM | the TV has committed | the DB has committed | term_decisions DB rule (03:04:33 -> DB, medium); "worker holds the message until unless the DB commits it" (03:04:12) | medium |
| C0256 | 03:04:39 | TERM | like dynamo DB exactly | like DynamoDB exactly | term_decisions: dynamo DB -> DynamoDB (spacing/casing; logged so the verifier can match the joined token) | high |
| C0257 | 03:04:41 | TERM | to a dynamo DB internally | to a DynamoDB internally | same as 06 | high |
| C0258 | 03:04:47 | TERM | three different notes | three different nodes | same passage: "written to three different storage nodes" (03:04:45) | high |
| C0259 | 03:04:50 | WORD | says my right is complete | says my write is complete | "once it has completed writing to three different nodes, then only it says my write is complete" | high |
| C0260 | 03:05:31 | SPEAKER | STUDENT_5 | Teacher | "I have a video on it." follows Student 5's "we would like to understand more" and is repeated by TEACHER at 03:05:32/03:05:34 with "Microservices playlist"; the teacher owns the YouTube playlist (03:06:08) | medium |
| C0261 | 03:06:08 | TERM | the micro services playlist | the microservices playlist | term_decisions: micro services -> microservices (spacing; logged so the verifier can match the joined token) | high |
| C0262 | 03:07:44 | SPEAKER | Student 2 | Student 2 (Sampat) | Teacher calls "Sampat." (03:07:41) right before; STUDENT_2 answers with the question - name label only, role unchanged | high |
| C0263 | 03:09:51 | TERM | about web sockets | about WebSockets | term_decisions WebSocket rule (casing/spacing); topic = WebSocket client connection limit | high |
| C0264 | 03:10:39 | SPLIT | okay got it got it thanks | Teacher: "...The host name matters. Okay." / Student?: "Got it, got it, thanks." | acknowledgement of the answer just given to Student 10's question, inside the TEACHER segment; asker's ack, exact student not certain | medium |
| C0265 | 03:10:39 | SPEAKER | Teacher | Student? | split part of row 02 | medium |
| C0266 | 03:14:18 | TERM | discussing slacks, real-time | discussing Slack's real-time | term_decisions "Slack's" rule (03:14:18 named explicitly); topic = Slack real-time design | high |
| C0267 | 03:15:08 | TERM | redis pops up | Redis Pub/Sub | term_decisions Pub/Sub rule (03:15:08 "redis pops up" listed); teacher recommended "hello world with Redis Pub/Sub" at 02:18:18 | high |

## Totals by type

- DUPLICATE: 1
- HALLUCINATION: 1
- SPEAKER: 17
- SPLIT: 7
- TERM: 209
- WORD: 32

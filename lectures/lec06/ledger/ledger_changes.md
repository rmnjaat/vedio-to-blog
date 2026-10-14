# Lecture 06 ledger - changes log

Inputs: part1-3.jsonl (K1-001..K1-116, K2-001..K2-112, K3-001..K3-102), gaps.jsonl (G-001..G-005), board_items.jsonl (B-001..B-063), gap_report.md, flag_resolutions.md, transcript.md. Output: ledger.jsonl (final IDs L-0001..L-0321 in teaching order = first audio timestamp, board time for board-only items). Old->new IDs in id_map.json (398 original ids). Built by build_ledger.py; every decision below is the editor's.

## Distortion fixes (22 from gap_report.md, each re-checked against transcript.md; K1-111/K1-106 is one distortion, two lines) - 23 lines

- K1-005: detail's topic list now starts with 'a purely private image sharing platform' (audio never names Gravatar in the agenda; transcript 00:00:02 'how to make a purely private image sharing platform') [final L-0005]
- K1-062: removed 'scaling it is the difficult part' (read into [unclear: "good scan is"]); now 'something (unclear) is difficult, but building a prototype is not'; confidence medium -> low [final L-0061]
- K1-108: query now 'select * from users where ID = ?' as said (transcript 01:02:29 'select star from users where ID is equal to this'); added flag `check: teacher says "where ID" though the URL carries the hash` [final L-0109]
- K1-109: 'join with users' answer credited to the student (Student 2 at 01:03:35), teacher only agreed [final L-0110]
- K1-111: '(with the two user checks)' -> '(with those two additional checks)' (transcript 01:04:20); added flag on the 01:01:43 'you would still need this transaction' tension; confidence high -> medium [final L-0111]
- K1-106: detail notes that at 01:05:18 marking active becomes a single auto-commit query with no multi-query transaction [final L-0107]
- K1-116: added flag `check: "one or 10 minutes" (probably 1:10)`; confidence high -> medium [final L-0116]
- K1-055: detail 'Nothing beats practical experience' -> quotes the transcript 'Nothing beats practical structure' (wording as transcribed) [final L-0053]
- K2-074: status proposed_then_corrected -> endorsed (teacher: 'Obviously that's a check ... I know that's what you meant, but you put it in a different way'); detail now the refinement toward who-can-tag-me authorization; added flag `asr: [?what you meant | asr: "what you made it"]`; confidence stays medium [final L-0185]
- K2-084: 'distinct from system throttling' -> 'a different kind of throttling' (transcript 01:50:40 'Now this throttling is different. This is basically product level throttling') [final L-0195]
- K2-023: added flag `check: speaker of "Yes, yes, yeah" at the end of Student 1's turn`; status stays open [final L-0137]
- K2-056: detail now records the teacher's 'Yeah, so that's the exact' confirming select * from users where hash = ? before writing the update; flag 'student asked about the select query, teacher wrote the update query' removed as superseded by this fix [final L-0111]
- K2-060: detail appended: teacher endorsed the ownership check but as get-then-update, not a join (transcript 01:33:09 'you can do a get and then set') [final L-0171]
- K2-021: detail adds the select 'is_active = false where photo_id = ? and user_id = ?' (he first said true, then corrected to false) [final L-0135]
- K2-082: detail keeps the hedge: sending tag notifications is expected to be yes in most cases [final L-0193]
- K2-004: 'the AWS bill would shoot up' -> the teacher's words 'your AWS will go to shoot up' (no 'bill' in the audio) [final L-0119]
- K3-054: 'implemented in the messaging layer' -> 'implemented there (the teacher said "from the front end")'; added flag; confidence high -> medium [final L-0275]
- K3-068: removed invented relation 'like Voldemort protects the Deathly Hallows'; both names only invoked (both rest on ASR flags); confidence medium -> low [final L-0289]
- K3-031: the student (not the teacher) clarified 'count' is the key's name (transcript 02:20:49-02:20:53); status proposed_then_corrected -> endorsed (the count is dropped later, K3-032/K3-033) [final L-0252]
- K3-087: 'three new senders' -> 'in reality you have three new messages' (transcript 02:46:51) [final L-0306]
- K3-088: 'it often does not matter' -> 'it really does not matter' (transcript 02:47:37) [final L-0307]
- K3-096: detail adds the hedge 'I cannot claim that I will cover all of that, but it is definitely going to be a big value add' [final L-0314]
- K3-077: 'two of which go into granular details' -> 'two of which will "blow your mind" because the class goes into those granular details' [final L-0298]

## Duplicate merges (18 pairs; absorbed item -> kept item)

- K1-048 -> K1-040: same 'GitHub does not pre-generate OG images, generates on demand' point; absorbed nuance moved to detail ("Also at 00:23:04-00:23:42: GitHub does not create and store this image for every repository; it cannot pre-generate them because the image contains re..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0040]
- K1-046 -> K1-053: both name PIL and ImageMagick as image-generation libraries; absorbed nuance moved to detail ("At 00:22:16 the teacher first named ImageMagick or PIL as libraries for generating images on the fly, adding that there are tons of such libraries."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0047]
- K1-110 -> K1-108: both say active_photo_id in users removes the join on the most frequent query; absorbed nuance moved to detail ("Comparison at 01:03:48-01:04:20: two designs, is_active in the photos table versus active_photo_id in the users table; with the latter the most freque..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0109]
- K1-095 -> K1-096: same user_id ownership check on the second update (K1-095 = the rule and student exchange, K1-096 = the consequence); absorbed nuance moved to detail ("Another student first suggested the missing user ID; the teacher challenged it (photo id is the primary key, why pass user ID?) until a student gave t..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0097]
- K2-003 -> K1-082: cross-part repeat: storing the derived email hash against the previous lecture's advice; absorbed nuance moved to detail ("Recapped at 01:08:10-01:08:25 at the architecture stage: Gravatar stores the derived email hash, contrary to the previous lecture's advice not to stor..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0082]
- K2-027 -> K1-080: cross-part repeat (Q&A): hash(email) in WHERE forces a full table scan; absorbed nuance moved to detail ("Repeated at 01:19:15-01:19:52 for a student who did not understand why runtime hashing should not be done: with hash(email) = X in the WHERE clause th..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0081]
- K2-056 -> K1-111: cross-part repeat (Q&A): marking active is a single update on users; both query forms kept; absorbed nuance moved to detail ("Q&A at 01:30:56-01:31:47: a student checked that after the optimisation the active photo is read with select * from users where hash = <hash of email>..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0111]
- K3-008 -> K1-005: agenda promise restated when the unread-indicator topic starts; absorbed nuance moved to detail ("Restated at 02:05:30-02:05:58 when the topic starts: the newly unread indicator design is used to introduce a very interesting high-level pattern."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0005]
- K2-033 -> K2-016: both say CDNs expose invalidation APIs; K2-033 adds the names; absorbed nuance moved to detail ("Q&A at 01:22:15-01:22:36: asked how the cache is invalidated when the image is updated, the teacher said by calling the CDN's API - Cloudflare, Akamai..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0130]
- K2-034 -> K2-014: both say invalidate immediately for user experience rather than wait for the TTL; absorbed nuance moved to detail ("Q&A at 01:22:36-01:23:08: Gravatar does not rely on the TTL but invalidates up front because the user wants to see the new photo everywhere immediatel..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0128]
- K2-010 -> K2-001: both say upload with a pre-signed URL, then register the photo in the DB; absorbed nuance moved to detail ("Restated at 01:11:32-01:11:52 as a very basic flow, nothing super complicated: upload the photo to S3 using a pre-signed URL, then call the API server..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0117]
- K2-054 -> K2-048: both say bulky many-CPU machines, nothing fancy; absorbed nuance moved to detail ("Restated at 01:30:18-01:30:43: there is not much more to image optimization - it is about bulky servers autoscaled on the incoming requests."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0160]
- K2-086 -> K2-084: K2-086 is fully inside the product-level throttling point; absorbed nuance moved to detail ("Getting notifications for every single post you are tagged in is a bad user experience."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0195]
- K2-100 -> K2-099: both say tags need a DB supporting 'photos this user is tagged in'; absorbed nuance moved to detail ("You cannot pick any random database for tags: it must support that query very efficiently."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0209]
- K3-056 -> K3-043: both say any key-value store with a set as the value works; absorbed nuance moved to detail ("At 02:31:50-02:32:06: any key-value database that is partitionable by default (all of them are) and provides a set as value can hold the unique-sender..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0264]
- K3-092 -> K3-054: both define 'on message unsent' as an umbrella event; absorbed nuance moved to detail ("Q&A at 02:49:57-02:50:35: 'on message unsent' is an umbrella for whenever the system could not deliver a message to the user in real time; Student 5 h..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0275]
- K3-075 -> K3-086: near-duplicate: inconsistency acceptable because the system is not financial; absorbed nuance moved to detail ("At 02:40:07-02:40:35: keeping two databases may cause some glitches and slight inconsistency, acceptable because unread-message counts are not transac..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0296]
- K3-084 -> K3-074: both say clearing deletes from both Redis instances; absorbed nuance moved to detail ("Q&A at 02:45:00-02:45:45: when the user clicks the message icon, the set and the auxiliary entries are deleted; when another message arrives, the entr..."), absorbed verbatim kept in merged_verbatims, sources unioned [final L-0295]

## Cross-links instead of merges (partial overlaps; depends_on added on the later item) - 45 lines

- K1-092 depends_on K1-091: student proposes the transaction, teacher insists it be explicit (different speakers/status) [final L-0093 -> L-0092]
- K1-083 depends_on K1-081: hash column read side / write side (partial overlap, already linked) [final L-0084 -> L-0083]
- K1-097 depends_on K1-084: simple systems hide intricacies [final L-0098 -> L-0085]
- K1-113 depends_on K1-084: simple systems hide intricacies [final L-0113 -> L-0085]
- K1-113 depends_on K1-097: simple systems hide intricacies [final L-0113 -> L-0098]
- K1-114 depends_on K1-112: is_active-as-photo-attribute habit [final L-0114 -> L-0112]
- K1-062 depends_on K1-055: prototype advice [final L-0061 -> L-0053]
- K1-062 depends_on K1-052: prototype advice [final L-0061 -> L-0051]
- K1-108 depends_on K1-101: nitpicking optimisation introduced then resolved [final L-0109 -> L-0101]
- K1-111 depends_on K1-107: contradiction kept visible by the flag, not merged [final L-0111 -> L-0108]
- K2-002 depends_on K1-083: users table stores email and hash [final L-0118 -> L-0084]
- K2-029 depends_on K1-103: teacher states the same evaluation order later; K1-103 stays open [final L-0142 -> L-0104]
- K2-018 depends_on K1-096: wrong photo ID in the mark-active transaction [final L-0132 -> L-0097]
- K2-020 depends_on K1-092: 404 with no active photo, different cause [final L-0134 -> L-0093]
- K2-021 depends_on K1-096: check before writing [final L-0135 -> L-0097]
- K2-060 depends_on K1-096: ownership check [final L-0171 -> L-0097]
- K2-061 depends_on K2-022: check first, then write [final L-0172 -> L-0136]
- K2-006 depends_on K1-071: photo path derived, not stored (student proposal corrected vs teacher's mechanism: different speaker/status) [final L-0121 -> L-0070]
- K2-005 depends_on K1-059: Gravatar URL returns photo bytes [final L-0120 -> L-0058]
- K2-026 depends_on K2-005: API reads DB then S3 [final L-0140 -> L-0120]
- K2-009 depends_on K1-044: same CDN-miss-to-origin pattern, different system [final L-0124 -> L-0044]
- K2-040 depends_on K1-047: same CDN-miss-to-origin pattern [final L-0152 -> L-0046]
- K2-036 depends_on K1-003: on-demand image optimization promised as easy [final L-0148 -> L-0003]
- K2-046 depends_on K1-003: re-implementing a CDN feature [final L-0158 -> L-0003]
- K2-063 depends_on K1-004: senior engineers wear multiple hats [final L-0174 -> L-0004]
- K2-068 depends_on K1-004: senior engineers wear multiple hats [final L-0179 -> L-0004]
- K2-042 depends_on K1-053: PIL/ImageMagick binding wording differs; both kept [final L-0154 -> L-0047]
- K2-043 depends_on K1-053: ImageMagick bindings [final L-0155 -> L-0047]
- K2-017 depends_on K1-093: details make a simple system interesting [final L-0131 -> L-0094]
- K2-017 depends_on K1-097: details make a simple system interesting [final L-0131 -> L-0098]
- K2-053 depends_on K1-062: build local prototypes [final L-0166 -> L-0061]
- K2-110 depends_on K1-084: devil lies in the details [final L-0220 -> L-0085]
- K2-035 depends_on K1-116: on-demand image optimization not yet covered [final L-0146 -> L-0116]
- K2-088 depends_on K1-008: celebrity scale, opposite direction [final L-0198 -> L-0008]
- K2-051 depends_on K2-048: large servers, nothing magic [final L-0164 -> L-0160]
- K2-090 depends_on K2-075: who can tag [final L-0200 -> L-0186]
- K3-001 depends_on K2-063: agenda: unread indicator after tagging [final L-0223 -> L-0174]
- K3-091 depends_on K1-058: Gravatar hash = MD5 of email [final L-0310 -> L-0057]
- K3-093 depends_on K3-051: definition of unsent varies [final L-0311 -> L-0272]
- K3-069 depends_on K3-067: pattern restated with remedy [final L-0290 -> L-0288]
- K3-072 depends_on K3-063: n-1 repeated writes [final L-0293 -> L-0284]
- K3-072 depends_on K3-065: n-1 repeated writes [final L-0293 -> L-0286]
- K3-087 depends_on K3-086: inconsistency acceptable [final L-0306 -> L-0296]
- K3-080 depends_on K3-079: student proposal and teacher refinement [final L-0301 -> L-0300]
- K3-057 depends_on K3-044: read path restated in summary [final L-0278 -> L-0265]

## Board decisions (63 B-items: 59 merged into audio items, 4 new board-only items) - one line per B id

- B-001 -> merged into K1-005 (duplicates audio); board nuance added to detail: "Agenda - Designing Gravatar - On-demand Image Optimization - Tagging Photos - Designing Newly Unread Messag..." [final L-0005]
- B-002 -> merged into K1-025 (duplicates audio): "Once the request hits the server - reads the URL - reads the file from the server at the path - sends the r..." [final L-0025]
- B-003 -> merged into K1-026 (duplicates audio); board nuance added to detail: "https://arpitbhayani.me/static/img/arpit.jpg ... Folder structure site/ static/ img/ arpit.jpg logo.jpg js/..." [final L-0026]
- B-004 -> merged into K1-019 (duplicates audio); board nuance added to detail: "Bytes from the response are rendered as image" [final L-0019]
- B-005 -> merged into K1-029 (duplicates audio); board nuance added to detail: "@app.route('/raw/<path>') def raw_handler(path): raw_b = S3.read(path, BUCKET) return raw_b" [final L-0029]
- B-006 -> merged into K1-035 (duplicates audio); board nuance added to detail: "< GitHub og:image > dynamically gen[erated] image for social sharing" [final L-0035]
- B-007 -> merged into K1-056 (duplicates audio); board nuance added to detail: "Gravatar is your single embedable URL for profile picture https://gravatar.com/{hash(email)}" [final L-0055]
- B-008 -> new item (board-only: the 'security / PII' reason for hashing the email is not in the audio): "→ security PII" [final L-0054]
- B-009 -> merged into K1-059 (duplicates audio); board nuance added to detail: "if hash("arpit@gmail.com") = 0eafd172 <img src="https://gravatar.com/0eafd172" /> Renders the current profi..." [final L-0058]
- B-010 -> merged into K1-063 (duplicates audio): "Requirements - user can upload multiple pictures - user can mark one as active - active one should be retur..." [final L-0062]
- B-011 -> merged into K1-068 (duplicates audio); board nuance added to detail: "users id email hash photos id user_id is_active" [final L-0067]
- B-012 -> merged into K1-074 (duplicates audio): "Select * from photos join on users on photos.user_id = users.id where user_id = ?" [final L-0074]
- B-013 -> merged into K1-081 (duplicates audio); board nuance added to detail: "where HASH(email) = ? ... where users.hash = ?" [final L-0083]
- B-014 -> merged into K1-083 (duplicates audio); board nuance added to detail: "* id * email * hash" [final L-0084]
- B-015 -> merged into K1-072 (duplicates audio): "is_active : bool" [final L-0071]
- B-016 -> merged into K1-092 (duplicates audio); board nuance added to detail: "Tx update photos set is_active = False where user_id = ? ... update photos set is_active = true where id = ..." [final L-0093]
- B-017 -> merged into K1-090 (duplicates audio): "update photos set is_active = False where user_id = ? and is_active = True" [final L-0091]
- B-018 -> merged into K1-096 (duplicates audio); board nuance added to detail: "where id = ? and user_id = ? and is_active = false" [final L-0097]
- B-019 -> merged into K1-100 (duplicates audio): "where users.hash = ? and photos.is_active = True" [final L-0102]
- B-020 -> merged into K1-111 (duplicates audio); board nuance added to detail: "* active_photo_id ... update users set active_photo_id = ? where hash = ?" [final L-0111]
- B-021 -> merged into K2-001 (duplicates audio); board nuance added to detail: "photo upload service generates signed URL for S3://gravatar-images/{user_id}/{random photo id}" [final L-0117]
- B-022 -> merged into K2-001 (duplicates audio); board nuance added to detail: "Upload photo - user uploads photo to S3" [final L-0117]
- B-023 -> merged into K2-002 (duplicates audio); board nuance added to detail: "7abe 729 True ... 729 arpit@gmailcom 0eafd172" [final L-0118]
- B-024 -> merged into K2-005 (duplicates audio); board nuance added to detail: "- get hash from the URL - get active photo id from the database - read the file from S3 - return the response" [final L-0120]
- B-025 -> merged into K2-007 (duplicates audio): "let's use CDN to serve it Configure gravatar.com ——→ api.gravatar.com/photos" [final L-0122]
- B-026 -> merged into K2-004 (duplicates audio); board nuance added to detail: "We get, speed and scale of CDN & ease of use for user" [final L-0119]
- B-027 -> merged into K2-015 (duplicates audio); board nuance added to detail: "API update → queue → CDN Invalidation" [final L-0129]
- B-028 -> new item (board-only: 'denormalize the table to avoid joins' and 'active_S3_key' are not in the audio (related: active_photo_id items)): "Possible optimizations - You can denormalize the table to avoid Joins ... active_photo_id cdae ↑ active_S3_key" [final L-0147]
- B-029 -> merged into K2-037 (duplicates audio); board nuance added to detail: "1024 x 1024 Render : 32x32 <img src="https://gravatar.com/h1?w=32" /> Transformation" [final L-0149]
- B-030 -> merged into K2-039 (duplicates audio); board nuance added to detail: "URL driven image manipulations ... ?w=240 Query param contains the transformati[on] CDNs give this feature ..." [final L-0151]
- B-031 -> merged into K2-040 (duplicates audio); board nuance added to detail: "- reads the URL - if it has the file, return - if not read the file from origin - transform as per ..." [final L-0152]
- B-032 -> merged into K2-049 (duplicates audio); board nuance added to detail: "CPU intensive! Cannot be ASYNC large servers (size & numbers)" [final L-0161]
- B-033 -> merged into K2-041 (duplicates audio); board nuance added to detail: ""imagemagik"" [final L-0153]
- B-034 -> merged into K2-067 (duplicates audio); board nuance added to detail: "Tag in photos Brainstorm [ Think around requirements ] Questions:" [final L-0178]
- B-035 -> merged into K2-075 (duplicates audio): "- who can tag (authorization)" [final L-0186]
- B-036 -> merged into K2-076 (duplicates audio); board nuance added to detail: "- max limit of people tag in a photo" [final L-0187]
- B-037 -> merged into K2-081 (duplicates audio); board nuance added to detail: "- notification & throttling" [final L-0192]
- B-038 -> merged into K2-091 (duplicates audio): "- self-removal" [final L-0201]
- B-039 -> merged into K2-094 (duplicates audio); board nuance added to detail: "- Face recognition & suggestion (SLA)" [final L-0204]
- B-040 -> merged into K2-098 (duplicates audio); board nuance added to detail: "- profile/activity (DB)" [final L-0208]
- B-041 -> merged into K2-102 (duplicates audio): "- Feed" [final L-0211]
- B-042 -> merged into K2-104 (duplicates audio); board nuance added to detail: "Relative positioning location = ( 320/720 , 120/720 )" [final L-0213]
- B-043 -> merged into K2-107 (duplicates audio); board nuance added to detail: "Allows us to handle multiple devic[es] on-demand transformations at ea[ch]" [final L-0217]
- B-044 -> merged into K2-106 (duplicates audio): "LTRB / x,y,w,h" [final L-0216]
- B-045 -> new item (board-only: the posts_tags(post_id, user_id, location) schema is not spoken): "schema: posts_tags post_id | user_id | location" [final L-0214]
- B-046 -> merged into K2-108 (duplicates audio); board nuance added to detail: "Services to interact with: Search Face detection Location Notification RBAC [Authorized to tag?]" [final L-0218]
- B-047 -> merged into K2-109 (duplicates audio); board nuance added to detail: "Key component for extensibility : Kafka PHOTO_TAG event .... many consumers Search, Notification, An[...] P..." [final L-0219]
- B-048 -> merged into K3-009 (duplicates audio); board nuance added to detail: "We need to inform users about presence of new messages (not unread / unacked)." [final L-0230]
- B-049 -> merged into K3-011 (duplicates audio): "Requirements: * near-realtime * update upon new messages received from user" [final L-0232]
- B-050 -> merged into K3-011 (duplicates audio): "# new unreads = # different people from which message received and is unread" [final L-0232]
- B-051 -> merged into K3-019 (duplicates audio); board nuance added to detail: "user id user_activity user_id last_read_at messages msg from to ts. index (t[o…]" [final L-0240]
- B-052 -> merged into K3-029 (duplicates audio): "CRUDE ... INEFFICIENT Select count(uniq(from)) from ... where to = ? & ts > last_read_at" [final L-0250]
- B-053 -> merged into K3-033 (duplicates audio); board nuance added to detail: "user_id: { newly_unread_count: 3 unique_users: set< > } ... user_id: unique_users set< >" [final L-0254]
- B-054 -> merged into K3-036 (duplicates audio): "delete set when user clicks "[icon]" icon" [final L-0257]
- B-055 -> merged into K3-043 (duplicates audio): "K.value store value is set Redis" [final L-0264]
- B-056 -> merged into K3-044 (duplicates audio); board nuance added to detail: "getStatus clear ... Redis" [final L-0265]
- B-057 -> merged into K3-053 (duplicates audio): "Websockets know if a user is connected or not, we use thi[s] to find the undelivered messages" [final L-0274]
- B-058 -> merged into K3-055 (duplicates audio): "ON_MSG_UNSENT Becomes the input to our system" [final L-0276]
- B-059 -> merged into K3-055 (duplicates audio): "Each event would contain { src: "A" dest: "B" msg: "____" } ... UNIQUE USERS user_id : {u1, u2, u5}" [final L-0276]
- B-060 -> merged into K3-057 (duplicates audio): "READ Path → get_status clean_status Status check API Redis Cluster" [final L-0278]
- B-061 -> merged into K3-057 (duplicates audio); board nuance added to detail: "WRITE Path → Status update workers ... workers will update the users in Redis as it gets the event" [final L-0278]
- B-062 -> new item (board-only: 'can batch here { if part = recv id' is not in the audio; handwriting uncertain, kept low with its flag): "can batch here { if part = recv id" [final L-0277]
- B-063 -> merged into K3-071 (duplicates audio); board nuance added to detail: "Auxiliary Redis ... B_C : True B_D : True" [final L-0292]

## Flag resolutions from the board (flag_resolutions.md) - 32 lines

- K1-023: F010 resolved_by board 00:11:00 (URL https://arpitbhayani.me/static/img/arpit.jpg on the 'How images are served' page); flag removed; confidence medium -> high [final L-0023]
- K1-076: F031 resolved_by board 00:39:00 ('where HASH(email) = ?' written 00:38:30); flag removed; confidence medium -> high [final L-0077]
- K1-103: F041/F042 resolved_by board 00:58:45 ('where users.hash = ?' in both select queries); flag removed; confidence low -> low (other open flags remain: 2) [final L-0104]
- K1-104: F043 resolved_by board 01:00:30 ('and photos.is_active = True' ends the second select); flag removed; confidence medium -> high [final L-0105]
- K2-007: F047 resolved_by board 01:09:44 ('- read the file from S3' / 'S3://gravatar-images/{user_id}/{photo id}'); flag removed; confidence medium -> high [final L-0122]
- K2-026: F057 resolved_by board 01:18:15 (diagram label 'gravatar.com → api.gravatar.com'); flag removed; confidence medium -> high [final L-0140]
- K2-052: F072 resolved_by board 01:30:30 (pink 'Cannot be ASYNC'); flag removed; confidence medium -> medium (other open flags remain: 2) [final L-0165]
- K2-074: F079 resolved_by board 01:45:45 ('- who can tag (authorization)'); flag removed; confidence medium -> medium (other open flags remain: 5) [final L-0185]
- K2-090: F090 resolved_by board 01:52:45 ('- who can tag (authorization)' on screen); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0200]
- K2-108: F098 resolved_by board 02:01:15 ('Services to interact with: ... Face detection'); flag removed; confidence medium -> high [final L-0218]
- K3-011: F100 resolved_by board 02:07:12 (page 'Newly unread indicator'; '# new unreads = ...'); flag removed; confidence medium -> medium (other open flags remain: 2) [final L-0232]
- K3-011: F101 resolved_by board 02:07:12 ('number ③ indicates there are 3 people'; '# new unreads = # different people ...'); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0232]
- K3-014: F106/F107 resolved_by board 02:09:30 (table 'msgs' with columns msg, from, to, ts.); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0235]
- K3-024: F113 resolved_by board 02:16:00 (query 'Select count(uniq(from)) from ...'); flag removed; confidence medium -> high [final L-0245]
- K3-025: F114 resolved_by board 02:16:00 (column 'to', query 'wher[e] to = ? & ts > last_read_at', green 'index (t…' note); flag removed; confidence medium -> high [final L-0246]
- K3-031: F119 resolved_by board 02:22:00 ('newly_unread_count: 3' in the user_id block); flag removed; confidence medium -> medium (other open flags remain: 2) [final L-0252]
- K3-080: F136 resolved_by board 02:43:00 (green 'WRITE Path →' label); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0301]
- K3-082: F138/F139 resolved_by board 02:44:30 ('WRITE Path →'; red arrow into 'Auxiliary Redis'); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0303]
- K3-082: F140 resolved_by board 02:44:30 ('B: {C, D}' and 'B_C : True' / 'B_D : True'); flag removed; confidence medium -> high [final L-0303]
- K1-039: F014 supported_by board 00:18:00 (GitHub link card / og:image read '74 Forks'); flag kept and annotated; confidence unchanged (medium) [final L-0039]
- K1-042: F015 supported_by board 01:28:30 ('https://edge.arpitbhayani.me/img/arpit.jpg ?w=240' (at 01:28, not 00:20)); flag kept and annotated; confidence unchanged (medium) [final L-0042]
- K2-008: F048 supported_by board 01:28:30 ('https://edge.arpitbhayani.me/img/arpit.jpg ?w=240'); flag kept and annotated; confidence unchanged (medium) [final L-0123]
- K2-024: F054/F055 supported_by board 01:28:30 ('https://edge.arpitbhayani.me/img/arpit.jpg ?w=240'); flag kept and annotated; confidence unchanged (medium) [final L-0138]
- K1-058: F020 supported_by board 00:28:15 ('if hash("arpit@gmail.com") = 0eafd172' on screen); flag kept and annotated; confidence unchanged (medium) [final L-0057]
- K1-059: F021 supported_by board 00:12:45 (handler 'raw_b = S3.read(path, BUCKET)', '- reads the file from S3'); flag kept and annotated; confidence unchanged (medium) [final L-0058]
- K1-100: F038 supported_by board 00:58:45 (where clause extended with 'and photos.is_active = True'); flag kept and annotated; confidence unchanged (medium) [final L-0102]
- K2-004: F046 supported_by board 01:10:00 (yellow 'let's use CDN to serve it'); flag kept and annotated; confidence unchanged (medium) [final L-0119]
- K2-040: F070 supported_by board 01:24:45 ('- transform as per the given transformations'); flag kept and annotated; confidence unchanged (medium) [final L-0152]
- K2-052: F071 supported_by board 01:30:30 ('Cannot be ASYNC' (board has ASYNC, not asynchronous)); flag kept and annotated; confidence unchanged (medium) [final L-0165]
- K3-022: F112 supported_by board 02:16:00 ('Select count(uniq(from)) from ...'); flag kept and annotated; confidence unchanged (medium) [final L-0243]
- K3-053: F128 supported_by board 02:29:30 (yellow 'or ONLINE/ OFFLINE service'); flag kept and annotated; confidence unchanged (medium) [final L-0274]
- K3-085: F141/F143 supported_by board 02:46:15 ('WRITE Path →' on screen; 'failed' not on the board); flag kept and annotated; confidence unchanged (medium) [final L-0305]

Not applied (no ledger item carries the marker): F012, F032, F035, F037, F050, F058, F142, F148 (resolved) - the analysts wrote those terms without flags.

## Topic normalisation

- 'learning approach' -> 'learning-approach' (K1-055, K1-062, K2-053)
- 'engineering mindset' -> 'engineering-mindset' (K1-084, K1-087, K1-093, K1-097, K1-099, K1-113, K1-115, G-003)
- 'databases > schema > data-types' -> 'databases > schema-design > data-types' (K2-057, K2-058, K2-059)
- 'databases > schema > relationships' -> 'databases > schema-design > relationships' (K2-062)
- 'learning approach > intuition' -> 'learning-approach > intuition' (K3-078)
- 'learning approach > databases' -> 'learning-approach > databases' (K3-094, K3-095)
- 'learning approach > databases > explain' -> 'learning-approach > databases > explain' (K3-098, K3-099, K3-100, K3-101, G-005)
- Board-only items placed in the audio tree: B-008 'gravatar > url-design', B-028 'gravatar > schema > active-photo-id', B-045 'photo-tagging > storage', B-062 'unread-indicator > write-path'.
- Merged board items keep the audio item's topic (board topics such as 'tagging > ...', 'unread indicator > ...', 'course > agenda' are not used).

## Rejected hunter suggestions (with reason)

- K3-005 / K3-009 / K3-010: hunter suggested dropping the repeated 'click resets the count' from the details of K3-009 and K3-010; kept - the teacher repeated it inside the requirement definitions, and removing it would drop context, not duplication [final L-0230, L-0231].
- K2-009 / K2-024 and K2-007 / K2-024: not merged - K2-024 is a separate Q&A where a student read the mapping in reverse, with its own speaker/ASR flags; cross-linked (existing depends_on) [final L-0138].
- K1-071 / K2-006: not merged - K1-071 is a corrected student proposal, K2-006 the teacher's mechanism; cross-linked [final L-0070, L-0121].
- K1-081 / K1-083 ('merge or cross-link'): cross-linked, read side vs write side kept apart [final L-0083, L-0084].
- K2-075 / K2-090, K2-094 / K2-095, K2-108 / K2-109, K2-066 / K2-089 / K2-101 / K2-110, K3-063 / K3-065 / K3-072, K3-079 / K3-080, K3-060 / K3-067 / K3-069, K3-024 / K3-027 / K3-030, K3-044 / K3-045 / K3-057, K3-051 / K3-093: partial overlaps, kept separate with depends_on links (each adds its own nuance).
- K1-103: hunter suggested K2-029 settles it as endorsed; status kept open (no verdict at that moment), linked to K2-029 instead [final L-0104].
- K1-055 alternative 'drop the detail': not taken; detail now quotes the transcript.

## Validation

PASS final ledger lectures/lec06/ledger | errors 0 | warnings 0 (originals: 398 (parts 330, gaps 5, board 63) -> ledger 321 items)

# Lecture 01 - Board log

Source video: `vedio/5_6071343878177295376.mp4` (1280x694, 3:15:10). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`.

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks spelling that is clearly a slip of the pen; `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow is used for headings and "pros", pink/red for "cons"/warnings and boxed rules, light blue/purple for annotations. A green-grey rounded highlight marks emphasised words.
- The page is one long scrolling canvas, so many "states" are the same page scrolled to a different position. Entries note when a state only re-shows earlier content.
- Participant names/faces in the right-hand column are deliberately not recorded.

---

## S01 - 00:00:00-00:05:30 - Title slide (b_000530.jpg)
Topic: course title card (static slide, not handwriting).
Text: `SYSTEM DESIGN` / `MASTERCLASS` (white on a magenta brush stroke) / `Foundational topics in` / `System Design` (last line partly cut off at the bottom of the frame).
Change: first state.

## S02 - 00:05:45 (b_000545.jpg)
Topic: Agenda.
Text (heading `Agenda` in yellow; items in white, each preceded by `-`):
- `Caching at different levels`
- `Scaling`
- `Delegation`
- `Concurrency` (written `Concurrency`, the "rr" is cramped)
- `Communication`
Change: new handwritten page.

## S03 - 00:06:00-00:06:30 (b_000630.jpg)
Same agenda, scrolled up slightly. No new content.

## S04 - 00:06:45-00:16:15 - Caching at different levels (b_001615.jpg)
Topic: caching level 1, main memory of API server.
Text:
- Heading (yellow, centred): `Caching at different levels`
- `1. Main mem of API server`
  - `↳ limited`
  - `↳ API server cache / data down` (the word after "server" reads as "cache"; from audio context it may have been meant as "crash"; written word is not certain)
  - `↳ inconsistency`
- `2.` (number only, item not yet written)
Diagram (D-01, first form): stick-figure user on the left; two lines from the user to two stacked rectangles (API servers); each rectangle has a small pink filled dot in its top-right corner (the in-memory cache); a line from each API server to a cylinder labelled `DB` on the right. Above, a line from the top API server rises to a small cube/bucket shape labelled `Redis Rem c` (handwriting runs off the right edge of the page; presumably "Remote cache" but cut off). Above that label a separate partial word `Red` (abandoned start). 
Change: new page; list and diagram drawn incrementally during 00:06:45-00:16:15.

## S05 - 00:16:30-00:20:15 (b_002015.jpg)
Topic: caching level 2, DB views.
New text: `2. DB views (materalized)` [sic, "materialized"].
Change: item 2 added; page scrolled down a little.

## S06 - 00:20:30-00:20:45 (b_002045.jpg)
Topic: caching level 3, browser.
New text: `3. Brower (local sterage)` [sic, "Browser (local storage)"].

## S07 - 00:21:00-00:21:45 (b_002145.jpg)
Same items 1-3, scrolled up. New: a pink dot drawn on the user stick figure (cache at the client/browser) in diagram D-01.

## S08 - 00:22:00-00:22:30 (b_002230.jpg)
Same as S07 (scroll position only).

## S09 - 00:22:45-00:24:45 (b_002445.jpg)
Topic: browser caching example, personalised recommendations.
New text on line 3: `Personalized Recom ( Ranking stored on Browser )`, with `Recom ?` written as a small superscript above "Ranking". Also `4.` started.
Full line now: `3. Brower (local sterage) Personalized Recom ( Ranking stored on Browser )`.

## S10 - 00:25:00-00:28:30 (b_002830.jpg)
Topic: caching level 4, CDN caching responses.
New text: `4. CDN (cache response)`.
Diagram D-02: stick-figure user on the left; a cloud labelled `CDN` above, connected by an arc from the user to the cloud and an arc from the cloud down to a rectangle (API server); the API server is joined by a short arc to a cylinder (DB) on the right. Below the user: URL `https// s~ . — /popular` (abbreviated scribble; the middle of the host name is a squiggle, not letters; audio says "search.abc.com/popular").

## S11 - 00:28:45 (b_002845.jpg)
Scrolled view showing items 1-4, D-01 and D-02 together. New: `5.` started.

## S12 - 00:29:00-00:29:45 (b_002945.jpg)
Topic: caching level 5, disk of API server.
New text: `5. Disk of API serve !!` [sic, "server"; double exclamation marks for emphasis].

## S13 - 00:30:00-00:30:30 (b_003030.jpg)
Scrolled to top of the caching page: heading, items 1-5, D-01 and top of D-02. No new content.

## S14 - 00:30:45-00:31:45 (b_003145.jpg)
Same as S13, scrolled slightly. No new content.

## S15 - 00:32:00-00:32:30 (b_003230.jpg)
Scrolled down: items 4-5 and D-02 only. No new content.

## S16 - 00:32:45 (b_003245.jpg)
Emphasis on D-01: red scribble circles drawn over both pink cache dots in the API servers, and a red line traced from the user to the top API server (highlighting the request hitting the in-memory cache of one server). Otherwise same content as S13.

## S17 - 00:33:00-00:33:30 (b_003330.jpg)
Topic: caching level 6, load balancer.
New text: `6. Load Balan` ("Load Balancer" abbreviated/unfinished). Red highlight from S16 is gone (ephemeral highlighter).

## S18 - 00:33:45-00:34:00 (b_003400.jpg)
New text: line 6 now reads `6. Load Balan (API GW` (opening parenthesis, no closing one; "API GW" = API gateway).

## S19 - 00:34:15-00:34:30 (b_003430.jpg)
Same content, scrolled. No new content.

## S20 - 00:34:45-00:35:00 (b_003500.jpg)
Zoomed-out overview of the whole caching page (final form): heading `Caching at different levels`; items:
1. `Main mem of API server` (↳ `limited`, ↳ `API server cache / data down`, ↳ `inconsistency`)
2. `DB views (materalized)`
3. `Brower (local sterage) Personalized Recom ( Ranking stored on Browser )` with `Recom ?` above
4. `CDN (cache response)`
5. `Disk of API serve !!`
6. `Load Balan (API GW`
Diagrams D-01 (top right) and D-02 (middle right). Even zoomed out the label next to the cache cube reads only `Redis Rem c` (cut at page edge).

## S21 - 00:35:15 (b_003515.jpg)
Topic: Scaling (new page).
Text:
- Heading (yellow): `Scaling`
- `Ability to handle large number of concurrent requests` ("concurrent" highlighted with the green-grey highlighter)
- `Two scaling strategies`
- `- Vertical scaling ——— Hulk` ("Hulk" in pink), with a white curved arrow from Hulk to `Make infra bulky / add more CPU, RAM, Disk`
  - down arrow (white) to `Easy to manage` (yellow)
  - pink arrow to `Risk of downtime` (pink)
- `- Horizontal scaling ——— Minions` ("Minions" in pink); curved arrow from Minions to `Add more machines`
  - up arrow (pink) to `Complex Architecture` (pink)
  - up-right arrow (pink) to `Network Partitioning` (pink)
  - down arrow (white) to `Linear amplification` (yellow)
  - down-right arrow (white) to `Fault Tolerance` (yellow)
Change: new page. From here on most pages appear already written when first shown (prepared notes revealed by scrolling); only small additions are made live.

## S22 - 00:35:30-00:40:30 (b_004030.jpg)
Same page scrolled; new line `Good scaling plan [in general]` and the top edge of a pink box.

## S23 - 00:40:45-00:44:30 (b_004430.jpg)
Topic: good scaling plan.
New:
- `Good scaling plan [in general]`
- Diagram D-03: hand-drawn axes (vertical and horizontal lines); a yellow curve that rises steeply from near the origin then flattens into a horizontal plateau. A purple arrow points up at the rising part, label `Scale Vertically`; a purple arrow points at the plateau end, label `Then horizontally`.
- Pink box (rule): `No pre-mature optimizations`.

## S24 - 00:44:45-00:45:30 (b_004530.jpg)
Topic: scaling Medium; bottom-up scaling.
Text:
- `For our medium.com, we scale` (yellow)
  - `- vertically first`
  - `- then horizontally`
- `* Horizontal scaling ≈ ∞ scale , but there is a catch !!` ("Horizontal scaling ≈ ∞ scale" in yellow, "but there is a catch !!" in pink)
- Pink box: `Your stateful components like DB and cache can handle those many concurrent requests` (written exactly so; audio frames this as the catch, i.e. the question of whether they can)
- `Hence whenever you scale , always do it bottom up !` ("bottom up" highlighted green-grey)
- Diagram D-04: stick-figure user — line — box `LB` — three lines fanning out to three boxes each labelled `API`. In this frame the LB is circled in red (temporary emphasis).
- Diagram D-05: stick-figure user — line — box `API` — line — cylinder `DB`. Blue arrow down from API to `Then API servers`; blue arrow down from DB to `Scale DB first`.

## S25 - 00:45:45 (b_004545.jpg)
Scrolled down: start of `Scaling DB` (yellow) and partial diagrams below. Red circle on LB gone.

## S26 - 00:46:00 (b_004600.jpg)
Same as S24 without the red circle (scroll back up).

## S27 - 00:46:15-00:48:15 (b_004815.jpg)
Topic: scaling the DB.
New:
- `Scaling DB` (yellow)
- Diagram D-06 (three sub-diagrams side by side):
  - (a) small cylinder → arrow → larger cylinder; label `vertical scaling`.
  - (b) pink rectangle (API server) on top; pink bracket arrows down to two cylinders; a white arrow from the left cylinder to the right cylinder (master → replica); label `Read Replicas`.
  - (c) pink rectangle on top; pink lines/arrows going down the left side to one cylinder and down the right side to a second cylinder (bottom right), plus an arrow down to a third cylinder (top right); the three cylinders are separated by short white strokes (partition boundaries); label `Sharding`.

## S28 - 00:48:30-00:57:00 (b_005700.jpg)
Same scaling page scrolled so the full `Scaling DB` row is visible. No new strokes (board unchanged during the read-replica / sharding discussion 00:48-00:57).

## S29 - 00:57:15-01:05:30 (b_005715.jpg, b_005745.jpg, b_010530.jpg)
Same scaling page, scrolled between the medium.com block and `Scaling DB`. No new strokes during the read-replica / sharding / Q&A discussion. b_010530 is the clearest view of D-06.

## S30 - 01:05:45 (b_010545.jpg)
Topic: Delegation (new page).
Text:
- Heading (yellow): `Delegation`
- `let's add basic analytics to our blog`
- Diagram D-07 (profile-card mock, white box): stick-figure avatar on the left; text `Arpit Bhayani` / `CS Engineer, Educator, and a Polymath` / `74 essays` (yellow). A pink arrow points up at "74 essays" from the pink label `#blogs of a user`. (This is the teacher's own example profile drawn on the board.)
- Yellow-outlined box (rule): `What does not need to be done in realtime should not be done in realtime`
- Pink, under the box: `The mantra for performance`
- Partially visible at bottom: `Core idea: ...`

## S31 - 01:06:00-01:07:45 (b_010630.jpg, b_010715.jpg, b_010745.jpg)
Same page scrolled down.
New: `Core idea: Delegate & respond` ("Delegate & respond" inside a green highlight pill; written `Delegak & respond`). Top of D-08 visible (worker boxes, circled step numbers).

## S32 - 01:08:00 (b_010800.jpg)
Topic: storing a precomputed count (Medium example). Separate section of the page (empty space above it).
Text:
- `users` (pink, underlined) / `id , name , bio ,` (pink) / `total_blogs` (yellow) with a long white arrow → `Storing it pre-computed to avoid joins & runtime computation` (written `pre-compuked`; right end hidden behind participant tiles in this frame, fully legible in b_011130)
- Pink: `* a crude example`
- Top of D-09 visible (`ON_PUBLISH`, `total_blogs ++`, `worker`).
- A short red tick/stroke next to `total_blogs` (temporary highlighter).

## S33 - 01:08:15 (b_010815.jpg)
Scrolled back to the Delegation heading and profile card (S30). No new content.

## S34 - 01:08:30-01:09:00 (b_010900.jpg)
Topic: core idea of delegation.
Diagram D-08 (complete): stick figure labelled `Client`; arrow ① from Client → box `API`; arrow ③ from API back → Client; arrow ② from API → a horizontal pipe labelled `Broker`, with `Task` written under arrow ②; three lines fan out from the Broker to three boxes labelled `worker`; from the bottom worker a line goes down and then left with an arrowhead into a cylinder labelled `Database`, line labelled `update DB`; a vertical line joins API and Database.
Above: `Core idea: Delegate & respond` (highlighted) and `The mantra for performance`.

## S35 - 01:09:15-01:11:30 (b_011130.jpg)
Topic: Medium analytics with SQS (count of blogs).
Text: users block as in S32 (now fully legible: `Storing it pre-computed to avoid joins & runtime computation`), `* a crude example`.
Diagram D-09: stick figure → arrow → box `API`; from API a line labelled `ON_PUBLISH` (yellow) goes right and down with an arrowhead into a horizontal pipe labelled `SQS`; from SQS three arrows fan out to three boxes `worker`; label `total_blogs ++` (yellow) above the workers; lines from each worker go right to a vertical bus that runs down and back left with an arrowhead into the cylinder `Database`; a vertical line joins API and Database.
Below: `Similarly, we publish and consume ON-DELETE event` with a down arrow from "ON-DELETE event" to `total_blogs --`.
Bottom edge: start of the next line (cut off).

## S36 - 01:11:45-01:14:00 (b_011400.jpg)
Topic: Brokers; message queues vs message streams (a separate section shown here first, re-shown later).
Text and diagrams:
- `Brokers` (yellow); D-10: an incoming arrow (↳) into a pink pipe, outgoing arrow (┐↓) from its right end; caption `Buffer to keep the tasks & messages`.
- `Two common implementations`
- `Message Queues` (yellow) / `SQS, RabbitMQ`; D-11 top: arrow into a pink pipe; three arrows out to three boxes `Consumer`, each with one small yellow square (a message) beside it. A blue dashed circle (laser pointer) around the top consumer's square.
- `Message Streams` (yellow) / `Kafka, Kinesis`; D-11 bottom: five small yellow squares (messages) drawn above a pink pipe with an incoming arrow; two vertical lines hang down from the pipe to a box `Search` (drawn with two yellow offset outlines behind it, i.e. stacked/multiple instances) and a box `Analytics`.

## S37 - 01:14:15-01:14:45 (b_011415.jpg, b_011429.jpg, b_011430.jpg, b_011445.jpg)
Back on the SQS analytics section (D-09). New text below "total_blogs --":
- Yellow: `Say, we want to index the blogs on Elastic Search`
- Pink: `we can simply - add business logic to worker & index blogs on elasticsearch`
Pointer: blue dashed circle around `ON_PUBLISH` (b_011429), blue dashed stroke on a worker line (b_011445).

## S38 - 01:15:00-01:16:15 (b_011615.jpg)
Live addition to D-09: a cylinder labelled `ES` drawn at the right, with lines from each of the three workers to it (workers now also index into ES). A red highlighter stroke circles the top worker and sweeps around all three workers (emphasis: one worker doing both jobs).
Note: by 01:17:15 (b_011715) the ES cylinder and its lines are no longer visible (removed or drawn in temporary ink).

## S39 - 01:16:30-01:17:30 (b_011715.jpg, b_011728.jpg, b_011730.jpg)
Topic: why the single-worker design is bad; Kafka with two consumer types.
Text (b_011728, visible only for a few seconds; top line legible in the zoomed-out view at ~01:17:25):
- `This is not a good design, because` (first word partly cut in the zoom; "This is" inferred from layout, read as "...ot a good design, because")
- `- worker doing total_blogs++ & index on ES`, with a pink brace under "total_blogs++ & index on ES" pointing to the pink highlighted label `No separation of concern`
- `Seems something two separate teams should be working on !`
- Yellow: `Hence, we use Kafka`
- Pink: `Same event consumed by two types of consumers` ("consumed by two" highlighted green)
Diagram D-12: stick figure → `API`; `ON_PUBLISH` line from API into a pipe labelled `Kafka` (green highlight); from Kafka one arrow up-right → box `Search Service workers`, which connects by a vertical line up to a cylinder `ElasticSearch`; a second arrow down-right → box `Counter Service workers`, from which an arrow goes left into the cylinder `Database`; vertical line API—Database.
Pointer: a red arc under "Kafka" around ~01:17:30 (temporary).

## S40 - 01:17:41 (b_011741.jpg) - transient
Section shown for a few seconds while scrolling (heading legible in a 4 fps check):
- Heading (yellow): `Tasks that are delegated`
- `- long running tasks ( spin up EC2 / video encoding )`
- `- heavy computation query`
- `- batch & write`
- `- anything that could be eventual`
followed by the Brokers section (S36). Where exactly this block sits on the canvas relative to D-09/D-12 cannot be determined from the frames.

## S41 - 01:17:44-01:20:30 (b_011744.jpg, b_012030.jpg)
Brokers / MQ vs streams section. b_011744: red circle around `Message Queues SQS, RabbitMQ`.
Live change to D-11 (b_012030): the five yellow message squares are now drawn inside the stream pipe, and `Search` and `Analytics` are each connected by a vertical line to a message square in the pipe (each consumer reads from the stream at its own position); `Analytics` moved directly under `Search`.

## S42 - 01:20:44-01:21:15 (b_012044.jpg, b_012115.jpg)
Re-shows D-09 (SQS) and D-12 (Kafka) for comparison. No new strokes.

## S43 - 01:21:30 (b_012130.jpg)
Topic: Kafka essentials (new section).
Text:
- `Kafka essentials` (yellow)
- D-13 (top): incoming arrow (↳) into a white tube containing three light-blue horizontal lines (partitions); one yellow square at the right end of the top line; outgoing arrow (┐↓).
- `Kafka is a message stream that holds the messages`
- `Internally kafka has topic`
- `Every topic has 'n' partitions` (with a second tube to the right, three light-blue partition lines, four yellow squares above its right part)
- `Message is sent to a topic`
- `and depending on the configured hash key`
- `it is put into a partition`

## S44 - 01:21:45-01:22:00 (b_012200.jpg)
New/visible: `Within partition, messages are ordered` (yellow) and `↳ no ordering guarantee across partitions` (pink).

## S45 - 01:22:15-01:23:02 (b_012245.jpg, b_012302.jpg)
Live addition: label `ON-PUBLISH` written in white capitals above the top Kafka tube (the topic name). Zoomed crop confirms the letters O-N-(dash)-P-U-B-L-I-S-H (the L is cramped so it can look like "PUBUSH").

## S46 - 01:23:15-01:24:00 (b_012400.jpg)
Live change to the second tube: yellow message squares now placed at the right end of different partition lines (two on the top line, one below the bottom line) showing messages distributed across partitions; blue dashed pointer near the remaining incoming square. Start of `limitation of kafka` visible.

## S47 - 01:24:15-01:24:30 (b_012415.jpg, b_012430.jpg)
Topic: limitation of Kafka.
Text: `limitation of kafka`; `# consumers = # partitions`.
Diagram D-14: arrow with a yellow square (message) into a tube with three light-blue partition lines; up-arrow under the tube to `#partitions = 3`; from the tube's right end a bracket of three arrows to three pink boxes labelled `search consumer 1`, `search consumer 2`, `search consumer 3`; below them two more pink boxes each struck through with a red horizontal line, and a pink brace `} No messages would be sent to them`. A vertical line from the bottom of the tube goes down to a second, unlabelled group of three pink boxes (two side by side joined by a dashed line, one beneath). b_012430: blue dashed loop around the three search consumers (pointer).

## S48 - 01:24:45-01:31:00 (b_012530.jpg, b_012600.jpg, b_012745.jpg, b_012915.jpg, b_013100.jpg)
Scrolling between Kafka essentials, the limitation diagram and the MQ-vs-stream diagram while explaining consumers and committing. Only pointer strokes (blue dashed: around the bracket of arrows, a dashed line from the tube to consumer 2, an ellipse around `Analytics`). No new permanent text.

## S49 - 01:31:15-01:37:30 (b_013430.jpg, b_013730.jpg)
Q&A on delegation. Limitation diagram fully visible with labels `search consumer 1/2/3`; MQ vs streams section. No new content.

## S50 - 01:37:45-01:44:30 (b_014430.jpg) - break
Board shows the next (prepared) page, Concurrency, during the break:
- Heading (yellow): `Concurrency`
- `Concurrency → to get faster execution` with two arrows to `Threads` and `Multiprocessing`
- `Issues with concurrency` (yellow)
  - `- communication b/w threads` ("communication" highlighted pink-brown)
  - `- concurrent use of shared resources` ("shared resources" highlighted), with arrows → `database` and → `in-memory variables`
- `Handling concurrency` (yellow)
  - `- Locks (optimistic & pessimistics)` [sic]
  - `- Mutexes and semaphores` (written `semaphones`/`semaphores`, final letters cramped)
  - `- Go lock-free`, with a caret-inserted small `CRDT`

## S51 - 01:44:45-01:45:45 (b_014530.jpg, b_014545.jpg)
Same page scrolled. Visible below: pink `* we touch locking in depth the next week`.

## S52 - 01:46:00-01:50:15 (b_014915.jpg, b_015015.jpg)
Topic: concurrency in Medium.
- `Concurrency in our blogging platform` (yellow)
- `Two users clap the same blog , count should be += 2`
- `We protect our data through` (yellow, written `prokct`) → `Transactions` and → `Atomic instructions` (both in green highlight pills)

## S53 - 01:50:30 (b_015030.jpg)
Zoomed-out overview of the Communication page (D-15, D-16), later read in detail.

## S54 - 01:50:45-01:52:45 (b_015245.jpg)
Topic: Communication; usual request/response.
- Heading (yellow): `Communication`
- `The usual communication` (yellow)
- D-15: box `client` and box `server`; arrow client → server labelled `REQ` (pink); arrow server → client labelled `RES` (pink); pink down-arrow from the RES arrow to `Kept open with Timeout`; pink up-arrow to the server from `Heavy lifting`.

## S55 - 01:53:00-01:56:15 (b_015300.jpg, b_015500.jpg, b_015615.jpg)
Topic: short polling.
- `Short Polling` (yellow)
- D-16: box `client` ⟷ box `server` (double-headed arrow); a small circular arrow above the arrow labelled `every few seconds`.
- `eg: continuously` → `refreshing cricket score` and → `checking if server is ready`
- `Disadvantages:` (yellow) → `HTTP overhead` and → `requests and responses` (both highlighted pink-brown)

## S56 - 01:56:30-01:59:15 (b_015845.jpg, b_015915.jpg)
Topic: long polling; short vs long.
- `long Polling` (yellow)
- D-17: `client` → `server` arrow `REQ`; `server` → `client` arrow `RES`; below, highlighted `only when data is available`.
- `eg: response only when the ball is bowled`
- `Connection re-established after timeout & retried`
- `short polling v/s long polling` (yellow)
  - `- short polling sends response right away` ("sends response right away" highlighted)
  - `- long polling sends response only when done`
    - `- connection kept open for the entire duration`
- `eg: EC2 provisioning`
  - `↳ short polling - gets status every few seconds`
  - `↳ long polling - gets response when server ready`

## S57 - 01:59:30-02:02:30 (b_020230.jpg)
Topic: WebSockets.
- `WebSockets` (yellow); `Socket.IO` at the top right (white, read as "Socket·IO")
- D-18: `client` ⟷ `server` double-headed arrow; above it pink `Bidirectional Channel`; below it pink `Kept open` (in this frame the label is underlined/struck with red highlighter strokes; the red is gone in later frames).
- Pink: `* Server can proactively send data to the client *`
- `Advantages :` (yellow) `- realtime data transfer` ("realtime" highlighted), `- low communication overhead` ("low communication" highlighted)
- `Applications :` (yellow) `- realtime communication`, `- stock market ticker`, `- live experiences`, `- multi player games`

## S58 - 02:02:45-02:06:45 (b_020300.jpg, b_020330.jpg, b_020345.jpg, b_020415.jpg, b_020500.jpg, b_020645.jpg)
Topic: Server-sent events.
- `Server-sent events` (yellow)
- D-19: `client` and `server` boxes with two arrows between them: top arrow (yellow) pointing right (client → server), bottom arrow (white) pointing left (server → client); pink caption above `proactively sends data to client`; highlighted label below `Unidirectional`.
- `Applications:` `- stock market ticker`, `- deployment logs streaming`

## S59 - 02:07:00-02:08:30 (b_020700.jpg, b_020800.jpg, b_020815.jpg, b_020830.jpg)
Transition/pan and zoomed-out overviews of the WebSockets/SSE page and the long-polling page (red highlighter loop drawn on the long-polling page around "eg: response only when the ball is bowled ... short polling"). No new text.

## S60 - 02:08:45-02:11:15 (b_020930.jpg, b_020945.jpg, b_021030.jpg, b_021115.jpg)
Topic: communication in our blog (Medium).
- `Communication in our blog` (yellow)
- D-20: stick-figure user ⟷ (double arrow labelled `HTTP`, pink) box `API Server` ⟷ (double arrow labelled `persistent TCP`, pink) cylinder (database, unlabelled); a double-headed arrow labelled `WS` (pink) between the user and a box `Realtime likes`.
- `Realtime interactions:` (yellow)
  - `- on twitter , like count updates without refresh`
  - `- on medium , one article clapped , other readers should see it in realtime`
  - `- Instagram live interaction`

## S61 - 02:11:30-03:14:45 - Q&A (b_021245.jpg ... b_031445.jpg)
Teacher scrolls back to earlier pages while answering: long polling (b_021245, b_021515), Communication in our blog (b_021345), WebSockets (b_021615, b_022530, b_025745, b_031445), SSE (b_022030, b_024600 - static 02:25:45-02:46:00), Concurrency (b_025800), Kafka two-consumer diagram (b_025845, 02:58:15-02:58:45), SQS analytics diagram (b_030445, 02:59:00-03:04:45), zoomed WebSockets/SSE (b_030900). No new writing in this period.

## End - 03:15:00
Final frame is the meeting gallery view (no board); not kept, because it shows only participant tiles.

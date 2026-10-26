=== PAGE: lecture overview ===

Lecture 01 · two builds: a green dot, then a blog

# Green dots and blog rows

Your friend’s laptop died an hour ago, so why is the dot next to their name still green? Build that dot so it never lies and keeps up when a million people are online, then follow an ordinary blog through its first month: a mistaken delete, a slow home page, a viral post.

- Two builds, one story

- Last reviewed 26 Oct 2026

- Found an error?

Chapters of this lecture

- 1Why is the dot still green?The obvious login/logout design lies when a battery dies. Can the server check instead, and what must the client do?4 sections · §1.1–1.4

- 2Who deletes the silence?Store when the last beat arrived, count the bytes, and work out who should clean up after users who go quiet.4 sections · §2.1–2.4

- 3Two stores pass the test. Which one goes in the box?Redis and DynamoDB both pass the test. What actually decides between them?5 sections · §3.1–3.5

- 4The table is tiny. Why is the store struggling?The table is tiny, yet the store struggles. Where one write’s time really goes, and what to do about it.4 sections · §4.1–4.4

- 5A spike hits and autoscaling adds twenty servers. What do they get?Autoscaling adds servers in a spike. What they find when they ask the database for connections, how to size for it, and where the dot’s pattern shows up again.4 sections · §5.1–5.4

- 6A writer deletes a post by mistake. Can you give it back?The blog’s first month begins: a writer deletes the wrong post. What should delete mean, and where do deleted rows go?4 sections · §6.1–6.4

- 7The home page is slow. What’s in the row?The home page gets slower every week. The query, what it pays for, and the two row decisions that fix it.4 sections · §7.1–7.4

- 8One post goes viralOne post goes viral. What a cache is, one shared copy for the hot post, and the question Lecture 2 opens with.5 sections · §8.1–8.5

Look at the small green dot next to a friend’s name in any chat app. It makes a promise: this person is here, right now. In this lecture you build that dot, and the first version you would naturally write will lie.

The obvious design: when a user logs in, the app tells the server “I’m online”; when they log out, “I’m offline”. One true-or-false value per user. Done?

Now let the laptop’s battery die on a train. No “offline” call ever leaves the machine. Your friend keeps seeing green for someone who has been gone for hours.

Fixing that one lie forces nearly every decision in the first half of this lecture: what to store, who deletes it, which database holds it, and why a tiny table can still bring its database to its knees.

[figure title] What the user sees

[figure description] A friends list card with four rows: user 1 and user 4 have a green dot, online; user 5 and user 3 have a hollow ring, offline.

[figure labels] friends · user 1 · user 4 · user 5 · user 3 · online · offline

[caption] Fig 0·aThe brief, in one picture: a friends list with two people online (green) and two offline (an empty ring).

### What you’ll build #

Build 1, the green dot (chapters 1–5). You start from one boolean per user and find out, one failure at a time, what it takes to keep it honest: what the store must remember, who deletes it, which store holds it, and what happens to the database when every user writes at once.

Build 2, a blog’s first month (chapters 6–8). Then you follow an ordinary Medium-like blog through its first month: a writer deletes the wrong post, the home page slows down, and one post goes viral. Each forces a decision about what the database stores and where copies of it live.

The dot is tiny data with a brutal write rate. The blog is ordinary content that people care about. Between them they cover the two questions every design starts with: what must be stored, and what does it cost to read and write it.

### What you’ll be able to do #

- Design a presence indicator that stays honest when devices die, and say why a logout call can never be the whole answer.

- Estimate storage and write rate in two lines of arithmetic, and size a connection pool against the database’s limit.

- Choose between two stores that both “work”, on the grounds that actually decide it.

- Decide soft or hard delete, column types and date formats from the queries that use them, and say what a cache really is.

### Before you start #

You need to know what an API server, a database, an HTTP request and a TCP connection are. Nothing else is assumed: this is the first lecture.

Each chapter opens with a small map of the design so far, with the piece the last chapter added marked “new”. When a “Pause and think” box asks you something, commit to an answer before you open it.

Everything here runs on a laptop. After chapter 2 you can build the dot yourself: a tiny API, a local Redis and a script that sends heartbeats. Building it is what shows you where a design falters.

Lecture 01 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-still-green ===

# Green dots and blog rows, chapter 1: Why is the dot still green?

Lecture 01 · Green dots and blog rows · chapter 1 of 8

§ 1

## Why is the dot still green?

About 7 min

A product team hands you a one-line brief: show a list of users, each with a green dot if they are online and a grey one if they are not, the way Facebook and Twitter do. No scale target, no deadline. Just the dot.

Where do you start? With the one part the feature can’t exist without, here the data, adding every other part only when a question forces it in. Growing outward from a core like this is called the spiral approach; when you are unsure what a system needs, the incremental approach ships the simplest whole system and fixes what breaks. Neither is a rule, and most projects mix the two.

[figure title] The green dot so far

[figure description] The green dot so far: the obvious design. A laptop tells an API server online at login and offline at logout, and the server stores true or false for each user.

[figure labels] laptop · login: online · logout: offline · api · write · store · user → true/false · the green dot so far

[caption] Fig 1·aThe design you would write first: the app says “online” at login and “offline” at logout, and the server keeps one true/false per user. This chapter breaks it.

§ 1.1

## What does one dot need?

Ask the plainest question first: to draw one user with a green or a grey dot, what must you store? A user ID, an integer, and whether that user is online, a boolean.

Now look at how that data gets used. You read the status of a set of users, you read the status of one user, and you update the status of one user. Every access goes through the user’s ID. That is a key-value access pattern. Notice what it does not name: a database. You know how the data is read and written before you know where it lives, and that order matters: which tool fits comes later, once you know the property you need.

Something has to serve those reads, so an API server sits between the screen and the data. The first endpoint you would write takes one user ID and returns one status. But the screen shows a friends list. Four friends on screen means four calls from the front end, a slow screen for the user and four times the requests for your backend.

[figure title] Four calls or one

[figure description] user with a device ⟷ API server ⟷ database, both arrows double-headed. Two panels with a user holding a phone, an API server and a database joined by a double-headed arrow. Panel 1, one call per user: four blue arrows from the user to the API server, GET /status/u1 to u4; in red, 4 calls for 4 dots. Panel 2, one batch call: one blue arrow, GET /status/users?ids=u1,u2,u3,u4, a brace under the ids marking the users on screen, and a green reply listing each user as on or off.

[figure labels] api · db · GET /status/u1 · GET /status/u2 · GET /status/u3 · GET /status/u4 · 4 calls for 4 dots · one call per user · api · db · GET /status/users · ?ids=u1,u2,u3,u4 · the users on screen · {u1: on, u2: on, …} · one call, the backend does the work · one batch call

[caption] Fig 1·bFour calls or one. A single-user endpoint costs one call per dot; a batch endpoint carries every user on screen in one call and every status in one reply.

So the first real design decision is the shape of the endpoint: a batch read, GET /status/users?ids=u1,u2,u3,u4, that returns every status in one reply. The front end makes one call and the backend does the work. Shaping an endpoint for the screen that calls it, instead of drawing a box labelled “API”, is exactly the kind of detail that separates a design from a diagram.

Reading is settled. The harder half is writing: who keeps that boolean true?

§ 1.2

## The battery dies. Who tells the server?

The obvious answer is the one in Fig 1·a. The app calls the server with “I’m online” when the user logs in and “I’m offline” when they log out. Two calls per session, and the boolean is always right.

Pause and think

A user’s laptop battery dies in the middle of a session. Their app had sent “I’m online” at login. What do their friends see?

The “offline” call never leaves the machine. The server still holds online = true, and every friend keeps seeing green, for hours, for someone who is gone.

A crash, a dead battery and a pulled plug all look the same from the server: silence. A client can announce that it has arrived. It cannot promise to announce that it is leaving, because it isn’t in control of the moment it dies. That one asymmetry is the whole problem. The fix most people reach for first is to stop trusting the client and have the server check.

§ 1.3

## Why can’t the server just ask?

If the client can’t be trusted to say goodbye, let the server check: every few seconds, ask each client “are you alive?”. That is a pull model. The alternative, where each client keeps reporting on its own, is push.

Pull doesn’t work over plain HTTP, and the reason is direction. HTTP is a request-and-response protocol that the client starts. Your user’s laptop sits behind a home or office router that accepts no incoming calls, so the server has no way to open a conversation with it. It can only answer. The exception is a connection the client opens and both sides keep open for two-way messages, such as a WebSocket.

[figure title] Users push; the server can’t pull

[figure description] Three users on the left each send a blue arrow, their heartbeat, that merges into one API server, which writes to a database. A dashed arrow from the API server back toward the users carries a red cross: the server cannot reach the client. A speech bubble on the server says: can’t I just ask them? Below: users push their status periodically, unless there is a persistent connection.

[figure labels] api · db · can’t reach the client · can’t I just ask them? · users push their status periodically · * unless there is a persistent connection

[caption] Fig 1·cClients push; the server can’t pull. Each client sends its own beats (blue). The pull back to the clients is crossed out: over plain HTTP the server cannot start the conversation.

So the client pushes. Every client calls POST /heartbeat over and over, and each call marks whichever user is authenticated on that request as alive. The name says how it works: as long as a heart keeps beating, its owner is alive, and when the beats stop, they aren’t.

[summary] Go deeper: how real chat apps hold the line open skip unless you build presence

Production presence systems keep a persistent connection open instead of sending REST heartbeats. WebSocket is one way; Facebook built Messenger’s on MQTT because it uses little bandwidth and battery. The server still learns that a device died from silence: these connections carry their own small keep-alive pings, and when the pings stop, the server closes the connection and marks the user offline. Lecture 2 covers WebSockets, and Lecture 4 builds Slack’s real-time messaging on those persistent connections.

§ 1.4

## How long is long enough?

A single beat at login is no better than the two-call design: it says “I arrived” and nothing more. The beats have to keep coming, because the absence of a beat is now the only way the server learns that someone has gone. As long as beats arrive, the user is online. When none has arrived for long enough, the user is offline.

How long is “long enough”? There is no technical answer. It is a product decision you configure per system: one product can tolerate ten minutes, another wants ten seconds. This design sends a beat every 10 seconds and calls a user offline after 30 seconds of silence, so one or two delayed or lost beats don’t flicker a live user grey. Here is the same dead battery, played twice: once with login and logout calls, once with beats.

[figure title] Two calls are not enough

[figure description] Swim lanes for the user's laptop, the API server, the store and a friend's screen, time running down. 1: at login the laptop sends online; the store marks u7 online and the friend sees a green dot. 2: a while of use, nothing is sent, still green. 3: the battery dies and no offline call leaves the laptop. 4: much later the friend still sees green, a stale dot. 5: replay with periodic heartbeats every 10 seconds; after the battery dies there is silence, and after 30 seconds of silence the store marks u7 offline and the friend sees a ring.

[figure labels] laptop · api · store · friend · time · 1 · online · u7 = online · 2 · a while of use, · nothing sent · 3 · no “offline” call · 4 · much later · still green · 5 · replay, with heartbeats · 10s · 30 s · u7 offline

- At login the app says online. The store marks u7 = online and the friend sees a green dot.

- The user works for a while. Under the two-call design nothing else needs sending, so the dot stays green.

- The battery dies. The app never gets to say offline: no call leaves the laptop.

- Much later the friend still sees green, for a user who has long been gone. The dot is stale.

- Replay with a beat every 10 s. When the battery dies the beats stop, and after 30 s of silence the store marks u7 offline. The friend sees a ring.

Keys: ← → to step · link to a step with #fig-1c/step-3

[caption] Fig 1·dTime runs down. Lanes: the user’s laptop, the API server, the store and a friend’s screen. Blue is a call; the red ring is a stale dot.

That one number, 30 seconds, now has to live somewhere. And the boolean in the store can’t hold it: “true” says nothing about when the last beat arrived. The next chapter changes what the store remembers, and then finds out who has to clean up after users who stop beating.

Lecture 01, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-silence ===

# Green dots and blog rows, chapter 2: Who deletes the silence?

Lecture 01 · Green dots and blog rows · chapter 2 of 8

§ 2

## Who deletes the silence?

About 8 min

Clients now beat every 10 seconds, and 30 seconds of silence means offline. The design has stopped lying, at least on paper. But the store still holds a boolean, and a boolean can’t tell you how long it has been since you last heard from someone.

[figure title] The green dot so far

[figure description] The green dot so far. A laptop sends a heartbeat every 10 seconds to an API server, which writes the user and the time of the last beat to a store. Marked new: the periodic heartbeat.

[figure labels] new · laptop · heartbeat · every 10 s · api · write · store · user → last beat · the green dot so far

[caption] Fig 2·aThe green dot so far. Marked new: the periodic heartbeat that replaced the login and logout calls.

§ 2.1

## What should a row remember?

To know that 30 seconds have passed, you need the time of the last beat. So the row changes: instead of online = true, store when the last heartbeat arrived. The table becomes pulse(user_id, last_heartbeat), and every POST /heartbeat rewrites that user’s row with the current time.

[figure title] The pulse table and the two rules

[figure description] Left: table pulse with columns user_id and last_hb, rows u1 1000, u2 1050, u3 1060. Right: every heartbeat upserts the user’s row with the current time in epoch seconds. Below: a status read applies two rules to each requested id: no entry means offline; last_hb older than now minus 30 seconds means offline; otherwise online.

[figure labels] pulse · user_id · last_hb · u1 · 1000 · u2 · 1050 · u3 · 1060 · on every heartbeat: · UPSERT pulse · SET last_hb = now · WHERE user_id = u1 · epoch seconds · for each id in GET /status/users · no entry · → offline · last_hb < now − 30s · → offline · else · → online

[caption] Fig 2·bThe pulse table and the two rules. Every beat rewrites one row’s last heartbeat; reading a status applies two rules.

A user’s very first beat has no row to update, so write it as an upsert: insert the row, or update it if it already exists, in one atomic statement.

-- every POST /heartbeat (PostgreSQL) INSERT INTO pulse (user_id, last_heartbeat) VALUES (:uid, :now) ON CONFLICT (user_id) DO UPDATE SET last_heartbeat = EXCLUDED.last_heartbeat;

Reading now takes two rules, applied to every ID in a batch call. No row: the user never came online, so offline. A row whose last heartbeat is more than 30 seconds old: offline. Anything else: online. The time is stored as epoch seconds, the number of seconds since 1 January 1970, a plain integer. Hold on to that integer; it comes back when the blog has to store dates in chapter 7.

§ 2.2

## Is a billion users a storage problem?

Before you optimise anything, measure it. Suppose the product has a billion users. How much does the pulse table hold?

Pause and think

One row per user: a 4-byte user ID and a 4-byte timestamp. There are a billion users. Do you need special storage for this table?

Two 4-byte integers is 8 bytes a row, and 8 bytes × 1 billion rows = 8 GB. Your phone holds 128 GB. A trivial, cheap server holds 8 GB in RAM.

A billion users is about an eighth of the world’s population, and the whole table is still small. The 8 GB is raw payload, though. A real database adds bookkeeping to every row (PostgreSQL spends 23 bytes of header plus a 4-byte pointer on each one postgresql.org ↗), and a production schema would use an 8-byte timestamp. The true footprint is a few times 8 GB, and the conclusion doesn’t move: storage is not this system’s problem.

It doesn’t need shrinking. But asking “can this be smaller, is there an alternative?” at every step, and writing down the options you weighed, is a habit worth keeping. Here it leads somewhere useful.

§ 2.3

## If no row means offline, who removes the row?

The screen only ever shows green or grey. So let the absence of a row mean offline: a row exists only while its user is online. Every beat resets a 30-second timer on the user’s row; when the timer runs out, the row goes. The number of rows is then the number of people online right now. With 100,000 of a billion users active, that is 100,000 rows, about 800 KB.

[figure title] How big is it?

[figure description] Left: a ladder, 100 users give 100 rows, 1 thousand give 1 thousand, 1 million give 1 million, 1 billion give 1 billion; 1 billion times 8 bytes is 8 GB. Right: user_id and last_hb are each a 4-byte int, so 8 bytes per row; a phone holds 128 GB. Inset: with absence meaning offline, 100 thousand active users give 100 thousand rows, 800 KB.

[figure labels] 100 users · → · 100 rows · 1k · → · 1k · 1m · → · 1m · 1B · → · 1B · 1B × 8 B = 8 GB · user_id · last_hb · int (4B) · int (4B) · = 8 B / row · 128 GB in · your pocket · absence = offline: · 100k active → 100k rows = 800 KB · (rows of silent users are deleted)

[caption] Fig 2·cHow big is it? Every user with a row: 8 GB for a billion, less than the phone in your pocket. Only online users with a row: 800 KB for 100,000 of them.

The new rule only holds if rows disappear on time. Something has to delete them. Who?

The answer most people give first is a cron job: a small process that wakes every few seconds, finds rows whose last heartbeat is older than 30 seconds, and deletes them. The read side even gets simpler: row present, online; row absent, offline. For a product on its first day, that would work.

Pause and think

A teammate proposes exactly that cron job. It is twenty lines of code. Would you ship it?

A cron job is a separate process. Someone has to host it and keep it running, because if it stops, offline users stay green again. Its uptime now matters as much as the API’s, it needs its own monitoring and alerts, and it has edge cases (a run that overlaps the next, a run that dies halfway). That is a lot of ownership for one DELETE.

This is the habit to keep from the whole build: never draw a box you wouldn’t want to build, deploy and be paged for. A diagram with more boxes is not a better design; often it is a worse one. Before adding a component, ask whether something you already run can do the job.

§ 2.4

## Can the store forget on its own?

Something you already run is the store. Some databases expire entries natively: you write a key with a time to live (TTL), and the database deletes it when the time runs out. Writing your own deleter next to one of those is reinventing the wheel.

[figure title] Who deletes?

[figure description] Two panels. A cron job: a dashed cron box, a separate process, runs DELETE where last_hb is older than now minus 30 seconds against the pulse table; red tags around it say host it, keep it up, monitor it: another moving part. The store expires it: the API server sends SET u42 EX 30 in blue to a store; inside it the key u42 has a TTL timer and a dashed arrow to a cross, the store deleting the key itself; a green tick says nothing new to run.

[figure labels] cron · host it · keep it up · monitor it · pulse · user_id · hb · u1 · … · DELETE … WHERE · last_hb < now − 30s · another · moving part · a cron job · api · SET u42 EX 30 · u42 · the store deletes it · nothing new to run · the store expires it

[caption] Fig 2·dWho deletes? Left: a cron job is a new process to host, keep up and monitor. Right: a store with a TTL deletes the key itself, and nothing new runs.

That turns the requirement into one line: key-value access plus expiry. Two common stores offer both, Redis and DynamoDB. The whole design now fits in a few lines. On every heartbeat, set the user’s key with a 30-second TTL; each beat pushes the expiry 30 seconds into the future. When the beats stop, the key expires. Key present: online. Key absent: offline. The API is a handful of REST endpoints, and the store does the deleting.

The details differ between the two, and both are traps. In Redis, a plain SET clears any expiry the key had, so every single write must carry the TTL again. DynamoDB deletes expired items in the background, “typically within a few days”, and returns them to reads until then, so you store an expires_at time and treat a passed one as offline AWS docs ↗.

# Redis, on every POST /heartbeat (EX 30 on every write) SET presence:42 1 EX 30 # status: key present = online EXISTS presence:42 # DynamoDB: write expires_at = now + 30 # status: online only if expires_at > now

The battery dies right after a heartbeat. How long until the dot turns grey, and what happens if one write forgets its TTL?

[caption] Clip 2·1The store counts down on its own; if the last write before a user goes quiet forgot EX, that user stays green forever.

[summary] The clip as text 0:40

- Every heartbeat sets the key with a 30-second TTL.

- Each beat resets the TTL: the expiry moves to 30 s after it.

- The battery dies. No ‘offline’ call is ever sent.

- No more beats. The store keeps counting down on its own.

- 30 s after the last heartbeat the key is gone: absent means offline.

- Forget the TTL on one write and the user never goes offline.

- Every heartbeat: SET with EX 30. The store does the deleting.

A laptop sends a heartbeat every 10 seconds through the api, which writes SET u42 1 EX 30 to Redis, so the key u42 expires 30 seconds after that write. A friend's screen shows a green dot while the key exists. On a sped-up time track, each heartbeat resets the TTL to 30 seconds and moves the expiry mark to 30 seconds after it: from 30 s to 40 s to 50 s. The laptop's battery dies at 22 seconds, just after the beat at 20 seconds, and no offline call is sent. The store counts the TTL down on its own; at 50 seconds, 30 seconds after the last heartbeat, it deletes the key and the friend's dot becomes the offline ring. A second track shows the trap: if one heartbeat writes a plain SET without EX, the TTL is cleared, the key never expires and the friend keeps seeing the user online. So every heartbeat must write SET with EX 30, and the store does the deleting.

[summary] Go deeper: what if the product wants “last seen”? a requirement that changes the design

This brief has only green and grey. If the product also wants “last seen 5 minutes ago”, the way WhatsApp shows it, you can’t delete rows any more: you keep one per user, and the last heartbeat is the last-seen time. That is fine, because storage was never the problem; 8 GB is small. Deleting rows here was a way to practise asking “can this be smaller?”, not a necessity.

So the store needs a key, a value and a timer. Redis has all three. So does DynamoDB. Which one goes in the box? That turns out to be a harder question than it looks, because the obvious reasons don’t decide it.

Lecture 01, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-which-store ===

# Green dots and blog rows, chapter 3: Two stores pass the test. Which one goes in the box?

Lecture 01 · Green dots and blog rows · chapter 3 of 8

§ 3

## Two stores pass the test. Which one goes in the box?

About 8 min

The store needs a key, a value and a TTL. Redis gives you all three, and so does DynamoDB. Both are popular, both are fast, both are well documented. When two tools both meet the requirement, the choice moves to things that aren’t on the feature list, and those are the things most people forget to weigh.

[figure title] The green dot so far

[figure description] The green dot so far. Laptop, heartbeat every 10 seconds, API server, store. Marked new: every write carries a 30-second TTL, so the store deletes a key on its own when the beats stop.

[figure labels] new · laptop · heartbeat · every 10 s · api · write · store · ttl 30 s · the green dot so far

[caption] Fig 3·aThe green dot so far. Marked new: the 30-second TTL on every write, so the store deletes silent users itself.

§ 3.1

## What do people reach for first?

Pause and think

A teammate says: “DynamoDB, because our presence data has to persist.” Is persistence a good reason to pick a store for this table?

Every entry is deleted 30 seconds after the user’s last beat, on purpose. If the store crashed and lost every key, the next round of beats would rebuild the whole table within 10 seconds.

Persistence also doesn’t separate the two stores. Redis can write to disk too: an append-only file (AOF) that logs every write, snapshots, or both. Know how the feature works, not just that it exists: with the default setting the log is flushed once a second, so a crash can lose about a second of writes, and flushing on every write is safe but very slow redis.io ↗. For heartbeats, a lost second is harmless. That is why Redis can be the primary store here, not a cache in front of something else. Whether you need a database behind it depends on the guarantees your data needs, and this data needs almost none.

The second answer people give is speed: Redis keeps data in memory, so it must be faster. It is: Redis serves from RAM over connections your server keeps open, with sub-millisecond latency, while DynamoDB is a request-and-response HTTPS API that answers in single-digit milliseconds. For reading a dot, the gap rarely matters; a few milliseconds is invisible next to a 30-second threshold. Where time sensitivity does count is when you want to hear about a change the instant it happens, and that comes from the open connection, not raw speed (section 3.4). The other questions that decide it are about people, money and next year, and they are the ones most often missed.

§ 3.2

## Who gets paged at 3 a.m.?

DynamoDB is managed: AWS runs it, keeps it available and scales it, and your team writes business logic. A self-hosted Redis is yours: your engineers keep it up, watch it, scale it before a surge and react during one. Running any database, Redis, MySQL or Elasticsearch, comes with its own pain: observability, profiling, upgrades.

So the first real question is your team. A lean startup of five or ten engineers, with no one who has run Redis in production, should go managed, and that pulls towards DynamoDB: you throw money at AWS, and it becomes your extended engineering team. Self-host only when you have both the expertise and the time.

Managed doesn’t mean DynamoDB, though. Every major cloud sells a managed Redis (AWS ElastiCache, for one), and your Redis code is the same everywhere. Availability and autoscaling depend mostly on whoever operates the store, though the product sets limits too: AWS commits to 99.99% availability for DynamoDB, and Redis’s asynchronous replication can lose acknowledged writes on a failover however good your team is.

§ 3.3

## What if your cloud vendor becomes your competitor?

The two candidates differ in one way that matters more than any feature, and it is why they are the two being compared: Redis is open source and runs anywhere, while DynamoDB is a proprietary AWS product. If you ever leave AWS, every line that talks to it gets rewritten. That is vendor lock-in: being tied to one cloud because a tool you depend on exists only there.

Why would you ever leave? Pricing that grows out of hand, the rest of your infrastructure moving elsewhere, a better deal from another provider, a security incident that costs a provider your trust, or a provider that keeps discontinuing services. People often fear lock-in more than it ends up costing them, but these reasons are real.

The reason teams miss is competition. Amazon enters new businesses all the time. In 2020 it launched food delivery in Bengaluru, and any Indian food-delivery company running on AWS was paying the company that had just become its competitor. The bill literally fed the rival. Amazon closed that service at the end of 2022 techcrunch.com ↗, but the risk doesn’t go away: you may already be on a cloud when its owner walks into your market.

[figure title] Feeding your competitor

[figure description] Your company pays its cloud bill, a blue arrow, to the cloud vendor. The vendor also runs a food business, and a red double-headed arrow between that business and your company says it competes with you: the bill funds your competitor.

[figure labels] your company · $ cloud bill · vendor · food business · (the vendor’s own) · competes with you

[caption] Fig 3·bFeeding your competitor: a food-delivery company pays a cloud vendor that runs its own food business. The bill funds the rival.

Walmart, Amazon’s rival in retail, stays off AWS for exactly this reason, on a hybrid of Microsoft Azure, Google Cloud and its own private cloud. The stakes grow with the bill: $10 million a month to a competitor matters, $10,000 a month from a young startup doesn’t. The counter-example is Netflix, which stays on AWS even though Amazon now runs a rival video service: rewriting that much code would be enormous, and a customer that large may well have a deal that makes staying worthwhile, though its terms aren’t public. And a company that will never leave its cloud loses nothing to lock-in. All of this, plus the fact that far more engineers already know an open tool than one vendor’s product, is why many teams lean towards open source.

§ 3.4

## What will the dot need next year?

Today the feature needs a key and a timer. Pick the store for what it might need next. Redis isn’t only strings: it ships sorted sets, HyperLogLog (approximate counting), Bloom filters (fast “have I seen this?” checks), geospatial indexes and more, so a later “friends online near you” or “how many people were online today” has somewhere to live. DynamoDB reaches some of that ground differently, with a change feed that triggers code you run beside it (Streams and Lambda).

One “next” is close at hand. Suppose the product wants a friend’s dot to turn grey the moment they go offline, pushed to the screen instead of waiting for the next poll. You then need to be told when a key expires.

[figure title] Hearing about an expiry: Redis vs DynamoDB

[figure description] Two lanes. Redis: the API server holds one long-lived connection to Redis; a key has a TTL timer, and when Redis actually deletes the expired key it pushes "expired: u42" back over that open connection. DynamoDB: the API server makes separate request and response calls; the expired item stays in the table until DynamoDB deletes it later, which can take days, and you hear about the deletion from the stream.

[figure labels] api · one open connection · redis · ttl · expired: u42 · pushed on the open connection, · when Redis actually deletes the key · redis · api · separate calls · dynamodb · id · expires · u42 · expired · deleted later · (can take days) · streams · you hear about it from the stream · dynamodb

[caption] Fig 3·cHearing about an expiry. Left: the API server keeps a connection open to Redis, and Redis pushes “expired” on it when it deletes the key. Right: DynamoDB answers separate calls; an expired item lingers until it is deleted, and the stream reports it later.

Redis can do that. Your server holds a long-lived connection to it, and Redis pushes an event on that connection when it deletes an expired key. Two details matter: the event fires when Redis actually removes the key, which can be a little after the TTL runs out, and delivery is fire-and-forget, so treat it as a fast hint, not a guarantee redis.io ↗. DynamoDB has no open connection to push on; it reports deletions through its stream, later.

CONFIG SET notify-keyspace-events Ex # expired-key events (off by default) SUBSCRIBE __keyevent@0__:expired # this connection now receives each expired key

§ 3.5

## So which one would you write down?

Here is the whole comparison for this one table.

Redis or DynamoDB for the presence store

|

| Redis (self-hosted)

| Redis (managed)

| DynamoDB

| TTL

| Deletes the key promptly; send the TTL on every write

| Same

| Deletes within days; check expires_at on read

| Who runs it

| Your engineers: uptime, scaling, surges

| The provider

| AWS

| Lock-in

| None: runs anywhere

| Low: every cloud sells one

| AWS only

| Room to grow

| Sorted sets, HyperLogLog, Bloom filters, geo

| Same

| Streams and Lambda

| Told on expiry

| Pushed on an open connection (best effort)

| Same

| Through the stream, later

| Losing a second of beats

| Harmless

| Not an issue

Now write the decision down, with its reason. Two write-ups are both defensible here. A lean team that wants nothing to operate, already on AWS: DynamoDB, storing expires_at and checking it on every read. A team that wants to hear about expiries the moment they happen, may need richer data structures later, or wants to stay free to change clouds: Redis, managed unless you have people who have run it before, with SET … EX 30 on every beat. Redis as the primary store is fine for data this small. Which one is right depends on your team, your cloud and what the feature will need next; what is not optional is writing the reason down.

Next to the decision, record its limits and what a migration would take. That record is worth more than the decision itself when someone revisits it a year later.

[summary] Go deeper: shouldn’t you avoid database-specific features? a common review objection

A reviewer may say: TTL isn’t universal, so don’t depend on it. But the design needed expiry, so it picked a store that has it. If you ever move, you move to one with similar features, or you rebuild the feature yourself (a cron job does it). The same goes for change streams: off DynamoDB, a change-data-capture tool such as Debezium reads MySQL’s binlog instead. Draw a line: abstract over everything and you end up writing your own database.

The store is chosen and the design looks finished. Then you multiply the beats by the users, and a number appears that is much scarier than 8 GB.

Lecture 01, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-tiny-table ===

# Green dots and blog rows, chapter 4: The table is tiny. Why is the store struggling?

Lecture 01 · Green dots and blog rows · chapter 4 of 8

§ 4

## The table is tiny. Why is the store struggling?

About 8 min

The design is complete: beats, a TTL, a store you can defend. Chapter 2 asked whether a billion users was a storage problem, and the answer was no. But that estimate counted rows. It never counted how often those rows change.

[figure title] The green dot so far

[figure description] The green dot so far. Laptop, heartbeats, API server, and a key-value store with a 30-second TTL. Marked new: the store is chosen, Redis or DynamoDB.

[figure labels] new · laptop · heartbeat · every 10 s · api · write · redis or dynamodb · ttl 30 s · the green dot so far

[caption] Fig 4·aThe green dot so far. Marked new: the store choice, written down: Redis or DynamoDB, one key per online user with a 30-second TTL.

§ 4.1

## Which number should scare you?

Chapter 2 imagined 100,000 people online. A successful app has ten times that, so take a million.

Pause and think

A million users are online at once (active, not total). Each sends a heartbeat every 10 seconds, and every heartbeat is one write. How many writes does the store take per minute?

Every 10 seconds is 6 beats a minute per user. 6 × 1,000,000 = 6 million writes a minute, about 100,000 every second, each one an update.

The data for those million users is about 8 MB. The work on it is relentless. This is the textbook shape where storage is not the problem; computation is: tiny data, enormous write rate.

How hard that bites depends on what sits behind the API. A single Redis node can handle roughly a hundred thousand simple SETs a second in its own benchmarks, so it is within range, though with little headroom redis.io ↗. A disk-based relational database committing 100,000 durable single-row updates every second is a much harder ask. This chapter and the next follow one heartbeat into the case where it hurts most: a classic relational database such as PostgreSQL behind the API. The lesson carries to any store you talk to over a network.

The usual answers to a write load like this, splitting the data across machines with sharding and partitioning, come in Lecture 2 and later. Before reaching for them, look at a cost almost everyone ignores, because it hides in the one part of the diagram nobody thinks about: the line between the API server and the store.

§ 4.2

## Where does one tiny write spend its time?

Follow one heartbeat. It arrives at the API server as an HTTP request over the client’s TCP connection. To write it, the API server opens a second TCP connection, to the database.

Before the write can even be sent, opening the connection costs a three-way handshake, three trips. After the reply, closing it costs a teardown, two more in the simple count. The one request and one reply you actually wanted are wrapped in five trips of ceremony, and the real bill is higher: on top of TCP comes the database’s login exchange, and TLS if the connection is encrypted.

And the write itself? It updates one row by its primary key. The database finds it almost instantly and does the bare minimum. So most of each heartbeat’s time goes not into the write but into building and tearing down the connection around it.

The database pays too. Accepting a connection means reading the handshake, spending CPU and network buffers, authenticating the caller, and setting up a thread or, in PostgreSQL, a whole new server process for that connection postgresql.org ↗. Each of those costs memory as well as CPU. Do it 100,000 times a second and the database spends its day saying hello and goodbye.

§ 4.3

## What if the connection never closed?

Nothing forces a connection to close after one query. Open a few connections once, keep them open, and hand them out: that is a connection pool. With one-row updates, so much of each call was spent on setup that this is the obvious fix.

Say the API server opens three connections when it boots. A request arrives, takes a free connection, marks it busy, runs its query and gives it back. The connection is already open, so the write is one request and one reply. The handshake and the teardown are gone.

Five writes, without and with a pool. Count the trips each write makes before you play it.

[caption] Clip 4·1The same five queries: faster calls, and a database that no longer opens and closes a connection for each one.

[summary] The clip as text 0:39

- Five writes. Top: no pool. Bottom: a pool of three.

- Five trips to open and close; one request and one reply do the work.

- Every write pays it again, and so does the database.

- With a pool, a write takes an open line, queries, and gives it back.

- Same five queries: faster calls and less load on the database.

- Now do it six million times a minute.

Two lanes, each an API server and a database, with a time bar underneath, for the same five heartbeat writes. Top, no pool: every write opens a new connection with the three-way handshake (SYN, SYN-ACK, ACK), sends one UPDATE and gets OK, then closes it with FIN and FIN/ACK. That is five trips of setup and teardown (plus the database login) around one request and one reply, so each write's time bar is mostly hollow setup segments and only two filled query segments, and the database's count of new connections climbs to 5. Bottom, a pool of three connections opened at startup: each write takes a free open line, marks it busy, sends the UPDATE, gets OK and gives the line back. Its bar is only the query segments and finishes far sooner, and the database accepts no new connections. Same five queries in both lanes: faster calls and less load on the database. At six million writes a minute, no pool means six million new connections a minute; the pool keeps reusing the same three. Bar lengths are not to scale.

Two things improve at once. Each API call gets much faster. And the database’s load drops even though it runs exactly the same number of queries, because it no longer does the connection work around each one.

The gain is largest here because the queries are tiny. A big report that joins a dozen tables runs long enough that the connection setup is a rounding error; a one-row update by primary key is the opposite. Whenever you fire many small queries at a database, a pool is almost always worth having, and if your codebase has none, measure what adding one gives you.

This holds for whatever store you chose: Redis clients pool too, as do MySQL and PostgreSQL drivers.

§ 4.4

## Three connections, and a fourth request

Where does the pool live? Not in a new service. It is a library inside the API server’s own process.

At boot it opens a few connections and puts them in a blocking queue. A caller takes one if one is free, or waits until someone puts one back. There are many implementations; the idea stays this small.

import queue class Pool: def __init__(self, connect, size): self.idle = queue.Queue() # blocking for _ in range(size): # at boot: open `size` self.idle.put(connect()) def get(self): # waits while none is free return self.idle.get() def release(self, conn): self.idle.put(conn) # back in line

Three connections serve three requests at once. What happens to the fourth? Step through the life of one server’s pool.

[figure title] Three connections, four requests

[figure description] Five snapshots of one api server’s pool, top to bottom. 1: minimum 3; three requests each take one connection, all busy. 2: a fourth request finds none free and waits. 3: instead the pool opens a fourth connection and keeps it: three becomes four. 4: with a maximum of 100, request 101 waits for a release. 5: a connection idle for 10 minutes is closed.

[figure labels] requests · api server · pool · db · api · r1 · r2 · r3 · min 3 · 1 · api · r1 · r2 · r3 · r4 · waits · all · busy · 2 · api · r1 · r2 · r3 · r4 · 3 → 4 · 3 · api · r101 · cap · … up to 100 · max 100 · 4 · api · idle · 10 min · 5

- min 3: three idle connections. Three requests arrive; each takes one. All three are busy.

- A fourth request finds none free. Option one: wait until a query finishes and frees a connection.

- Option two: open one more and keep it. The pool stretches from three to four.

- Stretching needs a ceiling. With max 100, request 101 waits, up to a timeout. Without one, a flood of requests would each add a connection.

- A connection idle for 10 min is closed by the pool, so the pool holds what the traffic needs, never more than the maximum.

Keys: ← → to step · link to a step with #fig-4c/step-3

[caption] Fig 4·bFive snapshots of one API server’s pool. Blue lines are connections in use; the dashed one is being opened.

So a pool has three settings: a minimum it opens at boot, a maximum it may grow to, and an idle timeout after which unused connections close. A server doesn’t always hold its maximum; that is only the most it will ever hold, and the real number follows the traffic. Waiting has a limit too: a widely used Java pool, HikariCP, makes a caller wait up to 30 seconds by default, then fails the request with an error.

[summary] Go deeper: a minimum below the maximum? a real-world tuning disagreement

A common convention is a small minimum, 3 or 5, because the pool can always open more on demand. HikariCP recommends the opposite: leave the minimum unset so the pool is fixed-size, minimum equal to maximum, since opening connections during a burst is exactly the latency a pool exists to avoid. Either way, its idle timeout (10 minutes by default) only retires connections when the minimum is below the maximum.

Why have a maximum at all, if more connections mean fewer waits? Because the database at the other end of every pool has a limit of its own, and you don’t run one API server. You run a fleet, and fleets grow at the worst moment.

Lecture 01, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-spike ===

# Green dots and blog rows, chapter 5: A spike hits and autoscaling adds twenty servers. What do they get?

Lecture 01 · Green dots and blog rows · chapter 5 of 8

§ 5

## A spike hits and autoscaling adds twenty servers. What do they get?

About 7 min

Every API server now keeps a pool of open connections, and each write is one request and one reply. The fix worked. But a pool is a promise each server makes to itself, and all of those promises are drawn from one place: the database.

[figure title] The green dot so far

[figure description] The green dot so far. Laptop, heartbeats, API server, key-value store with a 30-second TTL. Marked new: the API server writes over a pool of connections it keeps open instead of opening one per write.

[figure labels] new · laptop · heartbeat · every 10 s · api · pool, kept open · redis or dynamodb · ttl 30 s · the green dot so far

[caption] Fig 5·aThe green dot so far. Marked new: the pool of open connections between the API server and the store.

§ 5.1

## How many connections can a database give?

Stay with the relational database from chapter 4, where this limit bites hardest. Every database caps the connections it will hold. The defaults are lower than people expect: PostgreSQL’s max_connections is typically 100, with a few reserved for administrators postgresql.org ↗. Managed services publish their limit, often as a formula; Amazon RDS derives it from the instance’s memory, because every connection costs memory. Run the database yourself and you benchmark the number on your own hardware, under your own load.

For a store like this one, that number is often the first wall you hit. Each read and write touches one row by key, so the queries themselves are cheap and the bottleneck moves to the connections and the network carrying them. When you size the database, the concurrency you need decides how big it must be, not the 8 GB of data.

A different workload hits a different wall. A report joining 10 or 15 tables runs long enough that connection setup doesn’t matter; it is limited by the database’s CPU and memory. There are only four things that can run out on a machine, CPU, memory, disk and network, and every scaling decision is about one of them. The heartbeat store is network-bound; a big report is CPU- and memory-bound; a data warehouse is disk-bound.

§ 5.2

## Ten servers, one budget, and a spike

Now put pools and the limit together.

Pause and think

Your database accepts at most 1,000 connections. Each API server’s pool keeps a minimum of 100 open. You run 10 servers. A spike hits and autoscaling adds 20 more. What happens?

10 servers × 100 connections = 1,000, the database’s whole budget. The 20 new servers start, try to open their pools, and are refused. Their requests wait, time out and fail, at exactly the moment you added them to absorb a spike.

[figure title] The pool budget

[figure description] Two panels over the same database, which accepts at most 1,000 connections. a, fits: 100 servers, drawn as 10 boxes of 10, each with a pool maximum of 10: 1,000 divided by 100 servers is 10 each. b, the spike: each server’s pool keeps a minimum of 100 connections, so 10 servers already hold all 1,000; autoscaling adds 20 more servers, and their connections are refused at the database, marked with a red cross: the new servers get nothing.

[figure labels] 1,000 ÷ 100 servers = 10 each · each box: 10 servers, max 10 each · db · max 1,000 connections · a · fits · 10 servers · api · pool min 100 · +20 servers · api · new · 10 × 100 = 1,000 · db · max 1,000 connections · new servers get nothing · b · the spike

[caption] Fig 5·bOne database with a 1,000-connection limit, two pool settings. Left: a maximum of 10 per server, across up to 100 servers. Right: a minimum of 100 per server, with a spike on the way.

A misconfigured pool quietly caps how many servers you can ever run: the most you can have is the database’s limit divided by each server’s share. That is the other half of the earlier advice. A pool is almost always worth having; a pool configured without looking at the database is a trap.

It fails the other way too. A pool allowed to grow without a cap lets a few busy servers take every connection. And with a long idle timeout, a server that was busy ten minutes ago keeps hogging connections it no longer uses, while the load balancer sends new users to a server that can’t get any, and those users see an outage.

§ 5.3

## How do you size a pool you can’t predict?

Start from the budget. Divide the database’s maximum connections by the most servers you will ever run: 1,000 connections and up to 100 servers gives each server a maximum of 10. Many teams set it a little higher, say 15, because one server is sometimes busier than the rest; it is a common practice, not a standard. Know what it costs: if every server can reach 15, a busy moment can ask the database for 1,500 connections, and it refuses the extra ones with an error.

Then start conservative and let measurements move you. A small minimum, a maximum inside the budget, an idle timeout that is neither so short that connections keep reopening nor so long that idle ones pile up. Put telemetry on the pool, and a week of production traffic tells you where to move each number.

The number to watch first is the average time a query takes, because the connections you need are roughly your throughput multiplied by that time. Watch alongside it how long requests wait for a connection and how often the pool is saturated. If query time rises, find out why before you grow the pool: past a point, more connections make a database slower, not faster HikariCP wiki ↗.

If the fleet truly needs more concurrent connections than one database can hold, the first answer is a bigger database. Past what one machine can give, you split the data across several (sharding, in Lecture 2), which is why a design that has to grow should be able to scale out, not only up. When the fleet is large or unpredictable, there is also a structural fix: put a central pooler such as PgBouncer or Amazon RDS Proxy between the servers and the database. It multiplexes many servers onto a few database connections and queues the excess. That pooler is a separate service, and it exists for precisely this problem.

[summary] Go deeper: a festival doubles your traffic planning for a known spike

If you know a spike is coming, scale the database up before it, then back down after; the database must support the concurrency you are aiming for, however wasteful that feels for one weekend. On many managed databases a size change means a restart, so do it ahead of time. Then raise the pools’ maximums to match. A far better answer to flash crowds comes later in the course, with flash sales. Until then: know your costs, and have the monitoring to decide.

§ 5.4

## Where else have you seen this dot?

Step back from the green dot and look at what you built: things that are alive say so every few seconds, silence for long enough means dead, and something cheap forgets the silent ones. That pattern is everywhere.

In a distributed system, every node sends heartbeats to a central tracker, and a node whose beats stop is marked down. Building your own cloud out of machines, that is how you learn a machine has died. Building your own load balancer, the same signal tells you to stop sending requests to a backend that has gone quiet. Protocols differ; the design is the same.

[figure title] Heartbeats, reused

[figure description] Two panels. a, failure detection: four nodes each send heartbeat pulses to a central tracker, which shows a green dot for each live node; the third node’s pulses have stopped, it is outlined red, and the tracker shows its dot as a hollow offline ring. b, your own load balancer: three backends send heartbeats to the load balancer; one backend goes quiet, marked with a red cross, and the load balancer stops routing requests to it. A grey note: real load balancers often ask instead, with health checks.

[figure labels] tracker · node · node · node · node · no beats · heartbeats · a · failure detection · lb · backend · backend · backend · heartbeats · not routed · real lbs often ask instead: health checks · b · a load balancer

[caption] Fig 5·cThe dot’s pattern, reused. Left: nodes beat to a tracker, and a node that goes quiet is marked down. Right: backends beat to a load balancer, which stops routing to one that goes quiet. Real load balancers usually ask instead, with health checks.

Real load balancers usually run the check in the other direction, because unlike a server talking to a laptop, they can open connections to their backends: an AWS Application Load Balancer asks each target every 30 seconds by default and takes it out after two failures AWS docs ↗. You will build one in Lecture 5. That is the reason to learn designs this way: remember the pattern and the property it needs, not a question and its answer.

[figure title] The green dot so far

[figure description] The green dot so far. Many API servers now share the store, each with its own pool. Marked new: all the pools together must fit under the database’s maximum number of connections.

[figure labels] new · laptop · heartbeat · every 10 s · api · ×3 servers · pool, kept open · ≤ max connections · redis or dynamodb · ttl 30 s · the green dot so far

[caption] Fig 5·dThe green dot, finished: beats every 10 seconds, a key with a 30-second TTL in a store you chose for stated reasons, and pools that together fit under the database’s connection limit.

The dot is done. Notice what it never had to answer: what a deleted row should mean, what goes inside a row, or how a copy of data can save work. Its data was one integer per user, thrown away after 30 seconds. Most data isn’t like that.

Lecture 01, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-delete ===

# Green dots and blog rows, chapter 6: A writer deletes a post by mistake. Can you give it back?

Lecture 01 · Green dots and blog rows · chapter 6 of 8

§ 6

## A writer deletes a post by mistake. Can you give it back?

About 8 min

It is midnight, and a writer has deleted the wrong post: three months of work, gone with one click. With the green dot, losing data cost ten seconds until the next beat. Here it costs someone’s work. That is the second build: an ordinary blog, a multi-user app like Medium, where the data is the product. No recommendation engine, nothing exotic.

Follow this blog through its first month: this mistaken delete, then a home page that slowly gets slower, then one post that goes viral. Each one forces a decision about what the database stores and where copies of it live. What carries over from the dot is the method: start from what must be stored and how it is read, count before you optimise, and let the database do what it already does before you add a box.

It helps to know where this sits on the map. Almost every design decision falls under one of six topics: database, caching, scaling, delegation, concurrency and communication. The green dot touched them all; the blog’s month works through the first two, and Lecture 2 takes the other four on the same blog.

[figure title] The blog so far

[figure description] The blog so far: a reader calls an API server, which reads a database holding the blogs table: title, body, published_at and is_deleted.

[figure labels] reader · api · db · blogs · title · body · published_at · is_deleted · the blog so far

[caption] Fig 6·aThe blog so far: a reader, an API server, and one database with the blogs table.

§ 6.1

## What does the blog store?

Here is the whole schema; it fits on a napkin. users holds an auto-increment id, the name shown on the page and a short bio of about 140 characters. blogs holds an id, the author_id of whoever wrote it, a title, the body, published_at and is_deleted.

[figure title] The blog schema

[figure description] Two tables. users has id, name and bio. blogs has id, author_id, title, body, published_at and is_deleted; author_id points to users.id. is_deleted is ringed and labelled soft delete: when a user deletes a blog, the app runs an UPDATE, not a DELETE.

[figure labels] users · id · name · bio · blogs · id · author_id · title · body · published_at · is_deleted · ~140 chars · soft delete · who wrote it · delete blog → UPDATE, not DELETE

[caption] Fig 6·bThe blog schema. author_id points back to users.id. The ringed column is tonight’s question.

Nothing here looks interesting, and that is the point. Every column hides a decision you make whether or not you notice it, and each problem this month lands on one of them. Tonight’s lands on the most boring-looking one, is_deleted.

§ 6.2

## What should “delete” mean?

The database gives you DELETE. Run it and the row is gone; your application can’t get it back. That is a hard delete. So why would anyone add an is_deleted column and, when the user clicks delete, run an UPDATE instead?

Pause and think

A writer clicks delete on a post. Your table has an is_deleted column. Is there a good reason to set it to true instead of running DELETE?

Recoverability: the writer can change their mind. Archival: the content is still valuable after it leaves the site. Audit: someone may need proof that it existed.

Marking a row as deleted without removing it is a soft delete. Each of the three reasons is worth seeing in practice.

Recoverability. The writer who deleted a post by mistake wants it back, and a soft delete lets you give it back by flipping one column. Google Drive works this way: a deleted file sits in the trash for 30 days, recoverable at any time.

Archival. A post someone worked on is rich data even after it is taken down. A background job can later move soft-deleted rows into blob storage such as S3 for analysis or model training. Hard delete it and that option is gone. Where users have a legal right to erasure, keeping deleted content for a new purpose needs its own legal basis, so check before you build the pipeline.

Audit. Deleted data can be evidence. One startup learned this directly. A user posted a vicious comment harassing another user; the victim went to the police; the police asked the platform for the details; and the harasser promptly deleted the comment. Because the platform soft-deleted, the comment still existed, and an engineer ended up at the police station handing over printed copies of every trace. With a hard delete, the evidence would have vanished. Platforms are expected to hand such information to the authorities, and nobody wants harassment evidence to disappear with one click.

So ask three questions of every table you design: does it need recoverability, archival or audit? If any answer is yes, soft delete. If none is, a hard delete is fine. Tables that hold what users create almost always say yes.

§ 6.3

## Soft-deleted rows pile up. Then what?

A soft delete removes nothing, so the table only grows, and every query the site runs now has to skip the marked rows with AND NOT is_deleted. Sooner or later, the rows marked deleted have to go somewhere. When depends on the product: a 30-day trash, a day, or a legal deadline.

This is where soft delete and archival meet. They are not the same thing: a soft delete gives you time to archive. After a day, a job collects the marked rows, copies them to the archive, then hard deletes them. Without the soft delete you would have to archive each row in the instant you deleted it.

[figure title] The life of a deleted blog

[figure description] A timeline of one deleted blog. 1: the user clicks delete. 2: the row gets is_deleted = 1, recoverable for N days. 3: a background job copies soft-deleted rows to S3, the archive. 4: the hard delete runs as many small DELETE … LIMIT 1000 statements spread out across the day. Side branch: a unique index on email blocks a new signup with the same email while the soft-deleted row exists; use a partial unique index or hard delete that row.

[figure labels] 1 · user clicks · delete · 2 · is_deleted = 1 · recoverable for N days · 3 · s3 · archive · background job · 4 · DELETE … LIMIT 1000 · hard delete, staggered · across the day · UNIQUE(email) · new signup, same email · the soft-deleted row blocks it → partial index or hard delete

[caption] Fig 6·cThe life of a deleted post: marked, recoverable for a while, archived by a background job, then hard deleted in small batches. The side branch is the one place a soft delete gets in the way (next section).

Now the hard delete itself. Suppose the job has 100,000 marked rows to clear and traffic is at its peak. Would you run one DELETE?

100,000 soft-deleted rows, peak traffic. One big DELETE, or many small ones?

[caption] Clip 6·1Spread the hard delete out, like garbage collection, whether your job or the database runs it. The request queue and its slowdown are illustrative.

[summary] The clip as text 0:37

- 100,000 soft-deleted rows to hard delete, at peak traffic.

- All in one shot: one huge DELETE puts its whole load on the database at once.

- Requests slow down behind it while it runs. Nothing goes down.

- Stagger it instead: 10,000 an hour, like garbage collection.

- Each batch is small, so requests barely slow down.

- Same rows gone. The price: the job holds a pool connection or two.

- Stagger the hard delete, whether a cron job or the database runs it.

Two lanes hard delete the same 100,000 soft-deleted rows from a blogs table while user requests keep arriving. In the first lane a cron job deletes them all in one shot: one huge DELETE puts its whole load on the database at once, so while it runs the table takes requests more slowly and they queue up in front of it. Every request still gets through; nothing goes down. In the second lane the job deletes 10,000 rows an hour: each batch is small, so requests barely slow down. Both lanes end with all 100,000 rows gone. The price of the staggered job is that it holds one or two connections from the pool. Stagger the hard delete, whether a cron job or the database runs it.

One huge delete puts all of its work on the database at once, and every request behind it slows down. Spread it across the day instead, a few thousand rows at a time at a steady pace, and the live service barely notices. Each small batch holds its locks briefly and commits quickly.

-- MySQL: repeat until fewer than 1,000 rows go DELETE FROM blogs WHERE is_deleted = 1 LIMIT 1000;

The job isn’t free either: it holds a connection or two from the blog database’s pool, while letting rows pile up costs disk. You gain some, you lose some. Some databases will run the deletion for you, the same instinct as the dot’s TTL: MongoDB’s TTL indexes expire documents on their own. The database is then running the job on its own threads, on its own schedule (MongoDB checks every 60 seconds), so under load rows can outlive their expiry. Offload it, and keep it staggered.

§ 6.4

## When does a delete have to be real?

Sometimes a soft-deleted row gets in the way. Add the column every real users table has, an email with a unique index on it. A user deletes their account and later signs up again with the same address. Their old row is only marked deleted, still holds the email, and the signup fails. Either hard delete that row, or make the index apply only to live rows.

-- PostgreSQL: unique email among live rows only CREATE UNIQUE INDEX users_email_live ON users (email) WHERE NOT is_deleted;

And sometimes the law decides: under the EU’s GDPR a person can ask you to erase their data, the “right to be forgotten”, so a soft delete can’t be the end of the road.

[summary] Go deeper: what an erasure request requires skip unless you serve EU users

You must act within one month (extendable by two for complex cases) and may keep only what an exception covers, such as data needed for legal claims, like the harassment comment above. Live data is erased; copies in old backups and logs aren’t rewritten but must be kept beyond use and age out on their normal schedule ico.org.uk ↗. GDPR covers organisations in the EU and those serving or monitoring people there.

So is_deleted decides whether a row stays, and the archive job keeps deleted rows from piling up forever. Three weeks in, that isn’t enough. The home page, which lists last week’s posts, gets slower every day, and deleted rows aren’t the reason. What is inside each row is.

Lecture 01, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-home-page ===

# Green dots and blog rows, chapter 7: The home page is slow. What’s in the row?

Lecture 01 · Green dots and blog rows · chapter 7 of 8

§ 7

## The home page is slow. What’s in the row?

About 8 min

The home page lists the posts published in the last seven days, each with its title and a short excerpt. Here is the query the first version of the blog shipped with:

-- the home page, version 1 SELECT * FROM blogs WHERE published_at > :week_ago AND NOT is_deleted ORDER BY published_at DESC;

It looks harmless, and with a few hundred posts it was. A month in, with thousands, it is the slowest page on the site. To see why, look at what the database does for every row it considers.

[figure title] The blog so far

[figure description] The blog so far. A reader calls an API server, which reads a database holding the blogs table: title, body, published_at and is_deleted. A background job moves soft-deleted posts to an archive. Marked new: soft-deleted rows (is_deleted) and the archive they move to.

[figure labels] new · reader · api · db · blogs · title · body · published_at · is_deleted · archive · the blog so far

[caption] Fig 7·aThe blog so far. Marked new: rows are soft-deleted, and a background job moves them to an archive before hard deleting them in small batches.

§ 7.1

## What is the list query paying for?

Two things, and neither is visible in the SQL.

First, SELECT * asks for every column, including body: thousands of words per post, on a page that shows a title and two lines. Every matching row drags its whole post along for nothing.

Second, the filter. In version 1, published_at went in as text, exactly as the editor sent it: '2022-04-02 09:01:36'. To answer published_at > :week_ago, the database has to cast that string to a date on every row it checks, and an index on the column can’t help. How a value sits on disk decides how fast you can compare it.

Both costs come from the same place: decisions about the row that nobody made on purpose. Take them one at a time.

§ 7.2

## Why don’t bio and body live the same way?

bio is about 140 characters. body can run to thousands of words. Both are text, in the same schema. Should the database store them the same way?

A row-oriented database, which is what MySQL and PostgreSQL are, keeps a row’s columns together on disk, so one read brings back the whole row. Short columns that most reads need, a name, an email, a bio, belong right there: a VARCHAR stays inline with the rest of the row. A very large value is different. The engine stores it out of line, somewhere else on disk, and keeps only a pointer in the row.

[figure title] Long text vs short text

[figure description] Two rows of five cells. Long text: the middle cell holds only a reference; a line drops from it to a lined page stored elsewhere on disk. Type LONGTEXT. Short text: the middle cell holds the text itself, stored with the other columns. Type VARCHAR.

[figure labels] → ref · large text, · elsewhere · stored as a · reference · LONGTEXT · long text: body · stored along with · the other columns · VARCHAR · short text: bio

[caption] Fig 7·bLong text vs short text. A large body lives elsewhere on disk with only a reference in the row; a short bio is stored with the other columns.

How and when that happens depends on the engine, so know yours. MySQL’s InnoDB moves long TEXT, BLOB and VARCHAR values off the page behind a 20-byte pointer when the row is too big to fit dev.mysql.com ↗. PostgreSQL compresses or moves any wide value out of line once a row passes about 2 kB, and fetches it only if a query asks for that column postgresql.org ↗.

Why not keep everything inline and save the extra read? Because rows have to stay bounded: an InnoDB row must fit in about half of a 16 KB page, and small rows mean more of them per page, so scans touch fewer pages. A 5,000-character body is not 5,000 bytes, either: in MySQL’s utf8mb4 a character can take up to four bytes, so it can be 20,000. Keep the row to the bare minimum that most reads need: very large text in a long-text column, everything else short.

That fixes the first cost. The list doesn’t need the body, so stop asking for it. The excerpt it does need is short text, so give it its own short column, filled when the post is saved, and select only what the page shows. The out-of-line body is read only when someone opens a post.

§ 7.3

## How should published_at sit on disk?

Now the second cost, the filter. There are several ways to store a date and time. Here are three.

[figure title] Three ways to store a date

[figure description] Three ways to store published_at. As the native date-time type, 2022-04-02 09:01:36, stored by the engine in a compact binary form: convenient and readable. As an epoch integer, 1648890096, seconds since 1 January 1970: a plain integer compare, unreadable. As a custom integer format YYYYMMDD, 20220402: readable, an integer, a date only.

[figure labels] 1. native date-time · 2022-04-02 09:01:36 · compact binary inside the engine · convenient · readable · decoded by the engine · 2. epoch integer · 1648890096 · seconds since 1 Jan 1970 · integer compare · unreadable · 3. custom format · (int) · YYYYMMDD → 20220402 · readable · integer · date only

[caption] Fig 7·cThree ways to store the same instant, 2 April 2022 09:01:36 UTC: the database’s native type, an epoch integer, and a custom integer that keeps only the date.

The native type. Every database has a date-time column, and it is the most convenient choice: your language hands you a date object, and the value reads at a glance in any SQL console. It is not the text column version 1 used. The major engines store dates in compact binary, 5 bytes for a MySQL DATETIME, 8 for a PostgreSQL timestamp, and compare and index them efficiently dev.mysql.com ↗. Still, every engine has its own format, so find out how yours stores a date; if that isn’t good enough for your query, store it differently.

An epoch integer. Make published_at an integer column and store the epoch, as the heartbeat store did in chapter 2. It is small, 4 bytes, or 8 for a 64-bit value, and a comparison is a plain integer comparison, the cheapest thing a computer does. What it costs is readability: nobody can look at 1648890096 and tell you the date.

Either one fixes the second cost. Here is the home page with both fixes:

-- the home page, version 2 SELECT id, title, excerpt FROM blogs WHERE published_at > :week_ago -- native date-time or epoch integer AND NOT is_deleted ORDER BY published_at DESC;

The list now reads short rows and compares dates without parsing a string.

§ 7.4

## Why would a team store 20220402?

There is a third way, and it comes from a real team. In 2016, the bus-booking site Redbus had a table that stored dates as date-times, and heavy date comparisons in it had become the bottleneck. The workload was closer to analytics than to live transactions. Epoch integers would have helped the comparisons, but the engineers debugged by reading values straight from their SQL tools, and epoch numbers would have made that miserable.

So they relaxed a constraint they didn’t need. They needed the date, never the time, and stored it as an integer in YYYYMMDD form: 20220402 for 2 April 2022.

Pause and think

Is 20220402 faster to compare than an epoch integer like 1648890096?

Against epoch there is no speed difference at all. What YYYYMMDD buys over epoch is readability: anyone can read 20220402 in a console. Against the date-time column Redbus had, it bought the speed they needed and stayed readable. The price is flexibility: the time of day is gone, which Redbus knew it would never need.

The move worth copying is not the format but the habit: there is no rule that says “always native” or “always epoch”. Look at what your queries need and which constraints you can drop. YYYYMMDD integer keys are common in data warehouses.

Every format gives something up. An epoch integer has no time zone, so display is easy: render it in the viewer’s local time. Native types usually normalise to UTC, or store no zone at all. Time zones burn a lot of teams, so the rule is simple: store UTC, and keep the writer’s original zone in its own column if you need it. Ranges end, too. A signed 32-bit count of seconds runs out on 19 January 2038; a 64-bit integer doubles the size and removes the limit. Dates before 1970 are simply negative. MySQL’s DATETIME covers the years 1000 to 9999, PostgreSQL’s timestamp 4713 BC to AD 294276: learn these from your database’s own documentation.

[figure title] The epoch number line

[figure description] An epoch number line in seconds. 0 is 1 January 1970; −1, just left of it, is 31 December 1969, and the line runs on to the left: negative values are dates before 1970. To the right, a signed 32-bit integer (4 bytes) runs out at 2,147,483,647, a red wall at 19 January 2038. Past the wall the line continues dashed: a 64-bit integer (8 bytes) has no practical limit. Not to scale.

[figure labels] negative = before 1970 · −1 · 0 · 31 Dec 1969 · 1 Jan 1970 · int32 seconds · 4 B · 2,147,483,647 · 19 Jan 2038 · int64 · 8 B · no practical limit

[caption] Fig 7·dThe epoch number line, in seconds. 0 is 1 January 1970 and −1 the second before it. A signed 32-bit value hits its wall on 19 January 2038; a 64-bit one carries on. Not to scale.

Storing published_at

|

| Native date-time

| Epoch integer

| Custom YYYYMMDD integer

| Size

| 5 B (MySQL DATETIME), 8 B (PostgreSQL)

| 4 B, or 8 B past 2038

| 4 B

| Readable?

| Yes

| No

| Yes

| Time of day

| Yes

| No: a date only

| Pick it for

| Convenience

| Performance

| Performance with readability

The home page is fast again. A week later, one post on it goes viral, and the cost moves from the list to the page for that one post, which starts loading thousands of times a minute.

Lecture 01, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-viral ===

# Green dots and blog rows, chapter 8: One post goes viral

Lecture 01 · Green dots and blog rows · chapter 8 of 8

§ 8

## One post goes viral

About 9 min

A post climbs to the top of the home page and the whole internet opens it. Every open runs the same query, a join of the post with its author (in a real blog, also its tags and counts), assembled from scratch for a result that hasn’t changed since the last reader saw it. The database does the same expensive work thousands of times a minute.

[figure title] The blog so far

[figure description] The blog so far. Reader, API server, database with the blogs table and an archive. Marked new: the body is stored off the row, and published_at gets a storage format chosen for the queries that read it.

[figure labels] new · reader · api · db · blogs · title · body → off-row · published_at · is_deleted · archive · the blog so far

[caption] Fig 8·aThe blog so far. Marked new: the body lives out of line, and published_at has a format chosen for the query that reads it.

Everyone knows the fix: “add a cache”. Before you add one, be precise about what a cache is, because the usual picture is too small and it hides most of the places a cache can go.

§ 8.1

## What counts as a cache?

Pause and think

Your API server calls a slow partner API and saves each response on its own local disk, reading the disk next time instead of calling again. Is that a cache?

A cache is anything that saves you from repeating expensive work: an expensive disk read, an expensive network call, or an expensive computation. A local disk that saves a slow network call qualifies.

The habit of picturing caches in RAM comes from the most common case: RAM is faster than disk, so you keep the result of a disk read in memory and skip the disk next time. Turn that around and the same idea puts a cache on disk to skip the network. You have met another one already: memoization in dynamic programming saves a computation by remembering its answer.

[figure title] What a cache saves: disk I/O, network I/O, computation

[figure description] Three panels. Disk I/O: a database on disk sends a result into a small hash table in RAM, so the next read skips the disk. Network I/O: an API server would make an expensive call to a distant service; instead it keeps the result on its own local disk, which says "I’m a cache too". Computation: a gear (a computation) writes its answer into a hash table: memoization.

[figure labels] db · disk · result · RAM · keep the result in RAM · disk I/O · api · service · expensive call · I'm a cache too · cache an expensive call · on local disk · network I/O · f(n) · answer · n → f(n) · memoize · computation

[caption] Fig 8·bThree things a cache can save. Left: a disk read, by keeping the result in RAM. Middle: a network call, by keeping its result on the server’s own disk. Right: a computation, by remembering its answer.

Those are the resources from chapter 5 again: disk, network, CPU, with memory the usual place for the copy. Underneath, a cache is a hash table, key and value, plus a size limit, an eviction rule and expiry. So be creative about where a copy could live.

§ 8.2

## Three servers, one copy

For the viral post, the copy goes into a shared remote cache that every API server can reach. Logically it sits between the API servers and the database; physically it is its own small box. The read path is the standard one, called cache-aside: check the cache; if the post is there, return it; if not, run the query, put the result in the cache, and return it.

def get_blog(blog_id): blog = cache.get(f"blog:{blog_id}") if blog is not None: return blog # hit: no database work blog = db.fetch_blog_with_join(blog_id) # miss: the join, once cache.set(f"blog:{blog_id}", blog) return blog

Three API servers, a thousand reads of one popular post. How many times does the database run the join?

[caption] Clip 8·1With one shared cache, the first read misses and runs the join; every later read, on any server, gets the same copy.

[summary] The clip as text 0:37

- Three API servers serve one popular post, again and again.

- Without a cache, every read runs the same expensive join.

- Add one shared cache. First read: miss, join once, keep it.

- Every later read, on any server, gets the same copy.

- The hop to the cache remains; the join doesn't.

- Save the expensive computation once; read it many times.

Users reach three API servers through a load balancer; all three query one database. Without a cache, three reads of the same popular post land on api 1, api 2 and api 3, and each one makes the database run the same 3–4 table join: three reads, three joins. Then one shared cache is added, reachable from every API server. The next read checks the cache, misses, runs the join once, stores the result in the cache and returns it. The following reads land on api 2, api 3 and api 1; each checks the cache, hits, and gets the same stored copy back without touching the database: four reads, one join. The trip to the cache is still one network hop, but the join is not repeated. Save the expensive computation once and read it many times.

Because the cache is shared, it doesn’t matter which server a reader lands on. There is one copy and everyone reads it, and the database’s load from that post falls to almost nothing. The cache isn’t free: it is still a network hop away. But fetching a ready result is far cheaper than recomputing it on the database and sending it back. When that copy goes stale, and how a cache decides what to throw out, come later; the course builds a cache from scratch in Lecture 9.

§ 8.3

## Could a database table be the cache?

If a cache is any saved result, then precomputing the expensive join and storing it in a table is a cache too. Databases even have it built in: a PostgreSQL materialized view stores a query’s result as a table, as fresh as its last refresh postgresql.org ↗. Ask “why not this?” about every option instead of reaching for RAM by reflex.

So why use Redis at all? Compare them from first principles. Your server keeps persistent connections to both, so that cost is a wash. Redis finds a key with one hash lookup in memory. A database walks an index tree from root to leaf, a few pages deep, and in the worst case each page comes from disk. Databases do keep hot pages in memory, so many reads never touch the disk, but you can’t count on that, so design for the worst case.

Then the costs. RAM costs far more per gigabyte than disk, so a table can be a much larger cache for the money. But if the table lives in the same database that serves your users, every cache read is load on the very machine you were trying to protect. A managed Redis has its own bill to count, too. Weigh read size, how the data is stored, the I/O each read costs and the money, then decide for your case.

[summary] Go deeper: should the cache compress the body? a trade-off worth reasoning through

Only large values are worth it: a 10 KB body that shrinks to 1 KB, never an email address. Compress in the application: if the cache compressed, the full 10 KB would still cross the network each time.

§ 8.4

## What you can now do

[figure title] The blog so far

[figure description] The blog so far. Reader, API server, database with the blogs table and an archive. Marked new: one shared cache that every API server checks before going to the database.

[figure labels] new · reader · api · cache · db · blogs · title · body → off-row · published_at · is_deleted · archive · the blog so far

[caption] Fig 8·cThe blog at the end of this lecture. Marked new: one shared cache that every API server checks before the database.

- Build a presence indicator. Clients beat every 10 s; each beat writes a key with a 30 s TTL; key present means online. Never trust a logout call to report offline. In Redis, put EX 30 on every write; in DynamoDB, check expires_at on read.

- Estimate before you optimise. A billion users × 8 bytes is 8 GB, nothing. A million active users × 6 beats a minute is 6 million writes a minute, the real problem.

- Choose between stores that both work by who runs it, lock-in, what the feature needs next and how you hear about changes. Write the verdict and its limits down.

- Pool connections, inside a budget. Per-server maximum = database limit ÷ the most servers you will run. Watch query time, wait time and saturation.

- Soft delete when a table needs recoverability, archival or audit; archive, then hard delete in small batches; hard delete when a unique index or the law requires it.

- Keep rows small. Large text out of line; pick a date format by readability, performance and convenience, and store UTC.

- A cache is anything that saves a disk read, a network call or a computation. One shared cache with cache-aside reads takes a viral post off the database.

A user’s phone dies mid-session. Walk through how your design turns their dot grey, and the one-line mistake that would keep it green forever.

[summary] Show answer

The phone stops sending heartbeats. Its key was written with a 30-second TTL on the last beat, so 30 seconds later the store deletes it, and a missing key reads as offline. The mistake: a Redis write without EX 30. A plain SET clears the expiry, so if that was the user’s last beat, the key never goes away.

Your database allows 1,000 connections and you will run at most 100 API servers. What maximum pool size per server, and what goes wrong if each server instead keeps a minimum of 100?

[summary] Show answer

10 per server (1,000 ÷ 100). With a minimum of 100, ten servers already hold all 1,000 connections, so any server added during a spike can’t open a single one, and its requests fail.

Give three reasons to soft delete a blog post, and one case where you must hard delete anyway.

[summary] Show answer

Recoverability (undo, like a 30-day trash), archival (the content still has value, moved later to blob storage) and audit (evidence, such as a deleted harassing comment). Hard delete when a soft-deleted row blocks a unique index, such as a re-signup with the same email (or use a partial index), and when an erasure request requires it.

Name a cache that doesn’t live in RAM.

[summary] Show answer

The result of a slow network call kept on the API server’s local disk; or precomputed results stored in a database table, such as a materialized view. Each saves an expensive network call or computation.

§ 8.5

## Where else could you keep a copy?

You put one cache into the blog: the shared one between the API servers and the database. It is far from the only place a copy could live. Here is the whole path a reader’s request takes.

[figure title] Your turn: every place you could cache

[figure description] The blog architecture from Fig 6·b drawn faint: users, a CDN cloud in front, the load balancer, three API servers, the shared cache and the database. Three numbered tags: 1 the shared cache (filled in: central cache, saves database calls), and two hints, 2 the CDN and 3 the load balancer. The other places are left for you to find. The question: what would you cache here, and what does it save?

[figure labels] what would you cache here, and what does it save? · cdn · lb · api · api · api · cache · db · 1 · central cache · saves db calls · 2 · 3

[caption] Fig 8·dYour turn. Tag 1 is done: the shared cache that saves database calls. Tags 2 and 3 are hints, the CDN and the load balancer. Find the rest.

Before you open the next lecture, find every place on this path where you could keep a copy. For each one, write down three things: what you would cache there, what expensive work it saves, and what could go wrong. The CDN is one candidate; the load balancer might be another. Does the reader’s own device count? Decide, and say why.

It pays off. One engineer who did this exercise took an idea back to work at a large bank, got it approved, and saw a large speed-up from a cache nobody there had thought of.

Lecture 2, “Medium under load” opens with exactly this question on the same blog, and then takes it through the four topics this lecture left out: scaling, delegating work, concurrency and communication. Bring your list.

Lecture 01, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

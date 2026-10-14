=== PAGE: lecture overview ===

Lecture 01 · week 1, day 1 · running case: an online/offline indicator, then a Medium-like blog

# Green dots and blog rows

Two builds on one page. First the green dot next to a user's name: what to store, who reports it, who deletes it, which store to pick and why six million heartbeats a minute make you pool connections. Then the rows of a blog: soft deletes, text columns, dates, and what a cache really is.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1How to approach a designBefore any box: decide whether you are building outward from a known core or growing a day-zero design, and pick tools by the property you need, not the tool you like.2 sections · §1.1–1.2

- 2Green dots: the online/offline indicatorBuild the indicator one forced question at a time: what to store, how to read many users at once, who reports being alive, how long silence means offline, and who cleans up.8 sections · §2.1–2.8

- 3Redis or DynamoDB?Both give key-value access and a TTL, so speed is not the deciding question. Persistence, who runs it, lock-in, room to grow and how fast you learn about an expiry decide it.7 sections · §3.1–3.7

- 4Six million heartbeats a minuteStorage was never the problem. Writes are. Why each tiny write spends most of its time opening a connection, how a pool fixes it, how to size one, and when it breaks.9 sections · §4.1–4.9

- 5Blog rows: database decisionsA Medium-like blog has two plain tables. Every column hides a decision: whether delete means delete, where long text lives, and how to store a date.9 sections · §5.1–5.9

- 6What a cache isA cache is not “RAM” and not “Redis”. It is anything that saves an expensive disk read, network call or computation. One shared cache for the blog, a database table as a cache, and whether to compress.5 sections · §6.1–6.5

- 7What to keepThe habits that ran through both builds, and where this lecture stops.

[summary] About this class where this page sits in the course

This is the first session of the course: eight weeks of system design aimed at building raw intuition for systems, always from the implementation side rather than just drawing boxes. Boxes, in the instructor’s words, “you can do as a kid also”; going into the intricate details is what makes an engineer better.

The course does not prepare you for interviews. Its goals are the joy of engineering and the intuition to build any system in the world, from first principles, with simple designs that scale the way real systems are built. Literally every system in the course can be implemented on a local machine; you need no fancy infrastructure. Over the next year or so, implement the core of each one (the flash-sale module itself, not its UI or every CRUD API). The devil lies in the details: implementing shows where a design falters, and real teams expect engineers to implement, not just draw boxes.

Today has two parts. First, an online/offline indicator like the one on Facebook or Twitter; then, after the break, how to approach system design, with databases and caching worked through on a Medium-like blogging app. Since it is day one, the class keeps things simple and puts little focus on scale: performance still comes up, but scale arrives in weeks two to four. The first week is foundations only, so everyone starts level; brainstorming whole systems begins in the second week. The class opens with a build rather than theory on purpose: starting from the foundations used to become too theoretical.

How to use this page. The course is built on live brainstorming, which trains you to think about systems intuitively rather than in question-and-answer form, so stop at every pause-and-think prompt and answer it before you open it. You will meet new terms; this is an intermediate course, so note them down and read about them yourself. Revise: the weeks chain together, and by week 7 a flash sale takes about ten minutes to design. The pre-reads on Redis and DynamoDB are curated for this session and cover most of what you need.

One convention. A table drawn on these pages only helps you see a schema. It does not mean a relational database, and SQL written here is just an easy way to show the idea.

### The green dot so far #

Nothing exists yet. This is the first lecture, so there is no earlier design to pick up: only a brief from a product team that wants a green or grey dot next to every user’s name, and an empty board. Chapter 1 settles how to start, chapters 2 to 4 build the indicator from its core, and chapters 5 and 6 switch to a second running case, the rows and the cache of a Medium-like blog. That blog is where Lecture 2 picks up the story.

Lecture 01 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-approach ===

# Green dots and blog rows, chapter 1: How to approach a design

Lecture 01 · Green dots and blog rows · chapter 1 of 7

§ 1

## How to approach a design

Before any box: decide whether you are building outward from a known core or growing a day-zero design, and pick tools by the property you need, not the tool you like.

About 6 min · class 00:15–00:22 · approach

A product team asks for green dots next to user names: green if the person is online, grey if not. Where do you even start? With the database, or with a whole small system that you then watch under load?

That choice comes before any box is drawn, and so does a second one: what you let decide which tool goes in each box. This chapter settles both. Every later chapter applies them.

§ 1.1

## Two ways to build

Spiral grows outward from a core you are sure of. Incremental starts with a day-zero system and lets load show you where to change it.

About 3 min · class 00:15–00:19

Across ten or eleven years of building systems, the instructor has seen only two approaches to building any system: spiral and incremental. Which one fits depends on the system, and there is no hard rule that you must always use one of them. This course uses both, spiral in some places and incremental in others.

Spiral. Decide the core of the system first. In most cases the core is the database, so you design the database; then you need API servers; then, with a bunch of API servers, a load balancer; and so on. The core becomes the single point of focus, the part that makes the system possible, and every other component is built around it as and when you need it. “Spiral” here is the course’s own name for building outward from a chosen core. It is not Boehm’s risk-driven Spiral model of software development wikipedia.org ↗.

The core is use-case specific. It can be a database schema, or it can be a communication layer: in a messaging app the WebSocket layer is the core, and everything else is built around it.

[figure title] Two ways to build: spiral and incremental

[figure description] Two panels. Spiral: a spiral line winds outward from a database cylinder at its centre, labelled core; small boxes for api, lb and more sit on the outer turns. Notes: decide the core and build around it, adding parts as you need them; the core is use-case specific, a database or a communication layer. Incremental: a numbered list, 1 day-zero architecture (with a tiny sketch of user, load balancer, api server, database), 2 see how each component behaves under load and at scale, 3 identify the bottleneck, 4 re-architect, 5 repeat, with a loop arrow from 5 back to 2.

[figure labels] core · api · lb · … · decide the core · & build around it · add parts · as you need them · core is use-case specific: · a database, a communication layer · spiral · 1 · day-zero architecture · api · 2 · see how each component behaves · ↳ under load · ↳ at scale · 3 · identify the bottleneck · 4 · re-architect · 5 · repeat · incremental

[caption] Fig 1·aTwo ways to build. Left: spiral, the core first and parts added around it as you need them. Right: incremental, the board’s five steps with the loop from “repeat” back to step 2. Spiral when you’ve built it before; incremental when you’re unsure. Redrawn from the class board at 00:17–00:18.

Incremental. This is for when you are unsure how to implement or how to scale. Start with the simplest day-zero architecture you can draw: user, load balancer, API server, database. Then see how each component behaves under load and at scale, and ask implementation questions as you go: is this server overburdened, and should part of it split into another service? Identify the bottleneck, re-architect, and repeat until you are content. On the board that is five steps: (1) start with a day-zero architecture, (2) see how each component behaves, under load and at scale, (3) identify the bottleneck, (4) re-architect, (5) repeat, looping back to step 2.

When to use which comes down to how well you know the ground. Use spiral when the system is a no-brainer: you have built similar systems before, so you know exactly how things will transpire and which parts it will need. Use incremental when the situation is ambiguous and you are a little uncertain. It resonates with startups: ship a day-zero architecture to some users, then re-architect over time and make it better and better.

Large organisations blur the line. In a multi-year project at a big organisation, where you know what has to be built and it is complex, you typically start with some parts and grow organically around them. There are no hard lines between the two approaches; knowing both simply gives you confidence when you build.

§ 1.2

## The property before the tool

Ask what the component must do and how it will be read and written. Which tool you like comes second.

About 3 min · class 00:19–00:22, with echoes at 00:58, 01:18 and Q&A 02:48

“I’ll use Redis here, because I love Redis.” Or only Postgres, only DynamoDB, only Cassandra. Many engineers carry an affinity like this, and that rigidity hampers the growth of the system. So for every technical decision, first understand the core property and the access pattern you need from the component, then see which tools, technologies and frameworks fit. Your affinity for a particular tech comes second.

Affinity also fails on plain practical grounds. A company that is not on AWS cannot use DynamoDB. A company that doesn’t run Redis still needs the system built. Either way, you pick whatever satisfies the requirement.

This course will discard Cassandra in many places. For a simple use case a relational database can solve it, and, counterintuitively, there are systems operating at scale that are built on relational databases instead of Cassandra.

The habit that goes with this is to go deep before you decide. Take every candidate technology, understand its pros and cons, and pick what suits the case best, staying open to all of them. It also means dropping stereotypes such as “DynamoDB is only for this” or “SQL is only for that”. What matters is knowing how to use a particular tech well.

The rule for this whole chapter

Understand the core property & access pattern. Affinity towards a tech comes second.

The board’s third point sits under it: build an intuition towards building systems. There is no single way to build a system. Every system can be built in endless ways and keeps evolving, and in the real world you will be asked to build systems that don’t exist yet. That is where intuition matters most.

[figure title] The property first, the tool second

[figure description] Step 1, written first: access, key-value. An arrow leads to a database cylinder with a question mark over it and the note not yet decided. Step 2, to the side and smaller: the tools you might like, redis, dynamodb, postgres, each with a question mark: affinity comes second.

[figure labels] 1 · access: key-value · ? · not yet decided · 2 · redis? · dynamodb? · postgres? · affinity comes second

That is why these pages put the reasoning before the boxes. There is no single correct design to memorise, and the systems you will build at work may not exist anywhere yet. So observe the pattern and the core properties a system needs instead of memorising a question and its answer, and build your intuition from them. The online/offline indicator in the next chapter is a good test: its heartbeats come back almost unchanged as failure detection in §4.9.

### Check yourself #

Answer in your head, or out loud, before opening each one.

You have built three chat apps before and now build a fourth. Spiral or incremental, and what is its core?

[summary] Show answer

Spiral: you have built similar systems, so you know how things will transpire. The core of a messaging app is its communication layer, the WebSocket layer, and everything else is built around it.

Your startup is unsure how a new feature will be used. Which approach, and what are its five steps?

[summary] Show answer

Incremental, because the situation is uncertain. (1) Start with a day-zero architecture, (2) see how each component behaves under load and at scale, (3) identify the bottleneck, (4) re-architect, (5) repeat from step 2.

Why is “we use Redis everywhere” a weak reason to pick Redis for the next feature?

[summary] Show answer

It is affinity, not a requirement. Start from the core property and access pattern the feature needs, then see which tools fit. Affinity also breaks in practice: a company without Redis, or not on AWS for DynamoDB, still has to ship.

Next, apply it: the green dot, built spiral-style from its core.

Concepts in this section: spiral approach · incremental approach · core property & access pattern

Contents of this lecture ↑

Lecture 01, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-green-dots ===

# Green dots and blog rows, chapter 2: Green dots: the online/offline indicator

Lecture 01 · Green dots and blog rows · chapter 2 of 7

§ 2

## Green dots: the online/offline indicator

Build the indicator one forced question at a time: what to store, how to read many users at once, who reports being alive, how long silence means offline, and who cleans up.

About 25 min · class 00:13–00:46, Q&A 02:44–03:05 · database, communication

- Notation, same in every figure

- reader

- cdn

- api server

- remote cache (redis)

- master / database

- replica

- queue (oldest leaves right)

- stream / broker

- worker, consumer

- request

- ack, success

- failure, stale

- async copy (head on whoever starts it)

[figure title] Marks this lecture adds

[figure description] A filled green dot means online. A hollow ring means offline. A small blue dot is one heartbeat. A small clock face is a TTL timer. A ruled block with a header row is a table, drawn only to show a schema.

[figure labels] online · offline · heartbeat · ttl 30s · table · (a schema, not a DB choice)

[caption] This lecture adds five marks to the key. The offline mark is a hollow ring rather than a grey fill, so it reads the same on a dark page.

The product team’s brief is one line. Show a list of users, each with a green dot if they are online and a grey dot if they are offline, the way Facebook and Twitter do. This chapter builds that indicator, one question at a time, and each question forces exactly one part of the design.

§ 2.1

## The brief, and the core

Start where 1.1 said to start: pick the core, and ask what it must hold to draw one dot.

About 3 min · class 00:13–00:24

On the board the list is four rows: user 1 and user 4 are green, user 5 and user 3 are grey. It is day one of the course, so scale stays out of focus on purpose.

[figure title] What the user sees

[figure description] A friends list card with four rows in the board's order: user 1 and user 4 have a green dot, online; user 5 and user 3 have a hollow ring, offline.

[figure labels] friends · user 1 · user 4 · user 5 · user 3 · online · offline

[caption] Fig 2·aWhat the user sees: four rows in the board’s order, two online, two offline. Day one: no focus on scale yet. Redrawn from the class board at 00:15 and 00:22.

This is the spiral approach from §1.1 in practice. Pick the database as the core of the system, since it is the easiest place to start, and ask: to render one user with a green or a grey indicator, what do I need to store?

The first answer is the obvious one. For every user, store the user ID as an integer (a fair assumption) and whether they are online as a boolean: true for online, false for offline.

Now look at how this data will be used. You get the status of a set of users, get the status of one user, and update the status of one user. That is a classic key-value access pattern. It names the access pattern, not a database: the board says plainly that we still have not picked which database to use.

[figure title] Storage first, database later

[figure description] For every user store user ID and online or offline: the user ID is an integer, the status a boolean. A database cylinder beside it is labelled not yet decided. Below: the access pattern is key-value, three operations: get many ids, get one id, set one id.

[figure labels] user → online/offline · int · bool · ? · not yet decided · access: key-value · get(ids…) · get(id) · set(id)

[caption] Fig 2·bStorage first, database later: user (int) → online/offline (bool), read and written by key. The access pattern is decided; the database is not. Redrawn from the class board at 00:22.

The schemas on these pages are drawn as tables only to help you see them. A table does not mean a relational database; model it however you want. Likewise, SQL here is just an easy way to explain an idea, not a claim that only SQL is used.

§ 2.2

## Reading many dots at once

A friends list shows many users at once. The endpoint should be shaped for that screen, not for one user.

About 3 min · class 00:23–00:26

A friends list on screen renders four users. Who reads their status from the database? An API server, so the API server needs an endpoint. The first idea is the plain one: given one user ID, return that user’s status.

With only that endpoint, rendering four users takes four API calls from the front end. That is a very poor experience, and so many API calls also burden the backend.

So the first critical design decision is to expose a batch endpoint. It accepts a bunch of user IDs and returns the status of every one of them. The front end makes one network call for the same information, and the backend does the heavy lifting.

[figure title] Four calls or one

[figure description] Two panels with a user holding a phone, an API server and a database. Panel 1, one call per user: four blue arrows from the user to the API server, GET /status/u1 to u4; in red, 4 calls for 4 dots. Panel 2, one batch call: one blue arrow, GET /status/users?ids=u1,u2,u3,u4, a brace under the ids marking the users on screen, and a green reply listing each user as on or off.

[figure labels] api · db · GET /status/u1 · GET /status/u2 · GET /status/u3 · GET /status/u4 · 4 calls for 4 dots · one call per user · api · db · GET /status/users · ?ids=u1,u2,u3,u4 · the users on screen · {u1: on, u2: on, …} · one call, the backend does the work · one batch call

[caption] Fig 2·cFour calls or one. Left: a single-user endpoint costs one call per dot. Right: one batch call carries every user on screen, and one reply carries every status. Redrawn from the class board at 00:24; the right panel’s reply is added.

The board writes it as GET /status/users?ids=u1,u2,u3,u4: for all the IDs provided, return each one’s online or offline status. That settles the reading side. Knowing why an endpoint is exposed in a certain way, instead of just drawing a box labelled “API”, is the kind of detail this course cares about.

§ 2.3

## Who says a user is alive?

The server can’t reach out to a browser, so each client has to keep saying it is alive.

About 3 min · class 00:26–00:28, Q&A 03:03–03:05

Reading is solved. Now something has to keep each user’s status up to date. There are two ways to get that information: the server can pull it, or each client can push it.

Pull would mean the API server calling each client and asking “are you alive? are you alive?”. That is not possible: HTTP is stateless and there is no persistent connection, so the API server cannot talk to the client. The client has to talk to the server. The board adds an exception: unless there is a persistent connection.

That exception has a name. WebSocket gives a client and a server two-way communication over one connection; before it, getting updates from a server meant polling it over HTTP RFC 6455 ↗. This design stays with plain HTTP calls from the client.

[figure title] Users push; the server can’t pull

[figure description] Three users on the left each send a blue arrow, their heartbeat, that merges into one API server, which writes to a database. A dashed arrow from the API server back toward the users carries a red cross: the server cannot reach the client. A speech bubble on the server says: can’t I just ask them? Below: users push their status periodically, unless there is a persistent connection.

[figure labels] api · db · can’t reach the client · can’t I just ask them? · users push their status periodically · * unless there is a persistent connection

[caption] Fig 2·dUsers push; the server can’t pull. Each client sends its own heartbeats in blue. The dashed pull back to the clients is crossed out: over plain HTTP the server cannot start the conversation. Redrawn from the class board at 00:26.

So the client pushes. Every client periodically makes a heartbeat API call to the backend that says “I am alive”. The name comes from the human heart: as long as it keeps beating, you are alive, and when it stops, you are dead.

The endpoint is POST /heartbeat. Each call marks whichever user is authenticated on that request as alive.

[summary] Is HTTP really stateless? skip if the pull step made sense

This came up at the end of class. HTTP is designed to be stateless: you send one request, you get one response, deal done. You can still keep the underlying connection open, with the keep-alive header. Keep-alive is a connection-level header, and HTTP/2 and HTTP/3 forbid it, so it matters only for HTTP/1.x MDN ↗.

HTTP/2 keeps its connections persistent. WebSocket is not HTTP, but it also keeps a persistent connection, and no rule says a connection must always be closed. A WebSocket does start life as HTTP: its opening handshake is an HTTP Upgrade request RFC 6455 §1.7 ↗.

As the class described it, the client normally sends a request, the server responds and closes the connection; with the keep-alive header the server doesn’t close it, and if neither side closes it, it stays open.

More precisely

HTTP/1.0 closed the connection after each response unless Keep-Alive was negotiated. HTTP/1.1 keeps connections open by default until one side closes them or a timeout hits, and HTTP/2 connections are always persistent; the Keep-Alive header is forbidden there MDN ↗.

RFC 9112 §9.3 ↗

Even so, think of HTTP as stateless: it keeps your design simple. When you genuinely need state, there are better tools, such as WebSockets or MQTT. coming later · Lecture 9, week 5: a system that keeps HTTP/2 connections stateful on purpose

Asked in class: can HTTP run without TCP? HTTP runs on top of TCP. HTTP/1.1 and HTTP/2 do; HTTP/3 runs over QUIC, which is carried in UDP datagrams RFC 9114 ↗.

There is no fixed tie between them. HTTP is a specification for messages and TCP is a layer-4 protocol, so in principle you can send HTTP messages over UDP too. What HTTP does need underneath is a reliable, ordered transport, and over UDP that is what QUIC provides RFC 9000 ↗.

§ 2.4

## Why the beat must repeat

A client can announce that it is online. It can’t reliably announce that it is gone.

About 4 min · class 00:27–00:31

Why send heartbeats over and over? A common idea is that two calls are enough: one when the user comes online or logs in, and one “I’m offline” call at logout.

Pause and think

Your app sends “I’m online” when a user logs in and “I’m offline” when they log out. A user’s laptop battery dies mid-session. What do their friends see, and is the two-call design enough?

A client can announce coming online but can’t reliably announce going offline: a crash, a dead battery or a pulled plug sends nothing. So the client sends a heartbeat every few seconds, and the server treats silence for “long enough” (30 s here) as offline. How long is long enough is a product decision.

[figure title] Two calls are not enough

[figure description] Swim lanes for the user's laptop, the API server, the store and a friend's screen, time running down. 1: at login the laptop sends online; the store marks u7 online and the friend sees a green dot. 2: ten minutes of use, nothing is sent, still green. 3: the battery dies and no offline call leaves the laptop. 4: an hour later the friend still sees green, a stale dot. 5: replay with periodic heartbeats every 10 seconds; after the battery dies there is silence, and after 30 seconds of silence the store marks u7 offline and the friend sees a ring.

[figure labels] laptop · api · store · friend · time · 1 · online · u7 = online · 2 · 10 min of use, · nothing sent · 3 · no “offline” call · 4 · an hour later · still green · 5 · replay, with heartbeats · 10s · 30 s · u7 offline

- At login the app says online. The store marks u7 = online and the friend sees a green dot.

- Ten minutes of use. Under the two-call design nothing else needs sending, so the dot stays green.

- The battery dies. The app never gets to say offline: no call leaves the laptop.

- An hour later the friend still sees green, for a user who has been gone an hour. The dot is stale.

- Replay with periodic heartbeats: a beat every 10 s, then silence when the battery dies. After 30 s of silence the store marks u7 offline and the friend sees a ring.

Keys: ← → to step · link to a step with #fig-2e/step-3

[caption] Fig 2·eTime runs down. Lanes are the user’s laptop, the API server, the store and a friend’s screen. Blue is a call, the red ring a stale dot.

The two-call design fails on a very common case. A user’s app says “I’m online”, then the machine crashes, the battery runs out or someone pulls the plug. The user is offline, but the UI keeps showing them online because the offline call never came. You can tell the server when you come online; you can’t promise a call just before the device dies, because you are not in control of that moment. This fundamental limitation is why heartbeats must be periodic.

From there the design converges naturally: as long as heartbeats keep arriving, the user is online, and if the backend doesn’t receive one for long enough, it marks the user offline.

[figure title] A periodic pulse

[figure description] A user sends a row of blue heartbeats, one after another, to the API server's POST /heartbeat endpoint, which marks the authenticated user alive. Below: a user is offline when no heartbeat arrives for long enough; long enough is subjective, here 30 seconds, with a heartbeat every 10 seconds.

[figure labels] marks the authenticated user alive · POST /heartbeat · api · periodic pulse · offline = no heartbeat for · long enough · subjective! here 30 s · heartbeat every 10 s

[caption] Fig 2·fA periodic pulse into POST /heartbeat. Offline means no heartbeat for long enough, and “long enough” is subjective: here 30 s, with a beat every 10 s. Redrawn from the class board at 00:29–00:30.

“Long enough” is subjective, as the board says, so it is business logic you configure per system. For one system it might be 10 minutes without a heartbeat; for others 10 seconds or a minute. This design marks a user offline after 30 seconds of silence, with clients sending a heartbeat every 10 seconds.

§ 2.5

## A timestamp instead of a boolean

A boolean can say “online”. It can’t say “silent for 30 seconds”. A time can.

About 3 min · class 00:30–00:34

A boolean can’t tell you that a user has been silent for 30 seconds. To know that it has been long enough, you need to know when the last heartbeat arrived. So the schema changes: instead of a boolean, store the time at which the last heartbeat was received. The table is pulse(user_id, last_heartbeat), and every POST /heartbeat updates that user’s row.

[figure title] The pulse table and the two rules

[figure description] Left: table pulse with columns user_id and last_hb, rows u1 1000, u2 1050, u3 1060. Right: on every heartbeat, UPDATE pulse SET last_hb = NOW() WHERE user_id = u1, where NOW() is epoch seconds. Below: GET /status/<user_id> applies two rules: no entry means offline; last_hb older than now minus 30 seconds means offline; otherwise online.

[figure labels] pulse · user_id · last_hb · u1 · 1000 · u2 · 1050 · u3 · 1060 · on every heartbeat: · UPDATE pulse · SET last_hb = NOW() · WHERE user_id = u1 · epoch seconds · GET /status/<user_id> · no entry · → offline · last_hb < now − 30s · → offline · else · → online

[caption] Fig 2·gThe pulse table and the two rules. Every heartbeat rewrites one row’s last_hb with the current time in epoch seconds; GET /status applies two rules to decide the dot. Redrawn from the class board at 00:30–00:32.

On each heartbeat the class ran one statement, UPDATE pulse SET last_heartbeat = now() WHERE user_id = <id>, again and again, so that user’s row always holds their latest beat. A user’s very first heartbeat has no row to update yet, so in practice write it as an upsert: PostgreSQL’s INSERT … ON CONFLICT (user_id) DO UPDATE inserts the row or updates the existing one atomically, even under high concurrency postgresql.org ↗.

Reading changes too, because the row now holds a time instead of true or false. The getStatus logic becomes two rules, and the same rules run for every ID in a batch call. Rule 1: if there is no entry for a user, return offline; the user never came online. Rule 2: if there is an entry but its last_heartbeat is older than now minus 30 seconds, meaning no heartbeat for more than 30 seconds, return offline. Otherwise the user is online.

-- every POST /heartbeat -- (the first beat creates the row) INSERT INTO pulse (user_id, last_heartbeat) VALUES (:uid, :now) ON CONFLICT (user_id) DO UPDATE SET last_heartbeat = EXCLUDED.last_heartbeat;

// row: this user's pulse entry, or null function getStatus(row, now) { if (!row) return 'offline'; // rule 1 if (row.last_heartbeat < now - 30) return 'offline'; // rule 2 return 'online'; }

The time is stored as epoch seconds: the number of seconds elapsed since 1 January 1970, the standard Unix epoch. Chapter 5 comes back to dates stored as epoch integers in §5.7.

§ 2.6

## Is storage the problem?

Back-of-the-envelope arithmetic, seventh-standard maths, says what this system does not need.

About 5 min · class 00:33–00:39

Now estimate the scale. Suppose the product has a billion users. How much space does the pulse table need?

Pause and think

One row per user: a 4-byte user ID and a 4-byte last-heartbeat time. There are 1 billion users; 1 million are active at once, each sending a heartbeat every 10 seconds. Work out the storage and the writes per minute. Which number is the real problem?

Storage is 8 GB of payload (more with row overhead, still small), so it fits in one cheap machine’s RAM. The writes are 6 million a minute, about 100,000 a second, every one a database update. This is the classic case where storage is not the problem and computation is. This section settles the storage half; §4.1 picks up the writes.

Each row holds two values: the user ID and the last-heartbeat timestamp, both integers. That is 4 bytes + 4 bytes = 8 bytes per user, one entry per user, so 100 users means 100 entries and 1,000 users 1,000 entries. This is 8 bytes of data, not yet the space it takes on disk.

With a billion users, about an eighth of the world’s population (Facebook has many more), that is a billion entries of 8 bytes each: 8 GB in total. The 8 GB is raw payload. A real database adds overhead to every row: PostgreSQL stores a 23-byte header plus a 4-byte pointer for each row, so an 8-byte row takes roughly 36 bytes before any index postgresql.org ↗. The real footprint is several times 8 GB, and the conclusion below still holds.

[figure title] How big is it?

[figure description] Left: a ladder, 100 users give 100 rows, 1 thousand give 1 thousand, 1 million give 1 million, 1 billion give 1 billion; 1 billion times 8 bytes is 8 GB. Right: user_id and last_hb are each a 4-byte int, so 8 bytes per row; a phone holds 128 GB. Inset: with absence meaning offline, 100 thousand active users give 100 thousand rows, 800 KB.

[figure labels] 100 users · → · 100 rows · 1k · → · 1k · 1m · → · 1m · 1B · → · 1B · 1B × 8 B = 8 GB · user_id · last_hb · int (4B) · int (4B) · = 8 B / row · 128 GB in · your pocket · absence = offline: · 100k active → 100k rows = 800 KB · (see 2.7)

[caption] Fig 2·hHow big is it? One row per user, 8 bytes a row: a billion users is 8 GB, less than the phone in your pocket. The bottom line is from the next section: with absence meaning offline, 100k active users need 800 KB. Redrawn from the class board at 00:34 and 00:41.

8 GB is not much. Your phone has 128 GB in your pocket, and 8 GB fits in the RAM of a trivial, cheap machine. So this system does not need massive storage; storage is not its challenge. It needs something else. Storage, as used in this estimate, is simply the amount of space you need to hold the data, and here that is two integers per user.

The class still asked whether the 8 GB could shrink. Not because it must, but because of a habit worth keeping: at every step of a design, ask the critical questions. Can I change this? Is there an alternative? Every system is a matter of analysing hundreds and thousands of trade-offs and picking the best path.

Stay open to every possibility, without bias, and stay humble. Document every option you know of and why you took the path you did. If someone asks “did you think of this?” and the answer is “no, I didn’t”, that earns you nothing. Thinking through all the cases is the heart and soul of being a better senior engineer.

§ 2.7

## Absence means offline. Who deletes?

If no row means offline, only online users need rows. Then something has to delete the rest.

About 5 min · class 00:38–00:44, Q&A 02:44 and 02:53

Look at what the end user actually sees: a green dot or a grey one, nothing more. On the board: all we care about is online or offline. So treat the absence of an entry as offline. A row exists only for a user who is online, which cuts the number of rows by a significant margin. Storage was never the problem; this is the hypothetical optimisation from 2.6, followed through.

Absence only means offline if entries go away on time. Every heartbeat resets a 30-second timer for that user, and once the 30 seconds run out the entry is deleted. The number of entries then equals the number of users online at that moment. The board puts numbers on it: with 1 billion users in total and 100,000 active, there are 100,000 entries, about 800 KB.

Pause and think

Only online users have a row now, and a row must vanish 30 s after the user’s last heartbeat. A teammate proposes a cron job that deletes stale rows every few seconds. Ship it?

A cron job is another moving part, with its own uptime and telemetry, and it isn’t robust to edge cases. Stores like Redis and DynamoDB expire keys natively: set a 30 s TTL on every heartbeat and the store deletes the key itself. Don’t reinvent the wheel, and don’t draw a box you wouldn’t want to run.

So who does the deleting? The simplest answer is a cron job. It runs periodically over the same pulse table, finds the entries whose last heartbeat is older than 30 seconds, and deletes them. getStatus then gets simpler: if the entry exists the user is online, and if it doesn’t, they are offline.

That would work for a startup that is just launching. It is not a robust solution, though: there are edge cases to handle.

[figure title] Who deletes?

[figure description] Two panels. A cron job: a dashed cron box, a separate process, runs DELETE where last_hb is older than now minus 30 seconds against the pulse table; red tags around it say host it, keep it up, monitor it: another moving part. The store expires it: the API server sends SET u42 EX 30 in blue to a store; inside it the key u42 has a TTL timer and a dashed arrow to a cross, the store deleting the key itself; a green tick says nothing new to run.

[figure labels] cron · host it · keep it up · monitor it · pulse · user_id · hb · u1 · … · DELETE … WHERE · last_hb < now − 30s · another · moving part · a cron job · api · SET u42 EX 30 · u42 · the store deletes it · nothing new to run · the store expires it

[caption] Fig 2·iWho deletes? Left: a cron job is a new process that someone must host, keep running and monitor. Right: a store with a TTL deletes the key itself, and nothing new runs. Drawn from the class board’s “Approach 1” and “Approach 2” pages at 00:41 and 00:44.

The bigger cost is that a cron job adds another moving part. It is a separate process whose only job is to scan for expired entries and delete them. You have to host it and keep it constantly running, or the business logic falters. Its uptime now matters as much as the REST service’s, and you manage its monitoring and telemetry too. That is a lot on your plate for one delete.

This runs against much of what you see online, where services get added here and there. Never draw a box for the sake of it. Think from the implementation: would you really want to build, monitor and manage this component? If not, look for a better alternative. Making your diagram look complex is the worst thing you can do.

[summary] What about “last seen”? skip unless your product shows it

This was asked twice in class. Showing “last seen” was out of scope: the indicator has only green and grey. Whether to show it, as WhatsApp does, is a product call. If the product wants it, you can’t delete the rows. You keep them, and the last heartbeat received is the last-seen time. Nothing needs optimising then, because storage was never a problem: 8 GB is peanuts. Deleting offline entries was a stretch, there to make you think along those lines.

§ 2.8

## Let the database expire it

Some stores delete a key on their own when its time is up. Use that instead of building a deleter.

About 5 min · class 00:43–00:46 and 01:03, Q&A 02:44 and 03:00

The board’s next line asks: can we not offload this to our datastore? Can the database do this deletion itself? Databases exist that expire entries natively, so writing a cron job would be reinventing the wheel and adding a component you don’t need. Offload the expiry to the database and keep the design simple.

The rule for this whole chapter

Never re-invent the wheel!

If the database you need can expire entries natively, don’t run your own deleter. Every component you add is one more thing to host, keep up and monitor, so let the database do what it already does.

[figure title] Never reinvent the wheel

[figure description] A cron box crossed out in graphite (a choice, not a failure), beside a database cylinder holding a key with a TTL timer: the store already expires keys, so nothing new is built.

[figure labels] cron · don’t build it · → · key · ttl 30s · the store · already · does it

That sets the requirement: a database with key-value access plus expiration, a time to live or TTL. Two very common ones are Redis and DynamoDB. There are others; these two were picked on purpose, to drive the discussion in the next chapter.

The whole logic now fits in a few lines. On every heartbeat, set the user’s entry in Redis or DynamoDB, whichever you choose, with a TTL of 30 seconds. As the board puts it, every heartbeat moves the expiration time forward. When 30 seconds pass without a heartbeat, the database deletes the entry by itself. If the entry exists, the user is online; if it doesn’t, they are offline. The app is just REST endpoints that talk to this database, and the database takes care of the deletion.

More precisely

Each heartbeat must re-send the TTL: in Redis a plain SET clears any expiry, so write SET user:<id> 1 EX 30 every time. DynamoDB’s TTL deletes expired items “typically within a few days”, and until then reads still return them, so store expires_at = now + 30 and treat expires_at < now as offline, filtering on Query and Scan docs.aws.amazon.com ↗.

redis.io ↗

# Redis, every POST /heartbeat # (EX 30 on every write) SET presence:42 1 EX 30 # getStatus: present = online EXISTS presence:42 # DynamoDB: expires_at = now + 30 # online if expires_at > now

The laptop’s battery dies right after a heartbeat. How long until the dot turns grey?

[caption] Clip 2·1Forget the TTL on one write and the user never goes offline.

[summary] The clip as text 0:40

- Every heartbeat sets the key with a 30-second TTL.

- Each beat resets the TTL: the expiry moves to 30 s after it.

- The battery dies. No ‘offline’ call is ever sent.

- No more beats. The store keeps counting down on its own.

- 30 s after the last heartbeat the key is gone: absent means offline.

- Forget the TTL on one write and the user never goes offline.

- Every heartbeat: SET with EX 30. The store does the deleting.

A laptop sends a heartbeat every 10 seconds through the api, which writes SET u42 1 EX 30 to Redis, so the key u42 expires 30 seconds after that write. A friend's screen shows a green dot while the key exists. On a sped-up time track, each heartbeat resets the TTL to 30 seconds and moves the expiry mark to 30 seconds after it: from 30 s to 40 s to 50 s. The laptop's battery dies at 22 seconds, just after the beat at 20 seconds, and no offline call is sent. The store counts the TTL down on its own; at 50 seconds, 30 seconds after the last heartbeat, it deletes the key and the friend's dot becomes the offline ring. A second track shows the trap: if one heartbeat writes a plain SET without EX, the TTL is cleared, the key never expires and the friend keeps seeing the user online. So every heartbeat must write SET with EX 30, and the store does the deleting.

Is the TTL worth its cost? Asked in class: it was there because space mattered. If space doesn’t matter, skip it and keep the entries. And the extra work of expiring keys is no concern for Redis anyway: deleting in memory is peanuts for it. coming later · Lecture 3: how Redis expires keys inside: lazy deletion and sampling, and building a cache with TTL in Lecture 9

[summary] Not how production does it skip unless you build presence

Real online/offline indicators are not built this way. They keep a persistent connection open, with many tunings and optimisations on top. WebSocket is one option but not the only one: when Facebook built Messenger, it kept its persistent connection over MQTT, chosen because it uses bandwidth and battery sparingly engineering.fb.com ↗. Today’s simple design was about the granular details, the intuition and the trade-off decisions.

coming later · Lecture 2: WebSockets, §5.4 (the class said “next week”; they came the next day)

coming later · Lecture 4: real-time presence in Slack’s design

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why can’t a client’s logout call be the only way to go offline?

[summary] Show answer

Because a client can’t reliably announce that it is going away. A crash, a dead battery or a pulled plug sends no call, and the dot stays green. Only periodic heartbeats, with silence for long enough treated as offline, handle that case.

With heartbeats every 10 s and a 30 s threshold, how many heartbeats can be lost before a live user shows grey?

[summary] Show answer

Two. A user is marked offline only after 30 s without a heartbeat, so two missed beats in a row still leave them green, and a third missed beat (30 s of silence) turns them grey.

What must every Redis heartbeat write include, and what must a DynamoDB read check, for “absent = offline” to hold?

[summary] Show answer

In Redis, the TTL on every write (SET key 1 EX 30), because a plain SET clears the expiry and the key would never go away. In DynamoDB, an expires_at check on read (expires_at < now means offline), because the TTL deletes expired items only “typically within a few days”.

Two stores do key-value with a TTL. Which one, and why?

Concepts in this section: key-value access pattern · batch endpoint · heartbeat · epoch seconds · absence = offline · TTL

Contents of this lecture ↑

Lecture 01, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-redis-or-dynamodb ===

# Green dots and blog rows, chapter 3: Redis or DynamoDB?

Lecture 01 · Green dots and blog rows · chapter 3 of 7

§ 3

## Redis or DynamoDB?

Both give key-value access and a TTL, so speed is not the deciding question. Persistence, who runs it, lock-in, room to grow and how fast you learn about an expiry decide it.

About 20 min · class 00:45–01:04, Q&A 01:20–01:22 and 02:42–02:52

The green-dot design from chapter 2 needs only two things from its store: get and set a value by key, and let an entry expire on its own after 30 seconds. Redis does both. DynamoDB does both. So which one goes in the box, and why?

This chapter is the class’s brainstorm on that question, with the late questions about it folded in. The answers people give first are not the ones that decide it.

§ 3.1

## Same features, different choice

When two stores both do what you need, the choice moves to things that aren’t on the feature list.

About 3 min · class 00:45–00:46 and 01:02–01:04

Redis and DynamoDB both give key-value access and both give expiration. The pre-reads asked for both, and the lecture put them side by side on purpose: since either one can hold the presence entries, choosing between them for this system needs other criteria. The board asked “which one would you pick & why?”, and next to it listed one more criterion to weigh: cost estimation.

Pause and think

Redis and DynamoDB both give key-value access and a TTL. Before you read on: is “Redis is faster because it’s in memory” the strongest reason to pick between them for this system?

The three factors the class said are often missed: managed vs self-managed (does your team have the people to run it?), vendor lock-in (DynamoDB exists only on AWS, and your cloud vendor might enter your business) and future extensibility (Redis has Bloom filters, HyperLogLog, geo). The timing argument that does matter here is not raw speed but how you learn about an expiry: a persistent connection on which Redis can push “this key expired” (§3.6, with its note).

The class built the answer up row by row. Each answer got a tick under the store it argued for, and the rows below are in the order they went up on the board. The ticks record what was said, not a verdict: the first row was challenged as soon as it was written (§3.2).

[figure title] The brainstorm table: Redis or DynamoDB?

[figure description] A two-column T-table headed Redis and DynamoDB, under the question "which one would you pick and why?" and a small note "cost estimation". Five rows, each a tick in one column with a line running to its label: DynamoDB, persistence (with a question mark, because the class challenged it); DynamoDB, managed (team size and expertise); Redis, vendor lock-in; Redis, future extensibility; Redis, time sensitivity. The ticks record the class’s answers, not a verdict.

[figure labels] which one would you pick & why? · * cost estimation · Redis · DynamoDB · persistence · ? · managed · (team size & expertise) · vendor lock-in · future extensibility · time sensitivity

[caption] Fig 3·aThe class’s brainstorm, in the order the rows were added. DynamoDB got persistence (questioned, hence the ?) and managed; Redis got vendor lock-in, future extensibility and time sensitivity. Redrawn from the class board at 01:02.

The two stores were not picked at random. Redis is open source and DynamoDB is proprietary, and that is a big difference: a large organisation that worries about vendor lock-in may choose one over the other for that reason alone. The licence has moved since: Redis switched to source-available licences in March 2024 and added the OSI-approved AGPLv3 as an option with Redis 8 in May 2025 redis.io ↗, and in the meantime AWS and Google back their own open-source fork, Valkey, which ElastiCache offers alongside Redis docs.aws.amazon.com ↗.

Beyond the common answers, the lecture singled out three factors that people often miss when they choose a database, and called them very important: future extensions, vendor lock-in, and whether the store is managed or self-managed.

The rule for this whole chapter

Three factors people miss when choosing a database: future extensions, vendor lock-in, managed vs self-managed.

Speed and features are the answers everyone gives first. These three are the ones a real pick turns on, and few people put thought into them. The rest of this chapter takes them one at a time, after the two answers given first in class.

[figure title] Three factors people miss

[figure description] A small T-table of the three factors people miss when choosing a database: future extensions, vendor lock-in, managed or self-managed. Each row is ticked.

[figure labels] before you pick a database · checked · future extensions · vendor lock-in · managed or self-managed?

§ 3.2

## Persistence, and Redis as the primary store

“The data should persist” sounds safe. For entries that die after 30 seconds, it is a question, not an answer.

About 4 min · class 00:46–00:47 and 00:55–00:56, Q&A 02:46–02:48

The first answer in class was DynamoDB, because the data might need to be stored permanently: persistence. The lecture challenged it straight away. This data is deleted after 30 seconds anyway, so why would it need to persist? The class later summed that pick up as “persistence and managed” and moved on, without a verdict on persistence itself, so the question stays open: decide what a presence entry is worth after its 30 seconds are up before you pay for keeping it.

It was also pointed out that Redis can persist too. The lecture agreed: if you need persistence you can configure it on Redis, with a few limitations.

Agreeing came with a demand. Knowing that a feature exists is not enough; know how it is implemented. For Redis persistence that means the append-only file (AOF) and the RDB snapshot files, how you configure them, and how often data is flushed to disk. Push your boundaries on details like these.

A question near the end of class came back to this from the other side. Whenever people talk about Redis they think of a cache in front of a database, so why did the presence design start with Redis or DynamoDB as the main store, instead of proposing a database first and a cache on top? Because Redis can be the primary database. Why not?

Whether you need a primary database with Redis on top of it, or Redis alone, depends on the guarantees your system has to give. Pick one over the other on that basis.

For the online/offline indicator, Redis as the primary store is fine. Configure AOF-based persistence and you get on-disk persistence with, as the lecture put it, zero data loss. You keep Redis’s speed, and the data is small enough to sit in RAM: only 8 GB (§2.6). There is no reason not to use Redis.

More precisely

Redis as the primary store works for presence, but AOF with the default appendfsync everysec can lose about 1 s of writes on a crash; zero loss needs appendfsync always, which is very slow. Replication is asynchronous, so acknowledged writes can also be lost on failover redis.io ↗. For presence data, a second of lost heartbeats is harmless.

redis.io ↗

That answer came with a broader point. Drop the hard stereotypes, such as “DynamoDB is only for this” or “SQL is only for that”. What matters is knowing how to use a particular technology.

§ 3.3

## Managed or self-managed

A managed store is not a technical feature. It is a decision about who gets paged.

About 4 min · class 00:47–00:48, 00:56–00:57 and 01:02–01:03, Q&A 01:20–01:21 and 02:43–02:50

The second reason given for DynamoDB was that AWS manages it. It is highly available and the team doesn’t have to worry about it, whereas Redis, an in-memory database the team runs itself, can go down. The lecture endorsed the idea behind it: a managed service offloads the management of the infrastructure to your cloud vendor, so the team can focus on business logic. The same answer allowed that with enough money to manage the infrastructure, Redis is an option too. The board row reads “managed (* team size)” with “& expertise” under it.

Managed is not DynamoDB’s alone. Every cloud provider offers a managed Redis, AWS ElastiCache for example, so you can have a managed service and still move between providers, because your code stays the same. That point was raised in class without a clear verdict on it, so take it as one more option to weigh.

Who goes managed, and why? Lean teams, a 5–10 person startup, go for managed services to avoid the pressure of managing infrastructure, or because they don’t have the expertise. Running any database, MySQL, Redis or Elasticsearch, comes with its own set of pain points: observability, profiling and more. Managed services make that easy.

The question came back near the end of class from a different angle: does a managed DynamoDB give better value than a self-managed Redis that you would have to autoscale on the fly? If you are a startup or a small, lean team without the ability to manage it, go for DynamoDB or another managed solution.

Self-hosting Redis takes a team with the expertise to manage it. Without that, use a managed Redis: Redis Labs, AWS and GCP all offer a variant. Self-host only when you have both the expertise and the engineering bandwidth; otherwise throw money at the cloud providers and get things done. With a lean team you can offload everything to DynamoDB: you pay them, and they become your extended engineering team.

Availability was left out of the comparison on purpose, by assuming it equal. With Redis your engineers have to ensure it; with DynamoDB AWS gives it to you. In the lecture’s words, availability is a property of engineers, not of the database.

Handling a sudden surge was treated the same way. Autoscaling is a property of the engineering team rather than the tool, so the comparison assumed it equal too. If you do count it, it counts against self-hosted Redis: you need engineering expertise to manage it, scale it and react to surges, and that is an added strain on the team that DynamoDB doesn’t put on you.

§ 3.4

## Vendor lock-in

DynamoDB exists on one cloud. Most of the time that is fine. Here is when it isn’t.

About 7 min · class 00:48–00:55, Q&A 02:42–02:43

The third answer in class turned to Redis. Whether a managed solution makes sense depends on your team size, and Redis can help you prevent vendor lock-in, if that is a concern you have: DynamoDB more or less locks you into AWS, and it is harder to migrate off.

Why is lock-in such a big issue? The reasons raised in class: cloud pricing that becomes unmanageable, the rest of your infrastructure slowly moving to another provider, or a better deal elsewhere for your business. The same answer added a caution: people often think it is a big issue, and very often it doesn’t end up being one.

[summary] From practice: why teams switched clouds skip unless you’ve lived through a migration

Reasons other than cost came up in class. One participant pointed to security: their team had seen an issue with a cloud provider’s databases, where access was messed up, and for something like a bank that is a very big concern. Another reason given was a provider that is somewhat infamous for discontinuing services (GCP was named), which pushes teams to shift slowly to another cloud. The lecture called these valid: the vendor messes up, or you lose trust in it, or you eventually find it too complex to use.

What does lock-in actually mean? Vendor lock-in is being tied to one cloud vendor because the tool you use exists only there. DynamoDB exists only on AWS, not on GCP or Azure. If you ever want to move, you have to rewrite your code for another technology. The lecture picked DynamoDB for this discussion specifically to raise this point.

Moving clouds, GCP to AWS or AWS to Azure, means rewriting a lot of code. That is why organisations that reach a certain maturity think about vendor lock-in a lot.

The reason people miss, in the lecture’s view, is competition. Amazon is known to enter hundreds of businesses. Amazon launched a food business in India. If the food-delivery companies there run on AWS (the instructor wasn’t sure what Swiggy and Zomato run on), then the bill they pay AWS goes into Amazon’s pocket, which can then power Amazon’s food business: they are literally feeding their competitor. And this is not settled in advance. You may already be on AWS when Amazon enters your business.

Since the class

Amazon’s food-delivery service ran in parts of Bengaluru from May 2020 and was announced to close on 29 December 2022. The competition argument stands; the example is now historical.

techcrunch.com ↗

[figure title] Feeding your competitor

[figure description] Your company pays its cloud bill, a blue arrow, to the cloud vendor. The vendor also runs a food business, and a red double-headed arrow between that business and your company says it competes with you: the bill funds your competitor.

[figure labels] your company · $ cloud bill · vendor · food business · (the vendor’s own) · competes with you

[caption] Fig 3·bThe lecture’s example: a food-delivery company paying a cloud vendor that runs a food business (Amazon’s, 2020–2022). The bill funds the business that competes with you.

The lecture’s classic example is Walmart, which is not on AWS: Walmart and Amazon are both in e-commerce, so being on AWS would mean feeding its competitor. The lecture said Walmart is on GCP. In fact Walmart runs a hybrid of Microsoft Azure news.microsoft.com ↗, Google Cloud and its own private cloud infoworld.com ↗; either way, not AWS.

The stakes grow with the bill. As an illustration: an organisation with a cloud bill of, say, $10 million a month would be paying its competitor $10 million a month. Amazon is only one example; in the lecture’s words, Microsoft, Google and Alibaba are known for entering other businesses too.

A very early startup doesn’t need to worry about any of this. With a bill of about $10,000 a month it hardly matters to Amazon at all. Big customers always think about it.

There is a counter-example. Netflix existed before Amazon’s Prime Video became its competitor, and Netflix still runs on AWS, because moving out would mean rewriting so much code. The lecture guessed that there is some mutual agreement, perhaps a better deal, since Netflix is, as the lecture put it, AWS’s biggest customer, and said plainly that it doesn’t know the details.

These are critical points in real systems, even though they rarely come up when you draw one. Lock-in is why many teams go towards open-source technologies rather than proprietary ones: they don’t want to be locked in to one vendor.

When doesn’t lock-in matter? If you work at Google and are bound to GCP, you are the vendor yourself and will never move out, so there is nothing to compare. Likewise, a company that knows it will always stay on AWS, whatever happens, need not worry about lock-in at all.

Put on a manager’s hat and one more factor appears: talent. Is it easy to find people who know a technology that only one vendor offers, compared with an open-source technology that everyone uses? That alone may tempt a manager towards open source. The lecture’s example: TigerGraph is a proprietary graph database and Neo4j is widely known, so you would find hundreds of developers who know Neo4j but few who know TigerGraph.

§ 3.5

## Room to grow

Today the feature needs a key and a timer. Pick the store for what the feature might need next.

About 4 min · class 00:57–01:01

Another answer compared data types: Redis only has string types for what we store, while DynamoDB also has numbers. That is not right. Even Redis has numbers, and it is not just strings: Redis has a whole set of data structures.

The real point inside that answer is future extensibility. If the feature might later need more than a key and a value, for example advanced data structures such as Bloom filters, HyperLogLogs or geospatial queries, you may lean towards Redis. It may not matter for an online/offline indicator, but it matters for other use cases, and the lecture called it a very good point.

It was suggested in class that DynamoDB can do similar things with DynamoDB Streams and Lambda. Agreed: databases keep evolving and offer many features, so keep track of what they offer and whether you need it. And just as DynamoDB has Streams, Redis also gives you change data capture. Redis’s version is weaker, though: keyspace notifications are best-effort Pub/Sub redis.io ↗, or you write to a Redis Stream from your application, whereas DynamoDB Streams with Lambda docs.aws.amazon.com ↗ is a durable change feed.

The world of databases is converging fast, and every database is growing everything: MongoDB supports ACID, SQL databases support sharding now. Both need a qualifier. MongoDB has multi-document ACID transactions on replica sets since 4.0 and on sharded clusters since 4.2 mongodb.com ↗, while mainstream SQL engines still shard mostly through add-ons such as Citus for PostgreSQL citusdata.com ↗ or Vitess for MySQL vitess.io ↗, not in the core engine.

So be open, and dive deep into each candidate. Every database has its own feature set: Redis has Pub/Sub, DynamoDB has its own features, and Aerospike, called proprietary in class, has its own too. Aerospike does have an open-source variant, the AGPLv3 Community Edition; only its Enterprise Edition is closed-source aerospike.com ↗.

All this effort is worth it because the database is the most critical, most brittle component of your infrastructure. Know early what features it offers and what its performance numbers are, and build your intuition for using it over time.

§ 3.6

## How fast you hear about an expiry

“Redis is in memory, so it’s faster” was the answer. The lecture’s answer was about the connection, and about being told.

About 3 min · class 00:59–01:02

The last answer in class went for Redis on speed. Online/offline is time-sensitive, and Redis, being in memory with better performance, would be faster than DynamoDB, say when querying 500 million active users. The lecture pushed back: is that only because it’s in memory? “Not really”: being in memory is not the main reason, in the class’s view.

What you get for time sensitivity, the lecture said, is the persistent connections Redis lets you hold. With Redis you create persistent connections, which is what gives you the extremely low latency you need; it comes at a cost, but you get it. DynamoDB is stateless, and you cannot create persistent connections to it.

More precisely

Redis is fast mainly because it serves from RAM with a light protocol, at sub-millisecond latency over long-lived TCP connections. DynamoDB is an HTTPS request/response API with single-digit-millisecond latency; its SDKs do reuse TCP connections docs.aws.amazon.com ↗, and AWS’s own route to microseconds is DAX, an in-memory cache in front of it. The real contrast for presence is that Redis can push events on an open connection and DynamoDB can’t.

docs.aws.amazon.com ↗

That push is the feature that makes the difference here. Suppose that as soon as a user’s key expires, you want to show them offline, immediately. Redis gives you hooks that tell you a key just expired, on the fly, over a persistent connection. DynamoDB does not: it tells you through its streams, and that takes a long time to process. Knowing fancy features like these is part of knowing your database. Two details from the documentation: Redis fires its “expired” event when it actually deletes the key, on access or in a background sweep, so it can arrive well after the TTL reaches zero; and these notifications are off by default and fire-and-forget redis.io ↗. DynamoDB’s TTL deletions can take days docs.aws.amazon.com ↗.

[figure title] Hearing about an expiry: Redis vs DynamoDB

[figure description] Two lanes. Redis: the API server holds one long-lived connection to Redis; a key has a TTL timer, and when Redis actually deletes the expired key it pushes "expired: u42" back over that open connection. DynamoDB: the API server makes separate request and response calls; the expired item stays in the table until DynamoDB deletes it later, which can take days, and you hear about the deletion from the stream.

[figure labels] api · one open connection · redis · ttl · expired: u42 · pushed on the open connection, · when Redis actually deletes the key · redis · api · separate calls · dynamodb · id · expires · u42 · expired · deleted later · (can take days) · streams · you hear about it from the stream · dynamodb

[caption] Fig 3·cLeft: the API server keeps one connection open to Redis, and Redis pushes “expired” on it when it deletes the key. Right: DynamoDB answers separate calls; an expired item lingers until it is deleted, and the stream tells you later. RAM is a big part of Redis’s speed too; the difference that matters here is the push.

On Redis, turning the hook on and listening for it takes two commands:

CONFIG SET notify-keyspace-events Ex # E = key-event channel, x = expired events (off by default) SUBSCRIBE __keyevent@0__:expired # this connection now receives the name of each expired key # → message __keyevent@0__:expired presence:42

§ 3.7

## Staying portable, and where to stop

Avoid every database-specific feature and you end up writing a database. Draw a line, and write down where it is.

About 3 min · class 02:50–02:52

A question near the end of class: TTL is a feature that not every database has, so shouldn’t a design avoid features specific to one database, in case you need to move later? No. The design needed expiration, so it picked a database that gives it, and both DynamoDB and Redis do. Some features you can’t live without, ACID for instance. You would only move to a database that gives you similar features, and if it doesn’t, you can always re-implement the feature yourself, for example with a cron job that does the same thing.

So draw a line on how far you go. Don’t make everything an abstraction: drop the unrealistic concerns, focus on the realistic ones and then design the system. Otherwise you fall down a rabbit hole and eventually write your own database. Don’t do that.

If you did leave DynamoDB, you would lose DynamoDB Streams, but change-data-capture tools give you the same thing. If you are on MySQL, use Debezium to capture the changes. Either a managed service gives it to you, or you write a small service that does it. Debezium’s MySQL connector reads the MySQL binlog and publishes row-level change events to Kafka topics debezium.io ↗. And on DynamoDB, an archiver can tell expiries apart from explicit deletes: TTL deletions appear in Streams as service deletions docs.aws.amazon.com ↗.

[summary] From practice: “that only works on Dynamo” skip unless a reviewer has said this to you

One participant had proposed, for archival, a design that used TTL and then listened to the stream of deletions. A senior engineer on the team challenged it: you can only do this with DynamoDB, and it won’t work if we ever move to something else. The answer in class was the one above: off DynamoDB you would use a CDC tool such as Debezium instead of Streams, so the design moves with a known amount of work.

What you do owe your team is a record. Document the limitations of your design, and the steps you would take if you ever had to migrate. Being aware of your design’s limits is a good place to be.

Here is the whole comparison for the presence store in one place, with managed Redis split out from self-hosted Redis, since that is where most of the argument was.

Redis or DynamoDB for presence

|

| Redis (self-hosted)

| Redis (managed)

| DynamoDB

| TTL behaviour

| Deletes the key on expiry; send the TTL on every write

| Same as self-hosted

| Deletes “within a few days”; check expires_at

| Persistence

| AOF and RDB, if you configure them

| AOF and RDB, as the provider offers them

| Built in: the class’s first tick

| Who runs it

| Your engineers: availability, scaling, surges

| The cloud provider, at its own pricing

| AWS

| Lock-in

| Low: runs anywhere

| Low: a managed Redis exists on every cloud

| AWS only

| Room to grow

| Bloom filters, HyperLogLog, geo

| Same data structures

| Streams and Lambda

| Push on expiry

| Expired events on an open connection (best-effort, when the key is deleted)

| Same mechanism

| Only through Streams, later

| Typical latency

| Sub-millisecond, from RAM

| Single-digit milliseconds (DAX for microseconds)

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is “Redis is faster” a weak reason for this choice, and what is the stronger timing argument?

[summary] Show answer

Both stores already do what presence needs, and the class’s answer to “it’s in memory” was “not really”. (The note in §3.6 adds that RAM is in fact a big part of Redis’s speed, and DynamoDB answers in single-digit milliseconds, fast enough for a green dot.) The stronger argument is how fast you hear about an expiry: Redis can push an “expired” event on a connection you keep open, while DynamoDB tells you only through its streams, much later.

Give two cases where vendor lock-in is a real risk and one where it isn’t.

[summary] Show answer

A real risk: your cloud vendor enters your business, so your bill funds a competitor (Walmart avoids AWS for this reason); or you may need to move clouds because of pricing, a security incident or lost trust, and a vendor-only tool like DynamoDB means rewriting code. Not a risk: a very early startup with a $10,000 bill, or a company that is the vendor itself, or one that knows it will stay on AWS whatever happens.

A five-person startup with no ops engineer: which store, and what does it trade away?

[summary] Show answer

A managed store: DynamoDB, or a managed Redis. Lean teams go managed so they don’t carry the infrastructure and its pain points (availability, scaling, surges, observability); you throw money at the provider and it becomes your extended engineering team. With DynamoDB you trade away portability (it is AWS-only) and Redis’s push on expiry and data structures; with managed Redis you pay the provider’s pricing.

Whichever store you pick, look at how it is doing: six million writes a minute are coming.

Concepts in this section: persistence (AOF, RDB) · managed vs self-managed · vendor lock-in · future extensibility · expiry notifications · change data capture

Contents of this lecture ↑

Lecture 01, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-heartbeats ===

# Green dots and blog rows, chapter 4: Six million heartbeats a minute

Lecture 01 · Green dots and blog rows · chapter 4 of 7

§ 4

## Six million heartbeats a minute

Storage was never the problem. Writes are. Why each tiny write spends most of its time opening a connection, how a pool fixes it, how to size one, and when it breaks.

About 30 min · class 01:04–01:19, Q&A 01:19–01:34 and 02:52–03:00 · concurrency, scaling

The green-dot store from §2 is small: one short row per online user. But every online user’s app sends a heartbeat every 10 seconds, and each heartbeat has to land in that store. This chapter is about what that does to the database, and about the one line on every architecture diagram that nobody thinks about.

§ 4.1

## The other number

Storage fits on a phone. The write rate is what should scare you.

About 3 min · class 01:04–01:06

If storage is not the challenge with a billion users, what is?

Count the writes. A client sends a heartbeat every 10 seconds, so one user sends 6 heartbeats a minute. With 1 million active users (active, not total), the system receives 6 million requests a minute.

Every heartbeat results in one database call, an update of that user’s row. So a single database has to absorb about 6 million updates a minute, and with that many writes it would start to choke. How hard “choke” bites depends on the store: 6 million a minute is 100,000 writes a second. Redis’s own benchmark page shows example runs of about 180,000 SETs a second on one instance without pipelining (redis.io ↗), so one Redis node is within range; a disk-based relational database committing 100,000 durable single-row updates a second is a much harder ask.

[figure title] The write load

[figure description] Arithmetic from the class board: one heartbeat every 10 seconds is 6 a minute per user; times 1 million active users is 6 million requests a minute; each request is one database write. Below, two users send heartbeats to an api server, which writes each one to the database. Next to the database, in red: 6 million updates per minute. The board’s later note: micro reads and updates, so the bottleneck is the network.

[figure labels] 1 beat / 10 s → 6 / min / user · × 1m active users · = 6m requests / min · 1 request = 1 db write · heartbeat · api · update · db · 6m updates per minute!! · micro reads / updates · → network bottleneck · (the board’s note, 01:23)

[caption] Fig 4·aThe board's arithmetic: 6 beats a minute per user, 1 million active users, 6 million writes a minute, one write per beat. The note beside the database came about 20 minutes later, in the Q&A (§4.6). Redrawn from the class board at 01:04.

This is a classic case where storage is not the problem; computation is. The data needs are tiny, while supporting 6 million requests a minute is the challenge: the concern is the number of queries fired, each one an update on the database. (In class the dataset was put as “8 GB for 1 million entries, peanuts for a database”. The 8 GB is the figure for all 1 billion users at 8 bytes each; the 1 million active users’ rows come to about 8 MB. Either way, storage is not the problem.) That also answers the second half of the question in §2.6: of the two numbers, the writes are the one to fear.

The usual answers to a write load like this are sharding and partitioning, spreading the rows over several databases. They come in later lectures. This chapter takes a different, less talked-about tool first.

coming later · Lecture 2: sharding by hash, when one database can’t take the writes

coming later · Lecture 3: range-based sharding and partitioning

§ 4.2

## The line nobody thinks about

Each heartbeat opens a TCP connection to the database. That line costs more trips than the write itself.

About 6 min · class 01:05–01:12

Look at the line between the api server and the database on any design diagram. It gets drawn without a second thought. This section is about what it costs.

Connection pooling is an optimisation very few people talk about, and one everyone should know for a write-heavy load like this one.

Follow one heartbeat. It is an HTTP POST, and HTTP rides on a TCP connection from the user’s app to the api server. When it arrives, the api server opens a second TCP connection, to the database, to write the update.

Setting up a TCP connection takes the three-way handshake; closing it takes a two-way teardown. That is five network trips for every single call, as the lecture counts them. The real bill is a little higher: on top of TCP’s handshake (RFC 9293 ↗) comes the database’s login exchange, plus TLS if the connection is encrypted, and the teardown is a FIN/ACK exchange. A pool skips all of it on every request.

So the one line drawn on the diagram without a thought stands for an expensive process: a connection set up and torn down for each request.

Compare that with the write itself. Each heartbeat is a micro update: one row, found by its primary key, a pointed update. The database does the bare minimum, so most of the time goes into establishing the TCP connection, the biggest performance bottleneck in this design. And the setup is more than TCP: in PostgreSQL, every new connection makes the server spawn a whole new backend process before authentication runs (postgresql.org ↗).

Connecting is expensive for the database too, not only for the caller. To accept a connection it has to read the handshake packets: the first packet comes in, an acknowledgement goes out, the third packet comes in. That spends CPU to process them, network bandwidth to read them, and OS buffers. On top of the kernel’s work, the database pays for a backend process or thread, its buffers and an authentication exchange (MySQL ↗, RDS Proxy ↗).

Pause and think

Each heartbeat updates one row by primary key. Without a pool, the api server opens a fresh connection for every write. Where does most of each heartbeat's time go?

A fresh connection costs a handshake, the database’s login work and a teardown: five network trips as the lecture counts them, for a write that needs one. The database pays too: it reads the handshake packets and sets up the connection. Keep connections open and reuse them, and both the API call and the database get faster, with the same number of queries.

Here is one heartbeat’s write, trip by trip. Step through with the buttons or the arrow keys:

[figure title] One heartbeat, five trips

[figure description] Two lifelines, the api server and the database, time running down. 1: the three-way handshake, SYN, SYN-ACK and ACK. 2: the database reads the packets and spends CPU and buffers just to accept the connection, plus a login and, in PostgreSQL, a new process. 3: the actual write, one UPDATE of one row by primary key, and an OK. 4: the teardown, FIN and FIN/ACK, two more trips as the lecture counts them. 5: five trips of setup and teardown for one tiny write.

[figure labels] api · db · time · SYN · SYN-ACK · ACK · 1 · db: reads packets, · CPU, buffers · + login, a process · 2 · UPDATE pulse … · OK · 1 row, by primary key · 3 · FIN · FIN/ACK · 4 · 3 trips · 2 trips · 5 · 5 trips of setup + teardown · for 1 tiny write

- Open a connection: the three-way handshake, SYN, SYN-ACK, ACK.

- The database does work just to accept it: it reads the packets and spends CPU and buffers. In practice a login follows, and PostgreSQL starts a new process.

- The actual write: one UPDATE of one row, by primary key, and an OK. The bare minimum.

- Close the connection: FIN and FIN/ACK, two more trips.

- Five trips of setup and teardown for one tiny write. Most of the time went into the line nobody draws.

Keys: ← → to step · link to a step with #fig-4b/step-3

[caption] Fig 4·bTime runs down. Lanes are the api server and the database. The five-trip count is the lecture's; the database login (and TLS, if used) come on top.

§ 4.3

## Keep the connections open

Don't close the connection after each write. Open a few once, and reuse them.

About 6 min · class 01:08–01:12 and 01:16–01:18

The board put the problem in one line: what’s hectic? Creating a new connection every time.

Underneath, these are all TCP connections, and nobody asked them to shut down. Connection pooling means: instead of closing each connection after its query, keep a set of connections open between the server and the database and reuse them. With micro updates, so much of the time is wasted establishing and tearing down connections that this is the obvious fix.

For example, when the api server starts it creates three TCP connections to the database and keeps them handy on the side. Whenever it needs to fire any query (a SELECT, an UPDATE, an INSERT, whatever) it uses one of the three that nobody else is using right now.

[figure title] The connection pool

[figure description] Redrawn from the class board. The question above: what is hectic? Creating a new connection every time. A server, one of a fleet, keeps three pre-established connections open to the database: the connection pool. One connection is in use, drawn blue with a loop: it is reused for the next query instead of being closed.

[figure labels] what’s hectic? creating a new connection every time · server · reused · connection pool · db · pre-established connections

[caption] Fig 4·cA server (one of a fleet) keeps three pre-established connections to the database. The blue one is in use, and goes back to the pool afterwards instead of being closed. Redrawn from the class board at 01:05.

When a request comes in, the server picks one available connection from the pool and marks it unavailable. Because that connection is already established, all it does is fire the query and get the response: one request, one response. It does not set up and terminate a connection, so it saves the five network trips.

That gives two benefits. The API call becomes much faster. And the load on the database drops, even though the number of queries stays exactly the same. The database is spared the connection work, mainly CPU and network: in class the list first included memory, then was narrowed to “not really memory, but CPU and network”. With one-row micro updates, that dramatically reduces its load. Memory is part of the saving too, though: each MySQL connection gets its own thread stack and buffers, each PostgreSQL connection is a separate process, and Amazon RDS states that connections consume memory and derives its default connection limit from instance memory (RDS limits ↗, MySQL memory ↗). Put together: faster responses for users, a database freed up to run other queries, and a smaller infrastructure bill.

You rarely write this yourself. MySQL, Postgres and Redis all support connection pooling, and there are libraries that manage the pool for you.

A write takes 1 ms inside the database. How much of each heartbeat's time is the write?

[caption] Clip 4·1Now do it six million times a minute.

[summary] The clip as text 0:39

- Five writes. Top: no pool. Bottom: a pool of three.

- Five trips to open and close; one request and one reply do the work.

- Every write pays it again, and so does the database.

- With a pool, a write takes an open line, queries, and gives it back.

- Same five queries: faster calls and less load on the database.

- Now do it six million times a minute.

Two lanes, each an API server and a database, with a time bar underneath, for the same five heartbeat writes. Top, no pool: every write opens a new connection with the three-way handshake (SYN, SYN-ACK, ACK), sends one UPDATE and gets OK, then closes it with FIN and FIN/ACK. That is five trips of setup and teardown (plus the database login) around one request and one reply, so each write's time bar is mostly hollow setup segments and only two filled query segments, and the database's count of new connections climbs to 5. Bottom, a pool of three connections opened at startup: each write takes a free open line, marks it busy, sends the UPDATE, gets OK and gives the line back. Its bar is only the query segments and finishes far sooner, and the database accepts no new connections. Same five queries in both lanes: faster calls and less load on the database. At six million writes a minute, no pool means six million new connections a minute; the pool keeps reusing the same three. Bar lengths are not to scale.

Why is the gain so big here? Because each update is tiny: one row, by its ID, which is also the table’s primary key, so the database goes straight to that leaf of its B+ tree and updates it. Spending an expensive connection setup on something that small is a waste. For a big SQL query it is different: the query itself runs long enough to outweigh what the pool saves. The pool’s big win comes when the updates are micro.

Still, the class’s advice was broad. Whenever you fire a bunch of micro updates at a database, and in general, having a connection pool is always a great option. If your existing codebase has none, go and check whether adding one gives you a big gain. §4.7 sets the other half of that advice next to it: pooling blindly is not a good idea.

§ 4.4

## Where the pool lives

Not a service. A queue of connection objects inside your server.

About 2 min · class 01:15–01:16

Is the pool a separate service you deploy next to the api server?

It is tempting to think so. A common misconception today is that everything has to be a service. A connection pool is not one. It is a simple library running inside the api server, which creates the pool of connections to the database. It is not a separate process.

[figure title] The pool is a queue inside the server

[figure description] A large api server box. Inside it, a request handler and a blocking queue holding three connection objects. The handler calls take() on the queue to get a connection, waiting if the queue is empty, and put(c) to give it back. From each connection a line leaves the server to the database outside. A speech bubble on the queue: I’m a library, not a service.

[figure labels] api server · I’m a library, · not a service · handler · take() · put(c) · blocking · queue · db

[caption] Fig 4·dThe pool is a blocking queue of connection objects inside the api server's own process. A handler takes a connection, uses it, and puts it back.

The implementation is short. When the server boots, it creates several database connection objects and puts them in a blocking queue. A caller asks the queue for a connection: if one is there, it pops it; if not, it waits until someone puts one back. That waiting is the “infinite loop” part. There are a ton of pool implementations on GitHub, but the idea stays the same.

# the idea behind every pool on GitHub import queue class Pool: def __init__(self, connect, size): # at boot: open `size` connections self.idle = queue.Queue() # blocking for _ in range(size): self.idle.put(connect()) def get(self): # take one; waits while none is free return self.idle.get() def release(self, conn): self.idle.put(conn) # back in line

This is the in-process case, the one the class described. Running a pooler as its own service does exist, for a different problem; §4.7 comes back to it.

§ 4.5

## How many connections?

Three connections and a fourth request. Minimum, maximum, idle expiry, and how to size them.

About 9 min · class 01:12–01:15, Q&A 01:19–01:23 and 01:28–01:31

The pool opened three connections at boot. Three requests arrive together, each takes one. Then a fourth arrives. Now what?

When you define a connection pool, you define a minimum and a maximum number of connections. The minimum might be three to start with.

With all connections busy, the fourth request has two options. The first is to wait: as soon as one of the three running queries releases its connection, the waiting request takes it. The second, if it does not want to wait, is to establish a new TCP connection, fire the query, and add that connection to the pool. Now the pool holds four connections instead of three: it stretches on demand.

Stretching without a limit is a problem, though. With millions of requests coming in, each creating its own connection and adding it to the pool, the pool grows without bound. So you don’t do that.

You configure a maximum, for example minimum 3, maximum 100. Each server then cannot create more than 100 connections to the database. If all 100 are in use, request 101 waits for one of them to be released, then uses it. The wait has a limit in real pools: in HikariCP, a widely used Java pool, the caller waits up to connectionTimeout, 30 seconds by default, and then gets an error (HikariCP ↗).

The whole life of the pool, step by step:

[figure title] Three connections, four requests

[figure description] Five snapshots of one api server’s pool, top to bottom. 1: minimum 3; three requests each take one connection, all busy. 2: a fourth request finds none free and waits. 3: instead the pool opens a fourth connection and keeps it: three becomes four. 4: with a maximum of 100, request 101 waits for a release. 5: a connection idle for 10 minutes is closed.

[figure labels] requests · server · pool · db · r1 · r2 · r3 · min 3 · 1 · r1 · r2 · r3 · r4 · waits · all · busy · 2 · r1 · r2 · r3 · r4 · 3 → 4 · 3 · r101 · cap · … up to 100 · max 100 · 4 · idle · 10 min · 5

- min 3: three idle connections. Three requests arrive; each takes one. Three requests, three connections, all busy.

- A fourth request arrives and finds none free. Option one: wait until a query finishes and frees a connection.

- Option two: open one more and keep it. The pool stretches from three to four.

- With a cap of max 100, request 101 waits for a release, up to a timeout. Without a cap, millions of requests would each add a connection.

- A connection idle for 10 min is closed by the pool. The pool holds what the traffic needs, never more than the maximum.

Keys: ← → to step · link to a step with #fig-4e/step-3

[caption] Fig 4·eFive snapshots of one api server's pool, top to bottom. Blue lines are connections in use; the dashed one is being opened.

Why cap it at all? Every database has a limit on the number of TCP connections it can hold. The trouble creeps in when hundreds of servers each create 100 connections to it. The defaults are lower than people expect: PostgreSQL’s max_connections is typically 100, and 3 of those are reserved for superusers, so application roles get fewer (postgresql.org ↗).

So it is also the pool’s job to close connections nobody is using. You configure a TTL per connection: if a connection has not been used for, say, 10 minutes, terminate it. If one api server has created four connections and one sits unused for 10 minutes, the pool deletes it, and that server holds fewer connections on the database. HikariCP’s idleTimeout defaults to the same 10 minutes, but only retires idle connections when the minimum is set below the maximum (HikariCP ↗).

Two follow-ups came up in class. Suppose 50 of the 100 connections have expired and more requests arrive. The pool opens new connections up to its maximum: with 50 open, a 51st concurrent request establishes a new connection and adds it to the pool, with the same expiry. And does a server always hold 100? No. 100 is the most it will ever hold; the actual number depends on how many requests are coming in.

Another question was about a busy moment, say a special event, when new api servers are spun up and the database has no connections left to give. A new server that can’t get a connection waits, retrying, and succeeds only when an existing server terminates one of its connections. In practice it does not retry forever: the database refuses connections beyond its limit with an error, and the pool makes the caller wait only up to its timeout (30 s by default in HikariCP) before failing the request. Requests on that new server fail rather than hang (HikariCP ↗). §4.6 takes up what to do about it.

### Sizing the pool #

How do you pick the numbers? The minimum is typically 3 or 5, because when the pool runs out, connections can be created on the fly anyway. One widely used pool recommends the opposite: HikariCP suggests leaving its minimum unset so the pool is fixed-size, minimum equal to maximum, since creating connections on the fly is exactly the latency a pool exists to avoid (HikariCP ↗).

For the maximum, you need two numbers: the maximum connections your database supports, and the maximum number of servers you will have at any point in time. Divide the first by the second. If the database handles at most 1,000 connections and you will run at most 100 servers, each server’s maximum can be 10.

Then set it somewhat above that average, say 15 instead of 10, because one server may get more requests than the others, and if the database can’t open a connection, that server waits anyway. In the instructor’s words the maximum is “typically 1.2× the average”, a practice the instructor has seen, not a standard. Two things to check in that rule. The example, 10 to 15, is 1.5×, not 1.2×. And going above the fair share has a side effect: if every one of 100 servers may open 12, that is 1,200 against the database’s 1,000, so in a busy moment the database refuses the extra connections with an error; the server does not simply wait (postgresql.org ↗).

None of these numbers is final. Have the right telemetry on the pool: how it performs, how many connections it holds at any moment, how many servers are running. Give a production system one week and you will have the numbers to tune it better.

The rule for this whole chapter

Start with a conservative mindset, observe the metrics, then retune.

The class said both halves of this, three hours apart. At 01:17: “having a connection pool is always a great option.” At 02:56: “blindly using connection pooling is not a good idea.” Both hold. Use a pool, start small, and let the metrics tell you how far to grow it.

[figure title] Start conservative

[figure description] A server with a small pool of three connections to the database and a gauge on the server with its needle low: start small, watch the metrics, then retune.

[figure labels] server · db · start small, · observe, · retune

The three settings side by side, with what goes wrong at either end:

Pool settings: what each controls, what goes wrong when it is too low or too high, and the class's starting point

|

| Minimum

| Maximum

| Idle TTL

| What it controls

| How many connections the pool opens to start with

| The most connections one server may hold to the database

| How long an unused connection stays open before the pool closes it

| Too low

| Connections get opened on demand, paying the setup the pool exists to avoid

| Requests queue for a free connection, up to the pool’s timeout

| Connections close and reopen too often; long-running queries need them open longer

| Too high

| Every server holds many connections even when idle, and servers × minimum can use up the database (4.7)

| Servers × maximum > database limit: refused connections

| Many unused connections stay open, and one server can hog the database’s slots (4.7)

| The class’s starting point

| 3 or 5

| Database maximum ÷ the most servers you’ll run, a little above: 1,000 ÷ 100 = 10, set to 15

| 10 minutes in the example; find the sweet spot for your query times

§ 4.6

## The database's ceiling

Autoscaling adds api servers; the database has a fixed number of connections to give them.

About 8 min · Q&A 01:19–01:27, 01:31–01:34 and 02:52–03:00

A special event: traffic jumps, autoscaling adds api servers, and every new server wants connections the database doesn’t have. What then?

Then you scale the database up so it can hold more connections. The size of the database depends on the number of concurrent queries you fire at it, because the concurrency you want to support decides how many concurrent connections the database must handle. In the lecture’s experience, the most common bottleneck of a database in most cases is the maximum number of connections it can handle, so you need to know that number. To support more concurrency than that limit, there are two common ways: scale the database vertically, or shard it.

coming later · Lecture 2: scaling the database: a bigger machine, read replicas, sharding

A good question was asked here: in a system like this, is it the number of connections, rather than the data, that decides how to scale the database? Yes, because the updates are very small and the access is key-value. You go to one place and update one row. Nobody fires massive analytics queries; the reads are just as simple (“given a user, give me the row”). With micro reads and micro writes, both are fast, and the bottleneck becomes the network, specifically establishing TCP connections. That is why this chapter stresses connections so much. The board’s note under the database in Fig 4·a says it: micro reads / updates → network bottleneck.

The other kind of workload flips that. If your queries are massive aggregations joining 10 or 15 tables, so that running a query takes longer than opening a connection, don’t stress over connections. Focus on the CPU and memory side of the database instead.

### How many connections can it hold? #

A database is a process running on a server, and the maximum number of TCP connections a server can handle depends on the RAM it has and on the network card of the instance. For managed databases, memory is the input you can see: Amazon RDS computes the default max_connections from instance memory, about one connection per 12 MB for MySQL (roughly 630 on an 8 GiB instance) and, for PostgreSQL, memory in bytes ÷ 9,531,392, capped at 5,000 (RDS limits ↗).

On a managed service such as AWS RDS, you don’t have to guess: the provider gives you a formula to run, shows the limit in its UI, and documents how many concurrent connections each database size handles. If you run the database yourself, benchmark it. Pick a machine with high network capacity and measure how many concurrent connections it holds. The answer also depends on the load you put on it (a very high sustained load may not be met), so it is always better to benchmark and see.

In most cases, as taught, you would need an instance with a dedicated network card, maybe several; every cloud provider has a special class of high-network-bandwidth instances for supporting large numbers of TCP connections. Those instance classes raise bandwidth rather than the connection count as such (a c5n.large gets up to 25 Gbps against a c5.large’s 10) (EC2 instance types ↗). The connection count is bounded by the database’s memory and by EC2’s per-instance connection-tracking allowance, which grows with instance size; past it, packets are dropped (connection tracking ↗). A small-query database rarely needs a special network class just to hold many connections.

[summary] Go explore: 30,000 connections a homework question from class

A question came up near the end of class: a database server has a fixed number of cores, so how does one server hold more than 30,000 connections? It was left as a search on purpose, because you will stumble on something interesting: Hussein Nasser has a video on it, there are Stack Overflow answers, and there is a hardware specification behind it. If it is still unclear by week three, when it becomes more relevant, the instructor will answer it.

One data point to start from: Redis’s benchmark documentation reports runs with more than 60,000 client connections while still sustaining 50,000 queries a second, and as a rule of thumb, 30,000 connections give about half the throughput of 100 (redis.io ↗).

### Spikes #

Take a festival where the number of online users doubles, and updates arrive faster than the database can apply them. The answer suggested in class was to scale the systems up vertically, and the instructor agreed: “Always.” Doing that just for one festival can feel wasteful, but you scale up and then bring it back down. There is no way out: the database must support the concurrent requests you are aiming for. For 2×, first make sure the database supports it, then tune the pool, mainly its maximum (perhaps not its minimum), since vertically scaled servers can take more requests too.

A much better answer to spikes comes later in the course, with flash sales. coming later · week 7: flash sales, the better answer to spikes

For now: know your tech unit economics, which matters a lot in the real world, and have the right monitoring to make these decisions.

One more question: if the database is scaled from one to two, do the connection pools multiply too? It depends on how you scale it. The recommendation was hands-on: today, write a hello world with connection pooling against a local database and run it. You’ll see the configuration it offers and its limits, and be in a much better position to answer this yourself. Horizontal scaling of databases comes next.

coming later · Lectures 2 and 3: scaling a database horizontally, and what happens to the pools

§ 4.7

## When pooling hurts

Servers × pool size has to fit inside the database. Get it wrong and autoscaling fails exactly when you need it.

About 5 min · Q&A 02:54–02:59

Are there cases where connection pooling does harm? This was asked near the end of class, after a lot of praise for pools.

Pause and think

Your database accepts at most 1,000 connections. Each api server's pool keeps a minimum of 100 open. You run 10 servers. A spike hits and autoscaling adds 20 more. What happens?

The pool’s minimum times the server count can’t exceed the database’s limit, so a misconfigured pool caps how many servers you can run, and new servers fail exactly when you need them. Size the maximum per server as the database’s limit ÷ the most servers you’ll run (1,000 ÷ 100 = 10), keep the minimum small, and watch the pool’s metrics. Pooling is “always a great option”, but not blindly.

Here is the hypothetical the class worked through. The database supports at most 1,000 connections, and each server’s pool keeps a minimum of 100. One server: fine. More traffic, add a server; more traffic, another: three servers, ten servers, still fine. Then a massive spike makes you add 20 more at once, and the database’s maximum connections are exhausted.

[figure title] The pool budget

[figure description] Two panels over the same database, which accepts at most 1,000 connections. a, fits: 100 servers, drawn as 10 boxes of 10, each with a pool maximum of 10: 1,000 divided by 100 servers is 10 each. b, the spike: each server’s pool keeps a minimum of 100 connections, so 10 servers already hold all 1,000; autoscaling adds 20 more servers, and their connections are refused at the database, marked with a red cross: the new servers get nothing.

[figure labels] 1,000 ÷ 100 servers = 10 each · each box: 10 servers, max 10 each · db · max 1,000 connections · a · fits · 10 servers · min 100 · +20 servers · new · 10 × 100 = 1,000 · db · max 1,000 connections · new servers get nothing · b · the spike

[caption] Fig 4·fThe same database, two pool settings. Left: a maximum of 10 per server fits 100 servers into 1,000 connections. Right: a minimum of 100 per server fills the database with 10 servers, and the 20 added in a spike get nothing.

So by not configuring your pool properly, you limit the number of api servers you can have. The most servers you can run is a function of the pool’s minimum connections per server and the database’s maximum connections, and that is what to worry about. This is why blindly using connection pooling is not a good idea. (Fig 4·f is §4.5’s budget seen from the other side, and §4.5’s 1,000 ÷ 100 = 10 is the fix.) There is also a structural fix that goes beyond the class: put a central pooler such as PgBouncer or Amazon RDS Proxy between the app servers and the database. It multiplexes many servers onto a few database connections, and RDS Proxy queues or throttles client connections it can’t serve immediately, protecting the database during surges (RDS Proxy ↗, pgbouncer.org ↗). That pooler is a separate service, which is where §4.4’s “not a service” stops applying.

It goes wrong the other way too. If the pool may grow to as many connections as it wants, you can’t have many servers, because each one puts that much pressure on the database. And if the connection expiry is very long, say 10 minutes, existing connections don’t break when you need them to: you add servers to handle the load, the load balancer sends users to a new server, but some other server is hogging the database connections. The new server gets none, and its users have an outage.

The grass is not always green. Know how to tune a pool, where to tune it, and where it can break. Think in several directions at once, document everything, and go step by step through what could go wrong. Then find a near-optimal solution and move on. (The closing advice repeats §4.5: start conservative, with a minimum of three to five connections, growing to a set limit, perhaps below 50 or 100.)

The connection TTL, the idle time after which the pool removes a connection, should be neither too short nor too long. Too long, and many unused connections stay open. Too short does not work if your queries take a long time, because those need connections open longer. The sweet spot depends on the use case.

That leads to the one metric to track: the average time your database takes to complete a SQL query. In the lecture’s view it is the most important factor for tuning a connection pool. It matters because the connections you need are roughly throughput × average query time. Track how long requests wait for a connection, and how saturated the pool is, alongside it; HikariCP’s sizing guide also ties the best pool size to the database’s cores and disks (HikariCP wiki ↗).

A follow-up was raised: if the average time of one frequent query on a table goes up, should that database’s pool be expanded? The suggestion was to expand it; the recording leaves unclear whether the instructor agreed.

More precisely

If a query’s time rises, find out why first. A bigger pool helps only when the database has spare capacity and requests are queuing for connections; past the optimum, more connections lower throughput and response times climb. HikariCP’s sizing guide starts from connections = cores × 2 + effective spindles.

HikariCP wiki ↗

§ 4.8

## Only four things

Memory, CPU, disk and network. Every scaling decision is about one of them.

About 2 min · Q&A 01:24 and 01:27–01:28

Are concurrent connections and the size of the data the two parameters that decide whether to scale a database vertically or horizontally? That was a reasonable summary offered in class, and the answer broadened it rather than rejecting it.

There are only four things in computer science: memory, CPU, disk and network. There is no fifth; a GPU counts under CPU. These four determine scaling.

- CPU-bound: massive aggregations on your data.

- Memory-bound: pulling in a lot of data to process, such as massive joins.

- Disk-bound: storing so much data on disk that disk becomes the bottleneck. Data warehouses fall in this category.

- Network-bound: the number of queries you can fire at a server, here the database, is limited by that machine’s network capacity. The heartbeat store is this case (§4.6).

[figure title] Four resources, two workloads

[figure description] Four equal bars: memory, CPU, disk and network, the only four things that decide scaling. Tags pinned below: heartbeat writes connect to network; a 12-table report connects to CPU and memory; a data warehouse, in grey, connects to disk.

[figure labels] memory · cpu · disk · network · 12-table report · data warehouse · heartbeat writes

[caption] Fig 4·gOnly four things decide scaling. The heartbeat store is network-bound; a big report is CPU- and memory-bound; a data warehouse is disk-bound.

Scaling, horizontal or vertical, is defined on these four parameters. Vertical scaling has a limit, so if you are building a good distributed system, make it horizontally scalable, which is where sharding comes up.

§ 4.9

## The same pattern: failure detection

Copy the green dot, paste it into a cluster: heartbeats tell you which machines are dead.

About 2 min · class 01:17–01:19

The board’s heading for this part: Similar systems: failure detection in a distributed system.

Everything built for the online/offline indicator can be copied almost as-is to build failure detection. In the indicator, users send heartbeats. In a distributed system, every node sends heartbeats to a central server that keeps track of which nodes are alive, and a node whose heartbeats stop arriving is down. Say you are building your own AWS out of a bunch of EC2 machines: you need to know when a machine is down, and the missing heartbeat tells you. There are some protocol differences here and there, but the design is the same.

Or say you are building your own load balancer. You need to know when a backend machine is down so you stop forwarding requests to it, and the same system detects that. Real load balancers usually run this check in the other direction: an AWS Application Load Balancer health-checks each target every 30 seconds by default and takes it out of service after 2 consecutive failures (5 successes bring it back) (AWS ALB ↗). The load balancer asks rather than waits to be told, because it can open connections to its backends.

[figure title] Heartbeats, reused

[figure description] Two panels. a, failure detection: four nodes each send heartbeat pulses to a central tracker, which shows a green dot for each live node; the third node’s pulses have stopped, it is outlined red, and the tracker shows its dot as a hollow offline ring. b, a load balancer: the load balancer sends health checks out to three backends; one backend fails, marked with a red cross, and the load balancer stops sending requests to it. Same idea, but the load balancer asks.

[figure labels] tracker · node · node · node · node · no beats · heartbeats · a · failure detection · lb · backend · backend · backend · health check · not routed · same idea, the lb asks · b · a load balancer

[caption] Fig 4·hThe indicator's pattern, reused. Left: nodes send heartbeats to a tracker, and a node that goes quiet is marked down. Right: a load balancer health-checks its backends and stops routing to one that fails.

That is the reason to learn designs this way: observe the pattern and the core properties a system needs, rather than memorising a question and its answer, and build your intuition for systems from those.

coming later · Lecture 5: heartbeats as a load balancer’s health checks

coming later · Lecture 8: heartbeats in an unread-badge service

Build 1 ends here: a green dot driven by heartbeats, a store that expires silence by itself, and a pool sized to fit the database. Same habits, an ordinary app: a blog.

### Check yourself #

Answer in your head, or out loud, before opening each one.

A heartbeat write takes well under a millisecond inside the database. Without a pool, where does the rest of its time go?

[summary] Show answer

Into the connection. Each write opens a fresh TCP connection (a three-way handshake), and the database reads those packets, logs the caller in and sets up a process or buffers for it; afterwards the connection is torn down again. That is five network trips as the lecture counts them, around one tiny update of one row by primary key. A pool keeps the connections open, so each write is just one request and one response.

The database allows 1,000 connections and you run at most 100 servers. What maximum per server, and why might 15 be risky?

[summary] Show answer

1,000 ÷ 100 = 10 per server. Setting it a little higher (15, or the “1.2×” practice) lets a busy server take more than its share, but if every server may go above 10, all of them together can ask for more than 1,000. Then the database refuses the extra connections with an error, rather than the server simply waiting.

Name the resource that limits the heartbeat store and the one that limits a 12-table report.

[summary] Show answer

The heartbeat store is network-bound: micro reads and writes are fast, so opening connections and the network’s capacity are the bottleneck. A report joining 10 to 15 tables is CPU- and memory-bound: the query itself takes longer than any connection setup, so focus on the database’s CPU and memory instead.

Concepts in this section: compute, not storage · five network trips · connection pool · blocking queue · pool min / max / idle TTL · max connections · pool budget · four resources · failure detection

Contents of this lecture ↑

Lecture 01, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-blog-rows ===

# Green dots and blog rows, chapter 5: Blog rows: database decisions

Lecture 01 · Green dots and blog rows · chapter 5 of 7

§ 5

## Blog rows: database decisions

A Medium-like blog has two plain tables. Every column hides a decision: whether delete means delete, where long text lives, and how to store a date.

About 35 min · class 01:40–02:11, Q&A 02:20–02:46 · database

The green dot is built. The second build is an ordinary app: a blog where one user writes many posts and many users write. Its schema fits on a napkin. Then a writer deletes a post by mistake and asks for it back, and the napkin starts to matter.

This chapter goes through that schema one column at a time. None of the columns is exotic. Each one hides a decision you make whether you notice it or not.

§ 5.1

## Six components, and the blog schema

Six topics shape most designs. Today takes two of them to a two-table blog.

About 3 min · class 01:40–01:42, and 02:20

Before the blog, the board lists the foundation topics in system design. There are six components to think about when designing most (not all) systems: database, caching, scaling, delegation, concurrency and communication. Any decision you make touches one of them; as the board puts it, any and every decision affects one of these six factors. Every system in the course shows all six as key design decisions, and the online/offline indicator already did.

[figure title] Six foundation topics

[figure description] Six cards: database, scaling, concurrency, caching, delegation, communication. Database and caching are drawn solid: they are covered in this lecture. The other four are dashed and marked Lecture 2. Any design decision touches one of these six.

[figure labels] database · today · scaling · Lecture 2 · concurrency · Lecture 2 · caching · today · delegation · Lecture 2 · communication · Lecture 2 · any decision touches one of these six

[caption] Fig 5·aSix foundation topics. Database and caching are this lecture’s; the dashed four come in the next lecture, on the same blog. Drawn from the class board’s text page at 01:39.

Today covers two of them, the database (this chapter) and caching (the next). The other four, concurrency, communication, scaling and delegation, come in the next session with the same example. coming later · Lecture 2: scaling, delegation, concurrency and communication on Medium

The example is a simple multi-user blogging application like Medium: one user can post many blogs, and there are many users. No fancy recommendation engine; the board says the point is to look at the key design decisions.

It needs two tables. users has an auto-increment id, the name that gets rendered on the page, and a bio, a small piece of text of around 140 characters. blogs has an id, the author_id of whoever wrote it, the title, the body, published_at for when it was published, and is_deleted.

[figure title] The blog schema

[figure description] Two tables. users has id, name and bio. blogs has id, author_id, title, body, published_at and is_deleted; author_id points to users.id. is_deleted is ringed and labelled soft delete: when a user deletes a blog, the app runs an UPDATE, not a DELETE.

[figure labels] users · id · name · bio · blogs · id · author_id · title · body · published_at · is_deleted · ~140 chars · soft delete · who wrote it · delete blog → UPDATE, not DELETE

[caption] Fig 5·bThe blog schema. author_id points back to users.id. The ringed column is the subject of the next three sections. Redrawn from the class board at 01:41.

The rest of this chapter takes the columns that look boring: is_deleted (5.2–5.5), bio against body (5.6), and published_at (5.7–5.9).

§ 5.2

## Delete, or mark deleted?

The database gives you DELETE. Many tables never use it. Three reasons why.

About 6 min · class 01:41–01:48

Why would anyone add an is_deleted column when the database already gives you a DELETE query?

That column is a soft delete. When the user deletes a blog, you don’t remove the row; you mark is_deleted as true. Many tables have such a column, probably including some in your own organisation, and the lecture calls soft deletes extremely important, including for the database’s performance (that reason comes in 5.3).

A hard delete is what you get when you fire a DELETE query on the database. The data is gone, and you cannot recover it again.

Pause and think

A writer deletes a blog post. Your schema has an is_deleted column. Is there a good reason to set it to true instead of running DELETE?

Recoverability (a trash folder, like Google Drive’s 30 days), archival (content people worked on is valuable; a job can move it to blob storage later, within what privacy law allows) and audit (a harasser deleting a comment shouldn’t delete the evidence). Ask those three questions of every table. When none applies, or a unique email must be freed for a re-signup (§5.4), hard delete.

Reason 1: recoverability. If you want to let a user recover something they deleted, a blog for instance, you need a soft delete. Google Drive works this way: delete a file and it goes into the trash, stays there for 30 days, and you can recover it from the trash at any point in that time.

Reason 2: archival. Content a user put effort into is rich data. It can, for example, train machine-learning models (“build another ChatGPT”, as the class put it). If the user marks it deleted and you hard delete it, that rich data is gone. Where users have a legal right to erasure, keeping deleted content for a new purpose like model training needs its own legal basis or proper anonymisation gdpr-info.eu ↗. The mechanics are simple: when the user deletes, soft delete the row, then run a job that pulls out the soft-deleted rows and puts them into S3 or another blob storage, for machine-learning training and other uses.

Reason 3: audit. Deleted data may be needed later as evidence. As a consumer platform you have to provide such information to the authorities. Police and government don’t want evidence of harassment to disappear, which is why soft deletes matter here.

[summary] From the instructor: the police station skip unless you like war stories

At a startup the instructor worked at, one user harassed another online with a filthy comment. The victim filed a police complaint, and the police asked the platform for all the details of the user. As soon as the harasser learned of the complaint, they deleted the comment. With a hard delete, the evidence would have been gone. The instructor went to the police station himself, gave justifications and handed over printed copies of all the traces, “not even exaggerating a bit”: something no engineer expects to do.

So when you design a table, ask three questions of its entries. Would they need recoverability? Archival? Audit? If yes, soft delete. Otherwise, hard delete.

The rule for this whole chapter

Ask of every table: does it need recoverability, archival or audit? If yes, soft delete.

The board’s line for the blog: when the user invokes delete blog, instead of DELETE we UPDATE. If none of the three applies, a hard delete is fine.

[figure title] Three questions per table

[figure description] A blog row with is_deleted = 1 next to a trash can, and three questions to ask of every table: recover? archive? audit?

[figure labels] 7 · my first post · is_deleted = 1 · recover? · archive? · audit?

The habit behind the rule: design from a holistic view, not from the narrow vision of just building things. A column like is_deleted exists because someone thought about the police, the trash folder and the data team before writing the schema.

In general, tables that store user-generated information soft delete. You will see the practice almost everywhere such content lives.

§ 5.3

## The B+ tree argument

The board adds a fourth reason: soft deletes are easy on the engine. What the class argued, and what engines actually do.

About 4 min · class 01:46–01:48, Q&A 02:06–02:08

The board adds one more line under the three reasons: easy on the database engine (no tree re-balancing).

The argument: most storage engines store data as a B+ tree. When you hard delete a row, its entry is removed from a B+ tree node, the tree becomes imbalanced, and the engine has to rebalance it, spending CPU cycles on rebalancing instead of on requests.

More precisely

Engines defer the physical work of a delete: InnoDB removes the row and its index records later, in purge, and in PostgreSQL a DELETE “does not immediately remove the old version” of a row; VACUUM reclaims it dev.mysql.com ↗ postgresql.org ↗. InnoDB merges an index page with a neighbour only when its fill drops below MERGE_THRESHOLD, 50% by default. So a hard delete does not trigger a rebalance each time. Choose soft delete for recovery, archival and audit, not as a B+ tree optimisation.

dev.mysql.com ↗

With a soft delete, the entry is only updated: a column changes and the entry still exists, so the node doesn’t need rebalancing and the database carries less load. It is still a write, though. In InnoDB an update to an indexed column is a delete-mark plus an insert in that index, and PostgreSQL writes a new version of the row, so the saving over a hard delete is smaller than “no rebalancing” suggests postgresql.org ↗.

[figure title] Hard delete vs soft delete in a B+ tree

[figure description] Three copies of one B+ tree: a root, two internal nodes and four leaves holding keys 10 15, 20 30, 40 50, 60 70. Hard delete, as taught: key 30 is struck out, the leaf merges with its neighbour and the parent is updated, a rebalance that costs CPU. Soft delete, as taught: key 30 stays, its row is tagged is_deleted=1, no rebalance. What engines actually do: the deleted key is only marked, purge or VACUUM removes it later, and a leaf merges only when its fill drops below 50 percent.

[figure labels] 40 · 20 · 60 · 10 · 15 · 20 · 30 · 40 · 50 · 60 · 70 · merge · update · rebalance → CPU · hard delete, as taught · 40 · 20 · 60 · 10 · 15 · 20 · 30 · 40 · 50 · 60 · 70 · is_deleted=1 · no rebalance · soft delete, as taught · 40 · 20 · 60 · 10 · 15 · 20 · 30 · 40 · 50 · 60 · 70 · purge / VACUUM removes it later · a page merges only below 50% · what engines do

[caption] Fig 5·cHard delete vs soft delete in the tree. The first two panels are the argument as taught. More precisely (the note above): engines defer deletes and merge pages by fill, not per delete.

Whichever way your engine goes, the lesson that survives is the one the class drew: know your database’s internals, how it structures data, to judge whether a soft delete helps and to design accordingly.

An objection came up in class. The rebalancing benefit seems to hold only if rows stay soft-deleted forever; when they are eventually hard deleted (Google Drive after 30 days), the database has to rebalance anyway. The answer given: hard deleting each row on its own can, in the worst case, trigger a rebalance per delete, while soft-deleted rows can be accumulated and hard deleted in one batch, so the tree is rebalanced once or a few times. Clubbing the deletes clubs the rebalancing: once or a few times instead of on every pointed delete. Batch it, delete 100 rows at a time and commit, and you get one rebalance per 100 rows, a factor of 100 fewer.

Batching does pay, for a slightly different reason. Since page merges depend on how full a page is, not on how many DELETE statements you group, what batching mainly saves is transaction, locking and log overhead per row. MySQL’s own advice for big purges is a DELETE … LIMIT row_count repeated until fewer rows are affected, so that no single delete runs too long dev.mysql.com ↗. The next section uses exactly that.

§ 5.4

## The soft-delete lifecycle

Soft-deleted rows pile up. Archive them, hard delete them later, and spread the deletes out.

About 6 min · Q&A 02:22–02:46

Soft-deleted rows pile up. Now what?

Marking many records as soft-deleted grows the database, so soft-deleted rows are hard deleted periodically. For example, once a day, pick up all the soft deletes and hard delete them. Or, instead of deleting them, move them somewhere else; that is archival. When a soft-deleted item can move on to a hard delete is very subjective: a 30-day trash, a day, or a legal deadline (5.5).

Soft delete and archival are not the same thing. A soft delete is what gives you time to archive: after a day, say, collect all the soft-deleted rows, put them elsewhere, then hard delete them. With a hard delete there is no time to archive. Imagine hard deleting and immediately copying each row to S3: how slow would that be?

[figure title] The life of a deleted blog

[figure description] A timeline of one deleted blog. 1: the user clicks delete. 2: the row gets is_deleted = 1, recoverable for N days. 3: a background job copies soft-deleted rows to S3, the archive. 4: the hard delete runs as many small DELETE … LIMIT 1000 statements spread out, off-peak. Side branch: a unique index on email blocks a new signup with the same email while the soft-deleted row exists; use a partial unique index or hard delete that row.

[figure labels] 1 · user clicks · delete · 2 · is_deleted = 1 · recoverable for N days · 3 · s3 · archive · background job · 4 · DELETE … LIMIT 1000 · hard delete, staggered, off-peak · UNIQUE(email) · new signup, same email · the soft-deleted row blocks it → partial index or hard delete

[caption] Fig 5·dThe life of a deleted blog: marked, recoverable for a while, archived by a background job, then hard deleted in small batches. The side branch is the one case where a soft delete gets in the way.

Hard deleting under traffic. Say a job must hard delete 100,000 soft-deleted rows while traffic is high. You cannot delete all 100,000 in one shot. Split the work across the day, like garbage collection: 10,000 rows every hour, or about 1,000 rows at a time, at a steady pace. That keeps the impact on the main service small.

100,000 soft-deleted rows, peak traffic. One DELETE, or many small ones?

[caption] Clip 5·1Stagger the hard delete, whether a cron job or the database runs it.

[summary] The clip as text 0:37

- 100,000 soft-deleted rows to hard delete, at peak traffic.

- All in one shot: one DELETE holds its locks for as long as it runs.

- Requests queue behind it, and the ones that wait too long give up.

- Stagger it instead: 10,000 an hour, like garbage collection.

- Each batch locks only briefly, so requests barely wait.

- Same rows gone. The price: the job holds a pool connection or two.

- Stagger the hard delete, whether a cron job or the database runs it.

Two lanes hard delete the same 100,000 soft-deleted rows from a blogs table while user requests keep arriving. In the first lane a cron job deletes them all in one shot: the DELETE holds its locks for as long as it runs, so requests queue up at the table, and the ones that wait too long give up, seven of them. In the second lane the job deletes 10,000 rows an hour: each batch holds its locks only briefly, requests pause for a moment and pass, and none give up. Both lanes end with all 100,000 rows gone. The price of the staggered job is that it holds one or two connections from the pool. Stagger the hard delete, whether a cron job or the database runs it.

[summary] From practice: the interview question skip unless you interview

An interviewer once pushed a candidate: you run a background job that hard deletes the soft-marked entries, but the service must be highly available, so how do you handle the downtime while it deletes? The answer from class: a cron job has nothing to do with availability. There is no reason the main service should go down because of a delete; stagger the deletes at a linear pace.

The interviewer’s worry was about locking the table entries while deleting. That, in the lecture’s view, is about strong consistency, not availability: you lock and delete, rather than deleting directly, so that nobody reads an entry that is already deleted. coming later · Lecture 3: strong consistency, in the databases session

The hourly job isn’t free either. Asked in class: it takes one or two connections from the connection pool (§4.3), while not deleting lets the data grow. You gain some, you lose some; you never win it all.

What about a retention policy set in the database itself, instead of a cron job? Someone still has to do the deleting: a database thread does it. The database is running the cron job for you; you have offloaded it. The timing is the database’s, too: MongoDB’s TTL indexes, for example, are enforced by a background task that runs every 60 seconds, and under load a pass can take longer, so expired documents can outlive their expiry by a minute or more mongodb.com ↗.

For deletes at regular intervals, the lecture’s answer is the one that always works for database performance: offload it to the database, and do it in a staggered way. It is the same instinct as the TTL in §2.8.

One case where soft delete gets in the way. Suppose users.email has a uniqueness index. A user deletes their account and later wants a new one with the same email. The soft-deleted row still holds that email, so the index blocks the signup. In this use case, the row has to be hard deleted. Another way out is a partial unique index, which enforces uniqueness only for rows that are not deleted, so a soft-deleted row no longer blocks re-registration postgresql.org ↗.

-- PostgreSQL: unique email, -- live rows only CREATE UNIQUE INDEX users_email_live ON users(email) WHERE NOT is_deleted; -- MySQL: hard delete in batches; -- repeat until < 1000 rows go DELETE FROM blogs WHERE is_deleted = 1 LIMIT 1000;

§ 5.5

## The right to be forgotten

When a user asks for everything to go, the law sets a deadline. The lecture’s view of what really gets deleted, and what the rules say.

About 4 min · Q&A 02:22–02:26

A Facebook user files a ticket: delete everything you have on me.

Under GDPR’s right to be forgotten, the lecture says, Facebook then has to hard delete everything that user ever created, within one month. The right is not absolute: GDPR lets an organisation keep data it needs for a legal obligation, for legal claims, for freedom of expression, for public-interest archiving or research, and a few other grounds gdpr-info.eu ↗.

It doesn’t have to be immediate. What if that user had harassed someone? The one-to-two-month window gives the company breathing space to cover cases like that.

More precisely

GDPR gives one month to act on an erasure request, extendable by two further months for complex or numerous requests; the person must be told within the first month. Keeping data for a case like harassment rests on a specific exception (legal claims, Art. 17(3)), not on the deadline gdpr-info.eu ↗.

gdpr-info.eu ↗

In the lecture’s telling, PII is deleted immediately, but logs have everything, so there are hacks to recover data.

More precisely

Live personal data can be erased at once. Copies in logs and backups must be put “beyond use” (not restored or used) and overwritten on their normal schedule, not kept so the data can be recovered gdpr-info.eu ↗.

ico.org.uk ↗

The example the class used: Atlassian had a mega outage in which data was deleted, and it took them 14 days to recover it. If they could recover it, the argument goes, no company hard deletes all the data ever created; they hard delete, for compliance, from specific tracked places, while logs and snapshots still hold everything. The outage was real, but it was not an erasure request: in April 2022 a deletion script was given the wrong IDs and deleted 883 sites for 775 customers, which Atlassian restored from its backups over up to 14 days atlassian.com ↗. Restoring accidental deletions is what backups are for.

[figure title] Where an erased user's data still lives

[figure description] Four stores holding an erased user's data. The live database: erased now. Logs, daily snapshots and backups: put beyond use, and they age out on their normal schedule. Under all four: one month to act on the request, plus two more if it is complex.

[figure labels] live db · logs · snapshots · daily · backups · erased now · beyond use, ages out on schedule · 1 month to act (+2 if complex)

[caption] Fig 5·eWhere an erased user’s data still lives. As taught, nobody rewrites old snapshots; under the rules, those copies must stay beyond use and age out on schedule.

Snapshots make the same point. If you take daily snapshots of your database and a user exercises the right to be forgotten, will you go back and update all your historical snapshots? No one does. The data is still there in the old snapshots, but the transactional system holds no trace of it. Regulator guidance accepts this, with conditions: backup data that can’t be overwritten at once must be put beyond use, not restored or used for anything else, and overwritten on the normal schedule, and the person must be told what happens to their data in backups ico.org.uk ↗.

The lecture called all of this “compliance hacks”, with the legal team helping you navigate the compliance part to maximise what you can. The legitimate ones, backups kept beyond use and data held under an Art. 17(3) exception, are recognised parts of the rules, written into regulator guidance, not loopholes.

[summary] From the instructor: making an org GDPR compliant skip unless you’ll build it

The instructor built GDPR compliance himself: it took him two months to make the entire organisation compliant, implementing the infrastructure-level pieces. That, he said, is why he knows these details.

What GDPR is, in one line from the class: the compliance regulation that lets a user exercise the right to be forgotten. You can ask Instagram to delete everything about you, as if you had never existed on it, and it then has to hard delete all your data. GDPR enforces that on every single organisation.

More precisely

GDPR applies to organisations established in the EU, and to others that offer goods or services to, or monitor, people in the EU. Within that scope, users can demand erasure on specified grounds, subject to exceptions gdpr-info.eu ↗.

gdpr-info.eu ↗

So much for whether a row stays. The next question is what goes inside it.

§ 5.6

## bio vs body: where long text lives

A 140-character bio and a blog body of thousands of words sit in the same schema. They should not sit in the row the same way.

About 5 min · class 01:48–01:52

The schema has a bio of about 140 characters and a body that can run to thousands of words. Both are text. Should they be stored the same way?

No. bio uses a short text type and body a long text type, and the database handles the difference in storage internally.

To see why, look at how a row is stored. In a row-based database, all the data of a row stays together, and the lecture describes these as fixed-width rows: every row has a fixed length, so the database knows exactly at which byte each column starts. It is easiest to picture in a relational database, but the lecture says the same holds for non-relational ones, and it links back to the 8-byte pulse row of §2.6, two 4-byte fields side by side.

More precisely

Row stores do keep a row’s columns together. Fixed-length columns sit at known offsets, but variable-length columns such as VARCHAR are located through length fields in the record header, so rows are generally variable length dev.mysql.com ↗. The lecture’s real point, that a row’s size is bounded so long values go off-page, still holds.

dev.mysql.com ↗

That is exactly like a C struct, where you know the byte offset of each field. The analogy holds for fixed-length columns (INT, CHAR, DATETIME); variable-length ones break the fixed offsets, as the note above says.

A short text column (VARCHAR) stays inline, with the other columns of the row. A long text column (LONGTEXT) is stored by the database in a separate location on disk (still disk, not a network call), and the row keeps only a reference to it. The database does this for you.

[figure title] Long text vs short text

[figure description] Two rows of five cells. Long text: the middle cell holds only a reference; a line drops from it to a lined page stored elsewhere on disk. Type LONGTEXT. Short text: the middle cell holds the text itself, stored with the other columns. Type VARCHAR.

[figure labels] → ref · large text, · elsewhere · stored as a · reference · LONGTEXT · long text: body · stored along with · the other columns · VARCHAR · short text: bio

[caption] Fig 5·fLong text vs short text, as taught. InnoDB moves long values off-page only when the row doesn’t fit; PostgreSQL does it for any wide value (TOAST). Redrawn from the class board at 01:49.

How engines decide varies. In InnoDB’s default DYNAMIC row format, long VARCHAR, TEXT and BLOB values move fully off-page behind a 20-byte pointer only when the row is too long for the page, and TEXT/BLOB values of 40 bytes or less always stay inline dev.mysql.com ↗. PostgreSQL has no short/long split at all: its TOAST mechanism compresses or moves any wide value out of line once the row passes about 2 kB, and fetches it only if the query selects that column postgresql.org ↗.

The cost, as the lecture counts it: reading a long text column takes two disk calls, one for the row and one for the text, which makes the read expensive. A short text column comes back with the row in one read.

So why not keep everything inline? Because the length of a row has to be limited. Gigantic text can’t sit in rows, and small rows let the database scan them easily. There are hard limits, too: InnoDB’s in-page row must fit in just under 8 KB with the default 16 KB pages, and MySQL caps any row at 65,535 bytes, with TEXT/BLOB columns counting only 9–12 bytes toward it because their contents live elsewhere dev.mysql.com ↗.

Which fields are which? Email, bio, first name and last name are short text; VARCHAR is what is typically used. A blog body or a long comment is long text. If you allow 5,000-character comments, that is 5,000 bytes; stored inline, it would make every row huge, a waste of space. You have to know when data is long enough to be stored separately. (Characters aren’t always bytes: in MySQL’s utf8mb4, one character can take up to 4 bytes, so 5,000 characters can be up to 20,000 bytes dev.mysql.com ↗. That only strengthens the point.)

And the extra read for long text is usually not paid at all. A listing page shows each blog’s title, the first few lines and an image. It doesn’t render the body. The body is needed only when someone opens the blog, so the second disk read happens only then.

The rule of thumb: always keep the row, or the document, to a bare minimum. Store very large text as long text and everything else as short text.

§ 5.7

## Three ways to store a date

published_at can be a native datetime, an epoch integer or a custom integer. How it sits on disk decides how fast “last 7 days” runs.

About 8 min · class 01:52–02:01

The blog list wants the posts published in the last 7 days. How should published_at be stored?

There are several ways to store a date and time, and each gives you different advantages. The class went through three.

[figure title] Three ways to store a date

[figure description] Three ways to store published_at. As a native datetime, serialised in some format, for example 02-04-2022T09:01:36Z: convenient, can be sub-optimal. As an epoch integer, 1648890096, seconds since 1 January 1970: efficient, light, unreadable. As a custom integer format YYYYMMDD, 20220402: readable, and an integer.

[figure labels] 1. datetime as datetime · 02-04-2022T09:01:36Z · serialized in some format · convenient · can be sub-optimal · 2. datetime as epoch integer · 1648890096 · seconds since 1 Jan 1970 · efficient · light · unreadable · 3. custom format · (int) · YYYYMMDD → 20220402 · readable · integer

[caption] Fig 5·gThree ways to store a date. The board’s epoch example, 172562347162, was illustrative; the redraw uses 1648890096, the epoch seconds for the same instant, 2 April 2022 09:01:36 UTC. Redrawn from the class board at 01:56.

1. The native type. Every database offers a date-time column type; it is the most basic way. Under the hood, a database that stores data on disk serialises the value in some format and flushes it. To read it back, it reads that format from disk and converts it into a date-time object before it can process it.

Take a hypothetical, naive engine that stores the date literally as a string on disk, say 02-04-2022T09:01:36Z for 2 April 2022, 09:01:36. Every read then has to turn that string back into a date-time object before comparing. Now run SELECT * FROM blogs WHERE published_at > now() - 7 days. The engine reads the string of every row, extracts date, month, year, hour, minute and second, and applies the comparison logic, in its C++ code, say. That is expensive. How your database stores this data on disk determines its performance.

Not every database stores a date as a string. MySQL has its own format, Postgres its own, MongoDB its own; some store epoch seconds, some epoch milliseconds. So understand how yours stores date-time on disk. If that isn’t performant enough for your use case, don’t use it; find a more efficient way to store the information.

The native type is extremely convenient: your language hands you a native date object to compare. But it may be suboptimal in some cases and can ruin performance; the lecture promised a real case where a company moved away from it (5.8). For scale: in the major engines the native types are compact binary values, not strings. MySQL stores a DATE in 3 bytes and a DATETIME in 5 dev.mysql.com ↗, and a PostgreSQL timestamp takes 8 postgresql.org ↗.

2. An epoch integer. Create published_at as an integer column, not a date-time, and store the epoch in it. A lot of companies have started doing this, because they get a lot of benefits. The epoch is the number of seconds, or milliseconds, elapsed since 1 January 1970: where the clock started ticking.

The board’s example epoch value was illustrative (12 digits; epoch seconds in 2022 have 10). The figure above uses the real value for the same instant.

What you gain is space. Stored as that string, the date takes about 20 bytes; the class counted them live. The same information as an epoch integer takes 4 bytes. From 20 bytes to 4: a massive space gain.

[figure title] Twenty bytes or four

[figure description] Byte strips. The string 02-04-2022T09:01:36Z takes 20 cells, one byte per character, about 20 bytes, counted live in class. The same instant as a 32-bit epoch integer, 1648890096, takes 4 bytes: 62 48 10 F0 in hex. For comparison, MySQL actually stores a DATETIME in 5 bytes.

[figure labels] as a string, counted live in class · 0 · 2 · - · 0 · 4 · - · 2 · 0 · 2 · 2 · T · 0 · 9 · : · 0 · 1 · : · 3 · 6 · Z · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 19 · 20 · ≈ 20 B · as an epoch integer · int32 1648890096 · 62 · 48 · 10 · F0 · 4 B · MySQL DATETIME = 5 B · what MySQL actually stores

[caption] Fig 5·hTwenty bytes or four. The string from the board, one byte per character, against the same instant as a 32-bit integer. The faint strip is what MySQL actually uses for a DATETIME.

What you lose is readability. An epoch integer is efficient, optimal and lightweight, but not at all readable: look at the number and you can’t tell what time it is, while a date-time reads at a glance.

It is also lightweight on the index, in the lecture’s words: a comparison is a plain integer comparison, the most efficient operation there is for the database, the disk and the computer in general, while a date-time needs a complex multi-attribute object before it can be compared.

More precisely

Epoch integers are compact and fast to compare, but native date/time types are compact binary values too (MySQL DATETIME 5 bytes, PostgreSQL timestamp 8 bytes) and index almost as efficiently postgresql.org ↗.

dev.mysql.com ↗

§ 5.8

## Redbus and the custom format

A team that needed fast date comparisons and readable values relaxed a constraint it didn’t need.

About 5 min · class 02:00–02:06

The third way comes from a story. The instructor knows it through a friend who did the work, so take it as his account.

In 2016, Redbus, where people book buses, had a table that stored dates as date-time. It became the performance bottleneck: massive date-time comparisons slowed things down to the core. Moving to epoch integers would have cost readability. Their engineers rendered the value as-is in their SQL IDEs and in their UI, and were used to debugging that way. It was a production use case, which the instructor didn’t disclose, more analytics than transactional, but date-time comparisons were creating havoc and had become the bottleneck. So they went with a custom format.

3. A custom format. They relaxed a constraint they didn’t need: they needed the date, not the time. So they stored the date as an integer in YYYYMMDD form, not as a string: 20220402 for 2 April 2022. A custom format heavily optimised for their use case. They got readability, because you can see it is 2 April, and performance, because it is an integer: integer comparison, integer index, lightning fast.

The instructor has seen a bunch of other places use custom date formats instead of a native date-time or epoch, details he couldn’t share. There is no hard rule to use the date-time type or epoch integers. Be creative, and be open to altering constraints: that is where the next level of optimisation comes from.

Pause and think

A team stores dates as the integer 20220402 (YYYYMMDD) instead of an epoch integer like 1648890096. Does that make date comparisons faster than epoch?

Compared with a slow native date-time, both integers are fast to compare and index. Against each other there’s no speed difference; the class agreed. The custom format buys readability: engineers can read 20220402 in a SQL console, and the team knew it would never need the time of day. Relax a constraint you don’t need, and know what you gave up.

Two objections were raised in class. First: isn’t YYYYMMDD really inflexible, if the time is ever needed? The instructor didn’t dispute that in general; it didn’t matter here, because Redbus knew it would never need the time. Second: they could have stored epoch and formatted it on the client with a simple function, since the custom integer gives no performance gain over epoch. The instructor agreed: it is the same integer benefit. They wanted readability, and it was their decision.

So, stated plainly: the custom format bought readability, not speed over epoch. Its speed came from being an integer instead of a date-time.

Each approach, native date-time, epoch integer or custom integer, has its own advantages and disadvantages, and no format is better than the others overall. Pick by asking what you need: readability, performance or convenience?

§ 5.9

## Time zones and running out of numbers

What each format loses: the zone, the far future, the past before 1970.

About 5 min · class 02:04–02:11

The questions after the date section went after what each format gives up.

The first: a native date-time can capture time zone information, which is somewhat lost in the epoch and custom formats, and that has to be weighed when you choose. The instructor’s reply: you get something, you lose something.

More precisely

Native timestamp types usually normalise to UTC (MySQL TIMESTAMP, PostgreSQL timestamptz) or store no zone at all (MySQL DATETIME) postgresql.org ↗. If you need the original time zone, store it in its own column, whichever format you use.

dev.mysql.com ↗

With an epoch value, display is the easy part: wherever the time is rendered, pick up the local device’s time zone and render it in that.

[summary] From practice: burned by time zones skip unless you store times

Someone in class had “burned their hands” with this. The same epoch value is a different local time in different zones, so be especially careful to take everything in UTC. The instructor seemed to agree that everyone has been through it.

The second: the epoch number keeps growing, and will soon max out a 4-byte int, forcing a move to 64 bits; doesn’t that make epoch the worst format? The instructor agreed the overflow point is very true. An epoch integer is 4 bytes today, and the range maxes out, as stated in class, as soon as we hit 2032. Moving from 4 to 8 bytes doubles the space needed to store a date.

More precisely

A signed 32-bit epoch-seconds value runs out on 19 January 2038 (MySQL’s 4-byte TIMESTAMP ends at 2038-01-19 03:14:07 UTC), not in 2032. Moving to 64 bits doubles the size and removes the limit for any practical horizon postgresql.org ↗.

dev.mysql.com ↗

The past is awkward too, in the lecture’s view. The epoch starts on 1 January 1970, so 31 December 1969 needs a negative number like −1, which the instructor called wrong on so many levels. In practice negative epochs are normal: MongoDB’s date type is signed, and “negative values represent dates before 1970” mongodb.com ↗. The real constraint is the width, not the sign.

An alternative is a compressed, serialised date-time that covers the whole date range without being limited by an integer’s size, at a little extra space: “let’s say” about 6 bytes rather than 8. The instructor pointed to MySQL’s date-time as the example, a format that tries to balance both worlds: not an integer, yet good enough performance. The real figures: MySQL stores a DATETIME in 5 bytes, plus 0–3 bytes for fractional seconds dev.mysql.com ↗.

MySQL, the instructor said, stores date-time in a mind-blowingly efficient way, covering a massive range, from BCE up to about 20,000 years, “I think”, in very few bytes.

More precisely

MySQL DATETIME covers years 1000–9999 in 5 bytes. The very wide range belongs to PostgreSQL, whose 8-byte timestamp spans 4713 BC to 294276 AD postgresql.org ↗.

dev.mysql.com ↗

Which is the lecture’s last piece of advice here: read MySQL’s official date-time documentation, not a blog, a video or a random person. It explains why MySQL serialises date-time instead of storing integers and still gets good enough performance.

Storing published_at: native datetime, epoch integer or custom YYYYMMDD integer

|

| Native datetime

| Epoch integer

| Custom YYYYMMDD int

| Size

| Serialised in some format; as a string, about 20 B (MySQL DATETIME 5 B, PostgreSQL timestamp 8 B)

| 4 B (8 B to get past the overflow)

| 4 B integer

| Compare cost

| Decode into a date object, then compare: can be suboptimal (natives index almost as well in MySQL and PostgreSQL)

| Plain integer compare

| Plain integer compare: same as epoch, no faster

| Readable?

| Yes, at a glance

| No: 1648890096 says nothing

| Yes: 20220402

| Time zone

| Can capture it, as raised in class (usually normalised to UTC; store the zone separately if you need it)

| Lost; keep everything in UTC and render in the viewer’s zone

| Lost; a date only

| Range

| MySQL DATETIME: years 1000–9999; PostgreSQL: 4713 BC–294276 AD

| Signed 32-bit seconds end 19 Jan 2038 (said as 2032 in class)

| Any date, no time of day

| Convenience

| Highest: the language gives you a date object

| Convert on every display

| Readable, but inflexible if you ever need the time

### Check yourself #

Answer in your head, or out loud, before opening each one.

Give the three reasons to soft delete, and one case where you must hard delete anyway.

[summary] Show answer

Recoverability (let the user undo, like a 30-day trash), archival (deleted content is rich data a job can move to blob storage later), and audit (evidence must not vanish when a harasser deletes a comment). Hard delete anyway when a soft-deleted row blocks a unique index, such as a user re-registering with the same email (or use a partial unique index), and when the law requires erasure.

A blog list page shows titles and excerpts. Why does storing body as long text help it?

[summary] Show answer

The body lives outside the row, with only a reference inline, so rows stay small and the list query reads compact rows without dragging thousands of words along. The extra read for the body is paid only when someone opens a post.

Redbus’s YYYYMMDD: what did it buy over epoch, and what did it give up?

[summary] Show answer

Readability: engineers could read 20220402 in their SQL tools. It bought no speed over epoch; both are integer compares, and the speed gain was over the native date-time. It gave up the time of day, which Redbus knew it would never need, and the time zone.

The blog is stored. A popular post still costs a join on every read.

Concepts in this section: six foundation topics · soft delete · staggered deletion · right to be forgotten · long text vs short text · epoch integer · custom date format

Contents of this lecture ↑

Lecture 01, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-cache ===

# Green dots and blog rows, chapter 6: What a cache is

Lecture 01 · Green dots and blog rows · chapter 6 of 7

§ 6

## What a cache is

A cache is not “RAM” and not “Redis”. It is anything that saves an expensive disk read, network call or computation. One shared cache for the blog, a database table as a cache, and whether to compress.

About 20 min · class 02:11–02:20, Q&A 02:20–02:46

The blog from chapter 5 is stored. Now one post gets popular, and every read of it runs the same three- or four-table join on the database, again and again, for a result that hasn’t changed.

The obvious fix is “add a cache”. Before reaching for one, this chapter asks what a cache actually is, because the usual answer, “RAM” or “Redis”, is too small.

§ 6.1

## Not just RAM

Caching is not a place in memory. It is the act of keeping a result so you don’t pay for it twice.

About 4 min · class 02:11–02:14

This chapter is short on purpose. Caching got five to seven minutes on day one, because the first day keeps things simple; its many use cases, and how to improve them, come up all through the course. What was covered here sets up a discussion for the very next session, which opens with it (§6.5).

People misunderstand caching a lot. The first thing to drop: caching is not just in-memory caching.

Caching is anything, literally anything, that helps you save a heavy computation or a heavy operation so that you don’t have to do it again. Whatever result you keep so you can refer to it, instead of redoing an expensive computation, operation or I/O, becomes a cache. The board put it as “Caching: reduces response times by saving any heavy computation”.

You have met one already. Memoization in dynamic programming is classic caching.

Many people hear “cache” and think RAM. Who said a cache has to be in RAM? Caches are not only RAM-based: you can use disk as a cache, and you can use the network as a cache.

What caching usually saves is disk I/O or network I/O. The habit of caching in RAM comes from RAM being faster than disk: the core idea there is that you save an expensive disk read by keeping the computed result in RAM. Turn it around. If a network call is expensive, cache its result on the local disk and read that disk instead of making the call. That cache saves an expensive network I/O.

[figure title] What a cache saves: disk I/O, network I/O, computation

[figure description] Three panels. Disk I/O: a database on disk sends a result into a small hash table in RAM, so the next read skips the disk. Network I/O: an API server would make an expensive call to a distant service; instead it keeps the result on its own local disk, which says "I’m a cache too". Computation: a gear (a computation) writes its answer into a hash table: memoization.

[figure labels] db · disk · result · RAM · keep the result in RAM · disk I/O · api · service · expensive call · I'm a cache too · cache an expensive call · on local disk · network I/O · f(n) · answer · n → f(n) · memoize · computation

[caption] Fig 6·aThree things a cache can save. Left: a disk read, by keeping the result in RAM. Middle: a network call, by keeping its result on the server’s own disk; the disk is a cache too. Right: a computation, by memoizing its answer.

So a cache is anything that saves one of three things: an expensive disk I/O, an expensive network I/O or an expensive computation. All three. These are the four resources from §4.8 again: in the lecture’s words, computer science has four things, disk, network, CPU and RAM, and any expensive disk I/O, network I/O or computation you save is a cache for you.

The rule for this whole chapter

A cache is anything that saves one of three things: an expensive disk I/O, network I/O or computation.

On the board, underneath: “Caches are just glorified hash tables… with some advanced data structures.” Where the copy lives, RAM, a local disk, another table, is a separate choice. Make it per case.

[figure title] Three things a cache saves

[figure description] Three small icons, a disk, a network cloud and a gear for computation, each with an arrow into one hash-table grid: a cache is anything that saves one of the three.

[figure labels] disk I/O · network I/O · computation · key → value

So be very creative in finding uses for caches.

And don’t be intimidated by them. Caches in general are just glorified hash tables: a key, a value, and that’s it. Redis offers a set of advanced data structures, such as HyperLogLog, Bloom filters and geospatial queries, but underneath, in the lecture’s view, it is still hash tables and key-values, nothing more. As of October 2026 Redis documents Bloom filters, HyperLogLog and geospatial indexes as built-in data types redis.io ↗; the keyspace is a key-to-value lookup, but each value is its own encoded structure.

§ 6.2

## One shared cache for the blog

Three API servers, one copy of the popular post. The join runs once.

About 3 min · class 02:14–02:17

In the blog example, the cache typically goes in as a remote cache that any API server can talk to. Logically it sits between the API servers and the database; physically it is a separate box.

[figure title] One shared cache for three API servers

[figure description] Three users send requests to a load balancer, which spreads them over three API servers. Every API server has a line to one shared cache at the top right and a line to one database. One request path is drawn in blue: a user, the load balancer, the middle API server, then the cache, which answers it (a green tick). The cache sits logically between the API servers and the database, and every server reads the same copy.

[figure labels] lb · api · api · api · cache · db

[caption] Fig 6·bLogically between the API servers and the database; every server reads the same copy. The blue read lands on the middle server and is answered by the cache. Redrawn from the class board at 02:16.

The read flow is the standard one. A request reaches an API server, which first checks the cache. If the data is there, it returns it. If not, it reads from the database, puts the data into the cache, and returns it to the user.

def get_blog(blog_id): blog = cache.get(f"blog:{blog_id}") if blog is not None: return blog # hit: no database call at all blog = db.fetch_blog_with_join(blog_id) # miss: the 3–4 table join, once cache.set(f"blog:{blog_id}", blog) # expiry and invalidation: not covered here return blog

Because the cache is remote, it doesn’t matter which API server a request lands on: all of them read from the same cache. There is just one copy of the data in the cache, and everyone reads it.

That is what makes it pay off for a popular blog. Running the same expensive three- or four-table join on the database for every read puts unnecessary load on it. Cache the blog in the centralised remote cache instead: the request goes to the cache, which is much faster, and the load on the database drops by a massive margin, because its queries are now answered by the cache.

Three API servers, 1,000 reads of one popular post. How many joins does the database run?

[caption] Clip 6·1Without a cache, every read runs the same join. With one shared cache, the first read misses and runs it once; every later read, on any server, hits the same copy. Save the expensive computation once; read it many times.

[summary] The clip as text 0:37

- Three API servers serve one popular post, again and again.

- Without a cache, every read runs the same expensive join.

- Add one shared cache. First read: miss, join once, keep it.

- Every later read, on any server, gets the same copy.

- The hop to the cache remains; the join doesn't.

- Save the expensive computation once; read it many times.

Users reach three API servers through a load balancer; all three query one database. Without a cache, three reads of the same popular post land on api 1, api 2 and api 3, and each one makes the database run the same 3–4 table join: three reads, three joins. Then one shared cache is added, reachable from every API server. The next read checks the cache, misses, runs the join once, stores the result in the cache and returns it. The following reads land on api 2, api 3 and api 1; each checks the cache, hits, and gets the same stored copy back without touching the database: four reads, one join. The trip to the cache is still one network hop, but the join is not repeated. Save the expensive computation once and read it many times.

The remote cache is not free: it still costs a network hop. But reading a precomputed result from the cache is much faster than going to the database, recomputing it and sending it back.

coming later · Lecture 2: caches at every layer of the route: the browser, the CDN, the load balancer, the API server’s RAM and disk, materialized views

§ 6.3

## A table can be a cache

If a cache is any saved result, a database table holding precomputed rows is one. So why use Redis?

About 6 min · class 02:20–02:21, Q&A 02:32–02:36 and 02:41–02:46

A question from someone who had assumed caches must live in RAM: why not precompute the expensive result and store it in a database table, then read that table? That is a possible place too. Databases even have a built-in form of it: a PostgreSQL materialized view stores a query’s result in table form, and in the docs’ example a read falls from 188 ms to 0.117 ms, but the data is only as fresh as the last refresh postgresql.org ↗.

Always ask “why not this? why just this?” instead of being obsessed with keeping caches in RAM. What matters is that the business and the product work and perform, however you do it.

Then the follow-up: from a throughput point of view, is reading precomputed results from Redis the same as reading them from a database table? The lecture took it from first principles, one factor at a time.

Connections. The application server holds persistent connections to both, Redis and the relational database, so the connection cost cancels out.

Memory or disk. Redis reads the value from memory; the database goes to disk to read it. That is the worst case. Databases keep hot table and index pages in RAM, in InnoDB’s buffer pool dev.mysql.com ↗ for example, so many database reads never touch the disk; the lecture comes back to this below.

How much you read. For very small reads, say 10–15 bytes, memory is much faster, because disk is humongously slow for small reads. For larger reads, say 1 KB, the difference is minimal: Redis would still be a little faster, but not hugely.

More precisely

Databases read storage in pages (8 kB in PostgreSQL, 16 KB by default in InnoDB dev.mysql.com ↗), so a 15-byte read and a 1 KB read cost the same page I/O; the memory-vs-disk gap narrows only for large sequential reads. The latency figures often quoted for this (100 ns memory, 10 ms seek) date from about 2009 brenocon.com ↗.

postgresql.org ↗

How it is stored. A disk-based database stores its data in a B+ tree, so a read walks the tree down to the row: not one disk read but one, two, three, about log n reads depending on the number of rows. An in-memory hash gets the value in one shot.

[figure title] Hash lookup vs tree walk

[figure description] Two panels. Redis: one blue arrow goes from the key straight to its cell in a hash table in RAM, one step. Database table: a B+ tree whose nodes are 8–16 KB pages; a blue path walks from the root through an internal node to a leaf, about log n page reads, in the worst case from disk. A dashed band marks the top two levels as often cached in RAM.

[figure labels] get b42 · hash table · 1 step, RAM · redis · often cached · in RAM · each node: an 8–16 KB page · log n page reads, · worst case from disk · db table (B+ tree)

[caption] Fig 6·cLeft: Redis hashes the key and reads the value from RAM in one step. Right: a database walks its B+ tree from root to leaf, one page per level, about log n reads; in the worst case each comes from disk, though the upper levels are often already in RAM.

Cost and size. Keeping data in memory costs more, and how much you can store is limited by RAM; a database is limited by disk. So you get a larger cache on disk versus a smaller cache in memory. RAM is more expensive than disk, and the lecture called that the biggest factor in the choice.

So the choice is subjective. Weigh what you read and how much, how the data is stored, how many I/Os happen, what you actually gain and how much data you keep. Overall, the lecture concluded, there is not much difference. The class agreed with one condition on that conclusion: it holds given that the computation you are saving is large.

Two more costs came up. A managed Redis service runs on the cloud provider’s pricing and billing, so its cost has to be counted. And if you keep the precomputed results in the same database that serves the application, that database also spends time processing those reads, and the existing requests feel it.

Where to keep a precomputed result

|

| Redis

| Table in the app database

| Table in a separate database

| Read path

| Hash lookup in RAM, one step

| B+ tree walk, about log n page reads

| Connection cost

| Persistent connection

| Cost per GB

| High: RAM

| Low: disk

| Size limit

| The RAM you pay for

| The disk

| Extra load on

| The cache only

| The database already serving users

| That other database

| Freshness

| As fresh as your last write to it

| As fresh as the last refresh

A later question pushed on the disk assumption: if the field is indexed, doesn’t the read come from RAM anyway? The comparison deliberately assumed the worst case, a read from disk. In the best case the table is so small that the database keeps it in RAM, and then there is no difference. Indexing a field does not guarantee RAM reads either: if there isn’t enough RAM to fit the index, the read goes to disk. Always design for the worst case, a disk read.

Does an index ever live in RAM permanently? No. Indexes are stored permanently on disk, always. The instructor’s video on how indexes make database reads faster explains it, and it is in the next week’s pre-reads. coming later · Lecture 3: how indexes make reads faster

§ 6.4

## Should the cache compress?

Compression trades CPU for bytes. Where it happens decides which bytes you save.

About 4 min · class 02:26–02:30

Should you compress what you cache, to cache less data? It depends, and the trade-off is decompression: it costs time. Compress only if what you cache is big, massive text blobs for example, and decompressing then reading is faster than reading the larger data and paying for the extra memory to hold it. Do the trade-off analysis, then decide.

The cache won’t do it for you. Most caches are just key-value, so the application has to compress before it stores and decompress after it reads. Redis’s own compression is limited to its RDB snapshot files (on by default) and, optionally, the inner nodes of lists; compressing large values is left to the client redis.conf ↗.

There are probably plugins for most caches that compress, though the instructor wasn’t sure of any and had never used one, never having found a genuine reason to keep massive values in a cache. In practice it is usually the client library: pymemcache’s compressing serializer, for example, zlib-compresses values longer than 400 bytes and keeps the original if compression doesn’t make it smaller github.com ↗.

Size decides it. Compressing a small field such as an email ID gives no boost; decompressing it would actually cost performance. Compressing a whole blog body, say 10 KB stored as 1 KB, which is not unusual, would be a huge benefit.

What about the images and video that services like Instagram cache around the world? CDNs distribute those, and nothing stops you from compressing them. Text is what compresses well, though: HTML, CSS, JavaScript and JSON. Images, audio and video are already compressed by their formats, and compressing them again can make files larger developer.mozilla.org ↗.

Pause and think

You cache 10 KB blog bodies that compress to 1 KB. Should the cache compress them for you, or should your app compress them before sending?

If the app compresses, it sends 1 KB, the cache stores 1 KB and readers fetch 1 KB. If the cache compresses, 10 KB still travels each way. That’s why the class reasoned that caches shouldn’t compress for you; in practice client libraries do it. Compress only big values: a small email ID gets slower, not smaller.

The lecture then reasoned it out live. Why should a cache offer compression at all? Now that it came to it: it shouldn’t. If the cache compresses, you still ship 10 KB over the network to have it stored as 1 KB, which wastes bandwidth. Compress on your end and you transfer 1 KB. So, in the lecture’s view, caches should never offer compression out of the box; it should be your application’s responsibility. That is the lecture’s reasoning rather than an industry rule: the bandwidth argument is sound, and it is why client libraries compress, while Redis itself still compresses where it is cheap and invisible, as in its snapshot files.

[figure title] Compress where: in the cache or in the app?

[figure description] Two rows. Cache compresses: the app sends the full 10 KB over the network, drawn as a red-labelled arrow, and the cache compresses it to 1 KB inside. App compresses: the app compresses first and sends 1 KB over the network, with a green tick, and the cache stores the 1 KB as it is.

[figure labels] cache compresses · app · 10 KB · 10 KB on the wire · cache · compress → 1 KB · app compresses · app · compress · 1 KB · cache · stores 1 KB

[caption] Fig 6·dTop: the cache compresses, so the full 10 KB still crosses the network. Bottom: the app compresses first, so 1 KB crosses the network and 1 KB is stored.

The flow, then: compress on your end, send it, store it; on the way back, receive it, decompress it and return it.

import zlib def put_body(blog_id, body: bytes): cache.set(f"body:{blog_id}", zlib.compress(body)) # 10 KB in, about 1 KB over the wire def get_body(blog_id) -> bytes: return zlib.decompress(cache.get(f"body:{blog_id}")) # 1 KB over the wire, 10 KB out

This answer existed only because someone asked. Keep asking questions: they surface use cases a lecture would otherwise find hard to cover, and the answers come from experience when someone asks.

§ 6.5

## Exercise: every place you could cache

One place is covered. Find the others before the next session does.

About 3 min · class 02:17–02:22

The board’s “fun exercise”: on this common architecture, find every possible place you could use as a cache, with an example: what you would cache there and what problem it solves. The next session’s first thirty minutes are this discussion, with each person who raises a hand pitching one place.

[figure title] Your turn: every place you could cache

[figure description] The blog architecture from Fig 6·b drawn faint: users, a CDN cloud added in front, the load balancer, three API servers, the shared cache and the database. Six numbered tags mark places that could cache: 1 the shared cache (filled in: central cache, saves database calls), 2 the user’s browser, 3 the CDN, 4 the load balancer, 5 an API server, 6 the database. The question: what would you cache here, and what does it save?

[figure labels] what would you cache here, and what does it save? · cdn · lb · api · api · api · cache · db · 1 · central cache · saves db calls · 2 · 3 · 4 · 5 · 6

[caption] Fig 6·eYour turn. Tag 1 is done: the central cache that every API server talks to, which saves database calls. Tags 2–6 are for you: the browser, the CDN, the load balancer, an API server, the database. Redrawn from the class board at 02:17.

One place is already covered: the centralised, application-level cache that every API server talks to, which saves expensive database calls and computation. Find the others. The CDN might be one; the load balancer might be another. Think along those lines.

The point is to spark ideas, and to see the many interesting, quote-unquote, “hacks” people have applied to get the most performance out of their systems.

What about the client’s local storage, does that count as caching? That was asked in class and deliberately left for the next session’s discussion of all the places you can cache: it is one of the answers to find.

[summary] From an earlier cohort skip unless you want proof the exercise pays

The instructor tells this one about a cohort roughly two years earlier. The same discussion of caching places led a participant who worked at Goldman Sachs to take one idea back to work and propose it to his manager. The manager approved it, and they saw a massive performance boost from a place to cache that nobody there had thought of.

How caches work inside, eviction, LRU, LFU and the rest, comes later, when the course builds a distributed cache and a key-value store from scratch.

coming later · Lecture 9: building a distributed cache: eviction, LRU, LFU

### Check yourself #

Answer in your head, or out loud, before opening each one.

Name a cache that lives on disk and one that is a database table.

[summary] Show answer

On disk: the result of an expensive network call kept on the API server’s local disk, so the next request reads the disk instead of calling out. A database table: precomputed results, such as the popular blog’s join, stored in a table (a materialized view is the database’s built-in form). Both save one of the three things: here a network I/O and a computation.

When does a Redis cache barely beat a table holding the same precomputed rows?

[summary] Show answer

When the connection cost is equal (both are persistent), the reads are larger rather than tiny, and above all when the table is small enough that the database keeps it in RAM: then there is no difference. Redis wins clearly for tiny reads served from a database’s disk, since it needs one hash lookup instead of a B+ tree walk; design for that worst case. RAM’s higher cost per GB, and the extra load on a shared database, are the other weights.

Why compress a 10 KB blog body in the app rather than in the cache?

[summary] Show answer

Because the network is where the bytes travel. If the app compresses, 1 KB goes over the wire, 1 KB is stored and 1 KB comes back. If the cache compresses, the full 10 KB still crosses the network every time. Compress only big values: a small field like an email ID only gets slower.

The exercise is the bridge to Lecture 2. Before it, chapter 7 collects the habits that ran through both builds.

Concepts in this section: cache (any saved I/O or computation) · memoization · remote cache · cache-aside read · table as a cache · compression

Contents of this lecture ↑

Lecture 01, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-what-to-keep ===

# Green dots and blog rows, chapter 7: What to keep

Lecture 01 · Green dots and blog rows · chapter 7 of 7

§ 7

## What to keep

The habits that ran through both builds, and where this lecture stops.

About 3 min · class 02:19–02:20, 02:36 and 03:01–03:02

This page built two things. A green dot that turns grey when a user goes quiet, and the rows and cache of an ordinary blog. Here they are side by side, each part tagged with the chapter that put it there.

[figure title] Two builds, one habit

[figure description] Two designs side by side. Green dots: a user sends periodic heartbeats (chapter 2) to an API server, which writes over a pool of connections (chapter 4) to Redis, where each entry has a 30-second TTL (chapter 3). Blog rows: a user goes through a load balancer to an API server, which reads a shared cache (chapter 6) and a database holding the users and blogs tables, blogs with an is_deleted column (chapter 5).

[figure labels] heartbeats · api · pool · redis · ttl 30s · §2 · §4 · §3 · green dots · lb · api · cache · db · users · name · bio · blogs · is_deleted · §6 · §5 · blog rows

[caption] Fig 7·aLeft, green dots: heartbeats (§2) into an API server that writes through a connection pool (§4) to Redis with a 30-second TTL (§3). Right, blog rows: an API server behind a load balancer, a shared cache (§6) and a database with users and blogs, blogs soft-deleted with is_deleted (§5).

Jump back to a part: §2 green dots · §3 Redis or DynamoDB · §4 heartbeats and the pool · §5 blog rows · §6 the cache.

### Nine lines to keep #

The same few habits did the work in both builds, whatever box was on the board:

- Find the core property and access pattern first; which tool fits comes second, never your affinity for one (§1.2).

- Estimate before you optimise, and ask whether the problem is storage or computation. Eight gigabytes was never the issue; six million writes a minute were (§2.6, §4.1). At every step ask “can I change this, is there an alternative?”, and write down every option you considered and why you took your path (§2.6).

- Don’t add moving parts. Never draw a box you wouldn’t want to build, run and monitor; if the database can expire entries natively, offload it instead of running your own deleter (§2.7, §2.8).

- Know how a feature works inside, not just that it exists: AOF and RDB, how to configure them, how often they flush (§3.2).

- Pool your connections, with a budget. A pool is always a great option for many micro updates, and a blindly configured one caps how many servers you can run (§4.3, §4.7).

- Start conservative, observe the metrics, then retune (§4.5).

- Ask of every table: does it need recoverability, archival or audit? If yes, soft delete (§5.2).

- Keep rows to a bare minimum: very large text as long text, everything else short (§5.6).

- A cache is anything that saves an expensive disk I/O, network I/O or computation, not a place in RAM (§6.1).

And the habit behind all nine: implement the core of each system yourself, over the next year or so. Implementing it is what shows you where a design falters.

### Trade-offs, always #

The whole domain is full of trade-offs. There is no one right answer to anything; even 2 plus 2 can be reformulated. Every time you use something, a store, a cache, a pool, you gain something and you lose something, so stay open to the trade-off.

That intuition is built over the eight weeks. Every system the course designs will be argued for hours, and from next week the brainstorming won’t move forward until there is an answer to why a decision is made and what it trades away. Keep asking questions along the way: they surface the cases a lecture would otherwise miss (§6.4).

Where to stop overthinking gets its own session later: the same system seen through the eyes of a manager, a product manager, a senior engineer and a junior engineer, the “hats”. It is not only an engineering course. coming later · week 6: where to stop overthinking: one system, several hats

### Where this lecture stops #

Each of these was deferred in class on purpose:

- tomorrow · Lecture 2 Every place you could cache on the blog’s architecture, the exercise from §6.5; then the other four foundation topics on the same Medium-like example: scaling, delegation, concurrency and communication.

- coming later · Lecture 2 and Lecture 4 WebSockets, which the class promised for “next week” and which came the next day, and real-time presence the way Slack does it. Real online indicators keep a persistent connection, with many tunings.

- coming later · Lecture 3 Strong consistency, and why a delete may need a lock rather than downtime.

- coming later · Lecture 3 and Lecture 9 How Redis expires keys inside, and building a cache with a TTL.

- coming later · week 7 A much better answer to traffic spikes than scaling the database up: flash sales.

Concepts in this section: spiral and incremental · heartbeats and TTL · Redis or DynamoDB · connection pooling · soft delete · what a cache is

Contents of this lecture ↑

Lecture 01, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.

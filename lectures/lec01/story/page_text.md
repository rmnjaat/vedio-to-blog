=== PAGE: lecture overview ===

Lecture 02 · the blog from Lecture 1, now popular

# Medium under load

The viral post sits in one shared cache, yet every view still crosses your network. Follow the same blog as it gets popular: more readers than your machines can take, a publish button that does too much, two claps in the same instant, and readers who want to watch the count move.

- One blog, under load

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1Where else could you keep a copy?Lecture 1’s homework, answered: every place along a reader’s route where a copy could live, and what each one gives up.6 sections · §1.1–1.6

- 2Marketing is about to message every userA campaign is about to send every user to the site at once. How many machines it needs, what more servers do to everything behind them, and how a database grows.4 sections · §2.1–2.4

- 3Publishing a story does too muchAn author’s story count has to go up on every publish. What belongs in the request, and what happens to the rest when a worker crashes.7 sections · §3.1–3.7

- 4Two readers clap at the same instantA post with 100 claps gets two more in the same instant. Where does the count end up?3 sections · §4.1–4.3

- 5Can the other reader see the clap without refreshing?A reader claps, and another reader of the same post should see it without refreshing. The ways a server can tell a browser that something changed, and what each one costs.5 sections · §5.1–5.5

- 6The app is closed. Can you still reach the reader?Reaching a reader whose app is asleep, and what each hop of the blog speaks.4 sections · §6.1–6.4

Lecture 1 ended on a viral post. Every reader who opened it made the database run the same join, so you put one copy of the result in a cache that every API server can reach, and the database’s load from that post fell to almost nothing. Then came a question to take away: along the whole path a reader’s request travels, where else could you keep a copy? (The blog is a Medium-style site: writers publish stories, and readers read them and clap.)

This lecture opens with the answer, and then keeps going, because the blog is popular now and popularity doesn’t arrive as one problem. It arrives as more readers than your machines can serve, a publish button that does too much while the writer waits, two readers clapping for the same post in the same instant, and readers who want to watch the claps arrive without pressing refresh.

Each of those breaks something in the design you have. Each fix adds a box to the picture below, and each box has a price that sets up the next chapter.

[figure title] The blog so far

[figure description] The blog where Lecture 1 left it: a reader’s request goes to one of three API servers, which check one shared cache and otherwise read the database.

[figure labels] reader · api ×3 · shared cache · db · the blog so far

[caption] Fig 0·aWhere Lecture 1 left the blog: a reader, three API servers, one shared cache in front of the database. Every chapter opens on this map as it grows.

### What happens to the blog #

Readers keep coming back to the same posts (chapter 1). You find every place along the route that can answer before the database does, and what each one gives up.

Marketing is about to message every user (chapter 2). You work out how many machines a spike needs, what adding API servers does to everything behind them, and how a database grows when one machine isn’t enough.

Publishing does too much (chapter 3). A writer presses Publish, and the request that saves the post is asked to do more and more besides. You decide what can happen later, who does it, and what happens when that worker crashes halfway.

Two readers clap at once (chapter 4). A count of 100 receives two claps. Where it ends up is the lesson.

Readers want to see claps live (chapters 5 and 6). You compare the ways a server can tell a browser that something changed, from asking every few seconds to keeping a line open, and finish with what each hop of the blog speaks.

### What you’ll be able to do #

- Place a cache at the right stop on a request’s route and say what it saves and what it gives up.

- Estimate how many machines a spike needs, scale in the order that doesn’t cause an outage, and route each read to a primary or a replica on purpose.

- Take work out of a request with a queue or a stream, and say which one a job needs and what happens when a worker crashes halfway.

- Spot a lost update on a counter and let the database make it safe.

- Pick short polling, long polling, a WebSocket, server-sent events or a push notification from the shape of the conversation.

### Before you start #

You need Lecture 1: the blog’s tables, connection pools, and what a cache is. Each chapter opens with the blog’s map so far, with the piece the last chapter added marked “new”. When a “Pause and think” box asks you something, commit to an answer before you open it.

Most of what follows can be tried on a laptop: a local Redis, two copies of a tiny API server, a queue. Building even the hello-world version of each idea is what shows you where it bends.

Lecture 02 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-caching ===

# Medium under load, chapter 1: Where else could you keep a copy?

Lecture 02 · Medium under load · chapter 1 of 6

§ 1

## Where else could you keep a copy?

About 9 min

The viral post now lives in one shared cache, and the database barely notices it. But look at what a hit still costs: the request crosses the internet to an API server, which makes a network call to the shared cache, and the post travels all the way back. The database is spared; the network is not. And the post hasn’t changed by a single character since it was published.

[figure title] The blog so far

[figure description] The blog where Lecture 1 left it: a reader’s request goes to one of three API servers, which check one shared cache and otherwise read the database.

[figure labels] reader · api ×3 · shared cache · db · the blog so far

[caption] Fig 1·aThe blog as Lecture 1 left it: three API servers, one shared cache, one database. This chapter adds copies everywhere else on the route.

This chapter answers Lecture 1’s question one stop at a time, starting where the request already is, on the API server, and moving out towards the reader. (The blog is a Medium-style site, so its posts are “stories”; in the database the table is blogs.)

§ 1.1

## Is the shared cache the only place?

Ask an engineer to “add a cache” and almost everyone draws the same box: one Redis next to the database. Assuming it is the only option leaves most of the good places unused, including the ones that make your infrastructure cheaper.

Asked where to cache, many people say “at several layers, to reduce latency”. That names no layer. A real answer has three parts: what you keep, exactly where it sits, and what it spares you. “Each API server keeps the rendered post in its own memory, so it skips the call to the shared cache” is an answer.

Lecture 1 gave you the test for the last part: a cache is anything that saves an expensive computation or an expensive I/O. A copy is worth keeping only when reading it is cheaper than the work it replaces.

§ 1.2

## What if each server kept its own copy?

Every API server already has RAM. The simplest cache there is a hash map in the server’s own memory, sitting in front of the shared cache. A hit never leaves the process, so it saves the network call to the shared cache, which is the expensive part. Startups lean on it as a cheap hack, and large applications keep in-process caches too.

It has three costs: its size is capped by the memory the application leaves free, it vanishes when the process restarts, and each server holds a different copy, because nobody else can see a server’s memory. Watch what that does to one post (Medium calls them stories).

[figure title] Two servers, two copies

[figure description] Swim lanes for the reader, API server A, API server B and the database, time running down. 1: a request for story 42 reaches A, misses A's empty local cache, reads the database and fills A's cache with v1. 2: the next request lands on B, which never saw A's copy; it misses, reads the database and fills its own cache with v1. 3: the story is edited; the database now holds v2 while both caches still hold v1. 4: B's entry expires (TTL) and B refetches v2; A still serves v1, a stale read, so two readers get two answers. 5: fine for a published story, not for a clap count.

[figure labels] reader · api · A · api · B · db · time · 1 · GET story 42 · miss · v1 · v1 · 2 · GET story 42 · miss · v1 · 3 · writer edits story 42 · v2 · both caches still v1 · 4 · ttl runs out · v2 · v1 · stale · 5 · fine for a published story · · not for a clap count

- A reader asks for story 42 and lands on server A. A’s cache is empty, so it reads the database and keeps v1.

- The next request lands on B. B never saw A’s copy, so it misses too and fills its own v1.

- The writer edits the story. The database now holds v2; both caches still hold v1.

- B’s entry expires first and B fetches v2. A still serves v1: two readers, two answers.

- Fine for a published story, which almost never changes. Not fine for a clap count, which changes all the time.

Keys: ← → to step · link to a step with #fig-1b/step-3

[caption] Fig 1·bTime runs down. Lanes are a reader, two API servers each with a local cache, and the database. The red ring is a stale copy.

The shared cache exists to avoid this: every server reads the same copy. Go local and you trade that away for the hop you save. Two situations make the trade safe. With sticky sessions, the load balancer sends a user to the same server every time, so that server can keep the user’s data (if it dies, the user moves and the data is rebuilt elsewhere). Or the data is nearly static, so a slightly old copy for a while hurts nobody.

A published post is the second case: it almost never changes, so the blog can keep published posts in API-server memory.

It isn’t local or shared. Real systems layer them: a small local cache on each server, the shared cache behind it. Give every local entry an expiry and the cache a memory cap, because an API server has little RAM to spare. Making many local copies agree the moment a post changes is a harder problem; it needs the servers to tell each other about changes, a publish/subscribe channel like the one Lecture 4 builds for Slack.

§ 1.3

## What else is on the box?

RAM is the scarce part of that server: of 8 GB, the operating system, the application and other jobs take most, and a cache gets what is left.

Pause and think

The same API server came with a 20 GB disk. The operating system, the app’s packages and its jar files fill 2–3 GB; the rest is empty. Is a copy of the post on that disk worth keeping?

A read from the server’s own disk replaces a network call to the shared cache or the database. A cache is anything that saves an expensive I/O, and the network call is the expensive one.

Few teams think of it, because a cache “should be in memory”. Yet every cloud VM ships with a disk that mostly holds nothing, already paid for.

[figure title] What’s on an API server

[figure description] Panel a: an API server with 8 GB of RAM, almost all taken by the OS, the application server and other jobs, leaving a thin free slice; and a 20 GB disk of which only 2 to 3 GB hold the OS, jar files and packages, the rest unused. Panel b: a latency ladder on a log scale: a RAM read about 100 ns, a random SSD read about 150 microseconds, a network round trip inside one datacenter about 500 microseconds (classic c. 2012 figures). A hot disk cache is actually served from the OS page cache in RAM.

[figure labels] RAM · 8 GB · os · app server · other jobs · little left: free · disk · 20 GB · unused · os · jars · packages · 2–3 GB · one api server · fast · slow (log scale) · RAM read · ~100 ns · SSD random read · ~150 µs · network round trip · ~500 µs · a hot “disk” cache is · served from the OS · page cache, in RAM · classic numbers, c. 2012 · (Jeff Dean · jboner gist) · latency ladder

[caption] Fig 1·cLeft: on one API server, RAM is nearly all spoken for while the disk is mostly empty. Right: classic latency numbers on a log scale; the network round trip is the one a local copy avoids.

Why it wins: Linux keeps recently read files in its page cache, built from RAM the applications aren’t using, so a disk cache that is read often is served from memory without calling a shared service kernel.org ↗. One caveat: on AWS the default disk is an EBS volume, itself network-attached; the host’s own disks, called instance store, are what AWS recommends for caches docs.aws.amazon.com ↗.

Same warning as for RAM: no central view, so two requests can get two answers.

Lecture 1 told of an engineer at a large bank who came out of this same where-else-can-I-cache exercise with an idea, took it to work and got a large speed-up. This was the idea: the API servers’ own disks, used as a cache. Everyone had taken the disk for granted. Question every component on the route.

§ 1.4

## Can the reader’s browser answer?

A browser caches images and static assets, and it can keep some API responses too, so the request is never sent. Open a post a second time and the images appear at once: that is the browser’s own cache, not a fast network.

For data you choose to keep, localStorage holds a modest amount, about 5 MiB of strings per site; larger data belongs in IndexedDB developer.mozilla.org ↗. To see it, open developer tools: the Network tab marks responses served from its cache, and the Application panel in Chrome (Storage in Firefox) shows what a site keeps in localStorage.

§ 1.5

## Can the request stop before it reaches you?

Between the reader and your servers sits a CDN. Most people think a CDN is for images and video. It is a proxy between the reader and your backend, and to a proxy everything is bytes, so it can cache API responses too. It follows the response’s cache headers and its own defaults (Cloudflare won’t cache JSON until you add a rule developers.cloudflare.com ↗), and anything personal must be marked private so it is never served to another reader.

A near-static response is a perfect fit. The blog’s /popular list is the same for every reader and rarely changes; cache it at the CDN and the request never reaches your API servers or your shared cache. Giphy does this for the results of its most popular searches.

Behind the CDN, in front of your servers, sits one more stop: the reverse proxy or API gateway. nginx and API gateways can cache whole responses (a plain load balancer such as AWS’s ALB only routes and caches nothing). These caches live mostly by their timer: how long a response stays is your main lever, though some gateways also let you flush entries docs.aws.amazon.com ↗.

[figure title] The CDN answers, and caches closer still

[figure description] Panel a: a reader requests GET /popular. The request goes to the CDN cloud, which answers straight back from the edge; only on a miss does the CDN go on to the API server and its database. A speech bubble on the CDN says: images, JSON, it is all bytes to me. Panel b: a reader asks the ISP, which holds a copy of a very popular show and answers directly; only on a miss does the request go on to the CDN and then the origin API server. A show does not change once it is live.

[figure labels] served from · the edge · only on · a miss · cdn · caches any bytes: · images, JSON… · GET /popular · api · db · the cdn answers · isp · cdn · api · origin · very popular shows · a show doesn’t change · once it’s live · closer still: the isp

[caption] Fig 1·dLeft: GET /popular is answered at the edge; only a miss goes on to the API server. Right: a very popular show answered by the reader’s internet provider before the CDN is even asked.

Out past the CDN, towards the reader, it can go closer still. A popular show doesn’t change once it is live, so Netflix places its own cache servers inside internet providers’ networks, and viewers stream from there without touching the CDN about.netflix.com ↗. Lecture 7 builds with a CDN in earnest.

§ 1.6

## Every stop on one route

Put the stops in a line and you have the answer to Lecture 1’s homework: the browser, the CDN, the reverse proxy or gateway, the API server’s RAM, its disk, the shared cache, and inside the database the materialized view you met in Lecture 1, a stored query result that has to be refreshed and pays off only when its data changes rarely.

[figure title] One Medium request, every place it can be answered

[figure description] One blue request route from a reader through seven numbered places that can answer it: 1 the browser (assets, some responses), 2 the CDN (near-static responses), 3 the reverse proxy or API gateway (responses, with a TTL), 4 the API server’s RAM (hot stories), 5 the API server’s disk (rendered stories), 6 Redis (shared hot keys), 7 the database’s materialized views (pre-joined stats). Stops 1 to 3 mean the request never reaches your servers; stops 4 and 5 answer without calling a shared service.

[figure labels] never reaches your servers · no shared service · 1 · 2 · 3 · 4 · 5 · 6 · 7 · cdn · api · ram · disk · browser · proxy / · api gw · api server · redis · db · materialized view · assets, some · responses · near-static · responses · responses · (ttl) · hot · stories · rendered · stories · shared · hot keys · pre-joined · stats

[caption] Fig 1·eOne request for a post, every place it can be answered. The earlier a stop answers, the less of your infrastructure the request touches.

For every box on your own route, ask: can I keep something here, and would it make the system better? Each answer is a trade. Local copies give up strong consistency between servers. When the data rarely changes and a slightly stale copy for a while is acceptable, that trade is well worth making.

[summary] Go deeper: a cache that can’t afford a miss a real multi-level design

One team ran a configuration service where adding more than 3 ms to a read was unacceptable. Changes were snapshotted to S3, or to a CDN for mobile apps; apps loaded them into memory and saved a copy to disk. Reads always hit memory, a background thread pulled the latest, and since memory is empty at every start, the disk path ran on every boot. The general lesson: a fallback that rarely runs is never tested, so make it part of the normal path, as this design did. Configs that rarely change made this depth safe.

These copies save work you would repeat. None helps with new work: a writer publishing, a reader clapping, or simply more people arriving at once than your servers can take. That last one is on its way: marketing is about to send a notification to every user.

Lecture 02, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-scaling ===

# Medium under load, chapter 2: Marketing is about to message every user

Lecture 02 · Medium under load · chapter 2 of 6

§ 2

## Marketing is about to message every user

About 9 min

The marketing team has a campaign ready: a push notification and an SMS to every user, inviting them back to read. When it goes out, people don’t trickle in over a day. They arrive together, in one sudden spike.

[figure title] The blog so far

[figure description] The blog so far: reader, three API servers, a shared cache and the database. Marked new: caches along the route, in the reader’s browser, at the CDN and at the reverse proxy beside the load balancer, and on each API server’s own RAM and disk.

[figure labels] new · reader · browser · cdn · lb · api ×3 · ram · disk · shared cache · db · the blog so far

[caption] Fig 2·aThe blog so far. Marked new: copies along the whole route, in the browser, at the CDN and the reverse proxy, and in each API server’s RAM and disk.

That is the real meaning of scaling: the ability to handle a large number of concurrent requests. A million requests spread over a day is easy. A million at the same moment is what breaks things, and that is what a campaign produces.

§ 2.1

## Why not just buy a bigger machine?

The first move needs no code. Open the cloud console and pick a bigger machine type: more CPU, more RAM, more disk. That is vertical scaling, making one machine bulkier, like the Hulk. A database can go from 16 GB of RAM to 32, then 64, 128, 256, 512 GB, 1 TB, 2 TB, 4 TB.

Pause and think

Say you need a machine with twice the largest memory your cloud offers. Supercomputers exist. What actually stops you?

Parts of a machine talk to each other over buses: memory in its slot, a disk or a network card on the motherboard, a USB stick in its port. Both sides must speak the same hardware protocol, and a part that can’t address more memory or a larger disk simply won’t. A phone whose card slot supports 256 GB doesn’t recognise a 512 GB card. Going one step up means different hardware, and a data centre either has it or doesn’t.

“The console doesn’t show a bigger option” is the strangest answer to this, and it explains nothing. In practice you usually stop earlier for two duller reasons: the largest machines cost far more per unit of capacity, and one machine, however big, is still one machine that can fail.

§ 2.2

## How many machines, and when?

The other direction is horizontal scaling: add more machines, like a crowd of Minions, and spread the traffic across them behind a load balancer. With no shared bottleneck it scales linearly, which is called linear amplification. Your API servers are easy to multiply this way because they keep no state of their own; any server can answer any request. You also gain fault tolerance, since losing one machine no longer loses the service, and you pay with a more complex architecture and a network between machines that can split.

That arithmetic needs one number you can’t guess: what one machine of your configuration can actually serve. There is no formula that says a 32 GB machine handles 5,000 requests a second. Only a load test tells you. With it, capacity planning is division: if a load test says one server handles 100 requests a second and the campaign’s peak needs 500, you need five. Before Amazon’s Prime Day, business teams forecast the orders; divide the forecast peak by one machine’s tested capacity and you know whether you have enough.

[figure title] Capacity math and the spike

[figure description] Panel a: machines needed equals N, the forecast peak, divided by c, one machine’s capacity, which only a load test can tell you. Panel b: requests over time. Traffic is flat, then jumps when the campaign is sent. Capacity added by the autoscaler steps up only later, so for a while users arrive before the machines do. In the variant drawn in green, capacity was raised before the campaign was sent and the spike fits under it.

[figure labels] machines = N ÷ c · N = forecast peak (from BI) · c = one machine’s capacity, · known only from a load test · a · how many machines · requests · time · campaign sent · scaled first, · then sent · autoscaler reacts · readers · users · arrive first · b · the spike and the autoscaler

[caption] Fig 2·bCapacity math and the spike. (a) Machines needed = forecast peak ÷ one machine’s load-tested capacity. (b) The campaign’s readers arrive before reactive autoscaling catches up; raising capacity first (green) avoids the gap. The curves are illustrative.

Can’t autoscaling handle the campaign? An autoscaling group adds instances behind the load balancer when a rule you wrote fires, say “add a node when average CPU passes 60%”. That works for gentle growth. For a sudden spike it is too slow: new instances have to launch and warm up, and the users are already there. So scale for the spike first, then let marketing send. AWS supports this directly: scheduled scaling raises capacity at a set time, and warm pools keep pre-started instances ready to join docs.aws.amazon.com ↗. A campaign is a team sport: if marketing doesn’t tell engineering in advance, the result is an outage, unhappy users and lost business.

None of this is a reason to build a fleet on day one: a young product scales vertically, because many machines make deployment harder, and moves to horizontal scaling when it has to; anything earlier is premature optimization. The blog went past that stage in Lecture 1; it already runs three servers behind a load balancer.

§ 2.3

## Five API servers now. Who feels it?

The campaign goes out, and the fleet is ready: five API servers. Didn’t chapter 1 protect the database? Its caches absorb what they hold, but every request they can’t answer still lands on the database, and a spike brings many of those. There is a catch: every request an API server accepts, it passes on to whatever it depends on: the database, the shared cache, other services.

Before you play it: the campaign goes out and five API servers are ready. Which box gives out first?

[caption] Clip 2·1Five API servers send all their queries to one database that was never scaled. It saturates, the servers time out waiting on it, and the site goes down with it. (The clip starts from a single server to keep the picture small.)

[summary] The clip as text 0:28

- Before the campaign: one API server, one database.

- The campaign goes out. Readers flood in.

- The API fleet scales to five. All five query the same database.

- The database saturates. Queries queue up, then time out.

- The servers wait on it and fail too: a cascading failure.

- Scale the database first, then the API servers.

Before a campaign, one reader goes through a load balancer to one API server, which queries one database. The campaign brings a flood of readers, and the API fleet is scaled to five servers. All five send their queries to the same database, still the same size, so five times the queries converge on it and its load climbs until it saturates. Queries queue and time out; the timeouts travel back to every API server, which fail one after another, and the readers get errors. The database failed first and took everything above it down: a cascading failure. The fix is to scale the database first, then the API servers.

One component falls over, everything waiting on it fails, then everything waiting on those, until users can’t load a page. That chain is a cascading failure, and it sits behind a large share of major outages; Google’s SRE book treats it as a failure class of its own, most often set off by overload sre.google ↗.

So scale from the bottom up. Before a big campaign, make sure the database and every service you depend on can take the load, then scale the API servers, then let users in. Teams you depend on should write down how they scale. And the bottom of the stack is the database: the most critical and most brittle part of your system. When it goes down, everything goes down.

§ 2.4

## How does a database grow?

There are three common moves, in this order: a bigger machine, read replicas, and sharding. The bigger machine comes first because it is a console click, and it hits the same ceiling as before.

Then look at what the traffic is. Most applications read far more than they write, often 90:10 or 99:1, though logging, metrics and chat can be the other way round, so measure yours. A blog is the clear case: many more people read a post than write one. Since you can’t cache all of it, serve those reads from copies of the database.

A read replica is a second database that keeps a copy of the master (also called the primary). The replica connects to the master and asks for changes from where it left off, and the master streams them over that connection, asynchronously. Every write still goes to the master. The database won’t route queries for you. In the plainest version your API server holds two connections, one to the master and one to the replica, and every handler picks: showing a profile uses the replica, publishing a post uses the master.

[figure title] Replication lag, step by step

[figure description] Swim lanes for API server, master and replica, time running down. 1: the API server sends INSERT story 42 to the master. 2: the master commits and acknowledges. 3: a read for story 42 goes to the replica and returns zero rows, a stale read. 4: the replica asks the master for changes since its position and receives story 42; the gap between commit and apply is the replication lag. 5: the same read now returns story 42.

[figure labels] api · api server · master · replica · time · INSERT story 42 · 1 · commit · ok, published · 2 · SELECT story 42 · 0 rows: stale · 3 · changes since · my position? · story 42 · applied · replication lag · 4 · SELECT story 42 · 1 row: story 42 · 5

- The writer presses Publish. The API server sends the INSERT over its master connection, because every write goes to the master.

- The master commits and replies. The writer sees published. The replica does not have the row yet.

- The writer reloads their profile, and story reads use the replica connection. The replica returns nothing: a stale read.

- The replica asks the master for everything after its last position, and the new row arrives. The time between commit and apply is the replication lag.

- The same read now finds the story. Nothing changed in the read path; the lag closed.

Keys: ← → to step · link to a step with #fig-2c/step-3

[caption] Fig 2·cTime runs down. Lanes are the API server, the master and the replica; the red bracket is the window in which a replica read is stale.

Pause and think

In a banking app, which read can go to a replica: the user’s profile, or their account balance?

You send money, and your balance read lands on a replica that hasn’t caught up, so it still shows the old amount. The balance is a critical read and goes to the master.

Which reads can tolerate that window is a decision you make for each read in your code, not a database setting.

Replicas take the reads off the master. They do nothing for writes. When the master still can’t take its writes even on the biggest machine, with the replicas taking the reads, you shard: split the data into exclusive subsets, a third of the users on each of three databases, each one a master with its own replicas. Shards are not copies; each holds only its own rows. In the plainest version the API server routes: it hashes the user’s ID to pick a shard and keeps a connection pool to each. Many vendor database clusters do this for you: a cluster is horizontal scaling that looks like one database while splitting the data across machines. With plain MySQL or PostgreSQL, which don’t shard natively, the routing is yours to write (or an add-on’s).

Hashing with hash(user_id) % N has a trap: change N and almost every user moves, so real routers use consistent hashing or fixed buckets, which Lecture 9 builds.

There is no formula for how to shard; you study the data and how it is read, then decide. Letting replicas accept writes too, multi-master, brings write conflicts whose resolution depends entirely on the use case, which is why sharding is the usual way to scale writes.

[summary] Go deeper: how many replicas, and who takes over? limits worth knowing

Every replica costs the master some CPU and network to feed it, so you don’t hang dozens off one master. About five per master is a common rule of thumb (the real limit depends on write rate and machine size; RDS MySQL caps it at 15). To reach 15, build a tree: five replicas that each feed two more. If the master dies, someone must promote a replica: RDS read replicas are promoted by you, while Aurora promotes one automatically, usually within a minute docs.aws.amazon.com ↗.

The campaign lands and the site holds. Reads now have many places to go. Every write still lands on one master, though, so look closely at what a write request asks for. The most important write on a blog is a writer pressing Publish.

Lecture 02, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-delegation ===

# Medium under load, chapter 3: Publishing a story does too much

Lecture 02 · Medium under load · chapter 3 of 6

§ 3

## Publishing a story does too much

About 10 min

Every author’s profile should show how many stories they have written. You store the number in a total_blogs column on the users table, so a profile view needs no join, and add one on every publish.

[figure title] The blog so far

[figure description] The blog so far: browser, CDN, load balancer, API servers with their RAM and disk caches, a shared cache and the database. Marked new: five API servers instead of three, and read replicas that pull changes from the database.

[figure labels] new · reader · browser · cdn · lb · api ×5 · ram · disk · shared cache · db · replicas · pull · the blog so far

[caption] Fig 3·aThe blog so far. Marked new: five API servers instead of three, and read replicas that pull changes from the database.

The obvious place for that +1 is inside the publish request, right after the story is saved.

§ 3.1

## What has to happen before the writer sees “published”?

One +1 is cheap, but it is never just one. Today the count, tomorrow the search index, then an email notification; each job added inline slows every publish and lands one more write on the database at the same instant as everyone else’s. At a campaign peak, those writes pile onto the one master that chapter 2 called the most brittle part of the system.

So decide which work belongs in the request. In a talk in 2020, a VP of engineering at the Indian streaming service Hotstar described the rule its API side lives by to handle massive scale: whatever does not need to be done in real time should not be done in real time.

“Real time” here means inside the request, which ends the moment the client gets its response. Saving the story is essential; the count on the profile is not. Nobody is hurt if it says 74 for a few seconds after the 75th story goes up. The writes still reach the database; what changes is when, and who sets the pace.

The same test sorts most work: long-running jobs (launching a server, encoding a video), heavy queries, writes that can be batched, and anything allowed to be eventually right belong outside the request.

§ 3.2

## Who does the rest, and when?

The pattern is delegate and respond: the API server records a task in a buffer called a broker and replies at once, and workers read the broker, do the heavy lifting and update the database.

[figure title] The blog count, delegated

[figure description] The users table keeps a total_blogs column, stored pre-computed so the profile needs no join. When a writer publishes, the API server drops an ON_PUBLISH message into SQS (dashed: asynchronous) and answers. Three workers take messages from SQS and each runs total_blogs++ in the database. An ON_DELETE event does total_blogs-- the same way.

[figure labels] users: id · name · bio · total_blogs · stored pre-computed to skip the join · (a crude example) · writer · api · ON_PUBLISH · sqs · total_blogs++ · worker · worker · worker · db · ON_DELETE → total_blogs--

[caption] Fig 3·bThe blog count, delegated. The API server drops an ON_PUBLISH message into a queue and answers; whichever worker takes the message runs total_blogs++.

For the blog: the author publishes, the API server puts an ON_PUBLISH message into a broker such as SQS or RabbitMQ, and a worker picks it up and runs the update:

UPDATE users SET total_blogs = total_blogs + 1 WHERE id = :author;

A deleted story sends ON_DELETE. The price is a delay: the author sees the new count on the next refresh.

Treat the database like a new, expensive phone: put a cover on it. The broker is the heart of the pattern, and it comes in two kinds: message queues and message streams.

§ 3.3

## What holds the work in between?

In a message queue such as SQS or RabbitMQ, consumers that all run the same code take messages out. Each message goes to one consumer at a time, hidden from the others; when done, the consumer deletes it, a delete you write after the processing. If the consumer crashes first, the message’s visibility timeout runs out (30 seconds by default in SQS) and it reappears for another consumer. A dead-letter queue, if you configure one, catches a message that keeps failing docs.aws.amazon.com ↗.

Notice the guarantee: SQS standard queues deliver each message at least once. A copy can occasionally arrive twice, so every consumer has to cope with seeing a message again docs.aws.amazon.com ↗.

§ 3.4

## Search wants the same event

Next the search team wants every new story indexed in Elasticsearch. The quickest change: the worker already receives ON_PUBLISH, so let it bump the count and write the index entry.

Two teams now share one worker’s code, and one team’s change blocks the other’s deploy. Then the machine problem; predict both numbers before each click.

[figure title] Two writes, one crash

[figure description] Lanes for one worker, the database's total_blogs and the search index's count, time running down. 1: both read 74 and an ON_PUBLISH message reaches the worker. 2: the worker's first write succeeds; total_blogs is 75. 3: the worker crashes before writing to Elasticsearch; count 75, search 74. 4: the message is retried and both writes run again; count 76, search 75, still inconsistent. 5: doing two things in one shot is always a problem in a distributed system.

[figure labels] sqs · worker · two teams’ jobs, · one worker · db · es · total_blogs · indexed · time · ON_PUBLISH · 74 · 74 · 1 · total_blogs++ · 75 ✓ · 2 · crash before the es write · 75 · 74 · 3 · retry · 76 ✓ · 75 ✓ · still don’t match · 4 · doing two things in one shot · is always a problem · 5

- A new story is published. Both numbers read 74, and one ON_PUBLISH message reaches the worker, which must now do two writes.

- Write 1 succeeds: total_blogs is 75.

- The worker crashes before indexing. Count 75, search 74.

- The message comes back and both writes run again. Search is now right at 75, but the count says 76 for 75 stories.

- Doing two things in one shot is always a problem in a distributed system.

Keys: ← → to step · link to a step with #fig-3c/step-3

[caption] Fig 3·cTime runs down. The lanes are one worker, the database’s total_blogs and the search index’s count; the red rings mark a count and an index that disagree.

Any machine can die between two writes, and making two stores’ writes atomic needs a costly distributed transaction. The deeper fault is one worker owning two teams’ jobs; each should see every event and fail alone. Splitting them won’t stop a retry repeating a write (that returns in 3.7), but it stops one team’s failure re-running the other’s work.

§ 3.5

## What would let each job go at its own pace?

A single queue can’t give you that: each message goes to one consumer at a time, which deletes it when done, so only one kind of job ever processes it. You could copy every event into one queue per team (SNS in front of several SQS queues does exactly that), but nothing keeps the history for a consumer that wants to go back. A message stream, such as Kafka or Amazon Kinesis, doesn’t take messages out. They stay in the stream until a retention period you choose runs out (seven days by default in Kafka), and consumers iterate over them; nobody deletes anything.

Before you play it: Elasticsearch goes down for ten minutes. In the stream, does the counter have to wait for search?

[caption] Clip 3·1The same five ON_PUBLISH events go to a queue and to a stream. The queue hands each to one worker, which deletes it. The stream keeps them, and the search and counter consumers each move at their own pace; when Elasticsearch is down only search waits.

[summary] The clip as text 0:34

- Same five events. Top: a queue. Bottom: a stream.

- Queue: each message goes to one consumer, which deletes it when done.

- Stream: messages stay. Each consumer type keeps its own position.

- Search is down. The counter keeps going at its own pace.

- Search comes back and picks up where it stopped.

- Nobody deletes from a stream. Old messages expire by retention.

The same five ON_PUBLISH messages go to two brokers. Top, a queue (SQS) with three identical count++ consumers: each message is taken by exactly one consumer, which processes it and deletes it, so the queue ends up empty. Bottom, a stream (Kafka) with two different consumers, search (writing to Elasticsearch) and counter (writing to the database): the messages stay in the stream, and each consumer has its own position that moves over them at its own pace. When Elasticsearch goes down, the search position stops while the counter keeps moving to the newest message; when Elasticsearch is back, search continues from where it stopped and catches up. No consumer deletes anything from the stream; the oldest messages disappear only when the retention policy expires them.

A queue suits identical consumers doing one job; a stream suits different consumers that each want every message. On the blog, the publish event goes into Kafka once, and the counter service and the search service each read it with their own code, owned by their own team.

Notice what the stream did not do: it never made the two writes atomic. It works because the count and the index are independent jobs that may lag and catch up. When two stores must agree at every moment, you still need a distributed transaction.

Why not a stream for everything? Cost: SQS bills per request, while a stream runs all the time (Kinesis bills per shard-hour), so one small job belongs on a queue. When several kinds of consumer need the same events, Kafka is the usual default, but it isn’t salt to sprinkle on every system. Labels blur, too: RabbitMQ, known as a queue, now has persistent streams, so check what a tool does today rather than repeating “X can’t do Y”.

§ 3.6

## How does one topic spread over many machines?

In Kafka, messages go to a topic, here ON_PUBLISH, split into partitions; Kafka hashes each message’s key to choose one. Key by user_id and every story from one author lands in the same partition, in the order published. That order can justify a stream even for one job. One team moved from SQS to Kinesis because their standard SQS queue handed several messages about one record to different workers at once; with a key, all of a record’s events reach one consumer, in order, which can also cache and batch them.

[figure title] A topic and its partitions

[figure description] The topic ON_PUBLISH is one pipe split into three partitions, p0, p1 and p2. The producer gives each message a key, user_id; Kafka hashes the key to pick a partition, here p1. Both stories by author u7 land in p1, one after the other; stories by u3 and u9 land in p0 and p2. Within a partition messages are ordered; across partitions there is no order guarantee.

[figure labels] ON_PUBLISH · key = user_id → hash → p1 · producer · p0 · p1 · p2 · u3 · u7 · u7 · u9 · u7 → always p1 · in a partition: ordered · across partitions: no order guarantee

[caption] Fig 3·dThe ON_PUBLISH topic with three partitions. The key is hashed, so both of u7’s stories land in p1.

That order holds only within a partition; across partitions there is no global order. (Size the count to the consumption rate you expect, and choose it up front: add partitions later and keys start landing elsewhere, and you can’t remove them.)

Consumers of one kind form a consumer group, and Kafka decides which one reads which partition.

Pause and think

The topic has 3 partitions. Search is slow, so you start 5 search consumers in one group. What do consumers 4 and 5 do?

In a consumer group each partition goes to exactly one consumer, so with 3 partitions at most 3 consumers work. Parallelism equals the number of partitions.

Why not two consumers per partition? Kafka would have to track who took which message and could no longer keep the partition in order, so a classic group gives each partition one owner. The cap applies per group, and fewer consumers than partitions is fine: one consumer reads several. Kinesis works the same way and calls partitions shards.

[summary] Go deeper: when three workers aren’t enough a common shape

Notification systems often have a few Kafka consumers copy messages into SQS, where a hundred workers do the slow sending.

§ 3.7

## A consumer crashes mid-batch. What comes back?

How does a consumer resume after a restart? It commits: it tells Kafka how far its group has read, and Kafka stores that position. Consumers commit in batches, in your code or through auto-commit settings you chose.

[figure title] Commit, crash, resume

[figure description] A partition with offsets 0 to 7, read by the counter consumer. 1: it reads and processes offsets 0 to 3 (total_blogs +4) and commits, so Kafka records the group's position as 4. 2: it reads and processes 4 to 7 (+4). 3: it crashes before committing; the committed position is still 4. 4: a new consumer resumes from 4 and processes 4 to 7 again, so total_blogs gets +4 a second time: at-least-once. 5: in a queue you delete; in a stream you commit.

[figure labels] partition p1 · counter · 0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · committed · 1 · read + process 0–3 · total_blogs +4 · commit → 4 · 2 · read + process 4–7 · total_blogs +4 · still at 4 · 3 · crash before commit · 4 · resume: re-read 4–7 · total_blogs +4 again · at-least-once · 5 · queue → delete · stream → commit

- The consumer reads offsets 0–3, processes them (total_blogs +4) and commits. Kafka records the group’s position: 4.

- It reads 4–7 and processes all four (total_blogs +4 again).

- The consumer crashes before committing. The committed position is still 4.

- A new consumer resumes from the last commit, 4, and processes 4–7 a second time: total_blogs gets +4 twice.

- In a queue you delete a message when you are done. In a stream you commit.

Keys: ← → to step · link to a step with #fig-3e/step-3

[caption] Fig 3·eOne partition read by the counter consumer. The green caret is the group’s committed position; blue marks what was read and processed.

Kafka delivers at least once by default. It offers exactly-once processing only between Kafka topics; a write into your own database needs your help, by making the write safe to repeat or storing the position with the data kafka.apache.org ↗. The simple rule: every consumer must be fine seeing the same message twice. For the counter, that can mean storing the consumer’s position in the same database transaction as the +1, so a replay can tell those messages were already counted.

So the counter can still count a story twice. A second way to get a count wrong needs no crash at all. It shows up on a number readers change all the time: claps.

Lecture 02, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-concurrency ===

# Medium under load, chapter 4: Two readers clap at the same instant

Lecture 02 · Medium under load · chapter 4 of 6

§ 4

## Two readers clap at the same instant

About 5 min

Readers clap for posts they like, and each post keeps a running count. A post with 100 claps is open on two screens, and both readers press the button in the same instant.

[figure title] The blog so far

[figure description] The blog so far: browser, CDN, load balancer, five API servers, shared cache, database and read replicas. Marked new: the API servers hand each publish event to Kafka, where a counter consumer updates total_blogs and a search consumer indexes the story in Elasticsearch.

[figure labels] new · reader · browser · cdn · lb · api ×5 · ram · disk · shared cache · db · replicas · pull · kafka · counter · search · total_blogs · elasticsearch · the blog so far

[caption] Fig 4·aThe blog so far. Marked new: publish events go into Kafka, where a counter consumer and a search consumer each read them at their own pace.

Those two claps arrive at two API servers, or two threads of one server, at the same moment. That is normal: servers run many requests at once on many threads, which is how one machine earns its keep. It is called concurrency, and it has to give you both correct data and high throughput, which is what makes it hard. It brings two kinds of trouble: threads must tell each other things (“I’ve handled this one, don’t do it again”), and they must not trip over a resource they share. The claps are about to hit the second.

§ 4.1

## Where did the clap go?

Each clap request reads the post’s count, adds one, and writes it back.

Pause and think

The count is 100. Two clap requests run at the same instant, each doing read, add one, write. What can the count end at?

Both requests read 100 before either writes. Each adds one and writes 101; the second write lands on top of the first. Two claps went in and the row says 101. Whether you get 101 or 102 depends only on timing.

The culprit is that count++ looks like one operation and isn’t. It is three steps: read, add, write. When two threads interleave those steps, one thread’s write silently erases the other’s. This is a textbook race condition, and it has nothing to do with databases: two threads that each run count++ a thousand times on a shared integer should reach 2,000.

Before you play it: two threads, a thousand increments each. How many of the 2,000 do you expect to lose?

[caption] Clip 4·1Two threads, 1,000 increments each, on one counter. Slowed down, two claps on 100 give 101. At full speed it happens a few times, silently, and the counter stops near 1,997. With each increment made one indivisible step, it lands on 2,000.

[summary] The clip as text 0:38

- Two claps at once on a count of 100. Each thread runs count++.

- count++ is read, add one, write. Both threads read 100.

- Both write 101. One clap is lost: it should be 102.

- Now from 0, sped up to 1,000 each: it happens again, silently.

- Expected 2,000. Got about 1,997.

- Again, with each +1 as one indivisible step: nothing is lost.

- Made atomic, the two claps on 100 give 102.

Two threads share one counter that holds 100, and two claps arrive at once, each a count++. count++ is a read, an add and a write, so both threads read 100, both add one and both write 101: the counter shows 101 where it should show 102, and one clap is lost. Then the same race from 0, sped up, with each thread running count++ 1,000 times: it happens again now and then without any error, and the counter ends at about 1,997 instead of 2,000. Run again with each increment as one indivisible atomic step, the counter ends at 2,000, and the two claps on 100 give 102.

Nothing crashed and nothing logged an error. That is what makes a lost update dangerous: the number is simply wrong.

§ 4.2

## Can a lock in your code fix it?

The standard answer is a lock that protects the critical section, the few lines where the shared value is read and written. Picture a traffic signal at a crossroads: the middle of the junction is the critical section, one road gets green at a time, and every other road waits at red.

[figure title] A traffic signal

[figure description] A crossroads seen from above. The square where the four roads meet is the critical section: only one car may be in it. The road from the south has a green signal and its car is crossing; the other three roads have red signals and their cars wait. One road at a time is what a lock does.

[figure labels] critical section · stop · stop · stop · go · one road at a time = a lock · the others wait until it is their turn

[caption] Fig 4·bThe junction is the critical section. One road has green; the other three wait at red.

That is pessimistic locking: shut everyone else out while one thread uses the resource, with a mutex, then let the next one in. Correct, but every thread waiting at red is throughput you gave up. Optimistic locking takes no lock: it lets both threads work, checks at write time whether anyone changed the value underneath (a version number, say), and retries if so.

[summary] Go deeper: semaphores, atomics, CRDTs other tools for the same race

A semaphore works as a lock only with a single permit; one that admits two threads would not protect count++. A single counter can skip locking with an atomic increment (Java’s AtomicInteger). Data replicated across machines can use CRDTs, data types that merge concurrent updates without coordination.

For the clap, none of these lives in the right place. The two claps may land on two different API servers, and a mutex in one server’s memory can’t be seen by another. The one place both requests meet is the row.

§ 4.3

## Who should do the +1?

So give the problem to the row’s owner: the database. Don’t read the count into your code and write it back. Ask the database to do the addition:

UPDATE blogs SET claps = claps + 1 WHERE id = 42;

The database applies that update to the latest committed value of the row, so two concurrent claps on 100 end at 102 postgresql.org ↗. Wrapping your own read-then-write in an ordinary transaction is not enough: under the default isolation level, both transactions can still read 100 and both write 101. If your code truly must read first and decide, lock the row while you do, with SELECT … FOR UPDATE.

Put this next to the end of chapter 3 and you have two different ways a counter goes wrong. A lost update comes from two writers racing, and the atomic +1 fixes it. A double count comes from a message delivered twice, and the atomic +1 does nothing for it, because each delivery is a perfectly correct increment; that one is fixed by making the write safe to repeat.

The count is now right. But the reader on the other screen still sees 100, and will until they press refresh.

Lecture 02, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-communication ===

# Medium under load, chapter 5: Can the other reader see the clap without refreshing?

Lecture 02 · Medium under load · chapter 5 of 6

§ 5

## Can the other reader see the clap without refreshing?

About 9 min

Two people are reading the same post. One claps. The product team wants the other to see it happen, a little animation and the count ticking up, without touching anything. Twitter does this with likes on a celebrity’s post, Instagram with hearts on a live video.

[figure title] The blog so far

[figure description] The blog so far: the route with its caches, five API servers, the database with replicas, and Kafka with a counter and a search consumer. Marked new: a clap is one atomic step in the database, claps = claps + 1.

[figure labels] new · reader · browser · cdn · lb · api ×5 · ram · disk · shared cache · db · replicas · pull · claps = claps + 1 · kafka · counter · search · total_blogs · elasticsearch · the blog so far

[caption] Fig 5·aThe blog so far. Marked new: a clap is one atomic step in the database, claps = claps + 1.

This is a question about communication, the most neglected part of system design. Most designs expose an endpoint and stop there, as if that were the only way a client and a server can talk.

§ 5.1

## How does a browser hear about anything?

The usual way is request and response. The client asks, the server does the heavy lifting (reads the database, computes, checks who you are) and answers, like ordering a burger: you ask, the kitchen works, the food comes out. (An endpoint isn’t REST just because it speaks HTTP; REST is an architectural style with its own constraints ics.uci.edu ↗.)

The limit is built into the shape: the server only ever answers. It can’t speak first. So how does a page learn that something changed?

§ 5.2

## What does asking every ten seconds cost?

The simplest way is to keep asking. Launch a server in the AWS console and its status says “in progress”, then turns to “ready” while you watch; live cricket scores on Cricbuzz update the same way. The page’s JavaScript does what you would do by hand: it asks again every few seconds. That is short polling, the simplest tool there is and the usual one for watching a long-running job. The catch is what it costs.

Pause and think

A million readers have a post open, and each page polls for new claps every 10 seconds. How many requests reach your servers per minute?

Every 10 seconds is 6 requests a minute per reader. A million readers make 6 million requests a minute, about 100,000 a second.

And nearly all of them are wasted. A server launch that takes an hour gets an hour of requests that each return the same “in progress”; a post that nobody claps for gets the same count back every time. The server handles a flood of requests to say “nothing new”. Each one is a full HTTP request with its headers; HTTP/1.1 reuses the open connection between polls, so the cost is the sheer number of requests rather than new handshakes developer.mozilla.org ↗.

§ 5.3

## What if the server waited before answering?

Turn it around. The client asks once, and the server doesn’t answer until it has something new. That is long polling. Ask for the server’s status after the launch is acknowledged and the reply comes the moment it is ready; ask for the score and the reply comes when the next ball is bowled.

[figure title] Long polling

[figure description] Time runs down. The client sends one request. The server holds it, without answering, until something changes, such as the next ball being bowled or the server being ready. Then it sends the response. On a timeout the client reconnects and asks again.

[figure labels] client · api · time · REQ · held until · something changes · RES · ball bowled / server ready · timeout → reconnect, ask again

[caption] Fig 5·bLong polling, time running down. One request; the server holds it until something changes, then answers. On a timeout the client asks again.

Requests drop sharply, but the work moves to the server, which now holds one open request per waiting client: for the million readers, about a million held requests instead of 100,000 new ones a second. Hold it the right way: a well-built server parks the request and wakes it when the event arrives, instead of running a loop per request that keeps checking. Keep the wait modest, too, because proxies cut off requests that hang too long; RFC 6202 suggests about 30 seconds, after which the client simply asks again rfc-editor.org ↗.

Does it scale? Yes. A held request is close to a persistent connection, and an event-driven server can hold a great many. The part nobody hands you is the “has it changed?” logic: what counts as new for a server launch, a cricket score or a chat is yours to write. And if the server dies mid-wait, the connection breaks and the client asks again, which is harmless for a score and needs thought for a payment.

§ 5.4

## What if the line stayed open?

Lecture 1’s connection pool kept TCP connections open so a server didn’t pay to open and close one for every query. Do the same between the browser and the server and you have a WebSocket: one persistent, two-way channel. It begins life as an ordinary HTTP request that asks to be upgraded; once the server agrees, the same connection carries WebSocket frames, not HTTP, and wss:// is the encrypted version, as HTTPS is to HTTP rfc-editor.org ↗.

Because the line stays open, either side can send at any time. The server can finally speak first. That is how chat works: when a user sends a message, the server pushes it to the recipient, who never asks “anything new for me?”. Stock tickers, multiplayer games and live meeting chat are built the same way, and so are the live claps. Claps travel both ways, since every reader both sends claps and receives everyone else’s, so the blog gives each reader one WebSocket to a small real-time likes service: a clap goes up the socket, the count is updated, and the new number goes down every other reader’s socket. No setup per message makes every exchange cheap.

Before you play it: a job is ready at 60 seconds. How many requests does each approach make before the browser knows?

[caption] Clip 5·1One piece of news, ready at 60 s, heard three ways: a short poll every 10 s, one held long-poll request, and an open connection the server pushes on.

[summary] The clip as text 0:36

- Say a job is ready at 60 s. How does the browser find out?

- Short polling: ask every 10 s. Each answer: still in progress.

- Long polling: ask once. The server holds the request until it’s ready.

- Push: open one connection and keep it. The server can speak first.

- At 60 s: the 6th poll, the held reply and the push all say ready.

- A million readers polling every 10 s: 6M requests a minute.

- Same news. Polling pays in requests, the others in open connections.

Three lanes, each a browser and a server on one time line, for a job that is ready at 60 seconds (an example). Short polling: the browser sends a request every 10 seconds and each one is answered at once with "in progress", five times, until the sixth poll at 60 seconds gets "ready": 6 requests. Long polling: the browser sends one request, the server holds it open without answering, and replies "ready" at 60 seconds: 1 request. Push over WebSocket or server-sent events: the browser opens one connection that stays open, and at 60 seconds the server sends "ready" on its own. With a million readers polling every 10 seconds, short polling is 6 million requests a minute. Polling pays in requests; the other two hold a connection open instead.

The price is that connections are now state. An idle WebSocket mostly costs memory and a file handle, and one server can hold a very large number of them: WhatsApp reported over 2 million per server blog.whatsapp.com ↗. What is expensive is everything around them: knowing which server holds which reader, and surviving a server crash when all its clients reconnect at once, which they should do with randomised back-off so they don’t arrive as one storm. Scaling WebSockets properly is where Lecture 4 starts, with Slack.

§ 5.5

## What if only the server has anything to say?

Look at the stock ticker again. The browser never sends anything; prices only flow down. You don’t need a two-way channel for that. Server-sent events (SSE) give you a one-way one: the client opens the connection once, and from then on only the server sends. Under the hood it is a single HTTP response that never ends, and the browser’s EventSource reconnects by itself if it drops and, if the server gave its events IDs, tells the server the last one it saw developer.mozilla.org ↗.

[figure title] Server-sent events

[figure description] The client sends one request to subscribe. After that the traffic is one-way: the server keeps the connection open and sends a stream of events to the client, which sends nothing back over it. Used for stock tickers and deployment logs.

[figure labels] client · api · subscribe (once) · events · one-way after that · tickers · deploy logs

[caption] Fig 5·cServer-sent events. The client subscribes once; after that only the server sends.

The TCP connection underneath could carry data both ways; the SSE protocol just gives the client no way to send on it. What you get in exchange is simplicity: MDN’s working example, server and page together, fits on one screen. It fits anything that streams one way: price tickers, deployment logs scrolling in a browser, a remote terminal’s output, and the token-by-token replies of today’s LLM APIs.

A ticker also shows how to think before filtering. Should each client get only the stocks on its watchlist? Do the arithmetic: if every one of about 10,000 listed companies’ prices changes once a second, 10,000 × 4 bytes is 40 KB a second. One client handles that easily, so send everything and filter in the browser. Stay away from complication you don’t need. At a million clients the same stream is 40 GB a second of outbound traffic, and then filtering on the server starts to pay.

Could the claps use SSE instead of the WebSocket? Yes: a clap goes up as an ordinary POST, the page updates its own count straight away, and new counts come down over SSE. It is a common, valid pattern; Lecture 4 picks the channel for Slack. The blog keeps one socket because claps flow both ways, but there is no universal winner. WebSockets cost the most to operate (routing, reconnect storms), short polling suffers in a surge, long polling suits waits of a few seconds; choose by the conversation you have. Then build the hello-world version of each, because until you do, it is just boxes on a diagram.

[summary] Go deeper: a WebSocket behind a load balancer if you deploy one

A WebSocket starts as an HTTP request, so the load balancer must understand the upgrade (nginx needs the headers forwarded explicitly). Once upgraded, each connection stays pinned to one server for its life, so plain WebSockets need no sticky sessions; libraries that fall back to long polling do. Watch idle timeouts too (60 s by default on AWS’s ALB and in nginx): send pings to keep quiet connections alive nginx.org ↗.

Every one of these channels needs the reader’s page open and connected to you. Close the tab, or let the phone lock the app, and none of them can reach the reader.

Lecture 02, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-closed-app ===

# Medium under load, chapter 6: The app is closed. Can you still reach the reader?

Lecture 02 · Medium under load · chapter 6 of 6

§ 6

## The app is closed. Can you still reach the reader?

About 7 min

Every channel in chapter 5 needs a live connection from the reader’s page to your servers. A phone puts apps to sleep in the background, and a sleeping app holds no socket. Yet calendar reminders and “someone replied to you” banners arrive on a locked phone all day.

[figure title] The blog so far

[figure description] The blog so far: the route with its caches, API servers, database with replicas, Kafka with two consumers, and claps added by the database. Marked new: a WebSocket kept open between the reader and a real-time likes service on the server side, which carries live claps.

[figure labels] new · reader · browser · cdn · lb · api ×5 · ram · disk · shared cache · db · replicas · pull · claps = claps + 1 · kafka · counter · search · total_blogs · elasticsearch · websocket: live claps · the blog so far

[caption] Fig 6·aThe blog so far. Marked new: a WebSocket between each reader and the real-time likes service on the server side, which carries live claps.

§ 6.1

## Who delivers to a sleeping phone?

Not you. Remember marketing’s campaign in chapter 2? Every push notification it sent took this path. Push notifications go through a service run by the platform: Firebase Cloud Messaging for Android (GCM’s successor; Google deprecated GCM in 2018 and announced its removal for April 2019), Apple’s APNs for iPhones. Your server hands the notification to that service, and the phone’s operating system keeps one connection to it, shared by every app, and wakes the right app when something arrives. One shared connection is what makes it efficient; keeping a separate connection open for every app would be very wasteful.

[figure title] The push path

[figure description] Your server sends a notification to FCM or APNs, a push service you do not run. The phone's operating system keeps one shared connection to that service for all apps, opened by the device, and hands each notification to the right app. Delivery is best-effort, so a notification may drop. Separately, a calendar app raises a local notification through the OS with no network at all.

[figure labels] your server · notification · fcm / apns · not yours · may drop · one shared · connection · for all apps · phone · os · app · app · app · calendar · local notification, · no network

[caption] Fig 6·bThe push path. Your server hands the notification to a push service you don’t run; the phone keeps one connection to it for all apps. A calendar reminder never leaves the phone.

So push is a different thing from WebSockets and SSE, with different guarantees and a protocol you don’t control. Delivery is best-effort: APNs keeps only one pending notification per app and may drop or reorder them developer.apple.com ↗. You can imitate it with SSE or periodic checks while the app is open, but you can’t build it that way. The calendar reminder is the exception that proves it: the app scheduled a local notification on the phone itself, so it fires with no network at all.

Services such as OneSignal and Twilio now turn this into an API call; one team in 2015 had to build it directly on GCM and APNs because SNS delivered badly and OneSignal had only just started. Integrate with FCM once anyway, from its documentation; you will understand what those services do for you.

§ 6.2

## What does each hop of the blog speak?

Count the kinds of connection the blog now uses: HTTP from the browser, pooled connections to the database and to Redis, a socket for live claps, the phone’s link to FCM. They are not the same thing. The reader talks to the API server in HTTP, over TCP. The API server talks to the database over a TCP connection it keeps open, the pooled kind you met in Lecture 1, and not a WebSocket: each database has its own wire protocol, the MySQL protocol, PostgreSQL’s frontend/backend protocol, MongoDB’s wire protocol. Redis has its own too, called RESP. Live claps travel over a WebSocket to the likes service.

[figure title] Medium, hop by hop

[figure description] A reader talks to the API server over HTTP. The API server holds persistent TCP connections to the database, speaking its wire protocol, and to Redis, speaking RESP. For live claps the reader keeps a WebSocket open to a real-time likes service; a second reader on the same story has one too, and sees the clap appear without refreshing.

[figure labels] reader · api · HTTP · RESP · redis · persistent TCP · wire protocol · db · realtime likes · WS · WS · co-reader · sees the clap, no refresh · twitter likes · medium claps · instagram live hearts

[caption] Fig 6·cThe blog, hop by hop. Each hop speaks its own protocol; only the live claps need a channel the server can push on.

A protocol is an agreement on how to lay a message out in bytes so both ends can read it. A database wire protocol says how a SQL query is framed on the connection. MySQL’s, for example, sends a length, a sequence number, a command byte, then the query text. HTTP, WebSocket and SSE each define their own message format the same way. And HTTP/1.1 connections are persistent too: they stay open by default and are reused, until one side says Connection: close or the idle timeout ends them. Underneath, these protocols need a reliable stream, which is usually TCP; HTTP/3 is the notable exception, running over QUIC on UDP.

§ 6.3

## What you can now do

[figure title] The blog so far

[figure description] The blog at the end of this lecture: browser, CDN and reverse-proxy caches, five API servers with RAM and disk caches, a shared cache, the database with read replicas and atomic claps, Kafka with counter and search consumers, and a WebSocket to a real-time likes service for live claps. Marked new: a push service, FCM or APNs, that reaches readers whose app is closed.

[figure labels] new · reader · browser · cdn · lb · api ×5 · ram · disk · shared cache · db · replicas · pull · claps = claps + 1 · kafka · counter · search · total_blogs · elasticsearch · websocket: live claps · push service · fcm / apns · the blog so far

[caption] Fig 6·dThe blog at the end of this lecture. Marked new: a push service for readers whose app is closed.

- Keep copies all along the route. Browser, CDN, reverse proxy or gateway, API-server RAM, API-server disk, shared cache, materialized view. Local copies give up consistency between servers, so use them for data that rarely changes, with an expiry and a size cap.

- Plan capacity by division. Machines = forecast peak ÷ one machine’s load-tested capacity. Raise capacity before a known spike; reactive autoscaling arrives late.

- Scale from the bottom up. The database and every dependency first, then the API servers. Grow the database with a bigger machine, then read replicas, then shards. Decide which reads are critical, such as an account balance, and send those to the master; everything that can be a little old goes to a replica.

- Keep the request to the bare minimum. Delegate the rest through a broker: a queue for one kind of work, a stream when several consumers each need every event. Expect every message at least once.

- Let the database add. claps = claps + 1 in SQL prevents lost updates; a write that is safe to repeat prevents double counts.

- Pick the channel by the conversation. Short polling is simple and costs requests; long polling holds one request per client; a WebSocket is two-way and stateful; SSE is one-way and simple; push reaches a closed app through the platform.

§ 6.4

## What comes next?

Why can each API server keep a published post in its own memory, but not the post’s clap count?

[summary] Show answer

Each server holds its own copy and no server sees the others’. A published post almost never changes, so two slightly different copies for the length of an expiry hurt nobody. A clap count changes constantly, so different servers would show different numbers.

A load test says one API server handles 100 requests a second, and marketing forecasts 500 a second at the campaign’s peak. What do you do, and in what order?

[summary] Show answer

Five API servers. But first make sure the database and every other dependency can take the queries that 500 requests a second bring, or the extra servers just pass the overload down and the whole site cascades. Raise capacity before the message goes out, then let marketing send.

A topic has 3 partitions and you run 5 search consumers in one group. Then one consumer crashes after processing a batch but before committing. What happens in each case?

[summary] Show answer

Two of the five get no messages, because each partition goes to one consumer in a group. After the crash, the batch is read again from the last commit, so its messages are processed twice: at-least-once delivery.

Name the two ways a counter goes wrong in this lecture and the fix for each.

[summary] Show answer

A lost update: two writers read the same value and one write erases the other; fix it with an atomic update in the database, claps = claps + 1. A double count: a message is delivered or processed twice; fix it by making the write safe to repeat.

The claps came out right because the database added one to one row in one step. Most real problems are not that kind. A whole flight of passengers checking in at the same moment all want seats, and each one has to see what is free before taking one. Lecture 3 opens the database to see how locks hold that together, watching them work live on an airline check-in, then builds a key-value store on top of MySQL.

Lecture 02, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

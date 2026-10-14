=== PAGE: lecture overview ===

Lecture 05 · week 3, day 1 · running case: a load balancer you build yourself

# Building a load balancer

How to approach any distributed system, shown by building the box everyone draws and nobody opens, and then by locking things across machines.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1How to approach distributed systemsA definition that holds up, the assumption that keeps a design honest, and the day-zero loop every real system grows by.3 sections · §1.1–1.3

- 2Choosing a backend: load balancing algorithmsRound robin, weighted round robin and least connections, each tied to a kind of infrastructure and a kind of load.6 sections · §2.1–2.6

- 3A load balancer on one laptopAccept a TCP connection, open another, copy bytes both ways: the ten lines that make a load balancer, and how to run it locally.5 sections · §3.1–3.5

- 4The control plane: keeping every LB server rightConfiguration, health checks, pushing changes instead of polling, and metrics in Prometheus so the LB fleet can scale itself.6 sections · §4.1–4.6

- 5One name, many LB serversDNS answers and never forwards, private CoreDNS, the finished design with its two paths, and who watches the watcher.7 sections · §5.1–5.7

- 6Remote locksThree consumers, one queue that protects nothing: a lock on the network, why it must expire, and how not to delete someone else’s.8 sections · §6.1–6.8

- 7Distributed locksWhen the lock store dies: a majority of five independent Redis nodes, its edge case, and why distributing is not scaling.5 sections · §7.1–7.5

- 8What to keepThe heuristics from both halves, every box and how it stops being a single point of failure, and what comes next.

[summary] About this class where this page sits in the course

This is day 1 of week 3, and week 3 is all about distributed systems. The next session, tomorrow, covers distributed ID generators. coming later · Lecture 6: distributed ID generators

The board’s agenda for this session had four items: how to approach designing a distributed system, designing a load balancer, remote and distributed locks, and synchronizing consumers. The first one is about approach, not theory, and there is no secret sauce to it. The load balancer gets a very realistic design plus a short walk through the source code of a tiny load balancer written for the class, to see the core logic rather than just draw boxes; that code is in no way production-ready. Remote and distributed locks came after the break, and this page keeps the class’s order.

How to study this page. Real design discussions run three or four hours straight, and covering a system has to happen in one go, because re-setting the context costs about 20 minutes; so read a chapter in one sitting. Advice for sessions this long: keep your phone in another room, and keep pen and paper beside you to scribble on. Sketch rather than type, because a browser is one click away from every distraction.

### The load balancer so far #

So far in this course the load balancer has only been a box. In Lecture 2 Medium’s API servers scaled out behind one. The pieces this lecture builds it from are already here. Lecture 1’s online indicator turned heartbeats into a failure detector, and chapter 4 turns them into health checks. Lecture 3 locked rows inside one database for an airline check-in, and chapters 6 and 7 do the same across machines. Lecture 4 pushed Slack’s membership changes over Pub/Sub, and chapter 4 pushes configuration the same way.

[figure title] The load balancer so far

[figure description] A client sends requests to the load balancer, so far a closed box, which forwards them to the API servers, as in Lecture 2. Three pieces from earlier lectures point into the box: heartbeats from Lecture 1 become the health checks of chapter 4, the row lock from Lecture 3 becomes the remote locks of chapters 6 and 7, and Pub/Sub from Lecture 4 becomes the config push of chapter 4.

[figure labels] lb · so far: a closed box (Lecture 2) · api · heartbeats (Lecture 1) · → health checks, §4 · row lock (Lecture 3) · → remote locks, §6–7 · pub/sub (Lecture 4) · → config push, §4

[caption] The load balancer so far: a closed box in front of the API servers, as Lecture 2 left it. Three pieces from earlier lectures point into it, and this page uses each one to open the box.

This page opens the box. After a chapter on how to approach any distributed system and one on load-balancing algorithms, it starts with one TCP proxy on one laptop and grows a chapter at a time. From there on, each chapter starts with whatever broke at the end of the one before.

Lecture 05 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-approach ===

# Building a load balancer, chapter 1: How to approach distributed systems

Lecture 05 · Building a load balancer · chapter 1 of 8

§ 1

## How to approach distributed systems

Before building anything: a definition that holds up, the one assumption that keeps a design honest, and the loop every real system grows by.

About 9 min · class 00:09–00:18

You are about to design something that runs on many machines. Where do you start, and what does “distributed” even promise?

This chapter answers both before any box is drawn. The load balancer built in the chapters after it is built exactly this way: one machine first, then each part scaled, broken and fixed in turn.

§ 1.1

## What “distributed” means

Not a bunch of machines: one coherent system, from the outside.

About 3 min · class 00:09–00:12

“Distributed systems” is, in this lecture’s view, one of the most misused terms in the age of social media: people call anything a distributed system. It isn’t that simple.

What a distributed system gives you is the ability to abstract out the distributedness. Behind it, a huge set of machines each do their own job; to an outsider it is one single coherent system. The board put it in one line: multiple components on multiple machines form a single coherent system, which solves a bigger problem.

The outsider is contextual. It may be an end user, another microservice or an internal portal; whoever it is, the complexity of running on different machines is hidden from them, and they see one system.

Facebook.com is one website to its users, and a college student may well think they could build it. At scale, though, many different kinds of services have to interact just to render a simple home feed. That hidden cooperation is what a distributed system is about.

It is tempting to think that any set of remote machines talking to each other is a distributed system. It isn’t: many people believe they have one when all they have is a bunch of remote machines talking to each other. What it takes to deserve the name is the subject of 1.3.

[summary] Why this subject gets skipped skip unless you like the history

In the instructor’s own degrees, distributed systems was one of the most neglected subjects: no one wanted to take it. Yet as soon as people enter industry, distributed systems are everywhere. The core algorithms in the literature are the theoretical foundation; it is when real systems are discussed that you see how those pieces fit into place.

### Love it, hate it #

A professor who had published many papers on distributed systems used to say that you fall in love with distributed systems if you understand them well, and you hate them when you understand them well.

The hate part: imagine a distributed transaction during which things break, and the data lands in an inconsistent state you never considered while designing. That is data corruption. The love part: when you start building one, it is great, because you can scale horizontally.

The reason for the hate is on the board: “The best and the worst thing about distributed systems is: anything that could go wrong would go wrong.” Murphy’s law. A condition you were sure would never happen happens the next day and takes your system down, and if you don’t handle such a scenario, you are not guaranteeing the correctness of your system.

The rule for this whole chapter

Assume anything and everything will go wrong, then check whether your code and your system handle it.

This is the key idea for approaching any distributed system, taken literally. Every condition you were tempted to skip as “never happens”: a crash, a slow response, a cut network link. Write it down, then ask what your code does when it happens.

[figure title] Anything that can go wrong

[figure description] One server with three things that will go wrong sooner or later, each with a question mark: it crashes, it lags, and its network link is cut.

[figure labels] server · crash ? · lag ? · partition ?

§ 1.2

## Day zero, then scale each component

Start with one of each. Grow by a loop, not by a plan for a million users.

About 3 min · class 00:12–00:15 and 00:44

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

A team is about to build “for a million users”, and it is their first day. Where should they start?

What follows is one engineer’s approach, “so take it with a pinch of salt”, though it has worked extremely well for the truly distributed systems it was used on. Always start with the day-zero architecture, and don’t overcomplicate it: one machine, one server, one database, one cache. That’s it.

Then scale each component independently, see how it performs under load, rectify the system, re-architect, and repeat.

[figure title] The day-zero loop

[figure description] Day zero is one of each: one server, one database, one cache. From there a loop: scale each component, see how it performs under load, rectify the system, re-architect, and repeat. Each turn zooms in on a finer, lower-level detail to fix.

[figure labels] server · db · cache · day 0: one of each · scale each component · see how it performs · under load · rectify · re-architect · and repeat · each turn: zoom in, find the next detail to fix

[caption] Fig 1·aDay zero is one of each; everything after it is a loop. Scale a component, load it, fix what breaks, re-architect, repeat. Redrawn from the class board at 00:10–00:12.

When you watch how the system performs under load, the high-level picture isn’t where the trouble is. The low-level details are the pain points. That is where the time goes: understanding what happens at the code level in the service you wrote, what is going wrong, and how to fix it. The load balancer in this lecture is taken down to that level.

This is the incremental approach to system design, and since system design is about building distributed systems, it fits. In complex systems you will always see people iterate this way: day zero, then scale independently, step by step.

It is like looking at a culture under a microscope. You zoom in and find something; you zoom further into finer detail and see a whole new world. Each turn of the loop zooms in on granular details and fixes them.

The opposite habit gets a blunt verdict: thinking about scale on day zero is the worst way to build a system. Think simple. The load balancer starts exactly this way, as one machine, in 3.2.

§ 1.3

## Every layer must scale out

Autoscaled API servers are one layer. Check all of them, and know what one server can carry.

About 3 min · class 00:14–00:18

“We have autoscaling on the API servers, so we’re horizontally scalable.” This section is about why that sentence isn’t enough.

Why build a distributed system at all? It handles scale with a large number of machines, but more importantly it must be horizontally scalable: that is precisely why you build one. The board’s list under “Why distributed systems?” reads: scale, horizontal scalability, fault tolerance.

Horizontal scalability doesn’t come from having more machines, or from a set of API servers that scale automatically. Nor does it mean an autoscaling policy that triggers and adds servers when load rises; it is much more than that. Think of every single layer in your architecture, and check whether each one scales horizontally.

A layer that is not horizontally scalable is, in the lecture’s words, a single point of failure.

More precisely

A layer that cannot scale horizontally is a bottleneck; if it also has no standby or failover, it is a single point of failure. An RDS Multi-AZ database is the counter-example: AWS keeps a synchronous standby in another Availability Zone for automatic failover, but notes that this “isn’t a scaling solution”, because the standby can’t serve reads. Redundancy (no single point of failure) and scale-out (more capacity) are separate properties.

docs.aws.amazon.com ↗

Right from the database: database, cache, stateful services, stateless services, API servers, load balancer, CDN. Every single component of whatever system you design needs to be horizontally scalable.

[figure title] Check every layer

[figure description] Seven layers of one system: CDN, load balancer, API servers, cache, a stateful service, the database and a stateless service, the same seven the class listed. Six scale out. The class called a layer that cannot scale out a single point of failure; more precisely, the database is one machine: a bottleneck if it cannot keep up, and a single point of failure only if it also has no standby. A standby removes the single point of failure but still does not scale it out.

[figure labels] cdn · scales out · lb · scales out · api · scales out · cache · scales out · stateful svc · scales out · db · one machine · bottleneck if it can’t keep up · SPOF if it also has no standby · + standby = no SPOF, still no scale-out · stateless svc · scales out

[caption] Fig 1·bAutoscaled API servers are one layer of seven, the seven listed above. The lecture called any layer that can’t scale out a single point of failure; more precisely (see the note), the database here is one machine: a bottleneck if it can’t keep up, a single point of failure only without a standby (dashed). A non-scalable database is fine while it holds the load.

### Know what one server can carry #

Horizontal scalability also implies that you know the unit economics of your service: how many requests each of your servers can handle. That number is what lets you do linear amplification, adding machines in proportion to load, and linear amplification is a requirement for a good distributed system. The load may be API load, processing load or something else; what matters is how much of it each machine can take. Requests are not the only possible unit: Google’s SRE book warns that queries per second is a poor capacity measure when different queries cost different amounts, and recommends measuring capacity directly in resources, with CPU consumption alone working well as the provisioning signal in most cases (sre.google ↗).

Without that number you are playing with fire: adding machines without much thought, leaking money in most cases, and either under-provisioning or over-provisioning.

The number varies with the service, which is why you have to understand the limitation of each server, across all the layers: database, API server, everything. “My API servers scale, so I’m a distributed system” is not a distributed system.

The rule has an escape hatch, added straight away. In some cases you cut corners: a database that isn’t horizontally scalable is perfectly fine as long as it can handle the load.

### Check yourself #

Answer in your head, or out loud, before opening each one.

A friend’s startup runs 40 autoscaled API servers in front of one database. Is it a distributed system in this chapter’s sense, and what would you check first?

[summary] Show answer

Not yet, by this chapter’s test: autoscaled API servers are one layer. Check every other layer, starting with the database: can it handle the load the 40 servers send it? If it can, a single database is an acceptable corner to cut; if it can’t, it is the bottleneck, and without a standby it is also a single point of failure.

The lecture said a layer that can’t scale out is a single point of failure. What does the fact-check add?

[summary] Show answer

That scaling out and redundancy are different properties. A layer that can’t scale out is a bottleneck. It becomes a single point of failure only if it also has no standby or failover; a Multi-AZ database has a standby that takes over, yet still can’t serve more load.

Describe the day-zero loop in five steps, and say where the low-level details come in.

[summary] Show answer

Start with one machine, one server, one database, one cache. Then scale each component independently, see how it performs under load, rectify the system, re-architect, and repeat. The low-level details come in at “see how it performs under load”: the pain points are at the code level, in what goes wrong and how to fix it.

Concepts in this section: distributed system · Murphy’s law · day-zero architecture · incremental approach · horizontal scalability · unit economics

Contents of this lecture ↑

Lecture 05, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-algorithms ===

# Building a load balancer, chapter 2: Choosing a backend: load balancing algorithms

Lecture 05 · Building a load balancer · chapter 2 of 8

§ 2

## Choosing a backend: load balancing algorithms

The box every diagram has and nobody opens. What it promises, and three ways it picks a server, each tied to a kind of infrastructure and a kind of load.

About 22 min · class 00:17–00:40, Q&A 00:33–00:40 and 03:10

Three API servers sit behind one load balancer. A request arrives. Which server gets it, and does it matter?

This chapter opens the box from the outside: what a load balancer promises, then three algorithms, each with the infrastructure and the load it suits. Chapter 3 opens it from the inside.

§ 2.1

## The box we take for granted

One rectangle in every diagram, assumed to work by magic. It is code, and it can be understood.

About 3 min · class 00:01 and 00:17–00:21

Draw almost any system and there it is: one rectangle labelled “Load Balancer”, assumed to work.

That box is typically the core component that makes distributed systems possible, because it is what hides the details of having many servers in the backend.

The board called it “one of the most important components in any system”, and added: “we kind of take it for granted.” We assume it magically works. Yet, as the instructor put it, it is a piece of code someone wrote: hundreds of engineers wrote AWS’s load balancers, and hundreds more install them. If a team of engineers built it, there is no reason to treat it as a black box.

So this lecture approaches it from first principles rather than from the core technology needed to build one, to build a raw intuition for the system. The algorithms come first, and practically: the instructor has changed load balancing algorithms in practice to get performance.

[figure title] One entry point

[figure description] Two clients send their requests to one load balancer, reached by one name that never changes. The load balancer forwards each request to one of three API servers. Advantages written beside it: fault tolerance, and no over-clocked server.

[figure labels] payments.example.com · lb · api · api · api · single point of entry · advantages: · fault tolerance · no over-clocked server

[caption] Fig 2·aOne name or IP that never changes. Clients only ever talk to the load balancer, and it forwards each request to one of the servers behind it. Redrawn from the class board at 00:19; the name is a placeholder.

The load balancer is a single point of entry: one domain name or one IP address that does not change. Anyone who wants to talk to your backend servers talks via the load balancer, so a client never has to remember where to talk; it only needs this one address.

It is the load balancer’s responsibility to forward each request to one of the backend servers to get it handled. On what basis does it decide which one? That is the load balancing algorithm. Three are covered here: what each is, how to use it, and where.

The board listed two advantages of putting one in front: fault tolerance, and no over-clocked server, meaning no server overloaded while others sit idle.

[summary] From practice: when you must build your own skip unless you run on-premise

Will you ever build your own load balancer? Flipkart, the example given, had to: it runs private infrastructure in its own data centre, it can’t be on Amazon, and migrating to GCP was a pain, so it had to write its own load balancers. You too may be put in a situation where you have to write your own and scale it.

§ 2.2

## Round robin

Hand requests out in turn. The default, and right when servers and requests are alike.

About 3 min · class 00:20–00:23 and Q&A 03:10

Three identical servers, 4 GB each, and requests 1, 2, 3, 4, 5, 6 arriving one after another.

Round robin is the most common algorithm, and the default in almost all load balancers. As the name suggests, requests go across the backend servers in turn: 1, 2, 3, 1, 2, 3.

The load balancer keeps track of where it forwarded the last request. It sent the last one to backend 1, so the next goes to backend 2, then 3, then 1 again. That needs no session service or anything else: the load balancer keeps one integer, the index in its array of backends where it last sent a request, and moves to the next. In the tiny Go load balancer that chapter 3 reads, that is the whole round-robin strategy:

// round robin: next = (last + 1) mod n s.Index = (s.Index + 1) % len(s.Backends)

Use it when you have uniform infrastructure, say every API server with 4 GB of RAM, and a uniform load pattern. A uniform load pattern means that whatever API you hit, the result comes back within a fixed range of time, say under one second. The variance in response time is low, so it doesn’t really matter which server a request goes to. The example assumes homogeneous load.

[figure title] Round robin

[figure description] Round robin: three equal 4 GB servers get requests in turn, 1 and 4, 2 and 5, 3 and 6. It suits uniform infrastructure and uniform load.

[figure labels] lb · 4 GB · 1,4 · 4 GB · 2,5 · 4 GB · 3,6 · uniform infra · uniform load · round robin

[caption] Fig 2·bRound robin over three equal servers: 1 and 4, 2 and 5, 3 and 6. Redrawn from the class board at 00:22.

With identical machines and low variance, a request won’t take very long on one server and very little time on another. So sending requests one after another spreads the load almost equally across the three servers. It is the easiest scheme there is. And uniform infrastructure, where every machine behind the load balancer has the same configuration, is true in most cases.

§ 2.3

## Weighted round robin

When one server is bigger, give it a bigger share. It is always about money.

About 3 min · class 00:23–00:26

Now one of the three servers has 8 GB instead of 4 GB.

Weighted round robin is round robin where you configure a weight for each machine and forward requests in proportion to the weights. It is common enough to be a default: nginx distributes requests by weighted round robin unless told otherwise, with every server’s weight set to 1, so a server with weight=5 next to two weight-1 servers gets 5 of every 7 requests (nginx.org ↗).

Non-uniform infrastructure happens. Say three machines behind a load balancer have 4 GB, 8 GB and 4 GB of RAM, because you purchased reserved instances that lose you money if they sit unused.

Under plain round robin the 8 GB machine, with twice as many cores, still gets exactly the same share of requests. If the 4 GB machines run at 80% of capacity, it runs at about 40%. You are not utilizing your infrastructure.

So with non-uniform infrastructure you use weighted round robin, and forward requests in the ratio 1 : 2 : 1. Of every four requests, the big machine gets two, and the infrastructure is used well.

[figure title] Weighted round robin

[figure description] Weighted round robin: 4 GB, 8 GB and 4 GB servers with weights 1, 2 and 1. Of every four requests the 8 GB server gets two: 1 and 5, then 2, 3, 6 and 7, then 4 and 8. Under plain round robin the 8 GB server would sit at about 40% while the others ran at 80%; with weights all three run at about 80%.

[figure labels] lb · w=1 · 4 GB · 1,5 · w=2 · 8 GB · 2,3,6,7 · w=1 · 4 GB · 4,8 · 4 GB · 8 GB · 4 GB · round robin · 80% · 40% · 80% · weighted 1 : 2 : 1 · 80% · 80% · 80% · non-uniform infra · as per weights · weighted round robin

[caption] Fig 2·cWeights 1 : 2 : 1 over 4, 8 and 4 GB. The big server takes two of every four requests, and runs near 80% like the others. The gauges underneath show each server’s utilisation: under plain round robin the big one idles at 40% (red); with weights all three sit near 80%. The request numbers follow the 1 : 2 : 1 rule.

Where do you configure it? Every load balancer has a set of algorithms to pick from, each with its own configuration; go through the official documentation of the one you use. If your cloud doesn’t show the option, perhaps because it is behind a feature flag, the advice is to raise a support ticket with the provider and ask to configure your algorithm. Managed load balancers do expose a fixed set: an AWS Application Load Balancer offers round robin, least outstanding requests and weighted random, while a Network Load Balancer’s routing is not configurable (ALB ↗, ELB ↗).

[summary] Weighted round robin, from practice skip unless you buy reserved capacity

One real reason to configure weighted round robin, from the instructor’s own work, was a blunder: the team bought AWS reserved instances of different sizes, and AWS wasn’t ready to change them. Instead of keeping them spare, they put them into existing workloads and applied weighted round robin. For reference, Standard Reserved Instances for Linux/UNIX can now be modified to other sizes in the same instance family and generation, as long as the total footprint stays the same (docs.aws.amazon.com ↗).

The pattern here is always money. Is your infrastructure being utilized well? That is exactly what an engineer has to think about; if you don’t care about money, the algorithm doesn’t matter. Put a 60 GB machine behind plain round robin and you are not using your resources efficiently.

Career advice follows from it: save money for your organization. That is how you make a quantified impact, and it makes pitching for a promotion easy.

§ 2.4

## Least connections

When some requests take a second and others an hour, send each to the server with the fewest open connections.

About 9 min · class 00:26–00:31 and Q&A 00:33–00:38

An analytics service: one query answers in a second, the next takes two hours.

Only three algorithms are covered here, but the intuition for where to pick one carries over to others. The third is one a lot of people take for granted: least connections.

When a request arrives, the load balancer checks which backend server has the fewest connections from the load balancer, and forwards the request to it. Think of it like connection pooling for databases: the load balancer can open several connections to a server, and it keeps track of how many it has to each. One caveat: it is not actually a connection pool, only an example. from · Lecture 1: connection pooling

The load balancer keeps a count of the active connections it has to each backend. When a request completes, its connection is freed, so a new request can go back to that server. Each new request goes to whichever server has the fewest active connections.

Why do connections say anything about load? If you are not pooling, an open connection means the server is busy: the HTTP connection from load balancer to backend is terminated when the server responds, so while it is open the server is working, and more connections mean a busier server. More exactly, it is an in-flight request that means busy. With keep-alive a connection can stay open and idle between requests (RFC 9112 ↗), so load balancers count active connections or outstanding requests. AWS’s Application Load Balancer even multiplexes requests from many client connections onto a single backend connection, so the number of open backend connections doesn’t equal how busy a target is (docs.aws.amazon.com ↗).

So least connections forwards each request to the machine that is least burdened at that moment, which raises the probability of a quick response.

Where does it earn its keep? In a workload with very high variance: some APIs take one second, some one minute, some one hour. Analytics is the classic case, where some queries answer in a second and others take one or two hours.

Pause and think

An analytics API behind three identical servers answers some queries in a second and others in two hours. Round robin, or least connections?

Round robin deals requests in turn without looking, so two long queries can land on the same busy server while others sit idle. Least connections sends each request to the server with the fewest open connections, a cheap stand-in for “least busy”. Why not route on CPU instead? The load balancer would have to fetch every server’s CPU before each decision, which costs milliseconds; routing has to take microseconds.

Here is the board’s walkthrough, one request at a time. Step through with the buttons or the arrow keys:

[figure title] Least connections, one request at a time

[figure description] Swim lanes for the load balancer and three servers, time running down. 1: requests 1, 2 and 3 go to servers 1, 2 and 3, one connection each. 2: request 2 was a one-second call; its connection closes and server 2 is free. 3: request 4 goes to server 2, which has the fewest connections. 4: request 4 runs long; request 5 arrives with servers 1 and 3 tied at one connection, and the load balancer picks server 1. 5: under round robin the same five requests would have put the long requests 1 and 4 on server 1. The load balancer only sees its connections, not CPU.

[figure labels] lb · server 1 · server 2 · server 3 · s1 s2 s3 · time · 1 · 1 · 2 · 3 · 1  1  1 · 2 · done · 1  0  1 · 3 · 4 · 1  1  1 · 4 · long · 5 · tie → pick one · 2  1  1 · 5 · CPU? I only see my connections. · round robin, same five: · lb · 1,4 · 2,5 · 3 · two long ones · pile up

- Requests 1, 2 and 3 arrive. Each server has zero connections, so one goes to each: 1 1 1.

- Request 2 was a one-second call. It finishes, its connection closes, and server 2 is free: 1 0 1.

- Request 4 arrives. Server 2 has the fewest connections, so request 4 goes there.

- Request 4 turns out to be long-running. Request 5 arrives with servers 1 and 3 tied at one connection; the answer in class was to pick one of them at random, here server 1.

- Under round robin the same five would go 1, 2, 3, 1, 2: request 4 lands on server 1, which is already busy with long request 1. And the load balancer never saw a CPU number at all.

Keys: ← → to step · link to a step with #fig-2c/step-3

[caption] Fig 2·dTime runs down. Lanes are the load balancer and three servers; a bar is a request still running, and the numbers under the lb are its connection counts for servers 1, 2 and 3.

In words: requests 1, 2 and 3 go to servers 1, 2 and 3. Request 2 was a one-second request and finished, so when request 4 arrives, server 2 has the fewest connections and gets it. If request 4 turns out to be long-running, request 5 then picks the first server.

Now run the same stream through blunt round robin. It deals requests in turn, whatever is running, so long-running requests can all get scheduled onto one server. The server already busy with long work is bombarded with more of it.

Before you play it: some requests take a second and some take an hour. Which algorithm keeps one server from drowning?

[caption] Clip 2·1Round robin keeps dealing long requests onto a server that is already busy; least connections sends them to a free one. Under high variance, use least connections.

[summary] The clip as text 0:35

- Two load balancers, same requests, same three servers.

- While every request is short, both look the same.

- Request 4 runs long and keeps s1 busy. 5 and 6 come and go.

- Request 7 is long too. Round robin: s1 again. Least connections: s2.

- Round robin keeps dealing long work to busy s1; s2 and s3 sit idle.

- Big variance in response times? Use least connections.

The same ten requests go through two load balancers, each in front of three identical servers s1, s2 and s3. Each server shows how many connections it has open, and each request is a bar on its server's time track: short ones end quickly, long ones keep running. Round robin deals the requests in turn, so requests 4, 7 and 10, the long ones, all land on s1: it ends with three open connections while s2 and s3 sit idle at zero. Least connections sends each request to the server with the fewest open connections, so request 7 goes to s2 and request 10 to s3, and each server ends with one long request. When response times vary a lot, use least connections.

So when there is a very large variance in the response or processing times of your requests, use least connections: each request is forwarded to a machine that is relatively free. Managed load balancers offer the same idea. AWS’s Application Load Balancer calls it least outstanding requests: each request goes to the target with the fewest in-progress requests, and AWS says it is commonly used when requests vary in complexity or targets vary in processing capability (docs.aws.amazon.com ↗).

[figure title] Least connections

[figure description] Least connections: three equal servers; each request goes to the one with the fewest open connections, so the numbers are uneven: 1, 5, 7 · 2, 4, 8, 9 · 3, 6, 10. It suits loads with a big variance in response times, such as analytics.

[figure labels] lb · 4 GB · 1,5,7 · 4 GB · 2,4,8,9 · 4 GB · 3,6,10 · big variance in response times · least connections

[caption] Fig 2·eLeast connections over three equal servers, the third fan on the class board at 00:22 and 00:40. The numbers come out uneven, 1, 5, 7 · 2, 4, 8, 9 · 3, 6, 10, because each request goes wherever the fewest are running; compare the even turns of round robin (Fig 2·b) and the 1 : 2 : 1 shares of weighted round robin (Fig 2·c).

### Three questions people ask #

Does the load balancer have to keep persistent connections to every server? No. It can be completely stateless. Or, since it is your code, it can keep a connection pool, and then “least connections” means least active connections: with a pool of 100 connections to a server of which 2 are in use, 2 are active and 98 are not. Either way is fine.

What if request 5 lands on a server still busy with an hour-long query, while another server is about to finish? The load balancer can’t know that. But the worry assumes a server can handle only one query at a time; if that is really true, you need more servers. And when two servers tie for the fewest connections, the answer in class was to pick one of them at random. Implementations differ in that detail: nginx’s least_conn takes server weights into account and tries tied servers in weighted round-robin order (nginx.org ↗).

Isn’t that only a local optimization? Yes, and local optimization still works; there is no need to go for a global one. With workloads that large you would have far more than three servers, and you simply try to maximize execution across all the requests you handle.

This is exactly what data warehouses do: according to the instructor, BigQuery’s and Redshift’s documentation describe least-connection-based balancing across clusters, because a data warehouse classically mixes short-running and long-running queries.

More precisely

Data warehouses face the same mixed short and long query problem, but neither the Redshift nor the BigQuery documentation describes least-connections balancing. They use workload management: separate queues for short and long queries, and slots with fair scheduling (BigQuery slots ↗).

docs.aws.amazon.com ↗

The rule for this whole chapter

Pick the algorithm by your infrastructure and your load pattern.

The board’s three lines. Uniform infrastructure: distribute the load iteratively (round robin). Non-uniform infrastructure: distribute it iteratively but as per weights (weighted round robin). A big variance in response times, as in analytics: pick the server having the least connections from the load balancer.

[figure title] Pick by infrastructure and load

[figure description] Three small load balancers, each fanning out to three servers. rr: three equal servers. wrr: the middle server is twice as big. lc: one server holds a long request.

[figure labels] rr · wrr · lc

Three ways to pick a backend

|

| Round robin

| Weighted round robin

| Least connections

| What the LB remembers

| The index of the last backend it used

| The last index, and each backend’s weight

| Active connections per backend

| Infrastructure it suits

| Uniform: every server alike

| Non-uniform: e.g. 4, 8, 4 GB

| Not discussed in class

| Load it suits

| Uniform: every API answers in a narrow time range

| Not discussed in class (the example assumed uniform load)

| Big variance in response times

| State it needs

| One integer

| One integer plus weights

| A counter per backend, updated as connections open and close

| What goes wrong if misused

| Long requests pile onto one server

| The big server idles at 40% if you forget the weights

| Still blind to CPU: only connections

| Example

| Identical 4 GB API servers, sub-second APIs

| Reserved instances of mixed sizes

| Analytics queries: a second to two hours

§ 2.5

## Why not route on CPU?

The clever suggestion that would make every request slower.

About 2 min · class 00:31–00:33

A common clever suggestion: just send each request to the server with the lowest CPU.

The load balancer has no idea of a backend’s CPU or memory. All it knows is its own network connections. It needs to be extremely stateless, so it picks the server with the fewest connections, a rough estimate of how busy that backend is. (Some load balancers do use backend-reported load, collected asynchronously rather than per request: gRPC’s client-side weighted round robin computes each backend’s weight from the utilization and request rate the backends report (gRPC A58 ↗).)

It is tempting to let the load balancer capture CPU and use it. Imagine the system that takes: the load balancer would have to talk to one more component, fire a query, look at historical usage, and only then decide where to forward. That adds a network hop and slows everything down, and a load balancer needs to be lightning fast. Don’t make things too complicated there.

That is why load balancing algorithms are heuristics. The decision has to be made right there, in microseconds, not even milliseconds, while collecting the CPU usage of every server and finding the least busy would add multiple milliseconds to each request. The connection count is the simplest signal that a server is overburdened. The last step of Fig 2·d puts it in the load balancer’s own words.

The lesson reaches beyond load balancers: whenever you suggest a design idea, ask whether it is practical.

§ 2.6

## Long requests and users who leave

How a request can last an hour, and what happens when its user gives up.

About 4 min · class 00:34–00:35 and 00:38–00:40

How can one HTTP request take an hour?

Don’t think only of HTTP; think of raw TCP. A TCP connection never breaks by itself: someone has to break it, through a network interruption or the client or the server terminating it. If none of that happens, it stays open. TCP itself never times out an idle connection, but load balancers, NATs and firewalls on the path do, so a long-lived connection needs keep-alives or some data now and then; the note below has the numbers.

[summary] How can a request last an hour? skip unless your requests run long

Idle timeouts on the path. TCP has no idle timeout of its own, but the boxes in between have one. An AWS Application Load Balancer closes a connection that has been idle for 60 seconds by default (configurable from 1 to 4,000), and AWS advises sending at least one byte before each idle period ends and setting the application’s own idle timeout above the load balancer’s (docs.aws.amazon.com ↗). TCP keep-alives won’t do it for you by default: they are optional, must default to off, and their interval must default to no less than two hours (RFC 9293 ↗).

Keep-alive. As taught, HTTP tells client and server to terminate the connection once the response arrives, but with keep-alive it can stay open. That was HTTP/1.0’s rule; HTTP/1.1 keeps connections open by default until someone sends Connection: close (RFC 9112 ↗). Extremely long-running HTTP requests do happen in practice (the instructor has had them), but server to server, not from end users.

gRPC. gRPC is the classic non-terminating connection: it runs on HTTP/2, and the connection never closes unless someone explicitly closes it. So that proxies and load balancers don’t treat a quiet connection as idle, gRPC sends HTTP/2 PING frames as keepalives; servers can still close connections on purpose with MAX_CONNECTION_IDLE and MAX_CONNECTION_AGE, both infinite by default (grpc.io ↗). An AWS ALB doesn’t count those PINGs as activity for its idle timeout.

### When the user gives up #

A user waits, gets frustrated, closes the browser and submits again. The new request may land on another VM while the old job is still running. Will they get two results? That is your business logic. If the work is stateful, you have to make sure the retry reaches the same machine and can be identified. But a TCP connection, once broken, is broken: the old response has nowhere to go. For this kind of work, process asynchronously.

Can you at least stop the abandoned job? Once a job is submitted, it is submitted: normal HTTP web servers don’t give you the tooling to stop it when the client goes away. You can implement it, though, especially when you control the execution engine, because when the TCP connection breaks you are notified on the socket. Two details, in practice. Some servers do give you the hook: Go’s standard net/http cancels a request’s context when the client’s connection closes, so a handler that passes that context on stops its work (pkg.go.dev ↗). And the socket only learns of a disconnect when a FIN or RST arrives; a client that simply vanished (power loss, a cut cable) goes unnoticed until you write to it or keep-alive probes fail (RFC 9293 ↗).

Data warehouses build exactly this: Redshift and BigQuery let you cancel a very long-running query, which stops its execution. Cancellation is best effort, though: a BigQuery job may already have finished or be at a stage that can’t be cancelled, and you can still be charged depending on when it stopped (BigQuery docs ↗).

### Check yourself #

Answer in your head, or out loud, before opening each one.

Four servers of 4, 4, 8 and 16 GB, with identical CPU per GB: which algorithm, and which weights?

[summary] Show answer

Weighted round robin, since the infrastructure isn’t uniform. Weights in proportion to capacity: 1 : 1 : 2 : 4. Plain round robin would leave the 8 GB and 16 GB machines under-utilized while the small ones ran hot.

Why does least connections beat round robin for an analytics API, and what does it still not know?

[summary] Show answer

Analytics has a huge variance in response times. Round robin deals requests in turn, so long queries can pile onto a server that is already busy; least connections sends each request to the server with the fewest open connections, a relatively free one. It still doesn’t know CPU or memory, or how long a running request has left: connection count is only a rough estimate of busyness.

Why doesn’t the load balancer just ask each server for its CPU before routing?

[summary] Show answer

The decision has to take microseconds. Asking every server, or another monitoring system, for CPU before each request adds a network call and several milliseconds to every request, and a load balancer must be lightning fast. That is why algorithms use cheap heuristics like the connection count.

Concepts in this section: single point of entry · round robin · weighted round robin · least connections · heuristic · long-lived connections

Contents of this lecture ↑

Lecture 05, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-one-laptop ===

# Building a load balancer, chapter 3: A load balancer on one laptop

Lecture 05 · Building a load balancer · chapter 3 of 8

§ 3

## A load balancer on one laptop

Strip the box down to what it really does: accept a TCP connection, open another, and copy bytes both ways. Then read the ten lines that do it.

About 28 min · class 00:40–01:08, Q&A 01:04–01:08

Chapter 2 decided which backend gets a request. This chapter opens the box that does the deciding. Picture one LB server at 10.0.0.1:9000, three backends at 10.0.0.7, .8 and .9 on port 8081, and a browser asking for /index.html. What exactly happens to the bytes?

§ 3.1

## Why build one

Boxes anyone can draw. The ten lines inside the box are what set you apart.

About 3 min · class 00:40–00:43, with 00:01 and the board at 00:35

This lecture works through a realistic load balancer design and, briefly, the source code of a tiny load balancer written for the class. The point is to see the core logic instead of drawing boxes. The code is in no way production-ready.

Drawing boxes is something anyone can do (“a two-year-old kid can do that”). Understanding the granular implementation is the differentiating factor.

The core turns out to be small: hardly ten lines of code, and even ten is an exaggeration. Most people never think of writing one. Yet an engineer wrote NGINX, and everyone now uses it as a reverse proxy.

Before any drawing, the board listed what the design has to do:

- balance the load

- with a tunable algorithm

- and scale beyond one machine

This cohort takes the load balancer low level first, then fits it into the high-level picture, including why one server can’t be the load balancer (that is the next chapter). Earlier cohorts started from the high level and ran out of time.

The habit behind it: find time to implement everything you see. You will learn details most people don’t know.

[summary] A first load balancer, from practice skip unless you want the story

The instructor built a first load balancer in plain Go around March 2021, during COVID, while preparing their first cohort, so they could show a real demo. They had read a few papers on load balancers but wanted the practical experience, and were thrilled when it first ran.

It balanced load across servers with several algorithms: consistent hashing, round robin, weighted round robin and static routing.

Benchmarked against Nginx and HAProxy, it came out five to six times faster than Nginx. That was no breakthrough: going deep into Nginx showed that Nginx and HAProxy do far more than a simple load balancer does.

§ 3.2

## Two kinds of server, two TCP connections

Fix the terms, then follow one request: it costs the LB server two TCP connections and one entry in a hash table.

About 9 min · class 00:43–00:52

Two terms first. The LB server is the machine that runs the load balancer; the load balancer itself is just a process on that machine. The backend servers are where the requests go: the payment service, the auth service, the profile service. To the load balancer you are building, they are a black box.

Spinning up a load balancer means a VM starts and runs the load-balancing process. That process is a normal TCP server, not even an HTTP server.

Start from day zero, as in §1.2: a single LB machine with the static IP address 10.0.0.1, which does not change. Don’t think about scale yet: as chapter 1 put it, scale on day zero is the worst way to build a system. Think simple.

Behind it sit the backends. Each runs a normal HTTP server (Flask, Spring Boot, any framework) that serves /index.html with “hello world” and listens on port 8081. To connect to any server you need its IP address and its port; here the three backends are 10.0.0.7, 10.0.0.8 and 10.0.0.9. The load balancer stores that list of backends as ip:port. It is the same list you fill in on a cloud console when you choose which servers sit behind a load balancer.

Now a request. When a client (a user, or another server) “sends a request to the load balancer”, it establishes a TCP connection with it. So the LB server must listen on a TCP port, say 9000. The request lands on the LB server for a simple reason: the load balancer’s address is the only one the client has. The backends accept HTTP requests on 8081, and HTTP runs over TCP.

When a connection arrives, the LB server first picks a backend with its load-balancing algorithm. With the simplest one, a random strategy, it picks one of the three at random. Then it opens a TCP connection of its own, to the chosen backend, say 10.0.0.7:8081. So one request from a client sets up two TCP connections: client to load balancer, and load balancer to backend.

[figure title] Two TCP connections per request

[figure description] Two clients and one LB server at 10.0.0.1 port 9000, with three backends at 10.0.0.7, 10.0.0.8 and 10.0.0.9, port 8081. Client 1 opens tcp1 to the LB and sends GET /index.html; the LB opens tcp2 to the first backend. Client 2 gets its own pair, tcp3 and tcp4. The LB keeps the backend list and an in-memory hash table mapping tcp1 to tcp2 and tcp3 to tcp4; the response is copied back along the same pair.

[figure labels] in-memory hash table · tcp1 → tcp2 · tcp3 → tcp4 · tcp1 · GET /index.html · tcp3 · lb · 10.0.0.1 :9000 · backends · 10.0.0.7:8081 · 10.0.0.8:8081 · 10.0.0.9:8081 · tcp2 · tcp4 · backend · 10.0.0.7 :8081 · backend · 10.0.0.8 :8081 · backend · 10.0.0.9 :8081 · response copied back · along tcp2, then tcp1

[caption] Fig 3·aOne request, two connections: tcp1 from the client to the LB server, tcp2 from the LB server to a backend. A second client gets its own pair. The LB server keeps the backend list and the connection map in memory. Redrawn from the class board at 00:52–00:57.

The LB server has to remember which connection goes with which. It keeps a map from each source TCP connection to its target TCP connection. The source connection is the one between the client and the LB server; the target connection is the one between the load balancer and the backend. On the board the map read { tcp1 → tcp2, tcp3 → tcp4 }.

This is exactly how the first version of that Go load balancer was thought out: first principles, nothing fancy.

Where does the map live? In an in-memory hash table on the LB server. You don’t need a database for it, and you couldn’t use one: a TCP connection lives on this server, so there is nothing to store anywhere else.

§ 3.3

## Copy one socket to the other

Bytes arrive on tcp1. The LB server looks up tcp2 and writes them there, without reading what they say.

About 4 min · class 00:52–00:55, Q&A 01:05–01:06

Bytes arrive on the source connection. The LB server looks up the map and forwards whatever it received, bluntly, to the target connection. Strictly, a TCP proxy copies a byte stream, not packets: the kernel reassembles the bytes on one socket and cuts them into new packets on the other, and Go’s io.Copy works the same way, reader to writer (pkg.go.dev ↗).

The load balancer doesn’t care what protocol is inside: HTTP, WebSocket, RTMP, ICMP. It reads from one socket and writes to the other. One limit on that list: it holds for protocols carried over TCP. ICMP belongs to the IP layer and never rides inside TCP, so it can’t pass through a TCP proxy, and neither can UDP-based protocols (RFC 792 ↗).

What the backend receives is a well-formed HTTP request, so it understands it, generates the response and sends it back on the connection the request came in on. The LB server sees data on tcp2, looks up tcp1, forwards it there, and the client has its response.

Read from the client’s socket and write to the backend’s; read from the backend’s socket and write to the client’s. That is exactly what a load balancer does: two lines of code, and done. A second client is handled the same way on its own pair of connections, tcp3 to tcp4.

Here is one request through the proxy, as the code in 3.4 does it. Step through with the buttons or the arrow keys:

[figure title] One request through the proxy

[figure description] Swim lanes for a client, the LB server running its accept loop, and the backend 10.0.0.7, time running down. 1: the client connects to port 9000 and Accept returns the source connection. 2: the strategy picks a backend, 10.0.0.7:8081. 3: the LB dials the backend, opening a second connection, and remembers the pair tcp1 to tcp2. 4: two copies run at once, client to backend carrying GET /index.html and backend to client carrying hello world; the LB never parses HTTP. 5: the client closes, EOF arrives, both copies return, and that return is where counters get updated.

[figure labels] client · lb · backend · accept loop · 10.0.0.7 · time · connect :9000 · Accept() · → srcConn · 1 · GetNextBackend() · → 10.0.0.7:8081 · 2 · Dial() · backendConn · tcp1 → tcp2 · 3 · GET /index.html · hello world · two io.Copy calls, in parallel: · one goroutine each way · 4 · close (EOF) · both copies return · update counters here · 5

- The client connects to the LB server’s port 9000. Accept hands back the source connection.

- The strategy picks a backend: round robin, hashed or random. Here it returns 10.0.0.7:8081.

- The LB server opens a second connection, to the backend, and remembers the pair tcp1 → tcp2.

- Two copies run at once, one per direction: GET /index.html goes right, hello world comes back. The LB server never parses HTTP.

- The client closes and EOF arrives. Each copy returns, and that return is where the LB server learns the connection ended.

Keys: ← → to step · link to a step with #fig-3b/step-3

[caption] Fig 3·bTime runs down. The lanes are the client, the LB server’s accept loop and the backend at 10.0.0.7. Blue carries the request, green the response.

Between the load balancer and the API server there are no REST calls. It is a normal TCP connection, and the load balancer copies anything across it, from one side to the other: HTTP, RPC calls, whatever the client sends.

So building a single-machine load balancer from first principles is really easy. It is just a mapping: “when I get something on this TCP connection, send it to that TCP connection”. Scaling it is a separate matter.

§ 3.4

## Reading the code

A tiny Go load balancer: an accept loop, a strategy, a dial, and two copies in two goroutines.

About 9 min · class 00:56–01:05, Q&A 01:04–01:08

Put in one sentence, the design is: keep a load-balancing algorithm configuration, and when a connection comes in, pick a backend server according to it and forward the request.

The code shown in class is lb.go in the ARLB repository, an “experimental reverse proxy and load balancer” written in Go. The LB server listens on port 9090. Four backend servers are hardcoded: Flask hello-world processes from one code base, on four local ports (8081 to 8084 on screen). The aim was to test load balancing, not to scale anything.

The main loop is a small infinite for loop around listener.Accept, which waits for an incoming client connection. Each accepted connection is wrapped as a source connection, with a request ID for logging, and handed to a proxy function. In proxy the first step is to pick the backend: lb.strategy.GetNextBackend returns a host and port according to the strategy (round robin, consistent hashing, and so on), and the LB server dials a TCP connection to it.

// lb.go, trimmed and lightly simplified from the screen ln, _ := net.Listen("tcp", ":9090") for { srcConn, _ := ln.Accept() // wait for a client go lb.proxy(IncomingReq{srcConn: srcConn, reqId: uuid.NewString()}) } func (lb *LB) proxy(req IncomingReq) { backend := lb.strategy.GetNextBackend(req) backendConn, err := net.Dial("tcp", backend.String()) if err != nil { req.srcConn.Write([]byte("backend not available")) return } backend.NumRequests++ // two goroutines: each io.Copy blocks until EOF go io.Copy(backendConn, req.srcConn) // request: client → backend go io.Copy(req.srcConn, backendConn) // response: backend → client }

With a source connection and a backend connection in hand, the load balancer calls copy (which copies from one file to another) twice: from the source to the backend for the request, and from the backend to the source for the response. Each call runs in its own goroutine. The reason is that copy blocks. Without its own goroutine, the first call would hold proxy until the connection ended, and the response would never be read.

copy keeps copying, continuously, from one connection to the other until it receives EOF. It returns only then, so you can’t wait on it in line: the two copies run as two goroutines in parallel, one per direction.

The code’s limits are stated openly: it is not an efficient implementation, and it spins up as many goroutines as it likes.

The strategies in the repository are round robin, static and hashed. Round robin’s GetNextBackend keeps the index of the last backend it used and takes the next one, (index + 1) mod n, which gives 1 2 3, 1 2 3 (the same one integer as in §2.2).

s.Index = (s.Index + 1) % len(s.Backends)

The consistent-hashing strategy is a little more complex, but still simple; the instructor’s blog walks through it. coming later · Lecture 9: consistent hashing, used again

A run loop listens on an events channel, so the load balancer can handle three commands at runtime: exit, add a backend, and change the strategy (on screen: case CMD_Exit, case CMD_BackendAdd, case CMD_StrategyChange).

### Counting connections #

Least connections (§2.4) needs a count per backend, which raises a question: how does the count go down when a user disconnects? This basic load balancer doesn’t keep connection counts at all. It tracks one statistic per backend, the number of requests handled so far, to check that round robin really spreads them. Other statistics can be updated the same way, once a backend has been picked.

As for knowing that a connection has ended, the answer given was that it “raises a panic”, an exception you can catch and use to update the load balancer’s in-memory state. In Go, nothing actually panics: io.Copy returns, with a nil error at EOF or with an error such as a connection reset, and that return is the place to update counters (pkg.go.dev ↗).

§ 3.5

## Build it locally

You don’t need three servers. Four processes on one laptop are a load balancer you can break and fix.

About 4 min · class 00:55–00:56 and 01:02–01:08

“I don’t have three servers.” You don’t need them. Start a process as the LB server on port 9000, in Go, C++, Java or Python, and start the backends as processes on other ports of the same machine: 8081, 8082 and 8083 on localhost. One machine can’t have three processes listening on 8081, which is why each gets its own port. No cloud, no VMs, no Docker.

[figure title] One laptop, four processes

[figure description] A laptop running four processes on localhost: the load balancer on port 9000 and three backend processes on ports 8081, 8082 and 8083, with requests going from the LB to each. No cloud, no VMs, no Docker.

[figure labels] lb · :9000 · :8081 · :8082 · :8083 · localhost · no cloud · no VMs · no Docker

[caption] Fig 3·cEverything on one machine, as suggested in class: the LB process on port 9000 and three backend processes on 8081, 8082 and 8083 of localhost. The code in 3.4 is this same setup, with the LB on 9090 and a fourth backend on 8084.

With basic networking knowledge, a load balancer like this is about a five-hour project. There is no magic sauce; everything else is the load-balancing strategy.

Be curious, and go deep into the systems you use. You may land in a spot where you have to write a very lightweight proxy because the existing proxies aren’t performant enough.

The same goes well beyond load balancers. Even a CDN, a non-distributed one (nobody is asking you to distribute it), can be built in hardly an hour if you know how content is served, cached and processed. It is difficult to scale, not to build.

coming later · Lecture 7: CDNs in depth

The rule for this whole chapter

There is a difference between building and scaling: everyone can build it locally; few get to scale it.

Very few people get the chance to scale systems, but every one of us can build them. Docker started with someone building it locally, and you need multiple machines only to scale. A single-machine load balancer, built from first principles, is just a mapping: “when I get something on this TCP connection, send it to that one”. So there is no excuse not to build.

[figure title] Build, then scale

[figure description] Left: one laptop running the LB and three backends, labelled build. Right, ghosted: a rack of five LB servers, labelled scale, later.

[figure labels] lb · build · lb ×5 · scale (later)

Scaling is where this load balancer runs into trouble, and it shows up as soon as you count connections.

Pause and think

Your LB server can hold 10,000 TCP connections. How many clients can it serve at the same time?

Each proxied request uses one connection from the client to the LB server and a second from the LB server to a backend, so half the budget goes to backends. 10,000 ÷ 2 = 5,000 clients. One LB server is a bottleneck, so you’ll need many, and that is where the control plane in §4 comes from.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Name the two TCP connections behind one proxied request, and the one data structure the LB server needs.

[summary] Show answer

The source connection, from the client to the LB server, and the target connection, from the LB server to the chosen backend. The LB server keeps a map from each source connection to its target connection in an in-memory hash table; a database would be useless, because the connections only exist on that machine.

Why does each io.Copy run in its own goroutine?

[summary] Show answer

io.Copy blocks: it keeps copying until it receives EOF, and only then returns. Called inline, the request copy would hold the function until the client disconnected, and the response copy would never start. In two goroutines the two directions run in parallel.

Can this load balancer forward a WebSocket? A DNS query over UDP? Why?

[summary] Show answer

A WebSocket, yes: it runs over TCP, and the LB server copies the bytes without parsing them, whatever the protocol inside. A DNS query over UDP, no: this is a TCP proxy, and a protocol that doesn’t ride on TCP (UDP-based protocols, or ICMP) never reaches its sockets.

Concepts in this section: LB server · backend server · source and target connection · TCP proxy · io.Copy · building vs scaling

Contents of this lecture ↑

Lecture 05, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-control-plane ===

# Building a load balancer, chapter 4: The control plane: keeping every LB server right

Lecture 05 · Building a load balancer · chapter 4 of 8

§ 4

## The control plane: keeping every LB server right

One LB server runs out of connections, so you run many. Now each needs the same configuration, fresh, all the time: configuration, health checks, pushing changes, and watching the LB servers themselves.

About 32 min · class 01:08–01:40, Q&A 03:01–03:34

The load balancer of §3 runs on one machine and keeps everything it knows in memory: the backends, the algorithm, the connection map. That is fine for one machine. The trouble starts when one machine isn’t enough, because then every LB server needs the same, current picture of the backends, and somebody has to keep it that way.

§ 4.1

## One LB server is not enough

Two connections per client: half of an LB server’s connection budget goes to backends.

About 2 min · class 01:08–01:10

§3’s question already gave the number: 5,000 clients per LB server. An LB server manages two TCP connections for every client request it is proxying, 2X connections for X clients, so it becomes the bottleneck. That is why one LB server is not enough: you need several, scaled horizontally, which is a problem of its own.

[figure title] Half the budget goes to backends

[figure description] One LB server with a budget of 10,000 TCP connections, drawn as a bar split into two equal halves: one half holds client-to-LB connections, the other LB-to-backend connections. 10,000 divided by 2 is 5,000 clients, and the end of the bar is the limit.

[figure labels] 10,000 ÷ 2 = 5,000 clients · lb · client ↔ lb · lb ↔ backend · limit · 10,000 connections

[caption] Fig 4·aEvery client costs the LB server two connections, so a budget of 10,000 serves 5,000 clients. The 10,000 is an illustrative number; the paragraph below gives a real Linux limit.

The 10,000 is illustrative. One real limit is worth knowing: on Linux the ephemeral port range defaults to 32768–60999, which bounds how many simultaneous connections one LB IP can open to a single backend ip:port to about 28k (kernel.org ↗).

Because one LB machine is a bottleneck, the LB servers themselves need to scale horizontally. Working that out also shows how load balancers are scaled internally.

The design is brainstormed along four factors: LB configuration, monitoring, availability and extensibility.

§ 4.2

## Where the configuration lives

The bare minimum is an algorithm and a list of backends. Store it in a database, and never read it per request.

About 4 min · class 01:10–01:14

Three new LB servers boot. How does each of them learn which backends exist?

The configuration has to store the IP address and port of every backend server behind the load balancer. The bare minimum is two things: which load-balancing algorithm is in use, and which backend servers are connected. You can make it infinitely fancier later, with all kinds of extra settings, but the design starts from the bare minimum. On the board the block also gained a health endpoint a few minutes later (4.3).

Where to keep it? Starting simple: in a database.

Not to be read on every request, though. A load balancer should add as little latency as possible; it already adds a network hop. If the LB server called the database for the configuration on every request, every request would take longer. A network call to the database costs about three to five milliseconds, which is too expensive to pay on every request passing through the load balancer.

So each LB server, when it starts, pulls its load balancer’s configuration from the database and keeps an in-memory copy. Incoming requests are then routed without any network call. In the demo code of §3.4 the configuration is exactly that: a simple in-memory list of backends, from which the load balancer picks one at random or by its strategy.

[figure title] An in-memory copy of the config

[figure description] Two LB servers, each with a small in-memory copy of the configuration. Each pulls the configuration from the config database once, at startup. A client request goes from the client to an LB server and on to a backend without touching the database: no database call per request, because a call costs about 3 to 5 milliseconds. The configuration holds the backends as ip:port, the algorithm, and the health endpoint.

[figure labels] lb · lb · ← config copy · no db call per request · backend · backend · backend · pulled once, · at startup · config db · 3–5 ms per call: too slow per request · { backends: [ip:port, …], · algorithm: "round_robin", · health_endpoint: "/health" }

[caption] Fig 4·bPulled once at startup, then every request is routed from memory. The dashed arrows are the LB servers pulling: each starts at the LB server, which asks, and points at the database. The card is the board’s config block (b.servs, balancy, health_endpoint) with its names spelled out. Redrawn from the class board at 01:13.

The catch is the copy. An in-memory copy goes out of date the moment the configuration changes, for example when a backend server goes down. Something has to keep updating the LB servers.

§ 4.3

## The orchestrator and health checks

Someone has to notice a dead backend first. The orchestrator asks every backend’s health endpoint, and checks the service, not the server.

About 8 min · class 01:13–01:20, Q&A 03:15 and 03:28–03:32

Backend 2’s process has just crashed. Who notices?

Before anything can be updated, something has to detect that a backend went down. A health check service is the direction taken here. The component that performs health checks on the backend servers is called the orchestrator, the mastermind of the load balancer system.

When is a backend “up”? When its dedicated health-check endpoint returns HTTP 200. That means the one endpoint, not all user requests; how the endpoint is implemented is up to you.

A tempting shortcut: you don’t need a specialized health-check endpoint, just a very lightweight endpoint that answers a ping, or TCP pings to the IP and port to see whether anything comes back. The design keeps an explicit health endpoint, configured on the load balancer, for the reasons that follow.

A backend server is a virtual machine that may run hundreds of processes: SSH, nginx, other HTTP servers. For this load balancer only one process matters, the core web server it balances against, say the profile service on port 8081. Every HTTP server you build should define a health-check endpoint, such as /status or /health.

That endpoint is part of the load balancer’s configuration. Apart from the algorithm, you give the health-check endpoint when you spin up a load balancer, and it is stored with the rest of the configuration in the database.

Checking that the VM is up is not enough. The VM can be up while the service process has crashed, on a divide-by-zero or a null pointer exception, and then it can’t serve requests. The orchestrator could check the VM through its infrastructure access and still miss that. The health check must verify the service, not the server.

So the orchestrator uses the health-check configuration to fire continuous health checks at the backend servers. Typically it makes HTTP calls to each one and needs a 200 back; HTTP keeps the picture simple, and other protocols are accepted too. It needs access to the configuration database to know the servers and their health endpoint. When a check fails, it immediately updates the database and removes the dead backend’s entry. Managed load balancers add one twist: AWS’s Application Load Balancer fails open, so if every target in a group fails its health checks, it routes to all of them regardless of health (aws.amazon.com ↗).

[figure title] The orchestrator asks; backends answer

[figure description] The orchestrator sends health checks (hb) to each backend’s health endpoint, /health on port 8081. Backend servers 1 and 3 answer 200. Backend server 2’s VM is up but its process crashed, so there is no 200. The orchestrator writes to the config database to remove b srv2.

[figure labels] config db · orchestrator · remove b srv2 · hb · continuous checks · 200 ✓ · no 200 · 200 ✓ · b srv1 · :8081 /health · b srv2 · :8081 /health · b srv3 · :8081 /health · vm up, process crashed

[caption] Fig 4·cThe orchestrator asks; backends only answer. b srv2’s VM is up but its process crashed, so its /health gives no 200 and the orchestrator removes it from the config database. Redrawn from the class board at 01:15–01:20.

This is the same idea as the online/offline indicator; how exactly you implement it is up to you. Heartbeats between the orchestrator and the backend servers are the same building block as that design: the orchestrator keeps making HTTP calls to check whether servers are alive, and keeps track.

from · Lecture 1: the online/offline indicator, built on heartbeats

### Who sends the heartbeat? #

Backend servers don’t send heartbeats; the orchestrator asks for them. The backend, a Spring Boot, Flask or Django server running business logic, exposes a /health endpoint, and that endpoint only receives requests. It never sends anything. The status that counts as success is configurable: 200, 300 as okay too, and in some cases even 400.

What the health check verifies is the service owner’s responsibility, not the load balancer’s or the orchestrator’s. Most people implement it as just returning okay, which means the web server is running, without checking the database. The handler can also ping the database and report up only if both are up. Be careful with that deeper version: a check that includes a shared dependency such as the database can fail on every server at once, load balancers then fail open, and automation that removes “unhealthy” servers can make the outage worse (AWS Builders’ Library ↗).

Pause and think

To detect dead backends, should each backend send a heartbeat to the orchestrator, or should the orchestrator call each backend’s /health?

The deployed app doesn’t know the orchestrator’s IP, while the orchestrator has every backend’s address in the config. A health endpoint is also far simpler for the people writing services than a thread that keeps sending heartbeats, and a self-report can claim “up” while the service can’t actually serve. The same reasoning as the online/offline indicator in Lecture 1.

The first reason is addressing. The deployed application, busy with its business logic, doesn’t know the orchestrator’s IP address, so it can’t send it anything; it is the same as in the online/offline indicator. The orchestrator knows all the backend IPs and pings them.

The second, stated only briefly, is trust: pinging is better because a self-reported heartbeat can say “my server is up” while the process is actually down.

The third is the developers. Even if the backend knew the orchestrator’s IP, pushing heartbeats needs a thread sending them continuously, a much more complex implementation than exposing a health endpoint. Think from the side of the developers who use your load balancer, your customers, and keep their life simple.

[summary] Further reading: φ-accrual failure detection skip unless you build failure detectors

The board’s reading suggestion for this part of the design: the φ-accrual failure detection algorithm.

§ 4.4

## Getting the change to every LB server

The database is right and the LB servers are wrong. Polling leaves a window of failed requests; pushing the change closes it.

About 8 min · class 01:20–01:28

The orchestrator has updated the database. Every LB server is still routing from its old in-memory copy.

That is the key problem of the design: how does a change the orchestrator made in the database reach the in-memory hash map of configuration that every LB server holds?

The most naive way is for each LB server to keep polling the database. It works, but it is not an optimal way. It is tempting to think the cost is latency: that checking which backends are alive slows down the user requests arriving at the LB server. It doesn’t, because the orchestrator runs the health checks, not the LB server, so user requests there are not affected by them. Polling the database does keep the LB server busy, but the main cost is staleness:

Pause and think

Your LB servers re-read the config database every 10 seconds. A backend crashes one second after the last read. What happens to user requests until the next read?

The LB servers never ask the database per request (that would add 3–5 ms to every request), so the orchestrator’s update sits unseen until the next poll. For about nine seconds the dead backend still gets its share, and users see an error-rate spike. Polling faster only shrinks the window. Removing it means pushing the change: call each LB server’s meta port, or publish one message every LB server hears.

A backend dies one second after the last poll. With a 10-second poll, for how long do users see errors?

[caption] Clip 4·1With polling, LB servers route to a dead backend from stale config until the next poll. Pushing the change at once closes the window.

[summary] The clip as text 0:39

- LB servers route each request from an in-memory copy of the list.

- Backend 2 crashes. The orchestrator notices and updates the db.

- The LB servers’ copies still list b2, so requests sent there fail.

- At the 10 s poll the copies catch up: nine seconds of errors.

- Replay with push: the orchestrator calls the LB servers’ meta port.

- The copies drop b2 at once. Requests skip it: almost zero staleness.

- Polling: errors until the next poll. Push: the window nearly closes.

LB servers route every request from an in-memory copy of the backend list, b1 b2 b3, and poll the database every 10 seconds. One second after a poll, backend 2 crashes. The orchestrator’s health check to b2 fails and it removes b2 from the database at once, but the LB servers’ copies still list b2. Requests go round robin, so every third one is sent to the dead b2 and fails. At the 10-second poll the LB servers pull the new list, b2 is struck from their copies and the errors stop: nine seconds of errors. The same crash is then replayed with push: right after the database update the orchestrator calls the LB servers’ meta port (9091), they pull the new list straight away, and every later request skips b2. The red window shrinks to almost nothing.

Polling has a frequency, say every 10 seconds. If a backend crashes in the first second of an interval, then for the remaining nine seconds (N − 1, for an interval of N) requests keep going to that backend, even though it is dead. Some load balancers also shrink the window from the request side. Besides active health checks, nginx runs passive ones: after max_fails failed attempts within fail_timeout (10 s by default), it marks a server unavailable for fail_timeout, so real request failures take a dead backend out between checks (nginx.org ↗).

The LB server routes from its in-memory configuration and doesn’t check the database per request. So a stale configuration means user requests fail for that whole window, a spike in the error rate for your end users. That is the main reason polling can’t be used.

The way out is to make it event based: instead of polling, have the change itself trigger the update, whenever it happens.

One push design came from the class. Reserve a separate port on the LB server for updating the configuration: the main process serves traffic on 9090, and one more process listens on 9091, a “meta” port. Whoever detects or makes a change, the orchestrator for one, makes a normal call to that port, and its handler reads the database and updates the in-memory configuration.

Another proposal was a separate “load balancer handler” service that would watch for configuration changes. It was turned down: why have one more service for that, when the orchestrator, or the LB server itself, can do it? What stands is the simpler version: the orchestrator updates the database and calls the load balancer to pull.

Changes don’t come only from health checks. Developers change configuration too, through the LB console APIs: in the AWS console you explicitly add backend servers, change the load-balancing algorithm, change the health check. Every such change goes to the database and must reach every LB server’s in-memory copy. With the push approach, whoever changes the configuration calls the LB server’s other port and asks it to pull from the database, and that is near immediate.

[figure title] Poll vs push

[figure description] Two timelines from 0 to 20 seconds with requests spread evenly over three backends. Top, poll every 10 s: backend 2 dies at 1 s, but the LB servers only re-read the config at 10 s, so every request sent to backend 2 between 1 s and 10 s fails: 9 s of requests to a dead backend. Bottom, push: when backend 2 dies the orchestrator calls the LB server’s meta port 9091 and the LB server pulls the new config from the database at once, so the window is near zero.

[figure labels] b srv2 dies · 9 s of requests to a dead backend · 0 s · poll · 10 s · poll · 20 s · poll · poll every 10 s · config db · lb · :9090 · orchestrator · call :9091 meta · pull config · b srv2 dies · 0 s · 10 s · 20 s · near zero · push (meta port)

[caption] Fig 4·dThe static twin of Clip 4·1. Each tick is a request, dealt to the three backends in turn; the red ticks are the ones sent to b srv2 after it died. Top: nothing changes until the 10 s poll. Bottom: the orchestrator calls the meta port, the LB server pulls at once, and at most one request falls in the window. Redrawn from the class board at 01:22–01:27.

There is no one right answer in design, because everything is a trade-off: the meta-port call works in some situations, and the broadcast in the next section works in others. The goal doesn’t change, though. Polling fails because the LB server keeps operating on stale data. The aim is zero staleness, almost zero, so every change must be pushed out immediately.

§ 4.5

## Make it reactive: Pub/Sub and CDC

Fifty LB servers can’t each wait for a call. Publish the change once, and let every LB server hear it.

About 6 min · class 01:27–01:30 and 01:51–01:53, Q&A 03:01–03:03 and 03:13–03:15

Fifty LB servers. Does the orchestrator call fifty meta ports?

The same problem came up in Lecture 4, in the design of Slack’s real-time communication: polling couldn’t be relied on, and changes had to be pushed immediately. The same idea, listening for changes as Slack’s servers listened for membership changes, applies to the load balancer’s configuration.

from · Lecture 4: Slack in real time, where membership changes were pushed over Pub/Sub

One implementation, not the only one, is a real-time Pub/Sub such as Redis. Whenever the configuration in the database changes, a message is pushed to the broker, for example through CDC (change data capture), and the LB servers listen to it. CDC is only a sneak peek here.

coming later · Lecture 9: change data capture (CDC), in depth

The message to the broker can come from three places: the orchestrator, the LB console pushing directly, or the database itself through CDC.

[figure title] Three ways a change reaches the LB servers

[figure description] A change can come from the orchestrator when a health check fails, from a developer through the LB console API, or from autoscaling; each writes to the config database (A). The database feeds a Redis Pub/Sub channel through CDC, or the orchestrator or console publish directly (B). The broker pushes the message to every LB server (C), and each refreshes its in-memory config copy (D). Option 1 instead: call each LB server on port 9091. Redis Pub/Sub is at-most-once, so an LB server that was offline re-pulls on reconnect.

[figure labels] lb · lb · lb · D · copies · refreshed · C · redis pub/sub · at-most-once: · an LB that was · offline re-pulls · on reconnect · cdc · B · or publish · directly · config db · A · orchestrator · health check failed · developer · lb console api · autoscaling · :9091 · option 1: call each LB

[caption] Fig 4·eThe config path, Ⓐ to Ⓓ: any change goes to the database, reaches the broker (through CDC, or published directly), and is pushed to every LB server, which refreshes its copy. It is dashed because no request waits on it. Option 1, on the left, is the meta-port call of 4.4. Redrawn from the class boards at 01:26–01:28 and 01:50.

Two reactive approaches were discussed, then: an explicit API call that asks the LB server to pull the configuration, or a reactive Pub/Sub mechanism that pushes it. Either way the LB server updates its in-memory copy (through shared memory between its processes), and which one works depends on the case.

The rule for this whole chapter

Make systems reactive rather than polling-based.

The aim is to keep staleness to a minimum. On a change event, the LB server either uses the configuration that was pushed to it or pulls the latest from the database; that part is an implementation choice. Redis is one way to do the pushing, chosen because its guarantees need no extra worry; the idea is the reactive communication itself.

[figure title] Reactive, not polling

[figure description] Left: a clock standing for the polling interval, its stale window marked in red, struck through. Right: a change arrives as an event and goes straight into an LB server, whose config copy is fresh.

[figure labels] polling · change · lb · reactive

In the class’s words, using the real-time Pub/Sub broker guarantees message delivery of configuration changes to all LB servers.

More precisely

Redis Pub/Sub broadcasts changes in real time, but its delivery is at-most-once: a subscriber that is disconnected or hits an error loses the message for good. Pair it with a full config re-pull whenever an LB server (re)connects, or use Redis Streams, which persist messages and support at-least-once delivery.

redis.io ↗

Because each LB server works from an in-memory copy of the configuration, updated by push, load balancing loses no performance.

### Why Redis, and what else would do #

Why Redis Pub/Sub for this? Because it sends to everyone in real time, out of the box. Without it, one process would have to make calls to every server. What the design needs is just a real-time broadcast, and whatever gives one will do: server-sent events (from Lecture 2), ZooKeeper, or explicit HTTP calls.

ZooKeeper, for instance, can replace Redis Pub/Sub here. It has a distributed configuration store that notifies everyone when something is updated, and internally it keeps a persistent connection on which the updates are broadcast. Standard ZooKeeper watches are one-time triggers: a client sees the watch event before it sees the new data, and has to set a new watch after each event. Since ZooKeeper 3.6 a client can set persistent watches that stay registered instead (zookeeper.apache.org ↗).

ZooKeeper’s notification framework is just real-time Pub/Sub: it maintains a pool of TCP connections and, when something changes, notifies everyone subscribed. That is exactly what Redis Pub/Sub did in this design, so the system would work fine with either.

Getting a config change to every LB server: poll, meta-port call, Redis Pub/Sub, ZooKeeper watch

|

| Poll the DB

| Call the meta port

| Pub/Sub (Redis)

| ZooKeeper watch

| Who starts it

| Each LB server, on a timer

| Whoever changed the config: the orchestrator or the console

| The publisher (orchestrator, console, or the database via CDC); the broker fans out

| ZooKeeper notifies every client watching

| Staleness

| Up to one interval of requests to a dead backend

| Near zero

| Extra moving parts

| None

| A second port and handler on every LB server; the caller must reach every one

| A broker, and CDC if the database publishes

| A ZooKeeper ensemble

| An LB server offline at that moment

| Catches up at its next poll

| Misses the call unless the caller retries

| Misses it; re-pull the config on reconnect

| Must re-read and set a new watch: standard watches are one-time

| From class

| The naive way (4.4)

| Proposed in class: port 9091

| The class’s design

| Named as a drop-in replacement

§ 4.6

## Watching the LB servers: metrics and Prometheus

Scaling the LB fleet needs history, not a snapshot. Every machine’s vitals go to one central time-series store, and the orchestrator reads from it.

About 12 min · class 01:30–01:40, Q&A 03:12–03:13 and 03:23–03:34

An LB server is running at 95% CPU. Who adds another one?

Besides the backend servers, someone has to keep an eye on the LB servers too. The orchestrator does it, and “keeping an eye” means more than health: it means seeing whether a server is overwhelmed, its CPU, its memory and so on. If the orchestrator sees very high CPU on the LB servers, it adds one more LB server to the system, and removes one when the load drops. One LB server is definitely not enough; LB servers have to scale horizontally.

To make those decisions the orchestrator needs the key vitals of each LB server: CPU, memory, network, disk. (The board added the number of TCP connections: scaling will happen on CPU, memory and # TCP connections.)

The tempting answer is for the orchestrator to call each LB server every so often, like the health checks, and ask for its current CPU, memory and disk. That is unrealistic, because a point-in-time reading is not enough. Scaling decisions need historical data, not just the current value, so that a rising trend can be acted on. And don’t limit monitoring to the orchestrator and the load balancer: you will want to see overall infrastructure utilization and historical trends, so the data has to be stored somewhere.

Not in the database that holds the configuration. The configuration store holds key-value data, while CPU, memory, disk and network utilization is time series data. Asking a server only at the moment is also too late: a server at 100% utilization may not even respond, which leaves no time to react. You want to react at 60, 70, 80%, and for that you need trends such as average utilization.

Another idea from class: the orchestrator keeps its own database, fed by heartbeat messages in which the LB servers report their CPU. That was turned down too: why re-implement what other systems already implement? Always reuse existing tools. (“Connection pooling”, offered as the tool for collecting metrics, was dismissed as well.)

The vitals are metrics: log them, and do the scaling up and down on the basis of those metrics.

[summary] From practice: CloudWatch, scaled by hand skip unless you run on AWS

From practice: one team already logs exactly these metrics in CloudWatch, but scales up and down manually. CloudWatch is the right kind of tool for it.

A telemetry agent is a process running on each host that emits that host’s metrics. Where should they go? One suggestion was some log storage with alarms on top; alarms are left out here, because the point is a generic, central metrics store.

Prometheus is a brilliant tool that scales amazingly; see prometheus.io ↗.

Don’t limit the design to the system in front of you (“emit metrics to the orchestrator, store them in its database”). Think realistically about the whole organization, and you arrive at a cost-efficient solution on your own: plug into the generic system that is there anyway. The vitals of every VM, backend servers and LB servers alike, go to one central location, so the orchestrator can decide whether to scale backend or LB servers. One place of ingestion and query solves the problem.

Telemetry agents on every VM, LB servers and backends, send their data to Prometheus. The orchestrator periodically checks the average utilization there and decides whether to scale the LB servers up or down or to add backend servers. The class described the agents as pushing. Prometheus actually pulls: it scrapes each target over HTTP, and pushing goes through an intermediary Pushgateway meant for short-lived jobs (prometheus.io ↗). So each VM runs an exporter, Prometheus scrapes it, and the orchestrator queries Prometheus.

[figure title] Vitals flow into one place

[figure description] Every machine, LB servers and backends alike, runs an agent. Prometheus scrapes cpu, memory, network and disk from each agent and keeps them as time series, not key-value config. The orchestrator queries Prometheus for average CPU over the last 30 minutes, a history rather than a snapshot, and adds an LB server when the trend calls for it.

[figure labels] orchestrator · prometheus · query avg cpu (last 30 min) · history, not a snapshot · time series ≠ key-value config · add an LB server · scrape: cpu · mem · n/w · disk · lb · lb · lb · backend · backend · backend · agent · LB servers · backends

[caption] Fig 4·fOne place for every machine’s vitals, drawn as Prometheus works: it scrapes the agents (the class drew the agents pushing). The orchestrator reads the history and scales the LB fleet itself. Redrawn from the class boards at 01:35–01:39 and 01:50.

That is what autoscaling groups and autoscaling policies do in AWS (Lecture 2 used them on API servers). You configure a rule like “if average CPU utilization is this, do that”; internally they query a metrics store, their proprietary equivalent of Prometheus, and act when the condition is met. With target tracking, for example, you pick a metric such as average CPU utilization and a target such as 50%, and Auto Scaling creates and manages the CloudWatch alarms that trigger scale-out and scale-in (aws.amazon.com ↗).

The LB servers are opaque to your users, who don’t know there are several, so the orchestrator itself has to scale the LB servers up and down using the metrics.

### Vitals, health checks, and Prometheus at scale #

If Prometheus has every vital, why does the orchestrator still run its own health checks? Because vitals ingestion, in most cases, does not do health checks. Prometheus can, but the design must not depend on that in case it is ever replaced; heartbeats and vitals go to different services. For reference, Prometheus records up = 1 for every target it scraped and 0 when the scrape failed (prometheus.io ↗).

The read load on Prometheus in this design is small. The query pattern is recent reads (what happened in the last 30 minutes) by one orchestrator. One Prometheus server can be shared by 50 or 100 load balancers, but you need to know its capacity and the load patterns it must support.

As taught, Prometheus can be scaled horizontally with ease: run multiple query-engine servers and replicate the database, because it is just raw storage being scaled. Per the instructor, Prometheus mostly uses InfluxDB in the backend, though storage is configurable and TimescaleDB can be used as well.

More precisely

Prometheus keeps its data in its own local time-series database: two-hour blocks plus a write-ahead log (Prometheus 3.15 docs). Local storage is single-node, not clustered or replicated. Prometheus scales by running more independent servers (sharding, federation) and by remote-writing to a clustered long-term store; InfluxDB or TimescaleDB attach only through those remote write and read APIs.

prometheus.io ↗

To learn Prometheus, follow its official documentation; there are no better resources. It is very well written, very easy to set up, written in Go and very easy to extend.

Autoscaling, finally, is a separate service in this design, just as AWS has a separate autoscaling service, because customers configure their scaling policies through their own admin UI. The orchestrator watches and scales the LB servers; scaling the backend servers can be done by the orchestrator, following those policies, or by a separate component. Whether it gets its own component depends on how bulky the orchestrator becomes. If it gets very bulky, separate it; otherwise let the orchestrator read the autoscaling policies from a database and scale the backends. Either way, a component is needed to accept the developers’ policy configuration through an endpoint.

Where the build stands: low-level details first, then where to store the configuration, updates made reactive, health checks, an orchestrator that scales backend and LB servers, and telemetry from every machine into Prometheus that the orchestrator checks periodically. The client still knows only one address, though. Chapter 5 is how it reaches all these LB servers.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Your LB servers poll the config database every 30 s. A backend dies. For how long can users get errors, and what two designs shrink that to near zero?

[summary] Show answer

Up to one full interval, almost 30 seconds: every LB server keeps routing to the dead backend from its stale in-memory copy until its next poll, and those requests fail. Push the change instead: either whoever changes the config calls each LB server’s meta port so it pulls at once, or the change is published once to a real-time Pub/Sub (Redis, or a ZooKeeper watch) that every LB server listens to. With Redis Pub/Sub, also re-pull the config whenever an LB server reconnects, because delivery is at-most-once.

Why store metrics in Prometheus rather than the config database?

[summary] Show answer

Metrics are time series and the configuration is key-value data. Scaling decisions need history (a trend, an average over the last 30 minutes), not a snapshot, and the whole organization wants every machine’s vitals in one central place to ingest and query. Prometheus already does that, so reuse it instead of re-implementing it.

Give two reasons the orchestrator calls /health instead of waiting for backends to report in.

[summary] Show answer

Any two of three. A backend doesn’t know the orchestrator’s IP, while the orchestrator has every backend’s address in the config. Sending heartbeats needs a thread that runs all the time, far more work for the developers than exposing an endpoint. And a self-report can say “up” while the process can’t actually serve.

Concepts in this section: config copy · orchestrator · health check · stale config · meta port · Pub/Sub and CDC · telemetry agent · Prometheus

Contents of this lecture ↑

Lecture 05, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-dns ===

# Building a load balancer, chapter 5: One name, many LB servers

Lecture 05 · Building a load balancer · chapter 5 of 8

§ 5

## One name, many LB servers

Clients know one address, but there are now many LB servers. DNS, private DNS, the finished design with its two paths, and who keeps the keeper alive.

About 30 min · class 01:40–01:59, Q&A 03:06–03:36

By the end of §4 the orchestrator adds LB servers when the fleet gets busy and removes them when it is quiet. Every one of them has a fresh copy of the configuration. One thing is still missing: a client connects to one address, and nothing so far tells it that the other LB servers exist.

§ 5.1

## Two LB servers, one address

An IP address belongs to one machine. A name can stand for many: give every load balancer a domain name, served by a private DNS.

About 7 min · class 01:40–01:47

You now run two LB servers, 10.0.0.1 and 10.0.0.2. The TCP connection is made to an LB server, and the client has the address of only one of them, 10.0.0.1. How does any request ever reach the second one?

The right answer is DNS: the load balancers are mapped in DNS, and DNS hands out one of the LB servers. What the DNS entry holds is the IP addresses of the machines, 10.0.0.1 and 10.0.0.2, not ports.

It is tempting to think that load balancers are always public and only the servers behind them are private, so putting an LB in DNS is the same as exposing it. Not all load balancers are public. A load balancer in front of a very critical internal microservice should not be, and a private load balancer has the same problem as a public one: it can’t be a single LB server, because what if that one goes down?

So why not just hand clients the IP address of the LB virtual machine? Because that doesn’t scale. An IP address is fixed to a machine, two machines can’t share it, and the LB servers could not grow beyond one. That holds for a plain machine address. An IP address can be made to move: with VRRP a virtual IP fails over from one machine to another (rfc-editor.org ↗). And Google’s Maglev runs many load-balancer machines for the same services: routers spread packets evenly across them with ECMP, and consistent hashing plus connection tracking keep each connection on the same backend (research.google ↗). DNS with many IPs is one valid approach, and it is the one this design takes.

What abstracts many IP addresses? A domain name. When you create a load balancer, you also create a domain name for it, say payments.lb.google.com, and behind that name sit the IPs of its LB servers. Every load balancer you create gets its own.

And this is a private domain. When someone says DNS, most people think of public DNS, google.com or facebook.com, but DNS can be private too, and the load balancer’s domain is a private one. The standing advice here is to work on an SRE team for at least a year and a half: it teaches things like private DNS that many engineers don’t know.

You can launch your own DNS server. It is a very lightweight, simple process. A good open-source one is CoreDNS, one of the most common simple implementations of a DNS server, used across the Kubernetes world. A private CoreDNS instance runs inside your infrastructure, and every machine is configured to use it as its DNS address, so any domain name a machine looks up is resolved by CoreDNS. Cloud providers such as AWS or GCP run a bunch of DNS servers, each configured this way.

[figure title] One name, many LB servers

[figure description] A private CoreDNS server, which every machine in the infrastructure uses as its resolver, holds one entry: the name payments.lb.google.com maps to three machine IP addresses, 10.0.0.1, 10.0.0.2 and 10.0.0.3, not ports. Each IP is one LB server. The orchestrator writes to CoreDNS: when it scales out it adds 10.0.0.3, drawn in green as just added.

[figure labels] orchestrator · adds 10.0.0.3 · when it scales out · coredns · payments.lb.google.com · → 10.0.0.1 · 10.0.0.2 · 10.0.0.3 · IPs, not ports · private infra: every machine’s resolver · lb · 10.0.0.1 · lb · 10.0.0.2 · lb · 10.0.0.3 · LB servers of one load balancer

[caption] Fig 5·aOne private name stands for every LB server of one load balancer. The entry holds machine IPs, never ports, and the orchestrator keeps it current: the green row is the LB server it just added. Redrawn from the class board at 01:44–01:50, where the name was written paym.lb.googl.com.

Pause and think

You put both LB servers’ IPs under one DNS name. When a client sends a request, does it pass through DNS on its way to an LB server?

DNS is a name-resolution service, not a proxy. The client asks for payments.lb.google.com, gets one IP (say 10.0.0.1), caches it for a while, and opens its own connection to that LB server. DNS never sees the request, so it isn’t on the request path and isn’t a bottleneck for it. To add an LB server, the orchestrator just adds its IP to the DNS entry.

§ 5.2

## DNS answers; it doesn’t forward

DNS turns a name into one IP and steps aside. The client caches it, connects by itself, and asks again when that address stops answering.

About 8 min · class 01:46–01:50 and 01:54–01:55, Q&A 03:06–03:12

If every request goes through DNS, isn’t DNS the new bottleneck?

First, how DNS picks. When a name has several IP addresses, the DNS server picks one with the same kinds of strategy a load balancer uses: round robin, weighted round robin and so on. In CoreDNS, for example, the loadbalance plugin acts as a round-robin DNS load balancer by randomizing the order of the A, AAAA and MX records in each answer (coredns.io ↗).

Then the answer goes back. The lookup for the load balancer’s name resolves to one LB server’s IP, which is sent to the user; the user connects to that IP, and the normal load-balancing flow takes over. This is exactly what happens behind the scenes whenever you make an HTTP request.

The worry is still worth stating. If all requests were routed through DNS, DNS would be a bottleneck, and it would itself be acting as a load balancer. “Run multiple DNS servers” is the first answer people reach for, and it only moves the problem: now you load balance between DNS servers. The way out is to look at what DNS actually does with a request.

A tempting picture is that DNS picks an LB server’s IP by its strategy and sends the request on to that load balancer. If it did, DNS would be the load balancer. It doesn’t. DNS sends the IP address back to the client, and the client makes the request itself. DNS is not a proxy. It is only a name-resolution service: given a human-readable name, it returns an IP address, nothing more, nothing less.

The rule for this whole chapter

DNS is not a proxy: given a name, it returns an IP address, nothing more, nothing less.

DNS hands the address back, and the client connects to that IP itself. Or, as it was put bluntly later on: “DNS is a stupid service. It just stores a hash map.”

[figure title] DNS returns an address

[figure description] A client asks DNS for a name and gets back 10.0.0.1; then the client connects to the LB server itself, in blue. A ghosted path from DNS to the LB server is struck through in red: DNS never forwards the request.

[figure labels] client · dns · lb · name? · 10.0.0.1 · the client connects itself

The client always caches the resolved IP address for some time. So a client goes to DNS once, gets the address, and connects to that LB server; from there the TCP connection is on the LB server, which picks a backend, sends the request, gets the response and sends it back.

[figure title] Resolve, then connect

[figure description] Swim lanes for a client, CoreDNS, the LB server at 10.0.0.1 and a backend, time running down. 1: the client asks CoreDNS for the load balancer’s name. 2: CoreDNS picks one IP and answers 10.0.0.1. 3: a wrong path, CoreDNS forwarding the request to the LB server, is struck through in red; CoreDNS only hands out addresses. 4: the client caches 10.0.0.1, connects to the LB server itself, the LB server forwards to a backend, and the response comes back. 5: the LB server at 10.0.0.1 is down; the connect fails, the client asks CoreDNS again, gets 10.0.0.2 and connects there.

[figure labels] client · coredns · lb · backend · 10.0.0.1 · time · name? · 1 · 10.0.0.1 · picks one IP · 2 · I just hand out addresses. · forward? · 3 · 10.0.0.1 · cached (TTL) · connect · response · 4 · connect fails · 10.0.0.2 · 10.0.0.2 · 5

- The client asks DNS for the load balancer’s name, payments.lb.google.com.

- DNS answers with one LB server’s IP, 10.0.0.1, picked by round robin or a shuffle. That is all it does.

- DNS does not forward the request. If it did, it would be the load balancer.

- The client caches 10.0.0.1 and connects to that IP itself. The LB server proxies to a backend, and the response comes back the same way.

- If that LB server is dead, a client built this way doesn’t wait out the TTL. Its connect fails, it asks DNS again, and it connects to 10.0.0.2.

Keys: ← → to step · link to a step with #fig-5b/step-3

[caption] Fig 5·bTime runs down. Dashed arrows are the lookup and its answer; blue is the request, green the response. DNS takes part in steps 1, 2 and 5 only, never in the request itself.

The client here is not only an end user. It can be another microservice, a server, anything that needs a human-readable name resolved.

This is also how the load balancer scales. When the orchestrator sees the need for another LB server, it spins one up and adds its IP, say 10.0.0.3, to the load balancer’s DNS entry. Nobody does this by hand: the orchestrator knows the IP addresses of all the LB servers, and knows when one goes down or comes back, so it is the one that updates DNS. AWS’s Elastic Load Balancing works the same way: DNS returns the IP addresses of the load balancer nodes, and as traffic changes ELB scales and updates the DNS entry, which carries a 60-second TTL so that addresses can be remapped quickly (aws.amazon.com ↗).

What if a client’s cached entry points at an LB server that has since gone down? It might seem the site is unavailable to that client until the TTL expires. It need not be. The class’s answer was to build the client so it doesn’t wait for the TTL: when it can’t connect, it invalidates its cached entry at once and asks CoreDNS again, which gives it another IP address. That is a reactive approach. In practice, many client stacks first try the other addresses from the same DNS answer, one after another (RFC 8305 ↗), and a fresh query can still be answered from an intermediate resolver’s cache until the TTL runs out, since the TTL is how long a record may be kept in a cache (RFC 1034 §3.6 ↗). It is like a toothache. You have a periodic visit to the dentist, but if the tooth is hurting, you don’t wait for that date; you go now.

### What DNS knows, and what it doesn’t #

Does DNS send clients to a second load balancer when the first one is loaded? No. DNS just has the mapping of a domain to several IP addresses and round-robins between them. It has no information about load.

For load balancers run as active and passive, DNS holds only the active one’s IP address. Or use weighted round robin: weight 1 for the active load balancer, 0 for the passive one. Route 53’s weighted routing behaves this way: a weight-0 record gets no traffic, but if all the records with a weight above 0 fail their health checks, Route 53 answers with the zero-weight ones, which gives active-passive failover (aws.amazon.com ↗). Who switches the entry when the active one dies? The orchestrator, which knows when an LB server goes down and when it comes back. DNS is a stupid service: it just stores a hash map.

Concretely, CoreDNS holds the array of IP addresses of all the LB servers against the domain name.

A natural worry: if CoreDNS picks LB servers by round robin, haven’t we recreated the bottleneck that load balancers solved? Should CoreDNS pick by least connections instead? No. CoreDNS has no idea about load. It just picks one IP and sends it back (“at random” in this answer, “round robins” in the earlier one; both as said). It has no brain; the code that does this is literally about 50 lines.

§ 5.3

## Who keeps DNS up?

Several CoreDNS servers, found through DNS in turn, until the load is small enough for one server with a standby.

About 2 min · class 01:55–01:57, Q&A 03:17–03:18

CoreDNS is now on the path of every new connection. Is it the new single point of failure?

No: you run multiple CoreDNS servers.

Then how does a machine know which CoreDNS server to reach? You have a DNS for CoreDNS. Recursively, at some step the load (the word said was “latency”, most likely meaning load) becomes so small that one server can handle it. So there is still one single point of failure in the system, and it has a standby node. That is the base condition of the recursion. In practice DNS does not bottom out in one server with a standby. A resolver lists several nameservers and tries them in turn (man7.org ↗), and the top of the public hierarchy, the root zone, is served by 13 identities running about 2,047 anycast instances (root-servers.org ↗).

A traceroute to google.com can show around 21 levels. Every one of them is horizontally scalable except one: a single point of failure with a standby node. It is so tiny that it rarely goes down, and if it does, the standby takes its place within seconds.

To really understand private DNS, explore CoreDNS hands-on: set one up, configure a domain with a few backend servers behind it, see how it scales, read the official documentation on running it highly available, use it in a private infrastructure, and only then think about exposing it publicly. As of October 2026 the CoreDNS manual has no dedicated production or high-availability guide; it covers installation, plugins, configuration and example setups (coredns.io ↗).

[summary] See it yourself: a private DNS on one laptop skip if you’ve run CoreDNS

Download the CoreDNS binary and put this Corefile next to it. The hosts plugin serves inline entries, and loadbalance shuffles the order of the records in each answer (coredns.io ↗):

lb.internal { hosts { 10.0.0.1 payments.lb.internal 10.0.0.2 payments.lb.internal } loadbalance }

Start it on a high port, then ask it a few times and watch the order of the two addresses change:

./coredns -dns.port=1053 dig @127.0.0.1 -p 1053 payments.lb.internal

Add a third line for 10.0.0.3, as the orchestrator would, and restart.

§ 5.4

## The whole design

Every box on one page, and the two paths through it: the request path a client takes, and the config path a change takes.

About 4 min · class 01:50–01:54, Q&A 03:25

Put every piece on one page.

The final design has several LB servers, the orchestrator, the configuration database, an LB console where developers make changes directly, and a Prometheus server. Every server sends its vitals (CPU, memory, disk and so on) to Prometheus periodically, so all telemetry lands in one central place. The prepared page put the scaling rule in one line: scaling will happen on CPU, memory and the number of TCP connections. Where do we have this data? The monitoring component, Prometheus. The orchestrator periodically queries Prometheus to see whether the LB servers need to scale; when it sees the need, it scales them and makes an entry in the CoreDNS server.

[figure title] The finished load balancer

[figure description] The whole design with two traced paths. Request path, blue, numbered 1 to 5: the client looks up payments.lb.google.com in the private CoreDNS, gets 10.0.0.1 back, connects to that LB server, the LB server picks a backend by its strategy, and the response goes back to the client in green. Config path, dashed, lettered A to D: a developer through the LB console, autoscaling, or the orchestrator changes the config database; CDC carries the change to Redis Pub/Sub; Pub/Sub pushes it to every LB server; each LB server refreshes its in-memory config copy. Control lines, thin: the orchestrator sends health checks to the LB servers and the backends, queries Prometheus, and adds or removes LB IPs in CoreDNS; Prometheus scrapes the backends and feeds autoscaling, and autoscaling points into the LB console / APIs. The orchestrator runs with leader election (the board wrote leaderElec above it).

[figure labels] private infra · coredns · 2 · 10.0.0.1 · 1 · payments.lb.google.com? · 3 · 5 · LB servers · backend · backend · 4 · 5 · leader election · orchestrator · hb · hb · add / remove LB IPs · query · prometheus · scrape · updates · config db · A · cdc · B · redis pub/sub · C · D · lb console / apis · developer · autoscaling · read: Maglev, a fast and reliable software network load balancer

[caption] Fig 5·cThe request path is the only blue line, ① to ⑤; the config path is dashed, Ⓐ to Ⓓ, because no request waits on it. The thin control lines are the orchestrator’s health checks (hb), its query to Prometheus and its writes to CoreDNS, and Prometheus scraping every machine (drawn here to the backends) and feeding autoscaling, which acts through the LB console APIs: its arrow points into the console box. The board wrote “leaderElec” above the orchestrator. Redrawn from the class’s prepared page shown at 01:51.

The request path. The client is anyone who needs a human-readable name resolved. Its request for, say, payments.lb.google.com goes to CoreDNS ①, which returns an IP address ②. The client connects to that LB server ③. The LB server picks a backend by its balancing strategy ④, the backend does whatever processing it needs, and the response goes back to the user ⑤.

The config path. Whenever the configuration changes, because a health check failed, autoscaling kicked in, or a developer changed something, the change is written to the database Ⓐ. Then either CDC kicks in Ⓑ, or the LB server or the orchestrator pushes a message to the Redis broker. Because it is a real-time Pub/Sub, the message reaches all the LB servers at once Ⓒ, and each updates its in-memory copy of the configuration Ⓓ. (Redis Pub/Sub delivers at most once, so a server that was disconnected re-pulls the full config when it reconnects; see the note in §4.5.)

[summary] Read next: the Maglev paper skip unless you read papers

Much of this design is taken from Google’s Maglev paper, “Maglev: A Fast and Reliable Software Network Load Balancer” (research.google ↗). In the lecture’s view it is really easy, not difficult at all; it was one of the first papers the instructor ever read. After this chapter it will make a lot more sense, and it gives more granular detail on the parts covered here.

That is the load balancer: an extremely low-level implementation in §3, then a high-level design. A few things on the drawing are sneak peeks of what comes in later weeks, and locks come next, in §6.

§ 5.5

## Who watches the watcher?

The orchestrator runs as a leader with working followers. It holds no state, so a follower takes over in seconds; one tiny global monitor ends the recursion.

About 6 min · Q&A 03:15–03:17, 03:23–03:25 and 03:34–03:36

The orchestrator now updates the database, DNS and the LB fleet. What if it goes down?

One proposal from class: run three orchestrators with the same code, two of them idle until the active one fails. The refinement: not idle. Without that, the orchestrator is a single point of failure, and its going down is not fine. The fix is leader–follower: one master, and followers that do the grunt work instead of waiting. If the master goes down, a follower automatically takes its place, with one or two seconds of downtime. That is leader election.

[figure title] Base of the recursion

[figure description] Three tiers. Top: a global monitor with a standby; its only job is to watch the master orchestrators. Middle: the orchestrator as one leader and two followers that do grunt work rather than sit idle. The leader sends health checks to the LB servers and the backends. All state lives in the config database, so followers copy nothing. The leader has failed (red outline, a cross at its corner), and a follower takes over as leader within one or two seconds and simply starts sending health checks.

[figure labels] tiny job: watch the masters · global monitor · standby · hb · takes over as leader in 1–2 s · orchestrator · leader · orchestrator · follower · orchestrator · follower · followers do grunt work, not idle · config db · all state lives here: · followers copy nothing · hb · hb · LB servers · backends

[caption] Fig 5·dThe leader has just failed (red), and a follower takes over as leader. It copies nothing first, because every piece of state is in the config database; it simply starts sending the health checks. Above the orchestrators sits one global monitor with a standby, the base of the recursion.

Every component of this design is highly available: the backend clusters through autoscaling, the LB servers, the database, the orchestrator through leader election, and, as listed in class, CoreDNS through leader election. CoreDNS doesn’t need an election, in fact: it is stateless, so you run several replicas and clients list several nameservers, up to three, tried in order (man7.org ↗).

Leader election is a way to get high availability. The alternative is a human who spins up a replacement server when one goes down. Leader election automates that whole process: when one node goes down, another takes its place on its own. ZooKeeper documents a standard recipe for it: each candidate creates an ephemeral, sequential znode, and the one with the lowest sequence number is the leader. When the leader fails, its ephemeral znode disappears, and the candidate watching that znode takes over, without every candidate waking up at once (zookeeper.apache.org ↗).

later in the course: leader election, in depth

Do the leader and its followers need to replicate state between themselves? No, because the orchestrator is stateless. All the state, the IPs of the LB servers and the backend servers among it, is in the database. The orchestrator keeps nothing in memory; it just fires queries to check whether the LB servers need to scale up or down. After a failover the new leader simply starts making the health-check HTTP requests. The servers don’t need to know who the leader is: they answer whoever asks.

Then who monitors and scales the orchestrator itself? It runs in multi-node mode, one master and several followers, so if the master goes down a follower takes over, and the orchestrator as a whole never goes down.

And above it, as in any infrastructure, there is always a global monitoring service, something like Prometheus, watching all the VMs and the key components, including the master orchestrators. It has its own leader and very minimal duties: check each master, and react if something goes down. The probability of that going down is minimized by having a standby. (From the recording it isn’t clear whether “that” is the master orchestrator or the monitor.)

That monitor is the base condition of the recursion: an orchestrator for the orchestrators, which watches their master nodes and triggers a leader election or adds worker nodes when needed. It is the final level, because its responsibilities are so small.

§ 5.6

## Public front doors, private load balancers

Users resolve the public name and land on an API gateway. The gateway reaches the load balancer by its private name, through CoreDNS.

About 5 min · class 01:56–01:59, Q&A 03:17–03:21

A customer types payments.google.com. Do they ever see payments.lb.google.com?

External end users don’t use your CoreDNS. The DNS address configured in their operating system points to public DNS, Route 53 for example, not to a private DNS server. More precisely, their machine asks a public recursive resolver, which asks the domain’s authoritative DNS service, such as Route 53, for the answer (aws.amazon.com ↗).

If a load balancer serves external users, it is public. Then the private CoreDNS doesn’t come into the picture at all: the load balancer’s name is resolved by public DNS, like any public name.

Does adding LB servers then update public DNS? “Kind of.” There is an intermediate proxy layer in between that takes care of it. There are seven different layers in which resolution happens, left out here to keep the design simple; every LB server still has a domain name, just not necessarily a public one. The details are proprietary, and the Maglev paper explains more.

not covered in class: the other proxy layers (“seven more”); start with the Maglev paper

So the design so far oversimplified one thing. The LB servers are not the first layer of interaction: there are more machines and proxies in front of them, and it is the architecture you define that decides what is private and what is public.

Here is the usual shape. You don’t expose payments.lb.google.com to users; you expose payments.google.com. In public DNS, payments.google.com points to the API gateway’s IP address, so the user’s TCP connection goes to the API gateway. The gateway’s configuration says “if you get this path, forward it to this load balancer”. The load balancer has a domain name, and when the API gateway opens its TCP connection to it, the private CoreDNS comes into the picture. That is two layers: the API gateway for public calls, the load balancer private. You can add three or four more, because the API gateway is typically not the first point of entry, as most people think.

[figure title] Public front door, private load balancer

[figure description] A user resolves payments.google.com through public DNS, which points to the API gateway’s IP, and connects to the gateway; often three or four more proxy layers sit in front of it, drawn ghosted. The gateway is public and the load balancer is private: a dashed line separates them. The gateway looks up payments.lb.google.com in the private CoreDNS and connects to the load balancer, which forwards to the backends.

[figure labels] lookup · public dns · payments.google.com · → gateway ip · often 3–4 more proxy layers · api gateway · powered proxy · public · private · lookup · coredns · lb · payments.lb.google.com · backend

[caption] Fig 5·ePublic on the left of the dashed line, private on the right. The gateway resolves the load balancer’s name in the private CoreDNS, as any client would. The ghosted boxes are the proxy layers that often sit in front of the gateway; they are not covered here.

None of this is forced. On AWS, GCP and elsewhere you can put the LB’s address straight into public DNS, bypass the API gateway, and expose payments.lb.google.com to the internet, and that is fine. In reality you expose payments and keep the load balancers private. Either way, whoever connects to the LB servers has to talk to the DNS that holds their name: the private one for a private load balancer.

One summary was offered in class, tied back to an earlier discussion: choose what needs the least configuration and accepts a compromise under partition while keeping the rest of the good properties. It got no direct answer, and it is left here as the class’s open thought.

§ 5.7

## What a load balancer is, and is not

A load balancer spreads load over identical servers. Sessions fit inside it; extra services and authentication don’t.

About 5 min · class 01:59, Q&A 03:08–03:10 and 03:21–03:23

Three tempting requests: put sessions in the load balancer, put authentication in it, and is a load balancer just a reverse proxy?

First, what it is for. A load balancer balances across a homogeneous set of servers. It is not an API gateway. Every service has its own load balancer, with its own LB servers and its own entries in CoreDNS.

Sessions. To keep one user on one server, should you add a separate session service, or route a user’s requests to the same server with consistent hashing? Consistent hashing, in the load balancer. A separate service adds a network hop, for nothing. nginx, for instance, offers hash $key consistent, which uses ketama consistent hashing, so adding or removing a server remaps only a few keys, where a plain hash can remap most of them (nginx.org ↗). Consistent hashing is not a service. It is a normal array of data in the LB server’s memory: a request comes in, the LB server finds where to send it, and sends it. (Round robin needs no session service either: one integer, as in §2.2.)

Don’t add services, random boxes, to a design for the sake of it. Every service is a network hop and slows things down; unless there is a very good justification, find the shortest path possible. Every network call adds roughly three to five to 10 milliseconds of latency, and at scale teams optimize for every microsecond and challenge every single network hop. For scale, a round trip inside one datacenter is about 0.5 ms (Jeff Dean’s figures, around 2012; github.com ↗), and AWS describes latency between Availability Zones in a region as single-digit milliseconds (aws.amazon.com ↗). So a 3–10 ms budget per service hop covers much more than wire time: serialization, TLS, queueing and the handler itself.

[summary] From practice: four services, petabytes skip unless you count services

A good architecture the instructor has seen had only four microservices, and it handled petabytes of data.

Reverse proxy. Load balancers are reverse proxies: a load balancer balances load across a homogeneous system, which is exactly what a reverse proxy does. If you have used a load balancer, you have used a proxy; “reverse proxy” is the generic term, and an nginx reverse proxy is no different in kind. API gateways are powered proxies.

Authentication. User authentication doesn’t belong in the load balancer. It is part of the business logic: when money moves from A to B, verifying that it really is A making the transfer is the service’s job, and the load balancer doesn’t care. The backend service handles it and sends the user an error such as 404 or 403. Some managed load balancers can take on the login step itself: an AWS Application Load Balancer can authenticate users through an OIDC identity provider or Amazon Cognito before forwarding, and passes the signed user claims to the targets in the x-amzn-oidc-data header (aws.amazon.com ↗). Deciding whether A may pay B stays in the service.

Who does what in the finished design: CoreDNS, LB server, orchestrator, Prometheus, Pub/Sub

|

| DNS (CoreDNS)

| LB server

| Orchestrator

| Prometheus

| Pub/Sub

| Holds

| A hash map: name → the LB servers’ IPs

| An in-memory config copy and its connection map

| No state; it all lives in the config database

| Every machine’s vitals, as time series

| Nothing kept; it relays each config change

| Decides

| Nothing about load: it picks an IP in turn or at random

| Which backend gets each request, by its strategy

| Who is healthy, when to scale, which LB IPs DNS holds

| Nothing; it stores and answers queries

| Nothing; it broadcasts to every LB server

| On the request path?

| Only for the lookup; the client then caches the IP

| Yes

| No

| If it dies

| Lookups go to another CoreDNS server

| In the class’s design, clients can’t connect, so they re-resolve and get another IP

| A follower takes over in 1–2 s

| Not discussed in class

| Changes stop reaching the LB servers; re-pull on reconnect (§4.5)

| How it stays up

| Several CoreDNS servers (§5.3)

| Many LB servers behind one name

| Leader election; followers do grunt work

| As taught: more query servers, replicated storage (see the note in §4.6)

| Not discussed in class

### Check yourself #

Answer in your head, or out loud, before opening each one.

Walk the request path for payments.lb.google.com in four steps, and mark which steps DNS is not part of.

[summary] Show answer

(1) The client asks CoreDNS for the name. (2) CoreDNS answers with one LB server’s IP, and the client caches it. (3) The client connects to that LB server itself. (4) The LB server picks a backend by its strategy, proxies the request, and the response comes back through it. DNS is not part of steps 3 and 4: it never sees the request, so it is not a proxy and not a bottleneck on the request path.

A cached IP points at a dead LB server. What does the client do, and why not wait for the TTL?

[summary] Show answer

In the class’s design, when the connect fails, the client invalidates its cached entry at once and asks CoreDNS again, which gives it another LB server’s IP. Waiting for the TTL would leave the site unavailable to that client for no reason; you react when it hurts, the way you go to the dentist with a toothache instead of waiting for the next check-up.

Why can the orchestrator’s followers take over in seconds without copying any state?

[summary] Show answer

Because the orchestrator is stateless. Every LB server and backend IP, and the configuration, lives in the database, so a new leader has nothing to catch up on. It simply starts sending the health-check requests, and the servers answer whoever asks; they don’t need to know who the leader is.

Concepts in this section: DNS for LB servers · private DNS (CoreDNS) · DNS is not a proxy · request and config paths · leader election · API gateway · reverse proxy · consistent hashing

Contents of this lecture ↑

Lecture 05, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-remote-locks ===

# Building a load balancer, chapter 6: Remote locks

Lecture 05 · Building a load balancer · chapter 6 of 8

§ 6

## Remote locks

Three consumers, one queue that protects nothing, and no access to its server. Lock across machines through the network: what to store, why it must expire, and how not to delete someone else’s lock.

About 30 min · class 02:05–02:35, Q&A 02:35–03:06

The load balancer is finished, and every box in it now runs on many machines. Many machines bring a new kind of trouble: two of them can touch the same thing at the same time. Picture a remote queue, queue 7, whose only API is pop, and that pop is not thread safe. Three consumers on three machines read from it, and only one of them may read at a time. Nothing about the queue will help you.

§ 6.1

## Why lock across machines

Two distributed transactions want the same row. Something outside both of them has to say who goes first.

About 3 min · class 00:02–00:04 and 02:05–02:07

Imagine two transactions running in a distributed fashion, both trying to update the same row. One of them has to stop the other. More generally, whenever several processes must coordinate so that the data stays consistent, you need a lock they all respect. In a distributed setup, with no single database to lean on, many more challenges come in.

That is why remote locks and distributed locks are among the most important things in distributed systems: they form the heart and crux of data correctness and consistency.

The chapter goes in this order. First why you need a lock, which is the more important question, then how to implement one using Redis. Redis is only the example. What matters is the core property a system needs before it can act as a lock manager, the core access pattern, so that you could build your own lock manager if you didn’t want to use Redis.

The previous lecture taught database locking through an airline check-in system. Distributed locking is taught here with a synchronization example that is very hypothetical on purpose.

from · Lecture 3: locking the airline seats: row locks inside one database

A lock manager is a remote machine that keeps track of which item is locked by which machine, so that it can coordinate: because this item is locked, you can’t do that operation on it.

[figure title] A central lock manager

[figure description] Three machines below one lock manager. Each machine sends its requests up to the lock manager, which keeps track of which item is locked by which machine. The three machines coordinate through this central lock manager.

[figure labels] lock manager · item → machine · machine 1 · machine 2 · machine 3 · the 3 machines coordinate · through a central lock manager

[caption] Fig 6·aEach machine asks; the lock manager remembers which item each machine has locked. Redrawn from the class board at 02:05.

In the airline check-in system, rows were locked exclusively, so that other transactions couldn’t even read them. Somewhere in the database’s memory it was recorded that this row is locked by that transaction. Everything lived in one machine and one process, so the bookkeeping was just memory updates. With many machines that have to coordinate, there is no shared memory to record it in, and that is why you need a remote lock manager.

§ 6.2

## Threads, processes, machines

Two things that must take turns coordinate through the nearest storage they share: memory, then disk, then only the network.

About 4 min · class 02:06–02:10, Q&A 02:45–02:50

Each transaction in the airline check-in system is a thread. When threads must take turns (one takes a lock on something, the others can’t), they synchronize through something in memory: a mutex, a semaphore, explicit locking, atomic instructions. What do threads have in common? RAM.

Now two processes. On Ubuntu you install or upgrade packages with sudo apt-get upgrade, and if you run it in two terminals at once, the second one refuses. At most one apt-get upgrade may run at any moment, because two would leave the package database in an inconsistent state. As taught, the mechanism is a file on disk: when the process starts, it checks whether the dpkg lock file exists. If it does, the process exits; if not, it creates the file, does its work, and deletes the file when it is done. Precisely, dpkg doesn’t check whether the file exists: it takes an fcntl lock on /var/lib/dpkg/lock (after lock-frontend), and the kernel drops that lock when the process exits, so a crash never leaves a stale lock behind (dpkg frontend spec ↗, fcntl(2) ↗).

[summary] Two apt-gets, from practice skip unless you like the origin

Around 2008–2009, in the first year of college, the class had just been introduced to Ubuntu and taught to install packages. The instructor opened two terminals and ran apt-get upgrade in both, expecting it to go twice as fast. The second one failed every time: the dpkg lock file exists, and it couldn’t move forward. So you can’t run several instances of it.

Put the two side by side and a ladder appears. Threads synchronize through memory. Processes synchronize through the disk, because that is the closest storage shared between processes. And machines? They share no RAM and no disk. What they share is the network, and that is where remote locks come in.

Pause and think

Threads in one process coordinate through memory. Two apt-get processes coordinate through a lock file on disk. What can two separate machines coordinate through?

Use the nearest storage the parties share: memory for threads, the disk (strictly, a kernel-held file lock) for processes, and for machines only the network. That is why locks across machines live in a remote lock manager reached over the network. It is also why they cost so much more than a mutex: a network round trip against a few nanoseconds of in-memory signalling.

[figure title] The sharing ladder

[figure description] Three rows. Threads: two threads inside one process share a RAM chip, and synchronize with a mutex, a semaphore or atomic instructions. Processes: two apt-get processes share the disk, through the lock file /var/lib/dpkg/lock; run apt-get upgrade twice and the second one refuses. Machines: two machines share nothing but the network, so they need a remote lock. An arrow down the side reads: nearest storage they share.

[figure labels] nearest storage they share · threads · ram · processes · apt-get · apt-get · /var/lib/dpkg/lock · machines · machine 1 · machine 2 · network · mutex · semaphore · · atomic instructions · apt-get upgrade, twice: · the second one refuses · a remote lock

[caption] Fig 6·bEach rung down the ladder shares less. The file name is the real one; the class described it as “dpkg.lock exists”. Redrawn from the class boards at 02:06–02:09.

The example is taken from real life on purpose: practical examples beat theory any day.

The principle came back in the Q&A, restated as a rule and endorsed: to synchronize two entities, look for the nearest storage they share. Two threads share RAM, so a mutex or a semaphore. Two processes have separate RAM, so the disk. Two machines share an external store, or, put simply, “anything over a network.”

The rule for this whole chapter

To synchronize two things, use the nearest storage they share.

Threads share memory (mutex, semaphore). Processes share the disk. Machines share only the network, so they need a remote lock.

[figure title] Nearest shared storage

[figure description] Three rows of two boxes: threads share memory (a RAM chip), processes share the disk, machines share the network.

[figure labels] threads · memory · processes · disk · machines · network

What about synchronizing two whole distributed systems, say two clusters doing different kinds of work? “Distributed system” is a vague term, but the answer is the same: they are still machines on a common network, so a shared store reached over the network, such as Redis or a database, does the job. Whenever several machines are involved, synchronization is over the network, because the network is the only thing they share.

It is tempting to think a mutex would be harder to build than a network lock. In fact a mutex is two lines of code in C: everything is in one RAM, the coordination is between threads, and that is peanuts. The network is the costliest channel there is, the worst mode of communication. A polling loop that asks Redis again and again makes a network call every time, while in-memory signalling costs the operating system almost nothing. Prefer signalling to network calls any day.

So if the critical section lives on one single server, use the normal local primitives: synchronized, a mutex, atomic instructions. You don’t need Redis for that.

§ 6.3

## A queue that protects nothing

Queue 7 hands a message to anyone who asks. You can’t change it and can’t reach its server. One consumer at a time, please.

About 4 min · class 02:09–02:14, Q&A 02:40–02:43 and 03:04–03:06

Here is the example. Hypothetically, someone built a very stupid remote queue that gives zero protection. Any consumer that asks makes an API call, the queue does queue.pop and returns the result. queue.pop is not thread safe, so if several consumers fire at the same moment, some of them may get the same message.

You are stuck with this queue. Call it queue 7. It is remote, like SQS, but forget SQS’s guarantees: this one gives none. Three consumers read from it. Throughput doesn’t matter, but exclusivity does: while one consumer is reading from the queue, the others can’t, and only when it is done may another read.

[figure title] Queue 7 protects nothing

[figure description] Queue 7 is a remote queue with no protection: its only API is pop. Three consumers on three machines each call pop. Consumers 1 and 2 call it at the same moment and both get message 1. There is no lock, and no access to the queue’s server.

[figure labels] queue 7 · remote · unprotected · consumer 1 · consumer 2 · consumer 3 · pop() · got msg 1 · got msg 1 · two consumers, one message · no lock, and no access to the queue’s server

[caption] Fig 6·cConsumers pull, so the arrows point at the queue. With nothing to stop them, consumers 1 and 2 pop at the same moment and both get message 1. Redrawn from the class board at 02:10–02:12.

Pause and think

Queue 7 is remote and hands a message to any consumer that asks. You can’t change the queue or touch its server. Can a synchronized block around queue.pop() in your consumer code keep two of your three consumers from reading at once?

The obvious routes each fail on a constraint: a synchronized block (different machines), a lock on the queue’s server (no access), a gatekeeper layer in front (just another layer to protect), a process on the queue’s machine (still no access). What’s left is a lock manager the consumers all reach over the network: a store holding “queue 7 → consumer 1”.

Each of these ideas fails on one of the constraints. A synchronized block around the queue’s get or pop doesn’t work: the queue is remote and the consumers run on different machines. A lock taken on the server where the queue runs isn’t possible: the queue is a black box, you can’t change it, and you can’t access its server. An intermediate layer in front of the queue that lets one request through at a time was rejected too: it just adds one more layer in front of a queue you already have, while the goal is to implement a lock manager. And another process on the queue’s machine is out for the same reason as the server lock: for the consumers the queue is a black box exposing a single API call, and that call is unprotected.

Because the queue gives no protection and all you have is its network interface, you must implement the protection you need yourself. That is the remote lock.

### Real queues, and why the lock still binds #

The queue is deliberately hypothetical: it gives zero protection, and it was chosen as a constraint to understand remote locks, not as a design to re-architect real systems around. Some real queues hide a message from the other consumers as soon as one consumer receives it. Oracle Cloud’s (OCI) queue was the example raised in class (docs.oracle.com ↗), and SQS works the same way: a received message stays invisible to other consumers for its visibility timeout, 30 seconds by default, and reappears if it isn’t deleted in time (docs.aws.amazon.com ↗). That is not part of this example.

from · Lecture 2: SQS’s visibility timeout: a received message is hidden from other consumers for a while

Real queues such as RabbitMQ, SQS and Kafka give the guarantee that a message is not handed to multiple consumers, so you don’t have to build anything around them.

More precisely

RabbitMQ, SQS and Kafka keep two consumers from receiving a message at the same time, but they deliver at least once: a message can come back, even to another consumer, so processing must be idempotent. An SQS standard queue can return a copy of a message if a server was unavailable during the delete, and a message becomes visible again if processing outlasts its visibility timeout (ReceiveMessage ↗). RabbitMQ likewise says consumers “must be prepared to handle redeliveries” (rabbitmq.com ↗); Kafka’s delivery semantics are described in its design docs ↗.

aws.amazon.com ↗

A fair objection: nothing connects Redis (or whatever store holds the lock) to the queue, so a consumer could simply read without taking the lock. It could, and then the same message could reach two consumers, which is exactly what must not happen. The protection holds because you write the consumer code yourself, and that code first takes the lock, then reads the message. That is the problem statement.

Can one consumer read many messages in parallel? It depends on the queue’s guarantees, and SQS, RabbitMQ and Kafka each differ; this hypothetical queue lets a consumer read one message. SQS, for instance, lets a consumer read 10 messages in one call; such details are in each queue’s documentation. How a queue lets many consumer threads read for maximum throughput is queue internal, a different discussion.

coming later · week 7, after this series: building your own message broker, and how queues serve many consumers

§ 6.4

## A database as lock manager, and why locks must expire

Store two things, the resource and its owner. Then ask what happens when the owner dies holding it.

About 4 min · class 02:14–02:18, Q&A 02:38–02:40 and 02:47–02:48

The three consumers have to coordinate among themselves. So use a database as the lock manager. Create a key for the resource, say Q7, and store against it the consumer that is currently allowed to read from the queue. If the value is consumer 1, consumer 1 reads. Consumers 2 and 3 see a name that isn’t theirs and don’t read.

When consumer 1 is done, it removes its name. The entry is open again, and consumers 2 and 3 compete to put their name in. Say consumer 3 wins: it reads the next message, and the other two see consumer 3’s name and wait. This is a classic lock manager, and it stores exactly two things: what the resource is, and who owns it.

There is a catch. What if consumer 1 takes the lock and dies before it can delete it? Then nobody ever deletes it, and the lock is held perpetually by a consumer that no longer exists. So every lock entry needs a TTL, an automatic expiration: if the entry hasn’t been deleted after some time, it deletes itself.

[figure title] A database as the lock manager

[figure description] The same queue and three consumers, now with a database below them. Each consumer writes to the database. The database holds one entry, queue7 → c1, with a TTL: consumer 1 holds the lock and pops from the queue, consumers 2 and 3 wait. The entry expires on its own. The store needs key-value access, atomic instructions and TTL.

[figure labels] queue 7 · remote · unprotected · consumer 1 · consumer 2 · consumer 3 · pop() · db · holds it · wait · wait · queue7 → c1 · + TTL · the entry expires on its own · needs: k,v · atomic · TTL

[caption] Fig 6·dThe lock lives in a store every consumer can reach. Consumer 1’s name is in it, so consumer 1 reads; the others wait. The entry carries a TTL so a dead holder can’t keep it. Redrawn from the class board at 02:14–02:17.

So the store must give you three things: key-value access, atomic instructions (so two consumers can’t both take the lock) and TTL. Redis gives all three, which is why the most common remote lock is built on Redis; the class called it Redlock. Precisely, the common remote lock is a single Redis instance taking SET key value NX EX ttl, and Redlock is the name of its multi-instance version, the subject of §7 (redis.io ↗).

Notice the order the store was chosen in. First, what must be stored (the resource and its owner). Then the edge case (a holder dying without releasing). Then the features required from the database (key-value access, atomic instructions, TTL). Only then a database that offers them: Redis. Redis isn’t the only choice; DynamoDB is another. Redis is popular because it is in memory, and so fast.

In Redis the entry says: this resource is owned by this consumer right now, with an expiration of five minutes. On the board it read queue7 : consumer 2, ex : 300. If consumer 2 doesn’t delete it within five minutes, it expires on its own, so no lock is held forever and the system keeps moving.

### Could it be MySQL? #

Yes. The lock is just a row, and MySQL gives you atomicity, so it can be the lock store, provided you take care of TTL yourself. MySQL also has named locks built in: GET_LOCK('q7', timeout) returns 1 when it gets the lock, and the lock is released by RELEASE_LOCK() or implicitly when the holder’s session ends, normally or abnormally, so a crashed holder leaves no perpetual lock. It is local to a single mysqld (dev.mysql.com ↗).

A cron job that expires stale locks can provide the TTL. The general lesson: focus on the core properties you need from a database, not on the database. If ZooKeeper gives you those properties, use it; if Redis, DynamoDB or MySQL does, use that, and then pick the stack you are comfortable with.

### Doesn’t the TTL cap how long I can work? #

It does. A TTL bounds how long a process can hold the lock. But every implementation has this limit, and the alternative is the bigger risk: a perpetual lock, a lock or a consumed message that is never deleted, and the entire system stalls. Long jobs don’t need a long TTL, though. The holder can extend its lease while it is still working: Redis suggests a Lua script that resets the TTL only if the key still holds the holder’s value, and the DynamoDB lock client does the same with periodic heartbeats against a lease, for example a 3-second heartbeat on a 10-second lease (redis.io ↗, aws.amazon.com ↗).

§ 6.5

## Acquire with SET NX

Every consumer runs the same loop: acquire, read, release. One Redis command makes sure only one of them gets past the first step.

About 3 min · class 02:18–02:22

Every consumer’s code wraps the read in two calls: acquire the lock, read the message, release the lock. All the consumers keep calling Redis to acquire it. One succeeds and reads while the others wait; as soon as it releases, the next one gets in, and so on. That is how the whole process gets coordinated.

[figure title] Redis as the lock manager

[figure description] Queue 7 above three consumers, and one Redis below them acting as the lock manager. Every consumer sends SET NX to Redis; Redis holds the entry queue7 : consumer 1 with an expiry of 300 seconds, so consumer 1 pops from the queue. Consumer 3 says: I’ll just delete the key.

[figure labels] queue 7 · remote · unprotected · consumer 1 · consumer 2 · consumer 3 · pop() · redis · SET NX · lock manager · queue7 : consumer 1  ex 300 · I’ll just · delete the key.

[caption] Fig 6·eRedis is the lock manager. Every consumer asks it with SET NX; the one whose name is stored reads from the queue. The bubble is the tempting release, which 6.6 takes apart. Redrawn from the class board at 02:18–02:22.

Acquiring looks like this. The consumer knows its own ID (hard-coded, or its IP address or host name). In a while True loop it tries to set the lock key q to that ID, and not with a plain SET but with SET NX, with an expiration of 300 seconds. On the board:

# acquire_lock, as on the board while True: v = redis.setnx(q, consumer_id, ex=300) if v == 1: return # we own the lock: go and read the message else: continue # someone else holds it: try again

SET NX sets a key only if it does not exist yet, here with an expiration. It returns 1 if it set the key and 0 if it didn’t, so an existing lock is never overwritten.

Two details from Redis’s documentation make the loop real. SET q <token> NX EX 300 sets the value and attaches the expiry in one command; use it rather than SETNX followed by EXPIRE, because a client that dies between those two calls leaves a lock that never expires (SET ↗, SETNX ↗). And the value should be unique across all clients and all lock requests, for example 20 random bytes; a bare host name isn’t enough when several processes or retries on one host can contend (redis.io ↗).

# the same loop with one real command (redis-py) token = secrets.token_hex(20) # unique per lock request while not r.set(q, token, nx=True, ex=300): # True when set, None when the key exists pass # keep trying until the holder releases

Why can only one consumer win? Because every Redis command is atomic: while one command executes, no other command runs on Redis. However many consumers send SET NX at the same moment, only one of them succeeds. This is the property the lock leans on.

If SET NX succeeds, the consumer owns the lock: it leaves the loop and reads the message from the queue. If not, it keeps looping until someone releases the lock, so most consumers spend their time spinning in that while loop.

§ 6.6

## Release: never delete a lock that isn’t yours

“Release means delete the key” is wrong, and so is “check, then delete”. The check and the delete must be one step.

About 5 min · class 02:22–02:28, Q&A 02:39–02:40

Releasing looks easy: delete the entry. But a release that simply deletes the key is wrong, because a process can then delete the key from Redis even though it doesn’t own the lock at that moment. How, if only the consumer holding the lock ever reaches the release? Through the timeout.

Pause and think

Consumer 1 takes the lock with a 5-minute expiry, but its job takes 6 minutes. When it finishes, it releases the lock with a plain DEL queue7. Is that safe?

At five minutes Redis expires the key; consumer 2 acquires it; at six minutes consumer 1’s DEL removes consumer 2’s lock. Checking “is the value still me?” first doesn’t fully help either, because the key can change hands between the GET and the DEL. The fix is to run the check and the delete as one atomic step inside Redis (a Lua script via EVAL, or DELEX … IFEQ since Redis 8.4).

Consumer 1 holds the lock, so queue7 in Redis says consumer 1, with a five-minute timeout to read and process the message. It takes longer than that. Five minutes pass and Redis deletes the key on its own. Consumer 2 arrives and acquires the lock. Then consumer 1 reaches its release, still believing the lock is its own, and deletes the lock that now belongs to consumer 2. That is the edge case.

So the rule: never delete a lock that isn’t yours. On release, get the current owner, and delete only if it is you.

# release_lock, as on the board v = redis.get(q) if v == consumer_id: redis.delete(q) # the key can expire, and change hands, between these two lines

Even this fails if it runs as normal client code. Consumer 1 executes the GET and sees its own name. Right after that, the expiration kicks in, the key is evicted, consumer 2 takes the lock, and then consumer 1’s delete runs. The condition was true when it was checked, so consumer 1 deletes consumer 2’s lock anyway. The owner check has a second limit: it stops consumer 1 from deleting someone else’s lock, but not from carrying on with its work after its own lock expired while consumer 2 works too. The standard fix for that is a fencing token, a number that grows with every lock grant and travels with every write, so the storage rejects writes from an older holder (Kleppmann ↗, redis.io ↗).

[figure title] Who deletes whose lock?

[figure description] Swim lanes for consumer 1, Redis holding the key queue7, and consumer 2, time running down. 1: consumer 1 sets queue7 to c1 with NX and a 300-second expiry and gets OK. 2: consumer 1 keeps working past five minutes; Redis expires the key. 3: consumer 2 sets the key and gets OK; the key now holds c2. 4: consumer 1 finishes and sends DEL queue7, deleting consumer 2’s lock. 5: replay with an owner check: consumer 1 gets c1 back, the key expires right after, consumer 2 takes it, and consumer 1’s DEL still deletes c2. 6: the check and the delete run as one EVAL Lua script inside Redis; it returns 0 and c2’s lock survives.

[figure labels] consumer 1 · redis · consumer 2 · key queue7 · time · SET NX EX 300 · c1 · OK · TTL 5 min · 1 · still working · expired · (no key) · 2 · SET NX · c2 · OK · 3 · DEL queue7 · c2 · c2’s lock, gone · 4 · replay, with an owner check: · GET · c1 ✓ · expires here · c2 · DEL · c2 deleted · 5 · EVAL · Lua: if get == me · then del · 0 · c2 · c2 survives · 6

- Consumer 1 sends SET queue7 c1 NX EX 300 and gets OK. It holds the lock for five minutes.

- Consumer 1 is slow. After five minutes Redis deletes the key on its own: expired.

- Consumer 2 asks with SET NX and gets the lock. The key now says c2.

- Consumer 1 finishes and sends DEL queue7. It releases “its” lock and deletes consumer 2’s.

- Replay with the owner check. GET returns c1, then the key expires, consumer 2 takes it, and consumer 1’s DEL still removes c2. The key changed hands between the GET and the DEL.

- The fix: send the check and the delete as one Lua script with EVAL. Redis runs it as one indivisible step; it returns 0 and c2’s lock survives.

Keys: ← → to step · link to a step with #fig-6d/step-3

[caption] Fig 6·fTime runs down. Lanes are consumer 1, the key queue7 in Redis, and consumer 2. The small box on the Redis lane is the value stored at that moment.

Consumer 1’s job takes six minutes; its lock expires after five. What happens when it finally releases?

[caption] Clip 6·1The lock expires, consumer 2 takes it, and a blind delete by consumer 1 removes consumer 2’s lock. Release only if it’s still yours, in one atomic step.

[summary] The clip as text 0:35

- Two consumers, one lock in Redis with a five-minute expiry.

- Consumer 1 takes the lock. Consumer 2 keeps trying.

- Consumer 1 is slow. The lock expires underneath it.

- Consumer 2 gets the lock. Two consumers are now working.

- Consumer 1 releases, and deletes consumer 2’s lock.

- Replay with EVAL: check the owner and delete in one atomic step.

- Release only if it’s still yours, in one atomic step.

Three lanes on one time axis in minutes: consumer 1, the Redis key queue7, and consumer 2. At 0 minutes consumer 1 sends SET queue7 c1 NX EX 300 and gets OK, so the key holds c1 with a five-minute expiry, while consumer 2 keeps retrying the same SET and is refused. Consumer 1 works for longer than five minutes. At 5 minutes Redis expires the key on its own, and consumer 2’s next retry gets OK: the key now holds c2 and both consumers are working. At 6 minutes consumer 1 finishes and releases with a plain DEL queue7, which deletes consumer 2’s lock while consumer 2 is still working. The release is then replayed with EVAL, a Lua script Redis runs atomically: it checks whether the key still holds c1 and deletes only then. It returns 0, and consumer 2’s lock stays.

Edge cases like this are where distributed systems show their “glory”: miss one, and your system is not correct.

So make the check and the delete atomic. Redis has EVAL: instead of writing the check in Python, you write it as a Lua script, and Redis runs it in one shot. While that script runs, Redis does nothing else, so nobody can acquire the lock in between. It is a kind of transaction, “kind of”. Since Redis 8.4 the same safe release needs no Lua at all: DELEX key IFEQ my_random_value deletes the key only if its value matches; on older versions use the get-compare-delete script with EVAL (redis.io ↗).

Lua as a language does nothing magical. The atomicity comes from Redis executing the script inside the server. Your client code stays in Python (or Go); only the script is Lua. You pass a script to Redis through EVAL instead of a command, and invoke it from Python like any other call.

RELEASE = """ if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end """ r.eval(RELEASE, 1, q, token) # Redis runs the whole script as one step

The habit to take away: when you design a distributed system, imagine that after every single line something lags or goes down, and check that the system still works. Go to that granularity rather than saying “I’ll have a lock.”

§ 6.7

## Other ways to build the lock

A server that accepts one connection at a time, and ZooKeeper. What matters is the property, not the product.

About 5 min · class Q&A 02:35–02:38 and 03:00–03:04

Why Redis at all? One idea raised uses the network itself: a server that accepts only one connection at a time, so whichever consumer holds the connection holds the lock, and everyone else is turned away or waits. It was called a brilliant idea. It had been held back because the queue was declared a black box exposing only library APIs; using the network for the lock sidesteps that.

It can be built as a normal TCP server. The load balancer of §3.4 accepts connections in a loop and hands each to its own goroutine. Instead, accept one connection and handle it, without spinning up anything else: only one client process can be connected until the first has finished.

[figure title] A lock server that accepts one connection

[figure description] Three consumers above one TCP lock server that accepts only one connection at a time. Consumer 1 has connected, solid green: its open connection is the lock. Consumers 2 and 3 try to connect, dashed red, and are turned away or wait until consumer 1's connection closes.

[figure labels] consumer · 1 · consumer · 2 · consumer · 3 · holds · the lock · lock server · accepts one connection at a time · the others are turned away, or wait

[caption] Fig 6·gThe lock without Redis: a TCP server that accepts only one connection at a time. Consumer 1’s open connection is the lock; consumers 2 and 3 are turned away or wait until it closes.

Two arguments for it came up and were left open. It could avoid the cost of a hosted Redis; the reply was only that you still need “the other parts”, without saying which. And if a consumer holding the connection dies, its TCP connection drops and the server knows the lock is free, which was offered as a clean release. That holds when the holder’s process crashes. If the holder’s host crashes or is cut off, the server’s socket can stay open until the application times out or TCP keepalive fires, and on Linux keepalive is off unless SO_KEEPALIVE is set and starts only after 7,200 seconds idle by default (tcp(7) ↗).

It was not declared equivalent to Redis without putting the features side by side: a two-minute discussion may skip things. What made the idea valuable is that it is fundamental. The lock is simply refusing others a connection, writing such a server is an easy job of a few hours, and the advice is to go and build it.

### ZooKeeper #

Why not ZooKeeper, which offers a leader and more reliable locking? Because ZooKeeper-based locking does exactly what was just built with Redis: either you implement it with Redis, or you use ZooKeeper.

More precisely

ZooKeeper solves the same problem by a different mechanism. Each client creates an ephemeral sequential znode under the lock path; the lowest sequence number holds the lock, and every other client watches only the node just before its own, so a release wakes exactly one waiter, with no polling or timeouts. Ephemeral nodes are deleted when the holder’s session ends (programmer’s guide ↗), and the state is replicated by consensus. That gives stronger safety than a Redis TTL lock (Kleppmann ↗).

zookeeper.apache.org ↗

One objection is that ZooKeeper gives more guarantees: a persistent leader, and fewer problems with time, expiry and the network. The reply: you can add persistence to the Redis approach too, and the point is not that it is better than ZooKeeper, only that it is another implementation of the same thing. As an engineer you need to know how a tool like ZooKeeper is implemented inside, not just say “use ZooKeeper”: someone will ask how it works. In the same answer the load balancer came back: ZooKeeper’s notification framework is just real-time Pub/Sub, a pool of persistent TCP connections that notifies every subscriber when something changes, so it could replace Redis Pub/Sub in that design too (§4.5).

In the instructor’s experience, many young organizations and startups stay away from ZooKeeper. They associate it with Java, and most startups aren’t on Java; they find it intimidating; and they are comfortable building a scrappy solution on Redis.

Choosing a lock store: Redis SET NX EX, a MySQL row with TTL, MySQL GET_LOCK, a single-connection TCP server, ZooKeeper

|

| Redis SET NX EX

| MySQL row + TTL

| MySQL GET_LOCK

| One-connection TCP server

| ZooKeeper

| What holds the lock

| A key, queue7, holding the owner’s value

| A row: the resource and its owner

| A named lock held by a MySQL session

| The one open TCP connection

| The lowest ephemeral sequential znode

| How a dead holder is freed

| The key’s TTL expires

| A cron job clears stale locks

| Released when the holder’s session ends

| The connection drops if the process dies; a dead host needs a timeout

| The ephemeral node goes when the session ends

| Atomic acquire?

| Yes: SET NX is one atomic command

| Yes: one row write, with MySQL’s atomicity

| Yes

| Yes: the server accepts one connection at a time

| Yes: the create is agreed by the ensemble

| Survives the store dying?

| No: one instance is a single point of failure (§7)

| No: one database

| No: local to one mysqld

| No: one server

| Yes: state is replicated by consensus

| From class

| The class’s design (6.4–6.6)

| Works if you take care of TTL; a cron job suggested

| Not discussed in class

| Raised in class, called brilliant; not compared feature by feature

| “Does exactly this”; many startups avoid it

§ 6.8

## Where remote locks really live: MongoDB

A transaction across three shards holds locks that no single shard can keep. Someone has to remember them.

About 2 min · class Q&A 02:43–02:45

Queue 7 was hypothetical. Where are remote locks used for real? Picture a MongoDB distributed transaction across shards that updates three documents, one on shard 1, one on shard 3 and one on shard 5. Another transaction arrives that wants to update the same documents, and it has to be made to wait, because the first transaction holds locks on those documents. Where is that information stored? Two transactions, distributed over shards: the lock state has to live somewhere shared, a remote lock.

MongoDB gives you those guarantees through its own lock manager, which records that this transaction holds a lock on this document of this shard, and that one, and that one. When another transaction asks for a lock on one of those documents, it is told to wait, and it waits until the first transaction commits or rolls back.

More precisely

A MongoDB multi-shard transaction does take document locks on each shard it touches. A conflicting transaction does not wait for the first to commit: by default it waits up to 5 ms for the lock, then aborts and must be retried. Only a write outside a transaction waits for the transaction to end (MongoDB 9.0 docs).

mongodb.com ↗

[figure title] Locks on three shards

[figure description] Transaction A holds locks on one document in each of shards 1, 3 and 5. Transaction B wants the same three documents. As taught, B waits until A commits or rolls back; more precisely, in MongoDB B waits up to 5 ms, then aborts and retries.

[figure labels] txn A holds a lock on each document · shard 1 · A · shard 3 · A · shard 5 · A · txn B · as taught: waits until A commits or rolls back · MongoDB: waits up to 5 ms, aborts, retries

[caption] Fig 6·hTransaction A holds a lock on one document in each of three shards. The graphite line is the class’s version; the red line is what MongoDB documents for a second transaction.

The queue example is the same pattern: three consumers contend for a shared resource, the locks are tracked, and only one moves forward. In the instructor’s words, what was just built is effectively a distributed transaction using Redis as the lock. Strictly, it is mutual exclusion. A distributed transaction also needs an atomic commit or rollback across its participants; it uses locks, but a lock alone is not a transaction (redis.io ↗).

One question is still open: the lock manager is one Redis. What happens when it dies? That is chapter 7.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does a remote lock need a TTL, and what new problem does the TTL create?

[summary] Show answer

Without a TTL, a holder that dies before releasing keeps the lock forever, and the whole system stalls. With a TTL the lock expires on its own, but now a slow holder can outlive its lock: the key expires, another consumer takes it, and the slow one may delete that consumer’s lock when it finally releases (or keep working alongside it).

Why is “check the owner, then delete” still unsafe in client code, and what fixes it?

[summary] Show answer

Because the two steps are separate commands. Between the GET that says “it’s mine” and the DEL, the key can expire and another consumer can acquire it, so the DEL removes their lock. The fix is to run the check and the delete as one atomic step inside Redis: a Lua script sent with EVAL (or DELEX … IFEQ on Redis 8.4 and later).

Name the nearest shared storage for two threads, two processes and two machines.

[summary] Show answer

Threads: memory (a mutex, a semaphore, atomic instructions). Processes: the disk, as with apt-get’s dpkg lock file. Machines: only the network, so a remote lock manager such as Redis.

Concepts in this section: lock manager · nearest shared storage · TTL · SET NX · atomic release · ZooKeeper lock · MongoDB transaction locks

Contents of this lecture ↑

Lecture 05, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-distributed-locks ===

# Building a load balancer, chapter 7: Distributed locks

Lecture 05 · Building a load balancer · chapter 7 of 8

§ 7

## Distributed locks

Your lock store is one Redis. When it dies, nobody can lock anything. Spread the lock over five independent nodes, win a majority, and learn why “minimized” is the honest word.

About 20 min · class 02:27–02:35, Q&A 02:50–02:59

Chapter 6 ended with a working remote lock: three consumers, one Redis, SET NX to acquire and an atomic script to release. Now that Redis goes down. Every consumer sits in its acquire loop, nobody can get the lock, and the system stalls.

§ 7.1

## One Redis is a single point of failure

The lock works, until its one server doesn’t. Distributed locks exist for exactly this.

About 2 min · class 02:27–02:29

The remote lock of chapter 6 is still not done. One instance of Redis is not fault tolerant. If it goes down, nobody can acquire the lock, nobody can move forward, and the entire system is stalled: a single point of failure.

Pause and think

All locking goes through one Redis. It goes down. Should you add a replica with automatic failover to fix it?

Run several (say five) fully independent Redis nodes, try to take the lock on each, and count it as yours only if you got more than half, within the lock’s time. If you didn’t, give back what you got. One node dying no longer stops anyone. “Just run it in a cluster” is not the answer: the point is independent nodes and a majority.

In the instructor’s view, very few companies use distributed locks, and most startups never think of them, because the cloud provides those guarantees. But if you work at AWS or GCP and you are the one building those services, you have to take care of it yourself. Google’s Chubby is a great example.

Distributed locks exist only to solve this problem: the single point of failure of a single-instance lock. “Just run it in a cluster” is not how real systems answer it. The instructor has seen and used them, which is where the confidence comes from.

§ 7.2

## Redlock: a majority of five

Five Redis servers that know nothing of each other. Take the lock on more than half of them, in time, or give back what you took.

About 4 min · class 02:29–02:32

Instead of taking the lock on one Redis, take it on several. Run, say, five Redis servers, all fully independent: no multi-master replication, nothing between them. To acquire, go to all five, one after another or in parallel, and try to take the lock on each.

You own the lock only if you got it on more than 50% of the nodes: three, four or five of the five. Three is more than half of five. Holding a majority means that however many other processes contend, none of them can also hold one. Redis’s own description adds a second condition: the total time spent acquiring must be less than the lock’s validity time, and what you can actually use is the TTL minus that time (redis.io ↗). Majorities are what buy fault tolerance in general: a Raft cluster of five servers keeps working with two of them down, and with more down it stops making progress rather than returning wrong results (raft.github.io ↗).

[figure title] Five independent nodes

[figure description] One client above five Redis nodes, r1 to r5, with no replication and no link between them. The client sends SET NX to every node. r1, r2 and r3 grant it the lock; r4 is already held by another client; r5 times out. Three of five is more than half, and the client got them in less than the TTL, so it holds the lock. Had it failed, it would release the lock on every node and retry later.

[figure labels] client · SET NX · r1 · c1 · got it · r2 · c1 · got it · r3 · c1 · got it · r4 · c2 · taken · r5 · — · timeout · no replication · all independent · 3 of 5 > 50% → acquired, and in less than the TTL · fail → release on every node, retry later

[caption] Fig 7·aFive masters, no replication, all independent. The client got r1, r2 and r3: a majority, taken in less than the TTL. Redrawn from the class board at 02:29–02:31.

If you don’t get a majority, say you got two, release the locks you did get immediately, so that the other processes can contend. Every process keeps coming in and trying, and eventually someone wins, takes the lock and processes the message. Redis’s documentation goes one step further: a client that fails should try to unlock all the instances, even the ones it believes it didn’t lock, because a SET may have succeeded while its reply was lost; then it should retry after a random delay, so that competing clients stop colliding (redis.io ↗).

Two clients race for one lock on five nodes. One gets three, the other two. What must the second one do now?

[caption] Clip 7·1Three of five, in time, wins the lock; the loser releases what it took and retries after a random delay. Distributing the lock buys fault tolerance, not speed.

[summary] The clip as text 0:36

- Five independent Redis nodes. No replication between them.

- Both clients race for the lock on every node.

- More than half, in time, is a win. Two of five is not.

- The loser gives back what it took, at once, and retries later.

- r2 goes down. C1 still holds; no one else can win three of five.

- Distributing the lock buys fault tolerance, not speed.

Five independent Redis nodes, r1 to r5, with no replication between them. Two clients, C1 and C2, each send SET NX for the same lock to all five nodes at once. C1's requests land first on r1, r2 and r3, which store c1; C2's land first on r4 and r5, which store c2; every later request is refused. C1 holds three of five, more than half, and got them in less than the lock's TTL, so it has acquired the lock. C2 holds two of five, which is not a majority, so it fails: it immediately releases r4 and r5 and waits a random delay before retrying. Then r2 goes down and its key is lost. C1 still holds the lock, and when C2 retries it is refused on r1 and r3, gets no answer from r2, and again gets only r4 and r5, two of five, so it fails and releases them again. Spreading the lock over five nodes buys fault tolerance, not speed.

None of this is free. Distributed locks take a toll on performance, and throughput goes for a toss, so you won’t see them in high-throughput systems. They are used where a high degree of correctness and fault tolerance is required. Martin Kleppmann draws the line more sharply: if a lock exists only for efficiency, to avoid doing work twice, a single Redis instance is enough; if it protects correctness, use a consensus system such as ZooKeeper with fencing tokens rather than Redlock (Kleppmann ↗).

What you gain is that one node going down is no problem: the other nodes still hold the lock. Edge cases remain, for example the nodes that hold your lock going down afterwards, and they still affect correctness. But the probability of hitting them is reduced to a bare minimum. Redis’s own Redlock page lists more of them: process pauses, clock jumps and fast restarts can still produce two holders, because Redis does not use a monotonic clock for TTL expiry; it asks you to implement fencing tokens rather than assume a lock lasts as long as the process that took it (redis.io ↗, Kleppmann ↗).

§ 7.3

## The edge case

Two of the holder’s nodes crash and come back empty. Now two clients each count three of five.

About 4 min · class Q&A 02:50–02:55

Here is the edge case. A client acquires the lock on three of five Redis instances. Then two of those three go down. When two fresh Redis nodes are spun up in their place, they know nothing about the lock, so another client can take it on them and on a free node: another majority. Two clients now hold the lock on the same resource.

That is exactly the edge case mentioned when Redlock was introduced. Redlock is not foolproof; it only minimizes the chances. What are the chances that the very servers holding your locks go down? This particular case also has a documented fix, not just a low probability: Redis calls it delayed restarts. Keep a crashed instance unavailable for a bit longer than the maximum lock TTL, so every lock it held has expired before it rejoins; the alternative is AOF persistence with fsync=always, at a performance cost (redis.io ↗).

Look at it from the second client, still looping because it doesn’t have a majority yet, now with only three nodes in sight. One option is a global state that says “my cluster is unhealthy, wait for two more nodes to come up”. Otherwise it proceeds with a majority of what remains, and that is where it can wrongly believe it holds the lock.

The confidence that this stays rare, as taught, rested on two arguments. First, the losers keep failing to get more than 50%, so they keep releasing what they took, while the majority holder, C1, keeps trying to acquire the remaining instances too; eventually the system converges to C1 holding the lock on all of them, though only a majority is needed to move forward. Second, the window is small: the edge case needs the two nodes C1 already holds to go down before C1 acquires the remaining two, which would hardly take two or three seconds, so the probability is very low.

More precisely

In Redlock the winner holds only the majority it got in one pass; it does not keep acquiring the remaining nodes, and losers release everything and retry after a random delay. The risk window when lock-holding nodes restart empty is the lock’s TTL, not a few seconds. Redis closes it by keeping a crashed node out for longer than the max TTL (delayed restarts), or with fsync=always.

redis.io ↗

Asked why C1 would go on acquiring nodes once it already has a majority, the answer in class was that it needs to: that minimizes the edge case, though it doesn’t cover it. As the note above says, Redlock itself doesn’t do this; restarted nodes are handled by delayed restarts and persistence, not by the holder grabbing more nodes.

[figure title] Two holders

[figure description] Five lock cells, one per Redis node r1 to r5, shown again at each moment. 1: c1 holds r1, r2 and r3, a majority. 2: r1 and r2 crash and restart empty; only r3 still says c1. 3: c2 locks r1, r2 and r4, three of five; c1 also believes it holds the lock: two holders. 4: as taught, this needs both nodes to fail in the two or three seconds before c1 grabs the rest, so it is unlikely. 5: more precisely, the window is the whole TTL; keep a restarted node out for longer than the max TTL, and c2 can get only two of five.

[figure labels] r1 · r2 · r3 · r4 · r5 · 1 · c1 locks r1, r2, r3: three of five · c1 · c1 · c1 · 2 · r1 and r2 crash, restart empty · c1 · 3 · c2 locks r1, r2, r4: also three · c2 · c2 · c1 · c2 · two holders · 4 · as taught: unlikely, a window of · 2–3 s while c1 grabs the rest · 5 · fix: keep r1, r2 out > max TTL · out · out · c1 · c2 · c2 · c2 gets two of five: no majority · the real window is the TTL

- C1 locks r1, r2 and r3: three of five, a majority.

- r1 and r2 crash and come back with no memory of the lock. Only r3 still says c1.

- C2 locks r1, r2 and r4: three of five as well. C1 still believes it holds the lock. Two holders.

- In class: this needs both nodes to fail in the two or three seconds before C1 grabs the rest, so the chance is small.

- More precisely: the window is the whole TTL. The fix is to keep a crashed node out for longer than the max TTL; then C2 can reach only two of five, no majority.

Keys: ← → to step · link to a step with #fig-7b/step-3

[caption] Fig 7·bEach row is the lock cell on each of the five Redis nodes at one moment; time runs down. The last step is the documented fix.

The point kept returning to: distributed-system edge cases are minimized, never claimed fully covered or fully mitigated. And the one line people miss is the line that makes all the difference. The line was not named at that moment; most likely it is the one pointed at earlier in the same answer, the failure branch of acquire: if you didn’t get a majority, release the lock on the instances you did acquire.

§ 7.4

## Simulate it on one machine

Five servers are five processes. Slow them down on purpose and watch the edge cases happen.

About 3 min · class Q&A 02:54–02:59

You don’t need five servers to see this. Test distributed behaviour by simulating it: put heavy load on the system and inject explicit delays, one second, five seconds, fifteen seconds, to mimic the edge cases, then watch how the system reacts. That is how Redlock could be explained here with confidence: by having mimicked exactly this situation.

Nor are five Redis servers needed. For the demo, five Redis instances ran on one laptop, on ports 6379, 6380, 6381, 6382 and 6383, and that was the whole setup.

[summary] See it yourself: Redlock on one laptop skip unless you’ll run it

Start five independent servers, one per terminal: redis-server --port 6379, then 6380, 6381, 6382 and 6383. Write a client that runs SET q <token> NX EX 30 against all five and counts the successes, sleeps between acquire and release (1 s, 5 s, 15 s), and releases with the owner-checking script on every node. Run two or three copies at once, then kill two of the servers that a client holds and restart them straight away. You have just built the edge case of 7.3; restart them only after the TTL, and it goes away.

System design and distributed systems are not all theory, and they need no fancy infrastructure. Read research papers and always implement them, going deep into the edge cases where things falter and mimicking those with explicit delays: five processes instead of five servers. The load balancer of this lecture is the classic example of something intimidating that turns out easy once you build it.

In implementation, the devil lies in the details. The instructor could answer the Redlock question only because they had implemented it, and has built about 180 projects and repositories on GitHub over the last ten years, many of them private.

§ 7.5

## Distribute for fault tolerance, scale for throughput

You just made the lock slower on purpose. That is the trade, and it has its own name.

About 3 min · class 02:32–02:35

The idea behind all of this: take a single node of X and make it distributed. That is the idea of distributed systems, and every single piece of your architecture needs to be horizontally scalable, distributed, like this. The next distinction sharpens that sentence.

Here the lock was distributed not to handle scale. It reduces the scale: it lowers throughput. What it gains is fault tolerance and higher availability of the service.

So there are two patterns. You are either scaling something horizontally to handle more load, or making it distributed to get fault tolerance, reliability and availability, which is why this course uses different phrases for them.

The rule for this whole chapter

Scale out for throughput; distribute for fault tolerance. They are different patterns.

Distributing the lock doesn’t handle scale, it reduces throughput; what it buys is fault tolerance and availability.

[figure title] Scale out vs distribute

[figure description] Left, scale out: incoming requests are shared by three API servers, three times the requests. Right, distribute: five Redis nodes all hold the same one lock key; one has failed and one is down, and the lock survives two nodes down, but each acquire is slower.

[figure labels] api · api · api · 3× the requests · scale out · q7 · q7 · q7 · q7 · q7 · same one lock · survives 2 down · slower per acquire · distribute

Three ways to lock across machines: a single Redis, Redlock on five nodes, ZooKeeper

|

| Single Redis

| Redlock (5 nodes)

| ZooKeeper

| Survives a store failure

| No: everyone stalls in the acquire loop

| Yes: one node down is no problem; it needs a majority up

| Yes: its state is replicated by consensus

| Cost per acquire

| One round trip

| A round trip to every node: lower throughput

| A create agreed by the ensemble

| Safety under pauses and clock jumps

| A paused holder can outlive its TTL; fencing tokens fix that

| Restarts, pauses and clock jumps can still give two holders

| Stronger: session-based ephemeral nodes; still pair with fencing tokens

| Used for

| The common remote lock; enough when the lock only saves duplicate work

| Correctness and fault tolerance, not high throughput

| Correctness-critical locks

| From class

| Chapter 6

| The class’s distributed lock (7.2)

| “Does exactly this”: know how it works inside

[summary] Read next skip unless you want the primary sources

Google’s Chubby paper, on a lock service for loosely coupled distributed systems. Google still uses Chubby in production; it was the first research paper the instructor ever read, as an assignment, and it is very influential.

Martin Kleppmann’s post on why you should not use Redlock. It describes an edge case where Redlock doesn’t work; rare, but worth reading anyway (martin.kleppmann.com ↗).

The instructor’s three or four YouTube videos on implementing distributed transactions with locks, and their blogs on distributed systems. Having taken this course, you will follow them more easily than most viewers.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Five Redis nodes: how many must you lock, and what must you do if you don’t get them?

[summary] Show answer

At least three, more than half, and (per Redis) within less than the lock’s TTL. If you don’t get a majority, release the lock at once on the nodes you did get (Redis says: on all five, in case a reply was lost), so others can contend, and retry after a random delay.

Why does Redlock lower throughput, and why use it anyway?

[summary] Show answer

Every acquire and release talks to five nodes instead of one, and contending clients keep taking and giving back partial locks. It is used anyway where correctness and fault tolerance matter: one node dying no longer stalls everyone. It is distributed for fault tolerance, not scaled for load.

Describe the “two holders” edge case and the documented fix.

[summary] Show answer

C1 holds the lock on three of five nodes. Two of those crash and restart empty, so C2 can lock them plus a free node: three of five, and two clients believe they hold the lock. In class the window was put at two or three seconds; more precisely it is the whole TTL. Redis’s fix is delayed restarts: keep a crashed node out for longer than the maximum TTL (or persist with fsync=always).

Concepts in this section: single point of failure · Redlock · majority · delayed restarts · simulate with delays · distribute vs scale

Contents of this lecture ↑

Lecture 05, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 8-what-to-keep ===

# Building a load balancer, chapter 8: What to keep

Lecture 05 · Building a load balancer · chapter 8 of 8

§ 8

## What to keep

The heuristics that ran through both halves, every box and how it stops being a single point of failure, and what comes next.

About 4 min

The load balancer started as one process copying bytes between two sockets and ended as a fleet with a control plane. The locks started as one Redis key and ended spread over five nodes. In both halves the question was the same: what happens when this box dies?

### Every box, and how it stays up #

Each row is a box from this lecture. The third column is what the class said; the fourth adds what the fact-check found, where it found something.

Every box, and how it stops being a single point of failure

|

| What it holds

| What kills it

| How it stays up (from class)

| More precisely

| LB server

| An in-memory config copy and the map of client → backend connections

| A crash, or too many connections for one machine

| Many LB servers behind one DNS name; the orchestrator adds and removes their IPs (§5.2)

| Clients that can’t connect re-resolve; AWS ELB uses a 60 s TTL so its IPs can be remapped quickly

| CoreDNS

| A hash map: name → the LB servers’ IPs

| The machine or the process going down

| Several CoreDNS servers, found through DNS in turn, down to one node with a standby (§5.3)

| Stateless replicas; clients list up to three nameservers. The root zone is 13 identities on about 2,047 instances

| Orchestrator

| No state: everything is in the config database

| The master node going down

| Leader election: followers do grunt work, and one takes over in 1–2 s (§5.5)

| ZooKeeper’s recipe: the lowest ephemeral sequential znode leads

| Config DB

| Backends, algorithm, health endpoint for every load balancer

| The database server going down

| Database high availability, like every other component (§5.5)

| A standby gives failover, not scale: AWS calls RDS Multi-AZ “not a scaling solution” (§1.3)

| Prometheus

| Every machine’s vitals, as time series

| More load than one server’s known capacity

| More query servers and replicated storage (§4.6)

| Local storage is single-node; scale by sharding, federation or remote write (§4.6)

| Redis lock, one instance

| queue7 → its owner, with a TTL

| The one Redis server dying

| It doesn’t: nobody can acquire, and everything stalls (§7.1)

| For efficiency-only locks one instance can be enough; for correctness it is a single point of failure

| Redlock, five nodes

| The same key on five independent Redis servers

| Losing a majority; nodes restarting empty

| Lock a majority, 3 of 5, and release at once if you miss (§7.2)

| Keep a crashed node out for longer than the TTL, and use fencing tokens (§7.3)

### Ten lines to keep #

The same few ideas kept coming back, whichever box was on the board:

- Assume anything and everything will go wrong, then check whether your code and your system handle it (§1.1).

- Start from the day-zero architecture, one machine, one server, one database, one cache, and scale each component from there; one engineer’s approach, “take it with a pinch of salt” (§1.2).

- Every layer must scale out, and know your unit economics: how many requests one server handles, so you can scale linearly (§1.3).

- It is always about money: does the infrastructure get used well? (§2.3)

- Think about practicality whenever you suggest a design idea. The load balancer can’t stop to ask every server for its CPU (§2.5).

- Everyone can build it locally; few get to scale it. So build it (§3.5).

- Make systems reactive rather than polling-based (§4.5).

- Reuse existing tools (§4.6), and don’t add boxes for their own sake: every service is a network hop (§5.7).

- To synchronize two things, use the nearest storage they share (§6.2).

- Edge cases are minimized, never claimed fully covered; the one line people miss makes all the difference, most likely the release-on-failure branch of acquire (§7.3).

Two papers sit under the two halves of this lecture. Google’s Maglev paper, where much of the load balancer design comes from (§5.4), and Google’s Chubby paper, a lock service for loosely coupled distributed systems, still in production (§7.5).

[summary] A learning habit, from practice skip unless you want the habit

The aim of the class is to understand the intuition behind a design, not to mug things up; a session gets stretched rather than compromise on quality to get there.

At the time of this class the instructor was writing their own malloc, to see how memory management happens at the OS level: how a program gets memory, and where exactly the heap lives in RAM. A suggestion from class, that this would mean writing your own inodes, was corrected: inodes belong to the file system, while malloc is in-memory allocation.

The habit behind it: find the scrappiest way to build something, and study whenever possible. That morning, before class, it was the official documentation of the system calls that allocate memory, read until 8:45, time traded for what would otherwise go to Netflix.

### Where this lecture stops #

Each of these was deferred in class on purpose:

- tomorrow · Lecture 6 Distributed ID generators: the intuition, the idea, the key implementation details, and the whys.

- coming later · Lecture 7 A CDN in depth.

- coming later · Lecture 9 Change data capture (CDC) in depth, which fed the config path here.

- week 7 How a queue serves many consumers: building your own message broker, after this series.

Concepts in this section: approach · algorithms · one laptop · control plane · DNS and the design · remote locks · distributed locks

Contents of this lecture ↑

Lecture 05, chapter 8 · written from the class recording and board, with sources linked where a fact comes from outside the class.

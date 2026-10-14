=== PAGE: lecture overview ===

Lecture 06 · week 3, day 2 · running case: one getid() function

# Minting unique IDs

Rewrite one getid() function under ever harder constraints, then see how Amazon, Flickr, Twitter and Instagram answer the same question.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1Why build your own IDsEvery database already hands out IDs. Here is the moment that stops being enough, and the question this whole lecture answers.3 sections · §1.1–1.3

- 2Building getid(), one constraint at a timeOne function, six versions. Each new condition (another machine, threads, a reboot, a busy disk) breaks the last version, and the smallest change fixes it.6 sections · §2.1–2.6

- 3Order, and why clocks break itSome systems need to know which ID came first. Putting time on the left almost does it. Real clocks, and the need for more than one server, are why “almost” is as good as it gets.8 sections · §3.1–3.8

- 4How big should an ID be?A UUID is unique with no coordination at all. The companies in this lecture still turned it down, and the reason is the index.5 sections · §4.1–4.5

- 5Central services: Amazon and FlickrTwo ways to make one place responsible for IDs without making every request wait on it: Amazon hands out ranges, Flickr turns MySQL’s auto-increment into a ticket machine.8 sections · §5.1–5.8

- 6Snowflake: IDs without a serviceTwitter’s 64-bit layout puts time, machine and counter in one integer, with no service in the path. Discord and Sony reuse it with a different start date.7 sections · §6.1–6.7

- 7Instagram: Snowflake inside the databaseSame idea, different home. Instagram packed time, shard and sequence into 64 bits inside a database function, so no API server knows anything about IDs.6 sections · §7.1–7.6

- 8Pagination: the side effectIDs with time on the left can be compared, and tables are kept in key order. Together they make “the next page” cost the same at page 1 and page 1,000.6 sections · §8.1–8.6

- 9What to keepStrict order or throughput, where the ID is born, and the habits this lecture keeps returning to.2 sections · §9.1–9.2

[summary] About this class where this page sits in the course

This is day 2 of week 3, and the whole session is about one thing: distributed ID generators.

The plan has two halves. The first is a journey through the basics: one ID function, built from scratch and rebuilt every time a new condition breaks it, until the foundational ideas are in place. The second is how real companies do it: Amazon, Flickr, Twitter and Instagram, plus a closer look at one interesting side effect.

After the break, that second half covers Amazon’s central ID generation service, then Flickr, Twitter, Instagram, and finally pagination, which the lecture calls “a very interesting side effect of having a good ID generation system”. This page keeps that order, with three moves: “why build your own IDs at all” comes first, the question of ID size gets its own chapter before the companies, and pagination comes after Instagram rather than straight after Twitter.

How to use this page. Implement every one of these approaches yourself. None of them is fancy. Reading the theory is fine, but past cohorts who built them came away understanding far more about why each one works, what it trades away, how logical partitions behave, and why dumping and loading data matters.

### IDs so far #

Until now, IDs have quietly been the database’s job. Lecture 2 grew Medium’s database with sharding and multi-master, called the database the most critical and most brittle component, and met count++ as a race that needs an atomic increment. Lecture 3 locked airline seats with SELECT … FOR UPDATE inside a transaction, and built a key-value store on MySQL with REPLACE INTO and an upsert. Lecture 5 put load balancers and round robin in front of a fleet of servers and named the single point of failure.

This lecture takes the numbering away from the database. It starts from one function, getid(), that must never return the same value twice, and every one of those earlier pieces comes back along the way, each named where it is used.

Lecture 06 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-why-own-ids ===

# Minting unique IDs, chapter 1: Why build your own IDs

Lecture 06 · Minting unique IDs · chapter 1 of 9

§ 1

## Why build your own IDs

Every database already hands out IDs. Here is the moment that stops being enough, and the question this whole lecture answers.

About 8 min · class 00:00–00:04 and 00:45–00:49

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

[figure title] This lecture’s marks

[figure description] Marks used in this lecture’s figures: a laptop is one machine running getid(); wavy lines inside it are threads; a small square with a number is a counter; a circle with hands is a machine’s clock; a long bar split into cells is an ID’s bit layout, with the time field outlined heavier because it is the most significant part.

[figure labels] machine · threads · 42 · counter · 23 · clock · 41 · time · 10 · m · 12 · ctr · ID bit layout, time heavier

[caption] This lecture’s own marks, on top of the course notation above. A laptop is one machine running getid(), as on the class board; the bit bar comes back in chapters 4, 6 and 7, always with the time field outlined heavier.

A shop’s orders table has outgrown one MySQL server. It now lives on two, both in master mode, so a new order can be written to either. Each server auto-increments on its own: 1, 2, 3, 4 on the left, 1, 2, 3, 4 on the right. Order 3 now means two different orders.

This chapter states the problem that picture raises, shows why the database’s own IDs stop working, and sets the starting point for everything after it: one small function.

§ 1.1

## What an ID is, and the job

An ID is whatever makes one thing distinguishable from every other. The job is a function that never repeats itself.

About 3 min · class 00:00–00:03

An ID gives uniqueness to something: a row, a document, an object, an event. Anything that lets you pick out exactly one of them is its ID.

So the problem is easy to say. Assign a globally unique ID to anything that asks for one. Put as code: write a function that returns something unique every single time it is invoked.

[figure title] Two masters, one ID space

[figure description] An API server writes orders to two MySQL masters; a write can land on either. The masters do not talk to each other and each auto-increments on its own, so both hand out 1, 2, 3, 4. Order 3 now names two different orders: the IDs collide.

[figure labels] api · writes go anywhere · master a · master b · auto-increment · auto-increment · 1 · 1 · 2 · 2 · 3 · 3 · 4 · 4 · order 3 = · two different orders

[caption] Fig 1·aTwo masters, one ID space. Both masters accept writes and neither asks the other, so both count 1, 2, 3, 4 and order 3 exists twice. Redrawn and extended from the class board at 00:45 (D-11), where the two databases were drawn as plain cylinders.

It sounds trivial, and that is exactly why distributed ID generation is one of the most misunderstood topics around. The usual reflex is that auto-increment already solves it and that IDs are no big problem. (The recording garbles the lecture’s exact words here; that reflex is the sense of it.)

Most teams never meet the problem until they hit scale. But with how far the internet now reaches, most companies hit that scale sooner than they think, and that is where distributed ID generators come in.

There are two more reasons to learn it in depth. The computer science behind the solutions is beautiful: the ways engineers solved this are worth seeing for their own sake. And once you understand how IDs are made, you notice side effects of good ID schemes that most people never think about. Chapter 8 is one of them, fast pagination.

§ 1.2

## Where the database’s own IDs stop working

Auto-increment is correct on one machine. Two masters that don’t talk to each other break it.

About 3 min · class 00:45–00:49

But MySQL and MongoDB already give every row an ID. Why build anything?

Because of the picture above. Shard the database, or run it multi-master, with two MySQL servers both in master mode and writes landing on either. The two servers don’t talk to each other, so each auto-increments 1, 2, 3, 4 on its own, and the IDs collide.

Once your databases run multi-master, you can no longer rely on the IDs they hand out. You need your own ID logic, for example one that includes the machine’s ID, so each entry is unique across all of them. That is where distributed ID generators come in, and you would typically find custom ID logic in any multi-master setup. The company designs in chapters 5 to 7 show it in practice.

A single MySQL server never has this problem. Its IDs come out 1, 2, 3, 4, 5, 6 because it is one machine and the ID logic is part of its database engine: one engine owns the counter. Section 3.7 comes back to exactly this.

Pause and think

The orders table lives on two MySQL masters, and a write can land on either. Both use AUTO_INCREMENT. After four orders on each, can you still find “order 3” by its ID?

One setting fixes it: step by 2 and start one master at 1, the other at 2, so one issues odd IDs and the other even. It works, with one catch the lecture comes back to: if one master is down for a while, the two sequences drift far apart (section 5.8). Flickr runs exactly this (section 5.7).

One fix was raised in class: let each master auto-increment by the number of masters. With two, one hands out 0, 2, 4 and the other 1, 3, 5, and they never meet. It can be done, with a slight disadvantage the lecture returns to later, and it is exactly what Flickr ships in section 5.7.

§ 1.3

## A function, not a service

The reflex answer is a new microservice. Start smaller.

About 2 min · class 00:03–00:04

The reflex answer to “we need unique IDs” is “I’ll write an ID microservice.” Many people start there, building a new service for ID generation straight away.

Don’t jump to it. Start with an ID function that is part of your own application logic, called locally on every request. A central ID service is an evolution you reach later, only if you need it. Constraining the problem to one local function is what builds the foundation for everything else in this lecture.

The rule for this whole chapter

Start with a function, not a service.

Write ID generation as a function in your own business logic, invoked locally per request. A central ID service is an evolution you reach only if the function stops being enough.

[figure title] A function first, a service later

[figure description] A request handler with a small getid() function inside it: IDs are made locally, on every request. Beside it, a greyed-out separate ID service with a question mark: an evolution for later, only if needed.

[figure labels] request handler · getid() · id service · ? · later, if needed

The lecture closes on the same point from the other side. In its view, the first instinct for ID generation is a microservice, and good engineers instead look at the problem and its most efficient solution; not every solution needs a new service. Section 6.7 picks this up after Snowflake.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Two MySQL masters each accept inserts with AUTO_INCREMENT. Why do IDs collide, and why doesn’t a single MySQL have this problem?

[summary] Show answer

The two masters don’t talk to each other, so each counts 1, 2, 3, 4 on its own and both hand out the same numbers. A single MySQL is one machine: the counter lives inside its one database engine, so every insert gets the next value from the same place.

Name the one setting change that keeps two masters’ IDs apart. What does it give up?

[summary] Show answer

Step by the number of masters, with a different start on each: with two, one issues 1, 3, 5 and the other 2, 4, 6. IDs stay unique. What it gives up is order across the two: if one master is down or busier for a while, its numbers fall far behind the other’s.

Why does the lecture start from a local function instead of an ID service?

[summary] Show answer

A function inside the application, called locally per request, is the simplest thing that can work and the foundation every later design builds on. A central service is an evolution you add only if you need it; reaching for a microservice first skips the question of what the problem actually needs.

So: one function, called on every request, that must never return the same value twice. Build it.

Concepts in this section: ID · multi-master collision · step by N · function first

Contents of this lecture ↑

Lecture 06, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-building-getid ===

# Minting unique IDs, chapter 2: Building getid(), one constraint at a time

Lecture 06 · Minting unique IDs · chapter 2 of 9

§ 2

## Building getid(), one constraint at a time

One function, six versions. Each new condition (another machine, threads, a reboot, a busy disk) breaks the last version, and the smallest change fixes it.

About 25 min · class 00:04–00:25 and Q&A 00:52–00:54

getid() runs inside every request handler of a service. It must return a value nobody has ever received before, from any machine, ever.

This chapter writes it six times. Each version survives one more condition than the last: a second machine, threads, a reboot, a busy disk. Each time, the fix is the smallest change that removes the new collision.

§ 2.1

## Version 1: the current millisecond

Time is unique and always moves forward. Return it.

About 2 min · class 00:04–00:06

Start with the simplest thing that could work. Time is unique and always moves forward, so the ID function can just return the current epoch millisecond:

func get_id() { return get_epoch_ms(); // e.g. 1729 }

That should work. But something must break, otherwise everyone would be using it.

The first price is granularity. Using epoch milliseconds means the function can never be invoked twice within the same millisecond; if it is, both calls get the same value, and you have to go down to micro- or nanoseconds.

[figure title] One machine, one clock

[figure description] One machine returns the current epoch millisecond, 1729, as its ID. That is unique on one machine as long as the function is never called twice within the same millisecond.

[figure labels] m1 · t = 1729 · get_id() → 1729 · fine on one machine, · if never called twice in one ms

[caption] Fig 2·aVersion 1. One machine, one clock: the ID is the current epoch millisecond. Redrawn from the class board at 00:04 (D-01).

So version 1 is correct on exactly one machine, as long as the code is never called twice within one millisecond.

§ 2.2

## More machines, then threads

Every collision has a cause. Put the cause into the ID.

About 4 min · class 00:05–00:10

The service now runs on two machines. Both can run the function within the same millisecond, and both return the same value, 1729. The IDs collide and are no longer globally unique.

The fix is to concatenate the machine ID with the epoch millisecond: m1-1729 on one machine, m2-1729 on the other, unique across both. (m1, m2 is only a naming choice; use whatever identifies a machine.)

func get_id() { return concat(machine_id, get_epoch_ms()); // m1-1729, m2-1729 }

That is the standard move for resolving collisions: whenever you see one, add to the ID the thing that led to it. Two machines collided, so the machine goes into the ID.

The rule for this whole chapter

Whenever you see a collision, add the thing that led to it.

Then look for a cheaper alternative to adding it: a counter instead of the thread ID, a flush every N instead of every time. Both come later in this chapter.

[figure title] Add what caused the collision

[figure description] Two IDs, m1-1729 and m2-1729. The same millisecond collided on two machines, so the machine prefixes m1 and m2, the cause of the collision, are added and underlined.

[figure labels] m1- · 1729 · m2- · 1729 · add what caused the collision

Threads break it again. If the program runs threads on several cores, the function can run twice within the same millisecond on the same machine, and two threads both produce m1-1729.

Thread IDs are typically integers the operating system assigns to each thread; t1, t2 here are just shorthand. Following the rule, the first fix is to add the thread ID: machine ID, thread ID and epoch millisecond, giving m1-t1-1729 and m1-t2-1729.

func get_id() { return concat(machine_id, thread_id, get_epoch_ms()); // m1-t1-1729, m1-t2-1729 }

[figure title] Two machines

[figure description] Two machines call the function in the same millisecond and both return 1729: a collision. Prefixing the machine ID gives m1-1729 and m2-1729, which are unique.

[figure labels] m1 · m2 · t = 1729 · t = 1729 · 1729 · = · 1729 · collision · m1- · 1729 · m2- · 1729 · concat(machine_id, get_epoch_ms()) · two machines

[figure title] Threads inside a machine

[figure description] Two threads on machine m1 run the function in the same millisecond and both return m1-1729: a collision again. Adding the thread ID gives m1-t1-1729, m1-t2-1729, m2-t1-1729 and m2-t2-1729, which are unique.

[figure labels] m1 · m2 · t1 · t2 · t1 · t2 · m1-1729 · = · m1-1729 · two threads, same ms · m1- · t1- · 1729 · m1- · t2- · 1729 · m2- · t1- · 1729 · m2- · t2- · 1729 · concat(machine_id, thread_id, · get_epoch_ms()) · threads inside a machine

[caption] Fig 2·bCollisions, and what was added to stop them. Left: two machines in the same millisecond both return 1729; the machine prefix separates them. Right: two threads on m1 collide again; the thread ID separates them. Redrawn from the class board at 00:05 and 00:09 (D-02, D-03); the board’s last example read m2-t3, drawn here as m2-t2.

§ 2.3

## A static counter, and time drops out

Appending every cause makes IDs long. One shared counter beats any number of threads, and then the time part has nothing left to do.

About 5 min · class 00:10–00:15

There is a second way to separate threads. Instead of the thread ID, add a counter; a common practice is one that resets every few minutes. It matters because always appending the thing that led to the conflict leads to gigantic IDs. A counter avoids that.

The counter is a static counter: one globally allocated variable that every thread can reach. The lecture describes it as living on the heap; strictly, a static variable has static storage duration cppreference.com ↗, not heap storage, but the point is the same: there is one copy per process, shared by all threads. Increment it atomically every time the function is invoked and no two threads can get the same value.

So getid() becomes the machine ID, the timestamp and the counter, incremented on every call. One machine produces m1-1729-01, m1-1729-02, m1-1729-03, then m1-1730-… once the millisecond moves on. With an atomic increment there is never a collision on one machine, however many threads call it.

int counter = 0; // static: one per process, shared by every thread func get_id() { return concat(machine_id, get_epoch_ms(), counter++); // m1-1729-01, m1-1729-02 … }

The increment must be thread-safe, and counter++ is not atomic by default. Wrap it in a lock or mutex, or use your language’s native atomic library. It is the same count++ race as in Lecture 2.

When to reset the counter, every few minutes or every few seconds, is business logic. IDs stay unique anyway, because the millisecond part keeps moving forward, as long as the counter never goes past its integer limit.

That gives two ways to beat thread collisions: append the thread ID, or use an atomically incremented static counter, which works no matter how many threads there are.

Now look at the counter again. It already increases on every call. With an atomically increasing counter, the time part is redundant: the counter alone gives 1, 2, 3, … So drop time, and the IDs get shorter: machine ID plus counter, m1-01, m1-02, m1-03.

int counter = 0; func get_id() { return concat(machine_id, counter++); // atomic increment; m1-01, m1-02 … }

[figure title] From threads to a counter

[figure description] Machines m1 and m2, each with threads. 1: adding the thread ID gives m1-t1-1729 and so on, unique but longer with every new cause. 2: one shared counter, incremented atomically on every call, replaces the thread ID: m1-1729-01, m1-1729-02, m1-1729-03, then m1-1730-01. 3: the counter already increases on every call, so the time part is struck out as redundant. 4: the ID becomes machine plus counter: m1-01, m1-02, m1-03 and m2-01, m2-02, m2-03, unique as long as the counter never resets.

[figure labels] m1 · m2 · t = 1729 · t = 1729 · 1 · concat(machine_id, · thread_id, · get_epoch_ms()) · m1-t1-1729 · m1-t2-1729 · m2-t1-1729 · 2 · concat(machine_id, · get_epoch_ms(), · counter++ · ) · m1-1729-01 · m1-1729-02 · m1-1729-03 · m1-1730-01 · 3 · counter · 3 · the counter already grows on every call: · the time part adds nothing · 4 · concat(machine_id, · counter++ · ) · m1-01 · m1-02 · m1-03 · m2-01 · m2-02 · m2-03

- Adding the thread ID works: m1-t1-1729, m1-t2-1729. But every new cause makes the ID longer.

- One shared counter, incremented atomically on every call, separates any number of threads: m1-1729-01, -02, -03, then m1-1730-01.

- The counter already increases on every call. The time part adds nothing, so strike it out.

- Shorter IDs: machine plus counter, m1-01 … m2-03. Unique, as long as the counter never resets.

Keys: ← → to step · link to a step with #fig-2c/step-3

[caption] Fig 2·cVersion 3 to version 4. Redrawn from the class board at 00:10 and 00:14 (D-04); the board’s m3-03 is drawn as m2-03.

Its one limit is size: the counter can hit the integer limit, which is about 4 billion. With 2^64 it is such a massive number that you might never hit it.

Machine ID concatenated with an atomically incremented static counter solves uniqueness.

§ 2.4

## Surviving a reboot

A counter in memory forgets everything when the process restarts.

About 4 min · class 00:14–00:17 and Q&A 00:52–00:54

The machine restarts at 3 a.m. The static counter lived in volatile memory with no persistence, so it resets to 0, and the machine hands out m1-01, m1-02 again: IDs it already issued. The logic is no longer unique.

The root cause is where the counter is stored: volatile memory. So one idea raised in class was to back the counter up to a file on the machine, and that is the right direction, because volatility is the problem.

The logic then becomes: when the process starts, load the counter from disk. On every call, increment it, immediately save it to disk (open a text file and dump the number in, say), and then concatenate as before. The business logic stays the same; on the class board this step was labelled fault tolerance.

int counter = load(); // once, at process start func get_id() { counter++; save_counter(counter); // on every call return concat(machine_id, counter); }

One detail decides whether this really survives a crash. A plain write() normally lands in the operating system’s page cache, and only fsync() flushes it to the storage device so it can be read back after a crash or reboot man7.org ↗. That flush is also the expensive part of “save the counter on every ID”.

Loading the counter once, when the process starts or the machine boots, is fine.

It is tempting to skip saving altogether: on restart, read the largest ID already stored in the database (the max row ID) and carry on from there. In fact that is load() by another name: loading from disk or from the database is one and the same, you start from that point. And it quietly assumes an entry is written to the database for every ID generated, so that the max row is the last ID. This logic deliberately doesn’t assume that, because writing back to the database is expensive, and many IDs are never written anywhere: they are attached to something and passed along, like a request ID.

§ 2.5

## A disk write on every ID

Saving on every call is correct, and it turns every ID into a disk IO.

About 4 min · class 00:17–00:22

Now the service calls getid() thousands of times a second. Saving the counter on every call means a disk IO per ID. At that rate the disk takes a lot of pressure from a great many micro disk IOs.

That is problem one. Problem two is latency: every ID now waits on a disk IO instead of being served from memory.

Pause and think

getid() saves its counter to disk on every call so a reboot can’t reissue IDs. At thousands of calls a second the disk is drowning. Can you touch the disk far less often without ever reissuing an ID?

Two ideas from class. A boot counter: read a number from the file at startup, add one, write it back once, and put it in the ID, so the in-memory counter can restart at 0 (the cost is a longer ID). A bank of IDs: save “current + 1000” and serve the next thousand from memory, writing again only when they run out. The second is flush-every-N, the next step.

The first idea raised in class adds a third part to the ID: a boot counter. At server startup, read it from the file, increment it and write it back, once. Each startup of the server is now represented by a new value, and the ordinary counter can start from 0 in memory and never be saved per call. Nothing is written to disk while IDs are handed out.

It has two costs. The increment at startup has to be atomic (it can be made atomic), and the ID gets longer. It is a really good approach, because it tackles the disk IO problem head on. Only the long ID might become a problem, and that cost is what chapter 4 is about.

The second idea is a bank of IDs. When you read the counter, say it is 1, add 1000 to it and store that. Then serve IDs from memory, and when you reach the stored value, read and add 1000 again: a thousand IDs in memory for each disk write.

Put differently, you write to disk periodically, at a certain frequency, instead of every time, and the number of disk IOs collapses. Remember this one: it comes in handy at two different places, the next section and Amazon’s ID service in section 5.2.

§ 2.6

## Flush every N, restart from the safest value

Write the counter every N IDs. After a crash, start where no issued ID can be.

About 5 min · class 00:22–00:25

Written as code, the bank of IDs is a flush frequency. Instead of saving the counter every time, write it to disk only every N IDs, for example every 1000. That cuts disk IO by a factor of 1000, a massive performance gain.

At startup the counter starts at load() plus the flush frequency, to stay clear of anything already issued. On each call it increments, and if the counter mod N is 0, it is written to disk.

const N = 1000; // flush frequency int counter = load() + N; // at startup: past anything issued before func get_id() { counter++; if (counter % N == 0) save_counter(counter); // one disk write per N IDs return concat(machine_id, counter); }

Here is why the startup line adds N. Take a flush frequency of 3. Machine m1 hands out 1, 2, 3; 3 mod 3 is 0, so 3 is flushed. Then 4, 5, 6, and 6 is flushed. Then 7, 8, and the machine crashes. The last value on disk is 6, but 8 was already handed out. Restarting from 6 would generate 7 and 8 again, which is wrong.

Pause and think

The counter is flushed every 3 IDs. The disk holds 6. The machine handed out 7 and 8, then crashed. On reboot, which ID does it hand out first?

The disk can only say “at least 6 went out”. Anything up to the next flush may already be in someone’s hands, so the restart jumps past the whole window and pays for it with a few unused numbers.

The disk says 6. Watch where the counter really was when the machine died.

[caption] Clip 2·1Restart from 6 and 7, 8 go out twice; restart from 6 + 3 + 1 = 10 and nothing repeats.

[summary] The clip as text 0:38

- m1 hands out IDs from a counter kept in memory.

- Every third ID, the counter is written to disk.

- Memory runs ahead between flushes; at 6 the disk catches up.

- Two more IDs, then m1 crashes. Disk says 6, but 8 was handed out.

- Restart from 6, and 7 and 8 are handed out a second time.

- Restart from the safest value instead: 6 + 3 + 1 = 10.

- An unused number is fine. A duplicate ID is not.

Machine m1 hands out IDs m1-01, m1-02, m1-03 from a counter kept in memory and writes the counter to disk only every third ID, so the disk holds 3, then 6, while the memory counter keeps climbing between flushes. After m1-07 and m1-08 the memory counter is at 8 but the disk still says 6, and the machine crashes. Restarting from 6 would hand out m1-07 and m1-08 a second time: duplicates. Restarting from the safest value, the last flushed value plus the flush interval plus one, 6 + 3 + 1 = 10, starts at m1-10: m1-09 is never used, and no ID is handed out twice.

So on recovery, start from the safest value: the last flushed value, plus the flush frequency, plus one. In the example that is 6 + 3 = 9, plus 1: 10. The machine hands out m1-10, m1-11, m1-12, and flushes again at 12. The code says the same thing: load() + N gives 9, and the first ++ hands out 10.

Some integers are never handed out: 9, and 8 as well if it was still in flight when the machine died (the class board crossed it out at the crash, and the lecture counted both 8 and 9 as leaked). That is fine. The correctness of the system matters more than using every single integer.

[figure title] Flush every 3, crash, restart safely

[figure description] Time runs down. The memory column lists the IDs one machine hands out, m1-01 to m1-08; the disk column holds the last flushed counter. 1: every third ID the counter is flushed to disk, so the disk holds 03. 2: after m1-06 the disk holds 06. 3: m1-07 and m1-08 go out, then the machine crashes with 06 on disk. 4: restarting from 06 would hand out m1-07 and m1-08 a second time. 5: restarting from 06 + 3 + 1 = 10 hands out m1-10; 9 is never used, which is fine.

[figure labels] time · memory: IDs issued · disk · 1 · m1-01 · m1-02 · m1-03 · flush · 03 · 2 · m1-04 · m1-05 · m1-06 · flush · 06 · 3 · m1-07 · m1-08 · crash · disk still 06 · 4 · m1-07 · = · m1-08 · = · handed out twice · restart at the disk value: duplicates · 5 · 06 + 3 + 1 = 10 · m1-10 · m1-09 · never used: fine

- Every third ID, the counter is written to disk: after m1-03 the disk holds 03.

- After six IDs the disk holds 06.

- Two more IDs, m1-07 and m1-08, then the machine crashes. The disk says 6, but 8 was already handed out.

- Restarting from 6 would hand out 7 and 8 a second time.

- Start from the last flushed value plus the flush interval plus one: 6 + 3 + 1 = 10. A gap of unused numbers buys a correct system.

Keys: ← → to step · link to a step with #fig-2d/step-3

[caption] Fig 2·dThe clip’s static twin, one step at a time. Redrawn from the class board at 00:24 (D-05), where the restart was written 06 + 3 + 1 = 09 + 1 = m1-10, marked “Safest !!”.

Two habits come out of this, and they are the key design constraints for any distributed ID generator.

First, don’t do IO every time. Add a periodicity factor, and keep it as simple as a mod operation: count, take the counter mod N, write. Don’t reach for a thread with a timer.

Second, whenever a machine recovers, start from the safest value. Always think of correctness first.

[figure title] Six versions of getid()

[figure description] A ladder of the six versions of getid() built in this chapter, each with the constraint that forced it: one machine returns the epoch millisecond; many machines add the machine ID; threads add the thread ID; shorter IDs replace the thread ID and time with an atomic counter; reboots load the counter at start and save it on every call; fewer disk writes start from load() + N and save only when the counter is a multiple of N. The part that changed from the rung above is underlined.

[figure labels] 1 · one machine · return epoch_ms() · 2 · many machines · concat( · machine_id, · epoch_ms()) · 3 · threads · concat(machine_id, · thread_id, · epoch_ms()) · 4 · shorter IDs · concat(machine_id, · counter++ · ) · 5 · reboots · counter = · load() · ; counter++; · save(counter) · 6 · fewer disk writes · counter = load() · + N · ; … · if counter % N == 0: · save()

[caption] Fig 2·eSix versions of getid(): the whole chapter on one page. Each rung is the constraint that forced a change and the code that answered it; the underlined part is what changed from the rung above.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why did the time part become redundant once the counter was atomic?

[summary] Show answer

Time was there to make values differ from call to call. An atomically incremented counter already differs on every call, on one machine, however many threads ask. With the machine ID in front, machine plus counter is unique on its own, so the timestamp only made the ID longer.

A boot counter and flush-every-N both cut disk writes. What does each cost?

[summary] Show answer

The boot counter writes once per startup, but the increment at startup must be atomic and every ID carries a third part, so IDs get longer. Flush-every-N keeps the ID short but writes only every N IDs, so after a crash it must skip ahead to the safest value and some integers are never used.

N = 1000, the last value on disk is 5000, and the machine crashed. What is the first ID it may issue after restart, and why?

[summary] Show answer

6001: the last flushed value plus N plus one, 5000 + 1000 + 1. Before the crash the counter could have reached anything up to 5999 without another flush, so anything lower might repeat an ID already handed out. In code, load() + N gives 6000 and the first ++ returns 6001.

Every ID is now unique. None of them says which came first. That is the next constraint.

Concepts in this section: machine ID · static counter · atomic increment · boot counter · flush frequency · safest value

Contents of this lecture ↑

Lecture 06, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-order-and-clocks ===

# Minting unique IDs, chapter 3: Order, and why clocks break it

Lecture 06 · Minting unique IDs · chapter 3 of 9

§ 3

## Order, and why clocks break it

Some systems need to know which ID came first. Putting time on the left almost does it. Real clocks, and the need for more than one server, are why “almost” is as good as it gets.

About 22 min · class 00:25–00:45 and Q&A 00:47–00:52

The IDs from chapter 2, machine ID plus counter, are unique. They carry no order at all. With hundreds of thousands of machines, m1 can be literally anything, and an ID from one machine says nothing about whether it came before or after an ID from another.

This chapter adds the constraint that breaks that: IDs that increase with time, everywhere. Getting close is cheap. Getting all the way there runs into clocks, and then into the limits of distribution itself.

§ 3.1

## Why order matters

When two writes collide, a bigger ID can say which one is newer.

About 3 min · class 00:25–00:28 and Q&A 00:48

The new constraint: globally monotonically increasing IDs. However many machines generate IDs, and wherever a request goes, a later request always gets a larger ID: 1, 2, 5, 6 across ten machines, say, but never smaller than one handed out before.

Why would you want that? Think back to the airline check-in in Lecture 3. How did we know transaction T1 came before transaction T2? By their numbers: 1 and 2 tell you which transaction came first.

Now say two transactions write the same row. It holds a = 10; T1 sets it to 20 and T2 sets it to 30. One common conflict-resolution strategy is that the newer write overrides the older one. With ordered IDs the larger number, 2, marks the newer write, so you accept T2’s value.

[figure title] Which write came first?

[figure description] A row holds a = 10. Transaction T1 sets a = 20 and transaction T2 sets a = 30. Which came first? If T1 carries ID 1 and T2 carries ID 2, the larger number marks the newer write, and with newer-write-wins the row keeps a = 30.

[figure labels] a = 10 · T1 · T2 · a = 20 · a = 30 · which came first? · T1 → id 1 · T2 → id 2 · newer write wins: keep a = 30

[caption] Fig 3·aWhich write came first? With newer-write-wins, the transaction with the larger ID wins, so the row keeps a = 30. Redrawn from the class board at 00:25 (D-06); an unexplained doodle on the board is left out.

Monotonically increasing IDs play a very important role in conflict resolution. It is one of the places they are needed, not the only one.

A harder version of the question came up in class: how do you resolve conflicts by ID when IDs from many machines might not even be unique? At that point the topic was only about 30 percent done, so it was deferred; section 9.1 gathers what the lecture went on to say.

§ 3.2

## Increasing is not the same as sequential

Bigger than everything before it. Not necessarily the next integer.

About 1 min · class 00:27–00:29

Monotonically increasing doesn’t mean purely sequential. The lecture calls 1 2 3 4 5 6 strictly monotonically increasing, and 1 2 5 7 8 9 32 33 34 (just) monotonically increasing: each new ID is guaranteed to be greater than all the IDs generated before it. In standard terms, what is asked for here is a strictly increasing sequence with gaps allowed mathworld.wolfram.com ↗; gap-free 1, 2, 3, … is the stronger property usually called sequential.

[figure title] Increasing, with and without gaps

[figure description] Top row: 1 2 3 4 5 6, every integer in turn, which the lecture calls strictly monotonic. Bottom row: 1 2 5 7 8 9 32 33 34, with gaps; each ID is still larger than every ID before it, which is all the lecture's 'monotonic' asks for.

[figure labels] strictly monotonic, as the lecture says it · 1 · 2 · 3 · 4 · 5 · 6 · monotonic: gaps allowed · 1 · 2 · 5 · 7 · 8 · 9 · 32 · 33 · 34 · no gaps · each one bigger than all before it

[caption] Both rows only ever go up. Only the top one has no gaps; the rest of this lecture asks for the bottom row’s property.

§ 3.3

## Put time on the left

Flip the concatenation and the clock does the ordering for you.

About 4 min · class 00:28–00:33

What if we flip the order and concatenate time first, then the machine ID? Time always moves forward, and now it sits in the most significant digits, so the IDs get a natural order: 1729 0001, 1729 0002, 1730 0001. It is pretty decent, though not strict.

func get_id() { return concat(get_time_ms(), machine_id); // instead of machine–time, now time–machine }

The time part forms the most significant bits. The lower part can be the machine ID or, perfectly fine, a counter: the left half decides the order, and the right half only breaks ties.

[figure title] Time first decides the order

[figure description] Six eight-digit IDs: 1729 0001, 1729 0002, 1730 0001, 1730 0002, 1730 0003, 1731 0001. The first four digits are the time in milliseconds, the most significant part, so they decide the order; the last four digits are the machine ID or a counter and only break ties within one millisecond.

[figure labels] time · machine · or counter · 1729 · 0001 · 1729 · 0002 · 1730 · 0001 · 1730 · 0002 · 1730 · 0003 · 1731 · 0001 · decides the order: · most significant part · makes sorting simple · a tie is broken by · the second half · return concat(get_time_ms(), · machine_id)

[caption] Fig 3·bTime first decides the order. The heavy underline marks the time digits, the most significant part; the second half breaks ties within one millisecond. Redrawn from the class board at 00:29 (D-07).

Within one millisecond the order can still flip. If the first request goes to machine 2 and the next one to machine 1, you get 17290002 first and then 17290001. Once the millisecond passes, IDs are almost monotonically increasing across the whole system.

And it costs almost nothing. The design is still stateless, so a request can go to any machine; there is no central state to maintain, and throughput stays excellent. In exchange you accept a little incorrectness. If the machine ID is an integer, the whole thing is just bits: time and machine ID concatenated into one number.

This is why, whichever ID generator you pick, you will always see time sitting on its leftmost side: as time moves forward the number only gets bigger, so time-sortable ID schemes sort roughly by creation time rfc-editor.org ↗. The class board put it as “all ID generation algorithms have time on LHS”, under the word sortability.

It is a good solution, but it still doesn’t guarantee monotonicity. The flip within a millisecond is one reason; the clocks themselves are the other.

§ 3.4

## Clocks drift

Time on the left assumes every machine reads the same time. None of them quite does.

About 5 min · class 00:32–00:37

The design so far assumed something on the time side: that every machine’s clock is perfectly synchronized with every other. That is not the case. Clocks go out of sync.

A little misordering within one millisecond can be let go. Misordering at the level of seconds should not happen, and that is exactly where unsynchronized clocks become a problem.

Servers going out of sync is so common that SRE and DevOps teams run a process that keeps syncing the machines’ clocks with NTP servers.

[summary] How clocks are actually synced skip unless you run servers

In practice the sync is a daemon (chronyd, ntpd, systemd-timesyncd) that runs all the time. Rather than resetting the clock, it disciplines it by running it slightly faster or slower. ntpd slews the clock when the offset is under 128 ms and steps it when the offset is larger, and kernel slewing is limited to 0.5 ms per second, so each second of correction takes about 2000 s to apply ntp.org ↗.

Why do clocks drift at all? Because a machine’s clock is a hardware clock. A quartz crystal vibrates at a particular frequency inside your laptop, your server, your CPU, and the machine counts those vibrations to tell that a second or a millisecond has passed.

Physics nudges that count. Give energy to a thing and it vibrates faster: water over a fire heats up and boils. Take energy out and it slows down and freezes into ice. That holds for every element. So the lecture’s reasoning goes: heat the CPU, say with a high-intensity game, and the quartz crystal vibrates faster, so the clock runs fast; put the machine somewhere extremely cold, and the vibration slows, so the clock runs slow.

More precisely

Quartz frequency does vary with temperature, which is why clocks drift and need syncing, but not in one direction. A common 32.768 kHz tuning-fork crystal is typically accurate to about ±20 ppm at room temperature, and its error follows a parabola of about 0.04 ppm/°C² around roughly 25 °C, so it loses accuracy at both high and low temperatures.

ecsxtal.com ↗

Because physical effects like these speed up or slow down a computer’s clock, a periodic job has to keep clocks in sync, and it runs more often than you think.

[summary] You can’t run away from nature skip unless you like war stories

A story the lecture told: Google’s Jeff Dean and Sanjay Ghemawat once chased a bug that turned out to be a bit flipped by a natural phenomenon (the lecture said an explosion or a solar storm). The lecture recommended the article about the two of them, which it remembered as “the friendship that made Google special”; it is The New Yorker’s “The Friendship That Made Google Huge” (2018). The lecture’s point: you cannot run away from nature.

Even assuming every clock is synced with NTP periodically and eventually, in between there is always a chance that a clock is out of sync at the very moment an ID is generated.

[figure title] A clock that runs fast, a clock that runs slow

[figure description] True time runs along the bottom, what each clock says up the side. A perfect clock is the diagonal. Clock A drifts ahead of it and clock B drifts behind; each sync nudges them back toward the diagonal, and they drift again. Just before a sync, clock A is off by the gap marked in red: if an ID is made at that moment, its time part is wrong by that much. A quartz crystal's rate shifts with temperature, which is why clocks drift at all.

[figure labels] true time · what the clock says · clock A · perfect · clock B · sync · skew at the moment · an ID is made · quartz: rate shifts · with temperature

[caption] Fig 3·cA clock that runs fast, a clock that runs slow. Each sync pulls a clock back toward true time, and it starts drifting again. What decides an ID is the gap at the moment it is made. The crystal’s rate shifts with temperature; per the note above, both hot and cold usually make a common crystal run slow.

§ 3.5

## Four machines, four clocks

One millisecond of skew is enough to put a later request before an earlier one.

About 3 min · class 00:37–00:39

Here is what skew does to time-first IDs. Four machines, numbered 2, 4, 7 and 9, have clocks reading 23, 24, 23 and 23. Four requests arrive one after another, to M2, M4, M7 and M9 in that order.

Pause and think

IDs are time, then machine number. Four machines read 23, 24, 23, 23 ms. Requests reach machines 2, 4, 7, 9 in that order. Do the IDs come out increasing?

Time-first IDs are only as ordered as the clocks behind them. Clock sync narrows the gap but can’t remove it at the moment an ID is made, so strict order across machines is “almost impossible”.

Four requests, one after another. Watch the IDs come out.

[caption] Clip 3·1Arrival order and ID order no longer match.

[summary] The clip as text 0:36

- Four machines. At the same instant, their clocks disagree.

- First request goes to m2: time 23, then machine 2. ID 232.

- Second request: m4, whose clock reads 24. ID 244.

- Third: m7, clock 23. ID 237 is smaller than the ID before it.

- Fourth: m9, clock 23. ID 239.

- Arrival order and ID order no longer match.

- Where you need order, clock skew affects correctness.

Four machines, m2, m4, m7 and m9, whose clocks read 23, 24, 23 and 23 at the same instant. Four get_id requests arrive one after another in real time: to m2, then m4, then m7, then m9. Each machine makes its ID by putting its clock time first and its machine ID after it, so the IDs come out 232, 244, 237, 239. Because m4's clock is ahead, 244 is followed by the smaller 237: in arrival order the IDs go up, then down, so they are not monotonically increasing. Arrival order and ID order no longer match, and where a system needs that order, clock skew affects its correctness, so it has to be handled.

The IDs come out 232, 244, 237, 239. They are not monotonically increasing.

[figure title] Four machines, four clocks

[figure description] Four machines, m2, m4, m7 and m9, whose clocks read 23, 24, 23 and 23. IDs are time then machine number. Four requests arrive one after another, to m2, m4, m7 and m9. 1: m2 makes 232. 2: m4, whose clock is ahead, makes 244. 3: m7 makes 237, smaller than the 244 before it. 4: m9 makes 239. The IDs come out 232, 244, 237, 239: not monotonically increasing.

[figure labels] m2 · 23 · m4 · 24 · m7 · 23 · m9 · 23 · in order · 1 · 232 · 2 · 244 · 3 · 237 · smaller than 244 · 4 · 239 · 232, 244, · 237 · , 239 · not monotonically increasing

- First request: machine 2, clock 23. ID 232.

- Second: machine 4, whose clock reads 24. ID 244.

- Third: machine 7, clock 23. ID 237, smaller than the one before.

- Fourth: machine 9, ID 239. The IDs come out 232, 244, 237, 239: clock skew broke the order.

Keys: ← → to step · link to a step with #fig-3d/step-3

[caption] Fig 3·dThe clip’s static twin. Blue arrows are the requests in arrival order; the thin red ring marks the clock that is ahead. Redrawn from the class board at 00:37 (D-08).

So wherever monotonicity is needed, clock skew is something you have to take care of, because it affects the correctness of the system.

How far can you take care of it? Ensuring strict monotonicity across a distributed system, where the ID logic runs on many machines, is almost impossible. That is not a theoretical proof, and none was found, but in practice too many things can break it.

§ 3.6

## One server, one clock

Move ID generation onto one machine and the problem changes shape.

About 3 min · class 00:39–00:41 and Q&A 00:47–00:48

Then let one machine hand out every ID. That is a central ID generation service: one machine, and whoever wants an ID makes a network call to it; the ID server generates one and sends it back. (Throughput is set aside for now.) The board’s motivation: instead of keeping ID generation inside the application logic, a central ID service should solve the clock-skew problem.

[figure title] One ID server

[figure description] One central ID server runs the same get_id() with one clock. Client 1 and client 2 each make a network call to it and get an ID back. Because there is only one clock, the IDs it hands out increase no matter which client asks; the server's speech bubble says its clock never goes back.

[figure labels] my clock never goes back · id server · same get_id(), one clock · client 1 · client 2 · id · id

[caption] Fig 3·eOne ID server runs the same get_id() with one clock, and every client calls it. The bubble is the claim this section rests on; the note below the next paragraph says when it holds. Redrawn from the class board at 00:41 (D-09).

At this point the problem stops being ID generation. It becomes clock synchronization.

On a single machine, skew doesn’t break the order. When NTP sync finds the clock is ahead, reading 24 when it should read 23, the clock doesn’t jump back. It slows its counting until real time catches up, and then carries on from 24. Always remember: the clock never goes back in time. Never.

More precisely

For small offsets NTP does slew the clock, slowing or speeding it rather than jumping (ntpd slews under 128 ms ntp.org ↗; chrony works the same way chrony-project.org ↗). But larger offsets are stepped, and the wall clock (CLOCK_REALTIME) can then jump backwards; CLOCK_MONOTONIC can’t, but it doesn’t tell wall time. So time-based ID generators detect a backward step and wait or refuse, as Twitter’s Snowflake does github.com ↗.

man7.org ↗

So if ID generation sticks to one server, whose clock always moves forward, it always produces monotonically increasing IDs, wherever the requests come from. It runs the same get_id() as before, just in one place.

More precisely

Only if the generator guards against the wall clock stepping backwards. Snowflake refuses to issue IDs until time passes the last ID it generated; alternatively, use a monotonic clock man7.org ↗, or keep the last value in memory and never go below it.

github.com (twitter-archive/snowflake) ↗

What about a shared database with locks, instead of a shared ID service? It would be unique. But that database is still a single machine: it has itself become the shared service. One and the same thing.

§ 3.7

## Two servers, gossip, and the impossibility

Make the one server fault tolerant and the order guarantee falls apart.

About 4 min · class 00:41–00:44 and Q&A 00:50–00:52

The one ID server is a single point of failure: the server could fail, or its disk could. So for fault tolerance you add one more machine behind a load balancer, as in Lecture 5.

Now whichever server gets a request has to talk to the other ID server first, to see the last ID it generated, add some buffer on top, and only then generate a new ID. The two servers have to gossip constantly about the IDs they generate, so that each new one is larger than any ever generated. That turns a simple function into something super complex, and it loses throughput: continuous gossip at high throughput becomes very messy. On the class board: “we made the entire process super complicated”.

[figure title] Two ID servers must gossip

[figure description] To remove the single point of failure, two ID servers sit behind a load balancer and clients reach either one. Before answering, whichever server gets a request must ask the other for its last ID and add a buffer, so the two gossip on every ID. That constant gossip, marked red, makes a simple function slow and complex.

[figure labels] gossip: what’s your last id? · slow, complex · id server · id server · lb · client 1 · client 2 · two servers, to remove the single point · of failure, which now must agree on every id

[caption] Fig 3·fTwo ID servers must gossip. Removing the single point of failure means two servers that must agree on every ID before answering; the red mark is the cost. Redrawn from the class board at 00:41 (D-10), where the gossip was scribbled over in red.

Which leads to the conclusion of this whole evolution: you cannot have an ID generation service that is distributed in nature and also guarantees strict monotonicity at high throughput. Systems that do hand out strictly increasing values across machines pay for it with coordination: TiDB routes every timestamp through one allocator, 46 bits of physical milliseconds plus an 18-bit logical counter, that always moves forward docs.pingcap.com ↗, and Google Spanner uses its TrueTime clocks to assign increasing commit timestamps across all servers cloud.google.com ↗. That costs latency and availability; independent generators can only be roughly ordered.

Every fix brings a new problem or a new constraint. So the solutions out there relax constraints instead, toward non-integer IDs or no monotonicity, because not everyone needs monotonicity.

“But a MySQL server has monotonic IDs.” It does, because MySQL is a single machine, not a distributed one, and the ID logic is part of its database engine. That is why you see 1, 2, 3, 4, 5, 6. Even there the values are not gap-free: InnoDB never reuses auto-increment values after a rollback, so gaps are normal dev.mysql.com ↗.

Make MySQL distributed and that ends. Put it in multi-master mode with an auto-increment ID and look at the number of conflicts you get: each master is its own brain. MySQL’s own fix is the one from section 1.2: when Group Replication starts in multi-primary mode with the defaults untouched, it sets each server’s auto-increment increment to 7 and its offset to the server ID, so the primaries never collide dev.mysql.com ↗. You get uniqueness, not order.

Another idea raised in class: a distributed set of ID servers, each appending its own server ID to the IDs it generates. That is also correct. It loses monotonicity, and that is fine.

§ 3.8

## Relax the constraint

If strict order is out of reach, ask whether you needed it in the first place.

About 3 min · class 00:44–00:45 and Q&A 00:49–00:52

So how do people actually do it? Everything in computer science and software engineering is a trade-off: you get something, you lose something. Always.

When you are handed requirements for ID generation, or anything like it, ask whether you really need each constraint. Challenge them with critical questions. Is it OK if IDs are not integers? If they are random, like UUIDs or GUIDs? If they are not monotonic? In most cases the requirements say monotonicity is needed, and after a couple of critical questions it turns out otherwise, because not everyone thinks it through.

The rule for this whole chapter

You cannot distribute ID generation and also guarantee strict order at high throughput, so ask whether you really need that order.

Integers? Random? Monotonic? Challenge each requirement with critical questions before you pay for it. Most of the designs in the rest of this lecture are what you get by relaxing one.

[figure title] Relax what you don’t need

[figure description] Two clocks reading 23 and 24, and under them the IDs 244 and 237 with a red cross between: distributed clocks break strict order. Underneath: relax what you don't need.

[figure labels] 24 · 23 · 244 · 237 · relax what you don’t need

Why a counter in chapter 2 and not a random suffix? The counter was there for monotonicity, which a random ID doesn’t give. You may think you need monotonicity; in reality you can often relax that constraint, and then a random ID like a UUID works.

So why not use UUIDs instead of all this complexity? You can, if it is OK to relax the constraint, since not everyone needs strict monotonicity. With UUIDs you lose ordering. You get some, you lose some.

Since the class

Random UUIDs (version 4) lose ordering. Time-ordered UUIDv7, standardized in RFC 9562 (2024), keeps rough creation order at 128 bits by putting a millisecond Unix timestamp first. PostgreSQL 18 generates them with uuidv7(), alongside gen_random_uuid() for random ones postgresql.org ↗.

rfc-editor.org (RFC 9562) ↗

Where UUIDs, MongoDB’s IDs and the like fit, what they cost, and how monotonicity helps in real situations, is the next chapter.

There is no one right way to do ID generation. Each approach gains in some places and loses in others. Choose what you want and what you can give up, while getting the most throughput, performance and efficiency.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Machines read 23, 24, 23, 23; IDs are time then machine. Requests go to machines 2, 4, 7, 9. Which IDs come out, and which pair breaks order?

[summary] Show answer

232, 244, 237, 239. The pair 244 then 237 breaks it: machine 4’s clock is a millisecond ahead, so the request after it, on machine 7, gets a smaller ID.

Why does one ID server give ordered IDs, and what has to be true of its clock for that to hold?

[summary] Show answer

One machine has one clock, so there is no skew between generators, and every request gets the next ID from the same place. It holds only if that clock never steps backwards from the generator’s point of view: NTP slews small offsets, but larger ones can step the wall clock back, so the generator must wait or refuse until time passes its last ID (or use a monotonic clock).

Name two questions to ask before accepting “IDs must be monotonic”.

[summary] Show answer

Any two of: do they really need to be strictly ordered, or is roughly time-ordered enough? Can they be random, like UUIDs? Do they have to be integers? Every yes you can turn into a no removes coordination you would otherwise have to pay for.

If order is negotiable, the next question is size: a UUID is one call away. Chapter 4 asks why the big companies still say no.

Concepts in this section: monotonic IDs · time on the left · clock drift · clock skew · central ID server · relax constraints

Contents of this lecture ↑

Lecture 06, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-id-size ===

# Minting unique IDs, chapter 4: How big should an ID be?

Lecture 06 · Minting unique IDs · chapter 4 of 9

§ 4

## How big should an ID be?

A UUID is unique with no coordination at all. The companies in this lecture still turned it down, and the reason is the index.

About 14 min · class 01:10–01:20

The orders table from chapter 1 uses 4-byte integer IDs. Someone proposes switching to UUIDs: any server could then mint an ID on its own, with no counter, no clock and nobody to ask. Uniqueness for free.

So why did Amazon, Flickr, Twitter and Instagram all say no? Not because of uniqueness. Because of what the ID does to every index on the table.

§ 4.1

## Why not just use a UUID?

If order isn’t required, a random 128-bit value would do. Companies at scale still avoid it.

About 2 min · class 01:10–01:12

Chapter 3 ended by relaxing the order requirement. That raises the obvious question: if IDs don’t need to be monotonic, why not just use UUIDs? It is the right question to ask before building anything, and the answer is a question of its own: why don’t companies at scale prefer them?

The short answer: at scale, UUIDs are extremely inefficient. If your company uses UUIDs everywhere, then yes, at scale that is inefficient.

More precisely

The cost comes from two things. Random (version 4) UUIDs land at random places in the index, and RFC 9562 itself says UUID versions that are not time-ordered “have poor database-index locality”. And at 16 bytes they enlarge every index that carries them dev.mysql.com ↗. Time-ordered UUIDv7, introduced by the same RFC in 2024, or a 64-bit ID avoids most of this.

rfc-editor.org ↗

First, what a UUID is: a 128-bit value. It is usually written as a string, but it can be read as one gigantic integer. Keep the number 128 in mind; the rest of this chapter is about what those bits cost.

§ 4.2

## Every index carries the ID

An index is a smaller table, and every one of its entries stores the row’s ID. Make the ID four times bigger and the index follows.

About 4 min · class 01:11–01:13, 01:15–01:19

Indexes make database reads faster; the week-2 pre-reads, in the week of Lecture 3, included a video on exactly how. The one fact this chapter needs from it: an index is itself just a table. Effectively it is a B+ tree holding the indexed values and the IDs of the rows they point to, and the database manages it internally.

Take a posts table with a post ID, a user ID, a title and the rest. Create an index on user_id, and the database builds what is, in effect, a new table with just two columns: the post’s user ID, and the post ID.

[figure title] An index is a smaller table

[figure description] A posts table has post_id, user_id, title and body. An index on user_id is a second, two-column table: user_id sorted, plus the post_id of the row each entry points to. Because the ID is stored in every index entry, a 16-byte UUID makes the ID column four times as wide as a 4-byte integer, so an index of about 1 GB grows to about 4 GB (about 2 times against an 8-byte BIGINT).

[figure labels] posts · post_id · user_id · title · … · 101 · 7 · hello · … · 102 · 3 · ids · … · 103 · 7 · b+ trees · … · 104 · 5 · uuid? · … · idx_user_id · user_id · post_id · 3 · 102 · 5 · 104 · 7 · 101 · 7 · 103 · points to · the row · the ID is stored in every index entry · 4-byte id · user_id · id · 1 GB · 16-byte uuid · user_id · id · ~4 GB · I'm unique, what's the problem? · ~4× vs a 4-byte INT; about 2× vs an 8-byte BIGINT. A rough estimate, not exact.

[caption] Fig 4·aAn index on user_id is a two-column table sorted by user_id, and each entry carries the post_id of its row. Widen the ID from 4 bytes to a 16-byte UUID and that column, in every entry, grows with it. New figure.

Look at the second column. In a dense index, every single entry also stores the row ID. So the size of your ID type is paid again in every entry of every index, and a big ID makes every index bulky. In MySQL’s InnoDB this is literal: each secondary-index record contains the row’s primary-key columns, and the manual says that if the primary key is long the secondary indexes use more space, “so it is advantageous to have a short primary key” dev.mysql.com ↗.

Pause and think

An index keyed by a 4-byte integer ID is about 1 GB. You switch the ID to a 16-byte UUID. Is this just a little more disk space?

Every index entry carries the ID, so the index grows several times over: about 4× against a 4-byte INT, about 2× against an 8-byte BIGINT. An index that spills out of memory turns lookups into disk reads (4.3). The 4× is a rough estimate; real size depends on the values and page overhead. What matters is the direction: big IDs make every index bigger, and random UUIDs also land in random places in the index.

Now the arithmetic. A 128-bit UUID is 16 bytes; a plain integer ID is 4. Switch from one to the other and you bloat the index by a factor of four: an index that took 1 GB is suddenly 4 GB. Two honest adjustments: 16 bytes is 4× a 4-byte INT but only 2× an 8-byte BIGINT, which is the realistic comparison (Snowflake-style IDs are 8 bytes), and an index doesn’t grow exactly in step with its key, because entries also carry pointers and page overhead dev.mysql.com ↗.

Treat the 4× as a rough estimate, not a number to quote. The calculation isn’t exactly right, and the real figure depends on the values. The direction is what to remember.

§ 4.3

## Indexes belong in RAM

A query does its work on the indexes and touches the table last. Keep the indexes in memory and the whole plan runs there.

About 6 min · class 01:12–01:15, 01:18–01:21

A bigger index would only be a disk-space problem if indexes lived on disk. For a fast database they mustn’t. To get the maximum performance out of a database, it should be able to fit all its indexes in RAM. If it can’t, no amount of other optimization will make it fast.

More precisely

What has to fit is the part you use. For consistently fast queries, the frequently used part of your indexes (and the hot data) should fit in the database’s memory cache, such as InnoDB’s buffer pool. If hot index pages keep being read from disk, queries slow down sharply.

dev.mysql.com ↗

The rule for this whole chapter

Keep IDs small: the hot part of your indexes has to fit in memory, and every index carries the ID.

Every byte of the ID is paid again in every index, and indexes are what a database needs in RAM to stay fast. 4 or 8 bytes is fine. Past 8 bytes, start worrying at scale.

[figure title] Indexes belong in RAM

[figure description] A small index fits inside the RAM box. A bigger index spills out of RAM onto the disk, outlined red: every lookup in it becomes a disk read.

[figure labels] ram · index · index · disk · fits: fast · spills: · disk reads

Why the indexes matter so much: whenever you send a query, to any database that has indexes, the first thing it does is build a query execution plan, and it does that work on the indexes, because they are tiny. If they fit in RAM, a join of two tables on indexed columns can be done entirely in memory. Only once it knows the result does it go to the disk and read the full rows. That is the last step. More precisely, a query skips the table only when the index holds every column it needs (an index-only scan, helped by a covering index); otherwise the database fetches each matching row from the table as it goes postgresql.org ↗.

[figure title] Where a query runs

[figure description] Panel a: both indexes fit in RAM. The planner joins them on indexed columns in memory, and only the last step reads the result rows from disk. Panel b: one index has spilled out of RAM onto the disk, so every lookup in it becomes a disk read.

[figure labels] ram · plan · idx_a · idx_b · join on · indexed cols · disk · last step: read · the result rows · a · indexes fit in RAM · ram · plan · idx_a · idx_b · disk · every lookup is · a disk read · b · an index spilled to disk

[caption] Fig 4·ba: both indexes fit in RAM, so the plan and the join run in memory and the disk is read once, for the result rows. b: one index has spilled to disk, and every lookup in it is now a disk read. What must fit is the hot part of the indexes. New figure.

So if your indexes are in RAM, the entire query execution happens in RAM, and only the detailed rows that end up in the result are read from disk. That is what makes execution lightning fast.

A database doesn’t keep indexes in RAM just because they exist. It loads them into RAM during boot-up, or when a query needs them, and keeps them there. In InnoDB that cache is the buffer pool: index and table pages are cached as they are read, and the least recently used pages are evicted when room is needed. By default MySQL also saves the most recently used 25% of buffer-pool pages at shutdown and reloads them at startup to shorten warm-up dev.mysql.com ↗ dev.mysql.com ↗.

Hence the sizing rule: the RAM of your database server should be equal to or more than your total index size. Otherwise query execution is pathetically slow. In practice you size the memory cache (the buffer pool) to hold the hot indexes and data, and the machine’s RAM must be larger than that, since the cache usually gets at most about 80% of it dev.mysql.com ↗.

[summary] The first thing to check skip unless you debug databases

When someone tells the instructor their database is slow, the first thing he checks is index sizes. In most cases they are the problem: random indexes have been created on the database, and they have spilled to disk, so even reading an index means going to the disk. His rule: whenever a senior engineer, technical architect or principal engineer optimizes a database, the first thing to look at is index size. The slow-query log and EXPLAIN on the worst queries are the other usual first checks.

Flickr’s official engineering blog says the same thing: if you can’t fit your indexes in memory, you can’t make your database fast. And it’s true.

It also gives you a real-world way to provision a database. Interview questions aside: if someone asks what size a database server should be for it to perform, the bare minimum memory is the sum of the sizes of all the indexes it holds. Anything beyond that is good; that is the floor.

All of this is why databases keep coming back in this course. The database is the most essential, and the most brutal, component of an infrastructure. API servers are easy to scale because they are mostly stateless, like nearly everything else. The database is where everything is stored and everything is queried; it handles the entire load. (Lecture 2 called it the most critical and most brittle component.) So understand whichever database you use, really well.

§ 4.4

## When a UUID is the right call

Hard-to-guess IDs, and apps that will never reach the scale where index size bites.

About 2 min · class 01:15–01:17

UUIDs do have a real strength. They look random, and you can’t predict the next one, so it is hard for anyone to guess other IDs or scrape your whole website. In that sense they are good for security.

More precisely

Random (v4) UUIDs make IDs hard to enumerate, which slows scraping, but they are not a security control. OWASP recommends random identifiers over enumerable ones and stresses that “even with complex identifiers, access control checks are essential”: every request still needs an authorization check.

cheatsheetseries.owasp.org ↗

The opposite case makes the point. Build Facebook and expose plain database IDs, 1, 2, 3, 4, and anyone can fire REST requests in a loop, for (i = 0; i < 1_000_000_000; i++), and scrape the entire site.

So UUIDs are not forbidden. They work in some cases and not in others. If your application is small and will never hit that scale, a UUID is just fine. Don’t reach for the best solution out there by default; see what works best for you.

§ 4.5

## MongoDB’s 12 bytes

A UUID would have been easy. MongoDB chose 12 bytes with time first, and the pattern repeats in every scheme that follows.

About 2 min · class 01:16–01:18

MongoDB is happy with 96 bits. Its IDs, ObjectIds, are 12 bytes: the first 4 bytes are epoch time, and time always comes first; then 5 random bytes; then a 3-byte counter. The time has one-second resolution, the random value is generated once per client process, and the counter starts at a random value. Time and counter are stored big-endian, so ObjectIds sort roughly by creation second mongodb.com ↗.

[figure title] MongoDB's ObjectId

[figure description] A MongoDB ObjectId is 12 bytes: 4 bytes of time in seconds first, then 5 random bytes, then a 3-byte counter. Below it, ID sizes on one scale: INT 4 bytes, BIGINT or Snowflake 8 bytes, ObjectId 12 bytes, UUID 16 bytes.

[figure labels] 12 bytes · time on the left · 4 B · time (seconds) · 5 B · random · 3 B · counter · id sizes, one scale · INT · 4 B · BIGINT / Snowflake · 8 B · ObjectId · 12 B · UUID · 16 B

[caption] Fig 4·cA MongoDB ObjectId: 4 bytes of time (seconds), 5 random bytes, a 3-byte counter. Below, ID sizes on one scale. Redrawn from the class board at 01:16. The blog post shown later in class lists the older layout, with a machine ID and a process ID where the random bytes are now; both are 12 bytes.

Nothing stopped MongoDB from using 16-byte UUIDs. In the lecture’s reading, they went for 12 to save those four bytes.

For comparison, MySQL’s auto-increment IDs are 4-byte integers, which makes for a very tiny index. Four bytes or eight is still fine; beyond eight bytes you should worry about performance at scale. In MySQL, INT is 4 bytes (unsigned maximum 4,294,967,295) and BIGINT is 8 bytes, and when an AUTO_INCREMENT column reaches the upper limit of its type, the next attempt to generate a value fails. Flickr’s ticket table in chapter 5 uses bigint unsigned dev.mysql.com ↗ dev.mysql.com ↗.

Notice the pattern, because you will see it in every scheme from here on: put time on the left, and keep the ID small. It is also why the ID getting longer was a cost back in §2.5, when the boot counter added a third part: long IDs don’t index well.

Every one of the case studies that follow mentions not going for UUIDs because they don’t index well. The next chapters show those designs one by one, built by people who skipped UUIDs because of exactly this index-size problem. Snowflake, for instance, is 64 bits, kept small on purpose (§6.1).

How big is the ID? Four common sizes and what each costs

|

| MySQL INT

| BIGINT / Snowflake

| MongoDB ObjectId

| UUID

| Bytes

| 4

| 8

| 12

| 16 (128 bits)

| Ordered by time?

| Increasing on one database

| Snowflake: roughly, time on the left

| Roughly, by second: time first

| No, for random v4 (v7 is)

| Made where?

| By the one database

| BIGINT: the database. Snowflake: generator logic (chapter 6)

| By the client driver, any process

| Anywhere, no coordination

| Index cost

| Very tiny

| Small: 4 or 8 bytes is fine

| Past 8 bytes: worry at scale

| About 4× an INT, 2× a BIGINT; v4 inserts scatter

| Good for

| One database; an unsigned INT stops at about 4.29 billion

| Scale: where the companies in this lecture land

| MongoDB documents

| Apps that will never reach that scale; IDs nobody can guess

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does the size of the primary key affect every index on a table?

[summary] Show answer

Every index entry stores the ID of the row it points to (in InnoDB, every secondary-index record holds the primary key). So the ID’s size is paid again in every entry of every index: a 16-byte UUID instead of a 4-byte INT makes the ID part four times bigger, roughly 1 GB → 4 GB in the lecture’s rough estimate (about 2× against an 8-byte BIGINT).

What must fit in RAM for a database to stay fast, more precisely than “all the indexes”?

[summary] Show answer

The hot part of the indexes, and the hot data, must fit in the database’s memory cache (InnoDB’s buffer pool), and RAM must be larger than that cache. The lecture’s floor for provisioning: at least the sum of all index sizes. If hot index pages keep coming from disk, no other optimization saves you.

Give one honest reason to choose a UUID, and the scale at which the lecture says it’s fine.

[summary] Show answer

They are hard to guess, so nobody can loop over 1, 2, 3 … and scrape your site (they slow enumeration; they don’t replace an authorization check on every request). And they are just fine for an application that is small and will never hit the scale where index size bites.

Small, unique, and made without a fight between servers: here is how Amazon and Flickr did it, with a plain database in the middle.

Concepts in this section: UUID · dense index · secondary index · buffer pool · query plan · enumeration · ObjectId

Contents of this lecture ↑

Lecture 06, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-central-services ===

# Minting unique IDs, chapter 5: Central services: Amazon and Flickr

Lecture 06 · Minting unique IDs · chapter 5 of 9

§ 5

## Central services: Amazon and Flickr

Two ways to make one place responsible for IDs without making every request wait on it: Amazon hands out ranges, Flickr turns MySQL’s auto-increment into a ticket machine.

About 36 min · class 00:59–01:36, Q&A 02:21–02:24

Amazon’s order service and its payment service both need an ID on every request. Each runs on many servers, and the orders database is sharded, so no single database’s auto-increment can be trusted (§1.2).

Chapter 3 showed that one ID server gives clean IDs and a network call on every request. This chapter is two real designs that keep the one-place idea and get rid of most of that cost.

§ 5.1

## How to read someone else’s design

Before four company designs, one way to read them: for what they gain, not for what you would have done instead.

About 2 min · class 00:51, 01:02, 01:20–01:21

Everything so far was the core idea behind ID generation, built from scratch. The company designs that follow each show what one real choice gains and what it gives up.

Read them for the beauty of the design, and take their good parts. It is easy to list faults, such as “a MySQL query for every ID sounds slow”, and it is fine to see them, but it was their decision, made with their constraints. It is like neighbours fighting: you may think both are wrong, but it’s their life. Let them do it, and pick the best parts.

There are videos about the first design, Amazon’s; this page goes into how to implement it. If you have done the airline check-in from Lecture 3, it is a piece of cake.

§ 5.2

## Amazon: hand out ranges, not IDs

One row per service, one locked update per batch, and a server that asks again only when its range runs low.

About 8 min · class 00:59–01:08

The instructor knows this design first-hand: the team that built Amazon’s ID service sat right next to him. He attended their tech talks and asked them questions, and they explained the design in a public tech talk. In that account, Amazon assigns a globally unique ID to every order placed. The system has high throughput, and the same ID service also hands out IDs to many other internal services, orders being just one of them, so the IDs had to be unique.

The design leans on batching, one of the most effective ways to get performance out of any system. It is also small: you can write the whole service in about 150 lines of Python, “not even exaggerated”. Scaling it means handling a few more cases here and there, nothing difficult. Write it yourself.

The architecture, as described: plain API servers exposing ID-generation endpoints, put behind a load balancer, with a database behind them. That database is a classic relational one. No fancy non-relational store is needed, and no reason to complicate things.

The core idea is the one you used in §2.6, where the counter went to disk once every thousand IDs instead of on every ID. Here, instead of calling the remote ID service every time a server needs an ID, the server gets a batch of IDs in one call.

Say two services use it, orders and payments, each on its own set of servers. Neither cares about monotonicity. They need uniqueness, as simple as that. The ID service’s table holds one row per service, one for orders and one for payments, so each service’s IDs come from its own counter.

Here is how the ranges go out. Step through with the buttons or the arrow keys:

[figure title] Ranges from one row

[figure description] An ID service (API servers behind a load balancer, one relational database) keeps one counter row per service. Orders server 1 asks for 500 and gets [0, 500) as the counter moves to 500; orders server 2 gets [500, 1000); payments server 1, on its own row, gets [0, 2000). Near the end of its range orders server 1 asks again and gets [3000, 3500). Each hand-out is a SELECT … FOR UPDATE and an UPDATE in one transaction.

[figure labels] id service · id db · id api · lb · id_ranges · service · counter · orders · payments · 0 · 0 · orders s1 · orders s2 · payments s1 · 0 · 500 · get_id_batch(500) · [0, 500) · 500 · 1000 · get_id_batch(500) · [500, 1000) · 0 · 2000 · get_id_batch(2000) · [0, 2000) · 1000 · 3000 · 3500 · 490 of 500 used: ask again · [0, 500) · [3000, 3500) · SELECT … FOR UPDATE, then UPDATE

- Orders server 1 boots and asks for 500 IDs. One update moves the orders counter from 0 to 500 and returns the range [0, 500): just a start and an end.

- Orders server 2 boots and gets the next 500. Same row, one more update: the counter goes to 1000 and server 2 holds [500, 1000).

- Payments has its own row and its own counter, and asks for more: payments server 1 gets [0, 2000).

- Near the end of its range (490 of 500 used), orders server 1 asks again and gets whatever range is next, here [3000, 3500): other servers took the IDs in between.

- Each hand-out is one locked read and one update in a transaction (SELECT … FOR UPDATE, then UPDATE), so two servers can’t get the same range.

Keys: ← → to step · link to a step with #fig-5a/step-3

[caption] Fig 5·aThe ID service (top) keeps one counter row per service. Blue is a server asking for a batch, and the range it gets back; a green dot marks a server that holds a range. Redrawn from the class board at 01:08.

Walk through it. When an orders server boots, it has no IDs to work with, so it asks the ID service: “I just booted up. Can you give me 500 IDs?” The request reaches an API server, which fires one SQL query on the table: the stored value for orders goes from 0 to 500, and the range 0–500 goes back to the server.

Only the start and the end go back, not 500 individual IDs. They are just integers, so there is no reason to send that much data over the network.

When orders server 2 boots and asks for 500 more, the stored value goes from 500 to 1000, and server 2 gets [500, 1000). Server 1 holds 0 to 500, server 2 holds 500 to 1000. The payments row moves on its own: a payments server that asks for 2000 gets [0, 2000).

A server doesn’t ask again for every ID. It loads a range once and refills when it is about to run out: with 490 of its 500 used, it asks for another 500 and might get 3000–3500, because other servers took the ranges in between. Then it carries on from that range.

The hand-out itself must be atomic, so two servers asking at the same moment can never get the same range. Select the current value FOR UPDATE inside a transaction, then update it to the new value. If that looks familiar, it should: it is Lecture 3’s airline check-in transaction, Ctrl-C, Ctrl-V. Read in a transaction, atomically add however many IDs were requested, and send back the old value and the new one as the range.

-- id_ranges(service, counter): -- one row per service BEGIN; SELECT counter FROM id_ranges WHERE service = 'orders' FOR UPDATE; -- say 500, now locked UPDATE id_ranges SET counter = counter + 500 WHERE service = 'orders'; COMMIT; -- reply [500, 1000): old and new value

§ 5.3

## What ranges buy, and what they cost

The orders database is free to shard, and the ID service sees one tiny update per batch. A crash throws a range away, and that is fine.

About 6 min · class 01:04–01:11

Once a server holds a range, it stops thinking about IDs. Orders arrive from the outside world, the server pulls the next ID from the range in its memory, and writes the order into its own orders database without worrying about anything else. Those are globally unique IDs, and a service can prefix them if its conventions call for it.

That is the real gain: the central ID service decouples the system. ID generation is separate from the orders database, so the orders database can be sharded and scaled horizontally, with every shard accepting writes, and no server calls the ID service for each ID.

The 500 in the walkthrough is only a small example. By the same account, real batches are 10,000, 50,000 or 100,000 IDs, depending on the service’s throughput.

The cost is on a crash. If a server gets a range and then crashes, that range is gone. So batch size is a trade-off: too small, and servers make network calls too often; too large, and a crash throws away a big range. Each service tunes the maximum batch size to its own throughput.

And there is no order across servers. Server 1 may be issuing 3,042 while server 2 issues 612. The design hands out unique IDs in batches, and that’s all it promises.

It is really simple to build. The database is the single source of truth on a single server, so it never has to gossip with anyone, and it scales easily because each request is one tiny update, not even a full read. That one database is also a single point of failure for every service that needs IDs, which is why such a store is usually replicated or run as a pair; range batching keeps it off the hot path, so a short outage doesn’t stop servers that still hold IDs.

A tempting fix for the wasted ranges: keep track, in a database, of how much of its range each server has used, so that after a restart it resumes where it stopped. With batches of 10,000, a server that used 100 and crashed loses 9,900 IDs forever.

In fact it isn’t worth it. Keeping track of every single used ID is a massive overhead, and a big-integer (2^64) ID space will never run out, not even at Amazon’s scale. Think about practicality at every step. Nobody cares about using every single integer; it is just a few ranges of numbers lost.

[summary] Number sense skip if numbers bore you

We tend to underestimate numbers. A million and a billion are both huge, and the difference between them, 999 million, is itself almost a billion. A four-byte integer gives about 4 billion IDs: imagine 4 billion Amazon orders. If even that runs out, move to 64 bits, a range big enough that you never worry about it. (About 4.29 billion is the unsigned figure; a signed 32-bit INT stops at about 2.1 billion.)

§ 5.4

## Ranges from a queue?

The ranges don’t have to come from a database. What they need is one atomic step, wherever it lives.

About 2 min · class Q&A 02:22–02:24

Does the hand-out have to be an API call to a database? One idea raised in class: let the ID generator keep producing ranges and push them into a queue, and let the servers read from the queue. That works, with one condition: servers read a batch of IDs at a time, not one ID at a time.

[summary] Variants: a queue, Redis, DynamoDB skip unless SQL isn’t your store

Reading ranges from a queue moves the atomicity to the queue’s reads. The core property you need is an atomic read of the next range, and the database, a queue, DynamoDB or Redis can each give it.

More precisely

Any store with an atomic increment-and-return can hand out ranges: a SQL transaction, a DynamoDB atomic counter, Redis INCRBY. A queue needs more care. SQS standard queues deliver at least once, so a range can occasionally be delivered twice, and a redelivered range would produce duplicate IDs unless consumers deduplicate. A DynamoDB counter fails the safe way: a retried increment can over-count, which only wastes a range aws.amazon.com ↗.

docs.aws.amazon.com ↗

The lesson generalizes. Focus on the core property you need; if any system out there gives it to you, that system is good enough.

The rule for this whole chapter

Find the core property you need, here an atomic increment, and use any system that gives it.

Amazon gets it from a SELECT … FOR UPDATE transaction, Flickr (next) from an upsert, and a queue, Redis or DynamoDB would do too, as long as no range is ever handed out twice.

[figure title] Any system with an atomic increment

[figure description] One counter cell moves from 500 to 1000 under a lock: an atomic increment. A SQL transaction, an upsert, Redis or DynamoDB can each provide it.

[figure labels] 500 · 1000 · any system with an · atomic increment · sql transaction · upsert · redis · dynamodb

Amazon’s service hands out ranges and stays out of the way. Flickr went further: its ID service does nothing but lend out MySQL’s auto-increment, one ID per call.

§ 5.5

## Flickr: MySQL as the ticket server

If MySQL already counts, let MySQL be the ID service: a separate database with one table and one row.

About 7 min · class 01:17–01:23, 01:26–01:27, Q&A 01:32–01:33

Flickr was the big photo site before Instagram, where a great deal got posted before Instagram took over. Flickr launched in February 2004 and was among the most popular sites on the web by 2007, three years before Instagram existed, so think of it as the Instagram of the 2000s wikipedia.org ↗.

Its problem was the one from §1.2, exactly. The database was sharded and ran in multi-master mode, so a write could go anywhere, and auto-increment on every shard would hand out conflicting IDs. To guarantee uniqueness, Flickr needed its own ID generation. Its engineering blog also says why not UUIDs: they index badly (§4.2).

So Flickr built a central ticket server, an ID generation service, on top of MySQL. Whoever needs an ID makes a query to MySQL and gets one. The idea is disarmingly simple: if MySQL already gives you auto-increment IDs, why can’t MySQL itself be the ID service? It also answers an earlier question: could the database itself be the ID generator? Here it is.

It is a separate database. The photos live in the sharded photos database; the ticket database exists only to lend out its auto-increment.

[figure title] Flickr's photo service with a ticket server

[figure description] A user posts a photo to one of the photo service servers. That server first asks the ticket server, a separate MySQL database, for an ID (1), gets the ID back, and then stores the photo under that ID in the sharded, multi-master photos database (2). The single ticket server is a single point of failure.

[figure labels] user · post · photos svc · 1 · get id · id · ticket server (mysql) · one box: a single point of failure · 2 · store photo · photos db · sharded, multi-master

[caption] Fig 5·bPosting a photo: the photo server first gets an ID from the ticket server (1), then stores the photo under it in the sharded photos database (2). One ticket server is one box that can fail. Redrawn from the class board at 01:26.

Follow one request. A user posts a photo, and the request reaches a photo-service API server. That server fires a request to the MySQL ticket server, gets an ID back, and then stores the photo in the sharded photos database.

The ticket database has one table, tickets, with two columns. id is a BIGINT, unsigned, not null, auto-increment, and the primary key; a big integer means a 2^64 space. stub has a unique key.

[figure title] The ticket table

[figure description] Flickr's tickets table has an auto-increment BIGINT id (the primary key) and a stub column with a unique key. It holds one row, id 74 with stub 'a'. Each ID request hits the unique key on stub and bumps the id: 74, then 75, then 76.

[figure labels] tickets · id · stub · 74 · a · 74 · 75 · 76 · stub = 'a': a dummy value, just there to hit the unique key · create table tickets ( · id   bigint unsigned not null auto_increment, · stub char(1) not null default '', · primary key (id), · unique key (stub) · );

[caption] Fig 5·cThe whole ID service is this one row. The stub value is a constant whose only job is to collide with the unique key. Redrawn from the class board at 01:21 and 01:26.

How do you get IDs out of a table like that? The naive way: whenever someone needs an ID, delete the row and insert a new one. Inserting a row without an id makes auto-increment fill in the next value, so each delete-and-insert yields the next ID.

But you can’t insert a row with no values at all; you have to pass something. That is the only reason stub exists. The name sounds fancy, but it is a normal dummy column holding a dummy value, nothing special. In the query it is a hard-coded constant, literally any string, and its one job is to make the database break the unique constraint so that the update fires atomically.

§ 5.6

## Upsert: one statement instead of delete + insert

Insert, and if the key is already there, update instead. MySQL has two ways to say it, and one is much cheaper.

About 4 min · class 01:22–01:27, Q&A 01:31–01:33

Delete-then-insert can run in one transaction, but that is extremely costly on the database. Or it can become an upsert, because delete plus insert is an upsert. A single upsert statement replaces the pair: one statement that inserts, or updates the row that is already there dev.mysql.com ↗.

What is an upsert? You try to insert something. If it already exists, you update it instead; if it doesn’t, you insert it.

MySQL offers two ways. The first is INSERT … ON DUPLICATE KEY UPDATE: it tries to insert the values you give it, and if that fails on a unique key constraint, it runs the update you passed. The classic upsert. It reports 1 affected row for an insert, 2 for an update and 0 if the row was set to its current values, and MySQL advises: “In general, you should try to avoid using an ON DUPLICATE KEY UPDATE clause on tables with multiple unique indexes.” dev.mysql.com ↗

The second is REPLACE INTO, written like INSERT INTO; it came up in Lecture 3’s key-value store on a relational database. It does an upsert too, but internally it deletes the old row and inserts a new one. Because it rebuilds the row, any column you don’t list goes back to its default, and it fires DELETE triggers as well as INSERT triggers dev.mysql.com ↗ dev.mysql.com ↗.

That delete makes it slower. The instructor benchmarked the two on a MySQL server and found REPLACE INTO about 32× slower than ON DUPLICATE KEY UPDATE. Either works; what matters is doing an upsert.

More precisely

REPLACE INTO deletes and re-inserts the row, so it is usually slower than INSERT … ON DUPLICATE KEY UPDATE; ~32× was one measurement on one setup. It also resets the columns you don’t supply. Prefer ON DUPLICATE KEY UPDATE unless you actually want a fresh row.

dev.mysql.com ↗

Here is the query in its upsert form. Insert the constant 'a' into stub. The row with 'a' already exists, so the insert hits the unique key and ON DUPLICATE KEY UPDATE id = id + 1 runs instead: the id goes from 74 to 75, and that is your ID. The next call gives 76, then 77, 78, and so on.

More precisely

Flickr’s published query is the other form: REPLACE INTO Tickets64 (stub) VALUES ('a'); followed by SELECT LAST_INSERT_ID();. REPLACE removes and re-inserts the single 'a' row, so auto-increment hands out the next value. That matters with two servers (5.7): auto-increment honours the server’s step and offset, while an explicit id = id + 1 does not.

code.flickr.net ↗

-- the upsert form above: the insert -- collides on stub, so the update runs INSERT INTO tickets (stub) VALUES ('a') ON DUPLICATE KEY UPDATE id = id + 1; -- 74 → 75, then 76, 77 … -- Flickr's published form REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID();

Either way, Flickr leans on MySQL’s own transactions and atomicity to produce IDs; both upsert forms are atomic. It is the same trick as the upsert in Lecture 3’s key-value store.

§ 5.7

## Two ticket servers, odd and even

One ticket server is a single point of failure. Two, stepping by 2 from different starts, never collide and never need to talk.

About 3 min · class 01:26–01:29

Look at Fig 5·b again: there is one ticket server. If it goes down, ID generation is gone. It is a single point of failure.

The fix is two ticket databases behind a load balancer, so that if one goes down the other handles the load. It looks like §3.7’s problem of two servers that had to gossip, but here nobody needs monotonicity, so they don’t have to talk. It is also the idea suggested in class back in §1.2: step by the number of servers. Flickr chose this deliberately. At its write volume, “replicating between the boxes would be problematic, and locking would kill the performance of the site” code.flickr.net ↗.

How do two servers stay unique without talking? Increment by 2 instead of 1. One database generates odd IDs, the other even IDs.

[figure title] Two ticket servers, odd and even

[figure description] Two ticket servers sit behind a round-robin load balancer. Both step by 2 (auto_increment_increment = 2); ticket 1 starts at 1 and issues 1, 3, 5, 7, ticket 2 starts at 2 and issues 2, 4, 6, 8. Requests alternate, so IDs come out 1, 2, 3, 4 and are never shared.

[figure labels] aren't we supposed to be in order? · ticket 1 · 1 3 5 7 · auto_increment_increment = 2 · auto_increment_offset = 1 · ticket 2 · 2 4 6 8 · auto_increment_increment = 2 · auto_increment_offset = 2 · lb · round robin: 1, 2, 3, 4 …

[caption] Fig 5·dBoth ticket servers step by 2, one starting at 1 and one at 2. Round robin alternates between them, so IDs come out 1, 2, 3, 4 … and no value is ever issued twice. Redrawn from the class board at 01:31.

These are real MySQL server settings. auto_increment_increment is how much to add each time, set to 2 on both. auto_increment_offset is the starting point: 1 on one server, 2 on the other.

# ticket server 1 auto_increment_increment = 2 auto_increment_offset = 1 # ticket server 2 auto_increment_increment = 2 auto_increment_offset = 2

Put the load balancer in round-robin mode and requests alternate: the first goes to server 1 and gets 1, the second to server 2 and gets 2, the third gets 1 + 2 = 3, then 4, 5, 6, 7, 8. The IDs come out almost monotonic. In practice the two sides drift: when Flickr wrote up the design it had a few hundred thousand more odd-numbered objects than even ones, “but this hurts no one” code.flickr.net ↗.

The single point of failure is solved. If one server goes down, the other carries on, and ID generation continues without a hiccup.

§ 5.8

## When the odd server comes back

A server that was down resumes where it stopped. The IDs look strange and are still correct; a reset is optional and only for looks.

About 7 min · class 01:29–01:36, Q&A 02:21–02:22

Say the odd server dies after issuing 5. Every request now goes to the even server: 6, 8, 10 … all the way to 202. Then the odd server comes back.

Pause and think

The odd ticket server died after issuing 5. The even one carried on to 202. The odd server comes back and resumes, and IDs now come out 7, 204, 9, 206. Is that a bug?

No ID has been issued twice. If the jump bothers you, restart both servers above the max plus a buffer (241 and 242) and round robin looks tidy again. That is optional, for looks, not correctness. Flickr itself lets the two sides drift.

The odd server is back. Watch the next four IDs.

[caption] Clip 5·1Uniqueness never broke. Order was never promised.

[summary] The clip as text 0:39

- Two ticket servers: one odd, one even.

- Round robin: the IDs come out almost in order.

- The odd server dies. The even one carries on, up to 202.

- It resumes where it stopped: 7, 204, 9, 206. Still unique.

- Optional: reset both above the max. It only looks tidier.

- Uniqueness never broke. Order was never promised.

Two MySQL ticket servers sit behind a round-robin load balancer: ticket 1 hands out odd IDs and ticket 2 even IDs, so requests alternate and the IDs come out 1, 2, 3, 4, 5, 6, almost in order. Ticket 1 dies after 5; every request goes to ticket 2, whose IDs climb 8, 10, 12 and on up to 202. Ticket 1 comes back where it stopped, because its counter persisted, so the stream becomes 7, 204, 9, 206: out of order, but every ID is still unique. Optionally both servers are reset above the max (max plus a buffer) to 241 and 242, and round robin continues 241, 242, 243, 244. The reset only makes the order look tidier; uniqueness never broke and order was never promised.

The odd server resumes where it left off, because MySQL is a persistent store: the counter isn’t only in memory. So it issues 7 while the even one issues 204, then 9, 206, 11, 208. That is a huge gap between neighbouring IDs, but it breaks no constraint. It just doesn’t look pleasing. It is a matter of aesthetics, not correctness: every ID is still unique. InnoDB writes the current maximum auto-increment value to the redo log on every change, which is why a restarted ticket server resumes where it stopped. After a crash before the redo log is flushed, though, a recently issued value can be issued again dev.mysql.com ↗.

If the gap bothers you, there is an optional fix. Take the maximum ID issued so far, 202, add a buffer, say up to 240, and restart the two servers at 241 and 242. Round robin then continues 241, 242, 243, 244.

That reset is purely for aesthetics. It has nothing to do with correctness, and nothing to do with strict monotonicity, which is still not guaranteed. Nearly monotonic IDs are simply a good byproduct to have. Pretty simple, and pretty brilliant in its own way.

Who does the reset? A database server going down is a big deal, so an SRE or DevOps engineer will be looking into it, and they reconfigure the servers. Or automate it: find the active server, find the max IDs, add a buffer, set the values, and do a quick process restart on each server. The settings are MySQL-specific, so look up how to change auto_increment_offset on your platform.

Which value to reset to is the architect’s call: you are the one designing the system. Reset to the safest value, safely beyond every ID issued in the past. This is why §2.6 spent time on starting from the safest value.

It is tempting to object that without the reset, the IDs aren’t monotonically increasing: the odd server restarting at 7 after the even one reached 202. In fact, monotonicity was never enforced here. Nothing in this design promised it; it was a nice byproduct of round robin. Not everyone needs monotonic IDs, and it is fine not to have them. A social media site has no reason to care.

Do the two servers have to gossip to agree on a reset, and would they use Lamport clocks for it? It isn’t clear that Flickr specified anything, and as far as the lecture knew, Lamport clocks are something quite different, not used for gossip. Flickr’s post never mentions gossip at all, and Lamport clocks, logical clocks for ordering events, can in fact appear inside gossip-based systems code.flickr.net ↗.

In the lecture’s reading, Flickr only said, abstractly, that the servers need to gossip, and how is up to you. It can be as simple as network calls to check each other’s greatest IDs, agree on a value and add a buffer: your own small gossip.

More precisely

Flickr’s two ticket servers never coordinate. The odd/even offsets keep their IDs unique, and the two sides are allowed to drift apart; Flickr does no reset. If you do want the cosmetic reset, note that auto_increment_increment and auto_increment_offset are dynamic MySQL variables, so they can be changed without a restart.

code.flickr.net ↗

Whatever mechanism you use, the two servers must end up agreeing on the value each one will pick. That agreement matters only for the optional reset; the odd/even split itself needs no agreement to stay unique.

Amazon’s ranges and Flickr’s ticket servers, side by side

|

| Amazon: ranges

| Flickr: ticket servers

| Where IDs come from

| One counter row per service in a relational database, handed out as ranges

| MySQL auto-increment on a separate ticket database

| Network calls per ID

| None: one call per batch (500 here; 10,000 to 100,000 in practice)

| One per ID

| What’s stored

| A counter per service; each server keeps its range in memory

| One row (id, stub) per ticket server

| Single point of failure, and the fix

| The one ID database; servers holding a range keep going

| One ticket server; fixed with two, odd and even, behind round robin

| Order

| Unique only; none across servers

| Unique; nearly ordered as a byproduct, never promised

| Lost on a crash

| The unused rest of the server’s range

| Nothing on a normal restart: MySQL persists the counter

| You build

| An API with one locked transaction, about 150 lines

| One table, one upsert, two settings per server

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does Amazon’s ID service return a range’s start and end instead of a list of IDs, and what happens to the rest of the range if the server crashes?

[summary] Show answer

IDs are just integers, so start and end describe the whole range; sending every ID would waste network for nothing. If the server crashes, the unused rest of its range is lost for good. That is accepted: with a 2^64 space nobody misses a few ranges, and tracking every used ID would be a massive overhead. The batch size trades call frequency against how much a crash throws away.

What is Flickr’s stub column for?

[summary] Show answer

Nothing but collisions. You can’t insert an empty row, so each request inserts the same constant ('a') into stub, which has a unique key. The insert collides with the existing row, and the upsert (ON DUPLICATE KEY UPDATE, or Flickr’s REPLACE INTO) makes auto-increment hand out the next ID atomically.

The odd server died at 5 and the even one reached 202. Is “7, 204, 9” a bug? What would you change, and why is it optional?

[summary] Show answer

Not a bug: every ID is still unique, and order was never promised. If you want tidy IDs, take the max (202), add a buffer and restart both servers at the safest value, 241 and 242, so round robin reads 241, 242, 243 … It is optional because it changes only how the IDs look, not whether they are correct.

Both designs still keep a service that someone has to run. Twitter’s answer removes it.

Concepts in this section: batching · ID ranges · SELECT … FOR UPDATE · decoupling · ticket server · upsert · auto_increment_offset · safest value

Contents of this lecture ↑

Lecture 06, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-snowflake ===

# Minting unique IDs, chapter 6: Snowflake: IDs without a service

Lecture 06 · Minting unique IDs · chapter 6 of 9

§ 6

## Snowflake: IDs without a service

Twitter’s 64-bit layout puts time, machine and counter in one integer, with no service in the path. Discord and Sony reuse it with a different start date.

About 20 min · class 01:36–01:44, 01:54–02:03, Q&A 02:16–02:18 and 02:28–02:29

Tweets are one of the highest-throughput writes in the world, and they spike whenever something big happens and everyone tweets at once. Amazon’s ranges and Flickr’s ticket servers (§5) both keep an ID service that someone has to run and scale. In a path this busy, that service is one more thing to scale.

This chapter takes the service away. Every building block is one you have already made: time on the left (§3.3), the static counter (§2.3), a small integer (§4).

§ 6.1

## Twitter’s Snowflake

Logic, not a service: one integer that carries its own time, machine and counter.

About 3 min · class 01:36–01:38

After two central ID services comes a third approach: decentralized ID generation. It is a piece of logic, not a service. Twitter’s version is called Snowflake. (Twitter’s own 2010 Snowflake was in fact a network service that its servers called github.com ↗. Running the same logic as a library inside every server is how many others use it, and it is the version this chapter builds.)

Twitter still uses it, and in the lecture’s view it is one of the best ID generation systems out there.

[summary] Why “Snowflake”? skip unless you are curious about the name

The name is read here as a nod to real snowflakes: almost every snowflake in the world is unique, no two exactly the same, and the algorithm produces IDs that are likewise unique. Twitter never explained the name, so treat that as an interpretation. If you want the physics, Numberphile has a video on why real snowflakes (not the IDs) are unique.

Every tweet ID is a Snowflake. Discord and Instagram adopted the same idea: Discord in §6.6, Instagram in the whole of §7.

A Snowflake is 64 bits, and it is kept that small on purpose. At Twitter’s scale the size matters. Every tweet ID is stored, ingested and indexed again and again, and 128 bits (16 bytes) instead of 64 would double the space every one of those copies needs. Small IDs are storage efficiency and compute efficiency at scale (§4.2 showed why every index pays for the ID).

It is very much like MongoDB’s ObjectId from §4.5, time first and then a few tie-breakers, only smaller: 8 bytes instead of 12.

§ 6.2

## 41 | 10 | 12

Time on the left, a machine ID, and a counter. What each field allows, and when it would run out.

About 5 min · class 01:38–01:42, Q&A 02:01

The first 41 bits are milliseconds counted from an epoch. Time sits on the left side, always: it is the most significant part of the number, so it moves the ID forward every millisecond.

The next 10 bits are the machine ID, the ID of the server generating the ID. That is the API server, not the database server. (In Twitter’s original design these 10 bits named a Snowflake server process, because Snowflake ran as its own service github.com ↗.)

The last 12 bits are a per-machine counter: the same static counter from §2.3, one variable per server, atomically incremented every time an ID is made. 41 + 10 + 12 is 63, so the top bit stays 0 and keeps the ID a positive 64-bit integer.

[figure title] Snowflake's 64 bits

[figure description] A 64-bit integer split into fields. The top bit is unused and stays 0. Then 41 bits of milliseconds since an epoch, the most significant part, so time is on the left. Then a 10-bit machine id, 2 to the 10 = 1024 machines, and a 12-bit per-machine counter, 2 to the 12 = 4096 IDs per millisecond. Time orders the IDs; machine and counter break the tie.

[figure labels] bit 63 · 22 · 12 · 0 · 41 · 10 · 12 · ↑ unused, always 0 · time (ms since an epoch) · machine id · counter, · per machine · 2^10 = 1024 · machines · 2^12 = 4096 · ids per ms · most significant: moves forward every ms · time on the left · tie broken on the right

[caption] Fig 6·aSnowflake’s 64 bits: an unused top bit, 41 bits of time, 10 of machine, 12 of counter. Time on the left orders the IDs; the right-hand fields break the tie. Redrawn from the class board at 01:36.

To make an ID on demand, inside the request handler, a server needs only three things. The current time, which it has. Its own machine ID: every machine is given a unique one to start with. And its per-machine counter. Nothing else, and nobody else to ask.

The field widths set the limits. Ten bits of machine ID allow at most 2^10 = 1,024 machines; past that the field would overflow. (Strictly, that caps the number of generator processes. Twitter’s API servers could grow on their own, because Snowflake was a separate tier github.com ↗.)

Pause and think

Snowflake gives 10 bits to the machine ID and 12 bits to a per-machine counter. Could one machine ever run out of IDs within a single millisecond?

A real generator that does hit 4,096 in one millisecond just waits for the next one. Nobody fires 4 million tweets a second at one machine, so the headroom is huge.

Twelve bits of counter give 2^12 = 4,096 values. 2^10 is 1,024, then 2,048, then 4,096. So one machine can make 4,096 unique IDs in one millisecond before it could see a collision.

That is humongous throughput: the system was built tolerant enough to be well prepared for future scale. For comparison, the requirement Twitter wrote down for Snowflake was a minimum of 10,000 IDs per second per process github.com ↗.

So when would Snowflake ever see a collision? Only if one machine handled more than 4,096 requests in one millisecond. As worked out in class, that is 400,000 requests per second, and no one does that. With at most 1,024 machines, Twitter is safe at the scale it handles.

More precisely

One Snowflake generator can issue up to 4,096 IDs per millisecond, which is about 4 million per second, not 400,000. The conclusion stands, with about ten times more room than that.

github.com ↗

§ 6.3

## Where Snowflake runs

Request in, ID made, row stored. No call to anyone in between.

About 3 min · class 01:38–01:39, 01:42–01:43 and 01:55–01:57

Follow one tweet. You send a REST request to create it, and it lands on one of Twitter’s ordinary API servers. The server does basic validation (tweet ID, user ID, text, tags), makes the tweet ID with Snowflake, and stores the tweet in the tweets database, which is massively partitioned. (In Twitter’s 2010 design that “makes the ID” step was a call to a separate Snowflake service github.com ↗.)

As this design is taught, Snowflake is not a service at all. It is a library inside the API servers: normal integers and normal bit manipulation.

[figure title] Snowflake inside the API servers, as taught

[figure description] A user sends a tweet to one of three API servers. Each API server has the Snowflake function inside it (a dot), makes the tweet ID itself while storing the tweet, and writes the tweet to a partitioned tweets database. No call goes to any separate ID service.

[figure labels] api · api · api · snowflake() inside · tweets db · partitioned · id computed while · storing the tweet

[caption] Fig 6·bThe design as taught: each API server makes the tweet ID itself while storing the tweet. Twitter’s own 2010 Snowflake ran as a separate service (see the note below). Redrawn from the class board at 01:39.

More precisely

Twitter’s Snowflake ran as a separate network service, a Thrift server written in Scala. Twitter has since retired that open-source release; the repository was archived in 2021 github.com ↗. The same bit layout is often built as a library inside app servers instead, as Sony’s Sonyflake ↗ is.

github.com ↗

The benefit is what is missing. There is no moving component and no central ID service to talk to. A request comes in, the server makes a Snowflake ID, stores the row in the database, done: no network call, no extra service to build and scale out, no extra load on a database. (That holds for the library form. Twitter’s own Snowflake servers won the same way in a different sense: they never had to coordinate with each other github.com ↗.)

This is why Twitter scales. Firing tweets is one of the highest-throughput workloads there is, and a separate set of ID services would itself need scaling, with all the work that goes with it. Snowflake avoids that tier. (Twitter did run and scale a Snowflake tier; what kept it easy was that its nodes need no coordination.)

§ 6.4

## Making one: a few lines of bit arithmetic

Shift the time left, OR in the machine and the counter.

About 2 min · class 01:42–01:43, Q&A 02:17

You can write Snowflake in about three lines of code, even one if you like it terse.

Take the current time, the machine ID, and the static counter, incremented atomically. Shift the time left by 23 bits, OR the parts together, and that is the ID. Plain bit manipulation.

More precisely

Twitter’s shift is 22, the 10 machine bits plus the 12 counter bits: ID = (ms_since_epoch << 22) | (machine_id << 12) | sequence. A shift of 23 is 13 + 10, Instagram’s layout in §7 depesz.com ↗.

github.com ↗

# The core, with Twitter's layout: 41 | 10 | 12, so time shifts by 22. # (A shift of 23 belongs to Instagram's 41 | 13 | 10, in §7.) EPOCH = 1288834974657 # Twitter's epoch, in ms (4 Nov 2010) def snowflake(now_ms, machine_id, counter): return ((now_ms - EPOCH) << 22) | (machine_id << 12) | (counter & 4095)

That is the whole idea. A generator you would run adds two guards around it (added on this page; they are not part of the three lines). If 4,096 IDs are used up within one millisecond, it waits for the next millisecond. If the clock steps backwards (§3.6), it refuses to issue IDs until time has caught up, as Twitter’s did github.com ↗:

# The page's additions: the two guards a real generator has. last_ms, seq = -1, 0 def next_id(): global last_ms, seq with lock: # one counter per machine, changed atomically now = current_ms() if now < last_ms: raise ClockMovedBackwards() # refuse until time passes last_ms if now == last_ms: seq = (seq + 1) & 4095 if seq == 0: # all 4,096 used in this millisecond while now <= last_ms: now = current_ms() # wait for the next one else: seq = 0 last_ms = now return ((now - EPOCH) << 22) | (MACHINE_ID << 12) | seq

Where does MACHINE_ID come from? It has to be unique per machine, and it can be assigned, for example by ZooKeeper when a machine spins up.

§ 6.5

## Roughly sortable

Time on the left buys rough order for free. Rough, not strict.

About 4 min · class 01:43–01:44, Q&A 02:17–02:19 and 02:28–02:29

The beauty of Snowflakes is that they are roughly sortable. The leftmost 41 bits move forward every millisecond, so IDs come out almost ordered, and that byproduct is what makes pagination so efficient (§8). Twitter promised exactly this much: IDs “k-sorted” within about a second, not strict order github.com ↗.

Even within one millisecond there is a pattern: IDs from the machine with the smaller machine ID are smaller, and IDs from the machine with the larger machine ID are larger.

You can check this on any tweet. Click it and look at the link: the tweet ID in it is an integer, a Snowflake, and its top bits are the epoch millisecond when the tweet was made.

[figure title] Decode a tweet ID

[figure description] The example ID 1627179151913938944 written in binary and spread over the 64-bit bar. Shifting right by 22 and adding Twitter's epoch gives 1,676,784,716,000 ms, 19 February 2023 at 05:31:56 UTC. Shifting right by 12 and keeping 10 bits gives machine 7. Keeping the low 12 bits gives counter 0.

[figure labels] 1627179151913938944 · an example id, in binary below · 0 · 0 · 0 · 1 · 0 · 1 · 1 · 0 · 1 · 0 · 0 · 1 · 0 · 1 · 0 · 0 · 1 · 1 · 1 · 0 · 0 · 1 · 1 · 0 · 1 · 1 · 0 · 1 · 0 · 0 · 0 · 1 · 0 · 1 · 0 · 0 · 0 · 1 · 1 · 1 · 1 · 1 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 1 · 1 · 1 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · time: 41 bits · machine · counter · (id >> 22) + 1288834974657 · = 1676784716000 ms · 19 Feb 2023, 05:31:56 UTC · (id >> 12) & 1023 · = 7 · id & 4095 · = 0 · 1288834974657 is Twitter’s epoch in ms (4 Nov 2010) · any tweet link decodes the same way

[caption] Fig 6·cDecoding a Snowflake. The ID 1627179151913938944 is an example built for this page from the timestamp 1,676,784,716,000 ms (19 February 2023), machine 7 and counter 0, with Twitter’s layout and epoch. Shift right by 22 and add the epoch to get the time; mask the middle 10 bits for the machine and the low 12 for the counter. A real tweet ID from any link decodes the same way.

So given IDs alone, you can tell whether a tweet was made before or after a certain time, or before or after a certain ID, without reading a single timestamp column. That makes pagination super efficient, a very interesting byproduct of roughly sortable IDs. §8 is about exactly that.

Roughly is the word to keep. Snowflake is not strictly monotonic and doesn’t promise to be: some IDs can come out of order. If a business case really needs strict order, auto-increment is the way to go. (Auto-increment on one database hands out increasing values, but concurrent transactions can still commit out of ID order dev.mysql.com ↗; §9.1 comes back to which systems need this.)

One idea raised in class: route requests round robin, and Snowflake IDs will increase. Not necessarily. Round robin decides which machine answers next; it doesn’t make the machines’ clocks agree, and §3.5 showed what four clocks do to time-first IDs.

You cannot guarantee monotonicity in a distributed setup. Clocks go out of sync, and enforcing order across machines becomes extremely inefficient; that is “written in stone”. So you give up that constraint and take the most you can get: rough sortability.

§ 6.6

## A custom epoch: Discord and Sony

Nothing forces the clock to start in 1970. Start it on your launch day and the 41 bits last decades longer.

About 5 min · class 01:54–01:56, Q&A 02:01–02:03

Epoch milliseconds are a timestamp counted from the epoch, 1 January 1970.

But nothing enforces 1970 in those first 41 bits. If your company starts in, say, 2011 or 2015, why start your time from 1 January 1970? You can pick a custom epoch and reclaim the range between 1970 and your start, so your IDs last longer.

Why that helps is easiest to see with a real number. On 19 February 2023 the epoch second was 1676784716; add three zeros and you have the epoch millisecond, 1,676,784,716,000. Forty-one bits hold at most 2^41 ≈ 2.2 × 10^12, and 1.68 × 10^12 is already about 76% of that. A company that starts counting at 1970 today has wasted most of its range and runs out soon. Start from zero on your launch day and let time count up 1, 2, 3 from there, and the whole range is yours.

Put another way, as one idea raised in class summed it up: a custom epoch is just subtracting the start time from now. Your counted time moves at exactly the rate real time does, only from a smaller start, and that gives a massive range.

How much more? Roughly 35 more years of IDs, give or take, or 45 if you start today. Here is the arithmetic. 2^41 ms is about 69.7 years, from whichever epoch you choose. Counted from 1970 the bits run out in 2039; counted from 2015 they last until about 2084.

[figure title] Where the 41 bits run out

[figure description] Two timelines on one year axis. 2^41 milliseconds is about 69.7 years. Counting from 1970, the 41 bits run out in 2039, and by 2023 (1,676,784,716,000 ms) about 76% is already used. Counting from a 2015 epoch, as Discord does, the same 69.7 years last until about 2084. The years from 1970 to 2015 are what a 2015 company would waste.

[figure labels] years a 2015 company would waste · epoch 1970 · 41 bits run out · 2039 · 1,676,784,716,000 ms · 2023: about 76% used · epoch 2015 · (discord) · lasts to about 2084 · 1970 · 1990 · 2010 · 2030 · 2050 · 2070 · 2090 · each line is 2^41 ms ≈ 69.7 years long

[caption] Fig 6·dThe same 41 bits, two starting points. Counted from 1970 they run out in 2039, and by February 2023 about 76% was gone. Counted from 2015, as Discord does, they last until about 2084. Twitter’s own epoch is 4 November 2010 (Fig 6·c).

Discord uses exactly Twitter’s structure, but its epoch starts at the first second of 2015, because the company started in 2015. Its documentation describes the details: a 42-bit timestamp in milliseconds since the start of 2015, a 5-bit worker ID and a 5-bit process ID where Twitter has one machine field, and a 12-bit increment. Its HTTP API sends these IDs as strings docs.discord.com ↗.

Sony, the TV company, uses a Snowflake-based implementation too. Sonyflake is open source on GitHub, written in Go, and its core is about five lines of bit manipulation. Its default layout is different from Twitter’s: 39 bits of time in 10 ms units (about 174 years), an 8-bit sequence (256 IDs per 10 ms) and a 16-bit machine ID (65,536 machines) github.com ↗.

§ 6.7

## No moving parts, and an opinion about microservices

Why the simplest design here is also the one that scales.

About 2 min · class 01:56–01:57

Here is the counterintuitive part. Whenever ID generation comes up, the first instinct is “I’ll write a microservice that does that”. Good engineers don’t start there. They look at the problem and at the most efficient way to solve it, and not every solution needs a service. This is the habit §1.3 started from.

Every system and every solution is contextual. It depends on your organization’s context, on your engineers’ expertise and on the support you get from management.

So if everyone around you is proposing a microservice and you believe something like Snowflake is far better for your case, bring the change with data. Show the numbers; if they hold, people adopt it.

[summary] The lecture’s view on microservices skip unless you are arguing about it at work

The opinion, stated bluntly: microservices are an overkill in most cases, and you shouldn’t fall into the trap of building one for every problem. A milder version is mainstream. Martin Fowler observes that “almost all the successful microservice stories have started with a monolith that got too big and was broken up”, and that early on “the premium of microservices is a drag you should do without” martinfowler.com ↗.

The rule for this whole chapter

Simple systems scale: understand the context and build only what you need.

Understand the context, then build what you really need to build, and keep it simple. Snowflake is the example: a few lines inside the server where a service could have been. Not every problem needs a new service.

[figure title] Just a function call

[figure description] A request arrives at an API server. The ID is made by a small function inside the server, and the tweet goes straight to the database. A separate ID service, drawn faint, is not needed: no arrow leaves the server for it.

[figure labels] api · just a function call · id svc · not needed

### Check yourself #

Answer in your head, or out loud, before opening each one.

With 41 | 10 | 12, how many generators can there be, and how many IDs can each make per millisecond? What happens on the 4,097th?

[summary] Show answer

2^10 = 1,024 generators (machines, as taught), each making 2^12 = 4,096 IDs per millisecond, about 4 million a second. The 4,097th request in the same millisecond would wrap the counter and risk a collision, so a real generator waits for the next millisecond before issuing it.

Why does a 2015 epoch give Discord decades more IDs than a 1970 one?

[summary] Show answer

41 bits of milliseconds last about 69.7 years from whatever start you pick. Counted from 1970 that ends in 2039, and by 2023 about 76% of the range was already used. Counted from Discord’s 2015 start, the same 69.7 years run to about 2084: the 45 years between 1970 and 2015 are no longer wasted.

What does “roughly sortable” promise, and what does it not?

[summary] Show answer

It promises that IDs made in a later millisecond are almost always larger, so sorting by ID roughly sorts by creation time (Twitter promised within about a second). It does not promise strict order: machines’ clocks drift, so two IDs made close together on different machines can come out in the wrong order. Where strict order is required, use a single authoritative sequence such as auto-increment.

Instagram wanted the same layout and refused to run it in the API servers. They put it in the database.

Concepts in this section: decentralized ID generation · 41 | 10 | 12 · library, not service · bit shift and OR · roughly sortable · custom epoch · simple systems scale

Contents of this lecture ↑

Lecture 06, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-instagram ===

# Minting unique IDs, chapter 7: Instagram: Snowflake inside the database

Lecture 06 · Minting unique IDs · chapter 7 of 9

§ 7

## Instagram: Snowflake inside the database

Same idea, different home. Instagram packed time, shard and sequence into 64 bits inside a database function, so no API server knows anything about IDs.

About 18 min · class 02:03–02:18, Q&A 02:15–02:25

Instagram wants Twitter-style IDs: 64 bits, time on the left, made without asking anyone. But it refuses to run a new service for them, and its database is already split into thousands of shards. Snowflake put the ID logic in the API servers (§6.3). Instagram found a third home for it.

Every part is one you have already built: time on the left (§3.3), a small integer (§4), a static counter (§2.3) and a custom epoch (§6.6).

§ 7.1

## Three requirements

Sortable by time, 64 bits, and no new service.

About 3 min · class 02:03–02:05

In the lecture’s view, Instagram’s early ID scheme is a brilliant piece of optimization. It comes from a post on Instagram’s engineering blog, and it shows how much someone with decent, not even deep, knowledge of databases can get out of one.

Instagram wanted Snowflake’s kind of ID, but it makes the ID inside the database, while the row is being inserted. The API servers have no Snowflake logic at all. (Strictly, Instagram didn’t run Twitter’s code. It built its own Snowflake-like 64-bit layout as a function written in PL/pgSQL, Postgres’s procedural language depesz.com ↗.)

So the two differ in where the ID is born. Twitter makes it in the API servers; Instagram makes it in the database.

Instagram’s requirements, as on the board:

- IDs sortable by time. The use case is Twitter’s: process the most recent items, find trending hashtags, push new posts into users’ feeds. Batch jobs over recent data, and pagination (§8), both need it.

- 64 bits, so the IDs are efficient on indexes. §4 showed why every index pays for the size of the ID.

- No new service to build and run.

§ 7.2

## 41 | 13 | 10

Instagram keeps Snowflake’s time field and swaps the machine and counter for a shard and a sequence.

About 2 min · class 02:05

Instagram tweaked Snowflake’s layout. The first 41 bits are milliseconds counted from a custom epoch in 2011, which gives a massive range to play with (§6.6 worked out why). The epoch constant in Instagram’s published function, 1314220021721, is 24 August 2011, not the 1 January 2011 written on the board depesz.com ↗.

The next 13 bits are the DB shard ID. Instagram’s database was already sharded; §7.3 shows which shards these are.

The last 10 bits are a per-shard sequence number: a static counter, one per shard, just like the counter of §2.3.

[figure title] Twitter's 64 bits and Instagram's 64 bits

[figure description] Two 64-bit bars, one above the other. Twitter's Snowflake: an unused top bit, 41 bits of time, a 10-bit machine id (1024 machines) and a 12-bit counter (4096 IDs per millisecond per machine). Instagram's: 41 bits of milliseconds since its 2011 epoch, a 13-bit logical shard id (8192 shards) and a 10-bit per-shard sequence (1024 IDs per millisecond per shard), filling all 64 bits. Time stays on the left in both; only the two right-hand fields change width.

[figure labels] twitter snowflake · bit 63 · 22 · 12 · 0 · 41 · 10 · 12 · time (ms since an epoch) · machine id · counter · 1024 machines · 4096 per ms · instagram · bit 63 · 23 · 10 · 0 · 41 · 13 · 10 · time (ms since the 2011 epoch) · shard id · sequence · 2^13 = 8192 · logical shards · 1024 per ms · per shard · time on the left in both

[caption] Fig 7·aTwitter’s bar from Fig 6·a above Instagram’s. Time keeps the left 41 bits in both. Instagram gives the middle field 13 bits and the counter 10, and its three fields fill all 64 bits (41 + 13 + 10), where Twitter leaves the top bit 0. Drawn from the class board at 02:03, which wrote Instagram’s layout as a list.

Side by side: Twitter splits its 64 bits 41 | 10 | 12 (time, machine ID, counter); Instagram splits them 41 | 13 | 10 (time, shard ID, sequence). Thirteen bits name 2^13 = 8,192 shards, and ten bits allow 2^10 = 1,024 IDs per shard per millisecond.

Twitter’s Snowflake and Instagram’s IDs, side by side

|

| Twitter Snowflake

| Instagram

| Where it runs

| In the API servers, as taught (Twitter’s 2010 version was its own service, §6.3)

| Inside the database, as the id column’s default

| Time bits

| 41: ms since a custom epoch

| 41: ms since a 2011 epoch

| Middle field

| 10 bits: machine ID

| 13 bits: logical shard ID

| Counter bits

| 12: per-machine counter

| 10: per-shard sequence

| IDs per ms per unit

| 2^12 = 4,096 per machine

| 2^10 = 1,024 per shard

| What caps the system

| 1,024 generators (2^10)

| 8,192 logical shards (2^13); API servers unlimited

| Epoch

| Twitter’s own: 4 Nov 2010 (Fig 6·c)

| 24 Aug 2011 (the board said 1 Jan 2011)

§ 7.3

## Logical shards on physical servers

Thousands of small databases on a dozen machines: a migration costs more, and moving load gets easy.

About 5 min · class 02:05–02:09

Before the function, the shards it numbers.

[summary] Watch first skip if you have seen the sharding video

The video on sharding and partitioning in this week’s readings, on the instructor’s YouTube channel, is the background for this section. What follows is a glimpse of it.

Instagram runs Postgres.

It splits its data into many logical shards, also called partitions, placed on far fewer physical database servers. A physical server is the actual machine your database runs on: the database server you spin up. Inside it, each database you create with CREATE DATABASE is a logical partition. In Instagram’s own Postgres setup each logical shard was a schema, such as insta5, holding the same set of tables, and several thousand of them were mapped in code to far fewer physical servers instagram-engineering ↗.

There are thousands of logical shards, at most 2^13 = 8,192, since that is all 13 bits can name, on a few physical servers, say 10 or 15.

[figure title] Logical shards on a physical server

[figure description] One physical database server, drawn as a large cylinder, holds several logical shards: insta1, insta2, insta5, insta9, insta12. Each logical shard is a database made with CREATE DATABASE, with the same tables as every other. Instagram ran thousands of logical shards, at most 2^13 = 8192, on 10 to 15 physical servers.

[figure labels] physical server · insta1 · insta2 · insta5 · insta9 · insta12 · logical shards (partitions) · 1000s, at most 2^13 = 8192 · on physical db servers · 10–15 of them · CREATE DATABASE insta5; · ↓ logical separation · (a schema in Instagram's Postgres)

[caption] Fig 7·bOne physical server holding several logical shards, each a database of its own with the same tables. Instagram ran thousands of them on 10–15 servers. Redrawn from the class board at 02:05.

On one server you run CREATE DATABASE insta1, CREATE DATABASE insta2, CREATE DATABASE insta3, and so on; another server holds, say, insta2000 and insta5000. Every logical shard has exactly the same tables with exactly the same schemas. Only the data differs.

That has a cost. A migration, such as adding a column, must run on every logical database on every physical server: thousands of times, about 8,000.

And it has a benefit. When one server runs hot, a small logical shard can be dumped with the SQL dump commands and loaded onto another server, and the load is balanced.

[figure title] Moving a hot shard

[figure description] Panel a: server 1 holds six logical shards and one of them, outlined red, is hot; a new server 2 stands empty. Panel b: the hot shard has been dumped from server 1 and loaded onto server 2 as a whole, a dashed arrow marking the move, with a green tick. No rows are picked one by one.

[figure labels] server 1 · server 2 (new) · hot · empty · server 1 · server 2 · dump → load · a · one shard runs hot · b · move it whole · no row-by-row picking: the shard moves whole

[caption] Fig 7·cMoving a hot shard. (a) One logical shard on server 1 runs hot, and a new server 2 stands empty. (b) The shard is dumped and loaded onto server 2 whole, with no row-by-row picking.

So scaling the database horizontally is easy: spin up a new physical server, take a logical shard and move it there. Without logical shards you would have to go through every row, extract the rows that need to move, and move them. A separate logical shard is dumped quickly and loaded quickly, which makes moving it easy.

coming later · week 5 · Lecture 9: logical partitions and moving them between servers, once more and in depth

That is Instagram’s structure: about 10 database servers, each holding thousands of logical databases. The DB shard ID inside an Instagram ID is the number of one of those logical shards, at most 2^13 = 8,192, followed by the per-shard sequence number. (Instagram’s physical servers run Postgres, though the same picture holds for MySQL servers depesz.com ↗.)

§ 7.4

## A function as the column default

Insert a photo without an ID, and the database computes a Snowflake-style ID for it.

About 6 min · class 02:09–02:15

The brilliant move uses stored procedures, the thing most of us neglected in college and assumed we would never use. Instagram’s is a function written in PL/pgSQL.

In each logical database, say insta5, the photos table’s id column is declared bigint not null with default insta5.next_id(). When a photo is inserted without an ID, the database invokes that function, and whatever it returns is used as the ID.

Each logical database has its own next_id, with its own shard ID hard-coded inside: 5 for insta5. So the function has to be created in every single database.

Here is the board’s code, in the order Postgres needs it (the board showed the table first):

-- PL/pgSQL. The board wrote CREATE DATABASE insta5; in Postgres each logical shard is a schema. CREATE SCHEMA insta5; CREATE SEQUENCE insta5.table_id_seq; CREATE OR REPLACE FUNCTION insta5.next_id(OUT result bigint) AS $$ DECLARE epoch bigint := 1314220021721; -- Instagram's custom epoch, in ms seq_id bigint; now_ms bigint; shard_id int := 5; -- hard-coded: this is shard 5 BEGIN SELECT nextval('insta5.table_id_seq') % 1024 INTO seq_id; -- left blank on the board; this page's completion: SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_ms; result := (now_ms - epoch) << 23; result := result | (shard_id << 10); result := result | (seq_id); END; $$ LANGUAGE plpgsql; CREATE TABLE insta5.photos ( id bigint NOT NULL DEFAULT insta5.next_id(), caption text -- … the other columns of the photos table );

insta5.next_id returns a big integer, result, and declares four variables: epoch, seq_id, now_ms and shard_id, which is 5. epoch is Instagram’s custom epoch in milliseconds: 1314220021721 is 24 August 2011, not 1 January depesz.com ↗.

First, seq_id gets nextval('insta5.table_id_seq'), taken % 1024. The sequence increments atomically, however many transactions come in at once, and % 1024 (2^10) cuts it down to the 10-bit per-shard sequence number.

Then result := (now_ms - epoch) << 23. now_ms is the database’s current epoch millisecond; minus the custom epoch, it is the milliseconds since 24 August 2011, and shifting left by 23 (13 + 10, the bits still to fill) puts them in the top 41 bits.

Last, result := result | (shard_id << 10) sets the next 13 bits to 5, the shard ID, and result := result | seq_id fills the last 10.

Here is one insert, step by step. Use the buttons or the arrow keys:

[figure title] One insert, one ID

[figure description] An INSERT into insta5.photos gives no id, so the column default calls insta5.next_id(). The function takes nextval of the shard's sequence, 5001, modulo 1024: 905. It shifts the milliseconds since Instagram's epoch, 362564694279, left by 23 into the top 41 bits, ORs in shard 5 shifted left by 10, then ORs in 905. The row is stored with id 3041413094946379657; the API server never made an ID.

[figure labels] INSERT INTO insta5.photos (caption) · VALUES ('sunset'); · no id given · 41 · 13 · 10 · ms since the epoch · shard · seq · insta5.next_id() · the column default · nextval('insta5.table_id_seq') = 5001 · 5001 % 1024 → seq_id = 905 · 362564694279 · result := (now_ms - epoch) << 23 · = 3041413094946373632 · 5 · result := result | (shard_id << 10) · = 3041413094946378752 · 905 · result := result | seq_id · = 3041413094946379657 · insta5.photos · id · caption · 3041413094946379657 · 'sunset'

- The insert gives no id. The column’s default calls insta5.next_id().

- An atomic sequence gives the next number, 5001; % 1024 keeps 10 bits: seq_id = 905.

- Milliseconds since Instagram’s epoch, 362564694279, go into the top 41 bits: (now_ms - epoch) << 23.

- This database’s shard number, hard-coded as 5, goes in the middle 13 bits: | (shard_id << 10).

- The sequence fills the last 10 bits: | seq_id.

- The database stores the row with the ID 3041413094946379657. The API server never touched it.

Keys: ← → to step · link to a step with #fig-7d/step-3

[caption] Fig 7·dA worked example for this page: the insert lands at 1,676,784,716,000 ms (19 February 2023), on shard 5, and the sequence’s next value is 5001. The bar fills from the left; under it is the running value of result.

Every time a photo is inserted without an ID, the database invokes this function. It builds the ID and returns it as result, and that is what gets inserted. Instagram does Snowflake IDs in a database stored procedure.

That is why it is so efficient: you don’t need any ID logic on the API side, because it is all offloaded to the database. You do a normal insert, as you always would, without passing an ID. Where the database would have auto-incremented, it now invokes the function.

The rule for this whole chapter

Put the ID where the data is: no ID logic on the API side.

Do a normal insert without an ID, and let the database call the function where it would have auto-incremented. The API tier stays a plain API tier: no counter, no machine ID, no service to call.

[figure title] The database fills in the ID

[figure description] An INSERT with no id travels into a database cylinder. The id column's default is next_id(), so the database makes the ID itself and the API side holds no ID logic.

[figure labels] INSERT … (no id) · id default next_id() · the database · fills in the id

Implement this yourself; don’t only read about it. Start your favourite database, MySQL, Postgres, anything, and write it. It is very easy, and the previous batch was amused at how easy it was the first time they tried. (On MySQL, which doesn’t allow a stored function as a column default, a BEFORE INSERT trigger can set the ID instead dev.mysql.com ↗.)

Instagram still does this, says the lecture: its posts still carry integer IDs generated exactly this way.

§ 7.5

## A sequence is the static counter

What table_id_seq is, what it isn’t, and why it has to live on disk.

About 4 min · class 02:12–02:13, Q&A 02:15–02:16, 02:19–02:21 and 02:24–02:25

Every database has a sequencer; it is how auto-increment IDs are made. It is a sequence that increments atomically and returns the next number each time it is invoked. nextval is that call. That is exactly PostgreSQL’s model. MySQL has no separate sequence objects; InnoDB keeps a per-table auto-increment counter instead, though the atomic-counter idea is the same dev.mysql.com ↗.

It is tempting to read insta5.table_id_seq as a column of the photos table. It isn’t one. It is a sequence object. When you create an ID column with auto-increment, the database quietly creates a sequence behind it with a unique name, and every new ID is a nextval on it. Instagram has no auto-increment column, so it creates its own sequence explicitly and uses it in place of the default one. table_id_seq is the name Instagram gave it, but you can name a sequence anything. In PostgreSQL, serial is literally shorthand for this: a CREATE SEQUENCE named tablename_colname_seq, plus a NOT NULL column whose default is nextval('tablename_colname_seq') postgresql.org ↗.

Another tempting reading: every table gets a sequence when it is created. Only an auto-increment column creates one. Otherwise you create sequences explicitly, with any name, as many as you want, and a table isn’t limited to one auto-incrementing column: you could have three. (That holds in PostgreSQL; MySQL allows only one AUTO_INCREMENT column per table dev.mysql.com ↗.)

So the sequencer does exactly what the static counter did in §2.3: it increments atomically and hands out values, which gives the thread safety the ID needs. Like any PostgreSQL sequence, it never hands a value back, even when the inserting transaction aborts, so sequences have gaps; the docs say they cannot give “gapless” sequences postgresql.org ↗. An ID doesn’t mind a gap.

One more tempting idea: keep the sequence in a cache instead of on disk. It has to be persistent. If it weren’t, a database reboot would start it from zero, which is §2.4’s reboot problem all over again. Leave the optimization to the database, which flushes periodically and so on: just create a sequencer and let it generate values. For example, MySQL writes its auto-increment counter to the redo log every time it changes, so it survives restarts, but after a crash before that log is flushed, a recently allocated value can be handed out again dev.mysql.com ↗. A PostgreSQL sequence can pre-allocate values per session (CACHE), and values a session never used are lost when it ends, leaving holes postgresql.org ↗.

§ 7.6

## What moving it into the database buys

The API tier loses its limit; the ceiling moves to the database.

About 1 min · class 02:16–02:17

Notice what changed: Instagram just lifted Snowflake’s logic out of the API servers and put it in the database. True, and that is the point. With the logic in the database there is no limit on API servers: 10,000 of them, or 50,000. The ceilings move to the database instead: at most 2^13 = 8,192 logical shards (about 8,000 databases, a huge number) and 1,024 IDs per shard per millisecond.

Twitter, by contrast, is limited to 2^10 = 1,024 API servers because of its 10-bit machine ID. (Strictly, the cap is on Snowflake generator processes; Twitter ran Snowflake as its own service github.com ↗.)

### Check yourself #

Answer in your head, or out loud, before opening each one.

What do Instagram’s 13 middle bits identify, and why couldn’t they be a machine ID?

[summary] Show answer

The logical shard, one of up to 2^13 = 8,192 small databases, that made the ID. The ID is made inside that shard’s database, by that shard’s own function and sequence, and shards move between physical servers when one runs hot. A machine ID would change with every move; the shard number stays with the data.

Why does insta5.next_id() need its own copy in every logical database?

[summary] Show answer

Its shard ID is hard-coded inside it (5 for insta5), and it reads its own shard’s sequence. So each logical database needs its own copy, created in every one of the thousands of databases.

Why must the sequence persist, and which earlier problem in this lecture is that?

[summary] Show answer

A sequence kept only in memory would restart from zero after a database reboot and hand out IDs that were already used. That is the reboot problem of §2.4, where the in-memory counter went back to 0. The database persists the sequence and optimizes the flushing itself.

Every scheme from MongoDB to Instagram puts time on the left. Here is what that buys you without asking.

Concepts in this section: sortable, 64-bit, no new service · 41 | 13 | 10 · logical shards · next_id() as column default · sequence · API tier without limits

Contents of this lecture ↑

Lecture 06, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 8-pagination ===

# Minting unique IDs, chapter 8: Pagination: the side effect

Lecture 06 · Minting unique IDs · chapter 8 of 9

§ 8

## Pagination: the side effect

IDs with time on the left can be compared, and tables are kept in key order. Together they make “the next page” cost the same at page 1 and page 1,000.

About 18 min · class 01:43–01:54, Q&A 01:57–02:01 and 02:24–02:27

A batch job reads every tweet from the last hour to find trending topics. That is millions of rows, read ten at a time, page after page. How it asks for “the next ten” decides whether the job finishes in minutes or crawls.

Every ID scheme from §4.5 on put time on the left: MongoDB, Snowflake, Discord, Instagram. This chapter is the payoff, the one side effect worth a demo. Pagination turns out to be a very interesting side effect of having a good ID generation system.

§ 8.1

## Two ways to ask for the next page

Skip the rows you have seen, or start after the last ID you saw.

About 3 min · class 01:43–01:45 and 01:48–01:49

Twitter’s pagination is not limit/offset based. It uses since_id: “I read till this tweet, give me the next set.” The current X API works the same way, by ID and cursor rather than by offset: older pages come from an opaque next_token, and the docs advise since_id for fetching new data docs.x.com ↗.

Twitter’s API documentation is worth reading for exactly this: how it lets you page through, say, every tweet made by one account. The API is paid now, though its state has changed more than once, so check before you rely on it.

The most common way to paginate is limit-offset, also called skip-limit. You ask for LIMIT 10 OFFSET 0, then LIMIT 10 OFFSET 10 for the next page, then OFFSET 20, and so on. SQL is only the example; the same holds for every database. Whichever you use, give the query a unique ORDER BY: PostgreSQL warns that without a predictable order, different offsets “will give inconsistent results”, so rows can repeat or vanish between pages postgresql.org ↗.

The other way is ID-limit pagination, also called ID-based or keyset pagination. It fits when you just want to iterate through a table, with no advanced filters and no complex WHERE clauses (§8.5 looks at how strict that limit really is).

-- limit-offset (skip-limit): page n skips the first 10 × n rows SELECT * FROM tweets WHERE user_id = :uid ORDER BY id LIMIT 10 OFFSET 0; SELECT * FROM tweets WHERE user_id = :uid ORDER BY id LIMIT 10 OFFSET 10; SELECT * FROM tweets WHERE user_id = :uid ORDER BY id LIMIT 10 OFFSET 20; -- ID-limit (keyset): remember the last id you saw, start after it SELECT * FROM tweets WHERE id > :last_id ORDER BY id LIMIT 10;

Picture what Twitter has to do all the time: iterate through every tweet made in the last N minutes, to find trending topics, make recommendations, or put tweets into feeds. Work like that needs very efficient pagination, and that is ID-limit pagination.

§ 8.2

## Why offset gets slower as you go

Every page recomputes everything before it.

About 3 min · class 01:45–01:48

Limit-offset pagination is pathetically slow when you paginate deep.

Scrolling through one account’s tweets is a common case. Say the account has made 10,000 tweets. Pages three, four and five are fine. Page six is slower, page seven slower still, and every page after that slower again.

Now the batch job from the start of this chapter. Twitter produces millions of tweets an hour, and paging across millions of rows with limit-offset would be very slow.

MongoDB has the same thing under other names: skip and limit. Each next page fires a query that skips some documents and limits the result.

Why it slows down: for LIMIT n OFFSET m, the database has to evaluate the query, find the result set all the way up to the point you asked for, skip those m rows, and only then pick the n you wanted. It does all of that again for every page, because nothing is kept between queries, so the cost grows linearly with depth. PostgreSQL’s documentation says the same: rows skipped by OFFSET “still have to be computed inside the server; therefore a large OFFSET might be inefficient” postgresql.org ↗.

Page 1 takes the same time either way. What happens by page 1,000?

[caption] Clip 8·1It needs IDs you can compare, and an index on them.

[summary] The clip as text 0:38

- Two ways to ask for the next ten rows, page after page.

- Page 1: both read the first ten rows. Same work.

- Page 10: offset walks past 90 rows first. ID-⁠limit seeks id > 90.

- Page 100: offset walks past 990. ID-⁠limit makes the same short seek.

- Page 1,000: offset recomputes 9,990 rows only to skip them.

- Offset's cost grows with depth. ID-⁠limit's stays the same.

- It needs IDs you can compare, and an index on them.

A table of pages 1, 10, 100 and 1,000, ten rows per page, fetched two ways. With LIMIT 10 OFFSET m, the database starts at row 1 for every page and walks past all the rows before it (0, 90, 990, then 9,990 rows, computed and thrown away) before returning ten, so the walk gets longer with every page and takes the longest at page 1,000. With ID-limit, WHERE id > last LIMIT 10, each page goes down the index in a few steps (log n) to the last ID seen and reads the next ten rows, the same short work at page 1 and page 1,000. Offset's cost grows with depth; ID-limit's stays the same. It needs IDs you can compare and an index on them.

That needs an ID with an order. Every scheme with time on the left has one.

§ 8.3

## ID-based pagination

Remember the last ID, and ask for what comes after it.

About 4 min · class 01:49–01:53

ID-limit pagination needs IDs you can compare. MySQL’s auto-increment IDs are comparable: 1, 2, 3, 4, 5, 6, and you know which came first. So are MongoDB’s IDs, Snowflake IDs, and any ID with time on the leftmost side: you can tell which one is larger. For the time-based ones, “larger” means roughly later, not exactly: MongoDB says ObjectIds “are approximately ordered by creation time, but are not perfectly ordered” mongodb.com ↗, and Twitter promised its IDs only “k-sorted” within about a second github.com ↗.

Then you paginate by ID instead of by offset. Fetch the first 10 rows. Note the last ID you got. Ask for rows whose ID is greater than that last ID, limit 10. Repeat with the new last ID, and so on. Always add the sort, as MongoDB’s own range-pagination example does, so each page continues exactly where the last one ended mongodb.com ↗:

// first page let page = db.students.find().sort({ _id: 1 }).limit(10); // every next page: start after the last _id you saw page = db.students.find({ _id: { $gt: lastId } }).sort({ _id: 1 }).limit(10);

This is very efficient, because MongoDB collections and SQL tables are physically stored ordered by primary key. Keeping data in key order is a property of the database, so the cost of each page stays constant.

More precisely

What makes it fast is an index on the ID. In InnoDB that index is the clustered primary key, which does hold the rows in key order, so the database can seek straight to the last ID and read the next rows in order. Not every store is laid out that way. A normal MongoDB collection keeps its _id index separate from the documents mongodb.com ↗, and PostgreSQL tables are heaps that don’t stay in key order postgresql.org ↗. ID-based paging is still fast there, because the B-tree index on the key does the seeking. Either way the cost doesn’t grow with depth.

dev.mysql.com ↗

Because the data is in a B+ tree ordered by primary key, “give me 10 from this ID” costs log n to reach that ID and then a short sequential scan. Log n, scan; log n, scan. However deep you paginate, the time does not grow. In InnoDB that is exactly what happens: a primary-key range read is one B+ tree descent plus a walk along the leaf pages dev.mysql.com ↗.

[figure title] Skip: LIMIT 10 OFFSET 9990

[figure description] The rows of the result as one long strip. To return page 1,000 the database computes the first 9,990 rows, throws them away, and returns the 10 after them, so the work grows with the page number. A speech bubble asks: page 1,000 costs the same, right?

[figure labels] page 1,000 costs · the same, right? · LIMIT 10 OFFSET 9990 · 9,990 rows computed, · then thrown away · 10 back · skip: cost grows with the page

[figure title] Seek: WHERE id > 9990 LIMIT 10

[figure description] A B+ tree ordered by id: a root, two inner nodes and four leaves joined left to right. The query walks down from the root to the leaf holding id 9990, about log n steps, then reads the next 10 entries along the leaves. The work is the same at page 1 and page 1,000.

[figure labels] WHERE id > 9990 · ORDER BY id LIMIT 10 · 9990 · ✓ · log n down, then 10 across · seek: same cost at any page

[caption] Fig 8·aThe same page, asked for two ways. Left: OFFSET computes 9,990 rows only to throw them away. Right: the seek walks down the tree to id 9990 (about log n steps) and reads the next 10 along the leaves, at the same cost on any page.

Pause and think

You page through an account’s tweets with LIMIT 10 OFFSET 9990, and it gets slower the deeper you go. Tweet IDs have time on the left. Can you make every page cost the same?

That is the side effect promised back in §1.1. Comparable IDs, plus an index on them, make “the next page” a constant cost. You give up jumping to an arbitrary page number.

§ 8.4

## The benchmark

Skip-limit climbs in a straight line. ID-limit stays flat.

About 4 min · class 01:46–01:52, Q&A 01:57–01:58 and 02:24

This comparison has been measured. In 2016, bored at Amazon and heavily into MongoDB, the instructor wrote a quick benchmark of the two pagination strategies in MongoDB and published it arpitbhayani.me ↗.

The findings hold for MongoDB and for SQL, and, in the lecture’s words, for “literally every single database out there”.

The graph tells the story. Skip-limit’s time grows linearly as pagination goes deeper. ID-limit’s stays constant. At small depths there is little difference: the published post finds the two comparable up to about 500–600 records.

[figure title] Skip-limit vs ID-limit, the shape of the benchmark

[figure description] A chart with records paged through on the x axis and response time on the y axis, no values. The skip plus limit line rises in a straight line as pagination goes deeper; the _id plus limit line stays flat. Near the origin the two are about the same. Two spikes on the rising line are annotated: disk throttling during a flush, and other processes on the same laptop.

[figure labels] response time · records paged through (deeper →) · about the same · up to ~500–600 · skip + limit · _id + limit · disk throttling · during a flush · other processes · on the same laptop · shape only, redrawn from the benchmark; no values

[caption] Fig 8·bThe shape of the benchmark’s result, redrawn without its values: skip + limit rises in a straight line with depth, _id + limit stays flat, and the two are about the same near the start. The two spikes are disk throttling and other processes on the same machine. The original charts, with page sizes and percentiles, are in the published post on arpitbhayani.me.

One sudden spike on the skip-limit line was a massive disk flush: the disk started to throttle. For the benchmark’s author that was a welcome sight: saturating the IO had always been the goal. The spike doesn’t change the trend, which is still linear.

How was the throttling spotted? By luck: Prometheus with node exporter happened to be running on the same machine, capturing metrics for a Wikipedia search engine being written at the time. Its disk IO utilization metric showed 100%.

Another spike, around 6,000 records, goes up and comes back down. The benchmark ran on a local machine with plenty of other processes running, all contending for the same resources, and that is enough to cause spikes like it.

[summary] Go deeper skip unless you want database internals

Why databases choose B+ trees, and how they physically store data, is covered in a members-only YouTube video by the same author, part of a series on database engineering topics.

§ 8.5

## What ID-based paging gives up

Know the limits, and use it where it fits.

About 2 min · class 01:50–01:54 and 01:59–02:00

The disadvantage of ID-based pagination: you cannot apply complex WHERE clauses. That is fine when your use case doesn’t need them.

More precisely

Keyset pagination does work with filters and with sorts other than the ID, as long as an index matches them: sort on a deterministic key such as (sale_date, sale_id), filter on the last values seen, and back it with an index on those columns. “Paging requires a deterministic sort order.” Its real cost is navigation: “you cannot directly navigate to arbitrary pages” use-the-index-luke.com ↗, which suits infinite scroll and batch jobs but not page-number links. Queries no index fits still fall back to offset.

use-the-index-luke.com ↗

So even in MySQL, when you need deep pagination and no fancy WHERE clauses, try ID-based pagination: it gets much faster the deeper you go. But that doesn’t mean you go and replace all of your iteration logic, because it has limits (the note above). Use it where it fits.

Limit-offset vs ID-based (keyset) pagination

|

| LIMIT / OFFSET

| ID-based (keyset)

| Query shape

| ORDER BY id LIMIT 10 OFFSET 10 × page

| WHERE id > :last ORDER BY id LIMIT 10

| Cost at page 1

| Read 10 rows

| Seek, then read 10 rows

| Cost at page 1,000

| Computes and throws away 9,990 rows first; grows linearly

| The same as page 1: log n down, 10 across

| Jump to page N

| Yes: set the offset

| No: you can only go on from a row you have seen

| Filters and sorts

| Any

| Only those an index matches (taught as: no complex WHERE clauses)

| Needs

| A unique ORDER BY, or pages repeat and skip rows

| Comparable IDs and an index on them

All of this rests on one piece of knowledge: understand how your database stores your data on disk. That is why database internals matter for performance. Knowing them, you can make an optimization like this with confidence, instead of defaulting to limit-offset like everyone else and wondering whether the faster way is safe.

The rule for this whole chapter

Understand how your database stores your data on disk.

Knowing that rows sit in key order, in a B+ tree, is what lets you drop LIMIT/OFFSET with confidence for deep pages. The same knowledge tells you where it won’t work.

[figure title] Know how your data sits on disk

[figure description] A small B+ tree: a root, two inner nodes and four leaves in key order. A blue path runs from the root down to one leaf, then a short blue arrow runs along the leaves: a seek, then a sequential read.

[figure labels] know how · your data · sits on disk

§ 8.6

## Beyond SQL

NoSQL stores, Elasticsearch’s cap, and string IDs.

About 2 min · class 01:58–02:01 and 02:26–02:27

Does ID-based pagination work in NoSQL stores too, not just in SQL’s B+ trees? It depends on the storage engine. It works in MongoDB, a NoSQL database, as the benchmark showed.

Any store that gives you sequential scanning and data locality benefits, DynamoDB included. DynamoDB pages exactly this way: a query returns at most 1 MB, and you pass the response’s LastEvaluatedKey as ExclusiveStartKey in the next request, a cursor rather than an offset docs.aws.amazon.com ↗. If the data is completely de-localized, spread by a hash with no locality, you never get this performance benefit.

Elasticsearch, a sharded NoSQL store, gives you both ways to paginate, and caps limit-offset paging at 10,000 documents (its parameters are called from and size, but it is the same thing). Ask for more and it returns an error telling you to use a cursor instead. (The cap is a default, the index.max_result_window setting, and Elastic now points you to search_after with a point in time elastic.co ↗.)

That is the general lesson. When you iterate through most of a large set, more than 10,000 documents, a cursor beats limit-offset. For small values it doesn’t matter; the cost creeps up as you go deeper.

Does the ID have to be numeric? No. String IDs are compared lexicographically, and the database stores them in lexicographic order, so they are still comparable. One caution: the order is the column’s collation, not plain bytes, so under a case-insensitive collation 'a' and 'A' count as equal, and numeric-looking strings sort '10' before '9' unless they are padded to a fixed width dev.mysql.com ↗.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does OFFSET 9990 cost more than OFFSET 0, even though both return 10 rows?

[summary] Show answer

For an offset query the database must compute the result up to the requested point, skip those rows and only then return the next 10. At offset 9,990 it computes 10,000 rows to keep 10, and it does that again on every page, so the cost grows with depth.

What property of the ID makes WHERE id > :last work, and which schemes in this lecture have it?

[summary] Show answer

The IDs must be comparable, so “greater than the last one” means “after it” in the order you page through. Auto-increment IDs have it, and so does every scheme with time on the left: MongoDB’s ObjectId, Snowflake, Discord’s and Instagram’s IDs (roughly time-ordered). Pair it with an index on the ID and a sort.

Name one thing keyset pagination can’t do that offset can.

[summary] Show answer

Jump straight to an arbitrary page, say page 500: keyset can only continue from a row you have already seen. (As taught, it also doesn’t suit complex WHERE clauses; more precisely, it handles filters and sorts only when an index matches them.)

That is the last thing good IDs buy you. Chapter 9 lines every scheme up side by side, with the habits worth keeping.

Concepts in this section: limit-offset · since_id · deep offset cost · keyset pagination · B+ tree seek · the benchmark · how data sits on disk · cursors in NoSQL

Contents of this lecture ↑

Lecture 06, chapter 8 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 9-what-to-keep ===

# Minting unique IDs, chapter 9: What to keep

Lecture 06 · Minting unique IDs · chapter 9 of 9

§ 9

## What to keep

Strict order or throughput, where the ID is born, and the habits this lecture keeps returning to.

About 6 min · class 02:17–02:29

Near the end of class one question pulled the whole lecture together: would a bank use Snowflake IDs? The answer decides between the two halves of this page, strict order or throughput. After it, every scheme lined up in one place, and the habits worth keeping.

§ 9.1

## Bank or Instagram?

Rough order is plenty for a photo feed and not enough for a ledger.

About 2 min · class 02:18–02:19, Q&A 02:28–02:29

Pause and think

A bank lists each account’s transactions in the order they happened. Would it give them Snowflake IDs?

Instagram doesn’t mind slight disorder; a bank does. You can’t have strict order and unlimited distributed throughput together, so pick the one your use case needs.

A social media app like Instagram doesn’t much care if a few IDs come out of order. A financial application listing a customer’s transactions does: it needs the strict order in which the transactions happened. So a bank wouldn’t use Snowflake IDs. Auto-increment is the way to go for it.

The reason is the one from §6.5: Snowflake does not guarantee strict monotonicity, so some IDs can come out of order. Where you need strict order, use auto-increment. (§6.5 also notes the one caveat: auto-increment hands out increasing values, but concurrent transactions can commit out of ID order.)

That has a price. Where strict order is required, as in banks, you lower your throughput expectations: one sequence in one place can’t also scale out the way Snowflake does. You cannot guarantee monotonicity in a distributed setup, as §3.7 and §6.5 showed; the other systems take rough sortability and the throughput that comes with it.

This is also as far as the lecture went on the question deferred in §3.1: resolving conflicts by ID when IDs come from many machines. If an ID decides which write came first, it needs strict order, and strict order means a single sequence and lower throughput. If rough order is enough, any time-first scheme in this lecture will do.

§ 9.2

## Where the ID is born

Every scheme on one map, one table to choose from, and eight habits.

About 4 min · class 02:17–02:18, 02:25–02:28

Every design in this lecture answers one question: where is the ID made? Each tag below carries the section it came from.

[figure title] Where the ID is born

[figure description] Four places an ID can be made, with the schemes of this lecture under each. In your own function: getid() versions 1 to 6 and the time-first IDs. In a central service: the single ID server and Amazon ranges. Inside the database: auto-increment, Flickr ticket servers and Instagram next_id(). In a library on every server: Snowflake, Discord, MongoDB ObjectId and UUID.

[figure labels] in your function · no network call · getid() v1–v6 · §2 · time-first · §3 · a central service · a call per id, or per batch · one id server · §3 · amazon ranges · §5 · inside the database · made during the insert · auto-increment · §1 · flickr tickets · §5 · instagram next_id() · §7 · a library on every server · no network call · snowflake · §6 · discord · §6 · mongodb objectid · §4 · uuid · §4

[caption] Fig 9·aFour places an ID can be born, with every scheme of this lecture under its place and the section it came from. The lecture began at one end, a function in your own code (§1.3), and ended with Instagram moving it into the database (§7).

### Which scheme? #

Which ID scheme fits which need

|

| UUID

| Amazon ranges

| Flickr ticket servers

| Snowflake / Discord

| Instagram

| Single-DB auto-increment

| Unique

| Yes, with no coordination

| Yes

| Ordered

| No (v4); v7 roughly

| No, not across servers

| Nearly, as a byproduct; never promised

| Roughly, not strictly

| Roughly, by time

| Increasing: one engine owns the counter

| Bits

| 128

| An integer; 64 bits never runs out

| 64 (BIGINT unsigned)

| 64

| 32 or 64 (INT or BIGINT)

| Runs where

| Anywhere

| An ID service; servers keep ranges in memory

| Two MySQL ticket servers, round robin

| In every server, as taught

| A function in each logical shard’s database

| The one database

| Extra service?

| No

| Yes

| No, as taught

| No

| Fits when

| The app will never hit that scale

| Many services need unique IDs, order doesn’t matter

| A sharded database needs unique keys cheaply

| Huge write throughput, rough time order

| The database is already sharded and no new service is wanted

| Strict order matters more than throughput, as in a bank

### Habits this lecture keeps coming back to #

- When you see a collision, add the thing that led to it, then look for a cheaper stand-in (§2.2).

- When a machine recovers, start from the safest value; always think correctness first (§2.6).

- Put time on the leftmost side, so that as time moves the number grows (§3.3).

- Everything is a trade-off: you get something and lose something. So challenge each requirement: integers? random? monotonic? (§3.8).

- Batch your calls; batching is one of the most effective ways to get performance out of any system (§5.2).

- Keep IDs small enough that your indexes, at least the hot part, fit in RAM (§4.3).

- Understand the context, build only what you need, keep it simple: simple systems scale (§6.7).

- Know how your database stores your data on disk (§8.5).

[summary] Build them all skip unless you want a project

Implement every scheme on this page. None of them is fancy, and you will have fun. Building them is what gives the deep understanding: why each one works, its advantages and disadvantages, what logical partitions are for, and why dump and load matter. When you have built your own, Meituan’s open-source Leaf is a good reference: it offers both models from this lecture, a database-backed “segment” (range) mode and a Snowflake mode taken from Twitter’s algorithm, which needs ZooKeeper github.com ↗.

### Where this lecture stops #

- next week · Lectures 7 and 8 Social networks: CDNs in depth, how and why they are used, and a set of social network services built from scratch.

- weeks 4–6 · from Lecture 8 A senior engineer’s view. After three weeks of context, systems become more ambiguous: you write the requirements, make the design and wear several hats.

- week 5 · Lecture 9 Change data capture (CDC). It has only been sprinkled so far; it gets a full treatment then, and questions about it wait until then so new terms don’t confuse anyone.

Concepts in this section: strict order vs throughput · where the ID is born · getid() · time on the left · ID size · ranges and tickets · Snowflake · Instagram · pagination

Contents of this lecture ↑

Lecture 06, chapter 9 · written from the class recording and board, with sources linked where a fact comes from outside the class.

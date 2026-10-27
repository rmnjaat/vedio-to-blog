=== PAGE: lecture overview ===

Lecture 6 · running case: one get_id() function, rebuilt until it scales

# Minting unique IDs

Two databases both hand out order 3. Write the function that replaces their counters, break it with every condition a real system brings, then watch Amazon, Flickr, Twitter and Instagram answer the same question with versions of what you built.

- One function, rebuilt

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1Two databases, and both have an order 3Two masters both hand out order 3. What auto-increment relied on, what you are building instead, and the first three versions of get_id().4 sections · §1.1–1.4

- 2The ID keeps growing. Then the machine reboots.Three parts per ID is too many, and a counter in memory forgets everything on a restart. Make the ID short, then make it survive, then stop it hammering the disk.4 sections · §2.1–2.4

- 3Which write came first?Unique IDs say nothing about which came first. Some systems need to know. How close does the clock get you, and where does it let you down?4 sections · §3.1–3.4

- 4One clock in one place. What if that place goes down?Many clocks disagree, so put one clock in one place. What that buys, what happens when the one place fails, and the question it leaves you with.3 sections · §4.1–4.3

- 5Why not just use a UUID?A UUID needs no counter, no clock and no coordination. The companies in the rest of this lecture turned it down anyway. What does an ID’s size really cost?3 sections · §5.1–5.3

- 6Amazon: must every order wait on the ID service?Amazon’s ID service serves orders, payments and more. Must every order wait on it, what does a crash waste, and why does nobody mind?3 sections · §6.1–6.3

- 7Flickr: could MySQL itself be the ID service?Flickr asked whether MySQL could be the ID service itself. How it hands out IDs, what happens with two of them, and the question from chapter 1, answered.3 sections · §7.1–7.3

- 8Tweets spike. Can the ID service stop coordinating?Tweets come in bursts. An ID that carries its own time, machine and counter in 64 bits, and a clock that starts when you say.5 sections · §8.1–8.5

- 9Page 1,000 of a profile crawls. Can the ID help?Deep pages get slower and slower. A query you have written a hundred times, a batch job that starts an hour ago, and what the fast version gives up.5 sections · §9.1–9.5

- 10Instagram wants no new service. Where does the ID go?Instagram wanted Snowflake-style IDs with no new service. Where it put the logic, what that bought, and whether a bank would do the same.5 sections · §10.1–10.5

Your shop’s orders table has outgrown one MySQL server, so you run two, both masters, and a new order can land on either. Each one counts on its own: 1, 2, 3, 4 on the left, 1, 2, 3, 4 on the right. A customer calls about order 3, and there are two of them.

[figure title] Two masters, one ID space

[figure description] An API server writes orders to two MySQL masters; a write can land on either. The masters do not talk to each other and each auto-increments on its own, so both hand out 1, 2, 3, 4. Order 3 now names two different orders: the IDs collide.

[figure labels] api · writes go anywhere · master a · master b · auto-increment · auto-increment · 1 · 1 · 2 · 2 · 3 · 3 · 4 · 4 · order 3 = · two different orders

[caption] Fig 0·aThe problem in one picture. Writes can land on either master, neither master asks the other, and both hand out 1, 2, 3, 4.

Every database hands you IDs for free, until there is more than one database. In this lecture you write the replacement yourself: one small function, get_id(), that must never return the same value twice, on any machine, ever. You will break it again and again, and each time the fix is the smallest change that works. Then you watch Amazon, Flickr, Twitter and Instagram answer the same question, and find that each of them runs a version of the function you just built.

### Where you are #

Lecture 2 scaled a blog’s writes by sharding, and warned that letting several databases accept writes brings conflicts. It also showed count++ losing an update when two threads run it at once, and the atomic increment that fixes it. Lecture 3 locked a row with SELECT … FOR UPDATE so that 120 passengers could not book one seat, and wrote a key-value store whose PUT was a single upsert. Lecture 5 put a load balancer in front of a fleet, asked of every box what happens when it is the only one and it dies, and ended on exactly the picture above.

All three come back here. This time the thing many machines fight over is a number.

### What you’ll build #

Part 1, get_id() from scratch (chapters 1–5). The function starts as one line. Each chapter adds a condition the last version can’t survive: a second machine, threads, a reboot, a disk that can’t keep up, a need to know which ID came first, and a question about how big an ID may be.

Part 2, four companies (chapters 6–10). Amazon, Flickr, Twitter and Instagram each needed unique IDs at a scale you can feel. Each design reuses a piece you built in Part 1, and each one makes a different choice about where the ID is born. Along the way, one design turns out to make a common query much cheaper, which nobody planned for.

### What you’ll be able to do #

- Write an ID generator that stays unique across machines, threads and reboots, without a disk write per ID.

- Say how much order IDs from many machines can promise, and what strict order would cost.

- Work out what an ID’s size does to every index on a table.

- Choose between ranges from a service, ticket databases, a 64-bit time-first layout and an ID made inside the database.

- Page through millions of rows without each page getting slower than the last.

### Before you start #

You need primary keys and indexes, threads and an atomic increment, SELECT … FOR UPDATE, and a load balancer. A little binary helps: 2^10 = 1,024, and what a left shift does.

Each chapter opens with the ladder of get_id() versions so far, with the newest rung shaded. When a “Pause and think” box asks you something, commit to an answer before you open it. And build every version yourself as you go. None of them is fancy, and building them is what makes the reasons stick.

Lecture 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-order-three ===

# Minting unique IDs, chapter 1: Two databases, and both have an order 3

Lecture 6 · Minting unique IDs · chapter 1 of 10

§ 1

## Two databases, and both have an order 3

About 5 min

Every table you have built so far got its IDs from the database: insert a row, and AUTO_INCREMENT fills in the next number. That stopped working the moment the orders table moved onto two masters. Before you replace it, it is worth seeing exactly why it worked before.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding.

[figure labels] version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · get_id() so far

[caption] Fig 1·aWhere you start: each master’s AUTO_INCREMENT, counting on its own. Over the next five chapters this ladder fills up with your own versions of get_id().

§ 1.1

## Why was one MySQL never a problem?

On one MySQL server, IDs come out 1, 2, 3, 4, 5, 6 because there is one machine, and the ID logic is part of its database engine. Every insert asks the same counter for the next value, and that counter lives in exactly one place.

Put MySQL in multi-master mode with an auto-increment ID and that ends. Each master is its own brain. The two don’t talk to each other, so each counts 1, 2, 3, 4 independently, and the IDs collide. Lecture 2 warned that letting more than one database accept writes brings conflicts; this is the plainest one there is.

So once writes can land on more than one database, you can’t rely on the IDs the database hands out. You need ID logic of your own that gives every entry an ID nobody else will ever get.

Before you read on, try one thing. Is there a small configuration change that would keep these two masters from ever handing out the same number? Write your answer down. Chapter 7 checks it against what Flickr actually built.

§ 1.2

## What exactly are you building?

An ID gives uniqueness to something: a row, a document, an object, an event. Anything that lets you pick out exactly one of them is its ID.

So the job is easy to state. Write a function that returns something unique every single time it is invoked, wherever it runs. Call it get_id().

It sounds trivial. The usual reflex is that auto-increment already solved it, and you have just seen where that reflex ends.

Most people’s first move here is a new service: “I’ll write an ID microservice.” Hold that thought. Start with a plain function inside your own application, called locally on every request that needs an ID. A central service is something you may evolve towards later; you will meet one in chapter 4. Starting with a function shows you what the problem actually needs before you pay for a network call.

§ 1.3

## What never repeats? Try the clock

Time is unique and always moves forward. So the simplest get_id() returns the current epoch millisecond. (The versions here are sketched in pseudocode.)

func get_id() { return get_epoch_ms(); // e.g. 1729 }

[figure title] One machine, one clock

[figure description] One machine returns the current epoch millisecond, 1729, as its ID. That is unique on one machine as long as the function is never called twice within the same millisecond.

[figure labels] m1 · t = 1729 · get_id() → 1729 · fine on one machine, · if never called twice in one ms

[caption] Fig 1·bVersion 1. One machine, one clock: the ID is the current epoch millisecond, written 1729 here to keep the numbers short.

That should work. But something must break, or everyone would be using it.

The first limit is granularity. With milliseconds, the function must never be called twice in the same millisecond; if it is, both calls get the same value and you are pushed down to micro- or nanoseconds. So version 1 is correct on exactly one machine, as long as nobody calls it twice in one millisecond.

§ 1.4

## A second machine, then a second thread

Your service runs on two machines. Both call the function in the same millisecond, and both return 1729. The IDs collide and are no longer globally unique.

Fix it by putting the machine into the ID: concatenate the machine ID and the millisecond, and you get m1-1729 on one machine and m2-1729 on the other. (m1, m2 is only shorthand; use whatever names a machine.)

func get_id() { return concat(machine_id, get_epoch_ms()); // m1-1729, m2-1729 }

That is the standard way to resolve a collision: whenever two IDs collide, add to the ID the thing that caused the collision. Two machines collided, so the machine goes in.

It breaks again inside one machine. Your program runs threads on several cores, so two threads can call the function in the same millisecond and both produce m1-1729. Apply the same rule. Threads have IDs too, integers the operating system hands out (t1, t2 here are shorthand), so put the thread in: m1-t1-1729 and m1-t2-1729.

func get_id() { return concat(machine_id, thread_id, get_epoch_ms()); // m1-t1-1729, m1-t2-1729 }

[figure title] Two machines

[figure description] Two machines call the function in the same millisecond and both return 1729: a collision. Prefixing the machine ID gives m1-1729 and m2-1729, which are unique.

[figure labels] m1 · m2 · t = 1729 · t = 1729 · 1729 · = · 1729 · collision · m1- · 1729 · m2- · 1729 · concat(machine_id, get_epoch_ms()) · two machines

[figure title] Threads inside a machine

[figure description] Two threads on machine m1 run the function in the same millisecond and both return m1-1729: a collision again. Adding the thread ID gives m1-t1-1729, m1-t2-1729, m2-t1-1729 and m2-t3-1729 (m2's threads happen to be t1 and t3), which are unique.

[figure labels] m1 · m2 · t1 · t2 · t1 · t3 · m1-1729 · = · m1-1729 · two threads, same ms · m1- · t1- · 1729 · m1- · t2- · 1729 · m2- · t1- · 1729 · m2- · t3- · 1729 · concat(machine_id, thread_id, · get_epoch_ms()) · threads inside a machine

[caption] Fig 1·cTwo collisions, two causes added. Left: two machines in the same millisecond, separated by the machine prefix. Right: two threads on m1 in the same millisecond, separated by the thread ID (m2’s threads happen to be t1 and t3).

Three versions in, IDs are unique again, as long as no single thread asks twice in one millisecond. Look at what it cost, though. The ID has three parts now, and the rule you just used adds a part for every new cause of collision, so IDs keep growing. Is there a cheaper way to keep threads apart?

Lecture 6, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-reboot ===

# Minting unique IDs, chapter 2: The ID keeps growing. Then the machine reboots.

Lecture 6 · Minting unique IDs · chapter 2 of 10

§ 2

## The ID keeps growing. Then the machine reboots.

About 7 min

Version 3 is unique, and it pays for that with length: one part for the machine, one for the thread, one for the time. This chapter makes the ID short again, and then finds out what a short ID forgets when the power goes.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. Marked new: v1, v2, v3.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · get_id() so far

[caption] Fig 2·aget_id() after chapter 1: three versions, each adding the cause of the last collision.

§ 2.1

## Is there a cheaper way to keep threads apart?

Instead of the thread ID, add a counter. Appending every cause of a collision leads to gigantic IDs, and one counter beats any number of threads.

It is a static counter: a single variable per process, shared by every thread. Increment it atomically every time the function is called, and no two calls on one machine can get the same value. One machine now produces m1-1729-01, m1-1729-02, m1-1729-03, then m1-1730-… once the millisecond moves on, however many threads ask.

int counter = 0; // static: one per process, shared by every thread func get_id() { return concat(machine_id, get_epoch_ms(), counter++); // m1-1729-01, m1-1729-02 … }

The word that matters is atomically. counter++ is not atomic by default: it is a read, an add and a write, and two threads can interleave them. That is the lost clap from Lecture 2. Wrap it in a lock, or use your language’s atomic integer.

Now look at the three parts again.

[figure title] From threads to a counter

[figure description] Machines m1 and m2, each with threads. 1: adding the thread ID gives m1-t1-1729 and so on, unique but longer with every new cause. 2: one shared counter, incremented atomically on every call, replaces the thread ID: m1-1729-01, m1-1729-02, m1-1729-03, then m1-1730-04. 3: the counter already increases on every call, so the time part is struck out as redundant. 4: the ID becomes machine plus counter: m1-01, m1-02, m1-03 and m2-01, m2-02, m2-03, unique as long as the counter never resets.

[figure labels] m1 · m2 · t = 1729 · t = 1729 · 1 · concat(machine_id, · thread_id, · get_epoch_ms()) · m1-t1-1729 · m1-t2-1729 · m2-t1-1729 · 2 · concat(machine_id, · get_epoch_ms(), · counter++ · ) · m1-1729-01 · m1-1729-02 · m1-1729-03 · m1-1730-04 · 3 · counter · 3 · the counter already grows on every call: · the time part adds nothing · 4 · concat(machine_id, · counter++ · ) · m1-01 · m1-02 · m1-03 · m2-01 · m2-02 · m2-03

- Adding the thread ID works: m1-t1-1729, m1-t2-1729. But every new cause makes the ID longer.

- One shared counter, incremented atomically on every call, separates any number of threads: m1-1729-01, -02, -03, then m1-1730-04.

- The counter already grows on every call. The time part adds nothing, so strike it out.

- Machine plus counter: m1-01 … m2-03. Unique, and shorter.

Keys: ← → to step · link to a step with #fig-2b/step-3

[caption] Fig 2·bVersion 3 to version 4, on two machines with two threads each. Step through with the buttons or the arrow keys.

Version 4 is the machine ID and the counter, nothing else:

int counter = 0; func get_id() { return concat(machine_id, counter++); // atomic; m1-01, m1-02 … }

Its one limit is the counter’s size. An unsigned 32-bit integer stops at about 4.29 billion, a signed one at about 2.1 billion. A 64-bit counter, about 1.8 × 10^19, is effectively endless.

§ 2.2

## 3 a.m.: the process restarts

The process restarts. The counter lived in memory, with no copy anywhere, so it comes back as 0, and m1 hands out m1-01, m1-02 again. Those IDs are already on orders.

Notice what did this. Version 3’s time part would have kept these apart, because the clock moved on while the process was down; you dropped it to make the ID shorter. So the question is how to keep the ID short and still survive a restart.

The cause is where the counter lives: volatile memory. So back it up to a file on the machine. Load it once when the process starts, and save it on every call.

int counter = load(); // once, at process start func get_id() { counter++; save_counter(counter); // on every call return concat(machine_id, counter); }

One detail decides whether “save” survives a power cut. A plain write() usually lands in the operating system’s page cache; only fsync() forces it onto the device, so it can be read back after a crash man7.org ↗. That forced write is what makes each save expensive.

Why not skip the file and restart from the largest ID in the database? That is load() by another name, and it assumes every ID becomes a row somewhere. A request ID never does.

§ 2.3

## Thousands of IDs a second, thousands of disk writes

Now the service calls get_id() thousands of times a second. That is thousands of tiny disk writes a second, and every ID waits on one instead of coming straight from memory.

Pause and think

get_id() saves its counter on every call so a reboot can’t reissue IDs, and the disk is drowning. Can you touch the disk far less often without ever reissuing an ID?

The disk doesn’t need the exact current value. It needs a value you can safely start from after a crash, one that is past anything already handed out.

There are two good ways to do it.

The first adds a third part to the ID, a boot counter. At startup, read a number from the file, add one, write it back: one disk write per boot. Each startup of the process gets a new boot number, so the ordinary counter can live in memory, start at 0 and never be saved. Nothing touches the disk while IDs are handed out. It costs two things: the startup increment must be atomic, and every ID carries one more part, a cost chapter 5 weighs.

The second keeps the ID short. Call it a bank of IDs: read the counter, say 1, add 1,000, store that, and hand out the next thousand from memory. When you reach the stored value, add another 1,000 and store again. A thousand IDs per disk write. Notice that the bank writes ahead: what is on disk is the end of the current block, and nothing past it has gone out, so after a crash you start just past it. Keep this idea in your pocket; it comes back at a much larger scale in chapter 6.

§ 2.4

## Flush every N. Where do you restart after a crash?

There is a simpler-looking way to write the same saving down, a flush frequency: count as before, and save the counter only every N IDs, every 1,000 say. Disk IO drops a thousandfold. But this one writes behind: what is on disk is an ID already handed out, and more may have gone out since. So a restart can’t just begin at what the disk says.

const N = 1000; // flush frequency int counter = load() + N; // at startup: past anything issued before the crash save_counter(counter); // remember the new start before handing anything out func get_id() { counter++; if (counter % N == 0) save_counter(counter); // one disk write per N IDs return concat(machine_id, counter); }

The periodic save is a mod, not a timer thread: count, check counter % N, write. The interesting lines are the two startup lines. Shrink N to 3 to see why. Machine m1 hands out 1, 2, 3, and 3 is saved. Then 4, 5, 6, and 6 is saved. Then 7 and 8, and the machine crashes. The disk says 6, but 8 is already out.

Pause and think

Flush every 3 IDs. The disk holds 6. The machine had handed out 7 and 8 when it crashed. On reboot, which ID should it hand out first?

The disk only proves that 6 went out. The next save point is 9, and 9 itself may have gone out before its write reached the disk. The machine can’t know how far it got, so it starts past the whole window: 6 + 3 + 1 = 10.

The same crash, step by step.

[caption] Clip 2·1Restart from the disk value and IDs repeat. Restart past the flush window, and save that new start first, and they don’t.

[summary] The clip as text 0:38

- m1 hands out IDs from a counter kept in memory.

- Every third ID, the counter is written to disk.

- Memory runs ahead between flushes; at 6 the disk catches up.

- Two more IDs, then m1 crashes. Disk says 6, but 8 was handed out.

- Restart from 6, and 7 and 8 are handed out a second time.

- Restart from the safest value instead: 6 + 3 + 1 = 10.

- An unused number is fine. A duplicate ID is not.

Machine m1 hands out IDs m1-01, m1-02, m1-03 from a counter kept in memory and writes the counter to disk only every third ID, so the disk holds 3, then 6, while the memory counter keeps climbing between flushes. After m1-07 and m1-08 the memory counter is at 8 but the disk still says 6, and the machine crashes. Restarting from 6 would hand out m1-07 and m1-08 a second time: duplicates. Restarting from the safest value, the last flushed value plus the flush interval plus one, 6 + 3 + 1 = 10, starts at m1-10: m1-09 is never used, and no ID is handed out twice.

Call it the safest value: the last value saved, plus the flush frequency, plus one. In the code, load() + N sets the counter to 9, so the first ++ hands out 10. Then save that new start before handing out anything. Otherwise, if the machine crashes again before its next flush, the disk still says 6, and the restart hands out 10 a second time.

Some numbers are never used, 9 here. That is fine. A few skipped integers cost nothing, and a duplicate ID can cost an order. Correctness of the system matters more than using every integer. Whenever a machine recovers, start from the safest value. You will see that habit again in chapter 7.

Here is where get_id() stands. Every ID is unique across machines and threads, survives a reboot, and costs one disk write per thousand. None of them says which came first.

Lecture 6, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-which-first ===

# Minting unique IDs, chapter 3: Which write came first?

Lecture 6 · Minting unique IDs · chapter 3 of 10

§ 3

## Which write came first?

About 6 min

Version 6 never repeats itself. But read two of its IDs, m7-512 and m2-90031, and you can’t say which was made first. With hundreds of thousands of machines, the machine part tells you where an ID was made, not when. Uniqueness says nothing about order.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. Marked new: v4, v5, v6.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · get_id() so far

[caption] Fig 3·aget_id() after chapter 2: machine plus a counter that survives a reboot at one disk write per N IDs. (The boot-counter variant trades one more part in every ID for no disk writes at all.)

§ 3.1

## Why would anyone need IDs in order?

Back to your two masters. Lecture 2 warned that when more than one database takes writes, the same row can be written on each, and someone has to decide which write wins. Call the two writes T1 and T2. The row holds a = 10; T1 sets it to 20 and T2 sets it to 30. A common rule is the newer write wins. But which one is newer? If every transaction carries an ID, and later transactions always get larger IDs, the larger number answers it: T2 is 2, so keep a = 30.

[figure title] Which write came first?

[figure description] A row holds a = 10. Transaction T1 sets a = 20 and transaction T2 sets a = 30. Which came first? If T1 carries ID 1 and T2 carries ID 2, the larger number marks the newer write, and with newer-write-wins the row keeps a = 30.

[figure labels] a = 10 · T1 · T2 · a = 20 · a = 30 · which came first? · T1 → id 1 · T2 → id 2 · newer write wins: keep a = 30

[caption] Fig 3·bWhich write came first? With newer-write-wins, the larger ID marks the newer write, so the row keeps a = 30.

Conflict resolution is one place ordered IDs matter, not the only one. So here is the new constraint: monotonically increasing IDs, everywhere. However many machines make IDs, and wherever a request lands, a later request always gets a larger ID than any handed out before.

Larger, not next. 1, 2, 5, 7, 8, 9, 32 qualifies: every ID is bigger than all the IDs before it, and gaps are allowed. Gap-free 1, 2, 3, 4 is a stronger property, usually called sequential, and nothing in this lecture needs it.

§ 3.2

## What if time goes first?

Take version 6 and put time back, in front: time first, then the machine, then the counter.

func get_id() { return concat(get_epoch_ms(), machine_id, counter++); // fixed-width parts: time first; machine and counter break ties }

Time always moves forward, and now it sits in the most significant digits, so the IDs come out in time order: 1729 1001, 1729 2001, 1730 1002. The left part decides the order. The machine and the counter only break ties inside one millisecond. Give each part a fixed width, so the digits line up; otherwise machine 1 with counter 12 and machine 11 with counter 2 both read 1729112. And if the machine ID is an integer, the whole ID is just a number.

[figure title] Time first decides the order

[figure description] Six eight-digit IDs from machines 1 and 2: 1729 1001, 1729 2001, 1730 1002, 1730 2002, 1730 1003, 1731 2003. The first four digits are the time in milliseconds, the most significant part, so they decide the order; the last four are the machine, then its counter, and only break ties within one millisecond.

[figure labels] time · machine · + counter · 1729 · 1001 · 1729 · 2001 · 1730 · 1002 · 1730 · 2002 · 1730 · 1003 · 1731 · 2003 · decides the order: · most significant part · makes sorting simple · a tie is broken by · the second half · concat(get_epoch_ms(), · machine_id, counter++)

[caption] Fig 3·cTime first decides the order. The heavy underline marks the time digits, the most significant part; the rest only breaks ties.

Inside one millisecond the order can still flip. If the first request goes to machine 2 and the next to machine 1, you get 1729 2004 and then 1729 1005. Once the millisecond passes, the IDs are in order again.

That is close, and it is nearly free. Nothing is shared: a request can go to any machine, no central state is kept, and throughput stays excellent. In return you accept a little disorder inside each millisecond. This is why, whichever ID scheme you look at from here on, time sits on the leftmost side: as time moves forward the number only grows, so the IDs sort roughly by when they were made.

Roughly, not strictly. The millisecond flip is one reason. The other is hiding in the word “time”.

§ 3.3

## Do all the clocks agree?

Time-first IDs assume that every machine’s clock reads the same time. They don’t. A little disorder inside one millisecond you can live with. Disorder of whole seconds you can’t, and left alone, a clock drifts by about that much in a day.

A computer’s clock is a hardware clock: a quartz crystal vibrating at a set frequency, and the machine counts the vibrations to know that a millisecond has passed. That frequency shifts with temperature. A common watch crystal is accurate to about ±20 parts per million at room temperature, and it gets worse the further it is from about 25 °C, hotter or colder ecsxtal.com ↗. Twenty parts per million is almost two seconds a day. So clocks drift, every one at its own rate.

Servers drifting apart is so common that every fleet runs clock synchronization against NTP servers. In practice it is a daemon, chronyd or ntpd, running all the time and gently speeding up or slowing down the clock to pull it back toward true time, more often than you would think.

[figure title] A clock that runs fast, a clock that runs slow

[figure description] True time runs along the bottom, what each clock says up the side. A perfect clock is the diagonal. Clock A drifts ahead of it and clock B drifts behind; each sync nudges them back toward the diagonal, and they drift again. Just before a sync, clock A is off by the gap marked in red: if an ID is made at that moment, its time part is wrong by that much. A quartz crystal's rate shifts with temperature, which is why clocks drift at all.

[figure labels] true time · what the clock says · clock A · perfect · clock B · sync · skew at the moment · an ID is made · quartz: rate shifts · with temperature

[caption] Fig 3·dA clock that runs fast, a clock that runs slow. Each correction pulls a clock back toward true time, and it starts drifting again. What decides an ID is the gap at the moment it is made.

Sync narrows the gap; it doesn’t close it. Between corrections, any clock can be a little off at the very moment it stamps an ID, and even one millisecond is enough to break order.

§ 3.4

## Four machines, four clocks

Here is what a millisecond of skew does. Four machines, numbered 2, 4, 7 and 9, have clocks that read 23, 24, 23 and 23. Machine 4 is one millisecond ahead. Four requests arrive one after another, to machines 2, 4, 7 and 9, in that order, and each makes a time-then-machine ID (the counter is left off to keep the numbers short).

Pause and think

IDs are time, then machine number. The clocks read 23, 24, 23, 23. Requests reach machines 2, 4, 7, 9 in that order. Do the four IDs come out increasing?

The IDs come out 232, 244, 237, 239: the third request gets a smaller ID than the second. Machine 4’s clock is ahead, so its ID jumps forward, and the next machine, reading true time, lands behind it.

The same four requests, one after another.

[caption] Clip 3·1Arrival order and ID order no longer match. Where you need order, skew is a correctness problem.

[summary] The clip as text 0:36

- Four machines. At the same instant, their clocks disagree.

- First request goes to m2: time 23, then machine 2. ID 232.

- Second request: m4, whose clock reads 24. ID 244.

- Third: m7, clock 23. ID 237 is smaller than the ID before it.

- Fourth: m9, clock 23. ID 239.

- Arrival order and ID order no longer match.

- Where you need order, clock skew affects correctness.

Four machines, m2, m4, m7 and m9, whose clocks read 23, 24, 23 and 23 at the same instant. Four get_id requests arrive one after another in real time: to m2, then m4, then m7, then m9. Each machine makes its ID by putting its clock time first and its machine ID after it, so the IDs come out 232, 244, 237, 239. Because m4's clock is ahead, 244 is followed by the smaller 237: in arrival order the IDs go up, then down, so they are not monotonically increasing. Arrival order and ID order no longer match, and where a system needs that order, clock skew affects its correctness, so it has to be handled.

How far can you push it? Make every machine’s clock perfect, and the millisecond flip is still there; sync them harder, and there is still a gap at the instant an ID is made. Strict order, when the ID logic runs on many machines, is almost impossible. That isn’t a theorem, but in practice too many things break it.

If many clocks are the problem, the obvious move is to stop having many. Put one clock in one place, and make every ID there.

Lecture 6, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-one-clock ===

# Minting unique IDs, chapter 4: One clock in one place. What if that place goes down?

Lecture 6 · Minting unique IDs · chapter 4 of 10

§ 4

## One clock in one place. What if that place goes down?

About 5 min

Chapter 3 ended on a simple idea: if many clocks disagree, use one. That means taking get_id() out of your application and putting it on a machine of its own, the step chapter 1 told you not to start with. Now you have a reason to take it.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. Marked new: v7.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · get_id() so far

[caption] Fig 4·aget_id() after chapter 3: time moved to the left, so IDs sort roughly by when they were made.

§ 4.1

## Does one server fix the order?

A central ID service: one machine runs get_id(), and whoever needs an ID makes a network call to it and gets one back. Set throughput aside for a moment; chapter 6 comes back to it. With one generator there is no skew between generators, so the problem is no longer ID generation. It is whether one clock can be trusted.

Can it? Almost. When the sync daemon finds a clock a little ahead, it doesn’t jump it back; it slows the clock until real time catches up. But a large error is corrected in one jump, and then the wall clock really does go backwards. ntpd, for example, slews offsets under 128 ms and steps larger ones ntp.org ↗. So a time-based generator remembers the last value it issued and never goes below it. If the clock reads earlier than that, it waits until time has passed it, or refuses to issue, as Twitter’s Snowflake did github.com ↗. (The wall clock can jump; a monotonic clock, CLOCK_MONOTONIC, can’t man7.org ↗.)

[figure title] One ID server

[figure description] One central ID server runs the time-first get_id() with one clock. Client 1 and client 2 each make a network call to it and get an ID back. Because there is only one clock, and the server never hands out an ID below its last one, the IDs increase no matter which client asks.

[figure labels] never below my last id · id server · same get_id(), one clock · client 1 · client 2 · id · id

[caption] Fig 4·bOne ID server, one clock, called by everyone. It never issues below its last ID, so the IDs only go up, whichever client asks.

With that guard, one server hands out increasing IDs, wherever the requests come from. It runs version 7 in one place: time, machine, counter, with the same machine part on every ID.

You might ask: why a special server? Put a counter row in a shared database and lock it. That works, and it is the same design. The shared database is one machine handing out every ID: it has become the central service.

§ 4.2

## The one server dies

Every ID in your company now goes through one box. If it fails, or its disk does, nothing anywhere can create an order. That is a single point of failure, and Lecture 5’s answer is the usual one: add a second server behind a load balancer.

Pause and think

Two ID servers sit behind a load balancer, and IDs must still strictly increase across both. A request reaches server B. What must B do before it answers?

B has to learn A’s last ID and only then generate a larger one. And A has to do the same on every request it gets.

So the two servers talk on every single ID: what is your last one? They have to keep agreeing that each new ID is larger than any ever issued, which turns a one-line function into a conversation, and the conversation is the bottleneck. At high throughput, constant gossip gets very messy.

[figure title] Two ID servers must gossip

[figure description] To remove the single point of failure, two ID servers sit behind a load balancer and clients reach either one. Before answering, whichever server gets a request must ask the other for its last ID and add a buffer, so the two gossip on every ID. That constant gossip, marked red, makes a simple function slow and complex.

[figure labels] gossip: what’s your last id? · slow, complex · id server · id server · lb · client 1 · client 2 · two servers, to remove the single point · of failure, which now must agree on every id

[caption] Fig 4·cTwo ID servers must agree on every ID before answering. Removing the single point of failure brought back coordination, marked red.

That is the end of this road. In practice you cannot have ID generation that is distributed, strictly increasing and fast, all three. Systems that do hand out strictly increasing values across machines pay for it in coordination. TiDB sends every timestamp request to one allocator docs.pingcap.com ↗, and Google Spanner relies on specially built clocks and deliberate waiting cloud.google.com ↗. Independent generators can only be roughly ordered.

§ 4.3

## Did you need strict order at all?

Look back at this chapter. Each fix brought a new problem: one server fixed the clocks and became a single point of failure; two servers fixed that and needed gossip. Everything in software is a trade-off: you get something, you lose something. Always.

So the real move is to question the requirement. When someone hands you “IDs must be monotonic”, ask: does it really have to be strict, or is roughly in time order enough? Do the IDs have to be integers? Could they be random, like UUIDs? Requirements often say order is needed, and a couple of questions later it turns out nobody thought it through. Not everyone needs monotonic IDs.

Relax order, and simpler designs open up. A random suffix instead of a counter would work too; you would only lose the order a counter gives within one machine. Several ID servers that each put their own server ID into the IDs they make are also correct: unique, unordered, and fine. There is no one right way to make IDs, only a choice of what you keep and what you give up, while getting the most throughput you can. Every design in the rest of this lecture is one of those choices.

Which brings up the obvious question. If order is negotiable, why build anything? Any server can make a UUID, a 128-bit random value, with no counter, no clock and nobody to ask. You give up ordering: you get some, you lose some. So why does every company in the rest of this lecture refuse it?

Lecture 6, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-uuid ===

# Minting unique IDs, chapter 5: Why not just use a UUID?

Lecture 6 · Minting unique IDs · chapter 5 of 10

§ 5

## Why not just use a UUID?

About 6 min

A UUID is 128 bits, usually written as a string, readable as one gigantic integer. Any server can make one, with no counter, no clock and nobody to ask. It looks like the end of the lecture. Yet companies at scale avoid them; Flickr even wrote down why. To see it, look at where else an ID gets stored.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. Marked new: v8.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · get_id() so far

[caption] Fig 5·aget_id() after chapter 4: one ID server with one clock. Strict order turned out to cost more than most systems should pay.

§ 5.1

## Where else is the ID stored?

An index is itself just a table, kept as a B+ tree by the database: the indexed values, each with the ID of the row it points to. Take a posts table with post_id, user_id, a title and a body. Index user_id, and the database builds what is in effect a second, two-column table: user_id, sorted, and the post_id of each row.

So the ID’s size is paid again in every entry of every index. In MySQL’s InnoDB this is literal: every secondary-index entry holds the row’s primary key, and the manual says outright that a short primary key is better for that reason dev.mysql.com ↗. PostgreSQL’s indexes point to a row location instead, so there the ID’s size lands on its own index and on every other column and index that stores it.

Pause and think

An index whose entries carry a 4-byte integer ID is about 1 GB. You switch the ID to a 16-byte UUID. Is that just a little more disk space?

The ID part of every entry is four times wider. With a 4-byte user_id beside it, each entry goes from 8 to 20 bytes, so the index grows by a multiple, not a few percent. And an index is not something you want on disk: to be fast, it has to be in memory.

[figure title] An index is a smaller table

[figure description] A posts table has post_id, user_id, title and body. An index on user_id is a second, two-column table: user_id sorted, plus the post_id of the row each entry points to. Because the ID is stored in every index entry, a 16-byte UUID makes the ID column four times as wide as a 4-byte integer (about 2 times against an 8-byte BIGINT). With a 4-byte user_id, each entry grows from 8 to 20 bytes, about 2.5 times, so the index grows by a multiple, not a few percent.

[figure labels] posts · post_id · user_id · title · … · 101 · 7 · hello · … · 102 · 3 · ids · … · 103 · 7 · b+ trees · … · 104 · 5 · uuid? · … · idx_user_id · user_id · post_id · 3 · 102 · 5 · 104 · 7 · 101 · 7 · 103 · points to · the row · the ID is stored in every index entry · 4-byte id · user_id · id · 8 B per entry · 16-byte uuid · user_id · id · 20 B per entry · I'm unique, what's the problem? · the id grows ~4× vs an INT (~2× vs a BIGINT); the whole entry 8 B → 20 B, ~2.5×

[caption] Fig 5·bAn index on user_id is a two-column table, and every entry carries the post_id of its row. Make the ID a 16-byte UUID and that column grows in every entry.

The four is against a 4-byte INT. Against an 8-byte BIGINT, the realistic alternative at scale, a UUID is twice the size. How much the whole index grows depends on what else its entries hold. Random UUIDs have a second cost: each new one lands at a random place in the index instead of at the end, and the standard that defines them says plainly that they “have poor database-index locality” rfc-editor.org ↗.

§ 5.2

## Why does a bigger index make queries slower?

When you send a query, the database first builds an execution plan, and it does that work on the indexes, because they are small. If two tables are joined on indexed columns and both indexes are in memory, the join runs in memory; the database goes to the table only for rows the index doesn’t cover. With the indexes in RAM, most of a query never waits on the disk.

[figure title] Where a query runs

[figure description] Panel a: both indexes fit in RAM. The planner joins them on indexed columns in memory, and only the last step reads the result rows from disk. Panel b: one index has spilled out of RAM onto the disk, so every lookup in it becomes a disk read.

[figure labels] ram · plan · idx_a · idx_b · join on · indexed cols · disk · last step: read · the result rows · a · indexes fit in RAM · ram · plan · idx_a · idx_b · disk · every lookup is · a disk read · b · an index spilled to disk

[caption] Fig 5·ca: both indexes fit in memory, so the plan and the join run there and the disk is read for the result rows. b: one index has spilled to disk, and every lookup in it is now a disk read.

So what has to fit in memory is the part of your indexes that queries actually use, with room for the hot data too. The database doesn’t hold indexes in RAM just because they exist. It reads their pages in as queries need them, caches them, and evicts the least recently used when it runs out of room, so an index that has outgrown memory keeps being read from disk.

This is why the database is the hardest part of your infrastructure to scale: API servers keep no state, so you add more of them, while the database stores everything, is queried for everything and carries the whole load.

A rule of thumb that follows: when you size a database server, give it at least as much RAM as the indexes your queries use, and size for all of them if you don’t know which those are. Flickr’s engineering blog puts it bluntly: if you can’t fit your indexes in memory, you can’t make your database fast.

[summary] Go deeper: the first thing to check on a slow database a habit, not a rule

One engineer’s habit: when someone says their database is slow, look at index sizes first. Very often indexes have been created freely, they no longer fit in memory, and every lookup has turned into a disk read. Slow-query logs and EXPLAIN plans are the other usual first stops.

That is what an ID’s size really costs. Not disk, but how much of your indexes can stay in memory.

§ 5.3

## So when is a UUID the right call?

UUIDs have one real strength. A random one can’t be guessed from the last one. Build Facebook with IDs 1, 2, 3, and anyone can fire requests in a loop from 1 to a billion and scrape the entire site. Random IDs make that much harder. They don’t make anything secure, though: every request still needs its own permission check owasp.org ↗.

And they are not forbidden. If your application is small and will never reach the scale where index size bites, a UUID is just fine. Don’t reach for the best solution out there when a simpler one works for you. Since 2024 there is also a time-ordered UUID, version 7, that puts a millisecond timestamp first. It fixes the scattered inserts. It is still 16 bytes.

The companies ahead went smaller. MongoDB’s ObjectId is 12 bytes: 4 bytes of time, in seconds, first; then 5 random bytes; then a 3-byte counter. Nothing stopped MongoDB from using 16-byte UUIDs; it chose 12, four bytes fewer in every index entry.

[figure title] MongoDB's ObjectId

[figure description] A MongoDB ObjectId is 12 bytes: 4 bytes of time in seconds first, then 5 random bytes, then a 3-byte counter. Below it, ID sizes on one scale: INT 4 bytes, BIGINT or Snowflake 8 bytes, ObjectId 12 bytes, UUID 16 bytes.

[figure labels] 12 bytes · time on the left · 4 B · time (seconds) · 5 B · random · 3 B · counter · id sizes, one scale · INT · 4 B · BIGINT / Snowflake · 8 B · ObjectId · 12 B · UUID · 16 B

[caption] Fig 5·dA MongoDB ObjectId: time first, then random bytes, then a counter. Below, the common ID sizes on one scale.

MySQL’s INT is 4 bytes and its BIGINT 8, both cheap to index. Past 8 bytes, start worrying at scale. Notice the pattern in the ObjectId: time on the left, and small. It is also the cost the boot counter in chapter 2 would have paid: every extra part makes the ID longer, and long IDs index badly.

So get_id() gets a budget: 64 bits or less. That settles what an ID looks like. It doesn’t settle who hands them out when a whole company needs them, which is the question Amazon faced.

Lecture 6, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-amazon ===

# Minting unique IDs, chapter 6: Amazon: must every order wait on the ID service?

Lecture 6 · Minting unique IDs · chapter 6 of 10

§ 6

## Amazon: must every order wait on the ID service?

About 6 min

Part 1 is done: you know what an ID must be and what each property costs. From here on, real companies answer the same question, and each answer is a rung on your ladder. First Amazon, as one engineer who sat next to the team that built its ID service describes it.

Amazon gives every order placed a globally unique ID. The order rate is high, and the same ID service also hands out IDs to many other internal services, orders being just one of them.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. Under the ladder: every ID: 64 bits or less. Marked new: the size limit.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · every ID: 64 bits or less · get_id() so far

[caption] Fig 6·aget_id() after chapter 5: the versions so far, and a size budget of 64 bits.

§ 6.1

## An ID service. Does every order call it?

The service itself is plain: ordinary API servers exposing ID endpoints, behind a load balancer, with a classic relational database behind them. Nothing fancy, and no reason to make it fancier. Two of its callers, orders and payments, each run on their own fleet of servers. Neither cares about order. They need unique IDs, as simple as that.

That is chapter 4’s central server again, so it carries the cost chapter 4 set aside: a network call for every ID.

Pause and think

Every new order would wait on a network call to the ID service. You built something in chapter 2 that cut a disk write per ID down to one per thousand. Does the same trick work here?

Ask the service for a batch, not for an ID. A server takes a block of numbers in one call and hands them out from memory, the bank of IDs again, with the network call where the disk write used to be.

§ 6.2

## How does a range go out?

The ID database holds one row per calling service, one for orders and one for payments, each with its own counter. Batching is one of the most effective ways to get performance out of any system, and here is the batch.

[figure title] Ranges from one row

[figure description] An ID service (API servers behind a load balancer, one relational database) keeps one counter row per service. Orders server 1 asks for 500 and gets [0, 500) as the counter moves to 500; orders server 2 gets [500, 1000); payments server 1, on its own row, gets [0, 2000). Near the end of its range orders server 1 asks again and gets [3000, 3500). Each hand-out is a SELECT … FOR UPDATE and an UPDATE in one transaction.

[figure labels] id service · id db · id api · lb · id_ranges · service · counter · orders · payments · 0 · 0 · orders s1 · orders s2 · payments s1 · 0 · 500 · get_id_batch(500) · [0, 500) · 500 · 1000 · get_id_batch(500) · [500, 1000) · 0 · 2000 · get_id_batch(2000) · [0, 2000) · 1000 · 3000 · 3500 · 490 of 500 used: ask again · [0, 500) · [3000, 3500) · SELECT … FOR UPDATE, then UPDATE

- Orders server 1 boots with no IDs and asks for 500. One update moves the orders counter from 0 to 500, and the reply is the range [0, 500): just a start and an end.

- Orders server 2 boots and asks for 500. Same row, one more update: the counter goes to 1000 and server 2 holds [500, 1000).

- Payments has its own row and its own counter. Payments server 1 asks for 2,000 and gets [0, 2000).

- With 490 of its 500 used, orders server 1 asks again and gets whatever range is next, here [3000, 3500): other servers took the numbers in between.

- Each hand-out is one locked read and one update in a transaction, so two servers asking at once can’t get the same range.

Keys: ← → to step · link to a step with #fig-6b/step-3

[caption] Fig 6·bThe ID service (top) keeps one counter row per calling service. Blue is a server asking for a batch, and the range it gets back. Step through with the buttons or the arrow keys.

Only the start and the end go back, never 500 separate IDs: two numbers describe them all.

The hand-out has to be atomic, and you have written it before. It is Lecture 3’s check-in transaction, copied over: lock the row with SELECT … FOR UPDATE, add the batch size, commit, and reply with the old and new values as the range.

-- id_ranges(service, counter): one row per calling service START TRANSACTION; SELECT counter FROM id_ranges WHERE service = 'orders' FOR UPDATE; -- say it returns 500; the row is now locked UPDATE id_ranges SET counter = counter + 500 WHERE service = 'orders'; COMMIT; -- reply [500, 1000): the old value and the new one

§ 6.3

## What did batching buy, and what does a crash cost?

Once a server holds a range, it stops thinking about IDs. An order arrives, the server takes the next number from memory and writes the order into its own orders database.

That is the real gain: ID generation is decoupled from the orders database. The orders database can be sharded and scaled out, with every shard taking writes, because no shard’s auto-increment is involved, and no server calls the ID service per order. The service itself stays simple: its database is the one source of truth, it never gossips with anyone, and each request is one tiny update. That database is still one box, so you would run it with a replica or a standby; batching keeps it off the hot path, so a short outage is survivable while servers still hold ranges.

The 500 is only for the walkthrough. Real batches are 10,000, 50,000 or 100,000 IDs, depending on how busy the service is. The cost shows up on a crash. A server that crashes loses the rest of its range forever. Too small a batch means too many calls; too large means a crash throws away a big range. Each service tunes its batch size to its own throughput. And there is no order across servers: one server may be handing out 3,042 while another hands out 612. This design promises unique, and nothing else.

You might want to stop the waste: record in the database how much of its range each server has used, so a restarted server picks up where it left off. With batches of 10,000, a server that used 100 and crashed throws away 9,900. Don’t. Tracking every used ID is a massive overhead, and a 64-bit ID space will never run out, not even for Amazon. People underestimate numbers. A million and a billion both sound huge, yet the gap between them is itself almost a billion. Four billion would already be a lot of orders; 2^64 is about 18 billion billion. Nobody misses a few ranges.

[summary] Go deeper: ranges from a queue, Redis or DynamoDB if SQL isn’t your store

The ranges don’t have to come from a SQL row. What you need is one property: an atomic increment that returns the new value. A DynamoDB atomic counter or Redis INCRBY gives it; a retried increment can over-count, which only wastes a range. A generator that pushes ranges into a queue works too, but a queue that delivers at least once can deliver the same range twice, so consumers must deduplicate aws.amazon.com ↗. Find the core property you need; any system that provides it is good enough.

The whole service is about 150 lines of Python, and scaling it means handling a few more cases, nothing hard. Write it yourself.

It still needs a service that someone writes, deploys and runs. Flickr looked at its MySQL servers, already counting 1, 2, 3 on every insert, and asked whether it needed a separate service at all.

Lecture 6, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-flickr ===

# Minting unique IDs, chapter 7: Flickr: could MySQL itself be the ID service?

Lecture 6 · Minting unique IDs · chapter 7 of 10

§ 7

## Flickr: could MySQL itself be the ID service?

About 7 min

Flickr was the big photo site of the 2000s, years before Instagram existed. Its photos lived in a sharded database running in multi-master mode, so a write could land anywhere, and auto-increment on every shard would hand out conflicting IDs. That is chapter 1’s problem, exactly. Flickr’s engineers also wrote down why they didn’t simply use UUIDs: they index badly.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. amazon: ranges from a counter row, made by an ID service. Under the ladder: every ID: 64 bits or less. Marked new: amazon.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · amazon · ranges from a counter row · an ID service · every ID: 64 bits or less · get_id() so far

[caption] Fig 7·aget_id() after chapter 6: Amazon’s service hands out ranges from one counter row per caller.

§ 7.1

## Can one table hand out tickets?

Flickr’s idea is disarmingly simple. MySQL already gives you auto-increment IDs, so let MySQL itself be the ID service. Flickr called it a ticket server: a MySQL database of its own, separate from the sharded photos database, that exists only to lend out its auto-increment. You could object that a query per ID is slow. When you study another company’s design, look for the parts worth taking; the trade-offs were theirs to make.

Follow one photo. The upload reaches a photo-service API server. That server asks the ticket server for an ID, gets one, and then stores the photo under that ID in the sharded photos database.

[figure title] Flickr's photo service with a ticket server

[figure description] A user posts a photo to one of the photo service servers. That server first asks the ticket server, a separate MySQL database, for an ID (1), gets the ID back, and then stores the photo under that ID in the sharded, multi-master photos database (2). The single ticket server is a single point of failure.

[figure labels] user · post · photos svc · 1 · get id · id · ticket server (mysql) · one box: a single point of failure · 2 · store photo · photos db · sharded, multi-master

[caption] Fig 7·bPosting a photo: the photo server first gets an ID from the ticket server (1), then stores the photo under it in the sharded photos database (2).

How do you get a stream of new numbers out of a table? Insert a row per ID and the table grows by a row for every photo, forever. Delete the old row each time and it stays at one row. That is the naive version: whenever someone needs an ID, delete the row and insert a new one, and auto-increment fills in the next value. But you can’t insert a row with no values at all. That is the only reason the table has a second column, stub. The name sounds important; it is a dummy column holding a constant, literally any string, there to give the insert something to write and to hit a unique key.

[figure title] The ticket table

[figure description] Flickr's Tickets64 table has an auto-increment BIGINT id (the primary key) and a stub column with a unique key. It holds one row, id 74 with stub 'a'. Each ID request collides on the unique stub, the row is replaced, and auto-increment gives the new row the next id: 74, then 75, then 76.

[figure labels] Tickets64 · id · stub · 74 · a · 74 · 75 · 76 · stub = 'a': a dummy value, just there to hit the unique key · create table Tickets64 ( · id   bigint unsigned not null auto_increment, · stub char(1) not null default '', · primary key (id), · unique key (stub) · );

[caption] Fig 7·cThe whole ID service is this one row: a 64-bit auto-increment id and a stub that exists only to collide with its unique key.

A delete and an insert in one transaction is costly. Delete plus insert is what an upsert is for: one statement that inserts, and if the key already exists, updates or replaces the row instead. MySQL has two. INSERT … ON DUPLICATE KEY UPDATE updates the existing row in place; it is the PUT from Lecture 3’s key-value store. REPLACE INTO deletes the old row and inserts a new one. Because it rebuilds the row, it is usually the slower of the two; one benchmark on one setup measured it about 32 times slower.

Flickr uses REPLACE anyway, and here the delete is the point.

CREATE TABLE Tickets64 ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, stub CHAR(1) NOT NULL DEFAULT '', PRIMARY KEY (id), UNIQUE KEY stub (stub) ) ENGINE=MyISAM; -- as in Flickr's post -- every ID request: REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID();

The insert of 'a' collides with the unique key, so MySQL removes the old row and inserts a fresh one, and a fresh row gets the next auto-increment value: 74, then 75, then 76. LAST_INSERT_ID() returns it to the connection that asked. MySQL’s own counter does the work, atomically, and the table never grows past one row.

§ 7.2

## One ticket server is one box. What about two?

Every photo upload in the company now waits on one MySQL server. If it goes down, ID generation is gone: a single point of failure. So put two ticket databases behind a load balancer, and if one goes down the other takes the load. That looks like chapter 4’s two servers, which had to gossip on every ID.

Pause and think

Flickr needs two ticket servers that never hand out the same ID, and it doesn’t need order. Do they have to talk to each other?

Give each server its own lane of numbers that can never meet the other’s. Then neither ever needs to know what the other has issued.

Flickr’s lanes are odd and even. Both servers step by 2; one starts at 1, the other at 2. These are two real MySQL settings, and they apply to every auto-increment value the server generates, which is why the fresh row that REPLACE inserts matters: the new ID comes out of this counter.

# ticket server 1: 1, 3, 5, 7 … auto_increment_increment = 2 auto_increment_offset = 1 # ticket server 2: 2, 4, 6, 8 … auto_increment_increment = 2 auto_increment_offset = 2

[figure title] Two ticket servers, odd and even

[figure description] Two ticket servers sit behind a round-robin load balancer. Both step by 2 (auto_increment_increment = 2); ticket 1 starts at 1 and issues 1, 3, 5, 7, ticket 2 starts at 2 and issues 2, 4, 6, 8. Requests alternate, so IDs come out 1, 2, 3, 4 and are never shared.

[figure labels] aren't we supposed to be in order? · ticket 1 · 1 3 5 7 · auto_increment_increment = 2 · auto_increment_offset = 1 · ticket 2 · 2 4 6 8 · auto_increment_increment = 2 · auto_increment_offset = 2 · lb · round robin: 1, 2, 3, 4 …

[caption] Fig 7·dBoth ticket servers step by 2 from different starts. Round robin alternates between them, so IDs come out 1, 2, 3, 4, and no value can be issued twice.

If your chapter 1 answer was “step by the number of masters”, you designed Flickr. And for your shop’s two order masters, that pair of settings is the whole fix: it works, with the drawback 7.3 shows when one side is down for a while. Flickr’s photos sat on a sharded set of masters, so it took ID generation off them altogether and gave it one central home, the separate ticket database; the odd/even trick runs only on the two ticket servers.

With the load balancer doing round robin, requests alternate and the IDs come out 1, 2, 3, 4, almost in order, and if one server goes down the other carries on without a hiccup. Flickr chose it on purpose: at its write volume, replicating between the boxes would have been a problem, and locking would have killed performance code.flickr.net ↗.

§ 7.3

## The odd server dies at 5

Say the odd server dies just after issuing 5. Every request now goes to the even one: 6, 8, 10, on up to 202. Then the odd server comes back.

Pause and think

The odd server comes back and resumes where it stopped, so IDs now come out 7, 204, 9, 206. Is that a bug?

Every ID is still unique, and uniqueness is all this design ever promised. The 1, 2, 3, 4 you saw earlier was a side effect of round robin, never a guarantee.

The odd server is back. Watch the next four IDs.

[caption] Clip 7·1A big gap between neighbouring IDs is untidy, not wrong.

[summary] The clip as text 0:39

- Two ticket servers: one odd, one even.

- Round robin: the IDs come out almost in order.

- The odd server dies. The even one carries on, up to 202.

- It resumes where it stopped: 7, 204, 9, 206. Still unique.

- Optional: reset both above the max. It only looks tidier.

- Uniqueness never broke. Order was never promised.

Two MySQL ticket servers sit behind a round-robin load balancer: ticket 1 hands out odd IDs and ticket 2 even IDs, so requests alternate and the IDs come out 1, 2, 3, 4, 5, 6, almost in order. Ticket 1 dies after 5; every request goes to ticket 2, whose IDs climb 8, 10, 12 and on up to 202. Ticket 1 comes back where it stopped, because its counter persisted, so the stream becomes 7, 204, 9, 206: out of order, but every ID is still unique. Optionally both servers are reset above the max (max plus a buffer) to 241 and 242, and round robin continues 241, 242, 243, 244. The reset only makes the order look tidier; uniqueness never broke and order was never promised.

The odd server resumes at 7 because its auto-increment counter survives a restart (Flickr’s MyISAM table stores it with the table; InnoDB has done the same since MySQL 8.0).

If the looks bother you, the clip’s last step shows the cosmetic fix: take the largest ID issued, add a buffer, and restart both servers above it. Pick that value the way chapter 2 taught you to restart a counter: the safest value, past anything already handed out. Flickr doesn’t bother. Its two sides drift apart, and when it wrote up the design it had a few hundred thousand more odd-numbered objects than even ones, “but this hurts no one” code.flickr.net ↗. A photo site has no reason to care about order.

It is a pretty simple design, and pretty brilliant in its own way. But Amazon and Flickr both keep an ID service that someone has to run, and for a company whose writes come in bursts, that service is one more thing to scale.

Lecture 6, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-snowflake ===

# Minting unique IDs, chapter 8: Tweets spike. Can the ID service stop coordinating?

Lecture 6 · Minting unique IDs · chapter 8 of 10

§ 8

## Tweets spike. Can the ID service stop coordinating?

About 8 min

Posting tweets is one of the highest-throughput write workloads there is, and it spikes: when something big happens, everyone tweets at once. Every tweet needs an ID. Put a coordinated ID service in that path, one that must agree with itself or a database on every ID, and it becomes one more tier you must scale for the worst spike.

Twitter’s answer is called Snowflake. The idea is decentralized: an ID is computed from what the generating machine already knows, with no shared state and nobody to ask. Tweet IDs still use its format today, and it remains one of the best ID schemes around.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. amazon: ranges from a counter row, made by an ID service. flickr: odd + even ticket DBs, made by an ID service. Under the ladder: every ID: 64 bits or less. Marked new: flickr.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · amazon · ranges from a counter row · an ID service · flickr · odd + even ticket DBs · an ID service · every ID: 64 bits or less · get_id() so far

[caption] Fig 8·aget_id() after chapter 7: Flickr’s two ticket databases, odd and even.

§ 8.1

## What fits in 64 bits?

A Snowflake ID is a 64-bit integer, kept that small on purpose. At Twitter’s scale every tweet ID is stored and indexed over and over, and 128 bits would double the space every one of those copies needs. It is close kin to MongoDB’s ObjectId, time first and then tie-breakers, only smaller.

Read the 64 bits from the left. The top bit stays 0, so the ID is a positive number. Then 41 bits of milliseconds, counted from an epoch: time on the left, always. Then 10 bits of machine ID, naming the generator. Then 12 bits of counter: a per-machine counter, atomically incremented on every ID.

Look at what is in there: time on the left from chapter 3, the machine prefix from chapter 1, the static counter from chapter 2, all inside chapter 5’s 64-bit budget. You have built every part of it. To make an ID, a machine needs only the current time, which it has, its own machine ID, given to it once at startup, and its counter.

Pause and think

10 bits of machine ID, 12 bits of counter. How many IDs can one machine make in a single millisecond before its IDs could collide?

Twelve bits of counter give 2^12 = 4,096 values per millisecond per machine, about 4 million IDs a second from one generator. The 10 bits of machine ID allow 2^10 = 1,024 generators.

[figure title] Snowflake's 64 bits

[figure description] A 64-bit integer split into fields. The top bit is unused and stays 0. Then 41 bits of milliseconds since an epoch, the most significant part, so time is on the left. Then a 10-bit machine id, 2 to the 10 = 1024 machines, and a 12-bit per-machine counter, 2 to the 12 = 4096 IDs per millisecond. Time orders the IDs; machine and counter break the tie.

[figure labels] bit 63 · 22 · 12 · 0 · 41 · 10 · 12 · ↑ unused, always 0 · time (ms since an epoch) · machine id · counter, · per machine · 2^10 = 1024 · machines · 2^12 = 4096 · ids per ms · most significant: moves forward every ms · time on the left · tie broken on the right

[caption] Fig 8·bSnowflake’s 64 bits: an unused top bit, 41 bits of time, 10 of machine, 12 of counter. Time on the left orders the IDs; the other two fields break ties.

That is enormous headroom: Twitter’s own requirement was at least 10,000 IDs per second per process github.com ↗. A collision would need one generator to receive more than 4,096 requests inside a single millisecond, and even then a correct generator doesn’t collide: it waits for the next millisecond.

§ 8.2

## How much code is that?

About three lines. Subtract the epoch from the current time, shift it left past the other two fields, and OR the machine ID and the counter into the low bits. The machine ID and counter take 10 + 12 = 22 bits, so time shifts left by 22.

EPOCH = 1288834974657 # Twitter's custom epoch: 4 Nov 2010, in ms def snowflake(now_ms, machine_id, counter): return ((now_ms - EPOCH) << 22) | (machine_id << 12) | (counter & 4095)

A generator you would run puts two guards around those lines, both of which you have already met. If the 4,096 counter values run out inside one millisecond, wait for the next millisecond. And if the clock steps backwards, chapter 4’s danger, refuse to issue IDs until time has passed the last one issued, as Twitter’s generator did github.com ↗.

import threading, time MACHINE_ID = 7 # unique per generator, 0 to 1023 lock = threading.Lock() last_ms, seq = -1, 0 def current_ms(): return time.time_ns() // 1_000_000 def next_id(): global last_ms, seq with lock: # one counter per machine, changed atomically now = current_ms() if now < last_ms: # the clock stepped back: refuse raise RuntimeError("clock moved backwards") if now == last_ms: seq = (seq + 1) & 4095 if seq == 0: # all 4,096 used in this millisecond while now <= last_ms: now = current_ms() # wait for the next one else: seq = 0 last_ms = now return ((now - EPOCH) << 22) | (MACHINE_ID << 12) | seq

Every generator needs a machine ID no other generator has. Something has to hand those out when a machine starts, ZooKeeper for example.

§ 8.3

## Does Snowflake need a service at all?

Follow one tweet. An ordinary API server validates it, gets a Snowflake ID, and stores the tweet in the massively partitioned tweets database.

Twitter’s original Snowflake, in 2010, ran as a small network service of its own, a Thrift server written in Scala, and the API tier called it for IDs github.com ↗. What made it scale is what isn’t there: its nodes never coordinate with each other. Each one stamps IDs from its own clock, machine ID and counter, so adding nodes adds capacity, with no gossip, no shared counter and no database on the path. Those 10 machine bits name its generator processes, at most 1,024 of them.

And since an ID needs nothing but those three local values, the same few lines also run happily as a library inside every app server, with no network call at all. Sony’s open-source Sonyflake, a Snowflake-style generator with its own bit layout, is used exactly that way github.com ↗. Either way the expensive part of an ID service, the coordination, is simply gone.

[summary] Go deeper: the microservice reflex an opinion, worth arguing with

Faced with “we need IDs”, the first instinct is “I’ll write a microservice”. The Snowflake layout shows how often that isn’t needed: an ID that needs only local values can be a few lines inside the app, as Sonyflake and Instagram run it. Look at the problem, build only what it needs, and if a simpler design wins, bring data. Martin Fowler notes that “almost all the successful microservice stories have started with a monolith that got too big and was broken up” martinfowler.com ↗. Simple systems scale.

§ 8.4

## Do Snowflakes come out in order?

Roughly, and that is their beauty. The left 41 bits move forward every millisecond, so IDs made later are almost always larger. Twitter promised exactly that much: IDs sorted within about a second, not strict order github.com ↗. Inside one millisecond there is a pattern too: an ID from the machine with the smaller machine ID is smaller.

Strict order is still out of reach, for chapter 3’s reasons: the generators’ clocks disagree. You might hope round-robin routing would line them up; it decides which machine answers next, and does nothing about their clocks. In a distributed setup you can’t guarantee monotonicity. You take rough sortability and the throughput that comes with it.

You can see a Snowflake on any tweet. The number at the end of a tweet’s link is its ID, and its top bits are the millisecond the tweet was made.

[figure title] Decode a tweet ID

[figure description] The example ID 1627179151913938944 written in binary and spread over the 64-bit bar. Shifting right by 22 and adding Twitter's epoch gives 1,676,784,716,000 ms, 19 February 2023 at 05:31:56 UTC. Shifting right by 12 and keeping 10 bits gives machine 7. Keeping the low 12 bits gives counter 0.

[figure labels] 1627179151913938944 · an example id, in binary below · 0 · 0 · 0 · 1 · 0 · 1 · 1 · 0 · 1 · 0 · 0 · 1 · 0 · 1 · 0 · 0 · 1 · 1 · 1 · 0 · 0 · 1 · 1 · 0 · 1 · 1 · 0 · 1 · 0 · 0 · 0 · 1 · 0 · 1 · 0 · 0 · 0 · 1 · 1 · 1 · 1 · 1 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 1 · 1 · 1 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · 0 · time: 41 bits · machine · counter · (id >> 22) + 1288834974657 · = 1676784716000 ms · 19 Feb 2023, 05:31:56 UTC · (id >> 12) & 1023 · = 7 · id & 4095 · = 0 · 1288834974657 is Twitter’s epoch in ms (4 Nov 2010) · any tweet link decodes the same way

[caption] Fig 8·cDecoding a Snowflake. This example ID was built from the timestamp 1,676,784,716,000 ms (19 February 2023), machine 7 and counter 0. Shift right by 22 and add the epoch to get the time; mask the middle 10 bits for the machine and the low 12 for the counter. A real tweet ID decodes the same way.

So from IDs alone you can tell whether a tweet was made before or after a given moment, or before or after another tweet, without reading a timestamp column. Hold on to that; it pays off in the next chapter.

§ 8.5

## Why start the clock in 1970?

“Epoch milliseconds” usually means milliseconds since 1 January 1970. But 41 bits hold at most 2^41 ≈ 2.2 × 10^12, and in February 2023 the epoch millisecond was already 1,676,784,716,000, about 76% of that. Count from 1970 and a company founded last year has thrown away most of its range before issuing a single ID.

Nothing forces 1970. Subtract your own start date instead, and time counts up from zero on day one; 2^41 milliseconds then last about 69.7 years from there. Twitter’s own Snowflake already counted from a custom epoch in late 2010.

[figure title] Where the 41 bits run out

[figure description] Two timelines on one year axis. 2^41 milliseconds is about 69.7 years. Counting from 1970, the 41 bits run out in 2039, and by 2023 (1,676,784,716,000 ms) about 76% is already used. Counting the same 41 bits from a 2015 epoch (Discord’s launch year), the same 69.7 years last until about 2084. The years from 1970 to 2015 are what a 2015 company would waste.

[figure labels] years a 2015 company would waste · epoch 1970 · 41 bits run out · 2039 · 1,676,784,716,000 ms · 2023: about 76% used · epoch 2015 · lasts to about 2084 · 1970 · 1990 · 2010 · 2030 · 2050 · 2070 · 2090 · each line is 2^41 ms ≈ 69.7 years long

[caption] Fig 8·dThe same 41 bits, two starting points. Counted from 1970 they run out in 2039; counted from 2015 they last until about 2084.

Discord does exactly this. Its IDs use Twitter’s Snowflake format, with the epoch set to the first second of 2015, the year Discord launched.

Two things now come for free: the IDs fit in a BIGINT, and they sort by time. The second one fixes a problem you have probably met without knowing it.

Lecture 6, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 9-next-page ===

# Minting unique IDs, chapter 9: Page 1,000 of a profile crawls. Can the ID help?

Lecture 6 · Minting unique IDs · chapter 9 of 10

§ 9

## Page 1,000 of a profile crawls. Can the ID help?

About 6 min

Someone scrolls through an account that has posted 10,000 tweets. The first pages come back fine. Then each page is a little slower than the last, and deep in the account it crawls. A batch job has it worse: to find trending topics it reads every tweet from the last hour, millions of them, a page at a time.

Nothing in the last eight chapters was built for this. The profile’s fix needs only an ID you can compare; the batch job needs more, and that is where time on the left pays off, a side effect most people never think about.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. amazon: ranges from a counter row, made by an ID service. flickr: odd + even ticket DBs, made by an ID service. snowflake: time 41|machine 10|seq 12, made in your code. Under the ladder: every ID: 64 bits or less. Marked new: snowflake.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · amazon · ranges from a counter row · an ID service · flickr · odd + even ticket DBs · an ID service · snowflake · time 41|machine 10|seq 12 · your code · every ID: 64 bits or less · get_id() so far

[caption] Fig 9·aget_id() after chapter 8: Snowflake’s 64 bits of time, machine and counter.

§ 9.1

## Why does page 1,000 cost more than page 1?

The usual way to ask for the next page is limit-offset, called skip-limit in MongoDB: the first ten rows, then ten rows after skipping ten, then after skipping twenty. SQL is only the example; every database has the same thing. Give it a unique ORDER BY, or rows can repeat or vanish between pages postgresql.org ↗.

SELECT * FROM tweets WHERE user_id = ? ORDER BY id LIMIT 10 OFFSET 0; SELECT * FROM tweets WHERE user_id = ? ORDER BY id LIMIT 10 OFFSET 10; SELECT * FROM tweets WHERE user_id = ? ORDER BY id LIMIT 10 OFFSET 20;

For LIMIT 10 OFFSET 9990, page 1,000, the database can’t jump to row 9,991. It evaluates the query, works through the result up to that point, throws away the first 9,990 rows, and returns ten. Nothing is kept between queries, so every page redoes all the work of the pages before it. The cost grows in a straight line with depth, and deep pages are painfully slow.

Pause and think

There is an index on the tweet ID. Can you fetch any page, even page 1,000, for the same cost as page 1?

Don’t say how many rows to skip. Say where to start: remember the last ID on the page you just showed, and ask for the ten rows after it: WHERE user_id = ? AND id > :last_id, then ORDER BY id LIMIT 10.

Both ways, page after page. Watch page 1,000.

[caption] Clip 9·1It needs IDs you can compare, and an index on them.

[summary] The clip as text 0:38

- Two ways to ask for the next ten rows, page after page.

- Page 1: both read the first ten rows. Same work.

- Page 10: offset walks past 90 rows first. ID-⁠limit seeks id > 90.

- Page 100: offset walks past 990. ID-⁠limit makes the same short seek.

- Page 1,000: offset recomputes 9,990 rows only to skip them.

- Offset's cost grows with depth. ID-⁠limit's stays the same.

- It needs IDs you can compare, and an index on them.

A table of pages 1, 10, 100 and 1,000, ten rows per page, fetched two ways. With LIMIT 10 OFFSET m, the database starts at row 1 for every page and walks past all the rows before it (0, 90, 990, then 9,990 rows, computed and thrown away) before returning ten, so the walk gets longer with every page and takes the longest at page 1,000. With ID-limit, WHERE id > last LIMIT 10, each page goes down the index in a few steps (log n) to the last ID seen and reads the next ten rows, the same short work at page 1 and page 1,000. Offset's cost grows with depth; ID-limit's stays the same. It needs IDs you can compare and an index on them.

§ 9.2

## Why does “after the last ID” cost the same on every page?

This is ID-based pagination, also called keyset pagination, and it is how Twitter pages: its API takes since_id, which says “I have read up to this tweet, give me the next set”, and today’s X API pages older results with a cursor rather than an offset docs.x.com ↗.

It needs two things. First, IDs you can compare. Auto-increment IDs compare; so do ObjectIds, Snowflakes and every ID with time on the left, which compare by roughly when they were made. Second, an index that matches the query. The index is a B+ tree in key order, so “ten rows after this ID” is a walk down the tree, about log n steps, and then a short read along the leaves. For one account’s tweets that index is on (user_id, id); to walk the whole table, the primary key does it, and in MySQL’s InnoDB the primary key index holds the rows themselves, in key order.

In MongoDB the same loop is a find with a sort, carrying the last _id forward:

// first page let page = db.tweets.find().sort({ _id: 1 }).limit(10).toArray(); // every next page: start after the last _id you saw const lastId = page[page.length - 1]._id; page = db.tweets.find({ _id: { $gt: lastId } }).sort({ _id: 1 }).limit(10).toArray();

§ 9.3

## And the batch job’s “last hour”?

So far an auto-increment ID would have done just as well. The batch job is different: it doesn’t start after a row it has seen, it starts at a moment, an hour ago.

This is where time on the left earns its place. A Snowflake’s top bits are the millisecond it was made, so from IDs alone you can say “before this time” or “after this time”. Turn the boundary into an ID, with the same shift that builds one, and the last hour is just a range of IDs:

-- start_id = (now_ms - 3600000 - EPOCH) << 22 -- one hour ago, as an ID SELECT * FROM tweets WHERE id >= :start_id ORDER BY id LIMIT 1000; -- then keep going with WHERE id > :last_id, exactly as before

The same index on the ID serves both: it finds where the hour begins, and it pages forward from there at the same cost every time. Iterating over the tweets of the last N minutes, for trending topics, recommendations or feeds, is exactly the kind of work that needs paging this cheap.

§ 9.4

## Has anyone measured it?

One engineer benchmarked it on MongoDB in 2016, by their own account, and published the result: skip-limit against _id-limit, page after page. Up to about 500 or 600 records the two are much the same. After that, skip-limit’s time climbs in a straight line, and _id-limit’s stays flat.

[figure title] Skip-limit vs ID-limit, the shape of the benchmark

[figure description] A chart with records paged through on the x axis and response time on the y axis, no values. The skip plus limit line rises in a straight line as pagination goes deeper; the _id plus limit line stays flat. Near the origin the two are about the same. Two spikes on the rising line are annotated: disk throttling during a flush, and other processes on the same laptop.

[figure labels] response time · records paged through (deeper →) · about the same · up to ~500–600 · skip + limit · _id + limit · disk throttling · during a flush · other processes · on the same laptop · shape only, redrawn from the benchmark; no values

[caption] Fig 9·bThe shape of the benchmark’s result, without its values: skip + limit rises in a straight line with depth, _id + limit stays flat. The spikes are the test machine’s disk throttling and other processes competing for it, not the queries.

The trend underneath the spikes stays a straight line. The result isn’t special to MongoDB. PostgreSQL and Elasticsearch document the same costly deep offsets and the same cure, though how much each gains depends on the engine and on whether an index matches the sort.

§ 9.5

## What do you give up?

You can’t jump to page 500. Keyset pagination only continues from a row you have already seen, which suits infinite scroll and batch jobs and doesn’t suit numbered page links use-the-index-luke.com ↗. And it needs a deterministic sort backed by an index: filter or sort on something no index matches, and you are back to offset.

So don’t replace every query that iterates. When you need to go deep without fancy filtering, even in MySQL, switch to ID-based pages and watch deep pages get fast.

Beyond SQL, it depends on how the store lays out data. It works wherever the store can resume a scan from a key: MongoDB, as the benchmark showed, and DynamoDB, which pages by handing back a LastEvaluatedKey to start from aws.amazon.com ↗. Data spread purely by hash, with no locality, has no cheap ordered range to walk.

[summary] Go deeper: Elasticsearch, and IDs that are strings two edge cases

Elasticsearch caps offset paging (from + size) at 10,000 hits by default, the index.max_result_window setting, and points you to search_after beyond that elastic.co ↗: for deep iteration, a cursor beats an offset there too. IDs don’t have to be numbers, either. String keys compare too, by the column’s collation, so numeric-looking strings sort '10' before '9' unless they are padded to a fixed width.

Underneath all of it is one habit: know how your database stores your data on disk. Knowing that rows sit in key order in a B+ tree is what lets you drop OFFSET with confidence, and tells you where you can’t.

One company took time on the left and 64 bits from the last four chapters, refused to run any ID service at all, and put the logic somewhere nobody else had.

Lecture 6, chapter 9 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 10-instagram ===

# Minting unique IDs, chapter 10: Instagram wants no new service. Where does the ID go?

Lecture 6 · Minting unique IDs · chapter 10 of 10

§ 10

## Instagram wants no new service. Where does the ID go?

About 9 min

Instagram’s early engineers wrote up their ID scheme in a short blog post, starting from three requirements. IDs sortable by time, for the same reasons as Twitter: process recent posts, find trending hashtags, push new photos into feeds, page through them. IDs of 64 bits, so they index well. And no new service to build and run.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. amazon: ranges from a counter row, made by an ID service. flickr: odd + even ticket DBs, made by an ID service. snowflake: time 41|machine 10|seq 12, made in your code. Under the ladder: every ID: 64 bits or less.

[figure labels] version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · amazon · ranges from a counter row · an ID service · flickr · odd + even ticket DBs · an ID service · snowflake · time 41|machine 10|seq 12 · your code · every ID: 64 bits or less · get_id() so far

[caption] Fig 10·aget_id() after chapter 9, unchanged: every rung so far, Snowflake on top.

§ 10.1

## Snowflake’s layout, but whose 13 bits?

The first two requirements are Snowflake’s, so Instagram built a Snowflake-style layout of its own. The first 41 bits are milliseconds since a custom epoch, 24 August 2011. The next 13 bits are a shard ID, because Instagram’s database was already sharded. The last 10 bits are a per-shard sequence: a counter again.

[figure title] Twitter's 64 bits and Instagram's 64 bits

[figure description] Two 64-bit bars, one above the other. Twitter's Snowflake: an unused top bit, 41 bits of time, a 10-bit machine id (1024 machines) and a 12-bit counter (4096 IDs per millisecond per machine). Instagram's: 41 bits of milliseconds since its 2011 epoch, a 13-bit logical shard id (8192 shards) and a 10-bit per-shard sequence (1024 IDs per millisecond per shard), filling all 64 bits. Time stays on the left in both; only the two right-hand fields change width.

[figure labels] twitter snowflake · bit 63 · 22 · 12 · 0 · 41 · 10 · 12 · time (ms since an epoch) · machine id · counter · 1024 machines · 4096 per ms · instagram · bit 63 · 23 · 10 · 0 · 41 · 13 · 10 · time (ms since the 2011 epoch) · shard id · sequence · 2^13 = 8192 · logical shards · 1024 per ms · per shard · time on the left in both

[caption] Fig 10·bTwitter’s bar above Instagram’s. Time keeps the left 41 bits in both. Instagram gives the middle field 13 bits and the counter 10, 41 + 13 + 10 = 64.

Twitter splits its bits 41 | 10 | 12, time, machine, counter. Instagram splits them 41 | 13 | 10, time, shard, sequence: up to 2^13 = 8,192 shards, and 2^10 = 1,024 IDs per shard per millisecond.

The shards those 13 bits name are logical shards. Instagram ran PostgreSQL, and split its data into several thousand logical shards, each a Postgres schema such as insta5 holding the same set of tables, mapped in code onto far fewer physical database servers instagram-engineering ↗.

[figure title] Logical shards on a physical server

[figure description] One physical database server, drawn as a large cylinder, holds several logical shards: insta1, insta2, insta5, insta9, insta12. Each logical shard is a schema with the same tables as every other. Instagram ran thousands of logical shards, at most 2^13 = 8192, on far fewer physical servers.

[figure labels] physical server · insta1 · insta2 · insta5 · insta9 · insta12 · logical shards (partitions) · 1000s, at most 2^13 = 8192 · on physical db servers · far fewer of them · CREATE SCHEMA insta5; · one schema per logical shard

[caption] Fig 10·cOne physical server holding several logical shards, each a schema with the same tables. Thousands of them, at most 8,192, spread over far fewer servers.

Thousands of identical schemas have a price, a migration runs thousands of times, and a payoff: when a server runs hot, you move a whole logical shard instead of picking out rows. Lecture 9 comes back to splitting data across nodes and what moving it costs. What matters here is that a logical shard’s number stays with its data wherever it moves, which makes it a stable thing to put inside an ID.

§ 10.2

## Who computes the ID, if not the API server?

The third requirement, no new service, is where Instagram did something almost nobody thinks of. It made the ID inside the database, during the insert.

Every table in a logical shard declares its id column with a default, a function written in PL/pgSQL, Postgres’s procedural language. Insert a photo without an ID, and the database calls the function and uses what it returns. Each schema gets its own copy, with its own shard number written into it.

CREATE SCHEMA insta5; CREATE SEQUENCE insta5.table_id_seq; CREATE OR REPLACE FUNCTION insta5.next_id(OUT result bigint) AS $$ DECLARE epoch bigint := 1314220021721; -- Instagram's custom epoch, in ms (24 Aug 2011) seq_id bigint; now_ms bigint; shard_id int := 5; -- this schema is shard 5 BEGIN SELECT nextval('insta5.table_id_seq') % 1024 INTO seq_id; SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_ms; result := (now_ms - epoch) << 23; result := result | (shard_id << 10); result := result | (seq_id); END; $$ LANGUAGE plpgsql; CREATE TABLE insta5.photos ( id bigint NOT NULL DEFAULT insta5.next_id(), caption text );

[figure title] One insert, one ID

[figure description] An INSERT into insta5.photos gives no id, so the column default calls insta5.next_id(). The function takes nextval of the shard's sequence, 5001, modulo 1024: 905. It shifts the milliseconds since Instagram's epoch, 362564694279, left by 23 into the top 41 bits, ORs in shard 5 shifted left by 10, then ORs in 905. The row is stored with id 3041413094946379657; the API server never made an ID.

[figure labels] INSERT INTO insta5.photos (caption) · VALUES ('sunset'); · no id given · 41 · 13 · 10 · ms since the epoch · shard · seq · insta5.next_id() · the column default · nextval('insta5.table_id_seq') = 5001 · 5001 % 1024 → seq_id = 905 · 362564694279 · result := (now_ms - epoch) << 23 · = 3041413094946373632 · 5 · result := result | (shard_id << 10) · = 3041413094946378752 · 905 · result := result | seq_id · = 3041413094946379657 · insta5.photos · id · caption · 3041413094946379657 · 'sunset'

- The insert gives no id. The column’s default calls insta5.next_id().

- The sequence gives the next number, 5001, atomically; % 1024 keeps 10 bits: seq_id = 905.

- Milliseconds since Instagram’s epoch, 362564694279, go into the top 41 bits: shifted left by 23, the 13 + 10 bits still to fill.

- This schema’s shard number, written into its function as 5, fills the middle 13 bits.

- The sequence value fills the last 10 bits.

- The database stores the row with the ID 3041413094946379657. The API server never touched it.

Keys: ← → to step · link to a step with #fig-10d/step-3

[caption] Fig 10·dOne insert on shard 5, at 1,676,784,716,000 ms (19 February 2023), when the sequence’s next value is 5001. The bar fills from the left; under it is the running value of result. Step through with the buttons or the arrow keys.

You have met nextval before, under another name. A sequence is the database’s own atomic counter, the thing that sits behind every auto-increment column, and it hands out the next number however many transactions ask at once. It is chapter 2’s static counter, with the thread safety built in. Instagram has no auto-increment column, so it creates its sequence explicitly; table_id_seq is just the name it chose.

How does that sequence survive a reboot? It has to: a sequence kept only in memory would restart from zero, which is chapter 2’s reboot problem all over again. The database persists it for you and takes care of the flushing; you just create the sequence.

Notice what next_id() doesn’t do. It has neither of chapter 8’s guards: nothing waits if one shard gets a 1,025th insert in the same millisecond, where % 1024 would wrap onto a value already used, and nothing checks for a clock that steps back. If one shard could see that rate, you would add those guards.

So what did moving the logic buy? The API servers hold no ID logic at all: they do a normal insert without an ID. Twitter’s 10-bit field capped Snowflake at 1,024 generators; Instagram can run 10,000 API servers, or 50,000. The ceiling moves into the database instead: 8,192 logical shards, and 1,024 IDs per shard per millisecond. Build it yourself, on Postgres or any database you like. It is very easy, and people who try it are usually amused at how little there is to it; it shows how much decent database knowledge can get out of a database.

§ 10.3

## Would a bank use any of these IDs?

Every company in Part 2 chose rough order, or none. Now picture a bank that lists each account’s transactions in the order they happened.

Pause and think

Would that bank give its transactions Snowflake-style IDs?

A photo feed doesn’t mind two posts a millisecond out of order. A ledger does. The bank wants one authoritative sequence, such as a single database’s auto-increment, and it accepts the throughput limit that comes with one sequence in one place.

That is chapter 4’s trade, with real stakes: strict order needs coordination, and coordination costs throughput. Even one sequence isn’t the whole answer, since concurrent transactions can commit out of ID order, so ledgers also serialize the postings on each account. Everyone else takes rough sortability and the throughput that comes with it.

Here is the whole ladder, with where each version’s ID is born.

[figure title] get_id() so far

[figure description] The get_id() ladder so far, one rung per version, oldest first. start: AUTO_INCREMENT per master, made by the database, and colliding. v1: epoch_ms, made in your code. v2: machine + epoch_ms, made in your code. v3: machine + thread + epoch_ms, made in your code. v4: machine + counter++, made in your code. v5: machine + counter, saved each call, made in your code. v6: machine + counter, saved every N, made in your code. v7: epoch_ms + machine + counter, made in your code. v8: v7, on one ID server, made by an ID service. amazon: ranges from a counter row, made by an ID service. flickr: odd + even ticket DBs, made by an ID service. snowflake: time 41|machine 10|seq 12, made in your code. instagram: time 41|shard 13|seq 10, made by the database. Under the ladder: every ID: 64 bits or less. Marked new: instagram.

[figure labels] new · version · the ID is… · born in · start · AUTO_INCREMENT per master · the database · v1 · epoch_ms · your code · v2 · machine + epoch_ms · your code · v3 · machine + thread + epoch_ms · your code · v4 · machine + counter++ · your code · v5 · machine + counter, saved each call · your code · v6 · machine + counter, saved every N · your code · v7 · epoch_ms + machine + counter · your code · v8 · v7, on one ID server · an ID service · amazon · ranges from a counter row · an ID service · flickr · odd + even ticket DBs · an ID service · snowflake · time 41|machine 10|seq 12 · your code · instagram · time 41|shard 13|seq 10 · the database · every ID: 64 bits or less · get_id() so far

[caption] Fig 10·eThe finished ladder. The ID can be born in your own code, in an ID service, or in the database, and every design in this lecture is one of those three. Snowflake is marked where its few lines can run, in your code; Twitter’s first version ran them as a small service of its own.

§ 10.4

## What you can now do

- Make IDs unique without coordination: machine ID plus an atomic counter, saved every N IDs, restarted at the safest value (last saved + N + 1), and that start saved before the first ID.

- Know what order costs. Time in the high bits gives rough order for free; strict order across machines needs one sequencer or constant coordination. Ask whether the requirement is real.

- Guard the clock: never issue below your last value; if the clock steps back, wait or refuse.

- Size the ID for the index. Every index entry carries it, and the hot part of your indexes must fit in memory. A UUID is 4× an INT, 2× a BIGINT; stay at 64 bits.

- Pick where the ID is born: ranges from a locked counter row, ticket databases stepping by N, a time | machine | counter layout computed locally, or a function as the column default.

- Page at constant cost: start each page after the last ID seen (WHERE id > :last_id), on an index that matches the sort, and give up jumps to page N.

Flush every 1,000 IDs. The last value on disk is 5,000 and the machine crashed. What is the first ID it may hand out after restart, and why not 5,001?

[summary] Show answer

6,001. The machine could have handed out anything up to the next save point, 6,000, even 6,000 itself if it crashed before that write landed, so it skips the whole window, and saves 6,000 as its new start before handing out 6,001. Unused numbers are cheap; a duplicate isn’t.

Why do time-first IDs from many machines come out only roughly in order, even with clock sync running?

[summary] Show answer

Inside one millisecond the tie-breaker decides, not arrival order. And every machine’s clock drifts between corrections, so at the instant an ID is made one machine may read a millisecond ahead of another, as with 232, 244, 237, 239.

Flickr’s two ticket servers never talk to each other. How do they avoid issuing the same ID, and what happens to order when one is down for a while?

[summary] Show answer

Both step by 2 from different starts, so one issues odd IDs and the other even. If one is down, the other runs ahead, and when it returns the stream looks like 7, 204, 9, 206: out of order, still unique, which is all the design promised.

Twitter’s Snowflake caps the number of generators at 1,024. Why doesn’t Instagram’s scheme cap its API servers, and where did the limit go?

[summary] Show answer

Instagram computes the ID inside the database, in a function used as the column default, so API servers hold no ID logic and need no machine number. The limit moved to the 13-bit shard field: at most 8,192 logical shards, each making up to 1,024 IDs per millisecond.

§ 10.5

## The ID is minted. Now the photo has to reach a phone

You can now give every photo Instagram stores a 64-bit ID that sorts by time and costs nothing to make. That was the easy part of Instagram. The photo itself is a file that someone on a slow phone, maybe on the other side of the world, wants to see right now, and some accounts are private.

Lecture 7 picks up exactly there, with Instagram as a product rather than an ID scheme: what it ran in its first year, how a CDN gets photos close to every reader, how uploads work, and how a hashtag gets a page of its own.

Lecture 6, chapter 10 · facts checked against primary sources, linked where they come from outside this lecture.

**[01:56:01] Teacher (answer):** That's more interesting. So you have a DNS for CoreDNS. So at one step that latency becomes so small that that one server is able to handle that. So there is one single point of failure still in a system, which has a standby node. That's the base condition of the recursive.

> **Student Question [01:56:18] - Student 2:** I mean, we do trace route to a domain, right. And it shows up so many levels of, I mean, 21 levels I've seen to reach Google.com. So that's common. There's so many levels in between, right?

**[01:56:30] Teacher (answer):** Yeah. And every single one of them is horizontally scalable, except one, which is single point of failure with a standby node. And that is so tiny that it can, it's very hard for it to go. And even if it [?goes down | asr: "goes on"], there is already a standby server running. So if it [?goes down | asr: "goes on"] in milliseconds, otherwise would basically, but in second it would take its place. Okay. Thank you.

**[01:56:52] Teacher:** Yeah, Shreeram.

> **Student Question [01:56:55] - Student 10 (Shreeram):** Yeah, let's assume these end users are external users and not internal [?microservices | asr: "Microsoft"]. So when resolving the name to an IP, why would they use our CoreDNS? Isn't the DNS configured in their OS?

**[01:57:10] Teacher (answer):** DNS IP address is configured in their OS. So they would go to let's say Route 53 or the, I don't know the GCPs one, but it goes to public DNS server. It goes to public DNS server and not a private DNS server.

> **Student Question [01:57:27] - Student 10:** Yeah. In that case, how would our CoreDNS be useful for them?

**[01:57:31] Teacher (answer):** No, then you are making your LB server public, right? Then you're making LB server, then this does not come into the picture. If you're making it public, then this does not come into picture. Okay. Then this instead of this becoming private, it becomes public. Anyone can talk to it. It's like how you configure your [?microservices | asr: "Microsoft"] is, that's a public DNS resolution, not a [?private | asr: "primary"] DNS resolution.

> **Student Question [01:57:58] - Student 10:** So in that case, if we are adding new LB servers, then the public DNS will have to be updated.

**[01:58:05] Teacher (answer):** Kind of yes. I cannot reveal those part because it's very proprietary. I know some parts of it, but think of it like kind of that there is one intermediate proxy layer that sits in between that takes care of that. I still have not covered seven different layers that cover it would make this highly complex but there are different layers in which resolution happens. There is still a domain name assigned to every LB server. It may just not be in the public space. It is an intermediate phase in between. You read that paper, Maglev, you will understand what I'm talking about. Read that paper. In case there's a question, more than happy to answer it in basically coming weeks. But I just don't want to make overly complex design discussion. People would kill me for that. But more than happy to discuss it in coming. So first read that paper. In case you still don't get an answer, I'll give you that.

**[01:58:57] Student 1:** Okay.

**[01:58:59] Teacher:** Heyman.

> **Student Question [01:59:01] - Student?:** Yeah. So here you gave one domain name for one service as an example, it'll be dot payments dot. Let's say there are multiple services each with a different name and will every LB server be load balancing for all the services that.

**[01:59:16] Teacher (answer):** No, that's a different, right? Load. What is load balancer? It's balancing across homogeneous set of servers. Right. This is not an API gateway. This is a load balancer. It is balancing across homogenous. So other service would have other load balancer, other LB servers. Okay. Right. And all of those would have its own entries in CoreDNS. Got it. Sure. Thanks. Okay.

<!-- topic-candidate [01:59:39]: Break (admin) -->

[01:59:39] *(admin)* Folks, we'll take a break. It's 11 already. We'll take five minutes break. I'll take questions at the end. No, no problem there. When we come back from the break, we'll take five minutes. We'll sync back at 11 of five. And then we talk about remote locks, right? Remote locks and distributed locks.

[01:59:53] Big discussion anyway but I do and obviously even if it's stretched it's okay, I would not compromise on quality at all. I want all of you to understand the intuition rather than just mugging things up, so we'll go in depth of remote locks as well, distributed locks as well, exactly how I covered in other cohorts, more than that actually. This was the best discussion of load balancer I had, really in depth, didn't skip a thing there. But we'll take a break for five minutes, we'll sync back at 11 of 5 and talk about remote locks and distributed locks and where to be in time. Okay, see you folks in five minutes.

[break ~02:00:26-02:04:59]

<!-- topic-candidate [02:04:59]: Remote locks and distributed locks -->

**[02:04:59] Teacher:** Okay, let's start with the second half for today, [unclear: "half in second, fifth of today"]. So [unclear: "it's not done, fifth, fifth of today"]. Okay, remote locks, distributed locks.

[02:05:12] This is one of the most important things in distributed systems because it's the one that ensures, as I said, ensures the correctness and consistency of data. So remote locks, you typically would have heard of something called as a lock manager. Now, lock manager is a remote machine that acts as a lock manager which keeps track, hey, which item is locked by which machine so that it can do the coordination that, hey, because this item is locked, you cannot do this part.

[02:05:42] Airline check-in system, we locked some rows for others to not even, that others cannot even read them. We took exclusive lock, somewhere in the memory of the database it was stored that this lock, this row is locked by this transaction. Now there everything was in one machine, one process, so it was just memory, memory, updations, right? But now with this distributed things in place, instead of having one process, you have multiple machines within which they need to coordinate. So that is why you need to have a remote lock manager that does that.

[02:06:23] Now, let me take you through a journey over here, not a story story, but simple things to think about. In our database or in airline check-in system, there were multiple transactions. Think about it. Each transaction is a thread. Right. So what we saw there. When there were multiple threads. And we wanted to synchronize between them. Where one takes lock on something. Other cannot do that. But that part was basically stored in memory. Because multiple threads synchronizes through an in-memory thing. Mutex, semaphore, explicit locking, atomic instructions, whatnot. Right. Because what is common between multiple threads? RAM.

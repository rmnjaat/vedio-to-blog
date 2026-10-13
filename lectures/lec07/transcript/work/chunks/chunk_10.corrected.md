**[01:48:29] Student 6:** Over there, we were still calculating the size of actual structure and not the...

**[01:48:35] Teacher?:** Value of node.

**[01:48:36] Teacher (answer):** No, but value of node, great point. But this node is also, you are allocating it, right? Let's say this is Bloom filter. You're allocating Bloom filter. So you see malloc while you're allocating the Bloom filter as well.

**[01:48:49] Student 6:** No, but what malloc accepts is the size of the structure. My value itself, right?

**[01:48:54] Teacher:** No, but Bloom filter is also a structure, right? Let's say you are storing Bloom filter. How will you allocate a Bloom filter? The actual value, this is also value, you need to allocate this. Right. You would allocate that as well. Let's say you're doing a set allocation. So you create a set, not my value. My value is just a wrapper. So every single thing that you're allocating, you're wrapping it over here. So you are not, instead of invoking only malloc, you're invoking zmalloc for every allocation, you're allocating ever in your cache ever. You are doing it with zmalloc.

**[01:49:36] Student?:** We don't call it on structure. We call it on the object. Is that what you mean?

**[01:49:41] Teacher:** Everywhere. Yeah. Yeah. Even this object allocation will be zmalloc. Even this will be zmalloc. Everything that you're invoking is rather than zmalloc. Okay.

> **Student Question [01:49:52] - Student 6:** And this experiment that you just showed on your blog, where you use netcat, can't we use it like as a hack everywhere where we have [unclear: "ECB to SDB"]. Yeah.

**[01:50:04] Teacher (answer):** Then it's just a [?raw | asr: "narrow"] text that you are sending and your server is understanding.

**[01:50:09] Student 6:** Okay. Thanks.

<!-- topic-candidate [01:50:12]: Break (admin) -->

**[01:50:12] Teacher:** *(admin)* Great. Basically Rajiv and Anupam want to take your question in some time. We still have a lot to cover. Now it's time to make our cache distributed. But before we do that, let's go on a break. Then we talk about making a distributed and then I'll take questions. Cover a lot of it. Okay, so let's go on a break for five minutes. We'll sync back at 10.55 in five minutes and talk about the high-level design of 10 making it distributed. Thanks, folks. See you in five minutes.

[break ~01:50:43-01:54:56]

**[01:54:56] Teacher:** *(admin)* Let's start with the second half. And now we talk about, let me just quickly check on why I get this. Oh, sorry. Speaker is set to different speakers. Great. Mic speaker. Okay.

<!-- topic-candidate [01:55:18]: Making the cache distributed -->

[01:55:18] Now let's make our cache distributed. Why? Because now, first of all, why do you want to make things distributed? Because one node is not able to handle the load. When one node is not able to handle enough load, that's where you are distributing the cache across multiple machines. So we'll brainstorm on four or five things. First is storage, second routing, third availability, fourth reliability, fifth scaling. We'll talk about all of them in detail and understand how it works.

<!-- topic-candidate [01:55:50]: Storage -->

[01:55:50] So let's start with storage. That's the easiest place to start. How will you make your cache distributed? I'll give that answer. I'll give an answer [check: possible ASR duplicate] for this and then we'll start the actual conversation. So storage is pretty much sorted at one node is not enough to handle the data or the load. What we do, we take the exact same cache that we have and we create multiple instances of it, each handling a range. Let's say A to J, K to T, U to Z. Just giving an example. So it's a classic way to have a distributed cache. This is the exact same single node implementation that we had. Exact same single node implementation. But now we have just split the load in different mutually exclusive subsets of keys and put it into three different nodes. So we just distributed our storage.

<!-- topic-candidate [01:56:52]: Routing -->

[01:56:52] But now this adds a complexity. That when you have a client want to talk to or store a particular key, how would it talk to? How would it know which one to talk to? So let's say this is my cache one. This is my cache two. This is my cache three. How would my client data for client? How would it store or access the data in a particular cache belonging to a particular range? Right? It, raise your hands, quick raise of hands. [?Hemant | asr: "heaven"]

**[~01:57:26] Student 1:** Maybe the first thing what we are trying to do is to divide the whole key space, let's say we are, we did that, we have this range now, we did that now. Now we have to make a central place where this division is saved saying like, okay, A to J will go to C1, K to T will go to C2 and U to Z will go to C3. So that's the one logic we have to create where the client will connect and first get to know where I have to communicate.

**[01:58:12] Teacher:** Where would you store this?

**[01:58:15] Student 1:** This has to be in a place which we are exposing to the cloud saying that, okay, if you have to connect to our distributed system, this is the place you will send your first request to get to know. And then we'll let you know which is the C1. Let's say if the request is for A to J. So first request comes to a central place. It divides that routing or path finding for C1 and C2 and the request is redirected.

**[01:58:45] Teacher:** Who is redirecting the request? So client talk to this routing layer. Now this routing layer responds to the client or routing layer forwards the request?

**[01:58:54] Student 1:** I mean, there are pros and cons in both cases in my understanding. It's not a state that always you do the same. Different systems do a different way.

**[01:59:06] Teacher:** Perfect. Thanks, you have very solid understanding. Brilliant. Which is what I want to talk about next. So what we just added, and this holds true for any distributed storage system in general, any distributed storage system. So the challenge is we just split our storage across N mutually exclusive subsets of data. Now we need to talk to, so our client needs to talk to one of them and store the data.

<!-- topic-candidate [01:59:34]: Routing - the bank analogy (proxy, smart client) -->

[01:59:34] Now there are four ways to do it. You can come up with a fifth way, happy to hand it over here, ways to do it and the analogy that I take over here is you visiting a bank. When you visit a bank, let's say you enter the bank or like you are just going to a bank. What do you do? When you enter the bank, it's very much possible that there is a peon that is there. You go to a bank, the first person you interact with is the peon that is there on the door and he says, hey, I want to do XYZ. The [?peon | asr: "apparel"] says, hey, you don't worry. I'll do it for you. He takes some commission. He takes some [?bribe | asr: "driver"], whatever you may call it. And he gets a thing for you. So this is what your standard way of having a proxy is. That you talk to the proxy. The proxy does that thing for you.

[02:00:32] So this is what you see as the first type of interaction in the bank. Nothing about how many tables are there, how many departments are there in the bank. The peon is the point of contact for you. So you go to the peon, peon gets things done for you. This is one way.

[02:00:50] Second is where after visiting a bank for a very long time, you know which desk to go to, where to go to, to get something done. Let's say you want to deposit a check. You directly go to that particular desk because you are now know, you know that information that, hey, this is where I want to go to get this particular thing done. No one has to tell you that. So this is where your client itself is smart enough to know where to go to to get things done. Which means that in this case, if you go with this approach, this routing information is with client itself and there is no need of router. So the client knows the existence of all the tables, all the departments of the bank. And it knows if I want to get something, here's where I want to go. So this is where your client knows.

**[00:35:32] Teacher:** Any other question?

**[00:35:36] Teacher:** Great, we'll move forward. Hello? Okay, please raise your hand the next time, it becomes easier for me.

**[00:35:42] Student 3:** Yeah, I was trying to find that option, but I didn't.

> **Student Question [00:35:45] - Student 3:** So my question is, can you please change the slide? Yeah, on this least connection part. Let's say you have said that one request goes to the first one and it took around one hour to execute, and the second request goes to second one, which is a quicker one, one minute, one second, whatever. And the third one is took two hours to finish. So in this algorithm, let's say we have the fourth request and load balancer will assign it to the second one, and that also took around two hours, the huge one. Now in case of fifth request, we have included that load balancer will decide it either to send it to the least connection, but currently we have the least connection over the first node and the third node, correct? So pick one at random. What's the problem? It's random, but let's say both is having a, first one is having a query that is taking one hour.

**[00:36:50] Teacher (answer):** So then you need more servers to handle, right? Here you are assuming that a server can handle only one query. Why?

**[00:36:57] Student 3:** No, not exactly assuming that this handling. Yeah. I was just checking for the time it took. Let's say load balancer assign, redirect that query to the third server, right? Then the first one is about to finish, but load balancer is not aware about that, that CPU and all, it does not, it does not, it has no idea about it. Yeah, yeah. In that case it still stays like third place.

**[~00:37:21] Teacher (answer):** Why would you want to go for global optimization? Local optimization still works. Yeah, yeah, right. And then if you are having such huge amount of workloads, then you would not just have three [?servers | asr: "source"], you'd have far too many, yeah, right? And you would just try to maximize on the execution time of all the requests that are handling. This is typically, and by the way, this is exactly what data warehouses do. If you go through BigQuery's Redshift documentation, you will find least connection-based balancing across [?clusters | asr: "structures"]. Not really kidding. If you can find it there. Because data warehouse is a classic case where you have short-running queries, also long-running queries also. To pick one, to pick the best packet, it uses this one.

**[00:38:06] Student?:** Thanks.

**[00:38:08] Teacher:** I'll take one more. Rajiv. Go on.

> **Student Question [00:38:12] - Student 2 (Rajiv):** From end user perspective with this setup, let's say I have opened my browser and then submitted a request. I was not sure how much time it would take for the application to come up with a result. I got frustrated. Either I close the browser or hit enter again. So if I close the browser and then the connection from my browser to [?load balancer | asr: "load the answer"] goes off, but the job is still running on the application. Press and enter again, submit the job based on connection or whatever algorithm we use, the same request goes to another VM. Now effectively the [?load balancer | asr: "load presenter"] knows my IP address. So would it give back two results to me?

**[00:38:52] Teacher (answer):** How this, that's your business logic.

[00:38:54] It's, if you are having this kind of state, statefulness, then you have to [?ensure | asr: "enter"] that it goes to that same machine and there is a way for it to identify, but because it is TCP, once it's broken, it's broken. So then you would never have it this way that your connection never breaks off. Right. Then you do [?asynchronous | asr: "a synchronous"] processing.

**[00:39:12] Student 2:** I was thinking that if, if the browser goes off, that means the user was not really interested a lot of time. So is there any way that, I mean, practically are there a way we stop the job?

**[00:39:23] Teacher:** No.

**[00:39:24] Teacher:** Once it's submitted, it's submitted. So there are, if you're having extremely long running job, you can stop it. But normal HTTP web servers, they don't give you those [?toolings | asr: "two links"] to do that. Okay. Okay. But you can obviously implement it. There is nothing difficult in implementing it.

[00:39:39] You can very well implement it. When the TCP breaks off, you get notified right on the socket that okay, the connection has gone on. You know that.

**[00:39:46] Student 2:** Yes, yes.

**[00:39:47] Teacher:** You can implement it. If your underlying execution engine, you have control over that. Then you can do that. That's what Redshift and BigQuery gives you. When you fire a very long running query, there is an option to cancel your run. It stops the execution. It can do that, but it depends on what kind of thing. If you want to do it on a normal HTTP web server, hard to do it because it does not give you those necessary tools to do that, but you can tweak it. And then it's an open source code base. You can tweak it if you want to. Okay. I'll take your question.

<!-- topic-candidate [00:40:20]: Designing a load balancer -->

[00:40:20] Now let's move to designing load balancer. Okay. Now we'll go into the nitty gritties of load balancers, like how to even think of building one, right? And with this what I would want to touch upon is how easy, trust me, extremely easy to build a load balancer. When I first built it, I'll tell you how happy I was. It was exactly, not exactly, it was almost two years back, March 2021. I was preparing for cohort, I was going to take this in my first ever cohort, March 21, and I wanted to show a real demo of load balancer so that I have very detailed understanding. I knew, I read few papers to understand it, but I wanted to get the practical experience that, hey. So I built my load balancer. I'd use normal Golang to build one. When it first ran, I was so happy. I was at my in-laws, it was all, it was basically COVID time, so I could not go out anywhere. I was with my in-laws. I explained load balancer to everyone I could find in my house. I... No one understood the thing, but it's fine.

[00:41:26] But that joy, that happiness that I got when my first load balancer balanced the load across different servers with different algorithms, with consistent hashing, with round robin, weighted round robin, static routing and whatnot. I was all over the house. Because it was so, that feeling is unmatchable. When something that you have almost taken it for granted as a black box and you actually implement it. I immediately benchmarked it with Nginx, HAProxy and whatnot. I understood where the time takes up. Mine was 5x or 6x faster than Nginx. I said, hey, I just had a breakthrough. But no, basically Nginx and HAProxy does much more than what my [unclear: "trade-way"] load balancer does. When I started going deep into Nginx, I understood that part.

[00:42:16] Now, which is what I want all of you to do. Find some time, implement everything. Implement everything that you see out. You would experience that, you would know the details that most people don't know. It's not a competition competition, but engineer within you would be really happy. Right. Okay.

[00:42:34] So what we'll do is we'll do high level of load balancer, also low level, as it's the key implementation part of load balancer also. This time I want to flip it. Or every, in every other cohort, I start with high level, but did, don't get time to go to the low level details of it. This time I want to start with low level details of it. Right. I get to talk about things that matter. High level, dappa dappa, high level boxes everyone can draw, right? But we'll talk about first low level and then see how things fit into high level scheme of things, right? And also talk about how you cannot just have one server as a load balancer.

<!-- topic-candidate [00:43:08]: LB server vs backend server terminology -->

[00:43:08] Okay, but before we do that, before we start our discussion, terminology I would want to fix, because there would be two kinds of servers over here. So first is an LB server, which is your actual load balancer, because load balancer is also a process, it's also a machine in itself. So the server that runs your load balancer is the LB server. And then there are back-end servers, that's a payment service, auth service, profile service, those are your back-end servers. So when I or any one of you would use the term, use LB server as the one that is your load balancer and back-end server as the one where you are forwarding the request to, auth API, what not, right? So back-end server is black box for us. Load balancer as a server is what we are building at the moment, the actual load balancer. So request would come to this LB server and then you need to have different components to do it.

<!-- topic-candidate [00:44:00]: Low-level details - single LB server and backend servers -->

[00:44:00] So first let's start with the low level details of it. Now here, instead of brainstorming, let me just take you folks from 0 to 0.5 and then we'll start discussing things in detail. So what we hear about a load balancer is that, A, I will have a load balancer, which means something server, which is, when I spin up a load balancer, obviously a server, a VM spins up in which a process is running, which is the load balancing process. Now [unclear: "this added"] is a normal, normal, not even a HTTP, a normal TCP server. It's a normal TCP server's process, which is running over here in this machine. This machine has some IP address. Let's say 10.0.0.1. Now this is a static IP address. This IP address would not change. Assume just single machine at the moment. Start with a day zero architecture. Don't think of scale on day zero. Worst way to build a system. Think simple.

[00:45:00] You have one machine having some IP address. Then you have a bunch of API servers, which are running some normal HTTP server. Server they are running, which is serving slash index.html page. Nothing in page, it says just hello world, right? All these servers are doing it, but the process that is running the HTTP process, let's have Flask server, Spring Boot server, pick your favorite framework and write a hello world. Let's say they are running on 8081 port right now. With 8081, this is the port, but every machine

[00:45:41] will have an IP address, because now for anyone, not just LB server, but for anyone to connect to these servers, how do you connect to the servers? You need IP address. And for the first time I'm covering in this detail, but bear with it. So let's say this machine has IP address of 10.0.0.7, 10.0.0.7. I am writing over here. I could have just written over here.

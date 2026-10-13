> **Student Question [03:10:25] - Student 8:** If we are using round robin algorithm, then we will need another session.

**[03:10:31] Teacher (answer):** Why session? We just saw the implementation in the code, right? Go through the recording. We have covered it. It just keeps track of an integer, the index in the array that this is where I sent it. Now this is where I want to send it. Now this is where I want to send it. [check: possible ASR duplicate]

**[03:10:46] Teacher?:** Okay. No other service required.

**[03:10:50] Student 1:** Sure. Thank you. Yeah. Thanks.

> **Student Question [03:10:54] - Student 1:** I wasn't able to understand this load balancer [unclear: "of your computer"]. So will it be okay if I iterate and then ask questions?

**[03:11:01] Teacher:** What you are not able to understand?

**[03:11:03] Student 1:** The load balancer's workflow. The, okay. So let's say this CoreDNS actually has an [?array | asr: "area"] of IP addresses of all the load balancer servers.

**[03:11:16] Teacher:** Right. Against the domain name.

**[03:11:19] Student 1:** Against the domain name. User one comes in, we pick in a round-robin fashion and gives it one IP address. Then user two comes in. We again pick the IP address in round robin manner. So aren't we bottlenecked by that round robin now? Because load balancers were able to solve one problem for us, but load balancers are again in one problem now.

**[03:11:42] Teacher?:** Why is that a problem?

**[03:11:46] Student 1:** I think this is bottleneck because eventually. It might become at one point of time because there was a reason why, why we chose one algorithm over another for load balancer. Let's say I use.

**[03:12:02] Teacher:** Which algorithm? Be specific on that.

**[03:12:04] Student 1:** Okay. So let's say load balancers were running round robin and not a least connections used.

**[03:12:11] Student?:** Okay. Round robin.

**[03:12:13] Student 1:** And for CoreDNS, while when a user comes in and picks IP address of load balancer the server, it said least connections. It uses, why would this pick least connections, least connections and

**[03:12:26] Teacher?:** all is all over here.

**[03:12:28] Teacher:** CoreDNS has no idea about what that is. It just picks one [?IP | asr: "idea"]. [unclear: "I want to appear"] at random and sends it here. That's it. Okay. At random. That's what I said. [?Here | asr: "He heard"], there is no brain. It's a, it's a literal 50 lines of code. Not even exactly. If you open CoreDNS [unclear: "codeways"] 50 lines of code, you will find that does that. Everything else is just mumbo jumbo.

**[03:12:52] Student 1:** And it's nothing. Hmm. Orchestrator communicates with load balancers and backend server. I mean, it checks the health status. Yeah. Why does it even need that? It already has Prometheus. So why does it only use Prometheus to get that? Okay.

**[03:13:07] Teacher:** Prometheus is for vital checking. I'm using Prometheus. Prometheus gives you ability to do health checks, right? But what if you replace it with something, but does not give you health checks as vitals, right. I'm just covering the boxes, right? Because if tomorrow you take it out and then you think that is design is not good enough. So that's why I was very explicit in heartbeats and then vitals pushed to a different service because in most cases, vital ingestion does not do health checks. Prometheus does that, but vitals ingestion does not do health checks in general. Got it.

**[03:13:41] Student 1:** That's fine. And for the communication between database and load balancer servers, we are using Redis as Pub/Sub.

**[03:13:49] Teacher:** Not database and load balancer servers.

**[03:13:52] Student 1:** You are talking about this. Okay. Replicating the database config over here. Yes. Why don't we use normal [?server-sent events | asr: "service and events"]?

**[03:14:03] Teacher:** Wait.

**[03:14:04] Student 1:** Hey.

**[03:14:10] Teacher (answer):** Okay. So in that case, how will your database or any process that is running would have to make multiple calls to these servers to do that? Redis gives you that out of the box, right? Real-time sending to everyone. I just use that as an example. That's what I said. It's just a real-time broadcast that we need. Whoever gives us that, we would use it. We can use [?server-sent events | asr: "server sending"]. So we just leverage what we studied in the last week and put it over here to do reactive communication rather than poll-based communication. We did reactive communication over here. That was the key idea.

[03:14:46] You replace Redis, [?ZooKeeper | asr: "who keep her"], you put explicit HTTP calling. That's what we also discuss in brainstorming. Anything, anything which is reactive works for you. I just use this as one of the options. This is not the only option. Right. I just use it because the guarantee that it provides, I don't have to worry about. Correct.

**[03:15:09] Student 1:** For the heartbeat communication between orchestrator and backend servers, let's say, it will be the exact replica of design online, offline indicator that keep polling and what back end service orchestrator, right?

**[03:15:22] Teacher (answer):** Back end service. Yeah, same thing. That's what it's all building blocks. Right. However, you'd want to drive that. You can drive that. You are repeated, repeatedly making HTTP calls to here to check if they're alive or not and whatnot, and we'll just keep track of it. Same.

**[03:15:38] Student?:** Thanks.

**[03:15:40] Teacher:** Sitesh.

<!-- topic-candidate [03:15:44]: Q&A - orchestrator as single point of failure, leader election -->

> **Student Question [03:15:44] - Student 3 (Sitesh):** Yeah. So maybe I missed this, but like in the whole system, are like load balancing being a high availability system, orchestrator is our point of failure now. Right? Like if orchestrator goes down, like it's fine until load balance.

**[03:16:06] Teacher:** No, no, no. It's not fine. Orchestrator went down. How do you solve it? You cannot have orchestrator.

**[03:16:12] Student 3:** Yeah. That's what I was going to ask. I'll just have three orchestrators, maybe like whatever and orchestrate and have same code running, but rest of them idle until one of them.

**[03:16:22] Teacher (answer):** Not idle, but you might have basically leader-follower. One is [?master | asr: "faster"]. Others are follower. Others are doing the grunt work. If master goes down, followers automatically takes its place. One or two seconds downtime.

**[03:16:34] Student?:** Right.

**[03:16:35] Teacher:** That's what the leader election.

**[03:16:37] Student?:** Oh, I see. I missed that.

**[03:16:39] Teacher:** So here there is multiple servers. So high availability. High availability clusters, autoscaling, high availability, [?LBs | asr: "lvc"] has a high availability, database high availability, orchestrator add leader election, high availability, [?CoreDNS | asr: "code units"] leader election, high availability.

**[~03:16:55] Student 3:** Yeah, yeah, rest of them I was fine, orchestrator was, yeah, and this is exactly where [check: "and this is exactly where" may be the Teacher starting the next turn]

**[03:17:02] Teacher:** And just now that given that we are on that point, leader election is a way to get high availability. Either you can have a manual, either you can have a human who is spinning up a server for you to getting up and running. Otherwise, if one is [?down | asr: "done"], you want other to take its place. That's when leader election comes in. It just automates the entire process and that's why it is important. So here if one node goes down, you want other to automatically take its place. That's when leader election comes in.

<!-- topic-candidate [03:17:27]: Q&A - private CoreDNS, public DNS and API gateway -->

> **Student Question [03:17:27] - Student 3:** Yeah, makes sense. One question on CoreDNS. I may be messing up conceptually, but I did not understand the part that when you said private, like we want away from, public, like public interface. Right. But what I'm missing is yes, we'll add a private DNS service, but at the end of the day, we are returning our IP addresses are those different IP addresses. Like I didn't catch that.

**[03:17:59] Teacher (answer):** Going a little more details of it. What I would recommend is let's go step by step, explore what CoreDNS is. Try to set up one, try to configure a domain, have bunch of backend servers to that, right. See how we scale it. Production guide on CoreDNS website itself in their official documentation. See how you get high availability on CoreDNS. Right now imagine a situation where you are using it as part of a private infrastructure, right? Then think of exposing it to public and see what happens. So because what we missed on us, because I, I now obviously cannot cover all the layers because there are seven more.

[03:18:33] What I was talking about was that this LB servers is not a first layer of interaction. There are many machines that it has to go to. Right. So to oversimplify the discussion, I said [?CoreDNS | asr: "cold in this"] would directly spit out machine of one of the [?load balancers | asr: "loaders"], which is in fact true. But when it doesn't directly talk to that, there is one more proxy that sits in between and you have to balance between them and whatnot. But when you implement it, when you define what your architecture has to be, what needs to be private, what needs to be public.

[03:19:02] For example, lb.payments.google.com you won't expose to a user. You would expose payments.google.com. Correct? payments to LB.payments what happens because payments.google.com is a publicly available DNS. Correct. From there, where would the request come? What would you configure there on public [?DNS | asr: "desk"]? You configure API gateway's IP address. So from the user, the request comes to your API gateway. Now from API gateway, first TCP connection is formed to API gateway. Now from API gateway, there would be a configuration which says API gateway that if you get this path forward it to this load balancer. So this is where your API gateway, when it is connected to load balancer, it will do forward it to this load balancer.

[03:19:44] So load balancer has a domain name. So when API gateway is establishing the [?TCP connection | asr: "DC progression"] with the load balancer, which is where this private CoreDNS comes into the picture. Correct. Okay. Now you see, now here I'm just adding two layers. One for API gateway for public calling and one load balancer for private. Now you can add three or four more because API gateway is typically not the first point of entry as most people think it is. Right, right.

**[03:20:10] Student 3:** I think you'll at least have two more. More proxies, right? Yes. Okay. Yeah. Yeah. I mean, I think so. Yeah. Yeah. Now I see. Now I see. But just to summarize, basically, like I read details myself, but like basically what we covered in the last class, right? Like we want something that has the least configuration or whatever it is, even though partitioned there and rest of the part is compromised. Rest of the good part is with us. That's the idea.

**[03:20:41] Teacher:** But now here you see like where, where I was talking about this private infra, right? Because you can also configure LB, LB address in your public DNS also in case of AWS, in case of GCP, everywhere you can do that. So in that case, your API gateway is totally bypassed. So you're exposing literally LB.payment.google.com to the internet, which is fine. But in reality, you would expose payments and then LBs are basically privatized. So this is how the hop happens. So whoever is established. So the idea is whoever is establishing the connection with LB servers has to talk to this [?DNS | asr: "audience"].

**[03:21:16] Student?:** Right. Okay. Thanks. Thanks. Yeah.

<!-- topic-candidate [03:21:20]: Q&A - load balancer vs reverse proxy -->

> **Student Question [03:21:20] - Student 4:** So, yeah. So I, I like it, it load balancer, right. It looks like a reverse proxy to me, kind of similar to that sort. Right.

**[03:21:35] Teacher (answer):** I mean, what is the load balancers are reverse proxies.

**[03:21:38] Student 4:** Okay. Okay. So there is no like major difference between them.

**[03:21:43] Teacher:** That's because load balancer balances load across homogeneous system, which is exactly what reverse proxy does.

**[03:21:48] Student 4:** Right.

**[03:21:49] Teacher:** And API gateways are powered proxies.

**[03:21:52] Student 4:** Yeah.

**[03:21:55] Student?:** This is what I should always expect. Thanks. Thanks for that. Okay.

**[03:22:00] Teacher:** Harsh, Josh.

<!-- topic-candidate [03:22:02]: Q&A - where authentication sits -->

> **Student Question [03:22:02] - Student 11:** Yeah. So I was just wondering that in this architecture, where generally we keep this authentication part.

**[03:22:12] Teacher:** What do you want to authenticate?

**[03:22:13] Student 11:** Or what do you want to authenticate? User authentication.

**[03:22:18] Teacher (answer):** Why would there be user authentication over here? It's part of a business logic, right? User authentication. So it's a backend services responsibility to do it. Correct.

**[03:22:29] Student 11:** So, but we have more than one backend server for request can go to anyone. Right. So imagine you're writing [?auth service | asr: "all service"].

**[03:22:35] Teacher:** Imagine you're writing [?auth service | asr: "off service"].

**[03:22:38] Student 11:** Okay.

**[03:22:39] Teacher:** Isn't that part of the business logic?

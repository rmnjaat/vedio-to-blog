**[01:32:59] Teacher:** So there has to be a better way. Rather than orchestrator asking from load balancer and [?load balancer | asr: "load register"] telling orchestrator, but why are you just limiting between these two, right?

[01:33:12] Imagine, won't you want to see overall infrastructure utilization, historical trends and whatnot, where would you store the historical data of all the CPU, like how CPU was consumed on each LB server? You store this data in a database. So now where is that data? What kind of database? Where are you storing it?

**[01:33:34] Student 3:** We could use probably the same database that was previously being used.

**[01:33:37] Teacher:** This is the key value. So we're storing this configuration. What you're storing is time series data, CPU utilization, memory, disk network. Right. So that, that's right. So when we think realistically that that's where things start to... Like you, you start to discover these things.

[01:33:58] Think on those lines, where are you storing this information? What kind of information would you need to store? You would just not need that at this instant, what does CPU utilization? Because let's say you made a call. Someone is not responding because it's a hundred percent utilization. You don't even know it's a hundred percent. You, you don't get time enough time to react. You'd want to react when it is like 60, 70, 80%. You need to know historical trends of it. What's the average utilization and what not?

**[01:34:25] Student 1:** Orchestrator can have a database with load balancer telling [?via | asr: "why"] a heartbeat messages, what CPU utilization was at that point of view.

**[01:34:34] Teacher:** Why are you re-implementing things that are already implemented by other systems? Just reuse the stuff. Always. What tool would you use to do this?

**[01:34:48] Student?:** Connection pooling.

**[01:34:49] Teacher:** Nah, let me pull in [?someone | asr: "somewhere"] else. Wait, I'm Alok. [check: probably the teacher calling on a student named Alok]

**[01:34:55] Student 4:** So the things you're talking about, they seem like metrics that there should be some kind of metrics logged and then we should react on the basis of metrics scaling up and scaling down. Correct.

**[01:35:09] Teacher:** So what tool, what thing would you use to do that?

**[01:35:14] Student 4:** I don't know much. So we use CloudWatch based, but we are doing it manually.

**[01:35:18] Teacher:** That's a good one. CloudWatch is that. You do it manually.

**[01:35:25] Student 4:** I don't know about automatic monitoring much.

**[01:35:28] Teacher:** Okay. Okay. Let me pull in Akshay. What would you do?

**[01:35:34] Student 12:** Yeah.

**[01:35:35] Student 3:** I had the same answer. Mostly CloudWatch or have a telemetry agent that is monitoring.

> **Student Question [01:35:44] - Student?:** What is this telemetry agent? Where it is installed? What it does?

**[01:35:49] Student 3:** Basically it, I think it will mostly like emit metrics from the host. Yes.

**[01:36:00] Teacher:** Let's say this is the telemetry agent that is running on the host, which is emitting metrics, emitting metrics to where?

**[01:36:08] Student 3:** Probably some log storage. And then from there like we can have alarms or something.

<!-- topic-candidate [01:36:19]: Central metrics store - telemetry agents and Prometheus -->

**[01:36:19] Teacher:** No, don't go into alarm, don't go into alarm, don't go into alarm. Okay, okay. But the thing is you need a way, a generic way where you would anyway have it as an organization who is building [?load balancer | asr: "load by"], so you would anyway have a place where all these key vitals and metrics are getting ingested. You'll anyway have that. For example, you may use something called as Prometheus. It's a brilliant tool, FYI, brilliant. So what you are doing effectively is instead. So what the, how this discussion transpired is very interesting. A lot of folks were just limiting to this system, just limiting to this. What did we just emit metric to this orchestra, orchestra would store it in this database. Don't limit it. Think, if you think realistically you will automatically start to make sense into a very cost efficient solution, right? So just few things over there. First we need to monitor CPU, memory, disk and whatnot about a particular machine. We just don't want data of that particular instance because we need to know historically how it was, what's the average, so that you can scale up and scale down according. So which means there is anyway a need for you to all the vitals of a particular machine somewhere in a system.

[01:37:40] Now for all the system, not just LB servers, even CPU memory utilization of your back-end servers are also equally important. All of that is equally important. So you have to send all of the vitals of every single VM of your machine in a central location so that orchestrator can take a look at that and make calls if you want to scale up backend servers, if you want to add more LB servers or whatnot. So having that one place of ingestion and query would solve the problem.

[01:38:15] So that's why use something like Prometheus [unclear: "Overkill"] in which the telemetry agents running on each of the VM, not just LB, even backend server VMs, take those telemetry agents, let them push the data to Prometheus. Orchestrator periodically checks the status of the overall average utilization of this, average utilization of this and then takes a call. If we need to scale up LB server or scale down LB server, add more backend servers to that or what. Typically what autoscaling group does. So autoscaling group in AWS world or the autoscaling policies is just you configure. If the average CPU utilization is this, do this. This, what it does internally, just queries Prometheus, Prometheus as in their proprietary stuff. And it gets that when it needs that condition, it takes us necessary actions.

[01:39:09] In case of orchestrator, because this is trans, this is opaque to your users. You just don't know about multiple LB servers there. Orchestrator would have to do that same thing and scale up and down your LB servers over here. Right. This way, instead of doing something specific, just for this load balancer, try to build a generic, try to add it to this generic system. So use Prometheus or something like that over here to store this. In case you are unaware of Prometheus, go to Prometheus.io. See how beautiful that tool is. It's a brilliant, brilliant, brilliant tool that scales amazingly.

[01:39:44] So now if you see, if you look carefully, we are now very well converging into actual things that we require as well. First, we discussed the low level details. We still talked about the place to store the configuration. Then we wanted to make it reactive. We wanted to find health checks. We added the orchestrator to scale up backend servers and LB servers and whatnot. Then we extended this part where I would want to scale out LB servers. I need a way to see the historical things. So everyone needs to send telemetry to someplace. So that's what Prometheus comes in. Orchestrator periodically checks the Prometheus to get this thing done and things scale up. Right? So, [unclear: "our load pass"] is very nice analogy.

<!-- topic-candidate [01:40:27]: Client reaching multiple LB servers - DNS -->

[01:40:27] The only thing that is remaining to discuss is, now you have two LB servers. Client has IP address of one of them. How will client make request to other LB servers? Because at the end, the connection is created, the TCP connection is created on the LB server. Because it is created on the LB server, how would your client connect to this LB server? Because now you have two. Your client has IP, like client, you would just give one IP address to that. Shreya, what would you do?

**[01:41:07] Student 8 (Shreya):** I think it is configured in DNS servers. So we have a mapping of load balancers in DNS servers and while client is routing request via DNS, it picks up a load balancer.

**[01:41:21] Teacher:** Okay. So you are saying add a DNS server to this. Now what is DNS server will hold?

**[01:41:27] Student 8:** This will hold what are the multiple ports of these load balancers and it...

**[01:41:33] Teacher?:** ...will be multiple machine IP addresses, not just ports.

**[01:41:37] Teacher:** So let's say this 10.0.0.1, 10.0.0.2. Okay. So what would you say? You would show 10.0.0.1 against what?

**[01:41:47] Student 8:** Against the URL of like, let's say, google.com. And then these, these IP address, why...

**[01:41:55] Teacher:** google.com is not public, load balancers are private, right? Load balancers are private.

**[01:42:03] Student 8:** I think load balancers should be public and internal server should be private, right?

**[~01:42:07] Teacher:** Okay. Are all load balancers public?

**[~01:42:07] Student 8:** The ones which are handling, which are active should be a public.

**[01:42:17] Teacher:** Okay. What if there is a microservice that I'm talking about, I'm building. Should I keep that load balancer? Like imagine there is a very critical service that load balancer you [?created | asr: "credit"]. That should not be public, but you are putting this, you are added DNS. Now what? Because of the DNS you're enforcing it to be public. That's what it seems like.

**[01:42:38] Student 8:** So the DNS will hold only IP addresses of, sorry, IP addresses which are public.

**[01:42:47] Teacher:** What about private node, will they only have just one LB server? What if that goes down? Right? Yeah. Right. Okay. DNS is the correct answer, but let's go detail into it.

[01:43:01] So first of all, and I know we are having detailed discussion, but I would want to, like time is okay. 15, 20 minutes today's session will stretch, but it's fine. We want to, I want to touch upon this, these details that matters, right? So a lot of misconceptions, let me sort one like them one by one. So DNS is the correct answer. Now here think, when you spin up a load balancer you can only give one thing to your client. Behind the scenes you may have, so you, the first thing that you may think of, hey, I'm spinning up a virtual machine, let me give out the IP address of this. So that's a natural thing, but now IP

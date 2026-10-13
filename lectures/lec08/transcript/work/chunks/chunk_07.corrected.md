**[01:10:17] Teacher:** Yes, Shalendra.

**[01:10:19] Student 6 (Shalendra):** So how would I be storing this server configuration, right?

**[01:10:23] Teacher:** So what would you store? First, let's start with that.

**[01:10:27] Student 6:** The backend server configurations, IP address and...

**[01:10:33] Teacher:** IP address and port, right? Backend servers. Yeah. All the backend servers that you have, you would have IP address and port mapping of all of them. Okay. Anything else?

**[01:10:44] Student 6:** Algorithms.

**[01:10:45] Teacher:** Okay. Balancing algorithm. Great. This is the bare minimum that you need, right? Bare minimum. Right. Otherwise you can add more, more fancy stuff to that. Let's start with bare minimum because then you can obviously infinitely build that system, make it more and more complex, but this is the bare minimum that you need, that what algorithm you are using and what are the backend servers that are connected to that. Right. Okay. Where would you store this?

**[01:11:09] Student 6:** So, okay. If I go from the beginning, let's think about the simple system. I will just use a database for that.

**[01:11:19] Student?:** Okay.

**[01:11:20] Student 6:** So, we'll be adding some latency there. So, we can use a database, but we can also store those information in the server itself. I mean, it will keep pulling from the database before getting the request call.

**[01:11:38] Teacher:** Okay, you are storing this information in a DB, but now you also pointed out that it's painful. Why it is painful?

**[01:11:47] Student 6:** If you think like I should be having some confidence, I mean, like if I'm adding load balancer, then it shouldn't add some any latency. Otherwise, if it starts adding latency, then request will take more time to process.

**[01:12:03] Teacher:** So you are saying the latency of when request comes from user to LB server, if LB server for every request makes a call to database to get this information, that is slow, right? Because that would slow things down. And this network call itself is very expensive, three milliseconds to five milliseconds. So doing that every time you are adding. So anyway, your load balancer is itself adding latency, that network hop on top of that, if you add this, it would just slow things down.

[01:12:31] [check: segment starts mid-sentence] balancer. So you want this to be bare minimum. So what you are proposing is?

**[01:12:37] Student 6:** I mean, when system gets started or it should keep on pulling data from the DB in interval.

**[01:12:45] Teacher:** Okay. You are saying that when your LB server started, you should pull data from your database for the specific load balancer and keep an in-memory copy so that when the request comes in, you don't have to make a network call. And from here, you can directly pick that up. In the demo, right, you have a simple list, it just picks one that random from the list, or depending on the balancing strategy, and this using it. So this way I save this network. Okay, what is the disadvantage of this, of having this in sync?

**[~01:13:13] Student 6:** Like from the console, if configuration gets changed, like any server goes down, it's correct, it will be a problem. So we need something which like keep on updating the server.

**[~01:13:26] Teacher:** So which means that what if this backend server 2 went down, now how will your in-memory copy... because when this server went down, first of all, how would you know that a backend server went down?

**[01:13:39] Student 6:** Server should send some, I mean,

**[01:13:42] Teacher:** Correct.

**[01:13:42] Student 6:** It should send some man. [check: "man" may be the teacher's]

**[01:13:44] Teacher:** You're killing it today. You're killing it today. [check: possible ASR duplicate] Okay. Brilliant.

**[01:13:47] Student 6:** I mean, there should be some health check service. Like I should keep on sending the details of the server.

**[01:13:52] Teacher:** Correct. Correct. I'm so happy, man. So happy. You are, you are exactly taking it in the direction I wanted it to go.

<!-- topic-candidate [01:14:01]: Orchestrator and health checks -->

[01:14:01] Okay. So, the first question that came to us is, hey, this has a problem. What if a backend server goes down, but how would you first detect that a backend server went down? You said you need something to do that. So who would that be something? So let's call it. That's why I like this is just a fancy, but that I always used for orchestrator. [check: phrase sounds garbled - possibly "fancy word that I always use"] Now you need some kind of health check. Now what orchestrator would do is, you said it would need health checks to backend servers. Yes. Right, but how would that health check look like? What would it health check on?

**[01:14:35] Student 6:** Health check basically it will be telling you, telling any backend server that it is it up or not. So is it working?

**[01:14:43] Teacher:** What kind of health check would that be? When I say what kind of health check is my server is up. What do you mean when you say my server is up?

**[01:14:51] Student 6:** So if it is handling request properly, it's just a REST API. Okay, so if it is sending the response 200, then I can think of like it's working properly and I can direct my request to the server.

**[01:15:03] Teacher:** For all requests 200?

**[01:15:05] Student 6:** Some time, okay.

**[01:15:09] Teacher:** Health check endpoint needs to be there? So are you saying on health check endpoint it should be 200 or for all user requests it should be 200?

**[01:15:21] Student 6:** No, it's not for user request. It's for the health only.

**[01:15:24] Teacher:** Okay. Okay. Health check endpoint. Okay. Got it. So health check endpoint, hardware, however you'd want to implement. Right? But you need something. So this means we need to have, so we need to know the health check endpoint. Okay. Let me pull in Anubhav. Anubhav, where would we have this, like, what would be the health check endpoint over here? For a backend set. For this orchestrator. Like, do we configure something like this?

**[01:15:54] Student 7 (Anubhav):** Actually, we don't necessarily need to have a specialized health check endpoint. We can configure a very lightweight endpoint on the backend that just responds with a ping, but also just make TCP pings to the port and IP to see if we get back any packet.

**[01:16:12] Teacher:** Have you configured a [?load balancer | asr: "load by answer"] ever?

**[01:16:15] Student 7:** Not really.

**[01:16:17] Teacher:** That's fine. That's fine. Okay. Okay, so what kind of things would this backend server expose? It's your API server, correct? Because it is possible. Now, let me just basically go into bit more granular details of it so that we all understand what it needs to expose and what configuration would be needed to have.

[01:16:36] So backend servers at the end is a virtual machine in which you can run hundreds of processes. But with respect to this load balancer, there is one process that matters, saying this is a profile service. So the HTTP server that is handling the profile service needs to be up and running, which means that this might have some SSH process running, some HTTP server running, some nginx running, something running, but what we, what for this load balancer what matters, what matters is the core web server that is balancing against, which is on port 8081 that we discussed right now. That is why on every HTTP server that we create, we always have some health check, let's say slash status or slash [?health | asr: "help"], something like that, endpoint defined.

[01:17:29] Now what you do is you typically configure this endpoint on the load balancer site, which tells you that this is my health check endpoint. So apart from load balancing [?algo | asr: "I'll go"], you have health check endpoint, which is what you provide when you spin up a load balancer. Now here why do we need this? Because it is possible that in your backend server your virtual machine is up. You say, hey, why orchestrator is not checking on virtual machine, because it would have the infrastructure access, can just check if virtual machine is up or not. Because it is possible that your virtual... [check: sentence cut off between 01:18:03 and 01:18:09]

[01:18:09] But because of divided by zero exception, your process crashed, or because of null pointer exception, your process crashed. So if your process crashed, which matter to this load balancer, which is your backend service, if that crashed, you need to know that this server is now unhealthy, because if it sends request to that, because that process itself is killed, it cannot entertain that request. Which means that we just don't need that VM to be up, but we need our process to be up. So that is why we have explicit health checks, which you configure in your [?DB's | asr: "DBS"] part of load balancing configuration, and orchestrator uses this to fire continuous health checks onto your backend servers to see if your actual service is up or not. Not the server, but your service is [?up | asr: "upper"].

[01:19:05] Now again, pick online off-line indicator. However, you may want to implement it either. Typically orchestrator itself makes those HTTP calls to each of the servers and needs to get a 200 response. There are other protocols that also accepts, but I'm just simplifying it with HTTP, but specification that can listen to. But the idea is that orchestrator would need access to this database so that it knows these are the servers. This is the health check endpoint that I would have to call to. When one of the server is down, the health check would fail. Orchestrator would immediately go and update the database.

<!-- topic-candidate [01:19:52]: Updating LB servers' in-memory config after a DB change -->

[01:19:52] And now comes the problem. Now let me paint the picture. So orchestrator does periodic heartbeats, periodic health check sends to each of these backend servers. It found that backend server 2 responded with, or it did not respond because the process, the service died. Because the service died, now what orchestrator would do, that because this backend server 2 is unhealthy, it removes that entry from the database for backend server 2. So orchestrator, the mastermind of the system, updated in the database saying that backend server two is dead. So it removed that entry. Now, how would this change that orchestrator made in the DB get updated in the LB servers in memory, in-memory hash map that it has? Anwar, how would you do that?

**[01:20:46] Student 7 (Anwar):** Like the most naive way would be for the LB server to keep pulling, but that would not be an optimal way to.

**[01:20:53] Teacher:** Why? Why that is, why that wouldn't work?

**[01:20:57] Student 7:** Because the process is consuming some latency to first figure out if the, like intermittently it is first figuring out if backend servers are alive or not. And at the same time, it is also getting a barrage of requests from end users. So some of those requests will experience more latency when it is.

**[01:21:16] Teacher:** No, no, no. Orchestrator is doing it. User requests are coming to LB server. Orchestrator, there is no effect on that.

**[01:21:23] Student 7:** But the LB server would be polling to figure out this, right? Okay. Okay.

**[01:21:28] Teacher:** This one, this one you're talking about. Okay. This would be keeping on polling on doing this. Okay. So then is there a better way?

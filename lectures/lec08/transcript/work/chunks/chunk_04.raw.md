# chunk_04  OWNS 00:35:32 -> 00:46:19  (segments #591-#763, 1901 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:34:32] TEACHER: The HTTP is not the only protocol.   {#568}
CTX| [00:34:34] TEACHER: Correct.   {#569}
CTX| [00:34:35] TEACHER: It's a raw TCP.   {#570}
CTX| [00:34:36] TEACHER: You fired a request.   {#571}
CTX| [00:34:38] TEACHER: TCP connection automatically never breaks off, right?   {#572}
CTX| [00:34:41] TEACHER: Someone has to break it off.   {#573}
CTX| [00:34:43] TEACHER: Correct.   {#574}
CTX| [00:34:44] TEACHER: Either network interruption or client terminating or server terminating.   {#575}
CTX| [00:34:48] TEACHER: If client and server don't terminate, if network does not go buzzard, your TCP   {#576}
CTX| [00:34:52] TEACHER: connection would remain active forever.   {#577}
CTX| [00:34:54] TEACHER: Correct.   {#578}
CTX| [00:34:56] TEACHER: Don't just think of HTTP.   {#579}
CTX| [00:34:58] TEACHER: HTTP itself tells your client and server to terminate a connection as soon as you got   {#580}
CTX| [00:35:02] TEACHER: the response.   {#581}
CTX| [00:35:03] TEACHER: But with keepalive, you can still keep it open.   {#582}
CTX| [00:35:06] TEACHER: I have had long running extremely long running HTTP request also, but not from the end user   {#583}
CTX| [00:35:12] TEACHER: context.   {#584}
CTX| [00:35:12] TEACHER: It was server to server communication.   {#585}
CTX| [00:35:14] TEACHER: GRPC, classic example, works on top of HTTP to the connection never terminates unless   {#586}
CTX| [00:35:19] TEACHER: someone explicitly does that.   {#587}
CTX| [00:35:22] STUDENT_19: Right?   {#588}
CTX| [00:35:22] TEACHER: so imagine raw tcp imagine non-terminating http connections   {#589}
CTX| [00:35:28] STUDENT_3: okay   {#590}

---- OWNED SEGMENTS START ----
[00:35:32] TEACHER: any other question   {#591}
[00:35:36] STUDENT_5: great we'll move forward hello okay please raise your hand the next time it becomes easier for me   {#592}
[00:35:42] STUDENT_3: yeah i was trying to find that option but i didn't   {#593}
[00:35:45] STUDENT_3: so my question is can you please change the slide yeah on this lease connection part   {#594}
[00:35:53] STUDENT_3: Let's say you have said that one request goes to the first one and it took around one hour   {#595}
[00:36:00] STUDENT_3: to execute and the second request goes to second one, which is a quicker one, one minute,   {#596}
[00:36:07] STUDENT_3: one second, whatever.   {#597}
[00:36:08] STUDENT_3: And the third one is took two hours to finish.   {#598}
[00:36:13] STUDENT_3: So in this algorithm, let's say we have the fourth request and load balancer will assign   {#599}
[00:36:18] STUDENT_3: it to the second one.   {#600}
[00:36:19] STUDENT_3: and that also took around two hours the huge one now in case of fifth request we have included that   {#601}
[00:36:28] STUDENT_3: load balancer will decide it either to send it to the least connection but currently we have   {#602}
[00:36:34] STUDENT_3: the least connection over the first node and the third node correct so pick one at random   {#603}
[00:36:41] STUDENT_3: What's the problem?   {#604}
[00:36:42] STUDENT_3: It's random, but let's say both is having a first one is having a query that is taking   {#605}
[00:36:50] STUDENT_3: one hour.   {#606}
[00:36:50] TEACHER: So then you need more servers to handle, right?   {#607}
[00:36:53] TEACHER: Here you are assuming that a server can handle only one query.   {#608}
[00:36:56] TEACHER: Why?   {#609}
[00:36:57] STUDENT_3: No, not exactly assuming that this handling.   {#610}
[00:37:00] STUDENT_3: Yeah.   {#611}
[00:37:00] STUDENT_3: I was just checking for the time it took.   {#612}
[00:37:03] STUDENT_3: Let's say load balancer assign, redirect that query to the third server.   {#613}
[00:37:08] STUDENT_3: right then the first one is about to finish but load balancer is not aware about that that cpu and   {#614}
[00:37:14] STUDENT_3: all it does not it does not it has no idea about it yeah yeah in that case it still stays like   {#615}
[00:37:21] TEACHER: third place why would you want to go for global optimization local optimization still works   {#616}
[00:37:25] TEACHER: yeah yeah right and then if you are having such huge amount of workloads then you would not just   {#617}
[00:37:32] TEACHER: have three source you'd have far too many yeah right and you would just try to maximize on the   {#618}
[00:37:38] TEACHER: execution time of all the   {#619}
[00:37:39] TEACHER: requests that are handling.   {#620}
[00:37:42] TEACHER: This is typically   {#621}
[00:37:43] TEACHER: and by the way, this is exactly what   {#622}
[00:37:45] TEACHER: data warehouses do. If you go through   {#623}
[00:37:47] TEACHER: BigQuery's Redshift documentation,   {#624}
[00:37:49] TEACHER: you will find least connection-based balancing   {#625}
[00:37:51] TEACHER: across structures. Not really kidding.   {#626}
[00:37:54] TEACHER: If you can find it there.   {#627}
[00:37:55] TEACHER: Because data warehouse is a classic   {#628}
[00:37:57] TEACHER: case where you have short-running queries,   {#629}
[00:37:59] TEACHER: also long-running queries also.   {#630}
[00:38:01] TEACHER: To pick one,   {#631}
[00:38:03] TEACHER: to pick the best packet,   {#632}
[00:38:05] TEACHER: it uses this one.   {#633}
[00:38:06] STUDENT_14: Thanks.   {#634}
[00:38:08] TEACHER: I'll take one more Rajiv.   {#635}
[00:38:10] TEACHER: Go on.   {#636}
[00:38:12] STUDENT_2: From end user perspective with this setup, let's say I have opened my browser and then   {#637}
[00:38:16] STUDENT_2: submitted a request.   {#638}
[00:38:18] STUDENT_2: I was not sure how much time it would take for the application to come up with a result.   {#639}
[00:38:24] STUDENT_2: I got frustrated.   {#640}
[00:38:25] STUDENT_2: Either I close the browser or hit enter again.   {#641}
[00:38:28] STUDENT_2: So if I close the browser and then the connection from my browser to load the answer goes off,   {#642}
[00:38:33] STUDENT_2: but the job is still running on the application.   {#643}
[00:38:37] STUDENT_2: press and enter again, submit the job based on connection or whatever algorithm we use   {#644}
[00:38:42] STUDENT_2: the same request goes to another VM.   {#645}
[00:38:45] STUDENT_2: Now effectively the load presenter knows my IP address.   {#646}
[00:38:49] STUDENT_2: So would it give back two results to me?   {#647}
[00:38:52] STUDENT_2: How this, that's your business logic.   {#648}
[00:38:54] TEACHER: It's if you are having this kind of state statefulness, then you have to enter that   {#649}
[00:38:58] TEACHER: it goes to that same machine and there is a way for it to identify, but because it is   {#650}
[00:39:02] TEACHER: TCP, once it's broken, it's broken.   {#651}
[00:39:05] TEACHER: So then you would never have it this way that your connection never breaks off.   {#652}
[00:39:09] TEACHER: Right.   {#653}
[00:39:10] TEACHER: Then you do a synchronous processing.   {#654}
[00:39:12] STUDENT_2: I was thinking that if, if the browser goes off, that means the user was not really interested   {#655}
[00:39:17] STUDENT_2: a lot of time.   {#656}
[00:39:19] STUDENT_2: So is there any way that I mean, practically are there a way we stop the job?   {#657}
[00:39:23] STUDENT_2: No.   {#658}
[00:39:24] TEACHER: Once it's submitted, it's submitted.   {#659}
[00:39:26] TEACHER: So there are, if you're having extremely long running job, you can stop it.   {#660}
[00:39:29] TEACHER: But normal HTP web servers, they don't give you those two links to do that.   {#661}
[00:39:33] TEACHER: Okay.   {#662}
[00:39:33] TEACHER: Okay.   {#663}
[00:39:34] TEACHER: But you can obviously implement it.   {#664}
[00:39:37] TEACHER: There is nothing difficult in implementing it.   {#665}
[00:39:39] STUDENT_2: You can very well implement it.   {#666}
[00:39:40] STUDENT_2: When the TCP breaks off, you get notified right on the socket that okay, the connection   {#667}
[00:39:44] STUDENT_2: has gone on.   {#668}
[00:39:45] STUDENT_2: You know that.   {#669}
[00:39:46] STUDENT_2: Yes, yes.   {#670}
[00:39:47] TEACHER: You can implement it.   {#671}
[00:39:48] TEACHER: If your underlying execution engine, you have control over that.   {#672}
[00:39:52] TEACHER: Then you can do that.   {#673}
[00:39:55] TEACHER: That's what Redshift and BigQuery gives you.   {#674}
[00:39:58] TEACHER: When you fire a very long running query, there is an option to cancel your run.   {#675}
[00:40:01] TEACHER: It stops the execution.   {#676}
[00:40:04] TEACHER: It can do that, but it depends on what kind of thing.   {#677}
[00:40:07] TEACHER: If you want to do it on a normal HTTP web server, hard to do it because it does not   {#678}
[00:40:10] TEACHER: give you those necessary tools to do that, but you can tweak it.   {#679}
[00:40:14] TEACHER: And then it's an open source code base.   {#680}
[00:40:15] TEACHER: You can tweak it if you want to.   {#681}
[00:40:18] TEACHER: Okay.   {#682}
[00:40:18] TEACHER: I'll take your question.   {#683}
[00:40:20] TEACHER: Now let's move to designing load balancer.   {#684}
[00:40:23] TEACHER: Okay.   {#685}
[00:40:24] TEACHER: Now we'll go into the nitty gritties of load balancers, like how to even think of building.   {#686}
[00:40:30] TEACHER: one right and with this what i would want to touch upon is how easy trust me extremely easy to build   {#687}
[00:40:38] TEACHER: a load balancer when i first built it i'll tell you how happy i was it was exactly not exactly   {#688}
[00:40:44] TEACHER: it was almost two years back uh march 2021 i was preparing for cohort i was going to take this in   {#689}
[00:40:54] TEACHER: my first ever cohort March 21 and I wanted to show a real demo of load balancer so that I have very   {#690}
[00:41:00] TEACHER: detailed understanding I knew I read few papers to understand it but I wanted to get the practical   {#691}
[00:41:05] TEACHER: experience that hey so I built my load balancer I'd use normal go line to build one when it first   {#692}
[00:41:11] TEACHER: ran I was so happy I was at my in-laws it was all it was basically covid time so I could not go out   {#693}
[00:41:17] TEACHER: anywhere I was with my in-laws I explained load balancer to everyone I could find in my house I   {#694}
[00:41:24] TEACHER: No one understood the thing, but it's fine.   {#695}
[00:41:26] TEACHER: But that joy, that happiness that I got when my first load balancer   {#696}
[00:41:30] TEACHER: balanced the load across different servers with different algorithms,   {#697}
[00:41:35] TEACHER: with consistent hashing, with round robin, weighted round robin,   {#698}
[00:41:39] TEACHER: static routing and whatnot.   {#699}
[00:41:41] TEACHER: I was all over the house.   {#700}
[00:41:44] TEACHER: Because it was so, that feeling is unmatchable.   {#701}
[00:41:47] TEACHER: When something that you have almost taken it for granted as a black box   {#702}
[00:41:51] TEACHER: and you actually implement it.   {#703}
[00:41:54] TEACHER: I immediately benchmarked it with Nginx, HAProxy and whatnot.   {#704}
[00:41:58] TEACHER: I understood where the time takes up.   {#705}
[00:42:01] TEACHER: Mine was 5x or 6x faster than Nginx.   {#706}
[00:42:06] TEACHER: I said, hey, I just had a breakthrough.   {#707}
[00:42:08] TEACHER: But no, basically Nginx and HAProxy does much more than what my   {#708}
[00:42:12] TEACHER: trade-way load balancer does.   {#709}
[00:42:13] TEACHER: When I started going deep into Nginx, I understood that part.   {#710}
[00:42:16] TEACHER: Now, which is what I want all of you to do.   {#711}
[00:42:19] TEACHER: Find some time, implement everything.   {#712}
[00:42:21] TEACHER: Implement everything that you see out.   {#713}
[00:42:24] TEACHER: You would experience that you would know the details that most people don't know.   {#714}
[00:42:27] TEACHER: It's not a competition competition, but engineer within you would be really happy.   {#715}
[00:42:32] TEACHER: Right.   {#716}
[00:42:32] TEACHER: Okay.   {#717}
[00:42:34] TEACHER: So what we'll do is we'll do high level of load balancer also low level as it's the key   {#718}
[00:42:39] TEACHER: implementation part of load balancer also.   {#719}
[00:42:42] TEACHER: This time I want to flip it or every in every other cohort, I start with high level, but   {#720}
[00:42:48] TEACHER: did don't get time to go to the low level details of it.   {#721}
[00:42:50] TEACHER: This time I want to start with low level details of it.   {#722}
[00:42:53] TEACHER: Right.   {#723}
[00:42:54] TEACHER: i get to talk about things that matter high level dappa dappa high level boxes everyone can draw   {#724}
[00:42:59] TEACHER: right but we'll talk about first low level and then see how things fit into high level scheme   {#725}
[00:43:03] TEACHER: of things right and also talk about how you cannot just have one server as a load balancer   {#726}
[00:43:08] TEACHER: okay but before we do that before we start uh our discussion terminology i would want to fix   {#727}
[00:43:15] TEACHER: because there would be two kinds of servers over here so first is an lb server which is your actual   {#728}
[00:43:21] TEACHER: load balancer because load balancer is also a process it's also a machine in itself so the   {#729}
[00:43:26] TEACHER: server that runs your load balancer is the lb server and then there are back-end servers that's   {#730}
[00:43:31] TEACHER: a payment service auth service profile service those are your back-end servers so when i or   {#731}
[00:43:36] TEACHER: any one of you would use the term use lb server as the one that is your load balancer and back-end   {#732}
[00:43:43] TEACHER: server as the one where you are forwarding the request to auth api what not right so back-end   {#733}
[00:43:48] TEACHER: server is black box for us.   {#734}
[00:43:50] TEACHER: Load balance as a server is what we are building at the moment, the actual load balance.   {#735}
[00:43:55] TEACHER: So request would come to this LB server and then you need to have different components   {#736}
[00:43:59] TEACHER: to do it.   {#737}
[00:44:00] TEACHER: So first let's start with the low level details of it.   {#738}
[00:44:04] TEACHER: Now here, instead of brainstorming, let me just take you folks from 0 to 0.5 and then   {#739}
[00:44:11] TEACHER: we'll start discussing things in detail.   {#740}
[00:44:14] TEACHER: So what we hear about a load balancer is that, A, I will have a load balancer, which means something server, which is when I spin up a load balancer, obviously a server, a VM spins up in which a process is running, which is the load balancing process.   {#741}
[00:44:31] TEACHER: Now this added is a normal, normal, not even a HTTP, a normal TCP server.   {#742}
[00:44:38] TEACHER: It's a normal TCP server's process, which is running over here in this machine.   {#743}
[00:44:44] TEACHER: This machine has some IP address.   {#744}
[00:44:46] TEACHER: Let's say 10.0.0.1.   {#745}
[00:44:48] TEACHER: Now this is a static IP address.   {#746}
[00:44:50] TEACHER: This IP address would not change.   {#747}
[00:44:52] TEACHER: Assume just single machine at the moment.   {#748}
[00:44:54] TEACHER: Start with a day zero architecture.   {#749}
[00:44:56] TEACHER: Don't think of scale on day zero.   {#750}
[00:44:57] TEACHER: Worst way to build a system.   {#751}
[00:44:59] TEACHER: Think simple.   {#752}
[00:45:00] TEACHER: You have one machine having some IP address.   {#753}
[00:45:03] TEACHER: Then you have a bunch of API servers.   {#754}
[00:45:09] TEACHER: Which are running some normal HTTP server.   {#755}
[00:45:14] TEACHER: server they are running which is serving slash index.html page nothing in page it says just   {#756}
[00:45:18] TEACHER: hello world right all these servers are doing it but the process that is running the http process   {#757}
[00:45:24] TEACHER: let's have flask server springboard server pick your favorite framework and write a hello world   {#758}
[00:45:29] TEACHER: let's say they are running on 8081 port right now with 8081 this is the port but every machine   {#759}
[00:45:41] TEACHER: will have an IP address because now for anyone, not just LB server, but for anyone to connect   {#760}
[00:45:47] TEACHER: to these servers, how do you connect to the servers? You need IP address and for the first   {#761}
[00:45:54] TEACHER: time I'm covering in this detail, but bear with it. So let's say this machine has IP address of   {#762}
[00:46:01] STUDENT_5: 10.0.0.7, 10.0.0.7. I am writing over here. I could have just written over here.   {#763}
---- OWNED SEGMENTS END ----

CTX| [00:46:19] TEACHER: That's fine.   {#764}
CTX| [00:46:20] TEACHER: See, that's it.   {#765}
CTX| [00:46:21] TEACHER: Okay.   {#766}
CTX| [00:46:22] TEACHER: So let's say my first machine is 10.0.0.7, 10.0.0.8 and 10.0.0.9.   {#767}
CTX| [00:46:31] TEACHER: So this are my three backend servers.   {#768}
CTX| [00:46:35] TEACHER: Let's say serving slash index dot HTML page doing hello world or something, some random   {#769}
CTX| [00:46:39] TEACHER: service.   {#770}
CTX| [00:46:41] TEACHER: Now for anyone, anyone to connect to the server, you need IP address and port number.   {#771}
CTX| [00:46:49] TEACHER: So assume that in the load barrensor that you are writing, you have a hash map or rather   {#772}
CTX| [00:46:55] TEACHER: you have a list for YYM.   {#773}
CTX| [00:46:57] TEACHER: We call you a hash map.   {#774}
CTX| [00:46:58] TEACHER: Let's say you have a list of all the backend servers.   {#775}
CTX| [00:47:02] TEACHER: So you have list of all the backend servers that are there, which means 10.0.0.7 colon   {#776}
CTX| [00:47:10] TEACHER: 10.0.0.8.8081.   {#777}
CTX| [00:47:14] TEACHER: This is typically our architecture or the configuration that we do on the console side of things.   {#778}

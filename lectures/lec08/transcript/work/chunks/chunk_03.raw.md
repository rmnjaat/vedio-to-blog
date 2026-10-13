# chunk_03  OWNS 00:23:23 -> 00:35:32  (segments #371-#590, 2111 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:22:25] TEACHER: What happens is because you have uniform infrastructure, each machine having the same configuration   {#358}
CTX| [00:22:32] TEACHER: in most cases it is true.   {#359}
CTX| [00:22:35] TEACHER: What you get is you can literally send the request to one after another because there   {#360}
CTX| [00:22:40] TEACHER: is a very less variance in the response time of your APIs.   {#361}
CTX| [00:22:45] TEACHER: So it typically would not take very long on one server while very short time on another   {#362}
CTX| [00:22:52] TEACHER: server.   {#363}
CTX| [00:22:52] TEACHER: So given that you can literally do round robin and distribute, almost distribute the load   {#364}
CTX| [00:22:58] TEACHER: equally among the three subs.   {#365}
CTX| [00:22:59] TEACHER: That's the easiest of the 1.5.   {#366}
CTX| [00:23:02] TEACHER: Now there is another scheme to that called weighted round robin.   {#367}
CTX| [00:23:06] TEACHER: Now weighted round robin is where you configure the weights of a machine.   {#368}
CTX| [00:23:12] TEACHER: Let's say behind a load balancer, I have three machines, one with 4 GB RAM, second with 8 GB   {#369}
CTX| [00:23:18] TEACHER: RAM, third with 4 GB RAM.   {#370}

---- OWNED SEGMENTS START ----
[00:23:23] TEACHER: infrastructure due to some reason.   {#371}
[00:23:25] TEACHER: Let's say I have purchased a bunch of   {#372}
[00:23:26] TEACHER: reserved instances because of which   {#373}
[00:23:28] TEACHER: if I don't use them then there's a problem   {#374}
[00:23:30] TEACHER: I'm using money.   {#375}
[00:23:32] TEACHER: So you have this kind of setup   {#376}
[00:23:36] TEACHER: 4GB, 8GB and 4GB machine.   {#377}
[00:23:38] TEACHER: So now effectively if you just do   {#378}
[00:23:40] TEACHER: round robin then if these machines   {#379}
[00:23:43] TEACHER: operate at 80% capacity this machine   {#380}
[00:23:45] TEACHER: would be operating at 40% capacity.   {#381}
[00:23:47] TEACHER: Why? Because it is having 8GB RAM   {#382}
[00:23:49] TEACHER: twice as many cores   {#383}
[00:23:52] TEACHER: And it is still getting the exact same share of requests.   {#384}
[00:23:55] TEACHER: That seems wrong.   {#385}
[00:23:56] TEACHER: You are not utilizing your infrastructure.   {#386}
[00:23:58] TEACHER: Well, so which is where in case you have non-uniform infrastructure, you would   {#387}
[00:24:02] TEACHER: typically see people using weighted round-round where you forward the request   {#388}
[00:24:07] TEACHER: in the ratio of 1 is to 2 is to 1.   {#389}
[00:24:09] TEACHER: In this case, in the example, the data 4GB, 8GB and 4GB.   {#390}
[00:24:13] TEACHER: So now what would happen?   {#391}
[00:24:15] TEACHER: First request goes here.   {#392}
[00:24:16] TEACHER: Second request goes here.   {#393}
[00:24:18] TEACHER: Third request goes here.   {#394}
[00:24:19] TEACHER: Fourth request goes here.   {#395}
[00:24:20] TEACHER: 5th, 6th, 7th, 8th.   {#396}
[00:24:24] TEACHER: So it would happen like this.   {#397}
[00:24:26] TEACHER: This way you utilize your infrastructure really.   {#398}
[00:24:29] TEACHER: When I say, where do I configure?   {#399}
[00:24:32] TEACHER: Every single load balancer that you use has a set of algorithms that you can pick from.   {#400}
[00:24:36] TEACHER: Depending on the algorithm, there is set of configuration that you can pass.   {#401}
[00:24:39] TEACHER: Go through the official documentation of the load balancer that you are using.   {#402}
[00:24:43] TEACHER: In case you don't see that option on your cloud due to any reason,   {#403}
[00:24:46] TEACHER: because it might be behind a feature flag,   {#404}
[00:24:49] TEACHER: reach out to your cloud provider,   {#405}
[00:24:51] TEACHER: raise a support ticket,   {#406}
[00:24:52] TEACHER: ask them you want to configure your load balancing algorithm.   {#407}
[00:24:55] TEACHER: They have those options.   {#408}
[00:24:57] TEACHER: But this is where you would use waited round.   {#409}
[00:25:00] TEACHER: I actually configured waited round because we made a blunder   {#410}
[00:25:03] TEACHER: in purchasing reserved instances.   {#411}
[00:25:06] TEACHER: We purchased reserved instances on AWS of different sizes   {#412}
[00:25:09] TEACHER: and they were not ready to change it.   {#413}
[00:25:12] TEACHER: We had, instead of just keeping them spare,   {#414}
[00:25:14] TEACHER: we just put it into our existing workloads   {#415}
[00:25:16] TEACHER: and just apply weighted round robin and got this thing and so this is exactly where you can use   {#416}
[00:25:23] TEACHER: weighted round rob now it's all about if you see the pattern over here it's always about money   {#417}
[00:25:30] TEACHER: are you using your are you utilizing an infrastructure well or not this is exactly   {#418}
[00:25:35] TEACHER: what an engineer needs to think about or specifically a serial engineer needs to think   {#419}
[00:25:39] TEACHER: about otherwise if you don't care about money then it doesn't matter now put it 60 gb ram   {#420}
[00:25:44] TEACHER: machine and have a round robin.   {#421}
[00:25:46] TEACHER: That's not efficient utilization of   {#422}
[00:25:48] TEACHER: your resources   {#423}
[00:25:50] TEACHER: that you have. So keep those things in   {#424}
[00:25:52] TEACHER: mind that try to save money for   {#425}
[00:25:54] TEACHER: your organization and that's how you can make a quantified   {#426}
[00:25:56] TEACHER: impact. It's easy for   {#427}
[00:25:57] TEACHER: you to pitch for your promotion as simple as   {#428}
[00:26:00] TEACHER: that.   {#429}
[00:26:01] TEACHER: Now a really interesting one that   {#430}
[00:26:04] TEACHER: a lot of people take it for granted is   {#431}
[00:26:06] TEACHER: least connections. I won't go into other   {#432}
[00:26:08] TEACHER: deals. These three only are talking about. But you can   {#433}
[00:26:10] TEACHER: see the intuition   {#434}
[00:26:11] TEACHER: behind where to pick one.   {#435}
[00:26:14] TEACHER: Similarly, you can apply for other algorithms as well.   {#436}
[00:26:17] TEACHER: So least connections is what happens is if you configure your load balancer in the least connection mode, which means that when a request comes to the load balancer, load balancer checks which of the backend server has least number of connections to the load balancer.   {#437}
[00:26:36] TEACHER: As we had connection pooling for databases, think of it in a similar way.   {#438}
[00:26:41] TEACHER: When request comes to load balancer, load balancer can create multiple connections with the server.   {#439}
[00:26:44] TEACHER: It would keep a track of that what are the least number of connections that it has to   {#440}
[00:26:50] TEACHER: a particular server.   {#441}
[00:26:51] TEACHER: It would pick that.   {#442}
[00:26:52] TEACHER: It's not a connection pool.   {#443}
[00:26:52] TEACHER: I just use that as an example.   {#444}
[00:26:54] TEACHER: But when a request comes in, load balancer picks a machine and sends a request to, and   {#445}
[00:27:00] TEACHER: it says that, Hey, I have one connection active at the moment.   {#446}
[00:27:03] TEACHER: Next request comes in, sends it over.   {#447}
[00:27:06] TEACHER: connection active at the moment. Next request comes in, sends it over here. I have one connection   {#448}
[00:27:10] TEACHER: active at the moment with this server. Now when the next request comes in, sends it over here.   {#449}
[00:27:15] TEACHER: But now the first request that happened is now done. The next request comes in,   {#450}
[00:27:20] TEACHER: it can send it to the first one itself. So the idea is the load balancer will keep track of   {#451}
[00:27:27] TEACHER: how many active connections it has to the backend servers, each of the backend servers.   {#452}
[00:27:33] TEACHER: And when a new request comes in, it sees that which one it has the least number of connections   {#453}
[00:27:39] TEACHER: to, then it sends the request to that.   {#454}
[00:27:42] TEACHER: So now it's like, what's the relation between connection?   {#455}
[00:27:46] TEACHER: If you are not doing connection pooling, then if your connection is open, it means that   {#456}
[00:27:53] TEACHER: the server is busy doing some work.   {#457}
[00:27:55] TEACHER: Imagine HTTP request.   {#458}
[00:27:58] TEACHER: You made an HTTP request to load balancer.   {#459}
[00:27:59] TEACHER: are load bands are made in HTTP request to the backend server.   {#460}
[00:28:04] TEACHER: When the server responds, this HTTP connection will be terminated.   {#461}
[00:28:08] TEACHER: When this response, this connection will be terminated.   {#462}
[00:28:11] TEACHER: Which means for the time the connections are active, it actually means the server is busy.   {#463}
[00:28:19] TEACHER: So more number of connections from the server implies more busy the server is.   {#464}
[00:28:26] TEACHER: So with least connections, what you are doing is you are improving the chances or you are   {#465}
[00:28:32] TEACHER: improving the execution time of your request by forwarding it to the machine that is least   {#466}
[00:28:41] TEACHER: burdened at the moment.   {#467}
[00:28:43] TEACHER: This way, you are increasing the probability of you getting quicker response times.   {#468}
[00:28:51] TEACHER: But now, if this is not so good, then where do we use it?   {#469}
[00:28:55] TEACHER: I'll give an example, a really practical example.   {#470}
[00:29:00] TEACHER: Imagine you are serving workload that is having very high variance, which means that some APIs   {#471}
[00:29:09] TEACHER: might take one second, some API might take one minute, some API might take one hour to   {#472}
[00:29:15] TEACHER: respond.   {#473}
[00:29:16] TEACHER: What kind of load is this?   {#474}
[00:29:18] TEACHER: analytics analytics some analytics queries give you answer in one second some analytics queries   {#475}
[00:29:24] TEACHER: give you answer in one hour some analytics queries give you the answer in two hours something around   {#476}
[00:29:28] TEACHER: right take that as an example and that's very good because there is a huge variant which is why i   {#477}
[00:29:34] TEACHER: introduced variants over here it was near uniform load all apks responded within a very short time   {#478}
[00:29:40] TEACHER: window right here let's say there is a huge variance now imagine when the request came in   {#479}
[00:29:48] TEACHER: request came in it went to the server server started processing the second request came in   {#480}
[00:29:53] TEACHER: this server had zero condition second request went over here third request went over here now   {#481}
[00:29:59] TEACHER: when the fourth request came in it just picked this server now because let's say the second   {#482}
[00:30:05] TEACHER: request that happened was very short it was one second request it got free it got resolved   {#483}
[00:30:13] TEACHER: immediately like in one second when the next request came in it found that there is one   {#484}
[00:30:18] TEACHER: correction over here because these are long running so it would make the request to the second one   {#485}
[00:30:22] TEACHER: because it the second request like the second request that was made was completed so the fourth   {#486}
[00:30:27] TEACHER: request went to the second server right but now there is a chance where now fourth request is a   {#487}
[00:30:32] TEACHER: really long running one one or two are longer right then the next request it picked the first server   {#488}
[00:30:39] TEACHER: so here you can see that if my server so if i would have used round robin just blunt round robin   {#489}
[00:30:48] TEACHER: server was having large number of requests unfortunately all long running requests were   {#490}
[00:30:52] TEACHER: just getting scheduled because it was round robin all long running requests were just getting bogged   {#491}
[00:30:57] TEACHER: onto this one server the server that is already busy doing processing of those long running   {#492}
[00:31:02] TEACHER: requests you are bombarding it with more long running requests that's a problem which is where   {#493}
[00:31:07] TEACHER: when you have very large variance in the response times or in the processing times of your request   {#494}
[00:31:13] TEACHER: it's better to go for least connections based approach.   {#495}
[00:31:16] TEACHER: This way your request will be forwarded to a machine   {#496}
[00:31:20] TEACHER: which is relatively free.   {#497}
[00:31:23] TEACHER: Now here the beauty is   {#498}
[00:31:24] TEACHER: load valancer does not have an ID of CPU or memory on this machine.   {#499}
[00:31:29] TEACHER: All it has is ID of network connection.   {#500}
[00:31:32] TEACHER: So it needs to be extremely stateless.   {#501}
[00:31:34] TEACHER: So it can just pick a server which is having least number of connections   {#502}
[00:31:37] TEACHER: because that's a degree like that's a rough estimate   {#503}
[00:31:41] TEACHER: on how busy the backend server is.   {#504}
[00:31:43] TEACHER: Because if you try, a lot of people say,   {#505}
[00:31:46] TEACHER: oh, why are we not capturing CPU and this   {#506}
[00:31:49] TEACHER: and let load balancer use it.   {#507}
[00:31:51] TEACHER: Imagine the complexities of that system.   {#508}
[00:31:53] TEACHER: Now load balancer has to communicate to one more thing,   {#509}
[00:31:55] TEACHER: file the query, see the historical usage   {#510}
[00:31:58] TEACHER: and then see where to forward.   {#511}
[00:31:59] TEACHER: It would slow things down.   {#512}
[00:32:02] TEACHER: Load balancer needs to be lightning fast.   {#513}
[00:32:03] TEACHER: You cannot just waste time doing the data analysis   {#514}
[00:32:06] TEACHER: to find out where to forward a request.   {#515}
[00:32:08] TEACHER: You cannot add the network latency.   {#516}
[00:32:11] TEACHER: itself is a, you are adding a new network.   {#517}
[00:32:13] TEACHER: Don't make things too complicated over there.   {#518}
[00:32:15] TEACHER: Right.   {#519}
[00:32:16] TEACHER: This is one of the reasons why you apply heuristics with algorithms around load balancing because   {#520}
[00:32:23] TEACHER: you need to take decision right there and there in microseconds, not even milliseconds.   {#521}
[00:32:28] TEACHER: If you see the, I'll check the CP usage of all of this.   {#522}
[00:32:32] TEACHER: This is the most common random thing people say.   {#523}
[00:32:35] TEACHER: Always think about practicality whenever you suggest something.   {#524}
[00:32:38] TEACHER: Is this really practical or fun?   {#525}
[00:32:41] TEACHER: I am thinking that my load violence will keep a check on CPU and memory of all this and   {#526}
[00:32:46] TEACHER: pick the one that is least busy.   {#527}
[00:32:48] TEACHER: For it to know the CPU and all of this of all of the servers and then finding out which   {#528}
[00:32:52] TEACHER: one is the least busy and then forwarding the request to adds up multiple milliseconds   {#529}
[00:32:56] TEACHER: of latency.   {#530}
[00:32:57] TEACHER: You cannot afford that.   {#531}
[00:32:58] TEACHER: It needs to happen in microseconds, not even milliseconds.   {#532}
[00:33:01] TEACHER: This way, because of this, the decision needs to be done by this server almost instantly.   {#533}
[00:33:07] TEACHER: So what's the simplest degree of understanding that, Hey, this is slow it up.   {#534}
[00:33:12] TEACHER: Or this is possible.   {#535}
[00:33:13] TEACHER: This server is overburdened connections.   {#536}
[00:33:16] TEACHER: Right.   {#537}
[00:33:17] TEACHER: So this is where you would use least connections based approach where you have huge variance   {#538}
[00:33:22] TEACHER: in response.   {#539}
[00:33:23] TEACHER: Right.   {#540}
[00:33:24] TEACHER: Okay.   {#541}
[00:33:24] TEACHER: Any questions up until this stage?   {#542}
[00:33:26] TEACHER: I'll take three and then we'll move forward.   {#543}
[00:33:30] TEACHER: Yeah.   {#544}
[00:33:30] TEACHER: Anupab.   {#545}
[00:33:32] STUDENT_7: So I wanted to understand if the load balancer using these connections has to maintain persistent   {#546}
[00:33:39] STUDENT_7: connections with all the machines.   {#547}
[00:33:41] TEACHER: No, it would not.   {#548}
[00:33:42] TEACHER: If it makes persistent connections, then how would it know?   {#549}
[00:33:45] TEACHER: But it can.   {#550}
[00:33:46] TEACHER: It can.   {#551}
[00:33:47] TEACHER: And then it's your code.   {#552}
[00:33:48] TEACHER: You can make persistent connection, have a connection pool and know which one are active.   {#553}
[00:33:52] TEACHER: Either you go complete stateless or you keep a connection pool.   {#554}
[00:33:55] TEACHER: That's also fine.   {#555}
[00:33:56] TEACHER: But then your load balancer needs to know that if this is the correction   {#556}
[00:34:01] TEACHER: pool that I have, when I say least corrections, it is least active   {#557}
[00:34:03] TEACHER: corrections because you have a correction pool of let's say a hundred,   {#558}
[00:34:06] TEACHER: but out of which you are using two, then two are active and 98 are inactive.   {#559}
[00:34:10] TEACHER: Right?   {#560}
[00:34:11] TEACHER: So then it becomes least active connections in case you would want to   {#561}
[00:34:15] TEACHER: implement it that way.   {#562}
[00:34:16] TEACHER: You can pick it up perfectly.   {#563}
[00:34:18] STUDENT_3: Understood.   {#564}
[00:34:19] STUDENT_7: Might be missing some common understanding, but how does a long   {#565}
[00:34:26] STUDENT_7: like maybe something that takes one hour happen over HTTP.   {#566}
[00:34:30] TEACHER: Just don't think of HTTP, right?   {#567}
[00:34:32] TEACHER: The HTTP is not the only protocol.   {#568}
[00:34:34] TEACHER: Correct.   {#569}
[00:34:35] TEACHER: It's a raw TCP.   {#570}
[00:34:36] TEACHER: You fired a request.   {#571}
[00:34:38] TEACHER: TCP connection automatically never breaks off, right?   {#572}
[00:34:41] TEACHER: Someone has to break it off.   {#573}
[00:34:43] TEACHER: Correct.   {#574}
[00:34:44] TEACHER: Either network interruption or client terminating or server terminating.   {#575}
[00:34:48] TEACHER: If client and server don't terminate, if network does not go buzzard, your TCP   {#576}
[00:34:52] TEACHER: connection would remain active forever.   {#577}
[00:34:54] TEACHER: Correct.   {#578}
[00:34:56] TEACHER: Don't just think of HTTP.   {#579}
[00:34:58] TEACHER: HTTP itself tells your client and server to terminate a connection as soon as you got   {#580}
[00:35:02] TEACHER: the response.   {#581}
[00:35:03] TEACHER: But with keepalive, you can still keep it open.   {#582}
[00:35:06] TEACHER: I have had long running extremely long running HTTP request also, but not from the end user   {#583}
[00:35:12] TEACHER: context.   {#584}
[00:35:12] TEACHER: It was server to server communication.   {#585}
[00:35:14] TEACHER: GRPC, classic example, works on top of HTTP to the connection never terminates unless   {#586}
[00:35:19] TEACHER: someone explicitly does that.   {#587}
[00:35:22] STUDENT_19: Right?   {#588}
[00:35:22] TEACHER: so imagine raw tcp imagine non-terminating http connections   {#589}
[00:35:28] STUDENT_3: okay   {#590}
---- OWNED SEGMENTS END ----

CTX| [00:35:32] TEACHER: any other question   {#591}
CTX| [00:35:36] STUDENT_5: great we'll move forward hello okay please raise your hand the next time it becomes easier for me   {#592}
CTX| [00:35:42] STUDENT_3: yeah i was trying to find that option but i didn't   {#593}
CTX| [00:35:45] STUDENT_3: so my question is can you please change the slide yeah on this lease connection part   {#594}
CTX| [00:35:53] STUDENT_3: Let's say you have said that one request goes to the first one and it took around one hour   {#595}
CTX| [00:36:00] STUDENT_3: to execute and the second request goes to second one, which is a quicker one, one minute,   {#596}
CTX| [00:36:07] STUDENT_3: one second, whatever.   {#597}
CTX| [00:36:08] STUDENT_3: And the third one is took two hours to finish.   {#598}
CTX| [00:36:13] STUDENT_3: So in this algorithm, let's say we have the fourth request and load balancer will assign   {#599}
CTX| [00:36:18] STUDENT_3: it to the second one.   {#600}
CTX| [00:36:19] STUDENT_3: and that also took around two hours the huge one now in case of fifth request we have included that   {#601}
CTX| [00:36:28] STUDENT_3: load balancer will decide it either to send it to the least connection but currently we have   {#602}

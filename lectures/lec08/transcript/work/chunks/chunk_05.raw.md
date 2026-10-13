# chunk_05  OWNS 00:46:19 -> 00:58:12  (segments #764-#982, 1902 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:45:24] TEACHER: let's have flask server springboard server pick your favorite framework and write a hello world   {#758}
CTX| [00:45:29] TEACHER: let's say they are running on 8081 port right now with 8081 this is the port but every machine   {#759}
CTX| [00:45:41] TEACHER: will have an IP address because now for anyone, not just LB server, but for anyone to connect   {#760}
CTX| [00:45:47] TEACHER: to these servers, how do you connect to the servers? You need IP address and for the first   {#761}
CTX| [00:45:54] TEACHER: time I'm covering in this detail, but bear with it. So let's say this machine has IP address of   {#762}
CTX| [00:46:01] STUDENT_5: 10.0.0.7, 10.0.0.7. I am writing over here. I could have just written over here.   {#763}

---- OWNED SEGMENTS START ----
[00:46:19] TEACHER: That's fine.   {#764}
[00:46:20] TEACHER: See, that's it.   {#765}
[00:46:21] TEACHER: Okay.   {#766}
[00:46:22] TEACHER: So let's say my first machine is 10.0.0.7, 10.0.0.8 and 10.0.0.9.   {#767}
[00:46:31] TEACHER: So this are my three backend servers.   {#768}
[00:46:35] TEACHER: Let's say serving slash index dot HTML page doing hello world or something, some random   {#769}
[00:46:39] TEACHER: service.   {#770}
[00:46:41] TEACHER: Now for anyone, anyone to connect to the server, you need IP address and port number.   {#771}
[00:46:49] TEACHER: So assume that in the load barrensor that you are writing, you have a hash map or rather   {#772}
[00:46:55] TEACHER: you have a list for YYM.   {#773}
[00:46:57] TEACHER: We call you a hash map.   {#774}
[00:46:58] TEACHER: Let's say you have a list of all the backend servers.   {#775}
[00:47:02] TEACHER: So you have list of all the backend servers that are there, which means 10.0.0.7 colon   {#776}
[00:47:10] TEACHER: 10.0.0.8.8081.   {#777}
[00:47:14] TEACHER: This is typically our architecture or the configuration that we do on the console side of things.   {#778}
[00:47:20] TEACHER: We specify that this is a load balancer that I'm spinning.   {#779}
[00:47:23] TEACHER: These are the servers behind the load balancer quote unquote.   {#780}
[00:47:27] TEACHER: So it must be having something where like load balancer is storing this information.   {#781}
[00:47:32] TEACHER: So let's say we are storing this information over here.   {#782}
[00:47:34] TEACHER: Now, whenever someone wants to collect, although I'm drawing a user over here, it can also   {#783}
[00:47:41] TEACHER: be a normal server and then it's a client.   {#784}
[00:47:45] TEACHER: Now client wants to fire request or slash index.html.   {#785}
[00:47:49] TEACHER: Now what client does, it sends the request to this one IP address that it has 10.001   {#786}
[00:47:58] TEACHER: request went over here.   {#787}
[00:48:00] TEACHER: Now what load balancer would do?   {#788}
[00:48:02] TEACHER: Now when we say client sent a request, what does it mean?   {#789}
[00:48:06] TEACHER: It means that the client established a TCP connection with the server.   {#790}
[00:48:11] TEACHER: So which means this server also needs to listen to some TCP port, let's say this port is 9000.   {#791}
[00:48:18] TEACHER: So when client sends a request, the request client sends a request to port 9000 on 1000   {#792}
[00:48:24] TEACHER: on 10001, which is our load balancer server.   {#793}
[00:48:28] TEACHER: These are our backend servers.   {#794}
[00:48:31] TEACHER: came to load balancer server because client only has IP address of load balancer server.   {#795}
[00:48:36] TEACHER: Now what would this load balancer server do?   {#796}
[00:48:39] TEACHER: Because it needs to forward the request.   {#797}
[00:48:42] TEACHER: What does it mean forwarding?   {#798}
[00:48:43] TEACHER: It's not just forwarding, forwarding on the packet side of it.   {#799}
[00:48:46] TEACHER: And then what it needs to do is imagine these servers, the Spring Boot, the Flask and the   {#800}
[00:48:53] TEACHER: Django servers that you spun up.   {#801}
[00:48:55] TEACHER: What they accept?   {#802}
[00:48:56] TEACHER: HTTP request.   {#803}
[00:48:57] TEACHER: What is HTTP?   {#804}
[00:48:58] TEACHER: TCP request.   {#805}
[00:48:59] TEACHER: So what would you do?   {#806}
[00:49:02] TEACHER: running on port 8081 that understands HTTP specifications.   {#807}
[00:49:06] TEACHER: Right.   {#808}
[00:49:07] TEACHER: So what LB server would do is LB server would first, would literally first, once it got   {#809}
[00:49:14] TEACHER: the request, it would depending on the load balancing algorithm, it would see out of this   {#810}
[00:49:19] TEACHER: three, which one to pick.   {#811}
[00:49:20] TEACHER: Let's say I have a random balancing strategy.   {#812}
[00:49:21] TEACHER: Let's keep it simple.   {#813}
[00:49:22] TEACHER: Random.   {#814}
[00:49:23] TEACHER: It would just pick all from all the lines of pick one at random.   {#815}
[00:49:25] TEACHER: Now what load balancer is doing is when it got a request, it just picked one server randomly   {#816}
[00:49:33] TEACHER: out of this three.   {#817}
[00:49:34] TEACHER: So out of this three, it just picked one server randomly.   {#818}
[00:49:37] TEACHER: Let's say it picked 007, right?   {#819}
[00:49:40] TEACHER: 10 007.   {#820}
[00:49:41] TEACHER: So what LB server would do is it would create a TCP connection with 10 007 colon 80 at port   {#821}
[00:49:49] TEACHER: 8081.   {#822}
[00:49:50] TEACHER: Right?   {#823}
[00:49:51] TEACHER: So this is another TCP connection that is set up.   {#824}
[00:49:56] TEACHER: So for one request from the client,   {#825}
[00:49:58] TEACHER: there are two TCP connections that are set up.   {#826}
[00:50:01] TEACHER: One, between client and load balancer.   {#827}
[00:50:03] TEACHER: And second, from load balancer to backend server.   {#828}
[00:50:06] TEACHER: Now what would you do?   {#829}
[00:50:08] TEACHER: As a client, client sends what?   {#830}
[00:50:10] TEACHER: HTTP request, that HTTP protocol format and slash index.html   {#831}
[00:50:15] TEACHER: and something it sends.   {#832}
[00:50:17] TEACHER: This request, it says HTTP request in some specification.   {#833}
[00:50:22] TEACHER: the request comes to LB server.   {#834}
[00:50:23] TEACHER: LB server has this connection set up.   {#835}
[00:50:25] TEACHER: So now what LB server would need to know   {#836}
[00:50:27] TEACHER: that this incoming TCP connection   {#837}
[00:50:30] TEACHER: is mapped to this TCP connection.   {#838}
[00:50:33] TEACHER: Now think from LB server's perspective.   {#839}
[00:50:36] TEACHER: For LB server, this is TCP connection 1.   {#840}
[00:50:40] TEACHER: This is TCP connection 2.   {#841}
[00:50:41] TEACHER: Some identity.   {#842}
[00:50:43] TEACHER: So what LB server needs to have   {#843}
[00:50:45] TEACHER: is a map of which TCP connection is mapped to which TCP connection. So which source TCP   {#844}
[00:50:56] TEACHER: connection is mapped to which target TCP connection. So this is a source TCP connection   {#845}
[00:51:03] TEACHER: which is established between client and LB server. This is target TCP connection which is established   {#846}
[00:51:10] TEACHER: between load balancer and backend server.   {#847}
[00:51:13] TEACHER: So it needs to keep a track.   {#848}
[00:51:15] TEACHER: And by the way, this is exactly how I thought of building a load balancer.   {#849}
[00:51:21] TEACHER: This is exactly my thought process of how I approach this problem.   {#850}
[00:51:25] TEACHER: How I literally applied first principles into doing this.   {#851}
[00:51:29] TEACHER: Observe and there is nothing fancy over here.   {#852}
[00:51:31] TEACHER: You would see how simple it is to build by.   {#853}
[00:51:35] TEACHER: So here what is uptake is you have TCP, you store this mapping   {#854}
[00:51:40] TEACHER: when a request comes over a particular TCP collection,   {#855}
[00:51:43] TEACHER: you know where to forward it.   {#856}
[00:51:46] TEACHER: So now you store this mapping somewhere.   {#857}
[00:51:49] TEACHER: Hash table, normal.   {#858}
[00:51:49] TEACHER: You don't need database to store TCP.   {#859}
[00:51:51] TEACHER: You cannot store TCP collection in a database.   {#860}
[00:51:53] TEACHER: You just store it in memory over here   {#861}
[00:51:55] TEACHER: because these are like connections on the server.   {#862}
[00:51:57] TEACHER: So in the hash table, you put it.   {#863}
[00:51:59] TEACHER: So you know from this server,   {#864}
[00:52:01] TEACHER: you have to form whenever anything comes from this TCP collection,   {#865}
[00:52:05] TEACHER: you know where to forward it.   {#866}
[00:52:06] TEACHER: Right?   {#867}
[00:52:07] TEACHER: So you have kind of mapping.   {#868}
[00:52:10] TEACHER: will go through the implementation but you have this that this TCP 1 and this TCP 2 are   {#869}
[00:52:16] TEACHER: connected.   {#870}
[00:52:17] TEACHER: When you receive a packet on this TCP what you are doing is you are finding where to   {#871}
[00:52:21] TEACHER: forward it to which is this mapping TCP 2 and you literally send whatever TCP packets   {#872}
[00:52:27] TEACHER: you got to this server or on this TCP you don't know what it is.   {#873}
[00:52:32] TEACHER: So whatever TCP packets you received, you just forward them bluntly to the target TCP connection.   {#874}
[00:52:43] TEACHER: Right now, because this is sending HTTP request, the backend servers send HTTP request.   {#875}
[00:52:49] TEACHER: Load-by-lifter does not care if it is HTTP web socket or what not.   {#876}
[00:52:57] TEACHER: It has no idea.   {#877}
[00:52:58] TEACHER: What it knows is whatever I receive over here, I just forward those packets over here.   {#878}
[00:53:04] TEACHER: Simple.   {#879}
[00:53:06] TEACHER: So you read from one socket and you write to another.   {#880}
[00:53:10] TEACHER: Now that contains HTTP request, web socket request, RTMP request, ICMP request.   {#881}
[00:53:15] TEACHER: You don't care.   {#882}
[00:53:17] TEACHER: And then what matters is whatever packets are coming in, whatever you are reading from the   {#883}
[00:53:22] TEACHER: socket, you are writing to this socket.   {#884}
[00:53:24] TEACHER: Right?   {#885}
[00:53:25] TEACHER: But because it is a well formed HTTP request, that same HTTP request comes over here.   {#886}
[00:53:31] TEACHER: Now this server understands HTTP request.   {#887}
[00:53:34] TEACHER: So it generates the response.   {#888}
[00:53:36] TEACHER: And then this server, what a normal web server does, when it generates the response, it sends   {#889}
[00:53:42] TEACHER: the response to the TCP correction that it received from.   {#890}
[00:53:45] TEACHER: So it would send the response from this t-tick-tick packets.   {#891}
[00:53:53] TEACHER: Now this packets would come over this TCP   {#892}
[00:53:55] TEACHER: to this load balancer.   {#893}
[00:53:56] TEACHER: Now this load balancer server would say,   {#894}
[00:53:58] TEACHER: I received from TCP to,   {#895}
[00:53:59] TEACHER: where do I forward it to?   {#896}
[00:54:01] TEACHER: TCP 1.   {#897}
[00:54:02] TEACHER: So it forwards it to TCP 1.   {#898}
[00:54:04] TEACHER: And this way your client gets the response.   {#899}
[00:54:08] TEACHER: Right?   {#900}
[00:54:08] TEACHER: So you read from one socket from client.   {#901}
[00:54:13] TEACHER: So you read from one socket,   {#902}
[00:54:16] TEACHER: comes over here,   {#903}
[00:54:18] TEACHER: you write it over here,   {#904}
[00:54:19] TEACHER: then you read from here,   {#905}
[00:54:20] TEACHER: and then you write it over here.   {#906}
[00:54:23] TEACHER: exactly what a load balancer does.   {#907}
[00:54:24] TEACHER: Two lines of code and done.   {#908}
[00:54:27] TEACHER: I'll show you.   {#909}
[00:54:28] TEACHER: Right.   {#910}
[00:54:29] TEACHER: But this is exactly what a load balancer does.   {#911}
[00:54:32] TEACHER: Now here, what is happening is because it is connected this way that for every   {#912}
[00:54:38] TEACHER: request that is coming now, let's say the next request that made from let's   {#913}
[00:54:42] TEACHER: say some another client came in and made some another request.   {#914}
[00:54:48] TEACHER: Now this time load balancer is connected to this one.   {#915}
[00:54:53] TEACHER: in TCP three to TCP four.   {#916}
[00:54:56] TEACHER: Let's say I'm just using some string to identify for   {#917}
[00:54:59] TEACHER: ourselves, right?   {#918}
[00:55:01] TEACHER: And it would do that same thing.   {#919}
[00:55:02] TEACHER: So now if you look carefully, LB, the LB server needs to   {#920}
[00:55:08] TEACHER: have two X number, requires two X number of TCP, requires   {#921}
[00:55:12] TEACHER: to manage two X number of TCP connections, right?   {#922}
[00:55:15] TEACHER: So that's why you cannot just have one LB server.   {#923}
[00:55:18] TEACHER: You need multiple LB servers and you need to wait to   {#924}
[00:55:19] TEACHER: horizontally scale.   {#925}
[00:55:20] TEACHER: But that's a different problem.   {#926}
[00:55:23] TEACHER: to solve it. But here what happens is that your problem gets very beautiful. Like just a single   {#927}
[00:55:29] TEACHER: machine implementation. You can very well write. You can very well write a single machine load   {#928}
[00:55:33] TEACHER: balancer. All of this can run on one machine. How? Simple. You create a process. Normal go like C++,   {#929}
[00:55:41] TEACHER: Java, PyHood, pick whatever language you want to. And start a server on 9000 port. Right. Then   {#930}
[00:55:47] TEACHER: Then because you only have one machine, you cannot have three process listing on 8081.   {#931}
[00:55:53] TEACHER: So just start three different processes on three different ports on the same machine.   {#932}
[00:55:58] TEACHER: So you don't have IP address, localhost, localhost, localhost.   {#933}
[00:56:00] TEACHER: But 8081, 802, 8083.   {#934}
[00:56:03] TEACHER: You can mimic the entire load or entire pattern locally on one machine.   {#935}
[00:56:08] TEACHER: You don't need any fancy setup of cloud, cloud, multiple, VMs, Docker, Docker.   {#936}
[00:56:12] TEACHER: You don't need nothing.   {#937}
[00:56:14] TEACHER: I just do load balancing across that.   {#938}
[00:56:17] TEACHER: What you need to do is which algorithm to pick just have a configuration that when a   {#939}
[00:56:21] TEACHER: connection comes in you have the configuration as like load balancing algorithm configuration   {#940}
[00:56:25] TEACHER: depending on which you pick a backend server and forward the request to right and this is how you   {#941}
[00:56:31] TEACHER: build a load balancer it's really easy really easy and I'm not even exaggerating a bit over here   {#942}
[00:56:38] TEACHER: right but this is how from the first principle I did not know anything about it but this is from   {#943}
[00:56:44] TEACHER: the first principle that you can apply and build your own load balancer, a single machine   {#944}
[00:56:49] TEACHER: load balancer.   {#945}
[00:56:50] TEACHER: Right.   {#946}
[00:56:50] TEACHER: Scaling will take care of it.   {#947}
[00:56:52] TEACHER: But at least with respect to implementation, you need to know how it is implemented.   {#948}
[00:56:56] TEACHER: And it's literally just balancing the load across this.   {#949}
[00:57:01] TEACHER: But in reality, it's just having some sort of mapping like this.   {#950}
[00:57:04] TEACHER: When I get something from this one TCP, send it to this TCP.   {#951}
[00:57:08] TEACHER: When I get something from other TCP, send it to this TCP.   {#952}
[00:57:11] TEACHER: That's it.   {#953}
[00:57:11] TEACHER: You receive the packet.   {#954}
[00:57:12] TEACHER: You send the packet.   {#955}
[00:57:14] TEACHER: from other side, send it somewhere else.   {#956}
[00:57:16] TEACHER: That's what you do.   {#957}
[00:57:17] TEACHER: Okay.   {#958}
[00:57:18] TEACHER: So this is low level implementation detail of a load balancer.   {#959}
[00:57:23] TEACHER: Let me show you code very briefly, five minutes.   {#960}
[00:57:26] TEACHER: I'll show you the code of a load balancer.   {#961}
[00:57:29] TEACHER: Today's session will definitely get extended because we are going really in depth.   {#962}
[00:57:33] TEACHER: But I wanted to talk about this.   {#963}
[00:57:34] TEACHER: I wanted to spark that engineering curiosity.   {#964}
[00:57:37] TEACHER: Dabbe dabbe, everyone can wait.   {#965}
[00:57:39] TEACHER: This is where the magic happens.   {#966}
[00:57:41] TEACHER: And again, Kyle won't share.   {#967}
[00:57:44] TEACHER: What happened?   {#968}
[00:57:46] TEACHER: Oh, GitHub is down.   {#969}
[00:57:50] TEACHER: GitHub is down.   {#970}
[00:57:52] TEACHER: 500.   {#971}
[00:57:53] TEACHER: GitHub is having an outage.   {#972}
[00:57:55] TEACHER: Hopefully, they recover from this.   {#973}
[00:57:57] TEACHER: And we get to see our code.   {#974}
[00:57:59] TEACHER: Oh, we did.   {#975}
[00:58:00] TEACHER: Great.   {#976}
[00:58:01] TEACHER: Okay.   {#977}
[00:58:01] TEACHER: So, this is the load balancer that I've written.   {#978}
[00:58:06] TEACHER: 1.5.   {#979}
[00:58:07] TEACHER: LB.go.   {#980}
[00:58:08] TEACHER: Still some outage.   {#981}
[00:58:10] TEACHER: Okay.   {#982}
---- OWNED SEGMENTS END ----

CTX| [00:58:12] TEACHER: And go.   {#983}
CTX| [00:58:14] TEACHER: into a lot of details what core that i'm talking about is here right okay lb.run this is my load   {#984}
CTX| [00:58:21] TEACHER: balancer server the lb server that we're talking about which is listening on port 9090 right so   {#985}
CTX| [00:58:26] TEACHER: anyone who wants to talk to load balancer has to talk to our code 9090 right then i hardcoded bunch   {#986}
CTX| [00:58:33] TEACHER: of backend servers here you can see i have four backend servers running flask hello world right   {#987}
CTX| [00:58:40] TEACHER: But they are listening on four different ports.   {#988}
CTX| [00:58:42] TEACHER: 8081, 802, 803, 808.   {#989}
CTX| [00:58:44] TEACHER: Four different processes I spin up from the same code base.   {#990}
CTX| [00:58:47] TEACHER: 8081, another one 8082, third one 8080, fourth one 8084.   {#991}
CTX| [00:58:51] TEACHER: Because I wanted to test load balancing.   {#992}
CTX| [00:58:52] TEACHER: I didn't want to scale the system.   {#993}
CTX| [00:58:55] TEACHER: So I have four backend servers all running locally.   {#994}
CTX| [00:58:57] TEACHER: I have one LV server listing on port 9090.   {#995}
CTX| [00:59:01] TEACHER: Now what did we say?   {#996}
CTX| [00:59:03] TEACHER: When we get a request, this is where the magic is.   {#997}
CTX| [00:59:06] TEACHER: We say when we get a request from a client, we have to pick a server to connect.   {#998}
CTX| [00:59:11] TEACHER: So this is where my infinite for loop runs.   {#999}

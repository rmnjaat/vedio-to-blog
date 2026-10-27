=== PAGE: lecture overview ===

Lecture 5 · two builds: a load balancer, then a lock across machines

# The box everyone draws

A backend crashes and payments fail for a few seconds. How many is decided inside the box every diagram labels “load balancer”. Write the ten lines inside it, keep it correct as it grows to many machines, then make three machines take turns on a queue that protects nothing, with a lock that has to survive its own server.

- Two builds, one story

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1What is inside the box labelled “load balancer”?Open the box on one machine: what a client really connects to, what happens to every byte, the few lines of Go that do it, and how to run it on a laptop.3 sections · §1.1–1.3

- 2Three servers, one request. Which one gets it?Three backends and the next request. Identical servers, one server twice the size, requests that take an hour, and whether the load balancer should simply ask each server how busy it is.4 sections · §2.1–2.4

- 3One LB server can hold 10,000 connections. How many clients is that?Count what one client costs the load balancer, then run many. Where do they all learn the backend list, and who notices when a backend dies?2 sections · §3.1–3.2

- 4The database says backend 2 is dead. The LB servers haven’t heard.The database knows a backend is dead and the LB servers don’t. How long that lasts, how to close the window, and who grows the fleet when it gets busy.4 sections · §4.1–4.4

- 5Ten LB servers. Which address does the client dial?Many LB servers and a client with one address. What DNS does and doesn’t do, who watches the orchestrator, the whole design, and the problem many machines bring.5 sections · §5.1–5.5

- 6Three machines, one queue that protects nothing. Who reads next?The second build. Three consumers on three machines and a queue that hands the same message to anyone. What machines share, and the smallest lock that works.4 sections · §6.1–6.4

- 7The job takes six minutes. The lock lasts five.A job outlives its lock. Whose lock does its release delete, what a safe release takes, and what else could hold the lock.3 sections · §7.1–7.3

- 8All locking runs through one Redis. What happens when it dies?The lock’s one server goes down. Would a replica save it, how many servers must agree, what happens when nodes come back, what it all costs, and the question Lecture 6 opens with.6 sections · §8.1–8.6

Your payments service runs on three servers behind one name. One of them crashes. For how many seconds do customers’ payments keep failing, and what decides that? The answer sits inside a rectangle that almost every system diagram has and almost nobody opens: the one labelled “load balancer”.

Somebody wrote that box. It is a program, and its core is about ten lines of code. In this lecture you write it, then keep it working: one address that never changes, requests spread sensibly over the servers behind it, and as few failed requests as possible when a server dies, when one machine is no longer enough, or when one of the machines you added to fix that dies too.

[figure title] One entry point

[figure description] Two clients send their requests to one load balancer, reached by one name that never changes. The load balancer forwards each request to one of three API servers. Advantages written beside it: fault tolerance, and no overloaded server.

[figure labels] payments.lb.google.com · lb · api · api · api · single point of entry · advantages: · fault tolerance · no overloaded server

[caption] Fig 0·aThe brief, in one picture. Clients know one name that never changes; the load balancer forwards each request to one of the servers behind it.

### Where you are #

Every lecture so far has drawn this box without opening it. Lecture 1’s day-zero design already had users, a load balancer, an API server and a database, and its heartbeat story ended on a promise: the signal that turns a silent user grey is the one a load balancer uses to stop sending requests to a dead server. Lecture 2 scaled the Medium-like blog’s API servers out behind a load balancer and sized the fleet by dividing the peak load by what one machine can serve. Lecture 3 locked airline seats inside one database, which kept track of who held each lock by itself. Lecture 4 pushed Slack’s messages between servers through a real-time Pub/Sub.

Each of those pieces turns up again here, inside the box or right next to it.

### What you’ll build #

Build 1, a load balancer (chapters 1–5). It starts as one process on a laptop that copies bytes between two connections. Then it runs out of room, and you grow it into a fleet of machines that must agree, at every moment, on which servers are alive. Every machine you add raises the question this lecture keeps asking: what happens when this one dies?

Build 2, a lock across machines (chapters 6–8). Once work runs on many machines, two of them can reach for the same thing at the same moment, and no single database is there to keep them apart. Three consumers on three machines read from a remote queue that hands the same message to anyone who asks, and you can’t change the queue. You build a lock they all respect, with nothing shared between them but the network, and then ask Build 1’s question of it: what if the lock’s own server dies?

The two builds share one habit. After every line of the design, assume something lags or dies right there, and check that the system still holds.

### What you’ll be able to do #

- Explain what a load balancer does to every byte of a request, and build one on a laptop.

- Pick a balancing algorithm from the shape of your servers and your traffic.

- Keep a fleet of load balancers in step with the backends, without a window of errors when one dies.

- Point clients at many machines through one name, and say what DNS does and doesn’t do.

- Find the single point of failure in a design, and say whether a fix buys capacity or survival.

- Lock a shared resource across machines safely, and say what it costs to make that lock survive a crash.

### Before you start #

You need the basics of TCP (a connection between an IP address and a port), HTTP running over TCP, and threads. The code is short Go and Python; any language with sockets and threads works the same way.

Nothing here needs a cloud account. The load balancer runs as four processes on one laptop, and the last chapter’s five lock servers as five processes on one laptop. Each chapter opens with a small map of the design so far. When a “Pause and think” box asks you something, commit to an answer before you open it.

Lecture 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-inside-the-box ===

# The box everyone draws, chapter 1: What is inside the box labelled “load balancer”?

Lecture 5 · The box everyone draws · chapter 1 of 8

§ 1

## What is inside the box labelled “load balancer”?

About 7 min

The client sees one address; behind it, any number of machines do the work. Open that box on one machine first.

[figure title] The load balancer so far

[figure description] The load balancer so far: a client sends requests to a closed box labelled lb, which forwards them to three backend servers. What is inside the box is still open.

[figure labels] lb · a closed box · backend · backend · backend · the load balancer so far

[caption] Fig 1·aThe load balancer so far: a closed box between clients and three backends. This chapter opens it.

Start the way you would start any distributed system: with the day-zero version. One machine, no thought of scale yet. Thinking about scale on day zero is the surest way to build the wrong thing; get one machine right first, then scale each part and watch where it breaks.

§ 1.1

## What does a client actually connect to?

Two names keep the rest clear. The LB server is the machine that runs the load balancer, and the load balancer itself is just a process on it. The backend servers are where requests end up: a payment service, an auth service, a profile service. To the load balancer you are writing, they are black boxes.

Give them addresses. One LB server at 10.0.0.1, a static IP that doesn’t change. Three backends at 10.0.0.7, 10.0.0.8 and 10.0.0.9, each running an ordinary HTTP server (Flask, Spring Boot, any framework) on port 8081 that answers /index.html with “hello world”. The load balancer keeps their list as ip:port, the same list you fill in on a cloud console when you choose which servers sit behind a load balancer.

The load-balancing process is a plain TCP server, not even an HTTP server, listening on a port of its own, say 9000. When a client “sends a request to the load balancer”, what it really does is open a TCP connection to 10.0.0.1:9000, because that is the only address it has.

The backend is waiting on 8081, and the client’s connection ends at the LB server. So the LB server picks a backend (the simplest rule: one of the three at random) and opens a TCP connection of its own to it, say to 10.0.0.7:8081. One request from one client costs two TCP connections: client to LB server, and LB server to backend.

[figure title] Two TCP connections per request

[figure description] Two clients and one LB server at 10.0.0.1 port 9000, with three backends at 10.0.0.7, 10.0.0.8 and 10.0.0.9, port 8081. Client 1 opens tcp1 to the LB and sends GET /index.html; the LB opens tcp2 to the first backend. Client 2 gets its own pair, tcp3 and tcp4. The LB keeps the backend list and an in-memory hash table mapping tcp1 to tcp2 and tcp3 to tcp4; the response is copied back along the same pair.

[figure labels] in-memory hash table · tcp1 → tcp2 · tcp3 → tcp4 · tcp1 · GET /index.html · tcp3 · lb · 10.0.0.1 :9000 · backends · 10.0.0.7:8081 · 10.0.0.8:8081 · 10.0.0.9:8081 · tcp2 · tcp4 · backend · 10.0.0.7 :8081 · backend · 10.0.0.8 :8081 · backend · 10.0.0.9 :8081 · response copied back · along tcp2, then tcp1

[caption] Fig 1·bOne request, two connections: tcp1 from the client to the LB server, tcp2 from the LB server to a backend. A second client gets its own pair, tcp3 and tcp4. The backend list and the map of pairs live in the LB server’s memory.

The LB server has to remember which connection belongs with which. It keeps a map from each source connection (client to LB server) to its target connection (LB server to backend): tcp1 → tcp2, tcp3 → tcp4. The map lives in an in-memory hash table. A database would be useless here: a TCP connection exists only on this one machine, so there is nothing anyone else could share.

This kind of load balancer, one that ends the client’s connection and opens its own, is a TCP proxy. Others work at the HTTP level, or forward packets without opening a second connection, but the proxy is the clearest place to see what the job is.

§ 1.2

## What does the LB server do with the bytes?

Bytes arrive on tcp1. The LB server looks up tcp2 in its map and writes the same bytes there, without reading what they say. It doesn’t care what protocol they carry: HTTP, WebSocket, RTMP, anything that rides on TCP. What reaches the backend is a well-formed HTTP request, so the backend answers it on the connection it arrived on. The LB server sees data on tcp2, looks up tcp1, and copies the answer back. There are no REST calls between the load balancer and the backend, only a TCP connection with bytes copied across it.

Read from the client’s socket, write to the backend’s; read from the backend’s socket, write to the client’s. The copying itself is two lines; with the accept loop and the dial, the whole core is about ten. Here they are, lightly cleaned up from a small experimental Go load balancer (ARLB). It listens on 9090 and has four Flask hello-world backends hardcoded on local ports 8081 to 8084, because its purpose was to test balancing, not to scale anything.

func (lb *LB) Run() { ln, err := net.Listen("tcp", ":9090") if err != nil { log.Fatal(err) } for { srcConn, err := ln.Accept() // wait for the next client if err != nil { continue } go lb.proxy(IncomingReq{srcConn: srcConn, reqId: uuid.NewString()}) } } func (lb *LB) proxy(req IncomingReq) { defer req.srcConn.Close() backend := lb.strategy.GetNextBackend(req) // which backend? (chapter 2) backendConn, err := net.Dial("tcp", backend.String()) if err != nil { req.srcConn.Write([]byte("backend not available")) return } defer backendConn.Close() backend.NumRequests++ done := make(chan error, 2) go func() { _, err := io.Copy(backendConn, req.srcConn); done <- err }() // request: client → backend go func() { _, err := io.Copy(req.srcConn, backendConn); done <- err }() // response: backend → client <-done // one side hung up: the deferred Closes end the other copy }

(ARLB listens on 9090 and hardcodes four backends; the design on this page keeps 9000 and three.)

An infinite loop waits in Accept for the next client and hands each connection to proxy, tagged with a request ID for the logs. proxy asks the strategy for a backend, dials it, and starts two copies.

Pause and think

Why does each io.Copy get its own goroutine? What would go wrong if proxy simply called the two copies one after the other?

io.Copy blocks. It keeps copying until the source sends EOF, and only then returns. Called inline, the first copy would hold proxy for as long as the client stayed connected, and the copy that carries the response would never start. In two goroutines, the two directions run side by side.

When a copy does return, that is how the LB server learns the connection is over. In Go, io.Copy returns nil at a clean EOF, or an error such as a reset. proxy waits for the first return, then closes both connections so the other copy ends too; skip that, and every request leaves two sockets open for good. (This takes the first EOF as the end of the conversation. A client that only stops sending and still waits for the answer would lose it; production proxies pass that half-close on to the backend instead.) That return is also the place to update anything you track per backend. This little load balancer tracks one thing, the number of requests each backend has handled, which is enough to check that the balancing works.

It isn’t efficient: it starts three goroutines for every client. It doesn’t need to be: it is there to show the core.

§ 1.3

## Do you need three servers to try this?

No. Start the load balancer as one process on port 9000 (Go, C++, Java, Python, whatever you like) and three backends as three more processes on the same machine, on ports 8081, 8082 and 8083. One machine can’t have three processes listening on 8081, which is the only reason the ports differ. No cloud, no VMs, no Docker.

[figure title] One laptop, four processes

[figure description] A laptop running four processes on localhost: the load balancer on port 9000 and three backend processes on ports 8081, 8082 and 8083, with requests going from the LB to each. No cloud, no VMs, no Docker.

[figure labels] lb · :9000 · :8081 · :8082 · :8083 · localhost · no cloud · no VMs · no Docker

[caption] Fig 1·cThe whole setup on one laptop: the load balancer on port 9000 and three backends on 8081, 8082 and 8083 of localhost.

With basic networking knowledge it is about five hours of work.

One engineer built his first load balancer exactly like this, in plain Go, in March 2021, during the COVID lockdown at his in-laws’ house, because he wanted a real demo rather than what he had read in papers. When it first balanced requests across his servers he went around the house explaining load balancers to anyone he could find. Nobody understood, and he didn’t mind. Then he benchmarked it: five to six times faster than Nginx. A breakthrough? No. Reading deeper into Nginx showed him why: Nginx and HAProxy do far more than his load balancer did.

That is the difference between building and scaling. Very few people get to scale a system; everyone can build one locally, and you need many machines only for the scaling. So build this one. Then look hard at the one line that decides anything: with three backends, which one should GetNextBackend return?

Lecture 5, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-which-backend ===

# The box everyone draws, chapter 2: Three servers, one request. Which one gets it?

Lecture 5 · The box everyone draws · chapter 2 of 8

§ 2

## Three servers, one request. Which one gets it?

About 6 min

GetNextBackend is the load-balancing algorithm: the rule by which the load balancer decides which server gets the next request. There are many. Three cover most of what you will meet, and each one fits a particular kind of infrastructure and a particular kind of traffic. Learn why each fits and you can place the others yourself.

[figure title] The load balancer so far

[figure description] The load balancer so far: a client opens tcp1 to the LB server at 10.0.0.1 port 9000; the LB server opens tcp2 to a backend at 10.0.0.7 port 8081 and copies bytes both ways, remembering the pair tcp1 → tcp2 in memory. Marked new: the two connections and the copy.

[figure labels] new · tcp1 · lb server · 10.0.0.1:9000 · tcp1 → tcp2 (in memory) · copy bytes both ways · tcp2 · 10.0.0.7:8081 · 10.0.0.8:8081 · 10.0.0.9:8081 · the load balancer so far

[caption] Fig 2·aThe load balancer so far. Marked new: one LB server, two TCP connections per client, and bytes copied both ways.

§ 2.1

## What if every server is the same?

Then take turns: request 1 to backend 1, request 2 to backend 2, request 3 to backend 3, request 4 to backend 1 again. That is round robin, the most common algorithm and the default in almost every load balancer. It needs no state beyond one integer, the index of the backend that got the last request. In the Go load balancer of chapter 1, the whole strategy is one line:

s.Index = (s.Index + 1) % len(s.Backends) // 1 2 3, 1 2 3, …

Round robin is right when two things hold. The infrastructure is uniform: every backend has the same configuration, say 4 GB of RAM each. And the load is uniform: whichever API a request hits, the answer comes back within a narrow range of time, say under a second. Then no request ties up one server much longer than another, and dealing them out in turn spreads the work almost evenly.

§ 2.2

## What if one server is twice the size?

It happens. Say your three backends have 4 GB, 8 GB and 4 GB, because you bought reserved instances of different sizes and leaving any of them idle wastes money you already paid. The middle one is twice the machine: double the memory and double the cores.

Pause and think

Under plain round robin, the two 4 GB servers run at 80% of their capacity. Where does the 8 GB server run?

Round robin gives it exactly the same share of requests as each small server, and it has twice the capacity to handle them, so it sits at about half their load. You are paying for a machine and using half of it.

Weighted round robin fixes it. Give each backend a weight and deal requests in proportion: weights 1 : 2 : 1, so of every four requests the big server gets two. At the same total traffic, every server now sits near 60%: each small one now gets a quarter of the requests instead of a third, and the big one half. The gain is headroom: about a third more traffic fits before any server reaches 80%.

[figure title] Weighted round robin

[figure description] Weighted round robin: 4 GB, 8 GB and 4 GB servers with weights 1, 2 and 1. Of every four requests the 8 GB server gets two: 1 and 5, then 2, 3, 6 and 7, then 4 and 8. Under plain round robin the 8 GB server would sit at about 40% while the others ran at 80%; with weights, at the same total load, all three run at about 60%, so about a third more traffic fits before any server reaches 80%.

[figure labels] lb · w=1 · 4 GB · 1,5 · w=2 · 8 GB · 2,3,6,7 · w=1 · 4 GB · 4,8 · 4 GB · 8 GB · 4 GB · round robin · 80% · 40% · 80% · weighted 1 : 2 : 1 · 60% · 60% · 60% · non-uniform infra · as per weights · weighted round robin

[caption] Fig 2·bWeights 1 : 2 : 1 over 4, 8 and 4 GB. The big server takes two of every four requests. The gauges show each server’s utilisation: plain round robin leaves the big one near 40%; with weights, at the same traffic, all three sit near 60%.

One team arrived here by mistake. They had bought reserved instances in the wrong mix of sizes, and the cloud provider wouldn’t exchange them. Rather than keep them as spares, they put them into existing workloads and turned on weighted round robin.

Notice what the choice was really about: money. The algorithm matters because you pay for every machine behind the load balancer; if you don’t care whether the infrastructure is used well, the algorithm doesn’t matter at all. Every load balancer offers a fixed menu of algorithms, so check its documentation.

§ 2.3

## What if some requests take an hour?

Now change the traffic, not the servers. An analytics service answers one query in a second and the next in an hour or two. The servers are identical, so round robin looks fine on paper.

Before you play it: the same ten requests, some short and some long, go to two load balancers. One deals them in turn. The other sends each request to the server with the fewest connections open. Which one leaves a server drowning?

[caption] Clip 2·1The same ten requests through two load balancers: one dealing in turn, one picking the server with the fewest open connections.

[summary] The clip as text 0:35

- Two load balancers, same requests, same three servers.

- While every request is short, both look the same.

- Request 4 runs long and keeps s1 busy. 5 and 6 come and go.

- Request 7 is long too. Round robin: s1 again. Least connections: s2.

- Round robin keeps dealing long work to busy s1; s2 and s3 sit idle.

- Big variance in response times? Use least connections.

The same ten requests go through two load balancers, each in front of three identical servers s1, s2 and s3. Each server shows how many connections it has open, and each request is a bar on its server's time track: short ones end quickly, long ones keep running. Round robin deals the requests in turn, so requests 4, 7 and 10, the long ones, all land on s1: it ends with three open connections while s2 and s3 sit idle at zero. Least connections sends each request to the server with the fewest open connections, so request 7 goes to s2 and request 10 to s3, and each server ends with one long request. When response times vary a lot, use least connections.

Least connections works like this. The load balancer counts the connections it has open to each backend; a finished request closes its connection and frees that slot, and each new request goes to the backend with the fewest open. If two backends tie, pick either one at random.

Why would a connection count say anything about load? In the proxy of chapter 1, every client gets its own connection to a backend, open exactly as long as that client’s request is being served. So an open connection is a request in flight, and more of them means a busier server. A load balancer that keeps idle connections open between requests counts the active ones, or the outstanding requests directly; AWS’s Application Load Balancer, for one, offers “least outstanding requests”.

It is only a local decision: each request goes to whichever server looks least busy at that moment, and nothing plans globally. That is enough. With real workloads you have many more than three servers, and keeping each request off the busiest ones is all you need.

§ 2.4

## Why not just ask each server how busy it is?

It is the obvious improvement: before routing, check every backend’s CPU and send the request to the idlest.

The load balancer knows nothing about a backend’s CPU or memory. All it can see is its own network connections. To route on CPU, it would have to call another system, fire a query, look at recent usage and only then decide, for every request. That adds a network hop and milliseconds of delay to every request, when the routing decision has to take microseconds. So load-balancing algorithms are heuristics: the connection count is a rough measure of busyness that costs nothing to read.

What you can’t afford is a question per request. Load reports gathered in the background are fine: gRPC’s client-side weighted round robin, for instance, has backends report their utilisation and adjusts each backend’s weight from it, while every individual decision stays local and fast. Whenever you propose a clever design, ask whether it is practical at the speed the component has to run.

The strategy is settled, and your laptop load balancer now picks well. Before you put it in front of real users, though, count what each client costs it. You saw the number in chapter 1. Lecture 2 taught you to size a fleet by what one machine can serve; the load balancer is a machine too.

Lecture 5, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-many-lb-servers ===

# The box everyone draws, chapter 3: One LB server can hold 10,000 connections. How many clients is that?

Lecture 5 · The box everyone draws · chapter 3 of 8

§ 3

## One LB server can hold 10,000 connections. How many clients is that?

About 5 min

Your load balancer is one process on one machine, and a machine can hold only so many TCP connections at once. Say yours can hold 10,000. The number is only an example; real limits come from memory, file descriptors and ports.

[figure title] The load balancer so far

[figure description] The load balancer so far: one LB server proxies each client over two TCP connections to one of three backends. Marked new: the strategy that picks the next backend, round robin, weighted round robin or least connections.

[figure labels] new · tcp1 · lb server · 10.0.0.1:9000 · tcp1 → tcp2 (in memory) · copy bytes both ways · next: rr · wrr · least conn · tcp2 · 10.0.0.7:8081 · 10.0.0.8:8081 · 10.0.0.9:8081 · the load balancer so far

[caption] Fig 3·aThe load balancer so far. Marked new: the strategy that picks the next backend.

Pause and think

An LB server can hold 10,000 TCP connections. How many clients can it serve at the same time?

Every client costs two connections: its own to the LB server, and the LB server’s to a backend. Half the budget goes to backends, so 10,000 ÷ 2 = 5,000 clients.

So one LB server is a bottleneck, and the load balancer, like every other layer, has to scale horizontally: many LB servers instead of one. That is the test for every layer, not only the API servers: an autoscaling policy that adds API servers doesn’t make a system horizontally scalable if the load balancer, cache or database in front of or behind them can’t grow. A layer can stay on one machine (a database often does) as long as it carries the peak load and has a standby. The number you just worked out is what makes that possible to plan. Knowing what one server can carry, its unit economics, turns scaling into division, the same arithmetic Lecture 2 used for API servers: as long as the servers share nothing that runs out first, ten of them carry about ten times as much. Without that number you add machines by guesswork and either run short or pay for idle ones.

Many LB servers, though, raise a question one server never had. (Which of them a client dials comes back in chapter 5; first, what each one needs to know.) Each of them needs the backend list, and they all need the same one.

§ 3.1

## Where do ten LB servers learn the backend list?

Write down what a load balancer has to know. At the bare minimum: which algorithm it uses, and the ip:port of every backend behind it. You can make it fancier later, but start from the minimum. Keep that configuration in a database, the simple starting point, where every LB server can read it.

Not on every request, though. A load balancer already adds one network hop to every request, and it should add as little delay as possible. A call to the database costs a few milliseconds, around three to five, and paying that on every request passing through is far too expensive. So each LB server pulls its configuration from the database once, when it starts, and keeps a copy in memory. Requests are then routed from memory, without a network call. That is exactly what the laptop load balancer was already doing with its hardcoded list.

[figure title] An in-memory copy of the config

[figure description] Two LB servers, each with a small in-memory copy of the configuration. Each pulls the configuration from the config database once, at startup. A client request goes from the client to an LB server and on to a backend without touching the database: no database call per request, because a call costs about 3 to 5 milliseconds. The configuration holds the backends as ip:port, the algorithm, and the health endpoint.

[figure labels] lb · lb · ← config copy · no db call per request · backend · backend · backend · pulled once, · at startup · config db · 3–5 ms per call: too slow per request · { backends: [ip:port, …], · algorithm: "round_robin", · health_endpoint: "/health" }

[caption] Fig 3·bPulled once at startup, then every request is routed from memory. The dashed arrows are the LB servers asking the database for their configuration. The card spells out what is stored, including a field the next section explains.

The catch is in the word copy. The moment the configuration changes, every copy is out of date. And it will change: the most ordinary change of all is a backend going down.

§ 3.2

## A backend’s process crashes. Who notices?

Before any copy can be fixed, something has to detect the failure. Give that job to a component of its own: the orchestrator, the part of the load-balancer system that watches the backends.

What does it check? Not the machine. A backend is a virtual machine that may run hundreds of processes (SSH, nginx, other servers), and the load balancer cares about exactly one of them: the web server it sends requests to, say the profile service on port 8081. That process can crash on a divide-by-zero or a null pointer while the VM stays perfectly healthy, and a check of the VM would never notice. So the check is aimed at the service: a dedicated health endpoint, such as /health or /status, which answers 200 while the service can serve. Every HTTP server you build should have one, and its path goes into the load balancer’s configuration next to the algorithm and the backend list. A bare TCP check is a real option, and some cloud load balancers default to it, but it proves only that the port accepts connections, not that the service behind it can answer.

What the endpoint verifies is up to the service’s owner, not the load balancer. Most return OK as long as the web server runs; a stricter one also checks that it can reach its database. Which responses count as healthy is configurable too.

Pause and think

Who should start the conversation: should each backend send heartbeats to the orchestrator, or should the orchestrator call each backend’s /health?

The orchestrator has every backend’s address in the configuration, while a deployed service doesn’t know the orchestrator’s address at all. A health endpoint is also far less work for the people writing services than a thread that keeps sending heartbeats, and a self-report can claim “up” while the service can’t actually serve.

Lecture 1’s green dot had to work the other way round, and for the mirror-image reason: a server can’t open a connection to a laptop behind a home router, so the laptop had to push its own heartbeats. An orchestrator inside your network can reach every backend, so it asks. The building block is the same: something alive keeps proving it, and silence means down.

So the orchestrator fires health checks at every backend, continuously. When one fails, it updates the configuration in the database at once, taking that backend out of the list, and it keeps checking so the backend can come back when it answers again.

[figure title] The orchestrator asks; backends answer

[figure description] The orchestrator sends health checks (hb) to each backend’s health endpoint, /health on port 8081. Backend servers 1 and 3 answer 200. Backend server 2’s VM is up but its process crashed, so there is no 200. The orchestrator writes to the config database to remove b srv2.

[figure labels] config db · orchestrator · remove b srv2 · hb · continuous checks · 200 ✓ · no 200 · 200 ✓ · b srv1 · :8081 /health · b srv2 · :8081 /health · b srv3 · :8081 /health · vm up, process crashed

[caption] Fig 3·cThe orchestrator asks; backends only answer. b srv2’s VM is up but its process has crashed, so its /health returns no 200, and the orchestrator removes it from the configuration in the database.

The database now says backend 2 is dead. Every LB server is still routing from the copy it pulled when it started.

Lecture 5, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-stale-copies ===

# The box everyone draws, chapter 4: The database says backend 2 is dead. The LB servers haven’t heard.

Lecture 5 · The box everyone draws · chapter 4 of 8

§ 4

## The database says backend 2 is dead. The LB servers haven’t heard.

About 6 min

The orchestrator did its job: the configuration in the database no longer lists backend 2. But no LB server reads the database per request. Each routes from the copy in its own memory, and nothing has touched those copies yet.

[figure title] The load balancer so far

[figure description] The load balancer so far: many LB servers, each routing from an in-memory copy of the configuration that it pulls from a config database when it starts. An orchestrator calls every backend’s /health endpoint and updates the database when one fails. Marked new: the config database and the orchestrator.

[figure labels] new · new · lb servers · each with a config copy · backend · backend · backend · config db · orchestrator · updates · /health · the load balancer so far

[caption] Fig 4·aThe load balancer so far. Marked new: many LB servers with in-memory copies of a configuration kept in a database, and an orchestrator that checks every backend’s health endpoint.

§ 4.1

## How long until the LB servers find out?

The simplest fix is for every LB server to re-read the database on a timer.

Pause and think

Your LB servers re-read the configuration every 10 seconds. Backend 2 crashes one second after a read. What happens to the requests that the LB servers send it until the next read?

The LB servers route from their copies, which still list backend 2, so every request dealt to it fails until the next read, nine seconds later. In general, an interval of N seconds means up to almost N seconds of failures, depending on when in the interval the crash lands.

Your users see that window as a spike in the error rate, every time a backend dies. That is the real cost of polling, more than the load it puts on the database (the health checks themselves run on the orchestrator, so no user request waits on them): for as long as a copy is stale, real requests fail. Some load balancers do route around failures on their own: nginx marks a server unavailable after a failed attempt (or as many as you configure) and keeps it out for ten seconds by default. But that costs real requests first, and the list still has to change. Polling more often only narrows the window. To close it, the change itself has to trigger the update, the moment it happens.

§ 4.2

## Who tells the LB servers, and how?

Give every LB server a second door. Next to the port clients use, 9000, open a second one, 9091, a “meta” port: a small handler in the same process, or a second process that shares its memory. Whoever changes the configuration makes an ordinary call to that port, and its handler reads the database and replaces the in-memory copy. The update is near immediate.

You might be tempted to add a separate “handler” service that watches the database and tells the LB servers. Don’t: that is one more box to run and keep alive, for work the orchestrator can do by calling the port itself.

The orchestrator isn’t the only source of changes, either. Developers change configuration through the load balancer’s console: add backends, switch the algorithm, change the health endpoint. Every one of those changes lands in the database, and every one has to reach every LB server’s copy.

The same crash, first with the 10-second poll, then with a call to the meta port. Watch where the red stops.

[caption] Clip 4·1Polling leaves the LB servers routing to a dead backend until the next read. A call to the meta port makes them pull at once, and the window almost disappears.

[summary] The clip as text 0:39

- LB servers route each request from an in-memory copy of the list.

- Backend 2 crashes. The orchestrator notices and updates the db.

- The LB servers’ copies still list b2, so requests sent there fail.

- At the 10 s poll the copies catch up: nine seconds of errors.

- Replay with push: the orchestrator calls the LB servers’ meta port.

- The copies drop b2 at once. Requests skip it: almost zero staleness.

- Polling: errors until the next poll. Push: the window nearly closes.

LB servers route every request from an in-memory copy of the backend list, b1 b2 b3, and poll the database every 10 seconds. One second after a poll, backend 2 crashes. The orchestrator’s health check to b2 fails and it removes b2 from the database at once, but the LB servers’ copies still list b2. Requests go round robin, so every third one is sent to the dead b2 and fails. At the 10-second poll the LB servers pull the new list, b2 is struck from their copies and the errors stop: nine seconds of errors. The same crash is then replayed with push: right after the database update the orchestrator calls the LB servers’ meta port (9091), they pull the new list straight away, and every later request skips b2. The red window shrinks to almost nothing.

§ 4.3

## Fifty LB servers. Does someone call fifty ports?

Lecture 4 met this problem in Slack. Waiting for a poll was too slow to deliver each message, so every message was pushed to the servers that needed it the moment it happened, through a real-time Pub/Sub, and a timed fetch on the client was kept only as the fallback for a push that got lost. Do the same here. Calling fifty ports means one process making a call to every LB server, each time anything changes. Instead, publish one message to a real-time Pub/Sub such as Redis, which every LB server subscribes to, and that one publish reaches them all.

Who publishes? The orchestrator, the console, autoscaling (4.4), or the database itself, through CDC (change data capture), which turns each committed change in the database into an event. On a message, the LB server either takes the new configuration from it, or treats it as a signal and pulls the latest from the database; that part is your choice.

Remember what a real-time Pub/Sub promises, from Lecture 4: it delivers at most once. It hands a message to every subscriber connected at that moment, and keeps nothing. An LB server that was restarting or briefly disconnected when a change went out never sees it. So whenever an LB server (re)connects, it pulls the whole configuration once before it trusts the stream; or you use something durable, such as Redis Streams, which stores messages so that a reader that was away can catch up.

[figure title] Three ways a change reaches the LB servers

[figure description] A change can come from the orchestrator when a health check fails, from a developer through the LB console API, or from autoscaling; each writes to the config database (A). The database feeds a Redis Pub/Sub channel through CDC, or the orchestrator or console publish directly (B). The broker pushes the message to every LB server (C), and each refreshes its in-memory config copy (D). Option 1 instead: call each LB server on port 9091. Redis Pub/Sub is at-most-once, so an LB server that was offline re-pulls on reconnect.

[figure labels] lb · lb · lb · D · copies · refreshed · C · redis pub/sub · at-most-once: · an LB that was · offline re-pulls · on reconnect · cdc · B · or publish · directly · config db · A · orchestrator · health check failed · developer · lb console api · autoscaling · :9091 · option 1: call each LB

[caption] Fig 4·bThe config path, Ⓐ to Ⓓ. Any change goes to the database, reaches the broker (through CDC, or published directly), and is pushed to every LB server, which refreshes its copy. It is dashed because no request waits on it. Option 1, on the left, is the meta-port call.

Nothing about Redis is essential. What the design needs is a reactive broadcast, and server-sent events, ZooKeeper or plain HTTP calls to each server would all do. ZooKeeper, for instance, stores configuration and notifies every client watching it when it changes. Because every LB server still routes from memory, none of this costs a request anything.

Neither push is the one right answer; the call to each meta port and the broadcast each fit some situations. What both get right is the rule below.

The rule to keep

Make systems reactive, not polling-based.

A poll is a promise to be wrong for up to one interval. When something changes, tell everyone who depends on it.

§ 4.4

## Every LB server is busy. Who adds another?

The fleet has to grow when traffic does, and shrink when it drops. The orchestrator already watches the backends; it watches the LB servers too, and not only whether they are alive but whether they are overwhelmed. When the LB servers run hot it adds one, and when the load drops it removes one. For that it needs each LB server’s vital signs: CPU, memory, network, disk, and the number of open TCP connections.

Asking each LB server for its CPU now and then, the way the orchestrator asks for health, isn’t enough: a server at 100% may not even answer, and you want to act at 60, 70 or 80%, on a trend, which needs history. Nor does that history belong in the configuration database: configuration is key-value data, vitals are time series.

Don’t build a metrics system for the load balancer. Any organisation big enough to run its own load balancers already has a central place where every machine’s metrics are collected, and plugging into it is cheaper than reinventing it. Prometheus is a common choice. Every VM, LB server and backend alike, runs a small agent that exposes its metrics; Prometheus collects them by pulling from each agent on a schedule and keeps them as time series. The orchestrator queries it, say for average CPU over the last 30 minutes, and scales on the answer.

[figure title] Vitals flow into one place

[figure description] Every machine, LB servers and backends alike, runs an agent. Prometheus scrapes cpu, memory, network and disk from each agent and keeps them as time series, not key-value config. The orchestrator queries Prometheus for average CPU over the last 30 minutes, a history rather than a snapshot, and adds an LB server when the trend calls for it.

[figure labels] orchestrator · prometheus · query avg cpu (last 30 min) · history, not a snapshot · time series ≠ key-value config · add an LB server · scrape: cpu · mem · n/w · disk · lb · lb · lb · backend · backend · backend · agent · LB servers · backends

[caption] Fig 4·cOne place for every machine’s vitals. Prometheus scrapes the agents and keeps history; the orchestrator reads it and grows or shrinks the LB fleet itself.

It is the same machinery as the autoscaling group Lecture 2 put behind its load balancer: you write a rule such as “if average CPU passes this, add a server”, and the cloud evaluates it against its own metrics store. Here the orchestrator plays that part for the LB fleet itself, which users never see: to them there is only the name. It still runs its own health checks, though, instead of reading “up” from Prometheus: the design shouldn’t depend on the metrics system doing a job it wasn’t chosen for.

The fleet now grows and shrinks by itself, and every member has a fresh copy of the configuration. One thing doesn’t move: the client. It connected to one address in chapter 1, and it still has only that one.

Lecture 5, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-one-address ===

# The box everyone draws, chapter 5: Ten LB servers. Which address does the client dial?

Lecture 5 · The box everyone draws · chapter 5 of 8

§ 5

## Ten LB servers. Which address does the client dial?

About 8 min

In chapter 1 the client connected to 10.0.0.1, the only address it had. Now the orchestrator adds 10.0.0.2, 10.0.0.3 and more as traffic grows, and removes them as it falls. Nothing so far tells the client that any of them exist.

[figure title] The load balancer so far

[figure description] The load balancer so far: many LB servers with in-memory config copies, a config database, and an orchestrator that health-checks the backends. Marked new: a change in the database is pushed to every LB server through a real-time Pub/Sub, and Prometheus keeps every machine’s vitals for the orchestrator to scale on.

[figure labels] new · new · lb servers · each with a config copy · backend · backend · backend · config db · orchestrator · updates · /health · pub/sub · prometheus · the load balancer so far

[caption] Fig 5·aThe load balancer so far. Marked new: configuration changes pushed to every LB server through a real-time Pub/Sub, and Prometheus holding every machine’s vitals for the orchestrator to scale on.

§ 5.1

## Why can’t the client keep one IP address?

Because a plain IP address belongs to one machine. Hand clients the address of an LB server and you have tied the whole load balancer to that machine: two machines can’t answer to it, so the fleet can’t grow past one. (Very large systems do make one address stand for many machines at the network level. Google’s Maglev, for example, has routers spread packets across many load-balancer machines. This design takes the simpler road.)

What stands for many addresses is a name. Every load balancer you create gets its own domain name, say payments.lb.google.com, and its DNS entry holds the IP addresses of its LB servers: 10.0.0.1, 10.0.0.2, and so on. Machine addresses only, no ports: every LB server listens on the same port, 9000. When the orchestrator adds an LB server, it adds that machine’s IP to the entry, and when one goes down it takes the IP out. Nobody edits DNS by hand.

And it is a private name. When people hear DNS they think of public names like google.com, but you can run DNS inside your own network, and a load balancer for an internal service should stay private. A private one needs many LB servers just as much as a public one does. A DNS server is a light, simple process. CoreDNS is a common open-source one, used across the Kubernetes world. Run it inside your infrastructure, configure every machine to use it, and every name those machines look up is resolved by your CoreDNS.

§ 5.2

## Does every request now pass through DNS?

If it did, you would have rebuilt the problem: DNS would be the box every request squeezes through, a load balancer with a new name. Running several DNS servers would only move the question to “who balances between them?” Step through one request and watch where DNS drops out.

[figure title] Resolve, then connect

[figure description] Swim lanes for a client, CoreDNS, the LB server at 10.0.0.1 and a backend, time running down. 1: the client asks CoreDNS for the load balancer’s name. 2: CoreDNS picks one IP and answers 10.0.0.1. 3: a wrong path, CoreDNS forwarding the request to the LB server, is struck through in red; CoreDNS only hands out addresses. 4: the client caches 10.0.0.1, connects to the LB server itself, the LB server forwards to a backend, and the response comes back. 5: the LB server at 10.0.0.1 is down; the connect fails, the client asks CoreDNS again, gets 10.0.0.2 and connects there.

[figure labels] client · coredns · lb · backend · 10.0.0.1 · time · name? · 1 · 10.0.0.1 · picks one IP · 2 · I just hand out addresses. · forward? · 3 · 10.0.0.1 · cached (TTL) · connect · response · 4 · connect fails · 10.0.0.2 · 10.0.0.2 · 5

- The client asks DNS for the load balancer’s name, payments.lb.google.com.

- DNS answers with an LB server’s IP, 10.0.0.1. That is all it does.

- The struck-out path never happens: DNS does not pass the request on. If it did, it would be the load balancer.

- The client caches 10.0.0.1 and connects to it itself. The LB server proxies to a backend, and the response comes back the same way.

- Later, that LB server is dead. The client’s connect fails, it asks DNS again, and it connects to 10.0.0.2.

Keys: ← → to step · link to a step with #fig-5b/step-3

[caption] Fig 5·bTime runs down. Dashed arrows are the lookup and its answer; blue is the request, green the response. DNS takes part in steps 1, 2 and 5, never in the request itself.

DNS is a name-resolution service: given a name, it returns an address, nothing more. It never sees the request, so it is no bottleneck for requests. It doesn’t even know about load: it hands the addresses out in turn, or shuffles their order, and balancing stays in the LB servers. Many answers carry several addresses, and the client chooses which to use.

The client keeps the answer for a while, the record’s TTL, so it doesn’t ask on every request. AWS’s load balancers use a 60-second TTL, so that addresses can be remapped quickly. When a cached address stops answering, a well-built client doesn’t sit out the rest of the TTL. Many clients first try the other addresses from the same answer, and failing that, they ask again. It’s like a toothache: you have a check-up booked, but if the tooth hurts today, you don’t wait for the date.

And CoreDNS itself? It holds nothing but that map, so you run several copies of it, and every machine lists more than one nameserver (up to three), tried in order.

§ 5.3

## The orchestrator watches everything. Who watches the orchestrator?

Look at what now depends on the orchestrator: every health check, every update to the backend list, every LB server added to DNS. If it dies, dead backends stay in rotation and the fleet stops adjusting. It is a single point of failure, and that is not acceptable.

Pause and think

You run three copies of the orchestrator from the same code, one of them in charge. It dies. How does one of the others take over?

Run them as leader and followers. If the leader dies, a follower takes its place automatically, with a second or two of downtime. Choosing the new leader is called leader election, and it replaces a human spinning up a replacement by hand.

The takeover is that quick because the orchestrator is stateless. Every piece of state, the LB servers’ IPs, the backends’ IPs, the configuration, lives in the database, so the new leader has nothing to copy. It simply starts sending the health checks, and the servers answer whoever asks; they never need to know who the leader is.

The leader election needs a watcher too, and this time the recursion stops. Above the orchestrators sits one global monitor, with a standby of its own. Its only job is to watch the leader of every orchestrator cluster you run and react when one goes down, by triggering an election or adding nodes. Its job is so small that nothing needs to sit above it, and the standby makes its failure unlikely. It is the base condition of the recursion.

[figure title] Base of the recursion

[figure description] Three tiers. Top: a global monitor with a standby; its only job is to watch the leaders of the orchestrators. Middle: the orchestrator as one leader and two followers, any of which can take over. The leader sends health checks to the LB servers and the backends. All state lives in the config database, so followers copy nothing. The leader has failed (red outline, a cross at its corner), and a follower takes over as leader within one or two seconds and simply starts sending health checks.

[figure labels] tiny job: watch the masters · global monitor · standby · hb · takes over as leader in 1–2 s · orchestrator · leader · orchestrator · follower · orchestrator · follower · any follower can take over · config db · all state lives here: · followers copy nothing · hb · hb · LB servers · backends

[caption] Fig 5·cThe leader has just failed (red), and a follower takes over. It copies nothing, because all state is in the config database; it simply starts sending health checks. Above it, one global monitor with a standby ends the recursion.

§ 5.4

## What does the whole thing look like?

Put every piece on one page. Several LB servers behind one private name; CoreDNS answering for that name; the configuration database with the console developers use; the orchestrator, elected, checking health and scaling the fleet; Prometheus holding every machine’s vitals; and the Pub/Sub that carries every change.

[figure title] The finished load balancer

[figure description] The whole design with two traced paths. Request path, blue, numbered 1 to 5: the client looks up payments.lb.google.com in the private CoreDNS, gets 10.0.0.1 back, connects to that LB server, the LB server picks a backend by its strategy, and the response goes back to the client in green. Config path, dashed, lettered A to D: a developer through the LB console, autoscaling, or the orchestrator changes the config database; CDC carries the change to Redis Pub/Sub; Pub/Sub pushes it to every LB server; each LB server refreshes its in-memory config copy. Control lines, thin: the orchestrator sends health checks to the LB servers and the backends, queries Prometheus, and adds or removes LB IPs in CoreDNS; Prometheus scrapes the backends and feeds autoscaling, and autoscaling points into the LB console / APIs. The orchestrator runs as an elected leader with followers.

[figure labels] private infra · coredns · 2 · 10.0.0.1 · 1 · payments.lb.google.com? · 3 · 5 · LB servers · backend · backend · 4 · 5 · leader election · orchestrator · hb · hb · add / remove LB IPs · query · prometheus · scrape · updates · config db · A · cdc · B · redis pub/sub · C · D · lb console / apis · developer · autoscaling · read: Maglev, a fast and reliable software network load balancer

[caption] Fig 5·dThe finished load balancer. The request path is the only blue line, ① to ⑤; the config path is dashed, Ⓐ to Ⓓ, because no request waits on it. The thin lines are the orchestrator’s health checks, its query to Prometheus and its writes to CoreDNS, and Prometheus scraping the machines and feeding autoscaling.

Two paths run through it, and they never wait on each other: a request touches nothing but memory on its way to a backend, and a change goes into the database and is pushed out to every LB server’s copy. Google’s Maglev paper covers the same ground at far larger scale, including the network-level road this design skipped in 5.1, and much of this design draws on it.

[summary] Go deeper: what a load balancer is not skip unless you design the edge

A load balancer spreads requests over a homogeneous set of servers; each service gets its own. It is a reverse proxy, and an API gateway is a more powerful proxy in front of it. Users reach payments.google.com, the gateway, through public DNS; the gateway forwards each path to a private load balancer, resolved through CoreDNS. Deciding whether A may pay B is the service’s business logic, not the load balancer’s.

§ 5.5

## What did every box you added have in common?

Each one was added because something else could die. One LB server ran out of connections, so there are many. A backend could crash, so the orchestrator checks. The orchestrator could crash, so it has followers and a monitor. CoreDNS runs as several copies. Even the configuration database needs a standby. Every component of the design stays up when one of its machines doesn’t. That is the habit the whole build ran on: assume anything that can go wrong will.

Two different failures hid in that list. A layer that can’t scale out is a bottleneck: one LB server, 5,000 clients. A layer with no standby is a single point of failure: one orchestrator, gone. Fixing one doesn’t fix the other: a database standby survives a crash but serves no reads, and AWS says outright that its Multi-AZ standby “isn’t a scaling solution”.

And from the outside, none of it shows. A client sees one name, payments.lb.google.com, and gets an answer. Behind it, machines join, die and are replaced. That is what a distributed system is: many machines that together look like one coherent system to whoever uses it.

Now look at what that costs you. Work now runs on many machines, and many machines can reach for the same thing at the same moment. Inside one database, Lecture 3’s locks just worked, because the database kept, in its own memory, the record of who held which row. When the thing being fought over lives on no single machine, nobody keeps that record unless you build it. That is the second build.

Lecture 5, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-take-turns ===

# The box everyone draws, chapter 6: Three machines, one queue that protects nothing. Who reads next?

Lecture 5 · The box everyone draws · chapter 6 of 8

§ 6

## Three machines, one queue that protects nothing. Who reads next?

About 7 min

Here is the second build. Someone has built a very careless remote queue; its ID is queue 7, and the lock you build will be named after it. It is remote, like Amazon SQS, but it offers none of SQS’s guarantees. Its whole API is one call, and behind that call the queue simply pops the next message. Two consumers that call at the same moment can both get the same message.

You have three consumers on three machines reading from it, and one rule: at any moment, only one of them may be reading and processing a message. Throughput doesn’t matter here; exclusivity does. You can’t change the queue, and you can’t touch the machine it runs on. To you it is a black box with one unprotected call. (Real queues such as SQS, RabbitMQ and Kafka do keep two consumers off the same message, though they may deliver it again later. This one is a constraint, chosen so that you have to build the protection yourself.)

[figure title] The lock so far

[figure description] The lock so far: three consumers on three machines call pop on queue 7, a remote queue with no protection. Consumers 1 and 2 call at the same moment and both get message 1. Nothing keeps them apart yet.

[figure labels] queue 7 · remote · pop() only · consumer 1 · consumer 2 · consumer 3 · pop() · got msg 1 · got msg 1 · nothing keeps them apart yet · the lock so far

[caption] Fig 6·aThe lock so far: nothing. Three consumers, one queue with a single unprotected call, and two consumers holding the same message.

§ 6.1

## Why would machines ever need to take turns?

Because their work touches the same things, and no single machine sees all of it. In Lecture 3 every booking transaction ran inside one database, and the database recorded, in its own memory, which transaction held which row. One machine, one process: taking a lock was a memory update.

Now spread the work out. Two transactions run in a distributed fashion, across machines, and both are about to update the same data; one has to stop the other, or the data ends up wrong. There is no single database whose memory holds the record any more. Whenever several processes on different machines must coordinate to keep data consistent, they need a lock they all respect, and that lock is the heart of keeping a distributed system’s data correct. Even a database spread over shards has to keep this record across machines: a MongoDB transaction that updates documents on shards 1, 3 and 5 holds a lock on each of them, and each shard keeps the locks for its own documents.

Outside a database, what you need is a lock manager: something all the machines can reach, which keeps track of which item is locked by whom and tells everyone else to wait. The queue consumers are the smallest case of it: three processes, three machines, one shared thing that protects nothing. When nothing in the middle keeps the record, you build it.

§ 6.2

## Threads share memory, processes share a disk. What do machines share?

Start small. Threads in one process take turns through memory: a mutex, a semaphore, an atomic instruction. They share RAM, so they coordinate through it. The transactions inside Lecture 3’s database did the same.

Processes don’t share RAM. One engineer met that in his first year of college, around 2008: to make an Ubuntu upgrade go twice as fast he ran apt-get upgrade in two terminals at once, and the second one refused to run because it couldn’t get the lock. Two installs at once would leave the system inconsistent, so the package manager holds a lock on a file, /var/lib/dpkg/lock; the kernel keeps that lock and drops it the moment the holder exits. Two processes coordinate through something they do share: a file on the same machine.

Now two machines. They share no RAM and no disk. What is left?

[figure title] The sharing ladder

[figure description] Three rows. Threads: two threads inside one process share a RAM chip, and synchronize with a mutex, a semaphore or atomic instructions. Processes: two apt-get processes share the disk, through the lock file /var/lib/dpkg/lock; run apt-get upgrade twice and the second one refuses. Machines: two machines share nothing but the network, so they need a remote lock. An arrow down the side reads: nearest storage they share.

[figure labels] nearest storage they share · threads · ram · processes · apt-get · apt-get · /var/lib/dpkg/lock · machines · machine 1 · machine 2 · network · mutex · semaphore · · atomic instructions · apt-get upgrade, twice: · the second one refuses · a remote lock

[caption] Fig 6·bEach rung shares less. Threads coordinate through memory, processes through a lock on a file, and machines through the only thing they still have in common: the network.

To make two things take turns, look for the nearest storage they share. For machines, that is only the network, so their lock must live in something they all reach over it: a remote lock. It is also the most expensive way to coordinate there is. A mutex is two lines of code and costs almost nothing, while every network call is a round trip. So if the work that needs protecting lives on one server, use that server’s own primitives, a mutex or an atomic instruction, and keep the network out of it.

§ 6.3

## The queue protects nothing. What can you change?

Only your own consumer code. Hold the constraints in mind (three machines, a black-box queue, one unprotected call) and pick a fix.

Pause and think

Which of these keeps two of your consumers from reading queue 7 at the same time?

A synchronized block coordinates threads that share memory, and your consumers are on three machines. The queue’s server is out of reach. A gatekeeper could work, but only because it would itself be a lock manager, one more service to build and keep alive (chapter 7 builds one). At its core, what you need is a record of who may read. What’s left is a lock manager: a store holding queue7 → consumer 1.

The protocol is short. Consumer 1’s name is in the store, so consumer 1 reads; consumers 2 and 3 see a name that isn’t theirs, and wait. When consumer 1 has read and processed its message, it removes its name. Consumers 2 and 3 race to write theirs, the winner reads, and the loser waits again. A lock manager stores exactly two things: what the resource is, and who owns it.

Nothing connects the store to the queue. A consumer could skip the lock and read anyway, and then two of them could get the same message again. The protection holds only because you write the consumer code, and every consumer runs the same steps: take the lock, read, process, release.

§ 6.4

## The holder dies holding the lock. Now what?

Consumer 1 takes the lock, and its machine dies before it can remove its name. Nobody else ever will. The lock is held forever by a consumer that no longer exists, and the whole system stalls. So every lock entry gets a TTL: if the holder hasn’t removed it within a set time, the entry expires on its own.

Now you know what the store has to offer: key-value access (resource → owner), atomic instructions (so two consumers can’t both take the lock) and expiry. Only then pick a store that has all three. Redis does, and it keeps its data in memory, which makes it fast; DynamoDB is another option. Choosing in that order, needs first and product last, is the habit to keep.

[figure title] A database as the lock manager

[figure description] The same queue and three consumers, now with a database below them. Each consumer writes to the database. The database holds one entry, queue7 → c1, with a TTL: consumer 1 holds the lock and pops from the queue, consumers 2 and 3 wait. The entry expires on its own. The store needs key-value access, atomic instructions and TTL.

[figure labels] queue 7 · remote · unprotected · consumer 1 · consumer 2 · consumer 3 · pop() · db · holds it · wait · wait · queue7 → c1 · + TTL · the entry expires on its own · needs: k,v · atomic · TTL

[caption] Fig 6·cThe lock lives in a store every consumer can reach. Consumer 1’s name is in it, so consumer 1 reads and the others wait. The entry carries a TTL, so a dead holder can’t keep it forever.

In Redis, the whole lock is one command:

SET queue7 <token> NX EX 300

NX sets the key only if it doesn’t exist yet, so an existing lock is never overwritten, and EX 300 attaches a five-minute expiry in the same command. Redis answers OK if it set the key and nothing (nil) if someone else holds it. Two details matter. Set the expiry in that one command, not with a separate EXPIRE afterwards: a consumer that dies between the two calls would leave a lock that never expires. And make the value a token unique to this lock request, such as 20 random bytes, not just the machine’s name, because two processes or two retries on one machine can contend too.

Why can only one consumer win? Because Redis runs one command at a time: while one command executes, no other runs. However many consumers send that SET at the same moment, exactly one gets OK. The losers keep trying until the lock is free. Make them pause for a short random moment between attempts rather than spin, or they hammer Redis with requests. With redis-py:

import random, secrets, time import redis r = redis.Redis() token = secrets.token_hex(20) # unique to this lock request while not r.set("queue7", token, nx=True, ex=300): time.sleep(random.uniform(0.05, 0.2)) # someone holds it: wait, then retry # we hold the lock: read and process one message, then release

Acquiring is safe now. Releasing looks like the easy part: when you are done, delete the key.

Lecture 5, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-whose-lock ===

# The box everyone draws, chapter 7: The job takes six minutes. The lock lasts five.

Lecture 5 · The box everyone draws · chapter 7 of 8

§ 7

## The job takes six minutes. The lock lasts five.

About 5 min

Every consumer now runs the same loop: take the lock with SET … NX EX 300, read a message, process it, release. The TTL protects you from a holder that dies. It also creates a holder that is merely slow.

[figure title] The lock so far

[figure description] The lock so far: before popping, every consumer tries SET queue7 with its own token, NX, EX 300 on one Redis. Only one succeeds; it pops while the others keep trying. Marked new: the lock in Redis.

[figure labels] new · queue 7 · remote · pop() only · consumer 1 · consumer 2 · consumer 3 · pop() · redis · SET queue7 ‹token› · NX EX 300 · holds it · the lock so far

[caption] Fig 7·aThe lock so far. Marked new: every consumer takes the lock in Redis with SET … NX EX 300 before it pops; only one succeeds.

§ 7.1

## What does a plain DEL delete?

Pause and think

Consumer 1 takes the lock with a five-minute expiry, but its job takes six. When it finishes, it releases with a plain DEL queue7. Is that safe?

At five minutes Redis expires the key, and consumer 2’s next SET succeeds. At six minutes consumer 1’s DEL removes consumer 2’s lock, while consumer 2 is still working.

So the first rule of releasing: never delete a lock that isn’t yours. Before deleting, read the key and delete it only if it still holds your token. That is why the value is a token and not just “locked”: it is how a consumer recognises its own lock.

§ 7.2

## Check the owner in your own code. Is that enough?

Written in Python, the check looks harmless:

if r.get("queue7") == token.encode(): # still mine? r.delete("queue7") # … then release

Now imagine the program stalls for a moment between those two lines. GET returns consumer 1’s token. Right then, the key expires; consumer 2 takes the lock; and then consumer 1’s delete runs, removing consumer 2’s lock. The condition was true when it was checked and false when it was acted on. Edge cases like this are where distributed systems get their reputation: miss one, and your system is simply not correct.

The check and the delete have to be one step that nothing can come between, and only Redis can make it one. Redis runs Lua scripts sent with EVAL, and while a script runs, Redis runs nothing else, so no other consumer can take the lock halfway through. It behaves a little like a transaction. Lua itself is nothing special here; the atomicity comes from Redis running the script inside the server. Your program stays in Python and sends the script like any other command.

RELEASE = """ if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) end return 0 """ r.eval(RELEASE, 1, "queue7", token) # 1 if released, 0 if the lock wasn’t ours

The whole story in one timeline: a five-minute lock, a six-minute job, the blind DEL, then the release done in one step. In the clip, c1 and c2 stand for each consumer’s token.

[caption] Clip 7·1The lock expires under consumer 1, consumer 2 takes it, and consumer 1’s blind DEL removes consumer 2’s lock. The replay checks the owner and deletes in one atomic step.

[summary] The clip as text 0:35

- Two consumers, one lock in Redis with a five-minute expiry.

- Consumer 1 takes the lock. Consumer 2 keeps trying.

- Consumer 1 is slow. The lock expires underneath it.

- Consumer 2 gets the lock. Two consumers are now working.

- Consumer 1 releases, and deletes consumer 2’s lock.

- Replay with EVAL: check the owner and delete in one atomic step.

- Release only if it’s still yours, in one atomic step.

Three lanes on one time axis in minutes: consumer 1, the Redis key queue7, and consumer 2. At 0 minutes consumer 1 sends SET queue7 c1 NX EX 300 and gets OK, so the key holds c1 with a five-minute expiry, while consumer 2 keeps retrying the same SET and is refused. Consumer 1 works for longer than five minutes. At 5 minutes Redis expires the key on its own, and consumer 2’s next retry gets OK: the key now holds c2 and both consumers are working. At 6 minutes consumer 1 finishes and releases with a plain DEL queue7, which deletes consumer 2’s lock while consumer 2 is still working. The release is then replayed with EVAL, a Lua script Redis runs atomically: it checks whether the key still holds c1 and deletes only then. It returns 0, and consumer 2’s lock stays.

The habit behind this fix is worth more than the fix. When you design a distributed system, imagine that after every single line, something lags or goes down, and check that the system still holds. “I’ll take a lock” is not a design; the lines around it are.

[summary] Go deeper: the job really needs six minutes skip unless your jobs run long

A TTL caps how long you may hold a lock, and every lock with expiry has that cap; without it you risk a lock nobody ever frees. Long jobs don’t need a long TTL, though. Keep the TTL short and let the holder extend it while it is still working: in Redis, a small script that resets the expiry only if the key still holds its token. The DynamoDB lock client does the same with heartbeats against a lease, for example a heartbeat every 3 seconds on a 10-second lease.

§ 7.3

## Does the lock have to live in Redis?

No. What you need is the three properties from chapter 6, key-value access, an atomic way to take the lock, and expiry, and anything that offers them will do. Think in properties, then pick the stack you are comfortable with.

A MySQL row works: the lock is one row, and the database’s atomicity makes taking it safe, as long as you handle expiry yourself. A cron job that clears stale locks will do it, coarsely, since a stale lock survives until the next run; checking an expires_at column in the statement that takes the lock is tighter. MySQL also has named locks built in: GET_LOCK('queue7', 10) returns 1 when you get the lock, and the lock is released when your session ends, normally or not, so a crashed holder process frees it (a holder whose machine vanishes frees it only when MySQL drops the idle connection, which you should set to a short timeout). It lives on a single MySQL server.

A server that accepts one connection at a time works too, and you already have most of the code. Take chapter 1’s accept loop, and instead of handing each connection to a goroutine and looping back, accept one connection and serve it until it closes. The server writes one byte, “granted”, to the connection it accepts, and every client blocks reading that byte before it touches the queue. Whoever has received it holds the lock until it closes the connection. It is a fundamental idea, and a few hours of work to build.

[figure title] A lock server that accepts one connection

[figure description] Three consumers above one TCP lock server that serves only one connection at a time. Consumer 1 has connected, solid green, and the server has written “granted” to its connection: that is the lock. Consumers 2 and 3 connect too, dashed; their connections are open but have received nothing, and they wait in the server’s backlog until consumer 1’s connection closes.

[figure labels] consumer · 1 · consumer · 2 · consumer · 3 · got · “granted” · lock server · serves one connection at a time · the others wait in its backlog

[caption] Fig 7·bA lock with no Redis: a TCP server that serves one connection at a time. It has accepted consumer 1’s connection and sent it “granted”: that is the lock. The other consumers are connected too, but wait in the server’s backlog for their own “granted”.

Two details decide whether it holds up. The other clients aren’t turned away: the operating system completes their connections and parks them in the server’s backlog. Their connect has already succeeded, which is why they must wait for the byte: until it arrives, an open connection means nothing. Once the backlog is full, new clients are refused or simply left retrying, depending on the operating system. And if the holder’s process crashes, its connection closes and the lock is free; but if the holder’s machine dies or drops off the network, the server’s socket can stay open for a long time (TCP keepalive is off unless the program turns it on, and Linux’s default waits two hours before the first probe. Go’s listener does turn it on, and even then a dead peer takes a couple of minutes to notice), so this lock needs a timeout of its own.

Look at what Redis, the MySQL row, GET_LOCK and the one-connection server have in common. Each lock lives on exactly one server.

Lecture 5, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-lock-store-dies ===

# The box everyone draws, chapter 8: All locking runs through one Redis. What happens when it dies?

Lecture 5 · The box everyone draws · chapter 8 of 8

§ 8

## All locking runs through one Redis. What happens when it dies?

About 8 min

The lock is correct now. Every consumer takes it with one atomic SET, and releases it with one atomic script. And all of it runs through a single Redis server. If that server goes down, nobody can take the lock: every consumer’s SET fails, and the system stalls. It is a single point of failure, the same question Build 1 asked of the orchestrator.

[figure title] The lock so far

[figure description] The lock so far: consumers take the lock in Redis with SET … NX EX 300, pop, then release. Marked new: the release, a script run with EVAL that deletes the key only if it still holds this consumer’s token.

[figure labels] new · queue 7 · remote · pop() only · consumer 1 · consumer 2 · consumer 3 · pop() · redis · SET queue7 ‹token› · NX EX 300 · holds it · release: EVAL, delete only if still mine · the lock so far

[caption] Fig 8·aThe lock so far. Marked new: the release, a script that deletes the key only if it still holds this consumer’s token, run inside Redis in one step.

§ 8.1

## Why not just add a replica?

Pause and think

Give the lock’s Redis a replica, and promote the replica automatically when the primary dies. Is the lock now safe?

Redis copies writes to its replicas asynchronously. If the primary grants consumer 1 the lock and dies before that key reaches the replica, the promoted replica has never heard of the lock, and consumer 2 gets it too.

Lock services that do run as clusters, such as ZooKeeper, etcd and Google’s Chubby, replicate their state with a consensus protocol, where the servers agree on each change before it counts. ZooKeeper’s lock works like this: each client creates a numbered, temporary node under the lock’s path; the lowest number holds the lock, and every other client watches only the node just before its own, so a release wakes exactly one waiter. The node disappears when its client’s session ends. It is the same ZooKeeper that could have carried the configuration changes in chapter 4; know how it works inside rather than just naming it.

Redlock, the distributed version of the Redis lock, takes a third route, and its only purpose is to remove the single point of failure of a lock that lives on one instance.

§ 8.2

## Five independent nodes. When is the lock yours?

Run five Redis servers, fully independent: no replication, no link between them at all. To take the lock, send the same SET queue7 <token> NX EX 300 to all five, one after another or in parallel.

The lock is yours only if two things are true: you got it on a majority of the nodes, at least three of the five, and getting them took less time than the lock’s TTL. The time you may actually use is the TTL minus the time you spent acquiring. A majority is what makes the lock exclusive: two clients can’t both hold three of five.

If you don’t get a majority, release at once, so the others can try. Release on all five nodes, even the ones you think you didn’t get, because a SET can succeed while its reply is lost; the release script deletes only your own token, so this is safe. Then wait a random moment before trying again, so that competing clients stop colliding.

Two clients race for the same lock on five nodes; one gets three, the other two. What happens to the winner’s lock when a node goes down?

[caption] Clip 8·1Three of five, in time, wins the lock; the loser releases what it took and retries later. One node going down doesn’t free the lock: no one else can reach three.

[summary] The clip as text 0:36

- Five independent Redis nodes. No replication between them.

- Both clients race for the lock on every node.

- More than half, in time, is a win. Two of five is not.

- The loser gives back what it took, at once, and retries later.

- r2 goes down. C1 still holds; no one else can win three of five.

- One node down, and the lock still holds.

Five independent Redis nodes, r1 to r5, with no replication between them. Two clients, C1 and C2, each send SET NX for the same lock to all five nodes at once. C1's requests land first on r1, r2 and r3, which store c1; C2's land first on r4 and r5, which store c2; every later request is refused. C1 holds three of five, more than half, and got them in less than the lock's TTL, so it has acquired the lock. C2 holds two of five, which is not a majority, so it fails: it immediately releases r4 and r5 and waits a random delay before retrying. Then r2 goes down and its key is lost. C1 still holds the lock, and when C2 retries it is refused on r1 and r3, gets no answer from r2, and again gets only r4 and r5, two of five, so it fails and releases them again. One node down, and the lock still holds.

None of this is free: every acquire now talks to five servers instead of one. Section 8.4 comes back to what that costs.

§ 8.3

## Two of your three nodes restart empty. Who holds the lock?

One node dying is no problem: your other two still hold the lock, and nobody else can reach three. But nodes come back.

[figure title] Two holders

[figure description] Five lock cells, one per Redis node r1 to r5, shown again at each moment. 1: c1 holds r1, r2 and r3, a majority. 2: r1 and r2 crash and restart straight away, empty; only r3 still says c1. 3: c2 locks r1, r2 and r4, three of five; c1 also believes it holds the lock: two holders. 4: c1 does not go back for more nodes, so this can happen at any time until its lock expires: the window is the whole TTL. 5: the fix, keep a crashed node out for longer than the max TTL; r1 and r2 stay out, and c2 can get only r4 and r5, two of five, no majority.

[figure labels] r1 · r2 · r3 · r4 · r5 · 1 · c1 locks r1, r2, r3: three of five · c1 · c1 · c1 · 2 · r1 and r2 crash, restart empty · c1 · 3 · c2 locks r1, r2, r4: also three · c2 · c2 · c1 · c2 · two holders · 4 · possible until c1’s lock expires: · the window is the whole TTL · 5 · fix: keep r1, r2 out > max TTL · out · out · c1 · c2 · c2 · c2 gets two of five: no majority

- C1 locks r1, r2 and r3: three of five, a majority.

- r1 and r2 crash and restart straight away, with no memory of the lock. Only r3 still says c1.

- C2 locks r1, r2 and r4: three of five as well, and C1 still believes it holds the lock. Two holders.

- C1 does not go back for more nodes; it holds what it won in one pass. So this can happen at any time until its lock expires: the window is the whole TTL.

- The fix: keep a crashed node out for longer than the longest TTL before it rejoins. Every lock it held has expired by then, and C2 reaches only two of five: no majority.

Keys: ← → to step · link to a step with #fig-8b/step-3

[caption] Fig 8·bEach row is the lock entry on each of the five Redis nodes at one moment; time runs down.

Redis calls that fix delayed restarts; the alternative is to have every node write each lock to disk before answering (appendonly yes with appendfsync always, at a cost in write speed). Other gaps remain: a holder whose process pauses can wake after its lock expired and carry on, and Redis measures expiry with the wall clock, so a clock that jumps can expire a lock early. Redis’s own documentation therefore asks you to use fencing tokens rather than trust that a lock lasts as long as the process that took it.

So Redlock doesn’t remove every edge case; it shrinks them. In distributed systems you say an edge case is minimized, never that it is fully covered. It fits where a lock must survive its server dying, and correctness and availability matter more than throughput. Martin Kleppmann draws the line more sharply: if a lock only saves duplicate work, a single Redis is enough; if it protects correctness, use a consensus system such as ZooKeeper, with fencing tokens: a number that grows with every lock granted and travels with every write, so the storage can reject a write from a holder whose lock has passed to someone else.

You don’t need five servers to see this. Run five Redis processes on one laptop, on ports 6379 to 6383, inject delays of one, five and fifteen seconds, kill two nodes and restart them at once, and watch two consumers hold the lock. Restart them only after the TTL, and that failure goes away.

§ 8.4

## Five nodes, and the lock got slower. Why do it?

Because you weren’t trying to make it faster. Spreading the lock over five nodes doesn’t handle more load; with five round trips per acquire, and contending clients taking and returning partial locks, it lowers throughput. You don’t put it on a hot path. What it buys is that the lock survives a server dying: fault tolerance and availability. In one engineer’s experience, few companies ever need a lock spread over several servers: managed cloud services already give most teams the guarantees they need, and the ones who must build it are the teams building those services. A single-server lock like the one in chapter 7 is far more common.

Build 1 made both moves. Adding LB servers, each good for about 5,000 clients, was scaling out: more machines for more load. Leader election and the standbys were there so that a death costs seconds instead of an outage: distributing for fault tolerance. Redlock is the second move in its purest form, paid for in throughput. When someone proposes “making it distributed”, ask which one they mean.

§ 8.5

## What you can now do

- Build a load balancer: accept, dial a backend, copy bytes both ways, close both when one side ends. Two connections per client: 10,000 connections serve 5,000 clients.

- Pick the algorithm from servers and traffic: round robin for identical ones, weights for mixed sizes, least connections when response times vary widely. Never a query per request.

- Keep a fleet consistent: config in a database, copied into memory; an orchestrator calling /health; changes pushed through a meta port or a real-time Pub/Sub, with a re-pull on reconnect. A 10-second poll means up to almost 10 seconds of errors.

- Give many machines one name: a private DNS entry the orchestrator keeps current. DNS answers and steps aside.

- Classify failures: can’t scale out is a bottleneck; no standby is a single point of failure.

- Lock across machines: SET key <unique token> NX EX ttl; release with a script that deletes only your token; extend the lease for long jobs. To survive the lock server: a majority of five independent nodes within the TTL, delayed restarts, fencing tokens where correctness depends on it.

Your LB servers re-read their configuration every 30 seconds. A backend dies. What do users see, and what two designs shrink it to almost nothing?

[summary] Show answer

Up to almost 30 seconds of failed requests: every LB server keeps routing to the dead backend from its stale copy until its next read. Push the change instead: whoever changes the configuration calls each LB server’s meta port, or publishes it once to a real-time Pub/Sub that every LB server listens to (and pulls the full configuration whenever it reconnects, since a missed message is gone).

If every client looks up the load balancer’s name in CoreDNS, why isn’t CoreDNS the new bottleneck?

[summary] Show answer

DNS only turns the name into an address; the client then connects to the LB server itself, and caches the answer for the record’s TTL. No request passes through DNS, and CoreDNS, holding nothing but the name-to-addresses map, runs as several copies.

Consumer 1 checks that the lock key still holds its token, then deletes it, in two Python calls. What can go wrong, and what is the fix?

[summary] Show answer

Between the GET and the DEL the key can expire and consumer 2 can take it, so the DEL removes consumer 2’s lock. The check and the delete must run as one step inside Redis: a Lua script sent with EVAL.

Five Redis nodes: when do you hold a Redlock, what do you do when you don’t, and what does the whole arrangement buy you?

[summary] Show answer

When you got the lock on at least three of the five, in less time than the TTL. Otherwise release on all five, even the ones you think you missed, and retry after a random delay. It buys fault tolerance (one node can die and the lock still works), not throughput, which goes down.

§ 8.6

## Build it, then count something

Build both on your laptop before you move on, and kill things on purpose.

Every box in Build 1 became many machines, and Build 2 showed that many machines need a way to agree. There is one more thing a fleet has to agree on, and it looks too small to matter: numbers. Picture an orders table that has outgrown one MySQL server and now lives on two masters, each counting its own auto-increment IDs: 1, 2, 3, 4 on one, and 1, 2, 3, 4 on the other. Order 3 now means two different orders. Lecture 6 takes that apart: how do you hand out IDs that never repeat, from many machines at once, without a lock around every single one?

Lecture 5, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.
